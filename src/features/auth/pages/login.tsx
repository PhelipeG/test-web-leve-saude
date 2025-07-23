import logo from '@/assets/logo-main.webp';

import { LoginForm } from '../components/login-form';

export function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center max-w-md w-full text-center">
        <img src={logo} alt="Logo" className="w-[200px] h-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">FeedbackHub</h1>
        <p className="text-gray-600 mb-6">Faça login para continuar</p>
        <LoginForm />
      </div>
    </div>
  );
}
