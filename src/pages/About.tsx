"use client";

// About.tsx
import Link from "next/link";
import { 
  CheckCircle, Award, Users, Target, 
  ChevronRight, Quote, MapPin, Briefcase,
  Star, Globe, TrendingUp, Shield, Mail,
  Phone, Linkedin, Twitter, Scale,
  Landmark, Gem, ScrollText, Sparkles,
  Medal, Trophy, BookOpen, ArrowUpRight,
  Building2, Gavel, Scale as ScaleIcon,
  Calendar, Clock, FileText
} from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import CounterAnimation from "../components/CounterAnimation";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const values = [
  { icon: Award, title: "Integrity", desc: "We uphold the highest ethical standards in every interaction and case we handle." },
  { icon: Users, title: "Client Focus", desc: "Your success is our priority. We listen, understand, and deliver results." },
  { icon: Target, title: "Excellence", desc: "We pursue excellence in every aspect of our legal practice and client service." },
  { icon: CheckCircle, title: "Innovation", desc: "We leverage modern tools and strategies to provide cutting-edge legal solutions." },
];

const founder = {
  name: "Richard Lexington",
  title: "Senior Partner & Founder",
  image: "https://plus.unsplash.com/premium_photo-1770789464736-3159c9194b63?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8",
  education: "Harvard Law School",
  experience: "4+ Years",
  specializations: ["Corporate Law", "M&A", "International Business"],
  desc: "Visionary leader with 4+ years of experience, leading 200+ successful M&A deals worth $10B+.",
  achievements: [
    "200+ M&A deals",
    "Top 100 Lawyers",
    "Chambers USA Rank",
    "Best Lawyer 2022"
  ]
};

const attorneys = [
  { 
    name: "Sarah Chen", 
    title: "Intellectual Property", 
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    experience: "12 years",
    cases: "450+",
    education: "Stanford Law",
    expertise: ["Patent Law", "Trademarks", "Copyright"]
  },
  { 
    name: "Michael Roberts", 
    title: "Litigation", 
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    experience: "15 years",
    cases: "600+",
    education: "Columbia Law",
    expertise: ["Civil Litigation", "Arbitration", "Appeals"]
  },
  { 
    name: "Elizabeth Ward", 
    title: "Real Estate", 
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    experience: "10 years",
    cases: "350+",
    education: "NYU Law",
    expertise: ["Commercial Real Estate", "Zoning", "Property Development"]
  },
  { 
    name: "James Mitchell", 
    title: "Corporate Law", 
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    experience: "18 years",
    cases: "700+",
    education: "Harvard Law",
    expertise: ["Mergers", "Corporate Governance", "Securities"]
  },
  { 
    name: "Patricia Lewis", 
    title: "Tax Law", 
    image: "https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    experience: "14 years",
    cases: "500+",
    education: "Georgetown Law",
    expertise: ["Tax Planning", "IRS Disputes", "International Tax"]
  },
  { 
    name: "David Kim", 
    title: "Employment Law", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    experience: "11 years",
    cases: "400+",
    education: "UC Berkeley Law",
    expertise: ["Labor Law", "Workplace Discrimination", "Contracts"]
  },
];

const successStories = [
  { 
    quote: "J. Ashish Associates LLP handled our $500M merger with exceptional expertise.",
    author: "Robert Thompson",
    position: "CEO, Thompson Industries",
    result: "500M Deal"
  },
  { 
    quote: "They protected our intellectual property across 15 countries.",
    author: "Dr. Elena Martinez",
    position: "Founder, BioTech Innovations",
    result: "15 Countries"
  },
  { 
    quote: "Won a landmark case that set industry precedent.",
    author: "David Chen",
    position: "General Counsel, Global Tech",
    result: "Landmark Victory"
  },
];

const clients = [
  "TechCorp", "GlobalBank", "MediHealth", "EcoEnergy", 
  "FutureFund", "BuildPro", "DataFlow", "GreenLife",
  "InnovateLabs", "SecureTrust", "UrbanDev", "NextGen",
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

// Custom hook for parallax effect
const useParallax = (speed: number = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrolled = window.scrollY;
        ref.current.style.transform = `translateY(${scrolled * speed}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);
  
  return ref;
};

const About = () => {
  const parallaxRef = useParallax(0.3);

  return (
    <div className="overflow-hidden -mt-20">
      {/* Hero Section - Premium Dark Theme with Gold Accents */}
      <section className="relative min-h-screen flex items-center section-padding pt-32 bg-background">
        {/* Animated Background */}
        <motion.div 
          ref={parallaxRef}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" as const }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(212,175,55,0.08),transparent_50%)]" />
        </motion.div>

        <div className="container relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-start gap-3 mb-4">
              <span className="w-10 h-px bg-[#C9A646]"></span>
              <p className="text-sm uppercase tracking-[0.2em] text-[#C9A646] font-semibold">
                EST. 2026
              </p>
            </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight"
            >
              A Tradition of{' '}
              <span className="gold-gradient-text italic">Legal Excellence</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
            >
              Since 2026, J. Ashish Associates LLP has been setting the standard for legal representation, 
              combining decades of experience with a forward-thinking approach.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link 
                href="/contact" 
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground font-semibold rounded-sm hover:bg-accent transition-all duration-300 btn-shine inline-flex items-center gap-2"
              >
                Schedule Consultation
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/team" 
                className="group px-6 sm:px-8 py-3 sm:py-4 border border-primary/30 text-foreground font-semibold rounded-sm hover:bg-primary/10 transition-all duration-300 inline-flex items-center gap-2"
              >
                Meet Our Team
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Legacy Section - Premium Corporate Blue */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 pattern-grid opacity-5" />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" as const }}
          className="absolute -right-20 -top-20 w-64 h-64 border-2 border-amber-200/30 rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1], 
            opacity: [0.1, 0.15, 0.1] 
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -left-20 -bottom-20 w-80 h-80 bg-amber-100 rounded-full blur-3xl"
        />
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInLeft}
              className="space-y-6"
            >
              <div>
                <div className="flex items-center justify-start gap-3 mb-4">
              <span className="w-10 h-px bg-[#C9A646]"></span>
              <p className="text-sm uppercase tracking-[0.2em] text-[#C9A646] font-semibold">
                Our Legacy
              </p>
            </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-6 text-gray-900">
                  Building Trust Since{' '}
                  <span className="text-[#C9A646] italic">2026</span>
                </h2>
              </div>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="text-base sm:text-lg">
                  Founded by Richard Lexington and Margaret Hayes, our firm began with a mission to provide exceptional legal counsel to businesses and individuals alike.
                </p>
                <p>
                  Today, we've grown into a full-service firm with 30+ attorneys across multiple practice areas, maintaining our founding principles of integrity, excellence, and client-centered service.
                </p>
                <p>
                  Our commitment to innovation and client success has made us one of the most trusted law firms in the nation, with a reputation for handling complex, high-stakes matters with discretion and skill.
                </p>
              </div>

              <motion.div 
                variants={scaleIn}
                className="flex items-center gap-4 pt-4"
              >
                <div className="flex -space-x-3">
  {[
    "https://images.unsplash.com/photo-1595152772835-219674b2a8a6",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a",
    "https://images.unsplash.com/photo-1556157382-97eda2d62296"
  ].map((img, i) => (
    <motion.img
      key={i}
      src={`${img}?w=200&h=200&fit=crop`}
      whileHover={{ scale: 1.1, y: -5 }}
      className="w-10 h-10 rounded-full border-2 border-white shadow-lg object-cover"
    />
  ))}
</div>
                <div className="text-sm">
                  <span className="font-bold text-[#C9A646]">50+</span>{' '}
                  <span className="text-gray-500">Companies Trust Us</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInRight}
              className="relative"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-white backdrop-blur-sm rounded-2xl border border-blue-100 shadow-xl">
                <CounterAnimation end={4} suffix="+" label="Years of Excellence" theme="light" />
                <CounterAnimation end={30} suffix="+" label="Expert Attorneys" theme="light" />
                <CounterAnimation end={50} suffix="+" label="Cases Won" theme="light" />
                <CounterAnimation end={15} suffix="+" label="Industry Awards" theme="light" />
              </div>

              <motion.div 
                variants={scaleIn}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="absolute -bottom-6 -left-6 bg-[#C9A646] text-white px-6 py-3 rounded-xl shadow-xl hidden sm:block"
              >
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 fill-white" />
                  <span className="font-semibold">Top-Rated 2026</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet Our Founder - Premium Dark Theme with Gold */}
      <section className="section-alt section-padding relative overflow-hidden">
        {/* Premium Background Elements */}
        <div className="absolute inset-0 pattern-gold opacity-5" />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 right-20 w-96 h-96 border border-primary/10 rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
        />
        
        {/* Decorative Law Elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        <motion.div 
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-40 left-10 opacity-5 hidden lg:block"
        >
          <Gavel className="w-24 h-24 text-primary" />
        </motion.div>
        <motion.div 
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-40 right-10 opacity-5 hidden lg:block"
        >
          <ScaleIcon className="w-24 h-24 text-primary" />
        </motion.div>

        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <motion.div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-12 h-px bg-primary"></span>
              <span className="text-primary uppercase tracking-[0.2em] text-sm font-semibold">
                Visionary Leadership
              </span>
              <span className="w-12 h-px bg-primary"></span>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-4">
              Meet Our <span className="gold-gradient-text italic">Founder</span>
            </h2>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              className="relative"
            >
              {/* Premium Law Card Design */}
              <div className="relative bg-gradient-to-br from-card/50 via-card/30 to-card/50 backdrop-blur-xl border border-primary/10 rounded-3xl overflow-hidden shadow-2xl">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-24 sm:w-32 h-24 sm:h-32 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl" />
                <div className="absolute bottom-0 right-0 w-24 sm:w-32 h-24 sm:h-32 border-b-2 border-r-2 border-primary/30 rounded-br-3xl" />
                
                {/* Glowing Orbs */}
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
                />
                <motion.div 
                  animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl"
                />

                <div className="grid lg:grid-cols-2 gap-0 relative z-10">
                  {/* Image Section */}
                  <div className="relative h-[400px] lg:h-[600px] overflow-hidden group">
                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent mix-blend-overlay z-10" />
                    <motion.img 
                      src={founder.image} 
                      alt={founder.name}
                      className="w-full h-full object-cover object-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    
                    {/* Floating Badges */}
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="absolute top-6 left-6 bg-primary/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-xl z-20"
                    >
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-primary-foreground" />
                        <span className="text-xs font-semibold text-primary-foreground">LEGENDARY LEADER</span>
                      </div>
                    </motion.div>

                    {/* Social Icons */}
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="absolute bottom-6 left-6 flex gap-3 z-20"
                    >
                      {[
                        { icon: Linkedin, color: "hover:bg-[#0077b5]" },
                        { icon: Mail, color: "hover:bg-primary" },
                        { icon: Twitter, color: "hover:bg-[#1DA1F2]" },
                      ].map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.2, y: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className={`w-10 h-10 rounded-full bg-background/50 backdrop-blur-md border border-primary/20 flex items-center justify-center cursor-pointer transition-all duration-300 ${item.color} group/social`}
                          >
                            <Icon className="w-4 h-4 text-primary group-hover/social:text-primary-foreground transition-colors" />
                          </motion.div>
                        );
                      })}
                    </motion.div>

                    {/* Experience Badge */}
                    <div className="absolute bottom-8 right-8 w-28 h-28">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" as const }}
                        className="absolute inset-0 border-4 border-primary/30 rounded-full border-dashed"
                      />
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-xs font-bold text-primary">{founder.experience}</span>
                        <span className="text-[8px] text-muted-foreground">Experience</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center"
                  >
                    <motion.div variants={fadeInLeft} className="mb-6">
                      <span className="text-primary text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase">The Visionary</span>
                      <div className="flex items-center gap-3 mt-2">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground">
                          {founder.name}
                        </h3>
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        </motion.div>
                      </div>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="mb-6 sm:mb-8">
                      <p className="text-lg sm:text-xl text-primary font-medium flex items-center gap-2">
                        {founder.title}
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </p>
                      <div className="w-20 h-0.5 bg-gradient-to-r from-primary to-accent mt-2" />
                    </motion.div>

                    <motion.p variants={fadeInUp} className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 sm:mb-8">
                      {founder.desc}
                    </motion.p>

                    <motion.div variants={fadeInUp} className="mb-6 sm:mb-8">
                      <p className="text-xs sm:text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                        <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                        Specializations
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {founder.specializations.map((spec, index) => (
                          <motion.span 
                            key={index}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="px-2 sm:px-3 py-1 sm:py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium text-primary"
                          >
                            {spec}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                      <p className="text-xs sm:text-sm font-semibold text-primary mb-3">Key Achievements</p>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        {founder.achievements.map((achievement, index) => (
                          <motion.div 
                            key={index}
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-2 bg-primary/5 backdrop-blur-sm border border-primary/10 rounded-lg p-2"
                          >
                            <motion.div 
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                              className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"
                            />
                            <span className="text-xs text-muted-foreground">{achievement}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Presence - Light Theme */}
      <section className="section-padding bg-white border-y border-gray-200 relative overflow-hidden">
        <motion.div 
          animate={{ x: [0, 100, 0], opacity: [0, 0.1, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl"
        />

        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-10 h-px bg-[#C9A646]"></span>
              <p className="text-sm uppercase tracking-[0.2em] text-[#C9A646] font-semibold">
                Global Network
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4 text-gray-900">Trusted Worldwide</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              With offices in major financial centers across the globe, we provide seamless legal support for international matters.
            </p>
          </motion.div>

          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10" />
            
            <motion.div 
              className="flex animate-infinite-scroll"
            >
              {[...clients, ...clients].map((client, index) => (
                <motion.div
                  key={index}
                  className="flex-none w-36 sm:w-48 mx-4 sm:mx-8 group cursor-pointer"
                >
                  <div className="h-20 sm:h-24 flex items-center justify-center border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm group-hover:border-amber-300 shadow-sm transition-all duration-300 px-4">
                    <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-[#C9A646] transition-colors flex-shrink-0" />
                    <span className="ml-2 text-xs sm:text-sm font-semibold text-gray-600 group-hover:text-[#C9A646] truncate">
                      {client}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            className="text-center mt-12"
          >
            <div className="inline-flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-[#C9A646]" />
              <span>Offices in Chennai · London · Singapore · Dubai · Sydney</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Meet Attorneys - Dark Theme with Gold */}
      <section className="section-alt section-padding relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-5" />
        
        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <motion.div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-12 h-px bg-primary"></span>
              <span className="text-primary uppercase tracking-[0.2em] text-sm font-semibold">
                Our Team
              </span>
              <span className="w-12 h-px bg-primary"></span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4">
              Meet Our <span className="gold-gradient-text italic">Attorneys</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our team combines deep legal expertise with a commitment to achieving exceptional results for our clients.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {attorneys.map((attorney, index) => (
              <motion.div
                key={attorney.name}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <img 
                    src={attorney.image} 
                    alt={attorney.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />

                  {/* Practice Area Badge */}
                  <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full z-20">
                    <span className="text-xs font-semibold text-primary-foreground">{attorney.title}</span>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-heading font-bold mb-2 group-hover:text-primary transition-colors text-foreground">
                    {attorney.name}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm">
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                      <span className="text-muted-foreground">{attorney.experience}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                      <span className="text-muted-foreground">{attorney.cases}</span>
                    </div>
                  </div>

                  <div className="mb-3 sm:mb-4">
                    <div className="flex items-center gap-2">
                      <Landmark className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-muted-foreground truncate">{attorney.education}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {attorney.expertise.map((exp, i) => (
                      <span 
                        key={i}
                        className="text-xs px-2 py-1 bg-primary/5 border border-primary/10 rounded-full text-muted-foreground"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            className="text-center mt-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/team" 
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground font-semibold rounded-sm hover:bg-accent transition-all duration-300 btn-shine"
              >
                View All Attorneys
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Success Stories - Light Theme */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-5" />
        
        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
           <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-10 h-px bg-[#C9A646]"></span>
              <p className="text-sm uppercase tracking-[0.2em] text-[#C9A646] font-semibold">
                Testimonials
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 text-gray-900">
              Client <span className="text-[#C9A646] italic">Success Stories</span>
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white border border-gray-200 rounded-xl p-6 h-full flex flex-col shadow-lg"
              >
                <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-amber-300 mb-4" />
                <p className="text-sm sm:text-base text-gray-600 mb-4 flex-grow italic">"{story.quote}"</p>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-heading font-semibold text-gray-900 text-sm sm:text-base">{story.author}</h4>
                      <p className="text-xs text-gray-500">{story.position}</p>
                    </div>
                    <div className="bg-blue-50 px-3 py-1 rounded-full self-start sm:self-auto">
                      <span className="text-xs font-bold text-[#C9A646]">{story.result}</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-3 h-3 fill-[#C9A646] text-[#C9A646]" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Values - Dark Theme */}
      <section className="section-alt section-padding relative overflow-hidden">
        <div className="absolute inset-0 pattern-gold opacity-5" />
        
        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <motion.div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-12 h-px bg-primary"></span>
              <span className="text-primary uppercase tracking-[0.2em] text-sm font-semibold">
                Our Values
              </span>
              <span className="w-12 h-px bg-primary"></span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4">
              What <span className="gold-gradient-text italic">Drives Us</span>
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  className="group p-6 bg-card border border-border rounded-xl text-center relative overflow-hidden"
                >
                  <Icon className="absolute -right-4 -bottom-4 w-20 h-20 text-primary/5 group-hover:text-primary/10 transition-colors" />
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                    </div>
                    
                    <h3 className="text-base sm:text-lg font-heading font-semibold mb-2 sm:mb-3 group-hover:text-primary transition-colors text-foreground">
                      {v.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Premium Corporate */}
      <section className="relative section-padding bg-white overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.05),transparent_50%)]"
        />
        
        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleIn}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center justify-center gap-3 mb-4"
            >
              <span className="w-10 h-px bg-[#C9A646]"></span>
              <p className="text-sm uppercase tracking-[0.2em] text-[#C9A646] font-semibold">
                Join Our Success Stories
              </p>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 sm:mb-6 text-gray-900">
              Ready to Join Our{' '}
              <span className="text-[#C9A646] italic">Legacy of Success!</span>
            </h2>
            
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-10 leading-relaxed">
              Partner with a team that puts your success first. Schedule a confidential consultation today.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/contact" 
                className="group px-6 sm:px-10 py-3 sm:py-4 bg-[#C9A646] text-white font-semibold rounded-lg hover:bg-amber-700 transition-all duration-300 btn-shine inline-flex items-center gap-2 text-base sm:text-base shadow-lg"
              >
                Schedule Consultation
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200"
            >
              {[
                { icon: Shield, text: "100% Confidential" },
                { icon: Users, text: "30+ Lawyers" },
                { icon: Calendar, text: "5 Years Experience" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                    className="flex items-center gap-2"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#C9A646]" />
                    <span className="text-xs sm:text-sm text-gray-600">{item.text}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;