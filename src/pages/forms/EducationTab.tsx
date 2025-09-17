"use client"

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { FormField } from './FormField';
import { useEmployeeFormStore } from '../../stores/employeeFormStore';

interface EducationTabProps {
  // No props needed - using Zustand store directly
}

export const EducationTab: React.FC<EducationTabProps> = () => {
  const { formData, addEducation, removeEducation, updateEducation, errors } = useEmployeeFormStore();

  return (
    <div className="space-y-8">
      {/* Education Entries */}
      {formData.educations.map((education, index) => (
        <div key={education.id}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-700">
              Education {index + 1}
            </h3>
            {formData.educations.length > 1 && (
              <button
                onClick={() => removeEducation(education.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
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
                label="University"
                type="text"
                value={education.university}
                onChange={(value) => updateEducation(education.id, 'university', value as string)}
                placeholder="Type here"
                error={errors[`education_${index}_university`]}
              />

              <FormField
                label="Education"
                type="text"
                value={education.education}
                onChange={(value) => updateEducation(education.id, 'education', value as string)}
                placeholder="eg - undergraduation"
                error={errors[`education_${index}_education`]}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <FormField
                label="Degree"
                type="text"
                value={education.degree}
                onChange={(value) => updateEducation(education.id, 'degree', value as string)}
                placeholder="Type here"
                error={errors[`education_${index}_degree`]}
              />

              <FormField
                label="Year"
                type="text"
                value={education.year}
                onChange={(value) => updateEducation(education.id, 'year', value as string)}
                placeholder="Passing out year (YYYY)"
                error={errors[`education_${index}_year`]}
              />
            </div>
          </div>
        </div>
      ))}

      {/* Add Education Button */}
      <div className="flex justify-start">
        <button
          onClick={addEducation}
          type="button"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-200 rounded-md hover:bg-indigo-50 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>
    </div>
  );
};
