"use client"

import React, { useRef, useEffect } from 'react';
import { Search, Filter, MoreHorizontal, Download, Plus, CheckSquare } from 'lucide-react';

interface WorkforceControlsProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  isSelectAll: boolean;
  onSelectAllChange: (selected: boolean) => void;
  onExport: () => void;
  onAddEmployee: () => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  onSelectAll: () => void;
  onImportHistory: () => void;
}

export const WorkforceControls: React.FC<WorkforceControlsProps> = ({
  searchTerm,
  onSearchChange,
  isSelectAll,
  onSelectAllChange,
  onExport,
  onAddEmployee,
  onExpandAll,
  onCollapseAll,
  onSelectAll,
  onImportHistory
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as HTMLElement)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectAllClick = () => {
    onSelectAllChange(!isSelectAll);
    onSelectAll();
    setIsDropdownOpen(false);
  };

  return (
    <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      {/* Left Side - Search and Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Search Input */}
        <div className="relative">
          <div className="w-full sm:w-[290px] h-9 bg-white rounded-md flex items-center px-3 border border-gray-200">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-transparent text-sm text-gray-900 placeholder-gray-500 outline-none flex-1"
            />
          </div>
        </div>

        {/* Filter Button */}
        <button className="w-9 h-9 bg-white border border-gray-200 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4 text-gray-600" />
        </button>

        {/* More Options */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-9 h-9 bg-white border border-gray-200 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <MoreHorizontal className="w-4 h-4 text-gray-600" />
          </button>
          
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <div className="py-1">
                <button
                  onClick={() => {
                    onExpandAll();
                    setIsDropdownOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between"
                >
                  <span>Expand All</span>
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                </button>
                <button
                  onClick={() => {
                    onCollapseAll();
                    setIsDropdownOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between"
                >
                  <span>Collapse All</span>
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                </button>
                <button
                  onClick={handleSelectAllClick}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  Select All
                </button>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onImportHistory();
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  Employees import history
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
        {/* Select All Checkbox */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectAllChange(!isSelectAll)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center">
              {isSelectAll && <CheckSquare className="w-3 h-3 text-blue-500" />}
            </div>
            Select All
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button 
            onClick={onExport}
            className="px-4 py-2 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-900 hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          
          {/* Add Employee Button */}
          <button 
            onClick={onAddEmployee}
            className="px-4 py-2 bg-[#4B45E5] text-white rounded-md text-sm font-medium hover:bg-[#3B35D5] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Employee
          </button>
        </div>
      </div>
    </div>
  );
};
