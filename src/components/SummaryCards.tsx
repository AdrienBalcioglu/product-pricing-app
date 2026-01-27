import Card from './ui/Card';
import { formatCurrency, formatPercent } from '../utils/formatters';

interface MonthlyProjection {
  month: string;
  monthIndex: number;
  users: Record<string, number>;
  revenue: number;
  totalCosts: number;
  netProfit: number;
  margin: number;
  cumulativeProfit: number;
}

interface SummaryCardsProps {
  projections: MonthlyProjection[];
  breakEvenDays: number | null;
}

export default function SummaryCards({ projections, breakEvenDays }: SummaryCardsProps) {
  const last = projections[projections.length - 1];
  const totalRev = projections.reduce((s, p) => s + p.revenue, 0);
  const totalUsers = last ? Object.values(last.users).reduce((s, u) => s + u, 0) : 0;

  const cards = [
    { title: 'Total 12mo Revenue', value: formatCurrency(totalRev), color: 'text-cyan-400' },
    { title: 'End Users', value: totalUsers.toLocaleString(), color: 'text-purple-400' },
    { title: 'Final Margin', value: formatPercent(last?.margin || 0), color: 'text-green-400' },
    { title: 'Break-Even', value: breakEvenDays ? `${breakEvenDays} days` : 'Not reached', color: breakEvenDays ? 'text-pink-400' : 'text-gray-500' }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
      {cards.map((card, i) => (
        <Card key={i}>
          <p className="text-gray-500 text-xs mb-1">{card.title}</p>
          <p className={`text-lg font-bold ${card.color}`}>{card.value}</p>
        </Card>
      ))}
    </div>
  );
}