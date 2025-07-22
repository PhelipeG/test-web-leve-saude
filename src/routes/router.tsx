import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { LoginPage } from '@/features/auth/pages/login';
import { DashboardPage } from '@/features/feedbacks/pages/dashboard';
import { PrivateRoute } from '@/shared/components/PrivateRoute';
import { AuthProvider } from '@/shared/contexts/AuthContext';

export const Router = () => (
  <BrowserRouter>
    <AuthProvider>
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
      <ToastContainer />
    </AuthProvider>
  </BrowserRouter>
);
