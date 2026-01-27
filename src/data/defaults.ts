import type { AppState } from '../types';

export const defaultData: AppState = {
  fixedCosts: [
    { id: '1', name: 'Fixed Cost 1', amount: 800 },
    { id: '2', name: 'Fixed Cost 2', amount: 1500 }
  ],
  variableCosts: [
    { id: '1', name: 'Infra per user', amount: 1.2 },
    { id: '2', name: 'Support per user', amount: 0.8 }
  ],
  tiers: [
    { id: 'free', name: 'Free', price: 0, color: '#22d3ee', conversionRate: 0 },
    { id: 'starter', name: 'Starter', price: 29, color: '#4ade80', conversionRate: 6 },
    { id: 'pro', name: 'Pro', price: 79, color: '#a78bfa', conversionRate: 10 },
    { id: 'enterprise', name: 'Enterprise', price: 199, color: '#f472b6', conversionRate: 4 }
  ],
  users: { free: 100, starter: 0, pro: 0, enterprise: 0 },
  growthRate: 25,
  months: 12
};