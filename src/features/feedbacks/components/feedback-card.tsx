import { useMemo } from 'react';

import { formatDate } from '@/shared/utils/formatDate';

interface FeedbackCardProps {
  userName: string;
  rating: number;
  comment: string;
  createdAt: string | Date;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({
  userName,
  rating,
  comment,
  createdAt,
}) => {
  const renderStars = useMemo(() => {
    return (rating: number) => {
      return Array.from({ length: rating }, (_, index) => (
        <span key={index} className={index < rating ? 'text-yellow-500' : 'text-gray-300'}>
          ⭐
        </span>
      ));
    };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h2 className="font-semibold text-lg text-gray-800">{userName}</h2>
        <p className="text-sm text-gray-500">{formatDate(createdAt)}</p>
      </div>
      <div className="flex items-center gap-1 mb-3">
        {renderStars(rating)}
        <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
      </div>
      <p className="text-gray-700 leading-relaxed">{comment}</p>
    </div>
  );
};
