import React from 'react';

/** Top of the Gallery page, by rank: Chairman / CEO, then Operations Manager. */
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

    {/* Operations Manager */}
    <div className="bg-white rounded-2xl border border-[#E1E8F0] overflow-hidden shadow-2xs flex flex-col">
      <div className="relative h-[320px] sm:h-[400px] lg:h-[460px] overflow-hidden bg-slate-100">
        <img
          src="/assets/aistudio/OM-ESS07816.jpg"
          alt="Operations Manager of Elim Table Water in his office"
          className="w-full h-full object-cover object-[center_30%]"
        />
        <span className="absolute top-4 left-4 bg-[#102A56]/90 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          Operations Manager
        </span>
      </div>
      <div className="p-6 sm:p-7 flex-1">
        <h3 className="text-xl font-bold text-[#102A56]">Operations Manager</h3>
        <p className="text-sm text-[#536174] leading-relaxed mt-2">
          Operations Manager overseeing daily plant operations, production, warehouse and dispatch across the
          Kubwa factory.
        </p>
      </div>
    </div>
  </div>
);
