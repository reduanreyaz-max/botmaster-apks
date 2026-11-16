import React from 'react';
import { ArrowUpRight, Cloud, Code2, FileArchive, FolderCode, Play, ShieldCheck, Smartphone, Sparkles, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const UserHomePage: React.FC = () => {
  const { user, projects, plans, setActiveProjectId, setRoute, isDemoSession } = useApp();
  if (!user) return null;
  const activePlan = plans.find((p) => p.id === user.activePlanId) || plans[0];
  const pct = Math.min(100, Math.round((user.storageUsedMb / user.storageLimitMb) * 100));
  const quick = [
    { t: 'Code Editor', d: 'Python, HTML, Node, PHP', i: <Code2 className="h-5 w-5 text-blue-400" />, c: 'from-blue-600/20 to-blue-900/10 border-blue-500/30', r: 'workspace' as const },
    { t: 'Upload / ZIP', d: 'Import from phone', i: <FileArchive className="h-5 w-5 text-sky-400" />, c: 'from-sky-500/20 to-sky-900/10 border-sky-500/30', r: 'workspace' as const },
    { t: 'Cloud Plans', d: '24/7 Bot Hosting', i: <Zap className="h-5 w-5 text-amber-400" />, c: 'from-amber-500/15 to-amber-900/10 border-amber-500/30', r: 'hosting' as const },
    { t: 'My Account', d: 'Profile & Settings', i: <ShieldCheck className="h-5 w-5 text-emerald-400" />, c: 'from-emerald-500/15 to-emerald-900/10 border-emerald-500/30', r: 'profile' as const },
  ];

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-br from-[#0F1B38] via-[#0B1120] to-[#05070B] p-5 sm:p-6 shadow-2xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="cyan"><Sparkles className="h-3 w-3" /> BOTMASTER Mobile</Badge>
              {isDemoSession && <Badge variant="amber">DEMO DATA</Badge>}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Hi, {user.name.split(' ')[0]}</h1>
            <p className="text-xs sm:text-sm text-slate-300">Plan: <span className="font-semibold text-sky-300">{activePlan.name}</span></p>
          </div>
          <Button size="lg" className="w-full sm:w-auto rounded-2xl" icon={<Play className="h-4 w-4" />} onClick={() => setRoute('workspace')}>
            Launch Workspace
          </Button>
        </div>
        <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-3.5">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-300">Storage</span>
            <span className="text-sky-300 font-semibold">{user.storageUsedMb} / {user.storageLimitMb} MB ({pct}%)</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-sky-400" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {quick.map((q) => (
          <button key={q.t} onClick={() => setRoute(q.r)} className={`flex flex-col justify-between rounded-2xl border bg-gradient-to-br p-4 text-left min-h-[112px] ${q.c}`}>
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/35">{q.i}</span>
              <ArrowUpRight className="h-4 w-4 text-slate-400" />
            </div>
            <div className="mt-3"><p className="text-sm font-bold text-white">{q.t}</p><p className="text-[11px] text-slate-300/80">{q.d}</p></div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex items-start gap-3 rounded-2xl border border-[#1E293B] bg-[#0B1120] p-4">
          <Smartphone className="h-5 w-5 text-sky-400 shrink-0 mt-0.5" />
          <div className="text-xs"><p className="font-semibold text-white text-sm">Mobile Runtime</p><p className="mt-0.5 text-slate-400">HTML/CSS/JS preview runs in foreground. Android pauses background tabs.</p></div>
        </div>
        <div className="flex items-start gap-3 rounded-2xl border border-[#1E293B] bg-[#0B1120] p-4">
          <Cloud className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
          <div className="text-xs"><p className="font-semibold text-white text-sm">Cloud Sandbox (24/7)</p><p className="mt-0.5 text-slate-400">Python, Node.js & PHP execute in isolated server containers.</p></div>
        </div>
      </div>

      <Card title="Recent Projects" subtitle="Tap to edit or run">
        <div className="space-y-2.5">
          {projects.map((p) => (
            <button key={p.id} onClick={() => { setActiveProjectId(p.id); setRoute('workspace'); }} className="flex w-full items-center justify-between rounded-2xl border border-[#1E293B] bg-[#05070B] p-3.5 text-left">
              <div className="flex items-center gap-3">
                <FolderCode className="h-5 w-5 text-blue-400" />
                <div><p className="text-sm font-semibold text-white">{p.name}</p><p className="text-[11px] text-slate-400">{p.language.toUpperCase()} · {p.runtimeMode}</p></div>
              </div>
              <Badge>{p.status}</Badge>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};
