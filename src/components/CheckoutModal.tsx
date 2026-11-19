import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  Building,
  Mail,
  Copy,
  Check,
  ArrowRight,
  Printer,
  ShieldCheck,
  Send,
} from 'lucide-react';
import type { CartItem, CustomerInfo, DeliveryMethod, PublicOrder } from '../../shared/types';
import { calculateDeliveryFee, DELIVERY_STATES, FACTORY_ADDRESS } from '../../shared/pricing';
import { api, ApiError } from '../lib/api';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  deliveryMethod: DeliveryMethod;
  onOrderCompleted: (order: PublicOrder) => void;
  onTrackOrder: (orderRef: string, phone: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  deliveryMethod,
  onOrderCompleted,
  onTrackOrder,
}) => {
  const [formData, setFormData] = useState<CustomerInfo>({
    fullName: '',
    phoneNumber: '',
    email: '',
    businessName: '',
    deliveryAddress: '',
    cityArea: '',
    state: 'Abuja',
    preferredDeliveryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    preferredDeliveryWindow: 'Morning (8:00 AM - 12:00 PM)',
    deliveryMethod,
    specialInstructions: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<PublicOrder | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  // Estimate only: the server recalculates prices and fees from the catalogue.
  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const deliveryFee = calculateDeliveryFee(subtotal, deliveryMethod);
  const totalAmount = subtotal + deliveryFee;
  const todayIso = new Date().toISOString().split('T')[0];

  const handleClose = () => {
    setCompletedOrder(null);
    setErrorMsg('');
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim() || !formData.phoneNumber.trim()) {
      setErrorMsg('Please provide your full name and phone number.');
      return;
    }
    if (deliveryMethod === 'DELIVERY' && !formData.deliveryAddress.trim()) {
      setErrorMsg('Please provide a delivery address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const order = await api.createOrder({
        customer: { ...formData, deliveryMethod },
        items: items.map((i) => ({ productId: i.productId, variantId: i.variantId, quantity: i.quantity })),
      });
      setCompletedOrder(order);
      onOrderCompleted(order);
    } catch (err) {
      setErrorMsg(
        err instanceof ApiError ? err.message : 'We could not place your booking. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyOrderRef = () => {
    if (!completedOrder) return;
    navigator.clipboard.writeText(completedOrder.orderReference);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={!completedOrder ? handleClose : undefined}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#102A56] p-5 text-white flex items-center justify-between border-b border-[#102A56]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">
                {completedOrder ? 'Booking Confirmed & Queued' : 'Elim Water Booking Submission'}
              </h3>
              <p className="text-xs text-white/80">
                {completedOrder
                  ? 'Your booking has been sent to our order desk'
                  : 'Fast, secure online booking direct to factory desk'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1">
          {completedOrder ? (
            /* Confirmation View */
            <div className="space-y-6 text-center py-4">
              <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                  Booking Received
                </span>
                <h4 className="text-2xl font-black text-slate-900 mt-2">
                  Thank You, {completedOrder.customer.fullName}!
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto mt-1">
                  Your water booking has been received. Our order desk will call you to confirm
                  availability and delivery timing.
                </p>
              </div>

              {/* Order Reference Box */}
              <div className="bg-slate-50 border-2 border-dashed border-cyan-300 rounded-xl p-4 max-w-md mx-auto">
                <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
                  Unique Booking Reference
                </p>
                <div className="flex items-center justify-center gap-3 mt-1">
                  <span className="text-xl sm:text-2xl font-black tracking-wider text-cyan-700 font-mono">
                    {completedOrder.orderReference}
                  </span>
                  <button
                    onClick={copyOrderRef}
                    className="p-1.5 bg-white border border-slate-200 hover:border-cyan-500 rounded-lg text-slate-600 hover:text-cyan-600 transition cursor-pointer"
                    title="Copy Order Reference"
                  >
                    {copiedRef ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Please keep this reference number to track status or quote during customer calls.
                </p>
              </div>

              {/* Order Breakdown Summary */}
              <div className="bg-slate-50 rounded-xl p-4 text-left border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between font-bold text-slate-800 border-b border-slate-200 pb-2">
                  <span>Selected Products ({completedOrder.items.length})</span>
                  <span>Qty / Amount</span>
                </div>
                {completedOrder.items.map((item) => (
                  <div key={item.variantId} className="flex justify-between text-slate-600">
                    <span>
                      {item.productName} ({item.variantName})
                    </span>
                    <span className="font-semibold text-slate-900">
                      {item.quantity} × ₦{item.unitPrice.toLocaleString()} = ₦
                      {item.totalPrice.toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                  <span>Total Booking Value:</span>
                  <span className="text-cyan-700">₦{completedOrder.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Next Steps & Notifications */}
              <div className="bg-cyan-50/70 border border-cyan-200 rounded-xl p-4 text-left text-xs text-cyan-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-cyan-900">
                  <Clock className="w-4 h-4 text-cyan-700" />
                  <span>What happens next?</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  <li>Our order desk officer will call you to verify delivery timing and stock reservation.</li>
                  <li>
                    A submitted booking is awaiting review and does not automatically incur charges until
                    confirmed.
                  </li>
                  <li>
                    You can track progress in real-time on our website with your reference number and phone.
                  </li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/2348166399794?text=Hello%20Elim%20Water,%20I%20just%20placed%20order%20${completedOrder.orderReference}%20for%20${encodeURIComponent(
                    completedOrder.customer.fullName
                  )}.%20Please%20confirm%20availability.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-sm transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Notify Order Desk via WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    onTrackOrder(completedOrder.orderReference, completedOrder.customer.phoneNumber);
                    handleClose();
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition cursor-pointer"
                >
                  <span>Track This Order Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handlePrint}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Booking</span>
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div role="alert" className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 text-xs text-rose-800 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Customer Information */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-cyan-600" />
                  <span>1. Contact & Customer Identification</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Alhaji Babatunde Bello"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Phone Number (Calls & WhatsApp) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      required
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. +234 803 234 5678"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. contact@business.ng"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Company / Organisation <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      placeholder="e.g. Pinnacle Towers / Grand Hotel"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-cyan-600" />
                  <span>
                    2.{' '}
                    {deliveryMethod === 'DELIVERY'
                      ? 'Doorstep Delivery Location & Schedule'
                      : 'Factory Pickup Details'}
                  </span>
                </h4>

                {deliveryMethod === 'DELIVERY' ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Delivery Street Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="deliveryAddress"
                        required
                        value={formData.deliveryAddress}
                        onChange={handleInputChange}
                        placeholder="House/Plot number, street name, and prominent landmark"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          City / Area / LGA <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="cityArea"
                          required
                          value={formData.cityArea}
                          onChange={handleInputChange}
                          placeholder="e.g. Victoria Island, Ikeja, Lekki Phase 1"
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">State</label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none bg-white"
                        >
                          {DELIVERY_STATES.map((st) => (
                            <option key={st.value} value={st.value}>
                              {st.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs text-slate-700 space-y-1">
                    <p className="font-semibold text-slate-900">
                      Collection Point: {FACTORY_ADDRESS}.
                    </p>
                    <p className="text-slate-500">
                      Our factory loading bay crew will assist loading your vehicle directly from our cleanroom warehouse upon presenting your Order Reference.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="preferredDeliveryDate"
                      min={todayIso}
                      required
                      value={formData.preferredDeliveryDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Preferred Time Window
                    </label>
                    <select
                      name="preferredDeliveryWindow"
                      value={formData.preferredDeliveryWindow}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none bg-white"
                    >
                      <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</option>
                      <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                      <option value="Anytime during factory hours">Anytime during factory hours</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Special Instructions / Notes
                  </label>
                  <textarea
                    rows={2}
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    placeholder="e.g. Empty 19L bottles ready for swap, gate pass clearance, contact alternate security number"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Order Cost Review */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Product Subtotal ({items.length} items):</span>
                  <span className="font-semibold text-slate-900">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Delivery ({deliveryMethod === 'DELIVERY' ? 'Fleet' : 'Pickup'}):</span>
                  <span className="font-semibold text-slate-900">
                    {deliveryFee === 0 ? 'Free' : `₦${deliveryFee.toLocaleString()}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E1E8F0] flex justify-between text-sm font-bold text-[#102A56]">
                  <span>Estimated Total Amount:</span>
                  <span className="text-[#2563D9] text-base">₦{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2.5 text-xs font-semibold text-[#536174] hover:text-[#102A56] hover:bg-slate-100 rounded-lg transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#2563D9] hover:bg-[#1D4ED8] text-white font-semibold text-xs rounded-lg shadow-sm transition disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Sending booking...</span>
                  ) : (
                    <>
                      <span>Submit Booking</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
