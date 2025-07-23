import { useEffect, useState } from 'react';

import { getAllFeedbacks, type OrderBy, type OrderDirection } from '../services/feedbackService';
import type { Feedback } from '../types/feedback';
import type { RatingCount } from '../types/ratingCount';

export const useFeedbacks = (
  orderBy: OrderBy = 'createdAt',
  orderDirection: OrderDirection = 'desc',
  searchTerm: string = '',
) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [ratingsCount, setRatingsCount] = useState<RatingCount[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await getAllFeedbacks(orderBy, orderDirection);
        setFeedbacks(data);
        const count = [1, 2, 3, 4, 5].map(rating => ({
          rating,
          count: data.filter(feedback => feedback.rating === rating).length,
        }));
        setRatingsCount(count);
      } catch (error) {
        console.error('Erro ao buscar feedbacks:', error);
        setError('Erro ao buscar feedbacks. Tente novamente mais tarde.');
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

  return { feedbacks: filteredFeedbacks, loading, error, ratingsCount };
};
