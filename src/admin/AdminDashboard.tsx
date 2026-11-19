import React from 'react';
import {
  Inbox,
  Clock,
  CheckCircle2,
  Truck,
  Warehouse,
  AlertTriangle,
  UserCheck,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Package,
} from 'lucide-react';
import { OnlineOrder, StaffMember, Product } from '../types/erp';
import { erpStorage } from '../services/erpStorage';

interface AdminDashboardProps {
  orders: OnlineOrder[];
  products: Product[];
  staff: StaffMember[];
  onOpenOrder: (order: OnlineOrder) => void;
  onNavigateTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  orders,
  products,
  staff,
  onOpenOrder,
  onNavigateTab,
}) => {
  const totalBookings = orders.length;
  const newBookings = orders.filter((o) => o.status === 'NEW').length;
  const underReview = orders.filter((o) => ['ASSIGNED', 'UNDER_REVIEW', 'AWAITING_CUSTOMER_CONFIRMATION'].includes(o.status)).length;
  const acceptedOrders = orders.filter((o) => ['ACCEPTED', 'PROCESSING', 'AWAITING_STOCK_CONFIRMATION'].includes(o.status)).length;
  const readyForDispatch = orders.filter((o) => ['READY_FOR_DISPATCH', 'DISPATCH_ASSIGNED'].includes(o.status)).length;
  const inTransit = orders.filter((o) => ['DISPATCHED', 'OUT_FOR_DELIVERY'].includes(o.status)).length;
  const delivered = orders.filter((o) => ['DELIVERED', 'COMPLETED'].includes(o.status)).length;
  const rejected = orders.filter((o) => o.status === 'REJECTED' || o.status === 'CANCELLED').length;

  const totalBookingValue = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);

  // Finished Goods low stock alerts
  const lowStockProds = products.filter(
    (p) => p.currentStock - p.reservedStock < p.minReorderLevel
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full">
            Elim Water Factory Operations
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Online Orders & Dispatch Control Centre
          </h1>
          <p className="text-xs text-slate-500">
            Real-time synchronization between website customer bookings and Elim Water factory ERP.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('inbox')}
            className="flex items-center gap-2 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold rounded-xl shadow-sm transition cursor-pointer"
          >
            <Inbox className="w-4 h-4" />
            <span>Open Order Inbox ({newBookings} new)</span>
          </button>
          <button
            onClick={() => onNavigateTab('dispatch')}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition cursor-pointer"
          >
            <Truck className="w-4 h-4" />
            <span>Manage Fleet Dispatch</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Bookings */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Orders</span>
            <Package className="w-4 h-4 text-cyan-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{totalBookings}</p>
          <p className="text-[10px] text-slate-400">₦{totalBookingValue.toLocaleString()}</p>
        </div>

        {/* New Bookings */}
        <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs space-y-1 bg-amber-50/30">
          <div className="flex items-center justify-between text-amber-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">New Incoming</span>
            <Inbox className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-amber-900">{newBookings}</p>
          <p className="text-[10px] text-amber-700 font-semibold">Requires Desk Action</p>
        </div>

        {/* Assigned & Review */}
        <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-blue-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">Under Review</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-blue-900">{underReview}</p>
          <p className="text-[10px] text-blue-700 font-medium">Assigned to staff</p>
        </div>

        {/* Accepted & Processing */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Accepted / Stock</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{acceptedOrders}</p>
          <p className="text-[10px] text-emerald-600 font-semibold">Stock Reserved in ERP</p>
        </div>

        {/* Ready & In Transit */}
        <div className="bg-white p-4 rounded-xl border border-cyan-200 shadow-xs space-y-1 bg-cyan-50/30">
          <div className="flex items-center justify-between text-cyan-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">Dispatch / Transit</span>
            <Truck className="w-4 h-4 text-cyan-600" />
          </div>
          <p className="text-2xl font-black text-cyan-950">{readyForDispatch + inTransit}</p>
          <p className="text-[10px] text-cyan-700 font-semibold">
            {readyForDispatch} Ready, {inTransit} in Transit
          </p>
        </div>

        {/* Delivered Completed */}
        <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-xs space-y-1 bg-emerald-50/30">
          <div className="flex items-center justify-between text-emerald-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">Delivered</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-950">{delivered}</p>
          <p className="text-[10px] text-emerald-700 font-semibold">Recipient Confirmed</p>
        </div>
      </div>

      {/* Two Column Layout: Staff Workload & Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assigned Staff Workload (1 col) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-cyan-600" />
              <h3 className="font-bold text-sm text-slate-900">Staff Workload Distribution</h3>
            </div>
            <button
              onClick={() => onNavigateTab('workspace')}
              className="text-xs text-cyan-700 hover:underline font-semibold"
            >
              My Desk →
            </button>
          </div>

          <div className="space-y-3">
            {staff.map((st) => (
              <div
                key={st.id}
                className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={st.avatar || '/assets/aistudio/ESS07808-_952f4c20.jpg'}
                    alt={st.name}
                    className="w-8 h-8 rounded-full object-cover border border-cyan-400 shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{st.name}</h4>
                    <p className="text-[10px] text-slate-500">{st.roleTitle}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-slate-900 bg-white px-2 py-1 rounded-md border border-slate-200">
                    {st.assignedOrdersCount} active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warehouse Inventory Alerts (2 cols) */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Warehouse className="w-4 h-4 text-cyan-600" />
              <h3 className="font-bold text-sm text-slate-900">
                ERP Finished Goods Warehouse Status
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('inventory')}
              className="text-xs text-cyan-700 hover:underline font-semibold"
            >
              View Full Stock Ledger →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {products.slice(0, 4).map((p) => {
              const freeStock = Math.max(0, p.currentStock - p.reservedStock);
              const isLow = freeStock < p.minReorderLevel;
              return (
                <div
                  key={p.id}
                  className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                    isLow ? 'bg-amber-50/70 border-amber-200' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono text-[10px] text-slate-400 block">{p.sku}</span>
                      <h4 className="font-bold text-slate-900 line-clamp-1">{p.name}</h4>
                    </div>
                    {isLow ? (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                        Low Stock
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        Healthy
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-1 text-[11px] pt-1 border-t border-slate-200/60">
                    <div>
                      <span className="text-slate-400 block text-[9px]">Physical:</span>
                      <span className="font-semibold text-slate-800">{p.currentStock}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px]">Reserved:</span>
                      <span className="font-semibold text-cyan-700">{p.reservedStock}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px]">Available:</span>
                      <span className="font-black text-slate-900">{freeStock}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Incoming Bookings Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Recent Online Customer Bookings</h3>
            <p className="text-xs text-slate-500">
              Live incoming queue requiring verification, stock allocation, and dispatch
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('inbox')}
            className="text-xs font-bold text-cyan-700 hover:text-cyan-800 transition"
          >
            View All ({orders.length}) →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                <th className="py-3 px-4">Order Ref</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Products / Value</th>
                <th className="py-3 px-4">Method / Destination</th>
                <th className="py-3 px-4">Assigned Officer</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.slice(0, 5).map((order) => {
                return (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-cyan-900">
                      {order.orderReference}
                      <span className="block text-[10px] text-slate-400 font-normal">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 block">{order.customer.fullName}</span>
                      <span className="text-slate-500 font-mono text-[11px]">
                        {order.customer.phoneNumber}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800 block">
                        {order.items.length} items
                      </span>
                      <span className="text-cyan-700 font-bold">
                        ₦{order.totalAmount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-slate-800 block">
                        {order.customer.deliveryMethod === 'DELIVERY' ? 'Doorstep Fleet' : 'Factory Pickup'}
                      </span>
                      <span className="text-slate-400 truncate max-w-xs block text-[11px]">
                        {order.customer.cityArea}, {order.customer.state}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-xs font-semibold text-slate-900 block">
                        {order.assignedStaffName || 'Unassigned'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          order.status === 'NEW'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : order.status === 'ACCEPTED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'READY_FOR_DISPATCH'
                            ? 'bg-cyan-100 text-cyan-800'
                            : order.status === 'DELIVERED'
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {order.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onOpenOrder(order)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-cyan-600 hover:text-white text-slate-700 font-bold rounded-lg transition cursor-pointer"
                      >
                        Open Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
