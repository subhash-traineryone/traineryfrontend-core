"use client"

import React from 'react';
import { useNavigate } from 'react-router-dom';

interface WorkforceHeaderProps {
  viewMode: 'chart' | 'list' | 'board';
  onViewModeChange: (mode: 'chart' | 'list' | 'board') => void;
}

export const WorkforceHeader: React.FC<WorkforceHeaderProps> = ({
  viewMode,
  onViewModeChange
}) => {
  const navigate = useNavigate();
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Workforce</h1>
      
      {/* Tabs and View Toggle */}
      <div className="flex items-center justify-between mb-8">
        {/* Left Side - Tabs */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate('/workforce')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-3.5 h-3.5 bg-gray-300 rounded"></div>
            <span className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Overview</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 bg-gray-300 rounded"></div>
            <span className="text-sm font-medium text-gray-900 border-b-2 border-gray-900 pb-1">People</span>
          </div>
        </div>
        
        {/* Right Side - View Toggle Buttons */}
        <div className="bg-gray-200 p-1 rounded-lg flex">
          <button
            onClick={() => onViewModeChange('chart')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'chart'
                ? 'bg-white text-gray-900 shadow-sm font-semibold'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Chart
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'list'
                ? 'bg-white text-gray-900 shadow-sm font-semibold'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            List
          </button>
          <button
            onClick={() => onViewModeChange('board')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'board'
                ? 'bg-white text-gray-900 shadow-sm font-semibold'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Board
          </button>
        </div>
      </div>
    </div>
  );
};
