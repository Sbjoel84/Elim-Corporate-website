import React, { useState } from 'react';
import { Newspaper, Image, Plus, Check, Edit, Trash2, Eye } from 'lucide-react';
import { NewsAnnouncement, GalleryItem } from '../types/erp';
import { erpStorage } from '../services/erpStorage';

export const ContentAdmin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'NEWS' | 'GALLERY'>('NEWS');
  const newsList = erpStorage.getNews();
  const galleryList = erpStorage.getGallery();

  // News modal
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [newsForm, setNewsForm] = useState<Partial<NewsAnnouncement>>({
    title: '',
    category: 'Company News',
    summary: '',
    content: '',
    imageUrl: '/assets/aistudio/ESS07903_cceef1e2.jpg',
    published: true,
    featured: false,
    author: 'Corporate Communications Desk',
  });

  // Gallery modal
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [galleryForm, setGalleryForm] = useState<Partial<GalleryItem>>({
    title: '',
    category: 'Factory Plant',
    description: '',
    imageUrl: '/assets/aistudio/ESS07911_a880fa68.jpg',
  });

  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title?.trim() || !newsForm.summary?.trim()) return;

    const newItem: NewsAnnouncement = {
      id: newsForm.id || `news-${Date.now()}`,
      title: newsForm.title,
      slug: newsForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      summary: newsForm.summary,
      content: newsForm.content || newsForm.summary,
      category: newsForm.category as any,
      imageUrl: newsForm.imageUrl || '/assets/aistudio/ESS07903_cceef1e2.jpg',
      publishedDate: new Date().toISOString().split('T')[0],
      published: newsForm.published ?? true,
      featured: newsForm.featured ?? false,
      author: newsForm.author || 'Corporate Communications Desk',
    };

    erpStorage.saveNews(newItem);
    setNewsModalOpen(false);
  };

  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.title?.trim()) return;

    const newItem: GalleryItem = {
      id: galleryForm.id || `gal-${Date.now()}`,
      title: galleryForm.title,
      category: galleryForm.category as any,
      description: galleryForm.description || '',
      imageUrl: galleryForm.imageUrl || '/assets/aistudio/ESS07911_a880fa68.jpg',
    };

    erpStorage.saveGalleryItem(newItem);
    setGalleryModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full">
            Corporate Media CMS
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-1">Website Content Management</h2>
          <p className="text-xs text-slate-500">
            Publish company announcements, certification press releases, and factory media gallery.
          </p>
        </div>

        <div className="flex gap-2">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('NEWS')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition ${
                activeTab === 'NEWS' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              News Articles ({newsList.length})
            </button>
            <button
              onClick={() => setActiveTab('GALLERY')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition ${
                activeTab === 'GALLERY' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Gallery Photos ({galleryList.length})
            </button>
          </div>

          <button
            onClick={() => {
              if (activeTab === 'NEWS') {
                setNewsForm({
                  title: '',
                  category: 'Company News',
                  summary: '',
                  content: '',
                  imageUrl: '/assets/aistudio/ESS07903_cceef1e2.jpg',
                  published: true,
                  featured: false,
                  author: 'Corporate Communications Desk',
                });
                setNewsModalOpen(true);
              } else {
                setGalleryForm({
                  title: '',
                  category: 'Factory Plant',
                  description: '',
                  imageUrl: '/assets/aistudio/ESS07911_a880fa68.jpg',
                });
                setGalleryModalOpen(true);
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold rounded-xl transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add {activeTab === 'NEWS' ? 'Announcement' : 'Photo'}</span>
          </button>
        </div>
      </div>

      {/* News Management Table */}
      {activeTab === 'NEWS' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                  <th className="py-3 px-4">Title / Summary</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Published Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {newsList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4 max-w-md">
                      <strong className="text-slate-900 block truncate">{item.title}</strong>
                      <span className="text-[11px] text-slate-500 line-clamp-1">{item.summary}</span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">{item.category}</td>
                    <td className="py-3.5 px-4 text-slate-500">{item.publishedDate}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.published
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {item.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          setNewsForm(item);
                          setNewsModalOpen(true);
                        }}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-semibold cursor-pointer"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Gallery Management Grid */}
      {activeTab === 'GALLERY' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryList.map((g) => (
            <div
              key={g.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col"
            >
              <div className="aspect-16/10 bg-slate-100 relative">
                <img src={g.imageUrl} alt={g.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {g.category}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{g.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1">{g.description}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex justify-end mt-2">
                  <button
                    onClick={() => {
                      setGalleryForm(g);
                      setGalleryModalOpen(true);
                    }}
                    className="text-xs text-cyan-700 font-semibold hover:underline"
                  >
                    Edit Item
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* News Modal */}
      {newsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setNewsModalOpen(false)} className="fixed inset-0 bg-slate-900/60" />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 z-10 space-y-4 text-xs">
            <h3 className="font-bold text-base text-slate-900">
              {newsForm.id ? 'Edit News Announcement' : 'Publish New Announcement'}
            </h3>

            <form onSubmit={handleSaveNews} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Headline</label>
                <input
                  type="text"
                  required
                  value={newsForm.title || ''}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value as any })}
                    className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Company News">Company News</option>
                    <option value="Quality & Standards">Quality & Standards</option>
                    <option value="Community">Community</option>
                    <option value="Health Tips">Health Tips</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={newsForm.imageUrl || ''}
                    onChange={(e) => setNewsForm({ ...newsForm, imageUrl: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Summary (Short teaser)</label>
                <input
                  type="text"
                  required
                  value={newsForm.summary || ''}
                  onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Article Content</label>
                <textarea
                  rows={4}
                  required
                  value={newsForm.content || ''}
                  onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={newsForm.published}
                    onChange={(e) => setNewsForm({ ...newsForm, published: e.target.checked })}
                    className="rounded text-cyan-600"
                  />
                  <span>Published on public website</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setNewsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg"
                >
                  Save Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {galleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setGalleryModalOpen(false)} className="fixed inset-0 bg-slate-900/60" />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 z-10 space-y-4 text-xs">
            <h3 className="font-bold text-base text-slate-900">
              {galleryForm.id ? 'Edit Media Photo' : 'Upload Facility Photo'}
            </h3>

            <form onSubmit={handleSaveGallery} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Photo Title</label>
                <input
                  type="text"
                  required
                  value={galleryForm.title || ''}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Facility Category</label>
                <select
                  value={galleryForm.category}
                  onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value as any })}
                  className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Team & Leadership">Team &amp; Leadership</option>
                  <option value="Production Department">Production Department</option>
                  <option value="Warehouse & Logistics">Warehouse &amp; Logistics</option>
                  <option value="Factory Plant">Factory Plant</option>
                  <option value="Bottling Line">Bottling Line</option>
                  <option value="QA & Lab">QA &amp; Lab</option>
                  <option value="Fleet & Logistics">Fleet &amp; Logistics</option>
                  <option value="Events">Events</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Image URL</label>
                <input
                  type="text"
                  required
                  value={galleryForm.imageUrl || ''}
                  onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Caption / Description</label>
                <input
                  type="text"
                  value={galleryForm.description || ''}
                  onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setGalleryModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
