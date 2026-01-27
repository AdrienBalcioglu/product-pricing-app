import type { Cost, PricingTier, MonthlyProjection } from '../types';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const calcProjections = (
  fixedCosts: Cost[],
  variableCosts: Cost[],
  tiers: PricingTier[],
  initialUsers: Record<string, number>,
  config: { months: number; growthRate: number }
): MonthlyProjection[] => {
  const totalFixed = fixedCosts.reduce((s, c) => s + c.amount, 0);
  const totalVarPerUser = variableCosts.reduce((s, c) => s + c.amount, 0);
  let cumProfit = 0;
  let prevUsers = { ...initialUsers };

  return Array.from({ length: config.months }, (_, i) => {
    const users: Record<string, number> = {};
    let totalUsers = 0;
    let revenue = 0;

    if (i === 0) {
      tiers.forEach(t => {
        users[t.id] = initialUsers[t.id] || 0;
        totalUsers += users[t.id];
        revenue += users[t.id] * t.price;
      });
    } else {
      tiers.forEach((t, tierIdx) => {
        let baseUsers = Math.round(prevUsers[t.id] * (1 + config.growthRate / 100));
        
        if (tierIdx > 0) {
          const prevTier = tiers[tierIdx - 1];
          baseUsers += Math.round(prevUsers[prevTier.id] * (t.conversionRate / 100));
        }
        
        if (tierIdx < tiers.length - 1) {
          const nextTier = tiers[tierIdx + 1];
          baseUsers = Math.max(0, baseUsers - Math.round(prevUsers[t.id] * (nextTier.conversionRate / 100)));
        }
        
        users[t.id] = baseUsers;
        totalUsers += baseUsers;
        revenue += baseUsers * t.price;
      });
    }

    prevUsers = { ...users };
    const totalCosts = totalUsers * totalVarPerUser + totalFixed;
    const profit = revenue - totalCosts;
    cumProfit += profit;

    return {
      month: MONTH_NAMES[i % 12],
      monthIndex: i + 1,
      users,
      revenue,
      totalCosts,
      netProfit: profit,
      margin: revenue > 0 ? profit / revenue : 0,
      cumulativeProfit: cumProfit
    };
  });
};

export const findBreakEvenDays = (projections: MonthlyProjection[]): number | null => {
  const idx = projections.findIndex(x => x.cumulativeProfit >= 0);
  
  if (idx < 0) return null;
  if (idx === 0) return projections[0].cumulativeProfit >= 0 ? 1 : null;
  
  const prev = projections[idx - 1];
  const curr = projections[idx];
  const ratio = Math.abs(prev.cumulativeProfit) / (Math.abs(prev.cumulativeProfit) + curr.cumulativeProfit);
  
  return Math.round((idx + ratio) * 30);
};