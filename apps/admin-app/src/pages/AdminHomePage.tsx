import React from 'react';
import { Activity, BellRing, Cpu, DollarSign, Lock, ShieldCheck, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export type AdminTab = 'overview' | 'users' | 'subscriptions' | 'hosting' | 'storage' | 'logs';

export const AdminHomePage: React.FC<{ onOpenSection: (tab: AdminTab) => void }> = ({ onOpenSection }) => {
  const { adminUsers, subscriptions, runtimeLimits, systemLogs, backendConnected, user } = useApp();
  const pending = subscriptions.filter((s) => s.status === 'pending').length;
  const blocked = adminUsers.filter((u) => u.status === 'blocked').length;
  const verified = Boolean(user?.role === 'admin' && backendConnected);

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-sky-500/30 bg-gradient-to-br from-[#0E1E3A] via-[#0B1120] to-[#05070B] p-5 sm:p-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Badge variant={verified ? 'green' : 'amber'}>
              <Lock className="h-3 w-3" />{verified ? 'SERVER ADMIN VERIFIED' : 'READ-ONLY DEMO UI'}
            </Badge>
            <h1 className="mt-2 text-2xl font-extrabold text-white">BOTMASTER Admin</h1>
            <p className="text-xs sm:text-sm text-slate-300">Users, approvals, container limits & logs.</p>
          </div>
          <Button icon={<ShieldCheck className="h-4 w-4" />} onClick={() => onOpenSection('subscriptions')}>
            Review Queue ({pending})
          </Button>
        </div>
      </div>

      {pending > 0 && (
        <button onClick={() => onOpenSection('subscriptions')} className="flex w-full items-center justify-between rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-left">
          <div className="flex items-center gap-3">
            <BellRing className="h-5 w-5 text-amber-400" />
            <div>
              <p className="text-sm font-bold text-amber-200">{pending} Pending Subscription(s)</p>
              <p className="text-xs text-amber-200/80">Tap to review</p>
            </div>
          </div>
          <Badge variant="amber">Review</Badge>
        </button>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <button onClick={() => onOpenSection('users')} className="rounded-2xl border border-[#1E293B] bg-[#0B1120] p-4 text-left">
          <Users className="h-5 w-5 text-blue-400" /><p className="mt-3 text-2xl font-bold text-white">{adminUsers.length}</p><p className="text-xs text-slate-400">Users ({blocked} blocked)</p>
        </button>
        <button onClick={() => onOpenSection('subscriptions')} className="rounded-2xl border border-[#1E293B] bg-[#0B1120] p-4 text-left">
          <DollarSign className="h-5 w-5 text-emerald-400" /><p className="mt-3 text-2xl font-bold text-white">{pending}</p><p className="text-xs text-slate-400">Billing Queue</p>
        </button>
        <button onClick={() => onOpenSection('hosting')} className="rounded-2xl border border-[#1E293B] bg-[#0B1120] p-4 text-left">
          <Cpu className="h-5 w-5 text-sky-400" /><p className="mt-3 text-lg font-bold text-white">{runtimeLimits.maxCpuCores} vCPU</p><p className="text-xs text-slate-400">{runtimeLimits.maxMemoryMb} MB RAM</p>
        </button>
        <button onClick={() => onOpenSection('logs')} className="rounded-2xl border border-[#1E293B] bg-[#0B1120] p-4 text-left">
          <Activity className="h-5 w-5 text-amber-400" /><p className="mt-3 text-2xl font-bold text-white">{systemLogs.length}</p><p className="text-xs text-slate-400">Audit Logs</p>
        </button>
      </div>

      <Card title="Latest Security Feed" rightSlot={<Button size="sm" variant="ghost" onClick={() => onOpenSection('logs')}>View All</Button>}>
        <div className="space-y-2 font-mono text-xs">
          {systemLogs.map((l) => (
            <div key={l.id} className="rounded-xl border border-[#1E293B] bg-[#05070B] p-3 text-slate-300">
              [{l.timestamp}] [{l.source}] {l.message}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
