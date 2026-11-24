import 'dotenv/config';
import express, { type NextFunction, type Request, type Response } from 'express';
import { existsSync } from 'fs';
import { createServer as createHttpServer } from 'http';
import { networkInterfaces } from 'os';
import path from 'path';
import { ErpUserError, getErpAdapter } from './erp/adapter';
import { validateInquiry, validateOrder, ValidationError } from './validation';
import { PAGES } from '../src/lib/pages';

const isDev = process.argv.includes('--dev');
const port = Number(process.env.PORT) || 3000;
const distDir = path.resolve(process.cwd(), 'dist');

const app = express();
app.disable('x-powered-by');
// Set TRUST_PROXY=true when running behind a reverse proxy / load balancer,
// so rate limiting sees the real visitor IP.
if (process.env.TRUST_PROXY === 'true') app.set('trust proxy', 1);
app.use(express.json({ limit: '50kb' }));

// --- Simple per-IP rate limit for the public API ---------------------------
const hits = new Map<string, { count: number; resetAt: number }>();
function rateLimit(max: number, windowMs: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = `${req.path}:${req.ip}`;
    const now = Date.now();
    const entry = hits.get(key);
    if (!entry || entry.resetAt < now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }
    if (++entry.count > max) {
      return res.status(429).json({ error: 'Too many requests. Please wait a minute and try again.' });
    }
    next();
  };
}
setInterval(() => {
  const now = Date.now();
  for (const [k, v] of hits) if (v.resetAt < now) hits.delete(k);
}, 60_000).unref();

// --- API --------------------------------------------------------------------
const api = express.Router();

api.get('/products', async (_req, res, next) => {
  try {
    const erp = await getErpAdapter();
    res.set('Cache-Control', 'public, max-age=60');
    res.json(await erp.listProducts());
  } catch (err) {
    next(err);
  }
});

api.post('/orders', rateLimit(10, 60_000), async (req, res, next) => {
  try {
    const erp = await getErpAdapter();
    const order = validateOrder(req.body, await erp.listProducts());
    res.status(201).json(await erp.createOrder(order));
  } catch (err) {
    next(err);
  }
});

api.get('/orders/track', rateLimit(20, 60_000), async (req, res, next) => {
  try {
    const ref = String(req.query.ref ?? '').trim();
    const phone = String(req.query.phone ?? '').trim();
    if (!ref || !phone) throw new ValidationError('Enter both your booking reference and phone number.');
    const erp = await getErpAdapter();
    const order = await erp.findOrder(ref, phone);
    if (!order) {
      return res.status(404).json({
        error: 'No booking found with that reference and phone number. Please check both and try again.',
      });
    }
    res.set('Cache-Control', 'no-store');
    res.json(order);
  } catch (err) {
    next(err);
  }
});

api.post('/inquiries', rateLimit(5, 60_000), async (req, res, next) => {
  try {
    const erp = await getErpAdapter();
    res.status(201).json(await erp.createInquiry(validateInquiry(req.body)));
  } catch (err) {
    next(err);
  }
});

api.use((_req, res) => res.status(404).json({ error: 'Not found' }));

api.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ValidationError) return res.status(400).json({ error: err.message });
  if (err instanceof ErpUserError) return res.status(err.status).json({ error: err.message });
  if ((err as any)?.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid request.' });
  console.error('[api]', err);
  res.status(502).json({
    error: 'We could not reach our order system. Please try again shortly or call +234 816 639 9794.',
  });
});

app.use('/api', api);

// Health check for the hosting platform (Render's healthCheckPath).
app.get('/healthz', (_req, res) => {
  res.set('Cache-Control', 'no-store').json({ ok: true });
});

// --- Search engines -------------------------------------------------------
// SITE_URL (e.g. https://www.elimwater.com) makes sitemap links absolute and stable.
function siteUrl(req: Request): string {
  return (process.env.SITE_URL || `${req.protocol}://${req.get('host')}`).replace(/\/+$/, '');
}

app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *\nDisallow: /api/\nSitemap: ${siteUrl(req)}/sitemap.xml\n`);
});

app.get('/sitemap.xml', (req, res) => {
  const base = siteUrl(req);
  const urls = Object.entries(PAGES)
    .filter(([id]) => id !== 'notFound')
    .map(([, page]) => `  <url><loc>${base}${page.path}</loc></url>`)
    .join('\n');
  res
    .type('application/xml')
    .send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
});

// --- Website ----------------------------------------------------------------
async function start() {
  const httpServer = createHttpServer(app);

  if (isDev) {
    const { createServer } = await import('vite');
    // Live reload runs over the same port as the website, so there is no
    // second port (24678) that can clash with another running dev server.
    const vite = await createServer({
      server: { middlewareMode: true, hmr: { server: httpServer } },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    if (!existsSync(path.join(distDir, 'index.html'))) {
      console.error('dist/ not found. Run "npm run build" first.');
      process.exit(1);
    }
    // Vite's fingerprinted build files sit directly in dist/assets and never
    // change, so they can be cached for a year. Photos copied from public/
    // live in subfolders (dist/assets/aistudio, ...) and are cached briefly.
    const hashedDir = path.join(distDir, 'assets');
    app.use(
      express.static(distDir, {
        index: false,
        maxAge: '1h',
        setHeaders: (res, filePath) => {
          if (path.dirname(filePath) === hashedDir) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          }
        },
      })
    );
    // Every other path is a page of the single-page app.
    app.get('*', (_req, res) => res.sendFile(path.join(distDir, 'index.html')));
  }

  // In development, if the port is busy (e.g. another `npm run dev` is still
  // open), try the next ones instead of quitting. In production, fail clearly.
  const maxAttempts = isDev ? 10 : 1;
  let attempt = 0;
  const tryListen = (p: number) => {
    const onListening = () => {
      httpServer.removeListener('error', onError);
      printBanner(p);
    };
    const onError = (err: NodeJS.ErrnoException) => {
      httpServer.removeListener('listening', onListening);
      if (err.code === 'EADDRINUSE' && ++attempt < maxAttempts) {
        console.log(`Port ${p} is in use, trying ${p + 1}...`);
        tryListen(p + 1);
        return;
      }
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${p} is already in use. Stop the other server or set PORT in .env.`);
        process.exit(1);
      }
      throw err;
    };
    httpServer.once('listening', onListening);
    httpServer.once('error', onError);
    httpServer.listen(p);
  };
  tryListen(port);

  // Hosting platforms (Render, Docker) send SIGTERM before replacing the server
  // on a new deploy: finish in-flight requests, then exit.
  const shutdown = (signal: string) => {
    console.log(`${signal} received, shutting down...`);
    httpServer.close(() => process.exit(0));
    httpServer.closeIdleConnections();
    setTimeout(() => process.exit(0), 10_000).unref();
  };
  process.once('SIGTERM', () => shutdown('SIGTERM'));
  process.once('SIGINT', () => shutdown('SIGINT'));
}

/** Prints the clickable links, Vite-style, so they are easy to spot. */
function printBanner(p: number) {
  const bold = (s: string) => `\x1b[1m${s}\x1b[22m`;
  const cyan = (s: string) => `\x1b[36m${s}\x1b[39m`;
  const green = (s: string) => `\x1b[32m${s}\x1b[39m`;
  const dim = (s: string) => `\x1b[2m${s}\x1b[22m`;

  const network = Object.values(networkInterfaces())
    .flat()
    .filter((i) => i && i.family === 'IPv4' && !i.internal)
    .map((i) => `http://${i!.address}:${p}/`);

  console.log('');
  console.log(`  ${green(bold('Elim Water website'))} ${dim(isDev ? '(development)' : '(production)')}`);
  console.log('');
  console.log(`  ${green('➜')}  ${bold('Local:')}   ${cyan(`http://localhost:${p}/`)}`);
  for (const url of network) console.log(`  ${green('➜')}  ${bold('Network:')} ${cyan(url)}`);
  console.log(dim('     Ctrl+Click a link to open it. Press Ctrl+C to stop.'));
  console.log('');
}

start();
