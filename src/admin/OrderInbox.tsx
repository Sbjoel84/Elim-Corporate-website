import React, { useState, useMemo } from 'react';
import {
  Inbox,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  Truck,
  Eye,
  Calendar,
  Phone,
  UserCheck,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react';
import { OnlineOrder, OrderStatus, StaffMember } from '../types/erp';

interface OrderInboxProps {
  orders: OnlineOrder[];
  staff: StaffMember[];
  onOpenOrder: (order: OnlineOrder) => void;
}

export const OrderInbox: React.FC<OrderInboxProps> = ({ orders, staff, onOpenOrder }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [staffFilter, setStaffFilter] = useState('ALL');

  const filterTabs = [
    { id: 'ALL', label: 'All Orders', count: orders.length },
    {
      id: 'NEW',
      label: 'New Bookings',
      count: orders.filter((o) => o.status === 'NEW').length,
      badgeColor: 'bg-amber-500 text-white',
    },
    {
      id: 'ASSIGNED',
      label: 'Assigned / Review',
      count: orders.filter((o) => ['ASSIGNED', 'UNDER_REVIEW'].includes(o.status)).length,
    },
    {
      id: 'ACCEPTED',
      label: 'Accepted / Stock Reserved',
      count: orders.filter((o) => ['ACCEPTED', 'PROCESSING'].includes(o.status)).length,
    },
    {
      id: 'READY_FOR_DISPATCH',
      label: 'Ready for Dispatch',
      count: orders.filter((o) => ['READY_FOR_DISPATCH', 'DISPATCH_ASSIGNED'].includes(o.status)).length,
    },
    {
      id: 'OUT_FOR_DELIVERY',
      label: 'In Transit',
      count: orders.filter((o) => ['DISPATCHED', 'OUT_FOR_DELIVERY'].includes(o.status)).length,
    },
    {
      id: 'DELIVERED',
      label: 'Delivered',
      count: orders.filter((o) => ['DELIVERED', 'COMPLETED'].includes(o.status)).length,
    },
    {
      id: 'REJECTED',
      label: 'Rejected',
      count: orders.filter((o) => o.status === 'REJECTED' || o.status === 'CANCELLED').length,
    },
  ];

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      // Status filter
      let matchesStatus = true;
      if (selectedFilter === 'NEW') matchesStatus = o.status === 'NEW';
      else if (selectedFilter === 'ASSIGNED')
        matchesStatus = ['ASSIGNED', 'UNDER_REVIEW'].includes(o.status);
      else if (selectedFilter === 'ACCEPTED')
        matchesStatus = ['ACCEPTED', 'PROCESSING'].includes(o.status);
      else if (selectedFilter === 'READY_FOR_DISPATCH')
        matchesStatus = ['READY_FOR_DISPATCH', 'DISPATCH_ASSIGNED'].includes(o.status);
      else if (selectedFilter === 'OUT_FOR_DELIVERY')
        matchesStatus = ['DISPATCHED', 'OUT_FOR_DELIVERY'].includes(o.status);
      else if (selectedFilter === 'DELIVERED')
        matchesStatus = ['DELIVERED', 'COMPLETED'].includes(o.status);
      else if (selectedFilter === 'REJECTED')
        matchesStatus = o.status === 'REJECTED' || o.status === 'CANCELLED';

      // Staff filter
      const matchesStaff = staffFilter === 'ALL' || o.assignedStaffId === staffFilter;

      // Search query
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        o.orderReference.toLowerCase().includes(q) ||
        o.customer.fullName.toLowerCase().includes(q) ||
        o.customer.phoneNumber.toLowerCase().includes(q) ||
        o.customer.cityArea.toLowerCase().includes(q) ||
        (o.customer.businessName && o.customer.businessName.toLowerCase().includes(q));

      return matchesStatus && matchesStaff && matchesSearch;
    });
  }, [orders, selectedFilter, staffFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Title & Stats Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-black text-slate-900">Online Customer Bookings Inbox</h2>
          <p className="text-xs text-slate-500">
            Factory order desk queue • Assign personnel, verify ERP stock, accept/reject, and schedule dispatch
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg">
            Showing {filteredOrders.length} of {orders.length} Bookings
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {filterTabs.map((tab) => {
          const isActive = selectedFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950'
                    : tab.badgeColor || 'bg-slate-100 text-slate-700'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search and Secondary Filter Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order Ref, customer name, phone, or company..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
            Assigned Officer:
          </span>
          <select
            value={staffFilter}
            onChange={(e) => setStaffFilter(e.target.value)}
            className="text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-cyan-500"
          >
            <option value="ALL">All Officers</option>
            {staff.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.assignedOrdersCount} active)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <Inbox className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-800">No bookings match the selected filter</p>
            <p className="text-xs text-slate-500">Try changing status or clearing your search term.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                  <th className="py-3 px-4">Order Ref / Date</th>
                  <th className="py-3 px-4">Customer Details</th>
                  <th className="py-3 px-4">Products & Value</th>
                  <th className="py-3 px-4">Delivery Schedule</th>
                  <th className="py-3 px-4">Assigned Personnel</th>
                  <th className="py-3 px-4">Booking Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((order) => {
                  return (
                    <tr key={order.id} className="hover:bg-cyan-50/30 transition">
                      {/* Ref */}
                      <td className="py-3.5 px-4 font-mono">
                        <span className="font-black text-cyan-950 block">{order.orderReference}</span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(order.createdAt).toLocaleDateString()}{' '}
                          {new Date(order.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </td>

                      {/* Customer */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 block">{order.customer.fullName}</span>
                        {order.customer.businessName && (
                          <span className="text-[11px] text-cyan-700 block font-medium">
                            {order.customer.businessName}
                          </span>
                        )}
                        <span className="text-[11px] text-slate-500 font-mono">
                          {order.customer.phoneNumber}
                        </span>
                      </td>

                      {/* Products */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 block">
                          ₦{order.totalAmount.toLocaleString()}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {order.items.reduce((a, c) => a + c.quantity, 0)} units across{' '}
                          {order.items.length} {order.items.length === 1 ? 'line' : 'lines'}
                        </span>
                      </td>

                      {/* Delivery */}
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-800 block">
                          {order.customer.deliveryMethod === 'DELIVERY'
                            ? 'Doorstep Fleet'
                            : 'Factory Pickup'}
                        </span>
                        <span className="text-[11px] text-slate-500 block truncate max-w-xs">
                          {order.customer.cityArea}, {order.customer.state}
                        </span>
                        <span className="text-[10px] text-cyan-700 block font-medium">
                          Target: {order.customer.preferredDeliveryDate}
                        </span>
                      </td>

                      {/* Staff */}
                      <td className="py-3.5 px-4">
                        {order.assignedStaffName ? (
                          <span className="inline-flex items-center gap-1 font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                            <UserCheck className="w-3 h-3 text-cyan-600" />
                            {order.assignedStaffName}
                          </span>
                        ) : (
                          <span className="text-amber-600 font-bold text-[11px]">Unassigned</span>
                        )}
                        {order.stockReserved && (
                          <span className="block text-[10px] text-emerald-700 font-semibold mt-0.5">
                            ✓ ERP Stock Reserved
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            order.status === 'NEW'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                              : order.status === 'ACCEPTED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : order.status === 'READY_FOR_DISPATCH'
                              ? 'bg-cyan-100 text-cyan-900 font-bold'
                              : order.status === 'OUT_FOR_DELIVERY'
                              ? 'bg-blue-600 text-white'
                              : order.status === 'DELIVERED'
                              ? 'bg-slate-900 text-white'
                              : order.status === 'REJECTED'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {order.status.replace(/_/g, ' ')}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => onOpenOrder(order)}
                          className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg transition shadow-xs cursor-pointer"
                        >
                          Process Booking
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
