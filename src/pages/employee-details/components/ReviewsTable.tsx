"use client"

import React, { useState } from 'react';
import { MoreHorizontal, Plus, Edit2, Trash2, Copy } from 'lucide-react';
interface Review {
  id: string;
  cycleName: string;
  reviewer: {
    name: string;
    avatar: string;
  };
  template: string;
  cycleType: 'Annual' | 'Onboard' | 'Standard';
  status: 'Active' | 'Inactive';
  startDate: Date;
  dueDate: Date;
  lastUpdated?: Date;
}

interface ReviewsTableProps {
  reviews: Review[];
  onAddReview: () => void;
  onRemoveReview: (id: string) => void;
}

export const ReviewsTable: React.FC<ReviewsTableProps> = ({ 
  reviews, 
  onAddReview, 
  onRemoveReview 
}) => {
  const [showDropdown, setShowDropdown] = useState<string | null>(null);

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

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden w-full max-w-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Review</h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddReview();
            }}
            className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Review
          </button>
        </div>
      </div>

      {/* Table Container with External Scrollbar */}
      <div className="w-full max-w-full overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-8 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider w-[28%]">Cycle Name</th>
              <th className="px-8 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider w-[20%]">Reviewer</th>
              <th className="px-8 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider w-[18%]">Template</th>
              <th className="px-8 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider w-[14%]">Cycle Type</th>
              <th className="px-8 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider w-[10%]">Status</th>
              <th className="px-8 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider w-[12%]">Start Date</th>
              <th className="px-8 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider w-[12%]">Due Date</th>
              <th className="px-8 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider w-[12%]">Last Updated</th>
              <th className="px-8 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider w-[10%]">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {reviews.map((review) => (
              <tr key={review.id} className="hover:bg-slate-50" onClick={(e) => e.stopPropagation()}>
                <td className="px-8 py-4 whitespace-nowrap overflow-hidden text-ellipsis w-[28%]">
                  <div className="text-sm text-slate-900">{review.cycleName}</div>
                </td>
                <td className="px-8 py-4 whitespace-nowrap w-[20%]">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs font-medium text-slate-600 mr-2">
                      {review.reviewer.avatar}
                    </div>
                    <span className="text-sm text-slate-900 truncate">{review.reviewer.name}</span>
                  </div>
                </td>
                <td className="px-8 py-4 whitespace-nowrap overflow-hidden text-ellipsis w-[18%]">
                  <div className="text-sm text-slate-900">{review.template}</div>
                </td>
                <td className="px-8 py-4 whitespace-nowrap overflow-hidden text-ellipsis w-[14%]">
                  <div className="text-sm text-slate-900">{review.cycleType}</div>
                </td>
                <td className="px-8 py-4 whitespace-nowrap w-[10%]">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(review.status)}`}>
                    {review.status}
                  </span>
                </td>
                <td className="px-8 py-4 whitespace-nowrap text-sm text-slate-900 w-[12%]">{formatDate(review.startDate)}</td>
                <td className="px-8 py-4 whitespace-nowrap text-sm text-slate-900 w-[12%]">{formatDate(review.dueDate)}</td>
                <td className="px-8 py-4 whitespace-nowrap text-sm text-slate-900 w-[12%]">
                  {review.lastUpdated ? formatDate(review.lastUpdated) : '-'}
                </td>
                <td className="px-8 py-4 whitespace-nowrap text-center w-[10%]">
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDropdown(showDropdown === review.id ? null : review.id);
                      }}
                      className="p-1 hover:bg-slate-100 rounded-full"
                    >
                      <MoreHorizontal className="w-4 h-4 text-slate-500" />
                    </button>
                    {showDropdown === review.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-slate-200" onClick={(e) => e.stopPropagation()}>
                        <div className="py-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowDropdown(null);
                              // Edit logic
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                          >
                            <Edit2 className="w-4 h-4 mr-2" />
                            Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowDropdown(null);
                              // Duplicate logic
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowDropdown(null);
                              onRemoveReview(review.id);
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
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-500">
            0 of {reviews.length} row(s) selected
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Rows per page</span>
              <select className="px-2 py-1 text-sm border border-slate-300 rounded">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-slate-200 rounded">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-sm text-slate-500">Page 1 of 1</span>
              <button className="p-1 hover:bg-slate-200 rounded">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};