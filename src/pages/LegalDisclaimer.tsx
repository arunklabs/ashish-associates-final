"use client";

import AnimatedSection from "../components/AnimatedSection";

const LegalDisclaimer = () => (
  <div className="section-padding pt-32">
    <div className="container mx-auto max-w-3xl">
      <AnimatedSection>
        <h1 className="text-4xl font-heading font-bold mb-8">Legal Disclaimer</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed text-sm">
          <p>Last updated: February 2026</p>
          <h2 className="text-xl font-heading font-semibold text-foreground mt-8">No Attorney-Client Relationship</h2>
          <p>The information on this website is for general informational purposes only and does not constitute legal advice. Use of this website does not create an attorney-client relationship between you and J. Ashish Associates LLP.</p>
          <h2 className="text-xl font-heading font-semibold text-foreground mt-8">No Guarantee of Results</h2>
          <p>Past results do not guarantee future outcomes. Each legal matter is unique, and the outcome of your case will depend on its specific facts and circumstances.</p>
          <h2 className="text-xl font-heading font-semibold text-foreground mt-8">Third-Party Links</h2>
          <p>This website may contain links to third-party websites. We are not responsible for the content or privacy practices of those sites.</p>
          <h2 className="text-xl font-heading font-semibold text-foreground mt-8">Jurisdictional Issues</h2>
          <p>This website is not intended to solicit clients in jurisdictions where our attorneys are not licensed to practice law.</p>
        </div>
      </AnimatedSection>
    </div>
  </div>
);

export default LegalDisclaimer;
