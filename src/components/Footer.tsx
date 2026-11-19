import React, { useState } from 'react';
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Award,
  ArrowRight,
  Globe,
  MessageSquare,
  Send,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenTracking: () => void;
  onOpenDistributorForm: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenTracking,
  onOpenDistributorForm,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setTimeout(() => setNewsletterSubscribed(false), 3000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#F5F7FA] text-[#536174] pt-14 pb-8 border-t border-[#E1E8F0]">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
        {/* Newsletter Subscription Card (Sleek corporate style) */}
        <div className="w-full rounded-2xl bg-white border border-[#E1E8F0] p-6 sm:p-8 mb-12 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2563D9] block">
              NEWSLETTER SUBSCRIPTION
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#102A56] tracking-tight">
              Get Factory Production Updates & Direct Supply Schedules
            </h3>
            <p className="text-xs text-[#536174]">
              Subscribe to receive weekly hydration tips, corporate volume discount notices, and Abuja delivery updates.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex-1 max-w-md flex gap-2">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-4 py-2.5 text-xs bg-white text-[#102A56] placeholder-slate-400 rounded-lg border border-[#E1E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563D9]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#2563D9] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-lg transition shadow-2xs cursor-pointer shrink-0"
            >
              {newsletterSubscribed ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
        </div>

        {/* Main Footer Links (Matching Medivan 5-column layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E1E8F0]">
          {/* Company Bio & Logo */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/assets/aistudio/elim_logo-DNHyH2mV_4a00ee2f.png"
                alt="Elim Table Water"
                className="h-10 w-auto object-contain rounded-xl overflow-hidden"
              />
              <div>
                <span className="text-lg font-bold text-[#102A56] tracking-tight">ELIM</span>
                <span className="text-lg font-bold text-[#2563D9] tracking-tight ml-1">
                  TABLE WATER
                </span>
                <p className="text-[10px] text-[#536174] font-medium">Pure Natural Healthy Water</p>
              </div>
            </div>
            <p className="text-xs text-[#536174] leading-relaxed">
              Dedicated to delivering high-quality, pure and healthy water that improves lives worldwide.
              Certified by NAFDAC (Reg. No: 01-8422) and treated through 7-stage reverse osmosis.
            </p>

            {/* Direct WhatsApp Action */}
            <div className="pt-1">
              <a
                href="https://wa.me/2348166399794?text=Hello%20Elim%20Water,%20I%20would%20like%20to%20place%20an%20order"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#2563D9] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-lg transition shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Order Desk</span>
              </a>
            </div>
          </div>

          {/* Column 1: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#102A56] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-[#536174]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#2563D9] transition cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#2563D9] transition cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-[#2563D9] transition cursor-pointer"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('operations')}
                  className="hover:text-[#2563D9] transition cursor-pointer"
                >
                  Operations & Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#2563D9] transition cursor-pointer"
                >
                  R&D Facilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('news')}
                  className="hover:text-[#2563D9] transition cursor-pointer"
                >
                  News & Press
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#2563D9] transition cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Our Products */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#102A56] mb-4">
              Our Products
            </h4>
            <ul className="space-y-2.5 text-xs text-[#536174]">
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-[#2563D9] transition cursor-pointer"
                >
                  Table Water (500ml)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-[#2563D9] transition cursor-pointer"
                >
                  Active Sports Bottles (750ml)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-[#2563D9] transition cursor-pointer"
                >
                  Family Table Water (1.5L)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-[#2563D9] transition cursor-pointer"
                >
                  19L Dispenser Jar Refills
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-[#2563D9] transition cursor-pointer"
                >
                  Pure Flow Sachet Water (20 Bags)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-[#2563D9] transition cursor-pointer"
                >
                  Water Dispensers & Accessories
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#102A56] mb-4">
              Support & Standards
            </h4>
            <ul className="space-y-2.5 text-xs text-[#536174]">
              <li>
                <button
                  onClick={onOpenTracking}
                  className="hover:text-[#2563D9] text-[#2563D9] font-semibold transition cursor-pointer flex items-center gap-1"
                >
                  <span>Track Existing Order</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('operations')}
                  className="hover:text-[#2563D9] transition cursor-pointer"
                >
                  Quality Testing Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('operations')}
                  className="hover:text-[#2563D9] transition cursor-pointer"
                >
                  Certificates (NAFDAC & ISO)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDistributorForm}
                  className="hover:text-[#2563D9] transition cursor-pointer"
                >
                  Apply for Distributor Account
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#2563D9] transition cursor-pointer"
                >
                  Delivery Schedule & FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#102A56] mb-4">
              Contact Us
            </h4>
            <div className="space-y-3 text-xs text-[#536174]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#2563D9] shrink-0 mt-0.5" />
                <span>
                  Plot No. 188A, FCDA Scheme Extension III, Off Bwari/Dutse Road, By Power Station, Opp. KAS Guest House, Kubw, FCT Abuja.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#2563D9] shrink-0" />
                <span>+2348166399794</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#2563D9] shrink-0" />
                <span>info@elimtablewater.com</span>
              </div>
              <div className="pt-1">
                <button
                  onClick={onOpenDistributorForm}
                  className="w-full text-left px-3 py-2 bg-white border border-[#E1E8F0] hover:border-[#2563D9] rounded-lg text-[#102A56] hover:text-[#2563D9] font-medium transition cursor-pointer text-xs"
                >
                  ★ Register as Official Distributor
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 text-xs text-[#536174] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Elim Table Water Ltd. All Rights Reserved.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <span className="hover:text-[#2563D9] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#2563D9] cursor-pointer">Terms of Service</span>
            <span className="text-emerald-600 flex items-center gap-1 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Plant Live
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
