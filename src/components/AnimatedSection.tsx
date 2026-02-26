"use client";

import { motion } from "framer-motion";
import { ReactNode, useMemo } from "react";
import { viewportOnce, defaultTransition, getInitialPosition } from "@/lib/animations";

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
  direction = "up",
}: AnimatedSectionProps) => {
  const initial = useMemo(() => getInitialPosition(direction), [direction]);
  const transition = useMemo(
    () => ({ ...defaultTransition, delay }),
    [delay]
  );

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={viewportOnce}
      transition={transition}
      layout={false}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
