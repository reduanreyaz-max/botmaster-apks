import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { authService } from '../services/authService';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

export const ProfileSettingsPage: React.FC = () => {
  const { user, setUser, editorFontSize, setEditorFontSize, backendConnected, notify } = useApp();
  const [name, setName] = useState(user?.name || '');
  if (!user) return null;
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!backendConnected) { setUser({ ...user, name }); notify('info', 'Updated locally.'); return; }
    const r = await authService.updateProfile(name);
    if (r.ok && r.data) { setUser(r.data.user); notify('success', 'Saved.'); }
  };
  return (
    <div className="max-w-2xl space-y-4">
      <Card title="Profile">
        <form onSubmit={save} className="space-y-3">
          <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Email" value={user.email} disabled />
          <Button type="submit" icon={<Save className="h-4 w-4" />}>Save</Button>
        </form>
      </Card>
      <Card title="Editor Settings">
        <label className="text-xs text-slate-300">Font Size ({editorFontSize}px)</label>
        <input type="range" min={11} max={18} value={editorFontSize} onChange={(e) => setEditorFontSize(Number(e.target.value))} className="w-full mt-2 accent-blue-600" />
      </Card>
    </div>
  );
};
