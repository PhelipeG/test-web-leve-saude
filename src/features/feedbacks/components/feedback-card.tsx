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
        <span key={index} className="text-yellow-500">
          ⭐
        </span>
      ));
    };
  }, []);

  return (
    <div className="w-full max-w-full bg-white rounded-xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow break-words">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
        <h2 className="font-semibold text-base text-gray-800 break-words">{userName}</h2>
        <p className="text-sm text-gray-500">{formatDate(createdAt)}</p>
      </div>
      <div className="flex items-center flex-wrap gap-1 mb-3">
        {renderStars(rating)}
        <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
      </div>
      <p className="text-gray-700 leading-relaxed break-words text-sm">{comment}</p>
    </div>
  );
};
