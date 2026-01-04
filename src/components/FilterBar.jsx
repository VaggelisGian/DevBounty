import React from 'react';
import { getLanguages, clearCache } from '../services/github';

const FilterBar = ({ filters, onFilterChange, onSearch, mode }) => {
  const languages = getLanguages();
  
  const handleClearCache = () => {
    const count = clearCache();
    alert(`Cache cleared! (${count} entries removed)`);
    onSearch(); // Reload data
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Main Search */}
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by technology, keyword, or repository..."
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-900 focus:border-blue-900 transition-colors"
              value={filters.searchQuery || ''}
              onChange={(e) => onFilterChange('searchQuery', e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            />
            <button
              onClick={onSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors font-medium text-sm"
            >
              Search
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="flex flex-wrap gap-3">
          {/* Language Filter */}
          <div className="flex-1 min-w-[200px]">
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-900 focus:border-blue-900 transition-colors bg-white text-sm"
              value={filters.language || ''}
              onChange={(e) => onFilterChange('language', e.target.value)}
            >
              <option value="">All Languages</option>
              {languages.map(lang => (
                <option key={lang} value={lang.toLowerCase()}>{lang}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter - Only for bounties */}
          {mode === 'bounties' && (
            <div className="flex-1 min-w-[200px]">
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-900 focus:border-blue-900 transition-colors bg-white text-sm"
                value={filters.difficulty || ''}
                onChange={(e) => onFilterChange('difficulty', e.target.value)}
              >
                <option value="">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          )}

          {/* Min Bounty - Only for bounties */}
          {mode === 'bounties' && (
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md bg-white">
              <span className="text-sm text-gray-600">Min:</span>
              <input
                type="number"
                placeholder="$0"
                className="w-20 focus:outline-none text-sm"
                value={filters.minAmount || ''}
                onChange={(e) => onFilterChange('minAmount', e.target.value ? parseInt(e.target.value) : null)}
              />
            </div>
          )}

          {/* Clear Filters */}
          {(filters.language || filters.difficulty || filters.minAmount || filters.searchQuery) && (
            <button
              onClick={() => onFilterChange('clear')}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
            >
              Clear filters
            </button>
          )}
          
          {/* Clear Cache - Debug button */}
          <button
            onClick={handleClearCache}
            className="px-3 py-2 text-xs text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md transition-colors"
            title="Clear cached data and reload"
          >
            Clear Cache
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
