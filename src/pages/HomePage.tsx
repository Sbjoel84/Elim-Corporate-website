import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  ArrowRight,
  CheckCircle2,
  Phone,
  Play,
  Microscope,
  FlaskConical,
  Filter,
  Users,
  CheckSquare,
  Headphones,
  Award,
  Sun,
  Droplet,
  X,
  Package,
  Sparkles,
  Maximize2,
  Globe,
  HeartHandshake,
  Check,
} from 'lucide-react';
import type { Product, ProductVariant } from '../../shared/types';
import { HOME_PRODUCT_IDS } from '../../shared/homeProducts';
import { ProductCard } from '../components/ProductCard';
import { HeroProductShowcase } from '../components/HeroProductShowcase';

interface HomePageProps {
  products: Product[];
  onAddToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
  onViewProductDetails: (product: Product) => void;
  onNavigate: (tab: string) => void;
  onOpenTracking: () => void;
  /** Opens the Book Order form, optionally with a product pre-selected. */
  onBookOrder: (productId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onAddToCart,
  onViewProductDetails,
  onNavigate,
  onOpenTracking,
  onBookOrder,
}) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeFlyerImg, setActiveFlyerImg] = useState<string | null>(null);

  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  // Same products, photos and prices as the Products page.
  const homeProducts = HOME_PRODUCT_IDS.flatMap((id) => products.filter((p) => p.id === id));

  return (
    <div className="w-full space-y-0 bg-white">
      {/* ================= SECTION 1: HERO (Header Navy Blue #102A56) ================= */}
      <section className="relative w-full bg-[#102A56] text-white pt-12 pb-20 lg:pt-16 lg:pb-24 border-b border-blue-950/60 overflow-hidden">
        {/* Subtle Ambient Radial Highlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,217,0.22),transparent_55%)] pointer-events-none" />

        <div className="relative w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Heading, Subheading & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Small Uppercase Introductory Label */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#60A5FA]"></span>
                <span className="text-blue-100 font-bold text-[11px] sm:text-xs tracking-wider uppercase">
                  NAFDAC Certified • ISO 9001:2015 Purity
                </span>
              </div>

              {/* Large Two-Tone Heading (48px–56px bold) */}
              <div className="space-y-1">
                <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-white leading-[1.12]">
                  Better Water.
                </h1>
                <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-[#60A5FA] leading-[1.12]">
                  Brighter Lives.
                </h2>
              </div>

              {/* Descriptive Body Paragraph */}
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl font-normal leading-relaxed">
                Elim Table Water is committed to extracting, purifying, and delivering high-quality natural drinking
                water that improves wellbeing and hydrates families, corporate offices, and healthcare institutions across Nigeria.
              </p>

              {/* Two CTA Buttons: Primary White/Contrast + Secondary Glass Outline */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate('products')}
                  className="px-6 py-3.5 bg-white hover:bg-[#EAF4FF] text-[#102A56] text-sm font-bold rounded-lg shadow-md transition transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                >
                  <span>Our Products</span>
                  <ArrowRight className="w-4 h-4 text-[#2563D9]" />
                </button>

                <button
                  onClick={() => onNavigate('about')}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 text-sm font-semibold rounded-lg backdrop-blur-md shadow-2xs transition transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                >
                  <span>About Us</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Social Proof Trust Metric */}
              <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#60A5FA] shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">
                    Trusted by Healthcare Facilities, Corporate Suites & 10,000+ Homes
                  </p>
                  <p className="text-[11px] text-slate-300">
                    Direct daily factory fleet delivery across Kubwa, Bwari, Dutse & Abuja FCT
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Animated Elim Table Water Products Showcase (Sachet, Bottled & Dispenser) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <HeroProductShowcase
                onOpenFlyer={(imgUrl) => setActiveFlyerImg(imgUrl)}
                onQuickOrder={(productId) => onBookOrder(productId)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 2: 4-CARD VALUE PROPOSITION BAR (Reference Screenshot Style) ================= */}
      <section className="w-full py-12 px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 bg-white">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Quality First */}
          <div className="bg-white rounded-2xl p-6 border border-[#E1E8F0] shadow-2xs hover:shadow-md hover:border-[#2563D9]/40 transition duration-200 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#EAF4FF] flex items-center justify-center text-[#2563D9]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[#102A56]">Quality First</h3>
            <p className="text-xs sm:text-[13px] text-[#536174] leading-relaxed">
              We follow global standards to ensure the highest quality in every product through rigorous 7-stage filtration.
            </p>
          </div>

          {/* Card 2: Innovation Driven */}
          <div className="bg-white rounded-2xl p-6 border border-[#E1E8F0] shadow-2xs hover:shadow-md hover:border-[#2563D9]/40 transition duration-200 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <FlaskConical className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[#102A56]">Innovation Driven</h3>
            <p className="text-xs sm:text-[13px] text-[#536174] leading-relaxed">
              Continuous innovation in deep aquifer water treatment and sterile automated cleanroom bottling.
            </p>
          </div>

          {/* Card 3: Global Reach / Fleet Distribution */}
          <div className="bg-white rounded-2xl p-6 border border-[#E1E8F0] shadow-2xs hover:shadow-md hover:border-[#2563D9]/40 transition duration-200 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[#102A56]">Prompt Distribution</h3>
            <p className="text-xs sm:text-[13px] text-[#536174] leading-relaxed">
              Delivering trusted table water to homes, corporate offices, hotels, and banquets across Abuja FCT.
            </p>
          </div>

          {/* Card 4: Patient Care / Healthier Living */}
          <div className="bg-white rounded-2xl p-6 border border-[#E1E8F0] shadow-2xs hover:shadow-md hover:border-[#2563D9]/40 transition duration-200 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[#102A56]">Health & Hydration</h3>
            <p className="text-xs sm:text-[13px] text-[#536174] leading-relaxed">
              Our mission is to enhance lives through safe, refreshing, and affordable mineral hydration every day.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SECTION 3: PRODUCTS SHOWCASE (OUR PRODUCTS matching Medivan cards) ================= */}
      <section className="w-full py-10 sm:py-16 px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24 bg-[#F5F7FA] border-y border-[#E1E8F0]">
        <div className="w-full mb-6 sm:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
          <div className="space-y-1">
            <span className="text-[#2563D9] font-bold text-xs uppercase tracking-widest block">
              OUR PRODUCTS
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-[#102A56] tracking-tight">
              Quality Water Solutions for a Healthier Tomorrow
            </h2>
          </div>

          <button
            onClick={() => onNavigate('products')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#2563D9] hover:text-[#1D4ED8] transition cursor-pointer shrink-0 self-start sm:self-auto"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Product & price cards (products listed in shared/homeProducts.ts) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {homeProducts.map((item) => {
            const variant = item.variants.find((v) => v.isDefault) ?? item.variants[0];
            return (
            <div
              key={item.id}
              className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-[#E1E8F0] shadow-2xs hover:shadow-md transition duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="w-full aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden bg-[#EAF4FF] mb-2.5 sm:mb-3.5 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-[#102A56] leading-tight">
                  {item.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#536174] mt-1">{item.category}</p>
              </div>
              <div className="pt-2.5 sm:pt-3 flex items-center justify-between border-t border-[#E1E8F0] mt-2.5 sm:mt-3">
                <span className="text-[11px] sm:text-xs lg:text-[13px] font-bold text-[#2563D9]">
                  ₦{variant.price.toLocaleString()} / {variant.unitOfMeasure}
                </span>
                <button
                  onClick={() => onNavigate('products')}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#EAF4FF] hover:bg-[#2563D9] text-[#2563D9] hover:text-white flex items-center justify-center transition cursor-pointer shrink-0"
                  title="View Details"
                  aria-label={`View ${item.name}`}
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            );
          })}
        </div>
      </section>

      {/* ================= SECTION 4: ROYAL BLUE HORIZONTAL STATISTICS SECTION ================= */}
      <section className="w-full py-12 px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 bg-white">
        <div className="w-full rounded-2xl bg-gradient-to-r from-[#102A56] via-[#1D4ED8] to-[#2563D9] p-8 sm:p-10 text-white shadow-md">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-center text-center">
            {/* Stat 1 */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center text-white mb-1">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-3xl sm:text-4xl font-bold tracking-tight">15,000+</span>
              <span className="text-xs text-blue-100 font-medium">Bottles Produced / Hour</span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center text-white mb-1">
                <FlaskConical className="w-6 h-6" />
              </div>
              <span className="text-3xl sm:text-4xl font-bold tracking-tight">7 Stages</span>
              <span className="text-xs text-blue-100 font-medium">Reverse Osmosis & Ozone</span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center text-white mb-1">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-3xl sm:text-4xl font-bold tracking-tight">6,950+</span>
              <span className="text-xs text-blue-100 font-medium">Active Clients & Partners</span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center text-white mb-1">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-3xl sm:text-4xl font-bold tracking-tight">10+ Years</span>
              <span className="text-xs text-blue-100 font-medium">Excellence in Abuja FCT</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 5: RESEARCH & DEVELOPMENT / QUALITY OPERATIONS ================= */}
      <section className="w-full py-16 px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 bg-[#F5F7FA] border-t border-[#E1E8F0]">
        <div className="w-full bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E1E8F0] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Factory cleanroom / Experience flyer frame */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md aspect-[1/1.05] rounded-2xl overflow-hidden shadow-md border-4 border-[#F5F7FA] group">
                <img
                  src="/assets/aistudio/image_b039644a.png"
                  alt="Elim Quality Operations Flyer"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setActiveFlyerImg('/assets/aistudio/image_b039644a.png')}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-[#102A56]/80 text-white text-[11px] font-semibold backdrop-blur-md shadow-sm hover:bg-[#102A56] transition"
                >
                  Enlarge Flyer
                </button>
              </div>
            </div>

            {/* Right: R&D & Quality Operations Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-1">
                <span className="text-[#2563D9] font-bold text-xs uppercase tracking-widest block">
                  RESEARCH & DEVELOPMENT • QUALITY ASSURANCE
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#102A56] tracking-tight leading-tight">
                  Innovating Today for a Healthier Tomorrow
                </h2>
              </div>

              <p className="text-sm text-[#536174] leading-relaxed">
                Our advanced water testing facilities at Plot No. 188A, FCDA Scheme Extension III, Kubwa, Abuja,
                operate with strict microbiological and physical testing protocols. Every batch undergoes computerized
                reverse osmosis, dual UV-C irradiation, and ozone stabilization before distribution.
              </p>

              {/* Four Checkpoint Items with Minimalist Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF4FF] text-[#2563D9] flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#102A56]">
                    Advanced Cleanroom Facilities
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF4FF] text-[#2563D9] flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#102A56]">
                    Certified Water Quality Analysts
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF4FF] text-[#2563D9] flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#102A56]">
                    Multi-Barrier Reverse Osmosis
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF4FF] text-[#2563D9] flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#102A56]">
                    GPS-Tracked Abuja Fleet
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('operations')}
                  className="px-6 py-3 bg-[#2563D9] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                >
                  <span>Explore Our Operations</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 6: HORIZONTAL CTA BANNER (Partner With Us) ================= */}
      <section className="w-full py-10 px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 bg-[#F5F7FA] border-t border-[#E1E8F0]">
        <div className="w-full rounded-2xl bg-[#102A56] p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-blue-300 shrink-0 hidden sm:flex">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                Partner With Us for a Healthier World
              </h3>
              <p className="text-xs sm:text-sm text-blue-200">
                We are always open to new corporate partnerships, institutional supply contracts, and distributor bookings.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 bg-[#2563D9] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              <span>Contact Us Today</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= MODAL: FULL FLYER LIGHTBOX ================= */}
      {activeFlyerImg && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="relative max-w-2xl max-h-[94vh] w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-blue-500/30 flex flex-col">
            <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2563D9]" />
                <span className="font-bold text-xs sm:text-sm text-white">
                  Elim Table Water — Purely Refreshing, Naturally Healthy
                </span>
              </div>
              <button
                onClick={() => setActiveFlyerImg(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer transition hover:bg-slate-800"
                aria-label="Close flyer preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-4 flex justify-center bg-slate-950/70 flex-1">
              <img
                src={activeFlyerImg}
                alt="Elim Table Water Official Product Flyer"
                className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </div>

            <div className="p-3.5 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <span className="text-[11px] sm:text-xs text-slate-400">
                Plot No. 188A, FCDA Scheme Extension III, Kubwa, Abuja • Hotline: +2348166399794
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveFlyerImg(null);
                    onBookOrder('prod-dispenser-19l');
                  }}
                  className="px-4 py-2 bg-[#2563D9] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-lg transition shadow-xs cursor-pointer"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
