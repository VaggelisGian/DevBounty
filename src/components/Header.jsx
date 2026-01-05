import React from 'react';

const Header = ({ mode, onModeChange, onRefresh, loading }) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Top Row: Logo and Refresh */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-900 rounded-md flex items-center justify-center">
                <span className="text-lg sm:text-xl font-semibold text-white">$</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  DevBounty
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                  Professional coding opportunities
                </p>
              </div>
            </div>
            
            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={loading}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              title="Refresh data"
            >
              <svg 
                className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                />
              </svg>
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>

          {/* Bottom Row: Mode Toggle and Stats */}
          <div className="flex items-center justify-between gap-2">
            {/* Mode Toggle */}
            <div className="flex items-center bg-gray-100 rounded-md p-1">
              <button
                onClick={() => onModeChange('bounties')}
                className={`px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded transition-colors ${
                  mode === 'bounties'
                    ? 'bg-white text-blue-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Bounties
              </button>
              <button
                onClick={() => onModeChange('jobs')}
                className={`px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded transition-colors ${
                  mode === 'jobs'
                    ? 'bg-white text-blue-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Jobs
              </button>
              <button
                onClick={() => onModeChange('saved')}
                className={`px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded transition-colors ${
                  mode === 'saved'
                    ? 'bg-white text-blue-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="sm:hidden">★</span>
                <span className="hidden sm:inline">★ Saved</span>
              </button>
            </div>
            
            {/* Stats */}
            <div className="text-right">
              <div className="text-xs text-gray-500">
                {mode === 'bounties' ? 'Active bounties' : mode === 'jobs' ? 'Job posts' : 'Bookmarked'}
              </div>
              <div className="text-sm sm:text-lg font-semibold text-gray-900">
                {mode === 'bounties' ? '2,700+' : mode === 'jobs' ? '2,600+' : '-'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
