import React from 'react';
import { LabStatus } from '../../types';
import { Check, AlertTriangle, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: LabStatus | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const normalized = status.toLowerCase();

  const isSm = size === 'sm';
  const sizeClasses = isSm ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-medium';

  if (normalized.includes('normal') || normalized.includes('optimal') || normalized.includes('desirable') || normalized.includes('managed') || normalized.includes('resolved') || normalized.includes('active')) {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-medium ${sizeClasses}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        {status}
      </span>
    );
  }

  if (normalized.includes('attention') || normalized.includes('borderline') || normalized.includes('mild')) {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 font-medium ${sizeClasses}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
        {status}
      </span>
    );
  }

  if (normalized.includes('abnormal') || normalized.includes('high') || normalized.includes('low') || normalized.includes('severe') || normalized.includes('deficient')) {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200/80 font-semibold ${sizeClasses}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
        {status}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 ${sizeClasses}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
      {status}
    </span>
  );
};
