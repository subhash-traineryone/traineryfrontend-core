"use client"

import React from 'react';
import { Edit } from 'lucide-react';
import type { EmployeeDetails } from '../../../stores/employeeDetailsStore';

interface DatesSectionProps {
  employee: EmployeeDetails;
  onEdit?: () => void;
  onUpdate?: (updates: Partial<EmployeeDetails>) => void;
}

export const DatesSection: React.FC<DatesSectionProps> = ({ 
  employee: _employee, 
  onEdit,
  onUpdate: _onUpdate 
}) => {
  return (
    <div className="flex flex-col gap-3 items-start justify-start">
      <div className="flex items-center gap-2">
        <div className="font-medium leading-[0] min-w-full not-italic relative shrink-0 text-[#1c1c1c] text-[14px]" style={{ width: "min-content" }}>
          <p className="leading-[20px]">Dates</p>
        </div>
        {onEdit && (
          <Edit className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-pointer" onClick={onEdit} />
        )}
      </div>
      <div className="flex flex-col gap-2 items-start justify-start">
        <div className="flex gap-[76px] items-center justify-start w-full">
          <div className="flex items-center justify-between w-[215px]">
            <div className="font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(28,28,28,0.6)] text-nowrap">
              <p className="leading-[18px] whitespace-pre">Hire Date</p>
            </div>
            <div className="flex gap-2.5 items-center justify-center p-[8px] relative rounded-[16px] shrink-0">
              <div className="flex gap-1 items-center justify-start">
                <div className="font-normal leading-[0] not-italic relative shrink-0 text-[#1c1c1c] text-[12px] text-nowrap">
                  <p className="leading-[16.8px] whitespace-pre">{_employee.lastLogin || '-'}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between w-[215px]">
            <div className="font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(28,28,28,0.6)] text-nowrap">
              <p className="leading-[18px] whitespace-pre">Start Date</p>
            </div>
            <div className="flex gap-2.5 items-center justify-center p-[8px] relative rounded-[16px] shrink-0">
              <div className="flex gap-1 items-center justify-start">
                <div className="font-normal leading-[0] not-italic relative shrink-0 text-[#1c1c1c] text-[12px] text-nowrap">
                  <p className="leading-[16.8px] whitespace-pre">{_employee.lastLogin || '-'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between w-[215px]">
          <div className="font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(28,28,28,0.6)] text-nowrap">
            <p className="leading-[18px] whitespace-pre">Position Date</p>
          </div>
          <div className="flex gap-2.5 items-center justify-center p-[8px] relative rounded-[16px] shrink-0">
            <div className="flex gap-1 items-center justify-start">
              <div className="font-normal leading-[0] not-italic relative shrink-0 text-[#1c1c1c] text-[12px] text-nowrap">
                <p className="leading-[16.8px] whitespace-pre">{_employee.lastLogin || '-'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
