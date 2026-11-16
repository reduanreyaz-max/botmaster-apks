import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AppShell } from './components/layout/AppShell';
import { AuthPage } from './pages/AuthPage';
import { UserHomePage } from './pages/UserHomePage';
import { WorkspacePage } from './pages/WorkspacePage';
import { HostingBillingPage } from './pages/HostingBillingPage';
import { ProfileSettingsPage } from './pages/ProfileSettingsPage';

const Routes: React.FC = () => {
  const { route } = useApp();
  if (route === 'auth') return <AuthPage />;
  if (route === 'workspace') return <WorkspacePage />;
  if (route === 'hosting') return <HostingBillingPage />;
  if (route === 'profile') return <ProfileSettingsPage />;
  return <UserHomePage />;
};

export default function App() {
  return <AppProvider><AppShell><Routes /></AppShell></AppProvider>;
}
