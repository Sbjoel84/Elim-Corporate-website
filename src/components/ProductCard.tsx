import React, { useState } from 'react';
import { ShoppingCart, Eye, Check, Package, ArrowRight } from 'lucide-react';
import { Product, ProductVariant } from '../types/erp';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants.find((v) => v.isDefault) || product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const availableStock = Math.max(0, product.currentStock - product.reservedStock);

  let stockStatusBadge = {
    label: 'In Stock',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };
  if (availableStock === 0) {
    stockStatusBadge = {
      label: 'Produced on Order',
      className: 'bg-blue-50 text-blue-700 border-blue-200',
    };
  } else if (availableStock < product.minReorderLevel) {
    stockStatusBadge = {
      label: 'Limited Stock',
      className: 'bg-amber-50 text-amber-700 border-amber-200',
    };
  }

  const handleAdd = () => {
    onAddToCart(product, selectedVariant, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E1E8F0] hover:border-[#2563D9]/50 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group">
      {/* Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-[#F5F7FA]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-[#102A56]/85 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-0.5 rounded-md">
          {product.category}
        </span>

        {/* Stock Status Badge */}
        <span
          className={`absolute top-3 right-3 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${stockStatusBadge.className}`}
        >
          {stockStatusBadge.label}
        </span>

        {/* Quick View Button */}
        <button
          onClick={() => onViewDetails(product)}
          className="absolute bottom-3 right-3 p-2 bg-white/90 hover:bg-white text-[#102A56] hover:text-[#2563D9] rounded-lg shadow-sm transition opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 cursor-pointer"
          title="Quick View Specifications"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header & Title */}
          <div className="flex items-center gap-2 text-xs text-[#536174] mb-1">
            <span className="font-mono text-[10px] text-slate-400">SKU: {product.sku}</span>
            {product.phLevel && (
              <>
                <span>•</span>
                <span className="text-[#2563D9] font-medium">pH {product.phLevel} Pure Mineral</span>
              </>
            )}
          </div>

          <h3
            onClick={() => onViewDetails(product)}
            className="font-bold text-[#102A56] text-base leading-snug hover:text-[#2563D9] transition cursor-pointer line-clamp-2"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#536174] mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Variants & Pricing Section */}
        <div className="mt-4 pt-3 border-t border-[#E1E8F0] space-y-3">
          {/* Variant Selector if more than 1 */}
          {product.variants.length > 1 ? (
            <div>
              <label className="block text-[11px] font-semibold text-[#102A56] mb-1">
                Select Packaging / Pack Size:
              </label>
              <select
                value={selectedVariant.id}
                onChange={(e) => {
                  const found = product.variants.find((v) => v.id === e.target.value);
                  if (found) setSelectedVariant(found);
                }}
                className="w-full text-xs py-1.5 px-2.5 bg-[#F5F7FA] border border-[#E1E8F0] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563D9] font-medium text-[#102A56]"
              >
                {product.variants.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} — ₦{v.price.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-[#536174] bg-[#F5F7FA] p-2 rounded-lg">
              <Package className="w-3.5 h-3.5 text-[#2563D9] shrink-0" />
              <span className="truncate">{selectedVariant.packaging}</span>
            </div>
          )}

          {/* Price display */}
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-lg font-bold text-[#102A56]">
                ₦{selectedVariant.price.toLocaleString()}
              </span>
              <span className="text-xs text-[#536174] font-normal ml-1">
                / {selectedVariant.unitOfMeasure}
              </span>
            </div>

            {selectedVariant.wholesalePrice && (
              <span className="text-[10px] text-[#2563D9] bg-[#EAF4FF] px-2 py-0.5 rounded font-semibold border border-blue-100">
                Wholesale: ₦{selectedVariant.wholesalePrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Quantity and Add to Cart Action */}
          <div className="flex items-center gap-2 pt-1">
            <div className="flex items-center border border-[#E1E8F0] rounded-lg bg-[#F5F7FA] shrink-0">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-2.5 py-1.5 text-[#536174] hover:text-[#102A56] text-xs font-bold cursor-pointer"
              >
                -
              </button>
              <span className="px-2 text-xs font-bold text-[#102A56] min-w-5 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="px-2.5 py-1.5 text-[#536174] hover:text-[#102A56] text-xs font-bold cursor-pointer"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg transition shadow-2xs cursor-pointer ${
                addedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#2563D9] hover:bg-[#1D4ED8] text-white'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add to Order</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
