"use client"

import React from 'react';
import { FormField } from './FormField';
import { useEmployeeFormStore } from '../../stores/employeeFormStore';

interface JobDetailsTabProps {
  // No props needed - using Zustand store directly
}

const jobCodes = ['Permanent', 'Contract', 'Intern', 'Part-time', 'Temporary'];
const eeocCategories = ['Active', 'In-active', 'On Leave', 'Terminated'];
const reportingToTitles = ['Manager', 'Director', 'VP', 'C-Level', 'Team Lead'];
const workRoles = ['Individual Contributor', 'Manager', 'Director', 'VP', 'C-Level'];
const traineryContacts = ['Yes', 'No'];
const entities = ['Finance', 'Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'HR', 'Operations'];
const divisions = ['Accounts Payable', 'Accounts Receivable', 'General Ledger', 'Treasury', 'Tax', 'Audit'];
const branches = ['AP Manager', 'AR Manager', 'GL Manager', 'Treasury Manager', 'Tax Manager', 'Audit Manager'];
const managers = ['John Smith', 'Sarah Johnson', 'Mike Chen', 'Emily Davis', 'David Wilson'];
const hrPartners = ['Lisa Brown', 'Tom Anderson', 'Maria Garcia', 'James Taylor'];

export const JobDetailsTab: React.FC<JobDetailsTabProps> = () => {
  const { formData, updateField, updateFile, errors } = useEmployeeFormStore();
  return (
    <div className="space-y-8">
                  {/* Position Information Section */}
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-4">Position Information</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <FormField
              label="Title"
              type="text"
              value={formData.title}
              onChange={(value) => updateField('title', value)}
              placeholder="Type here"
              error={errors.title}
            />

            <FormField
              label="Position Description"
              type="file"
              value=""
              onChange={() => {}}
              fileAccept=".pdf,.doc,.docx"
              fileLabel="Choose file"
              fileName={formData.positionDescription ? formData.positionDescription.name : 'No file chosen'}
              onFileChange={(file) => updateFile('positionDescription', file)}
            />

            <FormField
              label="Job Grade"
              type="text"
              value={formData.jobGrade}
              onChange={(value) => updateField('jobGrade', value)}
              placeholder="Type here"
              error={errors.jobGrade}
            />

            <FormField
              label="Job Code"
              type="select"
              value={formData.jobCode}
              onChange={(value) => updateField('jobCode', value)}
              options={jobCodes}
            />

            <FormField
              label="EEOC Category"
              type="select"
              value={formData.eeocCategory}
              onChange={(value) => updateField('eeocCategory', value)}
              options={eeocCategories}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <FormField
              label="Reporting To Title"
              type="select"
              value={formData.reportingToTitle}
              onChange={(value) => updateField('reportingToTitle', value)}
              options={reportingToTitles}
              placeholder="Select"
            />

            <FormField
              label="Work Roles"
              type="select"
              value={formData.workRoles}
              onChange={(value) => updateField('workRoles', value)}
              options={workRoles}
              placeholder="Select"
            />

            <FormField
              label="Standard hr/wk"
              type="text"
              value={formData.standardHrPerWeek}
              onChange={(value) => updateField('standardHrPerWeek', value)}
              placeholder="40"
              error={errors.standardHrPerWeek}
            />

            <FormField
              label="Trainery Contact"
              type="select"
              value={formData.traineryContact}
              onChange={(value) => updateField('traineryContact', value)}
              options={traineryContacts}
            />
          </div>
        </div>
      </div>

                  {/* Organisation Section */}
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-4">Organisation</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <FormField
              label="Entity"
              type="select"
              value={formData.entity}
              onChange={(value) => updateField('entity', value)}
              options={entities}
            />

            <FormField
              label="Division"
              type="select"
              value={formData.division}
              onChange={(value) => updateField('division', value)}
              options={divisions}
            />

            <FormField
              label="Branch"
              type="select"
              value={formData.branch}
              onChange={(value) => updateField('branch', value)}
              options={branches}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <FormField
              label="Manager"
              type="select"
              value={formData.manager}
              onChange={(value) => updateField('manager', value)}
              options={managers}
              placeholder="Select"
            />

            <FormField
              label="Secondary Manager"
              type="select"
              value={formData.secondaryManager}
              onChange={(value) => updateField('secondaryManager', value)}
              options={managers}
              placeholder="Select"
            />

            <FormField
              label="HR Partner"
              type="select"
              value={formData.hrPartner}
              onChange={(value) => updateField('hrPartner', value)}
              options={hrPartners}
              placeholder="Select"
            />
          </div>
        </div>
      </div>

                  {/* Dates Section */}
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-4">Dates</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <FormField
              label="Hire Date"
              type="date"
              value={formData.hireDate}
              onChange={(value) => updateField('hireDate', value)}
              placeholder="Choose date"
            />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <FormField
              label="Start Date"
              type="date"
              value={formData.startDate}
              onChange={(value) => updateField('startDate', value)}
              placeholder="Choose date"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
