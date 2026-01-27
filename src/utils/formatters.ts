export const formatCurrency = (value: number): string => {
  return '$' + Math.round(value).toLocaleString();
};

export const formatPercent = (value: number): string => {
  return (value * 100).toFixed(1) + '%';
};