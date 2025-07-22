import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { auth } from '../../../config/firebase';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
      toast.success('Login realizado com sucesso!');
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        if (err.code === 'auth/user-not-found') {
          setError('Usuário não encontrado');
        } else if (err.code === 'auth/wrong-password') {
          setError('Senha incorreta');
        } else {
          setError('Erro ao fazer login. Tente novamente.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    login,
  };
}
