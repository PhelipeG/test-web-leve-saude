import { useEffect, useState } from 'react';

import { getAllFeedbacks, type OrderBy, type OrderDirection } from '../services/feedbackService';
import type { Feedback } from '../types/feedback';

export const useFeedbacks = (
  orderBy: OrderBy = 'createdAt',
  orderDirection: OrderDirection = 'desc',
  searchTerm: string = ''
) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await getAllFeedbacks(orderBy, orderDirection);
        setFeedbacks(data);
      } catch (error) {
        console.error('Erro ao buscar feedbacks:', error);
        setFeedbacks([]);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [orderBy, orderDirection]);

  const filteredFeedbacks = feedbacks.filter(feedback => {
    if (!searchTerm) return true;

    const search = searchTerm.toLowerCase();
    return (
      feedback.userName.toLowerCase().includes(search) ||
      feedback.comment.toLowerCase().includes(search)
    );
  });

  return { feedbacks: filteredFeedbacks, loading };
};
