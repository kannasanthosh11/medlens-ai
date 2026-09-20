import React, { useState } from 'react';
import { useHealthRecord } from '../context/HealthRecordContext';
import { 
  User, 
  Bell, 
  Shield, 
  RotateCcw, 
  Trash2, 
  Check, 
  AlertTriangle,
  Sliders,
  Sparkles
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { patient, resetDemoData, showToast } = useHealthRecord();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [anomalyAlerts, setAnomalyAlerts] = useState(true);
  const [autoNormalization, setAutoNormalization] = useState(true);

  const handleSaveSettings = () => {
    showToast('success', 'Preferences Updated', 'Your settings have been saved.');
  };

  const handleResetData = () => {
    if (confirm('Reset demo patient data back to its clean initial state?')) {
      resetDemoData();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Account & Clinical Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your health profile, alert preferences, and demo environment state.
        </p>
      </div>

      {/* Patient Profile Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-12 h-12 rounded-full bg-slate-900 text-teal-400 font-bold flex items-center justify-center text-base">
            AM
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">{patient.name}</h3>
            <p className="text-xs text-slate-500 font-mono">Medical Record Number: {patient.mrn}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Full Legal Name
            </label>
            <input
              type="text"
              readOnly
              value={patient.name}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Date of Birth & Age
            </label>
            <input
              type="text"
              readOnly
              value={`${patient.dob} (${patient.age} years)`}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Blood Group
            </label>
            <input
              type="text"
              readOnly
              value={patient.bloodGroup}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Emergency Contact
            </label>
            <input
              type="text"
              readOnly
              value={`${patient.emergencyContact.name} (${patient.emergencyContact.relation}) ${patient.emergencyContact.phone}`}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
            />
          </div>
        </div>
      </div>

      {/* Preferences & Notifications */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
          <Bell className="w-4 h-4 text-teal-600" />
          Clinical Notification Preferences
        </h3>

        <div className="space-y-3 divide-y divide-slate-100 text-xs">
          <div className="pt-2 flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900">Abnormal Biomarker Alerts</p>
              <p className="text-[11px] text-slate-500">Notify when lab values fall outside standard clinical reference bounds.</p>
            </div>
            <input
              type="checkbox"
              checked={anomalyAlerts}
              onChange={(e) => setAnomalyAlerts(e.target.checked)}
              className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
            />
          </div>

          <div className="pt-3 flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900">Automatic LOINC Normalization</p>
              <p className="text-[11px] text-slate-500">Auto-map synonyms (e.g. Hgb, Haemoglobin) upon report ingestion.</p>
            </div>
            <input
              type="checkbox"
              checked={autoNormalization}
              onChange={(e) => setAutoNormalization(e.target.checked)}
              className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={handleSaveSettings}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </div>

      {/* Danger Zone / Demo Data Controls */}
      <div className="bg-white rounded-3xl border border-rose-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="font-bold text-rose-900 text-sm uppercase tracking-wider flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600" />
          Demo Environment Controls
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Use these controls to refresh fictional demo data between hackathon judging rounds or clear session state.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            onClick={handleResetData}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Demo Patient (Alex Morgan)
          </button>
          <button
            onClick={handleResetData}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Ingested Files & Refresh
          </button>
        </div>
      </div>
    </div>
  );
};
