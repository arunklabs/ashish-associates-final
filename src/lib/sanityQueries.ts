// Type definitions for CMS data
export interface BlogPost {
  _id: string
  title?: string
  slug?: {
    current: string
  }
  category?: string
  date?: string
  excerpt?: string
  image?: {
    asset?: {
      url?: string
    }
  }
}

export interface Career {
  _id: string
  title: string
  location: string
  type: 'Full-Time' | 'Part-Time' | 'Contract' | 'Freelance' | 'Internship'
  desc: string
  icon: string
}

export interface Founder {
  _id: string

  profileImage?: {
    asset?: {
      url?: string
    }
  }

  name: string
  designation: string
  role?: string
  initials?: string

  specialty?: string
  experience?: number
  recognition?: string
  university?: string

  tags?: string[]
  casesCount?: number

  email?: string
  phone?: string

  social?: {
    linkedin?: string
    twitter?: string
    facebook?: string
  }

  details?: {
    practiceAreas?: string[]
    education?: string[]
    barAssociations?: string[]
    organizations?: string[]
    awards?: string[]
  }
}

export interface Employee {
  _id: string
  name: string
  designation?: string
  role?: string
  specialty?: string
  experience?: number
  bio?: string
  category?: 'founder' | 'senior' | 'associate' | 'junior'
  initials?: string
  email?: string

  image?: {
    asset?: {
      url: string
    }
  }
}

// Utility functions for handling missing data
export const getBlogImageUrl = (post: BlogPost): string => {
  return (
    post.image?.asset?.url ??
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
  )
}

export const getEmployeeImageUrl = (employee: Employee): string => {
    return (
        employee.image?.asset?.url ??
        `https://ui-avatars.com/api/?name=${encodeURIComponent(employee?.name || 'Employee')}&background=E5E7EB&color=6B7280&size=400`
    )
}

export const getFounderImageUrl = (founder: Founder): string => {
    return (
        founder.profileImage?.asset?.url ??
        `https://ui-avatars.com/api/?name=${encodeURIComponent(founder?.name || 'Founder')}&background=E5E7EB&color=6B7280&size=400`
    )
}

export const formatDate = (dateString?: string): string => {
  if (!dateString) return 'Date not available'

  const date = new Date(dateString)
  return isNaN(date.getTime())
    ? 'Date not available'
    : date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
}

export const getJobTypeDisplay = (type: Career['type']): string => {
  return type
}

// Default fallback data for when CMS is unavailable
export const getDefaultBlogPosts = (): BlogPost[] => [
  {
    _id: 'fallback-blog-1',
    title: 'Understanding Corporate Compliance in 2025',
    category: 'Corporate Law',
    date: '2026-02-15',
    excerpt:
      'New regulations reshaping corporate governance and what businesses need to know to stay compliant.',
  },
]

export const getDefaultCareers = (): Career[] => [
  {
    _id: 'fallback-career-1',
    title: 'Senior Associate – Corporate Law',
    location: 'Chennai, CH',
    type: 'Full-Time',
    desc:
      'Join our corporate team advising Fortune 500 clients on complex M&A transactions and governance matters.',
    icon: 'Briefcase',
  },
]

export const getDefaultFounders = (): Founder[] => [
  {
    _id: 'fallback-founder-1',
    name: 'Sample Founder',
    designation: 'Senior Partner',
    specialty: 'Corporate Law',
    experience: 15,
    recognition: 'Recognized leader in corporate law',
    university: 'Sample University',
    tags: ['Corporate Law', 'M&A'],
    casesCount: 100,
  },
]