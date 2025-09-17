import React, { useState } from 'react';
import { useEmployeeDetailsStore } from '../../stores/employeeDetailsStore';
import { Plus, Trash2, Edit, User, FileText, Settings, Calendar, Clock } from 'lucide-react';

interface UpdatesSectionProps {
  employee: any;
}

const UpdatesSection: React.FC<UpdatesSectionProps> = ({ employee }) => {
  const { addUpdate, removeUpdate, updateUpdate } = useEmployeeDetailsStore();
  const [isAddingUpdate, setIsAddingUpdate] = useState(false);
  const [editingUpdate, setEditingUpdate] = useState<string | null>(null);
  const [newUpdate, setNewUpdate] = useState({ 
    title: '', 
    description: '', 
    type: 'note' as const,
    priority: 'medium' as const 
  });
  const [editUpdate, setEditUpdate] = useState({ 
    title: '', 
    description: '', 
    type: 'note' as const,
    priority: 'medium' as const 
  });

  const handleAddUpdate = () => {
    if (!newUpdate.title.trim()) return;
    
    addUpdate({
      title: newUpdate.title,
      description: newUpdate.description,
      type: newUpdate.type,
      priority: newUpdate.priority,
      author: 'Current User',
      date: new Date()
    });
    
    setNewUpdate({ title: '', description: '', type: 'note', priority: 'medium' });
    setIsAddingUpdate(false);
  };

  const handleDeleteUpdate = (updateId: string) => {
    removeUpdate(updateId);
  };

  const handleEditUpdate = (update: any) => {
    setEditingUpdate(update.id);
    setEditUpdate({
      title: update.title,
      description: update.description,
      type: update.type,
      priority: update.priority
    });
  };

  const handleSaveEdit = () => {
    if (!editingUpdate || !editUpdate.title.trim()) return;
    
    updateUpdate(editingUpdate, {
      title: editUpdate.title,
      description: editUpdate.description,
      type: editUpdate.type,
      priority: editUpdate.priority
    });
    
    setEditingUpdate(null);
    setEditUpdate({ title: '', description: '', type: 'note', priority: 'medium' });
  };

  const handleCancelEdit = () => {
    setEditingUpdate(null);
    setEditUpdate({ title: '', description: '', type: 'note', priority: 'medium' });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'note':
        return <FileText className="w-4 h-4" />;
      case 'status_change':
        return <Settings className="w-4 h-4" />;
      case 'assignment':
        return <User className="w-4 h-4" />;
      case 'milestone':
        return <Calendar className="w-4 h-4" />;
      case 'system':
        return <Settings className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  if (!employee?.updates) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500">No updates available</div>
      </div>
    );
  }

  const { updates } = employee;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Updates</h3>
        <button
          onClick={() => setIsAddingUpdate(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Update
        </button>
      </div>

      {/* Add Update Form */}
      {isAddingUpdate && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={newUpdate.title}
                onChange={(e) => setNewUpdate({ ...newUpdate, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter update title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={newUpdate.type}
                onChange={(e) => setNewUpdate({ ...newUpdate, type: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="note">Note</option>
                <option value="status_change">Status Change</option>
                <option value="assignment">Assignment</option>
                <option value="milestone">Milestone</option>
                <option value="system">System</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={newUpdate.description}
              onChange={(e) => setNewUpdate({ ...newUpdate, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Enter update description"
            />
          </div>
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                value={newUpdate.priority}
                onChange={(e) => setNewUpdate({ ...newUpdate, priority: e.target.value as any })}
                className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="flex gap-2 ml-auto">
              <button
                onClick={handleAddUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Update
              </button>
              <button
                onClick={() => {
                  setIsAddingUpdate(false);
                  setNewUpdate({ title: '', description: '', type: 'note', priority: 'medium' });
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Updates Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200"></div>
        
        <div className="space-y-6">
          {updates.map((update: any) => (
            <div key={update.id} className="relative flex items-start gap-4">
              {/* Timeline Dot */}
              <div className="relative z-10 flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full border-2 border-white">
                <div className="text-gray-600">
                  {getUpdateIcon(update.type)}
                </div>
              </div>
              
              {/* Update Content */}
              <div className="flex-1 min-w-0">
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  {editingUpdate === update.id ? (
                    /* Edit Mode */
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                          </label>
                          <input
                            type="text"
                            value={editUpdate.title}
                            onChange={(e) => setEditUpdate({ ...editUpdate, title: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter update title"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Type
                          </label>
                          <select
                            value={editUpdate.type}
                            onChange={(e) => setEditUpdate({ ...editUpdate, type: e.target.value as any })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="note">Note</option>
                            <option value="status_change">Status Change</option>
                            <option value="assignment">Assignment</option>
                            <option value="milestone">Milestone</option>
                            <option value="system">System</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={editUpdate.description}
                          onChange={(e) => setEditUpdate({ ...editUpdate, description: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={3}
                          placeholder="Enter update description"
                        />
                      </div>
                      <div className="flex items-center gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Priority
                          </label>
                          <select
                            value={editUpdate.priority}
                            onChange={(e) => setEditUpdate({ ...editUpdate, priority: e.target.value as any })}
                            className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                        <div className="flex gap-2 ml-auto">
                          <button
                            onClick={handleSaveEdit}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* View Mode */
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-sm font-medium text-gray-900">
                            {update.title}
                          </h4>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getPriorityColor(update.priority)} bg-gray-100`}>
                            {update.priority}
                          </span>
                        </div>
                        
                        {update.description && (
                          <p className="text-sm text-gray-600 mb-3">
                            {update.description}
                          </p>
                        )}
                        
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{update.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatTimeAgo(update.date)}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-1 ml-4">
                        <button 
                          onClick={() => handleEditUpdate(update)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUpdate(update.id)}
                          className="p-1 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {updates.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No updates yet</h3>
          <p className="text-gray-500 mb-4">Start by adding an update to track this employee's progress.</p>
          <button
            onClick={() => setIsAddingUpdate(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add First Update
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdatesSection;
export { UpdatesSection };