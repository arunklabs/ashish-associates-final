"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";

const SCROLL_ISOLATION_MS = 250;

const Footer = () => {
  const [stripPointerEvents, setStripPointerEvents] = useState<"auto" | "none">("auto");
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onWheel = () => {
      setStripPointerEvents("none");
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setStripPointerEvents("auto");
        scrollTimeoutRef.current = null;
      }, SCROLL_ISOLATION_MS);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);
  // Animation variants
  const cubicBezier = [0.25, 0.1, 0.25, 1] as const;

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.9, ease: cubicBezier } 
    }
  };

  const fadeInDown = {
    hidden: { opacity: 0, y: -40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.9, ease: cubicBezier } 
    }
  };

  const slideFromLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 1, ease: cubicBezier } 
    }
  };

  const slideFromRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 1, ease: cubicBezier } 
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.8, ease: cubicBezier } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        ease: cubicBezier
      }
    }
  };

  // Practice areas links from the provided data
  const practiceAreaLinks = [
    { id: 1, label: "Corporate Law", path: "/practice-areas/corporate-law" },
    { id: 2, label: "Criminal Law", path: "/practice-areas/criminal-law" },
      { id: 3, label: "Civil Law", path: "/practice-areas/civil-law" },
      { id: 4, label: "Family Law", path: "/practice-areas/family-law" },
      { id: 5, label: "Property Law", path: "/practice-areas/property-law" },
      { id: 6, label: "Arbitration", path: "/practice-areas/arbitration" },
      { id: 7, label: "Intellectual Property", path: "/practice-areas/intellectual-property" },
      { id: 8, label: "Tax Law", path: "/practice-areas/tax-law" },
      { id: 9, label: "Contract & Agreement Reviewing", path: "/practice-areas/contract-and-agreement-reviewing" },
      { id: 10, label: "Insurance", path: "/practice-areas/insurance-law" },
      { id: 11, label: "Labour & Employment", path: "/practice-areas/labour-employment-law" },
      { id: 12, label: "Insolvancy & Bankruptcy", path: "/practice-areas/insolvency-bankruptcy-law" },
  ];

  // Social media links
  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook", color: "#1877F2" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter", color: "#1DA1F2" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", color: "#0A66C2" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram", color: "#E4405F" }
  ];

  // Chennai contact details
  const contactDetails = {
    address: "No. 137, Flat No. F-8, 1st Floor, Appu Manor Apartment, Perambur Barracks Road, Purasawalkam, Chennai 600 007.",
    phone: "887 887 3555",
    email: "jashishadvocate@gmail.com",
    hours: "Mon – Fri: 9:00 AM – 7:00 PM",
    emergency: "887 887 3555"
  };

  // Better infinite scroll text - legal phrases in English and Tamil mix
const infiniteText = [
  "JUSTICE FOR ALL • ",
  "EXCELLENCE IN LAW • ",
  "TRUSTED ADVISORS • ",
  "SINCE 2026 • ",
  "DEFENDING YOUR RIGHTS • ",
  "STRATEGIC LEGAL SOLUTIONS • ",
];

  // Duplicate array multiple times for seamless loop
  const scrollText = Array(10).fill(infiniteText).flat();

  return (
    <footer className="bg-card border-t border-border px-4 md:px-0 relative overflow-hidden select-none">
      {/* Main Footer Content */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideFromLeft}
          >
            <Link href="/" className="flex items-center lg:ml-0 flex-1 pb-4 lg:flex-none justify-start group">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                src="/assets/logo.jpeg"
                alt="J. Ashish Associates LLP" 
                className="h-16 md:h-20 w-auto object-contain" 
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Where Expertise Meets Insight to Guide Every Legal Journey
            </p>
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ 
                    y: -5,
                    backgroundColor: social.color,
                    scale: 1.1,
                    transition: { duration: 0.3 }
                  }}
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary text-white group relative overflow-hidden"
                  aria-label={social.label}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <social.icon className="w-4 h-4 group-hover:text-white transition-colors duration-300" />
                  </motion.div>
                  
                  {/* Tooltip */}
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded whitespace-nowrap z-10"
                  >
                    {social.label}
                  </motion.span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <h4 className="text-sm font-semibold uppercase tracking-widest text-primary mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", path: "/about" },
                { label: "Our Attorneys", path: "/team" },
                { label: "Client Reviews", path: "/reviews" },
                { label: "Help & FAQs", path: "/faq" },
                { label: "Our Gallery", path: "/gallery" },
                { label: "Careers", path: "/careers" },
                { label: "Contact", path: "/contact" },
              ].map((l, index) => (
                <motion.li 
                  key={l.path}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link 
                    href={l.path} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{l.label}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Practice Areas - Using provided links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <h4 className="text-sm font-semibold uppercase tracking-widest text-primary mb-6">Practice Areas</h4>
            <ul className="space-y-3">
              {practiceAreaLinks.map((area, index) => (
                <motion.li 
                  key={area.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link 
                    href={area.path} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{area.label}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact - Chennai Details */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideFromRight}
          >
            <h4 className="text-sm font-semibold uppercase tracking-widest text-primary mb-6">Head Office</h4>
            <ul className="space-y-4">
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 text-sm text-muted-foreground group"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-500">
                  <MapPin className="w-4 h-4 text-primary group-hover:text-white transition-colors duration-500" />
                </div>
                <span className="text-sm text-muted-foreground whitespace-pre-line">{contactDetails.address}</span>
              </motion.li>
              
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-sm text-muted-foreground group"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-500">
                  <Phone className="w-4 h-4 text-primary group-hover:text-white transition-colors duration-500" />
                </div>
                <div className="flex flex-col">
                  <a href={`tel:${contactDetails.phone}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {contactDetails.phone}
                  </a>
                  <span className="text-xs text-muted-foreground/70">Emergency: {contactDetails.emergency}</span>
                </div>
              </motion.li>
              
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-sm text-muted-foreground group"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-500">
                  <Mail className="w-4 h-4 text-primary group-hover:text-white transition-colors duration-500" />
                </div>
                <a href={`mailto:${contactDetails.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {contactDetails.email}
                </a>
              </motion.li>

              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-sm text-muted-foreground group"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-500">
                  <Clock className="w-4 h-4 text-primary group-hover:text-white transition-colors duration-500" />
                </div>
                <span className="text-sm text-muted-foreground">{contactDetails.hours}</span>
              </motion.li>
            </ul>

            {/* Newsletter Signup */}
            {/* <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <p className="text-xs text-muted-foreground mb-2">Subscribe to our newsletter</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors select-text"
                />
                <Button size="default" className="whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
            </motion.div> */}
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="border-t border-border mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} J. Ashish Associates LLP. All rights reserved. | Chennai, India
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link 
            href="/privacy-policy"
             className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link 
            href="/legal-disclaimer"
             className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Legal Disclaimer
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Infinite Scroll Section - no text selection while scrolling */}
      <div
        className="w-full overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 py-4 border-y border-primary/20 select-none"
        style={{ pointerEvents: stripPointerEvents }}
      >
        <motion.div 
          className="whitespace-nowrap inline-block"
          animate={{ 
            x: [0, -2000]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 50,
              ease: "linear",
            }
          }}
        >
          {scrollText.map((text, index) => (
            <span 
              key={index} 
              className="inline-block text-lg md:text-xl xl:text-2xl font-heading font-semibold mx-6"
              style={{ 
                color: index % 2 === 0 ? '#C9A646' : '#ffffff',
                textShadow: index % 2 === 0 ? '0 0 15px rgba(201, 166, 70, 0.4)' : '0 0 15px rgba(255, 255, 255, 0.2)',
                letterSpacing: '0.5px'
              }}
            >
              {text}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="h-1 bg-gradient-to-r from-primary via-[#0F172A] to-primary" />
    </footer>
  );
};

export default Footer;