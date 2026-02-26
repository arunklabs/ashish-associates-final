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
    { icon: BookOpen, title: "Getting Started", description: "New to our platform? Start here", count: 12, color: "gold" },
    { icon: Shield, title: "Account Security", description: "Keep your account safe", count: 8, color: "blue" },
    { icon: Zap, title: "Troubleshooting", description: "Common issues and fixes", count: 15, color: "purple" },
    { icon: Headphones, title: "Customer Support", description: "24/7 support guidelines", count: 6, color: "green" }
  ];

  const faqData = [
    {
      id: "general",
      category: "General Questions",
      icon: "📋",
      items: [
        {
          question: "What is your service about?",
          answer: "Our service provides comprehensive solutions for businesses looking to streamline their operations. We offer a range of tools and features designed to help you manage your workflow efficiently with enterprise-grade security and reliability."
        },
        {
          question: "How do I get started?",
          answer: "Getting started is easy! Simply sign up for an account on our platform, and you'll have access to all basic features. Our onboarding team will guide you through the process with personalized training sessions and documentation."
        },
        {
          question: "Is there a free trial available?",
          answer: "Yes, we offer a 14-day free trial on all our paid plans. No credit card required. You'll get full access to all features, premium support, and onboarding assistance during the trial period."
        }
      ]
    },
    {
      id: "billing",
      category: "Account & Billing",
      icon: "💰",
      items: [
        {
          question: "How do I change my subscription plan?",
          answer: "You can change your subscription plan anytime from your account settings. Go to Billing > Subscription and choose the plan you want to switch to. The changes will be applied from your next billing cycle with pro-rated adjustments."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans. Enterprise customers can also request invoice-based payments with net-30 terms."
        },
        {
          question: "Can I cancel my subscription anytime?",
          answer: "Absolutely! You can cancel your subscription at any time from your account settings. There are no cancellation fees, and you'll continue to have access until the end of your billing period. We'll also provide a data export of all your information."
        }
      ]
    },
    {
      id: "technical",
      category: "Technical Support",
      icon: "🔧",
      items: [
        {
          question: "How can I contact customer support?",
          answer: "You can reach our customer support team through multiple channels: 24/7 live chat directly in the platform, email at support@company.com, or phone at +1 (555) 123-4567 during business hours. Enterprise customers get dedicated account managers."
        },
        {
          question: "What are your support hours?",
          answer: "Our support team is available 24/7 via live chat and email for all customers. Phone support is available Monday to Friday, 9 AM to 6 PM EST. Enterprise plans include 24/7 phone support with less than 15-minute response times."
        },
        {
          question: "Do you offer training or onboarding sessions?",
          answer: "Yes, we offer personalized onboarding sessions for all new customers on our Professional and Enterprise plans. You can schedule sessions with our customer success team, access our knowledge base, and join weekly webinars."
        }
      ]
    },
    {
      id: "security",
      category: "Security & Compliance",
      icon: "🔒",
      items: [
        {
          question: "How secure is my data?",
          answer: "We employ enterprise-grade security measures including end-to-end encryption, regular security audits, and compliance with GDPR, SOC2, and ISO 27001 standards. Your data is backed up daily and stored in redundant, secure data centers."
        },
        {
          question: "Do you offer SSO integration?",
          answer: "Yes, we support SAML-based Single Sign-On (SSO) for all Enterprise plans. We integrate with major identity providers including Okta, Azure AD, and Google Workspace."
        }
      ]
    }
  ];

  const howWeWork = [
    {
      step: "01",
      title: "Discovery Call",
      description: "We start with a thorough consultation to understand your business needs, goals, and challenges.",
      icon: Users
    },
    {
      step: "02",
      title: "Custom Setup",
      description: "Our team configures the platform specifically for your workflow with personalized training.",
      icon: Zap
    },
    {
      step: "03",
      title: "Integration",
      description: "Our Seamless integration with your existing tools and best systems for all unified experience.",
      icon: Shield
    },
    {
      step: "04",
      title: "Ongoing Support",
      description: "24/7 dedicated support, regular check-ins, free consultations and continuous optimization of your setup.",
      icon: Headphones
    }
  ];

  const supportPromise = [
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock support with average response time under 5 minutes"
    },
    {
      icon: Users,
      title: "Dedicated Account Manager",
      description: "Enterprise plans include a dedicated expert who knows your business"
    },
    {
      icon: Shield,
      title: "99.9% Uptime Guarantee",
      description: "Enterprise-grade infrastructure with guaranteed reliability"
    },
    {
      icon: Star,
      title: "Expert Team",
      description: "All support agents are certified professionals with years of experience"
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
                24/7 Premium Support
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
                help you today?
              </motion.span>
            </motion.h1>

            {/* Stats */}
            <motion.div 
              variants={staggerContainer}
              className="flex flex-wrap gap-8 mt-14"
            >
              {[
                { text: "25 Help Articles" },
                { text: "24/7 Live Support" },
                { text: "<5min Response Time" }
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
                Quick Help
              </p>
            </motion.div>
            <motion.h2 
              variants={fadeInDown}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              <span className="text-gray-900">Quick Help</span>{" "}
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
                      <span className="text-sm text-primary font-medium">{topic.count} articles</span>
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
              All Questions
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
                  className="relative group rounded-2xl"
                >
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-transparent 
                              rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 
                              blur"
                  />
                  
                  <div className="relative bg-gray-50 border border-gray-200 rounded-2xl p-8 
                                hover:border-primary/30 transition-all duration-500">
                    <motion.div 
                      animate={{ 
                        y: [0, -5, 0],
                        transition: { duration: 2, repeat: Infinity }
                      }}
                      className="text-5xl font-bold text-primary/20 mb-4"
                    >
                      {step.step}
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6
                                group-hover:scale-110 transition-transform duration-300"
                    >
                      <Icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    
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
                Support Promise
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
            <motion.div
              variants={slideFromLeft}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8 cursor-pointer"
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
                  backgroundPosition: ['0%', '100%', '0%']
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" as const }}
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
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <Link
                  href="/contact"
                  className="relative px-8 py-5 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 text-sm md:text-base inline-flex items-center gap-3"
                >
                  <Phone className="w-5 h-5" />
                  Free Consultation
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
                  Learn More About Us
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              variants={staggerContainer}
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