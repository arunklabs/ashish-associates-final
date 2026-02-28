// Index.tsx

"use client";

type FormDataType = {
  countryCode: string;
  fullName: string;
  lastName: string;
  email: string;
  phone: string;
  practiceArea: string;
  message: string;
};

type FormErrorsType = Partial<FormDataType>;


import Link from "next/link";
import Image from "next/image";
import { motion, Variants, useMotionValue, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Scale, Gavel, Heart, Home, ArrowRight, CheckCircle, 
  Quote, ChevronLeft, ChevronRight, Award, Users, 
  Briefcase, Clock, Shield, Star, Phone, Mail, 
  Building2, Landmark, Scale as ScaleIcon, UserCheck,
  CalendarCheck, FileCheck, Target, Zap, Globe2,
  Trophy, Medal, TrendingUp, BookOpen, Newspaper,
  MapPin, Send, Github, Linkedin, Twitter,
  Play, Pause, ChevronDown, Sparkles, Gem,
  Fingerprint, Lock, HeartHandshake, Rocket,
  BarChart3, Compass, Crown, Eye, Users2,
  UserCircle2, Quote as QuoteIcon, Calendar,
  ArrowUpRight, CornerRightUp, CircleDot,
  Award as AwardIcon, Activity, Castle,
  Church, Building, PenTool, ScrollText,
  Swords, ShieldCheck, User, BriefcaseBusiness,
  Handshake, Scale as ScaleLaw, Network,
  PartyPopper, Sparkle, Hourglass, ThumbsUp,
  Trophy as TrophyIcon, Medal as MedalIcon,
  Gem as GemIcon, Crown as CrownIcon,
  Star as StarIcon, Sparkles as SparklesIcon,
  GraduationCap,
  GraduationCapIcon,
  Diamond,
  ShieldCheck as ShieldIcon,
  Scale as ScaleLawIcon,
  Gavel as GavelIcon,
  Home as HomeIcon,
  Heart as HeartIcon,
  Briefcase as BriefcaseIcon,
  Building as BuildingIcon,
  Users as UsersIcon,
  Clock as ClockIcon,
  Target as TargetIcon,
  Zap as ZapIcon,
  FileCheck as FileCheckIcon,
  CalendarCheck as CalendarCheckIcon,
  Handshake as HandshakeIcon,
  Gem as GemIcon2,
  Sparkles as SparklesIcon2,
  BadgeCheck,
  Award as AwardIcon2,
  Medal as MedalIcon2,
  Trophy as TrophyIcon2,
  Star as StarIcon2,
  Shield as ShieldIcon2,
  Lock as LockIcon,
  Heart as HeartIcon2,
  Rocket as RocketIcon2,
  Compass as CompassIcon
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { getCMSData } from '../lib/cmsCache';
import { Employee, Founder, getEmployeeImageUrl, getFounderImageUrl, BlogPost, formatDate, getBlogImageUrl } from '../lib/sanityQueries';
import { slideFromLeft, slideFromRight, staggerContainer, fadeInUp, fadeSoft, viewportOnceMore } from '@/lib/animations';

// Import premium images
const hero1 = "/assets/hero1.webp";
const hero2 = "/assets/hero2.webp";
const aboutMain = "/assets/hero2.webp";
const practiceCorporate = "/assets/hero2.webp";
const practiceLitigation = "/assets/hero2.webp";
const practiceFamily = "/assets/hero2.webp";
const practiceRealEstate = "/assets/hero2.webp";
const teamImage = "/assets/hero2.webp";
const courtroom = "/assets/hero2.webp";
const consultation = "/assets/hero2.webp";
const founderImage = "/assets/hero2.webp";
const news1 = "/assets/hero2.webp";
const news2 = "/assets/hero2.webp";
const news3 = "/assets/hero2.webp";
const news4 = "/assets/hero2.webp";
const attorney1 = "/assets/hero2.webp";
const attorney2 = "/assets/hero2.webp";
const attorney3 = "/assets/hero2.webp";
const attorney4 = "/assets/hero2.webp";
const attorney5 = "/assets/hero2.webp";
const attorney6 = "/assets/hero2.webp";
const globalMap = "/assets/hero2.webp";
const coreValue1 = "/assets/hero2.webp";
const coreValue2 = "/assets/hero2.webp";
const coreValue3 = "/assets/hero2.webp";
const coreValue4 = "/assets/hero2.webp";
import CountUpAnimation from "../components/CountUpAnimation";

const practiceAreas = [
  { 
    icon: Briefcase, 
    title: "Corporate Law", 
    desc: "Strategic counsel for businesses of all sizes, from startups to Fortune 500 companies.",
    image: practiceCorporate,
    lightIcon: Building2,
    color: "from-blue-600 to-blue-800",
    gradient: "bg-gradient-to-br from-amber-500 to-amber-700",
    stats: "25 Cases",
    experience: "4+ Years"
  },
  { 
    icon: Gavel, 
    title: "Criminal Law", 
    desc: "Aggressive advocacy in complex commercial and civil litigation matters.",
    image: practiceLitigation,
    lightIcon: ScaleIcon,
    color: "from-amber-600 to-amber-800",
    gradient: "bg-gradient-to-br from-amber-500 to-amber-700",
    stats: "10+ Cases",
    experience: "4+ Years"
  },
  { 
    icon: Heart, 
    title: "Family Law", 
    desc: "Compassionate representation in divorce, custody, and family disputes.",
    image: practiceFamily,
    lightIcon: Users,
    color: "from-rose-600 to-rose-800",
    gradient: "bg-gradient-to-br from-amber-500 to-amber-700",
    stats: "20+ Cases",
    experience: "4+ Years"
  },
  { 
    icon: Home, 
    title: "Property Law", 
    desc: "Comprehensive legal services for commercial and residential transactions.",
    image: practiceRealEstate,
    lightIcon: Building2,
    color: "from-emerald-600 to-emerald-800",
    gradient: "bg-gradient-to-br from-amber-500 to-amber-700",
    stats: "21+ Cases",
    experience: "4+ Years"
  },
  { 
    icon: ShieldCheck, 
    title: "Intellectual Property", 
    desc: "Protect your innovations with comprehensive IP strategy and enforcement.",
    image: practiceCorporate,
    lightIcon: Shield,
    color: "from-purple-600 to-purple-800",
    gradient: "bg-gradient-to-br from-amber-500 to-amber-700",
    stats: "30+ Cases",
    experience: "4+ Years"
  },
  { 
    icon: Users, 
    title: "Civil Law", 
    desc: "Expert guidance on workplace issues, discrimination, and labor disputes.",
    image: practiceLitigation,
    lightIcon: Users2,
    color: "from-indigo-600 to-indigo-800",
    gradient: "bg-gradient-to-br from-amber-500 to-amber-700",
    stats: "40+ Cases",
    experience: "5+ Years"
  }
];

const testimonials = [
  { 
    name: "James Morrison", 
    role: "CEO, Morrison Holdings", 
    text: "J. Ashish Associates LLP provided exceptional counsel during our $50M acquisition. Their attention to detail was unmatched.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
  },
  { 
    name: "Sarah Chen", 
    role: "Founder, TechVentures", 
    text: "Their corporate team guided us through complex regulatory challenges with remarkable expertise and professionalism.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1761839259484-4741afbbdcbf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    name: "Robert Williams", 
    role: "Real Estate Developer", 
    text: "I've worked with many law firms over 20 years. Lexington stands apart in their commitment to client success.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
  },
  { 
    name: "Elizabeth Parker", 
    role: "CFO, Parker Industries", 
    text: "The level of dedication and legal acumen displayed by their team is truly exceptional.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop"
  },
];

const processSteps = [
  { 
    step: "01", 
    title: "Initial Consultation", 
    desc: "We begin with a thorough assessment of your legal situation and objectives.",
    image: consultation,
    icon: CalendarCheckIcon,
    color: "from-blue-500 to-blue-600"
  },
  { 
    step: "02", 
    title: "Strategy Development", 
    desc: "Our team develops a tailored legal strategy aligned with your goals.",
    image: teamImage,
    icon: TargetIcon,
    color: "from-amber-500 to-amber-600"
  },
  { 
    step: "03", 
    title: "Execution", 
    desc: "We execute with precision, keeping you informed at every stage.",
    image: courtroom,
    icon: ZapIcon,
    color: "from-purple-500 to-purple-600"
  },
  { 
    step: "04", 
    title: "Resolution", 
    desc: "We work relentlessly toward the best possible outcome for your case.",
    image: hero2,
    icon: FileCheckIcon,
    color: "from-emerald-500 to-emerald-600"
  },
];

const heroSlides = [
  {
    image: hero1,
    title: "Justice Through",
    subtitle: "Excellence",
    description: "Premier legal counsel dedicated to protecting your rights and securing your future with unwavering commitment.",
    badge: "Since 2026"
  },
  {
    image: hero2,
    title: "Your Trusted",
    subtitle: "Advocates",
    description: "Decades of experience in delivering favorable outcomes for our clients across all practice areas.",
    badge: "50+ Cases Won"
  },
  {
    image: courtroom,
    title: "Legal Expertise",
    subtitle: "You Can Count On",
    description: "Combining traditional values with modern strategies to achieve the best results for your case.",
    badge: "98% Success Rate"
  }
];

const infiniteScrollItems = [
  { icon: Trophy, text: "Top Tier Law Firm 2026" },
  { icon: Award, text: "Excellence in Corporate Law" },
  { icon: Star, text: "5-Star Client Rating" },
  { icon: Shield, text: "100% Confidential" },
  { icon: Globe2, text: "Global Reach" },
  { icon: Medal, text: "Award Winning Team" },
  { icon: Trophy, text: "Best Legal Services" },
  { icon: Award, text: "Chambers Ranked" },
];

const globalAttorneys = [
  { country: "United States", count: 25, flag: "🇺🇸" },
  { country: "United Kingdom", count: 12, flag: "🇬🇧" },
  { country: "Singapore", count: 8, flag: "🇸🇬" },
  { country: "UAE", count: 5, flag: "🇦🇪" },
  { country: "Germany", count: 7, flag: "🇩🇪" },
  { country: "France", count: 6, flag: "🇫🇷" },
];

const coreValues = [
  { 
    title: "Integrity First", 
    desc: "Unwavering commitment to ethical practice and transparency in all dealings.",
    icon: LockIcon,
    image: coreValue1,
    color: "from-blue-600 to-blue-800",
    bgLight: "bg-blue-50",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200"
  },
  { 
    title: "Client-Centric", 
    desc: "Your goals drive our strategy. We prioritize your success above all.",
    icon: HeartIcon2,
    image: coreValue2,
    color: "from-amber-600 to-amber-800",
    bgLight: "bg-amber-50",
    iconColor: "text-amber-600",
    borderColor: "border-amber-200"
  },
  { 
    title: "Excellence Always", 
    desc: "Pursuing the highest standards in every case, every time.",
    icon: RocketIcon2,
    image: coreValue3,
    color: "from-emerald-600 to-emerald-800",
    bgLight: "bg-emerald-50",
    iconColor: "text-emerald-600",
    borderColor: "border-emerald-200"
  },
  { 
    title: "Innovation Driven", 
    desc: "Embracing modern solutions to solve complex legal challenges.",
    icon: CompassIcon,
    image: coreValue4,
    color: "from-purple-600 to-purple-800",
    bgLight: "bg-purple-50",
    iconColor: "text-purple-600",
    borderColor: "border-purple-200"
  },
];

const globalRatings = [
  { source: "Chambers & Partners", rating: "Band 1", icon: Crown, year: "2026", score: "★★★★★", rank: "#1" },
  { source: "Legal 500", rating: "Top Tier", icon: Trophy, year: "2026", score: "★★★★★", rank: "Tier 1" },
  { source: "Martindale-Hubbell", rating: "AV Preeminent", icon: Star, year: "2026", score: "★★★★★", rank: "5.0" },
  { source: "Best Lawyers", rating: "Law Firm of the Year", icon: Award, year: "2026", score: "★★★★★", rank: "Winner" },
  { source: "IFLR1000", rating: "Highly Recommended", icon: Medal, year: "2026", score: "★★★★★", rank: "Top Tier" },
  { source: "Financial Times", rating: "Innovative Lawyers", icon: Zap, year: "2026", score: "★★★★★", rank: "Top 10" },
  { source: "Bloomberg Law", rating: "Excellence Award", icon: Sparkles, year: "2026", score: "★★★★★", rank: "Gold" },
];

const latestNews = [
  { 
    title: "J. Ashish Associates LLP Named 'Corporate Law Firm of the Year'", 
    excerpt: "Recognized for excellence in M&A and cross-border transactions at the 2026 International Legal Awards.",
    date: "March 15, 2026",
    category: "Awards",
    image: news1,
    author: "Legal Times"
  },
  { 
    title: "Expanding Global Reach: New Office Opens in Singapore", 
    excerpt: "Strategic expansion strengthens our presence in Asian markets, adding 8 new partners to our international team.",
    date: "February 28, 2026",
    category: "Expansion",
    image: news2,
    author: "Global Legal Chronicle"
  },
  { 
    title: "Leading the Way in ESG Compliance", 
    excerpt: "Our environmental, social, and governance practice helps corporations navigate complex regulatory landscapes.",
    date: "February 10, 2026",
    category: "Insights",
    image: news3,
    author: "Bloomberg Law"
  },
  { 
    title: "Pro Bono Initiative Reaches Milestone", 
    excerpt: "Our attorneys contributed 10,000+ hours to provide legal aid for underserved communities in 2023.",
    date: "January 25, 2026",
    category: "Community",
    image: news4,
    author: "ABA Journal"
  },
  { 
    title: "Partner Sarah Mitchell Joins Board of Legal Aid Society", 
    excerpt: "Commitment to access to justice extends beyond the firm with leadership in non-profit organizations.",
    date: "January 12, 2026",
    category: "Leadership",
    image: news2,
    author: "Law360"
  },
  { 
    title: "Innovation in Legal Tech: AI-Powered Case Analysis", 
    excerpt: "Implementing cutting-edge technology to enhance case strategy and client outcomes.",
    date: "December 5, 2023",
    category: "Technology",
    image: news3,
    author: "Legal Tech News"
  },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);
  const [currentAttorneyIndex, setCurrentAttorneyIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [newsCurrentIndex, setNewsCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const heroRef = useRef(null);
  const attorneysRef = useRef(null);
  const newsRef = useRef(null);
  const [infiniteStripPointerEvents, setInfiniteStripPointerEvents] = useState<"auto" | "none">("auto");
  const infiniteScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [founders, setFounders] = useState<Founder[]>([]);
    const [teamMembers, setTeamMembers] = useState<any[]>([]);
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

const [formData, setFormData] = useState<FormDataType>({
  countryCode: "+91",
  fullName: "",
  lastName: "",
  email: "",
  phone: "",
  practiceArea: "",
  message: ""
});

const [errors, setErrors] = useState<FormErrorsType>({});
const [touched, setTouched] = useState<Record<keyof FormDataType, boolean>>({
  countryCode: false,
  fullName: false,
  lastName: false,
  email: false,
  phone: false,
  practiceArea: false,
  message: false
});

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;

  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

const handleBlur = (
  e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name } = e.target;

  setTouched(prev => ({
    ...prev,
    [name as keyof FormDataType]: true
  }));
};

const validate = (): FormErrorsType => {
  let newErrors: FormErrorsType = {};

 const nameRegex = /^[A-Za-z\s]+$/;

if (formData.fullName && !nameRegex.test(formData.fullName)) {
  newErrors.fullName = "Name should contain only letters";
}

  if (!formData.email.trim())
    newErrors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
    newErrors.email = "Invalid email";

  if (!formData.phone.trim())
    newErrors.phone = "Phone number is required";
  else if (!/^\d+$/.test(formData.phone))
    newErrors.phone = "Only numbers allowed";

  if (!formData.practiceArea)
    newErrors.practiceArea = "Select practice area";

  if (!formData.message.trim())
    newErrors.message = "Message is required";

  return newErrors;
};


const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const validationErrors = validate();
  setErrors(validationErrors);

  setTouched({
    countryCode: true,
    fullName: true,
    lastName: true,
    email: true,
    phone: true,
    practiceArea: true,
    message: true
  });

  if (Object.keys(validationErrors).length === 0) {

    alert("Form submitted successfully ✅");

    setFormData({
      countryCode: "+91",
      fullName: "",
      lastName: "",
      email: "",
      phone: "",
      practiceArea: "",
      message: ""
    });

    setTouched({
      countryCode: false,
      fullName: false,
      lastName: false,
      email: false,
      phone: false,
      practiceArea: false,
      message: false
    });
  }
};
    
    // Fetch CMS data on component mount
    useEffect(() => {
      const fetchTeamData = async () => {
        try {
          setIsLoading(true);
          const cmsData = await getCMSData();
          // Filter employees by category for founders (founder/senior categories)
          const foundersData = cmsData.founders;
          
          // Get all employees for team members section
          const teamMembersData = cmsData.employees;
          const blogData = cmsData.blogs || [];
          
          setFounders(foundersData);
          
          setTeamMembers(teamMembersData);
          setPosts(blogData);
        } catch (error) {
          if (process.env.NODE_ENV === 'development') console.error('Failed to fetch team data:', error);
          // Keep fallback data in case of error
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchTeamData();
    }, []);
    const primaryFounder = founders?.[0];

  // Auto-slide for hero with direction tracking - Slower interval
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setSlideDirection(1);
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 6000); // Increased from 5000 to 6000ms
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  // Auto-slide for attorneys - Slower interval
  useEffect(() => {

    if (!teamMembers.length) return; 

    let attorneyTimer: NodeJS.Timeout;
    if (!isHovering) {
      attorneyTimer = setInterval(() => {
        setCurrentAttorneyIndex((prev) => (prev + 1) % teamMembers.length);
      }, 4000); // Increased from 3000 to 4000ms
    }
    return () => clearInterval(attorneyTimer);
  }, [isHovering, teamMembers.length]);

  // Isolate infinite scroll strip from document scroll (pointer-events off during wheel)
  useEffect(() => {
    const SCROLL_ISOLATION_MS = 250;
    const onWheel = () => {
      setInfiniteStripPointerEvents("none");
      if (infiniteScrollTimeoutRef.current) clearTimeout(infiniteScrollTimeoutRef.current);
      infiniteScrollTimeoutRef.current = setTimeout(() => {
        setInfiniteStripPointerEvents("auto");
        infiniteScrollTimeoutRef.current = null;
      }, SCROLL_ISOLATION_MS);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      if (infiniteScrollTimeoutRef.current) clearTimeout(infiniteScrollTimeoutRef.current);
    };
  }, []);

  const nextSlide = () => {
    setSlideDirection(1);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setSlideDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const nextNews = () => {
    setNewsCurrentIndex((prev) => (prev + 1) % Math.ceil(latestNews.length / 3));
  };

  const prevNews = () => {
    setNewsCurrentIndex((prev) => (prev - 1 + Math.ceil(latestNews.length / 3)) % Math.ceil(latestNews.length / 3));
  };

  // Animation variants from @/lib/animations: slideFromLeft, slideFromRight, staggerContainer
  const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 1.1
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.8 },
      scale: { duration: 0.8 }
    }
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 1.1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.6 }
    }
  })
};

  // Animation variants for buttons
const buttonFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.8
    } 
  },
  exit: { 
    opacity: 0, 
    x: -100,
    transition: { duration: 0.3 }
  }
};

const buttonFromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.8
    } 
  },
  exit: { 
    opacity: 0, 
    x: 100,
    transition: { duration: 0.3 }
  }
};

// fadeInUp, fadeSoft from @/lib/animations

const premiumStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2
    }
  }
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as const
    }
  }
};


  return (
    <div className="bg-background text-foreground overflow-x-hidden -mt-20">
      {/* Hero Section */}
<section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-background">
  {/* Background Image with Faster Carousel Sliding */}
  <div className="absolute inset-0">
    <AnimatePresence mode="wait" custom={slideDirection}>
      <motion.div
        key={currentSlide}
        custom={slideDirection}
        variants={{
          enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
          }),
          center: {
            x: 0,
            opacity: 1,
            transition: {
              x: { 
                duration: 0.6, // Faster image slide (0.6 seconds)
                ease: [0.25, 0.1, 0.25, 1] as const // Smooth easing
              },
              opacity: { 
                duration: 0.4,
                ease: "easeInOut" as const
              }
            }
          },
          exit: (direction: number) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0,
            transition: {
              x: { 
                duration: 0.5, // Faster exit
                ease: [0.25, 0.1, 0.25, 1] as const
              },
              opacity: { 
                duration: 0.3,
                ease: "easeInOut" as const
              }
            }
          })
        }}
        initial="enter"
        animate="center"
        exit="exit"
        className="absolute inset-0"
      >
        <Image
          src={heroSlides[currentSlide].image}
          alt={`Law firm hero ${currentSlide + 1}`}
          fill
          className="object-cover"
          sizes="100vw"
          priority={currentSlide === 0}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>
    </AnimatePresence>
  </div>

  {/* Navigation Arrows - Responsive */}
  <button
    onClick={prevSlide}
    className="absolute left-2 sm:left-4 md:left-8 z-30 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300 group"
    aria-label="Previous slide"
  >
    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
  </button>

  <button
    onClick={nextSlide}
    className="absolute right-2 sm:right-4 md:right-8 z-30 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300 group"
    aria-label="Next slide"
  >
    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
  </button>

  {/* Content - Appears after image slide completes */}
  <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-20">
    <div className="max-w-6xl pt-20 mx-auto text-start">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.7, // Wait for image slide (0.6s) + small buffer
                duration: 0.5
              }
            },
            exit: {
              opacity: 0,
              transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
                duration: 0.3
              }
            }
          }}
        >
          {/* Badge with animation */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1] as const
                }
              },
              exit: { 
                opacity: 0, 
                y: -30,
                transition: { duration: 0.3 }
              }
            }}
            className="flex items-center justify-start gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8"
          >
            <motion.span 
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.8, // Wait for badge to appear first
                ease: [0.25, 0.1, 0.25, 1] as const
              }}
              className="h-px bg-primary hidden sm:block"
            />
            <span className="text-primary uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold">
              {heroSlides[currentSlide].badge}
            </span>
            <motion.span 
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.8,
                ease: [0.25, 0.1, 0.25, 1] as const
              }}
              className="h-px bg-primary hidden sm:block"
            />
          </motion.div>
          
          {/* Title and Description */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.7,
                  delay: 0.2, // After badge
                  ease: [0.25, 0.1, 0.25, 1] as const
                }
              },
              exit: { 
                opacity: 0, 
                y: -30,
                transition: { duration: 0.3 }
              }
            }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-heading font-bold leading-tight mb-3 sm:mb-4 md:mb-6 text-white px-2">
              {heroSlides[currentSlide].title}
              <br />
              <span className="gold-gradient-text italic block sm:inline">{heroSlides[currentSlide].subtitle}</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-2xl px-4">
              {heroSlides[currentSlide].description}
            </p>
          </motion.div>

          {/* Buttons - Animated from left and right */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.4 // After title
                }
              },
              exit: {
                opacity: 0,
                transition: {
                  staggerChildren: 0.1,
                  staggerDirection: -1,
                  duration: 0.3
                }
              }
            }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start items-center mb-8 sm:mb-10 md:mb-16 px-4"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -100 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: {
                    duration: 0.7,
                    ease: [0.25, 0.1, 0.25, 1] as const
                  }
                },
                exit: { 
                  opacity: 0, 
                  x: -100,
                  transition: { duration: 0.3 }
                }
              }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/contact"
                className="group w-full sm:w-auto px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-primary 
                text-primary-foreground font-semibold rounded-sm hover:bg-accent transition-all duration-300 
                btn-shine text-center inline-flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                Schedule Consultation
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 100 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: {
                    duration: 0.7,
                    ease: [0.25, 0.1, 0.25, 1] as const
                  }
                },
                exit: { 
                  opacity: 0, 
                  x: 100,
                  transition: { duration: 0.3 }
                }
              }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/practice-areas"
                className="group w-full sm:w-auto px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 border border-white text-white font-semibold rounded-sm hover:bg-white hover:text-primary transition-all duration-300 text-center inline-flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                Explore Practice Areas
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Dots Navigation */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.6,
                  delay: 0.6, // After buttons
                  ease: [0.25, 0.1, 0.25, 1] as const
                }
              },
              exit: { 
                opacity: 0, 
                y: -30,
                transition: { duration: 0.3 }
              }
            }}
            className="flex justify-center gap-2 sm:gap-3"
          >
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setSlideDirection(index > currentSlide ? 1 : -1);
                  setCurrentSlide(index);
                  setIsAutoPlaying(false);
                }}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${
                  index === currentSlide 
                    ? "w-6 sm:w-8 bg-primary" 
                    : "w-1.5 sm:w-2 bg-white/50 hover:bg-white"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
</section>

      {/* Highlighted Infinite Scroll - no text selection while scrolling */}
      <section
        className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 py-8 overflow-hidden border-y border-primary/20 select-none"
        style={{ pointerEvents: infiniteStripPointerEvents }}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" as const }}
          className="flex whitespace-nowrap"
        >
          {[...infiniteScrollItems, ...infiniteScrollItems].map((item, index) => (
            <div key={index} className="inline-flex items-center mx-8">
              <item.icon className="w-5 h-5 text-primary mr-3" />
              <span className="text-foreground font-medium">{item.text}</span>
              <span className="mx-4 text-primary/30">✦</span>
            </div>
          ))}
        </motion.div>
      </section>

{/* Experience Heritage Section */}
<motion.section
  className="bg-[#F6F6F4] py-20 md:py-28 px-4 md:px-8 overflow-hidden"
>
  <div className="container mx-auto">
    {/* Title and Subtitle - Animate from bottom to top */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnceMore}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.25,
            delayChildren: 0.2
          }
        }
      }}
      className="text-center max-w-4xl mx-auto mb-20"
    >
      {/* Subtitle with badge */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1] as const // Smooth cubic-bezier
            }
          }
        }}
        className="flex items-center justify-center gap-3 mb-4"
      >
        <motion.span 
          initial={{ width: 0 }}
          whileInView={{ width: 40 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="h-px bg-[#C9A646]"
        />
        <p className="text-sm uppercase tracking-[0.2em] text-[#C9A646] font-semibold">
          Unforgettable legacy of pursuing justice!
        </p>
        <motion.span 
          initial={{ width: 0 }}
          whileInView={{ width: 40 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="h-px bg-[#C9A646]"
        />
      </motion.div>

      {/* Main Title */}
      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 1.2,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1] as const
            }
          }
        }}
        className="text-3xl md:text-5xl font-serif text-[#1F2A44] leading-snug"
      >
        Our experience is confirmed by
        <br />
        notable excellence, <span className="italic">innovation,</span>
        <br />
        <span className="italic">client service, and teamwork.</span>
      </motion.h2>
    </motion.div>

    {/* Two Columns Layout */}
    <div className="grid lg:grid-cols-2 gap-12 items-start">
      {/* Left Column - Animate from Left */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewportOnceMore}
        transition={{ 
          duration: 1.2,
          delay: 0.4,
          ease: [0.25, 0.1, 0.25, 1] as const
        }}
        className="lg:border-r border-gray-200 lg:pr-12 pb-10 lg:pb-0 mb-10 lg:mb-0"
      >
        {/* Animated Number Counter */}
        <motion.h3 
          className="text-6xl md:text-7xl font-serif text-[#1F2A44] mb-6"
        >
          <CountUpAnimation 
            targetNumber={4} 
            duration={2.5}
            delay={0.8}
          />
          <span className="text-[#C9A646]">+</span>
        </motion.h3>
        
        <h4 className="text-xl font-semibold text-[#1F2A44] mb-3">
          Years of heritage!
        </h4>
        <p className="text-gray-600 leading-relaxed max-w-md">
          Years of experience in legal services and complex areas of law,
          our attorneys strive to achieve optimal outcomes for our clients.
        </p>
      </motion.div>

      {/* Right Column - Cards animate from Right one by one */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnceMore}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3,
              delayChildren: 0.5
            }
          }
        }}
        className="space-y-10"
      >
        {/* Card 1 */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 100 },
            visible: { 
              opacity: 1, 
              x: 0,
              transition: { 
                duration: 1.2,
                ease: [0.25, 0.1, 0.25, 1] as const
              }
            }
          }}
          whileHover={{ x: 10 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex gap-6 border-b border-gray-200 pb-8"
        >
          <div className="text-4xl font-serif text-[#1F2A44]">
            <CountUpAnimation targetNumber={3} duration={2} delay={0.9} />
            <span className="text-[#C9A646]">+</span>
          </div>
          <div>
            <h5 className="text-lg font-semibold text-[#1F2A44] mb-2">
              Offices worldwide!
            </h5>
            <p className="text-gray-600">
              We established our offices with a true commitment to support
              and help all our clients with the same love and experience.
            </p>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 100 },
            visible: { 
              opacity: 1, 
              x: 0,
              transition: { 
                duration: 1.2,
                ease: [0.25, 0.1, 0.25, 1] as const
              }
            }
          }}
          whileHover={{ x: 10 }}
          className="flex gap-6 border-b border-gray-200 pb-8"
        >
          <div className="text-4xl font-serif text-[#1F2A44]">
            <CountUpAnimation targetNumber={165} duration={2.5} delay={1.1} />
            <span className="text-[#C9A646]">+</span>
          </div>
          <div>
            <h5 className="text-lg font-semibold text-[#1F2A44] mb-2">
              Experienced attorneys
            </h5>
            <p className="text-gray-600">
              Our lawyers have advised huge international corporations
              and always won complex disputes in all law fields courts.
            </p>
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 100 },
            visible: { 
              opacity: 1, 
              x: 0,
              transition: { 
                duration: 1.2,
                ease: [0.25, 0.1, 0.25, 1] as const
              }
            }
          }}
          whileHover={{ x: 10 }}
          className="flex gap-6"
        >
          <div className="text-4xl font-serif text-[#1F2A44]">
            <CountUpAnimation targetNumber={98} duration={2} delay={1.3} suffix="%" />
          </div>
          <div>
            <h5 className="text-lg font-semibold text-[#1F2A44] mb-2">
              Success Rate
            </h5>
            <p className="text-gray-600">
              Our proven track record speaks for itself with consistently
              favorable outcomes for our clients across all practice areas.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </div>
</motion.section>

{/* You're In The Right Place */}
<motion.section
  initial="hidden"
  whileInView="visible"
  viewport={viewportOnceMore}
  variants={staggerContainer}
  className="bg-background section-padding relative overflow-hidden"
>
  <div className="container mx-auto relative z-10">
    <motion.div
      variants={staggerContainer}
      className="text-center max-w-3xl mx-auto"
    >
      {/* Subtitle with animated lines */}
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.6,
              ease: "easeOut" as const
            }
          }
        }}
        className="flex items-center justify-center gap-4 mb-6"
      >
        <motion.span 
          initial={{ width: 0 }}
          whileInView={{ width: 48 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
          className="h-px bg-primary"
        />
        <span className="text-primary uppercase tracking-[0.2em] text-sm font-semibold">
          Why Choose Us
        </span>
        <motion.span 
          initial={{ width: 0 }}
          whileInView={{ width: 48 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
          className="h-px bg-primary"
        />
      </motion.div>

      {/* Main Title */}
      <motion.h2 
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.7,
              delay: 0.3,
              ease: "easeOut" as const
            }
          }
        }}
        className="text-4xl md:text-5xl font-heading font-bold mb-8 text-foreground"
      >
        You're in the <span className="gold-gradient-text italic">Right Place</span>
      </motion.h2>

      {/* Description */}
      <motion.p 
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.7,
              delay: 0.4,
              ease: "easeOut" as const
            }
          }
        }}
        className="text-lg text-muted-foreground leading-relaxed mb-12"
      >
        With decades of combined experience and a track record of success, we provide the legal expertise 
        and personal attention you deserve. Your success is our mission.
      </motion.p>

      {/* Stats Cards */}
      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.2
            }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {[
          { number: "100+", label: "Happy Clients", icon: Users },
          { number: "20+", label: "Expert Lawyers", icon: UserCheck },
          { number: "4+", label: "Years Experience", icon: Clock },
          { number: "98%", label: "Success Rate", icon: Target },
        ].map((stat, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.9 },
              visible: { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: { 
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1] as const
                }
              }
            }}
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="p-6 bg-card/50 backdrop-blur-sm rounded-sm border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.3, type: "spring", stiffness: 200 }}
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
            </motion.div>
            <div className="text-2xl font-heading font-bold text-foreground">
              <CountUpAnimation 
                targetNumber={parseInt(stat.number)} 
                duration={1.8}
                delay={0.8 + index * 0.1}
                suffix={stat.number.includes('+') ? '+' : stat.number.includes('%') ? '%' : ''}
              />
            </div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </div>
</motion.section>

{/* Meet Founder */}
<motion.section
  className="bg-white section-padding overflow-hidden"
>
  <div className="container mx-auto">
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnceMore}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
          }
        }
      }}
    >
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Column - Image with Yellow Box */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { 
              opacity: 1, 
              x: 0,
              transition: { 
                duration: 1,
                ease: [0.25, 0.1, 0.25, 1] as const
              }
            }
          }}
          className="relative"
        >
          <div className="relative z-10">
            {/* Main Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
              className="aspect-[3/4] rounded-sm overflow-hidden shadow-2xl transform-gpu will-change-transform"
            >
              <img src={
    primaryFounder?.profileImage
      ? getFounderImageUrl(primaryFounder)
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(primaryFounder?.name || 'Founder')}&background=E5E7EB&color=6B7280&size=128`
  }
  alt={primaryFounder?.name || 'Founder'}
  className="w-full h-full object-cover"
/>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
            </motion.div>
            
            {/* Yellow Quote Box - Animate from Bottom */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8,
                delay: 0.6,
                ease: [0.25, 0.1, 0.25, 1] as const
              }}
              whileHover={{ scale: 1.05 }}
              className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-8 rounded-sm shadow-2xl cursor-pointer transform-gpu will-change-transform"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut" as const
                }}
              >
                <Quote className="w-8 h-8 mb-2" />
              </motion.div>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-sm italic max-w-xs"
              >
                Justice isn't just about winning cases—it's about making a lasting difference in people's lives.
              </motion.p>
              
              {/* Decorative elements */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut" as const
                }}
                className="absolute top-2 right-2 w-12 h-12 bg-white/10 rounded-full blur-sm"
              />
            </motion.div>
            
            {/* Border Decoration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -top-4 -left-4 w-32 h-32 border-4 border-primary/20 rounded-sm"
            />
          </div>
        </motion.div>
        
        {/* Right Column - Content */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 100 },
            visible: { 
              opacity: 1, 
              x: 0,
              transition: { 
                duration: 1,
                ease: [0.25, 0.1, 0.25, 1] as const
              }
            }
          }}
          className="space-y-6"
        >
          {/* Subtitle */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6 }
              }
            }}
            className="flex items-center gap-4 mb-6"
          >
            <motion.span 
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
              className="h-px bg-primary"
            />
            <span className="text-primary uppercase tracking-[0.2em] text-sm font-semibold">
              Meet Our Founder
            </span>
          </motion.div>
          
          {/* Name */}
          <motion.h2 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.7, delay: 0.2 }
              }
            }}
            className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gray-900"
          >
            {primaryFounder?.name}
          </motion.h2>
          
          {/* Title */}
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.7, delay: 0.3 }
              }
            }}
            className="text-xl text-primary mb-6 italic"
          >
            {primaryFounder?.role}
          </motion.p>
          
          {/* Stats with Icons */}
          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.4
                }
              }
            }}
            className="space-y-4 mb-8"
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { duration: 0.6 }
                }
              }}
              whileHover={{ x: 10 }}
              className="flex items-center gap-3"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Award className="w-5 h-5 text-primary" />
              </motion.div>
              <span className="text-gray-700">4+ of legal excellence</span>
            </motion.div>
            
            <motion.div 
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { duration: 0.6 }
                }
              }}
              whileHover={{ x: 10 }}
              className="flex items-center gap-3"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <GraduationCapIcon className="w-5 h-5 text-primary" />
              </motion.div>
              <span className="text-gray-700">{primaryFounder?.details?.education?.[0]}</span>
            </motion.div>
            
            <motion.div 
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { duration: 0.6 }
                }
              }}
              whileHover={{ x: 10 }}
              className="flex items-center gap-3"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Briefcase className="w-5 h-5 text-primary" />
              </motion.div>
              <span className="text-gray-700">Specializes in: {primaryFounder?.details?.practiceAreas?.join(", ")}</span>
            </motion.div>
          </motion.div>
          
          {/* Description - Animate from Bottom */}
          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8,
              delay: 0.8,
              ease: [0.25, 0.1, 0.25, 1] as const
            }}
            className="text-gray-600 leading-relaxed mb-8"
          >
            With over three decades of experience, John Lexington has built a legacy of excellence, 
            integrity, and client success. His vision continues to guide our firm's commitment to 
            providing world-class legal services.
          </motion.p>
          
          {/* Button - Animate from Right */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8,
              delay: 1.0,
              ease: [0.25, 0.1, 0.25, 1] as const
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link 
              href="/about" 
              className="inline-flex items-center gap-3 text-primary font-semibold group text-lg relative overflow-hidden"
            >
              <motion.span
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                Read Full Biography
              </motion.span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut" as const
                }}
              >
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.div>
              
              {/* Button underline animation */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary origin-left"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  </div>
</motion.section>

      {/* Global Attorneys Section */}
<motion.section
  initial="hidden"
  whileInView="visible"
  viewport={viewportOnceMore}
  variants={premiumStagger}
  className="bg-background section-padding relative overflow-hidden"
>
  {/* Background Map */}
  <motion.div
    variants={fadeSoft}
    className="absolute inset-0"
  >
    <img
      src={globalMap}
      alt="World Map"
      className="w-full h-full object-cover opacity-[0.04]"
    />
  </motion.div>

  <div className="container mx-auto relative z-10">

    {/* Heading */}
    <motion.div
      variants={premiumStagger}
      className="text-center mb-16"
    >
      <motion.div
        variants={fadeInUp}
        className="flex items-center justify-center gap-4 mb-4"
      >
        <span className="w-12 h-px bg-primary/60"></span>
        <span className="text-primary uppercase tracking-[0.2em] text-sm font-semibold">
          Global Presence
        </span>
        <span className="w-12 h-px bg-primary/60"></span>
      </motion.div>

      <motion.h2
        variants={fadeInUp}
        className="text-4xl md:text-5xl font-heading font-bold text-foreground"
      >
        Our Attorneys{" "}
        <span className="gold-gradient-text italic">
          Worldwide
        </span>
      </motion.h2>
    </motion.div>

    {/* Cards */}
    <motion.div
      variants={premiumStagger}
      className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5"
    >
      {globalAttorneys.map((item, index) => (
        <motion.div
          key={item.country}
          variants={cardReveal}
          whileHover={{
            y: -6,
            scale: 1.03,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          className="text-center p-6 bg-card/40 backdrop-blur-md border border-border rounded-sm 
          hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 
          transition-all duration-500"
        >
          {/* Flag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.15 }}
            className="text-4xl mb-3"
          >
            {item.flag}
          </motion.div>

          {/* Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            className="text-lg font-heading font-bold text-foreground"
          >
            {item.count}
          </motion.div>

          {/* Country */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.25 }}
            className="text-sm text-muted-foreground"
          >
            {item.country}
          </motion.div>
        </motion.div>
      ))}
    </motion.div>

  </div>
</motion.section>

      {/* Meet Attorneys - Auto Slide Design */}
      <section 
        ref={attorneysRef}
        className="bg-[#F7F7F5] py-20 px-4 md:px-8 overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnceMore}
            variants={staggerContainer}
            className="mb-16"
          >
            <motion.div variants={slideFromLeft} className="flex items-center gap-3 mb-4">
              <span className="w-10 h-px bg-[#C9A646]"></span>
              <p className="text-sm uppercase tracking-[0.2em] text-[#C9A646] font-semibold">
                Meet our dedicated attorneys
              </p>
            </motion.div>
            <motion.h2 variants={slideFromRight} className="text-3xl md:text-5xl font-serif text-[#1F2A44] leading-snug max-w-4xl">
              A leading personal injury team <br />
              with a passion <span className="italic">for helping all our</span> <br />
              <span className="italic">clients to get their lives back.</span>
            </motion.h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnceMore}
              variants={slideFromLeft}
              className="lg:col-span-1 space-y-6"
            >
              <p className="text-gray-600 leading-relaxed">
                Our team of skilled attorneys is dedicated to defending your rights.
                With our associates, partners, paralegals, and other staff members
                offering outstanding representation and compassionate guidance from
                start to finish.
              </p>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.3 }}>
                <Link
                  href="/team"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A646] text-white font-semibold hover:opacity-90 transition"
                >
                  Meet The Attorneys →
                </Link>
              </motion.div>
            </motion.div>

            <div className="lg:col-span-2 overflow-hidden">
              {teamMembers.length === 0 ? null : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentAttorneyIndex}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 80, damping: 25 }} // Slower spring
                  className="grid md:grid-cols-2 gap-6"
                >
                  {[0, 1].map((offset) => {

  if (!teamMembers.length) return null;

  const index = (currentAttorneyIndex + offset) % teamMembers.length;
  const attorney = teamMembers[index];

  if (!attorney) return null;
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ y: -15, scale: 1.02 }} // Reduced scale
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="relative rounded-xl overflow-hidden group"
                      >
                        <div className="relative h-[450px]">
                          <img
  src={getEmployeeImageUrl(attorney)}
  alt={attorney?.name || "Attorney"}
  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
/>
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A44] via-transparent to-transparent opacity-90"></div>
                          
                          <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }} // Slower
                            className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500"
                          >
                            <h3 className="text-xl font-semibold">{attorney.name}</h3>
                            <p className="text-sm text-white/80 mb-2">{attorney.role}</p>
                            <div className="flex items-center gap-4 mb-2">
                              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                                {attorney.experience}+ experience
                              </span>
                              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                                {attorney.specialty}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                                >
                                  <Star
                                    className={`w-4 h-4 ${
                                      i < Math.floor(5)
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-400"
                                    }`}
                                  />
                                </motion.div>
                              ))}
                              <span className="ml-2 text-sm">5/5</span>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
                    )}

              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 1 }} // Slower
                className="flex justify-center gap-2 mt-8"
              >
                {teamMembers.length > 0 && teamMembers.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentAttorneyIndex(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      index === currentAttorneyIndex
                        ? "w-8 bg-[#C9A646]"
                        : "bg-gray-300 hover:bg-[#C9A646]/50"
                    }`}
                  />
                ))}
              </motion.div>
        
            </div>
          </div>
        </div>
      </section>

      {/* About Firm */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnceMore}
        variants={staggerContainer}
        className="bg-background section-padding"
      >
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={slideFromLeft}
              className="relative order-2 lg:order-1"
            >
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                  className="aspect-[4/3] rounded-sm overflow-hidden image-zoom relative"
                >
                  <Image src={aboutMain} alt="Our law firm" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent" />
                </motion.div>
                
                <motion.div 
                  variants={slideFromRight}
                  transition={{ delay: 0.5 }} // Increased delay
                  whileHover={{ scale: 1.05 }}
                  className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-8 rounded-sm shadow-2xl"
                >
                  <div className="text-4xl font-heading font-bold">4+</div>
                  <div className="text-sm uppercase tracking-wider">Years of Excellence</div>
                </motion.div>

                <motion.div
                  variants={slideFromLeft}
                  transition={{ delay: 0.8 }} // Increased delay
                  className="absolute -top-4 -left-4 w-32 h-32 border-2 border-primary/20 rounded-sm"
                />
              </div>
            </motion.div>
            
            <motion.div
              variants={slideFromRight}
              className="order-1 lg:order-2"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-px bg-primary"></span>
                <span className="text-primary uppercase tracking-[0.2em] text-sm font-semibold">
                  About Our Firm
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground">
                A Legacy of <span className="gold-gradient-text italic">Legal Excellence</span>
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                For over three decades, J. Ashish Associates LLP has been at the forefront of legal innovation. 
                Our team of seasoned attorneys combines deep expertise with a client-first approach to deliver 
                results that matter. We've built our reputation on integrity, excellence, and unwavering 
                commitment to our clients' success.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Award Winning", icon: Award },
                  { label: "Expert Team", icon: Users },
                  { label: "Fast Response", icon: Clock },
                  { label: "Proven Results", icon: Shield }
                ].map((item, index) => (
                  <motion.div 
                    key={item.label}
                    variants={index % 2 === 0 ? slideFromLeft : slideFromRight}
                    transition={{ delay: index * 0.2 }} // Increased stagger
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-3"
                  >
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div whileHover={{ x: 15 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="inline-block">
                <Link 
                  href="/about" 
                  className="inline-flex items-center gap-3 text-primary font-semibold hover:gap-4 transition-all duration-500 group text-lg"
                >
                  Discover Our Story 
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Core Values */}
      <motion.section
        className="bg-gradient-to-br from-gray-50 to-white section-padding"
      >
        <motion.div initial="hidden"
        whileInView="visible"
        viewport={viewportOnceMore}
        variants={staggerContainer}>
          <div className="container mx-auto">
          <motion.div
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={slideFromLeft} className="flex items-center justify-center gap-4 mb-4">
              <span className="w-12 h-px bg-primary"></span>
              <span className="text-primary uppercase tracking-[0.2em] text-sm font-semibold">
                Our Foundation
              </span>
              <span className="w-12 h-px bg-primary"></span>
            </motion.div>
            <motion.h2 variants={slideFromRight} className="text-4xl md:text-5xl font-heading font-bold text-gray-900">
              Core <span className="gold-gradient-text italic">Values</span>
            </motion.h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                variants={index % 2 === 0 ? slideFromLeft : slideFromRight}
                transition={{ delay: index * 0.2 }} // Increased stagger
                whileHover={{ y: -15, scale: 1.02 }} // Reduced scale
                className="group relative"
              >
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 h-full">
                  <div className="overflow-hidden min-w-0 w-full">
                    {/* Top bar visible on load so border color always shows (no scaleX animation) */}
                    <div
                      className={`h-1 w-full bg-gradient-to-r ${value.color} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out`}
                    />
                  </div>
                  
                  <div className="p-8">
                    <motion.div 
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const }} // Slower
                      className={`w-16 h-16 ${value.bgLight} rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-500`}
                    >
                      <value.icon className={`w-8 h-8 ${value.iconColor}`} />
                    </motion.div>
                    
                    <h3 className="text-xl font-heading font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors duration-500">
                      {value.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {value.desc}
                    </p>
                    
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.4, duration: 1 }} // Slower
                      className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    >
                      <div className={`w-12 h-12 ${value.bgLight} rounded-full opacity-20`} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        </motion.div>
      </motion.section>

      {/* Practice Areas */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnceMore}
        variants={staggerContainer}
        className="bg-background section-padding relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{ 
              scale: [1, 1.15, 1],
              x: [0, 80, 0],
              y: [0, -80, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" as const }} // Slower
            className="absolute top-0 left-0 w-64 h-64 bg-primary rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, -80, 0],
              y: [0, 80, 0]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" as const }} // Slower
            className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"
          />
        </div>
        
        <div className="container mx-auto relative z-10">
          <motion.div
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={slideFromLeft} className="flex items-center justify-center gap-4 mb-4">
              <span className="w-12 h-px bg-primary"></span>
              <span className="text-primary uppercase tracking-[0.2em] text-sm font-semibold">
                What We Do
              </span>
              <span className="w-12 h-px bg-primary"></span>
            </motion.div>
            <motion.h2 variants={slideFromRight} className="text-4xl md:text-5xl font-heading font-bold text-foreground">
              Our Practice <span className="gold-gradient-text italic">Areas</span>
            </motion.h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceAreas.map((area, i) => (
              <motion.div
                key={area.title}
                variants={i % 2 === 0 ? slideFromLeft : slideFromRight}
                // transition={{ delay: i * 0.15 }}
                // whileHover={{ y: -15, scale: 1.02 }}
                className="group will-change-transform"
              >
                <Link 
                  href="/practice-areas" 
                  className="block relative h-[350px] overflow-hidden will-change-transform"
                >
                  <motion.img 
                    src={area.image} 
                    alt={area.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-700" />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <motion.div 
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.3, duration: 1.2 }} // Slower
                      whileHover={{ rotate: 360 }}
                      className={`absolute top-6 right-6 w-12 h-12 rounded-2xl ${area.gradient} flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500`}
                    >
                      <area.lightIcon className="w-6 h-6 text-white" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-heading font-bold mb-2 text-white">
                      {area.title}
                    </h3>
                    
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.4, duration: 0.8 }} // Slower
                      className="flex gap-4 mb-3"
                    >
                      <span className="text-sm text-primary font-semibold">{area.stats}</span>
                      <span className="text-sm text-gray-300">•</span>
                      <span className="text-sm text-gray-300">{area.experience}</span>
                    </motion.div>
                    
                    <p className="text-gray-200 leading-relaxed mb-4 text-sm">
                      {area.desc}
                    </p>
                    
                    <motion.span 
                      whileHover={{ x: 8 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all duration-500"
                    >
                      Learn More <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </div>
                  
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${area.color} transform origin-left transition-transform duration-700`} 
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Process Timeline */}
      <motion.section
        className="bg-white section-padding"
      >
        <motion.div initial="hidden"
        whileInView="visible"
        viewport={viewportOnceMore}
        variants={staggerContainer}>
          <div className="container mx-auto">
          <motion.div
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={slideFromLeft} className="flex items-center justify-center gap-4 mb-4">
              <span className="w-12 h-px bg-primary"></span>
              <span className="text-primary uppercase tracking-[0.2em] text-sm font-semibold">
                Our Process
              </span>
              <span className="w-12 h-px bg-primary"></span>
            </motion.div>
            <motion.h2 variants={slideFromRight} className="text-4xl md:text-5xl font-heading font-bold text-gray-900">
              How We <span className="gold-gradient-text italic">Work</span>
            </motion.h2>
          </motion.div>
          
          <div className="relative">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }} // Slower
              className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden lg:block origin-left"
            />
            
            <div className="grid lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  variants={index % 2 === 0 ? slideFromLeft : slideFromRight}
                  transition={{ delay: index * 0.2 }} // Increased stagger
                  whileHover={{ y: -8 }}
                  className="relative group"
                >
                  <motion.div 
                    initial={{ scale: 0, x: -50 }}
                    whileInView={{ scale: 1, x: 0 }}
                    transition={{ delay: index * 0.3, duration: 1 }} // Slower
                    className="absolute -top-6 left-1/2 -translate-x-1/2 text-8xl font-bold text-gray-100 group-hover:text-primary/10 transition-colors duration-700"
                  >
                    {step.step}
                  </motion.div>
                  
                  <div className="relative z-10 w-14 h-14 mx-auto mb-8 rounded-full bg-gradient-to-br from-white to-gray-50 border-4 border-white shadow-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <motion.div 
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 1.2 }}
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center`}
                    >
                      <step.icon className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-xl font-heading font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors duration-500">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  
                  {index < processSteps.length - 1 && (
                    <motion.div 
                      animate={{ x: [0, 8, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" as const }} // Slower
                      className="hidden lg:block absolute top-20 -right-4 text-primary/30"
                    >
                      <ArrowRight className="w-6 h-6" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        </motion.div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnceMore}
        variants={staggerContainer}
        className="bg-background section-padding relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image src={courtroom} alt="" fill className="object-cover opacity-5" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <motion.div
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={slideFromLeft} className="flex items-center justify-center gap-4 mb-4">
              <span className="w-12 h-px bg-primary"></span>
              <span className="text-primary uppercase tracking-[0.2em] text-sm font-semibold">
                Why Choose Us
              </span>
              <span className="w-12 h-px bg-primary"></span>
            </motion.div>
            <motion.h2 variants={slideFromRight} className="text-4xl md:text-5xl font-heading font-bold max-w-3xl mx-auto text-foreground">
              Trusted by Thousands of <span className="gold-gradient-text italic">Clients Worldwide</span>
            </motion.h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Proven Track Record", 
                desc: "98% success rate with over 5,000 cases resolved favorably for our clients.",
                icon: "🏆",
                stats: "98% Success Rate"
              },
              { 
                title: "Expert Legal Team", 
                desc: "50+ attorneys with specialized expertise across all major practice areas.",
                icon: "⚖️",
                stats: "50+ Attorneys"
              },
              { 
                title: "Client-First Approach", 
                desc: "Transparent communication and personalized strategies tailored to your needs.",
                icon: "🤝",
                stats: "24/7 Support"
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={i === 0 ? slideFromLeft : i === 2 ? slideFromRight : slideFromLeft}
                transition={{ delay: i * 0.50 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  whileHover={{ y: -15, scale: 1.01 }}
                  // transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="text-center p-8 bg-card/50 backdrop-blur-sm border border-border rounded-sm shadow-xl transition-transform duration-300"
                >
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }} // Slower
                    className="text-5xl mb-4"
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="text-2xl font-heading font-semibold mb-3 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
                  <div className="text-primary font-bold text-sm">{item.stats}</div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Global Ratings / Awards - Premium Design with White Background */}
      <motion.section
        className="bg-white section-padding relative overflow-hidden"
      >
        <motion.div initial="hidden"
        whileInView="visible"
        viewport={viewportOnceMore}
        variants={staggerContainer}>
          <div className="absolute inset-0">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 150, 0],
              y: [0, -150, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" as const }} // Slower
            className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.25, 1],
              x: [0, -150, 0],
              y: [0, 150, 0]
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" as const }} // Slower
            className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          />
        </div>
        
        <div className="container mx-auto relative z-10">
          <motion.div
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={slideFromLeft} className="flex items-center justify-center gap-4 mb-4">
              <span className="w-12 h-px bg-primary"></span>
              <span className="text-primary uppercase tracking-[0.2em] text-sm font-semibold">
                Recognition
              </span>
              <span className="w-12 h-px bg-primary"></span>
            </motion.div>
            <motion.h2 variants={slideFromRight} className="text-4xl md:text-5xl font-heading font-bold text-gray-900">
              Global <span className="gold-gradient-text italic">Ratings & Awards</span>
            </motion.h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {globalRatings.map((item, index) => (
              <motion.div
                key={item.source}
                variants={index % 2 === 0 ? slideFromLeft : slideFromRight}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group relative h-full"
              >
                {/* Hover via CSS only so all rows behave identically (no Framer hover delay on 2nd row) */}
                <div className="h-full will-change-transform transform-gpu transition-transform duration-200 ease-out hover:scale-[1.05] hover:-translate-y-2.5">
                  <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg transform-gpu transition-transform duration-300">
                  {/* Icon - group-hover only; same duration as card for consistent hover */}
                  <div className="relative z-10 mb-4">
                    <div className="w-14 h-14 mx-auto bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center group-hover:rotate-180 transition-transform duration-300">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  
                  <div className="relative z-10 text-center min-h-[4.5rem]">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.source}</h3>
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.3, duration: 0.8 }}
                      className="text-base font-semibold text-primary mb-2"
                    >
                      {item.rating}
                    </motion.div>
                    
                    <div className="flex justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.3 + i * 0.1, duration: 0.5 }}
                        >
                          <Star className="w-4 h-4 fill-primary text-primary" />
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <span className="text-gray-600 font-semibold">{item.rank}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-gray-500">{item.year}</span>
                    </div>
                  </div>
                  
                  <div className="absolute inset-x-0 bottom-0 h-1 overflow-hidden rounded-b-2xl">
                    <div className="h-full w-full bg-gradient-to-r from-transparent via-primary to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </div>
                </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        </motion.div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnceMore}
        variants={staggerContainer}
        className="bg-background section-padding relative overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 80, 0],
              y: [0, -80, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" as const }}
            className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.25, 1],
              x: [0, -80, 0],
              y: [0, 80, 0]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" as const }}
            className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          />
        </motion.div>
        
        <div className="container mx-auto relative z-10">
          <motion.div
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={slideFromLeft} className="flex items-center justify-center gap-4 mb-4">
              <span className="w-12 h-px bg-primary"></span>
              <span className="text-primary uppercase tracking-[0.2em] text-sm font-semibold">
                Testimonials
              </span>
              <span className="w-12 h-px bg-primary"></span>
            </motion.div>
            <motion.h2 variants={slideFromRight} className="text-4xl md:text-5xl font-heading font-bold text-foreground">
              What Our <span className="gold-gradient-text italic">Clients Say</span>
            </motion.h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={i % 2 === 0 ? slideFromLeft : slideFromRight}
                transition={{ delay: i * 0.15 }}
                whileHover={{ scale: 1.03, y: -8 }}
                className="relative"
              >
                <div className="p-6 bg-card border border-border rounded-sm card-hover h-full flex flex-col">
                  <motion.div
                    animate={{ rotate: [0, 3, -3, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
                    className="absolute top-4 right-4 w-8 h-8 text-primary/20"
                  >
                    <Quote className="w-8 h-8" />
                  </motion.div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <img 
                        src={t.image} 
                        alt={t.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic flex-grow">
                    "{t.text}"
                  </p>
                  
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                      >
                        <Star className="w-4 h-4 fill-primary text-primary" />
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="absolute -z-10 inset-0 bg-primary/5 rounded-sm transform rotate-2" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Latest News */}
      <section ref={newsRef} className="bg-white section-padding overflow-hidden">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnceMore}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={slideFromLeft} className="flex items-center justify-center gap-4 mb-4">
              <span className="w-12 h-px bg-primary"></span>
              <span className="text-primary uppercase tracking-[0.2em] text-sm font-semibold">
                Insights
              </span>
              <span className="w-12 h-px bg-primary"></span>
            </motion.div>
            <motion.h2 variants={slideFromRight} className="text-4xl md:text-5xl font-heading font-bold text-gray-900">
              Latest <span className="gold-gradient-text italic">News</span>
            </motion.h2>
          </motion.div>
          
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={newsCurrentIndex}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 80, damping: 25 }}
                className="grid md:grid-cols-3 gap-6"
              >
                {posts.slice(newsCurrentIndex * 3, newsCurrentIndex * 3 + 3).map((post, index) => (
                  <motion.article
                    key={post.title}
                    whileHover={{ y: -15, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="group cursor-pointer h-full flex flex-col"
                  >
                    <div className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col flex-1 min-h-[380px]">
                      <div className="relative h-48 overflow-hidden shrink-0">
                        <motion.img 
                          src={getBlogImageUrl(post)} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.8 }}
                        />
                        <motion.div 
                          initial={{ x: -100 }}
                          whileInView={{ x: 0 }}
                          transition={{ delay: index * 0.3, duration: 1 }}
                          className="absolute top-4 left-4 bg-primary text-white px-3 py-1 text-xs font-semibold rounded-sm"
                        >
                          {post.category}
                        </motion.div>
                      </div>
                      
                      <div className="p-6 flex flex-col flex-1 min-h-0">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3 shrink-0">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(post.date)}</span>
                        </div>
                        
                        <h3 className="text-lg font-heading font-semibold mb-3 text-gray-900 line-clamp-2 group-hover:text-primary transition-colors duration-500">
                          {post.title}
                        </h3>
                        
                        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-1 min-h-0">
                          {post.excerpt}
                        </p>
                        
                        <motion.span 
                          whileHover={{ x: 8 }}
                          transition={{ type: "spring", stiffness: 200, damping: 20 }}
                          className="inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all duration-500 shrink-0"
                        >
                          Read More <ArrowRight className="w-4 h-4" />
                        </motion.span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevNews}
                className="w-12 h-12 border border-primary rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextNews}
                className="w-12 h-12 border border-primary rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
            
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: Math.ceil(latestNews.length / 3) }).map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setNewsCurrentIndex(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    index === newsCurrentIndex ? "w-8 bg-primary" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnceMore}
        variants={staggerContainer}
        className="bg-background section-padding"
      >
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={slideFromLeft}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-px bg-primary"></span>
                <span className="text-primary uppercase tracking-[0.2em] text-sm font-semibold">
                  Get In Touch
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground">
                Ready to <span className="gold-gradient-text italic">Discuss</span> Your Case?
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Schedule a confidential consultation with our experienced attorneys. 
                We're here to provide the legal guidance you need.
              </p>
              
              <div className="space-y-4 mb-8">
                <motion.div 
                  variants={slideFromLeft}
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Call Us Anytime</p>
                    <p className="text-lg font-semibold text-foreground">7373663555</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  variants={slideFromLeft}
                  transition={{ delay: 0.2 }}
                  whileHover={{ x: 8 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email Us</p>
                    <p className="text-lg font-semibold text-foreground">jashishadvocate@gmail.com</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  variants={slideFromLeft}
                  transition={{ delay: 0.4 }}
                  whileHover={{ x: 8 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Visit Our Office</p>
                    <p className="text-lg font-semibold text-foreground">No. 137, Flat No. F-8, <br />
1st Floor, Appu Manor Apartment, <br />
Perambur Barracks Road, <br />
Purasawalkam, Chennai 600 007. <br />
</p>
                  </div>
                </motion.div>
              </div>
              
              <div className="flex gap-4">
                {[Linkedin, Twitter, Github].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ y: -5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              variants={slideFromRight}
            >
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-sm p-8 shadow-2xl">
                {/* <div className="grid md:grid-cols-1 gap-4 mb-4"> */}
                  <motion.div variants={slideFromLeft} className="mb-4">
                    <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="First Name"
                    />
                    {touched.fullName && errors.fullName && (
  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
)}
                  </motion.div>
                
                <motion.div variants={slideFromLeft} transition={{ delay: 0.4 }} className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                  name="email"
  value={formData.email}
  onChange={handleChange}
  onBlur={handleBlur}
                    type="email"
                    className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="[EMAIL_ADDRESS]"
                  />
                  {touched.email && errors.email && (
  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
)}
                </motion.div>
                
                <motion.div variants={slideFromRight} transition={{ delay: 0.6 }} className="mb-4">
  <label className="block text-sm font-medium text-foreground mb-2">Phone</label>

  <div className="flex gap-2">

    {/* Country Code */}
    <select
      name="countryCode"
      value={formData.countryCode}
      onChange={handleChange}
      onBlur={handleBlur}
      className="px-3 py-3 bg-background border border-border rounded-sm focus:outline-none focus:border-primary"
    >
      <option value="+91">🇮🇳 +91</option>
      <option value="+1">🇺🇸 +1</option>
      <option value="+44">🇬🇧 +44</option>
      <option value="+61">🇦🇺 +61</option>
      <option value="+971">🇦🇪 +971</option>
      <option value="+65">🇸🇬 +65</option>
    </select>

    {/* Phone Input */}
    <input
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      onBlur={handleBlur}
      type="tel"
      className="flex-1 px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:border-primary transition-colors"
      placeholder="1234567890"
    />

  </div>

  {touched.phone && errors.phone && (
    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
  )}
</motion.div>
                
                <motion.div variants={slideFromLeft} transition={{ delay: 0.8 }} className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-2">Practice Area</label>
                  <select name="practiceArea" value={formData.practiceArea}
  onChange={handleChange}
  onBlur={handleBlur} className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:border-primary transition-colors">
                    <option>Select a practice area</option>
                    <option>Corporate Law</option>
                    <option>Litigation</option>
                    <option>Family Law</option>
                    <option>Real Estate</option>
                  </select>

{touched.practiceArea && errors.practiceArea && (
  <p className="text-red-500 text-sm mt-1">{errors.practiceArea}</p>
)}
                </motion.div>
                
                <motion.div variants={slideFromRight} transition={{ delay: 1.0 }} className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <textarea
                  name="message"
  value={formData.message}
  onChange={handleChange}
  onBlur={handleBlur}
                    rows={4}
                    className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="Tell us about your case..."
                  />
                  {touched.message && errors.message && (
  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
)}
                </motion.div>
                
                <Button
                  type="submit"
                  size="xl"
                  className="w-full btn-shine"
                >
                  Send Message
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnceMore}
        variants={staggerContainer}
        className="relative py-32 overflow-hidden"
      >
        <div className="absolute inset-0">
          <motion.img 
            src={hero1} 
            alt="Background" 
            className="w-full h-full object-cover"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" as const }}
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
                y: [null, -200],
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 5 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "linear" as const
              }}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
            />
          ))}
        </div>
        
        <div className="container mx-auto relative z-10">
          <motion.div
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              variants={slideFromLeft}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8"
            >
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Limited Time Offer</span>
            </motion.div>
            
            <motion.h2 
              variants={slideFromRight}
              className="text-3xl md:text-5xl font-heading font-bold mb-10 text-white leading-tight"
            >
              Take the First Step Toward
              <motion.span 
                animate={{ 
                  backgroundPosition: ['0%', '100%', '0%']
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" as const }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-[length:200%] italic"
              >
                Justice Today
              </motion.span>
            </motion.h2>
            
            <motion.div 
              variants={slideFromRight}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="relative group"
              >
                <Link
                  href="/contact"
                  className="relative px-8 py-5 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 text-sm md:text-base inline-flex items-center gap-3"
                >
                  <Phone className="w-5 h-5" />
                  Free Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.3 }}>
                <Link
                  href="/about"
                  className="group px-8 py-5 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 text-sm md:text-base inline-flex items-center gap-3"
                >
                  <Shield className="w-5 h-5" />
                  Learn More About Us
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              variants={slideFromLeft}
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
                  whileHover={{ y: -5, scale: 1.03 }}
                  transition={{ duration: 0.3 }}
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
          className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent"
        />
        <motion.div 
          animate={{ rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" as const }}
          className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-white/20"
        />
        <motion.div 
          animate={{ rotate: [360, 270, 180, 90, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" as const }}
          className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-white/20"
        />
      </motion.section>
    </div>
  );
};

export default Index;