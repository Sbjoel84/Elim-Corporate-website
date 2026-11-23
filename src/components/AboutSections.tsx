import React from 'react';
import {
  Building2,
  CupSoda,
  Droplets,
  Eye,
  GlassWater,
  ListChecks,
  MapPin,
  Package,
  Quote,
  ShieldCheck,
  Target,
  Truck,
} from 'lucide-react';
import { FACTORY_ADDRESS } from '../../shared/pricing';

// ---------------------------------------------------------------------------
// Company profile text for the About page. Edit the wording here.
// ---------------------------------------------------------------------------

const ABOUT_US = [
  'Elim Table Water (product of Aniya Pharmaceuticals Ltd.) was the first packaged water (sachet) to be registered by NAFDAC in Plateau State in the year 2000. It was also the first in Plateau State to produce packaged water with an automated forming, filling and sealing machine in the same year, 2000. Elim Table Water became a registered trademark in 2003 with the Ministry of Trade and Commerce.',
  'In 2006, the company became the first, and still the only one, producing PET cup water (50cl) in the North Central states of Nigeria. In 2009, it rolled out its 18.9 Ltrs jar water for dispensers, and bottles of 50cl, 75cl and 150cl pack sizes in 2012.',
  'Elim Table Water is poised to serve the F.C.T. and the entire nation with refreshing water produced in an ultra-modern factory, handled by a crew of professionals (water engineers, pharmacists, microbiologists, etc.) using state-of-the-art equipment for purification, bottling and packaging.',
];

const VISION = 'To be the foremost table water producing company in Nigeria by the year 2020.';

const MISSION =
  'To provide good quality drinking water for all classes of Nigerian citizens, from the low to the high and mighty, through our range of products.';

const VALUES = [
  { title: 'Integrity', text: 'Our core value.' },
  {
    title: 'Quality Service',
    text: 'Rendering qualitative service with an uncompromisingly high standard for all our products and services.',
  },
];

const OBJECTIVES = [
  'To remain focused and consistent in the production of high-quality products, while bringing new innovations into table water production through smart supply chain integration.',
  'To make customer satisfaction our watchword by ensuring availability of products and flexibility in our supply network, while identifying opportunities to improve production efficiency using an information system that monitors operations and provides the capability to analyse results, determine the root cause of problems and proffer solutions.',
];

export const PRODUCTS = [
  { name: 'Bottled Water', icon: GlassWater, text: 'Enjoy the convenience of our portable Elim bottled water.' },
  {
    name: '18.9 Ltrs Jar (Dispenser Water)',
    icon: Droplets,
    text: 'Our water for dispensers provides long-lasting refreshment in homes and offices.',
  },
  {
    name: 'Sachet Water',
    icon: Package,
    text: 'Our sachet water can serve workshops, rural areas and the entire public.',
  },
  { name: 'PET Cup Water', icon: CupSoda, text: 'Our PET cup water can serve all social occasions.' },
];

const TRANSPORT = 'Enjoy the convenience of home-delivered Elim Table Water products.';
const LOCATION = 'The factory complex is in a serene environment.';
const CLIENTS = 'Our patrons are the entire public.';
const PATRONAGE_IMG = '/assets/aistudio/productsqw_4491fc0b.jpeg';

// ---------------------------------------------------------------------------

const container = 'w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24';
const eyebrow =
  'inline-block text-[15px] font-bold uppercase tracking-wider text-[#2563D9] bg-[#EAF4FF] px-3 py-1 rounded-full border border-blue-100';

/** About Us, vision, mission, values, objectives and products. */
export const CompanyProfile: React.FC = () => (
  <>
    {/* About Us */}
    <section className={container}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-7 space-y-5">
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#102A56] leading-tight">About Us</h2>
          {ABOUT_US.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-sm sm:text-base text-[#536174] leading-relaxed text-justify">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-md border border-[#E1E8F0] aspect-4/3">
          <img
            src="/assets/aistudio/elim-layout-1-1200.jpg"
            alt="Aerial view of the Elim Table Water factory layout"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </section>

    {/* Vision, Mission, Values & Objectives */}
    <section className="bg-[#F5F7FA] py-16 border-y border-[#E1E8F0]">
      <div className={`${container} space-y-8`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-[#E1E8F0] shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#102A56] text-white flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#102A56]">Our Vision</h3>
            <p className="text-sm text-[#536174] leading-relaxed">{VISION}</p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#E1E8F0] shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#2563D9] text-white flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#102A56]">Our Mission</h3>
            <p className="text-sm text-[#536174] leading-relaxed">{MISSION}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-[#E1E8F0] shadow-2xs space-y-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-7 h-7 text-[#2563D9]" />
              <h3 className="text-xl font-bold text-[#102A56]">Our Values</h3>
            </div>
            <ul className="space-y-3">
              {VALUES.map((v) => (
                <li key={v.title} className="text-sm text-[#536174] leading-relaxed pl-4 border-l-2 border-[#2563D9]/40">
                  <strong className="text-[#102A56]">{v.title}:</strong> {v.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#E1E8F0] shadow-2xs space-y-4">
            <div className="flex items-center gap-3">
              <ListChecks className="w-7 h-7 text-[#2563D9]" />
              <h3 className="text-xl font-bold text-[#102A56]">Our Objectives</h3>
            </div>
            <ol className="space-y-3 list-decimal pl-5 marker:font-bold marker:text-[#2563D9]">
              {OBJECTIVES.map((o) => (
                <li key={o.slice(0, 24)} className="text-sm text-[#536174] leading-relaxed pl-1">
                  {o}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>

    {/* Our Products */}
    <section className={`${container} space-y-8`}>
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className={eyebrow}>Our Products</span>
        <h2 className="text-3xl font-bold tracking-tight text-[#102A56]">About Our Products</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {PRODUCTS.map(({ name, icon: Icon, text }) => (
          <div
            key={name}
            className="bg-white p-6 rounded-2xl border border-[#E1E8F0] shadow-2xs hover:shadow-md transition-shadow space-y-3"
          >
            <div className="w-11 h-11 rounded-xl bg-[#EAF4FF] text-[#2563D9] flex items-center justify-center">
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#102A56]">{name}</h3>
            <p className="text-sm text-[#536174] leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </section>
  </>
);

/** Transport, location and clients. */
export const ServicesAndLocation: React.FC = () => (
  <section className={`${container} pb-4`}>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="bg-white rounded-2xl border border-[#E1E8F0] overflow-hidden shadow-2xs flex flex-col">
        <img src="/assets/aistudio/elim-layout-1-1200.jpg" alt="Aerial view of the Elim Table Water factory and delivery yard" className="w-full aspect-16/9 object-cover" />
        <div className="p-6 space-y-2">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#2563D9]" />
            <h3 className="text-lg font-bold text-[#102A56]">Our Transport</h3>
          </div>
          <p className="text-sm text-[#536174] leading-relaxed">{TRANSPORT}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E1E8F0] shadow-2xs p-6 space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#2563D9]" />
          <h3 className="text-lg font-bold text-[#102A56]">Our Location</h3>
        </div>
        <p className="text-sm text-[#536174] leading-relaxed">{LOCATION}</p>
        <div className="flex items-start gap-3 bg-[#F5F7FA] border border-[#E1E8F0] rounded-xl p-4">
          <Building2 className="w-5 h-5 text-[#102A56] shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-[#102A56]">Head Office and Factory</p>
            <p className="text-sm text-[#536174] leading-relaxed">{FACTORY_ADDRESS}</p>
          </div>
        </div>
      </div>

      <div className="relative min-h-[360px] bg-[#102A56] text-white rounded-2xl shadow-2xs overflow-hidden flex flex-col justify-end">
        {/* Patronage photo: swap PATRONAGE_IMG for a marketplace / customers photo when available */}
        <img
          src={PATRONAGE_IMG}
          alt="Members of the public who patronise Elim Table Water"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102A56] via-[#102A56]/70 to-[#102A56]/10" />
        <span className="absolute top-4 left-4 bg-[#2563D9] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
          Patronage
        </span>
        <div className="relative p-6 space-y-3">
          <div className="flex items-center gap-2">
            <Quote className="w-5 h-5 text-blue-300" />
            <h3 className="text-lg font-bold">Our Clients</h3>
          </div>
          <p className="text-xl sm:text-2xl font-semibold leading-snug drop-shadow-sm">“{CLIENTS}”</p>
        </div>
      </div>
    </div>
  </section>
);
