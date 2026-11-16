import React from 'react';
import { Code2, CreditCard, LayoutDashboard, LogOut, UserCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageRoute } from '../../types';
import { Badge } from '../ui/Badge';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { route, setRoute, user, isDemoSession, logoutSession, toasts } = useApp();
  const nav: { id: PageRoute; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Home', icon: <LayoutDashboard className="h-5 w-5" /> },
    { id: 'workspace', label: 'Editor', icon: <Code2 className="h-5 w-5" /> },
    { id: 'hosting', label: 'Hosting', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'profile', label: 'Profile', icon: <UserCircle className="h-5 w-5" /> },
  ];

  const renderToasts = () =>
    toasts.length === 0 ? null : (
      <div className="fixed top-14 right-3 left-3 sm:left-auto sm:w-96 z-50 space-y-2 pointer-events-none">
        {toasts.map((t) => (
          <div key={t.id} className="rounded-xl border border-blue-500/40 bg-[#0B1120] px-4 py-3 text-xs text-slate-100 shadow-2xl">
            {t.text}
          </div>
        ))}
      </div>
    );

  if (route === 'auth' || !user) {
    return (
      <div className="min-h-[100dvh] bg-[#05070B]">
        {renderToasts()}
        {children}
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] bg-[#05070B] text-slate-100">
      {renderToasts()}
      <aside className="hidden md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 border-r border-[#1E293B] bg-[#0B1120] p-4">
        <span className="text-lg font-bold mb-6">
          BOT<span className="text-blue-500">MASTER</span>
        </span>
        <nav className="flex-1 space-y-1.5">
          {nav.map((i) => (
            <button
              key={i.id}
              onClick={() => setRoute(i.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium ${
                route === i.id ? 'bg-blue-600/20 text-blue-300' : 'text-slate-400'
              }`}
            >
              {i.icon}
              {i.label}
            </button>
          ))}
        </nav>
        <button onClick={logoutSession} className="flex items-center gap-2 text-xs text-rose-400 p-2">
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </aside>

      <div className="flex flex-1 flex-col md:pl-60">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#1E293B] bg-[#05070B]/95 px-4 py-3 safe-pt">
          <span className="font-bold md:hidden">
            BOT<span className="text-blue-500">MASTER</span>
          </span>
          <span className="hidden md:block text-xs text-slate-400 capitalize">{route}</span>
          <div className="flex items-center gap-2">
            {isDemoSession && <Badge variant="amber">DEMO</Badge>}
            <button onClick={() => setRoute('auth')} className="rounded-xl border border-[#1E293B] bg-[#0B1120] px-3 py-1.5 text-xs">
              Auth
            </button>
          </div>
        </header>
        <main className="flex-1 px-3.5 py-4 sm:px-6 pb-24 md:pb-8 max-w-6xl w-full mx-auto">{children}</main>
      </div>

      <nav className="fixed bottom-0 inset-x-0 z-40 grid grid-cols-4 border-t border-[#1E293B] bg-[#0B1120]/95 md:hidden safe-pb">
        {nav.map((i) => (
          <button
            key={i.id}
            onClick={() => setRoute(i.id)}
            className={`flex min-h-[56px] flex-col items-center justify-center gap-1 text-[11px] font-medium ${
              route === i.id ? 'text-blue-400' : 'text-slate-400'
            }`}
          >
            {i.icon}
            <span>{i.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
