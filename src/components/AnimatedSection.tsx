// AnimatedSection.tsx
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const AnimatedSection = ({ 
  children, 
  className = "", 
  delay = 0, 
  direction = "up" 
}: AnimatedSectionProps) => {
  
  const getInitialPosition = () => {
    switch(direction) {
      case "left": return { opacity: 0, x: -80 };
      case "right": return { opacity: 0, x: 80 };
      case "up": return { opacity: 0, y: 60 };
      case "down": return { opacity: 0, y: -60 };
      default: return { opacity: 0, y: 40 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;