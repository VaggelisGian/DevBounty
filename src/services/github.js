const GITHUB_API = 'https://api.github.com';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const searchGitHubBounties = async (filters = {}) => {
  const { language, minAmount, difficulty, searchQuery } = filters;
  
  // Build search query parts as an array for cleaner combination
  let queryParts = ['is:issue', 'is:open'];
  
  // Add bounty-related search
  if (searchQuery) {
    queryParts.push(searchQuery);
  } else {
    // Search for multiple bounty labels - we'll make multiple calls and combine
    // Start with the most common: bounty label
    queryParts.push('label:bounty');
  }
  
  if (language) {
    queryParts.push(`language:${language}`);
  }
  
  // Join with spaces for GitHub API
  const query = queryParts.join(' ');
  
  console.log('GitHub search query:', query);
  
  // Check cache
  const cacheKey = `bounties_${query}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      const { data, timestamp } = JSON.parse(cached);
      const age = Date.now() - timestamp;
      console.log(`Cache found for "${cacheKey}": ${data.length} items, age: ${Math.round(age/1000)}s`);
      if (age < CACHE_DURATION) {
        console.log('Using cached data');
        return filterResults(data, { minAmount, difficulty });
      } else {
        console.log('Cache expired, fetching fresh data');
        localStorage.removeItem(cacheKey); // Clear expired cache
      }
    } catch (e) {
      console.warn('Cache parse error, clearing:', e);
      localStorage.removeItem(cacheKey);
    }
  }
  
  console.log(`Fetching from GitHub API: ${GITHUB_API}/search/issues?q=${encodeURIComponent(query)}`);
  
  try {
    const response = await fetch(
      `${GITHUB_API}/search/issues?q=${encodeURIComponent(query)}&sort=created&order=desc&per_page=100`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        }
      }
    );
    
    console.log('GitHub API Response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('GitHub API Error:', errorData);
      throw new Error(`GitHub API returned ${response.status}: ${errorData.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    
    console.log(`GitHub API: Found ${data.total_count} total results, showing ${data.items?.length || 0} items`);
    
    if (!data.items || data.items.length === 0) {
      console.warn('No GitHub issues found matching the search criteria');
      console.log('Tip: Try removing filters or searching for specific technologies');
      return [];
    }
    
    const opportunities = parseGitHubIssues(data.items);
    
    console.log(`Parsed ${opportunities.length} opportunities successfully`);
    
    // Cache results
    localStorage.setItem(cacheKey, JSON.stringify({
      data: opportunities,
      timestamp: Date.now()
    }));
    
    return filterResults(opportunities, { minAmount, difficulty });
  } catch (error) {
    console.error('Error fetching GitHub bounties:', error);
    throw error;
  }
};

const parseGitHubIssues = (issues) => {
  return issues.map(issue => {
    const bountyAmount = extractBountyAmount(issue.title, issue.body);
    const techStack = extractTechStack(issue.labels, issue.body);
    const difficulty = estimateDifficulty(issue);
    
    return {
      id: `github_${issue.id}`,
      title: issue.title,
      description: issue.body || '',
      source: 'GitHub',
      sourceUrl: issue.html_url,
      bountyAmount,
      techStack,
      postedDate: new Date(issue.created_at),
      difficulty,
      comments: issue.comments,
      repository: issue.repository_url.split('/').slice(-2).join('/'),
      labels: issue.labels.map(l => l.name),
      state: issue.state
    };
  });
};

const extractBountyAmount = (title, body) => {
  const text = `${title} ${body || ''}`;
  
  // Match patterns like $100, $1,000, $1000, 100$, etc.
  const patterns = [
    /\$\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/g,
    /(\d+(?:,\d{3})*(?:\.\d{2})?)\s*\$/g,
    /(\d+)\s*USD/gi,
    /(\d+)\s*dollars?/gi
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const amount = match[0].replace(/[^\d.]/g, '');
      return parseFloat(amount);
    }
  }
  
  return null;
};

const extractTechStack = (labels, body) => {
  const techKeywords = [
    'react', 'vue', 'angular', 'svelte', 'javascript', 'typescript', 'node',
    'python', 'django', 'flask', 'rust', 'go', 'golang', 'java', 'kotlin',
    'swift', 'ruby', 'rails', 'php', 'laravel', 'c++', 'c#', '.net',
    'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'postgresql', 'mysql',
    'mongodb', 'redis', 'graphql', 'rest', 'api'
  ];
  
  const text = `${labels.map(l => l.name).join(' ')} ${body || ''}`.toLowerCase();
  
  return techKeywords.filter(tech => text.includes(tech));
};

const estimateDifficulty = (issue) => {
  const bodyLength = (issue.body || '').length;
  const hasLabels = issue.labels.some(l => 
    ['good first issue', 'beginner', 'easy'].includes(l.name.toLowerCase())
  );
  
  if (hasLabels) return 'easy';
  if (bodyLength < 500) return 'easy';
  if (bodyLength < 1500) return 'medium';
  return 'hard';
};

const filterResults = (opportunities, filters) => {
  let filtered = [...opportunities];
  
  if (filters.minAmount) {
    filtered = filtered.filter(opp => 
      opp.bountyAmount && opp.bountyAmount >= filters.minAmount
    );
  }
  
  if (filters.difficulty) {
    filtered = filtered.filter(opp => opp.difficulty === filters.difficulty);
  }
  
  return filtered;
};

export const searchStartupJobs = async (filters = {}) => {
  const { language, searchQuery } = filters;
  
  // Build search query for hiring posts
  let queryParts = ['is:issue', 'is:open', 'hiring in:title'];
  
  if (searchQuery) {
    queryParts.push(searchQuery);
  }
  
  if (language) {
    queryParts.push(`language:${language}`);
  }
  
  const query = queryParts.join(' ');
  
  console.log('GitHub startup jobs query:', query);
  
  // Check cache
  const cacheKey = `startups_${query}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }
  
  try {
    const response = await fetch(
      `${GITHUB_API}/search/issues?q=${encodeURIComponent(query)}&sort=created&order=desc&per_page=100`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        }
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('GitHub API Error:', errorData);
      throw new Error(`GitHub API returned ${response.status}: ${errorData.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    
    console.log(`GitHub API: Found ${data.total_count} total hiring posts, showing ${data.items?.length || 0} items`);
    
    if (!data.items || data.items.length === 0) {
      console.warn('No hiring posts found');
      return [];
    }
    
    // Parse hiring posts (no bounty amount extraction)
    const opportunities = data.items.map(item => ({
      id: item.id,
      title: item.title,
      description: item.body || 'No description provided',
      source: 'GitHub',
      sourceUrl: item.html_url,
      bountyAmount: null, // No bounty for hiring posts
      techStack: extractTechStack(item.labels || [], item.body || ''),
      postedDate: new Date(item.created_at),
      difficulty: 'medium', // Default for job posts
      comments: item.comments,
      repository: item.repository_url.split('/').slice(-2).join('/'),
      labels: item.labels.map(l => l.name)
    }));
    
    console.log(`Parsed ${opportunities.length} hiring posts successfully`);
    
    // Cache results
    localStorage.setItem(cacheKey, JSON.stringify({
      data: opportunities,
      timestamp: Date.now()
    }));
    
    return opportunities;
  } catch (error) {
    console.error('Error fetching startup jobs:', error);
    throw error;
  }
};

export const clearCache = () => {
  const keys = Object.keys(localStorage);
  const cacheKeys = keys.filter(k => k.startsWith('bounties_') || k.startsWith('startups_'));
  cacheKeys.forEach(k => localStorage.removeItem(k));
  console.log(`Cleared ${cacheKeys.length} cache entries`);
  return cacheKeys.length;
};

export const getLanguages = () => {
  return [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust', 
    'C++', 'C#', 'Ruby', 'PHP', 'Swift', 'Kotlin'
  ];
};
