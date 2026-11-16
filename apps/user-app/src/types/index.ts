export type UserRole = 'user' | 'admin';
export type AccountStatus = 'active' | 'blocked';
export type SupportedLanguage = 'python' | 'html' | 'css' | 'javascript' | 'nodejs' | 'php';
export type RuntimeMode = 'mobile' | 'cloud';
export type ProcessStatus = 'idle' | 'starting' | 'running' | 'stopped' | 'error' | 'backend_required';
export type PageRoute = 'dashboard' | 'workspace' | 'hosting' | 'profile' | 'auth';
export interface User { id: string; name: string; email: string; role: UserRole; status: AccountStatus; activePlanId: string; subscriptionStatus: 'active' | 'pending' | 'expired' | 'free'; subscriptionExpiresAt: string | null; storageUsedMb: number; storageLimitMb: number; createdAt: string; isDemo?: boolean; }
export interface ProjectFile { name: string; language: SupportedLanguage; content: string; sizeBytes: number; }
export interface Project { id: string; ownerId: string; name: string; language: SupportedLanguage; code: string; files: ProjectFile[]; runtimeMode: RuntimeMode; status: ProcessStatus; lastSavedAt: string; lastBackupAt: string | null; storageMb: number; isDemo?: boolean; }
export interface ConsoleLogEntry { id: string; timestamp: string; level: 'info' | 'warn' | 'error' | 'system' | 'stdout'; message: string; }
export interface SubscriptionPlan { id: string; name: string; tier: 'free' | 'mobile' | 'cloud_pro' | 'backup_addon'; priceUsdMonthly: number; description: string; features: string[]; cpuLimit: string; ramLimitMb: number; storageLimitMb: number; twentyFourSevenCloud: boolean; cloudBackupIncluded: boolean; active: boolean; }
export interface SubscriptionApplication { id: string; userId: string; userEmail: string; planId: string; planName: string; amountUsd: number; paymentReference: string; notes: string; status: 'pending' | 'approved' | 'rejected'; submittedAt: string; isDemo?: boolean; }
export interface RuntimeLimitsConfig { maxCpuCores: number; maxMemoryMb: number; maxStorageMb: number; maxExecutionSeconds: number; networkEgressPolicy: 'restricted_allowlist' | 'outbound_http_only' | 'isolated_offline'; containerEngine: 'docker_gvisor' | 'firecracker_microvm'; }
export interface SystemLogItem { id: string; timestamp: string; severity: 'info' | 'warning' | 'critical'; source: 'auth' | 'runtime' | 'billing' | 'admin'; message: string; isDemo?: boolean; }
export interface ApiResult<T> { ok: boolean; data?: T; error?: string; backendRequired?: boolean; }
