import React from 'react';
export const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string; subtitle?: string; rightSlot?: React.ReactNode }> = ({ children, className = '', title, subtitle, rightSlot }) => (
  <section className={`rounded-2xl border border-[#1E293B] bg-[#0B1120]/95 p-4 sm:p-5 shadow-xl ${className}`}>
    {(title || rightSlot) && <header className="mb-3 flex flex-wrap items-start justify-between gap-2"><div>{title && <h2 className="text-base sm:text-lg font-semibold text-white">{title}</h2>}{subtitle && <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>}</div>{rightSlot}</header>}
    {children}
  </section>
);
