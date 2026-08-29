import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/newsreader/500.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { AppShell } from './layout/AppShell';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { ModulePage } from './pages/ModulePage';
import { ProductsPage } from './pages/ProductsPage';
import { theme } from './theme';
import './index.css';

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 30_000, retry: 1 } } });

function ProtectedShell() {
  const { user } = useAuth();
  const location = useLocation();
  return user ? <AppShell /> : <Navigate to="/login" state={{ from: location.pathname + location.search }} replace />;
}

function App() {
  return <Routes><Route path="/login" element={<LoginPage />} /><Route element={<ProtectedShell />}><Route index element={<DashboardPage />} /><Route path="products" element={<ProductsPage />} /><Route path="categories" element={<ModulePage />} /><Route path="orders" element={<ModulePage />} /><Route path="customers" element={<ModulePage />} /><Route path="analytics" element={<ModulePage />} /><Route path="team" element={<ModulePage />} /><Route path="activity" element={<ModulePage />} /><Route path="settings" element={<ModulePage />} /><Route path="*" element={<ModulePage />} /></Route></Routes>;
}

createRoot(document.getElementById('root')!).render(<StrictMode><ThemeProvider theme={theme}><CssBaseline /><QueryClientProvider client={queryClient}><BrowserRouter><AuthProvider><App /></AuthProvider></BrowserRouter></QueryClientProvider></ThemeProvider></StrictMode>);
