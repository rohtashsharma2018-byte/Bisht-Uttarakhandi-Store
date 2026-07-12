import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Toaster } from './components/ui/sonner';

// Lazy loading to prevent circular dependencies in this single file build
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));
const Inventory = React.lazy(() => import('./pages/admin/Inventory'));
const ProfileSettings = React.lazy(() => import('./pages/admin/ProfileSettings'));

export default function App() {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center font-sans text-slate-400 text-xs font-bold uppercase tracking-widest">Loading Bisht Uttarakhandi Store...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <Toaster />
      </div>
    );
  }

  return (
    <>
      <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center font-sans text-slate-400 text-xs font-bold uppercase tracking-widest">Loading Component...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {role === 'blocked' ? (
              <Route path="*" element={<div className="min-h-screen flex items-center justify-center font-sans"><div className="text-center space-y-4"><h1 className="text-2xl font-black text-rose-600">Access Denied</h1><p className="text-sm text-slate-500 max-w-md mx-auto">Your account has been blocked by an administrator. If you believe this is a mistake, please contact support.</p></div></div>} />
            ) : (
              <>
                <Route index element={<Navigate to="/admin" replace />} />
                <Route path="admin" element={<AdminDashboard />} />
                <Route path="admin/inventory" element={<Inventory />} />
                <Route path="admin/settings" element={<ProfileSettings />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </>
            )}
          </Route>
        </Routes>
      </React.Suspense>
      <Toaster />
    </>
  );
}
