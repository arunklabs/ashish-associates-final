"use client";

import Link from "next/link";
import AnimatedSection from "../components/AnimatedSection";
import { useState } from "react";
import { motion } from "framer-motion";

const posts = [
  { 
    title: "Understanding Corporate Compliance in 2025", 
    category: "Corporate Law", 
    date: "Feb 15, 2026", 
    excerpt: "New regulations reshaping corporate governance and what businesses need to know to stay compliant.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "The Evolution of Digital Privacy Laws", 
    category: "Technology Law", 
    date: "Feb 10, 2026", 
    excerpt: "How emerging digital privacy legislation affects businesses and individuals in the modern landscape.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "Navigating International Trade Disputes", 
    category: "Litigation", 
    date: "Feb 5, 2026", 
    excerpt: "Expert insights on resolving cross-border commercial disputes efficiently and effectively.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "Real Estate Market Legal Trends", 
    category: "Real Estate", 
    date: "Jan 28, 2026", 
    excerpt: "Key legal considerations for investors and developers in the current real estate landscape.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "Protecting Your Intellectual Property", 
    category: "IP Law", 
    date: "Jan 20, 2026", 
    excerpt: "Essential strategies for safeguarding patents, trademarks, and trade secrets in a competitive market.",
    image: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "Immigration Policy Updates", 
    category: "Immigration", 
    date: "Jan 15, 2026", 
    excerpt: "Recent changes to immigration policy and their impact on businesses and families.",
    image: "https://images.unsplash.com/photo-1559128199-163556ec1b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "Employment Law: Remote Work Regulations", 
    category: "Employment Law", 
    date: "Jan 10, 2026", 
    excerpt: "New guidelines for employers managing remote and hybrid workforces in 2026.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "Mergers & Acquisitions: Legal Pitfalls", 
    category: "Corporate Law", 
    date: "Jan 5, 2026", 
    excerpt: "Common legal challenges in M&A transactions and how to avoid them.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "Environmental Regulations Update", 
    category: "Environmental Law", 
    date: "Dec 28, 2025", 
    excerpt: "Recent changes in environmental compliance requirements for businesses.",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

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
  const [visiblePosts, setVisiblePosts] = useState(6);

  const loadMore = () => {
    setVisiblePosts(prev => Math.min(prev + 3, posts.length));
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
            {posts.slice(0, visiblePosts).map((post, i) => (
              <motion.div
                key={post.title}
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
                      src={post.image} 
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
                        {post.date}
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
            ))}
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