import { TrendingUp, RotateCcw, Download } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  onExport: () => void;
}

export default function Header({ onReset, onExport }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-lg">
          <TrendingUp className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Product Pricing Simulator
          </h1>
          <p className="text-gray-500 text-xs">Model your SaaS revenue and break-even point</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-3 py-2 text-xs text-gray-400 hover:text-white bg-[#111113] hover:bg-[#1a1a1d] border border-[#1a1a1d] rounded-lg transition-colors"
        >
          <Download className="w-3 h-3" />
          Export PDF
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-3 py-2 text-xs text-gray-400 hover:text-white bg-[#111113] hover:bg-[#1a1a1d] border border-[#1a1a1d] rounded-lg transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>
    </div>
  );
}