"use client";

// Header.tsx
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, Facebook, Linkedin, Twitter, ChevronRight, ChevronDown } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { 
    label: "Home", 
    path: "/" 
  },
  { 
    label: "Pages", 
    path: "/about",
    hasSubmenu: true,
    submenu: [
      { label: "About", path: "/about" },
      { label: "Client Reviews", path: "/reviews" },
      { label: "Help & FAQs", path: "/faq" },
      { label: "Free Consultation", path: "/consultation" },
      { label: "Our Gallery", path: "/gallery" },
      // { label: "Contact Us", path: "/contact" },
      // { label: "Careers", path: "/careers" }
    ]
  },
  { 
    label: "Practice Areas", 
    path: "/practice-areas",
    hasSubmenu: true,
    submenu: [
      { label: "Corporate Law", path: "/practice-areas/corporate-law" },
      { label: "Criminal Law", path: "/practice-areas/criminal-law" },
      { label: "Civil Law", path: "/practice-areas/civil-law" },
      { label: "Family Law", path: "/practice-areas/family-law" },
      { label: "Property Law", path: "/practice-areas/property-law" },
      { label: "Arbitration", path: "/practice-areas/arbitration" },
      { label: "Intellectual Property", path: "/practice-areas/intellectual-property" },
      { label: "Tax Law", path: "/practice-areas/tax-law" },
      { label: "Contract & Agreement Reviewing", path: "/practice-areas/contract-and-agreement-reviewing" },
    ]
  },
  { label: "Attorneys", path: "/team" },
  { label: "Blogs", path: "/blog" },
  { label: "Careers", path: "/careers" },
  { label: "Contact Us", path: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [mobileOpenSubmenus, setMobileOpenSubmenus] = useState<Record<string, boolean>>({});
  
  // Refs for dropdown menus
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
    setActiveSubmenu(null);
    setMobileOpenSubmenus({});
  }, [pathname ]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Function to check if a path is active (including submenu items)
  const isPathActive = (path: string): boolean => {
    return pathname === path;
  };

  const isSubmenuItemActive = (submenu: { path: string }[] | undefined): boolean => {
  if (!submenu) return false;
  return submenu.some(item => pathname === item.path);
};

  // Handle mobile submenu toggle
  const toggleMobileSubmenu = (path: string) => {
    setMobileOpenSubmenus(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  // Handle mouse enter for desktop submenu
  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveSubmenu(label);
  };

  // Handle mouse leave for desktop submenu with delay
  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 200); // Small delay to allow moving cursor to submenu
  };

  // Handle mouse enter on submenu to keep it open
  const handleSubmenuMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveSubmenu(label);
  };

  // Animation variants for mobile menu
  const menuVariants = {
    closed: {
      x: "-100%",
      opacity: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const linkVariants = {
    closed: { x: -50, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring" as const,
        stiffness: 300,
        damping: 25,
      },
    }),
  };

  const socialVariants = {
    closed: { y: 20, opacity: 0 },
    open: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.8,
        type: "spring" as const,
        stiffness: 300,
        damping: 25,
      },
    },
  };

  // Submenu animation variants
  const submenuVariants = {
    hidden: { 
      opacity: 0, 
      y: -10,
      transition: {
        duration: 0.2
      }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    }
  };

  const submenuItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    }
  };

  // Animation variants for top bar items
  const topBarLeftVariants = {
    hidden: { x: -80, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  const topBarRightVariants = {
    hidden: { x: 80, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <>
      {/* ================= TOP BAR ================= */}
      <motion.div 
        initial="hidden"
        animate="visible"
        className="hidden md:block fixed top-0 left-0 w-full z-50 bg-[#0F172A] text-white text-sm"
      >
        <div className="container py-2 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
          {/* Left - Contact page link with animation */}
          <motion.div 
            variants={topBarLeftVariants}
            className="flex items-center gap-2 flex-wrap justify-center md:justify-start"
          >
            <p>Lord is my Shepherd!</p>
              {/* <Link 
                href="/contact" 
                className="flex items-center gap-2 hover:text-[#C9A646] transition-colors duration-300 group"
              >
                <span className="text-[#C9A646] font-medium">Contact →</span>
              </Link> */}
          </motion.div>

          {/* Right - Contact details with animation */}
          <motion.div 
            variants={topBarRightVariants}
            className="flex items-center gap-4 flex-wrap justify-center md:justify-end"
          >
            {/* <a href="mailto:jashishadvocate@gmail.com" className="flex items-center gap-2 hover:text-[#C9A646] transition-colors duration-300">
              <Mail className="w-4 h-4" />
              jashishadvocate@gmail.com
            </a>
            <a href="tel:+1234567890" className="md:hidden lg:flex items-center gap-2 hover:text-[#C9A646] transition-colors duration-300">
              <Phone className="w-4 h-4" />
              7373663555
            </a> */}
            <div className="flex items-center gap-4 ml-2">
              <FaWhatsapp className="w-4 h-4 cursor-pointer hover:text-[#C9A646] transition-colors duration-300" />
              <MdOutlineMail className="w-4 h-4 cursor-pointer hover:text-[#C9A646] transition-colors duration-300" />
              <FaInstagram className="w-4 h-4 cursor-pointer hover:text-[#C9A646] transition-colors duration-300" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ================= MAIN HEADER ================= */}
      <header
        className={`fixed top-0 md:top-[36px] left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-white shadow-md border-b border-gray-200"
            : "bg-white md:bg-white/20 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-[#1E293B] p-2 z-50 relative"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-8 h-8 text-[#C9A646]" />
              ) : (
                <Menu className="w-8 h-8" />
              )}
            </button>

            {/* LOGO */}
            <Link href="/" className="flex items-center lg:ml-0 flex-1 lg:flex-none justify-center relative h-[5rem] w-[180px]">
              <Image src="/assets/logo.png" alt="J. Ashish Associates LLP" fill className="object-contain object-center" priority sizes="180px" />
            </Link>

            {/* Empty div for spacing */}
            <div className="w-10 lg:hidden"></div>

            {/* Desktop Nav with Submenus - FIXED HOVER BEHAVIOR */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = isPathActive(link.path);
                const isSubmenuActive = link.hasSubmenu ? isSubmenuItemActive(link.submenu) : false;
                const shouldHighlight = isActive || isSubmenuActive;
                
                if (link.hasSubmenu) {
                  return (
                    <div
                      key={link.path}
                      className="relative"
                      ref={(el) => {
                        menuRefs.current[link.label] = el;
                      }}
                      onMouseEnter={() => handleMouseEnter(link.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* Menu Button */}
                      <button
                        className={`flex items-center gap-1 relative text-sm font-semibold transition-colors duration-300 py-2 ${
                          shouldHighlight ? "text-[#C9A646]" : scrolled ? "text-[#1E293B]" : "text-white"
                        } group`}
                      >
                        {link.label}
                        <ChevronDown className={`w-4 h-4 transition-all duration-500 ${
                          activeSubmenu === link.label ? 'rotate-180' : ''
                        } ${shouldHighlight ? "text-[#C9A646]" : scrolled ? "text-[#1E293B]" : "text-white"}`} />
                        
                        {/* Active indicator line - only shows when active, not on hover */}
                        {shouldHighlight && (
                          <span className="absolute left-0 -bottom-1 h-[1.5px] bg-[#C9A646] w-full"></span>
                        )}
                      </button>

                      {/* Submenu Dropdown - FIXED: Stays open when hovering */}
                      <AnimatePresence>
                        {activeSubmenu === link.label && (
                          <motion.div
                            variants={submenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="absolute top-full left-0 mt-2 w-64 bg-white shadow-xl border-t-2 border-[#C9A646] rounded-b-lg overflow-hidden z-50"
                            onMouseEnter={() => handleSubmenuMouseEnter(link.label)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <div className="py-2">
                              {link.submenu?.map((subItem) => {
                                const isSubItemActive = isPathActive(subItem.path);
                                return (
                                  <motion.div
                                    key={subItem.path}
                                    variants={submenuItemVariants}
                                  >
                                    <Link
                                      href={subItem.path}
                                      className={`block px-4 py-2.5 text-sm transition-all duration-500 ${
                                        isSubItemActive
                                          ? "text-[#C9A646] bg-[#C9A646]/10 font-medium"
                                          : "text-[#1E293B] hover:bg-[#C9A646]/10 hover:text-[#C9A646] hover:pl-6"
                                      }`}
                                    >
                                      {subItem.label}
                                    </Link>
                                  </motion.div>
                                );
                              })}
                            </div>
                            {/* Decorative bottom border */}
                            <div className="h-1 bg-gradient-to-r from-[#C9A646] via-[#0F172A] to-[#C9A646]" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`relative text-base font-semibold group transition-colors duration-300 py-2 ${
                      isActive ? "text-[#C9A646]" : scrolled ? "text-[#1E293B]" : "text-white"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute left-0 bottom-1 h-[1.5px] bg-[#C9A646] transition-all duration-500 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                );
              })}
            </nav>

            {/* CTA */}
            <div className="hidden xl:flex items-center">
              <Link
                href="/contact"
                className={`px-6 py-2.5 border font-semibold rounded-sm transition-all duration-500 ${
                  scrolled 
                    ? "border-[#C9A646] text-[#1E293B] hover:bg-[#C9A646] hover:text-white" 
                    : "border-white text-white hover:bg-white hover:text-[#1E293B]"
                }`}
              >
                Free Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* MOBILE MENU with Submenus - Slide from Left */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black lg:hidden"
                style={{ zIndex: 45 }}
                onClick={() => setIsOpen(false)}
              />

              {/* Menu Panel */}
              <motion.div
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="fixed top-0 left-0 h-full w-[85%] max-w-[400px] bg-white shadow-2xl lg:hidden overflow-y-auto"
                style={{ 
                  zIndex: 46,
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  height: '100vh',
                  overflowY: 'auto',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {/* Menu Header */}
                <div className="bg-[#0F172A] p-6 border-b-4 border-[#C9A646]">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative h-20 w-[180px] mx-auto mb-3">
                      <Image src="/assets/logo.jpeg" alt="J. Ashish Associates LLP" fill className="object-contain" sizes="180px" />
                    </div>
                    <p className="text-[#C9A646] text-xs tracking-widest font-semibold">
                      — SINCE 2026 —
                    </p>
                    <h2 className="text-white text-xl font-bold mt-2">J. Ashish Associates LLP</h2>
                    <p className="text-white/80 text-sm italic mt-1">
                      You been fera been trowvera?
                    </p>
                  </div>
                </div>

                {/* Mobile Navigation with Expandable Submenus */}
                <nav className="py-6 px-4">
                  {navLinks.map((link, index) => {
                    const isActive = isPathActive(link.path);
                    const isSubmenuActive = link.hasSubmenu ? isSubmenuItemActive(link.submenu) : false;
                    const shouldHighlight = isActive || isSubmenuActive;
                    const isSubmenuOpen = mobileOpenSubmenus[link.path] || false;

                    if (link.hasSubmenu) {
                      return (
                        <motion.div
                          key={link.path}
                          custom={index}
                          variants={linkVariants}
                          initial="closed"
                          animate="open"
                          exit="closed"
                          className="mb-1"
                        >
                          <button
                            onClick={() => toggleMobileSubmenu(link.path)}
                            className={`w-full flex items-center justify-between py-3 px-4 border-b border-gray-100 transition-all duration-500 ${
                              shouldHighlight
                                ? "text-[#C9A646] bg-[#C9A646]/5"
                                : "text-[#1E293B] hover:text-[#C9A646]"
                            }`}
                          >
                            <span className="text-sm font-semibold tracking-wide">
                              {link.label}
                            </span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-500 ${
                              isSubmenuOpen ? 'rotate-180' : ''
                            } ${shouldHighlight ? 'text-[#C9A646]' : ''}`} />
                          </button>

                          {/* Mobile Submenu */}
                          <AnimatePresence>
                            {isSubmenuOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="overflow-hidden bg-gray-50"
                              >
                                <div className="py-2 pl-6">
                                  {link.submenu?.map((subItem) => {
                                    const isSubItemActive = isPathActive(subItem.path);
                                    return (
                                      <Link
                                        key={subItem.path}
                                        href={subItem.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`block py-2.5 px-4 text-sm transition-all duration-500 border-l-2 ${
                                          isSubItemActive
                                            ? "text-[#C9A646] border-[#C9A646] bg-[#C9A646]/5 font-medium"
                                            : "text-[#1E293B] hover:text-[#C9A646] hover:pl-6 border-transparent hover:border-[#C9A646]"
                                        }`}
                                      >
                                        {subItem.label}
                                      </Link>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    }

                    return (
                      <motion.div
                        key={link.path}
                        custom={index}
                        variants={linkVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                      >
                        <Link
                          href={link.path}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center justify-between py-3 px-4 border-b border-gray-100 transition-all duration-500 ${
                            isActive
                              ? "text-[#C9A646] bg-[#C9A646]/5"
                              : "text-[#1E293B] hover:text-[#C9A646] hover:pl-6"
                          }`}
                        >
                          <span className="text-sm font-semibold tracking-wide">
                            {link.label}
                          </span>
                          <ChevronRight className={`w-4 h-4 transition-all duration-500 ${
                            isActive ? "text-[#C9A646]" : "opacity-0 group-hover:opacity-100"
                          }`} />
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Contact Info */}
                <motion.div
                  variants={socialVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="px-4 py-6 bg-gray-50 border-t border-gray-200"
                >
                  <div className="space-y-4">
                    <p className="text-center text-[#C9A646] text-xs tracking-widest font-semibold mb-3">
                      — CONTACT —
                    </p>
                    
                    <a href="tel:+1234567890" className="flex items-center gap-3 text-sm text-[#1E293B] hover:text-[#C9A646] transition-all duration-500 group">
                      <div className="w-8 h-8 bg-[#C9A646]/10 rounded-full flex items-center justify-center group-hover:bg-[#C9A646] group-hover:text-white transition-all duration-500">
                        <Phone className="w-4 h-4" />
                      </div>
                      <span>7373663555</span>
                    </a>

                    <a href="mailto:jashishadvocate@gmail.com" className="flex items-center gap-3 text-sm text-[#1E293B] hover:text-[#C9A646] transition-all duration-500 group">
                      <div className="w-8 h-8 bg-[#C9A646]/10 rounded-full flex items-center justify-center group-hover:bg-[#C9A646] group-hover:text-white transition-all duration-500">
                        <Mail className="w-4 h-4" />
                      </div>
                      <span>jashishadvocate@gmail.com</span>
                    </a>

                    {/* Social Icons */}
                    <div className="flex items-center justify-center gap-4 pt-4">
                      <a href="#" className="w-10 h-10 bg-[#0F172A] rounded-full flex items-center justify-center text-white hover:bg-[#C9A646] transition-all duration-500 hover:scale-110">
                        <Facebook className="w-4 h-4" />
                      </a>
                      <a href="#" className="w-10 h-10 bg-[#0F172A] rounded-full flex items-center justify-center text-white hover:bg-[#C9A646] transition-all duration-500 hover:scale-110">
                        <Twitter className="w-4 h-4" />
                      </a>
                      <a href="#" className="w-10 h-10 bg-[#0F172A] rounded-full flex items-center justify-center text-white hover:bg-[#C9A646] transition-all duration-500 hover:scale-110">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  variants={socialVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="px-4 pb-8"
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="block w-full py-4 bg-[#C9A646] text-white text-center font-semibold rounded-sm hover:bg-[#0F172A] transition-all duration-500 transform hover:scale-105"
                  >
                    FREE CONSULTATION
                  </Link>
                </motion.div>

                {/* Bottom Decoration */}
                <div className="h-2 bg-gradient-to-r from-[#C9A646] via-[#0F172A] to-[#C9A646]" />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-[80px] md:h-[117.7px]"></div>
    </>
  );
};

export default Header;