"use client"

import React, { useState } from 'react';
import { X, Search, MoreHorizontal, ChevronDown } from 'lucide-react';

interface ImportHistoryEntry {
  id: string;
  userId: string;
  status: 'Completed' | 'Failed';
  total: number;
  importSuccess: number;
  importError: number;
  date: string;
  time: string;
}

interface EmployeeImportHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock data for import history
const mockImportHistory: ImportHistoryEntry[] = [
  {
    id: '1',
    userId: 'USR00010746',
    status: 'Completed',
    total: 176,
    importSuccess: 176,
    importError: 0,
    date: '02-Sep-2025',
    time: '10:06:28 PM'
  },
  {
    id: '2',
    userId: 'USR00010123',
    status: 'Failed',
    total: 12,
    importSuccess: 1,
    importError: 11,
    date: '23-Aug-2025',
    time: '10:06:28 AM'
  },
  {
    id: '3',
    userId: 'USR00010234',
    status: 'Completed',
    total: 23,
    importSuccess: 23,
    importError: 0,
    date: '13-Aug-2025',
    time: '10:06:28 AM'
  },
  {
    id: '4',
    userId: 'USR00010345',
    status: 'Completed',
    total: 45,
    importSuccess: 45,
    importError: 0,
    date: '08-Aug-2025',
    time: '10:06:28 PM'
  },
  {
    id: '5',
    userId: 'USR00010456',
    status: 'Failed',
    total: 45,
    importSuccess: 45,
    importError: 0,
    date: '08-Aug-2025',
    time: '10:06:28 PM'
  },
  {
    id: '6',
    userId: 'USR00010678',
    status: 'Completed',
    total: 45,
    importSuccess: 45,
    importError: 0,
    date: '08-Aug-2025',
    time: '10:06:28 PM'
  }
];

export const EmployeeImportHistoryModal: React.FC<EmployeeImportHistoryModalProps> = ({
  isOpen,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const filteredHistory = mockImportHistory.filter(entry =>
    entry.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const getStatusColor = (status: string) => {
    return status === 'Completed' 
      ? 'bg-[#e2f5ff] text-[#1886fe]' 
      : 'bg-[rgba(28,28,28,0.1)] text-[#1c1c1c]';
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-950">
              Employees Import History
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-md transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {/* Search */}
            <div className="mb-6">
              <div className="relative max-w-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Import History List */}
            <div className="space-y-0">
              {filteredHistory.map((entry) => (
                <div key={entry.id} className="border-b border-slate-200 last:border-b-0">
                  <div className="py-4">
                    <div className="flex items-center justify-between">
                      {/* Left Section - User ID and Status */}
                      <div className="flex items-center gap-4">
                        <span className="text-base font-medium text-slate-950">
                          {entry.userId}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(entry.status)}`}>
                          {entry.status}
                        </span>
                      </div>

                      {/* Middle Section - Statistics */}
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span>Total: {entry.total}</span>
                        <span>Import Success: {entry.importSuccess}</span>
                        <span>Import Error: {entry.importError}</span>
                      </div>

                      {/* Right Section - Date, Actions, and Expand */}
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-950">
                          {entry.date} . {entry.time}
                        </span>
                        <button className="p-1 hover:bg-slate-100 rounded">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => toggleExpanded(entry.id)}
                          className="p-1 hover:bg-slate-100 rounded"
                        >
                          <ChevronDown 
                            className={`w-4 h-4 transition-transform ${
                              expandedItems.has(entry.id) ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {expandedItems.has(entry.id) && (
                      <div className="mt-4 p-4 bg-slate-50 rounded-md">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-slate-700 mb-2">Import Details</h4>
                            <div className="space-y-1 text-sm text-slate-600">
                              <p>Total Records: {entry.total}</p>
                              <p>Successful: {entry.importSuccess}</p>
                              <p>Failed: {entry.importError}</p>
                              <p>Success Rate: {((entry.importSuccess / entry.total) * 100).toFixed(1)}%</p>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-slate-700 mb-2">Timing</h4>
                            <div className="space-y-1 text-sm text-slate-600">
                              <p>Date: {entry.date}</p>
                              <p>Time: {entry.time}</p>
                              <p>Duration: ~2.5 minutes</p>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-slate-700 mb-2">Actions</h4>
                            <div className="space-y-2">
                              <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded">
                                Download Report
                              </button>
                              <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded">
                                View Errors
                              </button>
                              {entry.status === 'Failed' && (
                                <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded">
                                  Retry Import
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredHistory.length === 0 && (
              <div className="text-center py-12">
                <div className="text-slate-400 mb-2">No import history found</div>
                <div className="text-sm text-slate-500">
                  {searchTerm ? 'Try adjusting your search terms' : 'No imports have been performed yet'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeImportHistoryModal;
