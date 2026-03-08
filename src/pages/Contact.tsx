"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Linkedin, Instagram, Send, ChevronRight, ArrowRight } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const contactImage = "/assets/contact-image-1.png";

const Contact = () => {
  const [form, setForm] = useState({ countryCode: "+91", name: "", email: "", phone: "", subject: "", message: "" });

  const [errors, setErrors] = useState({
  countryCode: "+91",
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: ""
});


const validateForm = () => {
  let newErrors = {
    countryCode: "+91",
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  };

  let isValid = true;

// Name
const nameRegex = /^[A-Za-z\s]+$/;

if (!form.name.trim()) {
  newErrors.name = "Full name is required";
  isValid = false;
} 
else if (!nameRegex.test(form.name)) {
  newErrors.name = "Name should contain only letters";
  isValid = false;
}

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email.trim()) {
    newErrors.email = "Email is required";
    isValid = false;
  } else if (!emailRegex.test(form.email)) {
    newErrors.email = "Enter a valid email";
    isValid = false;
  }

  // Phone (Indian format)
  const phoneRegex = /^\d+$/;
  if (form.phone && !phoneRegex.test(form.phone)) {
    newErrors.phone = "Only numbers are allowed";
    isValid = false;
  }

  // Subject
  if (!form.subject) {
    newErrors.subject = "Please select subject";
    isValid = false;
  }

  // Message
  if (!form.message.trim()) {
    newErrors.message = "Message is required";
    isValid = false;
  } else if (form.message.length < 10) {
    newErrors.message = "Message must be at least 10 characters";
    isValid = false;
  }

  setErrors(newErrors);
  return isValid;
};

const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) return;

  setLoading(true);

  const data = {
    name: form.name,
    email: form.email,
    phone: form.countryCode.replace("+","") + "-" + form.phone,
    subject: form.subject,
    message: form.message
  };

  try {
    const res = await fetch(
  "https://script.google.com/macros/s/AKfycby8EzZj72zhNvhZHtjP3Y1uWkwKdeNcw-fQA1yA6NGHLt0-ZZTMvsdFjbLWjk3RrhEocQ/exec",
  {
    method: "POST",
    body: JSON.stringify(data),
    mode: "no-cors"
  }
);

    alert("Thank you for your message. We will contact you shortly."); 

    
    setForm({
      countryCode: "+91",
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });

    setErrors({
      countryCode: "+91",
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });

  } catch (error) {

    console.error(error);
    alert("Something went wrong. Please try again.");

  } finally {

    setLoading(false);

  }
};

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
        staggerChildren: 0.15,
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
      y: -8,
      boxShadow: '0 30px 60px -15px rgba(0,0,0,0.2)',
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

  const iconHover = {
    rest: { 
      rotate: 0,
      scale: 1
    },
    hover: { 
      rotate: 360,
      scale: 1.1,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }
    }
  };

  // Chennai location details
  const chennaiLocations = [
  {
    name: "Main Office - Anna Salai",
    address: "No. 137, Flat No. F-8, 1st Floor, Appu Manor Apartment, Perambur Barracks Road, Purasawalkam, Chennai 600 007",
    phone: "7373663555",
    email: "jashishadvocate@gmail.com",
    hours: "Mon – Fri: 9:00 AM – 7:00 PM",
    map: "Anna Salai, Chennai",
    mapEmbed: "https://www.google.com/maps?q=Purasawalkam,Chennai&output=embed"
  },
  {
    name: "Bangalore Office",
    address: "No. 24, 2nd Floor, Brigade Road, Ashok Nagar, Bengaluru, Karnataka 560025",
    phone: "7373663555",
    email: "jashishadvocate@gmail.com",
    hours: "Mon – Fri: 9:30 AM – 6:30 PM",
    map: "Brigade Road, Bangalore",
    mapEmbed: "https://www.google.com/maps?q=Brigade+Road,Bangalore&output=embed"
  },
  {
    name: "Mumbai Office",
    address: "Unit 402, 4th Floor, The Capital Building, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051",
    phone: "7373663555",
    email: "jashishadvocate@gmail.com",
    hours: "Mon – Fri: 10:00 AM – 7:00 PM",
    map: "Bandra Kurla Complex, Mumbai",
    mapEmbed: "https://www.google.com/maps?q=Bandra+Kurla+Complex,Mumbai&output=embed"
  }
];

const [activeLocation, setActiveLocation] = useState(chennaiLocations[0]);
  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook", color: "#1877F2" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter", color: "#1DA1F2" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", color: "#0A66C2" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram", color: "#E4405F" }
  ];

  return (
    <div className="-mt-20">
      {/* Banner Section - Dark Theme with Background Image */}
      <section 
        className="relative w-full bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: "url('" + contactImage + "')",
        }}
      >
        {/* Dark Overlay with animated gradient */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-gradient-to-br from-background/70 via-background/60 to-background/70"
        />
        
        {/* Animated Pattern Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute inset-0 pattern-gold"
        />
        
        {/* Floating particles animation */}
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
        <div className="relative z-10 container mx-auto px-4 py-32 md:py-40 lg:py-48">
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
                Contact Us
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
              Schedule a{" "}
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
                className="text-primary italic inline-block"
              >
                Consultation
              </motion.span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto"
            >
              Take the first step toward resolving your legal matter. Our Chennai-based team is ready to help with expert guidance and personalized attention.
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

      {/* Chennai Locations Section - White Theme */}
      <motion.section 
        className="section-padding bg-white"
      >
        <motion.div initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer} className="container mx-auto">
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
                transition={{ delay: 0.4, duration: 1.2 }}
                className="h-px bg-primary"
              />
              <motion.p 
                variants={slideFromLeft}
                className="text-sm uppercase tracking-[0.2em] text-primary font-semibold"
              >
                Our Offices
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
              <span className="text-primary">Our</span> Nationwide Presence
            </motion.h2>
            
            <motion.p 
              variants={fadeInUp}
              className="text-muted-foreground text-lg"
            >
              Visit us at our conveniently located offices across Chennai
            </motion.p>
          </motion.div>

          {/* Location Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {chennaiLocations.map((location, index) => (
              <motion.div
                key={location.name}
                variants={scaleIn}
                transition={{ delay: index * 0.2 }}
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="bg-white border border-gray-200 rounded-lg overflow-hidden group"
              >
                <motion.div 
                  variants={cardHover}
                  className="p-8"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div 
                      variants={iconHover}
                      whileHover="hover"
                      className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors duration-500"
                    >
                      <MapPin className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-500" />
                    </motion.div>
                    <h3 className="text-xl font-heading font-semibold text-black group-hover:text-primary transition-colors duration-500">
                      {location.name}
                    </h3>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="space-y-4 ml-15"
                  >
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-3"
                    >
                      <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground text-sm whitespace-pre-line">{location.address}</p>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3"
                    >
                      <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                      <a href={`tel:${location.phone}`} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                        {location.phone}
                      </a>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3"
                    >
                      <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                      <a href={`mailto:${location.email}`} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                        {location.email}
                      </a>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3"
                    >
                      <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                      <p className="text-muted-foreground text-sm">{location.hours}</p>
                    </motion.div>
                  </motion.div>

                  <Button variant="outline" size="lg" className="mt-6 w-full border-primary text-white bg-primary hover:text-white">
                    <span>Get Directions</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>

                  {/* Animated underline */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    className="h-0.5 bg-primary mt-4 origin-left"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Contact Form Section - Light Theme */}
      <motion.section 
        className="section-padding bg-gray-50"
      >
        <motion.div className="container mx-auto" initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}>
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
                transition={{ delay: 0.4, duration: 1.2 }}
                className="h-px bg-primary"
              />
              <motion.p 
                variants={slideFromLeft}
                className="text-sm uppercase tracking-[0.2em] text-primary font-semibold"
              >
                Get In Touch
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
              Request a Free <span className="text-primary italic">Consultation</span>
            </motion.h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={scaleIn}>
                <h3 className="text-xl font-heading font-semibold text-black mb-6">Quick Contact</h3>
                <div className="space-y-6">
                  {[
                    { icon: Phone, label: "Call Us", value: "7373663555", href: "tel:+914423456789" },
                    { icon: Mail, label: "Email Us", value: "jashishadvocate@gmail.com", href: "mailto:jashishadvocate@gmail.com" },
                    { icon: Clock, label: "Office Hours", value: "Mon – Fri: 9:00 AM – 7:00 PM" },
                  ].map((item, idx) => (
                    <motion.div 
                      key={item.label} 
                      variants={slideFromLeft}
                      whileHover={{ x: 5 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-4 group"
                    >
                      <motion.div 
                        whileHover={iconHover.hover}
                        className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-500"
                      >
                        <item.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-500" />
                      </motion.div>
                      <div>
                        <p className="text-sm font-semibold text-black mb-1">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-muted-foreground">{item.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Social Media Links */}
              <motion.div variants={scaleIn}>
                <h3 className="text-xl font-heading font-semibold text-black mb-6">Connect With Us</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ 
                        y: -5,
                        backgroundColor: social.color,
                        scale: 1.1,
                        transition: { duration: 0.3 }
                      }}
                      className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group relative overflow-hidden"
                      aria-label={social.label}
                    >
                      <motion.div
                        initial={{ rotate: 0 }}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <social.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" />
                      </motion.div>
                      
                      {/* Tooltip */}
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded whitespace-nowrap"
                      >
                        {social.label}
                      </motion.span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Business Hours Badge */}
              <motion.div
                variants={scaleIn}
                whileHover={{ scale: 1.02 }}
                className="bg-primary/5 p-6 rounded-lg border border-primary/20"
              >
                <h4 className="font-heading font-semibold text-black mb-2">Emergency Contact</h4>
                <p className="text-sm text-muted-foreground mb-3">Available 24/7 for urgent matters</p>
                <a href="tel:+919876543210" className="text-primary font-semibold hover:text-accent transition-colors flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  7373663555
                </a>
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.div
              variants={slideFromRight}
              className="lg:col-span-2"
            >
              <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-8 md:p-10 shadow-sm">
                <motion.h3 
                  variants={fadeInDown}
                  className="text-xl font-heading font-semibold text-black mb-6"
                >
                  Send us a Message
                </motion.h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <motion.div variants={fadeInUp} custom={0}>
                    <label className="text-sm font-medium text-black mb-2 block">Full Name *</label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-all duration-300"
                      placeholder="Your Name"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </motion.div>
                  
                  <motion.div variants={fadeInUp} custom={1}>
                    <label className="text-sm font-medium text-black mb-2 block">Email *</label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-all duration-300"
                      placeholder="Email Address"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </motion.div>

                  <motion.div variants={fadeInUp} custom={2}>
                    <label className="text-sm font-medium text-black mb-2 block">Phone</label>

                    <div className="flex gap-2">

                      {/* Country Code */}
                      <select
                        value={form.countryCode}
                        onChange={(e) => setForm({ ...form, countryCode: e.target.value })}
                        className="px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-black focus:outline-none focus:border-primary"
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+61">🇦🇺 +61</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+65">🇸🇬 +65</option>
                      </select>

                      {/* Phone Number */}
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        type="tel"
                        value={form.phone}
                        onChange={(e) => {
                          const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                          setForm({ ...form, phone: onlyNums });
                        }}
                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-all duration-300"
                        placeholder="xxxxxxxxxx"
                      />
                    </div>

                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </motion.div>
                  
                  <motion.div variants={fadeInUp} custom={3}>
                    <label className="text-sm font-medium text-black mb-2 block">Subject *</label>
                    <motion.select
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-black focus:outline-none focus:border-primary focus:bg-white transition-all duration-300"
                    >
                      <option value="">Select a practice area</option>
                      <option>Corporate Law</option>
                      <option>Litigation</option>
                      <option>Real Estate</option>
                      <option>Family Law</option>
                      <option>Criminal Defense</option>
                      <option>Immigration</option>
                      <option>Intellectual Property</option>
                      <option>Tax Law</option>
                      <option>Other</option>
                    </motion.select>
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                  </motion.div>
                </div>
                
                <motion.div variants={fadeInUp} custom={4} className="mb-6">
                  <label className="text-sm font-medium text-black mb-2 block">Message *</label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-all duration-300 resize-none"
                    placeholder="Describe your legal matter..."
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </motion.div>
                
                {/* <Button type="submit" size="xl" className="w-full md:w-auto btn-shine">
                  <span className="font-semibold">Submit Request</span>
                  <Send className="w-4 h-4 font-semibold" />
                </Button> */}
                <Button
                  type="submit"
                  size="xl"
                  disabled={loading}
                  className="w-full md:w-auto btn-shine"
                >
                  {loading ? (
                    <span className="font-semibold">Sending...</span>
                  ) : (
                    <>
                      <span className="font-semibold">Submit Request</span>
                      <Send className="w-4 h-4 font-semibold" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Multi Location Map Section */}
<motion.section className="relative bg-gray-100 overflow-hidden py-12">

  <div className="container mx-auto px-4">

    {/* Location Tabs */}
    <div className="flex flex-wrap justify-center gap-3 mb-6">
      {chennaiLocations.map((loc, index) => (
        <button
          key={index}
          onClick={() => setActiveLocation(loc)}
          className={`px-4 py-2 text-sm rounded-full border transition-all duration-300 ${
            activeLocation.name === loc.name
              ? "bg-primary text-white border-primary"
              : "bg-white text-gray-700 border-gray-200 hover:bg-primary hover:text-white"
          }`}
        >
          {loc.name}
        </button>
      ))}
    </div>

    {/* Map */}
    <div className="relative h-[400px] md:h-[450px] rounded-xl overflow-hidden shadow-lg">
      <motion.iframe
        key={activeLocation.name}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        src={activeLocation.mapEmbed}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        className="w-full h-full"
      />
    </div>
  </div>
</motion.section>
    </div>
  );
};

export default Contact;