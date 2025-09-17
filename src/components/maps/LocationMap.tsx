import React from 'react';
import { Info } from 'lucide-react';
import { locationData } from '../../services/dashboardService';

const LocationMap: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 w-full h-[317px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-medium text-gray-900">Employees by Location</h3>
        <button className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer" title="More info">
          <Info className="w-3.5 h-3.5" />
        </button>
      </div>
      
      {/* Map Container */}
      <div className="h-[82px] mb-4 relative">
        <div className="w-full h-full bg-gradient-to-br from-[#a8c5da] to-[#b1e3ff] rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-xs text-gray-600 mb-1">World Map</div>
            <div className="text-xs text-gray-500">Employee Locations</div>
          </div>
        </div>
        {/* Map dots for demo */}
        <div className="absolute top-4 left-4 w-2 h-2 bg-[#1c1c1c] rounded-full shadow-lg"></div>
        <div className="absolute top-6 right-8 w-2 h-2 bg-[#1c1c1c] rounded-full shadow-lg"></div>
        <div className="absolute bottom-4 right-4 w-2 h-2 bg-[#1c1c1c] rounded-full shadow-lg"></div>
        <div className="absolute bottom-2 left-8 w-2 h-2 bg-[#1c1c1c] rounded-full shadow-lg"></div>
      </div>
      
      {/* Location Data */}
      <div className="space-y-3 flex-1">
        {locationData.map((location, index) => (
          <div key={index}>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-900">{location.name}</span>
              <span className="text-sm font-medium text-gray-900">{location.count}</span>
            </div>
            <div 
              className="w-full h-1 rounded-full" 
              style={{ backgroundColor: location.color }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationMap;
