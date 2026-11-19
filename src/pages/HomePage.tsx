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
import { Product, ProductVariant } from '../types/erp';
import { ProductCard } from '../components/ProductCard';
import { CustomerTestimonials } from '../components/CustomerTestimonials';
import { HeroProductShowcase } from '../components/HeroProductShowcase';
import regenerated500mlWaterImg from '../assets/images/regenerated_image_1794001325740.jpg';
import regenerated750mlWaterImg from '../assets/images/regenerated_image_1794001482217.jpg';
import regenerated1500mlWaterImg from '../assets/images/regenerated_image_1794001483099.jpg';

interface HomePageProps {
  products: Product[];
  onAddToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
  onViewProductDetails: (product: Product) => void;
  onNavigate: (tab: string) => void;
  onOpenTracking: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onAddToCart,
  onViewProductDetails,
  onNavigate,
  onOpenTracking,
}) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeFlyerImg, setActiveFlyerImg] = useState<string | null>(null);

  // Quick order drawer/modal state
  const [quickOrderOpen, setQuickOrderOpen] = useState(false);
  const [selectedQuickProdId, setSelectedQuickProdId] = useState('prod-dispenser-19l');
  const [quickQuantity, setQuickQuantity] = useState(2);
  const [quickCustomerName, setQuickCustomerName] = useState('');
  const [quickCustomerPhone, setQuickCustomerPhone] = useState('');
  const [quickCustomerAddress, setQuickCustomerAddress] = useState('');
  const [quickSubmitted, setQuickSubmitted] = useState(false);

  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  const handleQuickOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = products.find((p) => p.id === selectedQuickProdId) || products[0];
    const variant = prod.variants[0];
    onAddToCart(prod, variant, quickQuantity);
    setQuickSubmitted(true);
    setTimeout(() => {
      setQuickSubmitted(false);
      setQuickOrderOpen(false);
    }, 2000);
  };

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
                onQuickOrder={(productId) => {
                  setSelectedQuickProdId(productId);
                  setQuickOrderOpen(true);
                }}
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

        {/* 5 Responsive Tall Compact Cards matching reference screenshot */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {/* Card 1: 500ml Bottled Table Water */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-[#E1E8F0] shadow-2xs hover:shadow-md transition duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-full aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden bg-[#EAF4FF] mb-2.5 sm:mb-3.5 flex items-center justify-center">
                <img
                  src={regenerated500mlWaterImg}
                  alt="Table Water 500ml"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-[#102A56] leading-tight truncate sm:line-clamp-1">
                Table Water (500ml)
              </h3>
              <p className="text-[11px] sm:text-xs text-[#536174] mt-1 line-clamp-2 leading-relaxed">
                High-quality bottled table water for conferences, daily commute, and personal hydration.
              </p>
            </div>
            <div className="pt-2.5 sm:pt-3 flex items-center justify-between border-t border-[#E1E8F0] mt-2.5 sm:mt-3">
              <span className="text-[11px] sm:text-xs lg:text-[13px] font-bold text-[#2563D9]">₦1,800 / Pack</span>
              <button
                onClick={() => onNavigate('products')}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#EAF4FF] hover:bg-[#2563D9] text-[#2563D9] hover:text-white flex items-center justify-center transition cursor-pointer shrink-0"
                title="View Details"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: 750ml Active Sports Bottles */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-[#E1E8F0] shadow-2xs hover:shadow-md transition duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-full aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden bg-[#EAF4FF] mb-2.5 sm:mb-3.5 flex items-center justify-center">
                <img
                  src={regenerated750mlWaterImg}
                  alt="Sports Bottle 750ml"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-[#102A56] leading-tight truncate sm:line-clamp-1">
                Sports Bottle (750ml)
              </h3>
              <p className="text-[11px] sm:text-xs text-[#536174] mt-1 line-clamp-2 leading-relaxed">
                Ergonomic sports bottles engineered with optimal electrolyte balance for active workouts.
              </p>
            </div>
            <div className="pt-2.5 sm:pt-3 flex items-center justify-between border-t border-[#E1E8F0] mt-2.5 sm:mt-3">
              <span className="text-[11px] sm:text-xs lg:text-[13px] font-bold text-[#2563D9]">₦2,400 / Pack</span>
              <button
                onClick={() => onNavigate('products')}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#EAF4FF] hover:bg-[#2563D9] text-[#2563D9] hover:text-white flex items-center justify-center transition cursor-pointer shrink-0"
                title="View Details"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: 1.5L Family Bottles */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-[#E1E8F0] shadow-2xs hover:shadow-md transition duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-full aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden bg-[#EAF4FF] mb-2.5 sm:mb-3.5 flex items-center justify-center">
                <img
                  src={regenerated1500mlWaterImg}
                  alt="Family Bottle 1.5L"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-[#102A56] leading-tight truncate sm:line-clamp-1">
                Family Bottle (1.5L)
              </h3>
              <p className="text-[11px] sm:text-xs text-[#536174] mt-1 line-clamp-2 leading-relaxed">
                Generous pure table water bottles for dining tables, family wellness, and restaurants.
              </p>
            </div>
            <div className="pt-2.5 sm:pt-3 flex items-center justify-between border-t border-[#E1E8F0] mt-2.5 sm:mt-3">
              <span className="text-[11px] sm:text-xs lg:text-[13px] font-bold text-[#2563D9]">₦2,800 / Pack</span>
              <button
                onClick={() => onNavigate('products')}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#EAF4FF] hover:bg-[#2563D9] text-[#2563D9] hover:text-white flex items-center justify-center transition cursor-pointer shrink-0"
                title="View Details"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 4: 19L Dispenser Jar Refills */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-[#E1E8F0] shadow-2xs hover:shadow-md transition duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-full aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden bg-[#EAF4FF] mb-2.5 sm:mb-3.5 flex items-center justify-center">
                <img
                  src="/assets/aistudio/image_6cafc13e.png"
                  alt="Dispenser Jar 19L"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-[#102A56] leading-tight truncate sm:line-clamp-1">
                Dispenser Jar (19L)
              </h3>
              <p className="text-[11px] sm:text-xs text-[#536174] mt-1 line-clamp-2 leading-relaxed">
                Sterile, heavy-duty 5-gallon refill jars for corporate water dispensers and residences.
              </p>
            </div>
            <div className="pt-2.5 sm:pt-3 flex items-center justify-between border-t border-[#E1E8F0] mt-2.5 sm:mt-3">
              <span className="text-[11px] sm:text-xs lg:text-[13px] font-bold text-[#2563D9]">₦1,300 / Refill</span>
              <button
                onClick={() => onNavigate('products')}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#EAF4FF] hover:bg-[#2563D9] text-[#2563D9] hover:text-white flex items-center justify-center transition cursor-pointer shrink-0"
                title="View Details"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 5: Sachet Water Bundle */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-[#E1E8F0] shadow-2xs hover:shadow-md transition duration-200 flex flex-col justify-between group col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1">
            <div>
              <div className="w-full aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden bg-[#EAF4FF] mb-2.5 sm:mb-3.5 flex items-center justify-center">
                <img
                  src="/assets/aistudio/image_b039644a.png"
                  alt="Sachet Water Bags"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-[#102A56] leading-tight truncate sm:line-clamp-1">
                Sachet Water (20 Bags)
              </h3>
              <p className="text-[11px] sm:text-xs text-[#536174] mt-1 line-clamp-2 leading-relaxed">
                Micro-filtered, pristine sachet water bundles for bulk supply, canteens, and retailers.
              </p>
            </div>
            <div className="pt-2.5 sm:pt-3 flex items-center justify-between border-t border-[#E1E8F0] mt-2.5 sm:mt-3">
              <span className="text-[11px] sm:text-xs lg:text-[13px] font-bold text-[#2563D9]">₦400 / Bag</span>
              <button
                onClick={() => onNavigate('products')}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#EAF4FF] hover:bg-[#2563D9] text-[#2563D9] hover:text-white flex items-center justify-center transition cursor-pointer shrink-0"
                title="View Details"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
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

      {/* ================= CUSTOMER TESTIMONIALS (Recent Verified Feedback) ================= */}
      <CustomerTestimonials />

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
                    setSelectedQuickProdId('prod-dispenser-19l');
                    setQuickOrderOpen(true);
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

      {/* ================= MODAL: QUICK ORDER & DELIVERY ================= */}
      {quickOrderOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E1E8F0]">
            <div className="p-4 bg-[#102A56] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-[#2563D9]" />
                <span className="font-bold text-sm">Quick Water Booking & Dispatch</span>
              </div>
              <button
                onClick={() => setQuickOrderOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {quickSubmitted ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-[#102A56]">Added to Cart & Dispatched to ERP!</h4>
                <p className="text-xs text-[#536174]">
                  Our dispatch officers at Kubwa plant have received your order request.
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuickOrderSubmit} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#102A56] mb-1">Select Water Product</label>
                  <select
                    value={selectedQuickProdId}
                    onChange={(e) => setSelectedQuickProdId(e.target.value)}
                    className="w-full px-3 py-2.5 border border-[#E1E8F0] rounded-lg text-[#102A56] text-xs focus:ring-2 focus:ring-[#2563D9] focus:outline-none"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — ₦{(p.variants[0]?.price ?? 0).toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#102A56] mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={quickQuantity}
                    onChange={(e) => setQuickQuantity(parseInt(e.target.value, 10) || 1)}
                    className="w-full px-3 py-2.5 border border-[#E1E8F0] rounded-lg text-[#102A56] text-xs focus:ring-2 focus:ring-[#2563D9] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#102A56] mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={quickCustomerName}
                    onChange={(e) => setQuickCustomerName(e.target.value)}
                    placeholder="e.g. Alhaji Musa Garba"
                    className="w-full px-3 py-2.5 border border-[#E1E8F0] rounded-lg text-[#102A56] text-xs focus:ring-2 focus:ring-[#2563D9] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#102A56] mb-1">Phone Number (Hotline WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    value={quickCustomerPhone}
                    onChange={(e) => setQuickCustomerPhone(e.target.value)}
                    placeholder="+2348166399794"
                    className="w-full px-3 py-2.5 border border-[#E1E8F0] rounded-lg text-[#102A56] text-xs focus:ring-2 focus:ring-[#2563D9] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#102A56] mb-1">Delivery Address in Abuja</label>
                  <textarea
                    rows={2}
                    required
                    value={quickCustomerAddress}
                    onChange={(e) => setQuickCustomerAddress(e.target.value)}
                    placeholder="e.g. Kubwa Extension III, Abuja"
                    className="w-full px-3 py-2 border border-[#E1E8F0] rounded-lg text-[#102A56] text-xs focus:ring-2 focus:ring-[#2563D9] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#2563D9] hover:bg-[#1D4ED8] text-white font-semibold text-xs uppercase tracking-wider rounded-lg shadow-sm transition cursor-pointer"
                >
                  Confirm Quick Order
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
