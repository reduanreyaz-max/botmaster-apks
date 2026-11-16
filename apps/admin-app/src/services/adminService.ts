import { RuntimeLimitsConfig, SubscriptionApplication, SubscriptionPlan, User } from '../types'; import { apiRequest } from './apiClient';
export const adminService = {
  verifyAdminLoginAndInvite: (p: { email: string; password: string; invitationCode: string }) => apiRequest<{ adminUser: User }>('/admin/auth/verify-invite', { method: 'POST', body: JSON.stringify(p) }),
  setUserStatus: (id: string, status: 'active' | 'blocked') => apiRequest<User>(`/admin/users/${encodeURIComponent(id)}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  decideSubscription: (id: string, decision: 'approved' | 'rejected') => apiRequest<SubscriptionApplication>(`/admin/subscriptions/${encodeURIComponent(id)}/decision`, { method: 'POST', body: JSON.stringify({ decision }) }),
  updatePlan: (plan: SubscriptionPlan) => apiRequest<SubscriptionPlan>(`/admin/plans/${encodeURIComponent(plan.id)}`, { method: 'PUT', body: JSON.stringify(plan) }),
  updateRuntimeLimits: (limits: RuntimeLimitsConfig) => apiRequest<RuntimeLimitsConfig>('/admin/runtime-limits', { method: 'PUT', body: JSON.stringify(limits) }),
};
