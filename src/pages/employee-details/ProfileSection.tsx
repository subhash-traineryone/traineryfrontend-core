"use client"

import React, { useState } from 'react';
import type { EmployeeDetails } from '../../stores/employeeDetailsStore';
import { useEmployeeDetailsStore } from '../../stores/employeeDetailsStore';
import { TabNavigation, type Tab, EmployeeOrgChart } from '../../components';
import { employeeService } from '../../services/employeeService';
import { JobDetailsSection } from './sections/JobDetailsSection';
import { DatesSection } from './sections/DatesSection';
import { ContactInfoSection } from './sections/ContactInfoSection';
import EducationProfileSection from './sections/EducationProfileSection';
import ExperienceProfileSection from './sections/ExperienceProfileSection';

interface ProfileSectionProps {
  employee: EmployeeDetails;
  onUpdate: (updates: Partial<EmployeeDetails>) => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ 
  employee, 
  onUpdate: _onUpdate 
}) => {
  const [activeSubTab, setActiveSubTab] = useState('details');
  const { updatePersonalInfo } = useEmployeeDetailsStore();

  const subTabs: Tab[] = [
    { id: 'details', label: 'Details' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'orgchart', label: 'Org Chart' }
  ];

  const renderSubTabContent = () => {
    switch (activeSubTab) {
      case 'details':
        return (
          <div className="flex flex-col gap-4">
            {/* Job Details Section */}
            <JobDetailsSection 
              employee={employee} 
              onEdit={() => {/* Handle edit */}}
              onUpdate={updatePersonalInfo}
            />
            
            {/* Separator */}
            <div className="w-full h-px bg-slate-200" />
            
            {/* Dates Section */}
            <DatesSection 
              employee={employee}
              onUpdate={updatePersonalInfo}
            />
            
            {/* Separator */}
            <div className="w-full h-px bg-slate-200" />
            
            {/* Contact Information Section */}
            <ContactInfoSection 
              employee={employee}
              onUpdate={updatePersonalInfo}
            />
          </div>
        );
      case 'education':
        return (
          <EducationProfileSection 
            employee={employee}
            onUpdate={updatePersonalInfo}
          />
        );
      case 'experience':
        return (
          <ExperienceProfileSection 
            employee={employee}
            onUpdate={updatePersonalInfo}
          />
        );
      case 'orgchart':
        return (
          <EmployeeOrgChart 
            employee={{
              id: employee.id,
              name: employee.name,
              empId: employee.empId,
              email: employee.email,
              jobTitle: employee.jobTitle,
              grade: employee.grade,
              lastLogin: employee.lastLogin,
              manager: employee.manager,
              hrPartner: employee.hrPartner,
              location: employee.location,
              department: employee.department,
              source: employee.source,
              status: employee.status,
              avatarColor: employee.avatarColor,
              avatarInitial: employee.avatarInitial
            }}
            allEmployees={employeeService.getAllEmployees()}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub Navigation Tabs */}
      <TabNavigation
        tabs={subTabs}
        activeTab={activeSubTab}
        onTabChange={setActiveSubTab}
      />

      {/* Sub Tab Content */}
      <div className="pt-2">
        {renderSubTabContent()}
      </div>
    </div>
  );
};
