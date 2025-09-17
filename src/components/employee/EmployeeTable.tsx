import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { employeeService, type Employee } from '../../services/employeeService';

const EmployeeTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const employees: Employee[] = employeeService.getAllEmployees();

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 w-full h-[317px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-gray-900">Employees Summary ({employees.length})</h3>
          <button className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer" title="More info">
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>
        
        {/* Search */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
          <div className="w-[160px] h-7 bg-gray-50 rounded-lg flex items-center px-2 border border-gray-200">
            <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-sm text-gray-900 placeholder-gray-500 outline-none flex-1"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-0 text-sm font-medium text-gray-900 w-[142px]">Name</th>
              <th className="text-left py-3 px-0 text-sm font-medium text-gray-900 w-[120px]">ID</th>
              <th className="text-left py-3 px-0 text-sm font-medium text-gray-900 w-[107px]">Job Title</th>
              <th className="text-left py-3 px-0 text-sm font-medium text-gray-900 w-[100px]">Type</th>
              <th className="text-left py-3 px-0 text-sm font-medium text-gray-900 w-[113px]">Manager</th>
              <th className="text-left py-3 px-0 text-sm font-medium text-gray-900 w-[120px]">Department</th>
              <th className="text-left py-3 px-0 text-sm font-medium text-gray-900 w-[120px]">Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3 px-0">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">
                        {employee.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-900">{employee.name}</span>
                  </div>
                </td>
                <td className="py-3 px-0">
                  <span className="text-sm text-gray-900">{employee.id}</span>
                </td>
                <td className="py-3 px-0">
                  <span className="text-sm text-gray-900">{employee.jobTitle}</span>
                </td>
                <td className="py-3 px-0">
                  <span className="text-sm text-gray-900">Full-time</span>
                </td>
                <td className="py-3 px-0">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">
                        {employee.manager.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-900">{employee.manager}</span>
                  </div>
                </td>
                <td className="py-3 px-0">
                  <span className="text-sm text-gray-900">{employee.department}</span>
                </td>
                <td className="py-3 px-0">
                  <span className="text-sm text-gray-900">{employee.lastLogin}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
