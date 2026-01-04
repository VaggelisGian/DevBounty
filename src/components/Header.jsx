import React from 'react';

const Header = ({ mode, onModeChange }) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-900 rounded-md flex items-center justify-center">
              <span className="text-xl font-semibold text-white">$</span>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                DevBounty
              </h1>
              <p className="text-sm text-gray-500">
                Professional coding opportunities
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Mode Toggle */}
            <div className="flex items-center bg-gray-100 rounded-md p-1">
              <button
                onClick={() => onModeChange('bounties')}
                className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                  mode === 'bounties'
                    ? 'bg-white text-blue-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Bounties
              </button>
              <button
                onClick={() => onModeChange('jobs')}
                className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                  mode === 'jobs'
                    ? 'bg-white text-blue-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Jobs
              </button>
              <button
                onClick={() => onModeChange('saved')}
                className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                  mode === 'saved'
                    ? 'bg-white text-blue-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                ★ Saved
              </button>
            </div>
            <div className="hidden md:block text-right">
              <div className="text-sm text-gray-500">
                {mode === 'bounties' ? 'Active bounties' : mode === 'jobs' ? 'Job posts' : 'Bookmarked'}
              </div>
              <div className="text-lg font-semibold text-gray-900">
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
