"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { getCMSData, safeDataExtraction } from "../lib/cmsCache";
import { BlogPost, formatDate, getBlogImageUrl } from "../lib/sanityQueries";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visiblePosts, setVisiblePosts] = useState(6);

  const displayedPosts = useMemo(() => {
  return posts.slice(0, visiblePosts);
}, [posts, visiblePosts]);

  // Load blog posts from shared CMS cache (single session-based fetch)
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get all CMS data from cache (fetches only once per session)
        const cmsData = await getCMSData();
        const blogData = cmsData.blogs || [];
        
        // Apply data safety with proper fallbacks for each blog post
        const safePosts = blogData.map((post: any) => ({
          _id: safeDataExtraction.getString(post._id, 'unknown'),

          title: safeDataExtraction.getString(post.title, 'Untitled Post'),

          slug: post.slug ?? { current: '' },

          category: safeDataExtraction.getString(post.category, 'General'),

          date: safeDataExtraction.getString(post.date, new Date().toISOString()),

          excerpt: safeDataExtraction.getString(
            post.excerpt,
            'No excerpt available'
          ),

          image: post.image,
        }));
        
        // Use fetched data, or fallback to default data if empty
        if (safePosts.length > 0) {
          setPosts(safePosts);
          setVisiblePosts(6);
        } else {
          console.warn('No blog posts found in CMS, using default data');
        }
      } catch (err) {
        console.error('Error loading blog posts:', err);
        setError('Failed to load blog posts');
        // Use default data as fallback
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const loadMore = () => {
  setVisiblePosts(prev => prev + 3);
};

  const hasMore = visiblePosts < posts.length;

  return (
    <div className="bg-white -mt-20">
      {/* Banner Section with Background Image */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />
        
        {/* Content */}
        <div className="relative z-10 container py-32 md:py-40 lg:py-52">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div 
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 }
                }}
                className="flex items-center justify-center gap-3 mb-6"
              >
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: 40 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="h-px bg-[#C9A646]"
                />
                <motion.p 
                  variants={{
                    initial: { opacity: 0, x: -20 },
                    animate: { opacity: 1, x: 0 }
                  }}
                  className="text-sm uppercase tracking-[0.2em] text-[#C9A646] font-semibold"
                >
                  Our Blogs
                </motion.p>
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: 40 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="h-px bg-[#C9A646]"
                />
              </motion.div>

              <motion.h1 
                variants={{
                  initial: { opacity: 0, y: 30 },
                  animate: { opacity: 1, y: 0 }
                }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-white"
              >
                Legal Blog
              </motion.h1>

              <motion.p 
                variants={{
                  initial: { opacity: 0, y: 30 },
                  animate: { opacity: 1, y: 0 }
                }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-gray-300 text-lg leading-relaxed"
              >
                Stay informed with the latest legal analysis, industry trends, and expert perspectives from our attorneys.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Blog Posts Section - White Theme */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-16 md:py-20 lg:py-24 bg-white"
      >
        <div className="container">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              variants={staggerContainer}
            >
              <motion.div 
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 }
                }}
                className="flex items-center justify-center gap-3 mb-6"
              >
                <motion.span 
                  initial={{ width: 0 }}
                  whileInView={{ width: 40 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="h-px bg-[#C9A646]"
                />
                <motion.p 
                  variants={{
                    initial: { opacity: 0, x: -20 },
                    animate: { opacity: 1, x: 0 }
                  }}
                  className="text-sm uppercase tracking-[0.2em] text-[#C9A646] font-semibold"
                >
                  Our Blog
                </motion.p>
                <motion.span 
                  initial={{ width: 0 }}
                  whileInView={{ width: 40 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="h-px bg-[#C9A646]"
                />
              </motion.div>

              <motion.h2 
                variants={{
                  initial: { opacity: 0, y: 30 },
                  animate: { opacity: 1, y: 0 }
                }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-3xl md:text-4xl font-heading font-bold text-black mb-4"
              >
                Latest Articles & <span className="text-[#C9A646]">Insights</span> 
              </motion.h2>
            </motion.div>
          </div>

          {/* Posts Grid */}
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {loading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  variants={{
                    initial: { opacity: 0, y: 50 },
                    animate: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="h-full"
                >
                  <article className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm h-full flex flex-col animate-pulse">
                    <div className="aspect-video bg-gray-200" />
                    <div className="p-5 md:p-6 flex-grow flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-3 bg-gray-200 rounded w-20" />
                        <div className="h-3 bg-gray-200 rounded w-16" />
                      </div>
                      <div className="h-5 bg-gray-200 rounded mb-3 w-3/4" />
                      <div className="space-y-2 flex-grow">
                        <div className="h-3 bg-gray-200 rounded w-full" />
                        <div className="h-3 bg-gray-200 rounded w-5/6" />
                      </div>
                    </div>
                  </article>
                </motion.div>
              ))
            ) : error ? (
              // Error state
              <div className="col-span-full text-center py-12">
                <div className="text-red-500 font-semibold mb-2">Error loading blog posts</div>
                <div className="text-gray-600 mb-4">Please try again later</div>
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-4 py-2 bg-[#D4AF37] text-white rounded-lg hover:bg-[#C9A646] transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : posts.length === 0 ? (
              // Empty state
              <div className="col-span-full text-center py-12">
                <div className="text-gray-600 font-semibold mb-2">No blog posts available</div>
                <div className="text-gray-500">Check back later for new articles</div>
              </div>
            ) : (
              // Render posts
              displayedPosts.map((post, i) => (
                <motion.div
                  key={post._id}
                  variants={{
                    initial: { opacity: 0, y: 50 },
                    animate: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="h-full"
                >
                  <article className="bg-white border border-gray-200 rounded-lg overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    {/* Image Container */}
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      className="aspect-video overflow-hidden bg-gray-100"
                    >
                      <img 
                        src={getBlogImageUrl(post)} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </motion.div>
                    
                    {/* Content */}
                    <div className="p-5 md:p-6 flex-grow flex flex-col">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <motion.span 
                          whileHover={{ scale: 1.05 }}
                          className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider"
                        >
                          {post.category}
                        </motion.span>
                        <span className="text-xs text-gray-500">
                          {formatDate(post.date)}
                        </span>
                      </div>
                      
                      <motion.h3 
                        whileHover={{ x: 5 }}
                        className="text-lg font-heading font-semibold mb-3 text-black group-hover:text-[#D4AF37] transition-colors line-clamp-2"
                      >
                        {post.title}
                      </motion.h3>
                      
                      <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>
                    </div>
                  </article>
                </motion.div>
              ))
            )}
          </motion.div>

          {/* Load More Button */}
          {hasMore && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-12 md:mt-16"
            >
              <motion.button
                onClick={loadMore}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-[#D4AF37] text-white font-semibold rounded-lg transition-all duration-300 inline-flex items-center gap-2 group"
              >
                Load More Articles
                <motion.span 
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="group-hover:translate-y-0.5 transition-transform"
                >
                  ↓
                </motion.span>
              </motion.button>
            </motion.div>
          )}

          {/* Posts Counter */}
          {posts.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-6 text-gray-500 text-sm"
            >
              Showing {visiblePosts} of {posts.length} articles
            </motion.div>
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default Blog;