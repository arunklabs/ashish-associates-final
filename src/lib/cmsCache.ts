import { sanityFetch } from './sanityClient';
import { BlogPost, Career, Employee, Founder } from './sanityQueries';

// Session storage key for CMS data cache
const CMS_CACHE_KEY = 'ashish_law_cms_cache';

// CMS data cache structure stored in sessionStorage
interface CMSCache {
  employees: Employee[];
  blogs: BlogPost[];
  careers: Career[];
  founders: Founder[];
  fetched: boolean;
  timestamp: number; // For cache validation
}

// Default empty cache structure
const getDefaultCache = (): CMSCache => ({
  employees: [],
  blogs: [],
  careers: [],
  founders: [],
  fetched: false,
  timestamp: 0
});

// Safe data extraction utilities with proper fallbacks
export const safeDataExtraction = {
  // Safely extract string with fallback
  getString: (value: any, fallback = ""): string => {
    return value && typeof value === 'string' ? value : fallback;
  },
  
  // Safely extract array with fallback
  getArray: (value: any, fallback: any[] = []): any[] => {
    return Array.isArray(value) ? value : fallback;
  },
  
  // Safely extract number with fallback
  getNumber: (value: any, fallback = 0): number => {
    return typeof value === 'number' && !isNaN(value) ? value : fallback;
  },
  
  // Safely extract image URL with fallback
  getImageUrl: (imageObj: any, fallback: string): string => {
    return imageObj?.asset?.url || fallback;
  },
  
  // Safely extract social links object
  getSocialLinks: (socialObj: any) => ({
    linkedin: safeDataExtraction.getString(socialObj?.linkedin),
    twitter: safeDataExtraction.getString(socialObj?.twitter),
    facebook: safeDataExtraction.getString(socialObj?.facebook),
  })
};

/**
 * Get CMS cache from sessionStorage
 * Creates new cache if none exists or if cache is invalid
 */
const getCacheFromSession = (): CMSCache => {
  try {
    const cached = sessionStorage.getItem(CMS_CACHE_KEY);
    if (cached) {
      const parsedCache = JSON.parse(cached) as CMSCache;
      // Validate cache structure
      if (parsedCache && typeof parsedCache === 'object' && typeof parsedCache.fetched === 'boolean') {
        return parsedCache;
      }
    }
  } catch (error) {
    console.warn('Failed to parse CMS cache from sessionStorage:', error);
  }
  
  return getDefaultCache();
};

/**
 * Save CMS cache to sessionStorage
 */
const saveCacheToSession = (cache: CMSCache): void => {
  try {
    sessionStorage.setItem(CMS_CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('Failed to save CMS cache to sessionStorage:', error);
  }
};

/**
 * Fetch all CMS data in a single operation
 * This is the ONLY function that makes API calls to Sanity
 */
const fetchAllCMSData = async (): Promise<{ employees: Employee[]; blogs: BlogPost[]; careers: Career[]; founders: Founder[]; }> => {
  console.log('🔄 Fetching all CMS data from Sanity...');
  
  // Fetch all data types in parallel for optimal performance
  const [employees, blogs, careers, founders] = await Promise.allSettled([
    // Employees query with all required fields
    sanityFetch<Employee[]>(`*[_type == "employee"] | order(_createdAt desc) {
      _id,
      profileImage {
        asset->{
          url
        }
      },
      name,
      designation,
      role,
      specialty,
      experience,
      recognition,
      university,
      tags,
      casesCount,
      initials,
      email,
      phone,
      social,
      details
    }`),
    
    // Blog posts query with all required fields
    sanityFetch<BlogPost[]>(`*[_type == "blog"] | order(date desc) {
      _id,
      title,
      slug,
      category,
      date,
      author->{
        name
      },
      excerpt,
      content,
      image {
        asset->{
          url
        }
      }
    }`),
    
    // Careers query with all required fields
    sanityFetch<Career[]>(`*[_type == "career"] | order(_createdAt desc) {
      _id,
      jobTitle,
      location,
      jobType,
      description
    }`),
    
    // Founders query with all required fields
    sanityFetch<Founder[]>(`*[_type == "founder"] | order(_createdAt desc) {
      _id,
      profileImage {
        asset->{
          url
        }
      },
      name,
      designation,
      role,
      specialty,
      experience,
      recognition,
      university,
      tags,
      casesCount,
      initials,
      email,
      phone,
      social,
      details
    }`)
  ]);

  // Extract results with safe fallbacks
  const employeeData = employees.status === 'fulfilled' ? employees.value || [] : [];
  const founderData = founders.status === 'fulfilled' ? founders.value || [] : [];
  const blogData = blogs.status === 'fulfilled' ? blogs.value || [] : [];
  const careerData = careers.status === 'fulfilled' ? careers.value || [] : [];

  console.log('✅ CMS data fetched successfully:', {
    employees: employeeData.length,
    blogs: blogData.length,
    careers: careerData.length,
    founders: founderData.length
  });

  return {
    employees: employeeData,
    blogs: blogData,
    careers: careerData,
    founders: founderData
  };
};

/**
 * Main CMS data provider function
 * Returns cached data if available, otherwise fetches from Sanity
 * This should be called by all components that need CMS data
 */
export const getCMSData = async (): Promise<CMSCache> => {
  const currentCache = getCacheFromSession();
  
  // Return cached data if already fetched this session
  if (currentCache.fetched) {
    console.log('📦 Using cached CMS data from sessionStorage');
    return currentCache;
  }
  
  try {
    // Fetch all data from Sanity in one operation
    const freshData = await fetchAllCMSData();
    
    // Create new cache with fetched data
    const newCache: CMSCache = {
      ...freshData,
      fetched: true,
      timestamp: Date.now()
    };
    
    // Save to sessionStorage for future component usage
    saveCacheToSession(newCache);
    
    return newCache;
  } catch (error) {
    console.error('❌ Failed to fetch CMS data:', error);
    
    // Return cache with empty data but mark as fetched to prevent retry loops
    const errorCache: CMSCache = {
      employees: [],
      blogs: [],
      careers: [],
      founders: [],
      fetched: true, // Mark as fetched to prevent infinite retry
      timestamp: Date.now()
    };
    
    saveCacheToSession(errorCache);
    return errorCache;
  }
};

/**
 * Clear CMS cache (useful for development or manual refresh)
 */
export const clearCMSCache = (): void => {
  try {
    sessionStorage.removeItem(CMS_CACHE_KEY);
    console.log('🧹 CMS cache cleared');
  } catch (error) {
    console.error('Failed to clear CMS cache:', error);
  }
};

/**
 * Get cache status for debugging
 */
export const getCacheStatus = (): { isCached: boolean; cacheSize: number; timestamp: number } => {
  const cache = getCacheFromSession();
  return {
    isCached: cache.fetched,
    cacheSize: cache.employees.length + cache.blogs.length + cache.careers.length,
    timestamp: cache.timestamp
  };
};