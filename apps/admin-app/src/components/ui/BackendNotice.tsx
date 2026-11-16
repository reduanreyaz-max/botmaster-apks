import React from 'react'; import { ServerOff } from 'lucide-react';
export const BackendNotice: React.FC<{ title?: string; message: string }> = ({ title = 'Backend Server Required', message }) => (
  <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-200"><ServerOff className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" /><div><p className="font-semibold text-amber-300">{title}</p><p className="mt-0.5 opacity-90">{message}</p></div></div>
);
