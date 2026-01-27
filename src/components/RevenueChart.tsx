import { Target } from 'lucide-react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import Card from './ui/Card';
import Input from './ui/Input';
import { formatCurrency } from '../utils/formatters';

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

interface RevenueChartProps {
  projections: MonthlyProjection[];
  breakEvenDays: number | null;
  months: number;
  onMonthsChange: (months: number) => void;
}

export default function RevenueChart({
  projections,
  breakEvenDays,
  months,
  onMonthsChange
}: RevenueChartProps) {
  const chartData = projections.map(p => ({
    month: p.month,
    costs: p.totalCosts,
    profit: p.netProfit,
    cumulative: p.cumulativeProfit
  }));

  return (
    <Card className="mb-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          Revenue & Profit Projection
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Projection:</span>
          <Input
            type="number"
            value={months}
            onChange={e => onMonthsChange(+e.target.value)}
            min={1}
            max={36}
            className="w-16 text-xs py-1"
          />
          <span className="text-xs text-gray-500">months</span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1d" />
            <XAxis dataKey="month" stroke="#6b7280" fontSize={11} />
            <YAxis stroke="#6b7280" fontSize={11} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ background: '#111113', border: '1px solid #1a1a1d', borderRadius: '8px', fontSize: '12px' }}
              formatter={(value) => (typeof value === 'number' ? formatCurrency(value) : '')}
            />
            <Legend wrapperStyle={{ fontSize: '11px' }} />
            <ReferenceLine y={0} stroke="#374151" />
            <Bar dataKey="costs" name="Total Costs" fill="#3b82f6" opacity={0.7} radius={[2, 2, 0, 0]} />
            <Bar dataKey="profit" name="Net Profit" fill="#f472b6" radius={[2, 2, 0, 0]} />
            <Line type="monotone" dataKey="cumulative" name="Cumulative" stroke="#22d3ee" strokeWidth={2} dot={{ fill: '#22d3ee', r: 3 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {breakEvenDays && (
        <div className="mt-3 p-2 bg-green-400/10 border border-green-400/30 rounded-lg text-green-400 text-xs flex items-center gap-2">
          <Target className="w-4 h-4" />
          Break-even reached at <strong>{breakEvenDays} days</strong> (~{Math.ceil(breakEvenDays / 30)} months)
        </div>
      )}
    </Card>
  );
}