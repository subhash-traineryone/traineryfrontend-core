import React, { useState } from 'react';
import { useEmployeeDetailsStore } from '../../stores/employeeDetailsStore';
import { Lock, Mail, Edit, Plus, Trash2 } from 'lucide-react';

interface AdminSectionProps {
  employee: any;
}

const AdminSection: React.FC<AdminSectionProps> = ({ employee }) => {
  const { updateAdminSettingsDirect, addRole, removeRole } = useEmployeeDetailsStore();
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [newRole, setNewRole] = useState({ application: '', role: '' });

  const handleSendPasswordMail = () => {
    if (!employee?.adminSettings) return;
    
    const newPasswordEntry = {
      id: Date.now().toString(),
      date: new Date(),
      action: 'Password reset email sent',
      sentBy: 'Current User'
    };

    updateAdminSettingsDirect({
      ...employee.adminSettings,
      passwordManager: {
        ...employee.adminSettings.passwordManager,
        lastUpdated: new Date(),
        passwordHistory: [...employee.adminSettings.passwordManager.passwordHistory, newPasswordEntry]
      }
    });
  };

  const handleSendWelcomeMail = () => {
    if (!employee?.adminSettings) return;
    
    const newWelcomeEntry = {
      id: Date.now().toString(),
      date: new Date(),
      action: 'Welcome email sent',
      sentBy: 'Current User'
    };

    updateAdminSettingsDirect({
      ...employee.adminSettings,
      accessManager: {
        ...employee.adminSettings.accessManager,
        welcomeMailHistory: [...employee.adminSettings.accessManager.welcomeMailHistory, newWelcomeEntry]
      }
    });
  };

  const handleToggleSystemAccess = () => {
    if (!employee?.adminSettings) return;
    
    updateAdminSettingsDirect({
      ...employee.adminSettings,
      accessManager: {
        ...employee.adminSettings.accessManager,
        systemAccess: !employee.adminSettings.accessManager.systemAccess
      }
    });
  };

  const handleAddRole = () => {
    if (!newRole.application || !newRole.role) return;
    
    addRole({
      application: newRole.application,
      role: newRole.role,
      assignedBy: 'Current User',
      assignedDate: new Date()
    });
    
    setNewRole({ application: '', role: '' });
    setIsAddingRole(false);
  };

  const handleRemoveRole = (roleId: string) => {
    removeRole(roleId);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(date);
  };

  if (!employee?.adminSettings) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500">No admin settings available</div>
      </div>
    );
  }

  const { passwordManager, accessManager, roles } = employee.adminSettings;

  return (
    <div className="p-6 space-y-6">
      {/* Password Manager Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900">Password Manager</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Last Updated</span>
            <div className="px-2 py-1 bg-gray-50 rounded-2xl">
              <span className="text-xs text-gray-900">
                {formatDate(passwordManager.lastUpdated)}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleSendPasswordMail}
              className="flex items-center gap-1 px-3 py-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Lock className="w-4 h-4" />
              <span className="text-sm font-medium text-gray-900">Send forgot password mail</span>
            </button>
            <button className="text-sm font-medium text-blue-600 underline hover:text-blue-700">
              History of password mails sent
            </button>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="border-t border-gray-200"></div>

      {/* Access Manager Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900">Access Manager</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between w-48">
            <span className="text-xs text-gray-500">System Access</span>
            <button
              onClick={handleToggleSystemAccess}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                accessManager.systemAccess ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  accessManager.systemAccess ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleSendWelcomeMail}
              className="flex items-center gap-1 px-3 py-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm font-medium text-gray-900">Send welcome mail</span>
            </button>
            <button className="text-sm font-medium text-blue-600 underline hover:text-blue-700">
              History of welcome mails sent
            </button>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="border-t border-gray-200"></div>

      {/* Roles Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">Roles ({roles.length})</h3>
          <button
            onClick={() => setIsAddingRole(true)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Role
          </button>
        </div>

        {/* Add Role Form */}
        {isAddingRole && (
          <div className="p-4 bg-gray-50 rounded-md space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Application"
                value={newRole.application}
                onChange={(e) => setNewRole({ ...newRole, application: e.target.value })}
                className="px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Role"
                value={newRole.role}
                onChange={(e) => setNewRole({ ...newRole, role: e.target.value })}
                className="px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddRole}
                className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setIsAddingRole(false);
                  setNewRole({ application: '', role: '' });
                }}
                className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Roles Table */}
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-3 gap-4 px-3 py-2">
              <div className="text-xs font-medium text-gray-500">Application</div>
              <div className="text-xs font-medium text-gray-500">Roles</div>
              <div className="text-xs font-medium text-gray-500"></div>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {roles.map((role: any) => (
              <div key={role.id} className="grid grid-cols-3 gap-4 px-3 py-2 hover:bg-gray-50">
                <div className="text-sm text-gray-900">{role.application}</div>
                <div className="text-sm text-gray-900">{role.role}</div>
                <div className="flex items-center justify-end gap-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleRemoveRole(role.id)}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Table Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>0 of 100 row(s) selected.</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span>Rows per page</span>
              <select className="px-2 py-1 text-xs border border-gray-200 rounded-md">
                <option>5</option>
                <option>10</option>
                <option>25</option>
              </select>
            </div>
            <span>Page 1 of 1</span>
            <div className="flex gap-1">
              <button className="p-1 text-gray-400 hover:text-gray-600" disabled>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
              <button className="p-1 text-gray-400 hover:text-gray-600" disabled>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="p-1 text-gray-600 hover:text-gray-800">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button className="p-1 text-gray-600 hover:text-gray-800">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSection;
export { AdminSection };