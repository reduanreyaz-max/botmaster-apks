import React, { createContext, useContext, useState } from 'react';
import { DEMO_ADMIN_USERS, DEMO_PLANS, DEMO_PROJECTS, DEMO_RUNTIME_LIMITS, DEMO_SUBSCRIPTION_HISTORY, DEMO_SYSTEM_LOGS, DEMO_USER } from '../data/demoData';
import { isBackendConfigured } from '../services/apiClient';
import { PageRoute, Project, RuntimeLimitsConfig, SubscriptionApplication, SubscriptionPlan, SystemLogItem, User } from '../types';
export interface ToastMessage { id: string; type: 'info' | 'success' | 'error' | 'warning'; text: string; }
interface AppContextValue {
  route: PageRoute; setRoute: (r: PageRoute) => void; backendConnected: boolean;
  user: User | null; setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isDemoSession: boolean; adminDemoInspection: boolean; setAdminDemoInspection: (v: boolean) => void;
  projects: Project[]; setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  activeProjectId: string; setActiveProjectId: (id: string) => void;
  plans: SubscriptionPlan[]; setPlans: React.Dispatch<React.SetStateAction<SubscriptionPlan[]>>;
  subscriptions: SubscriptionApplication[]; setSubscriptions: React.Dispatch<React.SetStateAction<SubscriptionApplication[]>>;
  adminUsers: User[]; setAdminUsers: React.Dispatch<React.SetStateAction<User[]>>;
  runtimeLimits: RuntimeLimitsConfig; setRuntimeLimits: React.Dispatch<React.SetStateAction<RuntimeLimitsConfig>>;
  systemLogs: SystemLogItem[]; editorFontSize: number; setEditorFontSize: (s: number) => void;
  toasts: ToastMessage[]; notify: (type: ToastMessage['type'], text: string) => void;
  enterDemoUserSession: () => void; logoutSession: () => void;
}
const AppContext = createContext<AppContextValue | null>(null);
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [route, setRoute] = useState<PageRoute>('dashboard');
  const [user, setUser] = useState<User | null>(DEMO_USER);
  const [isDemoSession, setIsDemoSession] = useState(!isBackendConfigured());
  const [adminDemoInspection, setAdminDemoInspection] = useState(false);
  const [projects, setProjects] = useState<Project[]>(DEMO_PROJECTS);
  const [activeProjectId, setActiveProjectId] = useState<string>(DEMO_PROJECTS[0].id);
  const [plans, setPlans] = useState<SubscriptionPlan[]>(DEMO_PLANS);
  const [subscriptions, setSubscriptions] = useState<SubscriptionApplication[]>(DEMO_SUBSCRIPTION_HISTORY);
  const [adminUsers, setAdminUsers] = useState<User[]>(DEMO_ADMIN_USERS);
  const [runtimeLimits, setRuntimeLimits] = useState<RuntimeLimitsConfig>(DEMO_RUNTIME_LIMITS);
  const [systemLogs] = useState<SystemLogItem[]>(DEMO_SYSTEM_LOGS);
  const [editorFontSize, setEditorFontSize] = useState(13);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const notify = (type: ToastMessage['type'], text: string) => { const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`; setToasts((p) => [...p, { id, type, text }]); setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 4500); };
  const enterDemoUserSession = () => { setUser(DEMO_USER); setIsDemoSession(true); setRoute('dashboard'); notify('info', 'Demo Mode active.'); };
  const logoutSession = () => { setUser(null); setAdminDemoInspection(false); setRoute('auth'); };
  return <AppContext.Provider value={{ route, setRoute, backendConnected: isBackendConfigured(), user, setUser, isDemoSession, adminDemoInspection, setAdminDemoInspection, projects, setProjects, activeProjectId, setActiveProjectId, plans, setPlans, subscriptions, setSubscriptions, adminUsers, setAdminUsers, runtimeLimits, setRuntimeLimits, systemLogs, editorFontSize, setEditorFontSize, toasts, notify, enterDemoUserSession, logoutSession }}>{children}</AppContext.Provider>;
};
export const useApp = () => { const c = useContext(AppContext); if (!c) throw new Error('useApp outside provider'); return c; };
