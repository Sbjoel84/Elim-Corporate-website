import React from 'react';
import {
  UserCheck,
  Phone,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  MessageSquare,
  ArrowRight,
  Send,
} from 'lucide-react';
import { OnlineOrder, StaffMember } from '../types/erp';

interface StaffWorkspaceProps {
  orders: OnlineOrder[];
  activeOperator: StaffMember;
  onOpenOrder: (order: OnlineOrder) => void;
}

export const StaffWorkspace: React.FC<StaffWorkspaceProps> = ({
  orders,
  activeOperator,
  onOpenOrder,
}) => {
  // Filter only orders assigned to this officer
  const myOrders = orders.filter((o) => o.assignedStaffId === activeOperator.id);

  const pendingCalls = myOrders.filter((o) => ['ASSIGNED', 'UNDER_REVIEW', 'AWAITING_CUSTOMER_CONFIRMATION'].includes(o.status));
  const readyToDispatch = myOrders.filter((o) => ['ACCEPTED', 'PROCESSING', 'READY_FOR_DISPATCH'].includes(o.status));
  const activeInTransit = myOrders.filter((o) => ['DISPATCHED', 'OUT_FOR_DELIVERY'].includes(o.status));
  const completed = myOrders.filter((o) => ['DELIVERED', 'COMPLETED'].includes(o.status));

  return (
    <div className="space-y-6">
      {/* Officer Header Profile */}
      <div className="bg-gradient-to-r from-slate-900 to-cyan-950 p-6 rounded-2xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <img
            src={activeOperator.avatar || '/assets/aistudio/ESS07808-_952f4c20.jpg'}
            alt={activeOperator.name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-cyan-400"
          />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-300">
              Assigned Order Desk Workspace
            </span>
            <h2 className="text-xl font-black">{activeOperator.name}</h2>
            <p className="text-xs text-slate-300">
              {activeOperator.roleTitle} • {activeOperator.department}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
          <div>
            <span className="text-2xl font-black text-cyan-300 block">{myOrders.length}</span>
            <span className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">
              Total Assigned
            </span>
          </div>
          <div className="border-l border-white/20 pl-3">
            <span className="text-2xl font-black text-amber-300 block">{pendingCalls.length}</span>
            <span className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">
              Pending Actions
            </span>
          </div>
        </div>
      </div>

      {/* Task Buckets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bucket 1: Customer Phone Verification & Review */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col overflow-hidden">
          <div className="p-4 bg-amber-50/70 border-b border-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-600" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-amber-950">
                1. Customer Verification ({pendingCalls.length})
              </h3>
            </div>
            <span className="text-[10px] text-amber-800 font-bold">Needs Phone Call</span>
          </div>

          <div className="p-4 flex-1 space-y-3 overflow-y-auto max-h-96">
            {pendingCalls.length === 0 ? (
              <p className="text-xs text-slate-400 italic text-center py-6">
                No bookings awaiting customer verification.
              </p>
            ) : (
              pendingCalls.map((ord) => (
                <div
                  key={ord.id}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-2 hover:border-cyan-400 transition"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-mono font-bold text-xs text-slate-900">
                      {ord.orderReference}
                    </span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                      {ord.status}
                    </span>
                  </div>

                  <div>
                    <h5 className="font-bold text-xs text-slate-900">{ord.customer.fullName}</h5>
                    <p className="text-[11px] text-slate-500 font-mono">{ord.customer.phoneNumber}</p>
                    <p className="text-[10px] text-cyan-700 font-medium truncate mt-0.5">
                      {ord.items.length} items • ₦{ord.totalAmount.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex gap-2 pt-1 border-t border-slate-200/60">
                    <a
                      href={`https://wa.me/${ord.customer.phoneNumber.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                        ord.customer.fullName
                      )},%20this%20is%20${encodeURIComponent(
                        activeOperator.name
                      )}%20from%20Elim%20Water%20regarding%20booking%20${ord.orderReference}.`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold"
                    >
                      WhatsApp Call
                    </a>
                    <button
                      onClick={() => onOpenOrder(ord)}
                      className="px-2.5 py-1 bg-slate-900 text-white rounded text-[10px] font-bold"
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bucket 2: Ready for Dispatch */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col overflow-hidden">
          <div className="p-4 bg-cyan-50/70 border-b border-cyan-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-cyan-600" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-cyan-950">
                2. Warehouse & Dispatch Queue ({readyToDispatch.length})
              </h3>
            </div>
            <span className="text-[10px] text-cyan-800 font-bold">Stock Reserved</span>
          </div>

          <div className="p-4 flex-1 space-y-3 overflow-y-auto max-h-96">
            {readyToDispatch.length === 0 ? (
              <p className="text-xs text-slate-400 italic text-center py-6">
                No orders waiting for vehicle dispatch.
              </p>
            ) : (
              readyToDispatch.map((ord) => (
                <div
                  key={ord.id}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-2 hover:border-cyan-400 transition"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-mono font-bold text-xs text-cyan-900">
                      {ord.orderReference}
                    </span>
                    <span className="text-[10px] bg-cyan-100 text-cyan-800 font-bold px-2 py-0.5 rounded">
                      {ord.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div>
                    <h5 className="font-bold text-xs text-slate-900">{ord.customer.fullName}</h5>
                    <p className="text-[11px] text-slate-600 truncate">
                      {ord.customer.deliveryMethod === 'DELIVERY'
                        ? ord.customer.deliveryAddress
                        : 'Factory Pickup'}
                    </p>
                    <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                      ✓ ERP Warehouse Stock Allocated
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenOrder(ord)}
                    className="w-full py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-xs font-bold transition"
                  >
                    Manage Loading / Dispatch
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bucket 3: In Transit & Delivered */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col overflow-hidden">
          <div className="p-4 bg-emerald-50/70 border-b border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-950">
                3. In Transit & Delivered ({activeInTransit.length + completed.length})
              </h3>
            </div>
            <span className="text-[10px] text-emerald-800 font-bold">Fulfillment</span>
          </div>

          <div className="p-4 flex-1 space-y-3 overflow-y-auto max-h-96">
            {[...activeInTransit, ...completed].length === 0 ? (
              <p className="text-xs text-slate-400 italic text-center py-6">
                No active dispatches or completed deliveries.
              </p>
            ) : (
              [...activeInTransit, ...completed].map((ord) => (
                <div
                  key={ord.id}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-2 hover:border-emerald-400 transition"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-mono font-bold text-xs text-slate-900">
                      {ord.orderReference}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        ord.status === 'DELIVERED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {ord.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div>
                    <h5 className="font-bold text-xs text-slate-900">{ord.customer.fullName}</h5>
                    <p className="text-[11px] text-slate-500 font-mono">{ord.customer.phoneNumber}</p>
                  </div>

                  <button
                    onClick={() => onOpenOrder(ord)}
                    className="w-full py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-semibold"
                  >
                    View Timeline
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
