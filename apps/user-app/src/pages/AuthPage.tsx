import React, { useState } from 'react';
import { Lock, UserPlus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { authService } from '../services/authService';
import { BackendNotice } from '../components/ui/BackendNotice';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

export const AuthPage: React.FC = () => {
  const { backendConnected, setUser, setRoute, enterDemoUserSession, notify } = useApp();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || password.length < 8) {
      setErr('Valid email & 8+ char password required.');
      return;
    }
    setErr(null);
    setLoading(true);
    const res = tab === 'login' ? await authService.login(email, password) : await authService.register(name, email, password);
    setLoading(false);
    if (!res.ok || !res.data) {
      setErr(res.error || 'Auth failed');
      return;
    }
    setUser(res.data.user);
    setRoute('dashboard');
    notify('success', 'Signed in.');
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-4 py-8 bg-gradient-to-b from-[#0B1120] to-[#05070B]">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center space-y-1">
          <Badge variant="blue">BOTMASTER User</Badge>
          <h1 className="text-3xl font-extrabold text-white">
            BOT<span className="text-blue-500">MASTER</span>
          </h1>
        </div>
        <Card>
          <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-[#05070B] p-1 mb-4 border border-[#1E293B]">
            {(['login', 'register'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setTab(m)}
                className={`min-h-[40px] rounded-lg text-xs font-semibold capitalize ${
                  tab === m ? 'bg-blue-600 text-white' : 'text-slate-400'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          {!backendConnected && (
            <div className="mb-3">
              <BackendNotice message="Connect VITE_API_BASE_URL for live auth." />
            </div>
          )}
          {err && <p className="mb-3 text-xs text-rose-400">{err}</p>}
          <form onSubmit={submit} className="space-y-3.5">
            {tab === 'register' && <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />}
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Button type="submit" loading={loading} className="w-full" icon={tab === 'register' ? <UserPlus className="h-4 w-4" /> : <Lock className="h-4 w-4" />}>
              {tab === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>
          <div className="mt-4 border-t border-[#1E293B] pt-3">
            <Button variant="secondary" size="sm" className="w-full" onClick={enterDemoUserSession}>
              Continue in Demo Mode
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
