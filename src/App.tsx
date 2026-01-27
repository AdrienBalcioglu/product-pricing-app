import { useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { defaultData } from './data/defaults';
import { calcProjections, findBreakEvenDays } from './utils/calculations';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import CostsSection from './components/CostsSection';
import PricingTiers from './components/PricingTiers';
import GrowthSettings from './components/GrowthSettings';
import RevenueChart from './components/RevenueChart';
import BreakdownTable from './components/BreakdownTable';

interface Cost {
  id: string;
  name: string;
  amount: number;
}

interface PricingTier {
  id: string;
  name: string;
  price: number;
  color: string;
  conversionRate: number;
}

interface AppState {
  fixedCosts: Cost[];
  variableCosts: Cost[];
  tiers: PricingTier[];
  users: Record<string, number>;
  growthRate: number;
  months: number;
}

const STORAGE_KEY = 'pricing-simulator-data';

export default function App() {
  const [state, setState] = useLocalStorage<AppState>(STORAGE_KEY, defaultData);

  const { fixedCosts, variableCosts, tiers, users, growthRate, months } = state;

  const sortedTiers = useMemo(() => [...tiers].sort((a, b) => a.price - b.price), [tiers]);

  const projections = useMemo(
    () => calcProjections(fixedCosts, variableCosts, sortedTiers, users, { months, growthRate }),
    [fixedCosts, variableCosts, sortedTiers, users, months, growthRate]
  );

  const breakEvenDays = useMemo(() => findBreakEvenDays(projections), [projections]);

  const updateState = (partial: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...partial }));
  };

  const handleReset = () => setState(defaultData);
  const handleExport = () => window.print();

  const handleAddTier = (id: string) => {
    updateState({ users: { ...users, [id]: 0 } });
  };

  const handleRemoveTier = (id: string) => {
    const newUsers = { ...users };
    delete newUsers[id];
    updateState({ users: newUsers });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <Header onReset={handleReset} onExport={handleExport} />

        <SummaryCards projections={projections} breakEvenDays={breakEvenDays} />

        <div className="grid lg:grid-cols-4 gap-4 mb-5">
          <CostsSection
            fixedCosts={fixedCosts}
            variableCosts={variableCosts}
            onFixedCostsChange={costs => updateState({ fixedCosts: costs })}
            onVariableCostsChange={costs => updateState({ variableCosts: costs })}
          />
          <PricingTiers
            tiers={tiers}
            sortedTiers={sortedTiers}
            onTiersChange={t => updateState({ tiers: t })}
            onAddTier={handleAddTier}
            onRemoveTier={handleRemoveTier}
          />
        </div>

        <GrowthSettings
          sortedTiers={sortedTiers}
          tiers={tiers}
          users={users}
          growthRate={growthRate}
          onTiersChange={t => updateState({ tiers: t })}
          onUsersChange={u => updateState({ users: u })}
          onGrowthRateChange={rate => updateState({ growthRate: rate })}
        />

        <RevenueChart
          projections={projections}
          breakEvenDays={breakEvenDays}
          months={months}
          onMonthsChange={m => updateState({ months: m })}
        />

        <BreakdownTable projections={projections} sortedTiers={sortedTiers} />

        <p className="text-center text-gray-600 text-xs mt-4">
          © 2026 Adrien Balcioglu. https://adrien-balcioglu.pages.dev/ Built with React + TypeScript + Recharts
        </p>
      </div>
    </div>
  );
}