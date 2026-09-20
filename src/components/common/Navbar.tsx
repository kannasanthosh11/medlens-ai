import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  UploadCloud, 
  Menu, 
  X, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  User
} from 'lucide-react';
import { useHealthRecord } from '../../context/HealthRecordContext';

interface NavbarProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();
  const { patient, reports } = useHealthRecord();
  const [showNotifications, setShowNotifications] = useState(false);
  const [quickQuery, setQuickQuery] = useState('');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(quickQuery.trim())}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="flex items-center justify-between px-4 sm:px-6 h-16">
        {/* Left: Mobile hamburger & Logo */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              aria-label="Toggle navigation"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}

          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-teal-400 shadow-sm border border-slate-700/50 group-hover:border-teal-500/50 transition-colors">
              <Sparkles className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-lg tracking-tight">MedLens</span>
                <span className="text-teal-600 font-bold text-lg tracking-tight">AI</span>
                <span className="ml-1 px-1.5 py-0.2 rounded text-[10px] font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                  HLT-03
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden sm:block -mt-1">
                Intelligent Medical Timeline
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Search input */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <form onSubmit={handleQuickSearch} className="w-full relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={quickQuery}
              onChange={(e) => setQuickQuery(e.target.value)}
              placeholder="Ask anything (e.g. 'Show low hemoglobin reports')..."
              className="w-full pl-10 pr-12 py-2 text-sm bg-slate-100/80 hover:bg-slate-100 focus:bg-white rounded-xl border border-transparent focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all outline-none"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 rounded">
              ⌘K
            </span>
          </form>
        </div>

        {/* Right side utilities */}
        <div className="flex items-center gap-2.5">
          {/* Demo status badge */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Demo Patient: Alex Morgan
          </div>

          {/* Upload Button CTA */}
          <Link
            to="/upload"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm shadow-teal-700/20 transition-all active:scale-[0.98]"
          >
            <UploadCloud className="w-4 h-4" />
            <span className="hidden sm:inline">Upload Report</span>
          </Link>

          {/* Notifications button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-500 rounded-full ring-2 ring-white"></span>
            </button>

            {/* Notification dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 px-1">
                  <h4 className="font-semibold text-xs text-slate-900 uppercase tracking-wider">Clinical Notifications</h4>
                  <span className="text-[11px] text-teal-600 font-medium">3 unread</span>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-teal-50/60 border border-teal-100 flex gap-2.5 items-start">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-slate-900">CBC Panel normalized</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Hemoglobin normalized to 13.4 g/dL (Target reached).</p>
                      <span className="text-[10px] text-teal-700 font-mono mt-1 block">Sep 10, 2026</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 flex gap-2.5 items-start">
                    <FileText className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-slate-900">Brain MRI study parsed</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">City Scan Centre report verified without acute intracranial lesions.</p>
                      <span className="text-[10px] text-slate-400 font-mono mt-1 block">Sep 04, 2026</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 flex gap-2.5 items-start">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-slate-900">Zero-Knowledge Key Rotation</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Audit log updated. Automated KMS compliance scan passed.</p>
                      <span className="text-[10px] text-slate-400 font-mono mt-1 block">Sep 01, 2026</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 text-center">
                  <Link
                    to="/privacy"
                    onClick={() => setShowNotifications(false)}
                    className="text-xs text-teal-600 hover:text-teal-700 font-medium"
                  >
                    View audit ledger & privacy details →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <Link
            to="/settings"
            className="flex items-center gap-2 pl-2 border-l border-slate-200 text-left hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-slate-900 text-teal-400 font-bold text-xs flex items-center justify-center shadow-inner">
              AM
            </div>
            <div className="hidden lg:block">
              <p className="text-xs font-semibold text-slate-900 leading-none">{patient.name}</p>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">{patient.mrn}</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
