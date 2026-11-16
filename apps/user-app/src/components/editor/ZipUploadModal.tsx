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
