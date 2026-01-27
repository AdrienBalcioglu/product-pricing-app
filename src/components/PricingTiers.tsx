import { Plus, Trash2 } from 'lucide-react';
import Card from './ui/Card';
import Input from './ui/Input';

interface PricingTier {
  id: string;
  name: string;
  price: number;
  color: string;
  conversionRate: number;
}

interface PricingTiersProps {
  tiers: PricingTier[];
  sortedTiers: PricingTier[];
  onTiersChange: (tiers: PricingTier[]) => void;
  onAddTier: (id: string) => void;
  onRemoveTier: (id: string) => void;
}

export default function PricingTiers({
  tiers,
  sortedTiers,
  onTiersChange,
  onAddTier,
  onRemoveTier
}: PricingTiersProps) {
  const handleAddTier = () => {
    const id = Date.now().toString();
    onTiersChange([...tiers, { id, name: 'New Tier', price: 0, color: '#fb923c', conversionRate: 5 }]);
    onAddTier(id);
  };

  const updateTier = (id: string, field: keyof PricingTier, value: string | number) => {
    onTiersChange(tiers.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleRemoveTier = (id: string) => {
    onTiersChange(tiers.filter(t => t.id !== id));
    onRemoveTier(id);
  };

  return (
    <Card className="lg:col-span-2">
      <div className="flex justify-between mb-3">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-400"></span>
          Pricing Tiers
        </h3>
        <button onClick={handleAddTier} className="text-cyan-400 text-xs hover:text-cyan-300">
          <Plus className="w-3 h-3 inline" /> Add Tier
        </button>
      </div>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {sortedTiers.map(t => (
          <div
            key={t.id}
            className="flex gap-3 items-center p-2 rounded bg-[#0a0a0b]"
            style={{ borderLeft: `3px solid ${t.color}` }}
          >
            <input
              type="color"
              value={t.color}
              onChange={e => updateTier(t.id, 'color', e.target.value)}
              className="w-5 h-5 rounded bg-transparent cursor-pointer"
            />
            <Input
              value={t.name}
              onChange={e => updateTier(t.id, 'name', e.target.value)}
              className="w-28 text-xs py-1"
              placeholder="Tier name"
            />
            <div className="flex items-center gap-1">
              <span className="text-gray-500 text-xs">$</span>
              <Input
                type="number"
                value={t.price || ''}
                onChange={e => updateTier(t.id, 'price', +e.target.value)}
                className="w-16 text-xs py-1"
                placeholder="0"
              />
              <span className="text-gray-500 text-xs">/mo</span>
            </div>
            {tiers.length > 1 && (
              <button
                onClick={() => handleRemoveTier(t.id)}
                className="text-gray-600 hover:text-red-400 ml-auto"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-600 mt-2">Tiers are automatically sorted by price</p>
    </Card>
  );
}