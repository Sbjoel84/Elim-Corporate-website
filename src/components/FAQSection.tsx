import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  HelpCircle,
  Search,
  ShoppingCart,
  Droplets,
  Truck,
  Phone,
  MessageSquare,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export interface FAQItem {
  id: string;
  category: 'ordering' | 'quality' | 'delivery';
  question: string;
  answer: string | React.ReactNode;
}

export const FAQ_DATA: FAQItem[] = [
  // Ordering & Booking
  {
    id: 'order-how-to-place',
    category: 'ordering',
    question: 'How do I place an order for bottled, sachet, or 18.9L dispenser water?',
    answer: (
      <div className="space-y-2">
        <p>You can order Elim Table Water in three convenient ways:</p>
        <ol className="list-decimal list-inside space-y-1 text-xs">
          <li><strong>Online Booking Desk:</strong> Select products on our website, adjust quantities in your cart, and submit your delivery schedule. No immediate payment is required.</li>
          <li><strong>Direct WhatsApp Hotline:</strong> Message our commercial order desk directly at <a href="https://wa.me/2348166399794" target="_blank" rel="noreferrer" className="text-[#2563D9] font-bold hover:underline">+2348166399794</a> for instant confirmation.</li>
          <li><strong>Factory Collection:</strong> Walk directly into our Kubwa plant loading docks (Plot No. 188A, FCDA Scheme Extension III, Kubwa, Abuja) for instant vehicle loading.</li>
        </ol>
      </div>
    ),
  },
  {
    id: 'order-moq',
    category: 'ordering',
    question: 'What is the minimum order quantity (MOQ) for doorstep delivery?',
    answer:
      'For residential and corporate doorstep delivery within Abuja, our minimum order quantity is 2 refill dispenser jars (18.9L) or 5 packs of bottled/sachet water. Orders of ₦150,000 and above qualify for completely free factory fleet truck delivery across Abuja FCT.',
  },
  {
    id: 'order-bottle-swap',
    category: 'ordering',
    question: 'Can I swap my existing 18.9L dispenser bottles from another brand?',
    answer:
      'Yes! We accept standard 19-litre (5-gallon) food-grade polycarbonate bottles in good, clean condition for direct swap. When our fleet driver delivers your order, they will inspect and take your empty bottles and swap them with freshly sanitized, hermetically sealed Elim Table Water jars.',
  },
  {
    id: 'order-tracking',
    category: 'ordering',
    question: 'How do I track the progress of my order in real time?',
    answer:
      'Every online order receives a unique Booking Reference (e.g. ELM-WEB-2026-000101). Click "Track Order" in our navigation bar or footer, enter your reference code and contact phone number, and you can view your real-time status across ERP Desk Review, Warehouse Stock Allocation, Dispatch Loading, and Fleet Transit.',
  },
  {
    id: 'order-payment',
    category: 'ordering',
    question: 'What payment methods do you accept?',
    answer:
      'We accept bank transfer upon invoice confirmation, corporate cheque (for pre-cleared registered corporate accounts), POS terminal payment on delivery, and cash at the factory collection desk. We never charge your card online prior to factory stock confirmation.',
  },

  // Water Quality & Purity
  {
    id: 'quality-filtration-process',
    category: 'quality',
    question: 'What purification and filtration technology does Elim Water use?',
    answer:
      'Elim Table Water is purified through a computerized 7-stage industrial train: (1) Deep aquifer high-pressure extraction, (2) Multi-media quartz sand and sediment filtration, (3) Activated coconut carbon adsorption to eliminate odors and organics, (4) Dual-pass industrial Reverse Osmosis (RO) membranes removing 99.9% of dissolved solids, (5) Controlled remineralization with essential electrolytes, (6) Germicidal UV-C light sterilization, and (7) Medical-grade ozone (O3) micro-bubble stabilization for lasting freshness.',
  },
  {
    id: 'quality-nafdac-certification',
    category: 'quality',
    question: 'Is Elim Table Water certified by NAFDAC and Nigerian health regulators?',
    answer:
      'Yes. Elim Table Water is registered with NAFDAC under Registration Number 01-8422 and carries the SON MANCAP certification (No. FT-31609). We strictly conform to the Standards Organisation of Nigeria (SON) NIS 306 benchmarks and World Health Organization (WHO) drinking water standards.',
  },
  {
    id: 'quality-ph-minerals',
    category: 'quality',
    question: 'What are the pH and mineral levels of Elim Table Water?',
    answer:
      'Our water is naturally alkaline-balanced with an optimal physiological pH between 7.4 and 7.5. It maintains a light, crisp Total Dissolved Solids (TDS) reading between 78 and 85 ppm, enriched with natural Calcium, Magnesium, and Potassium, with 0.00 CFU/100ml total coliforms.',
  },
  {
    id: 'quality-hygiene-bottles',
    category: 'quality',
    question: 'How do you clean and sterilize 18.9L reusable dispenser jars?',
    answer:
      'Before every refill, each jar undergoes automated high-pressure interior caustic scrubbing, pressurized hot water sterilization, food-grade antimicrobial sanitization, and a final rinse with pure RO water in our cleanroom line. Jars are sealed with tamper-evident induction cap seals.',
  },

  // Delivery Zones & Logistics
  {
    id: 'delivery-zones-covered',
    category: 'delivery',
    question: 'Which delivery zones and locations across Abuja do you cover?',
    answer: (
      <div className="space-y-1.5">
        <p>Our factory fleet trucks deliver daily to all Abuja districts, including:</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
          <li>• <strong>Kubwa, Dutse & Bwari Zone</strong> (1-2 hr rapid turnaround)</li>
          <li>• <strong>Gwarinpa, Kado, Jabi & Utako</strong></li>
          <li>• <strong>Maitama, Asokoro, Wuse 1 & 2, Central Area</strong></li>
          <li>• <strong>Apo, Gudu, Guzape & Lokogoma</strong></li>
          <li>• <strong>Lugbe, Airport Road & Idu Industrial</strong></li>
          <li>• <strong>Suleja & Madalla</strong> (Niger State border corridor)</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'delivery-timeframe',
    category: 'delivery',
    question: 'What is the standard delivery timeframe after placing an order?',
    answer:
      'Standard residential and office deliveries in the Kubwa, Dutse, and Bwari axis are completed within 2 to 4 hours. Deliveries to wider Abuja municipal districts are fulfilled same-day or within scheduled morning (8 AM - 12 PM) and afternoon (1 PM - 5 PM) delivery windows.',
  },
  {
    id: 'delivery-factory-pickup',
    category: 'delivery',
    question: 'Can I pick up my order directly from the Kubwa bottling plant?',
    answer:
      'Yes, factory collection is free of delivery fees. Select "Factory Collection" at checkout. Our loading docks at Plot No. 188A, FCDA Scheme Extension III, Kubwa (Opposite KAS Guest House, by Power Station) are open Monday to Saturday from 7:00 AM to 6:00 PM. Our warehouse logistics team assists with vehicle loading.',
  },
  {
    id: 'delivery-bulk-corporate',
    category: 'delivery',
    question: 'Do you offer scheduled weekly delivery contracts for hotels and corporate suites?',
    answer:
      'Yes. We operate scheduled standing order routes for banks, embassies, healthcare facilities, hotels, and schools. We provide dedicated dispenser maintenance, priority dispatch, and tiered monthly invoicing. Contact our corporate desk at info@elimtablewater.com to set up a corporate account.',
  },
];

interface FAQSectionProps {
  defaultCategory?: 'all' | 'ordering' | 'quality' | 'delivery';
  showCategoryFilters?: boolean;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  defaultCategory = 'all',
  showCategoryFilters = true,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'ordering' | 'quality' | 'delivery'>(
    defaultCategory
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<string[]>(['order-how-to-place', 'quality-filtration-process']);

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        (typeof item.answer === 'string' && item.answer.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section className="w-full py-12 px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 bg-white" id="faq">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF4FF] border border-[#2563D9]/20 shadow-2xs">
          <HelpCircle className="w-3.5 h-3.5 text-[#2563D9]" />
          <span className="text-[#2563D9] font-bold text-xs uppercase tracking-wider">
            Frequently Asked Questions
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#102A56] tracking-tight">
          Everything You Need to Know About Elim Water
        </h2>
        <p className="text-xs sm:text-sm text-[#536174] max-w-2xl mx-auto leading-relaxed">
          Clear answers regarding our online ordering procedure, 7-stage purification standards, NAFDAC certifications, and Abuja fleet delivery zones.
        </p>

        {/* Search Bar */}
        <div className="pt-3 max-w-md mx-auto">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[#536174] absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. swap, TDS, Kubwa, minimum order)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#F5F7FA] border border-[#E1E8F0] rounded-xl text-[#102A56] placeholder-[#536174]/70 focus:outline-none focus:ring-2 focus:ring-[#2563D9] focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-xs text-[#536174] hover:text-[#102A56]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        {showCategoryFilters && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#2563D9] text-white shadow-2xs'
                  : 'bg-[#F5F7FA] text-[#536174] hover:bg-[#EAF4FF] hover:text-[#2563D9] border border-[#E1E8F0]'
              }`}
            >
              All Inquiries ({FAQ_DATA.length})
            </button>
            <button
              onClick={() => setActiveCategory('ordering')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                activeCategory === 'ordering'
                  ? 'bg-[#2563D9] text-white shadow-2xs'
                  : 'bg-[#F5F7FA] text-[#536174] hover:bg-[#EAF4FF] hover:text-[#2563D9] border border-[#E1E8F0]'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Ordering & Booking</span>
            </button>
            <button
              onClick={() => setActiveCategory('quality')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                activeCategory === 'quality'
                  ? 'bg-[#2563D9] text-white shadow-2xs'
                  : 'bg-[#F5F7FA] text-[#536174] hover:bg-[#EAF4FF] hover:text-[#2563D9] border border-[#E1E8F0]'
              }`}
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>Water Quality & Safety</span>
            </button>
            <button
              onClick={() => setActiveCategory('delivery')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                activeCategory === 'delivery'
                  ? 'bg-[#2563D9] text-white shadow-2xs'
                  : 'bg-[#F5F7FA] text-[#536174] hover:bg-[#EAF4FF] hover:text-[#2563D9] border border-[#E1E8F0]'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Delivery Zones & Pickup</span>
            </button>
          </div>
        )}
      </div>

      {/* Accordion List Container */}
      <div className="max-w-4xl mx-auto space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center bg-[#F5F7FA] rounded-2xl border border-[#E1E8F0] space-y-2">
            <HelpCircle className="w-8 h-8 text-[#536174] mx-auto opacity-60" />
            <p className="text-sm font-semibold text-[#102A56]">No matching questions found</p>
            <p className="text-xs text-[#536174]">
              Try searching with different keywords or switch categories above.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-2 px-3 py-1.5 bg-[#2563D9] text-white text-xs font-semibold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            const categoryBadge =
              faq.category === 'ordering'
                ? { label: 'Ordering', bg: 'bg-blue-50 text-blue-700 border-blue-200' }
                : faq.category === 'quality'
                ? { label: 'Purity & Quality', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
                : { label: 'Delivery Zone', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' };

            return (
              <div
                key={faq.id}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#2563D9]/40 bg-white shadow-xs'
                    : 'border-[#E1E8F0] bg-white hover:border-slate-300'
                }`}
              >
                {/* Question Row */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-4 sm:p-5 flex items-start justify-between gap-4 text-left cursor-pointer transition select-none"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1.5 flex-1 pr-2">
                    <span
                      className={`text-[15px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border inline-block ${categoryBadge.bg}`}
                    >
                      {categoryBadge.label}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-[#102A56] leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 mt-1 ${
                      isOpen
                        ? 'bg-[#2563D9] text-white rotate-180 shadow-2xs'
                        : 'bg-[#F5F7FA] text-[#536174] hover:bg-[#EAF4FF] hover:text-[#2563D9]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Answer Content */}
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-0 text-xs sm:text-sm text-[#536174] leading-relaxed border-t border-[#E1E8F0]/60 mt-1 animate-in fade-in duration-200">
                    <div className="pt-3">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Helpful Support Contact Banner */}
      <div className="max-w-4xl mx-auto mt-10 bg-[#EAF4FF] rounded-2xl p-6 sm:p-8 border border-[#2563D9]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <h4 className="text-base sm:text-lg font-bold text-[#102A56]">
            Have a question that is not answered here?
          </h4>
          <p className="text-xs sm:text-[16px] text-[#536174] max-w-xl">
            Our customer care desk at Kubwa plant is available 6 days a week to clarify custom bulk event volumes, distributor margins, and contract terms.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href="https://wa.me/2348166399794?text=Hello%20Elim%20Water,%20I%20have%20an%20inquiry%20regarding%20orders%20and%20deliveries"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg shadow-sm transition"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href="tel:+2348166399794"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2563D9] hover:bg-[#1D4ED8] text-white font-semibold text-xs rounded-lg shadow-sm transition"
          >
            <Phone className="w-4 h-4" />
            <span>Call Hotline</span>
          </a>
        </div>
      </div>
    </section>
  );
};
