export const formatDate = (date) => {
  const now = new Date();
  const diff = now - date;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 30) {
    return date.toLocaleDateString();
  } else if (days > 0) {
    return `${days}d ago`;
  } else if (hours > 0) {
    return `${hours}h ago`;
  } else if (minutes > 0) {
    return `${minutes}m ago`;
  } else {
    return 'Just now';
  }
};

export const isNew = (date) => {
  const hoursSincePost = (new Date() - date) / (1000 * 60 * 60);
  return hoursSincePost < 24;
};

export const isRecent = (date) => {
  const hoursSincePost = (new Date() - date) / (1000 * 60 * 60);
  return hoursSincePost < 72; // 3 days
};

export const formatCurrency = (amount) => {
  if (!amount) return 'Not specified';
  return `$${amount.toLocaleString()}`;
};

export const truncateText = (text, maxLength = 200) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'easy':
      return 'bg-gray-100 text-gray-700';
    case 'medium':
      return 'bg-gray-100 text-gray-700';
    case 'hard':
      return 'bg-gray-100 text-gray-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};
