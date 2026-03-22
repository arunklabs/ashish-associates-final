"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle, Mail, Phone, MapPin, Clock, ChevronLeft, ChevronRight, Scale, Users, Award, Briefcase, BookOpen, Star, Send, ArrowRight } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { slideFromLeft, slideFromRight, staggerContainer, viewportOnce, viewportOnceMore } from "@/lib/animations";

// Individual Practice Area Data - Updated based on your list
const corporateLaw = {
  slug: "corporate-law",
  title: "Corporate Law",
  shortDesc: "Strategic counsel for businesses of all sizes, from startups to established corporations.",
  bannerImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  overview: "Our corporate law practice covers business formation, corporate governance, mergers and acquisitions, joint ventures, securities regulation, and commercial contracts. We guide businesses through complex transactions with precision and foresight.",
  keyServices: [
    "Mergers & Acquisitions",
    "Corporate Governance", 
    "Securities & Compliance",
    "Joint Ventures",
    "Commercial Contracts",
    "Business Formation",
    "Private Equity",
    "Venture Capital"
  ],
  industries: [
    "Technology",
    "Finance & Banking",
    "Healthcare",
    "Manufacturing",
    "Energy & Utilities",
    "Real Estate"
  ],
  featuredImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  featuredTitle: "Excellence in Corporate Law",
  featuredSubtitle: "Trusted by businesses worldwide",
  faqs: [
    {
      question: "What makes your Corporate Law practice unique?",
      answer: "We combine strategic insight and meticulous attention to complex business transactions, ensuring guidance tailored to client objectives."
    },
    {
      question: "Do you handle cross-border transactions?",
      answer: "Yes, our team coordinates with international counsel to ensure compliance with global standards."
    },
    {
      question: "Can you represent clients in RBI proceedings?",
      answer:"Yes, our team provides expert guidance and representation in matters before the Reserve Bank of India (RBI), ensuring compliance with regulatory requirements while protecting client interests."
    }
  ],
  whychooseus: [
    {
      icon: Scale,
      title: "Expert Corporate Guidance",
      desc: "Senior partners personally oversee every transaction."
    },
    {
      icon: Users,
      title: "Tailored Solutions",
      desc: "Strategies aligned with client objectives and risk profiles."
    },
    {
      icon: Award,
      title: "Global Perspective",
      desc: "Compliance and advisory reflecting international best practices."
    }
  ]
};

const criminalLaw = {
  slug: "criminal-law",
  title: "Criminal Law",
  shortDesc: "Vigorous defense of your rights in criminal proceedings at all levels.",
  bannerImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  overview: "Our criminal defense team provides aggressive representation, protecting our clients' constitutional rights while pursuing the best possible outcome. We handle cases from initial investigation through trial and appeal.",
  keyServices: [
    "White Collar Crime",
    "Drug Offenses",
    "DUI Defense",
    "Federal Cases",
    "Appeals",
    "Expungement",
    "Sex Crimes",
    "Violent Crimes"
  ],
  industries: ["All Criminal Defense Matters"],
  featuredImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  featuredTitle: "Aggressive Criminal Defense",
  featuredSubtitle: "Protecting your rights and freedom",
  faqs: [
    {
      question: "What makes your Criminal Law practice unique?",
      answer: "Our team blends defense expertise, litigation strategy, and ethical advocacy for individual and corporate clients."
    },
    {
      question: "Do you handle cybercrime cases?",
      answer: "Yes, including regulatory compliance, investigations, and representation in cybercrime matters."
    },
    {
      question: "How quickly can urgent cases be addressed?",
      answer:"Immediate response protocols ensure rapid guidance for time-sensitive situations."
    }
  ],
  whychooseus: [
    {
      icon: Scale,
      title: "Strategic Defense",
      desc: "Focused on legal protection and constitutional rights."
    },
    {
      icon: Users,
      title: "Professional Representation",
      desc: "Experienced advocacy in courts and tribunals."
    },
    {
      icon: Award,
      title: "Client-Centric Approach",
      desc: "Personalized attention in every stage of the case."
    }
  ]
};

const insuranceLaw = {
  slug: "insurance-law",
  title: "Insurance Law",
  shortDesc: "Vigorous defense of your rights in criminal proceedings at all levels.",
  bannerImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  overview: "Our Insurance Law practice provides comprehensive guidance on regulatory compliance, policy drafting, and dispute resolution for insurers, policyholders, and intermediaries. We assist with claims disputes, risk management, and regulatory approvals, ensuring solutions that are practical, ethical, and aligned with international standards.",
  keyServices: [
    "Policy Drafting & Review",
    "Claims Dispute Resolution",
    "Regulatory Compliance",
    "Insurance Litigation",
    "Risk Management Advisory",
    "Reinsurance Agreements",
    "Corporate Insurance Structuring",
    "Industries We Serve",
    "Health & Life Insurance",
    "Banking & Financial Services",
    "Manufacturing & Infrastructure",
    "Technology & FinTech",
    "Real Estate"
  ],
  industries: ["Health & Life Insurance", "Banking & Financial Services", "Manufacturing & Infrastructure", "Technology & FinTech", "Real Estate & Construction"],
  featuredImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  featuredTitle: "Aggressive Criminal Defense",
  featuredSubtitle: "Protecting your rights and freedom",
  faqs: [
    {
      question: "What makes your Insurance Law practice unique?",
      answer: "Combining regulatory expertise and dispute resolution experience for insurers and policyholders."
    },
    {
      question: "Do you handle claims disputes?",
      answer: "Yes, guiding clients through negotiation, arbitration, and litigation processes."
    },
    {
      question: "Can you advise on compliance?",
      answer:"Yes, ensuring adherence to regulatory frameworks and risk management standards."
    }
  ],
  whychooseus: [
    {
      icon: Scale,
      title: "Expert Guidance",
      desc: "Senior partners provide hands-on oversight."
    },
    {
      icon: Users,
      title: "Personalized Solutions",
      desc: "Strategies for insurers, corporates, and individuals."
    },
    {
      icon: Award,
      title: "Ethical & Professional",
      desc: "Compliance-focused and client-centric advice."
    }
  ]
};

const labourEmploymentLaw = {
  slug: "labour-employment-law",
  title: "Labour & Employment Law",
  shortDesc: "Vigorous defense of your rights in criminal proceedings at all levels.",
  bannerImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  overview: "Our Labour & Employment Law practice helps organizations and individuals navigate workplace regulations, employment contracts, and industrial disputes. We provide compliance guidance, dispute resolution, and advisory services to ensure fair, ethical, and legally sound workplace practices.",
  keyServices: [
    "Employment Contract Drafting & Review",
    "Industrial Dispute Resolution",
    "Compliance Audits",
    "Workplace Policies & Guidelines",
    "Labour Litigation",
    "Employee Benefits Advisory",
    "Disciplinary & Termination Advisory",
    "Industries We Serve",
    "IT & Technology",
    "Manufacturing & Industrial",
    "Healthcare & Hospitals",
    "Retail & Hospitality",
    "Financial Services"
  ],
  industries: ["IT & Technology", "Manufacturing & Industrial", "Healthcare & Hospitals", "Retail & Hospitality", "Financial Services"],
  featuredImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  featuredTitle: "Aggressive Criminal Defense",
  featuredSubtitle: "Protecting your rights and freedom",
  faqs: [
    {
      question: "Do you handle workplace disputes?",
      answer: "Yes, representing both employers and employees in disputes and negotiations."
    },
    {
      question: "Can you draft employment contracts?",
      answer: "Yes, including compliance and clarity on roles and obligations."
    },
    {
      question: "Do you advise on workplace policies?",
      answer:"Yes, guiding clients in alignment with legal and ethical standards."
    }
  ],
  whychooseus: [
    {
      icon: Scale,
      title: "Strategic Labour Advice",
      desc: "Protecting client interests with expertise."
    },
    {
      icon: Users,
      title: "Personalized Attention",
      desc: "Tailored solutions for organizations and individuals."
    },
    {
      icon: Award,
      title: "Professional & Compliant",
      desc: "Ethical guidance aligned with Indian labour laws."
    }
  ]
};

const insolvencyBankruptcyLaw = {
  slug: "insolvency-bankruptcy-law",
  title: "Insolvency & Bankruptcy Law",
  shortDesc: "Vigorous defense of your rights in criminal proceedings at all levels.",
  bannerImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  overview: "Our Insolvency & Bankruptcy Law practice assists corporates, creditors, and individuals in navigating insolvency proceedings, restructuring, and recovery matters. We provide strategic advice on compliance with the Insolvency & Bankruptcy Code, debt resolution, and liquidation processes, ensuring practical and legally sound outcomes.",
  keyServices: [
    "Corporate Insolvency Resolution Process (CIRP) Advisory",
    "Individual Bankruptcy Guidance",
    "Debt Recovery & Negotiation",
    "Liquidation & Restructuring",
    "Compliance with Insolvency & Bankruptcy Code",
    "Creditor & Debtor Representation",
    "Risk Assessment & Advisory",
    "Industries We Serve",
    "Banking & Financial Services",
    "Manufacturing & Industrial",
    "Real Estate & Construction",
    "Healthcare & Pharmaceuticals",
    "Technology & Startups"
  ],
  industries: ["Banking & Financial Services", "Manufacturing & Industrial", "Real Estate & Construction", "Healthcare & Pharmaceuticals", "Technology & Startups"],
  featuredImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  featuredTitle: "Aggressive Criminal Defense",
  featuredSubtitle: "Protecting your rights and freedom",
  faqs: [
    {
      question: "Do you handle corporate insolvency?",
      answer: "Yes, including resolution, restructuring, and liquidation guidance under IBC."
    },
    {
      question: "Can you advise individuals on personal bankruptcy?",
      answer: "Yes, providing strategic counsel and legal representation."
    },
    {
      question: "How do you manage creditor negotiations?",
      answer:"We offer structured advisory to balance compliance and strategic interests."
    }
  ],
  whychooseus: [
    {
      icon: Scale,
      title: "Expert Insolvency Guidance",
      desc: "Practical, ethical, and compliant solutions."
    },
    {
      icon: Users,
      title: "Tailored Solutions",
      desc: "Guidance for corporates, creditors, and individuals."
    },
    {
      icon: Award,
      title: "Professional Standards",
      desc: "Senior partners provide oversight and strategic direction."
    }
  ]
};

const civilLaw = {
  slug: "civil-law",
  title: "Civil Law",
  shortDesc: "Expert representation in civil disputes and litigation matters.",
  bannerImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  overview: "Our civil law practice handles a wide range of disputes between individuals, organizations, and entities. We provide strategic counsel and aggressive representation in all phases of civil litigation.",
  keyServices: [
    "Contract Disputes",
    "Property Disputes",
    "Tort Claims",
    "Personal Injury",
    "Consumer Protection",
    "Debt Recovery",
    "Enforcement of Civil Judgments",
    "Alternative Dispute Resolution"
  ],
  industries: [
    "Individuals",
    "Small Businesses",
    "Corporations",
    "Non-Profits",
    "Government Entities",
    "Real Estate"
  ],
  featuredImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  featuredTitle: "Civil Litigation Experts",
  featuredSubtitle: "Resolving disputes effectively",
  faqs: [
    {
      question: "What sets your Civil Law services apart?",
      answer: "We focus on thorough legal analysis and ethical dispute resolution across personal and corporate civil matters."
    },
    {
      question: "Can you handle property and contract disputes?",
      answer: "Yes, we provide guidance and representation in both areas."
    },
    {
      question: "Do you assist in mediation?",
      answer:"Yes, we facilitate amicable resolutions where appropriate, minimizing time and cost."
    }
  ],
  whychooseus: [
    {
      icon: Scale,
      title: "Meticulous Legal Analysis",
      desc: "Ensuring informed decision-making."
    },
    {
      icon: Users,
      title: "Client-Focused Solutions",
      desc: "Tailored strategies for personal and corporate matters."
    },
    {
      icon: Award,
      title: "Ethical Standards",
      desc: "Transparent and professional handling of all disputes."
    }
  ]
};

const familyLaw = {
  slug: "family-law",
  title: "Family Law",
  shortDesc: "Compassionate legal guidance for family matters and relationships.",
  bannerImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  overview: "Our family law practice provides sensitive and strategic counsel for all family-related legal matters. We understand the emotional nature of these cases and work to achieve the best possible outcomes for our clients and their families.",
  keyServices: [
    "Divorce & Separation",
    "Child Custody",
    "Child Support",
    "Spousal Support",
    "Property Division",
    "Adoption",
    "Guardianship",
    "Domestic Violence Protection"
  ],
  industries: ["Individuals & Families"],
  featuredImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  featuredTitle: "Family Law Specialists",
  featuredSubtitle: "Compassionate guidance for life's changes",
  faqs: [
    {
      question: "How do you handle sensitive family matters?",
      answer: "With discretion, empathy, and thorough legal expertise, protecting client interests and confidentiality."
    },
    {
      question: "Do you represent clients in child custody cases?",
      answer: "Yes, focusing on the best interests of children and legal compliance."
    },
    {
      question: "Can you advise on inheritance disputes?",
      answer:"Yes, we provide guidance on matrimonial and property-related inheritance matters."
    }
  ],
  whychooseus: [
    {
      icon: Scale,
      title: "Sensitive & Professional Guidance",
      desc: "Expertise with empathy."
    },
    {
      icon: Users,
      title: "Personalized Attention",
      desc: "Tailored strategies for each family matter."
    },
    {
      icon: Award,
      title: "Trusted Counsel",
      desc: "Maintaining discretion and integrity at every step."
    }
  ]
};

const propertyLaw = {
  slug: "property-law",
  title: "Property Law",
  shortDesc: "Comprehensive legal services for all property-related matters.",
  bannerImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  overview: "Our property law practice handles all aspects of real estate and property matters, from transactions and development to disputes and title issues. We provide expert guidance for both commercial and residential property matters.",
  keyServices: [
    "Property Transactions",
    "Title Searches & Insurance",
    "Land Use & Zoning",
    "Property Disputes",
    "Easements & Covenants",
    "Lease Agreements",
    "Property Development",
    "Boundary Disputes"
  ],
  industries: [
    "Real Estate Developers",
    "Property Owners",
    "Tenants",
    "Investors",
    "Financial Institutions"
  ],
  featuredImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  featuredTitle: "Property Law Experts",
  featuredSubtitle: "Protecting your property interests",
  faqs: [
    {
      question: "Do you handle property disputes?",
      answer: "Yes, including litigation, documentation, and compliance advisory."
    },
    {
      question: "Can you assist with commercial real estate transactions?",
      answer: "Yes, providing strategic guidance from drafting to registration."
    },
    {
      question: "Do you verify property titles?",
      answer:"Yes, ensuring accuracy and legal compliance for all transactions."
    }
  ],
  whychooseus: [
    {
      icon: Scale,
      title: "Strategic Property Advice",
      desc: "Comprehensive guidance on all matters."
    },
    {
      icon: Users,
      title: "Personalized Service",
      desc: "Senior partners involved in high-value matters."
    },
    {
      icon: Award,
      title: "Ethical & Transparent",
      desc: "Trusted counsel for complex property issues."
    }
  ]
};

const arbitration = {
  slug: "arbitration",
  title: "Arbitration",
  shortDesc: "Expert arbitration services for efficient dispute resolution.",
  bannerImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  overview: "Our arbitration practice provides expert alternative dispute resolution services, helping clients resolve conflicts efficiently and cost-effectively outside of traditional court litigation.",
  keyServices: [
    "Commercial Arbitration",
    "International Arbitration",
    "Construction Arbitration",
    "Investment Disputes",
    "Arbitration Advocacy",
    "Award Enforcement",
    "Mediation Services",
    "Dispute Resolution Strategy"
  ],
  industries: [
    "Corporate Sector",
    "Construction Industry",
    "International Trade",
    "Financial Services",
    "Energy Sector"
  ],
  featuredImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  featuredTitle: "Alternative Dispute Resolution",
  featuredSubtitle: "Efficient, cost-effective solutions",
  faqs: [
    {
      question: "What types of arbitration do you handle?",
      answer: "Domestic, international, commercial, and investment disputes."
    },
    {
      question: "Do you draft arbitration clauses?",
      answer: "Yes, ensuring enforceability and compliance with global standards."
    },
    {
      question: "Can you manage cross-border disputes?",
      answer:"Yes, leveraging international networks for efficient resolution."
    }
  ],
  whychooseus: [
    {
      icon: Scale,
      title: "Efficient Dispute Resolution",
      desc: "Minimizing time and costs."
    },
    {
      icon: Users,
      title: "Global Standards",
      desc: "Arbitration advice aligned with best practices."
    },
    {
      icon: Award,
      title: "Client-Focused Strategy",
      desc: "Guidance tailored to business objectives."
    }
  ]
};

const intellectualProperty = {
  slug: "intellectual-property",
  title: "Intellectual Property",
  shortDesc: "Protecting your innovations, creations, and brand identity.",
  bannerImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  overview: "Our intellectual property practice helps clients protect and enforce their valuable IP rights, including patents, trademarks, copyrights, and trade secrets. We provide comprehensive IP counsel from registration to litigation.",
  keyServices: [
    "Patent Registration",
    "Trademark Registration",
    "Copyright Protection",
    "Trade Secret Protection",
    "IP Licensing",
    "IP Litigation",
    "Brand Protection",
    "IP Portfolio Management"
  ],
  industries: [
    "Technology",
    "Creative Arts",
    "Manufacturing",
    "Pharmaceuticals",
    "Software Development",
    "Media & Entertainment"
  ],
  featuredImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  featuredTitle: "IP Protection Specialists",
  featuredSubtitle: "Safeguarding your innovations",
  faqs: [
    {
      question: "Do you register trademarks and patents?",
      answer: "Yes, including filing, licensing, and enforcement strategies."
    },
    {
      question: "Can you handle IP disputes?",
      answer: "Yes, representation for infringement, licensing, and commercialization matters."
    },
    {
      question: "Do you advise startups?",
      answer:"Yes, we create strategies to protect and monetize IP assets."
    }
  ],
  whychooseus: [
    {
      icon: Scale,
      title: "Global IP Expertise",
      desc: "Aligning protection with international standards."
    },
    {
      icon: Users,
      title: "Tailored Strategies",
      desc: "Personalized guidance for businesses and individuals."
    },
    {
      icon: Award,
      title: "Professional & Reliable",
      desc: "Comprehensive and ethical IP counsel."
    }
  ]
};

const taxLaw = {
  slug: "tax-law",
  title: "Tax Law",
  shortDesc: "Strategic tax planning and representation for individuals and businesses.",
  bannerImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  overview: "Our tax law practice provides comprehensive tax planning, compliance, and dispute resolution services. We help clients navigate complex tax regulations while minimizing liabilities and ensuring compliance.",
  keyServices: [
    "Tax Planning",
    "Tax Compliance",
    "Tax Disputes & Litigation",
    "International Taxation",
    "Corporate Taxation",
    "Individual Taxation",
    "Estate & Gift Tax",
    "Tax Audits & Appeals"
  ],
  industries: [
    "Corporations",
    "Small Businesses",
    "High-Net-Worth Individuals",
    "Non-Profits",
    "International Entities"
  ],
  featuredImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  featuredTitle: "Tax Law Experts",
  featuredSubtitle: "Strategic tax solutions",
  faqs: [
    {
      question: "Do you provide tax advisory services?",
      answer: "Yes, covering GST, corporate tax, income tax, customs, and compliance advisory."
    },
    {
      question: "Can you assist in disputes with authorities?",
      answer: "Yes, representation in audits, appeals, and litigation matters in Courts."
    },
    {
      question: "Do you advise on corporate tax planning?",
      answer:"Yes, ensuring efficiency and compliance across jurisdictions."
    }
  ],
  whychooseus: [
    {
      icon: Scale,
      title: "Strategic Tax Guidance",
      desc: "Insightful planning and compliance solutions."
    },
    {
      icon: Users,
      title: "Client-Focused Advisory",
      desc: "Personalized advice for individuals and businesses."
    },
    {
      icon: Award,
      title: "Professional Standards",
      desc: "Ethical handling of all tax matters."
    }
  ]
};

const contractLaw = {
  slug: "contract-and-agreement-reviewing",
  title: "Contract & Agreement Reviewing",
  shortDesc: "Expert review and drafting of contracts and agreements.",
  bannerImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  overview: "Our contract law practice specializes in drafting, reviewing, and negotiating all types of contracts and agreements. We ensure your interests are protected and your agreements are legally sound and enforceable.",
  keyServices: [
    "Contract Drafting",
    "Contract Review",
    "Contract Negotiation",
    "Employment Agreements",
    "Service Contracts",
    "Non-Disclosure Agreements",
    "Partnership Agreements",
    "Commercial Leases"
  ],
  industries: [
    "All Industries",
    "Small Businesses",
    "Corporations",
    "Startups",
    "Individuals",
    "Technology and IT",
    "Manufacturing & Industrial",
    "Corporate & Professional Services",
    "Real Estate & Infrastructure"
  ],
  featuredImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  featuredTitle: "Contract Law Specialists",
  featuredSubtitle: "Protecting your contractual interests",
  faqs: [
    {
      question: "Do you draft customized agreements?",
      answer: "Yes, tailored to client needs and regulatory compliance."
    },
    {
      question: "Can you review international contracts?",
      answer: "Yes, ensuring enforceability and mitigating risk."
    },
    {
      question: "Do you advise on dispute resolution?",
      answer:"Yes, providing strategic guidance to protect client interests."
    }
  ],
  whychooseus: [
    {
      icon: Scale,
      title: "Meticulous Contract Review",
      desc: "Ensuring clarity and risk management."
    },
    {
      icon: Users,
      title: "Personalized Solutions",
      desc: "Guidance aligned with client objectives."
    },
    {
      icon: Award,
      title: "Professional & Ethical",
      desc: "Transparent and strategic advice."
    }
  ]
};

// Map all practice areas - Updated with correct mapping
const practiceAreasMap = {
  "corporate-law": corporateLaw,
  "criminal-law": criminalLaw,
  "civil-law": civilLaw,
  "family-law": familyLaw,
  "property-law": propertyLaw,
  "arbitration": arbitration,
  "intellectual-property": intellectualProperty,
  "tax-law": taxLaw,
  "contract-and-agreement-reviewing": contractLaw,
  "insurance-law": insuranceLaw,
  "insolvency-bankruptcy-law": insolvencyBankruptcyLaw,
  "labour-employment-law": labourEmploymentLaw,
};

// All practice areas array for listing - Updated with correct areas
const allPracticeAreas = [
  criminalLaw,
  civilLaw,
  corporateLaw,
  familyLaw,
  propertyLaw,
  arbitration,
  intellectualProperty,
  taxLaw,
  contractLaw,
  insuranceLaw,
  insolvencyBankruptcyLaw,
  labourEmploymentLaw,
];

// Practice areas for sidebar - Updated with correct areas
const sidebarPracticeAreas = [
  { name: "Corporate Law", slug: "corporate-law" },
  { name: "Criminal Law", slug: "criminal-law" },
  { name: "Civil Law", slug: "civil-law" },
  { name: "Family Law", slug: "family-law" },
  { name: "Property Law", slug: "property-law" },
  { name: "Arbitration", slug: "arbitration" },
  { name: "Intellectual Property", slug: "intellectual-property" },
  { name: "Tax Law", slug: "tax-law" },
  { name: "Contract & Agreement Reviewing", slug: "contract-and-agreement-reviewing" },
  { name: "Insurance Law", slug: "insurance-law" },
  { name: "Insolvency & Bankruptcy Law", slug: "insolvency-bankruptcy-law" },
  { name: "Labour & Employment Law", slug: "labour-employment-law" }
];

// Why Choose Us data
const whyChooseUs = [
  { icon: Scale, title: "4+ Years Experience", desc: "Decades of combined legal expertise across industries" },
  { icon: Users, title: "Dedicated Team", desc: "Personal attention from senior partners on every case" },
  { icon: Award, title: "Award-Winning Service", desc: "Recognized by leading legal publications" },
  { icon: Briefcase, title: "Proven Results", desc: "Favorable outcomes for clients across practice areas" },
];

// Case Studies data
const caseStudies = [
  {
    id: 1,
    title: "Complex Corporate Merger",
    category: "Corporate Law",
    description: "Successfully negotiated and closed a multi-million dollar merger for a growing technology company.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    result: "Favorable terms for all parties"
  },
  {
    id: 2,
    title: "Criminal Defense Victory",
    category: "Criminal Law",
    description: "Secured acquittal for client in complex white-collar crime case.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    result: "Complete acquittal"
  },
  {
    id: 3,
    title: "Property Dispute Resolution",
    category: "Property Law",
    description: "Successfully resolved boundary dispute through mediation, avoiding costly litigation.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    result: "Favorable settlement reached"
  },
  {
    id: 4,
    title: "Family Law Mediation",
    category: "Family Law",
    description: "Facilitated amicable divorce settlement preserving family relationships.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    result: "Mutually acceptable agreement"
  }
];

// FAQ data
const faqs = [
  {
    question: "What makes your legal practice unique?",
    answer: "Our team combines decades of experience with innovative approaches to complex legal challenges. We've handled matters ranging from individual representation to complex corporate transactions."
  },
  {
    question: "How do you structure legal fees?",
    answer: "We offer flexible fee arrangements including hourly rates, flat fees for specific services, and contingency fees where appropriate. We'll work with you to find the best structure for your needs."
  },
  {
    question: "What practice areas do you specialize in?",
    answer: "We specialize in Criminal Law, Civil Law, Corporate Law, Family Law, Property Law, Arbitration, Intellectual Property, Tax Law, and Contract & Agreement Reviewing."
  },
  {
    question: "How quickly can you respond to urgent matters?",
    answer: "We pride ourselves on rapid response times. Most client inquiries receive initial responses within 2-4 hours, and we're available for emergencies."
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

export const PracticeAreas = () => {
  return (
    <div className="-mt-20">
      {/* Banner Section - Dark Theme with Background Image */}
      <section 
        className="relative w-full bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        {/* Dark Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70"
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
              className="absolute w-1 h-1 bg-gold-400/30 rounded-full"
              style={{ backgroundColor: '#D4AF37' }}
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
                className="h-px bg-gold-500"
                style={{ backgroundColor: '#D4AF37' }}
              />
              <motion.p 
                variants={slideFromLeft}
                className="text-sm uppercase tracking-[0.2em] font-semibold"
                style={{ color: '#D4AF37' }}
              >
                Practice Areas
              </motion.p>
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ delay: 0.6, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const }}
                className="h-px bg-gold-500"
                style={{ backgroundColor: '#D4AF37' }}
              />
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-white"
            >
              Comprehensive <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
                className="italic inline-block"
                style={{ color: '#D4AF37' }}
              >Legal Services</motion.span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto"
            >
              Our attorneys bring deep expertise across a wide range of legal disciplines to serve your needs.
            </motion.p>
          </motion.div>
        </div>

        {/* Decorative bottom gradient */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5 }}
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"
        />
      </section>

      {/* Practice Areas Grid Section - White Theme */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnceMore}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          >
            <motion.div 
              variants={fadeInDown}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                viewport={viewportOnce}
                transition={{ delay: 0.4, duration: 1.2 }}
                className="h-px"
                style={{ backgroundColor: '#D4AF37' }}
              />
              <motion.p 
                variants={slideFromLeft}
                className="text-sm uppercase tracking-[0.2em] font-semibold"
                style={{ color: '#D4AF37' }}
              >
                Our Expertise
              </motion.p>
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                viewport={viewportOnce}
                transition={{ delay: 0.4, duration: 1.2 }}
                className="h-px"
                style={{ backgroundColor: '#D4AF37' }}
              />
            </motion.div>
            
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-heading font-bold text-black mb-4"
            >
              Areas of <span className="text-[#D4AF37] italic">Practice</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPracticeAreas.map((area, i) => (
              <motion.div
                key={area.slug}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnceMore}
                variants={scaleIn}
                transition={{ delay: i * 0.1 }}
                whileHover={{ 
                  y: -10,
                  boxShadow: '0 20px 40px -15px rgba(212, 175, 55, 0.3)',
                  transition: { duration: 0.4 }
                }}
                className="h-full"
              >
                <Link 
                  href={`/practice-areas/${area.slug}`} 
                  className="block p-8 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-gold-500 transition-all duration-500 group h-full"
                >
                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className="text-xl font-heading font-semibold text-black mb-3 group-hover:text-gold-500 transition-colors"
                  >
                    {area.title}
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    className="text-sm text-gray-600 leading-relaxed mb-4"
                  >
                    {area.shortDesc}
                  </motion.p>
                  
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.4 }}
                    className="inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                    style={{ color: '#D4AF37' }}
                  >
                    Learn More 
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const, delay: i * 0.1 }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </motion.span>

                  {/* Animated underline on hover */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    className="h-0.5 mt-4 origin-left"
                    style={{ backgroundColor: '#D4AF37' }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Update the PracticeAreaDetail component to accept slug as a prop
export const PracticeAreaDetail = ({ slug }: { slug: string }) => {
  const [currentCase, setCurrentCase] = useState(0);
  const [selectedArea, setSelectedArea] = useState(slug || "corporate-law");
  
  const area = practiceAreasMap[slug as keyof typeof practiceAreasMap];

  const nextCase = () => {
    setCurrentCase((prev) => (prev + 1) % caseStudies.length);
  };

  const prevCase = () => {
    setCurrentCase((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  const [formData, setFormData] = useState({
    countryCode: "+91",
    name: "",
    email: "",
    phone: "",
    practiceArea: "",
    message: ""
  });

  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // Phone → allow only numbers
    if (name === "phone") {
      const onlyNums = value.replace(/d/g, "");
      setFormData({ ...formData, [name]: onlyNums });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Remove error while typing
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
  let newErrors: any = {};

  if (!formData.name.trim())
    newErrors.name = "Full name is required";

  if (!formData.email.trim())
    newErrors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
    newErrors.email = "Enter valid email";

  if (!formData.phone.trim())
    newErrors.phone = "Phone number is required";
  else if (!/^\d+$/.test(formData.phone))
    newErrors.phone = "Only numbers allowed";

  if (!formData.practiceArea)
    newErrors.practiceArea = "Select practice area";

  if (!formData.message.trim())
    newErrors.message = "Message is required";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = (e: any) => {
  e.preventDefault();

  if (validate()) {
    console.log("Form Submitted:", formData);
    alert("Form submitted successfully ✅");

    setFormData({
      countryCode: "+91",
      name: "",
      email: "",
      phone: "", 
      practiceArea: "",
      message: ""
    });
  }
};

  if (!area) {
    return (
      <div className="section-padding pt-32 text-center min-h-screen">
        <h1 className="text-2xl font-heading font-bold mb-4 text-foreground">Practice Area Not Found</h1>
        <Link href="/practice-areas" className="text-primary hover:text-accent transition-colors">
          ← Back to Practice Areas
        </Link>
      </div>
    );
  }

  return (
    <div className="-mt-20">
      {/* Banner Section - Dark Theme with Background Image */}
      <section 
        className="relative w-full bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: `url('${area.bannerImage}')`,
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
        <div className="relative z-10 container mx-auto px-4 py-32 md:py-40 lg:py-48">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            <motion.div variants={slideFromLeft}>
              <Link href="/practice-areas" className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-8 hover:gap-3 transition-all">
                <ArrowLeft className="w-4 h-4" /> All Practice Areas
              </Link>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-foreground"
            >
              {area.title}
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              {area.shortDesc}
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

      {/* Main Content Section - White Theme */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Sidebar - Sticky */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={scaleIn}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
              >
                <h3 className="text-xl font-heading font-semibold text-black mb-6">Practice Areas</h3>
                <div className="space-y-3">
                  {sidebarPracticeAreas.map((item, index) => (
                    <motion.div
                      key={item.slug}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={`/practice-areas/${item.slug}`}
                        onClick={() => setSelectedArea(item.slug)}
                        className={`block p-4 rounded-lg transition-all duration-300 ${
                          selectedArea === item.slug
                            ? 'bg-primary/10 border-l-4 border-primary'
                            : 'bg-gray-50 hover:bg-primary/5 border-l-4 border-transparent'
                        }`}
                      >
                        <span className={`font-medium ${
                          selectedArea === item.slug ? 'text-primary' : 'text-gray-700'
                        }`}>
                          {item.name}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Consultation Card */}
                <motion.div
                  variants={scaleIn}
                  className="mt-8 p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 pattern-gold opacity-10" />
                  <div className="relative z-10">
                    <h4 className="text-lg font-heading font-semibold text-black mb-3">Free Consultation</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Discuss your legal matter today with our experienced and trusted attorneys.
                    </p>
                    <Button asChild size="lg" className="w-full btn-shine mb-3">
                      <Link href="/contact">Schedule Now</Link>
                    </Button>
                    <a 
                      href="mailto:jashishadvocate@gmail.com"
                      className="text-sm text-primary hover:text-accent transition-colors flex items-center justify-center gap-1"
                    >
                      <Mail className="w-4 h-4" /> jashishadvocate@gmail.com
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-8 space-y-12">
              {/* Overview Section */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={staggerContainer}
                className="bg-white border border-gray-200 rounded-lg p-8"
              >
                <motion.h2 variants={slideFromLeft} className="text-2xl font-heading font-bold text-black mb-6">
                  Overview
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-gray-700 leading-relaxed mb-8">
                  {area.overview}
                </motion.p>

                <motion.h3 variants={slideFromLeft} className="text-xl font-heading font-semibold text-black mb-4">
                  Key Services
                </motion.h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {area.keyServices.map((service, idx) => (
                    <motion.div
                      key={idx}
                      variants={scaleIn}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-gray-700 text-sm">{service}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.h3 variants={slideFromLeft} className="text-xl font-heading font-semibold text-black mb-4">
                  Industries We Serve
                </motion.h3>
                <div className="flex flex-wrap gap-2">
                  {area.industries.map((industry, idx) => (
                    <motion.span
                      key={idx}
                      variants={scaleIn}
                      transition={{ delay: idx * 0.05 }}
                      className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                    >
                      {industry}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Featured Image */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={scaleIn}
                className="relative h-96 rounded-lg overflow-hidden group"
              >
                <Image
                  src={area.featuredImage}
                  alt={area.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-2xl font-heading font-bold text-white mb-2">{area.featuredTitle}</h3>
                  <p className="text-gray-200">{area.featuredSubtitle}</p>
                </div>
              </motion.div>

              {/* Why Choose Us */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={staggerContainer}
                className="bg-white border border-gray-200 rounded-lg p-8"
              >
                <motion.h2 variants={slideFromLeft} className="text-2xl font-heading font-bold text-black mb-6">
                  Why Choose Us
                </motion.h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {area.whychooseus.map((item, idx) => (
                    <motion.div
                      key={idx}
                      variants={scaleIn}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-primary/5 transition-colors duration-500"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold text-black mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* FAQ Section */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={staggerContainer}
                className="bg-white border border-gray-200 rounded-lg p-8"
              >
                <motion.h2 variants={slideFromLeft} className="text-2xl font-heading font-bold text-black mb-6">
                  We're here to answer all your questions!
                </motion.h2>
                <div className="space-y-4">
                  {area.faqs.map((faq, idx) => (
                    <motion.div
                      key={idx}
                      variants={fadeInUp}
                      transition={{ delay: idx * 0.1 }}
                      className="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
                    >
                      <h4 className="font-heading font-semibold text-black mb-2">{faq.question}</h4>
                      <p className="text-sm text-gray-600">{faq.answer}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Case Studies Slider */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={staggerContainer}
                className="bg-white border border-gray-200 rounded-lg p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <motion.h2 variants={slideFromLeft} className="text-2xl font-heading font-bold text-black">
                    Case Studies
                  </motion.h2>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1, backgroundColor: 'hsl(40 70% 50%)', color: 'white' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={prevCase}
                      className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1, backgroundColor: 'hsl(40 70% 50%)', color: 'white' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={nextCase}
                      className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCase}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-50 rounded-lg overflow-hidden"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="h-64 md:h-auto relative">
                        <Image
                          src={caseStudies[currentCase].image}
                          alt={caseStudies[currentCase].title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      <div className="p-6">
                        <span className="text-xs text-primary font-semibold uppercase tracking-wider">
                          {caseStudies[currentCase].category}
                        </span>
                        <h3 className="text-xl font-heading font-semibold text-black mt-2 mb-3">
                          {caseStudies[currentCase].title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {caseStudies[currentCase].description}
                        </p>
                        <div className="flex items-center gap-2 text-primary">
                          <Star className="w-4 h-4 fill-primary" />
                          <span className="text-sm font-medium">{caseStudies[currentCase].result}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-center gap-1 mt-4">
                  {caseStudies.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentCase(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentCase === idx ? 'w-6 bg-primary' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Request a Free Consultation Section - Dark Theme */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 pattern-gold opacity-5" />
        
        <div className="container mx-auto relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnceMore}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          >
            <motion.div 
              variants={fadeInDown}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                viewport={viewportOnce}
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
                viewport={viewportOnce}
                transition={{ delay: 0.4, duration: 1.2 }}
                className="h-px bg-primary"
              />
            </motion.div>
            
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4"
            >
              Request a Free <span className="text-primary">Consultation</span>
            </motion.h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Left Column - Contact Info */}
            <motion.div
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.div variants={scaleIn} className="bg-card border border-border rounded-lg p-6 md:p-8">
                <h3 className="text-xl font-heading font-semibold text-foreground mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">Visit Us</p>
                      <p className="text-sm text-muted-foreground">No. 137, Flat No. F-8, <br />
1st Floor, Appu Manor Apartment, <br />
Perambur Barracks Road, <br />
Purasawalkam, Chennai 600 007.
</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">Call Us</p>
                      <a href="tel:+12125550100" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        7373663555
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">Email Us</p>
                      <a href="mailto:jashishadvocate@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        jashishadvocate@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">Office Hours</p>
                      <p className="text-sm text-muted-foreground">Mon – Fri: 9:00 AM – 7:00 PM</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={scaleIn} className="bg-card border border-border rounded-lg p-6 md:p-8">
                <h3 className="text-xl font-heading font-semibold text-foreground mb-4">Why Choose Us</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm text-muted-foreground">4+ years of combined experience</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm text-muted-foreground">Personal attention from senior partners</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm text-muted-foreground">Free initial consultation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm text-muted-foreground">No win, no fee options available</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              variants={slideFromRight}
              className="bg-card border border-border rounded-lg p-6 md:p-8"
            >
              <h3 className="text-xl font-heading font-semibold text-foreground mb-6">Send us a Message</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your Name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your Email"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                
                <div>
  <label className="text-sm font-medium text-foreground mb-2 block">Phone</label>

  <div className="flex gap-2">

    {/* Country Code */}
    <select
      name="countryCode"
      value={formData.countryCode}
      onChange={handleChange}
      className="px-3 py-3 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary"
    >
      <option value="+91">🇮🇳 +91</option>
      <option value="+1">🇺🇸 +1</option>
      <option value="+44">🇬🇧 +44</option>
      <option value="+61">🇦🇺 +61</option>
      <option value="+971">🇦🇪 +971</option>
      <option value="+65">🇸🇬 +65</option>
    </select>

    {/* Phone Number */}
    <input
      type="tel"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      inputMode="numeric"
      className="flex-1 px-4 py-3 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
      placeholder="Your Phone Number"
    />

  </div>

  {errors.phone && (
    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
  )}
</div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Practice Area *</label>
                  <select
                  name="practiceArea"
                  value={formData.practiceArea}
                  onChange={handleChange}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="">Select a practice area</option>
                    {allPracticeAreas.map(area => (
                      <option key={area.slug} value={area.title}>{area.title}</option>
                    ))}
                  </select>
                  {errors.practiceArea && <p className="text-red-500 text-xs mt-1">{errors.practiceArea}</p>}
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Message *</label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Describe your legal matter..."
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                
                <Button type="submit" size="xl" className="w-full btn-shine">
                  <span className="font-semibold">Submit Request</span>
                  <Send className="w-4 h-4 font-semibold" />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PracticeAreas;