"use client"

import React, { useState, useEffect } from 'react';
import { type Employee } from '../../services/employeeService';
import { useEmployeeFormStore } from '../../stores/employeeFormStore';
import { SidebarHeader } from '../../pages/forms/SidebarHeader';
import { SidebarFooter } from '../../pages/forms/SidebarFooter';
import { TabNavigation } from '../../pages/forms/TabNavigation';
import { PersonalDetailsTab } from '../../pages/forms/PersonalDetailsTab';
import { JobDetailsTab } from '../../pages/forms/JobDetailsTab';
import { EducationTab } from '../../pages/forms/EducationTab';
import { ExperienceTab } from '../../pages/forms/ExperienceTab';

interface AddEmployeeSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onEmployeeAdded?: (employee: Employee) => void;
}

const AddEmployeeSidebar: React.FC<AddEmployeeSidebarProps> = ({ 
  isOpen, 
  onClose, 
  onEmployeeAdded 
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const {
    formData,
    validateForm,
    validatePersonalDetails,
    validateJobDetails,
    validateEducation,
    validateExperience,
    isPersonalDetailsCompleted,
    isJobDetailsCompleted,
    isEducationCompleted,
    isExperienceCompleted,
    resetForm,
    setSubmitting,
    isSubmitting
  } = useEmployeeFormStore();

  const tabs = [
    { id: 0, label: 'Personal Details', hasError: false, isCompleted: isPersonalDetailsCompleted() },
    { id: 1, label: 'Job Details', hasError: false, isCompleted: isJobDetailsCompleted() },
    { id: 2, label: 'Education', hasError: false, isCompleted: isEducationCompleted() },
    { id: 3, label: 'Experience', hasError: false, isCompleted: isExperienceCompleted() }
  ];

  const handleContinue = () => {
    let isValid = false;
    
    // Validate only the current tab's fields
    if (activeTab === 0) {
      // Personal Details validation
      isValid = validatePersonalDetails();
    } else if (activeTab === 1) {
      // Job Details validation
      isValid = validateJobDetails();
                } else if (activeTab === 2) {
                  // Education validation
                  isValid = validateEducation();
                } else if (activeTab === 3) {
                  // Experience validation
                  isValid = validateExperience();
                } else {
                  // For other tabs, no validation required for now
                  isValid = true;
                }
    
    if (!isValid) {
      // Validation errors will be shown in the form fields
      return;
    }

    // Move to next tab if not on last tab
    if (activeTab < tabs.length - 1) {
      setActiveTab(activeTab + 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSubmitting(true);
    
    try {
    // Generate avatar data
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const avatarInitial = formData.firstName.charAt(0).toUpperCase();
    const avatarColors = [
      'bg-[#b1e3ff]', 'bg-[#ffcb83]', 'bg-[#c6c7f8]', 'bg-[#a8c5da]',
      'bg-[#ffe999]', 'bg-[#a1e3cb]', 'bg-[#baedbd]'
    ];
    const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

    const newEmployeeData = {
      name: fullName,
      empId: formData.employeeId,
      email: formData.email,
        jobTitle: formData.title || 'New Employee',
        grade: formData.jobGrade || 'C',
      lastLogin: new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }),
        manager: formData.manager || '-',
        hrPartner: formData.hrPartner || '-',
      location: formData.location || 'SF Bay, USA',
        department: formData.entity || 'General',
      source: 'Internal',
      status: formData.employmentStatus as 'Active' | 'In-active',
      avatarColor: randomColor,
      avatarInitial: avatarInitial
    };

    // Add to employee service
      const { employeeService } = await import('../../services/employeeService');
    const newEmployee = employeeService.addEmployee(newEmployeeData);
    
    // Call callback to refresh the UI
    onEmployeeAdded?.(newEmployee);
    
    // Reset form
      resetForm();
      
      // Close sidebar
    onClose();
    } catch (error) {
      console.error('Error adding employee:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBulkImport = () => {
    // TODO: Implement bulk import functionality
    console.log('Bulk import clicked');
  };

  // Handle escape key to close sidebar
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when sidebar is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <PersonalDetailsTab />;
      case 1:
        return <JobDetailsTab />;
                  case 2:
                    return <EducationTab />;
                  case 3:
                    return <ExperienceTab />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`add-employee-sidebar fixed top-0 right-0 h-full w-full max-w-[832px] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <SidebarHeader
          title="Add New Employee"
          onClose={onClose}
        />

        {/* Content */}
        <div className="flex-1 px-6 pt-4 pb-6 overflow-y-auto">
          {/* Tabs */}
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Tab Content */}
          {renderTabContent()}
        </div>

        {/* Footer */}
        <SidebarFooter
          onBulkImport={handleBulkImport}
          onBack={activeTab > 0 ? () => setActiveTab(activeTab - 1) : onClose}
          onSubmit={activeTab === tabs.length - 1 ? handleSubmit : handleContinue}
          submitLabel={activeTab === tabs.length - 1 ? "Add Employee" : "Continue to Next"}
          isLoading={isSubmitting}
        />
      </div>
    </>
  );
};

export default AddEmployeeSidebar;
