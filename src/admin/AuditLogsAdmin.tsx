import React from 'react';
import { ShieldCheck, Clock, FileText, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { erpStorage } from '../services/erpStorage';
import { OnlineOrder } from '../types/erp';

interface AuditLogsAdminProps {
  orders: OnlineOrder[];
}

export const AuditLogsAdmin: React.FC<AuditLogsAdminProps> = ({ orders }) => {
  const inventoryLogs = erpStorage.getInventoryLogs();

  // Aggregate all order status events
  const orderEvents = orders
    .flatMap((o) =>
      o.statusHistory.map((h) => ({
        ...h,
        orderReference: o.orderReference,
      }))
    )
    .sort((a, b) => new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full">
            Enterprise Security & Governance
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-1">ERP Transaction & Activity Logs</h2>
          <p className="text-xs text-slate-500">
            Immutable timeline of order transitions, inventory movements, and staff actions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Status Transitions Log */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-600" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">
              Customer Booking Status Transitions ({orderEvents.length})
            </h3>
          </div>

          <div className="p-4 max-h-[600px] overflow-y-auto space-y-3">
            {orderEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-cyan-900">{evt.orderReference}</span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(evt.changedAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 text-[10px]">
                    {evt.status}
                  </span>
                  <span className="text-[11px] text-slate-500">by {evt.changedBy}</span>
                </div>
                {evt.notes && <p className="text-[11px] text-slate-600">{evt.notes}</p>}
                {evt.reason && (
                  <p className="text-[11px] text-rose-600 font-semibold">Reason: {evt.reason}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Warehouse Inventory Ledger Log */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-600" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">
              Warehouse Stock Movements ({inventoryLogs.length})
            </h3>
          </div>

          <div className="p-4 max-h-[600px] overflow-y-auto space-y-3">
            {inventoryLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1"
              >
                <div className="flex justify-between items-center">
                  <strong className="text-slate-900">{log.transactionType.replace(/_/g, ' ')}</strong>
                  <span className="text-[10px] text-slate-400">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">
                  {log.productName} ({log.variantName})
                </p>
                <div className="flex justify-between items-center pt-1 text-[10px] text-slate-500 border-t border-slate-200/60">
                  <span>Ref: {log.referenceDoc} • by {log.performedBy}</span>
                  <span
                    className={`font-black ${
                      log.quantityChange > 0 ? 'text-emerald-700' : 'text-slate-900'
                    }`}
                  >
                    Change: {log.quantityChange > 0 ? `+${log.quantityChange}` : log.quantityChange}{' '}
                    | Bal: {log.balanceAfter}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
