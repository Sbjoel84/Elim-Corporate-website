import { promises as fs } from 'fs';
import path from 'path';
import { randomInt } from 'crypto';
import type { InquiryRequest, PublicOrder } from '../../shared/types';
import { type ErpAdapter, type ValidatedOrder, samePhone } from './adapter';
import { LOCAL_CATALOGUE } from './localCatalogue';

interface StoredInquiry extends InquiryRequest {
  reference: string;
  createdAt: string;
}

/**
 * Stand-in for the real ERP. Keeps orders and enquiries in JSON files on the
 * server (DATA_DIR, default ./data). Good for development and testing.
 *
 * NOT for production: nobody is notified of new orders, and order statuses
 * never change because no one can update them here.
 */
export class LocalAdapter implements ErpAdapter {
  readonly name = 'local (JSON files)';
  private writeQueue: Promise<unknown> = Promise.resolve();

  constructor(private readonly dataDir: string) {}

  async listProducts() {
    return LOCAL_CATALOGUE;
  }

  async createOrder(order: ValidatedOrder): Promise<PublicOrder> {
    return this.serialized(async () => {
      const orders = await this.read<PublicOrder[]>('orders.json', []);
      const year = new Date().getFullYear();
      const prefix = `ELM-WEB-${year}-`;
      const lastNumber = orders
        .filter((o) => o.orderReference.startsWith(prefix))
        .reduce((max, o) => Math.max(max, Number(o.orderReference.slice(prefix.length)) || 0), 0);
      const now = new Date().toISOString();

      const created: PublicOrder = {
        orderReference: `${prefix}${String(lastNumber + 1).padStart(6, '0')}`,
        createdAt: now,
        status: 'NEW',
        statusHistory: [{ status: 'NEW', changedAt: now, notes: 'Booking received from website.' }],
        ...order,
      };
      orders.push(created);
      await this.write('orders.json', orders);
      return created;
    });
  }

  async findOrder(orderReference: string, phoneNumber: string) {
    const orders = await this.read<PublicOrder[]>('orders.json', []);
    const ref = orderReference.trim().toUpperCase();
    return (
      orders.find((o) => o.orderReference === ref && samePhone(o.customer.phoneNumber, phoneNumber)) ?? null
    );
  }

  async createInquiry(inquiry: InquiryRequest) {
    return this.serialized(async () => {
      const list = await this.read<StoredInquiry[]>('inquiries.json', []);
      const reference = `ELM-ENQ-${Date.now().toString(36).toUpperCase()}${randomInt(100, 999)}`;
      list.push({ ...inquiry, reference, createdAt: new Date().toISOString() });
      await this.write('inquiries.json', list);
      return { reference };
    });
  }

  // --- file helpers -------------------------------------------------------

  /** Runs writes one at a time so two simultaneous orders can't clobber each other. */
  private serialized<T>(fn: () => Promise<T>): Promise<T> {
    const run = this.writeQueue.then(fn, fn);
    this.writeQueue = run.catch(() => undefined);
    return run;
  }

  private async read<T>(file: string, fallback: T): Promise<T> {
    try {
      return JSON.parse(await fs.readFile(path.join(this.dataDir, file), 'utf8')) as T;
    } catch (err: any) {
      if (err?.code === 'ENOENT') return fallback;
      throw err;
    }
  }

  private async write(file: string, data: unknown) {
    await fs.mkdir(this.dataDir, { recursive: true });
    const target = path.join(this.dataDir, file);
    const tmp = `${target}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(data, null, 2));
    await fs.rename(tmp, target);
  }
}
