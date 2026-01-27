import { ArrowRight, TrendingUp, Users, Repeat } from 'lucide-react';
import Card from './ui/Card';
import Input from './ui/Input';

interface PricingTier {
  id: string;
  name: string;
  price: number;
  color: string;
  conversionRate: number;
}

interface GrowthSettingsProps {
  sortedTiers: PricingTier[];
  tiers: PricingTier[];
  users: Record<string, number>;
  growthRate: number;
  onTiersChange: (tiers: PricingTier[]) => void;
  onUsersChange: (users: Record<string, number>) => void;
  onGrowthRateChange: (rate: number) => void;
}

export default function GrowthSettings({
  sortedTiers,
  tiers,
  users,
  growthRate,
  onTiersChange,
  onUsersChange,
  onGrowthRateChange
}: GrowthSettingsProps) {
  const updateConversionRate = (id: string, rate: number) => {
    onTiersChange(tiers.map(t => t.id === id ? { ...t, conversionRate: rate } : t));
  };

  const totalInitialUsers = Object.values(users).reduce((s, u) => s + u, 0);

  return (
    <Card className="mb-5">
      <h3 className="text-sm font-semibold flex items-center gap-2 mb-5">
        <span className="w-2 h-2 rounded-full bg-green-400"></span>
        Growth Model
      </h3>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Starting Point */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-purple-400" />
            <h4 className="text-sm text-white font-medium">Starting Point</h4>
            <span className="text-xs text-gray-500 ml-auto">{totalInitialUsers} total users</span>
          </div>
          
          <div className="bg-[#0a0a0b] rounded-lg p-4 space-y-3">
            <p className="text-xs text-gray-500 mb-3">How many users do you have at launch?</p>
            {sortedTiers.map(t => (
              <div key={t.id} className="flex items-center gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }}></span>
                  <span className="text-sm text-gray-300">{t.name}</span>
                  {t.price === 0 && <span className="text-xs text-gray-600">(free)</span>}
                  {t.price > 0 && <span className="text-xs text-gray-600">(${t.price}/mo)</span>}
                </div>
                <Input
                  type="number"
                  value={users[t.id] || ''}
                  onChange={e => onUsersChange({ ...users, [t.id]: +e.target.value })}
                  className="w-24 text-center"
                  placeholder="0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Growth Dynamics */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <h4 className="text-sm text-white font-medium">Monthly Growth</h4>
          </div>

          <div className="space-y-4">
            {/* Organic Growth */}
            <div className="bg-[#0a0a0b] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300"> Initial (free) user acquisition</span>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={growthRate}
                    onChange={e => onGrowthRateChange(+e.target.value)}
                    className="w-20 text-center"
                  />
                  <span className="text-gray-500 text-sm">%</span>
                </div>
              </div>
              <p className="text-xs text-gray-600">Initial tier grows by this % every month</p>
            </div>

            {/* Upgrade Funnel */}
            <div className="bg-[#0a0a0b] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Repeat className="w-3 h-3 text-cyan-400" />
                <span className="text-sm text-gray-300">Upgrade rates</span>
              </div>
              <p className="text-xs text-gray-600 mb-3">% of users upgrading to next tier each month</p>
              
              <div className="space-y-2">
                {sortedTiers.map((t, idx) => {
                  if (idx === 0) return null;
                  const prevTier = sortedTiers[idx - 1];
                  return (
                    <div key={t.id} className="flex items-center gap-2 py-1">
                      <div className="flex items-center gap-1 flex-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: prevTier.color }}></span>
                        <span className="text-xs text-gray-400">{prevTier.name}</span>
                        <ArrowRight className="w-3 h-3 text-gray-600 mx-1" />
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }}></span>
                        <span className="text-xs text-gray-400">{t.name}</span>
                      </div>
                      <Input
                        type="number"
                        value={t.conversionRate || ''}
                        onChange={e => updateConversionRate(t.id, +e.target.value)}
                        className="w-16 text-center text-xs"
                        placeholder="0"
                      />
                      <span className="text-gray-500 text-xs">%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Summary */}
      <div className="mt-6 pt-4 border-t border-[#1a1a1d]">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <span>Each month:</span>
          <span className="text-green-400">+{growthRate}% new users</span>
          <span>+</span>
          <span className="text-cyan-400">upgrades between tiers</span>
          <span>=</span>
          <span className="text-white">compounding growth</span>
        </div>
      </div>
    </Card>
  );
}