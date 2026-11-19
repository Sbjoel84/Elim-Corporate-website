import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Package, Plus, ShoppingCart, X } from 'lucide-react';
import type { CartItem, Product, ProductVariant } from '../../shared/types';

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
}

/**
 * Step 1 of booking: choose products, pack sizes and quantities.
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
}) => {
  const [productId, setProductId] = useState('');
  const [variantId, setVariantId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState('');

  const product = products.find((p) => p.id === productId) ?? products[0];
  const variant =
    product?.variants.find((v) => v.id === variantId) ??
    product?.variants.find((v) => v.isDefault) ??
    product?.variants[0];

  // Reset the form each time it opens.
  useEffect(() => {
    if (!isOpen) return;
    const start = products.find((p) => p.id === initialProductId) ?? products[0];
    setProductId(start?.id ?? '');
    setVariantId('');
    setQuantity(1);
    setJustAdded('');
  }, [isOpen, initialProductId, products]);

  if (!isOpen) return null;

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

  const addSelection = () => {
    if (!product || !variant || quantity < 1) return false;
    onAddToCart(product, variant, quantity);
    setJustAdded(`${quantity} × ${product.name} (${variant.name})`);
    return true;
  };

  const handleAddAnother = () => {
    if (addSelection()) setQuantity(1);
  };

  const handleContinue = () => {
    // If they never pressed "add", include what is selected now.
    if (!justAdded) addSelection();
    onContinueToCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-order-title"
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
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

        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {products.length === 0 ? (
            <p className="text-[#536174]">Loading products…</p>
          ) : (
            <>
              <div>
                <label htmlFor="bo-product" className="block text-xs font-semibold text-[#102A56] mb-1">
                  Product
                </label>
                <select
                  id="bo-product"
                  value={product?.id}
                  onChange={(e) => {
                    setProductId(e.target.value);
                    setVariantId('');
                  }}
                  className="w-full px-3 py-2.5 border border-[#E1E8F0] rounded-lg text-[#102A56] bg-white focus:ring-2 focus:ring-[#2563D9] focus:outline-none"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label htmlFor="bo-variant" className="block text-xs font-semibold text-[#102A56] mb-1">
                    Pack size
                  </label>
                  <select
                    id="bo-variant"
                    value={variant?.id}
                    onChange={(e) => setVariantId(e.target.value)}
                    className="w-full px-3 py-2.5 border border-[#E1E8F0] rounded-lg text-[#102A56] bg-white focus:ring-2 focus:ring-[#2563D9] focus:outline-none"
                  >
                    {product?.variants.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name} — ₦{v.price.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="bo-qty" className="block text-xs font-semibold text-[#102A56] mb-1">
                    Quantity
                  </label>
                  <input
                    id="bo-qty"
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-full px-3 py-2.5 border border-[#E1E8F0] rounded-lg text-[#102A56] focus:ring-2 focus:ring-[#2563D9] focus:outline-none"
                  />
                </div>
              </div>

              {variant && (
                <div className="flex items-center justify-between bg-[#F5F7FA] border border-[#E1E8F0] rounded-xl px-4 py-3">
                  <span className="text-xs text-[#536174]">This selection</span>
                  <span className="font-bold text-[#102A56]">₦{(variant.price * quantity).toLocaleString()}</span>
                </div>
              )}

              {justAdded && (
                <div className="flex items-start gap-2 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Added {justAdded}. Choose another product or continue.</span>
                </div>
              )}

              {cartCount > 0 && (
                <div className="flex items-center gap-2 text-xs text-[#536174]">
                  <ShoppingCart className="w-4 h-4 text-[#2563D9]" />
                  <span>
                    In your booking: <strong className="text-[#102A56]">{cartItems.length}</strong>{' '}
                    {cartItems.length === 1 ? 'product' : 'products'}, ₦{cartTotal.toLocaleString()}
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        <div className="p-5 border-t border-[#E1E8F0] flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
          <button
            type="button"
            onClick={handleAddAnother}
            disabled={products.length === 0}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#102A56] bg-[#F5F7FA] hover:bg-[#EAF4FF] border border-[#E1E8F0] rounded-lg transition cursor-pointer disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            Add & choose another
          </button>
          <button
            type="button"
            onClick={handleContinue}
            disabled={products.length === 0}
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
