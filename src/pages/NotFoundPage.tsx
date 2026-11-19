import React from 'react';

export const NotFoundPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => (
  <div className="w-full px-4 py-24 text-center space-y-4 bg-white">
    <p className="text-xs font-bold uppercase tracking-wider text-[#2563D9]">404</p>
    <h1 className="text-3xl font-bold text-[#102A56]">Page not found</h1>
    <p className="text-sm text-[#536174]">The page you are looking for does not exist or has moved.</p>
    <div className="flex flex-wrap justify-center gap-3 pt-2">
      <button
        onClick={() => onNavigate('home')}
        className="px-5 py-2.5 bg-[#2563D9] hover:bg-[#1D4ED8] text-white font-semibold text-xs rounded-lg cursor-pointer"
      >
        Go to home page
      </button>
      <button
        onClick={() => onNavigate('products')}
        className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#102A56] font-semibold text-xs rounded-lg cursor-pointer"
      >
        View products
      </button>
    </div>
  </div>
);
