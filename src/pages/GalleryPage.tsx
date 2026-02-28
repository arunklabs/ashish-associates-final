"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Grid, Image as ImageIcon, Users, Building2, Scale, Award, ChevronDown, Calendar, Clock, Eye, Loader2 } from 'lucide-react';

// Gallery categories with gold theme
const categories = [
  { id: 'all', label: 'All Photos', icon: Grid },
  { id: 'office', label: 'Office', icon: Building2 },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'events', label: 'Events', icon: Award },
  { id: 'courtroom', label: 'Courtroom', icon: Scale },
];

// Sample gallery images (increased for pagination demo)
const galleryImages = [
  {
    id: 1,
    title: 'Main Conference Room',
    category: 'office',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=300&h=400&q=60',
    description: 'State-of-the-art conference facility for client meetings',
    date: '2026',
    views: 234,
  },
  {
    id: 2,
    title: 'Legal Team Meeting',
    category: 'team',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=300&h=400&q=60',
    description: 'Senior partners discussing case strategy',
    date: '2026',
    views: 189,
  },
  {
    id: 3,
    title: 'Annual Legal Symposium',
    category: 'events',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=300&h=400&q=60',
    description: 'Our team at the annual legal conference',
    date: '2023',
    views: 456,
  },
  {
    id: 4,
    title: 'Modern Library',
    category: 'office',
    imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=300&h=400&q=60',
    description: 'Extensive legal research library',
    date: '2026',
    views: 167,
  },
  {
    id: 5,
    title: 'Federal Court Appearance',
    category: 'courtroom',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=300&h=400&q=60',
    description: 'Outside the Supreme Court',
    date: '2023',
    views: 892,
  },
  {
    id: 6,
    title: 'Partner Portraits',
    category: 'team',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&h=400&q=60',
    description: 'Executive leadership team',
    date: '2026',
    views: 345,
  },
  {
    id: 7,
    title: 'Client Reception Area',
    category: 'office',
    imageUrl: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=300&h=400&q=60',
    description: 'Welcoming reception with modern amenities',
    date: '2026',
    views: 278,
  },
  {
    id: 8,
    title: 'Pro Bono Award Ceremony',
    category: 'events',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=300&h=400&q=60',
    description: 'Receiving community service award',
    date: '2023',
    views: 567,
  },
  {
    id: 9,
    title: 'Partner Meeting Room',
    category: 'office',
    imageUrl: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=300&h=400&q=60',
    description: 'Executive meeting space with modern amenities',
    date: '2026',
    views: 198,
  },
  {
    id: 10,
    title: 'Legal Research Team',
    category: 'team',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=300&h=400&q=60',
    description: 'Research team analyzing case files',
    date: '2026',
    views: 276,
  },
  {
    id: 11,
    title: 'Corporate Law Seminar',
    category: 'events',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=300&h=400&q=60',
    description: 'Annual corporate law seminar',
    date: '2023',
    views: 432,
  },
  {
    id: 12,
    title: 'Law Library Interior',
    category: 'office',
    imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=300&h=400&q=60',
    description: 'Historic law library with extensive collection',
    date: '2026',
    views: 321,
  },
  {
    id: 13,
    title: 'Mediation Session',
    category: 'courtroom',
    imageUrl: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=300&h=400&q=60',
    description: 'Mediation in progress',
    date: '2023',
    views: 156,
  },
  {
    id: 14,
    title: 'Team Building Event',
    category: 'team',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=300&h=400&q=60',
    description: 'Annual team building retreat',
    date: '2026',
    views: 243,
  },
  {
    id: 15,
    title: 'Client Meeting',
    category: 'office',
    imageUrl: 'https://images.unsplash.com/photo-1557425955-df376b5903c8?auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1557425955-df376b5903c8?auto=format&fit=crop&w=300&h=400&q=60',
    description: 'Confidential client consultation',
    date: '2026',
    views: 187,
  },
  {
    id: 16,
    title: 'Award Ceremony',
    category: 'events',
    imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f95d1e81?auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f95d1e81?auto=format&fit=crop&w=300&h=400&q=60',
    description: 'Receiving "Law Firm of the Year" award',
    date: '2023',
    views: 654,
  },
];

// Progressive Image Component
const ProgressiveImage = ({ src, thumbnail, alt, onLoad, className, ...props }: { src: string; thumbnail: string; alt: string; onLoad?: () => void; className?: string; [key: string]: unknown }) => {
  const [currentSrc, setCurrentSrc] = useState(thumbnail);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // Start loading full image
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoading(false);
      if (onLoad) onLoad();
    };
    img.onerror = () => {
      setError(true);
      setIsLoading(false);
    };
  }, [src, onLoad]);

  return (
    <div className="relative w-full h-full">
      {/* Blur-up placeholder */}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        className={`${className} transition-opacity duration-500 ${
          isLoading ? 'opacity-90 scale-105 filter blur-sm' : 'opacity-100 scale-100 filter blur-0'
        }`}
        {...props}
      />
      
      {/* Loading spinner for slow connections */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* Error fallback */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <ImageIcon className="w-8 h-8 text-gray-400" />
        </div>
      )}
    </div>
  );
};

// Intersection Observer for lazy loading
const useIntersectionObserver = (options: IntersectionObserverInit = {}) => {
  const [elements, setElements] = useState<Element[]>([]);
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((observedEntries) => {
      setEntries(observedEntries);
    }, options);

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [elements, options]);

  return [setElements, entries];
};

type GalleryImage = { id: number; title: string; category: string; imageUrl: string; thumbnailUrl: string; description: string; date: string; views: number };

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // Simulate initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter images based on active category
  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  // Get visible images based on pagination
  const visibleImages = filteredImages.slice(0, visibleCount);
  const hasMore = visibleCount < filteredImages.length;

  // Reset pagination when category changes
  useEffect(() => {
    setVisibleCount(8);
    setCurrentIndex(0);
    setSelectedImage(null);
  }, [activeCategory]);

  // Handle image load
  const handleImageLoad = (id: string | number) => {
    setImagesLoaded(prev => ({ ...prev, [id]: true }));
  };

  // Handle load more
  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading delay for smooth animation
    setTimeout(() => {
      setVisibleCount(prev => prev + 4);
      setLoading(false);
    }, 800);
  };

  // Handle lightbox navigation
  const handlePrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? visibleImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(visibleImages[newIndex]);
  }, [currentIndex, visibleImages]);

  const handleNext = useCallback(() => {
    const newIndex = currentIndex === visibleImages.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedImage(visibleImages[newIndex]);
  }, [currentIndex, visibleImages]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, handlePrevious, handleNext]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  const bannerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const bannerItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  // Lightbox variants
  const lightboxVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  const infoVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.2,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  };

  // Page loading skeleton
  if (pageLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white -mt-20">
      {/* Gallery Banner Section with Image Overlay */}
      <section className="relative h-[60vh] min-h-[500px] md:h-[85vh] overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="absolute inset-0"
        >
          <ProgressiveImage
            src="https://plus.unsplash.com/premium_photo-1674826272758-e5c26d177cf2?w=1200&auto=format&fit=crop&q=80"
            thumbnail="https://plus.unsplash.com/premium_photo-1674826272758-e5c26d177cf2?w=100&auto=format&fit=crop&q=20"
            alt="Law Firm Gallery"
            className="w-full h-full object-cover"
          />
          {/* Multiple Overlay Layers for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        </motion.div>

        {/* Content - Centered */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <motion.div
            variants={bannerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-3xl text-center"
          >
            <motion.div 
              variants={bannerItemVariants}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-px bg-[#C9A646]"
              />
              <motion.p 
                className="text-sm uppercase tracking-[0.2em] text-[#C9A646] font-semibold"
              >
                Our Gallery
              </motion.p>
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-px bg-[#C9A646]"
              />
            </motion.div>
            
            {/* Title with Gold Span */}
            <motion.h1 
              variants={bannerItemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-16"
            >
              Our <span className="text-amber-500 italic">Gallery</span>
            </motion.h1>

            {/* Quick Stats with Gold Numbers */}
            <motion.div 
              variants={bannerVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-10 max-w-2xl mx-auto"
            >
              {[
                { number: '4+', label: 'Years' },
                { number: '30+', label: 'Team Members' },
                { number: '50+', label: 'Cases Won' },
                { number: '15+', label: 'Awards' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={bannerItemVariants}
                  className="text-center"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.6 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                    className="text-2xl md:text-3xl font-bold text-amber-500 mb-1"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-xs md:text-sm text-gray-300 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section with Tabs */}
      <section className="py-12 md:py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-10 md:mb-12"
          >
            <motion.div 
              className="flex items-center justify-center gap-3 mb-6"
            >
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-px bg-amber-500"
              />
              <motion.p 
                className="text-sm uppercase tracking-[0.2em] text-amber-500 font-semibold"
              >
                Our Collections
              </motion.p>
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-px bg-amber-500"
              />
            </motion.div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gray-900 mt-2">
              Moments That <span className="text-amber-500 italic">Define Us</span>
            </h2>
          </motion.div>

          {/* Category Tabs - Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-12"
          >
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;
                
                return (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center space-x-1 md:space-x-2 px-3 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                        : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-amber-500 border border-gray-200'
                    }`}
                  >
                    <Icon className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{category.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Gallery Grid - Fully Responsive with Progressive Loading */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-6"
          >
            <AnimatePresence mode="wait">
              {visibleImages.map((image, index) => (
                <motion.div
                  key={image.id}
                //   variants={itemVariants}
                //   layout
                //   initial={{ opacity: 0, scale: 0.9 }}
                //   animate={{ opacity: 1, scale: 1 }}
                //   exit={{ opacity: 0, scale: 0.9 }}
                //   transition={{ 
                //     duration: 0.5,
                //     delay: index * 0.05,
                //     ease: [0.25, 0.1, 0.25, 1] as const
                //   }}
                  className="group relative cursor-pointer"
                  onClick={() => {
                    setSelectedImage(image);
                    setCurrentIndex(index);
                  }}
                >
                  <div className="relative overflow-hidden rounded-lg md:rounded-xl bg-white shadow-md hover:shadow-2xl transition-all duration-500">
                    {/* Image Container with Progressive Loading */}
                    <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                      <ProgressiveImage
                        src={image.imageUrl}
                        thumbnail={image.thumbnailUrl}
                        alt={image.title}
                        onLoad={() => handleImageLoad(image.id)}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Overlay Gradient - Black with Gold accent */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Content Overlay */}
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <h3 className="text-white font-serif text-sm md:text-base lg:text-lg font-semibold mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          {image.title}
                        </h3>
                        <div className="flex items-center justify-between transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-amber-500" />
                            <span className="text-amber-500 text-xs font-medium">
                              {image.date}
                            </span>
                          </div>
                          {/* <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3 text-white" />
                            <span className="text-white text-xs">{image.views}</span>
                          </div> */}
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Category Badge */}
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      className="absolute top-2 left-2 md:top-4 md:left-4 z-10"
                    >
                      <span className="px-2 md:px-3 py-0.5 md:py-1 bg-white/95 backdrop-blur-sm text-amber-600 text-xs font-medium rounded-full shadow-lg">
                        {categories.find(c => c.id === image.category)?.label}
                      </span>
                    </motion.div>

                    {/* Gold Accent on Hover */}
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 origin-left"
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Load More Button */}
          {hasMore && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center mt-10 md:mt-12 lg:mt-16"
            >
              <Button
                onClick={handleLoadMore}
                disabled={loading}
                size="xl"
                className="group w-full sm:w-auto px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-primary 
                text-primary-foreground font-semibold rounded-sm hover:bg-accent transition-all duration-300 
                btn-shine text-center inline-flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <span>Load More</span>
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </Button>
            </motion.div>
          )}

          {/* Empty State */}
          {visibleImages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16 md:py-20"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="bg-white rounded-full w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                <ImageIcon className="w-10 h-10 md:w-12 md:h-12 text-amber-400" />
              </motion.div>
              <h3 className="text-lg md:text-xl font-serif text-gray-800 mb-2">
                No images found
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Try selecting a different category
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal - Enhanced Design with Progressive Loading */}
      <AnimatePresence>
  {selectedImage && (
    <motion.div
      variants={lightboxVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-50 bg-black/98 flex items-center justify-center p-2 md:p-4"
      onClick={() => setSelectedImage(null)}
    >
      {/* Close Button - Always visible */}
      <motion.button
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 90 }}
        whileHover={{ scale: 1.1, rotate: 90 }}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedImage(null);
        }}
        className="absolute top-40 right-4 md:top-28 md:right-20 lg:top-16 xl:top-10 lg:right-28 text-white hover:text-amber-500 transition-colors z-[60] bg-black/50 backdrop-blur-md rounded-full p-3 border border-white/20 shadow-xl"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </motion.button>

      {/* Navigation Buttons - Always visible on all screens */}
      {/* Previous Button */}
      <motion.button
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -50, opacity: 0 }}
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(245, 158, 11, 0.3)' }}
        onClick={(e) => {
          e.stopPropagation();
          handlePrevious();
        }}
        className="absolute left-4 md:left-[13%] top-1/2 -translate-y-1/2 text-white hover:text-amber-500 transition-colors z-[60] bg-black/50 backdrop-blur-md rounded-full p-3 md:p-4 border border-white/20 shadow-xl"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </motion.button>

      {/* Next Button */}
      <motion.button
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 50, opacity: 0 }}
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(245, 158, 11, 0.3)' }}
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-4 md:right-[13%] top-1/2 -translate-y-1/2 text-white hover:text-amber-500 transition-colors z-[60] bg-black/50 backdrop-blur-md rounded-full p-3 md:p-4 border border-white/20 shadow-xl"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </motion.button>

      {/* Image Counter - Top Left */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="hidden lg:block absolute top-4 left-4 md:top-[10%] md:left-1/2 text-white text-sm md:text-base bg-black/50 backdrop-blur-md px-4 md:px-5 py-2 rounded-full border border-white/20 z-[60] shadow-xl"
      >
        <span className="text-amber-500 font-bold mr-1">{currentIndex + 1}</span> 
        <span className="text-white/70">/ {visibleImages.length}</span>
      </motion.div>

      {/* Main Image Container */}
      <motion.div
        key={currentIndex}
        variants={imageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative w-full max-w-6xl mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-lg overflow-hidden bg-black/50 shadow-2xl">
          <ProgressiveImage
            src={visibleImages[currentIndex]?.imageUrl}
            thumbnail={visibleImages[currentIndex]?.thumbnailUrl}
            alt={visibleImages[currentIndex]?.title}
            className="w-full h-auto max-h-[60vh] md:max-h-[75vh] lg:max-h-[85vh] object-contain"
          />
        </div>
        
        {/* Image Info - Bottom Panel */}
        <motion.div 
          variants={infoVariants}
          initial="hidden"
          animate="visible"
          className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 bg-gradient-to-t from-black/95 via-black/80 to-transparent rounded-b-lg"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-white text-lg md:text-xl lg:text-2xl font-serif font-bold mb-2">
                {visibleImages[currentIndex]?.title}
              </h3>
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3 md:w-4 md:h-4 text-amber-500" />
                  <span className="text-white text-xs md:text-sm">{visibleImages[currentIndex]?.date}</span>
                </div>
                {/* <div className="flex items-center gap-2">
                  <Eye className="w-3 h-3 md:w-4 md:h-4 text-amber-500" />
                  <span className="text-white text-xs md:text-sm">{visibleImages[currentIndex]?.views} views</span>
                </div> */}
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-amber-500/20 text-amber-500 text-xs font-medium rounded-full">
                    {categories.find(c => c.id === visibleImages[currentIndex]?.category)?.label}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Mobile/Tablet Navigation Dots */}
            <div className="flex md:hidden items-center justify-center gap-2">
              {visibleImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                    setSelectedImage(visibleImages[idx]);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? 'w-6 bg-amber-500' 
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Corner Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-24 h-24 md:w-32 md:h-32 border-t-2 border-l-2 border-amber-500/30 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 border-t-2 border-r-2 border-amber-500/30 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-24 h-24 md:w-32 md:h-32 border-b-2 border-l-2 border-amber-500/30 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-24 h-24 md:w-32 md:h-32 border-b-2 border-r-2 border-amber-500/30 rounded-br-lg" />
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
};

export default GalleryPage;