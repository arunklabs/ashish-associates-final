"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { viewportOnceMore, staggerContainer, slideFromLeft, slideFromRight } from "@/lib/animations";

const testimonials = [
  { name: "James Morrison", role: "CEO, Morrison Holdings", text: "J. Ashish Associates LLP provided exceptional counsel during our $50M acquisition. Their attention to detail was unmatched.", rating: 5, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop" },
  { name: "Sarah Chen", role: "Founder, TechVentures", text: "Their corporate team guided us through complex regulatory challenges with remarkable expertise and professionalism.", rating: 5, image: "https://images.unsplash.com/photo-1761839259484-4741afbbdcbf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Robert Williams", role: "Real Estate Developer", text: "I've worked with many law firms over 20 years. Lexington stands apart in their commitment to client success.", rating: 5, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop" },
  { name: "Elizabeth Parker", role: "CFO, Parker Industries", text: "The level of dedication and legal acumen displayed by their team is truly exceptional.", rating: 5, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop" },
];

export default function IndexTestimonialsSection() {
  return (
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
          animate={{ scale: [1, 1.2, 1], x: [0, 80, 0], y: [0, -80, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" as const }}
          className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.25, 1], x: [0, -80, 0], y: [0, 80, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" as const }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
      </motion.div>
      <div className="container mx-auto relative z-10">
        <motion.div variants={staggerContainer} className="text-center mb-16">
          <motion.div variants={slideFromLeft} className="flex items-center justify-center gap-4 mb-4">
            <span className="w-12 h-px bg-primary" />
            <span className="text-primary uppercase tracking-[0.2em] text-sm font-semibold">Testimonials</span>
            <span className="w-12 h-px bg-primary" />
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
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image src={t.image} alt={t.name} fill className="rounded-full object-cover border-2 border-primary" sizes="64px" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic flex-grow">"{t.text}"</p>
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, j) => (
                    <motion.div key={j} initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: j * 0.1, duration: 0.5 }}>
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
  );
}
