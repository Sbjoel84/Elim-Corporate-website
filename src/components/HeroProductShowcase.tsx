import React, { useEffect, useState } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSlide {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  productId: string;
  /** Show the whole photo (for tall shots) over a blurred copy, instead of cropping. */
  fitWhole?: boolean;
  /** Designed product flier: shown uncropped, without zoom or dark scrim. */
  isFlier?: boolean;
}

// Each product's designed flier.
const HERO_PRODUCT_SLIDES: HeroSlide[] = [
  {
    id: 'sachet',
    label: 'Sachet Water',
    title: 'Elim Pure Flow Sachet Water',
    subtitle: '50cl Crystal-Clear UV & Ozone Sterilized Packs',
    imageUrl: '/assets/aistudio/elim-sachet-water.png',
    productId: 'prod-sachet-01',
    isFlier: true,
  },
  {
    id: 'bottled',
    label: 'Bottled Water',
    title: 'All Sizes of Bottled Table Water',
    subtitle: '500ml, 750ml Active Sports & 1.5L Family Packs',
    imageUrl: '/assets/aistudio/elim-bottled-water.png',
    productId: 'prod-bottle-1500',
    isFlier: true,
  },
  {
    id: 'dispenser',
    label: 'Dispenser Water',
    title: 'Elim 18.9L Dispenser Jar',
    subtitle: 'Tamper-Sealed Jars for Homes & Offices',
    imageUrl: '/assets/aistudio/elim-dispenser-jar.png',
    productId: 'prod-dispenser-19l',
    isFlier: true,
  },
  {
    id: 'collection',
    label: 'Full Range',
    title: 'Elim Table Water — Quality You Trust',
    subtitle: 'NAFDAC Registered Purity Delivered Across Abuja',
    imageUrl: '/assets/aistudio/image_6cafc13e.png',
    productId: 'prod-dispenser-19l',
  },
];

interface HeroProductShowcaseProps {
  onOpenFlyer: (imgUrl: string) => void;
  onQuickOrder: (productId: string) => void;
}

export const HeroProductShowcase: React.FC<HeroProductShowcaseProps> = ({
  onOpenFlyer,
  onQuickOrder,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_PRODUCT_SLIDES.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const activeSlide = HERO_PRODUCT_SLIDES[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_PRODUCT_SLIDES.length) % HERO_PRODUCT_SLIDES.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_PRODUCT_SLIDES.length);
  };

  return (
    <div
      className="relative w-full max-w-md lg:max-w-[480px] aspect-square flex items-center justify-center group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 30% OFFER Floating Circular Badge */}
      <div className="absolute -top-3 -left-3 z-30 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-[#102A56] shadow-md flex flex-col items-center justify-center border-2 border-[#2563D9] transform -rotate-6 hover:rotate-0 transition">
        <span className="text-xs sm:text-sm font-extrabold leading-none text-[#102A56]">30%</span>
        <span className="text-[15px] sm:text-xs font-bold uppercase text-[#2563D9] leading-tight">
          OFFER
        </span>
      </div>

      {/* View Official Product Flyer Button */}
      <button
        onClick={() =>
          onOpenFlyer(activeSlide.isFlier ? activeSlide.imageUrl : '/assets/aistudio/image_6cafc13e.png')
        }
        className="absolute top-3 right-3 z-30 px-3 py-1.5 rounded-full bg-[#102A56]/90 hover:bg-[#102A56] text-white text-[15px] font-semibold backdrop-blur-md border border-white/25 shadow-md flex items-center gap-1.5 transition cursor-pointer hover:scale-105"
        title="Click to view full official flyer"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#60A5FA]" />
        <span>View Flyer</span>
      </button>

      {/* Animated Elim Products Showcase Frame */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-[#EAF4FF]">
        {HERO_PRODUCT_SLIDES.map((slide, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-out ${
                isActive
                  ? 'opacity-100 scale-100 z-10'
                  : 'opacity-0 scale-105 z-0 pointer-events-none'
              }`}
            >
              {slide.fitWhole && (
                <img
                  src={slide.imageUrl}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-80"
                />
              )}
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className={`relative w-full h-full ${
                  slide.fitWhole ? 'object-contain pt-6 pb-32' : 'object-cover object-center'
                } transition-transform duration-[3600ms] ease-linear ${
                  isActive && !slide.isFlier ? 'scale-105' : 'scale-100'
                }`}
              />
              {/* Subtle Bottom Scrim for Tag Readability (fliers keep their own colours) */}
              {!slide.isFlier && (
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#102A56]/75 via-[#102A56]/20 to-transparent pointer-events-none" />
              )}
            </div>
          );
        })}

        {/* Slide Controls (Left / Right arrows on hover) */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Elim product"
          className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-[#102A56] shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next Elim product"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-[#102A56] shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Active Product Caption & Slide Switcher Dots */}
        <div className="absolute bottom-14 left-3 right-3 z-20 flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#102A56]/85 backdrop-blur-sm text-white text-[15px] sm:text-[15px] font-semibold border border-white/15">
              <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] animate-pulse" />
              {activeSlide.title}
            </span>

            <div className="flex items-center gap-1.5 bg-[#102A56]/75 backdrop-blur-sm px-2 py-1 rounded-full">
              {HERO_PRODUCT_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Show ${slide.label}`}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === activeIndex ? 'w-4 bg-[#60A5FA]' : 'w-1.5 bg-white/60 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Card: Quick Order Button */}
      <div className="absolute -bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-lg border border-[#E1E8F0] flex items-center justify-between text-[#102A56] z-30">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src="/assets/aistudio/elim_logo-DNHyH2mV_4a00ee2f.png"
            alt="Elim Logo"
            className="h-8 w-auto rounded-lg object-contain shrink-0"
          />
          <div className="min-w-0">
            <p className="text-xs font-bold text-[#102A56] truncate">Elim Table Water Products</p>
            <p className="text-[15px] text-[#2563D9] font-medium truncate">
              Sachet, Bottled (All Sizes) & Dispenser Water
            </p>
          </div>
        </div>
        <button
          onClick={() => onQuickOrder(activeSlide.productId)}
          className="px-3.5 py-1.5 bg-[#2563D9] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-lg shadow-2xs transition cursor-pointer shrink-0"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};
