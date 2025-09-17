
"use client";

import React, { useState } from 'react';
import { MoreHorizontal, Plus, Edit2, Trash2, Copy } from 'lucide-react';
import type { EmployeeDetails } from '../../stores/employeeDetailsStore';
import { useEmployeeDetailsStore } from '../../stores/employeeDetailsStore';
import { ReviewsTable } from './components/ReviewsTable';

interface PerformanceSectionProps {
  employee: EmployeeDetails;
  onUpdate: (updates: Partial<EmployeeDetails>) => void;
}

export const PerformanceSection: React.FC<PerformanceSectionProps> = ({ employee }) => {
  const [activeTab, setActiveTab] = useState('reviews');
  const [showDropdown, setShowDropdown] = useState<string | null>(null);

  const {
    addReview,
    removeReview,
    addCheckIn,
    removeCheckIn,
    addFeedback360,
    removeFeedback360
  } = useEmployeeDetailsStore();

  const tabs = [
    { id: 'reviews', label: 'Review' },
    { id: 'checkins', label: 'Check In' },
    { id: 'feedback360', label: '360' }
  ];

  const performance = employee.performance || {
    overallRating: 0,
    goalsCompleted: 0,
    awardsReceived: 0,
    reviews: [],
    checkIns: [],
    feedback360: [],
    goals: [],
    metrics: []
  };

  const handleAddReview = () => {
    const newReview = {
      id: `review-${Date.now()}`,
      cycleName: 'Strategic to Organization mission and values',
      reviewer: { name: 'Jacob', avatar: 'J' },
      template: 'Lorem Ipsum',
      cycleType: 'Annual' as const,
      status: 'Active' as const,
      startDate: new Date('2025-08-12'),
      dueDate: new Date('2025-08-12'),
      lastUpdated: undefined
    };
    addReview(newReview);
  };

  const handleAddCheckIn = () => {
    const newCheckIn = {
      id: `checkin-${Date.now()}`,
      employee: { name: 'Jacob', avatar: 'J' },
      status: 'Active' as const,
      requestDate: new Date('2025-08-12'),
      dueDate: new Date('2025-08-12')
    };
    addCheckIn(newCheckIn);
  };

  const handleAddFeedback360 = () => {
    const newFeedback = {
      id: `feedback-${Date.now()}`,
      employee: { name: 'Jacob', avatar: 'J' },
      status: 'Active' as const,
      requestDate: new Date('2025-08-12'),
      dueDate: new Date('2025-08-12')
    };
    addFeedback360(newFeedback);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const renderTable = () => {
    switch (activeTab) {
      case 'reviews':
        return (
          <ReviewsTable 
            reviews={performance.reviews}
            onAddReview={handleAddReview}
            onRemoveReview={removeReview}
          />
        );
      case 'checkins':
        return (
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Check-ins</h3>
                <button
                  onClick={handleAddCheckIn}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Check-in
                </button>
                </div>
              </div>
            <div className="overflow-x-auto max-h-96 overflow-y-auto border border-slate-200 rounded-lg">
              <div className="min-w-full">
                <table className="w-full min-w-max">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider min-w-[150px]">Employee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider min-w-[80px]">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider min-w-[120px]">Request Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider min-w-[120px]">Due Date</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider min-w-[80px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {performance.checkIns.map((checkIn) => (
                      <tr key={checkIn.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap min-w-[150px]">
                          <div className="flex items-center">
                            <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs font-medium text-slate-600 mr-2">
                              {checkIn.employee.avatar}
            </div>
                            <span className="text-sm text-slate-900">{checkIn.employee.name}</span>
          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap min-w-[80px]">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(checkIn.status)}`}>
                            {checkIn.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 min-w-[120px]">{formatDate(checkIn.requestDate)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 min-w-[120px]">{formatDate(checkIn.dueDate)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="relative">
                            <button
                              onClick={() => setShowDropdown(showDropdown === checkIn.id ? null : checkIn.id)}
                              className="p-1 hover:bg-slate-100 rounded-full"
                            >
                              <MoreHorizontal className="w-4 h-4 text-slate-500" />
                            </button>
                            {showDropdown === checkIn.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-slate-200">
                                <div className="py-1">
                                  <button
                                    onClick={() => setShowDropdown(null)}
                                    className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                                  >
                                    <Edit2 className="w-4 h-4 mr-2" />
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => setShowDropdown(null)}
                                    className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                                  >
                                    <Copy className="w-4 h-4 mr-2" />
                                    Duplicate
                                  </button>
                                  <button
                                    onClick={() => {
                                      setShowDropdown(null);
                                      removeCheckIn(checkIn.id);
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                  </button>
                    </div>
                  </div>
                            )}
                </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                  </div>
              <div className="px-6 py-3 bg-slate-50 border-t border-slate-200">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>0 of {performance.checkIns.length} row(s) selected</span>
                  <div className="flex items-center gap-4">
                    <span>Rows per page</span>
                    <select className="border border-slate-300 rounded px-2 py-1">
                      <option>10</option>
                    </select>
                    <span>Page 1 of 1</span>
                    <div className="flex gap-1">
                      <button className="px-2 py-1 border border-slate-300 rounded hover:bg-slate-100">«</button>
                      <button className="px-2 py-1 border border-slate-300 rounded hover:bg-slate-100">‹</button>
                      <button className="px-2 py-1 border border-slate-300 rounded hover:bg-slate-100">›</button>
                      <button className="px-2 py-1 border border-slate-300 rounded hover:bg-slate-100">»</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'feedback360':
        return (
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">360 Feedback</h3>
                <button
                  onClick={handleAddFeedback360}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add 360 Feedback
                </button>
              </div>
            </div>
            <div className="overflow-x-auto max-h-96 overflow-y-auto border border-slate-200 rounded-lg">
              <div className="min-w-full">
                <table className="w-full min-w-max">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider min-w-[150px]">Employee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider min-w-[80px]">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider min-w-[120px]">Request Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider min-w-[120px]">Due Date</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider min-w-[80px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {performance.feedback360.map((feedback) => (
                      <tr key={feedback.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap min-w-[150px]">
                          <div className="flex items-center">
                            <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs font-medium text-slate-600 mr-2">
                              {feedback.employee.avatar}
              </div>
                            <span className="text-sm text-slate-900">{feedback.employee.name}</span>
                  </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap min-w-[80px]">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(feedback.status)}`}>
                            {feedback.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 min-w-[120px]">{formatDate(feedback.requestDate)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 min-w-[120px]">{formatDate(feedback.dueDate)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="relative">
                            <button
                              onClick={() => setShowDropdown(showDropdown === feedback.id ? null : feedback.id)}
                              className="p-1 hover:bg-slate-100 rounded-full"
                            >
                              <MoreHorizontal className="w-4 h-4 text-slate-500" />
                            </button>
                            {showDropdown === feedback.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-slate-200">
                                <div className="py-1">
                                  <button
                                    onClick={() => setShowDropdown(null)}
                                    className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                                  >
                                    <Edit2 className="w-4 h-4 mr-2" />
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => setShowDropdown(null)}
                                    className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                                  >
                                    <Copy className="w-4 h-4 mr-2" />
                                    Duplicate
                                  </button>
                                  <button
                                    onClick={() => {
                                      setShowDropdown(null);
                                      removeFeedback360(feedback.id);
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                  </button>
                    </div>
                  </div>
                            )}
                </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                  </div>
              <div className="px-6 py-3 bg-slate-50 border-t border-slate-200">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>0 of {performance.feedback360.length} row(s) selected</span>
                  <div className="flex items-center gap-4">
                    <span>Rows per page</span>
                    <select className="border border-slate-300 rounded px-2 py-1">
                      <option>10</option>
                    </select>
                    <span>Page 1 of 1</span>
                    <div className="flex gap-1">
                      <button className="px-2 py-1 border border-slate-300 rounded hover:bg-slate-100">«</button>
                      <button className="px-2 py-1 border border-slate-300 rounded hover:bg-slate-100">‹</button>
                      <button className="px-2 py-1 border border-slate-300 rounded hover:bg-slate-100">›</button>
                      <button className="px-2 py-1 border border-slate-300 rounded hover:bg-slate-100">»</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 w-full max-w-full overflow-hidden">
      <div className="border-b border-slate-200 sticky top-0 z-10 bg-white">
        <div className="flex w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-6 py-4 text-sm font-medium text-center transition-colors ${
                activeTab === tab.id
                  ? 'text-slate-950 border-b-2 border-slate-900'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              aria-selected={activeTab === tab.id}
              role="tab"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="pt-2 w-full overflow-hidden max-w-full">{renderTable()}</div>
    </div>
  );
};
