"use client"

import React from 'react';
import { Plus } from 'lucide-react';

interface SidebarFooterProps {
  onBulkImport?: () => void;
  onBack: () => void;
  onSubmit: () => void;
  submitLabel?: string;
  isLoading?: boolean;
  submitVariant?: 'primary' | 'destructive';
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  onBulkImport,
  onBack,
  onSubmit,
  submitLabel = "Continue to Next",
  isLoading = false,
  submitVariant = 'primary'
}) => {
  return (
    <div className="flex items-center justify-between p-6 border-t border-slate-200 bg-slate-50 mt-auto">
      {onBulkImport && (
        <button
          onClick={onBulkImport}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Bulk Import Employees
        </button>
      )}

      <div className={`flex items-center gap-4 ${onBulkImport ? '' : 'ml-auto'}`}>
        <button
          onClick={onBack}
          className="px-3 py-2 text-sm font-medium text-slate-900 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className={`px-3 py-2 text-sm font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            submitVariant === 'destructive'
              ? 'text-white bg-red-600 hover:bg-red-700'
              : 'text-white bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isLoading ? 'Processing...' : submitLabel}
        </button>
      </div>
    </div>
  );
};
