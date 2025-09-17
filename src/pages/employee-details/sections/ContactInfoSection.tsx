"use client"

import React from 'react';
import { Copy, Edit } from 'lucide-react';
import type { EmployeeDetails } from '../../../stores/employeeDetailsStore';

interface ContactInfoSectionProps {
  employee: EmployeeDetails;
  onEdit?: () => void;
  onUpdate?: (updates: Partial<EmployeeDetails>) => void;
}

export const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({ 
  employee: _employee, 
  onEdit,
  onUpdate: _onUpdate 
}) => {
  return (
    <div className="flex flex-col gap-3 items-start justify-start w-[584px]">
      <div className="flex items-center gap-2">
        <div className="font-medium leading-[0] not-italic relative shrink-0 text-[#1c1c1c] text-[14px] w-full">
          <p className="leading-[20px]">Contact Information</p>
        </div>
        {onEdit && (
          <Edit className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-pointer" onClick={onEdit} />
        )}
      </div>
      <div className="flex flex-col gap-2 items-start justify-start w-full">
        <div className="flex gap-10 items-center justify-start w-full relative">
          <div className="flex items-center justify-between w-[251px]">
            <div className="font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(28,28,28,0.6)] text-nowrap">
              <p className="leading-[18px] whitespace-pre">Phone Number</p>
            </div>
            <div className="flex gap-2.5 items-center justify-center p-[8px] relative rounded-[16px] shrink-0">
              <div className="flex gap-1 items-center justify-start">
                <div className="font-normal leading-[0] not-italic relative shrink-0 text-[#1c1c1c] text-[12px] text-nowrap">
                  <p className="leading-[16.8px] whitespace-pre">{_employee.phone || '-'}</p>
                </div>
              </div>
            </div>
            <div className="absolute right-[-20px] top-1/2 transform -translate-y-1/2">
              <Copy className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-pointer" />
            </div>
          </div>
          <div className="flex items-center justify-between w-72">
            <div className="font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(28,28,28,0.6)] text-nowrap">
              <p className="leading-[18px] whitespace-pre">Email</p>
            </div>
            <div className="flex gap-2.5 items-center justify-center p-[8px] relative rounded-[16px] shrink-0">
              <div className="flex gap-1 items-center justify-start">
                <div className="font-normal leading-[0] not-italic relative shrink-0 text-[#1c1c1c] text-[12px] text-nowrap">
                  <p className="leading-[16.8px] whitespace-pre">{_employee.email || '-'}</p>
                </div>
              </div>
            </div>
            <div className="absolute right-[-20px] top-1/2 transform -translate-y-1/2">
              <Copy className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between w-[243px]">
          <div className="font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(28,28,28,0.6)] text-nowrap">
            <p className="leading-[18px] whitespace-pre">Location</p>
          </div>
          <div className="flex gap-2.5 items-center justify-center p-[8px] relative rounded-[16px] shrink-0">
            <div className="flex gap-1 items-center justify-start">
              <div className="font-normal leading-[0] not-italic relative shrink-0 text-[#1c1c1c] text-[12px] text-nowrap">
                <p className="leading-[16.8px] whitespace-pre">{_employee.location || '-'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
