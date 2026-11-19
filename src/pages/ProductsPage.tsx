import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Droplets, ShoppingBag } from 'lucide-react';
import { Product, ProductVariant } from '../types/erp';
import { ProductCard } from '../components/ProductCard';
import imgProduct1 from '../assets/images/regenerated_image_1794002270000.jpg';
import imgProduct2 from '../assets/images/regenerated_image_1794002269039.jpg';
import imgProduct3 from '../assets/images/regenerated_image_1794002270790.jpg';
import imgProduct4 from '../assets/images/regenerated_image_1794002271520.jpg';
import imgProduct5 from '../assets/images/regenerated_image_1794002273033.jpg';
import imgProduct6 from '../assets/images/regenerated_image_1794002273815.jpg';
import imgProduct7 from '../assets/images/regenerated_image_1794002274279.jpg';

const REGENERATED_PRODUCT_IMAGES: string[] = [
  imgProduct1,
  imgProduct2,
  imgProduct3,
  imgProduct4,
  imgProduct5,
  imgProduct6,
  imgProduct7,
];

const PRODUCT_IMAGE_BY_ID: Record<string, string> = {
  'prod-sachet-01': imgProduct1,
  'prod-bottle-500': imgProduct2,
  'prod-bottle-1500': imgProduct3,
  'prod-dispenser-19l': imgProduct4,
  'prod-bottle-750': imgProduct5,
  'prod-dispenser-unit': imgProduct6,
  'prod-pump-manual': imgProduct7,
};

interface ProductsPageProps {
  products: Product[];
  onAddToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
  onViewProductDetails: (product: Product) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  onAddToCart,
  onViewProductDetails,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  const categories: { id: string; label: string }[] = [
    { id: 'ALL', label: 'All Water Products' },
    { id: 'Bottled Water', label: 'Bottled Table Water' },
    { id: 'Sachet Water', label: 'Sachet Water' },
    { id: 'Table Water', label: 'Table & Dining Water' },
    { id: 'Dispenser Water', label: '19L Dispenser Refills' },
    { id: 'Dispenser Bottles & Accessories', label: 'Dispensers & Pumps' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        const priceA = a.variants[0]?.price || 0;
        const priceB = b.variants[0]?.price || 0;

        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-10 space-y-8 bg-white">
      {/* Title & Corporate Banner */}
      <div className="bg-[#102A56] rounded-2xl p-6 sm:p-10 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 max-w-xl">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200 bg-white/10 px-3 py-1 rounded-full border border-white/15">
            ERP Integrated Catalogue
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Elim Table Water Product Catalogue
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
            Browse our full range of approved bottled, sachet, and dispenser water products. All
            quantities are backed by live factory warehouse inventory in Kubwa, Abuja.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 shrink-0">
          <div className="w-10 h-10 rounded-lg bg-[#2563D9] text-white flex items-center justify-center font-bold">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">Factory Direct Supply</span>
            <span className="text-[11px] text-blue-200">Wholesale & retail bookings accepted</span>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="space-y-4">
        {/* Search and Sort row */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-[#536174] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by name, pack size, or SKU..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E1E8F0] rounded-xl text-xs sm:text-sm text-[#102A56] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563D9] shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-slate-600 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <SlidersHorizontal className="w-4 h-4 text-[#536174] shrink-0" />
            <span className="text-xs text-[#536174] font-medium hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs font-medium bg-white border border-[#E1E8F0] rounded-xl text-[#102A56] focus:outline-none focus:ring-2 focus:ring-[#2563D9] cursor-pointer shadow-2xs"
            >
              <option value="featured">Featured / Best Sellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Product Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#2563D9] text-white shadow-xs'
                  : 'bg-white text-[#536174] border border-[#E1E8F0] hover:bg-[#F5F7FA] hover:text-[#102A56]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#F5F7FA] rounded-2xl border border-[#E1E8F0] p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 mx-auto flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#102A56]">No matching water products found</h3>
          <p className="text-xs text-[#536174] max-w-sm mx-auto">
            Try adjusting your search query or switching to another category.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('ALL');
            }}
            className="px-4 py-2 bg-[#2563D9] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-lg cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => {
            const resolvedImg =
              selectedCategory === 'ALL' && !searchQuery && sortBy === 'featured'
                ? REGENERATED_PRODUCT_IMAGES[idx] || product.image
                : PRODUCT_IMAGE_BY_ID[product.id] || product.image;
            const productWithImage = { ...product, image: resolvedImg };

            return (
              <ProductCard
                key={product.id}
                product={productWithImage}
                onAddToCart={onAddToCart}
                onViewDetails={onViewProductDetails}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
