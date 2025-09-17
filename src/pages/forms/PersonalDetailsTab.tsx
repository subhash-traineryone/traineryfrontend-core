"use client"

import React from 'react';
import { FormField } from './FormField';
import { ProfilePictureUpload } from './ProfilePictureUpload';
import { useEmployeeFormStore } from '../../stores/employeeFormStore';

interface PersonalDetailsTabProps {
  // No props needed - using Zustand store directly
}

const employmentTypes = ['Permanent', 'Contract', 'Intern', 'Part-time'];
const employmentStatuses = ['Active', 'In-active', 'On Leave'];
const genders = ['Male', 'Female', 'Other', 'Prefer not to say'];
const races = ['Asian', 'Black', 'Hispanic', 'White', 'Other', 'Prefer not to say'];
const locations = ['SF Bay, USA', 'New York, USA', 'London, UK', 'Mumbai, India', 'Athens, Greece'];

export const PersonalDetailsTab: React.FC<PersonalDetailsTabProps> = () => {
  const { formData, errors, updateField, updateFile } = useEmployeeFormStore();
  return (
    <div className="space-y-6">
      {/* Profile Picture */}
      <ProfilePictureUpload
        profilePicture={formData.profilePicture || null}
        onFileChange={(file) => updateFile('profilePicture', file)}
      />

      {/* Divider */}
      <div className="border-t border-slate-200"></div>

                  {/* Form Fields */}
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-4">Information</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <FormField
              label="Name"
              type="text"
              value={formData.name}
              onChange={(value) => updateField('name', value)}
              placeholder="Type here"
              error={errors.name}
            />

            <FormField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(value) => updateField('email', value)}
              placeholder="Type here"
              error={errors.email}
            />

            <FormField
              label="Employment Type"
              type="select"
              value={formData.employmentType}
              onChange={(value) => updateField('employmentType', value)}
              options={employmentTypes}
            />

            <FormField
              label="DOB"
              type="date"
              value={formData.dob}
              onChange={(value) => updateField('dob', value)}
              placeholder="Choose date"
            />

            <FormField
              label="Race"
              type="select"
              value={formData.race}
              onChange={(value) => updateField('race', value)}
              options={races}
              placeholder="Select"
            />

            <FormField
              label="Phone"
              type="tel"
              value={formData.phone}
              onChange={(value) => updateField('phone', value)}
              placeholder="+xx (xxx) xxx-xxxx"
              error={errors.phone}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <FormField
              label="Employee ID"
              type="text"
              value={formData.employeeId}
              onChange={(value) => updateField('employeeId', value)}
              placeholder="Type here"
              error={errors.employeeId}
            />

            <FormField
              label="Employment Status"
              type="select"
              value={formData.employmentStatus}
              onChange={(value) => updateField('employmentStatus', value)}
              options={employmentStatuses}
            />

            <FormField
              label="Gender"
              type="select"
              value={formData.gender}
              onChange={(value) => updateField('gender', value)}
              options={genders}
              placeholder="Select"
            />

            <FormField
              label="Location"
              type="select"
              value={formData.location}
              onChange={(value) => updateField('location', value)}
              options={locations}
              placeholder="Search"
            />

            <FormField
              label="Phone Ext."
              type="text"
              value={formData.phoneExt}
              onChange={(value) => updateField('phoneExt', value)}
              placeholder="xxxx"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
