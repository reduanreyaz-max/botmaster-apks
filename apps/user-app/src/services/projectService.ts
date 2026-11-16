import { ApiResult, Project } from '../types'; import { apiRequest, API_BASE_URL, isBackendConfigured } from './apiClient';
export const projectService = {
  saveProject: (project: Project) => apiRequest<Project>(`/projects/${encodeURIComponent(project.id)}`, { method: 'PUT', body: JSON.stringify(project) }),
  triggerCloudBackup: (projectId: string) => apiRequest<{ backedUpAt: string }>(`/projects/${encodeURIComponent(projectId)}/backup`, { method: 'POST' }),
  async uploadProjectArchive(file: File): Promise<ApiResult<Project>> {
    if (!isBackendConfigured()) return { ok: false, backendRequired: true, error: 'ZIP extraction requires backend server.' };
    const fd = new FormData(); fd.append('archive', file);
    try { const r = await fetch(`${API_BASE_URL}/projects/upload-zip`, { method: 'POST', credentials: 'include', body: fd }); const j = await r.json().catch(() => null); return r.ok ? { ok: true, data: j as Project } : { ok: false, error: j?.message || 'Upload failed' }; }
    catch (e) { return { ok: false, error: e instanceof Error ? e.message : 'Upload failed' }; }
  },
};
