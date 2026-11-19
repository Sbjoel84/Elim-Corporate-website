import React, { useMemo } from 'react';
import {
  ClipboardCheck,
  PackageCheck,
  ShieldCheck,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import { OnlineOrder, OrderStatus } from '../types/erp';

interface MilestoneDefinition {
  key: 'received' | 'processing' | 'quality' | 'transit' | 'delivered';
  title: string;
  subtitle: string;
  statuses: OrderStatus[];
  icon: React.ComponentType<{ className?: string }>;
}

const MILESTONES: MilestoneDefinition[] = [
  {
    key: 'received',
    title: 'Order Received',
    subtitle: 'Queued in factory desk',
    statuses: ['NEW', 'ASSIGNED', 'UNDER_REVIEW', 'AWAITING_CUSTOMER_CONFIRMATION'],
    icon: ClipboardCheck,
  },
  {
    key: 'processing',
    title: 'Processing',
    subtitle: 'Stock reserved & packed',
    statuses: ['ACCEPTED', 'AWAITING_STOCK_CONFIRMATION', 'PROCESSING'],
    icon: PackageCheck,
  },
  {
    key: 'quality',
    title: 'Quality Check',
    subtitle: 'Seal & NAFDAC batch audit',
    statuses: ['READY_FOR_DISPATCH', 'DISPATCH_ASSIGNED'],
    icon: ShieldCheck,
  },
  {
    key: 'transit',
    title: 'In Transit',
    subtitle: 'Fleet vehicle en route',
    statuses: ['DISPATCHED', 'OUT_FOR_DELIVERY'],
    icon: Truck,
  },
  {
    key: 'delivered',
    title: 'Delivered',
    subtitle: 'Handover confirmed',
    statuses: ['DELIVERED', 'COMPLETED'],
    icon: CheckCircle2,
  },
];

function getMilestoneIndex(status: OrderStatus): number {
  if (status === 'REJECTED' || status === 'CANCELLED') return -1;
  const idx = MILESTONES.findIndex((m) => m.statuses.includes(status));
  return idx === -1 ? 0 : idx;
}

function formatShortTime(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleString('en-NG', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

interface DeliveryMilestoneTrackerProps {
  order: OnlineOrder;
}

export const DeliveryMilestoneTracker: React.FC<DeliveryMilestoneTrackerProps> = ({ order }) => {
  const activeIndex = useMemo(() => getMilestoneIndex(order.status), [order.status]);
  const isHalted = order.status === 'REJECTED' || order.status === 'CANCELLED';

  const milestoneTimestamps = useMemo(() => {
    const map: Record<string, string | null> = {};
    for (const milestone of MILESTONES) {
      const matchingEntries = order.statusHistory.filter((h) =>
        milestone.statuses.includes(h.status)
      );
      const entry = matchingEntries[matchingEntries.length - 1];
      map[milestone.key] = entry ? formatShortTime(entry.changedAt) : null;
    }
    if (!map.received) {
      map.received = formatShortTime(order.createdAt);
    }
    return map;
  }, [order.statusHistory, order.createdAt]);

  const latestHistoryNote = useMemo(() => {
    if (!order.statusHistory || order.statusHistory.length === 0) return null;
    return order.statusHistory[order.statusHistory.length - 1];
  }, [order.statusHistory]);

  if (isHalted) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 sm:p-5 space-y-2">
        <div className="flex items-center gap-2.5 text-rose-800">
          <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-rose-900">
              Order {order.status === 'REJECTED' ? 'Declined' : 'Cancelled'}
            </h4>
            <p className="text-[11px] text-rose-700">
              Fulfillment progress has stopped at this stage.
            </p>
          </div>
        </div>
        {order.rejectionReason && (
          <p className="text-xs text-rose-800 bg-white/80 border border-rose-200 rounded-lg px-3 py-2">
            <strong className="font-semibold">Reason:</strong> {order.rejectionReason}
          </p>
        )}
        <p className="text-[11px] text-[#536174]">
          Please contact our customer support desk on +2348166399794 if you need assistance.
        </p>
      </div>
    );
  }

  const progressPercentage = Math.round(((activeIndex + 1) / MILESTONES.length) * 100);
  const trackFillPercent = (activeIndex / (MILESTONES.length - 1)) * 100;
  const activeMilestone = MILESTONES[activeIndex];

  return (
    <div className="bg-[#F5F7FA] border border-[#E1E8F0] rounded-2xl p-4 sm:p-5 space-y-5">
      {/* Tracker Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#2563D9] block">
            Delivery Milestone Tracker
          </span>
          <h4 className="text-sm font-bold text-[#102A56]">
            Stage {activeIndex + 1} of {MILESTONES.length}: {activeMilestone.title}
          </h4>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${
            activeIndex === MILESTONES.length - 1
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-[#EAF4FF] text-[#2563D9] border-blue-200'
          }`}
        >
          <span>{progressPercentage}% Complete</span>
        </span>
      </div>

      {/* Desktop Step-by-Step Progress Bar (Hidden on very small screens) */}
      <div className="hidden sm:block pt-2 pb-1">
        <div className="relative">
          {/* Connecting Progress Track */}
          <div
            className="absolute top-5 left-[10%] right-[10%] h-1.5 bg-[#E1E8F0] rounded-full overflow-hidden"
            aria-hidden="true"
          >
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${
                activeIndex === MILESTONES.length - 1 ? 'bg-emerald-500' : 'bg-[#2563D9]'
              }`}
              style={{ width: `${trackFillPercent}%` }}
            />
          </div>

          {/* 5 Step Nodes */}
          <div className="relative z-10 grid grid-cols-5 gap-2">
            {MILESTONES.map((step, idx) => {
              const Icon = step.icon;
              const isCompleted = idx < activeIndex || activeIndex === MILESTONES.length - 1;
              const isCurrent = idx === activeIndex && activeIndex !== MILESTONES.length - 1;
              const timestamp = milestoneTimestamps[step.key];

              return (
                <div key={step.key} className="flex flex-col items-center text-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-2xs ${
                      isCompleted
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-[#2563D9] border-[#2563D9] text-white ring-4 ring-[#2563D9]/20'
                        : 'bg-white border-[#CBD5E1] text-slate-400'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isCurrent ? 'animate-pulse' : ''}`} />
                  </div>

                  <p
                    className={`mt-2.5 text-xs font-bold leading-tight ${
                      isCompleted
                        ? 'text-emerald-700'
                        : isCurrent
                        ? 'text-[#102A56]'
                        : 'text-slate-400'
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-[10px] text-[#536174] mt-0.5 leading-tight px-1">
                    {step.subtitle}
                  </p>
                  {timestamp && (idx <= activeIndex) && (
                    <span className="mt-1 inline-flex items-center gap-0.5 text-[9px] font-medium text-[#2563D9] bg-white px-1.5 py-0.5 rounded border border-[#E1E8F0]">
                      <Clock className="w-2.5 h-2.5" />
                      {timestamp}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Vertical Stepper Progress Bar */}
      <div className="sm:hidden space-y-0">
        {MILESTONES.map((step, idx) => {
          const Icon = step.icon;
          const isCompleted = idx < activeIndex || activeIndex === MILESTONES.length - 1;
          const isCurrent = idx === activeIndex && activeIndex !== MILESTONES.length - 1;
          const isLast = idx === MILESTONES.length - 1;
          const timestamp = milestoneTimestamps[step.key];

          return (
            <div key={step.key} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0 ${
                    isCompleted
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-[#2563D9] border-[#2563D9] text-white ring-4 ring-[#2563D9]/20'
                      : 'bg-white border-[#CBD5E1] text-slate-400'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                {!isLast && (
                  <div
                    className={`w-0.5 flex-1 min-h-6 my-1 ${
                      idx < activeIndex ? 'bg-emerald-500' : 'bg-[#E1E8F0]'
                    }`}
                  />
                )}
              </div>

              <div className={`pb-4 flex-1 ${isLast ? 'pb-0' : ''}`}>
                <div className="flex items-center justify-between gap-2">
                  <p
                    className={`text-xs font-bold ${
                      isCompleted
                        ? 'text-emerald-700'
                        : isCurrent
                        ? 'text-[#102A56]'
                        : 'text-slate-400'
                    }`}
                  >
                    {step.title}
                  </p>
                  {timestamp && idx <= activeIndex && (
                    <span className="text-[10px] text-[#2563D9] font-medium">{timestamp}</span>
                  )}
                </div>
                <p className="text-[11px] text-[#536174]">{step.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Latest Status Update Note */}
      {latestHistoryNote && (
        <div className="bg-white border border-[#E1E8F0] rounded-xl px-3.5 py-2.5 flex items-start gap-2.5 text-xs">
          <div className="w-2 h-2 rounded-full bg-[#2563D9] mt-1.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[#102A56] font-semibold">
              Latest Update:{' '}
              <span className="font-normal text-[#536174]">
                {latestHistoryNote.notes || `Order updated to ${order.status.replace(/_/g, ' ')}`}
              </span>
            </p>
            <p className="text-[10px] text-[#536174] mt-0.5">
              Updated by {latestHistoryNote.changedBy} •{' '}
              {formatShortTime(latestHistoryNote.changedAt)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
