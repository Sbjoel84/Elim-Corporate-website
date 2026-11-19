import type { InquiryRequest, OrderRequest, Product, PublicOrder } from '../../shared/types';

/** Error with a message that is safe to show to the customer. */
export class ApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`/api${path}`, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...init?.headers },
    });
  } catch {
    throw new ApiError('Could not connect. Please check your internet connection and try again.', 0);
  }
  const body = await res.json().catch(() => null);
  if (!res.ok) {
    throw new ApiError(body?.error || 'Something went wrong. Please try again.', res.status);
  }
  return body as T;
}

export const api = {
  getProducts: () => request<Product[]>('/products'),

  createOrder: (order: OrderRequest) =>
    request<PublicOrder>('/orders', { method: 'POST', body: JSON.stringify(order) }),

  trackOrder: (ref: string, phone: string) =>
    request<PublicOrder>(
      `/orders/track?ref=${encodeURIComponent(ref.trim())}&phone=${encodeURIComponent(phone.trim())}`
    ),

  submitInquiry: (inquiry: InquiryRequest) =>
    request<{ reference: string }>('/inquiries', { method: 'POST', body: JSON.stringify(inquiry) }),
};
