import { Plus, Trash2 } from 'lucide-react';
import Card from './ui/Card';
import Input from './ui/Input';
import { formatCurrency } from '../utils/formatters';

interface Cost {
  id: string;
  name: string;
  amount: number;
}

interface CostsSectionProps {
  fixedCosts: Cost[];
  variableCosts: Cost[];
  onFixedCostsChange: (costs: Cost[]) => void;
  onVariableCostsChange: (costs: Cost[]) => void;
}

export default function CostsSection({
  fixedCosts,
  variableCosts,
  onFixedCostsChange,
  onVariableCostsChange
}: CostsSectionProps) {
  const addFixedCost = () => {
    onFixedCostsChange([...fixedCosts, { id: Date.now().toString(), name: '', amount: 0 }]);
  };

  const updateFixedCost = (id: string, field: keyof Cost, value: string | number) => {
    onFixedCostsChange(fixedCosts.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const removeFixedCost = (id: string) => {
    onFixedCostsChange(fixedCosts.filter(c => c.id !== id));
  };

  const addVariableCost = () => {
    onVariableCostsChange([...variableCosts, { id: Date.now().toString(), name: '', amount: 0 }]);
  };

  const updateVariableCost = (id: string, field: keyof Cost, value: string | number) => {
    onVariableCostsChange(variableCosts.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const removeVariableCost = (id: string) => {
    onVariableCostsChange(variableCosts.filter(c => c.id !== id));
  };

  const totalFixed = fixedCosts.reduce((s, c) => s + c.amount, 0);
  const totalVariable = variableCosts.reduce((s, c) => s + c.amount, 0);

  return (
    <>
      <Card>
        <div className="flex justify-between mb-3">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-400"></span>
            Fixed Costs
          </h3>
          <button onClick={addFixedCost} className="text-cyan-400 text-xs hover:text-cyan-300">
            <Plus className="w-3 h-3 inline" /> Add
          </button>
        </div>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {fixedCosts.map(c => (
            <div key={c.id} className="flex gap-1 items-center">
              <Input
                value={c.name}
                onChange={e => updateFixedCost(c.id, 'name', e.target.value)}
                className="flex-1 text-xs py-1.5"
                placeholder="Cost name"
              />
              <Input
                type="number"
                value={c.amount || ''}
                onChange={e => updateFixedCost(c.id, 'amount', +e.target.value)}
                className="w-20 text-xs py-1.5"
              />
              <button onClick={() => removeFixedCost(c.id)} className="text-gray-600 hover:text-red-400 p-1">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-2 border-t border-[#1a1a1d] flex justify-between text-xs">
          <span className="text-gray-500">Total</span>
          <span className="text-orange-400 font-medium">{formatCurrency(totalFixed)}/mo</span>
        </div>
      </Card>

      <Card>
        <div className="flex justify-between mb-3">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            Variable Costs
          </h3>
          <button onClick={addVariableCost} className="text-cyan-400 text-xs hover:text-cyan-300">
            <Plus className="w-3 h-3 inline" /> Add
          </button>
        </div>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {variableCosts.map(c => (
            <div key={c.id} className="flex gap-1 items-center">
              <Input
                value={c.name}
                onChange={e => updateVariableCost(c.id, 'name', e.target.value)}
                className="flex-1 text-xs py-1.5"
                placeholder="Cost name"
              />
              <Input
                type="number"
                step="0.1"
                value={c.amount || ''}
                onChange={e => updateVariableCost(c.id, 'amount', +e.target.value)}
                className="w-20 text-xs py-1.5"
              />
              <button onClick={() => removeVariableCost(c.id)} className="text-gray-600 hover:text-red-400 p-1">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-2 border-t border-[#1a1a1d] flex justify-between text-xs">
          <span className="text-gray-500">Per user</span>
          <span className="text-blue-400 font-medium">${totalVariable.toFixed(2)}/mo</span>
        </div>
      </Card>
    </>
  );
}