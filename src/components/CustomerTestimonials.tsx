import React, { useEffect, useState, useMemo } from 'react';
import {
  Star,
  Quote,
  CheckCircle2,
  MessageSquarePlus,
  X,
  Building2,
  Home,
  Stethoscope,
  Truck,
  Sparkles,
} from 'lucide-react';
import { CustomerTestimonial, TestimonialCategory } from '../types/erp';
import { erpStorage } from '../services/erpStorage';

const CATEGORY_OPTIONS: ('ALL' | TestimonialCategory)[] = [
  'ALL',
  'Home Subscriber',
  'Corporate Client',
  'Healthcare Facility',
  'Authorized Distributor',
];

const PRODUCT_OPTIONS = [
  '19L Dispenser Bottle Refills',
  '500ml Table Water (Cartons)',
  '750ml Sports Bottles',
  '1.5L Family Bottles',
  'Sachet Water Bundles',
];

function formatRelativeDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return 'Recently';
  const now = Date.now();
  const diffMs = now - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString('en-NG', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getCategoryIcon(category: TestimonialCategory) {
  switch (category) {
    case 'Healthcare Facility':
      return <Stethoscope className="w-3.5 h-3.5" />;
    case 'Corporate Client':
      return <Building2 className="w-3.5 h-3.5" />;
    case 'Authorized Distributor':
      return <Truck className="w-3.5 h-3.5" />;
    case 'Home Subscriber':
    default:
      return <Home className="w-3.5 h-3.5" />;
  }
}

export const CustomerTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<CustomerTestimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | TestimonialCategory>('ALL');
  const [showAll, setShowAll] = useState<boolean>(false);

  // Feedback submission modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState('');
  const [roleOrLocation, setRoleOrLocation] = useState('');
  const [category, setCategory] = useState<TestimonialCategory>('Home Subscriber');
  const [productPurchased, setProductPurchased] = useState(PRODUCT_OPTIONS[0]);
  const [rating, setRating] = useState<number>(5);
  const [feedback, setFeedback] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadTestimonials = async () => {
      setLoading(true);
      const recentData = await erpStorage.fetchRecentTestimonials();
      if (isMounted) {
        setTestimonials(recentData);
        setLoading(false);
      }
    };

    loadTestimonials();

    const handleStorageUpdate = () => {
      setTestimonials(erpStorage.getTestimonials());
    };
    window.addEventListener('elim_erp_updated', handleStorageUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener('elim_erp_updated', handleStorageUpdate);
    };
  }, []);

  const averageRating = useMemo(() => {
    if (testimonials.length === 0) return '5.0';
    const sum = testimonials.reduce((acc, item) => acc + item.rating, 0);
    return (sum / testimonials.length).toFixed(1);
  }, [testimonials]);

  const filteredTestimonials = useMemo(() => {
    const base =
      selectedCategory === 'ALL'
        ? testimonials
        : testimonials.filter((item) => item.category === selectedCategory);
    return showAll ? base : base.slice(0, 3);
  }, [testimonials, selectedCategory, showAll]);

  const totalCategoryMatches = useMemo(() => {
    return selectedCategory === 'ALL'
      ? testimonials.length
      : testimonials.filter((item) => item.category === selectedCategory).length;
  }, [testimonials, selectedCategory]);

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !roleOrLocation.trim() || !feedback.trim()) return;

    erpStorage.addTestimonial({
      customerName: customerName.trim(),
      roleOrLocation: roleOrLocation.trim(),
      category,
      rating,
      feedback: feedback.trim(),
      productPurchased,
    });

    setSubmittedSuccess(true);
    setSelectedCategory('ALL');
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsModalOpen(false);
      setCustomerName('');
      setRoleOrLocation('');
      setCategory('Home Subscriber');
      setProductPurchased(PRODUCT_OPTIONS[0]);
      setRating(5);
      setFeedback('');
    }, 1500);
  };

  return (
    <section className="w-full py-14 sm:py-16 px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 bg-[#F5F7FA] border-t border-[#E1E8F0]">
      <div className="w-full space-y-8">
        {/* Top Section Header & Aggregate Rating Summary */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[#2563D9] font-bold text-xs uppercase tracking-widest block">
              VERIFIED CUSTOMER FEEDBACK
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#102A56] tracking-tight leading-tight">
              Trusted Across Abuja Homes, Clinics & Enterprises
            </h2>
            <p className="text-xs sm:text-sm text-[#536174] leading-relaxed">
              Recent feedback from verified subscribers, healthcare facilities, corporate offices,
              and regional distributors receiving daily factory-direct water deliveries.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0">
            {/* Rating Summary Pill */}
            <div className="bg-white border border-[#E1E8F0] rounded-xl px-4 py-2.5 shadow-2xs flex items-center gap-3">
              <div className="flex items-center gap-0.5 text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="border-l border-[#E1E8F0] pl-3">
                <span className="text-sm font-bold text-[#102A56]">{averageRating} / 5.0</span>
                <span className="text-[11px] text-[#536174] block leading-none mt-0.5">
                  Based on {testimonials.length} recent reviews
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-3 bg-[#2563D9] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Share Feedback</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {CATEGORY_OPTIONS.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setShowAll(false);
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#102A56] text-white shadow-2xs'
                  : 'bg-white text-[#536174] border border-[#E1E8F0] hover:bg-[#EAF4FF] hover:text-[#2563D9]'
              }`}
            >
              {cat === 'ALL' ? 'All Recent Feedback' : cat}
            </button>
          ))}
        </div>

        {/* Loading Skeleton vs Testimonials Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#E1E8F0] shadow-2xs space-y-4 animate-pulse"
              >
                <div className="flex items-center justify-between">
                  <div className="h-4 w-24 bg-slate-200 rounded" />
                  <div className="h-5 w-20 bg-slate-200 rounded-md" />
                </div>
                <div className="space-y-2">
                  <div className="h-3.5 w-full bg-slate-200 rounded" />
                  <div className="h-3.5 w-5/6 bg-slate-200 rounded" />
                  <div className="h-3.5 w-4/6 bg-slate-200 rounded" />
                </div>
                <div className="pt-4 border-t border-[#E1E8F0] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200" />
                  <div className="space-y-1.5">
                    <div className="h-3.5 w-32 bg-slate-200 rounded" />
                    <div className="h-3 w-24 bg-slate-200 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredTestimonials.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 border border-[#E1E8F0] text-center space-y-2">
            <p className="text-sm font-semibold text-[#102A56]">
              No customer reviews found in this category yet.
            </p>
            <p className="text-xs text-[#536174]">
              Select another category or share your experience with Elim Table Water.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredTestimonials.map((item) => {
              const initials = item.customerName
                .split(' ')
                .filter(Boolean)
                .slice(0, 2)
                .map((part) => part[0]?.toUpperCase() || '')
                .join('');

              return (
                <article
                  key={item.id}
                  className="bg-white rounded-2xl p-6 border border-[#E1E8F0] shadow-2xs hover:shadow-md hover:border-[#2563D9]/40 transition duration-200 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3.5">
                    {/* Top Row: Stars & Category Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-0.5" aria-label={`${item.rating} out of 5 stars`}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= item.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-200 fill-slate-200'
                            }`}
                          />
                        ))}
                      </div>

                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2563D9] bg-[#EAF4FF] px-2.5 py-1 rounded-md border border-blue-100">
                        {getCategoryIcon(item.category)}
                        <span>{item.category}</span>
                      </span>
                    </div>

                    {/* Feedback Quote */}
                    <div className="relative">
                      <Quote className="w-6 h-6 text-[#EAF4FF] fill-[#EAF4FF] absolute -top-1 -left-1 pointer-events-none" />
                      <p className="relative text-xs sm:text-[13px] text-[#536174] leading-relaxed pl-1">
                        "{item.feedback}"
                      </p>
                    </div>
                  </div>

                  {/* Bottom Customer Meta & Verified Tag */}
                  <div className="pt-4 border-t border-[#E1E8F0] space-y-3">
                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="font-medium text-[#102A56] bg-[#F5F7FA] px-2.5 py-1 rounded-md border border-[#E1E8F0] truncate">
                        {item.productPurchased}
                      </span>
                      <span className="text-[#536174] shrink-0">
                        {formatRelativeDate(item.submittedAt)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-[#102A56] text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {initials || 'EW'}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-[#102A56] truncate">
                            {item.customerName}
                          </h3>
                          <p className="text-[11px] text-[#536174] truncate">{item.roleOrLocation}</p>
                        </div>
                      </div>

                      {item.verified && (
                        <span
                          className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md shrink-0"
                          title="Verified Elim Table Water Customer"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Verified</span>
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Expand / Collapse Remaining Recent Reviews */}
        {!loading && totalCategoryMatches > 3 && (
          <div className="flex justify-center pt-1">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="px-5 py-2.5 bg-white hover:bg-[#EAF4FF] text-[#2563D9] border border-[#E1E8F0] hover:border-[#2563D9]/40 rounded-xl text-xs font-semibold shadow-2xs transition cursor-pointer"
            >
              {showAll
                ? 'Show Fewer Reviews'
                : `View All ${totalCategoryMatches} Recent Reviews`}
            </button>
          </div>
        )}
      </div>

      {/* ================= MODAL: SUBMIT CUSTOMER FEEDBACK ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E1E8F0]">
            <div className="p-4 bg-[#102A56] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#60A5FA]" />
                <span className="font-bold text-sm">Share Your Customer Experience</span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-300 hover:text-white rounded-lg cursor-pointer"
                aria-label="Close feedback modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedSuccess ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-[#102A56]">Thank You for Your Feedback!</h4>
                <p className="text-xs text-[#536174]">
                  Your review has been published to our recent customer feedback feed.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitFeedback} className="p-6 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#102A56] mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Chinedu Okeke"
                      className="w-full px-3 py-2.5 border border-[#E1E8F0] rounded-lg text-[#102A56] text-xs focus:ring-2 focus:ring-[#2563D9] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#102A56] mb-1">
                      Company or Abuja Area
                    </label>
                    <input
                      type="text"
                      required
                      value={roleOrLocation}
                      onChange={(e) => setRoleOrLocation(e.target.value)}
                      placeholder="e.g. Kubwa Phase 2"
                      className="w-full px-3 py-2.5 border border-[#E1E8F0] rounded-lg text-[#102A56] text-xs focus:ring-2 focus:ring-[#2563D9] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#102A56] mb-1">Customer Type</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as TestimonialCategory)}
                      className="w-full px-3 py-2.5 border border-[#E1E8F0] rounded-lg text-[#102A56] text-xs focus:ring-2 focus:ring-[#2563D9] focus:outline-none bg-white"
                    >
                      <option value="Home Subscriber">Home Subscriber</option>
                      <option value="Corporate Client">Corporate Client</option>
                      <option value="Healthcare Facility">Healthcare Facility</option>
                      <option value="Authorized Distributor">Authorized Distributor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#102A56] mb-1">
                      Product Ordered
                    </label>
                    <select
                      value={productPurchased}
                      onChange={(e) => setProductPurchased(e.target.value)}
                      className="w-full px-3 py-2.5 border border-[#E1E8F0] rounded-lg text-[#102A56] text-xs focus:ring-2 focus:ring-[#2563D9] focus:outline-none bg-white"
                    >
                      {PRODUCT_OPTIONS.map((prod) => (
                        <option key={prod} value={prod}>
                          {prod}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#102A56] mb-1.5">Rating</label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 rounded hover:bg-[#F5F7FA] transition cursor-pointer"
                        aria-label={`Rate ${star} stars`}
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-xs font-semibold text-[#536174]">
                      {rating} / 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#102A56] mb-1">Your Feedback</label>
                  <textarea
                    rows={3}
                    required
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us about water taste, packaging, or delivery timeliness..."
                    className="w-full px-3 py-2 border border-[#E1E8F0] rounded-lg text-[#102A56] text-xs focus:ring-2 focus:ring-[#2563D9] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#2563D9] hover:bg-[#1D4ED8] text-white font-semibold text-xs uppercase tracking-wider rounded-lg shadow-sm transition cursor-pointer"
                >
                  Publish Feedback
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
