import React, { useState } from 'react';
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Truck,
  Warehouse,
  MessageSquare,
  AlertTriangle,
  UserCheck,
  Send,
  Plus,
} from 'lucide-react';
import { OnlineOrder, OrderStatus, StaffMember } from '../types/erp';
import { erpStorage } from '../services/erpStorage';

interface OrderDetailDrawerProps {
  order: OnlineOrder | null;
  onClose: () => void;
  staff: StaffMember[];
  activeOperator: StaffMember;
  onOrderUpdated: () => void;
  onOpenDispatchModal?: (order: OnlineOrder) => void;
}

export const OrderDetailDrawer: React.FC<OrderDetailDrawerProps> = ({
  order,
  onClose,
  staff,
  activeOperator,
  onOrderUpdated,
  onOpenDispatchModal,
}) => {
  if (!order) return null;

  const [selectedStaffId, setSelectedStaffId] = useState(order.assignedStaffId || '');
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [internalNoteInput, setInternalNoteInput] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(order.status);

  // Check live ERP stock availability
  const stockCheck = erpStorage.checkStockAvailability(
    order.items.map((i) => ({ productId: i.productId, quantity: i.quantity }))
  );

  const handleAssignStaff = (staffId: string) => {
    setSelectedStaffId(staffId);
    erpStorage.assignStaff(order.id, staffId, activeOperator.name);
    onOrderUpdated();
  };

  const handleAccept = () => {
    erpStorage.acceptBooking(order.id, activeOperator.name, true);
    onOrderUpdated();
  };

  const handleRejectConfirm = () => {
    if (!rejectReason.trim()) {
      alert('A reason is mandatory when rejecting a booking.');
      return;
    }
    erpStorage.rejectBooking(order.id, rejectReason, activeOperator.name);
    setRejectModalOpen(false);
    onOrderUpdated();
  };

  const handleStatusChange = (newStatus: OrderStatus) => {
    erpStorage.updateOrderStatus(order.id, newStatus, activeOperator.name);
    setSelectedStatus(newStatus);
    onOrderUpdated();
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!internalNoteInput.trim()) return;
    erpStorage.addOrderNote(order.id, activeOperator.name, internalNoteInput, false);
    setInternalNoteInput('');
    onOrderUpdated();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" />

      {/* Drawer */}
      <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base sm:text-lg font-black text-cyan-400">
                {order.orderReference}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  order.status === 'NEW'
                    ? 'bg-amber-400 text-slate-950 font-black'
                    : order.status === 'ACCEPTED'
                    ? 'bg-emerald-500 text-white'
                    : order.status === 'READY_FOR_DISPATCH'
                    ? 'bg-cyan-500 text-slate-950 font-black'
                    : order.status === 'DELIVERED'
                    ? 'bg-blue-500 text-white'
                    : order.status === 'REJECTED'
                    ? 'bg-rose-500 text-white'
                    : 'bg-slate-800 text-slate-200'
                }`}
              >
                {order.status.replace(/_/g, ' ')}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Received on {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Action Decision Bar (Accept / Reject / Dispatch) */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Order Desk Actions
            </span>

            <div className="flex flex-wrap gap-2.5">
              {['NEW', 'ASSIGNED', 'UNDER_REVIEW'].includes(order.status) && (
                <>
                  <button
                    onClick={handleAccept}
                    className="flex-1 min-w-36 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Accept & Reserve Stock</span>
                  </button>

                  <button
                    onClick={() => setRejectModalOpen(true)}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject Booking</span>
                  </button>
                </>
              )}

              {['ACCEPTED', 'PROCESSING'].includes(order.status) && onOpenDispatchModal && (
                <button
                  onClick={() => onOpenDispatchModal(order)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer"
                >
                  <Truck className="w-4 h-4" />
                  <span>Create Fleet Dispatch Ticket</span>
                </button>
              )}
            </div>

            {/* Quick Status Override Selector */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
              <span className="text-slate-600 font-medium">Update Status Workflow:</span>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
                className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
              >
                <option value="NEW">NEW</option>
                <option value="ASSIGNED">ASSIGNED</option>
                <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                <option value="ACCEPTED">ACCEPTED</option>
                <option value="PROCESSING">PROCESSING</option>
                <option value="READY_FOR_DISPATCH">READY_FOR_DISPATCH</option>
                <option value="OUT_FOR_DELIVERY">OUT_FOR_DELIVERY</option>
                <option value="DELIVERED">DELIVERED</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>
          </div>

          {/* Assigned Staff Selector */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-cyan-600" />
                <span>Assigned Order Desk Personnel</span>
              </span>
              <span className="text-[10px] text-slate-500">
                {order.assignedAt ? `Assigned on ${new Date(order.assignedAt).toLocaleDateString()}` : 'Not assigned'}
              </span>
            </div>

            <select
              value={selectedStaffId}
              onChange={(e) => handleAssignStaff(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg font-semibold text-slate-800 focus:ring-2 focus:ring-cyan-500 cursor-pointer"
            >
              <option value="">-- Unassigned --</option>
              {staff.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.roleTitle}) — {s.assignedOrdersCount} active tasks
                </option>
              ))}
            </select>
          </div>

          {/* ERP Stock Allocation Status */}
          <div
            className={`p-4 rounded-xl border text-xs space-y-2 ${
              stockCheck.allAvailable
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex items-center justify-between font-bold">
              <span className="flex items-center gap-1.5">
                <Warehouse className="w-4 h-4 text-cyan-700" />
                <span>ERP Finished Goods Stock Availability</span>
              </span>
              {order.stockReserved ? (
                <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[10px] font-black">
                  ✓ RESERVED IN LEDGER
                </span>
              ) : (
                <span className="text-slate-600 bg-white px-2 py-0.5 rounded text-[10px] font-semibold border">
                  NOT YET RESERVED
                </span>
              )}
            </div>

            {stockCheck.allAvailable ? (
              <p className="text-[11px] text-emerald-800">
                All ordered quantities are readily available in the finished goods pallet warehouse.
              </p>
            ) : (
              <div className="space-y-1 text-[11px]">
                <p className="font-semibold text-amber-900">
                  ⚠️ Some ordered quantities exceed ready free stock:
                </p>
                <ul className="list-disc list-inside space-y-0.5">
                  {stockCheck.issues.map((iss) => (
                    <li key={iss.productId}>
                      {iss.productName}: Needed {iss.requested}, free in warehouse: {iss.available}.
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Customer Details */}
          <div className="border border-slate-200 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-cyan-600" />
              <span>Customer Identification & Address</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Full Name:</span>
                <span className="font-bold text-slate-900 text-sm">{order.customer.fullName}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px]">Phone Number:</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono font-bold text-slate-900">
                    {order.customer.phoneNumber}
                  </span>
                  <a
                    href={`https://wa.me/${order.customer.phoneNumber.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                      order.customer.fullName
                    )},%20this%20is%20${encodeURIComponent(
                      activeOperator.name
                    )}%20from%20Elim%20Water%20regarding%20your%20order%20${order.orderReference}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold flex items-center gap-1"
                    title="Message Customer on WhatsApp"
                  >
                    <Send className="w-2.5 h-2.5" />
                    WhatsApp
                  </a>
                </div>
              </div>

              {order.customer.businessName && (
                <div>
                  <span className="text-slate-400 block text-[10px]">Company / Organization:</span>
                  <span className="font-semibold text-slate-900">{order.customer.businessName}</span>
                </div>
              )}

              {order.customer.email && (
                <div>
                  <span className="text-slate-400 block text-[10px]">Email Address:</span>
                  <span className="font-medium text-slate-800">{order.customer.email}</span>
                </div>
              )}

              <div className="sm:col-span-2">
                <span className="text-slate-400 block text-[10px]">
                  Fulfillment Method & Destination:
                </span>
                <p className="font-bold text-slate-900">
                  {order.customer.deliveryMethod === 'DELIVERY'
                    ? `${order.customer.deliveryAddress}, ${order.customer.cityArea}, ${order.customer.state}`
                    : 'Factory Self-Collection (Gate B Loading Dock)'}
                </p>
                <p className="text-[11px] text-cyan-700 mt-0.5 font-medium">
                  Target Date: {order.customer.preferredDeliveryDate} (
                  {order.customer.preferredDeliveryWindow || 'Standard Factory Hours'})
                </p>
              </div>

              {order.customer.specialInstructions && (
                <div className="sm:col-span-2 bg-amber-50/60 p-2.5 rounded-lg border border-amber-200 text-amber-900">
                  <strong className="block text-[10px] uppercase tracking-wide">
                    Customer Special Notes:
                  </strong>
                  <span>{order.customer.specialInstructions}</span>
                </div>
              )}
            </div>
          </div>

          {/* Ordered Products Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex justify-between text-xs font-bold text-slate-700">
              <span>Ordered Products ({order.items.length})</span>
              <span>Subtotal</span>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              {order.items.map((item) => (
                <div key={item.variantId} className="p-3.5 flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-slate-900">{item.productName}</h5>
                    <p className="text-[11px] text-cyan-700 font-medium">{item.variantName}</p>
                    <p className="text-[10px] text-slate-400">{item.packaging}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900 block">
                      ₦{item.totalPrice.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {item.quantity} × ₦{item.unitPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 p-3.5 border-t border-slate-200 space-y-1 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-slate-900">
                  ₦{order.subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Charge:</span>
                <span className="font-semibold text-slate-900">
                  ₦{order.deliveryFee.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-1 border-t border-slate-200">
                <span>Total Booking Value:</span>
                <span className="text-cyan-700 font-black">
                  ₦{order.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Internal Notes Section */}
          <div className="border border-slate-200 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-cyan-600" />
              <span>Internal Operational Notes</span>
            </h4>

            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                value={internalNoteInput}
                onChange={(e) => setInternalNoteInput(e.target.value)}
                placeholder="Add internal note (e.g. customer confirms empty 19L bottle count)..."
                className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition cursor-pointer"
              >
                Post
              </button>
            </form>

            <div className="space-y-2 max-h-40 overflow-y-auto">
              {order.internalNotes.length === 0 ? (
                <p className="text-[11px] text-slate-400 italic">No internal notes added yet.</p>
              ) : (
                order.internalNotes.map((note) => (
                  <div key={note.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                    <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                      <span className="font-bold text-slate-800">{note.authorName}</span>
                      <span>{new Date(note.createdAt).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-slate-700">{note.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Complete Status History / Audit Trail */}
          <div className="border border-slate-200 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-600" />
              <span>ERP Status & Activity History</span>
            </h4>

            <div className="space-y-2.5 max-h-48 overflow-y-auto">
              {order.statusHistory.map((h) => (
                <div key={h.id} className="text-xs flex gap-3 border-l-2 border-cyan-500 pl-3 py-0.5">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{h.status}</span>
                      <span className="text-[10px] text-slate-400">by {h.changedBy}</span>
                    </div>
                    {h.notes && <p className="text-[11px] text-slate-600 mt-0.5">{h.notes}</p>}
                    {h.reason && (
                      <p className="text-[11px] text-rose-600 font-semibold mt-0.5">
                        Reason: {h.reason}
                      </p>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                    {new Date(h.changedAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Reject Modal */}
      {rejectModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            onClick={() => setRejectModalOpen(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
          />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 z-10 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-bold text-base text-slate-900">Reject Customer Booking</h3>
            </div>
            <p className="text-xs text-slate-600">
              In accordance with factory ERP compliance, a rejection reason must be recorded and will
              be stored in the permanent audit trail:
            </p>

            <textarea
              rows={3}
              required
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. Delivery address outside coverage area / Customer phone unreachable / Customer requested cancellation..."
              className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRejectModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectConfirm}
                className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-lg cursor-pointer"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
