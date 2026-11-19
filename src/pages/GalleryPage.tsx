import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import type { GalleryItem } from '../../shared/types';
import { GALLERY } from '../content/gallery';
import { TeamShowcase } from '../components/TeamShowcase';

export const GalleryPage: React.FC = () => {
  const galleryItems = GALLERY;
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const categories = [
    'ALL',
    'Team & Leadership',
    'Production Department',
    'Warehouse & Logistics',
    'Factory Plant',
    'Bottling Line',
    'QA & Lab',
    'Fleet & Logistics',
  ];

  const filtered = galleryItems.filter(
    (item) => selectedCategory === 'ALL' || item.category === selectedCategory
  );

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-12 space-y-10 bg-white">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#2563D9] bg-[#EAF4FF] px-3 py-1 rounded-full border border-blue-100">
          Gallery / Facilities
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#102A56]">
          Elim Table Water Media Gallery
        </h1>
        <p className="text-xs sm:text-sm text-[#536174]">
          A visual glimpse into our automated cleanrooms, quality control testing labs, and regional
          delivery fleet serving Abuja FCT.
        </p>
      </div>

      {/* Management Staff, Brand Ambassador & Workforce */}
      <TeamShowcase />

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#2563D9] text-white shadow-2xs'
                : 'bg-white text-[#536174] border border-[#E1E8F0] hover:bg-[#F5F7FA] hover:text-[#102A56]'
            }`}
          >
            {cat === 'ALL' ? 'All Facility Photos' : cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setActivePhoto(item)}
            className="group rounded-2xl overflow-hidden bg-white border border-[#E1E8F0] cursor-pointer shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-[#F5F7FA]">
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className={`w-full h-full ${
                  item.fitWhole ? 'object-contain' : 'object-cover object-[center_20%]'
                } group-hover:scale-105 transition-transform duration-300`}
              />
              <span className="absolute top-3 left-3 bg-[#102A56]/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                {item.category}
              </span>
              <div className="absolute top-3 right-3 p-2 rounded-lg bg-black/45 backdrop-blur-xs text-white opacity-0 group-hover:opacity-100 transition">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
              <div className="space-y-1.5">
                <h3 className="font-bold text-base leading-snug text-[#102A56] group-hover:text-[#2563D9] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#536174] leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="pt-2 border-t border-[#E1E8F0]/70 flex items-center justify-between text-[11px] font-semibold text-[#2563D9]">
                <span>Click to Enlarge</span>
                <ZoomIn className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-xs"
          />
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col border border-white/10">
            <div className="relative max-h-[70vh] bg-black flex items-center justify-center">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="max-h-[70vh] w-auto object-contain"
              />
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 text-white space-y-1 bg-[#102A56]">
              <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">
                {activePhoto.category}
              </span>
              <h3 className="text-lg font-bold">{activePhoto.title}</h3>
              <p className="text-xs text-blue-100">{activePhoto.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
