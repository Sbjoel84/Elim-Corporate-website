import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Droplets,
  Package,
  Award,
  ShoppingCart,
  Check,
  Truck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import type { Product, ProductVariant } from '../../shared/types';
import { minOrderQuantity } from '../../shared/pricing';
import { AVAILABILITY_BADGE } from '../lib/availability';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants.find((v) => v.isDefault) || product.variants[0]
  );
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const minQty = minOrderQuantity(product);
  const [quantity, setQuantity] = useState(minQty);
  const [added, setAdded] = useState(false);

  const availability = AVAILABILITY_BADGE[product.availability] ?? AVAILABILITY_BADGE.IN_STOCK;

  const handleAdd = () => {
    onAddToCart(product, selectedVariant, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const allImages = [product.image, ...(product.additionalImages || [])];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col border border-[#E1E8F0]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E1E8F0] flex items-center justify-between bg-[#F5F7FA]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563D9] bg-[#EAF4FF] px-2.5 py-0.5 rounded-md">
              {product.category}
            </span>
            <span className="text-xs font-mono text-[#536174]">SKU: {product.sku}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#536174] hover:text-[#102A56] hover:bg-slate-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Images Section */}
          <div className="space-y-3">
            <div className="aspect-4/3 rounded-xl overflow-hidden bg-slate-100 border border-[#E1E8F0] shadow-inner">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition cursor-pointer ${
                      selectedImage === img ? 'border-[#2563D9] shadow-sm' : 'border-[#E1E8F0] opacity-70'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Mineral Specs Card */}
            <div className="bg-[#EAF4FF]/60 border border-[#2563D9]/20 rounded-xl p-3.5 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-[#102A56]">
                <Sparkles className="w-4 h-4 text-[#2563D9]" />
                <span>Laboratory Mineral & Purity Analysis</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[#536174]">
                <div className="bg-white p-2 rounded-lg border border-[#E1E8F0]">
                  <span className="block text-[15px] text-[#536174]">pH Alkaline Balance</span>
                  <span className="font-bold text-[#102A56]">{product.phLevel || '7.4 - 7.5'}</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-[#E1E8F0]">
                  <span className="block text-[15px] text-[#536174]">Total Dissolved Solids</span>
                  <span className="font-bold text-[#102A56]">{product.tdsLevel || '78 - 85 ppm'}</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-[#E1E8F0]">
                  <span className="block text-[15px] text-[#536174]">Microbial Coliform</span>
                  <span className="font-bold text-emerald-600">0.00 CFU/100ml</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-[#E1E8F0]">
                  <span className="block text-[15px] text-[#536174]">Sterilization Method</span>
                  <span className="font-bold text-[#102A56]">UV-C + Ozonation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details & Actions Section */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-[#102A56] leading-tight">{product.name}</h2>
                <p className="text-xs text-[#536174] mt-2 leading-relaxed">{product.description}</p>
              </div>

              {/* Variant Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A56] mb-1.5">
                  Available Packaging Options
                </label>
                <div className="space-y-2">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant.id === v.id;
                    return (
                      <div
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                          isSelected
                            ? 'border-[#2563D9] bg-[#EAF4FF] text-[#102A56] font-semibold shadow-xs'
                            : 'border-[#E1E8F0] hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-bold">{v.name}</span>
                          <span className="text-[#2563D9] font-bold text-sm">
                            ₦{v.price.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-[15px] text-[#536174] mt-0.5">{v.packaging}</p>
                        {v.wholesalePrice && (
                          <p className="text-[15px] text-emerald-700 font-semibold mt-1">
                            Wholesale tier (5+ units): ₦{v.wholesalePrice.toLocaleString()}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery & Ordering Guidelines */}
              {product.orderingNotes && (
                <div className="bg-[#F5F7FA] p-3 rounded-xl border border-[#E1E8F0] text-xs text-[#536174]">
                  <span className="font-semibold text-[#102A56] block mb-0.5">Special Instructions:</span>
                  {product.orderingNotes}
                </div>
              )}

              {/* Availability */}
              <div className="flex items-center gap-2 text-xs text-[#536174]">
                <span className={`w-2 h-2 rounded-full ${availability.dot}`}></span>
                <span>
                  Availability: <strong className="text-[#102A56]">{availability.label}</strong>
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#E1E8F0] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#536174] block">Unit Total:</span>
                  <span className="text-2xl font-bold text-[#102A56]">
                    ₦{(selectedVariant.price * quantity).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center border border-[#E1E8F0] rounded-lg bg-[#F5F7FA]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(minQty, quantity - 1))}
                    className="px-3 py-2 text-[#536174] hover:text-[#102A56] font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm font-bold text-[#102A56] min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-[#536174] hover:text-[#102A56] font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#2563D9] hover:bg-[#1D4ED8] text-white shadow-sm'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Booking Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add {quantity} to Booking Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
