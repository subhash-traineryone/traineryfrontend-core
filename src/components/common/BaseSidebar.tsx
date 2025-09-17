"use client"

import React from 'react';
import { X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  position?: 'left' | 'right';
  width?: string;
  showCloseButton?: boolean;
  className?: string;
}

export const BaseSidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  title,
  children,
  position = 'right',
  width = 'w-[60%] min-w-[800px] max-w-[1200px]',
  showCloseButton = true,
  className = ''
}) => {
  if (!isOpen) return null;

  const positionClasses = position === 'right' ? 'right-0' : 'left-0';

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`fixed top-0 ${positionClasses} h-full ${width} bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${className}`}>
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            {title && (
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-1 rounded-md hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
};
