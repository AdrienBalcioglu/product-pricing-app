import Card from './ui/Card';
import { formatCurrency, formatPercent } from '../utils/formatters';

interface PricingTier {
  id: string;
  name: string;
  price: number;
  color: string;
  conversionRate: number;
}

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

interface BreakdownTableProps {
  projections: MonthlyProjection[];
  sortedTiers: PricingTier[];
}

export default function BreakdownTable({ projections, sortedTiers }: BreakdownTableProps) {
  const totalRev = projections.reduce((s, p) => s + p.revenue, 0);
  const totalCosts = projections.reduce((s, p) => s + p.totalCosts, 0);
  const last = projections[projections.length - 1];

  return (
    <Card>
      <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-pink-400"></span>
        Monthly Breakdown
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#1a1a1d]">
              <th className="text-left py-2 text-gray-500 font-medium">Month</th>
              {sortedTiers.map(t => (
                <th key={t.id} className="text-right py-2 font-medium" style={{ color: t.color }}>{t.name}</th>
              ))}
              <th className="text-right py-2 text-cyan-400 font-medium">Revenue</th>
              <th className="text-right py-2 text-blue-400 font-medium">Costs</th>
              <th className="text-right py-2 text-pink-400 font-medium">Profit</th>
              <th className="text-right py-2 text-gray-400 font-medium">Margin</th>
              <th className="text-right py-2 text-cyan-300 font-medium">Cumulative</th>
            </tr>
          </thead>
          <tbody>
            {projections.map((p, i) => {
              const isBreakEven = p.cumulativeProfit >= 0 && (i === 0 || projections[i - 1].cumulativeProfit < 0);
              return (
                <tr key={i} className={`border-b border-[#1a1a1d]/50 hover:bg-[#111113]/50 ${isBreakEven ? 'bg-green-400/10' : ''}`}>
                  <td className="py-2 text-gray-400">{p.month}</td>
                  {sortedTiers.map(t => (
                    <td key={t.id} className="text-right py-2 text-gray-500">{(p.users[t.id] || 0).toLocaleString()}</td>
                  ))}
                  <td className="text-right py-2 text-cyan-400">{formatCurrency(p.revenue)}</td>
                  <td className="text-right py-2 text-blue-400">{formatCurrency(p.totalCosts)}</td>
                  <td className={`text-right py-2 font-medium ${p.netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {formatCurrency(p.netProfit)}
                  </td>
                  <td className="text-right py-2 text-gray-500">{formatPercent(p.margin)}</td>
                  <td className={`text-right py-2 font-medium ${p.cumulativeProfit >= 0 ? 'text-cyan-300' : 'text-red-400'}`}>
                    {formatCurrency(p.cumulativeProfit)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-[#111113] font-semibold">
              <td className="py-2 text-white">TOTAL</td>
              {sortedTiers.map(t => (
                <td key={t.id} className="text-right py-2 text-gray-600">—</td>
              ))}
              <td className="text-right py-2 text-cyan-400">{formatCurrency(totalRev)}</td>
              <td className="text-right py-2 text-blue-400">{formatCurrency(totalCosts)}</td>
              <td className={`text-right py-2 ${last?.cumulativeProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatCurrency(last?.cumulativeProfit || 0)}
              </td>
              <td className="text-right py-2 text-gray-600">—</td>
              <td className="text-right py-2 text-gray-600">—</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
  );
}