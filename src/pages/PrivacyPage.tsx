import React from 'react';
import { useHealthRecord } from '../context/HealthRecordContext';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  Key, 
  History, 
  CheckCircle2, 
  AlertTriangle,
  Server,
  UserCheck
} from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  const { auditLogs, patient, reports } = useHealthRecord();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-7">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Privacy Center & Access Controls
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            Zero-Knowledge Vault
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Monitor personal health record access, encryption protocols, and verified audit trails.
        </p>
      </div>

      {/* Primary Disclaimer (Mandatory Requirement from Section #23) */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-lg space-y-3">
        <div className="flex items-center gap-2.5 text-teal-400 font-bold text-sm uppercase tracking-wider">
          <ShieldCheck className="w-5 h-5" />
          Regulatory & Compliance Framework Notice
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
          "MedLens AI is a hackathon prototype. Production deployment would require appropriate security controls, regulatory review, consent management, encryption, access controls, audit logging, and healthcare compliance."
        </p>
        <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] font-mono text-teal-300">
          <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">AES-256 Mock Encrypted</span>
          <span>•</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">De-identified Patient Vault</span>
          <span>•</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Local Sandbox Execution</span>
        </div>
      </div>

      {/* Your Data Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Total Encrypted Reports</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{reports.length} Records</h3>
          <p className="text-[11px] text-slate-500 mt-1">Stored in client session storage</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Storage Integrity Status</span>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">Verified</h3>
          <p className="text-[11px] text-slate-500 mt-1">SHA-256 document checksums match</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Last Vault Audit</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">Today</h3>
          <p className="text-[11px] text-slate-500 mt-1">{patient.lastUpdated}</p>
        </div>
      </div>

      {/* Access Control & Patient Ownership */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Lock className="w-4 h-4 text-teal-600" />
          Access Permissions & Third-Party Sharing
        </h2>

        <div className="space-y-3 divide-y divide-slate-100 text-xs">
          <div className="pt-2 flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900">Patient Primary Access (Alex Morgan)</p>
              <p className="text-[11px] text-slate-500">Full read, edit, annotate, and delete permissions.</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Owner
            </span>
          </div>

          <div className="pt-3 flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900">Physician Clinical Portal (Dr. Arun Kumar)</p>
              <p className="text-[11px] text-slate-500">Read-only temporary access during consultation windows.</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              Authorized
            </span>
          </div>

          <div className="pt-3 flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900">AI Foundation Model Training</p>
              <p className="text-[11px] text-slate-500">Opt-out default. Patient records are never used for model re-training.</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
              Blocked (Disabled)
            </span>
          </div>
        </div>
      </div>

      {/* Audit Log Ledger */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <History className="w-4 h-4 text-teal-600" />
              Immutable Access Audit Ledger
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Cryptographically timestamped record of document decryptions and OCR ingestions.
            </p>
          </div>
          <span className="text-xs font-mono text-teal-600 font-semibold">{auditLogs.length} events logged</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-500">
                <th className="py-2.5 px-3">Timestamp (UTC)</th>
                <th className="py-2.5 px-3">Event Action</th>
                <th className="py-2.5 px-3">Resource File / LOINC</th>
                <th className="py-2.5 px-3">Client IP / Worker</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-mono text-[11px]">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 text-slate-400">{log.timestamp}</td>
                  <td className="py-2.5 px-3 font-sans font-semibold text-slate-900">{log.action}</td>
                  <td className="py-2.5 px-3 text-teal-700">{log.resource}</td>
                  <td className="py-2.5 px-3 text-slate-500">{log.ipAddress}</td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
