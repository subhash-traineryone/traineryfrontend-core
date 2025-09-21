import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { employeeService, type Employee } from '../../services/employeeService';
import { useEmployeeDetailsStore } from '../../stores/employeeDetailsStore';

const EmployeeCard: React.FC<{ employee: Employee }> = ({ employee }) => {
  const { openEmployeeDetails } = useEmployeeDetailsStore();
  
  return (
    <div 
      className="bg-white rounded-md border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={() => openEmployeeDetails(employee.id)}
    >
      <div className="p-4">
        <div className="flex gap-4 items-start">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className={`w-[42px] h-[42px] rounded-full flex items-center justify-center ${employee.avatarColor}`}>
              <span className="text-[21px] font-normal text-[#1c1c1c]">
                {employee.avatarInitial}
              </span>
            </div>
          </div>

          {/* Employee Info */}
          <div className="flex-1 min-w-0">
            <div className="mb-3">
              <h3 className="text-sm font-medium text-[#1c1c1c] leading-5 mb-1">
                {employee.name}
              </h3>
              <p className="text-xs text-[rgba(28,28,28,0.6)] leading-[18px]">
                {employee.jobTitle}
              </p>
            </div>

            <div className="space-y-2 mb-3">
              {/* Email */}
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[rgba(28,28,28,0.6)]" />
                <span className="text-xs text-[rgba(28,28,28,0.6)] leading-[18px] truncate">
                  {employee.email}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[rgba(28,28,28,0.6)]" />
                <span className="text-xs text-[rgba(28,28,28,0.6)] leading-[18px] truncate">
                  {employee.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Last Login - Positioned directly below avatar */}
        <div className="flex gap-4 items-center">
          {/* Avatar space - same width as avatar */}
          <div className="w-[42px] flex-shrink-0"></div>
          
          {/* Last Login text aligned slightly left of employee info */}
          <div className="flex-1 min-w-0 -ml-13">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-xs text-black leading-[18px]">Last login:</span>
              <span className="text-xs text-[rgba(28,28,28,0.6)] leading-[18px] truncate">
                {employee.lastLogin}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmployeeBoard: React.FC = () => {
  const employees = employeeService.getAllEmployees();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {employees.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
};

export default EmployeeBoard;
