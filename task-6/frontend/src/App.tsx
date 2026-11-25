import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/pages/Dashboard';
import UsersPage from '@/pages/Users';
import AddUser from '@/pages/AddUser';
import UserDetails from '@/pages/UserDetails';
import EditUser from '@/pages/EditUser';
import { CheckCircle2, Heart } from 'lucide-react';

/**
 * ToastManager Component
 * Automatically displays success banners passed via React Router navigation state.
 */
const ToastManager: React.FC = () => {
  const location = useLocation();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.message) {
      setToastMessage(location.state.message);
      // Clear history state so toast doesn't persist on subsequent refreshes
      window.history.replaceState({}, document.title);

      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  if (!toastMessage) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-emerald-600 text-white font-semibold text-sm shadow-xl shadow-emerald-600/30 animate-in fade-in slide-in-from-top-4">
      <CheckCircle2 className="h-5 w-5 shrink-0" />
      <span>{toastMessage}</span>
    </div>
  );
};

/**
 * Main Layout & App Routes
 */
const AppContent: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
      <ToastManager />

      {/* Top Navbar */}
      <Navbar onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

      <div className="flex flex-1 relative">
        {/* Desktop Sidebar & Mobile Off-Canvas Drawer */}
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full transition-all">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/new" element={<AddUser />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/users/:id/edit" element={<EditUser />} />
            {/* Catch-all redirect to Dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* Footer */}
          <footer className="mt-16 pt-6 pb-6 border-t text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-foreground">UserHub v2.0</span>
              <span>— Redesigned with shadcn/ui & Tailwind CSS</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                Built with <Heart className="h-3 w-3 text-destructive fill-destructive inline" /> React + TypeScript + Prisma + PostgreSQL
              </span>
              <span>•</span>
              <span className="font-mono text-[11px]">REST API v1.0</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
