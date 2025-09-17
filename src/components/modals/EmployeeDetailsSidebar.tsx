"use client"

import React, { useState, useEffect } from 'react';
import { useEmployeeDetailsStore } from '../../stores/employeeDetailsStore';
import { X, UserCircle, Trophy, FileText, Settings, MessageCircle } from 'lucide-react';
import { ProfileSection } from '../../pages/employee-details/ProfileSection';
import { PerformanceSection } from '../../pages/employee-details/PerformanceSection';
import DocumentsSection from '../../pages/employee-details/DocumentsSection';
import { AdminSection } from '../../pages/employee-details/AdminSection';
import { UpdatesSection } from '../../pages/employee-details/UpdatesSection';

const EmployeeDetailsSidebar: React.FC = () => {
  const { 
    selectedEmployee, 
    isSidebarOpen, 
    isLoading, 
    error, 
    activeSection,
    closeEmployeeDetails, 
    updateEmployee, 
    deleteEmployee,
    setActiveSection
  } = useEmployeeDetailsStore();

  const [isAnimating, setIsAnimating] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    if (isSidebarOpen) {
      setIsAnimating(true);
      // Add a slight delay for content animation
      setTimeout(() => setIsContentVisible(true), 100);
    } else {
      setIsAnimating(false);
      setIsContentVisible(false);
    }
  }, [isSidebarOpen]);

  if (!isSidebarOpen || !selectedEmployee) return null;

  console.log('Current activeSection:', activeSection);

  const handleUpdate = async (updates: any) => {
    await updateEmployee(updates);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      await deleteEmployee(selectedEmployee.id);
    }
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection employee={selectedEmployee} onUpdate={handleUpdate} />;
      case 'performance':
        return <PerformanceSection employee={selectedEmployee} onUpdate={handleUpdate} />;
      case 'documents':
        return <DocumentsSection employee={selectedEmployee} />;
      case 'admin':
        return <AdminSection employee={selectedEmployee} />;
      case 'updates':
        return <UpdatesSection employee={selectedEmployee} />;
      default:
        return <ProfileSection employee={selectedEmployee} onUpdate={handleUpdate} />;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ease-in-out ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeEmployeeDetails}
      />
      
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-[60%] min-w-[800px] max-w-[1200px] bg-white shadow-xl z-50 transform transition-all duration-300 ease-in-out flex ${
        isAnimating ? 'translate-x-0 scale-100' : 'translate-x-full scale-95'
      }`}>
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex flex-col gap-1.5 pb-6 pt-7 px-6">
            <div className="flex gap-2 items-start justify-start w-full">
              {/* Avatar */}
              <div className="flex items-center justify-center relative rounded-[7px] shrink-0">
                <div className="bg-[#ffe999] overflow-clip relative rounded-[210px] shrink-0 size-[42px]">
                  <div className="absolute flex flex-col font-normal justify-center leading-[0] not-italic text-[#1c1c1c] text-[21px] text-center text-nowrap translate-x-[-50%] translate-y-[-50%]" style={{ top: "calc(50% + 0.25px)", left: "calc(50% - 0.599px)" }}>
                    <p className="leading-[31.5px] whitespace-pre">{selectedEmployee.name?.[0] || 'A'}</p>
                  </div>
                </div>
              </div>
              
              {/* Name and Job Title */}
              <div className="flex gap-3 grow items-start justify-start min-h-px min-w-px relative shrink-0">
                <div className="flex flex-col gap-1.5 items-start justify-start leading-[0] not-italic relative shrink-0">
                  <div className="font-semibold relative shrink-0 text-[0px] text-slate-950 tracking-[-0.45px] w-full">
                    <p className="leading-[0] not-italic text-[18px]">
                      <span className="leading-none tracking-[-0.45px]">{selectedEmployee.name?.[0] || 'A'}</span>
                      <span className="leading-[28px]">{selectedEmployee.name?.slice(1) || 'dell Eberth'}</span>
                    </p>
                  </div>
                  <div className="font-normal relative shrink-0 text-[14px] text-slate-500 w-full">
                    <p className="leading-[20px]">{selectedEmployee.jobTitle || 'Sales Manager'}</p>
                  </div>
                </div>
                
                {/* Active Status Tag */}
                <div className="bg-[rgba(52,199,89,0.1)] flex flex-col gap-2.5 h-[22px] items-center justify-center px-2.5 py-0.5 relative rounded-[6px] shrink-0">
                  <div className="flex gap-2.5 items-center justify-center relative shrink-0 w-full">
                    <div className="font-medium leading-[0] not-italic relative shrink-0 text-[#34c759] text-[12px] text-nowrap">
                      <p className="leading-[16px] whitespace-pre">Active</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div 
            className={`flex-1 px-6 pt-4 pb-6 overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out w-full max-w-full ${
              isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
          >
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-600 py-8">
                <p>{error}</p>
                <button 
                  onClick={() => useEmployeeDetailsStore.getState().clearError()}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            ) : (
              renderSectionContent()
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end p-6 border-t border-slate-200">
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-[#4b45e5] flex gap-1 items-center justify-center min-w-20 px-3 py-2 relative rounded-[6px] text-white font-medium text-[14px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Save changes'}
            </button>
          </div>
        </div>
        
        {/* Right Sidebar Navigation */}
        <div 
          className="bg-slate-50 flex flex-col gap-6 h-full items-center justify-start px-4 py-6 relative shrink-0 w-24 border-l border-slate-200"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onMouseUp={(e) => e.stopPropagation()}
        >
          <div className="absolute border-l border-[rgba(28,28,28,0.1)] inset-0 pointer-events-none" />
          
          {/* Profile - Active */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActiveSection('profile');
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            className={`flex flex-col gap-1 items-center justify-start p-1 relative shrink-0 ${
              activeSection === 'profile' ? 'bg-[rgba(75,69,229,0.05)] rounded-[4px]' : ''
            }`}
          >
            <div className="flex flex-col gap-2.5 items-start justify-start p-2 relative shrink-0">
              <UserCircle className="w-5 h-5" />
            </div>
            <div className={`font-medium leading-[0] not-italic relative shrink-0 text-[12px] text-nowrap ${
              activeSection === 'profile' ? 'text-[#1c1c1c]' : 'text-[rgba(28,28,28,0.6)]'
            }`}>
              <p className="leading-[18px] whitespace-pre">Profile</p>
            </div>
          </button>
          
          {/* Performance */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Setting active section to performance');
              setActiveSection('performance');
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            className={`flex flex-col gap-1 items-center justify-start relative shrink-0 ${
              activeSection === 'performance' ? 'bg-[rgba(75,69,229,0.05)] rounded-[4px] p-1' : ''
            }`}
          >
            <div className="flex flex-col gap-2.5 items-start justify-start p-2 relative shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div className={`font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-nowrap ${
              activeSection === 'performance' ? 'text-[#1c1c1c]' : 'text-[rgba(28,28,28,0.6)]'
            }`}>
              <p className="leading-[18px] whitespace-pre">Performance</p>
            </div>
          </button>
          
          {/* Documents */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActiveSection('documents');
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            className={`flex flex-col gap-1 items-center justify-start relative shrink-0 ${
              activeSection === 'documents' ? 'bg-[rgba(75,69,229,0.05)] rounded-[4px] p-1' : ''
            }`}
          >
            <div className="flex flex-col gap-2.5 items-start justify-start p-2 relative shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className={`font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-nowrap ${
              activeSection === 'documents' ? 'text-[#1c1c1c]' : 'text-[rgba(28,28,28,0.6)]'
            }`}>
              <p className="leading-[18px] whitespace-pre">Documents</p>
            </div>
          </button>
          
          {/* Admin */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActiveSection('admin');
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            className={`flex flex-col gap-1 items-center justify-start relative shrink-0 ${
              activeSection === 'admin' ? 'bg-[rgba(75,69,229,0.05)] rounded-[4px] p-1' : ''
            }`}
          >
            <div className="flex flex-col gap-2.5 items-start justify-start p-2 relative shrink-0">
              <Settings className="w-5 h-5" />
            </div>
            <div className={`font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-nowrap ${
              activeSection === 'admin' ? 'text-[#1c1c1c]' : 'text-[rgba(28,28,28,0.6)]'
            }`}>
              <p className="leading-[18px] whitespace-pre">Admin</p>
            </div>
          </button>
          
          {/* Updates */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActiveSection('updates');
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            className={`flex flex-col gap-1 items-center justify-start p-1 relative shrink-0 ${
              activeSection === 'updates' ? 'bg-[rgba(75,69,229,0.05)] rounded-[4px]' : ''
            }`}
          >
            <div className="flex flex-col gap-2.5 items-start justify-start p-2 relative shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className={`font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-nowrap ${
              activeSection === 'updates' ? 'text-[#1c1c1c]' : 'text-[rgba(28,28,28,0.6)]'
            }`}>
              <p className="leading-[18px] whitespace-pre">Updates</p>
            </div>
          </button>
        </div>
      </div>
      
      {/* Close Button */}
      <button 
        onClick={closeEmployeeDetails}
        className="absolute top-2.5 right-2.5 flex items-center justify-center p-1.5 rounded-[4px] hover:bg-slate-100 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </>
  );
};

export default EmployeeDetailsSidebar;
