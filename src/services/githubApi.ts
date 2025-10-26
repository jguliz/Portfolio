// GitHub API Service
export interface GitHubLanguages {
  [language: string]: number; // language name -> bytes of code
}

export interface GitHubRepoStats {
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  language: string;
  languages?: GitHubLanguages; // All languages with percentages
  size: number;
  createdAt: string;
  updatedAt: string;
  description: string;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const cache = new Map<string, { data: GitHubRepoStats; timestamp: number }>();
const languagesCache = new Map<string, { data: GitHubLanguages; timestamp: number }>();

/**
 * Fetches repository statistics from GitHub API
 * @param repoUrl - Full GitHub repository URL (e.g., "https://github.com/username/repo")
 * @returns Repository statistics or null if error
 */
export async function fetchGitHubStats(repoUrl: string): Promise<GitHubRepoStats | null> {
  try {
    // Extract owner and repo from URL
    const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
      console.error('Invalid GitHub URL format:', repoUrl);
      return null;
    }

    const [, owner, repo] = match;
    const cacheKey = `${owner}/${repo}`;

    // Check cache
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    // Fetch from GitHub API
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);

    if (!response.ok) {
      console.error('GitHub API error:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();

    // Fetch languages separately
    let languages: GitHubLanguages | undefined;
    const langCached = languagesCache.get(cacheKey);
    if (langCached && Date.now() - langCached.timestamp < CACHE_DURATION) {
      languages = langCached.data;
    } else {
      try {
        const langResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`);
        if (langResponse.ok) {
          languages = await langResponse.json();
          languagesCache.set(cacheKey, { data: languages, timestamp: Date.now() });
        }
      } catch (error) {
        console.warn('Could not fetch languages:', error);
      }
    }

    const stats: GitHubRepoStats = {
      stars: data.stargazers_count || 0,
      forks: data.forks_count || 0,
      watchers: data.watchers_count || 0,
      openIssues: data.open_issues_count || 0,
      language: data.language || 'Unknown',
      languages: languages,
      size: data.size || 0,
      createdAt: data.created_at || '',
      updatedAt: data.updated_at || '',
      description: data.description || '',
    };

    // Cache the result
    cache.set(cacheKey, { data: stats, timestamp: Date.now() });

    return stats;
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return null;
  }
}

/**
 * Formats a number to a short string with K/M suffix
 * @param num - Number to format
 * @returns Formatted string (e.g., "1.2K", "3.5M")
 */
export function formatCount(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Formats a date to relative time
 * @param dateString - ISO date string
 * @returns Relative time string (e.g., "2 days ago")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

/**
 * Converts GitHub languages object to array with percentages
 * @param languages - Languages object from GitHub API
 * @returns Array of languages with percentages, sorted by usage
 */
export function getLanguagePercentages(languages: GitHubLanguages): Array<{ name: string; percentage: number; bytes: number }> {
  const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);

  return Object.entries(languages)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: Math.round((bytes / total) * 100 * 10) / 10 // Round to 1 decimal
    }))
    .sort((a, b) => b.bytes - a.bytes); // Sort by usage (most used first)
}
