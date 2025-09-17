"use client"

import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Check, AlertTriangle } from 'lucide-react';

interface Tab {
  id: number;
  label: string;
  hasError: boolean;
  isCompleted: boolean;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: number;
  onTabChange: (tabId: number) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange
}) => {
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const buttonRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});

  const handleMouseEnter = (tabId: number, event: React.MouseEvent<HTMLButtonElement>) => {
    setHoveredTab(tabId);
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 8
    });
  };

  const handleMouseLeave = () => {
    setHoveredTab(null);
  };

  const TooltipPortal = () => {
    if (hoveredTab === null || typeof window === 'undefined') return null;

    const tab = tabs.find(t => t.id === hoveredTab);
    if (!tab) return null;

    return createPortal(
      <div 
        className="fixed px-3 py-1.5 bg-white border border-slate-200 rounded-[6px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] text-xs text-slate-950 max-w-64 leading-tight z-[99999] pointer-events-none"
        style={{
          left: tooltipPosition.x,
          top: tooltipPosition.y,
          transform: 'translateX(-50%) translateY(-100%)'
        }}
      >
        {tab.isCompleted 
          ? "All the mandatory fields here have been filled" 
          : "Please fill all the mandatory fields here to add this employee"
        }
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <div className="flex border-b border-slate-200 mb-6">
        {tabs.map((tab) => (
          <div key={tab.id} className="relative group flex-1">
            <button
              ref={(el) => { buttonRefs.current[tab.id] = el; }}
              onClick={() => onTabChange(tab.id)}
              onMouseEnter={(e) => handleMouseEnter(tab.id, e)}
              onMouseLeave={handleMouseLeave}
              className={`w-full px-6 py-4 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
              {tab.isCompleted ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              )}
            </button>
          </div>
        ))}
      </div>
      <TooltipPortal />
    </>
  );
};
