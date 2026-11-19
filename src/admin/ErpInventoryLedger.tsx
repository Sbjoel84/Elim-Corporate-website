import React, { useState } from 'react';
import {
  Warehouse,
  Plus,
  ArrowDownRight,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { Product, StaffMember, InventoryLogEntry } from '../types/erp';
import { erpStorage } from '../services/erpStorage';

interface ErpInventoryLedgerProps {
  products: Product[];
  activeOperator: StaffMember;
  onRefresh: () => void;
}

export const ErpInventoryLedger: React.FC<ErpInventoryLedgerProps> = ({
  products,
  activeOperator,
  onRefresh,
}) => {
  const [replenishModalOpen, setReplenishModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');
  const [batchQuantity, setBatchQuantity] = useState<number>(200);
  const [batchNotes, setBatchNotes] = useState<string>('Bottling line Cleanroom Run #44');

  const logs: InventoryLogEntry[] = erpStorage.getInventoryLogs();

  const handleReplenishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId || batchQuantity <= 0) return;

    erpStorage.replenishStock(
      selectedProductId,
      batchQuantity,
      batchNotes,
      activeOperator.name
    );

    setReplenishModalOpen(false);
    onRefresh();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full">
            Authoritative ERP Finished Goods Store
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            Warehouse Inventory & Stock Movement Ledger
          </h2>
          <p className="text-xs text-slate-500">
            Authoritative ERP record of physical stock, online booking reservations, and dispatch deductions.
          </p>
        </div>

        <button
          onClick={() => setReplenishModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold rounded-xl shadow-sm transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Simulate Production Batch Intake</span>
        </button>
      </div>

      {/* Finished Goods Inventory Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">
            Finished Goods Pallet Storage Status
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            {products.length} catalogued product lines
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                <th className="py-3 px-4">SKU / Product Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Physical Warehouse Stock</th>
                <th className="py-3 px-4">Reserved for Online Orders</th>
                <th className="py-3 px-4">Free Available for Sale</th>
                <th className="py-3 px-4">Reorder Min</th>
                <th className="py-3 px-4">Health Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => {
                const available = Math.max(0, p.currentStock - p.reservedStock);
                const isLow = available < p.minReorderLevel;

                return (
                  <tr key={p.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4">
                      <span className="font-mono text-[10px] text-slate-400 block">{p.sku}</span>
                      <strong className="text-slate-900 block">{p.name}</strong>
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-medium">{p.category}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{p.currentStock}</td>
                    <td className="py-3 px-4 font-semibold text-cyan-700">{p.reservedStock}</td>
                    <td className="py-3 px-4">
                      <span className="font-black text-sm text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">
                        {available}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{p.minReorderLevel}</td>
                    <td className="py-3 px-4">
                      {isLow ? (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Low Stock
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Optimal
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Movement Ledger Audit Trail */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-600" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">
              Live Stock Movement Ledger
            </h3>
          </div>
          <span className="text-[11px] text-slate-500">Every stock event is recorded</span>
        </div>

        <div className="p-4 overflow-x-auto">
          {logs.length === 0 ? (
            <p className="text-xs text-slate-400 italic text-center py-6">
              No stock movements logged yet.
            </p>
          ) : (
            <div className="space-y-2">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        log.quantityChange > 0
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {log.quantityChange > 0 ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-slate-900">{log.transactionType.replace(/_/g, ' ')}</strong>
                        <span className="text-[10px] text-slate-400 font-mono">[{log.referenceDoc}]</span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        {log.productName} ({log.variantName}) • {log.notes}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`font-black text-xs block ${
                        log.quantityChange > 0 ? 'text-emerald-700' : 'text-slate-900'
                      }`}
                    >
                      {log.quantityChange > 0 ? `+${log.quantityChange}` : log.quantityChange} units
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Balance: {log.balanceAfter} • by {log.performedBy}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Replenishment Modal */}
      {replenishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setReplenishModalOpen(false)} className="fixed inset-0 bg-slate-900/60" />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 z-10 space-y-4 text-xs">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Plus className="w-5 h-5 text-cyan-600" />
              <span>Simulate Bottling Line Batch Production Intake</span>
            </h3>
            <p className="text-slate-500">
              Transfer freshly bottled and tested water cartons from the automated bottling line cleanroom
              into the finished goods warehouse:
            </p>

            <form onSubmit={handleReplenishSubmit} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Product Line</label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg bg-white"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Current: {p.currentStock})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Quantity Produced (Units/Packs)</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={batchQuantity}
                  onChange={(e) => setBatchQuantity(parseInt(e.target.value, 10) || 0)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Production Run Reference / Notes</label>
                <input
                  type="text"
                  value={batchNotes}
                  onChange={(e) => setBatchNotes(e.target.value)}
                  placeholder="e.g. Line 2 Rotary bottling run #842, QA cleared"
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setReplenishModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg"
                >
                  Post to Warehouse Ledger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
