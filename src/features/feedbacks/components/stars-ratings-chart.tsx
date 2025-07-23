import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { PageLoader } from '../../../shared/components/PageLoader';
import { useFeedbacks } from '../hooks/useFeedback';

export const StarsRatingsChart = () => {
  const { ratingsCount, loading, error } = useFeedbacks();

  if (loading) {
    return <PageLoader />;
  }
  if (error) return <p>{error}</p>;

  const chartData = ratingsCount.map(item => ({
    rating: `${item.rating} estrela${item.rating > 1 ? 's' : ''}`,
    count: item.count,
  }));

  return (
    <div className="w-full h-64">
      <h2 className="text-lg font-semibold mb-4">Distribuição de Avaliações</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="rating" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#fea227" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
