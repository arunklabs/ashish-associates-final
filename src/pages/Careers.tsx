"use client";

import { motion } from "framer-motion";
import { ArrowRight, Award, Briefcase, Building2, Clock, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getCMSData, safeDataExtraction } from "../lib/cmsCache";
import { Career, getJobTypeDisplay } from "../lib/sanityQueries";

// Animation variants - Professional and smooth
const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.9, 
      ease: [0.25, 0.1, 0.25, 1] as const // Cubic-bezier for smooth acceleration/deceleration
    } 
  }
};

const fadeInDown = {
  hidden: { 
    opacity: 0, 
    y: -40 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.9, 
      ease: [0.25, 0.1, 0.25, 1] as const
    } 
  }
};

const fadeIn = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1, 
    transition: { 
      duration: 1.2, 
      ease: [0.25, 0.1, 0.25, 1] as const
    } 
  }
};

const slideFromLeft = {
  hidden: { 
    opacity: 0, 
    x: -50 
  },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 1, 
      ease: [0.25, 0.1, 0.25, 1] as const
    } 
  }
};

const slideFromRight = {
  hidden: { 
    opacity: 0, 
    x: 50 
  },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 1, 
      ease: [0.25, 0.1, 0.25, 1] as const
    } 
  }
};

const scaleIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.1, 0.25, 1] as const
    } 
  }
};

const staggerContainer = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.10,
      delayChildren: 0.2,
      ease: [0.25, 0.1, 0.25, 1] as const
    }
  }
};

const cardHover = {
  rest: { 
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }
  },
  hover: { 
    scale: 1.02,
    y: -5,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const }
  }
};

const buttonHover = {
  rest: { 
    scale: 1,
    transition: { duration: 0.3 }
  },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }
  }
};

const Careers = () => {
  const [positions, setPositions] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load career positions from shared CMS cache (single session-based fetch)
  useEffect(() => {
    const loadCareers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get all CMS data from cache (fetches only once per session)
        const cmsData = await getCMSData();
        const careerData = cmsData.careers || [];
        
        // Apply data safety with proper fallbacks for each career position
        const safePositions = careerData.map((position: any) => ({
          _id: safeDataExtraction.getString(position._id, 'unknown'),

          title: safeDataExtraction.getString(
            position.title,
            'Position Available'
          ),

          location: safeDataExtraction.getString(
            position.location,
            'Location TBD'
          ),

          type: safeDataExtraction.getString(
            position.type,
            'Full-Time'
          ) as Career['type'],

          desc: safeDataExtraction.getString(
            position.desc,
            'No description available'
          ),

          icon: safeDataExtraction.getString(
            position.icon,
            'Briefcase'
          ),
        }));
        
        // Use fetched data, or fallback to default data if empty
        if (safePositions.length > 0) {
          setPositions(safePositions);
        }
      } catch (err) {
        if (process.env.NODE_ENV === 'development') console.error('Error loading career positions:', err);
        setError('Failed to load career positions');
        // Use default data as fallback
      } finally {
        setLoading(false);
      }
    };

    loadCareers();
  }, []);

  return (
    <div className="-mt-20">
      {/* Banner Section - Dark Theme */}
      <section 
        className="relative w-full bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        {/* Animated Background Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-background/60"
        />
        
        {/* Animated Pattern Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute inset-0 pattern-gold"
        />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-32 md:py-40 lg:py-48 xl:py-52">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div 
              variants={fadeInDown}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ delay: 0.6, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const }}
                className="h-px bg-primary"
              />
              <motion.p 
                variants={slideFromLeft}
                className="text-sm uppercase tracking-[0.2em] text-primary font-semibold"
              >
                Join Our Team
              </motion.p>
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ delay: 0.6, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const }}
                className="h-px bg-primary"
              />
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-foreground"
            >
              Build Your <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
                className="text-primary italic inline-block"
              >Future</motion.span> With Us
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto"
            >
              Join a team of exceptional legal minds dedicated to excellence, innovation, and making a difference. 
              We offer challenging work, mentorship, and unparalleled growth opportunities.
            </motion.p>
          </motion.div>
        </div>

        {/* Decorative bottom gradient */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5 }}
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"
        />
      </section>

      {/* Stats Section - Light Theme */}
      <motion.section 
        className="py-16 bg-white border-b border-border"
      >
        <motion.div initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer} className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { number: "45+", label: "Expert Attorneys", delay: 0.1 },
              { number: "11+", label: "Practice Areas", delay: 0.2 },
              { number: "5+", label: "States", delay: 0.3 }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                variants={scaleIn}
                transition={{ delay: stat.delay }}
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: stat.delay + 0.2, duration: 0.6, type: "spring" as const, stiffness: 100 }}
                  className="text-4xl font-heading font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-500"
                >
                  {stat.number}
                </motion.div>
                <p className="text-muted-foreground transition-colors duration-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Careers Section - Dark Theme */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="section-padding bg-background"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Section Header */}
          <motion.div 
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.div 
              variants={fadeInDown}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const }}
                className="h-px bg-primary"
              />
              <motion.p 
                variants={slideFromLeft}
                className="text-sm uppercase tracking-[0.2em] text-primary font-semibold"
              >
                Open Positions
              </motion.p>
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const }}
                className="h-px bg-primary"
              />
            </motion.div>
            
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4"
            >
              Current <motion.span 
                variants={slideFromRight}
                className="text-primary italic inline-block"
              >Opportunities</motion.span>
            </motion.h2>
            
            <motion.p 
              variants={fadeInUp}
              className="text-muted-foreground text-lg"
            >
              Explore our available positions and find the perfect role to advance your legal career
            </motion.p>
          </motion.div>

          {/* Positions Grid */}
          <motion.div 
            variants={staggerContainer}
            className="space-y-6"
          >
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  className="bg-card border border-border rounded-lg overflow-hidden"
                >
                  <div className="p-8 animate-pulse">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-9 h-9 bg-gray-200 rounded-lg" />
                          <div className="h-6 bg-gray-200 rounded w-64" />
                        </div>
                        <div className="flex flex-wrap gap-4 mb-4">
                          <div className="h-4 bg-gray-200 rounded w-32" />
                          <div className="h-4 bg-gray-200 rounded w-24" />
                        </div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-full" />
                          <div className="h-4 bg-gray-200 rounded w-3/4" />
                        </div>
                      </div>
                      <div className="shrink-0">
                        <div className="h-12 bg-gray-200 rounded-lg w-32" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : error ? (
              // Error state
              <div className="text-center py-12">
                <div className="text-red-500 font-semibold mb-2">Error loading career positions</div>
                <div className="text-gray-600 mb-4">Please try again later</div>
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : positions.length === 0 ? (
              // Empty state
              <div className="text-center py-12">
                <div className="text-gray-600 font-semibold mb-2">No career positions available</div>
                <div className="text-gray-500">Check back later for new opportunities</div>
              </div>
            ) : (
              // Render positions
              positions.map((pos, i) => (
                <motion.div
                  key={pos._id}
                  variants={scaleIn}
                  custom={i}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-colors duration-500 group"
                >
                  <motion.div 
                    variants={cardHover}
                    className="p-8"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-1">
                        <motion.div 
                          initial={{ x: -20, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                          className="flex items-center gap-3 mb-3"
                        >
                          <motion.div 
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-500"
                          >
                            <Briefcase className="w-5 h-5 text-primary" />
                          </motion.div>
                          <h3 className="text-xl font-heading font-semibold text-foreground group-hover:text-primary transition-colors duration-500">
                            {pos.title}
                          </h3>
                        </motion.div>
                        
                        {/* <motion.div 
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                          className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4"
                        >
                          <motion.span 
                            whileHover={{ x: 3 }}
                            className="flex items-center gap-1"
                          >
                            <MapPin className="w-4 h-4" /> {pos.location}
                          </motion.span>
                          <motion.span 
                            whileHover={{ x: 3 }}
                            className="flex items-center gap-1"
                          >
                            <Clock className="w-4 h-4" /> {getJobTypeDisplay(pos.type)}
                          </motion.span>
                        </motion.div> */}
                        
                        <motion.p 
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }}
                          className="text-muted-foreground leading-relaxed"
                        >
                          {pos.desc}
                        </motion.p>
                      </div>
                      
                      <motion.div
                        variants={buttonHover}
                        initial="rest"
                        whileHover="hover"
                        whileTap={{ scale: 0.95 }}
                        className="shrink-0"
                      >
                        <Link 
                          href="/contact" 
                          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-accent transition-all duration-500 group/btn btn-shine"
                        >
                          <span>Apply Now</span>
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.div>
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              ))
            )}
          </motion.div>

          {/* View All Button */}
          {positions.length > 6 && (
            <motion.div 
              variants={fadeInUp}
              className="text-center mt-12"
            >
              <Button variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                View All Positions
              </Button>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Why Join Us Section - Light Theme */}
      <motion.section 
        className="bg-white section-padding"
      >
        <motion.div initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer} className="container mx-auto px-4">
          <motion.div 
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.div 
              variants={fadeInDown}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 1.2 }}
                className="h-px bg-primary"
              />
              <motion.p 
                variants={slideFromLeft}
                className="text-sm uppercase tracking-[0.2em] text-primary font-semibold"
              >
                Why Join Us
              </motion.p>
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 1.2 }}
                className="h-px bg-primary"
              />
            </motion.div>
            
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-heading font-bold text-black mb-4"
            >
              Advance Your <span className="text-primary italic">Legal Career</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Users, title: "Collaborative Culture", desc: "Work with a dynamic, skilled legal team that values innovation and learning." },
              { icon: Award, title: "Career Advancement", desc: "Receive mentorship, challenging assignments, and clear paths for professional growth." },
              { icon: Building2, title: "Global Perspective", desc: "Handle complex matters spanning domestic and international jurisdictions." }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  boxShadow: '0 30px 60px -15px rgba(0,0,0,0.1)',
                  transition: { duration: 0.4 }
                }}
                className="bg-white p-8 rounded-lg border border-primary/20 hover:border-primary transition-all duration-500 text-center group"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors duration-500"
                >
                  <item.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-500" />
                </motion.div>
                <h3 className="text-xl font-heading font-semibold text-black mb-3 group-hover:text-primary transition-colors duration-500">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
                
                {/* Animated underline on hover */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  className="h-0.5 bg-primary mx-auto mt-4 w-12"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Don't See Your Role Section - Dark Theme */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="section-padding bg-background text-center relative overflow-hidden"
      >
        {/* Animated background pattern */}
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          whileInView={{ opacity: 0.05, rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" as const }}
          className="absolute inset-0 pattern-gold"
        />
        
        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          <motion.div
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4"
            >
              Don't See Your Role?
            </motion.h2>
            
            <motion.p 
              variants={fadeInUp}
              className="text-muted-foreground text-lg mb-10"
            >
              We're always looking for exceptional talent. Send us your resume and we'll keep you in mind for future opportunities.
            </motion.p>
            
            <motion.div
              variants={slideFromLeft}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 px-10 py-5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-accent transition-all duration-500 group btn-shine"
              >
                <span>Get in Touch</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute -top-10 -left-10 w-20 h-20 border-2 border-primary/20 rounded-full"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute -bottom-10 -right-10 w-32 h-32 border-2 border-primary/10 rounded-full"
            />
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Careers;