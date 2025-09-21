"use client"

import React, { useState, useRef } from 'react';
import { Edit2, ChevronsUpDown } from 'lucide-react';
import { ConfirmationDialog } from '../../../components/common';
import type { EmployeeDetails } from '../../../stores/employeeDetailsStore';

interface JobDetailsSectionProps {
  employee: EmployeeDetails;
  onEdit?: () => void;
  onUpdate?: (updates: Partial<EmployeeDetails>) => void;
}

// Dropdown options from the add employee form
const jobCodes = ['Permanent', 'Contract', 'Intern', 'Part-time', 'Temporary'];
const eeocCategories = ['Active', 'In-active', 'On Leave', 'Terminated'];
const traineryContacts = ['Yes', 'No'];
const entities = ['Finance', 'Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'HR', 'Operations'];
const divisions = ['Accounts Payable', 'Accounts Receivable', 'General Ledger', 'Treasury', 'Tax', 'Audit'];
const branches = ['AP Manager', 'AR Manager', 'GL Manager', 'Treasury Manager', 'Tax Manager', 'Audit Manager'];
const managers = ['John Smith', 'Sarah Johnson', 'Mike Chen', 'Emily Davis', 'David Wilson'];
const hrPartners = ['Lisa Brown', 'Tom Anderson', 'Maria Garcia', 'James Taylor'];

export const JobDetailsSection: React.FC<JobDetailsSectionProps> = ({ 
  employee, 
  onEdit: _onEdit,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmSave = async () => {
    setIsSaving(true);
    try {
      // Collect form data
      const formData = collectFormData();
      
      // Update employee data
      if (onUpdate) {
        await onUpdate(formData);
      }
      
      setIsEditing(false);
      setShowConfirmDialog(false);
    } catch (error) {
      console.error('Error saving employee data:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset any unsaved changes
  };

  const collectFormData = (): Partial<EmployeeDetails> => {
    if (!formRef.current) return {};
    
    const formData: Partial<EmployeeDetails> = {};
    const form = formRef.current;
    
    // Collect all input values
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach((input) => {
      const element = input as HTMLInputElement | HTMLSelectElement;
      const name = element.name || element.id;
      const value = element.value;
      
      if (name && value) {
        // Map form field names to employee properties
        switch (name) {
          case 'title':
            formData.jobTitle = value;
            break;
          case 'position':
            formData.jobTitle = value; // Assuming position maps to jobTitle
            break;
          case 'jobGrade':
            formData.grade = value;
            break;
          case 'jobCode':
            formData.empId = value; // Assuming jobCode maps to empId
            break;
          case 'eeocCategory':
            formData.department = value; // Assuming EEOC maps to department
            break;
          case 'standardHours':
            // This might need special handling
            break;
          case 'traineryContact':
            formData.source = value === 'Yes' ? 'Internal' : 'External';
            break;
          case 'entity':
            formData.department = value;
            break;
          case 'division':
            formData.department = value;
            break;
          case 'branch':
            formData.location = value;
            break;
          case 'manager':
            formData.manager = value;
            break;
          case 'secondaryManager':
            // Handle secondary manager if needed
            break;
          case 'hrPartner':
            formData.hrPartner = value;
            break;
        }
      }
    });
    
    return formData;
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Job Details</h3>
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                className="px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div ref={formRef} className="flex gap-8">
        {/* Left Column - Job Details */}
        <div className="flex-1 space-y-3">
          <div className="space-y-2">
            {/* Title */}
            <div className="flex items-center justify-between">
              <label className="text-xs text-slate-500 font-normal">
                Title
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="title"
                  defaultValue={employee.jobTitle || 'Chief Executive Officer'}
                  className="px-2 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter job title"
                />
              ) : (
                <div className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 rounded-2xl">
                  {employee.jobTitle || 'Chief Executive Officer'}
                </div>
              )}
            </div>
          
            {/* Position */}
            <div className="flex items-center justify-between">
              <label className="text-xs text-slate-500 font-normal">
                Position
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="position"
                  defaultValue={employee.jobTitle || 'Chief Executive Officer'}
                  className="px-2 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter position"
                />
              ) : (
                <div className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 rounded-2xl">
                  {employee.jobTitle || 'Chief Executive Officer'}
                </div>
              )}
            </div>
          
            {/* Job Grade */}
            <div className="flex items-center justify-between">
              <label className="text-xs text-slate-500 font-normal">
                Job Grade
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="jobGrade"
                  defaultValue={employee.grade || 'A'}
                  className="px-2 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter job grade"
                />
              ) : (
                <div className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 rounded-2xl">
                  {employee.grade || 'A'}
                </div>
              )}
            </div>
          
            {/* Job Code */}
            <div className="flex items-center justify-between">
              <label className="text-xs text-slate-500 font-normal">
                Job Code
              </label>
              {isEditing ? (
                <div className="relative">
                  <select
                    name="jobCode"
                    defaultValue="Permanent"
                    className="px-2 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                  >
                    {jobCodes.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronsUpDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              ) : (
                <div className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 rounded-2xl">
                  Permanent
                </div>
              )}
            </div>
          
            {/* EEOC Category */}
            <div className="flex items-center justify-between">
              <label className="text-xs text-slate-500 font-normal">
                EEOC Category
              </label>
              {isEditing ? (
                <div className="relative">
                  <select
                    defaultValue="Active"
                    className="px-2 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                  >
                    {eeocCategories.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronsUpDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              ) : (
                <div className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 rounded-2xl">
                  Active
                </div>
              )}
            </div>
          
            {/* Standard Hours */}
            <div className="flex items-center justify-between">
              <label className="text-xs text-slate-500 font-normal">
                Standard Hours
              </label>
              {isEditing ? (
                <input
                  type="number"
                  defaultValue="40"
                  className="px-2 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter standard hours"
                />
              ) : (
                <div className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 rounded-2xl">
                  40
                </div>
              )}
            </div>
          
            {/* Trainery Contact */}
            <div className="flex items-center justify-between">
              <label className="text-xs text-slate-500 font-normal">
                Trainery Contact
              </label>
              {isEditing ? (
                <div className="relative">
                  <select
                    defaultValue={employee.source === 'Internal' ? 'Yes' : 'No'}
                    className="px-2 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                  >
                    {traineryContacts.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronsUpDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              ) : (
                <div className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 rounded-2xl">
                  {employee.source === 'Internal' ? 'Yes' : 'No'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Organization Details */}
        <div className="flex-1 space-y-3">
          <div className="space-y-2">
            {/* Entity */}
            <div className="flex items-center justify-between">
              <label className="text-xs text-slate-500 font-normal">
                Entity
              </label>
              {isEditing ? (
                <div className="relative">
                  <select
                    defaultValue="Finance"
                    className="px-2 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                  >
                    {entities.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronsUpDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              ) : (
                <div className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 rounded-2xl">
                  Finance
                </div>
              )}
            </div>
          
            {/* Division */}
            <div className="flex items-center justify-between">
              <label className="text-xs text-slate-500 font-normal">
                Division
              </label>
              {isEditing ? (
                <div className="relative">
                  <select
                    defaultValue="General Ledger"
                    className="px-2 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                  >
                    {divisions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronsUpDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              ) : (
                <div className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 rounded-2xl">
                  General Ledger
                </div>
              )}
            </div>
          
            {/* Branch */}
            <div className="flex items-center justify-between">
              <label className="text-xs text-slate-500 font-normal">
                Branch
              </label>
              {isEditing ? (
                <div className="relative">
                  <select
                    defaultValue="GL Manager"
                    className="px-2 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                  >
                    {branches.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronsUpDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              ) : (
                <div className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 rounded-2xl">
                  GL Manager
                </div>
              )}
            </div>
          
            {/* Manager */}
            <div className="flex items-center justify-between">
              <label className="text-xs text-slate-500 font-normal">
                Manager
              </label>
              {isEditing ? (
                <div className="flex gap-2 items-center">
                  <div className="w-5 h-5 bg-[#baedbd] rounded-full flex items-center justify-center">
                    <span className="text-[10px] text-[#1c1c1c] font-normal">J</span>
                  </div>
                  <div className="relative">
                    <select
                      defaultValue="John Smith"
                      className="px-2 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                    >
                      {managers.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronsUpDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <div className="w-5 h-5 bg-[#baedbd] rounded-full flex items-center justify-center">
                    <span className="text-[10px] text-[#1c1c1c] font-normal">J</span>
                  </div>
                  <div className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 rounded-2xl">
                    John Smith
                  </div>
                </div>
              )}
            </div>
          
            {/* Secondary Manager */}
            <div className="flex items-center justify-between">
              <label className="text-xs text-slate-500 font-normal">
                Secondary Manager
              </label>
              {isEditing ? (
                <div className="flex gap-2 items-center">
                  <div className="w-5 h-5 bg-[#b1e3ff] rounded-full flex items-center justify-center">
                    <span className="text-[10px] text-[#1c1c1c] font-normal">-</span>
                  </div>
                  <div className="relative">
                    <select
                      defaultValue=""
                      className="px-2 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                    >
                      <option value="">-</option>
                      {managers.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronsUpDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <div className="w-5 h-5 bg-[#b1e3ff] rounded-full flex items-center justify-center">
                    <span className="text-[10px] text-[#1c1c1c] font-normal">-</span>
                  </div>
                  <div className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 rounded-2xl">
                    -
                  </div>
                </div>
              )}
            </div>
          
            {/* HR Partner */}
            <div className="flex items-center justify-between">
              <label className="text-xs text-slate-500 font-normal">
                HR Partner
              </label>
              {isEditing ? (
                <div className="flex gap-2 items-center">
                  <div className="w-5 h-5 bg-[#c6c7f8] rounded-full flex items-center justify-center">
                    <span className="text-[10px] text-[#1c1c1c] font-normal">L</span>
                  </div>
                  <div className="relative">
                    <select
                      defaultValue="Lisa Brown"
                      className="px-2 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                    >
                      {hrPartners.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronsUpDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <div className="w-5 h-5 bg-[#c6c7f8] rounded-full flex items-center justify-center">
                    <span className="text-[10px] text-[#1c1c1c] font-normal">L</span>
                  </div>
                  <div className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 rounded-2xl">
                    Lisa Brown
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmSave}
        title="Save Changes"
        message="Are you sure you want to save the changes to this employee's job details?"
        confirmText="Save Changes"
        cancelText="Cancel"
        type="info"
        isLoading={isSaving}
      />
    </div>
  );
};
