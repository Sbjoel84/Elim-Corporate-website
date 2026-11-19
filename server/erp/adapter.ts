import type { InquiryRequest, OrderItem, Product, PublicOrder, CustomerInfo } from '../../shared/types';

/**
 * An order that the server has already validated and priced from the
 * catalogue. This is what gets handed to the ERP.
 */
export interface ValidatedOrder {
  customer: CustomerInfo;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
}

/**
 * Everything the website needs from the ERP. To connect the company's ERP,
 * write a class that implements this interface (e.g. server/erp/<name>Adapter.ts)
 * and register it in getErpAdapter() below. Nothing in src/ needs to change.
 */
export interface ErpAdapter {
  readonly name: string;

  /** Products that should be visible on the website, with current prices. */
  listProducts(): Promise<Product[]>;

  /** Records a new web order in the ERP and returns it with its reference. */
  createOrder(order: ValidatedOrder): Promise<PublicOrder>;

  /**
   * Looks up an order for the public tracking page. Must return null unless
   * BOTH the reference and the customer's phone number match.
   */
  findOrder(orderReference: string, phoneNumber: string): Promise<PublicOrder | null>;

  /** Records a contact / distributor / bulk-order enquiry. */
  createInquiry(inquiry: InquiryRequest): Promise<{ reference: string }>;
}

/** Thrown by adapters for problems the customer should see (e.g. out of stock). */
export class ErpUserError extends Error {
  constructor(message: string, readonly status = 409) {
    super(message);
  }
}

let adapter: ErpAdapter | null = null;

export async function getErpAdapter(): Promise<ErpAdapter> {
  if (adapter) return adapter;
  const kind = (process.env.ERP_ADAPTER || 'local').toLowerCase();
  switch (kind) {
    case 'local': {
      const { LocalAdapter } = await import('./localAdapter');
      adapter = new LocalAdapter(process.env.DATA_DIR || 'data');
      break;
    }
    // case 'myerp': {
    //   const { MyErpAdapter } = await import('./myErpAdapter');
    //   adapter = new MyErpAdapter({ baseUrl: process.env.ERP_API_URL!, apiKey: process.env.ERP_API_KEY! });
    //   break;
    // }
    default:
      throw new Error(`Unknown ERP_ADAPTER "${kind}"`);
  }
  console.log(`[erp] using ${adapter.name} adapter`);
  return adapter;
}

/** Compares phone numbers by their last 10 digits (ignores +234 / 0 prefixes, spaces). */
export function samePhone(a: string, b: string): boolean {
  const norm = (s: string) => s.replace(/\D/g, '').slice(-10);
  const na = norm(a);
  return na.length >= 7 && na === norm(b);
}
