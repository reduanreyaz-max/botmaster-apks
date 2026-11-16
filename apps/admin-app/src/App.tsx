import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import { AdminAuthPage } from './pages/AdminAuthPage';
import { AdminHomePage, AdminTab } from './pages/AdminHomePage';
import { AdminPage } from './pages/AdminPage';

const AdminRoutes: React.FC = () => {
  const { user, adminDemoInspection, logoutSession, toasts } = useApp();
  const [view, setView] = useState<'home' | 'panel'>('home');
  const [selectedTab, setSelectedTab] = useState<AdminTab>('overview');
  const isAdminSession = Boolean((user && user.role === 'admin') || adminDemoInspection);

  const Toasts = () => toasts.length === 0 ? null : (
    <div className="fixed top-14 right-3 left-3 sm:left-auto sm:w-96 z-50 space-y-2 pointer-events-none">
      {toasts.map((t) => <div key={t.id} className="rounded-xl border border-blue-500/40 bg-[#0B1120] px-4 py-3 text-xs text-slate-100 shadow-2xl">{t.text}</div>)}
    </div>
  );

  if (!isAdminSession) return <><Toasts /><AdminAuthPage /></>;

  return (
    <div className="min-h-[100dvh] bg-[#05070B] px-3.5 py-4 sm:px-6 pb-20 max-w-6xl mx-auto">
      <Toasts />
      <div className="mb-4 flex items-center justify-between border-b border-[#1E293B] pb-3 safe-pt">
        <span className="text-lg font-bold text-white">BOT<span className="text-blue-500">MASTER</span> <span className="text-xs text-sky-400">ADMIN</span></span>
        <div className="flex items-center gap-2">
          <button onClick={() => setView('home')} className={`min-h-[36px] rounded-xl px-3 text-xs font-semibold ${view === 'home' ? 'bg-blue-600 text-white' : 'bg-[#0B1120] text-slate-300'}`}>Home</button>
          <button onClick={() => setView('panel')} className={`min-h-[36px] rounded-xl px-3 text-xs font-semibold ${view === 'panel' ? 'bg-blue-600 text-white' : 'bg-[#0B1120] text-slate-300'}`}>Controls</button>
          <button onClick={logoutSession} aria-label="Logout" className="min-h-[36px] rounded-xl border border-[#1E293B] px-2.5 text-rose-400"><LogOut className="h-4 w-4" /></button>
        </div>
      </div>
      {view === 'home' ? <AdminHomePage onOpenSection={(tab) => { setSelectedTab(tab); setView('panel'); }} /> : <AdminPage initialTab={selectedTab} />}
    </div>
  );
};

export default function App() {
  return <AppProvider><AdminRoutes /></AppProvider>;
}
