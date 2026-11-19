import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  Truck,
  MapPin,
  AlertCircle,
  Phone,
  Send,
} from 'lucide-react';
import { OnlineOrder } from '../types/erp';
import { erpStorage } from '../services/erpStorage';
import { DeliveryMilestoneTracker } from './DeliveryMilestoneTracker';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderRef?: string;
  initialPhone?: string;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  initialOrderRef = '',
  initialPhone = '',
}) => {
  const [orderRef, setOrderRef] = useState(initialOrderRef);
  const [phone, setPhone] = useState(initialPhone);
  const [searched, setSearched] = useState(false);
  const [foundOrder, setFoundOrder] = useState<OnlineOrder | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialOrderRef) {
      setOrderRef(initialOrderRef);
      if (initialPhone) {
        setPhone(initialPhone);
        handleLookup(initialOrderRef, initialPhone);
      }
    }
  }, [initialOrderRef, initialPhone, isOpen]);

  useEffect(() => {
    if (!isOpen || !foundOrder) return;
    const handleErpUpdate = () => {
      const updated = erpStorage.getOrderByReferenceAndPhone(
        foundOrder.orderReference,
        foundOrder.customer.phoneNumber
      );
      if (updated) setFoundOrder(updated);
    };
    window.addEventListener('elim_erp_updated', handleErpUpdate);
    return () => window.removeEventListener('elim_erp_updated', handleErpUpdate);
  }, [isOpen, foundOrder]);

  if (!isOpen) return null;

  const handleLookup = (refToUse = orderRef, phoneToUse = phone) => {
    if (!refToUse.trim()) {
      setErrorMsg('Please enter your unique Booking Reference (e.g. ELM-WEB-2026-000101).');
      return;
    }

    setErrorMsg('');
    setSearched(true);

    const order = erpStorage.getOrderByReferenceAndPhone(refToUse, phoneToUse);
    if (order) {
      setFoundOrder(order);
    } else {
      setFoundOrder(null);
      setErrorMsg(
        'No active booking found matching that reference and phone number. Please verify your reference number from your confirmation message.'
      );
    }
  };

  const isRejected = foundOrder?.status === 'REJECTED';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#102A56] p-5 text-white flex items-center justify-between border-b border-[#102A56]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">Track Elim Water Booking Status</h3>
              <p className="text-xs text-white/80">Real-time factory ERP fulfillment & fleet tracker</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Lookup Input Form */}
          <div className="bg-[#F5F7FA] p-4 rounded-xl border border-[#E1E8F0]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-semibold text-[#102A56] mb-1">
                  Booking Reference Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={orderRef}
                  onChange={(e) => setOrderRef(e.target.value.toUpperCase())}
                  placeholder="e.g. ELM-WEB-2026-000101"
                  className="w-full px-3 py-2 text-xs font-mono font-bold uppercase border border-[#E1E8F0] rounded-lg focus:ring-2 focus:ring-[#2563D9] focus:outline-none bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#102A56] mb-1">
                  Customer Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +234 803 234 5678"
                  className="w-full px-3 py-2 text-xs border border-[#E1E8F0] rounded-lg focus:ring-2 focus:ring-[#2563D9] focus:outline-none bg-white"
                />
              </div>
            </div>

            <button
              onClick={() => handleLookup()}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#2563D9] hover:bg-[#1D4ED8] text-white font-semibold text-xs rounded-lg transition shadow-xs cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Verify & Check Live Status</span>
            </button>

            {/* Quick Demo Shortcuts for instant testing */}
            <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-200 text-[11px] text-slate-500">
              <span>Quick Test Numbers:</span>
              <button
                type="button"
                onClick={() => {
                  setOrderRef('ELM-WEB-2026-000101');
                  setPhone('+234 803 234 5678');
                  handleLookup('ELM-WEB-2026-000101', '+234 803 234 5678');
                }}
                className="text-cyan-700 hover:underline font-mono"
              >
                #000101 (Ready for Dispatch)
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => {
                  setOrderRef('ELM-WEB-2026-000102');
                  setPhone('+234 812 987 6543');
                  handleLookup('ELM-WEB-2026-000102', '+234 812 987 6543');
                }}
                className="text-cyan-700 hover:underline font-mono"
              >
                #000102 (New Booking)
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3.5 rounded-xl text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Found Order View */}
          {foundOrder && (
            <div className="space-y-6 animate-in fade-in">
              {/* Order Banner */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 text-white rounded-xl">
                <div>
                  <span className="text-[10px] text-cyan-300 uppercase tracking-widest font-semibold block">
                    Verified Booking
                  </span>
                  <span className="text-xl font-black font-mono tracking-wide">
                    {foundOrder.orderReference}
                  </span>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    Customer: {foundOrder.customer.fullName}
                  </span>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
                      foundOrder.status === 'DELIVERED'
                        ? 'bg-emerald-500 text-white'
                        : isRejected
                        ? 'bg-rose-500 text-white'
                        : 'bg-cyan-500 text-slate-950 font-black'
                    }`}
                  >
                    {foundOrder.status.replace(/_/g, ' ')}
                  </span>
                  <span className="block text-[11px] text-slate-400 mt-1">
                    Booked on {new Date(foundOrder.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Step-by-Step Delivery Milestone Tracker */}
              <DeliveryMilestoneTracker order={foundOrder} />

              {/* Delivery and Products Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Destination */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <MapPin className="w-4 h-4 text-cyan-600" />
                    <span>Destination & Schedule</span>
                  </div>
                  <p className="text-slate-700 font-medium">
                    {foundOrder.customer.deliveryMethod === 'DELIVERY'
                      ? foundOrder.customer.deliveryAddress
                      : 'Factory Pickup (Loading Gate B)'}
                  </p>
                  <p className="text-slate-500">
                    Area: {foundOrder.customer.cityArea}, {foundOrder.customer.state}
                  </p>
                  <p className="text-slate-500">
                    Target Date: {foundOrder.customer.preferredDeliveryDate} (
                    {foundOrder.customer.preferredDeliveryWindow || 'Standard Factory Hours'})
                  </p>
                </div>

                {/* Assigned Coordinator */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <Phone className="w-4 h-4 text-cyan-600" />
                    <span>Assigned Order Officer</span>
                  </div>
                  <p className="text-slate-900 font-semibold">
                    {foundOrder.assignedStaffName || 'Folake Adeyemi (Order Desk Lead)'}
                  </p>
                  <p className="text-slate-500">Commercial Sales & Fleet Logistics</p>
                  <a
                    href={`https://wa.me/2348166399794?text=Hello%20Elim%20Water,%20regarding%20my%20booking%20${foundOrder.orderReference}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-emerald-700 font-bold hover:underline mt-1"
                  >
                    <Send className="w-3 h-3" />
                    <span>Chat on WhatsApp regarding this booking</span>
                  </a>
                </div>
              </div>

              {/* Items List */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 flex justify-between">
                  <span>Ordered Water Products ({foundOrder.items.length})</span>
                  <span>Quantity</span>
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  {foundOrder.items.map((it) => (
                    <div key={it.variantId} className="px-4 py-2.5 flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-slate-900 block">{it.productName}</span>
                        <span className="text-[11px] text-slate-500">{it.variantName}</span>
                      </div>
                      <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">
                        {it.quantity} units
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
