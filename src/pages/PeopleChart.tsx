"use client"

import React, { useState } from 'react';
import { WorkforceHeader, WorkforceControls, OrganizationChart, EmployeeList, EmployeeBoard, AddEmployeeSidebar, EmployeeImportHistoryModal, EmployeeDetailsSidebar } from '../components';
import { useWorkforceData } from '../hooks/useWorkforceData';
import { useWorkforceView } from '../hooks/useWorkforceView';

const PeopleChartRefactored: React.FC = () => {
  const {
    employees,
    isLoading,
    error,
    addEmployee,
  } = useWorkforceData();

  const {
    viewMode,
    searchTerm,
    isSelectAll,
    changeViewMode,
    updateSearchTerm,
    toggleSelectAll,
    toggleNodeExpansion,
    expandAll,
    collapseAll,
  } = useWorkforceView();

  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showImportHistory, setShowImportHistory] = useState(false);

  const handleEmployeeAdded = (newEmployee: any) => {
    addEmployee(newEmployee);
    setShowAddEmployee(false);
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export employees');
  };

  const handleImportHistory = () => {
    setShowImportHistory(true);
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading employees...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-full flex flex-col">
      {/* Fixed Header Section */}
      <div className="bg-gray-50 p-4 lg:p-6 border-b border-gray-200">
        {/* Page Header */}
        <WorkforceHeader 
          viewMode={viewMode}
          onViewModeChange={changeViewMode}
        />

        {/* Controls Bar */}
        <WorkforceControls
          searchTerm={searchTerm}
          onSearchChange={updateSearchTerm}
          isSelectAll={isSelectAll}
          onSelectAllChange={toggleSelectAll}
          onExport={handleExport}
          onAddEmployee={() => setShowAddEmployee(true)}
          onExpandAll={expandAll}
          onCollapseAll={collapseAll}
          onSelectAll={toggleSelectAll}
          onImportHistory={handleImportHistory}
        />

        {/* Total Employees Count */}
        <div className="mb-4">
          <span className="text-sm text-gray-600">Total Employees: {employees.length}</span>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 p-4 lg:p-6 pt-0">
        {/* Conditional Content Based on View Mode */}
        {viewMode === 'chart' && (
          <OrganizationChart
            employees={employees}
            onToggleNode={toggleNodeExpansion}
          />
        )}

        {viewMode === 'list' && (
          <EmployeeList />
        )}

        {viewMode === 'board' && (
          <EmployeeBoard />
        )}
      </div>

      {/* Modals and Sidebars */}
      <AddEmployeeSidebar
        isOpen={showAddEmployee}
        onClose={() => setShowAddEmployee(false)}
        onEmployeeAdded={handleEmployeeAdded}
      />

      <EmployeeImportHistoryModal
        isOpen={showImportHistory}
        onClose={() => setShowImportHistory(false)}
      />

      <EmployeeDetailsSidebar />
    </div>
  );
};

export default PeopleChartRefactored;
