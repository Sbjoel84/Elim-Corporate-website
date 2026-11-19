import React, { useState } from 'react';
import {
  ShoppingCart,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Award,
  Menu,
  X,
  FileCheck2,
  ArrowRight,
  Globe,
} from 'lucide-react';
import type { CartItem } from '../../shared/types';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenTracking: () => void;
  onBookOrder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  cartItems,
  onOpenCart,
  onOpenTracking,
  onBookOrder,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  // Every menu item goes straight to its page (no dropdowns).
  const navMenuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Products' },
    { id: 'operations', label: 'Operations & Quality' },
    { id: 'gallery', label: 'Gallery / Facilities' },
    { id: 'news', label: 'News & Press' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full shadow-xs">
      {/* Top Slim Info Bar (#102A56 matching corporate pharmaceutical reference) */}
      <div className="w-full bg-[#102A56] text-slate-200 text-xs py-2 px-4 sm:px-8 lg:px-12 xl:px-16 border-b border-blue-950/40">
        <div className="w-full flex flex-wrap items-center justify-between gap-3">
          {/* Left: Trust & Certification Indicators */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-blue-100 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2563D9] shrink-0" />
              <span>NAFDAC Reg. No: 01-8422</span>
            </span>
            <span className="hidden lg:inline text-slate-500">•</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <Award className="w-3.5 h-3.5 text-[#2563D9] shrink-0" />
              <span>Quality You Can Trust</span>
            </span>
            <span className="hidden lg:inline text-slate-500">•</span>
            <span className="hidden xl:flex items-center gap-1.5 text-slate-300">
              <Globe className="w-3.5 h-3.5 text-blue-300 shrink-0" />
              <span>Abuja FCT & Inter-State Fleet Dispatch</span>
            </span>
          </div>

          {/* Right: Contact Hotline, Order Tracking */}
          <div className="flex items-center gap-4 ml-auto text-xs">
            <a
              href="tel:+2348166399794"
              className="flex items-center gap-1.5 text-slate-200 hover:text-white font-semibold transition shrink-0 text-[11px] sm:text-xs"
            >
              <Phone className="w-3 h-3 text-[#2563D9]" />
              <span>+2348166399794</span>
            </a>

            <span className="text-slate-600 hidden sm:inline">|</span>

            <button
              onClick={onOpenTracking}
              className="flex items-center gap-1.5 text-slate-200 hover:text-blue-200 font-medium transition cursor-pointer text-[11px] sm:text-xs"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-blue-300" />
              <span className="hidden sm:inline">Track Order</span>
            </button>

          </div>
        </div>
      </div>

      {/* Main Corporate Navigation Bar (Pure White, Subtle Border #E1E8F0) */}
      <div className="w-full bg-white text-[#102A56] px-4 sm:px-8 lg:px-12 xl:px-16 py-3.5 flex items-center justify-between border-b border-[#E1E8F0]">
        {/* Brand Logo with Elim official logo */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center cursor-pointer select-none group py-0.5 rounded-xl overflow-hidden"
          title="Elim Table Water - Home"
        >
          <img
            src="/assets/aistudio/elim_logo-DNHyH2mV_4a00ee2f.png"
            alt="Elim Table Water Logo"
            className="h-10 sm:h-12 w-auto object-contain rounded-xl transition-transform group-hover:scale-105"
          />
        </div>

        {/* Desktop Menu Links with Active Underline Bar */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navMenuItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative px-3.5 py-2 text-[13px] xl:text-[14px] font-medium transition cursor-pointer ${
                  isActive ? 'text-[#2563D9] font-semibold' : 'text-[#102A56] hover:text-[#2563D9]'
                }`}
              >
                {item.label}
                {isActive && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#2563D9] rounded-full"></span>}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons: Cart + Royal Blue "Get in Touch →" */}
        <div className="flex items-center gap-3">
          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-2.5 bg-[#F5F7FA] hover:bg-[#EAF4FF] text-[#102A56] text-xs sm:text-sm font-semibold rounded-xl border border-[#E1E8F0] transition cursor-pointer"
            title="View Order Cart"
          >
            <ShoppingCart className="w-4 h-4 text-[#2563D9]" />
            <span className="hidden sm:inline">Cart</span>
            {totalCartCount > 0 && (
              <span className="bg-[#2563D9] text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-5 text-center shadow-xs">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Primary button: Book Order (opens the booking form on the front page) */}
          <button
            onClick={onBookOrder}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#2563D9] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Book Order</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#102A56] hover:bg-[#F5F7FA] rounded-lg cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E1E8F0] bg-white px-4 py-4 space-y-2 shadow-lg animate-in fade-in duration-200 text-[#102A56]">
          <div className="space-y-1">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
                currentTab === 'home' ? 'bg-[#EAF4FF] text-[#2563D9] font-semibold' : 'hover:bg-[#F5F7FA]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                onNavigate('about');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
                currentTab === 'about' ? 'bg-[#EAF4FF] text-[#2563D9] font-semibold' : 'hover:bg-[#F5F7FA]'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => {
                onNavigate('products');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
                currentTab === 'products' ? 'bg-[#EAF4FF] text-[#2563D9] font-semibold' : 'hover:bg-[#F5F7FA]'
              }`}
            >
              Our Products
            </button>
            <button
              onClick={() => {
                onNavigate('operations');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
                currentTab === 'operations' ? 'bg-[#EAF4FF] text-[#2563D9] font-semibold' : 'hover:bg-[#F5F7FA]'
              }`}
            >
              Operations & Quality
            </button>
            <button
              onClick={() => {
                onNavigate('gallery');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
                currentTab === 'gallery' ? 'bg-[#EAF4FF] text-[#2563D9] font-semibold' : 'hover:bg-[#F5F7FA]'
              }`}
            >
              Gallery / Facilities
            </button>
            <button
              onClick={() => {
                onNavigate('news');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
                currentTab === 'news' ? 'bg-[#EAF4FF] text-[#2563D9] font-semibold' : 'hover:bg-[#F5F7FA]'
              }`}
            >
              News & Updates
            </button>
            <button
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
                currentTab === 'contact' ? 'bg-[#EAF4FF] text-[#2563D9] font-semibold' : 'hover:bg-[#F5F7FA]'
              }`}
            >
              Contact & Plant Location
            </button>
          </div>

          <div className="pt-3 border-t border-[#E1E8F0] flex flex-col gap-2">
            <button
              onClick={() => {
                onBookOrder();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-[#2563D9] text-white text-xs font-semibold rounded-lg text-center flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Book Order</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                onOpenTracking();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F5F7FA] text-[#102A56] text-xs font-medium rounded-lg border border-[#E1E8F0]"
            >
              <FileCheck2 className="w-4 h-4 text-[#2563D9]" />
              Track Customer Order
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
