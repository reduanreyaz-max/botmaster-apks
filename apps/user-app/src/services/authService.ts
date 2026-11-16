import { User } from '../types'; import { apiRequest } from './apiClient';
export const authService = {
  login: (email: string, password: string) => apiRequest<{ user: User }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (name: string, email: string, password: string) => apiRequest<{ user: User }>('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) }),
  updateProfile: (name: string) => apiRequest<{ user: User }>('/auth/profile', { method: 'PATCH', body: JSON.stringify({ name }) }),
};
