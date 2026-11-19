import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building,
  ShieldCheck,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import { erpStorage } from '../services/erpStorage';
import { FAQSection } from '../components/FAQSection';

interface ContactPageProps {
  initialFormType?: 'GENERAL' | 'DISTRIBUTOR_PARTNERSHIP';
}

export const ContactPage: React.FC<ContactPageProps> = ({
  initialFormType = 'GENERAL',
}) => {
  const [formType, setFormType] = useState<'GENERAL' | 'DISTRIBUTOR_PARTNERSHIP' | 'BULK_EVENT_ORDER'>(
    initialFormType
  );
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Abuja');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim()) {
      alert('Please provide your name and contact phone number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      erpStorage.submitInquiry({
        type: formType,
        fullName,
        phoneNumber,
        email: email || undefined,
        companyName: companyName || undefined,
        city: city || 'Kubwa, Abuja',
        state,
        message,
      });

      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-12 space-y-12 bg-white">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#2563D9] bg-[#EAF4FF] px-3 py-1 rounded-full border border-blue-100">
          Factory Direct Helpdesk & Commercial Sales
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#102A56]">
          Contact Elim Table Water
        </h1>
        <p className="text-xs sm:text-sm text-[#536174]">
          Have an inquiry, bulk institutional order, or want to register as an authorized regional distributor?
          Our commercial sales desk at Kubwa plant is ready to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#102A56] text-white p-6 sm:p-8 rounded-2xl space-y-6 shadow-sm">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200 block mb-1">
                Factory Headquarters & Bottling Complex
              </span>
              <h3 className="text-xl font-bold text-white">Elim Table Water Ltd</h3>
            </div>

            <div className="space-y-4 text-xs text-blue-100">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#2563D9] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold mb-0.5">Plant Location:</strong>
                  <span className="leading-relaxed">Plot No. 188A, FCDA Scheme Extension III, Off Bwari/Dutse Road, By Power Station, Opp. KAS Guest House, Kubw, FCT Abuja.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#2563D9] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold mb-0.5">Factory Order Hotline:</strong>
                  <a href="tel:+2348166399794" className="hover:text-white transition">
                    +2348166399794
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#2563D9] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold mb-0.5">Email Inquiries:</strong>
                  <a href="mailto:info@elimtablewater.com" className="hover:text-white transition">
                    info@elimtablewater.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#2563D9] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold mb-0.5">Loading Bay & Dispatch Hours:</strong>
                  <span>Monday - Saturday: 7:00 AM - 6:00 PM</span>
                  <span className="block text-[11px] text-blue-200/80">24/7 Plant Continuous Automated Production</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA */}
            <div className="pt-2 border-t border-white/10">
              <a
                href="https://wa.me/2348166399794?text=Hello%20Elim%20Water,%20I%20have%20an%20inquiry%20regarding%20orders%20and%20supply"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#2563D9] hover:bg-[#1D4ED8] text-white font-semibold text-xs rounded-lg transition shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Instantly on WhatsApp Desk</span>
              </a>
            </div>
          </div>

          {/* Plant Collection Note */}
          <div className="bg-[#F5F7FA] rounded-2xl p-5 border border-[#E1E8F0] text-xs text-[#536174] space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#102A56]">
              <Building className="w-4 h-4 text-[#2563D9]" />
              <span>Factory Collection Note:</span>
            </div>
            <p className="leading-relaxed">
              Customers collecting water directly from the plant must check in at Gate B Security with
              their unique Order Reference to receive loading dock pallet bay entry.
            </p>
          </div>
        </div>

        {/* Interactive Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#E1E8F0] shadow-2xs">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#102A56]">Inquiry Received & Logged</h3>
                <p className="text-xs sm:text-sm text-[#536174] mt-1 max-w-md mx-auto">
                  Thank you, <strong>{fullName}</strong>. Your message has been saved in our ERP
                  inquiries desk. Our commercial account officer will reach you on {phoneNumber} shortly.
                </p>
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFullName('');
                  setPhoneNumber('');
                  setMessage('');
                }}
                className="px-5 py-2.5 bg-[#2563D9] hover:bg-[#1D4ED8] text-white font-semibold text-xs rounded-lg transition cursor-pointer"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A56] mb-2">
                  Select Inquiry Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormType('GENERAL')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition cursor-pointer ${
                      formType === 'GENERAL'
                        ? 'border-[#2563D9] bg-[#EAF4FF] text-[#2563D9]'
                        : 'border-[#E1E8F0] text-[#536174] hover:bg-[#F5F7FA]'
                    }`}
                  >
                    General Inquiry
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormType('DISTRIBUTOR_PARTNERSHIP')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition cursor-pointer ${
                      formType === 'DISTRIBUTOR_PARTNERSHIP'
                        ? 'border-[#2563D9] bg-[#EAF4FF] text-[#2563D9]'
                        : 'border-[#E1E8F0] text-[#536174] hover:bg-[#F5F7FA]'
                    }`}
                  >
                    Distributor Partnership
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormType('BULK_EVENT_ORDER')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition cursor-pointer ${
                      formType === 'BULK_EVENT_ORDER'
                        ? 'border-[#2563D9] bg-[#EAF4FF] text-[#2563D9]'
                        : 'border-[#E1E8F0] text-[#536174] hover:bg-[#F5F7FA]'
                    }`}
                  >
                    Bulk & Event Supply
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#102A56] mb-1">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alhaji Musa Garba"
                    className="w-full px-3 py-2 text-xs border border-[#E1E8F0] rounded-lg focus:ring-2 focus:ring-[#2563D9] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#102A56] mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. +2348166399794"
                    className="w-full px-3 py-2 text-xs border border-[#E1E8F0] rounded-lg focus:ring-2 focus:ring-[#2563D9] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#102A56] mb-1">
                    Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. info@elimtablewater.com"
                    className="w-full px-3 py-2 text-xs border border-[#E1E8F0] rounded-lg focus:ring-2 focus:ring-[#2563D9] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#102A56] mb-1">
                    Business / Organization Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. KAS Guest House / Elim Supermarket"
                    className="w-full px-3 py-2 text-xs border border-[#E1E8F0] rounded-lg focus:ring-2 focus:ring-[#2563D9] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#102A56] mb-1">
                    City / Area in Abuja
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Kubwa, Dutse, Bwari, Gwarinpa, Maitama, Central Area"
                    className="w-full px-3 py-2 text-xs border border-[#E1E8F0] rounded-lg focus:ring-2 focus:ring-[#2563D9] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#102A56] mb-1">State / Region</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E1E8F0] rounded-lg focus:ring-2 focus:ring-[#2563D9] focus:outline-none bg-white text-[#102A56]"
                  >
                    <option value="Abuja">Abuja FCT</option>
                    <option value="Niger">Niger State (Suleja / Madalla)</option>
                    <option value="Nasarawa">Nasarawa State</option>
                    <option value="Kaduna">Kaduna State</option>
                    <option value="Lagos">Lagos State</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#102A56] mb-1">
                  Message / Order Requirements <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your weekly bottle/dispenser requirements or distribution area..."
                  className="w-full px-3 py-2 text-xs border border-[#E1E8F0] rounded-lg focus:ring-2 focus:ring-[#2563D9] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#2563D9] hover:bg-[#1D4ED8] disabled:bg-slate-300 text-white font-semibold text-xs uppercase tracking-wider rounded-lg shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Commercial Inquiry</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Accordion FAQ Section: Ordering, Water Quality & Delivery Zones */}
      <div className="pt-8 border-t border-[#E1E8F0] -mx-4 sm:-mx-8 lg:-mx-12 xl:-mx-16 2xl:-mx-24">
        <FAQSection />
      </div>
    </div>
  );
};
