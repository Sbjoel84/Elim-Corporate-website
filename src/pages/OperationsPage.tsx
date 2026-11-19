import React from 'react';
import {
  Droplets,
  Layers,
  ShieldCheck,
  Award,
  Truck,
  CheckCircle2,
  Activity,
  ArrowRight,
  Warehouse,
  Check,
  Microscope,
} from 'lucide-react';
import qualityLabImg from '../assets/images/regenerated_image_1794341640142.jpg';
import fleetLoadingBayImg from '../assets/images/fleet_dock_elim_1794343294832.jpg';
import rollerConveyorPackingImg from '../assets/images/roller_packing_elim_1794343294116.jpg';

interface OperationsPageProps {
  onNavigate: (tab: string) => void;
}

export const OperationsPage: React.FC<OperationsPageProps> = ({ onNavigate }) => {
  const steps = [
    {
      num: '01',
      title: 'Deep Aquifer Borehole Extraction',
      description:
        'Raw source water is pumped from protected, subterranean deep-rock aquifers over 180 meters beneath the earth, completely isolated from surface pollutants and industrial contamination.',
      badge: 'Protected Source',
    },
    {
      num: '02',
      title: 'Multi-Media Quartz Sand & Granular Carbon',
      description:
        'Water passes through graded quartz sand and virgin coconut-shell activated carbon beds, absorbing suspended micro-particles, chlorine, organic compounds, and any unwanted tastes or odors.',
      badge: 'Turbidity < 0.1 NTU',
    },
    {
      num: '03',
      title: 'Industrial 7-Stage Reverse Osmosis (RO)',
      description:
        'Pressurized at 18 bar across semi-permeable spiral-wound polyamide membranes. Filters down to 0.0001 microns, removing heavy metals, salts, nitrates, and microscopic impurities.',
      badge: '0.0001 Micron Precision',
    },
    {
      num: '04',
      title: 'Alkaline Re-Mineralization & pH Balancing',
      description:
        'Purified water is carefully enriched with food-grade magnesium, calcium, and potassium electrolytes, stabilizing pH between 7.4 and 7.5 for natural taste and optimum cellular absorption.',
      badge: 'Optimal pH 7.4 - 7.5',
    },
    {
      num: '05',
      title: 'UV-C Sterilization & Pure Ozonation',
      description:
        'Dual-action physical disinfection. Germicidal ultraviolet rays rupture bacterial DNA, while an ozone generator inoculates micro-bubbles for continuous sterilization inside sealed bottles.',
      badge: '99.999% Pathogen Eradication',
    },
    {
      num: '06',
      title: 'Class 1000 Automated Cleanroom Bottling',
      description:
        'High-speed European monoblock rotary machines automatically wash, triple-rinse, fill, and torque tamper-evident caps at up to 15,000 units per hour without human intervention.',
      badge: 'Touchless Cleanroom',
    },
  ];

  return (
    <div className="space-y-16 pb-20 bg-white">
      {/* Header Banner - Corporate Navy */}
      <section className="bg-gradient-to-b from-[#102A56] to-[#0D2144] text-white py-16 px-4 sm:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200 bg-white/10 border border-white/15 px-3.5 py-1 rounded-full">
            Engineering & Water Purification
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Factory Operations & Purification Technology
          </h1>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Step inside Elim Table Water's automated production complex at Plot No. 188A, FCDA Scheme Extension III,
            Kubwa, Abuja. See how multi-stage reverse osmosis and sterile cleanroom robotics guarantee purity.
          </p>
        </div>
      </section>

      {/* 6-Step Purification Process */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2563D9]">
            STEP-BY-STEP PURIFICATION
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#102A56] tracking-tight">
            How Every Drop is Purified to Perfection
          </h2>
          <p className="text-xs sm:text-sm text-[#536174]">
            From 180-meter deep rock aquifers to tamper-sealed packaging, no human hand touches your water.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-white rounded-2xl p-6 border border-[#E1E8F0] shadow-2xs hover:shadow-md hover:border-[#2563D9]/40 transition duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#2563D9]">{step.num}</span>
                  <span className="text-[10px] font-semibold text-[#2563D9] bg-[#EAF4FF] px-2.5 py-0.5 rounded-full border border-blue-100">
                    {step.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#102A56]">{step.title}</h3>
                <p className="text-xs text-[#536174] leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* In-House Quality Testing & Laboratory Section */}
      <section className="w-full bg-[#F5F7FA] py-16 border-y border-[#E1E8F0]">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2563D9] bg-[#EAF4FF] px-3 py-1 rounded-full">
                IN-HOUSE QUALITY ASSURANCE LAB
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#102A56] leading-tight">
                Microbiological & Physical Parameter Testing Every 30 Minutes
              </h2>
              <p className="text-sm text-[#536174] leading-relaxed">
                Purity at Elim Table Water is never assumed. Our resident biochemists and quality analysts operate
                an on-site laboratory certified by NAFDAC, performing real-time testing on every production run.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-[#E1E8F0] shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF4FF] text-[#2563D9] flex items-center justify-center shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#102A56]">Total Dissolved Solids (TDS) Monitoring</h4>
                    <p className="text-[11px] text-[#536174]">
                      Calibrated continuously between 75 and 85 mg/L for pure clarity and light mineral crispness.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-[#E1E8F0] shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF4FF] text-[#2563D9] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#102A56]">Zero Pathogen & Coliform Culture Plating</h4>
                    <p className="text-[11px] text-[#536174]">
                      Microbial incubator cultures verify 0 CFU/mL for E. coli, Coliforms, and Pseudomonas aeruginosa.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-[#E1E8F0] shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF4FF] text-[#2563D9] flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#102A56]">Natural Alkaline pH 7.4 Stabilization</h4>
                    <p className="text-[11px] text-[#536174]">
                      Electronically calibrated to bio-compatible pH 7.4 - 7.5 to support healthy systemic balance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-md border border-[#E1E8F0] aspect-4/3">
                <img
                  src={qualityLabImg}
                  alt="Quality Laboratory"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plant Logistics, Warehouse Storage & Automated Packaging Showcase */}
      <section className="w-full py-16 px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 bg-white border-b border-[#E1E8F0]">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563D9] bg-[#EAF4FF] px-3.5 py-1 rounded-full border border-blue-100">
              FACILITY TOUR & WAREHOUSE LOGISTICS
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#102A56] tracking-tight">
              State-of-the-Art Operations & Inventory Infrastructure
            </h2>
            <p className="text-xs sm:text-sm text-[#536174] leading-relaxed">
              Explore our pristine Kubwa manufacturing facility—from automated gravity roller conveyor packaging
              to climate-controlled finished goods storage and zero-emission electric cargo dispatch haulers.
            </p>
          </div>

          {/* 4 Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* Card 1: Warehouse Storage Hall */}
            <div className="bg-[#F5F7FA] rounded-2xl border border-[#E1E8F0] overflow-hidden shadow-2xs hover:shadow-md transition duration-200 flex flex-col group">
              <div className="relative aspect-4/3 overflow-hidden bg-slate-200">
                <img
                  src="/assets/aistudio/ESS07859_0a5e6882.jpg"
                  alt="Elim Table Water Climate-Controlled Warehouse Hall"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#102A56]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                  Finished Goods Depot
                </div>
              </div>
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#102A56]">
                    Climate-Controlled Warehouse & Palletized Storage Hall
                  </h3>
                  <p className="text-xs font-semibold text-[#2563D9] mt-0.5">
                    Observation View & High-Density Finished Inventory
                  </p>
                  <p className="text-xs sm:text-sm text-[#536174] mt-2.5 leading-relaxed">
                    A panoramic view through observation clean glass into our expansive, high-ceiling storage facility.
                    Pristine polished epoxy floors accommodate multi-tier palletized stacks of shrink-wrapped Elim bottled
                    water under sterile air circulation, preserving seal freshness before dispatch.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E1E8F0] flex items-center justify-between text-xs text-[#536174]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Warehouse className="w-3.5 h-3.5 text-[#2563D9]" />
                    <span>200,000+ Pack Capacity</span>
                  </span>
                  <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    ISO Monitored
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Pallet Depot & Cargo Trike */}
            <div className="bg-[#F5F7FA] rounded-2xl border border-[#E1E8F0] overflow-hidden shadow-2xs hover:shadow-md transition duration-200 flex flex-col group">
              <div className="relative aspect-4/3 overflow-hidden bg-slate-200">
                <img
                  src="/assets/aistudio/ESS07880_83ec7ec6.jpg"
                  alt="Palletized Finished Goods Depot & Huaihai Fleet Hauler"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#2563D9]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                  Internal Transport Logistics
                </div>
              </div>
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#102A56]">
                    High-Capacity Pallet Stacks & Eco-Friendly Flatbed Hauler
                  </h3>
                  <p className="text-xs font-semibold text-[#2563D9] mt-0.5">
                    Huaihai Electric Cargo Tricycle & Pallet Matrix
                  </p>
                  <p className="text-xs sm:text-sm text-[#536174] mt-2.5 leading-relaxed">
                    Towering, laser-aligned stacks of sealed bottled water resting on treated wooden pallets. Our fleet of
                    heavy-duty electric cargo flatbeds provides zero-emission, silent transfer across staging zones,
                    eliminating fuel fumes inside the food-grade storage depot.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E1E8F0] flex items-center justify-between text-xs text-[#536174]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Truck className="w-3.5 h-3.5 text-[#2563D9]" />
                    <span>Zero-Emission Transport</span>
                  </span>
                  <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    Electric Fleet
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Fleet Loading Bay */}
            <div className="bg-[#F5F7FA] rounded-2xl border border-[#E1E8F0] overflow-hidden shadow-2xs hover:shadow-md transition duration-200 flex flex-col group">
              <div className="relative aspect-4/3 overflow-hidden bg-slate-200">
                <img
                  src={fleetLoadingBayImg}
                  alt="Fleet Dispatch Dock & Loading Bay 4"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#102A56]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                  Loading Bay 4
                </div>
              </div>
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#102A56]">
                    Dispatch Docks & Rapid Fleet Loading Platform
                  </h3>
                  <p className="text-xs font-semibold text-[#2563D9] mt-0.5">
                    Order Verification & Quality Release Departure
                  </p>
                  <p className="text-xs sm:text-sm text-[#536174] mt-2.5 leading-relaxed">
                    Direct access loading dock where dual electric haulers and express delivery vans are loaded under strict
                    supervision. Operations supervisors cross-check batch numbers, QR manifest seals, and destination routes
                    before release for prompt doorstep arrival across Abuja.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E1E8F0] flex items-center justify-between text-xs text-[#536174]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2563D9]" />
                    <span>ERP Manifest Checked</span>
                  </span>
                  <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Same-Day Dispatch
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4: Roller Conveyor & Packaging */}
            <div className="bg-[#F5F7FA] rounded-2xl border border-[#E1E8F0] overflow-hidden shadow-2xs hover:shadow-md transition duration-200 flex flex-col group">
              <div className="relative aspect-4/3 overflow-hidden bg-slate-200">
                <img
                  src={rollerConveyorPackingImg}
                  alt="Automated Roller Conveyor & Packaging Line"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#2563D9]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                  Bottling & Packaging Train
                </div>
              </div>
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#102A56]">
                    Automated Roller Conveyor & Batch Packaging Station
                  </h3>
                  <p className="text-xs font-semibold text-[#2563D9] mt-0.5">
                    Continuous High-Speed Shrink-Wrap Batching
                  </p>
                  <p className="text-xs sm:text-sm text-[#536174] mt-2.5 leading-relaxed">
                    Heavy-duty stainless steel gravity roller conveyors feeding hermetically sealed bottle bundles from the
                    automated shrink-wrap tunnel directly to the packing station. Technicians ensure flawless tamper-evident
                    wrap tightness and structural integrity prior to palletizing.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E1E8F0] flex items-center justify-between text-xs text-[#536174]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Layers className="w-3.5 h-3.5 text-[#2563D9]" />
                    <span>Automated Roller Train</span>
                  </span>
                  <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    15,000 Bottles/Hr
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
        <div className="rounded-2xl bg-[#102A56] p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Schedule a Factory Quality Inspection Tour
            </h3>
            <p className="text-sm text-blue-200">
              We welcome corporate clients, schools, and regulatory auditors to inspect our Kubwa facility.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 bg-[#2563D9] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition flex items-center gap-2 cursor-pointer"
          >
            <span>Book Plant Visit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
