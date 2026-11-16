import React, { useEffect, useState } from 'react';
import { Activity, Ban, CheckCircle2, Cpu, Database, DollarSign, ShieldAlert, Users, XCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { adminService } from '../services/adminService';
import { BackendNotice } from '../components/ui/BackendNotice';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { AdminTab } from './AdminHomePage';

export const AdminPage: React.FC<{ initialTab?: AdminTab }> = ({ initialTab = 'overview' }) => {
  const { user, backendConnected, adminUsers, setAdminUsers, subscriptions, setSubscriptions, plans, setPlans, runtimeLimits, setRuntimeLimits, projects, systemLogs, notify } = useApp();
  const [tab, setTab] = useState<AdminTab>(initialTab);
  const [search, setSearch] = useState('');
  useEffect(() => { setTab(initialTab); }, [initialTab]);

  const isRealAdmin = Boolean(user && user.role === 'admin' && backendConnected);
  const guard = () => { if (!isRealAdmin) { notify('warning', 'Read-Only Demo UI. Connect backend & verify invite code.'); return false; } return true; };

  const toggleBlock = async (id: string, cur: 'active' | 'blocked') => {
    if (!guard()) return;
    const next = cur === 'active' ? 'blocked' : 'active';
    const r = await adminService.setUserStatus(id, next);
    if (!r.ok) { notify('error', r.error || 'Failed.'); return; }
    setAdminUsers((p) => p.map((u) => (u.id === id ? { ...u, status: next } : u)));
    notify('success', `User ${next}.`);
  };

  const decideSub = async (id: string, d: 'approved' | 'rejected') => {
    if (!guard()) return;
    const r = await adminService.decideSubscription(id, d);
    if (!r.ok) { notify('error', r.error || 'Failed.'); return; }
    setSubscriptions((p) => p.map((s) => (s.id === id ? { ...s, status: d } : s)));
    notify('success', `Subscription ${d}.`);
  };

  const tabs: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Analytics', icon: <Activity className="h-4 w-4" /> },
    { id: 'users', label: 'Users', icon: <Users className="h-4 w-4" /> },
    { id: 'subscriptions', label: 'Billing', icon: <DollarSign className="h-4 w-4" /> },
    { id: 'hosting', label: 'Limits', icon: <Cpu className="h-4 w-4" /> },
    { id: 'storage', label: 'Projects', icon: <Database className="h-4 w-4" /> },
    { id: 'logs', label: 'Logs', icon: <ShieldAlert className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-4">
      {!isRealAdmin && <BackendNotice title="Read-Only Admin Preview" message="Admin invite verification and mutations require live backend + server env secrets." />}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`flex min-h-[42px] shrink-0 items-center gap-2 rounded-xl border px-3.5 text-xs font-semibold ${tab === t.id ? 'border-blue-500 bg-blue-600/20 text-blue-300' : 'border-[#1E293B] bg-[#0B1120] text-slate-400'}`}>
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Card className="p-4"><p className="text-xs text-slate-400">Users [Demo]</p><p className="text-2xl font-bold mt-1">{adminUsers.length}</p></Card>
          <Card className="p-4"><p className="text-xs text-slate-400">Pending Billing</p><p className="text-2xl font-bold text-amber-300 mt-1">{subscriptions.filter((s) => s.status === 'pending').length}</p></Card>
          <Card className="p-4"><p className="text-xs text-slate-400">Sandbox</p><p className="text-sm font-bold text-sky-300 mt-1">{runtimeLimits.containerEngine}</p></Card>
          <Card className="p-4"><p className="text-xs text-slate-400">Timeout</p><p className="text-2xl font-bold mt-1">{runtimeLimits.maxExecutionSeconds}s</p></Card>
        </div>
      )}

      {tab === 'users' && (
        <Card title="User Management">
          <div className="mb-3"><Input placeholder="Search user..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          <div className="space-y-2.5">
            {adminUsers.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())).map((u) => (
              <div key={u.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-[#1E293B] bg-[#05070B] p-3.5">
                <div><p className="font-semibold text-sm text-white">{u.name} <Badge variant={u.status === 'active' ? 'green' : 'red'}>{u.status}</Badge></p><p className="text-xs text-slate-400">{u.email}</p></div>
                <Button size="sm" variant={u.status === 'active' ? 'danger' : 'secondary'} icon={<Ban className="h-3.5 w-3.5" />} onClick={() => toggleBlock(u.id, u.status)}>{u.status === 'active' ? 'Block' : 'Unblock'}</Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === 'subscriptions' && (
        <div className="space-y-4">
          <Card title="Subscription Queue">
            <div className="space-y-2.5">
              {subscriptions.map((s) => (
                <div key={s.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-[#1E293B] bg-[#05070B] p-3.5 text-xs">
                  <div><p className="font-semibold text-sm text-white">{s.userEmail} <Badge variant={s.status === 'approved' ? 'green' : s.status === 'rejected' ? 'red' : 'amber'}>{s.status}</Badge></p><p className="text-slate-400">{s.planName} (${s.amountUsd}/mo) · Ref: {s.paymentReference}</p></div>
                  <div className="flex gap-2">
                    <Button size="sm" icon={<CheckCircle2 className="h-3.5 w-3.5" />} onClick={() => decideSub(s.id, 'approved')}>Approve</Button>
                    <Button size="sm" variant="danger" icon={<XCircle className="h-3.5 w-3.5" />} onClick={() => decideSub(s.id, 'rejected')}>Reject</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Plan Pricing">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {plans.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-xl border border-[#1E293B] bg-[#05070B] p-3 text-xs">
                  <div><p className="font-semibold text-white">{p.name}</p><p className="text-slate-400">{p.ramLimitMb} MB RAM</p></div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sky-300">${p.priceUsdMonthly}</span>
                    <Button size="sm" variant="outline" onClick={async () => { if (!guard()) return; const u = { ...p, priceUsdMonthly: p.priceUsdMonthly + 1 }; await adminService.updatePlan(u); setPlans((x) => x.map((y) => (y.id === p.id ? u : y))); }}>+$1</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === 'hosting' && (
        <Card title="Sandbox Limits">
          <form onSubmit={async (e) => { e.preventDefault(); if (!guard()) return; await adminService.updateRuntimeLimits(runtimeLimits); notify('success', 'Saved.'); }} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="Max CPU Cores" type="number" step="0.25" value={runtimeLimits.maxCpuCores} onChange={(e) => setRuntimeLimits({ ...runtimeLimits, maxCpuCores: Number(e.target.value) })} />
            <Input label="Max RAM (MB)" type="number" value={runtimeLimits.maxMemoryMb} onChange={(e) => setRuntimeLimits({ ...runtimeLimits, maxMemoryMb: Number(e.target.value) })} />
            <Input label="Max Storage (MB)" type="number" value={runtimeLimits.maxStorageMb} onChange={(e) => setRuntimeLimits({ ...runtimeLimits, maxStorageMb: Number(e.target.value) })} />
            <Input label="Timeout (Seconds)" type="number" value={runtimeLimits.maxExecutionSeconds} onChange={(e) => setRuntimeLimits({ ...runtimeLimits, maxExecutionSeconds: Number(e.target.value) })} />
            <div className="sm:col-span-2"><Button type="submit">Save Limits</Button></div>
          </form>
        </Card>
      )}

      {tab === 'storage' && (
        <Card title="Projects & Storage">
          <div className="space-y-2">{projects.map((p) => (
            <div key={p.id} className="flex justify-between rounded-xl border border-[#1E293B] bg-[#05070B] p-3 text-xs">
              <div><p className="font-semibold text-white">{p.name}</p><p className="text-slate-400">{p.language} · {p.runtimeMode}</p></div>
              <Badge variant="blue">{p.storageMb} MB</Badge>
            </div>
          ))}</div>
        </Card>
      )}

      {tab === 'logs' && (
        <Card title="System Logs">
          <div className="space-y-2 font-mono text-xs">{systemLogs.map((l) => <div key={l.id} className="rounded-xl border border-[#1E293B] bg-[#05070B] p-3 text-slate-300">[{l.timestamp}] [{l.source}] {l.message}</div>)}</div>
        </Card>
      )}
    </div>
  );
};
