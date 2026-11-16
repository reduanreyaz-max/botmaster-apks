import React, { useState } from 'react';
import { Check, Cloud, ShieldCheck, Smartphone } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { billingService } from '../services/billingService';
import { BackendNotice } from '../components/ui/BackendNotice';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

export const HostingBillingPage: React.FC = () => {
  const { user, plans, subscriptions, setSubscriptions, backendConnected, notify } = useApp();
  const [planId, setPlanId] = useState(plans[2].id);
  const [ref, setRef] = useState('');
  const [notes, setNotes] = useState('');
  const [busy, setBusy] = useState(false);
  if (!user) return null;
  const sel = plans.find((p) => p.id === planId) || plans[0];

  const apply = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const r = await billingService.submitApplication({ planId: sel.id, paymentReference: ref || 'FREE', notes });
    setBusy(false);
    if (!r.ok || !r.data) {
      setSubscriptions((p) => [{ id: `sub_${Date.now()}`, userId: user.id, userEmail: user.email, planId: sel.id, planName: sel.name, amountUsd: sel.priceUsdMonthly, paymentReference: ref || 'PENDING-BACKEND', notes, status: 'pending', submittedAt: new Date().toISOString(), isDemo: true }, ...p]);
      notify('warning', 'Recorded as local pending demo; backend approval required.');
      setRef(''); setNotes('');
      return;
    }
    setSubscriptions((p) => [r.data!, ...p]);
    notify('success', 'Application submitted.');
    setRef(''); setNotes('');
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Mobile Hosting" rightSlot={<Smartphone className="h-5 w-5 text-sky-400" />}><p className="text-xs text-slate-300">Foreground preview only. Android Doze pauses background execution.</p></Card>
        <Card title="Cloud Hosting (24/7)" rightSlot={<Cloud className="h-5 w-5 text-blue-400" />}><p className="text-xs text-slate-300">Isolated backend containers. Expiry: {user.subscriptionExpiresAt || 'Free Tier'}</p></Card>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {plans.map((p) => (
          <Card key={p.id} className={p.id === planId ? 'border-blue-500' : ''}>
            <h3 className="font-semibold text-white">{p.name}</h3>
            <p className="mt-1 text-2xl font-bold text-white">${p.priceUsdMonthly}<span className="text-xs text-slate-400">/mo</span></p>
            <ul className="mt-3 space-y-1 text-xs text-slate-300">{p.features.map((f) => <li key={f} className="flex gap-1.5"><Check className="h-3.5 w-3.5 text-sky-400 shrink-0" />{f}</li>)}</ul>
            <Button size="sm" variant={p.id === planId ? 'primary' : 'secondary'} className="mt-4 w-full" onClick={() => setPlanId(p.id)}>{p.id === planId ? 'Selected' : 'Select'}</Button>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title={`Apply: ${sel.name}`}>
          {!backendConnected && <div className="mb-3"><BackendNotice message="Applications require backend & admin approval." /></div>}
          <form onSubmit={apply} className="space-y-3">
            <Input label="Payment Reference" value={ref} onChange={(e) => setRef(e.target.value)} disabled={sel.priceUsdMonthly === 0} />
            <Input label="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
            <Button type="submit" loading={busy} className="w-full" icon={<ShieldCheck className="h-4 w-4" />}>Submit Application</Button>
          </form>
        </Card>
        <Card title="Subscription History">
          <div className="space-y-2.5">
            {subscriptions.map((s) => (
              <div key={s.id} className="rounded-xl border border-[#1E293B] bg-[#05070B] p-3 text-xs flex justify-between items-center">
                <div><p className="font-semibold text-white">{s.planName}</p><p className="text-slate-400">Ref: {s.paymentReference}</p></div>
                <Badge variant={s.status === 'approved' ? 'green' : s.status === 'rejected' ? 'red' : 'amber'}>{s.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
