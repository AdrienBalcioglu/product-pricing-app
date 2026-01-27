export interface Cost {
  id: string;
  name: string;
  amount: number;
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  color: string;
  conversionRate: number;
}

export interface MonthlyProjection {
  month: string;
  monthIndex: number;
  users: Record<string, number>;
  revenue: number;
  totalCosts: number;
  netProfit: number;
  margin: number;
  cumulativeProfit: number;
}

export interface AppState {
  fixedCosts: Cost[];
  variableCosts: Cost[];
  tiers: PricingTier[];
  users: Record<string, number>;
  growthRate: number;
  months: number;
}