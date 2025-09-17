"use client"

import React, { useState } from 'react';
import type { EmployeeDetails } from '../../stores/employeeDetailsStore';
import { useEmployeeDetailsStore } from '../../stores/employeeDetailsStore';
import { TabNavigation, type Tab } from '../../components/common';
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
            <div className="flex flex-col items-start justify-start w-full">
              <div className="h-0 relative shrink-0 w-full">
                <div className="absolute bottom-0 left-0 right-0 top-[-1px] border-b border-slate-200" />
              </div>
            </div>
            
            {/* Dates Section */}
            <DatesSection 
              employee={employee}
              onUpdate={updatePersonalInfo}
            />
            
            {/* Separator */}
            <div className="flex flex-col items-start justify-start w-full">
              <div className="h-0 relative shrink-0 w-full">
                <div className="absolute bottom-0 left-0 right-0 top-[-1px] border-b border-slate-200" />
              </div>
            </div>
            
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
          <div className="p-6 text-center text-slate-500">
            <p>Org Chart view coming soon...</p>
          </div>
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
