export const formatDate = (date: string | Date): string => {
  if (typeof date === 'string') {
    return date;
  }
  return date.toLocaleDateString('pt-BR');
};
