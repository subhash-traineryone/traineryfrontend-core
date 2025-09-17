"use client"

import React from 'react';
import { FormField } from './FormField';
import { useEmployeeFormStore } from '../../stores/employeeFormStore';
import { Plus, Trash2 } from 'lucide-react';

interface ExperienceTabProps {
  // No props needed - using Zustand store directly
}

export const ExperienceTab: React.FC<ExperienceTabProps> = () => {
  const { formData, addExperience, removeExperience, updateExperience, updateField, errors } = useEmployeeFormStore();

  return (
    <div className="space-y-8">
      {/* Total Years of Experience - Single Line */}
      <div>
        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-600 whitespace-nowrap">Total Years of experience</label>
          <input
            type="text"
            value={formData.totalYearsOfExperience}
            onChange={(e) => updateField('totalYearsOfExperience', e.target.value)}
            placeholder="eg - 3.5"
            className={`px-3 py-2 border rounded-md text-sm w-64 ${
              errors.totalYearsOfExperience ? 'border-red-500' : 'border-slate-200'
            }`}
          />
        </div>
        {errors.totalYearsOfExperience && (
          <p className="text-xs text-red-500 mt-1">{errors.totalYearsOfExperience}</p>
        )}
      </div>

      {/* Experience Entries */}
      {formData.experiences.map((experience, index) => (
        <div key={experience.id}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-700">
              Experience {index + 1}
            </h3>
            {formData.experiences.length > 1 && (
              <button
                onClick={() => removeExperience(experience.id)}
                className="p-1 text-red-500 hover:text-red-700 transition-colors"
                type="button"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <FormField
                label="Company"
                type="text"
                value={experience.company}
                onChange={(value) => updateExperience(experience.id, 'company', value)}
                placeholder="Type here"
                error={errors[`experience_${index}_company`]}
              />

              <FormField
                label="Position"
                type="text"
                value={experience.position}
                onChange={(value) => updateExperience(experience.id, 'position', value)}
                placeholder="Type here"
                error={errors[`experience_${index}_position`]}
              />

              <FormField
                label="Start Date"
                type="date"
                value={experience.startDate}
                onChange={(value) => updateExperience(experience.id, 'startDate', value)}
                placeholder="Choose date"
                error={errors[`experience_${index}_startDate`]}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <FormField
                label="End Date"
                type="date"
                value={experience.endDate}
                onChange={(value) => updateExperience(experience.id, 'endDate', value)}
                placeholder="Choose date"
                error={errors[`experience_${index}_endDate`]}
              />

              <div className="flex items-start justify-between">
                <label className="text-xs text-slate-600 w-24 pt-2">Description</label>
                <div className="flex-1 max-w-[228px]">
                  <textarea
                    value={experience.description}
                    onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                    placeholder="Type here"
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Add Experience Button */}
      <div className="flex justify-start">
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors"
          type="button"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>
    </div>
  );
};
