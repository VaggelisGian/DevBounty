// Bookmark management service
const BOOKMARKS_KEY = 'devbounty_bookmarks';

export const getBookmarks = () => {
  try {
    const bookmarks = localStorage.getItem(BOOKMARKS_KEY);
    return bookmarks ? JSON.parse(bookmarks) : [];
  } catch (e) {
    console.error('Error loading bookmarks:', e);
    return [];
  }
};

export const addBookmark = (opportunity) => {
  try {
    const bookmarks = getBookmarks();
    // Check if already bookmarked
    if (bookmarks.some(b => b.id === opportunity.id)) {
      return false; // Already bookmarked
    }
    bookmarks.unshift({
      ...opportunity,
      bookmarkedAt: new Date().toISOString()
    });
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    return true;
  } catch (e) {
    console.error('Error adding bookmark:', e);
    return false;
  }
};

export const removeBookmark = (opportunityId) => {
  try {
    const bookmarks = getBookmarks();
    const filtered = bookmarks.filter(b => b.id !== opportunityId);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(filtered));
    return true;
  } catch (e) {
    console.error('Error removing bookmark:', e);
    return false;
  }
};

export const isBookmarked = (opportunityId) => {
  const bookmarks = getBookmarks();
  return bookmarks.some(b => b.id === opportunityId);
};

export const clearBookmarks = () => {
  localStorage.removeItem(BOOKMARKS_KEY);
  console.log('All bookmarks cleared');
};
