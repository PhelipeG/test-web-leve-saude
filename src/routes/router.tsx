import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import { PageLoader } from '@/shared/components/PageLoader';
import { PrivateRoute } from '@/shared/components/PrivateRoute';
import { AuthProvider } from '@/shared/contexts/AuthContext';

const LoginPage = lazy(() =>
  import('@/features/auth/pages/login').then(m => ({ default: m.LoginPage })),
);
const DashboardPage = lazy(() =>
  import('@/features/feedbacks/pages/dashboard').then(m => ({ default: m.DashboardPage })),
);

export const Router = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  </ErrorBoundary>
);
