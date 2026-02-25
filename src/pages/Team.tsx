"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Award, BookOpen, Briefcase, ChevronLeft, ChevronRight, Facebook, Globe, Linkedin, Mail, Phone, Scale, Star, Twitter } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCMSData } from '../lib/cmsCache';
import { Employee, Founder, getEmployeeImageUrl, getFounderImageUrl } from '../lib/sanityQueries';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.9
    } 
  }
};

const fadeInDown = {
  hidden: { opacity: 0, y: -40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.9
    } 
  }
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 1
    } 
  }
};

const slideFromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 1
    } 
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.8
    } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const Team = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedFounder, setSelectedFounder] = useState(0);
  const [founders, setFounders] = useState<Founder[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch CMS data on component mount
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setIsLoading(true);
        const cmsData = await getCMSData();
        console.log("CMS data:", cmsData);
        // Filter employees by category for founders (founder/senior categories)
        const foundersData = cmsData.founders;
        
        // Get all employees for team members section
        const teamMembersData = cmsData.employees;
        
        setFounders(foundersData);
        
        setTeamMembers(teamMembersData);
      } catch (error) {
        console.error('Failed to fetch team data:', error);
        // Keep fallback data in case of error
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTeamData();
  }, []);

  const totalSlides = Math.ceil(founders.length / 1);
  const visibleFounders = founders.slice(currentSlide * 1, currentSlide * 1 + 1);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="-mt-20">
      {/* Banner Section - Dark Theme with Background Image */}
      <section 
        className="relative w-full bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        {/* Dark Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/50 to-background/60"
        />
        
        {/* Animated Pattern Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute inset-0 pattern-gold"
        />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0
              }}
              animate={{ 
                y: [null, -100],
                scale: [0, 1, 0],
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: 8 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
            />
          ))}
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-32 md:py-40 lg:py-52">
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
                transition={{ delay: 0.6, duration: 1.2 }}
                className="h-px bg-primary"
              />
              <motion.p 
                variants={slideFromLeft}
                className="text-sm uppercase tracking-[0.2em] text-primary font-semibold"
              >
                Our Team
              </motion.p>
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ delay: 0.6, duration: 1.2 }}
                className="h-px bg-primary"
              />
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-foreground"
            >
              Meet Our <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="text-primary italic inline-block"
              >Attorneys</motion.span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto"
            >
              Our experienced team brings together diverse backgrounds and specialized expertise to deliver exceptional results for our clients.
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

      {/* Founders Section - White Theme */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
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
                Our Leaders
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
              <span className="text-primary italic">Founding</span> Partners
            </motion.h2>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Column - Sticky Founder Cards Slider */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 h-fit">
              <motion.div 
                variants={scaleIn}
                className="bg-white p-0 md:p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-heading font-semibold text-black">Our Founders</h3>
                  <span className="text-sm text-gray-500">
                    {isLoading ? 'Loading...' : `Slide ${currentSlide + 1} / ${totalSlides}`}
                  </span>
                </div>
                
                {/* Loading State for Founders */}
                {isLoading ? (
                  <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-gray-500">Loading founders...</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-4"
                    >
                      {visibleFounders.map((founder, index) => {
                        const actualIndex = currentSlide * 1 + index;
                        return (
                          <motion.div
                              key={founder._id}
                            onClick={() => setSelectedFounder(actualIndex)}
                            className={`p-5 rounded-lg cursor-pointer transition-all duration-300 ${
                              selectedFounder === actualIndex 
                                ? 'bg-primary/10 border-2 border-primary/30' 
                                : 'bg-gray-50 hover:bg-primary/5 border border-gray-200'
                            }`}
                          >
                            <div className="flex flex-col items-center gap-4">
                              <div className="w-full h-full lg:h-80 overflow-hidden flex-shrink-0">
                                <img 
                                    src={getFounderImageUrl(founder)}
                                    alt={founder?.name || 'Founder'}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              </div>
                              <div className="flex-1 min-w-0 w-full">
                                <h4 className="font-heading font-semibold text-black text-lg mb-1 truncate">
                                  {founder.name}
                                </h4>
                                <p className="text-sm text-primary mb-2 line-clamp-1">{founder.role}</p>
                                
                                {/* Contact Details */}
                                <div className="space-y-1 mb-2">
                                  <a href={`mailto:${founder.email}`} className="text-xs text-gray-600 hover:text-primary transition-colors flex items-center gap-1 truncate">
                                    <Mail className="w-3 h-3 flex-shrink-0" />
                                    {founder.email}
                                  </a>
                                  <a href={`tel:${founder.phone}`} className="text-xs text-gray-600 hover:text-primary transition-colors flex items-center gap-1">
                                    <Phone className="w-3 h-3 flex-shrink-0" />
                                    {founder.phone}
                                  </a>
                                </div>
                                
                                {/* Social Icons */}
                                <div className="flex items-center gap-2">
                                  <a href={founder?.social?.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                                    <Linkedin className="w-4 h-4" />
                                  </a>
                                  <a href={founder?.social?.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                                    <Twitter className="w-4 h-4" />
                                  </a>
                                  <a href={founder?.social?.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                                    <Facebook className="w-4 h-4" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>
                )}

                {/* Navigation Arrows */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: 'hsl(40 70% 50%)', color: 'white' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevSlide}
                    className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  <div className="flex gap-1">
                    {Array.from({ length: totalSlides }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          currentSlide === idx ? 'w-6 bg-primary' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: 'hsl(40 70% 50%)', color: 'white' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextSlide}
                    className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Founder Details */}
            <div className="lg:col-span-7">
              {isLoading ? (
                <div className="bg-white md:border-l border-gray-200 md:p-8 flex items-center justify-center min-h-96">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading team information...</p>
                  </div>
                </div>
              ) : founders.length > 0 && founders[selectedFounder] ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedFounder}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white md:border-l border-gray-200 md:p-8"
                  >
                    {/* Founder Header */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pb-6 border-b border-gray-200 mb-6">
                      <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-primary/20 flex-shrink-0">
                        <img 
                          src={founders[selectedFounder]?.profileImage ? getFounderImageUrl(founders[selectedFounder]) : `https://ui-avatars.com/api/?name=${encodeURIComponent(founders[selectedFounder]?.name || 'Team Member')}&background=E5E7EB&color=6B7280&size=128`} 
                          alt={founders[selectedFounder]?.name || 'Team Member'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-heading font-bold text-black mb-2">
                          {founders[selectedFounder]?.name || 'Team Member'}
                        </h3>
                        <p className="text-primary text-lg mb-3">{founders[selectedFounder]?.role || founders[selectedFounder]?.designation || ''}</p>
                        
                        {/* Contact Info */}
                        <div className="flex flex-wrap items-center gap-4">
                          {founders[selectedFounder]?.email && (
                            <a href={`mailto:${founders[selectedFounder]?.email}`} className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              {founders[selectedFounder]?.email}
                            </a>
                          )}
                          {founders[selectedFounder]?.email && founders[selectedFounder]?.phone && (
                            <span className="text-gray-300 hidden sm:inline">|</span>
                          )}
                          {founders[selectedFounder]?.phone && (
                            <a href={`tel:${founders[selectedFounder]?.phone}`} className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              {founders[selectedFounder]?.phone}
                            </a>
                          )}
                        </div>

                        {/* Social Links */}
                        {founders[selectedFounder]?.social && (
                          <div className="flex items-center gap-3 mt-3">
                            {founders[selectedFounder]?.social?.linkedin && (
                              <a href={founders[selectedFounder]?.social?.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                                <Linkedin className="w-5 h-5" />
                              </a>
                            )}
                            {founders[selectedFounder]?.social?.twitter && (
                              <a href={founders[selectedFounder]?.social?.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                                <Twitter className="w-5 h-5" />
                              </a>
                            )}
                            {founders[selectedFounder]?.social?.facebook && (
                              <a href={founders[selectedFounder]?.social?.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                                <Facebook className="w-5 h-5" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Practice Areas */}
                    {founders[selectedFounder]?.details?.practiceAreas && founders[selectedFounder]?.details?.practiceAreas.length > 0 && (
                      <div className="mb-6 pb-6 border-b border-gray-200">
                        <h4 className="text-lg font-heading font-semibold text-black mb-4 flex items-center gap-2">
                          <Briefcase className="w-5 h-5 text-primary" />
                          Practice Areas
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {founders[selectedFounder]?.details?.practiceAreas?.map((area, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.05 }}
                              className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                            >
                              {area}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Education & Bar Associations */}
                    {((founders[selectedFounder]?.details?.education && founders[selectedFounder]?.details?.education.length > 0) || 
                      (founders[selectedFounder]?.details?.barAssociations && founders[selectedFounder]?.details?.barAssociations.length > 0)) && (
                      <div className="mb-6 pb-6 border-b border-gray-200">
                        <h4 className="text-lg font-heading font-semibold text-black mb-4 flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-primary" />
                          Education & Bar Associations
                        </h4>
                        <div className="space-y-3">
                          {founders[selectedFounder]?.details?.education?.map((edu, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-start gap-3"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                              <p className="text-gray-700 text-sm flex-1">{edu}</p>
                            </motion.div>
                          ))}
                          {founders[selectedFounder]?.details?.barAssociations?.map((bar, idx) => (
                            <motion.div
                              key={`bar-${idx}`}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: (idx + (founders[selectedFounder]?.details?.education?.length || 0)) * 0.05 }}
                              className="flex items-start gap-3"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                              <p className="text-gray-700 text-sm flex-1">{bar}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Organizations */}
                    {founders[selectedFounder]?.details?.organizations && founders[selectedFounder]?.details?.organizations.length > 0 && (
                      <div className="mb-6 pb-6 border-b border-gray-200">
                        <h4 className="text-lg font-heading font-semibold text-black mb-4 flex items-center gap-2">
                          <Globe className="w-5 h-5 text-primary" />
                          Organizations
                        </h4>
                        <div className="space-y-3">
                          {founders[selectedFounder]?.details?.organizations?.map((org, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-start gap-3"
                            >
                              <Scale className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <p className="text-gray-700 text-sm flex-1">{org}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Awards & Accolades */}
                    {founders[selectedFounder]?.details?.awards && founders[selectedFounder]?.details?.awards.length > 0 && (
                      <div>
                        <h4 className="text-lg font-heading font-semibold text-black mb-4 flex items-center gap-2">
                          <Award className="w-5 h-5 text-primary" />
                          Awards & Accolades
                        </h4>
                        <div className="space-y-3">
                          {founders[selectedFounder]?.details?.awards?.map((award, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-start gap-3 bg-primary/5 p-3 rounded-lg"
                            >
                              <Star className="w-4 h-4 text-primary fill-primary mt-0.5 flex-shrink-0" />
                              <p className="text-gray-700 text-sm flex-1">{award}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="bg-white md:border-l border-gray-200 md:p-8 flex items-center justify-center min-h-96">
                  <div className="text-center">
                    <div className="text-gray-400 mb-2">
                      <Award className="w-12 h-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-1">No Team Member Selected</h3>
                    <p className="text-sm text-gray-500">Select a team member to view their details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section - Dark Theme with Image Hover Animation */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
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
                Our Team
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
              className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4"
            >
              Meet Our <span className="text-primary italic">Legal Professionals</span>
            </motion.h2>
          </motion.div>

          {/* Team Grid with Image Hover Animation */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
                  <div className="h-96 bg-gray-300"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded mb-1"></div>
                    <div className="h-3 bg-gray-300 rounded mb-1"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={scaleIn}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-lg overflow-hidden group relative"
                >
                  
                  {/* Image Container */}
                  <div className="relative overflow-hidden">

                    {/* Image */}
                    <motion.img 
                      src={getEmployeeImageUrl(member)} 
                      alt={member.name}
                      className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Hover Overlay */}
                    <div className="
                      absolute inset-0
                      bg-gradient-to-t from-background via-background/60 to-background/40
                      p-5 flex flex-col justify-end
                      translate-y-full
                      group-hover:translate-y-0
                      transition-all duration-500 ease-in-out
                    ">

                      <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
                        {member.name}
                      </h3>

                      <p className="text-primary text-sm font-medium mb-2">
                        {member.role}
                      </p>

                      <p className="text-xs text-muted-foreground mb-1">
                        Specialty: {member.specialty}
                      </p>

                      <p className="text-xs text-muted-foreground mb-2">
                        Experience: {member.experience}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          member.category === 'senior' ? 'bg-primary/20 text-primary' :
                          member.category === 'associate' ? 'bg-blue-500/20 text-blue-500' :
                          member.category === 'intern' ? 'bg-green-500/20 text-green-500' :
                          'bg-purple-500/20 text-purple-500'
                        }`}>
                          {member.category === 'senior' ? 'Senior Associate' :
                           member.category === 'associate' ? 'Associate' :
                           member.category === 'intern' ? 'Intern' : 'Staff'}
                        </span>

                        <a href={`mailto:${member.email}`} className="text-primary hover:text-accent transition-colors">
                          <Mail className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    {/* Mobile Always Visible Info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur-md p-3 md:hidden">
                      <h3 className="text-sm font-semibold text-foreground">
                        {member.name}
                      </h3>
                      <p className="text-xs text-primary">
                        {member.role}
                      </p>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Join Our Team CTA - White Theme */}
      <section className="section-padding bg-white text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-heading font-bold text-black mb-4">
            Want to Join Our Team?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-600 text-lg mb-8">
            We're always looking for exceptional legal talent to join our growing firm.
          </motion.p>
          <motion.div variants={scaleIn}>
            <Link 
              href="/careers" 
              className="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-accent transition-all duration-500 btn-shine"
            >
              View Open Positions
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Team;