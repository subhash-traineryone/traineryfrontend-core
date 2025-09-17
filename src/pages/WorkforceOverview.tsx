import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit } from 'lucide-react';
import { StatsCards } from '../components';
import { GenderChart, AgeChart, TypeChart, LocationMap, EmployeeTable, ManageCardsModal } from '../components';

const WorkforceOverview: React.FC = () => {
  const navigate = useNavigate();
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [visibleCards, setVisibleCards] = useState([
    'active-employees',
    'new-employees', 
    'imports',
    'manual',
    'gender-chart',
    'age-chart',
    'type-chart',
    'locations',
    'employee-table'
  ]);

  const toggleCard = (cardId: string) => {
    setVisibleCards(prev => 
      prev.includes(cardId) 
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  return (
    <div className="bg-gray-50 p-6 min-h-full">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Workforce</h1>
        
        {/* Tabs */}
        <div className="flex items-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 bg-gray-300 rounded"></div>
            <span className="text-sm font-medium text-gray-900 border-b-2 border-gray-900 pb-1">Overview</span>
          </div>
          <button 
            onClick={() => navigate('/people')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-3.5 h-3.5 bg-gray-300 rounded"></div>
            <span className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">People</span>
          </button>
          <div className="ml-auto">
                    <button
                      onClick={() => setIsManageModalOpen(true)}
                      className="px-4 py-2 bg-gray-100 text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-200 flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Customise
                    </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <StatsCards />

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        {visibleCards.includes('gender-chart') && (
          <div className="lg:col-span-1">
            <GenderChart />
          </div>
        )}
        {visibleCards.includes('age-chart') && (
          <div className="lg:col-span-2">
            <AgeChart />
          </div>
        )}
        {visibleCards.includes('type-chart') && (
          <div className="lg:col-span-2">
            <TypeChart />
          </div>
        )}
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {visibleCards.includes('locations') && (
          <div className="lg:col-span-1">
            <LocationMap />
          </div>
        )}
        {visibleCards.includes('employee-table') && (
          <div className="lg:col-span-2">
            <EmployeeTable />
          </div>
        )}
      </div>

      {/* Manage Cards Modal */}
      <ManageCardsModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        visibleCards={visibleCards}
        onToggleCard={toggleCard}
      />
    </div>
  );
};

export default WorkforceOverview;
