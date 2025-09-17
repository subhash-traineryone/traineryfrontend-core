"use client"

import React from 'react';
import { X } from 'lucide-react';

interface SidebarHeaderProps {
  title: string;
  onClose: () => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  title,
  onClose
}) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-white">
      <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
      <button
        onClick={onClose}
        className="p-2 hover:bg-slate-100 rounded-md transition-colors"
        aria-label="Close sidebar"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
