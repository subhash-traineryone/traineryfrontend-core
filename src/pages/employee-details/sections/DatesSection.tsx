"use client"

import React, { useState, useRef } from 'react';
import { Edit2 } from 'lucide-react';
import { DatePicker } from '../../../components/ui/date-picker';
import { ConfirmationDialog } from '../../../components/common';
import type { EmployeeDetails } from '../../../stores/employeeDetailsStore';

interface DatesSectionProps {
  employee: EmployeeDetails;
  onEdit?: () => void;
  onUpdate?: (updates: Partial<EmployeeDetails>) => void;
}

export const DatesSection: React.FC<DatesSectionProps> = ({ 
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
      // For dates, we might not need to collect much data
      // Just update the lastLogin or add specific date fields
      if (onUpdate) {
        await onUpdate({ lastUpdated: new Date() });
      }
      
      setIsEditing(false);
      setShowConfirmDialog(false);
    } catch (error) {
      console.error('Error saving employee dates:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset any unsaved changes
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Dates</h3>
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
      <div ref={formRef} className="space-y-4">
        {/* Two Column Layout for Hire Date and Start Date */}
        <div className="flex gap-8">
          {/* Left Column - Hire Date */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <label className="text-xs text-slate-500 font-normal w-20">
                Hire Date
              </label>
              {isEditing ? (
                <DatePicker
                  value={_employee.lastLogin ? new Date(_employee.lastLogin) : undefined}
                  onChange={() => {}} // Placeholder for actual update logic
                  placeholder="Choose date"
                  className="h-8 text-xs w-48"
                />
              ) : (
                <div className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 rounded-2xl">
                  {_employee.lastLogin || '21 Sept 2025, 11:55:42 pm'}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Start Date */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <label className="text-xs text-slate-500 font-normal w-20">
                Start Date
              </label>
              {isEditing ? (
                <DatePicker
                  value={_employee.lastLogin ? new Date(_employee.lastLogin) : undefined}
                  onChange={() => {}} // Placeholder for actual update logic
                  placeholder="Choose date"
                  className="h-8 text-xs w-48"
                />
              ) : (
                <div className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 rounded-2xl">
                  {_employee.lastLogin || '21 Sept 2025, 11:55:42 pm'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Position Date - Aligned with left column */}
        <div className="flex gap-8">
          {/* Left Column - Position Date */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <label className="text-xs text-slate-500 font-normal w-20">
                Position Date
              </label>
              {isEditing ? (
                <DatePicker
                  value={_employee.lastLogin ? new Date(_employee.lastLogin) : undefined}
                  onChange={() => {}} // Placeholder for actual update logic
                  placeholder="Choose date"
                  className="h-8 text-xs w-48"
                />
              ) : (
                <div className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 rounded-2xl">
                  {_employee.lastLogin || '21 Sept 2025, 11:55:42 pm'}
                </div>
              )}
            </div>
          </div>
          {/* Empty right column for alignment */}
          <div className="flex-1"></div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmSave}
        title="Save Changes"
        message="Are you sure you want to save the changes to this employee's dates?"
        confirmText="Save Changes"
        cancelText="Cancel"
        type="info"
        isLoading={isSaving}
      />
    </div>
  );
};
