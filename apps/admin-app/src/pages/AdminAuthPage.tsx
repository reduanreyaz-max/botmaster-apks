import React, { useState } from 'react';
import { Lock, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { adminService } from '../services/adminService';
import { BackendNotice } from '../components/ui/BackendNotice';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

export const AdminAuthPage: React.FC = () => {
  const { backendConnected, setUser, setAdminDemoInspection, notify } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invite, setInvite] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr(null);
    const r = await adminService.verifyAdminLoginAndInvite({ email, password, invitationCode: invite });
    setBusy(false);
    if (!r.ok || !r.data) { setErr(r.error || 'Server verification failed.'); return; }
    setUser(r.data.adminUser); setAdminDemoInspection(false); notify('success', 'Admin verified.');
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-4 py-8 bg-gradient-to-b from-[#0B1120] to-[#05070B]">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center space-y-1">
          <Badge variant="cyan">BOTMASTER Admin APK</Badge>
          <h1 className="text-3xl font-extrabold text-white">ADMIN <span className="text-blue-500">PORTAL</span></h1>
        </div>
        <Card>
          {!backendConnected && <div className="mb-3"><BackendNotice message="Admin invitation codes are verified strictly on the backend using server env secrets." /></div>}
          {err && <p className="mb-3 text-xs text-rose-400">{err}</p>}
          <form onSubmit={submit} className="space-y-3.5">
            <Input label="Admin Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Input label="Server Invitation Code" type="password" value={invite} onChange={(e) => setInvite(e.target.value)} required />
            <div className="flex gap-2 text-xs text-sky-300 bg-sky-500/10 p-2.5 rounded-xl border border-sky-500/25">
              <ShieldAlert className="h-4 w-4 shrink-0" /><span>No admin secret is stored inside this APK.</span>
            </div>
            <Button type="submit" loading={busy} className="w-full" icon={<Lock className="h-4 w-4" />}>Verify & Sign In</Button>
          </form>
          <div className="mt-4 border-t border-[#1E293B] pt-3">
            <Button variant="outline" size="sm" className="w-full" onClick={() => setAdminDemoInspection(true)}>Inspect Admin UI (Read-Only Demo)</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
