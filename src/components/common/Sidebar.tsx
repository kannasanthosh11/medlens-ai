import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Clock, 
  FileText, 
  Pill, 
  Activity, 
  Stethoscope, 
  Search, 
  Cpu, 
  ShieldCheck, 
  Settings, 
  UploadCloud, 
  Sparkles,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { useHealthRecord } from '../../context/HealthRecordContext';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { patient, reports, resetDemoData } = useHealthRecord();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Health Timeline', path: '/timeline', icon: Clock },
    { label: 'Reports', path: '/reports', icon: FileText, count: reports.length },
    { label: 'Lab Results', path: '/labs', icon: Activity },
    { label: 'Medications', path: '/medications', icon: Pill },
    { label: 'Diagnoses', path: '/diagnoses', icon: Stethoscope },
    { label: 'Ask Health Records', path: '/search', icon: Search, highlight: true },
    { label: 'AI Architecture & Judge', path: '/architecture', icon: Cpu },
  ];

  const bottomNavItems = [
    { label: 'Privacy Center', path: '/privacy', icon: ShieldCheck },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top brand header */}
        <div>
          <div className="h-16 flex items-center px-6 border-b border-slate-100">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-teal-400">
                <Sparkles className="w-4 h-4 text-teal-400" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-base tracking-tight">MedLens</span>
                <span className="text-teal-600 font-bold text-base tracking-tight"> AI</span>
                <span className="block text-[9px] uppercase font-mono tracking-wider text-slate-400">
                  TENSORA 2026 • HLT-03
                </span>
              </div>
            </Link>
          </div>

          {/* Upload Button */}
          <div className="p-4">
            <Link
              to="/upload"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all group"
            >
              <UploadCloud className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
              <span>Add Medical Report</span>
            </Link>
          </div>

          {/* Main Navigation Links */}
          <nav className="px-3 space-y-1">
            <p className="px-3 pt-1 pb-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Health Record
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-teal-50 text-teal-900 font-semibold shadow-xs'
                        : item.highlight
                        ? 'text-slate-700 hover:bg-teal-50/50 hover:text-teal-800'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-slate-100 text-slate-600">
                      {item.count}
                    </span>
                  )}
                  {item.highlight && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-teal-100 text-teal-700">
                      AI
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom utility / user profile */}
        <div className="p-3 border-t border-slate-100 space-y-2">
          <div className="space-y-1">
            {bottomNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-teal-50 text-teal-900 font-semibold'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>

          {/* Patient Quick Card */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-slate-800 text-teal-400 font-bold text-xs flex items-center justify-center flex-shrink-0">
                AM
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-900 truncate">{patient.name}</p>
                <p className="text-[10px] text-slate-500 font-mono truncate">{patient.mrn}</p>
              </div>
            </div>
            <button
              onClick={() => resetDemoData()}
              title="Reset Demo Data to Initial State"
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors flex-shrink-0"
              aria-label="Reset demo data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
