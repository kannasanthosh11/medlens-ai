import React from 'react';
import { useHealthRecord } from '../../context/HealthRecordContext';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useHealthRecord();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none px-4">
      {toasts.map((toast) => {
        let icon = <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />;
        let borderColor = 'border-blue-200 bg-blue-50/95';

        if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />;
          borderColor = 'border-emerald-200 bg-emerald-50/95';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />;
          borderColor = 'border-amber-200 bg-amber-50/95';
        } else if (toast.type === 'error') {
          icon = <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />;
          borderColor = 'border-rose-200 bg-rose-50/95';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-300 transform translate-y-0 ${borderColor}`}
          >
            {icon}
            <div className="flex-1 pr-2">
              <h4 className="text-sm font-semibold text-slate-900">{toast.title}</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-700 transition-colors p-1"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
