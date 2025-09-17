"use client"

import React from 'react';
import { Edit } from 'lucide-react';
import type { EmployeeDetails } from '../../../stores/employeeDetailsStore';

interface JobDetailsSectionProps {
  employee: EmployeeDetails;
  onEdit?: () => void;
  onUpdate?: (updates: Partial<EmployeeDetails>) => void;
}

export const JobDetailsSection: React.FC<JobDetailsSectionProps> = ({ 
  employee, 
  onEdit,
  onUpdate: _onUpdate
}) => {
  return (
    <div className="flex gap-[34px] items-start justify-start w-[591px]">
      {/* Left Column */}
      <div className="flex flex-col gap-3 items-start justify-start w-[257px]">
        <div className="flex items-center gap-2">
          <div className="font-medium leading-[0] not-italic relative shrink-0 text-[#1c1c1c] text-[14px] w-full">
            <p className="leading-[20px]">Job Details</p>
          </div>
          {onEdit && (
            <Edit className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-pointer" onClick={onEdit} />
          )}
        </div>
        <div className="flex flex-col gap-2 items-start justify-start w-full">
          {/* Title */}
          <div className="flex items-center justify-between w-[220px]">
            <div className="font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(28,28,28,0.6)] text-nowrap">
              <p className="leading-[18px] whitespace-pre">Title</p>
            </div>
            <div className="flex gap-2.5 items-center justify-center p-[8px] relative rounded-[16px] shrink-0">
              <div className="flex gap-1 items-center justify-start">
                <div className="font-normal leading-[0] not-italic relative shrink-0 text-[#1c1c1c] text-[12px] text-nowrap">
                  <p className="leading-[16.8px] whitespace-pre">{employee.jobTitle || 'Sales Manager'}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Position */}
          <div className="flex items-center justify-between w-[152px]">
            <div className="font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(28,28,28,0.6)] text-nowrap">
              <p className="leading-[18px] whitespace-pre">Position</p>
            </div>
            <div className="flex gap-2.5 items-center justify-center p-[8px] relative rounded-[16px] shrink-0">
              <div className="flex gap-1 items-center justify-start">
                <div className="font-normal leading-[0] not-italic relative shrink-0 text-[#1c1c1c] text-[12px] text-nowrap">
                  <p className="leading-[16.8px] whitespace-pre">{employee.jobTitle || '-'}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Job Grade */}
          <div className="flex items-center justify-between w-[178px]">
            <div className="font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(28,28,28,0.6)] text-nowrap">
              <p className="leading-[18px] whitespace-pre">Job Grade</p>
            </div>
            <div className="flex gap-2.5 items-center justify-center p-[8px] relative rounded-[16px] shrink-0">
              <div className="flex gap-1 items-center justify-start">
                <div className="font-normal leading-[0] not-italic relative shrink-0 text-[#1c1c1c] text-[12px] text-nowrap">
                  <p className="leading-[16.8px] whitespace-pre">{employee.grade || '-'}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Job Code */}
          <div className="flex items-center justify-between w-[195px]">
            <div className="font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(28,28,28,0.6)] text-nowrap">
              <p className="leading-[18px] whitespace-pre">Job Code</p>
            </div>
            <div className="flex gap-2.5 items-center justify-center p-[8px] relative rounded-[16px] shrink-0">
              <div className="flex gap-1 items-center justify-start">
                <div className="font-normal leading-[0] not-italic relative shrink-0 text-[#1c1c1c] text-[12px] text-nowrap">
                  <p className="leading-[16.8px] whitespace-pre">{employee.empId || '-'}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* EEOC Category */}
          <div className="flex items-center justify-between w-[207px]">
            <div className="font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(28,28,28,0.6)] text-nowrap">
              <p className="leading-[18px] whitespace-pre">EEOC Category</p>
            </div>
            <div className="flex gap-2.5 items-center justify-center p-[8px] relative rounded-[16px] shrink-0">
              <div className="flex gap-1 items-center justify-start">
                <div className="font-normal leading-[0] not-italic relative shrink-0 text-[#1c1c1c] text-[12px] text-nowrap">
                  <p className="leading-[16.8px] whitespace-pre">{employee.department || '-'}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Standard Hours */}
          <div className="flex items-center justify-between w-[157px]">
            <div className="font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(28,28,28,0.6)] text-nowrap">
              <p className="leading-[18px] whitespace-pre">Standard Hours</p>
            </div>
            <div className="flex gap-2.5 items-center justify-center p-[8px] relative rounded-[16px] shrink-0">
              <div className="flex gap-1 items-center justify-start">
                <div className="font-normal leading-[0] not-italic relative shrink-0 text-[#1c1c1c] text-[12px] text-nowrap">
                  <p className="leading-[16.8px] whitespace-pre">40</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Trainery Contact */}
          <div className="flex items-center justify-between w-[161px]">
            <div className="font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(28,28,28,0.6)] text-nowrap">
              <p className="leading-[18px] whitespace-pre">Trainery Contact</p>
            </div>
            <div className="flex gap-2.5 items-center justify-center p-[8px] relative rounded-[16px] shrink-0">
              <div className="flex gap-1 items-center justify-start">
                <div className="font-normal leading-[0] not-italic relative shrink-0 text-[#1c1c1c] text-[12px] text-nowrap">
                  <p className="leading-[16.8px] whitespace-pre">{employee.source === 'Internal' ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Column - Organization Details */}
      <div className="flex flex-col gap-3 items-start justify-start w-[257px]">
        <div className="font-medium leading-[0] not-italic opacity-0 relative shrink-0 text-[#1c1c1c] text-[14px] w-full">
          <p className="leading-[20px]">Job Details</p>
        </div>
        <div className="flex flex-col gap-2 items-start justify-start w-full">
          {/* Entity */}
          <div className="flex items-center justify-between w-[172px]">
            <div className="font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(28,28,28,0.6)] text-nowrap">
              <p className="leading-[18px] whitespace-pre">Entity</p>
            </div>
            <div className="flex gap-2.5 items-center justify-center p-[8px] relative rounded-[16px] shrink-0">
              <div className="flex gap-1 items-center justify-start">
                <div className="font-normal leading-[0] not-italic relative shrink-0 text-[#1c1c1c] text-[12px] text-nowrap">
                  <p className="leading-[16.8px] whitespace-pre">{employee.department || '-'}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Division */}
          <div className="flex items-center justify-between w-[242px]">
            <div className="font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(28,28,28,0.6)] text-nowrap">
              <p className="leading-[18px] whitespace-pre">Division</p>
            </div>
            <div className="flex gap-2.5 items-center justify-center p-[8px] relative rounded-[16px] shrink-0">
              <div className="flex gap-1 items-center justify-start">
                <div className="font-normal leading-[0] not-italic relative shrink-0 text-[#1c1c1c] text-[12px] text-nowrap">
                  <p className="leading-[16.8px] whitespace-pre">{employee.department || '-'}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Branch */}
          <div className="flex items-center justify-between w-[149px]">
            <div className="font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(28,28,28,0.6)] text-nowrap">
              <p className="leading-[18px] whitespace-pre">Branch</p>
            </div>
            <div className="flex gap-2.5 items-center justify-center p-[8px] relative rounded-[16px] shrink-0">
              <div className="flex gap-1 items-center justify-start">
                <div className="font-normal leading-[0] not-italic relative shrink-0 text-[#1c1c1c] text-[12px] text-nowrap">
                  <p className="leading-[16.8px] whitespace-pre">{employee.location || '-'}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Manager */}
          <div className="flex items-center justify-between w-[202px]">
            <div className="font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(28,28,28,0.6)] text-nowrap">
              <p className="leading-[18px] whitespace-pre">Manager</p>
            </div>
            <div className="flex gap-2.5 items-center justify-center p-[8px] relative rounded-[16px] shrink-0">
              <div className="flex gap-2 items-center justify-start">
                <div className="flex items-center justify-center relative rounded-[6.667px] shrink-0">
                  <div className="bg-[#baedbd] overflow-clip relative rounded-[66.667px] shrink-0 size-5">
                    <div className="absolute flex flex-col font-normal justify-center leading-[0] not-italic text-[#1c1c1c] text-[10px] text-center text-nowrap top-1/2 translate-x-[-50%] translate-y-[-50%]" style={{ left: "calc(50% - 0.167px)" }}>
                      <p className="leading-[15px] whitespace-pre">{employee.manager?.charAt(0) || '-'}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-start justify-center relative shrink-0">
                  <div className="font-normal leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c1c1c] text-[12px] text-nowrap">
                    <p className="leading-[18px] overflow-ellipsis overflow-hidden whitespace-pre">{employee.manager || '-'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Secondary Manager */}
          <div className="flex items-center justify-between w-[213px]">
            <div className="font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(28,28,28,0.6)] text-nowrap">
              <p className="leading-[18px] whitespace-pre">Secondary Manager</p>
            </div>
            <div className="flex gap-2.5 items-center justify-center p-[8px] relative rounded-[16px] shrink-0">
              <div className="flex gap-2 items-center justify-start">
                <div className="flex items-center justify-center relative rounded-[6.667px] shrink-0">
                  <div className="bg-[#b1e3ff] overflow-clip relative rounded-[66.667px] shrink-0 size-5">
                    <div className="absolute flex flex-col font-normal justify-center leading-[0] not-italic text-[#1c1c1c] text-[10px] text-center text-nowrap top-1/2 translate-x-[-50%] translate-y-[-50%]" style={{ left: "calc(50% + 0.333px)" }}>
                      <p className="leading-[15px] whitespace-pre">-</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-start justify-center relative shrink-0">
                  <div className="font-normal leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c1c1c] text-[12px] text-nowrap">
                    <p className="leading-[18px] overflow-ellipsis overflow-hidden whitespace-pre">-</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* HR Partner */}
          <div className="flex items-center justify-between w-[198px]">
            <div className="font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(28,28,28,0.6)] text-nowrap">
              <p className="leading-[18px] whitespace-pre">HR Partner</p>
            </div>
            <div className="flex gap-2.5 items-center justify-center p-[8px] relative rounded-[16px] shrink-0">
              <div className="flex gap-2 items-center justify-start">
                <div className="flex items-center justify-center relative rounded-[6.667px] shrink-0">
                  <div className="bg-[#c6c7f8] overflow-clip relative rounded-[66.667px] shrink-0 size-5">
                    <div className="absolute flex flex-col font-normal justify-center leading-[0] not-italic text-[#1c1c1c] text-[10px] text-center text-nowrap top-1/2 translate-x-[-50%] translate-y-[-50%]" style={{ left: "calc(50% + 0.333px)" }}>
                      <p className="leading-[15px] whitespace-pre">{employee.hrPartner?.charAt(0) || '-'}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-start justify-center relative shrink-0">
                  <div className="font-normal leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c1c1c] text-[12px] text-nowrap">
                    <p className="leading-[18px] overflow-ellipsis overflow-hidden whitespace-pre">{employee.hrPartner || '-'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
