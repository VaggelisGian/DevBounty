import React, { useState } from 'react';
import { formatDate, formatCurrency, truncateText, getDifficultyColor, isNew, isRecent } from '../utils/helpers';
import { addBookmark, removeBookmark, isBookmarked } from '../services/bookmarks';

const OpportunityCard = ({ opportunity, onBookmarkChange }) => {
  const {
    id,
    title,
    description,
    source,
    sourceUrl,
    bountyAmount,
    techStack,
    postedDate,
    difficulty,
    comments,
    repository,
    labels
  } = opportunity;

  const [bookmarked, setBookmarked] = useState(isBookmarked(id));
  const isNewPost = isNew(postedDate);
  const isRecentPost = isRecent(postedDate);

  const handleBookmarkToggle = (e) => {
    e.preventDefault();
    if (bookmarked) {
      removeBookmark(id);
      setBookmarked(false);
    } else {
      addBookmark(opportunity);
      setBookmarked(true);
    }
    if (onBookmarkChange) onBookmarkChange();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:border-gray-300 hover:shadow-sm transition-all relative">
      {/* New/Recent Badge */}
      {isNewPost && (
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded border border-green-200">
            NEW
          </span>
        </div>
      )}
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-3">
        <div className="flex-1 pr-0 sm:pr-12">
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base sm:text-lg font-semibold text-gray-900 hover:text-blue-900 line-clamp-2 transition-colors block"
          >
            {title}
          </a>
          <div className="mt-2 flex items-center gap-2 text-xs sm:text-sm text-gray-500 flex-wrap">
            <span className="font-medium">{repository}</span>
            <span>•</span>
            <span className={isRecentPost ? 'text-green-600 font-medium' : ''}>
              {formatDate(postedDate)}
            </span>
          </div>
        </div>
        {bountyAmount ? (
          <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-md self-start">
            <div className="text-base sm:text-lg font-semibold text-emerald-700 whitespace-nowrap">
              {formatCurrency(bountyAmount)}
            </div>
          </div>
        ) : (
          <div className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-md self-start">
            <div className="text-xs sm:text-sm font-semibold text-blue-700 whitespace-nowrap">
              Job Posting
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2 leading-relaxed">
        {truncateText(description, 180)}
      </p>

      {/* Tags & Metadata */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4">
        <span className={`px-2 sm:px-2.5 py-1 rounded text-xs font-medium ${getDifficultyColor(difficulty)}`}>
          {difficulty}
        </span>
        
        {techStack.slice(0, 4).map((tech, index) => (
          <span
            key={index}
            className="px-2 sm:px-2.5 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
          >
            {tech}
          </span>
        ))}
        
        {techStack.length > 4 && (
          <span className="text-xs text-gray-500">
            +{techStack.length - 4} more
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 sm:pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
          <span>{comments} comments</span>
          <span>•</span>
          <span>{source}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleBookmarkToggle}
            className={`flex-1 sm:flex-none px-3 py-2 rounded-md transition-colors text-xs sm:text-sm font-medium border ${
              bookmarked
                ? 'bg-yellow-50 text-yellow-700 border-yellow-300 hover:bg-yellow-100'
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
            }`}
            title={bookmarked ? 'Remove bookmark' : 'Save for later'}
          >
            {bookmarked ? '★ Saved' : '☆ Save'}
          </button>
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors text-xs sm:text-sm font-medium text-center"
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;
