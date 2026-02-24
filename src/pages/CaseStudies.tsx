"use client";

import AnimatedSection from "../components/AnimatedSection";
import Link from "next/link";

const caseStudies = [
  {
    title: "Fortune 500 Merger Defense",
    category: "Corporate Law",
    challenge: "A Fortune 500 company faced a hostile takeover attempt threatening shareholder value and company stability.",
    approach: "Our corporate team developed a multi-pronged defense strategy including poison pill provisions and strategic white knight negotiations.",
    outcome: "Successfully defended against the hostile takeover, preserving company independence and increasing shareholder value by 23%.",
  },
  {
    title: "Landmark Civil Rights Case",
    category: "Litigation",
    challenge: "A class of 500+ employees faced systematic workplace discrimination at a major corporation.",
    approach: "We built a comprehensive case with statistical analysis, witness testimony, and documentary evidence spanning five years.",
    outcome: "Secured a $45M settlement and mandated comprehensive workplace reform, setting a legal precedent in the industry.",
  },
  {
    title: "$200M Real Estate Development",
    category: "Real Estate",
    challenge: "A mixed-use development project faced complex zoning challenges and environmental compliance requirements.",
    approach: "Our team navigated regulatory approvals, negotiated with municipal authorities, and structured innovative financing.",
    outcome: "Project approved and completed on schedule, creating 2,000 jobs and becoming a landmark development in the city.",
  },
  {
    title: "International Custody Resolution",
    category: "Family Law",
    challenge: "A parent faced an international custody dispute involving jurisdictions across three countries.",
    approach: "We leveraged the Hague Convention and coordinated with international counsel to protect our client's parental rights.",
    outcome: "Achieved full custody resolution with favorable terms, ensuring the child's welfare and parent-child relationship.",
  },
];

const CaseStudies = () => {
  return (
    <div>
      <section className="section-alt section-padding pt-32">
        <div className="container mx-auto text-center max-w-3xl">
          <AnimatedSection>
            <p className="text-primary uppercase tracking-[0.2em] text-sm font-semibold mb-4">Case Studies</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Success Stories</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Explore how our expertise and dedication have delivered exceptional results for our clients.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto max-w-4xl space-y-12">
          {caseStudies.map((cs, i) => (
            <AnimatedSection key={cs.title} delay={i * 0.1}>
              <div className="bg-card border border-border rounded-sm p-8 md:p-12 card-hover">
                <span className="text-xs uppercase tracking-widest text-primary font-semibold">{cs.category}</span>
                <h3 className="text-2xl font-heading font-bold mt-2 mb-6">{cs.title}</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-2">Challenge</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cs.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-2">Approach</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cs.approach}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-2">Outcome</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cs.outcome}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="section-alt section-padding text-center">
        <AnimatedSection>
          <h2 className="text-3xl font-heading font-bold mb-6">Have a Case to Discuss?</h2>
          <Link href="/contact" className="inline-block px-10 py-4 bg-primary text-primary-foreground font-semibold rounded-sm hover:bg-accent transition-all btn-shine">
            Schedule a Consultation
          </Link>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default CaseStudies;
