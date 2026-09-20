import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Cpu, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-teal-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 text-lg">MedLens <span className="text-teal-600">AI</span></span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Your medical records, organized intelligently. Transforming scattered paper reports, PDFs, and laboratory scans into one cohesive clinical timeline.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-mono font-medium text-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
              TENSORA 2026 • HLT-03
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Product</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><Link to="/dashboard" className="hover:text-teal-600 transition-colors">Patient Dashboard</Link></li>
              <li><Link to="/timeline" className="hover:text-teal-600 transition-colors">Health Timeline</Link></li>
              <li><Link to="/upload" className="hover:text-teal-600 transition-colors">Report Ingestion & OCR</Link></li>
              <li><Link to="/labs" className="hover:text-teal-600 transition-colors">Lab Normalization</Link></li>
              <li><Link to="/search" className="hover:text-teal-600 transition-colors">Semantic Record Search</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Architecture & Trust</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><Link to="/architecture" className="hover:text-teal-600 transition-colors">AI Pipeline & NER</Link></li>
              <li><Link to="/architecture" className="hover:text-teal-600 transition-colors">Judging & Evaluation Criteria</Link></li>
              <li><Link to="/privacy" className="hover:text-teal-600 transition-colors">Zero-Knowledge Storage</Link></li>
              <li><Link to="/privacy" className="hover:text-teal-600 transition-colors">Audit Ledger</Link></li>
              <li><Link to="/settings" className="hover:text-teal-600 transition-colors">Data Reset & Controls</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Hackathon Prototype</h4>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-2 leading-relaxed">
              <p>
                <strong>Problem ID: HLT-03</strong>
                <br />Medical Report Management
              </p>
              <p className="text-[10px] text-slate-500">
                Built as a healthcare AI hackathon prototype for demonstration purposes. De-identified patient demo data.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 MedLens AI. Built for TENSORA 2026 Hackathon. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-slate-800">Privacy Notice</Link>
            <span>•</span>
            <Link to="/architecture" className="hover:text-slate-800">Technical Spec</Link>
            <span>•</span>
            <Link to="/settings" className="hover:text-slate-800">Demo Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
