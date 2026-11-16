import React from 'react'; import { Code2, CreditCard, LayoutDashboard, LogOut, UserCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext'; import { PageRoute } from '../../types'; import { Badge } from '../ui/Badge';
export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { route, setRoute, user, isDemoSession, logoutSession, toasts } = useApp();
  const nav: { id: PageRoute; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Home', icon: <LayoutDashboard className="h-5 w-5" /> }, { id: 'workspace', label: 'Editor', icon: <Code2 className="h-5 w-5" /> },
    { id: 'hosting', label: 'Hosting', icon: <CreditCard className="h-5 w-5" /> }, { id: 'profile', label: 'Profile', icon: <UserCircle className="h-5 w-5" /> },
  ];
  const Toasts = () => toasts.length === 0 ? null : <div className="fixed top-14 right-3 left-3 sm:left-auto sm:w-96 z-50 space-y-2 pointer-events-none">{toasts.map((t) => <div key={t.id} className="rounded-xl border border-blue-500/40 bg-[#0B1120] px-4 py-3 text-xs text-slate-100 shadow-2xl">{t.text}</div>)}</div>;
  if (route === 'auth' || !user) return <div className="min-h-[100dvh] bg-[#05070B]"><Toasts />{children}</div>;
  return (
    <div className="flex min-h-[100dvh] bg-[#05070B] text-slate-100">
      <Toasts />
      <aside className="hidden md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 border-r border-[#1E293B] bg-[#0B1120] p-4">
        <span className="text-lg font-bold mb-6">BOT<span className="text-blue-500">MASTER</span></span>
        <nav className="flex-1 space-y-1.5">{nav.map((i) => <button key={i.id} onClick={() => setRoute(i.id)} className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium ${route === i.id ? 'bg-blue-600/20 text-blue-300' : 'text-slate-400'}`}>{i.icon}{i.label}</button>)}</nav>
        <button onClick={logoutSession} className="flex items-center gap-2 text-xs text-rose-400 p-2"><LogOut className="h-4 w-4" /> Sign Out</button>
      </aside>
      <div className="flex flex-1cd ~/botmaster-apks
cat << 'BDG' > apps/user-app/src/components/ui/Badge.tsx
import React from 'react';
type Variant = 'blue' | 'cyan' | 'green' | 'amber' | 'red' | 'slate';
const STYLES: Record<Variant, string> = { blue: 'bg-blue-600/20 text-blue-300 border-blue-500/30', cyan: 'bg-sky-500/15 text-sky-300 border-sky-400/30', green: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30', amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30', red: 'bg-rose-500/15 text-rose-300 border-rose-500/30', slate: 'bg-slate-800 text-slate-300 border-slate-700' };
export const Badge: React.FC<{ variant?: Variant; children: React.ReactNode; className?: string }> = ({ variant = 'slate', children, className = '' }) => <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${STYLES[variant]} ${className}`}>{children}</span>;
BDG

cat << 'BTN' > apps/user-app/src/components/ui/Button.tsx
import React from 'react'; import { Loader2 } from 'lucide-react';
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'; size?: 'sm' | 'md' | 'lg'; loading?: boolean; icon?: React.ReactNode; }
export const Button: React.FC<Props> = ({ variant = 'primary', size = 'md', loading, icon, children, className = '', disabled, ...props }) => {
  const v = { primary: 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg', secondary: 'bg-[#16213B] text-slate-100 border border-[#243252]', outline: 'bg-transparent text-slate-200 border border-slate-700', danger: 'bg-rose-600/90 text-white', ghost: 'bg-transparent text-slate-300' };
  const s = { sm: 'min-h-[36px] px-3 text-xs rounded-lg', md: 'min-h-[44px] px-4 text-sm rounded-xl', lg: 'min-h-[48px] px-5 text-base rounded-xl' };
  return <button disabled={disabled || loading} className={`inline-flex items-center justify-center gap-2 font-medium transition active:scale-[0.98] disabled:opacity-50 ${v[variant]} ${s[size]} ${className}`} {...props}>{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}{children}</button>;
};
BTN

cat << 'CRD' > apps/user-app/src/components/ui/Card.tsx
import React from 'react';
export const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string; subtitle?: string; rightSlot?: React.ReactNode }> = ({ children, className = '', title, subtitle, rightSlot }) => (
  <section className={`rounded-2xl border border-[#1E293B] bg-[#0B1120]/95 p-4 sm:p-5 shadow-xl ${className}`}>
    {(title || rightSlot) && <header className="mb-3 flex flex-wrap items-start justify-between gap-2"><div>{title && <h2 className="text-base sm:text-lg font-semibold text-white">{title}</h2>}{subtitle && <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>}</div>{rightSlot}</header>}
    {children}
  </section>
);
CRD

cat << 'INP' > apps/user-app/src/components/ui/Input.tsx
import React from 'react';
interface Props extends React.InputHTMLAttributes<HTMLInputElement> { label?: string; error?: string; helper?: string; }
export const Input: React.FC<Props> = ({ label, error, helper, className = '', ...props }) => (
  <div className="space-y-1.5">
    {label && <label className="block text-xs font-medium text-slate-300">{label}</label>}
    <input className={`min-h-[44px] w-full rounded-xl border bg-[#05070B] px-3.5 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500 ${error ? 'border-rose-500' : 'border-[#1E293B]'} ${className}`} {...props} />
    {error && <p className="text-xs text-rose-400">{error}</p>}{!error && helper && <p className="text-xs text-slate-500">{helper}</p>}
  </div>
);
INP

cat << 'MDL' > apps/user-app/src/components/ui/Modal.tsx
import React from 'react'; import { X } from 'lucide-react';
export const Modal: React.FC<{ open: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 p-0 sm:p-4"><div className="w-full max-w-lg rounded-t-3xl sm:rounded-2xl border border-[#1E293B] bg-[#0B1120] p-5 safe-pb max-h-[90dvh] overflow-y-auto"><div className="mb-4 flex items-center justify-between"><h3 className="text-base font-semibold text-white">{title}</h3><button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400"><X className="h-5 w-5" /></button></div>{children}</div></div>;
};
MDL

cat << 'BKN' > apps/user-app/src/components/ui/BackendNotice.tsx
import React from 'react'; import { ServerOff } from 'lucide-react';
export const BackendNotice: React.FC<{ title?: string; message: string }> = ({ title = 'Backend Server Required', message }) => (
  <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-200"><ServerOff className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" /><div><p className="font-semibold text-amber-300">{title}</p><p className="mt-0.5 opacity-90">{message}</p></div></div>
);
BKN

cat << 'CED' > apps/user-app/src/components/editor/CodeEditor.tsx
import React, { useMemo, useRef } from 'react'; import { SupportedLanguage } from '../../types';
const KEYS = ['Tab', '{', '}', '(', ')', '[', ']', ';', '"', "'", '<', '>', '/', '='];
function esc(s: string) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function highlight(code: string, lang: SupportedLanguage) {
  let h = esc(code).replace(/(#.*$|\/\/.*$)/gm, '<span class="text-slate-500 italic">$1</span>').replace(/("[^"\n]*"|'[^'\n]*')/g, '<span class="text-emerald-300">$1</span>');
  if (lang === 'python') h = h.replace(/\b(def|class|import|from|if|else|return|for|while|print)\b/g, '<span class="text-sky-400">$1</span>');
  if (lang === 'javascript' || lang === 'nodejs') h = h.replace(/\b(const|let|var|function|return|if|else|async|await|import|from)\b/g, '<span class="text-sky-400">$1</span>');
  if (lang === 'php') h = h.replace(/\b(echo|function|return|if|else|class)\b/g, '<span class="text-sky-400">$1</span>');
  return h + '\n';
}
export const CodeEditor: React.FC<{ code: string; language: SupportedLanguage; fontSize?: number; onChange: (v: string) => void }> = ({ code, language, fontSize = 13, onChange }) => {
  const ta = useRef<HTMLTextAreaElement | null>(null); const pre = useRef<HTMLPreElement | null>(null);
  const lines = useMemo(() => Math.max(1, code.split('\n').length), [code]);
  const html = useMemo(() => highlight(code, language), [code, language]);
  const insert = (k: string) => { const el = ta.current; if (!el) return; const s = el.selectionStart, e = el.selectionEnd, ins = k === 'Tab' ? '  ' : k; onChange(code.slice(0, s) + ins + code.slice(e)); requestAnimationFrame(() => { el.focus(); el.setSelectionRange(s + ins.length, s + ins.length); }); };
  return (
    <div className="flex flex-col rounded-2xl border border-[#1E293B] bg-[#05070B] overflow-hidden">
      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-[#1E293B] bg-[#0B1120] px-2.5 py-2">{KEYS.map((k) => <button key={k} type="button" onClick={() => insert(k)} className="min-h-[34px] min-w-[34px] shrink-0 rounded-lg border border-[#1E293B] bg-[#10182B] px-2 font-mono text-xs text-slate-200">{k}</button>)}</div>
      <div className="relative flex h-[300px] sm:h-[380px] overflow-hidden font-mono">
        <div style={{ fontSize }} className="select-none border-r border-[#1E293B] bg-[#0B1120]/70 px-2.5 py-3 text-right text-slate-600 leading-6 overflow-hidden">{Array.from({ length: lines }, (_, i) => <div key={i}>{i + 1}</div>)}</div>
        <div className="relative flex-1 overflow-hidden">
          <pre ref={pre} style={{ fontSize }} className="pointer-events-none absolute inset-0 m-0 overflow-auto whitespace-pre p-3 leading-6 text-slate-200" dangerouslySetInnerHTML={{ __html: html }} />
          <textarea ref={ta} value={code} onChange={(e) => onChange(e.target.value)} onScroll={() => { if (ta.current && pre.current) { pre.current.scrollTop = ta.current.scrollTop; pre.current.scrollLeft = ta.current.scrollLeft; } }} spellCheck={false} autoCapitalize="off" style={{ fontSize }} className="relative z-10 h-full w-full resize-none bg-transparent p-3 font-mono leading-6 text-transparent caret-sky-400 outline-none whitespace-pre overflow-auto" />
        </div>
      </div>
    </div>
  );
};
CED

cat << 'ZIP' > apps/user-app/src/components/editor/ZipUploadModal.tsx
import React, { useState } from 'react'; import { FileArchive } from 'lucide-react';
import { useApp } from '../../context/AppContext'; import { projectService } from '../../services/projectService'; import { SupportedLanguage } from '../../types';
import { BackendNotice } from '../ui/BackendNotice'; import { Button } from '../ui/Button'; import { Modal } from '../ui/Modal';
function detect(name: string): SupportedLanguage { const n = name.toLowerCase(); if (n.endsWith('.py')) return 'python'; if (n.endsWith('.html')) return 'html'; if (n.endsWith('.css')) return 'css'; if (n.endsWith('.php')) return 'php'; if (n.endsWith('.mjs')) return 'nodejs'; return 'javascript'; }
export const ZipUploadModal: React.FC<{ open: boolean; onClose: () => void; onCodeImported: (n: string, l: SupportedLanguage, c: string) => void }> = ({ open, onClose, onCodeImported }) => {
  const { notify, backendConnected } = useApp(); const [paste, setPaste] = useState(''); const [lang, setLang] = useState<SupportedLanguage>('python'); const [busy, setBusy] = useState(false);
  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    if (f.name.toLowerCase().endsWith('.zip')) { setBusy(true); const r = await projectService.uploadProjectArchive(f); setBusy(false); if (!r.ok) { notify('warning', r.error || 'ZIP upload requires backend.'); return; } notify('success', 'ZIP uploaded.'); onClose(); return; }
    onCodeImported(f.name, detect(f.name), await f.text()); onClose();
  };
  return (
    <Modal open={open} onClose={onClose} title="Upload File / ZIP or Paste Code">
      <div className="space-y-4">
        <div className="rounded-xl border border-dashed border-blue-500/40 bg-[#05070B] p-4 text-center"><label className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-medium text-white"><FileArchive className="h-4 w-4" />{busy ? 'Uploading...' : 'Choose File / .ZIP'}<input type="file" accept=".py,.html,.css,.js,.php,.zip" className="hidden" onChange={onFile} /></label></div>
        {!backendConnected && <BackendNotice message="ZIP archives are processed safely on the backend server." />}
        <div className="space-y-2 border-t border-[#1E293B] pt-3">
          <select value={lang} onChange={(e) => setLang(e.target.value as SupportedLanguage)} className="min-h-[38px] rounded-lg border border-[#1E293B] bg-[#05070B] px-2.5 text-xs text-white"><option value="python">Python</option><option value="html">HTML</option><option value="css">CSS</option><option value="javascript">JavaScript</option><option value="nodejs">Node.js</option><option value="php">PHP</option></select>
          <textarea rows={4} value={paste} onChange={(e) => setPaste(e.target.value)} placeholder="Paste code..." className="w-full rounded-xl border border-[#1E293B] bg-[#05070B] p-3 font-mono text-xs text-slate-200" />
          <Button className="w-full" onClick={() => { if (!paste.trim()) return; onCodeImported(`pasted.${lang}`, lang, paste); setPaste(''); onClose(); }}>Load Pasted Code</Button>
        </div>
      </div>
    </Modal>
  );
};
ZIP

cat << 'USHELL' > apps/user-app/src/components/layout/AppShell.tsx
import React from 'react'; import { Code2, CreditCard, LayoutDashboard, LogOut, UserCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext'; import { PageRoute } from '../../types'; import { Badge } from '../ui/Badge';
export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { route, setRoute, user, isDemoSession, logoutSession, toasts } = useApp();
  const nav: { id: PageRoute; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Home', icon: <LayoutDashboard className="h-5 w-5" /> }, { id: 'workspace', label: 'Editor', icon: <Code2 className="h-5 w-5" /> },
    { id: 'hosting', label: 'Hosting', icon: <CreditCard className="h-5 w-5" /> }, { id: 'profile', label: 'Profile', icon: <UserCircle className="h-5 w-5" /> },
  ];
  const Toasts = () => toasts.length === 0 ? null : <div className="fixed top-14 right-3 left-3 sm:left-auto sm:w-96 z-50 space-y-2 pointer-events-none">{toasts.map((t) => <div key={t.id} className="rounded-xl border border-blue-500/40 bg-[#0B1120] px-4 py-3 text-xs text-slate-100 shadow-2xl">{t.text}</div>)}</div>;
  if (route === 'auth' || !user) return <div className="min-h-[100dvh] bg-[#05070B]"><Toasts />{children}</div>;
  return (
    <div className="flex min-h-[100dvh] bg-[#05070B] text-slate-100">
      <Toasts />
      <aside className="hidden md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 border-r border-[#1E293B] bg-[#0B1120] p-4">
        <span className="text-lg font-bold mb-6">BOT<span className="text-blue-500">MASTER</span></span>
        <nav className="flex-1 space-y-1.5">{nav.map((i) => <button key={i.id} onClick={() => setRoute(i.id)} className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium ${route === i.id ? 'bg-blue-600/20 text-blue-300' : 'text-slate-400'}`}>{i.icon}{i.label}</button>)}</nav>
        <button onClick={logoutSession} className="flex items-center gap-2 text-xs text-rose-400 p-2"><LogOut className="h-4 w-4" /> Sign Out</button>
      </aside>
      <div className="flex flex-1cd ~/botmaster-apks
cat << 'BDG' > apps/user-app/src/components/ui/Badge.tsx
import React from 'react';
type Variant = 'blue' | 'cyan' | 'green' | 'amber' | 'red' | 'slate';
const STYLES: Record<Variant, string> = { blue: 'bg-blue-600/20 text-blue-300 border-blue-500/30', cyan: 'bg-sky-500/15 text-sky-300 border-sky-400/30', green: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30', amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30', red: 'bg-rose-500/15 text-rose-300 border-rose-500/30', slate: 'bg-slate-800 text-slate-300 border-slate-700' };
export const Badge: React.FC<{ variant?: Variant; children: React.ReactNode; className?: string }> = ({ variant = 'slate', children, className = '' }) => <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${STYLES[variant]} ${className}`}>{children}</span>;
BDG

cat << 'BTN' > apps/user-app/src/components/ui/Button.tsx
import React from 'react'; import { Loader2 } from 'lucide-react';
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'; size?: 'sm' | 'md' | 'lg'; loading?: boolean; icon?: React.ReactNode; }
export const Button: React.FC<Props> = ({ variant = 'primary', size = 'md', loading, icon, children, className = '', disabled, ...props }) => {
  const v = { primary: 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg', secondary: 'bg-[#16213B] text-slate-100 border border-[#243252]', outline: 'bg-transparent text-slate-200 border border-slate-700', danger: 'bg-rose-600/90 text-white', ghost: 'bg-transparent text-slate-300' };
  const s = { sm: 'min-h-[36px] px-3 text-xs rounded-lg', md: 'min-h-[44px] px-4 text-sm rounded-xl', lg: 'min-h-[48px] px-5 text-base rounded-xl' };
  return <button disabled={disabled || loading} className={`inline-flex items-center justify-center gap-2 font-medium transition active:scale-[0.98] disabled:opacity-50 ${v[variant]} ${s[size]} ${className}`} {...props}>{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}{children}</button>;
};
BTN

cat << 'CRD' > apps/user-app/src/components/ui/Card.tsx
import React from 'react';
export const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string; subtitle?: string; rightSlot?: React.ReactNode }> = ({ children, className = '', title, subtitle, rightSlot }) => (
  <section className={`rounded-2xl border border-[#1E293B] bg-[#0B1120]/95 p-4 sm:p-5 shadow-xl ${className}`}>
    {(title || rightSlot) && <header className="mb-3 flex flex-wrap items-start justify-between gap-2"><div>{title && <h2 className="text-base sm:text-lg font-semibold text-white">{title}</h2>}{subtitle && <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>}</div>{rightSlot}</header>}
    {children}
  </section>
);
CRD

cat << 'INP' > apps/user-app/src/components/ui/Input.tsx
import React from 'react';
interface Props extends React.InputHTMLAttributes<HTMLInputElement> { label?: string; error?: string; helper?: string; }
export const Input: React.FC<Props> = ({ label, error, helper, className = '', ...props }) => (
  <div className="space-y-1.5">
    {label && <label className="block text-xs font-medium text-slate-300">{label}</label>}
    <input className={`min-h-[44px] w-full rounded-xl border bg-[#05070B] px-3.5 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500 ${error ? 'border-rose-500' : 'border-[#1E293B]'} ${className}`} {...props} />
    {error && <p className="text-xs text-rose-400">{error}</p>}{!error && helper && <p className="text-xs text-slate-500">{helper}</p>}
  </div>
);
INP

cat << 'MDL' > apps/user-app/src/components/ui/Modal.tsx
import React from 'react'; import { X } from 'lucide-react';
export const Modal: React.FC<{ open: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 p-0 sm:p-4"><div className="w-full max-w-lg rounded-t-3xl sm:rounded-2xl border border-[#1E293B] bg-[#0B1120] p-5 safe-pb max-h-[90dvh] overflow-y-auto"><div className="mb-4 flex items-center justify-between"><h3 className="text-base font-semibold text-white">{title}</h3><button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400"><X className="h-5 w-5" /></button></div>{children}</div></div>;
};
MDL

cat << 'BKN' > apps/user-app/src/components/ui/BackendNotice.tsx
import React from 'react'; import { ServerOff } from 'lucide-react';
export const BackendNotice: React.FC<{ title?: string; message: string }> = ({ title = 'Backend Server Required', message }) => (
  <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-200"><ServerOff className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" /><div><p className="font-semibold text-amber-300">{title}</p><p className="mt-0.5 opacity-90">{message}</p></div></div>
);
BKN

cat << 'CED' > apps/user-app/src/components/editor/CodeEditor.tsx
import React, { useMemo, useRef } from 'react'; import { SupportedLanguage } from '../../types';
const KEYS = ['Tab', '{', '}', '(', ')', '[', ']', ';', '"', "'", '<', '>', '/', '='];
function esc(s: string) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function highlight(code: string, lang: SupportedLanguage) {
  let h = esc(code).replace(/(#.*$|\/\/.*$)/gm, '<span class="text-slate-500 italic">$1</span>').replace(/("[^"\n]*"|'[^'\n]*')/g, '<span class="text-emerald-300">$1</span>');
  if (lang === 'python') h = h.replace(/\b(def|class|import|from|if|else|return|for|while|print)\b/g, '<span class="text-sky-400">$1</span>');
  if (lang === 'javascript' || lang === 'nodejs') h = h.replace(/\b(const|let|var|function|return|if|else|async|await|import|from)\b/g, '<span class="text-sky-400">$1</span>');
  if (lang === 'php') h = h.replace(/\b(echo|function|return|if|else|class)\b/g, '<span class="text-sky-400">$1</span>');
  return h + '\n';
}
export const CodeEditor: React.FC<{ code: string; language: SupportedLanguage; fontSize?: number; onChange: (v: string) => void }> = ({ code, language, fontSize = 13, onChange }) => {
  const ta = useRef<HTMLTextAreaElement | null>(null); const pre = useRef<HTMLPreElement | null>(null);
  const lines = useMemo(() => Math.max(1, code.split('\n').length), [code]);
  const html = useMemo(() => highlight(code, language), [code, language]);
  const insert = (k: string) => { const el = ta.current; if (!el) return; const s = el.selectionStart, e = el.selectionEnd, ins = k === 'Tab' ? '  ' : k; onChange(code.slice(0, s) + ins + code.slice(e)); requestAnimationFrame(() => { el.focus(); el.setSelectionRange(s + ins.length, s + ins.length); }); };
  return (
    <div className="flex flex-col rounded-2xl border border-[#1E293B] bg-[#05070B] overflow-hidden">
      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-[#1E293B] bg-[#0B1120] px-2.5 py-2">{KEYS.map((k) => <button key={k} type="button" onClick={() => insert(k)} className="min-h-[34px] min-w-[34px] shrink-0 rounded-lg border border-[#1E293B] bg-[#10182B] px-2 font-mono text-xs text-slate-200">{k}</button>)}</div>
      <div className="relative flex h-[300px] sm:h-[380px] overflow-hidden font-mono">
        <div style={{ fontSize }} className="select-none border-r border-[#1E293B] bg-[#0B1120]/70 px-2.5 py-3 text-right text-slate-600 leading-6 overflow-hidden">{Array.from({ length: lines }, (_, i) => <div key={i}>{i + 1}</div>)}</div>
        <div className="relative flex-1 overflow-hidden">
          <pre ref={pre} style={{ fontSize }} className="pointer-events-none absolute inset-0 m-0 overflow-auto whitespace-pre p-3 leading-6 text-slate-200" dangerouslySetInnerHTML={{ __html: html }} />
          <textarea ref={ta} value={code} onChange={(e) => onChange(e.target.value)} onScroll={() => { if (ta.current && pre.current) { pre.current.scrollTop = ta.current.scrollTop; pre.current.scrollLeft = ta.current.scrollLeft; } }} spellCheck={false} autoCapitalize="off" style={{ fontSize }} className="relative z-10 h-full w-full resize-none bg-transparent p-3 font-mono leading-6 text-transparent caret-sky-400 outline-none whitespace-pre overflow-auto" />
        </div>
      </div>
    </div>
  );
};
CED

cat << 'ZIP' > apps/user-app/src/components/editor/ZipUploadModal.tsx
import React, { useState } from 'react'; import { FileArchive } from 'lucide-react';
import { useApp } from '../../context/AppContext'; import { projectService } from '../../services/projectService'; import { SupportedLanguage } from '../../types';
import { BackendNotice } from '../ui/BackendNotice'; import { Button } from '../ui/Button'; import { Modal } from '../ui/Modal';
function detect(name: string): SupportedLanguage { const n = name.toLowerCase(); if (n.endsWith('.py')) return 'python'; if (n.endsWith('.html')) return 'html'; if (n.endsWith('.css')) return 'css'; if (n.endsWith('.php')) return 'php'; if (n.endsWith('.mjs')) return 'nodejs'; return 'javascript'; }
export const ZipUploadModal: React.FC<{ open: boolean; onClose: () => void; onCodeImported: (n: string, l: SupportedLanguage, c: string) => void }> = ({ open, onClose, onCodeImported }) => {
  const { notify, backendConnected } = useApp(); const [paste, setPaste] = useState(''); const [lang, setLang] = useState<SupportedLanguage>('python'); const [busy, setBusy] = useState(false);
  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    if (f.name.toLowerCase().endsWith('.zip')) { setBusy(true); const r = await projectService.uploadProjectArchive(f); setBusy(false); if (!r.ok) { notify('warning', r.error || 'ZIP upload requires backend.'); return; } notify('success', 'ZIP uploaded.'); onClose(); return; }
    onCodeImported(f.name, detect(f.name), await f.text()); onClose();
  };
  return (
    <Modal open={open} onClose={onClose} title="Upload File / ZIP or Paste Code">
      <div className="space-y-4">
        <div className="rounded-xl border border-dashed border-blue-500/40 bg-[#05070B] p-4 text-center"><label className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-medium text-white"><FileArchive className="h-4 w-4" />{busy ? 'Uploading...' : 'Choose File / .ZIP'}<input type="file" accept=".py,.html,.css,.js,.php,.zip" className="hidden" onChange={onFile} /></label></div>
        {!backendConnected && <BackendNotice message="ZIP archives are processed safely on the backend server." />}
        <div className="space-y-2 border-t border-[#1E293B] pt-3">
          <select value={lang} onChange={(e) => setLang(e.target.value as SupportedLanguage)} className="min-h-[38px] rounded-lg border border-[#1E293B] bg-[#05070B] px-2.5 text-xs text-white"><option value="python">Python</option><option value="html">HTML</option><option value="css">CSS</option><option value="javascript">JavaScript</option><option value="nodejs">Node.js</option><option value="php">PHP</option></select>
          <textarea rows={4} value={paste} onChange={(e) => setPaste(e.target.value)} placeholder="Paste code..." className="w-full rounded-xl border border-[#1E293B] bg-[#05070B] p-3 font-mono text-xs text-slate-200" />
          <Button className="w-full" onClick={() => { if (!paste.trim()) return; onCodeImported(`pasted.${lang}`, lang, paste); setPaste(''); onClose(); }}>Load Pasted Code</Button>
        </div>
      </div>
    </Modal>
  );
};
ZIP

cat << 'USHELL' > apps/user-app/src/components/layout/AppShell.tsx
import React from 'react'; import { Code2, CreditCard, LayoutDashboard, LogOut, UserCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext'; import { PageRoute } from '../../types'; import { Badge } from '../ui/Badge';
export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { route, setRoute, user, isDemoSession, logoutSession, toasts } = useApp();
  const nav: { id: PageRoute; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Home', icon: <LayoutDashboard className="h-5 w-5" /> }, { id: 'workspace', label: 'Editor', icon: <Code2 className="h-5 w-5" /> },
    { id: 'hosting', label: 'Hosting', icon: <CreditCard className="h-5 w-5" /> }, { id: 'profile', label: 'Profile', icon: <UserCircle className="h-5 w-5" /> },
  ];
  const Toasts = () => toasts.length === 0 ? null : <div className="fixed top-14 right-3 left-3 sm:left-auto sm:w-96 z-50 space-y-2 pointer-events-none">{toasts.map((t) => <div key={t.id} className="rounded-xl border border-blue-500/40 bg-[#0B1120] px-4 py-3 text-xs text-slate-100 shadow-2xl">{t.text}</div>)}</div>;
  if (route === 'auth' || !user) return <div className="min-h-[100dvh] bg-[#05070B]"><Toasts />{children}</div>;
  return (
    <div className="flex min-h-[100dvh] bg-[#05070B] text-slate-100">
      <Toasts />
      <aside className="hidden md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 border-r border-[#1E293B] bg-[#0B1120] p-4">
        <span className="text-lg font-bold mb-6">BOT<span className="text-blue-500">MASTER</span></span>
        <nav className="flex-1 space-y-1.5">{nav.map((i) => <button key={i.id} onClick={() => setRoute(i.id)} className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium ${route === i.id ? 'bg-blue-600/20 text-blue-300' : 'text-slate-400'}`}>{i.icon}{i.label}</button>)}</nav>
        <button onClick={logoutSession} className="flex items-center gap-2 text-xs text-rose-400 p-2"><LogOut className="h-4 w-4" /> Sign Out</button>
      </aside>
      <div className="flex flex-1cd ~/botmaster-apks

cat << 'BDG' > apps/user-app/src/components/ui/Badge.tsx
import React from 'react';
type Variant = 'blue' | 'cyan' | 'green' | 'amber' | 'red' | 'slate';
const STYLES: Record<Variant, string> = {
  blue: 'bg-blue-600/20 text-blue-300 border-blue-500/30',
  cyan: 'bg-sky-500/15 text-sky-300 border-sky-400/30',
  green: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  red: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  slate: 'bg-slate-800 text-slate-300 border-slate-700',
};
export const Badge: React.FC<{ variant?: Variant; children: React.ReactNode; className?: string }> = ({ variant = 'slate', children, className = '' }) => (
  <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${STYLES[variant]} ${className}`}>{children}</span>
);
BDG

cat << 'BTN' > apps/user-app/src/components/ui/Button.tsx
import React from 'react';
import { Loader2 } from 'lucide-react';
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg'; loading?: boolean; icon?: React.ReactNode;
}
export const Button: React.FC<Props> = ({ variant = 'primary', size = 'md', loading, icon, children, className = '', disabled, ...props }) => {
  const v = {
    primary: 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg',
    secondary: 'bg-[#16213B] text-slate-100 border border-[#243252]',
    outline: 'bg-transparent text-slate-200 border border-slate-700',
    danger: 'bg-rose-600/90 text-white',
    ghost: 'bg-transparent text-slate-300',
  };
  const s = { sm: 'min-h-[36px] px-3 text-xs rounded-lg', md: 'min-h-[44px] px-4 text-sm rounded-xl', lg: 'min-h-[48px] px-5 text-base rounded-xl' };
  return (
    <button disabled={disabled || loading} className={`inline-flex items-center justify-center gap-2 font-medium transition active:scale-[0.98] disabled:opacity-50 ${v[variant]} ${s[size]} ${className}`} {...props}>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}{children}
    </button>
  );
};
BTN

cat << 'CRD' > apps/user-app/src/components/ui/Card.tsx
import React from 'react';
export const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string; subtitle?: string; rightSlot?: React.ReactNode }> = ({ children, className = '', title, subtitle, rightSlot }) => (
  <section className={`rounded-2xl border border-[#1E293B] bg-[#0B1120]/95 p-4 sm:p-5 shadow-xl ${className}`}>
    {(title || rightSlot) && (
      <header className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div>{title && <h2 className="text-base sm:text-lg font-semibold text-white">{title}</h2>}{subtitle && <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>}</div>
        {rightSlot}
      </header>
    )}
    {children}
  </section>
);
CRD

cat << 'INP' > apps/user-app/src/components/ui/Input.tsx
import React from 'react';
interface Props extends React.InputHTMLAttributes<HTMLInputElement> { label?: string; error?: string; helper?: string; }
export const Input: React.FC<Props> = ({ label, error, helper, className = '', ...props }) => (
  <div className="space-y-1.5">
    {label && <label className="block text-xs font-medium text-slate-300">{label}</label>}
    <input className={`min-h-[44px] w-full rounded-xl border bg-[#05070B] px-3.5 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500 ${error ? 'border-rose-500' : 'border-[#1E293B]'} ${className}`} {...props} />
    {error && <p className="text-xs text-rose-400">{error}</p>}{!error && helper && <p className="text-xs text-slate-500">{helper}</p>}
  </div>
);
INP

cat << 'MDL' > apps/user-app/src/components/ui/Modal.tsx
import React from 'react';
import { X } from 'lucide-react';
export const Modal: React.FC<{ open: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 p-0 sm:p-4">
      <div className="w-full max-w-lg rounded-t-3xl sm:rounded-2xl border border-[#1E293B] bg-[#0B1120] p-5 safe-pb max-h-[90dvh] overflow-y-auto">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400"><X className="h-5 w-5" /></button>
        </div>
        {children}
      </div>
    </div>
  );
};
MDL

cat << 'BKN' > apps/user-app/src/components/ui/BackendNotice.tsx
import React from 'react';
import { ServerOff } from 'lucide-react';
export const BackendNotice: React.FC<{ title?: string; message: string }> = ({ title = 'Backend Server Required', message }) => (
  <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-200">
    <ServerOff className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
    <div><p className="font-semibold text-amber-300">{title}</p><p className="mt-0.5 opacity-90">{message}</p></div>
  </div>
);
BKN

cat << 'CED' > apps/user-app/src/components/editor/CodeEditor.tsx
import React, { useMemo, useRef } from 'react';
import { SupportedLanguage } from '../../types';
const KEYS = ['Tab', '{', '}', '(', ')', '[', ']', ';', '"', "'", '<', '>', '/', '='];
function esc(s: string) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function highlight(code: string, lang: SupportedLanguage) {
  let h = esc(code).replace(/(#.*$|\/\/.*$)/gm, '<span class="text-slate-500 italic">$1</span>').replace(/("[^"\n]*"|'[^'\n]*')/g, '<span class="text-emerald-300">$1</span>');
  if (lang === 'python') h = h.replace(/\b(def|class|import|from|if|else|return|for|while|print)\b/g, '<span class="text-sky-400">$1</span>');
  if (lang === 'javascript' || lang === 'nodejs') h = h.replace(/\b(const|let|var|function|return|if|else|async|await|import|from)\b/g, '<span class="text-sky-400">$1</span>');
  if (lang === 'php') h = h.replace(/\b(echo|function|return|if|else|class)\b/g, '<span class="text-sky-400">$1</span>');
  return h + '\n';
}
export const CodeEditor: React.FC<{ code: string; language: SupportedLanguage; fontSize?: number; onChange: (v: string) => void }> = ({ code, language, fontSize = 13, onChange }) => {
  const ta = useRef<HTMLTextAreaElement | null>(null);
  const pre = useRef<HTMLPreElement | null>(null);
  const lines = useMemo(() => Math.max(1, code.split('\n').length), [code]);
  const html = useMemo(() => highlight(code, language), [code, language]);
  const insert = (k: string) => {
    const el = ta.current; if (!el) return;
    const s = el.selectionStart, e = el.selectionEnd, ins = k === 'Tab' ? '  ' : k;
    onChange(code.slice(0, s) + ins + code.slice(e));
    requestAnimationFrame(() => { el.focus(); el.setSelectionRange(s + ins.length, s + ins.length); });
  };
  return (
    <div className="flex flex-col rounded-2xl border border-[#1E293B] bg-[#05070B] overflow-hidden">
      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-[#1E293B] bg-[#0B1120] px-2.5 py-2">
        {KEYS.map((k) => <button key={k} type="button" onClick={() => insert(k)} className="min-h-[34px] min-w-[34px] shrink-0 rounded-lg border border-[#1E293B] bg-[#10182B] px-2 font-mono text-xs text-slate-200">{k}</button>)}
      </div>
      <div className="relative flex h-[300px] sm:h-[380px] overflow-hidden font-mono">
        <div style={{ fontSize }} className="select-none border-r border-[#1E293B] bg-[#0B1120]/70 px-2.5 py-3 text-right text-slate-600 leading-6 overflow-hidden">
          {Array.from({ length: lines }, (_, i) => <div key={i}>{i + 1}</div>)}
        </div>
        <div className="relative flex-1 overflow-hidden">
          <pre ref={pre} style={{ fontSize }} className="pointer-events-none absolute inset-0 m-0 overflow-auto whitespace-pre p-3 leading-6 text-slate-200" dangerouslySetInnerHTML={{ __html: html }} />
          <textarea ref={ta} value={code} onChange={(e) => onChange(e.target.value)} onScroll={() => { if (ta.current && pre.current) { pre.current.scrollTop = ta.current.scrollTop; pre.current.scrollLeft = ta.current.scrollLeft; } }} spellCheck={false} autoCapitalize="off" style={{ fontSize }} className="relative z-10 h-full w-full resize-none bg-transparent p-3 font-mono leading-6 text-transparent caret-sky-400 outline-none whitespace-pre overflow-auto" />
        </div>
      </div>
    </div>
  );
};
CED

cat << 'ZIP' > apps/user-app/src/components/editor/ZipUploadModal.tsx
import React, { useState } from 'react';
import { FileArchive } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { projectService } from '../../services/projectService';
import { SupportedLanguage } from '../../types';
import { BackendNotice } from '../ui/BackendNotice';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
function detect(name: string): SupportedLanguage {
  const n = name.toLowerCase();
  if (n.endsWith('.py')) return 'python';
  if (n.endsWith('.html')) return 'html';
  if (n.endsWith('.css')) return 'css';
  if (n.endsWith('.php')) return 'php';
  if (n.endsWith('.mjs')) return 'nodejs';
  return 'javascript';
}
export const ZipUploadModal: React.FC<{ open: boolean; onClose: () => void; onCodeImported: (n: string, l: SupportedLanguage, c: string) => void }> = ({ open, onClose, onCodeImported }) => {
  const { notify, backendConnected } = useApp();
  const [paste, setPaste] = useState('');
  const [lang, setLang] = useState<SupportedLanguage>('python');
  const [busy, setBusy] = useState(false);
  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    if (f.name.toLowerCase().endsWith('.zip')) {
      setBusy(true); const r = await projectService.uploadProjectArchive(f); setBusy(false);
      if (!r.ok) { notify('warning', r.error || 'ZIP upload requires backend.'); return; }
      notify('success', 'ZIP uploaded.'); onClose(); return;
    }
    onCodeImported(f.name, detect(f.name), await f.text()); onClose();
  };
  return (
    <Modal open={open} onClose={onClose} title="Upload File / ZIP or Paste Code">
      <div className="space-y-4">
        <div className="rounded-xl border border-dashed border-blue-500/40 bg-[#05070B] p-4 text-center">
          <label className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-medium text-white">
            <FileArchive className="h-4 w-4" />{busy ? 'Uploading...' : 'Choose File / .ZIP'}
            <input type="file" accept=".py,.html,.css,.js,.php,.zip" className="hidden" onChange={onFile} />
          </label>
        </div>
        {!backendConnected && <BackendNotice message="ZIP archives are processed safely on the backend server." />}
        <div className="space-y-2 border-t border-[#1E293B] pt-3">
          <select value={lang} onChange={(e) => setLang(e.target.value as SupportedLanguage)} className="min-h-[38px] rounded-lg border border-[#1E293B] bg-[#05070B] px-2.5 text-xs text-white">
            <option value="python">Python</option><option value="html">HTML</option><option value="css">CSS</option><option value="javascript">JavaScript</option><option value="nodejs">Node.js</option><option value="php">PHP</option>
          </select>
          <textarea rows={4} value={paste} onChange={(e) => setPaste(e.target.value)} placeholder="Paste code..." className="w-full rounded-xl border border-[#1E293B] bg-[#05070B] p-3 font-mono text-xs text-slate-200" />
          <Button className="w-full" onClick={() => { if (!paste.trim()) return; onCodeImported(`pasted.${lang}`, lang, paste); setPaste(''); onClose(); }}>Load Pasted Code</Button>
        </div>
      </div>
    </Modal>
  );
};
ZIP

cat << 'USHELL' > apps/user-app/src/components/layout/AppShell.tsx
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
  const Toasts = () => toasts.length === 0 ? null : (
    <div className="fixed top-14 right-3 left-3 sm:left-auto sm:w-96 z-50 space-y-2 pointer-events-none">
      {toasts.map((t) => <div key={t.id} className="rounded-xl border border-blue-500/40 bg-[#0B1120] px-4 py-3 text-xs text-slate-100 shadow-2xl">{t.text}</div>)}
    </div>
  );
  if (route === 'auth' || !user) return <div className="min-h-[100dvh] bg-[#05070B]"><Toasts />{children}</div>;
  return (
    <div className="flex min-h-[100dvh] bg-[#05070B] text-slate-100">
      <Toasts />
      <aside className="hidden md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 border-r border-[#1E293B] bg-[#0B1120] p-4">
        <span className="text-lg font-bold mb-6">BOT<span className="text-blue-500">MASTER</span></span>
        <nav className="flex-1 space-y-1.5">
          {nav.map((i) => <button key={i.id} onClick={() => setRoute(i.id)} className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium ${route === i.id ? 'bg-blue-600/20 text-blue-300' : 'text-slate-400'}`}>{i.icon}{i.label}</button>)}
        </nav>
        <button onClick={logoutSession} className="flex items-center gap-2 text-xs text-rose-400 p-2"><LogOut className="h-4 w-4" /> Sign Out</button>
      </aside>
      <div className="flex flex-1 flex-col md:pl-60">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#1E293B] bg-[#05070B]/95 px-4 py-3 safe-pt">
          <span className="font-bold md:hidden">BOT<span className="text-blue-500">MASTER</span></span>
          <span className="hidden md:block text-xs text-slate-400 capitalize">{route}</span>
          <div className="flex items-center gap-2">{isDemoSession && <Badge variant="amber">DEMO</Badge>}<button onClick={() => setRoute('auth')} className="rounded-xl border border-[#1E293B] bg-[#0B1120] px-3 py-1.5 text-xs">Auth</button></div>
        </header>
        <main className="flex-1 px-3.5 py-4 sm:px-6 pb-24 md:pb-8 max-w-6xl w-full mx-auto">{children}</main>
      </div>
      <nav className="fixed bottom-0 inset-x-0 z-40 grid grid-cols-4 border-t border-[#1E293B] bg-[#0B1120]/95 md:hidden safe-pb">
        {nav.map((i) => <button key={i.id} onClick={() => setRoute(i.id)} className={`flex min-h-[56px] flex-col items-center justify-center gap-1 text-[11px] font-medium ${route === i.id ? 'text-blue-400' : 'text-slate-400'}`}>{i.icon}<span>{i.label}</span></button>)}
      </nav>
    </div>
  );
};
