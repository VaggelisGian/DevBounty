import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import OpportunityList from './components/OpportunityList';
import { searchGitHubBounties, searchStartupJobs } from './services/github';
import { getBookmarks } from './services/bookmarks';

function App() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [mode, setMode] = useState('bounties'); // 'bounties', 'jobs', or 'saved'
  const [filters, setFilters] = useState({
    language: '',
    minAmount: null,
    difficulty: '',
    searchQuery: ''
  });

  // Load opportunities on mount and when mode changes
  useEffect(() => {
    loadOpportunities();
  }, [mode]);

  const loadOpportunities = async () => {
    if (mode === 'saved') {
      // Load from bookmarks
      setOpportunities(getBookmarks());
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const results = mode === 'bounties' 
        ? await searchGitHubBounties(filters)
        : await searchStartupJobs(filters);
      setOpportunities(results);
    } catch (err) {
      setError(err.message || 'Failed to load opportunities');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    if (key === 'clear') {
      setFilters({
        language: '',
        minAmount: null,
        difficulty: '',
        searchQuery: ''
      });
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleSearch = () => {
    loadOpportunities();
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  const handleBookmarkChange = () => {
    // Refresh saved list if we're in saved mode
    if (mode === 'saved') {
      setOpportunities(getBookmarks());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header mode={mode} onModeChange={handleModeChange} />
      {mode !== 'saved' && (
        <FilterBar 
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          mode={mode}
        />
      )}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <OpportunityList
          opportunities={opportunities}
          loading={loading}
          error={error}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onBookmarkChange={handleBookmarkChange}
          mode={mode}
        />
      </main>

      <footer className="mt-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              DevBounty - Professional coding opportunities from GitHub
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Data updated in real-time • Built with React and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
