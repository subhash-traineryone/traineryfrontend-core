"use client"

import React, { useState } from 'react';
import { Edit2, Save, X, StickyNote } from 'lucide-react';
import type { EmployeeDetails } from '../../stores/employeeDetailsStore';

interface NotesSectionProps {
  employee: EmployeeDetails;
  onUpdate: (updates: Partial<EmployeeDetails>) => void;
}

export const NotesSection: React.FC<NotesSectionProps> = ({ 
  employee, 
  onUpdate 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(employee.notes || '');

  const handleSave = () => {
    onUpdate({ notes });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNotes(employee.notes || '');
    setIsEditing(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <StickyNote className="w-5 h-5 text-slate-500" />
          <h3 className="text-lg font-semibold text-slate-900">Notes</h3>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-green-600 hover:bg-green-50 rounded-md transition-colors"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div>
        {isEditing ? (
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Add notes about this employee..."
          />
        ) : (
          <div className="min-h-[120px] p-4 bg-slate-50 rounded-md">
            {notes ? (
              <p className="text-slate-900 whitespace-pre-wrap">{notes}</p>
            ) : (
              <p className="text-slate-500 italic">No notes added yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};