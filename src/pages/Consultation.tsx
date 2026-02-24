"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, Award, Users, Shield, ChevronDown, 
  CheckCircle, Clock, MapPin,
  ArrowRight, Star, Briefcase, Heart, TrendingUp, Trophy, Quote
} from 'lucide-react';

// Custom hook to detect when an element is in view
const useInView = (options: IntersectionObserverInit = {}): [React.RefObject<HTMLElement | null>, boolean] => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    }, { threshold: 0.2, ...options });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isInView];
};

// Animation variants with smooth transitions
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as const // Smooth cubic-bezier
    }
  }
};

const fadeInDown = {
  hidden: { opacity: 0, y: -40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as const
    }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.1, 0.25, 1] as const
    }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.1, 0.25, 1] as const
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.7,
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

const lineAnimation = {
  hidden: { width: 0 },
  visible: { 
    width: 40,
    transition: {
      duration: 0.8,
      delay: 0.3,
      ease: [0.25, 0.1, 0.25, 1] as const
    }
  }
};

// ==================== CONSULTATION BANNER COMPONENT ====================
const ConsultationBanner = () => {
  return (
    <section className="relative w-full min-h-[600px] sm:min-h-[600px] md:min-h-[600px] lg:min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <motion.div 
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] as const }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50"></div>
      </motion.div>

      {/* Content Container */}
      <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-40 sm:py-24 md:py-40 lg:py-44">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center text-white max-w-4xl mx-auto"
        >
          {/* Subtitle with line */}
          <motion.div 
            variants={fadeInDown}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <motion.span 
                variants={lineAnimation}
                className="h-px bg-[#C9A646]"
            ></motion.span>
            <motion.p 
                variants={fadeInUp}
                className="text-sm uppercase tracking-[0.2em] text-[#C9A646] font-semibold"
            >
                Free Consultation
            </motion.p>
          </motion.div>
          
          {/* Title */}
          <motion.h1 
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight"
          >
            Unforgettable Legacy of{' '}
            <motion.span 
              variants={scaleIn}
              className="text-amber-400 relative inline-block"
            >
              Pursuing Justice!
            </motion.span>
          </motion.h1>
          
          {/* Description */}
          <motion.p 
            variants={fadeInUp}
            className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 md:mb-8 max-w-2xl mx-auto px-4"
          >
            If you have questions or you'd like to find out more about services, please get in touch!
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

// ==================== STATS SECTION ====================
const StatsSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.2
  });

  const stats = [
    { icon: <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />, value: "50+", label: "Cases Won" },
    { icon: <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />, value: "100+", label: "Happy Clients" },
    { icon: <Award className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />, value: "4+", label: "Years Experience" },
    { icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />, value: "₹10L+", label: "Recovered" }
  ];

  return (
    <section ref={ref} className="py-10 sm:py-12 md:py-14 lg:py-16 bg-amber-500 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-pattern"></div>
      </div>
      
      <div className="container relative">
        <motion.div 
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }
              }}
              className="text-center text-gray-900"
            >
              <div className="flex justify-center mb-2 sm:mb-3 md:mb-4">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const }}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/20 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center backdrop-blur-sm"
                >
                  {stat.icon}
                </motion.div>
              </div>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.7, type: "spring", stiffness: 100 }}
                className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2"
              >
                {stat.value}
              </motion.div>
              <motion.p 
                variants={fadeInUp}
                className="text-xs sm:text-sm md:text-base font-medium text-gray-800"
              >
                {stat.label}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ==================== MEET OUR ATTORNEYS SECTION ====================
const AttorneysSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.2
  });

  const attorneys = [
    {
      name: "Edward Anderson",
      role: "Attorney & Founder",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80"
    },
    {
      name: "Sienna Hewitt Sr",
      role: "Attorney & Partner",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80"
    },
    {
      name: "Nikolas Gibbons",
      role: "Office Assistant",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80"
    }
  ];

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtitle */}
        <motion.div 
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInDown}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <motion.span 
              variants={lineAnimation}
              className="h-px bg-[#C9A646]"
          ></motion.span>
          <motion.p 
              variants={fadeInUp}
              className="text-sm uppercase tracking-[0.2em] text-[#C9A646] font-semibold"
          >
              MEET OUR DEDICATED ATTORNEY
          </motion.p>
        </motion.div>

        {/* Heading */}
        <motion.h2 
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 leading-snug max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12 lg:mb-14 px-4"
        >
          A leading personal injury team with a passion{' '}
          <span className="italic font-light block sm:inline">
            for helping all our clients to get their lives back.
          </span>
        </motion.h2>

        {/* Grid */}
        <motion.div 
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {attorneys.map((attorney, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const }
              }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const }}
                  src={attorney.image}
                  alt={attorney.name}
                  className="w-full h-[350px] sm:h-[380px] md:h-[400px] lg:h-[420px] object-cover"
                />
              </div>

              {/* Gradient Overlay */}
              <motion.div 
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 0.9 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-gradient-to-t from-[#0b1c3d] via-[#0b1c3d]/60 to-transparent"
              ></motion.div>

              {/* Content */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white"
              >
                <h3 className="text-lg sm:text-xl font-semibold">
                  {attorney.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-200">
                  {attorney.role}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ==================== CORE VALUES SECTION ====================
const CoreValuesSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.2
  });

  const values = [
    {
      icon: <Trophy className="w-6 h-6 sm:w-6 sm:h-6" />,
      title: "Excellent Track Record",
      description: "If you are navigating legal waters for the first time or looking for a high quality lawyer, you got us!",
      stats: "98% Success Rate",
      iconBg: "bg-amber-500",
    },
    {
      icon: <Shield className="w-6 h-6 sm:w-6 sm:h-6" />,
      title: "Contingency Fees",
      description: "You pay us a percentage of the money you receive if you win the case. No win, no fee!",
      stats: "0% Upfront Cost",
      iconBg: "bg-amber-500",
    },
    {
      icon: <Heart className="w-6 h-6 sm:w-6 sm:h-6" />,
      title: "Personal Attention",
      description: "Our lean structure allows us to be highly engaged, responsive & deliberate in everything we do.",
      stats: "24/7 Support",
      iconBg: "bg-amber-500",
    },
    {
      icon: <Briefcase className="w-6 h-6 sm:w-6 sm:h-6" />,
      title: "Expert Advice",
      description: "Our firm is built on the idea that clients deserve true legal work with strategic & caring lawyers.",
      stats: "5+ Years Combined",
      iconBg: "bg-amber-500",
    }
  ];

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          animate={{ 
            rotate: 360,
            scale: [1, 1.3, 1],
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear" as const
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-amber-500 rounded-full filter blur-3xl"
        />
      </div>

      <div className="container relative">
        {/* Section Header */}
        <motion.div 
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center max-w-4xl mx-auto mb-10 sm:mb-12 md:mb-16 lg:mb-20"
        >
          <motion.div variants={fadeInDown} className="flex items-center justify-center gap-4 mb-6">
              <motion.span 
                variants={lineAnimation}
                className="w-12 h-px bg-amber-500"
              ></motion.span>
              <motion.span 
                variants={fadeInUp}
                className="text-amber-500 uppercase tracking-[0.2em] text-sm font-semibold"
              >
                Why Choose Us
              </motion.span>
              <motion.span 
                variants={lineAnimation}
                className="w-12 h-px bg-amber-500"
              ></motion.span>
            </motion.div>
          <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4 mb-3 sm:mb-4 md:mb-6 px-4">
            We Run on <span className="text-amber-400 italic">Core Values!</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto px-4">
            World class expertise lawyers providing legal services in most complex areas of family law!
          </motion.p>
        </motion.div>

        {/* Values Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
        >
          {values.map((value, index) => (
            <motion.div 
              key={index}
              variants={scaleIn}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const }
              }}
              className="group relative"
            >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative bg-gray-800/90 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl transition-all duration-500 border border-gray-700 group-hover:border-amber-500/50 group-hover:bg-gray-800 h-full"
              >
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const }}
                  className={`w-12 h-12 ${value.iconBg} rounded-xl sm:rounded-2xl flex items-center justify-center text-white mb-3 sm:mb-4 md:mb-6 shadow-lg mx-auto sm:mx-0 transition-all duration-500 group-hover:shadow-amber-500/30`}
                >
                  {value.icon}
                </motion.div>
                
                <motion.h3 
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-center sm:text-left text-white group-hover:text-amber-400 transition-colors duration-300"
                >
                  {value.title}
                </motion.h3>
                <motion.p 
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-3 sm:mb-4 text-center sm:text-left group-hover:text-gray-300 transition-colors duration-300"
                >
                  {value.description}
                </motion.p>
                
                <motion.div 
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs sm:text-sm font-semibold text-center sm:text-left text-amber-500 transition-colors duration-300"
                >
                  {value.stats}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ==================== CONSULTATION FORM SECTION WITH IMAGE AND REVIEW ====================
const ConsultationFormSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.2
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    caseType: '',
    message: '',
    preferredDate: '',
    preferredTime: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        caseType: '',
        message: '',
        preferredDate: '',
        preferredTime: ''
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear" as const
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full filter blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -20, 0],
            y: [0, 20, 0]
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            ease: "linear" as const
          }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"
        />
      </div>

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* LEFT COLUMN - Image with Quote and Review */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInLeft}
            className="relative"
          >
            {/* Main Image Card */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden shadow-2xl rounded-2xl"
            >
              <motion.img 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5 }}
                src="https://plus.unsplash.com/premium_photo-1661767419918-441080a18873?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8" 
                alt="Legal consultation"
                className="w-full h-[450px] sm:h-[400px] md:h-[450px] lg:h-full object-cover"
              />
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
              ></motion.div>
              
              {/* Quote Icon */}
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                className="absolute top-6 left-6 sm:top-8 sm:left-8"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
              </motion.div>
              
              {/* Review Content */}
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 text-white"
              >
                <motion.p 
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg sm:text-xl md:text-2xl font-light italic mb-4 sm:mb-6 leading-relaxed"
                >
                  "The team at J. Ashish Associates LLP handled my case with exceptional care and professionalism. They fought for my rights and achieved justice when I needed it most."
                </motion.p>
                
                {/* Rating Stars */}
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
                  className="flex gap-1 mb-3 sm:mb-4"
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Client Info */}
                <motion.div 
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 sm:gap-4"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-amber-400"
                  >
                    <img 
                      src="https://plus.unsplash.com/premium_photo-1743020414403-8282a72af162?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fGxhd3llciUyMGNvbnN1bHRhdGlvbnxlbnwwfHwwfHx8MA%3D%3D" 
                      alt="Client"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg">Sarah Johnson</h4>
                    <p className="text-xs sm:text-sm text-gray-300">Personal Injury Client</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Decorative Elements */}
            <motion.div 
              animate={{ 
                y: [0, -15, 0],
                x: [0, 5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut" as const
              }}
              className="absolute -top-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-amber-400/20 rounded-full blur-2xl"
            />
            <motion.div 
              animate={{ 
                y: [0, 15, 0],
                x: [0, -5, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut" as const
              }}
              className="absolute -bottom-4 -left-4 w-32 h-32 sm:w-40 sm:h-40 bg-blue-400/20 rounded-full blur-2xl"
            />
          </motion.div>

          {/* RIGHT COLUMN - Form */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInRight}
          >
            <motion.div variants={staggerContainer}>
              <motion.div variants={fadeInUp} className="mb-6 sm:mb-8 md:mb-10">
                <motion.div 
                  variants={fadeInDown}
                  className="flex items-center justify-start gap-3 mb-3"
                >
                  <motion.span 
                    variants={lineAnimation}
                    className="h-px bg-[#C9A646]"
                  ></motion.span>
                  <motion.p 
                    variants={fadeInUp}
                    className="text-sm uppercase tracking-[0.2em] text-[#C9A646] font-semibold"
                  >
                    Get in Touch
                  </motion.p>
                </motion.div>
                <motion.h2 
                  variants={fadeInUp}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-2 sm:mt-3 md:mt-4 mb-2 sm:mb-3 md:mb-4"
                >
                  Request a Free Consultation
                </motion.h2>
                <motion.p 
                  variants={fadeInUp}
                  className="text-sm sm:text-base md:text-lg text-gray-600"
                >
                  Just fill out the form below to schedule your free initial consultation with our global law experts to help you!
                </motion.p>
              </motion.div>

              <motion.form 
                variants={staggerContainer}
                onSubmit={handleSubmit} 
                className="space-y-4 sm:space-y-5 md:space-y-6"
              >
                <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-amber-500 outline-none focus:border-transparent transition-all duration-300 bg-white text-sm sm:text-base"
                      placeholder="First Name"
                      required
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-amber-500 outline-none focus:border-transparent transition-all duration-300 bg-white text-sm sm:text-base"
                      placeholder="Last Name"
                      required
                    />
                  </motion.div>
                </motion.div>

                <motion.div variants={fadeInUp} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-amber-500 outline-none focus:border-transparent transition-all duration-300 bg-white text-sm sm:text-base"
                    placeholder="Email Address"
                    required
                  />
                </motion.div>

                <motion.div variants={fadeInUp} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-amber-500 outline-none focus:border-transparent transition-all duration-300 bg-white text-sm sm:text-base"
                    placeholder="Phone Number"
                    required
                  />
                </motion.div>

                {/* <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Preferred Date</label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-amber-500 outline-none focus:border-transparent transition-all duration-300 bg-white text-sm sm:text-base"
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Preferred Time</label>
                    <input
                      type="time"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-amber-500 outline-none focus:border-transparent transition-all duration-300 bg-white text-sm sm:text-base"
                    />
                  </motion.div>
                </motion.div> */}

                <motion.div variants={fadeInUp} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Type of Case</label>
                  <div className="relative">
                    <select
                      name="caseType"
                      value={formData.caseType}
                      onChange={handleChange}
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-amber-500 outline-none focus:border-transparent transition-all duration-300 appearance-none bg-white text-sm sm:text-base"
                      required
                    >
                      <option value="">Select case type</option>
                      <option value="personal-injury">Personal Injury</option>
                      <option value="family-law">Family Law</option>
                      <option value="business-law">Business Law</option>
                      <option value="criminal-defense">Criminal Defense</option>
                      <option value="real-estate">Real Estate</option>
                      <option value="estate-planning">Estate Planning</option>
                    </select>
                    <motion.div
                      animate={{ y: [0, 3, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ChevronDown className="absolute right-4 sm:right-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <label className="block text-xs sm:text-sm font-semibold outline-none text-gray-700 mb-1 sm:mb-2">
                    Case Details
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-amber-500 outline-none focus:border-transparent transition-all duration-300 bg-white text-sm sm:text-base"
                    placeholder="Please provide details about your case..."
                  ></textarea>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#b38f3a" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#C9A646] text-white font-semibold py-3 sm:py-4 md:py-5 px-4 sm:px-5 md:px-6 rounded-lg sm:rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" as const }}
                        className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full mx-auto"
                      />
                    ) : isSubmitted ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        <span>Submitted Successfully!</span>
                      </motion.div>
                    ) : (
                      <motion.span 
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        className="flex items-center justify-center gap-2"
                      >
                        Schedule Consultation
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
                      </motion.span>
                    )}
                  </motion.button>
                </motion.div>
              </motion.form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ==================== MAIN CONSULTATION COMPONENT ====================
const Consultation = () => {
  return (
    <main className="overflow-hidden -mt-20">
      <ConsultationBanner />
      <StatsSection />
      <AttorneysSection />
      <CoreValuesSection />
      <ConsultationFormSection />
    </main>
  );
};

export default Consultation;