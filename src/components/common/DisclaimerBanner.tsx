import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

interface DisclaimerBannerProps {
  variant?: 'compact' | 'full';
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ variant = 'compact' }) => {
  if (variant === 'compact') {
    return (
      <div className="bg-amber-50/90 border-y border-amber-200/80 px-4 py-2 text-xs text-amber-900 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>
            <strong>Research & Demonstration Prototype:</strong> Information extracted by MedLens AI is for organization and clinical timeline reference only and does not replace professional medical advice.
          </span>
        </div>
        <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-amber-100/80 text-amber-800 font-mono text-[11px] font-semibold flex-shrink-0">
          TENSORA 2026 • HLT-03
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-slate-900 text-slate-200 p-6 border border-slate-800 shadow-md">
      <div className="flex items-start gap-4">
        <div className="p-2.5 rounded-lg bg-teal-500/20 text-teal-400">
          <Info className="w-5 h-5" />
        </div>
        <div className="flex-1 space-y-1.5">
          <h4 className="text-base font-semibold text-white">Medical & Regulatory Prototype Notice</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            MedLens AI is an engineering proof-of-concept created for <strong>TENSORA 2026 (Problem ID: HLT-03 – Medical Report Management)</strong>.
            The pipeline is designed to demonstrate multi-modal OCR, clinical named-entity recognition (NER), biomarker normalization, and semantic vector retrieval using synthetic/de-identified patient records.
          </p>
          <p className="text-[11px] text-slate-400">
            * Reference ranges vary by laboratory methodology, age, and sex. Extracted values are simulated for demo patient Alex Morgan. Do not upload live confidential Protected Health Information (PHI).
          </p>
        </div>
      </div>
    </div>
  );
};
