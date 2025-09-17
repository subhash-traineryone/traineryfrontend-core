import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Command, X } from 'lucide-react';

const TopNavigation: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Focus the search input
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality here
    console.log('Searching for:', searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };


  return (
    <div className="bg-white border-b border-gray-200 flex items-center justify-between px-8 py-4">
      {/* Left Section - Breadcrumb Navigation */}
      <div className="flex items-center gap-2">
        <button 
          onClick={() => navigate('/workforce')}
          className="text-xs text-gray-600 hover:text-gray-900 transition-colors cursor-pointer px-0 py-1"
        >
          Workforce
        </button>
        <div className="text-gray-300 text-sm">/</div>
        <button 
          onClick={() => navigate(location.pathname === '/people' ? '/people' : '/workforce')}
          className={`text-xs transition-colors cursor-pointer px-0 py-1 ${
            location.pathname === '/people'
              ? 'text-gray-900 font-medium' 
              : 'text-gray-900 font-medium'
          }`}
        >
          {location.pathname === '/people' ? 'People' : 'Overview'}
        </button>
      </div>

      {/* Right Section - Search and User */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative">
          <form onSubmit={handleSearch} className="relative">
            <div className={`w-[240px] h-9 bg-gray-50 rounded-md flex items-center px-3 border transition-all duration-200 ${
              isSearchFocused 
                ? 'border-blue-300 bg-white shadow-sm' 
                : 'border-gray-200 hover:border-gray-300'
            }`}>
              <Search className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="bg-transparent text-sm text-gray-900 placeholder-gray-500 outline-none flex-1 min-w-0"
              />
              <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
                <div className="flex items-center gap-1">
                  <Command className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500 bg-gray-200 px-1.5 py-0.5 rounded font-medium">K</span>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* User Account */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
            <div className="w-3 h-3 bg-gray-400 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
