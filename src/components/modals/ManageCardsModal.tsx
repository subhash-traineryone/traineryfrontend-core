import React, { useState } from 'react';
import { X, UserCheck, UserPlus, Download, MapPin, Wrench, FileText } from 'lucide-react';

interface CardOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  category: 'quick-stats' | 'segmentation' | 'detailed-records';
}

interface ManageCardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  visibleCards: string[];
  onToggleCard: (cardId: string) => void;
}

const cardOptions: CardOption[] = [
  {
    id: 'active-employees',
    title: 'Active Employees',
    description: 'Number of active employees in the organisation in the past 30 days',
    icon: <UserCheck className="w-4 h-4" />,
    iconBg: 'bg-yellow-200',
    category: 'quick-stats'
  },
  {
    id: 'new-employees',
    title: 'New Employees',
    description: 'Number of new employees in the organisation in the past 30 days',
    icon: <UserPlus className="w-4 h-4" />,
    iconBg: 'bg-blue-200',
    category: 'quick-stats'
  },
  {
    id: 'imports',
    title: 'Imports',
    description: 'Number of new employees added through import in the past 30 days',
    icon: <Download className="w-4 h-4" />,
    iconBg: 'bg-orange-200',
    category: 'quick-stats'
  },
  {
    id: 'manual',
    title: 'Manual',
    description: 'Number of new employees added manually in the past 30 days',
    icon: <Wrench className="w-4 h-4" />,
    iconBg: 'bg-indigo-200',
    category: 'quick-stats'
  },
  {
    id: 'locations',
    title: 'Locations',
    description: 'Number of locations where active employees are working',
    icon: <MapPin className="w-4 h-4" />,
    iconBg: 'bg-green-200',
    category: 'segmentation'
  },
  {
    id: 'employee-table',
    title: 'Employee Records',
    description: 'Detailed table view of all employees with their information',
    icon: <FileText className="w-4 h-4" />,
    iconBg: 'bg-cyan-200',
    category: 'detailed-records'
  }
];

const categories = [
  { id: 'quick-stats', name: 'Quick Stats', count: 4 },
  { id: 'segmentation', name: 'Segmentation Insights', count: 1 },
  { id: 'detailed-records', name: 'Detailed Employee Records', count: 1 }
];

const ManageCardsModal: React.FC<ManageCardsModalProps> = ({
  isOpen,
  onClose,
  visibleCards,
  onToggleCard
}) => {
  const [activeCategory, setActiveCategory] = useState('quick-stats');

  if (!isOpen) return null;

  const filteredCards = cardOptions.filter(card => card.category === activeCategory);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl h-full max-h-[80vh] relative shadow-xl flex flex-col">
        {/* Header */}
        <div className="p-4 lg:p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Manage Cards</h2>
              <p className="text-sm text-gray-500 mt-1">Pin / Unpin whichever widget you require</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 lg:p-6 overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-4 h-full">
            {/* Left Sidebar - Categories */}
            <div className="w-full lg:w-[198px] flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-3 py-2 text-left text-xs rounded transition-colors whitespace-nowrap lg:whitespace-normal ${
                    activeCategory === category.id
                      ? 'bg-blue-100 text-blue-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Separator */}
            <div className="hidden lg:block w-px bg-gray-200"></div>

            {/* Right Grid - Card Options */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 lg:gap-4 overflow-y-auto">
              {filteredCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white border border-gray-200 rounded-md p-3 lg:p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3 lg:mb-4">
                    <div className={`${card.iconBg} p-1.5 lg:p-2 rounded-lg`}>
                      {card.icon}
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={visibleCards.includes(card.id)}
                        onChange={() => onToggleCard(card.id)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 border-2 rounded transition-colors ${
                        visibleCards.includes(card.id)
                          ? 'bg-blue-600 border-blue-600'
                          : 'border-gray-300'
                      }`}>
                        {visibleCards.includes(card.id) && (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-sm"></div>
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCardsModal;
