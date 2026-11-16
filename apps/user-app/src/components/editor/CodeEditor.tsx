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
