import React from 'react';

/** Chairman / CEO, Management Staff and All-Level Workforce photo cards. */
export const TeamShowcase: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {/* Chairman / CEO */}
    <div className="bg-white rounded-2xl border border-[#E1E8F0] overflow-hidden shadow-2xs hover:shadow-md transition-shadow group flex flex-col">
      <div className="relative h-[320px] sm:h-[400px] lg:h-[460px] overflow-hidden bg-slate-100">
        <img
          src="/assets/aistudio/ESS08085_74002998.jpg"
          alt="Chairman and CEO of Elim Table Water in Executive Office"
          className="w-full h-full object-cover object-[center_22%] group-hover:scale-103 transition-transform duration-300"
        />
        <span className="absolute top-4 left-4 bg-[#102A56]/90 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          Chairman / CEO
        </span>
      </div>
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="text-xl font-bold text-[#102A56]">Office of the Chairman & Chief Executive Officer</h3>
          <p className="text-xs font-medium text-[#2563D9] mb-2">Executive Stewardship</p>
          <p className="text-sm text-[#536174] leading-relaxed">
            The Chairman & Chief Executive Officer of Elim Table Water in his Kubwa corporate office alongside
            industry excellence awards and product standards.
          </p>
        </div>
      </div>
    </div>

    {/* Management Staff */}
    <div className="bg-white rounded-2xl border border-[#E1E8F0] overflow-hidden shadow-2xs hover:shadow-md transition-shadow group flex flex-col">
      <div className="relative h-[320px] sm:h-[400px] lg:h-[460px] overflow-hidden bg-slate-100">
        <img
          src="/assets/aistudio/ESS07808-_952f4c20.jpg"
          alt="Elim Table Water Management Staff"
          className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-300"
        />
        <span className="absolute top-4 left-4 bg-[#102A56]/90 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          Management Staff
        </span>
      </div>
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="text-xl font-bold text-[#102A56]">Plant Management Team</h3>
          <p className="text-xs font-medium text-[#2563D9] mb-2">
            Supervisors, QA Leads & Operations Heads
          </p>
          <p className="text-sm text-[#536174] leading-relaxed">
            Experienced departmental managers coordinating daily purification cycles, laboratory audits,
            ERP order routing, and dispatch fleet schedules for uninterrupted plant output.
          </p>
        </div>
        <div className="pt-3 border-t border-[#E1E8F0] flex items-center justify-between text-xs text-[#536174]">
          <span>Operations & QA Governance</span>
          <span className="font-semibold text-[#2563D9]">Senior Supervisors</span>
        </div>
      </div>
    </div>

    {/* Team Members / Staff at All Levels (Full-Width Enlarged Banner Card) */}
    <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E1E8F0] overflow-hidden shadow-2xs hover:shadow-md transition-shadow group flex flex-col">
      <div className="relative h-[280px] sm:h-[420px] lg:h-[520px] overflow-hidden bg-slate-100">
        <img
          src="/assets/aistudio/ESS07806_7a78374e.jpg"
          alt="Elim Table Water Team Members and Staff at All Levels"
          className="w-full h-full object-cover object-[center_55%] group-hover:scale-102 transition-transform duration-300"
        />
        <span className="absolute top-4 left-4 bg-[#2563D9]/90 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          All-Level Workforce
        </span>
      </div>
      <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <h3 className="text-xl font-bold text-[#102A56]">Team Members & Staff at All Levels</h3>
          <p className="text-xs font-medium text-[#2563D9]">
            Production, Packaging, Logistics & Support
          </p>
          <p className="text-sm text-[#536174] leading-relaxed">
            Our united workforce across cleanroom bottling, sachet packaging, hygiene inspection,
            inventory management, and customer fleet delivery working together as one family.
          </p>
        </div>
        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E1E8F0] text-xs text-[#536174]">
          <span>Plant-Wide Personnel</span>
          <span className="font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            United Workforce
          </span>
        </div>
      </div>
    </div>
  </div>
);
