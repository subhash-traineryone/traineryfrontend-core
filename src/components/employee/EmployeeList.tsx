import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, CheckSquare } from 'lucide-react';
import { employeeService, type Employee } from '../../services/employeeService';
import { useEmployeeDetailsStore } from '../../stores/employeeDetailsStore';

// Get employees from centralized service
const mockEmployees = employeeService.getAllEmployees();

const EmployeeList: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const { openEmployeeDetails } = useEmployeeDetailsStore();

  // Sort employees based on current sort settings
  const sortedEmployees = React.useMemo(() => {
    if (!sortColumn) return mockEmployees;
    
    return [...mockEmployees].sort((a, b) => {
      const aValue = a[sortColumn as keyof Employee];
      const bValue = b[sortColumn as keyof Employee];
      
      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.toLowerCase().localeCompare(bValue.toLowerCase());
        return sortDirection === 'asc' ? comparison : -comparison;
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      // Fallback to string comparison
      const aStr = String(aValue || '');
      const bStr = String(bValue || '');
      const comparison = aStr.toLowerCase().localeCompare(bStr.toLowerCase());
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [sortColumn, sortDirection]);

  const totalPages = Math.ceil(sortedEmployees.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentEmployees = sortedEmployees.slice(startIndex, endIndex);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(sortedEmployees.map(emp => emp.id)));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (employeeId: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(employeeId)) {
      newSelected.delete(employeeId);
    } else {
      newSelected.add(employeeId);
    }
    setSelectedRows(newSelected);
    setSelectAll(newSelected.size === sortedEmployees.length);
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
    setCurrentPage(1); // Reset to first page when sorting
  };

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) {
      return <ChevronsUpDown className="w-4 h-4 text-gray-400" />;
    }
    return sortDirection === 'asc' 
      ? <ChevronUp className="w-4 h-4 text-gray-600" />
      : <ChevronDown className="w-4 h-4 text-gray-600" />;
  };

  const getStatusBadge = (status: string) => {
    const isActive = status === 'Active';
    return (
      <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
        isActive 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {status}
      </div>
    );
  };

  const getSourceBadge = (source: string) => {
    return (
      <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        {source}
      </div>
    );
  };

  const getAvatar = (name: string) => {
    const initial = name.charAt(0).toUpperCase();
    return (
      <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
        {initial}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Table Container - Only the table scrolls horizontally */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1400px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {/* Select All Checkbox */}
              <th className="w-12 px-4 py-4 text-left whitespace-nowrap">
                <button
                  onClick={handleSelectAll}
                  className="flex items-center justify-center w-4 h-4 border border-gray-300 rounded hover:bg-gray-50"
                >
                  {selectedRows.size === currentEmployees.length && currentEmployees.length > 0 && <CheckSquare className="w-3 h-3 text-blue-500" />}
                </button>
              </th>
              
              {/* Name Column */}
              <th className="w-48 px-4 py-4 text-left whitespace-nowrap">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  Name
                  {getSortIcon('name')}
                </button>
              </th>
              
              {/* Emp ID Column */}
              <th className="w-24 px-4 py-4 text-left whitespace-nowrap">
                <button
                  onClick={() => handleSort('empId')}
                  className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  Emp ID
                  {getSortIcon('empId')}
                </button>
              </th>
              
              {/* Email Column */}
              <th className="w-48 px-4 py-4 text-left whitespace-nowrap">
                <button
                  onClick={() => handleSort('email')}
                  className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  Email
                  {getSortIcon('email')}
                </button>
              </th>
              
              {/* Job Title Column */}
              <th className="w-32 px-4 py-4 text-left whitespace-nowrap">
                <button
                  onClick={() => handleSort('jobTitle')}
                  className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  Job Title
                  {getSortIcon('jobTitle')}
                </button>
              </th>
              
              {/* Grade Column */}
              <th className="w-20 px-4 py-4 text-left whitespace-nowrap">
                <button
                  onClick={() => handleSort('grade')}
                  className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  Grade
                  {getSortIcon('grade')}
                </button>
              </th>
              
              {/* Last Login Column */}
              <th className="w-40 px-4 py-4 text-left whitespace-nowrap">
                <button
                  onClick={() => handleSort('lastLogin')}
                  className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  Last Login
                  {getSortIcon('lastLogin')}
                </button>
              </th>
              
              {/* Manager Column */}
              <th className="w-32 px-4 py-4 text-left whitespace-nowrap">
                <button
                  onClick={() => handleSort('manager')}
                  className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  Manager
                  {getSortIcon('manager')}
                </button>
              </th>
              
              {/* HR Partner Column */}
              <th className="w-32 px-4 py-4 text-left whitespace-nowrap">
                <button
                  onClick={() => handleSort('hrPartner')}
                  className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  HR Partner
                  {getSortIcon('hrPartner')}
                </button>
              </th>
              
              {/* Location Column */}
              <th className="w-24 px-4 py-4 text-left whitespace-nowrap">
                <button
                  onClick={() => handleSort('location')}
                  className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  Location
                  {getSortIcon('location')}
                </button>
              </th>
              
              {/* Department Column */}
              <th className="w-32 px-4 py-4 text-left whitespace-nowrap">
                <button
                  onClick={() => handleSort('department')}
                  className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  Department
                  {getSortIcon('department')}
                </button>
              </th>
              
              {/* Source Column */}
              <th className="w-24 px-4 py-4 text-left whitespace-nowrap">
                <button
                  onClick={() => handleSort('source')}
                  className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  Source
                  {getSortIcon('source')}
                </button>
              </th>
              
              {/* Status Column */}
              <th className="w-24 px-4 py-4 text-left whitespace-nowrap">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  Status
                  {getSortIcon('status')}
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => openEmployeeDetails(employee.id)}>
                {/* Select Row Checkbox */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleSelectRow(employee.id)}
                    className="flex items-center justify-center w-4 h-4 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    {selectedRows.has(employee.id) && <CheckSquare className="w-3 h-3 text-blue-500" />}
                  </button>
                </td>
                
                {/* Name with Avatar */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    {getAvatar(employee.name)}
                    <span className="text-sm font-medium text-gray-900">{employee.name}</span>
                  </div>
                </td>
                
                {/* Emp ID */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{employee.empId}</span>
                </td>
                
                {/* Email */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{employee.email}</span>
                </td>
                
                {/* Job Title */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{employee.jobTitle}</span>
                </td>
                
                {/* Grade */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{employee.grade}</span>
                </td>
                
                {/* Last Login */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{employee.lastLogin}</span>
                </td>
                
                {/* Manager */}
                <td className="px-4 py-4 whitespace-nowrap">
                  {employee.manager !== '-' ? (
                    <div className="flex items-center gap-2">
                      {getAvatar(employee.manager)}
                      <span className="text-sm font-medium text-gray-900">{employee.manager}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">-</span>
                  )}
                </td>
                
                {/* HR Partner */}
                <td className="px-4 py-4 whitespace-nowrap">
                  {employee.hrPartner !== '-' ? (
                    <div className="flex items-center gap-2">
                      {getAvatar(employee.hrPartner)}
                      <span className="text-sm font-medium text-gray-900">{employee.hrPartner}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">-</span>
                  )}
                </td>
                
                {/* Location */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{employee.location}</span>
                </td>
                
                {/* Department */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{employee.department}</span>
                </td>
                
                {/* Source */}
                <td className="px-4 py-4 whitespace-nowrap">
                  {getSourceBadge(employee.source)}
                </td>
                
                {/* Status */}
                <td className="px-4 py-4 whitespace-nowrap">
                  {getStatusBadge(employee.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700">
            {selectedRows.size} of {mockEmployees.length} row(s) selected.
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Rows per page */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Rows per page</span>
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          
          {/* Page info */}
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          
          {/* Pagination controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
