import React from 'react';
import {
  LayoutDashboard,
  Inbox,
  UserCheck,
  Truck,
  Warehouse,
  MessageSquare,
  Newspaper,
  ShieldAlert,
  ArrowLeft,
  Bell,
  RefreshCw,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { StaffMember } from '../types/erp';
import { erpStorage } from '../services/erpStorage';

interface AdminLayoutProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onExitAdmin: () => void;
  activeStaff: StaffMember;
  onChangeActiveStaff: (staff: StaffMember) => void;
  newBookingsCount: number;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onSelectTab,
  onExitAdmin,
  activeStaff,
  onChangeActiveStaff,
  newBookingsCount,
  children,
}) => {
  const staffList = erpStorage.getStaff();

  const menuItems = [
    { id: 'dashboard', label: 'Executive Overview', icon: LayoutDashboard },
    {
      id: 'inbox',
      label: 'Online Orders Desk',
      icon: Inbox,
      badge: newBookingsCount > 0 ? newBookingsCount : undefined,
    },
    { id: 'workspace', label: 'My Assigned Desk', icon: UserCheck },
    { id: 'dispatch', label: 'Dispatch & Fleet', icon: Truck },
    { id: 'inventory', label: 'ERP Inventory Ledger', icon: Warehouse },
    { id: 'inquiries', label: 'Distributor Inquiries', icon: MessageSquare },
    { id: 'content', label: 'News & Gallery CMS', icon: Newspaper },
    { id: 'audit', label: 'Activity Logs', icon: ShieldAlert },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top ERP Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30">
        <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between">
          {/* Brand & Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={onExitAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold rounded-lg transition cursor-pointer"
              title="Return to Public Customer Website"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Customer Website View</span>
            </button>

            <div className="hidden sm:flex items-center gap-3 border-l border-slate-800 pl-4">
              <img
                src="/assets/aistudio/elim_logo-DNHyH2mV_4a00ee2f.png"
                alt="Elim Table Water Logo"
                className="h-7 w-auto object-contain rounded"
              />
              <span className="text-sm font-black tracking-tight text-white">ELIM TABLE WATER</span>
              <span className="text-xs bg-cyan-950 text-cyan-300 font-bold px-2 py-0.5 rounded border border-cyan-800">
                ERP FACTORY DESK
              </span>
            </div>
          </div>

          {/* Right Staff & Status */}
          <div className="flex items-center gap-3">
            {/* Live Synchronized Badge */}
            <div className="hidden md:flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Authoritative ERP Active</span>
            </div>

            {/* Officer Switcher */}
            <div className="flex items-center gap-2 bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-700">
              <img
                src={activeStaff.avatar || '/assets/aistudio/ESS07808-_952f4c20.jpg'}
                alt={activeStaff.name}
                className="w-7 h-7 rounded-full object-cover border border-cyan-400"
              />
              <div className="text-left hidden lg:block">
                <span className="text-xs font-bold text-white block leading-none">
                  {activeStaff.name}
                </span>
                <span className="text-[10px] text-slate-400 leading-none">
                  {activeStaff.roleTitle}
                </span>
              </div>

              <select
                value={activeStaff.id}
                onChange={(e) => {
                  const s = staffList.find((st) => st.id === e.target.value);
                  if (s) onChangeActiveStaff(s);
                }}
                className="bg-transparent text-xs text-cyan-300 font-medium focus:outline-none cursor-pointer pl-1"
                title="Switch Active Operator Role"
              >
                {staffList.map((st) => (
                  <option key={st.id} value={st.id} className="bg-slate-900 text-white">
                    {st.name} ({st.role.replace('_', ' ')})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Administrative Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 text-slate-300 border-r border-slate-800 hidden md:flex flex-col justify-between shrink-0">
          <div className="p-4 space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Operations Control
            </div>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-4 border-t border-slate-800 space-y-2">
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 block mb-1">
                Designated Order Desk
              </span>
              <p className="text-white font-semibold">Folake Adeyemi</p>
              <p className="text-slate-400 text-[11px]">+2348166399794</p>
              <span className="inline-block mt-2 text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 font-medium">
                Desk Lead Active
              </span>
            </div>

            <button
              onClick={() => {
                if (confirm('Reset simulated database back to initial factory records?')) {
                  erpStorage.resetToFactoryDefaults();
                  window.location.reload();
                }
              }}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 text-[11px] text-slate-400 hover:text-rose-400 hover:bg-slate-800/40 rounded-lg transition cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Factory Seed Data</span>
            </button>
          </div>
        </aside>

        {/* Mobile Horizontal Navigation */}
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-2 py-2 flex items-center gap-1 overflow-x-auto scrollbar-none">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                  isActive ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="bg-amber-400 text-slate-950 text-[10px] px-1 rounded-full font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Workspace Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};
