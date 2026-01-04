import React from 'react';
import OpportunityCard from './OpportunityCard';

const OpportunityList = ({ opportunities, loading, error, sortBy, onSortChange, onBookmarkChange, mode }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading {mode === 'saved' ? 'saved items' : 'opportunities'}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-900 font-semibold">Error loading opportunities</p>
        <p className="text-red-700 text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (!opportunities || opportunities.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <p className="text-gray-900 text-lg font-semibold mb-2">
          {mode === 'saved' ? 'No saved items yet' : 'No opportunities found'}
        </p>
        <p className="text-gray-600 mb-6">
          {mode === 'saved' 
            ? 'Click the "Save" button on any opportunity to bookmark it for later'
            : 'Try adjusting your filters to see more opportunities'
          }
        </p>
        {mode !== 'saved' && (
          <div className="flex flex-wrap gap-2 justify-center text-sm">
            <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md">Remove language filter</span>
            <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md">Lower minimum amount</span>
            <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md">Clear all filters</span>
          </div>
        )}
      </div>
    );
  }

  // Sort opportunities
  const sortedOpportunities = [...opportunities].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.postedDate) - new Date(a.postedDate);
      case 'highest':
        return (b.bountyAmount || 0) - (a.bountyAmount || 0);
      case 'competition':
        return a.comments - b.comments;
      default:
        return 0;
    }
  });

  return (
    <div>
      {/* Sort Bar */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-700 font-medium">
          {opportunities.length} {opportunities.length === 1 ? 'item' : 'items'}
          {mode === 'saved' && ' saved'}
        </p>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Sort by:</label>
          <select
            className="px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-900 focus:border-blue-900 text-sm bg-white"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="highest">Highest paying</option>
            <option value="competition">Least competition</option>
          </select>
        </div>
      </div>

      {/* Opportunity Cards */}
      <div className="space-y-4">
        {sortedOpportunities.map(opportunity => (
          <OpportunityCard 
            key={opportunity.id} 
            opportunity={opportunity}
            onBookmarkChange={onBookmarkChange}
          />
        ))}
      </div>
    </div>
  );
};

export default OpportunityList;
