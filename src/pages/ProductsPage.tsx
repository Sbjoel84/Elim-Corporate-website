import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Droplets, ShoppingBag } from 'lucide-react';
import type { Product, ProductVariant } from '../../shared/types';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS as PRODUCT_RANGE } from '../components/AboutSections';
// Finished-product photos shown above the catalogue. Names and descriptions
// come from the About page product list so the wording stays the same.
const SHOWCASE = [
  { name: 'Bottled Water', image: '/assets/aistudio/elim-bottled-water.png', fitWhole: true },
  { name: '18.9 Ltrs Jar (Dispenser Water)', image: '/assets/aistudio/elim-dispenser-jar.png', fitWhole: true },
  { name: 'Sachet Water', image: '/assets/aistudio/elim-sachet-water.png', fitWhole: true },
].map((item) => ({ ...item, text: PRODUCT_RANGE.find((p) => p.name === item.name)?.text ?? '' }));

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
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Categories shown as filter tabs; products are listed in this order in one grid.
  const categories: { id: string; label: string }[] = [
    { id: 'Bottled Water', label: 'Bottled Water' },
    { id: 'Sachet Water', label: 'Sachet Water' },
    { id: 'Table Water', label: 'Table & Dining Water' },
    { id: 'Dispenser Water', label: 'Dispenser Water' },
  ];
  const categoryOrder = (category: string) => {
    const i = categories.findIndex((c) => c.id === category);
    return i === -1 ? categories.length : i;
  };

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
      .sort((a, b) => {
        const priceA = a.variants[0]?.price || 0;
        const priceB = b.variants[0]?.price || 0;
        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, searchQuery, sortBy]);

  // Only categories that have products get a tab.
  const tabs = categories
    .map((cat) => ({ ...cat, count: filteredProducts.filter((p) => p.category === cat.id).length }))
    .filter((cat) => cat.count > 0);
  const listedProducts = filteredProducts.filter((p) => categories.some((c) => c.id === p.category));

  // One grid: grouped by category (in tab order) unless the user picked a price/name sort.
  const visibleProducts = listedProducts
    .filter((p) => activeCategory === 'all' || p.category === activeCategory)
    .sort((a, b) => (sortBy === 'featured' ? categoryOrder(a.category) - categoryOrder(b.category) : 0));

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-10 space-y-8 bg-white">
      {/* Title & Corporate Banner */}
      <div className="bg-[#102A56] rounded-2xl p-6 sm:p-10 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 max-w-xl">
          <span className="text-[15px] font-bold uppercase tracking-wider text-blue-200 bg-white/10 px-3 py-1 rounded-full border border-white/15">
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
            <span className="text-[15px] text-blue-200">Wholesale & retail bookings accepted</span>
          </div>
        </div>
      </div>

      {/* Our Products: finished-product photos with descriptions */}
      <section className="space-y-5">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#102A56]">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SHOWCASE.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-2xl border border-[#E1E8F0] overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="p-3 pb-0">
                <div className="aspect-square rounded-xl overflow-hidden bg-[#F5F7FA]">
                  <img
                    src={item.image}
                    alt={`Elim ${item.name}`}
                    loading="lazy"
                    className={`w-full h-full ${item.fitWhole ? 'object-contain' : 'object-cover'}`}
                  />
                </div>
              </div>
              <div className="p-5 space-y-1.5">
                <h3 className="text-base font-bold text-[#102A56]">{item.name}</h3>
                <p className="text-sm text-[#536174] leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Catalogue toolbar: heading, search, sort and category tabs */}
      <section className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-[#E1E8F0] pb-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#102A56]">Price List & Online Ordering</h2>
            <p className="text-sm text-[#536174]">
              {visibleProducts.length} {visibleProducts.length === 1 ? 'product' : 'products'} available to order
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#536174] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, size or SKU..."
                className="w-full pl-9 pr-14 py-2.5 bg-white border border-[#E1E8F0] rounded-xl text-sm text-[#102A56] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563D9] shadow-2xs"
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

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#536174] shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products"
                className="w-full sm:w-auto px-3 py-2.5 text-sm font-medium bg-white border border-[#E1E8F0] rounded-xl text-[#102A56] focus:outline-none focus:ring-2 focus:ring-[#2563D9] cursor-pointer shadow-2xs"
              >
                <option value="featured">By category</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Product Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category tabs */}
        {tabs.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[{ id: 'all', label: 'All Products', count: listedProducts.length }, ...tabs].map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition cursor-pointer border ${
                    isActive
                      ? 'bg-[#2563D9] text-white border-[#2563D9] shadow-2xs'
                      : 'bg-white text-[#536174] border-[#E1E8F0] hover:bg-[#EAF4FF] hover:text-[#2563D9]'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* Product Grid */}
      {visibleProducts.length === 0 ? (
        <div className="bg-[#F5F7FA] rounded-2xl border border-[#E1E8F0] p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 mx-auto flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#102A56]">
            {products.length === 0 ? 'Loading products...' : 'No matching water products found'}
          </h3>
          {products.length > 0 && (
            <>
              <p className="text-xs text-[#536174] max-w-sm mx-auto">Try a different search.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 bg-[#2563D9] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                Clear Search
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onViewDetails={onViewProductDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};
