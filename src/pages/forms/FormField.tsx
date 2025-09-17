"use client"

import React from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { DatePicker } from '../../components/ui/date-picker';

interface FormFieldProps {
  label: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'date' | 'file';
  value: string | Date | undefined;
  onChange: (value: string | Date | undefined) => void;
  placeholder?: string;
  error?: string;
  options?: string[];
  fileAccept?: string;
  fileLabel?: string;
  fileName?: string;
  onFileChange?: (file: File | null) => void;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  error,
  options = [],
  fileAccept,
  fileLabel,
  fileName,
  onFileChange,
  className = ""
}) => {
  const renderInput = () => {
    switch (type) {
      case 'text':
      case 'email':
      case 'tel':
        return (
          <input
            type={type}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded-md text-sm ${
              error ? 'border-red-500' : 'border-slate-200'
            }`}
          />
        );

      case 'select':
        return (
          <div className="relative">
            <select
              value={value as string}
              onChange={(e) => onChange(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm appearance-none bg-white hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors cursor-pointer"
              style={{
                boxShadow: 'none'
              }}
            >
              <option value="">{placeholder || 'Select'}</option>
              {options.map((option) => (
                <option key={option} value={option} className="py-2 hover:bg-indigo-50">
                  {option}
                </option>
              ))}
            </select>
            <ChevronsUpDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        );

      case 'date':
        return (
          <DatePicker
            value={value as Date | undefined}
            onChange={(date) => onChange(date)}
            placeholder={placeholder || "Choose date"}
            className="h-9 text-sm"
          />
        );

      case 'file':
        return (
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept={fileAccept}
              onChange={(e) => onFileChange?.(e.target.files?.[0] || null)}
              className="hidden"
              id={`file-upload-${label.toLowerCase().replace(/\s+/g, '-')}`}
            />
            <label
              htmlFor={`file-upload-${label.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-3 py-2 text-xs border border-slate-200 rounded-md cursor-pointer hover:bg-slate-50 transition-colors"
            >
              {fileLabel || 'Choose file'}
            </label>
            <span className="text-xs text-slate-500">
              {fileName || 'No file chosen'}
            </span>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <label className="text-xs text-slate-600 w-24">{label}</label>
      <div className="flex-1 max-w-[228px]">
        {renderInput()}
        {error && (
          <p className="text-xs text-red-500 mt-1">{error}</p>
        )}
      </div>
    </div>
  );
};
