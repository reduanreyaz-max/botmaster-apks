import React from 'react';
interface Props extends React.InputHTMLAttributes<HTMLInputElement> { label?: string; error?: string; helper?: string; }
export const Input: React.FC<Props> = ({ label, error, helper, className = '', ...props }) => (
  <div className="space-y-1.5">
    {label && <label className="block text-xs font-medium text-slate-300">{label}</label>}
    <input className={`min-h-[44px] w-full rounded-xl border bg-[#05070B] px-3.5 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500 ${error ? 'border-rose-500' : 'border-[#1E293B]'} ${className}`} {...props} />
    {error && <p className="text-xs text-rose-400">{error}</p>}{!error && helper && <p className="text-xs text-slate-500">{helper}</p>}
  </div>
);
