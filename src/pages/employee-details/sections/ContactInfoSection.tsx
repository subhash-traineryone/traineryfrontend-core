"use client"

import React, { useState, useRef } from 'react';
import { Copy, Edit2 } from 'lucide-react';
import { ConfirmationDialog } from '../../../components/common';
import type { EmployeeDetails } from '../../../stores/employeeDetailsStore';

interface ContactInfoSectionProps {
  employee: EmployeeDetails;
  onEdit?: () => void;
  onUpdate?: (updates: Partial<EmployeeDetails>) => void;
}

export const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({ 
  employee: _employee, 
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
      // Collect form data for contact info
      const formData = collectFormData();
      
      if (onUpdate) {
        await onUpdate(formData);
      }
      
      setIsEditing(false);
      setShowConfirmDialog(false);
    } catch (error) {
      console.error('Error saving contact info:', error);
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
    
    // Collect phone and email
    const phoneInput = form.querySelector('input[name="phone"]') as HTMLInputElement;
    const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;
    
    if (phoneInput?.value) {
      formData.phone = phoneInput.value;
    }
    if (emailInput?.value) {
      formData.email = emailInput.value;
    }
    
    return formData;
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Contact Information</h3>
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
        {/* Left Column */}
        <div className="flex-1 space-y-3">
          <div className="space-y-2">
            {/* Phone Number */}
            <div className="flex items-center justify-between">
              <label className="text-xs text-slate-500 font-normal">
                Phone Number
              </label>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    defaultValue={_employee.phone || '+1 (555) 123-4567'}
                    className="px-2 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+xx (xxx) xxx-xxxx"
                  />
                ) : (
                  <div className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 rounded-2xl">
                    {_employee.phone || '+1 (555) 123-4567'}
                  </div>
                )}
                <Copy className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 space-y-3">
          <div className="space-y-2">
            {/* Email */}
            <div className="flex items-center justify-between">
              <label className="text-xs text-slate-500 font-normal">
                Email
              </label>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    defaultValue={_employee.email || 'jean.armstrong@email.com'}
                    className="px-2 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                ) : (
                  <div className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 rounded-2xl">
                    {_employee.email || 'jean.armstrong@email.com'}
                  </div>
                )}
                <Copy className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-pointer" />
              </div>
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
        message="Are you sure you want to save the changes to this employee's contact information?"
        confirmText="Save Changes"
        cancelText="Cancel"
        type="info"
        isLoading={isSaving}
      />
    </div>
  );
};
