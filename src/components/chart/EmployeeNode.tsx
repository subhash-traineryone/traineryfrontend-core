"use client"

import React from 'react';
import { Handle, Position } from 'reactflow';
import { ChevronDown } from 'lucide-react';

export interface EmployeeNodeData {
  id: string;
  name: string;
  title: string;
  teamCount: number;
  initial: string;
  isSelected?: boolean;
  isExpanded?: boolean;
  onToggleExpand?: (nodeId: string) => void;
  nodeId: string;
}

interface EmployeeNodeProps {
  data: EmployeeNodeData;
}

export const EmployeeNode: React.FC<EmployeeNodeProps> = ({ data }) => {
  const handleToggleExpand = () => {
    if (data.onToggleExpand && data.teamCount > 0) {
      data.onToggleExpand(data.nodeId);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm relative" style={{ width: '241px', height: '104px' }}>
      {/* Connection Handles */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{ background: '#D1D5DB', width: 8, height: 8 }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        style={{ background: '#D1D5DB', width: 8, height: 8 }}
      />
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-700">{data.initial}</span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">{data.name}</h3>
            <p className="text-xs text-gray-500">{data.title}</p>
          </div>
        </div>
        <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center">
          {data.isSelected && (
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          {data.teamCount} {data.teamCount === 1 ? 'Person' : 'People'}
        </span>
        <button
          onClick={handleToggleExpand}
          disabled={data.teamCount === 0}
          className={`transition-transform duration-200 ${
            data.teamCount === 0 
              ? 'opacity-30 cursor-not-allowed' 
              : 'hover:bg-gray-100 rounded p-1 cursor-pointer'
          }`}
        >
          <ChevronDown 
            className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${
              data.isExpanded ? 'rotate-180' : ''
            }`} 
          />
        </button>
      </div>
    </div>
  );
};
