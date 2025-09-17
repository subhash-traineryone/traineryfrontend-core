"use client"

import React from 'react';
import { User, Trophy, FileText, Settings, MessageSquare } from 'lucide-react';

interface SubNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface EmployeeSubNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const subNavItems: SubNavItem[] = [
  {
    id: 'profile',
    label: 'Profile',
    icon: <User className="w-5 h-5" />
  },
  {
    id: 'performance',
    label: 'Performance',
    icon: <Trophy className="w-5 h-5" />
  },
  {
    id: 'documents',
    label: 'Documents',
    icon: <FileText className="w-5 h-5" />
  },
  {
    id: 'admin',
    label: 'Admin',
    icon: <Settings className="w-5 h-5" />
  },
  {
    id: 'updates',
    label: 'Updates',
    icon: <MessageSquare className="w-5 h-5" />
  }
];

export const EmployeeSubNavigation: React.FC<EmployeeSubNavigationProps> = ({
  activeSection,
  onSectionChange
}) => {
  return (
    <div className="w-20 bg-white border-l border-slate-200 flex flex-col items-center justify-center px-4 gap-6 h-full">
      {/* Navigation Items */}
      {subNavItems.map((item) => (
        <div key={item.id} className="flex flex-col items-center gap-1">
          <button
            onClick={() => onSectionChange(item.id)}
            className={`p-2 rounded transition-colors ${
              activeSection === item.id
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            {item.icon}
          </button>
          <span className={`text-xs text-center leading-tight ${
            activeSection === item.id 
              ? 'text-slate-900 font-medium' 
              : 'text-slate-500 font-normal'
          }`}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
