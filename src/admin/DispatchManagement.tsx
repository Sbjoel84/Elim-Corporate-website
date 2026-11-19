import React, { useState } from 'react';
import {
  Truck,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Calendar,
  User,
  ShieldCheck,
  RotateCcw,
  PackageCheck,
  Search,
  Filter,
} from 'lucide-react';
import {
  DispatchRecord,
  OnlineOrder,
  StaffMember,
  Vehicle,
  DeliveryConfirmation,
} from '../types/erp';
import { erpStorage } from '../services/erpStorage';

interface DispatchManagementProps {
  dispatches: DispatchRecord[];
  orders: OnlineOrder[];
  vehicles: Vehicle[];
  staff: StaffMember[];
  activeOperator: StaffMember;
  onRefresh: () => void;
  targetOrderForDispatch?: OnlineOrder | null;
  onClearTargetOrder?: () => void;
}

export const DispatchManagement: React.FC<DispatchManagementProps> = ({
  dispatches,
  orders,
  vehicles,
  staff,
  activeOperator,
  onRefresh,
  targetOrderForDispatch,
  onClearTargetOrder,
}) => {
  const [createModalOpen, setCreateModalOpen] = useState(!!targetOrderForDispatch);
  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    targetOrderForDispatch?.id || ''
  );
  const [selectedDriverId, setSelectedDriverId] = useState<string>('staff-01');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('veh-01');
  const [dispatchDate, setDispatchDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [expectedDate, setExpectedDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [dispatchNotes, setDispatchNotes] = useState('');

  // Confirmation modal state
  const [confirmModalDispatch, setConfirmModalDispatch] = useState<DispatchRecord | null>(null);
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [deliveredQuantity, setDeliveredQuantity] = useState<number>(0);
  const [undeliveredQuantity, setUndeliveredQuantity] = useState<number>(0);
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [isFailedDelivery, setIsFailedDelivery] = useState(false);
  const [failReason, setFailReason] = useState('');
  const [returnCondition, setReturnCondition] = useState<'INTACT_RESTOCKABLE' | 'DAMAGED_REJECTED'>('INTACT_RESTOCKABLE');

  // Filter
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Orders eligible for dispatch
  const readyOrders = orders.filter((o) =>
    ['ACCEPTED', 'PROCESSING', 'READY_FOR_DISPATCH'].includes(o.status)
  );

  const drivers = staff.filter((s) => s.role === 'DRIVER' || s.role === 'DISPATCH_SUPERVISOR' || s.role === 'ORDER_MANAGER');

  const filteredDispatches = dispatches.filter((d) => {
    if (statusFilter === 'ALL') return true;
    return d.status === statusFilter;
  });

  const handleOpenCreateModal = (ord?: OnlineOrder) => {
    if (ord) {
      setSelectedOrderId(ord.id);
    } else if (readyOrders.length > 0) {
      setSelectedOrderId(readyOrders[0].id);
    }
    setCreateModalOpen(true);
  };

  const handleCreateDispatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderId) {
      alert('Please select an order to dispatch.');
      return;
    }

    const created = erpStorage.createDispatch({
      orderId: selectedOrderId,
      driverId: selectedDriverId,
      vehicleId: selectedVehicleId,
      dispatchDate,
      expectedDeliveryDate: expectedDate,
      notes: dispatchNotes,
      createdBy: activeOperator.name,
    });

    if (created) {
      setCreateModalOpen(false);
      if (onClearTargetOrder) onClearTargetOrder();
      onRefresh();
    }
  };

  const handleMarkInTransit = (dispatchId: string) => {
    erpStorage.markDispatchInTransit(dispatchId, activeOperator.name);
    onRefresh();
  };

  const handleOpenConfirmModal = (dispatch: DispatchRecord) => {
    const totalOrdered = dispatch.dispatchedItems.reduce((a, c) => a + c.dispatchedQuantity, 0);
    setConfirmModalDispatch(dispatch);
    setRecipientName(dispatch.customerName);
    setRecipientPhone(dispatch.customerPhone);
    setDeliveredQuantity(totalOrdered);
    setUndeliveredQuantity(0);
    setIsFailedDelivery(false);
    setFailReason('');
  };

  const handleConfirmDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmModalDispatch) return;

    if (!recipientName.trim() || !recipientPhone.trim()) {
      alert('Recipient name and phone number are required.');
      return;
    }

    if (isFailedDelivery && !failReason.trim()) {
      alert('Please provide a reason for the failed delivery.');
      return;
    }

    erpStorage.recordDeliveryConfirmation({
      dispatchId: confirmModalDispatch.id,
      deliveredQuantity,
      undeliveredQuantity,
      recipientName,
      recipientPhone,
      notes: deliveryNotes,
      isFailed: isFailedDelivery,
      failReason,
      returnCondition,
      confirmedBy: activeOperator.name,
    });

    setConfirmModalDispatch(null);
    onRefresh();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full">
            Logistics & Fleet Operations
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            Dispatch, Delivery & Fleet Management
          </h2>
          <p className="text-xs text-slate-500">
            Assign vehicles, coordinate drivers, track deliveries, and manage partial/returned goods.
          </p>
        </div>

        <button
          onClick={() => handleOpenCreateModal()}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Dispatch Ticket</span>
        </button>
      </div>

      {/* Fleet Vehicles Status Cards */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <Truck className="w-4 h-4 text-cyan-600" />
          <span>Elim Factory Delivery Fleet Status</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {vehicles.map((v) => (
            <div
              key={v.id}
              className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                v.status === 'AVAILABLE'
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : 'bg-cyan-50/50 border-cyan-200'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-mono font-bold text-slate-900">{v.plateNumber}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    v.status === 'AVAILABLE'
                      ? 'bg-emerald-200 text-emerald-900'
                      : 'bg-cyan-200 text-cyan-900'
                  }`}
                >
                  {v.status.replace('_', ' ')}
                </span>
              </div>
              <p className="font-semibold text-slate-800 text-[11px] truncate">{v.model}</p>
              <div className="text-[10px] text-slate-500 flex justify-between">
                <span>Capacity: {v.capacityCartons} cartons</span>
                <span>Driver: {v.assignedDriverName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dispatches Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Filter Dispatches:</span>
            <div className="flex gap-1">
              {['ALL', 'READY_FOR_DISPATCH', 'IN_TRANSIT', 'DELIVERED', 'PARTIALLY_DELIVERED', 'FAILED_RETURNED'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition ${
                    statusFilter === st
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st.replace(/_/g, ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredDispatches.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500">
            No dispatch records matching this filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                  <th className="py-3 px-3">Dispatch # / Date</th>
                  <th className="py-3 px-3">Order Ref / Customer</th>
                  <th className="py-3 px-3">Vehicle & Driver</th>
                  <th className="py-3 px-3">Destination</th>
                  <th className="py-3 px-3">Quantities</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDispatches.map((dsp) => {
                  const totalItems = dsp.dispatchedItems.reduce((a, c) => a + c.dispatchedQuantity, 0);
                  return (
                    <tr key={dsp.id} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-3 font-mono">
                        <span className="font-bold text-slate-900 block">{dsp.dispatchNumber}</span>
                        <span className="text-[10px] text-slate-400">{dsp.dispatchDate}</span>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-bold text-cyan-900 block font-mono">
                          {dsp.orderReference}
                        </span>
                        <span className="text-slate-800 font-semibold">{dsp.customerName}</span>
                        <span className="text-[10px] text-slate-400 block">{dsp.customerPhone}</span>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-bold text-slate-900 block">{dsp.vehiclePlate}</span>
                        <span className="text-[11px] text-slate-600">{dsp.driverName}</span>
                        <span className="text-[10px] text-slate-400 block">{dsp.vehicleModel}</span>
                      </td>

                      <td className="py-3 px-3">
                        <span className="truncate max-w-xs block text-slate-700">
                          {dsp.deliveryAddress}
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-bold text-slate-900 block">{totalItems} units</span>
                        {dsp.deliveryConfirmation && (
                          <span className="text-[10px] text-emerald-700 font-semibold">
                            Delivered: {dsp.deliveryConfirmation.deliveredQuantity}
                            {dsp.deliveryConfirmation.undeliveredQuantity > 0 &&
                              ` (Pending: ${dsp.deliveryConfirmation.undeliveredQuantity})`}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            dsp.status === 'READY_FOR_DISPATCH'
                              ? 'bg-amber-100 text-amber-800'
                              : dsp.status === 'IN_TRANSIT'
                              ? 'bg-blue-600 text-white animate-pulse'
                              : dsp.status === 'DELIVERED'
                              ? 'bg-emerald-600 text-white'
                              : dsp.status === 'PARTIALLY_DELIVERED'
                              ? 'bg-amber-500 text-slate-950 font-black'
                              : 'bg-rose-600 text-white'
                          }`}
                        >
                          {dsp.status.replace(/_/g, ' ')}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-right space-x-1">
                        {dsp.status === 'READY_FOR_DISPATCH' && (
                          <button
                            onClick={() => handleMarkInTransit(dsp.id)}
                            className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-[11px] transition cursor-pointer"
                          >
                            Depart (In Transit)
                          </button>
                        )}

                        {dsp.status === 'IN_TRANSIT' && (
                          <button
                            onClick={() => handleOpenConfirmModal(dsp)}
                            className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] transition cursor-pointer"
                          >
                            Confirm Handover
                          </button>
                        )}

                        {['DELIVERED', 'PARTIALLY_DELIVERED', 'FAILED_RETURNED'].includes(
                          dsp.status
                        ) && (
                          <span className="text-[11px] text-slate-400 italic">Closed Record</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Dispatch Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setCreateModalOpen(false)} className="fixed inset-0 bg-slate-900/60" />
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 z-10 space-y-5">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-cyan-600" />
              <span>Create Fleet Dispatch Schedule Ticket</span>
            </h3>

            <form onSubmit={handleCreateDispatchSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Order to Fulfill</label>
                <select
                  value={selectedOrderId}
                  onChange={(e) => setSelectedOrderId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-medium text-slate-800"
                >
                  <option value="">-- Choose Order --</option>
                  {readyOrders.map((ord) => (
                    <option key={ord.id} value={ord.id}>
                      {ord.orderReference} — {ord.customer.fullName} ({ord.items.length} items, ₦
                      {ord.totalAmount.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Select Delivery Vehicle</label>
                  <select
                    value={selectedVehicleId}
                    onChange={(e) => setSelectedVehicleId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-medium text-slate-800"
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.plateNumber} ({v.model} - {v.capacityCartons} cap)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assigned Driver</label>
                  <select
                    value={selectedDriverId}
                    onChange={(e) => setSelectedDriverId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-medium text-slate-800"
                  >
                    {drivers.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.phoneNumber})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Dispatch Date</label>
                  <input
                    type="date"
                    value={dispatchDate}
                    onChange={(e) => setDispatchDate(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Expected Delivery Date</label>
                  <input
                    type="date"
                    value={expectedDate}
                    onChange={(e) => setExpectedDate(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Dispatch Notes / Gate Instructions</label>
                <textarea
                  rows={2}
                  value={dispatchNotes}
                  onChange={(e) => setDispatchNotes(e.target.value)}
                  placeholder="e.g. Loading dock Bay 3, driver should inspect seals before departure..."
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg"
                >
                  Generate Dispatch Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delivery Confirmation Modal (Handles Full, Partial Deliveries & Returns!) */}
      {confirmModalDispatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setConfirmModalDispatch(null)}
            className="fixed inset-0 bg-slate-900/60"
          />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 z-10 space-y-4 text-xs">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-emerald-600" />
              <span>Record Delivery Confirmation & Handover</span>
            </h3>

            <p className="text-slate-500">
              Dispatch: <strong>{confirmModalDispatch.dispatchNumber}</strong> (Order:{' '}
              {confirmModalDispatch.orderReference})
            </p>

            <form onSubmit={handleConfirmDeliverySubmit} className="space-y-4">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <input
                  type="checkbox"
                  id="failCheck"
                  checked={isFailedDelivery}
                  onChange={(e) => {
                    setIsFailedDelivery(e.target.checked);
                    if (e.target.checked) {
                      setUndeliveredQuantity(
                        confirmModalDispatch.dispatchedItems.reduce((a, c) => a + c.dispatchedQuantity, 0)
                      );
                      setDeliveredQuantity(0);
                    }
                  }}
                  className="rounded text-rose-600 focus:ring-rose-500"
                />
                <label htmlFor="failCheck" className="font-bold text-rose-700 cursor-pointer">
                  Mark as Failed Delivery / Goods Returned to Factory
                </label>
              </div>

              {!isFailedDelivery ? (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Delivered Quantity (Cartons/Refills)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={deliveredQuantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10) || 0;
                          const total = confirmModalDispatch.dispatchedItems.reduce(
                            (a, c) => a + c.dispatchedQuantity,
                            0
                          );
                          setDeliveredQuantity(val);
                          setUndeliveredQuantity(Math.max(0, total - val));
                        }}
                        className="w-full p-2 border border-slate-300 rounded-lg font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Undelivered Quantity (Pending)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={undeliveredQuantity}
                        onChange={(e) => setUndeliveredQuantity(parseInt(e.target.value, 10) || 0)}
                        className="w-full p-2 border border-slate-300 rounded-lg font-bold bg-slate-50"
                      />
                    </div>
                  </div>

                  {undeliveredQuantity > 0 && (
                    <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-amber-900 text-[11px]">
                      <strong>Partial Delivery Detected:</strong> {deliveredQuantity} units will be
                      marked delivered, and {undeliveredQuantity} units will remain open on the order
                      for subsequent dispatch without overwriting the original contract!
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Recipient Name</label>
                      <input
                        type="text"
                        required
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder="Person receiving goods"
                        className="w-full p-2 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Recipient Phone</label>
                      <input
                        type="tel"
                        required
                        value={recipientPhone}
                        onChange={(e) => setRecipientPhone(e.target.value)}
                        placeholder="Phone number"
                        className="w-full p-2 border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-3 bg-rose-50 p-3 rounded-xl border border-rose-200">
                  <div>
                    <label className="block font-bold text-rose-900 mb-1">
                      Reason for Failed Delivery <span className="text-rose-600">*</span>
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={failReason}
                      onChange={(e) => setFailReason(e.target.value)}
                      placeholder="e.g. Customer premises closed / phone unreachable / road inaccessible / rejected..."
                      className="w-full p-2 border border-rose-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-rose-900 mb-1">Returned Product Condition</label>
                    <select
                      value={returnCondition}
                      onChange={(e) => setReturnCondition(e.target.value as any)}
                      className="w-full p-2 border border-rose-300 rounded-lg bg-white"
                    >
                      <option value="INTACT_RESTOCKABLE">Intact & Sealed (Sent to QA Quarantine)</option>
                      <option value="DAMAGED_REJECTED">Damaged / Broken Seals (Reject write-off)</option>
                    </select>
                    <p className="text-[10px] text-slate-500 mt-1">
                      In line with ERP rules, returned goods are quarantined and do not automatically
                      increase stock until physical QA clearance.
                    </p>
                  </div>
                </div>
              )}

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Delivery Notes</label>
                <input
                  type="text"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder="e.g. Empty 19L bottles collected and loaded back onto vehicle..."
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setConfirmModalDispatch(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg"
                >
                  Save Delivery Confirmation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
