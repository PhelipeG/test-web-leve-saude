import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { auth } from '@/config/firebase';
import { useAuth } from '@/shared/contexts/AuthContext';
import { useDebounce } from '@/shared/hooks/useDebounce';

import { FeedbackCard } from '../components/feedback-card';
import { useFeedbacks } from '../hooks/useFeedback';
import { type OrderBy, type OrderDirection } from '../services/feedbackService';

export function DashboardPage() {
  const { user } = useAuth();
  const [orderBy, setOrderBy] = useState<OrderBy>('createdAt');
  const [orderDirection, setOrderDirection] = useState<OrderDirection>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const debounceSearchTerm = useDebounce({ value: searchTerm, delay: 500 });

  const { feedbacks, loading } = useFeedbacks(orderBy, orderDirection, debounceSearchTerm);

  function handleLogout() {
    signOut(auth).then(() => {
      toast.success('Logout realizado com sucesso!');
      navigate('/');
    }).catch(error => {
      toast.error('Erro ao fazer logout. Tente novamente.', error.message);
    });
  }

  const handleSortChange = (value: string) => {
    switch (value) {
      case 'date-recent':
        setOrderBy('createdAt');
        setOrderDirection('desc');
        break;
      case 'date-old':
        setOrderBy('createdAt');
        setOrderDirection('asc');
        break;
      case 'rating-high':
        setOrderBy('rating');
        setOrderDirection('desc');
        break;
      case 'rating-low':
        setOrderBy('rating');
        setOrderDirection('asc');
        break;
    }
  };

  const getCurrentSortValue = () => {
    if (orderBy === 'createdAt' && orderDirection === 'desc') return 'date-recent';
    if (orderBy === 'createdAt' && orderDirection === 'asc') return 'date-old';
    if (orderBy === 'rating' && orderDirection === 'desc') return 'rating-high';
    if (orderBy === 'rating' && orderDirection === 'asc') return 'rating-low';
    return 'date-recent';
  };
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">FeedbackHub Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-2xl hover:bg-red-600 transition"
          >
            Sair
          </button>
        </div>

        <p className="text-gray-600 mb-4">Bem-vindo, {user?.email?.slice(0, 11)} 👋</p>

        {/* Busca */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Buscar:</label>
          <input
            type="text"
            placeholder="Buscar por nome do usuário ou comentário..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Ordenação */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">📊 Ordenar por:</label>
          <select
            value={getCurrentSortValue()}
            onChange={e => handleSortChange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-48"
          >
            <option value="date-recent">📅 Data mais recente</option>
            <option value="date-old">📅 Data mais antiga</option>
            <option value="rating-high">⭐ Nota mais alta (5→1)</option>
            <option value="rating-low">⭐ Nota mais baixa (1→5)</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Carregando feedbacks...</p>
        ) : feedbacks.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum feedback encontrado.</p>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              {feedbacks.length} feedback{feedbacks.length !== 1 ? 's' : ''} encontrado{feedbacks.length !== 1 ? 's' : ''}
            </p>
            <div className="grid gap-4">
              {feedbacks.map(fb => (
                <FeedbackCard key={fb.id} {...fb} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
