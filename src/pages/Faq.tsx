"use client";

import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Search,
  MessageCircle,
  Clock,
  Shield,
  Users,
  ArrowRight,
  CheckCircle,
  Headphones,
  Mail,
  Phone,
  LifeBuoy,
  BookOpen,
  Zap,
  Star,
  Sparkles,
  Award
} from 'lucide-react';
const hero1 = "/assets/hero1.webp";
import Link from "next/link";
import { motion } from 'framer-motion';

const Faq = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99] as const
      }
    }
  };

  const fadeInDown = {
    hidden: { opacity: 0, y: -60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99] as const
      }
    }
  };

  const slideFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99] as const
      }
    }
  };

  const slideFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99] as const
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as const
      }
    }
  };

  const rotateIn = {
    hidden: { opacity: 0, rotate: -10, scale: 0.9 },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.6, -0.05, 0.01, 0.99] as const
      }
    }
  };

  const flipIn = {
    hidden: { opacity: 0, rotateY: 90 },
    visible: {
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99] as const
      }
    }
  };

  const bounceIn = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 15,
        duration: 0.6
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
        ease: [0.6, -0.05, 0.01, 0.99] as const
      }
    }
  };

  const staggerContainerSlow = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        ease: [0.6, -0.05, 0.01, 0.99] as const
      }
    }
  };

  const hoverScale = {
    whileHover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const hoverLift = {
    whileHover: {
      y: -8,
      boxShadow: "0 20px 30px -10px rgba(0,0,0,0.2)",
      transition: { duration: 0.3 }
    }
  };

  const quickHelpTopics = [
    { icon: BookOpen, title: "Using the Website", description: "Learn how to navigate and use this website.", count: "General Information", color: "gold" },
    { icon: Shield, title: "Privacy & Security", description: "Information about protecting your personal information.", count: "Privacy Information", color: "blue" },
    { icon: Zap, title: "Website Assistance", description: "Guidance on resolving common website-related issues.", count: "Technical Support", color: "purple" },
    { icon: Headphones, title: "Contact Information", description: "24/7 support guidelines", count: 6, color: "green" }
  ];

  const faqData = [
    {
      id: "general",
      category: "General Information",
      icon: "📋",
      items: [
        {
          question: "What services does the Firm provide?",
          answer: "The Firm provides legal services in its areas of practice. Information available on this website is intended for general informational purposes only and does not constitute legal advice."
        },
        {
          question: "How can I schedule a consultation?",
          answer: "You may contact the Firm using the contact details or enquiry form available on this website.Any consultation is subject to the Firm's availability and applicable professional requirements."
        },
        {
          question: "Is an initial consultation available?",
          answer: "Initial consultations may be arranged at the Firm's discretion. Any applicable professional fees or consultation charges will be communicated before the consultation."
        }
      ]
    },
    {
      id: "billing",
      category: "Consultations & Fees",
      icon: "💰",
      items: [
        {
          question: "How are professional fees determined?",
          answer: "Professional fees depend on the nature, complexity and scope of the legal matter. Fee arrangements are discussed with clients before engagement."
        },
        {
          question: "What payment methods do you accept?",
          answer: "The Firm accepts payment through the methods communicated at the time of engagement."
        },
        {
          question: "Can I discontinue legal services?",
          answer: "Clients may discuss the discontinuation of legal services directly with the Firm, subject to applicable professional obligations and the stage of the engagement."
        }
      ]
    },
    {
      id: "technical",
      category: "Website Assistance",
      icon: "🔧",
      items: [
        {
          question: "How can I contact the Firm?",
          answer: "You may contact the Firm using the contact details provided on this website during office hours. Enquiries submitted through the website will be responded to as appropriate."
        },
        {
          question: "What are the office hours?",
          answer: "Office hours and contact information are available on the Contact page. Responses to enquiries are provided during normal working hours."
        },
        {
          question: "Do you provide legal consultations?",
          answer: "Legal consultations may be scheduled by prior appointment, subject to the Firm's availability."
        }
      ]
    },
    {
      id: "security",
      category: "Privacy & Confidentiality",
      icon: "🔒",
      items: [
        {
          question: "How secure is my data?",
          answer: "Information submitted through this website is handled in accordance with the Firm's Privacy Policy and applicable laws. Please avoid sending confidential information until an advocate-client relationship has been established."
        },
        {
          question: "Will my information remain confidential?",
          answer: "The Firm is committed to maintaining the confidentiality of client information in accordance with applicable professional and legal obligations."
        }
      ]
    }
  ];

  const howWeWork = [
    {
      step: "01",
      title: "Initial Consultation",
      description: "An initial discussion to understand your legal matter and determine how the Firm may assist.",
      icon: Users
    },
    {
      step: "02",
      title: "Case Assessment",
      description: "The relevant documents and information are reviewed to assess the legal issues involved.",
      icon: Zap
    },
    {
      step: "03",
      title: "Legal Advice & Representation",
      description: "Legal advice and representation are provided where appropriate and in accordance with the agreed scope of engagement.",
      icon: Shield
    },
    {
      step: "04",
      title: "Communication & Updates",
      description: "The Firm keeps clients informed regarding significant developments during the course of the engagement.",
      icon: Headphones
    }
  ];

  const supportPromise = [
    {
      icon: Clock,
      title: "Professional Assistance",
      description: "Responses to enquiries are provided within a reasonable time during office hours."
    },
    {
      icon: Users,
      title: "Direct Communication",
      description: "Clients communicate directly with the Firm or the advocate handling the matter."
    },
    {
      icon: Shield,
      title: "Confidentiality",
      description: "Client information is handled in accordance with applicable professional obligations and the Firm's Privacy Policy."
    },
    {
      icon: Star,
      title: "Professional Representation",
      description: "Legal services are provided by advocates enrolled with the Bar Council, where applicable."
    }
  ];

  const toggleItem = (categoryIndex: number, itemIndex: number) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredFaqData = faqData.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="min-h-screen overflow-hidden -mt-20">
      {/* Section 1: Help Hero - Dark Theme */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative min-h-[95vh] lg:min-h-screen flex items-center overflow-hidden bg-background"
      >
        {/* Background with Overlay */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-background/70 to-background/50" />
          <div className="absolute inset-0 pattern-gold opacity-20" />
        </div>

        {/* Hero Content */}
        <motion.div
          variants={staggerContainer}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        >
          <div className="max-w-3xl">
            <motion.div
              variants={slideFromLeft}
              className="flex items-center justify-start gap-3 mb-6"
            >
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-10 h-px bg-[#C9A646]"
              />
              <motion.p
                variants={fadeInUp}
                className="text-sm uppercase tracking-[0.2em] text-[#C9A646] font-semibold"
              >
                HELP & FREQUENTLY ASKED QUESTIONS
              </motion.p>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <motion.span
                variants={slideFromLeft}
                className="gold-gradient-text italic inline-block"
              >
                How can we
              </motion.span>
              <br />
              <motion.span
                variants={slideFromRight}
                className="text-foreground inline-block"
              >
                assist you today?
              </motion.span>
            </motion.h1>

            {/* Stats */}
            <motion.div
              variants={staggerContainer}
              className="flex flex-wrap gap-8 mt-14"
            >
              {[
                { text: "Frequently Asked Questions" },
                { text: "General Information" },
                { text: " Contact & Support" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={bounceIn}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-white">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        />
      </motion.section>

      {/* Section 2: Quick Help Topics - Light Theme */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="section-padding bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mb-4">
              <span className="w-10 h-px bg-[#C9A646]"></span>
              <p className="text-sm uppercase tracking-[0.2em] text-[#C9A646] font-semibold">
                HELP TOPICS
              </p>
            </motion.div>
            <motion.h2
              variants={fadeInDown}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              <span className="text-gray-900">Browse Help</span>{" "}
              <motion.span
                variants={rotateIn}
                className="gold-gradient-text italic"
              >
                Topics
              </motion.span>
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainerSlow}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {quickHelpTopics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <motion.div
                  key={index}
                  variants={flipIn}
                  {...hoverLift}
                  className="group relative bg-gray-50 border border-gray-200 rounded-2xl p-6 
                           hover:border-primary/30 transition-all duration-500"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl 
                              group-hover:opacity-100 transition-opacity duration-500"
                  />

                  <div className="relative">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4
                                group-hover:scale-110 transition-transform duration-300"
                    >
                      <Icon className="w-7 h-7 text-primary" />
                    </motion.div>

                    <motion.h3
                      variants={slideFromLeft}
                      className="text-xl font-bold text-gray-900 mb-2"
                    >
                      {topic.title}
                    </motion.h3>
                    <motion.p
                      variants={fadeInUp}
                      className="text-gray-600 mb-4"
                    >
                      {topic.description}
                    </motion.p>

                    <motion.div
                      variants={slideFromRight}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-primary font-medium">{topic.count}</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 
                                             transition-all duration-300" />
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Section 3: FAQ Categorized - Dark Theme */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="section-padding bg-background"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-12 h-px bg-primary"></span>
              <span className="text-primary uppercase tracking-[0.2em] text-sm font-semibold">
                Frequently Asked Questions
              </span>
              <span className="w-12 h-px bg-primary"></span>
            </motion.div>
            <motion.h2
              variants={fadeInDown}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Frequently Asked <motion.span
                variants={rotateIn}
                className="gold-gradient-text italic"
              >
                Questions
              </motion.span>
            </motion.h2>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            <motion.button
              variants={bounceIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300
                        ${activeCategory === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-muted-foreground hover:border-primary/30'}`}
            >
              All FAQs
            </motion.button>
            {faqData.map((cat, index) => (
              <motion.button
                key={cat.id}
                variants={bounceIn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                custom={index}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300
                          ${activeCategory === cat.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-muted-foreground hover:border-primary/30'}`}
              >
                {cat.category}
              </motion.button>
            ))}
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div
            variants={staggerContainer}
            className="space-y-8"
          >
            {(activeCategory === 'all' ? filteredFaqData : filteredFaqData.filter(c => c.id === activeCategory)).map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                variants={slideFromLeft}
                whileInView={scaleIn}
                className="bg-card/30 backdrop-blur-sm border border-border rounded-2xl p-8"
              >
                <motion.div
                  variants={slideFromRight}
                  className="flex items-center gap-3 mb-8"
                >
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-3xl"
                  >
                    {category.icon}
                  </motion.span>
                  <h3 className="text-2xl font-bold text-foreground">{category.category}</h3>
                </motion.div>

                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => {
                    const itemKey = `${categoryIndex}-${itemIndex}`;
                    const isOpen = openItems[itemKey];

                    return (
                      <motion.div
                        key={itemIndex}
                        variants={scaleIn}
                        whileHover={{ scale: 1.02 }}
                        className="border border-border rounded-xl overflow-hidden 
                                 hover:border-primary/30 transition-all duration-300"
                      >
                        <motion.button
                          onClick={() => toggleItem(categoryIndex, itemIndex)}
                          className="w-full px-6 py-5 text-left flex justify-between items-center 
                                   bg-card/50 hover:bg-card/80 transition-colors duration-200"
                          whileHover={{ x: 5 }}
                        >
                          <span className="text-lg font-medium text-foreground pr-8">
                            {item.question}
                          </span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                            )}
                          </motion.div>
                        </motion.button>

                        <motion.div
                          initial={false}
                          animate={{
                            height: isOpen ? 'auto' : 0,
                            opacity: isOpen ? 1 : 0
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 py-5 bg-card/30 border-t border-border">
                            <motion.p
                              variants={fadeInUp}
                              className="text-muted-foreground leading-relaxed"
                            >
                              {item.answer}
                            </motion.p>
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Section 4: How We Work - Light Theme */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="section-padding bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mb-4">
              <span className="w-10 h-px bg-[#C9A646]"></span>
              <p className="text-sm uppercase tracking-[0.2em] text-[#C9A646] font-semibold">
                How We Work
              </p>
            </motion.div>
            <motion.h2
              variants={fadeInDown}
              className="text-4xl md:text-5xl font-bold text-black mb-4"
            >
              How <motion.span
                variants={rotateIn}
                className="gold-gradient-text italic"
              >
                We Work
              </motion.span>
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainerSlow}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {howWeWork.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  variants={flipIn}
                  {...hoverLift}
                  className="relative group rounded-2xl h-96"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-transparent 
                              rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 
                              blur h-80 lg:h-96"
                  />

                  <div className="relative bg-gray-50 border border-gray-200 rounded-2xl p-8 
                                hover:border-primary/30 transition-all duration-500 h-80 lg:h-96">
                    <motion.div
                      animate={{
                        y: [0, -5, 0],
                        transition: { duration: 2, repeat: Infinity }
                      }}
                      className="text-5xl font-bold text-primary/20 mb-4"
                    >
                      {step.step}
                    </motion.div>

                    {/* <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6
                                group-hover:scale-110 transition-transform duration-300"
                    >
                      <Icon className="w-6 h-6 text-primary" />
                    </motion.div> */}

                    <motion.h3
                      variants={slideFromLeft}
                      className="text-xl font-bold text-gray-900 mb-3"
                    >
                      {step.title}
                    </motion.h3>
                    <motion.p
                      variants={fadeInUp}
                      className="text-gray-600"
                    >
                      {step.description}
                    </motion.p>

                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute bottom-8 right-8"
                    >
                      <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 
                                           transition-all duration-300" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Section 5: Support Promise - Dark Theme */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="section-padding bg-background"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-12 h-px bg-primary"></span>
              <span className="text-primary uppercase tracking-[0.2em] text-sm font-semibold">
                Client Information
              </span>
              <span className="w-12 h-px bg-primary"></span>
            </motion.div>
            <motion.h2
              variants={fadeInDown}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Our <motion.span
                variants={rotateIn}
                className="gold-gradient-text italic"
              >
                Support Promise
              </motion.span>
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainerSlow}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {supportPromise.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={slideFromLeft}
                  {...hoverLift}
                  className="bg-card/30 backdrop-blur-sm border border-border rounded-2xl p-8
                           hover:border-primary/30 transition-all duration-500 group"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6
                              group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300"
                  >
                    <Icon className="w-6 h-6 text-primary" />
                  </motion.div>

                  <motion.h3
                    variants={slideFromRight}
                    className="text-xl font-bold text-foreground mb-3"
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p
                    variants={fadeInUp}
                    className="text-muted-foreground"
                  >
                    {item.description}
                  </motion.p>

                  <motion.div
                    initial={{ width: 48 }}
                    whileHover={{ width: 80 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 h-1 bg-gradient-to-r from-primary to-primary/20 rounded-full"
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Section 6: Contact Support with CTA - Light Theme */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative py-32 overflow-hidden bg-white"
      >
        <div className="absolute inset-0">
          <motion.img
            src={hero1}
            alt="Background"
            className="w-full h-full object-cover"
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1, transition: { duration: 1.5 } }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear" as const
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
                y: [null, -200],
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
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
            {/* <motion.div
              variants={slideFromLeft}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Limited Time Offer</span>
            </motion.div> */}

            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-heading font-bold mb-10 text-white leading-tight"
            >
              <motion.span variants={slideFromLeft} className="inline-block">
                TO Contact the Firm for
              </motion.span>
              <motion.span
                variants={slideFromRight}
                animate={{
                  backgroundPosition: ['0%', '100%', '0%']
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" as const }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-[length:200%] italic"
              >
                Legal Assistance
              </motion.span>
            </motion.h2>

            <motion.div
              variants={staggerContainer}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.div
                variants={slideFromLeft}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <Link
                  href="/contact"
                  className="relative px-8 py-5 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 text-sm md:text-base inline-flex items-center gap-3"
                >
                  <Phone className="w-5 h-5" />
                  Schedule a Consultation
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </Link>
              </motion.div>

              <motion.div
                variants={slideFromRight}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/about"
                  className="group px-8 py-5 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 text-sm md:text-base inline-flex items-center gap-3"
                >
                  <Shield className="w-5 h-5" />
                  Learn More About the Firm
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="flex flex-wrap justify-center gap-8 mt-16"
            >
              {[
                { icon: Shield, text: "Client Confidentiality" },
                { icon: Users, text: "Experienced Advocates" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.5 + index * 0.1 }
                    }
                  }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="flex items-center gap-2 text-white/80 cursor-pointer"
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
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent"
        />
        <motion.div
          animate={{ rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" as const }}
          className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-white/20"
        />
        <motion.div
          animate={{ rotate: [360, 270, 180, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" as const }}
          className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-white/20"
        />
      </motion.section>
    </div>
  );
};

export default Faq;