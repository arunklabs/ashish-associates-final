"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Linkedin, Twitter, Award, BookOpen, Briefcase, ChevronLeft, ChevronRight, Star, Globe, Scale, Facebook } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";

// Founder data
const founders = [
  {
    id: 1,
    name: "Richard Lexington",
    role: "Managing Partner & Founder",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    initials: "RL",
    email: "jashishadvocate@gmail.com",
    phone: "7373663555",
    social: {
      linkedin: "https://linkedin.com/in/richardlexington",
      twitter: "https://twitter.com/rlexington",
      facebook: "https://facebook.com/richardlexington"
    },
    details: {
      practiceAreas: ["Corporate Law", "Mergers & Acquisitions", "Securities Law", "Corporate Governance"],
      education: [
        "Harvard Law School, J.D. (1985)",
        "Princeton University, A.B. Economics (1982)"
      ],
      barAssociations: [
        "Chennai State Bar Association",
        "American Bar Association",
        "Chennai City Bar Association"
      ],
      organizations: [
        "American Law Institute (ALI)",
        "Council on Foreign Relations",
        "Legal Aid Society - Board Member"
      ],
      awards: [
        "Chambers USA - Band 1 Corporate/M&A (2015-2026)",
        "The Best Lawyers in America - Lawyer of the Year (2022)",
        "Chennai Law Journal - Lifetime Achievement Award (2020)",
        "Super Lawyers - Top 100 in Chennai (2018-2026)"
      ]
    }
  },
  {
    id: 2,
    name: "Margaret Hayes",
    role: "Senior Partner & Co-Founder",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    initials: "MH",
    email: "m.hayes@lexington.law",
    phone: "+1 (212) 555-0102",
    social: {
      linkedin: "https://linkedin.com/in/margarethayes",
      twitter: "https://twitter.com/mhayes",
      facebook: "https://facebook.com/margarethayes"
    },
    details: {
      practiceAreas: ["Litigation", "White Collar Defense", "Internal Investigations", "Appellate Practice"],
      education: [
        "Yale Law School, J.D. (1988)",
        "Stanford University, B.A. Political Science (1985)"
      ],
      barAssociations: [
        "Chennai State Bar Association",
        "American Bar Association - Litigation Section",
        "Federal Bar Council"
      ],
      organizations: [
        "American College of Trial Lawyers (Fellow)",
        "International Academy of Trial Lawyers",
        "Women's White Collar Defense Association"
      ],
      awards: [
        "Benchmark Litigation - Top 100 Trial Lawyers (2020-2026)",
        "Law360 - MVP in White Collar Crime (2023)",
        "Chennai Super Lawyers - Top 50 Women Attorneys",
        "Chambers USA - Band 1 Litigation (2018-2026)"
      ]
    }
  },
  {
    id: 3,
    name: "David Chen",
    role: "Partner & Head of Real Estate",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    initials: "DC",
    email: "d.chen@lexington.law",
    phone: "+1 (212) 555-0103",
    social: {
      linkedin: "https://linkedin.com/in/davidchen",
      twitter: "https://twitter.com/dchen",
      facebook: "https://facebook.com/davidchen"
    },
    details: {
      practiceAreas: ["Real Estate Law", "Commercial Leasing", "Property Development", "Zoning & Land Use"],
      education: [
        "Columbia Law School, J.D. (1998)",
        "University of Pennsylvania, B.S. Finance (1995)"
      ],
      barAssociations: [
        "Chennai State Bar Association - Real Estate Section",
        "American Bar Association - Real Property Trust & Estate Law"
      ],
      organizations: [
        "Real Estate Board of Chennai (REBNY)",
        "Urban Land Institute (ULI)",
        "Asian Real Estate Association"
      ],
      awards: [
        "The Legal 500 - Leading Lawyer in Real Estate (2021-2026)",
        "Chennai Real Estate Journal - Dealmaker of the Year (2023)",
        "Super Lawyers - Real Estate Law (2019-2026)",
        "Chambers USA - Real Estate (2020-2026)"
      ]
    }
  },
  {
    id: 4,
    name: "Sarah Williams",
    role: "Partner - Family Law",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    initials: "SW",
    email: "s.williams@lexington.law",
    phone: "+1 (212) 555-0104",
    social: {
      linkedin: "https://linkedin.com/in/sarahwilliams",
      twitter: "https://twitter.com/swilliams",
      facebook: "https://facebook.com/sarahwilliams"
    },
    details: {
      practiceAreas: ["Family Law", "Divorce Mediation", "Child Custody", "Matrimonial Law"],
      education: [
        "Northwestern University Pritzker School of Law, J.D. (2002)",
        "University of Michigan, B.A. Psychology (1999)"
      ],
      barAssociations: [
        "Chennai State Bar Association - Family Law Section",
        "American Academy of Matrimonial Lawyers",
        "Chennai Women's Bar Association"
      ],
      organizations: [
        "International Academy of Family Lawyers",
        "Association of Family and Conciliation Courts",
        "Chennai Collaborative Law Group"
      ],
      awards: [
        "Best Lawyers in America - Family Law (2020-2026)",
        "Chennai Magazine - Top 50 Women Lawyers (2023)",
        "Super Lawyers - Family Law (2018-2026)",
        "AV Preeminent Rating - Martindale-Hubbell"
      ]
    }
  }
];

// Team members data
const teamMembers = [
  {
    name: "Michael Torres",
    role: "Senior Associate",
    specialty: "Criminal Defense",
    experience: "15 years",
    bio: "Champion of civil rights with a 95% case dismissal and acquittal rate.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    initials: "MT",
    email: "m.torres@lexington.law",
    category: "senior"
  },
  {
    name: "Emily Park",
    role: "Associate",
    specialty: "Immigration Law",
    experience: "10 years",
    bio: "Multilingual attorney dedicated to helping families navigate immigration processes.",
    image: "https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    initials: "EP",
    email: "e.park@lexington.law",
    category: "associate"
  },
  {
    name: "James Wilson",
    role: "Associate",
    specialty: "Corporate Law",
    experience: "8 years",
    bio: "Specializes in venture capital and startup representation.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    initials: "JW",
    email: "j.wilson@lexington.law",
    category: "associate"
  },
  {
    name: "Lisa Rodriguez",
    role: "Senior Associate",
    specialty: "Real Estate",
    experience: "12 years",
    bio: "Expert in commercial real estate transactions and development.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    initials: "LR",
    email: "l.rodriguez@lexington.law",
    category: "senior"
  },
  {
    name: "Robert Kim",
    role: "Associate",
    specialty: "Litigation",
    experience: "6 years",
    bio: "Former judicial clerk with expertise in complex commercial litigation.",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    initials: "RK",
    email: "r.kim@lexington.law",
    category: "associate"
  },
  {
    name: "Amanda Foster",
    role: "Legal Intern",
    specialty: "General Practice",
    experience: "2L",
    bio: "Columbia Law School student, Notes Editor of Law Review.",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    initials: "AF",
    email: "a.foster@lexington.law",
    category: "intern"
  },
  {
    name: "Daniel Patel",
    role: "Legal Intern",
    specialty: "Corporate Law",
    experience: "1L",
    bio: "NYU Law student with background in investment banking.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    initials: "DP",
    email: "d.patel@lexington.law",
    category: "intern"
  },
  {
    name: "Rachel Chen",
    role: "Paralegal",
    specialty: "Litigation Support",
    experience: "5 years",
    bio: "Certified paralegal specializing in e-discovery and trial preparation.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    initials: "RC",
    email: "r.chen@lexington.law",
    category: "staff"
  }
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.9, 
      ease: [0.25, 0.1, 0.25, 1] as const
    } 
  }
};

const fadeInDown = {
  hidden: { opacity: 0, y: -40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.9, 
      ease: [0.25, 0.1, 0.25, 1] as const
    } 
  }
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -50 },
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
  hidden: { opacity: 0, x: 50 },
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
  hidden: { opacity: 0, scale: 0.95 },
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
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
      ease: [0.25, 0.1, 0.25, 1] as const
    }
  }
};

const Team = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedFounder, setSelectedFounder] = useState(0);

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
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
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
                ease: "linear" as const
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
                transition={{ delay: 0.6, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const }}
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
                transition={{ delay: 0.6, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const }}
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
                transition={{ delay: 1.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
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
                    Slide {currentSlide + 1} / {totalSlides}
                  </span>
                </div>
                
                {/* Founder Cards Slider - 1 at a time */}
                <div className="relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
                      className="space-y-4"
                    >
                      {visibleFounders.map((founder, index) => {
                        const actualIndex = currentSlide * 1 + index;
                        return (
                          <motion.div
                            key={founder.id}
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
                                  src={founder.image} 
                                  alt={founder.name}
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
                                  <a href={founder.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                                    <Linkedin className="w-4 h-4" />
                                  </a>
                                  <a href={founder.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                                    <Twitter className="w-4 h-4" />
                                  </a>
                                  <a href={founder.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
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
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedFounder}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
                  className="bg-white md:border-l border-gray-200 md:p-8"
                >
                  {/* Founder Header */}
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pb-6 border-b border-gray-200 mb-6">
                    <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-primary/20 flex-shrink-0">
                      <img 
                        src={founders[selectedFounder].image} 
                        alt={founders[selectedFounder].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-heading font-bold text-black mb-2">
                        {founders[selectedFounder].name}
                      </h3>
                      <p className="text-primary text-lg mb-3">{founders[selectedFounder].role}</p>
                      
                      {/* Contact Info */}
                      <div className="flex flex-wrap items-center gap-4">
                        <a href={`mailto:${founders[selectedFounder].email}`} className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {founders[selectedFounder].email}
                        </a>
                        <span className="text-gray-300 hidden sm:inline">|</span>
                        <a href={`tel:${founders[selectedFounder].phone}`} className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {founders[selectedFounder].phone}
                        </a>
                      </div>

                      {/* Social Links */}
                      <div className="flex items-center gap-3 mt-3">
                        <a href={founders[selectedFounder].social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                          <Linkedin className="w-5 h-5" />
                        </a>
                        <a href={founders[selectedFounder].social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                          <Twitter className="w-5 h-5" />
                        </a>
                        <a href={founders[selectedFounder].social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                          <Facebook className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Practice Areas */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h4 className="text-lg font-heading font-semibold text-black mb-4 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      Practice Areas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {founders[selectedFounder].details.practiceAreas.map((area, idx) => (
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

                  {/* Education & Bar Associations */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h4 className="text-lg font-heading font-semibold text-black mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      Education & Bar Associations
                    </h4>
                    <div className="space-y-3">
                      {founders[selectedFounder].details.education.map((edu, idx) => (
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
                      {founders[selectedFounder].details.barAssociations.map((bar, idx) => (
                        <motion.div
                          key={`bar-${idx}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (idx + founders[selectedFounder].details.education.length) * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                          <p className="text-gray-700 text-sm flex-1">{bar}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Organizations */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h4 className="text-lg font-heading font-semibold text-black mb-4 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-primary" />
                      Organizations
                    </h4>
                    <div className="space-y-3">
                      {founders[selectedFounder].details.organizations.map((org, idx) => (
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

                  {/* Awards & Accolades */}
                  <div>
                    <h4 className="text-lg font-heading font-semibold text-black mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      Awards & Accolades
                    </h4>
                    <div className="space-y-3">
                      {founders[selectedFounder].details.awards.map((award, idx) => (
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
                </motion.div>
              </AnimatePresence>
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
          src={member.image} 
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