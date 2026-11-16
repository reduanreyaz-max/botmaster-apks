import React from 'react'; import { X } from 'lucide-react';
export const Modal: React.FC<{ open: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 p-0 sm:p-4"><div className="w-full max-w-lg rounded-t-3xl sm:rounded-2xl border border-[#1E293B] bg-[#0B1120] p-5 safe-pb max-h-[90dvh] overflow-y-auto"><div className="mb-4 flex items-center justify-between"><h3 className="text-base font-semibold text-white">{title}</h3><button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400"><X className="h-5 w-5" /></button></div>{children}</div></div>;
};
