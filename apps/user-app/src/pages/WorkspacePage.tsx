import React, { useMemo, useState } from 'react';
import { AlertTriangle, Cloud, Play, RotateCcw, Save, Smartphone, Square, Upload } from 'lucide-react';
import { DEMO_STARTER_CODE } from '../data/demoData';
import { useApp } from '../context/AppContext';
import { projectService } from '../services/projectService';
import { runtimeService } from '../services/runtimeService';
import { ConsoleLogEntry, RuntimeMode, SupportedLanguage } from '../types';
import { CodeEditor } from '../components/editor/CodeEditor';
import { ZipUploadModal } from '../components/editor/ZipUploadModal';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const LANGS: { id: SupportedLanguage; label: string; serverOnly: boolean }[] = [
  { id: 'python', label: 'Python', serverOnly: true },
  { id: 'html', label: 'HTML', serverOnly: false },
  { id: 'css', label: 'CSS', serverOnly: false },
  { id: 'javascript', label: 'JavaScript', serverOnly: false },
  { id: 'nodejs', label: 'Node.js', serverOnly: true },
  { id: 'php', label: 'PHP', serverOnly: true },
];

export const WorkspacePage: React.FC = () => {
  const { projects, setProjects, activeProjectId, setActiveProjectId, editorFontSize, backendConnected, notify } = useApp();
  const active = useMemo(() => projects.find((p) => p.id === activeProjectId) || projects[0], [projects, activeProjectId]);
  const [panel, setPanel] = useState<'code' | 'console' | 'preview'>('code');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [logs, setLogs] = useState<ConsoleLogEntry[]>([{ id: '0', timestamp: new Date().toLocaleTimeString(), level: 'system', message: 'Workspace ready.' }]);
  const [previewDoc, setPreviewDoc] = useState('');

  const log = (level: ConsoleLogEntry['level'], message: string) =>
    setLogs((p) => [...p.slice(-60), { id: `${Date.now()}-${Math.random()}`, timestamp: new Date().toLocaleTimeString(), level, message }]);
  const patch = (u: Partial<typeof active>) => setProjects((p) => p.map((x) => (x.id === active.id ? { ...x, ...u } : x)));

  const run = async () => {
    const meta = LANGS.find((l) => l.id === active.language)!;
    if (active.runtimeMode === 'mobile' && !meta.serverOnly) {
      const doc =
        active.language === 'html'
          ? active.code
          : active.language === 'css'
          ? `<!doctype html><html><head><style>${active.code}</style></head><body><div class="bot-badge">CSS Preview</div></body></html>`
          : `<!doctype html><html><body style="background:#0b1120;color:#cbd5e1;font-family:monospace;padding:16px"><pre id="o"></pre><script>const o=document.getElementById('o');console.log=(...a)=>{o.textContent+=a.join(' ')+'\\n'};try{${active.code}}catch(e){o.textContent+=e.message}</script></body></html>`;
      setPreviewDoc(doc);
      patch({ status: 'running' });
      log('stdout', 'Rendered in sandboxed iframe.');
      setPanel('preview');
      return;
    }
    if (active.runtimeMode === 'mobile' && meta.serverOnly) {
      patch({ status: 'backend_required' });
      log('error', `${meta.label} requires Cloud Runtime with backend sandbox.`);
      setPanel('console');
      return;
    }
    const r = await runtimeService.execute({ projectId: active.id, language: active.language, code: active.code, runtimeMode: 'cloud' });
    if (!r.ok || !r.data) {
      patch({ status: 'backend_required' });
      log('error', `[BACKEND REQUIRED] ${r.error}`);
      setPanel('console');
      return;
    }
    patch({ status: r.data.status });
    r.data.stdout.forEach((m) => log('stdout', m));
    setPanel('console');
  };

  const stop = async () => {
    if (active.runtimeMode === 'mobile') { setPreviewDoc(''); patch({ status: 'stopped' }); log('system', 'Stopped.'); return; }
    const r = await runtimeService.stop(active.id);
    if (!r.ok) { log('error', `[BACKEND REQUIRED] ${r.error}`); return; }
    patch({ status: 'stopped' });
  };

  return (
    <div className="space-y-4">
      <Card className="p-3.5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <select value={active.id} onChange={(e) => setActiveProjectId(e.target.value)} className="min-h-[42px] rounded-xl border border-[#1E293B] bg-[#05070B] px-3 text-sm text-white">
              {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <select value={active.language} onChange={(e) => { const l = e.target.value as SupportedLanguage; patch({ language: l, code: DEMO_STARTER_CODE[l] }); }} className="min-h-[42px] rounded-xl border border-[#1E293B] bg-[#05070B] px-3 text-sm text-sky-300">
              {LANGS.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
            </select>
            <Badge>{active.status}</Badge>
          </div>
          <div className="grid grid-cols-2 gap-1.5 rounded-xl border border-[#1E293B] bg-[#05070B] p-1">
            {(['mobile', 'cloud'] as RuntimeMode[]).map((m) => (
              <button key={m} onClick={() => patch({ runtimeMode: m })} className={`flex min-h-[38px] items-center justify-center gap-1.5 rounded-lg px-3 text-xs font-medium ${active.runtimeMode === m ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>
                {m === 'mobile' ? <Smartphone className="h-3.5 w-3.5" /> : <Cloud className="h-3.5 w-3.5" />}{m === 'mobile' ? 'Mobile' : 'Cloud'}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 sm:flex sm:flex-wrap gap-2">
          <Button size="sm" icon={<Play className="h-3.5 w-3.5" />} onClick={run}>Run</Button>
          <Button size="sm" variant="danger" icon={<Square className="h-3.5 w-3.5" />} onClick={stop}>Stop</Button>
          <Button size="sm" variant="secondary" icon={<RotateCcw className="h-3.5 w-3.5" />} onClick={async () => { await stop(); await run(); }}>Restart</Button>
          <Button size="sm" variant="outline" icon={<Upload className="h-3.5 w-3.5" />} onClick={() => setUploadOpen(true)}>Upload</Button>
          <Button size="sm" variant="outline" icon={<Save className="h-3.5 w-3.5" />} onClick={async () => { if (!backendConnected) { notify('info', 'Saved locally.'); return; } await projectService.saveProject(active); notify('success', 'Saved.'); }}>Save</Button>
          <Button size="sm" variant="outline" icon={<Cloud className="h-3.5 w-3.5" />} onClick={async () => { const r = await projectService.triggerCloudBackup(active.id); notify(r.ok ? 'success' : 'warning', r.ok ? 'Backed up.' : (r.error || 'Backend required.')); }}>Backup</Button>
        </div>
      </Card>
      <div className="flex items-start gap-2 rounded-xl border border-sky-500/30 bg-sky-500/10 p-3 text-xs text-sky-200">
        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
        <span>{active.runtimeMode === 'mobile' ? 'Mobile Runtime: Foreground HTML/CSS/JS only. Android OS stops background processes.' : 'Cloud Runtime: Isolated backend containers with CPU/RAM/network limits.'}</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5 rounded-xl border border-[#1E293B] bg-[#0B1120] p-1 lg:hidden">
        {(['code', 'console', 'preview'] as const).map((t) => <button key={t} onClick={() => setPanel(t)} className={`min-h-[40px] rounded-lg text-xs font-medium capitalize ${panel === t ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>{t}</button>)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className={`lg:col-span-7 ${panel === 'code' ? 'block' : 'hidden lg:block'}`}>
          <CodeEditor code={active.code} language={active.language} fontSize={editorFontSize} onChange={(c) => patch({ code: c })} />
        </div>
        <div className="lg:col-span-5 space-y-4">
          <Card className={`${panel === 'console' ? 'block' : 'hidden lg:block'} p-3.5`} title="Console & Logs">
            <div className="h-48 overflow-y-auto rounded-xl border border-[#1E293B] bg-[#05070B] p-3 font-mono text-xs space-y-1">
              {logs.map((l) => <div key={l.id} className={l.level === 'error' ? 'text-rose-400' : l.level === 'stdout' ? 'text-emerald-300' : 'text-sky-300'}>[{l.timestamp}] {l.message}</div>)}
            </div>
          </Card>
          <Card className={`${panel === 'preview' ? 'block' : 'hidden lg:block'} p-3.5`} title="HTML Live Preview">
            {previewDoc ? <iframe title="Preview" sandbox="allow-scripts" srcDoc={previewDoc} className="h-56 w-full rounded-xl border border-[#1E293B]" /> : <div className="h-40 flex items-center justify-center text-xs text-slate-500">Tap Run on HTML/CSS/JS to preview.</div>}
          </Card>
        </div>
      </div>
      <ZipUploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} onCodeImported={(n, l, c) => patch({ name: n, language: l, code: c })} />
    </div>
  );
};
