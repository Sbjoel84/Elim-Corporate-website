import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Store, AlertCircle } from 'lucide-react';
import type { CartItem, DeliveryMethod } from '../../shared/types';
import { calculateDeliveryFee, FREE_DELIVERY_THRESHOLD } from '../../shared/pricing';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, variantId: string, newQty: number) => void;
  onRemoveItem: (productId: string, variantId: string) => void;
  deliveryMethod: DeliveryMethod;
  onChangeDeliveryMethod: (method: DeliveryMethod) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  deliveryMethod,
  onChangeDeliveryMethod,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const deliveryFee = calculateDeliveryFee(subtotal, deliveryMethod);
  const total = subtotal + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300 border-l border-[#E1E8F0]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E1E8F0] flex items-center justify-between bg-[#F5F7FA]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#2563D9] text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-[#102A56] text-base">Your Booking Cart</h3>
              <p className="text-xs text-[#536174]">
                {items.length} {items.length === 1 ? 'product' : 'products'} selected
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#536174] hover:text-[#102A56] hover:bg-slate-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 divide-y divide-[#E1E8F0]">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EAF4FF] text-[#2563D9] mx-auto flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <div>
                <p className="text-base font-bold text-[#102A56]">Your order cart is empty</p>
                <p className="text-xs text-[#536174] mt-1 max-w-xs mx-auto">
                  Browse our bottled, sachet, and dispenser water catalogue to place a booking.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#2563D9] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-lg transition cursor-pointer"
              >
                Browse Products
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.productId}-${item.variantId}`} className="pt-4 first:pt-0 flex gap-3">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-16 h-16 rounded-lg object-cover bg-slate-100 border border-[#E1E8F0] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-[#102A56] truncate">{item.productName}</h4>
                  <p className="text-xs text-[#2563D9] font-medium truncate">{item.variantName}</p>
                  <p className="text-xs text-[#536174] mb-2">{item.packaging}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-[#E1E8F0] rounded-md bg-[#F5F7FA]">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.productId, item.variantId, item.quantity - 1)
                        }
                        className="p-1 text-[#536174] hover:text-[#102A56] cursor-pointer"
                        title="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 text-xs font-bold text-[#102A56] min-w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.productId, item.variantId, item.quantity + 1)
                        }
                        className="p-1 text-[#536174] hover:text-[#102A56] cursor-pointer"
                        title="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-[#102A56]">
                        ₦{(item.unitPrice * item.quantity).toLocaleString()}
                      </span>
                      <span className="block text-[15px] text-[#536174]">
                        ₦{item.unitPrice.toLocaleString()} each
                      </span>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.productId, item.variantId)}
                      className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded transition ml-1 cursor-pointer"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Delivery Mode & Summary */}
        {items.length > 0 && (
          <div className="border-t border-[#E1E8F0] bg-[#F5F7FA] p-4 sm:p-5 space-y-4">
            {/* Delivery Method Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#102A56] mb-2">
                Fulfillment Method
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onChangeDeliveryMethod('DELIVERY')}
                  className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition cursor-pointer ${
                    deliveryMethod === 'DELIVERY'
                      ? 'border-[#2563D9] bg-[#EAF4FF] text-[#102A56] font-semibold'
                      : 'border-[#E1E8F0] bg-white text-[#536174] hover:bg-slate-100'
                  }`}
                >
                  <Truck className="w-4 h-4 text-[#2563D9] shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold leading-none">Doorstep Fleet</p>
                    <p className="text-[15px] text-[#536174] mt-0.5">Truck / Van Delivery</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onChangeDeliveryMethod('FACTORY_COLLECTION')}
                  className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition cursor-pointer ${
                    deliveryMethod === 'FACTORY_COLLECTION'
                      ? 'border-[#2563D9] bg-[#EAF4FF] text-[#102A56] font-semibold'
                      : 'border-[#E1E8F0] bg-white text-[#536174] hover:bg-slate-100'
                  }`}
                >
                  <Store className="w-4 h-4 text-[#2563D9] shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold leading-none">Factory Collection</p>
                    <p className="text-[15px] text-[#536174] mt-0.5">Self-pickup (Gate B)</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#536174]">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-[#102A56]">₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Estimate:</span>
                <span className="font-semibold text-[#102A56]">
                  {deliveryMethod === 'FACTORY_COLLECTION'
                    ? 'Free (Pickup)'
                    : deliveryFee === 0
                    ? 'FREE (Bulk Order)'
                    : `₦${deliveryFee.toLocaleString()}`}
                </span>
              </div>
              {deliveryMethod === 'DELIVERY' && subtotal < FREE_DELIVERY_THRESHOLD && (
                <p className="text-[15px] text-[#2563D9]">
                  💡 Tip: Orders of ₦{FREE_DELIVERY_THRESHOLD.toLocaleString()} and above qualify for free factory fleet delivery!
                </p>
              )}
              <div className="pt-2 border-t border-[#E1E8F0] flex justify-between text-sm font-bold text-[#102A56]">
                <span>Estimated Total:</span>
                <span className="text-[#2563D9] text-base">₦{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="text-[15px] text-[#536174] flex items-start gap-1.5 bg-[#EAF4FF] p-2.5 rounded-lg border border-[#2563D9]/20">
              <AlertCircle className="w-3.5 h-3.5 text-[#2563D9] shrink-0 mt-0.5" />
              <span>
                Booking is subject to review and stock confirmation by our factory order desk. No
                immediate payment required.
              </span>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#2563D9] hover:bg-[#1D4ED8] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer"
            >
              <span>Proceed to Booking Submission</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
