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
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-blue-100 bg-[#102A56]/60 backdrop-blur-xs border border-white/25 px-3.5 py-1 rounded-full shadow-xs">
            Our Legacy & Standards
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-md">
            About Elim Table Water
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-white/95 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            Founded on the biblical symbol of Elim—an oasis of seventy palm trees and twelve sweet
            springs—Elim Table Water provides unadulterated, wholesome, and pure
            mineral refreshment across Nigeria.
          </p>
        </div>
      </section>

      {/* Executive Leadership, Management, Workforce & Brand Ambassador */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#2563D9] bg-[#EAF4FF] px-3 py-1 rounded-full border border-blue-100">
            Leadership & People
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[#102A56]">
            Executive Leadership, Workforce & Brand Identity
          </h2>
          <p className="text-sm text-[#536174]">
            Meet the Chairman/CEO, management leadership, plant-wide workforce, and brand ambassador
            upholding Elim Table Water’s commitment to purity across Abuja and Nigeria.
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

      {/* Our People & Plant Departments (Authentic Team, Production & Warehouse) */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-16 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#2563D9] bg-[#EAF4FF] px-3 py-1 rounded-full border border-blue-100">
            Dedicated Professionals
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[#102A56]">
            Our People & Operational Departments
          </h2>
          <p className="text-sm text-[#536174]">
            Behind every pure drop of Elim Table Water is a team of certified microbiologists,
            sanitation technicians, cleanroom engineers, and warehouse logisticians committed to quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 1. Management & General Staff Team */}
          <div className="bg-white rounded-2xl border border-[#E1E8F0] overflow-hidden shadow-2xs hover:shadow-md transition-shadow group flex flex-col">
            <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
              <img
                src="/assets/aistudio/productsqw_4491fc0b.jpeg"
                alt="Elim Plant Leadership & General Staff Team"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-[#102A56]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                Leadership & Staff Team
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <h3 className="text-lg font-bold text-[#102A56]">Plant Leadership & General Staff</h3>
                <p className="text-xs font-medium text-[#2563D9] mb-2">Executive & Field Operations</p>
                <p className="text-xs text-[#536174] leading-relaxed">
                  Our multidisciplinary leadership team steers high-capacity production, customer support,
                  regulatory compliance, and enterprise delivery fleets across the Federal Capital Territory.
                </p>
              </div>
              <div className="pt-3 border-t border-[#E1E8F0] flex items-center justify-between text-[11px] text-[#536174]">
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
              <span className="absolute top-3 left-3 bg-[#2563D9]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                Production Department
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <h3 className="text-lg font-bold text-[#102A56]">Production & Cleanroom Operations</h3>
                <p className="text-xs font-medium text-[#2563D9] mb-2">Automated Bottling & Filtration Specialists</p>
                <p className="text-xs text-[#536174] leading-relaxed">
                  Certified operators managing the 7-stage industrial purification train, sterile bottling lines,
                  hermetic seal integrity, and hourly laboratory microbiological testing.
                </p>
              </div>
              <div className="pt-3 border-t border-[#E1E8F0] flex items-center justify-between text-[11px] text-[#536174]">
                <span>Sterile Cleanroom Unit</span>
                <span className="font-semibold text-blue-600">NAFDAC Certified</span>
              </div>
            </div>
          </div>

          {/* 3. Warehouse & Finished Goods Department */}
          <div className="bg-white rounded-2xl border border-[#E1E8F0] overflow-hidden shadow-2xs hover:shadow-md transition-shadow group flex flex-col">
            <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
              <img
                src="/assets/aistudio/products_69cca1f6.jpeg"
                alt="Elim Table Water Warehouse & Inventory Logistics"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-slate-800/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                Warehouse & Logistics
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <h3 className="text-lg font-bold text-[#102A56]">Warehouse & Finished Goods</h3>
                <p className="text-xs font-medium text-[#2563D9] mb-2">Storage & Palletized Dispatch</p>
                <p className="text-xs text-[#536174] leading-relaxed">
                  Overseeing palletized climate-controlled storage, FIFO batch rotation, hygiene inspections,
                  and rapid loading for our fleet of distributor trucks and van couriers.
                </p>
              </div>
              <div className="pt-3 border-t border-[#E1E8F0] flex items-center justify-between text-[11px] text-[#536174]">
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
              Ready to Experience Pure Mineral Refreshment?
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
