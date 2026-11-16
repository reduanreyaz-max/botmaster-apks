import { SubscriptionApplication } from '../types'; import { apiRequest } from './apiClient';
export const billingService = {
  submitApplication: (p: { planId: string; paymentReference: string; notes: string }) => apiRequest<SubscriptionApplication>('/billing/apply', { method: 'POST', body: JSON.stringify(p) }),
};
