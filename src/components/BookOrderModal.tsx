import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Package, Plus, ShoppingCart, Store, Trash2, Truck, X } from 'lucide-react';
import type { CartItem, DeliveryMethod, Product, ProductVariant } from '../../shared/types';
import {
  calculateDeliveryFee,
  findDeliveryZone,
  FREE_DELIVERY_THRESHOLD,
  minOrderQuantity,
} from '../../shared/pricing';
import { DeliveryZoneSelect } from './DeliveryZoneSelect';

interface BookOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  cartItems: CartItem[];
  /** Product to pre-select when the form opens (e.g. from a product banner). */
  initialProductId?: string;
  onAddToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
  /** Close this form and open the checkout (customer details + submit). */
  onContinueToCheckout: () => void;
  deliveryMethod: DeliveryMethod;
  onChangeDeliveryMethod: (method: DeliveryMethod) => void;
  /** Delivery area id (see DELIVERY_ZONES in shared/pricing.ts). */
  deliveryZone: string;
  onChangeDeliveryZone: (zoneId: string) => void;
}

interface OrderLine {
  key: number;
  productId: string;
  variantId: string;
  quantity: number;
}

const inputClass =
  'w-full px-3 py-2.5 border border-[#E1E8F0] rounded-lg text-[#102A56] bg-white focus:ring-2 focus:ring-[#2563D9] focus:outline-none';

/**
 * Step 1 of booking: choose one or more products, pack sizes and quantities.
 * Step 2 is the existing CheckoutModal, which collects the customer's details
 * and sends the order to the server.
 */
export const BookOrderModal: React.FC<BookOrderModalProps> = ({
  isOpen,
  onClose,
  products,
  cartItems,
  initialProductId,
  onAddToCart,
  onContinueToCheckout,
  deliveryMethod,
  onChangeDeliveryMethod,
  deliveryZone,
  onChangeDeliveryZone,
}) => {
  const nextKey = useRef(1);
  const [lines, setLines] = useState<OrderLine[]>([]);

  const minFor = (productId: string) => minOrderQuantity(products.find((p) => p.id === productId));

  const newLine = (productId?: string): OrderLine => {
    const id = productId ?? products[0]?.id ?? '';
    return { key: nextKey.current++, productId: id, variantId: '', quantity: minFor(id) };
  };

  // Reset the form each time it opens.
  useEffect(() => {
    if (!isOpen) return;
    const start = products.find((p) => p.id === initialProductId) ?? products[0];
    setLines([newLine(start?.id)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialProductId, products]);

  if (!isOpen) return null;

  const resolve = (line: OrderLine) => {
    const product = products.find((p) => p.id === line.productId) ?? products[0];
    const variant =
      product?.variants.find((v) => v.id === line.variantId) ??
      product?.variants.find((v) => v.isDefault) ??
      product?.variants[0];
    return { product, variant };
  };

  const updateLine = (key: number, patch: Partial<OrderLine>) =>
    setLines((prev) => prev.map((l) => (l.key === key ? { ...l, ...patch } : l)));

  const addLine = () => {
    // Suggest a product not already chosen, so "Add product" is one click for most customers.
    const used = new Set(lines.map((l) => l.productId));
    const next = products.find((p) => !used.has(p.id)) ?? products[0];
    setLines((prev) => [...prev, newLine(next?.id)]);
  };

  const removeLine = (key: number) => setLines((prev) => prev.filter((l) => l.key !== key));

  const selectionTotal = lines.reduce((sum, l) => {
    const { variant } = resolve(l);
    return sum + (variant ? variant.price * l.quantity : 0);
  }, 0);

  const cartTotal = cartItems.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

  const subtotal = selectionTotal + cartTotal;
  const deliveryFee = calculateDeliveryFee(subtotal, deliveryMethod, deliveryZone);
  const zone = findDeliveryZone(deliveryZone);

  const handleContinue = () => {
    lines.forEach((l) => {
      const { product, variant } = resolve(l);
      if (product && variant) onAddToCart(product, variant, Math.max(l.quantity, minOrderQuantity(product)));
    });
    onContinueToCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-order-title"
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
      >
        <div className="bg-[#102A56] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 id="book-order-title" className="font-bold text-lg text-white">
                Book an Order
              </h3>
              <p className="text-xs text-white/80">Step 1 of 2: choose your products</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-sm">
          {products.length === 0 ? (
            <p className="text-[#536174]">Loading products…</p>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-[#102A56]">
                  Products ({lines.length})
                </h4>
                <button
                  type="button"
                  onClick={addLine}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#2563D9] hover:bg-[#1D4ED8] rounded-lg shadow-sm transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Add product
                </button>
              </div>

              <ul className="space-y-3">
                {lines.map((line, index) => {
                  const { product, variant } = resolve(line);
                  const id = `bo-${line.key}`;
                  return (
                    <li key={line.key} className="border border-[#E1E8F0] rounded-xl p-4 bg-[#F9FBFD]">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-[#536174]">Item {index + 1}</span>
                        <div className="flex items-center gap-3">
                          {variant && (
                            <span className="text-xs font-bold text-[#102A56]">
                              ₦{(variant.price * line.quantity).toLocaleString()}
                            </span>
                          )}
                          {lines.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeLine(line.key)}
                              aria-label={`Remove item ${index + 1}`}
                              className="p-1 rounded-md text-[#536174] hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-6 gap-3">
                        <div className="sm:col-span-3">
                          <label htmlFor={`${id}-product`} className="block text-xs font-semibold text-[#102A56] mb-1">
                            Product
                          </label>
                          <select
                            id={`${id}-product`}
                            value={product?.id}
                            onChange={(e) =>
                              updateLine(line.key, {
                                productId: e.target.value,
                                variantId: '',
                                quantity: Math.max(line.quantity, minFor(e.target.value)),
                              })
                            }
                            className={inputClass}
                          >
                            {products.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor={`${id}-variant`} className="block text-xs font-semibold text-[#102A56] mb-1">
                            Pack size
                          </label>
                          <select
                            id={`${id}-variant`}
                            value={variant?.id}
                            onChange={(e) => updateLine(line.key, { variantId: e.target.value })}
                            className={inputClass}
                          >
                            {product?.variants.map((v) => (
                              <option key={v.id} value={v.id}>
                                {v.name} — ₦{v.price.toLocaleString()}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor={`${id}-qty`} className="block text-xs font-semibold text-[#102A56] mb-1">
                            Qty
                          </label>
                          <input
                            id={`${id}-qty`}
                            type="number"
                            min={minOrderQuantity(product)}
                            value={line.quantity || ''}
                            onChange={(e) => updateLine(line.key, { quantity: parseInt(e.target.value, 10) || 0 })}
                            onBlur={() =>
                              updateLine(line.key, { quantity: Math.max(line.quantity, minOrderQuantity(product)) })
                            }
                            aria-describedby={minOrderQuantity(product) > 1 ? `${id}-min` : undefined}
                            className={inputClass}
                          />
                          {minOrderQuantity(product) > 1 && (
                            <p id={`${id}-min`} className="mt-1 text-[11px] text-[#536174]">
                              Min. {minOrderQuantity(product)}
                            </p>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="space-y-3 pt-1">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-[#102A56]">Delivery</h4>
                <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Delivery method">
                  {(
                    [
                      { method: 'DELIVERY', label: 'Deliver to me', Icon: Truck },
                      { method: 'FACTORY_COLLECTION', label: 'Collect from factory', Icon: Store },
                    ] as const
                  ).map(({ method, label, Icon }) => (
                    <button
                      key={method}
                      type="button"
                      role="radio"
                      aria-checked={deliveryMethod === method}
                      onClick={() => onChangeDeliveryMethod(method)}
                      className={`flex items-center gap-2 p-2.5 rounded-lg border text-left text-xs transition cursor-pointer ${
                        deliveryMethod === method
                          ? 'border-[#2563D9] bg-[#EAF4FF] text-[#102A56] font-semibold'
                          : 'border-[#E1E8F0] bg-white text-[#536174] hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#2563D9] shrink-0" />
                      {label}
                    </button>
                  ))}
                </div>

                {deliveryMethod === 'DELIVERY' ? (
                  <div>
                    <label htmlFor="bo-zone" className="block text-xs font-semibold text-[#102A56] mb-1">
                      Delivery area
                    </label>
                    <DeliveryZoneSelect
                      id="bo-zone"
                      value={deliveryZone}
                      onChange={onChangeDeliveryZone}
                      className={inputClass}
                    />
                    {zone?.freeOver && subtotal < FREE_DELIVERY_THRESHOLD && (
                      <p className="mt-1 text-[11px] text-[#536174]">
                        Free delivery to this area on orders of ₦{FREE_DELIVERY_THRESHOLD.toLocaleString()} and above.
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-[#536174]">Pick up from our factory in Kubwa, Abuja. No delivery fee.</p>
                )}
              </div>

              <div className="bg-[#F5F7FA] border border-[#E1E8F0] rounded-xl px-4 py-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-[#536174]">
                  <span>
                    Products ({lines.length} {lines.length === 1 ? 'item' : 'items'}
                    {cartItems.length > 0 ? ' + booking so far' : ''})
                  </span>
                  <span className="font-semibold text-[#102A56]">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#536174]">
                  <span>Delivery fee</span>
                  <span className="font-semibold text-[#102A56]">
                    {deliveryFee === 0 ? 'Free' : `₦${deliveryFee.toLocaleString()}`}
                  </span>
                </div>
                <div className="pt-1.5 border-t border-[#E1E8F0] flex justify-between text-sm font-bold text-[#102A56]">
                  <span>Estimated total</span>
                  <span className="text-[#2563D9]">₦{(subtotal + deliveryFee).toLocaleString()}</span>
                </div>
              </div>

              {cartItems.length > 0 && (
                <div className="flex items-center gap-2 text-xs text-[#536174]">
                  <ShoppingCart className="w-4 h-4 text-[#2563D9]" />
                  <span>
                    Already in your booking: <strong className="text-[#102A56]">{cartItems.length}</strong>{' '}
                    {cartItems.length === 1 ? 'product' : 'products'}, ₦{cartTotal.toLocaleString()}. These will be
                    added to it.
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        <div className="p-5 border-t border-[#E1E8F0] flex justify-end">
          <button
            type="button"
            onClick={handleContinue}
            disabled={products.length === 0 || lines.length === 0}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#2563D9] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-lg shadow-sm transition cursor-pointer disabled:opacity-50"
          >
            Continue to booking details
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
