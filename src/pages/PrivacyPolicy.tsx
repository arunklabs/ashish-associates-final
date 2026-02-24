"use client";

import AnimatedSection from "../components/AnimatedSection";

const PrivacyPolicy = () => (
  <div className="section-padding pt-32">
    <div className="container mx-auto max-w-3xl">
      <AnimatedSection>
        <h1 className="text-4xl font-heading font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed text-sm">
          <p>Last updated: February 2026</p>
          <h2 className="text-xl font-heading font-semibold text-foreground mt-8">Information We Collect</h2>
          <p>We collect information you provide directly, such as when you fill out a contact form, request a consultation, or communicate with us. This may include your name, email address, phone number, and details about your legal matter.</p>
          <h2 className="text-xl font-heading font-semibold text-foreground mt-8">How We Use Your Information</h2>
          <p>We use the information we collect to respond to your inquiries, provide legal services, improve our website, and communicate with you about our services. We do not sell your personal information to third parties.</p>
          <h2 className="text-xl font-heading font-semibold text-foreground mt-8">Data Security</h2>
          <p>We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>
          <h2 className="text-xl font-heading font-semibold text-foreground mt-8">Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at privacy@lexington.law.</p>
        </div>
      </AnimatedSection>
    </div>
  </div>
);

export default PrivacyPolicy;
