"use client"

import React, { useState } from 'react';
import { Edit2, Plus, Trash2 } from 'lucide-react';

interface EducationEntry {
  id: string;
  organisation: string;
  education: string;
  degree: string;
  year: string;
}

interface EducationProfileSectionProps {
  employee: any;
  onUpdate?: (data: any) => void;
}

const EducationProfileSection: React.FC<EducationProfileSectionProps> = ({
  employee: _employee,
  onUpdate: _onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [educationEntries, setEducationEntries] = useState<EducationEntry[]>([
    {
      id: '1',
      organisation: 'DAV School',
      education: 'CBSE 12th Boards',
      degree: 'AISSCE',
      year: '2015'
    },
    {
      id: '2',
      organisation: 'VIT Vellore',
      education: 'Undergraduation',
      degree: 'B.tech',
      year: '2020'
    },
    {
      id: '3',
      organisation: 'VIT Vellore',
      education: 'Masters',
      degree: 'MBA',
      year: '2022'
    }
  ]);

  const handleAddEducation = () => {
    const newEntry: EducationEntry = {
      id: Date.now().toString(),
      organisation: '',
      education: '',
      degree: '',
      year: ''
    };
    setEducationEntries([...educationEntries, newEntry]);
  };

  const handleRemoveEducation = (id: string) => {
    if (educationEntries.length > 1) {
      setEducationEntries(educationEntries.filter(entry => entry.id !== id));
    }
  };

  const handleUpdateEducation = (id: string, field: keyof EducationEntry, value: string) => {
    setEducationEntries(educationEntries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const Separator = () => (
    <div className="w-full h-px bg-slate-200" />
  );

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Education</h3>
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Education Entries */}
      <div className="space-y-6">
        {educationEntries.map((entry, index) => (
          <div key={entry.id}>
            {/* Education Entry */}
            <div className="flex gap-8">
              {/* Left Column - Education Details */}
              <div className="flex-1 space-y-3">
                <h4 className="text-sm font-medium text-slate-900">
                  Education Details {index + 1}
                </h4>
                <div className="space-y-2">
                  {/* Organisation */}
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-slate-500 font-normal">
                      Organisation
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={entry.organisation}
                        onChange={(e) => handleUpdateEducation(entry.id, 'organisation', e.target.value)}
                        className="px-2 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter organisation"
                      />
                    ) : (
                      <div className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 rounded-2xl">
                        {entry.organisation}
                      </div>
                    )}
                  </div>

                  {/* Education */}
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-slate-500 font-normal">
                      Education
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={entry.education}
                        onChange={(e) => handleUpdateEducation(entry.id, 'education', e.target.value)}
                        className="px-2 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter education"
                      />
                    ) : (
                      <div className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 rounded-2xl">
                        {entry.education}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Job Details */}
              <div className="flex-1 space-y-3">
                <h4 className="text-sm font-medium text-slate-900 opacity-0">
                  Job Details
                </h4>
                <div className="space-y-2">
                  {/* Degree */}
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-slate-500 font-normal">
                      Degree
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={entry.degree}
                        onChange={(e) => handleUpdateEducation(entry.id, 'degree', e.target.value)}
                        className="px-2 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter degree"
                      />
                    ) : (
                      <div className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 rounded-2xl">
                        {entry.degree}
                      </div>
                    )}
                  </div>

                  {/* Year */}
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-slate-500 font-normal">
                      Year
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={entry.year}
                        onChange={(e) => handleUpdateEducation(entry.id, 'year', e.target.value)}
                        className="px-2 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter year"
                      />
                    ) : (
                      <div className="px-2 py-1.5 text-xs text-slate-900 bg-slate-50 rounded-2xl">
                        {entry.year}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons for Editing */}
            {isEditing && (
              <div className="flex items-center justify-end gap-2 mt-3">
                {educationEntries.length > 1 && (
                  <button
                    onClick={() => handleRemoveEducation(entry.id)}
                    className="flex items-center gap-1 px-2 py-1 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    Remove
                  </button>
                )}
              </div>
            )}

            {/* Separator */}
            {index < educationEntries.length - 1 && (
              <div className="mt-6">
                <Separator />
              </div>
            )}
          </div>
        ))}

        {/* Add Education Button */}
        {isEditing && (
          <div className="flex justify-center pt-4">
            <button
              onClick={handleAddEducation}
              className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors border border-blue-200"
            >
              <Plus className="w-4 h-4" />
              Add Education
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationProfileSection;
