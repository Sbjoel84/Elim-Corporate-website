import React, { useState } from 'react';
import { Calendar, ArrowRight, X } from 'lucide-react';
import type { NewsAnnouncement } from '../../shared/types';
import { NEWS } from '../content/news';

export const NewsPage: React.FC = () => {
  const newsList = NEWS.filter((n) => n.published);
  const [selectedNews, setSelectedNews] = useState<NewsAnnouncement | null>(null);

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-12 space-y-10 bg-white">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#2563D9] bg-[#EAF4FF] px-3 py-1 rounded-full border border-blue-100">
          Press Releases & Company Updates
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#102A56]">
          Elim Table Water News & Announcements
        </h1>
        <p className="text-xs sm:text-sm text-[#536174]">
          Stay informed on factory expansions, quality certifications, distributor initiatives, and
          healthy hydration guides from our Kubwa Abuja headquarters.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsList.map((item) => (
          <article
            key={item.id}
            onClick={() => setSelectedNews(item)}
            className="bg-white rounded-2xl border border-[#E1E8F0] overflow-hidden hover:border-[#2563D9]/50 hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer group"
          >
            <div className="aspect-16/10 overflow-hidden bg-[#F5F7FA] relative">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-[#102A56]/85 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-1 rounded-md">
                {item.category}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs text-[#536174]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#2563D9]" />
                    {new Date(item.publishedDate).toLocaleDateString()}
                  </span>
                  <span>•</span>
                  <span>{item.author}</span>
                </div>

                <h3 className="font-bold text-[#102A56] text-base leading-snug group-hover:text-[#2563D9] transition">
                  {item.title}
                </h3>

                <p className="text-xs text-[#536174] line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E1E8F0] flex items-center justify-between text-xs font-semibold text-[#2563D9]">
                <span>Read Full Announcement</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* News Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedNews(null)}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
          />
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col border border-[#E1E8F0]">
            <div className="relative aspect-16/9 bg-[#F5F7FA]">
              <img
                src={selectedNews.imageUrl}
                alt={selectedNews.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedNews(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex items-center gap-3 text-xs text-[#536174]">
                <span className="font-semibold text-[#2563D9] bg-[#EAF4FF] px-2.5 py-0.5 rounded-md border border-blue-100">
                  {selectedNews.category}
                </span>
                <span>•</span>
                <span>Published on {new Date(selectedNews.publishedDate).toLocaleDateString()}</span>
                <span>•</span>
                <span>By {selectedNews.author}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#102A56] leading-tight">
                {selectedNews.title}
              </h2>

              <p className="text-sm font-medium text-[#102A56] leading-relaxed bg-[#EAF4FF]/50 p-3.5 rounded-xl border border-blue-100">
                {selectedNews.summary}
              </p>

              <div className="text-xs sm:text-sm text-[#536174] leading-relaxed whitespace-pre-line">
                {selectedNews.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
