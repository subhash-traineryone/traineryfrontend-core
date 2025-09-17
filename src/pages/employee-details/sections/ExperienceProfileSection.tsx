import React, { useState } from 'react';
import { Edit2, Save, X, Plus, Trash2 } from 'lucide-react';
import { useEmployeeDetailsStore } from '../../../stores/employeeDetailsStore';

interface ExperienceEntry {
  id: string;
  organisation: string;
  startDate: string;
  jobTitle: string;
  endDate: string;
}

interface ExperienceProfileSectionProps {
  employee?: any;
  onUpdate?: (data: any) => void;
}

const ExperienceProfileSection: React.FC<ExperienceProfileSectionProps> = ({ 
  employee: _employee, 
  onUpdate: _onUpdate 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { selectedEmployee, updatePersonalInfo, addExperience, removeExperience } = useEmployeeDetailsStore();
  
  const experienceEntries = selectedEmployee?.experiences || [];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to your store/API
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset any unsaved changes
  };

  const handleAddExperience = async () => {
    const newEntry: ExperienceEntry = {
      id: Date.now().toString(),
      organisation: '',
      startDate: '',
      jobTitle: '',
      endDate: ''
    };
    await addExperience(newEntry);
  };

  const handleRemoveExperience = async (id: string) => {
    if (experienceEntries.length > 1) {
      await removeExperience(id);
    }
  };

  const handleUpdateExperience = async (id: string, field: keyof ExperienceEntry, value: string) => {
    const updatedExperiences = experienceEntries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    );
    await updatePersonalInfo({ experiences: updatedExperiences });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Experience</h3>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Experience Entries */}
      <div className="space-y-6">
        {experienceEntries.map((entry, index) => (
          <div key={entry.id} className="space-y-4">
            {/* Separator for multiple entries */}
            {index > 0 && (
              <div className="border-t border-slate-200 pt-4">
                <div className="h-px bg-slate-200 w-full" />
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Experience Details */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-slate-900">
                  Experience Details {index + 1}
                </h4>
                <div className="space-y-2">
                  {/* Organisation */}
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-slate-500">Organisation</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={entry.organisation}
                        onChange={(e) => handleUpdateExperience(entry.id, 'organisation', e.target.value)}
                        className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 rounded-md">
                        {entry.organisation}
                      </div>
                    )}
                  </div>

                  {/* Start Date */}
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-slate-500">Start Date</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={entry.startDate}
                        onChange={(e) => handleUpdateExperience(entry.id, 'startDate', e.target.value)}
                        className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 rounded-md">
                        {entry.startDate}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Job Details */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-slate-900 opacity-0">
                  Job Details
                </h4>
                <div className="space-y-2">
                  {/* Job Title */}
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-slate-500">Job Title</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={entry.jobTitle}
                        onChange={(e) => handleUpdateExperience(entry.id, 'jobTitle', e.target.value)}
                        className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 rounded-md">
                        {entry.jobTitle}
                      </div>
                    )}
                  </div>

                  {/* End Date */}
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-slate-500">End Date</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={entry.endDate}
                        onChange={(e) => handleUpdateExperience(entry.id, 'endDate', e.target.value)}
                        className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 rounded-md">
                        {entry.endDate}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Remove button for multiple entries */}
            {isEditing && experienceEntries.length > 1 && (
              <div className="flex justify-end">
                <button
                  onClick={() => handleRemoveExperience(entry.id)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove Experience
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Experience Button */}
      {isEditing && (
        <div className="flex justify-start">
          <button
            onClick={handleAddExperience}
            className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Experience
          </button>
        </div>
      )}
    </div>
  );
};

export default ExperienceProfileSection;
