import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';

import { db } from '@/config/firebase';

import type { Feedback } from '../types/feedback';

export type OrderBy = 'createdAt' | 'rating';
export type OrderDirection = 'asc' | 'desc';

export const getAllFeedbacks = async (
  orderByField: OrderBy = 'createdAt',
  orderDirection: OrderDirection = 'desc',
): Promise<Feedback[]> => {
  const feedbacksRef = collection(db, 'feedbacks');
  const q = query(feedbacksRef, orderBy(orderByField, orderDirection));
  const snapshot = await getDocs(q);

  const feedbacks: Feedback[] = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    feedbacks.push({
      id: doc.id,
      userId: data.userId,
      userName: data.userName,
      rating: data.rating,
      comment: data.comment || data['comment  '] || '',
      createdAt:
        data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(data.createdAt),
    });
  });

  return feedbacks;
};
