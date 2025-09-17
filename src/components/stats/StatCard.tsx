import React from 'react';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'up' | 'down';
  period: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType, period }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 w-[236px] h-[136px] flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900">{title}</span>
          <button className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer" title="More info">
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        <div className="flex items-center gap-1">
          {changeType === 'up' ? (
            <TrendingUp className="w-4 h-4 font-bold text-green-600" />
          ) : (
            <TrendingDown className="w-4 h-4 font-bold text-red-600" />
          )}
          <span className={`text-sm font-bold ${changeType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </span>
        </div>
      </div>
      
      <div className="text-sm text-gray-500">{period}</div>
    </div>
  );
};

export default StatCard;
