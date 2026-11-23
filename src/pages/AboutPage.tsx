import React from 'react';
import { ShieldCheck, Award, ArrowRight } from 'lucide-react';
import { CompanyProfile, ServicesAndLocation } from '../components/AboutSections';
import { FAQSection } from '../components/FAQSection';

interface AboutPageProps {
  onNavigate: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 pb-20 bg-white">
      {/* Header Banner - Corporate Navy #102A56 with Team Overlay */}
      <section className="relative overflow-hidden bg-[#102A56] text-white min-h-[420px] sm:min-h-[520px] lg:min-h-[580px] py-24 sm:py-32 lg:py-40 px-4 sm:px-8 flex items-center justify-center text-center">
        <img
          src="/assets/aistudio/ESS07806_7a78374e.jpg"
          alt="Elim Table Water Team Members"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-[center_40%] pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#102A56]/55 via-[#0F2750]/45 to-[#0D2144]/65 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <span className="inline-block text-[15px] font-bold uppercase tracking-wider text-blue-100 bg-[#102A56]/60 backdrop-blur-xs border border-white/25 px-3.5 py-1 rounded-full shadow-xs">
            Our Legacy & Standards
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-md">
            About Elim Table Water
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-white/95 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            Founded on the biblical symbol of Elim—an oasis of seventy palm trees and twelve sweet
            springs—Elim Table Water provides unadulterated, wholesome and pure
            drinking water across Nigeria.
          </p>
        </div>
      </section>

      {/* Executive Leadership, Management, Workforce & Brand Ambassador */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[15px] font-bold uppercase tracking-wider text-[#2563D9] bg-[#EAF4FF] px-3 py-1 rounded-full border border-blue-100">
            Leadership & People
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[#102A56]">
            Executive Leadership, Workforce & Brand Identity
          </h2>
          <p className="text-sm text-[#536174]">
            Meet the Chairman/CEO and the leadership team upholding Elim Table Water’s commitment to purity across Abuja and Nigeria.
          </p>
        </div>

        {/* Chairman / CEO Featured Spotlight Card */}
        <div className="bg-[#F5F7FA] rounded-3xl border border-[#E1E8F0] overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 relative h-[320px] sm:h-[420px] lg:h-[500px] overflow-hidden bg-slate-200">
            <img
              src="/assets/aistudio/ESS08085_74002998.jpg"
              alt="Chairman and CEO of Elim Table Water in Executive Office"
              className="w-full h-full object-cover object-[center_22%]"
            />
            <span className="absolute top-4 left-4 bg-[#102A56]/90 backdrop-blur-xs text-white text-xs font-bold px-3.5 py-1.5 rounded-full border border-white/15 shadow-sm">
              Chairman / CEO
            </span>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-center space-y-5">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#2563D9]">
                Executive Stewardship
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#102A56] tracking-tight">
                Office of the Chairman & Chief Executive Officer
              </h3>
            </div>
            <p className="text-sm text-[#536174] leading-relaxed">
              Guiding Elim Table Water with an unwavering dedication to excellence, regulatory compliance,
              and public health. Recognized with multiple industry awards for manufacturing integrity and
              community impact, the Chairman oversees strategic plant expansion, automated quality investments,
              and customer-first distribution across the Federal Capital Territory.
            </p>
            <div className="pt-4 border-t border-[#E1E8F0] flex flex-wrap items-center gap-4 text-xs text-[#102A56] font-semibold">
              <span className="inline-flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#2563D9]" />
                <span>Award-Winning Corporate Leadership</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>NAFDAC & SON Standards Champion</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <CompanyProfile />

      {/* NAFDAC Registration & SON MANCAP Product Certification */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[15px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Certification
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[#102A56]">
            Registered by NAFDAC &amp; Certified by SON
          </h2>
          <p className="text-sm text-[#536174]">
            Elim Table Water is registered by the National Agency for Food and Drug Administration and
            Control (NAFDAC) and carries the SON MANCAP mark, confirming it is safe and manufactured to the
            Nigerian Industrial Standard.
          </p>
        </div>

        {/* NAFDAC Registration */}
        <div className="bg-white rounded-3xl border border-[#E1E8F0] shadow-xs p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center bg-[#EAF4FF] rounded-2xl p-8 space-y-3">
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-white p-2 ring-4 ring-white shadow-md overflow-hidden flex items-center justify-center">
              <img
                src="/assets/aistudio/nafdac.png"
                alt="NAFDAC — National Agency for Food and Drug Administration and Control logo"
                className="w-full h-full object-contain rounded-full"
                loading="lazy"
              />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">NAFDAC Registered</span>
            <p className="text-sm text-[#536174]">Registration No.</p>
            <p className="text-3xl font-extrabold text-[#102A56] tracking-tight">01-8422</p>
          </div>
          <div className="lg:col-span-8 space-y-4">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">NAFDAC</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#102A56] tracking-tight">
                National Agency for Food and Drug Administration and Control
              </h3>
            </div>
            <div className="space-y-3 text-sm text-[#536174] leading-relaxed">
              <p>
                NAFDAC is the Nigerian government agency responsible for regulating and controlling the
                manufacture, sale and distribution of food and drinks, including packaged water. A product is only
                registered after NAFDAC inspects the factory and tests the water for safety and quality.
              </p>
              <p>
                In the year 2000, Elim Table Water became the first packaged (sachet) water to be registered by
                NAFDAC in Plateau State. Our production is regularly inspected to keep that registration, so every
                pack you buy meets NAFDAC's standards for safe drinking water.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E1E8F0] flex items-center gap-1.5 text-xs text-[#102A56] font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>NAFDAC Reg. No: 01-8422</span>
            </div>
          </div>
        </div>

        {/* SON MANCAP Certification */}
        <div className="bg-white rounded-3xl border border-[#E1E8F0] shadow-xs p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center bg-[#EAF4FF] rounded-2xl p-8 space-y-3">
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-white p-2 ring-4 ring-white shadow-md overflow-hidden flex items-center justify-center">
              <img
                src="/assets/aistudio/son-logo.png"
                alt="SON MANCAP certification mark FT-31609 for Elim Table Water (PET), Aniya Pharmaceutical Limited"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">SON MANCAP Certified</span>
            <p className="text-sm text-[#536174]">MANCAP No.</p>
            <p className="text-3xl font-extrabold text-[#102A56] tracking-tight">FT-31609</p>
          </div>
          <div className="lg:col-span-8 space-y-4">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">SON MANCAP</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#102A56] tracking-tight">
                Mandatory Conformity Assessment Programme
              </h3>
            </div>
            <div className="space-y-3 text-sm text-[#536174] leading-relaxed">
              <p>
                MANCAP is the Standards Organisation of Nigeria's certification scheme for products made in
                Nigeria. Before a product can carry the MANCAP mark, SON inspects the factory and tests
                the product to confirm it meets the relevant Nigerian Industrial Standard (NIS).
              </p>
              <p>
                For Elim Table Water, this means every PET bottle comes from a production process that SON
                has assessed and approved. When you see the MANCAP mark, you know the water is safe,
                consistent and made to the national standard.
              </p>
            </div>
            <dl className="divide-y divide-[#E1E8F0] text-sm">
              <div className="flex justify-between gap-4 py-2.5">
                <dt className="text-[#536174]">Manufacturer</dt>
                <dd className="font-semibold text-[#102A56] text-right">Aniya Pharmaceutical Limited</dd>
              </div>
              <div className="flex justify-between gap-4 py-2.5">
                <dt className="text-[#536174]">Product</dt>
                <dd className="font-semibold text-[#102A56] text-right">Elim Table Water (PET)</dd>
              </div>
            </dl>
            <div className="pt-4 border-t border-[#E1E8F0] flex items-center gap-1.5 text-xs text-[#102A56] font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>SON MANCAP No: FT-31609</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our People & Plant Departments (Authentic Team, Production & Warehouse) */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-16 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[15px] font-bold uppercase tracking-wider text-[#2563D9] bg-[#EAF4FF] px-3 py-1 rounded-full border border-blue-100">
            Dedicated Professionals
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[#102A56]">
            Our People & Operational Departments
          </h2>
          <p className="text-sm text-[#536174]">
            Behind every drop of Elim Table Water is a team of water engineers, pharmacists,
            microbiologists, production staff and warehouse officers committed to quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 1. Management & General Staff Team */}
          <div className="bg-white rounded-2xl border border-[#E1E8F0] overflow-hidden shadow-2xs hover:shadow-md transition-shadow group flex flex-col">
            <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
              <img
                src="/assets/aistudio/ESS07808-_952f4c20.jpg"
                alt="Elim Table Water management and department supervisors"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-[#102A56]/90 backdrop-blur-xs text-white text-[15px] font-semibold px-2.5 py-1 rounded-full">
                Leadership & Staff Team
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <h3 className="text-lg font-bold text-[#102A56]">Plant Leadership & General Staff</h3>
                <p className="text-xs font-medium text-[#2563D9] mb-2">Executive & Field Operations</p>
                <p className="text-xs text-[#536174] leading-relaxed">
                  Our management and department supervisors lead production, quality control, customer support
                  and delivery across the Federal Capital Territory.
                </p>
              </div>
              <div className="pt-3 border-t border-[#E1E8F0] flex items-center justify-between text-[15px] text-[#536174]">
                <span>Headquarters: Kubwa, Abuja</span>
                <span className="font-semibold text-emerald-600">Active Duty</span>
              </div>
            </div>
          </div>

          {/* 2. Production Department & Cleanroom Technicians */}
          <div className="bg-white rounded-2xl border border-[#E1E8F0] overflow-hidden shadow-2xs hover:shadow-md transition-shadow group flex flex-col">
            <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
              <img
                src="/assets/aistudio/productsiyu_44e04553.jpeg"
                alt="Elim Table Water Production Department Staff"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-[#2563D9]/90 backdrop-blur-xs text-white text-[15px] font-semibold px-2.5 py-1 rounded-full">
                Production Department
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <h3 className="text-lg font-bold text-[#102A56]">Production & Cleanroom Operations</h3>
                <p className="text-xs font-medium text-[#2563D9] mb-2">Automated Bottling & Filtration Specialists</p>
                <p className="text-xs text-[#536174] leading-relaxed">
                  Trained operators running water treatment, the bottling and packaging lines, seal checks
                  and regular quality testing of every production run.
                </p>
              </div>
              <div className="pt-3 border-t border-[#E1E8F0] flex items-center justify-between text-[15px] text-[#536174]">
                <span>Sterile Cleanroom Unit</span>
                <span className="font-semibold text-blue-600">NAFDAC Registered</span>
              </div>
            </div>
          </div>

          {/* 3. Warehouse & Finished Goods Department */}
          <div className="bg-white rounded-2xl border border-[#E1E8F0] overflow-hidden shadow-2xs hover:shadow-md transition-shadow group flex flex-col">
            <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
              <img
                src="/assets/aistudio/ESS07979_98aff78b.jpg"
                alt="Elim staff loading packs of bottled water onto a delivery truck"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-slate-800/90 backdrop-blur-xs text-white text-[15px] font-semibold px-2.5 py-1 rounded-full">
                Warehouse & Logistics
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <h3 className="text-lg font-bold text-[#102A56]">Warehouse & Finished Goods</h3>
                <p className="text-xs font-medium text-[#2563D9] mb-2">Storage & Palletized Dispatch</p>
                <p className="text-xs text-[#536174] leading-relaxed">
                  Keeping finished stock clean and well organised, rotating batches first-in first-out, and
                  loading our delivery trucks, vans and tricycles for dispatch.
                </p>
              </div>
              <div className="pt-3 border-t border-[#E1E8F0] flex items-center justify-between text-[15px] text-[#536174]">
                <span>Central Logistics Depot</span>
                <span className="font-semibold text-emerald-600">ERP Tracked</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServicesAndLocation />

      {/* FAQ Accordion Section */}
      <FAQSection />

      {/* Corporate Call To Action */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
        <div className="rounded-2xl bg-[#102A56] p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Ready to Enjoy Pure, Safe Drinking Water?
            </h3>
            <p className="text-sm text-blue-200">
              Browse our factory fresh products or register as an authorized distributor in Abuja FCT.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('products')}
              className="px-6 py-3 bg-[#2563D9] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold rounded-lg border border-white/20 transition cursor-pointer"
            >
              <span>Contact Plant Office</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
