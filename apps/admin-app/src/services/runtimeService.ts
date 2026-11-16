import { RuntimeMode, SupportedLanguage } from '../types'; import { apiRequest } from './apiClient';
export interface ExecuteResponse { containerId: string; stdout: string[]; stderr: string[]; status: 'running' | 'stopped' | 'error'; }
export const runtimeService = {
  execute: (p: { projectId: string; language: SupportedLanguage; code: string; runtimeMode: RuntimeMode }) => apiRequest<ExecuteResponse>('/runtime/execute', { method: 'POST', body: JSON.stringify(p) }),
  stop: (projectId: string) => apiRequest<{ status: 'stopped' }>('/runtime/stop', { method: 'POST', body: JSON.stringify({ projectId }) }),
};
