# Elim Water website

The public website for Elim Water: company pages, product catalogue, online booking (cart and checkout), order tracking and the contact / distributor enquiry form.

Staff work in the company's existing ERP. This site does not have its own admin area. It sends bookings and enquiries to the ERP and reads products and order statuses back from it.

## Running it

Requires Node.js 20 or newer.

```bash
npm install
cp .env.example .env     # then adjust values
npm run dev              # website + API on http://localhost:3000
```

For production:

```bash
npm run build            # builds the website (dist/) and the server (dist-server/)
npm start                # serves both on PORT
```

`npm run lint` type-checks the whole project.

## Deploying on Render

The repository includes a Render Blueprint (`render.yaml`) that sets up one web service for the website and API.

1. Push the code to GitHub (`main` branch).
2. In Render: **New + → Blueprint**, connect the GitHub repository, and apply. Render reads `render.yaml`:
   - Build: `npm ci --include=dev && npm run build`
   - Start: `npm start` (Render supplies `PORT`)
   - Health check: `/healthz`
   - Node version: from `.node-version` (22)
   - Region: Frankfurt, plan: Starter, with a 1 GB disk at `/var/data` for saved bookings and enquiries
3. When Render asks for `SITE_URL`, enter the public address (e.g. `https://www.elimwater.com`, no trailing slash). You can leave it blank at first and set it later under **Environment**.
4. To use your own domain: **Settings → Custom Domains** in the Render service, then add the DNS records Render shows.

Every push to `main` redeploys automatically.

**Free plan:** it works for previews, but the site sleeps after 15 minutes without visitors, and it cannot have a disk, so bookings saved by the local adapter are lost on every deploy or restart. To use it, change `plan: starter` to `plan: free` and delete the `disk:` block and the `DATA_DIR` entry in `render.yaml`.

## How it fits together

```
Browser (src/)  ──/api──▶  Express server (server/)  ──▶  ERP adapter (server/erp/)  ──▶  ERP
```

| Folder | Contents |
|---|---|
| `src/` | React website. Pages in `src/pages`, shared UI in `src/components`. |
| `src/content/` | News articles and gallery photos. Edit these files to change that content. |
| `src/lib/pages.ts` | Every page's URL, browser title and search description. |
| `shared/` | Types and the delivery-fee rule, used by both the website and the server. |
| `server/` | API: `GET /api/products`, `POST /api/orders`, `GET /api/orders/track`, `POST /api/inquiries`. Also serves the website, `sitemap.xml` and `robots.txt`. |
| `server/erp/` | The connection to the ERP. |

The server checks every booking before passing it on. Prices and the delivery fee are always recalculated from the catalogue, so a visitor cannot change what they pay.

## Connecting the ERP

`server/erp/adapter.ts` defines four things the website needs from the ERP:

1. `listProducts()`: products, prices and availability to show.
2. `createOrder()`: record a web booking and return its reference.
3. `findOrder(ref, phone)`: look up a booking for the tracking page. It must match both the reference and the phone number.
4. `createInquiry()`: record a contact or distributor enquiry.

To connect the ERP, write one class that implements this interface, register it in `getErpAdapter()`, and set `ERP_ADAPTER` (plus any keys) in `.env`. Nothing in `src/` needs to change.

Until then the **local** adapter is used. It saves bookings and enquiries to JSON files in `data/`. **It is for development only.** Nobody is notified of new bookings, and booking statuses never change.

## Images

Run `npm run optimize-images` after adding photos. It resizes and compresses everything in `public/assets` and `src/assets/images` in place. Original full-size photos are in git history (commit `ac20cce`).

## Before launch

- [ ] Write and enable the real ERP adapter.
- [ ] Confirm every product, price and pack size (`server/erp/localCatalogue.ts` until the ERP supplies them).
- [ ] Check the news articles (`src/content/news.ts`) and the claims in the page copy (certifications, test results, figures).
- [ ] Confirm the phone and WhatsApp number (+234 816 639 9794) and the factory address.
- [ ] Set `SITE_URL`, and set `TRUST_PROXY=true` if the server runs behind a proxy.
