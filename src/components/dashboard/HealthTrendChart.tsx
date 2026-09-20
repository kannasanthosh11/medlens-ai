import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  ReferenceLine,
  ReferenceArea
} from 'recharts';
import { hemoglobinChartData, glucoseChartData, bloodPressureChartData } from '../../data/mockData';
import { Activity, TrendingUp, Heart, Droplets, Info } from 'lucide-react';

export const HealthTrendChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hemoglobin' | 'glucose' | 'bp'>('hemoglobin');

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
              <TrendingUp className="w-4 h-4" />
            </span>
            <h3 className="font-semibold text-slate-900 text-sm sm:text-base">Biomarker Longitudinal Trends</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Continuous tracking across multiple hospital reports & diagnostic labs
          </p>
        </div>

        {/* Tab controls */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-medium self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('hemoglobin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'hemoglobin'
                ? 'bg-white text-teal-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Droplets className="w-3.5 h-3.5 text-teal-600" />
            <span>Hemoglobin</span>
          </button>
          <button
            onClick={() => setActiveTab('glucose')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'glucose'
                ? 'bg-white text-teal-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            <span>Glucose & HbA1c</span>
          </button>
          <button
            onClick={() => setActiveTab('bp')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'bp'
                ? 'bg-white text-teal-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span>Blood Pressure</span>
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-64 sm:h-72 w-full pt-2">
        {activeTab === 'hemoglobin' && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hemoglobinChartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="hemoglobinGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="date" 
                tickLine={false} 
                axisLine={{ stroke: '#e2e8f0' }} 
                tick={{ fontSize: 12, fill: '#64748b' }}
              />
              <YAxis 
                domain={[10, 16]} 
                ticks={[10, 11, 12, 13, 14, 15, 16]} 
                tickLine={false} 
                axisLine={{ stroke: '#e2e8f0' }} 
                tick={{ fontSize: 12, fill: '#64748b' }}
                unit=" g/dL"
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white text-xs p-3 rounded-xl shadow-lg border border-slate-800 space-y-1">
                        <p className="font-semibold text-slate-200">{label}, 2026</p>
                        <p className="text-teal-400 text-sm font-bold">{data.value} g/dL</p>
                        <p className="text-[11px] text-slate-400">Target Range: 12.0 – 16.0 g/dL</p>
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold mt-1 ${
                          data.value < 12.0 ? 'bg-rose-900/60 text-rose-300' : 'bg-emerald-900/60 text-emerald-300'
                        }`}>
                          {data.status}
                        </span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine y={12.0} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Min Normal (12.0)', fill: '#d97706', fontSize: 10, position: 'insideBottomRight' }} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#0d9488" 
                strokeWidth={2.5} 
                fillOpacity={1} 
                fill="url(#hemoglobinGrad)" 
                dot={{ r: 4, fill: '#0d9488', stroke: '#ffffff', strokeWidth: 2 }}
                activeDot={{ r: 6, fill: '#0f766e', stroke: '#ffffff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {activeTab === 'glucose' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={glucoseChartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" tickLine={false} axisLine={{ stroke: '#e2e8f0' }} tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis domain={[70, 115]} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} tick={{ fontSize: 12, fill: '#64748b' }} unit=" mg/dL" />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white text-xs p-3 rounded-xl shadow-lg border border-slate-800 space-y-1">
                        <p className="font-semibold text-slate-200">{label}</p>
                        <p className="text-blue-400 font-bold">Fasting Glucose: {data.glucose} mg/dL</p>
                        <p className="text-teal-400 font-semibold">HbA1c: {data.hba1c} % (Normal &lt;5.7%)</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine y={99} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Upper Normal (99)', fill: '#d97706', fontSize: 10, position: 'insideTopRight' }} />
              <Line type="monotone" dataKey="glucose" stroke="#0284c7" strokeWidth={2.5} dot={{ r: 4, fill: '#0284c7' }} />
            </LineChart>
          </ResponsiveContainer>
        )}

        {activeTab === 'bp' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={bloodPressureChartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" tickLine={false} axisLine={{ stroke: '#e2e8f0' }} tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis domain={[60, 140]} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} tick={{ fontSize: 12, fill: '#64748b' }} unit=" mmHg" />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white text-xs p-3 rounded-xl shadow-lg border border-slate-800 space-y-1">
                        <p className="font-semibold text-slate-200">{label}</p>
                        <p className="text-rose-400 font-bold">{data.systolic} / {data.diastolic} mmHg</p>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] bg-emerald-900/60 text-emerald-300">
                          {data.status}
                        </span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine y={120} stroke="#94a3b8" strokeDasharray="2 2" />
              <Line type="monotone" dataKey="systolic" name="Systolic" stroke="#e11d48" strokeWidth={2.5} dot={{ r: 4, fill: '#e11d48' }} />
              <Line type="monotone" dataKey="diastolic" name="Diastolic" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: '#3b82f6' }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Chart Footer Insight */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
          <span>
            {activeTab === 'hemoglobin' && 'Hemoglobin rose +2.2 g/dL over 8 months following Ferrous Sulfate therapy.'}
            {activeTab === 'glucose' && 'Glycemic control remains stable with HbA1c averaging 5.4% (low risk).'}
            {activeTab === 'bp' && 'Resting blood pressure optimal at 116/74 mmHg (no anti-hypertensive indicated).'}
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-400">Source: 5 correlated reports</span>
      </div>
    </div>
  );
};
