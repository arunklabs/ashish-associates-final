"use client";

import { Star, Quote, ChevronLeft, ChevronRight, Shield, Clock, Award, Users, Sparkles, Phone, ArrowRight } from 'lucide-react';
import Link from "next/link";
import { useState, useEffect } from 'react';
const hero1 = "/assets/hero1.webp";
import {motion} from 'framer-motion';

const ReviewsPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const reviews = [
    {
      id: 1,
      name: "Brayn Smith",
      practiceArea: "Family Law",
      content: "We were pleased with experience of working with Verdikto. He was compassionate and a good listener. The outcome was more than justified the confidence in him that he had inspired in us. We are very grateful to him.",
      rating: 5,
      avatar: "https://ui-avatars.com/api/?name=Brayn+Smith&size=64&background=CCAC7A&color=fff",
      caseType: "Divorce Settlement"
    },
    {
      id: 2,
      name: "Jenna Cooper",
      practiceArea: "Insurance Law",
      content: "I would highly recommend their office to any family or friends if needed in the future. I will always remember how they helped me get through my life and will be forever grateful for the way they helped fight for justice for me.",
      rating: 5,
      avatar: "https://ui-avatars.com/api/?name=Jenna+Cooper&size=64&background=CCAC7A&color=fff",
      caseType: "Insurance Claim"
    },
    {
      id: 3,
      name: "Maria Andaloro",
      practiceArea: "Personal Injury",
      content: "Throughout the process they were responsive to my questions and were patient and clear all along the way helping to prepare me for what to expect. Thankfully they did the heavy lifting to bring the case to a settlement.",
      rating: 5,
      avatar: "https://ui-avatars.com/api/?name=Maria+Andaloro&size=64&background=CCAC7A&color=fff",
      caseType: "Car Accident"
    },
    {
      id: 4,
      name: "Robert Chen",
      practiceArea: "Corporate Law",
      content: "Exceptional legal expertise and strategic thinking. They helped us navigate complex business regulations and saved our company significant time and resources. Truly partners in our success.",
      rating: 5,
      avatar: "https://ui-avatars.com/api/?name=Robert+Chen&size=64&background=CCAC7A&color=fff",
      caseType: "Business Merger"
    },
    {
      id: 5,
      name: "Sarah Williams",
      practiceArea: "Real Estate Law",
      content: "The team's attention to detail and deep understanding of property law made our complex transaction seamless. They protected our interests at every step and delivered exceptional results.",
      rating: 5,
      avatar: "https://ui-avatars.com/api/?name=Sarah+Williams&size=64&background=CCAC7A&color=fff",
      caseType: "Commercial Property"
    },
    {
      id: 6,
      name: "Michael Thompson",
      practiceArea: "Criminal Defense",
      content: "When I needed someone to fight for me, they were there. Their strategic approach and courtroom presence made all the difference. Forever grateful for their dedication and expertise.",
      rating: 5,
      avatar: "https://ui-avatars.com/api/?name=Michael+Thompson&size=64&background=CCAC7A&color=fff",
      caseType: "Criminal Case"
    },
    {
      id: 7,
      name: "Robert Chen",
      practiceArea: "Corporate Law",
      content: "Exceptional legal expertise and strategic thinking. They helped us navigate complex business regulations and saved our company significant time and resources. Truly partners in our success.",
      rating: 5,
      avatar: "https://ui-avatars.com/api/?name=Robert+Chen&size=64&background=CCAC7A&color=fff",
      caseType: "Business Merger"
    },
    {
      id: 8,
      name: "Sarah Williams",
      practiceArea: "Real Estate Law",
      content: "The team's attention to detail and deep understanding of property law made our complex transaction seamless. They protected our interests at every step and delivered exceptional results.",
      rating: 5,
      avatar: "https://ui-avatars.com/api/?name=Sarah+Williams&size=64&background=CCAC7A&color=fff",
      caseType: "Commercial Property"
    },
    {
      id: 9,
      name: "Michael Thompson",
      practiceArea: "Criminal Defense",
      content: "When I needed someone to fight for me, they were there. Their strategic approach and courtroom presence made all the difference. Forever grateful for their dedication and expertise.",
      rating: 5,
      avatar: "https://ui-avatars.com/api/?name=Michael+Thompson&size=64&background=CCAC7A&color=fff",
      caseType: "Criminal Case"
    }
  ];

  // Smooth animation variants with slower durations
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 1.2, 
        ease: [0.25, 0.1, 0.25, 1] as const // Cubic bezier for smoother easing
      } 
    }
  };

  const fadeInDown = {
    hidden: { opacity: 0, y: -60 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 1.2, 
        ease: [0.25, 0.1, 0.25, 1] as const
      } 
    }
  };

  const slideFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 1.3, 
        ease: [0.25, 0.1, 0.25, 1] as const
      } 
    }
  };

  const slideFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 1.3, 
        ease: [0.25, 0.1, 0.25, 1] as const
      } 
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 1.2, 
        ease: [0.25, 0.1, 0.25, 1] as const
      } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Increased stagger for smoother sequence
        delayChildren: 0.3,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  };

  // Auto-slider effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(reviews.length / 3));
    }, 6000); // Increased to 6 seconds for slower transitions
    return () => clearInterval(timer);
  }, [reviews.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(reviews.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(reviews.length / 3)) % Math.ceil(reviews.length / 3));
  };

  // Background image URL
  const backgroundImage = "https://plus.unsplash.com/premium_photo-1661638475106-3313485f4bf6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D";

  return (
    <div className="min-h-screen bg-background overflow-hidden -mt-20">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[95vh] lg:min-h-screen flex items-center">
        {/* Background Image with Overlay */}
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: [0.25, 0.1, 0.25, 1] as const }} // Slower, smoother
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          {/* Dark overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-background/70 to-background/50" />
          <div className="absolute inset-0 pattern-gold opacity-10" />
        </motion.div>

        {/* Content */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="container relative z-10"
        >
          <div className="max-w-3xl mx-auto text-center">
            <motion.div 
              variants={fadeInDown}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ delay: 0.6, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const }} // Slower line animation
                className="h-px bg-[#C9A646]"
              ></motion.span>
              <motion.p 
                variants={slideFromLeft}
                className="text-sm uppercase tracking-[0.2em] text-[#C9A646] font-semibold"
              >
                Our Client Reviews
              </motion.p>
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ delay: 0.6, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const }}
                className="h-px bg-[#C9A646]"
              />
            </motion.div>
            
            {/* Title */}
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6"
            >
              <motion.span 
                variants={slideFromLeft}
                className="text-foreground inline-block"
              >
                Achieving real results
              </motion.span>
              <br />
              <motion.span 
                variants={slideFromRight}
                className="gold-gradient-text italic inline-block"
              >
                for real people we've served with love
              </motion.span>
            </motion.h1>
          </div>
        </motion.div>

        {/* Decorative bottom gradient */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5 }} // Slower fade
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"
        />
      </section>

      {/* Reviews Grid Section - White Theme */}
      <motion.section 
        className="py-20 md:py-28 bg-white relative overflow-hidden"
      >
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="container relative z-10">
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
                  className="h-px bg-[#C9A646]"
                ></motion.span>
                <motion.p 
                  variants={slideFromLeft}
                  className="text-sm uppercase tracking-[0.2em] text-[#C9A646] font-semibold"
                >
                  Unforgettable legacy of pursuing justice!
                </motion.p>
                <motion.span 
                  initial={{ width: 0 }}
                  whileInView={{ width: 40 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const }}
                  className="h-px bg-[#C9A646]"
                />
              </motion.div>
              
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl md:text-5xl font-serif text-[#1F2A44] leading-snug"
              >
                <motion.span variants={slideFromLeft} className="inline-block">
                  Our experience is confirmed by
                </motion.span>
                <br />
                <motion.span variants={slideFromRight} className="inline-block">
                  notable excellence, <span className="italic">innovation,</span>
                </motion.span>
                <br />
                <motion.span variants={slideFromLeft} className="inline-block">
                  <span className="italic">client service, and teamwork.</span>
                </motion.span>
              </motion.h2>
            </motion.div>

            {/* Slider Controls */}
            <motion.div 
              variants={slideFromRight}
              className="flex justify-end items-center gap-3 mb-8"
            >
              <motion.button 
                whileHover={{ scale: 1.1, backgroundColor: '#C9A646', borderColor: '#C9A646' }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const }} // Slower hover
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border border-gray-200 bg-white hover:text-white transition-all duration-300 flex items-center justify-center group"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1, backgroundColor: '#C9A646', borderColor: '#C9A646' }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const }}
                onClick={nextSlide}
                className="w-12 h-12 rounded-full border border-gray-200 bg-white hover:text-white transition-all duration-300 flex items-center justify-center group"
              >
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
              </motion.button>
            </motion.div>

            {/* Reviews Cards Slider - Premium Modern Design */}
            <motion.div 
              variants={scaleIn}
              className="relative overflow-hidden"
            >
              <div 
                className="flex transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)]" // Slower slide transition
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {/* Split reviews into chunks of 3 for slider */}
                {Array.from({ length: Math.ceil(reviews.length / 3) }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                      {reviews.slice(slideIndex * 3, slideIndex * 3 + 3).map((review, index) => (
                        <motion.div
                          key={review.id}
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as const }} // Slower card appearance
                          whileHover={{ 
                            // y: -10,
                            boxShadow: '0 30px 60px -15px rgba(0,0,0,0.2)',
                            transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } // Slower hover
                          }}
                          className="group relative bg-white border border-[#C9A646] rounded-2xl overflow-hidden transition-all duration-700" // Slower transition
                          style={{ 
                            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.02)',
                          }}
                        >
                          {/* Background Pattern */}
                          <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary rounded-full blur-3xl" />
                          </div>

                          {/* Quote Icon - Premium Style */}
                          <motion.div 
                            initial={{ rotate: -10, scale: 0 }}
                            whileInView={{ rotate: 0, scale: 1 }}
                            transition={{ delay: 0.4 + index * 0.15, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as const }}
                            className="absolute top-6 right-6"
                          >
                            <Quote className="w-10 h-10 text-primary/10 group-hover:text-primary/20 transition-colors duration-700" />
                          </motion.div>

                          <div className="p-8 relative">
                            {/* Rating with Premium Design */}
                            <motion.div 
                              initial="hidden"
                              whileInView="visible"
                              variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                  opacity: 1,
                                  transition: { staggerChildren: 0.15 }
                                }
                              }}
                              className="flex items-center gap-1 mb-6"
                            >
                              {[...Array(5)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  variants={{
                                    hidden: { opacity: 0, scale: 0 },
                                    visible: { opacity: 1, scale: 1 }
                                  }}
                                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
                                >
                                  <Star
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? 'text-primary fill-primary'
                                        : 'text-gray-200 fill-gray-200'
                                    } transition-all duration-500`}
                                  />
                                </motion.div>
                              ))}
                            </motion.div>

                            {/* Case Type Badge */}
                            <motion.div 
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.25 + index * 0.15, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
                              className="mb-4"
                            >
                              <span className="inline-block px-3 py-1 bg-primary/5 text-primary text-xs font-medium rounded-full">
                                {review.caseType}
                              </span>
                            </motion.div>

                            {/* Review Content - Premium Typography */}
                            <motion.div 
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              transition={{ delay: 0.4 + index * 0.15, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as const }}
                              className="mb-8"
                            >
                              <p className="text-gray-700 leading-relaxed text-[15px] transition-all duration-700 ease-in-out line-clamp-4 group-hover:line-clamp-none">
                                "{review.content}"
                              </p>
                            </motion.div>

                            {/* Client Info with Premium Styling */}
                            <motion.div 
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.55 + index * 0.15, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
                              className="flex items-center gap-4 pt-6 border-t border-gray-100"
                            >
                              <motion.div 
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
                                className="relative"
                              >
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:blur-lg transition-all duration-700" />
                                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-white shadow-lg">
                                  <img
                                    src={review.avatar}
                                    alt={review.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </motion.div>
                              <div>
                                <h4 className="font-heading font-semibold text-gray-900 text-lg mb-0.5">
                                  {review.name}
                                </h4>
                                <p className="text-primary font-medium text-sm">
                                  {review.practiceArea}
                                </p>
                              </div>
                            </motion.div>
                          </div>

                          {/* Bottom Gradient on Hover */}
                          <motion.div 
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Slider Dots */}
            <motion.div 
              variants={fadeInUp}
              className="flex justify-center items-center gap-3 mt-12"
            >
              {Array.from({ length: Math.ceil(reviews.length / 3) }).map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative"
                >
                  <motion.div 
                    animate={{ 
                      width: currentSlide === index ? 32 : 8,
                      backgroundColor: currentSlide === index ? '#C9A646' : '#D1D5DB'
                    }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }} // Slower dot animation
                    className="h-2 rounded-full"
                  />
                </motion.button>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="relative py-32 overflow-hidden"
      >
        <div className="absolute inset-0">
          <motion.img 
            src={hero1} 
            alt="Background" 
            className="w-full h-full object-cover"
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1, transition: { duration: 2.2, ease: [0.25, 0.1, 0.25, 1] as const } }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear" as const,
              times: [0, 0.5, 1]
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 mix-blend-multiply" />
        </div>
        
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                scale: 0
              }}
              animate={{ 
                y: [null, -300],
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 8 + Math.random() * 5, // Slower floating particles
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear" as const
              }}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
            />
          ))}
        </div>
        
        <div className="container relative z-10">
          <motion.div
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              variants={slideFromLeft}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8"
            >
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Limited Time Offer</span>
            </motion.div>
            
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-heading font-bold mb-10 text-white leading-tight"
            >
              <motion.span variants={slideFromLeft} className="inline-block">
                Take the First Step Toward
              </motion.span>
              <motion.span 
                variants={slideFromRight}
                animate={{ 
                  backgroundPosition: ['0%', '50%', '100%', '50%', '0%']
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" as const }} // Slower gradient animation
                className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-[length:200%] italic"
              >
                Justice Today
              </motion.span>
            </motion.h2>
            
            <motion.div 
              variants={staggerContainer}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.div
                variants={slideFromLeft}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
                className="relative group"
              >
                <Link
                  href="/contact"
                  className="relative px-8 py-5 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-all duration-500 text-sm md:text-base inline-flex items-center gap-3"
                >
                  <Phone className="w-5 h-5" />
                  Free Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-400" />
                </Link>
              </motion.div>
              
              <motion.div 
                variants={slideFromRight}
                whileHover={{ scale: 1.08 }} 
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
              >
                <Link
                  href="/about"
                  className="group px-8 py-5 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-500 text-sm md:text-base inline-flex items-center gap-3"
                >
                  <Shield className="w-5 h-5" />
                  Learn More About Us
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-8 mt-16"
            >
              {[
                { icon: Shield, text: "100% Confidential" },
                { icon: Clock, text: "24/7 Support" },
                { icon: Award, text: "Award Winning" },
                { icon: Users, text: "50+ Experts" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.7 + index * 0.15, duration: 0.9 }
                    }
                  }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-2 text-white/80"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent"
        />
        <motion.div 
          animate={{ rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" as const }} // Slower rotation
          className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-white/20"
        />
        <motion.div 
          animate={{ rotate: [360, 270, 180, 90, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" as const }} // Slower rotation
          className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-white/20"
        />
      </motion.section>
    </div>
  );
};

export default ReviewsPage;