import React from 'react'; import { Loader2 } from 'lucide-react';
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'; size?: 'sm' | 'md' | 'lg'; loading?: boolean; icon?: React.ReactNode; }
export const Button: React.FC<Props> = ({ variant = 'primary', size = 'md', loading, icon, children, className = '', disabled, ...props }) => {
  const v = { primary: 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg', secondary: 'bg-[#16213B] text-slate-100 border border-[#243252]', outline: 'bg-transparent text-slate-200 border border-slate-700', danger: 'bg-rose-600/90 text-white', ghost: 'bg-transparent text-slate-300' };
  const s = { sm: 'min-h-[36px] px-3 text-xs rounded-lg', md: 'min-h-[44px] px-4 text-sm rounded-xl', lg: 'min-h-[48px] px-5 text-base rounded-xl' };
  return <button disabled={disabled || loading} className={`inline-flex items-center justify-center gap-2 font-medium transition active:scale-[0.98] disabled:opacity-50 ${v[variant]} ${s[size]} ${className}`} {...props}>{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}{children}</button>;
};
