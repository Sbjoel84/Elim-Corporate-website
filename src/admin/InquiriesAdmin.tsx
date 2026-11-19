import React, { useState } from 'react';
import { MessageSquare, Phone, Mail, Building, MapPin, CheckCircle2, Clock, Send } from 'lucide-react';
import { CustomerInquiry, StaffMember } from '../types/erp';
import { erpStorage } from '../services/erpStorage';

interface InquiriesAdminProps {
  inquiries: CustomerInquiry[];
  activeOperator: StaffMember;
  onRefresh: () => void;
}

export const InquiriesAdmin: React.FC<InquiriesAdminProps> = ({
  inquiries,
  activeOperator,
  onRefresh,
}) => {
  const [filterType, setFilterType] = useState('ALL');

  const filtered = inquiries.filter((i) => {
    if (filterType === 'ALL') return true;
    return i.type === filterType;
  });

  const handleUpdateStatus = (id: string, newStatus: CustomerInquiry['status']) => {
    erpStorage.updateInquiryStatus(id, newStatus, activeOperator.name);
    onRefresh();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full">
            Commercial Business Development
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            Customer Inquiries & Wholesale Distributor Applications
          </h2>
          <p className="text-xs text-slate-500">
            Incoming partnership requests and bulk event orders submitted via corporate website.
          </p>
        </div>

        <div className="flex gap-1.5">
          {['ALL', 'DISTRIBUTOR_PARTNERSHIP', 'BULK_EVENT_ORDER', 'GENERAL'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition ${
                filterType === type
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {type === 'ALL'
                ? 'All Messages'
                : type === 'DISTRIBUTOR_PARTNERSHIP'
                ? '★ Distributors'
                : type === 'BULK_EVENT_ORDER'
                ? 'Bulk Events'
                : 'General'}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-2 bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-500">
            No inquiries matching the selected category.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs hover:border-cyan-400 transition"
            >
              <div className="flex justify-between items-start">
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${
                    item.type === 'DISTRIBUTOR_PARTNERSHIP'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-blue-100 text-blue-900'
                  }`}
                >
                  {item.type.replace(/_/g, ' ')}
                </span>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === 'NEW'
                        ? 'bg-rose-100 text-rose-800'
                        : item.status === 'CONTACTED'
                        ? 'bg-cyan-100 text-cyan-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {item.status}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm">{item.fullName}</h4>
                {item.companyName && (
                  <p className="text-xs text-cyan-700 font-semibold">{item.companyName}</p>
                )}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
                  <span className="font-mono">{item.phoneNumber}</span>
                  {item.email && <span>{item.email}</span>}
                  <span>
                    {item.city}, {item.state}
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                {item.message}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <a
                  href={`https://wa.me/${item.phoneNumber.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                    item.fullName
                  )},%20this%20is%20${encodeURIComponent(
                    activeOperator.name
                  )}%20from%20Elim%20Water%20regarding%20your%20inquiry.`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition"
                >
                  <Send className="w-3 h-3" />
                  <span>WhatsApp Contact</span>
                </a>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-400">Mark:</span>
                  <button
                    onClick={() => handleUpdateStatus(item.id, 'CONTACTED')}
                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-[10px] font-semibold text-slate-700 cursor-pointer"
                  >
                    Contacted
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(item.id, 'RESOLVED')}
                    className="px-2 py-1 bg-emerald-100 hover:bg-emerald-200 rounded text-[10px] font-semibold text-emerald-800 cursor-pointer"
                  >
                    Resolved
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
