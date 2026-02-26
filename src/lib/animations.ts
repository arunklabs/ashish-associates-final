/**
 * Central animation config for consistent duration, easing, viewport, and variants.
 * Used by AnimatedSection, Index, PracticeAreas, and other scroll-triggered motion.
 */

import type { Variants } from "framer-motion";

// Durations (seconds)
export const durationFast = 0.3;
export const durationNormal = 0.5;
export const durationSlow = 0.8;
export const durationSlower = 1.2;

// Easing (cubic-bezier)
export const easeDefault = [0.25, 0.1, 0.25, 1] as const;
export const easeEntrance = [0.25, 0.46, 0.45, 0.94] as const;

// Viewport for scroll-triggered animations (no negative margin to avoid re-trigger on fast scroll)
export const viewportOnce = { once: true, amount: 0.15 } as const;
export const viewportOnceMore = { once: true, amount: 0.2 } as const;

// Reusable Framer variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durationNormal, ease: easeDefault },
  },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: durationSlower, ease: easeDefault },
  },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: durationSlower, ease: easeDefault },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.4,
      ease: easeDefault,
    },
  },
};

export const fadeSoft: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: durationSlower, ease: easeDefault },
  },
};

// For AnimatedSection: initial positions by direction (memoizable)
export const getInitialPosition = (direction: "up" | "down" | "left" | "right") => {
  switch (direction) {
    case "left":
      return { opacity: 0, x: -80 };
    case "right":
      return { opacity: 0, x: 80 };
    case "up":
      return { opacity: 0, y: 60 };
    case "down":
      return { opacity: 0, y: -60 };
    default:
      return { opacity: 0, y: 40 };
  }
};

export const defaultTransition = {
  duration: durationSlow,
  ease: easeEntrance,
};
