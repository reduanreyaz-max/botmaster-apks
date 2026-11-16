import { Project, RuntimeLimitsConfig, SubscriptionApplication, SubscriptionPlan, SupportedLanguage, SystemLogItem, User } from '../types';
export const DEMO_STARTER_CODE: Record<SupportedLanguage, string> = {
  python: `# BOTMASTER Python Demo\ndef main():\n    print("Requires backend sandbox container.")\nmain()`,
  html: `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"/><style>body{margin:0;font-family:sans-serif;background:#0b1120;color:#fff;display:grid;place-items:center;min-height:100vh}.card{background:#10182b;border:1px solid #1e293b;padding:24px;border-radius:16px;text-align:center}</style></head><body><div class="card"><h2>BOTMASTER HTML Preview</h2><p id="s">Tap test</p><button onclick="document.getElementById('s').textContent='Sandbox Active!'">Test JS</button></div></body></html>`,
  css: `.bot-badge{background:#2563eb;color:#fff;padding:10px 16px;border-radius:10px;}`,
  javascript: `console.log("BOTMASTER sandboxed JS preview active");`,
  nodejs: `// Node.js 20 — Backend isolated container required\nconsole.log("Node worker ready");`,
  php: `<?php\necho "BOTMASTER PHP Sandbox Ready\\n";\n?>`,
};
export const DEMO_USER: User = { id: 'usr_demo_01', name: 'Reduan', email: 'reduan.demo@botmaster.app', role: 'user', status: 'active', activePlanId: 'plan_free', subscriptionStatus: 'free', subscriptionExpiresAt: null, storageUsedMb: 14, storageLimitMb: 50, createdAt: '2026-09-12T10:00:00Z', isDemo: true };
export const DEMO_PROJECTS: Project[] = [
  { id: 'prj_demo_html', ownerId: 'usr_demo_01', name: 'status-landing-page', language: 'html', code: DEMO_STARTER_CODE.html, files: [{ name: 'index.html', language: 'html', content: DEMO_STARTER_CODE.html, sizeBytes: 420 }], runtimeMode: 'mobile', status: 'idle', lastSavedAt: '2026-11-16T09:30:00Z', lastBackupAt: null, storageMb: 0.4, isDemo: true },
  { id: 'prj_demo_py', ownerId: 'usr_demo_01', name: 'telegram-alert-bot', language: 'python', code: DEMO_STARTER_CODE.python, files: [{ name: 'main.py', language: 'python', content: DEMO_STARTER_CODE.python, sizeBytes: 180 }], runtimeMode: 'cloud', status: 'idle', lastSavedAt: '2026-11-15T18:10:00Z', lastBackupAt: '2026-11-15T18:12:00Z', storageMb: 4.2, isDemo: true },
];
export const DEMO_PLANS: SubscriptionPlan[] = [
  { id: 'plan_free', name: 'Free Starter', tier: 'free', priceUsdMonthly: 0, description: 'Editor & HTML preview.', features: ['Syntax editor', 'HTML live preview', '50 MB storage'], cpuLimit: 'Preview', ramLimitMb: 128, storageLimitMb: 50, twentyFourSevenCloud: false, cloudBackupIncluded: false, active: true },
  { id: 'plan_mobile', name: 'Mobile Hosting', tier: 'mobile', priceUsdMonthly: 3, description: 'Android ZIP & foreground mode.', features: ['ZIP import', 'Foreground mode', '250 MB storage'], cpuLimit: 'Device', ramLimitMb: 256, storageLimitMb: 250, twentyFourSevenCloud: false, cloudBackupIncluded: false, active: true },
  { id: 'plan_cloud_pro', name: 'Premium 24/7 Cloud', tier: 'cloud_pro', priceUsdMonthly: 12, description: '24/7 isolated Linux containers.', features: ['Python, Node.js, PHP', '1 vCPU / 1 GB RAM', 'Auto Backups'], cpuLimit: '1.0 vCPU', ramLimitMb: 1024, storageLimitMb: 2048, twentyFourSevenCloud: true, cloudBackupIncluded: true, active: true },
  { id: 'plan_backup', name: 'Cloud Backup Vault', tier: 'backup_addon', priceUsdMonthly: 4, description: 'Encrypted snapshot history.', features: ['Daily snapshots', '5 GB vault', '1-tap restore'], cpuLimit: 'Storage', ramLimitMb: 0, storageLimitMb: 5120, twentyFourSevenCloud: false, cloudBackupIncluded: true, active: true },
];
export const DEMO_SUBSCRIPTION_HISTORY: SubscriptionApplication[] = [{ id: 'sub_demo_101', userId: 'usr_demo_01', userEmail: 'reduan.demo@botmaster.app', planId: 'plan_cloud_pro', planName: 'Premium 24/7 Cloud', amountUsd: 12, paymentReference: 'DEMO-TXN-8841', notes: 'Demo pending', status: 'pending', submittedAt: '2026-11-15T14:22:00Z', isDemo: true }];
export const DEMO_ADMIN_USERS: User[] = [
  DEMO_USER,
  { id: 'usr_demo_02', name: 'Nadia Karim', email: 'nadia.demo@botmaster.app', role: 'user', status: 'active', activePlanId: 'plan_cloud_pro', subscriptionStatus: 'active', subscriptionExpiresAt: '2026-12-15T00:00:00Z', storageUsedMb: 420, storageLimitMb: 2048, createdAt: '2026-08-03T11:20:00Z', isDemo: true },
  { id: 'usr_demo_03', name: 'Blocked Account', email: 'blocked.demo@botmaster.app', role: 'user', status: 'blocked', activePlanId: 'plan_free', subscriptionStatus: 'free', subscriptionExpiresAt: null, storageUsedMb: 48, storageLimitMb: 50, createdAt: '2026-10-01T09:15:00Z', isDemo: true },
];
export const DEMO_RUNTIME_LIMITS: RuntimeLimitsConfig = { maxCpuCores: 1.0, maxMemoryMb: 1024, maxStorageMb: 2048, maxExecutionSeconds: 30, networkEgressPolicy: 'outbound_http_only', containerEngine: 'docker_gvisor' };
export const DEMO_SYSTEM_LOGS: SystemLogItem[] = [
  { id: 'log_1', timestamp: '10:02:14', severity: 'info', source: 'runtime', message: '[DEMO] Sandbox container pool healthy (14/50 active).', isDemo: true },
  { id: 'log_2', timestamp: '09:44:01', severity: 'warning', source: 'auth', message: '[DEMO] Invalid admin invite attempt blocked.', isDemo: true },
  { id: 'log_3', timestamp: '08:19:50', severity: 'info', source: 'billing', message: '[DEMO] Subscription sub_demo_101 queued for review.', isDemo: true },
];
