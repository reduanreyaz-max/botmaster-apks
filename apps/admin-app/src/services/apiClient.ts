import { ApiResult } from '../types';
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').trim();
export function isBackendConfigured(): boolean { return API_BASE_URL.length > 0; }
export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<ApiResult<T>> {
  if (!isBackendConfigured()) return { ok: false, backendRequired: true, error: 'Backend API not configured.' };
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, { credentials: 'include', headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }, ...options });
    const data = await res.json().catch(() => null);
    if (!res.ok) return { ok: false, error: data?.message || `HTTP ${res.status}` };
    return { ok: true, data: data as T };
  } catch (e) { return { ok: false, error: e instanceof Error ? e.message : 'Network error' }; }
}
