"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

const THROTTLE_MS = 120;
const VISIBILITY_THRESHOLD = 300;

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const size = 56;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const scrollRef = useRef({ y: 0, height: 0, clientHeight: 0 });
  const visibleRef = useRef(false);
  const throttleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);

  const dashOffset = useSpring(0, { damping: 25, stiffness: 200 });

  const updateProgress = useCallback(() => {
    const { y, height, clientHeight } = scrollRef.current;
    const maxScroll = height - clientHeight;
    const progress = maxScroll > 0 ? y / maxScroll : 0;
    dashOffset.set(circumference * (1 - progress));
  }, [dashOffset, circumference]);

  useEffect(() => {
    const readDimensions = () => {
      scrollRef.current = {
        y: window.scrollY,
        height: document.documentElement.scrollHeight,
        clientHeight: document.documentElement.clientHeight,
      };
    };

    const onScrollOrResize = () => {
      readDimensions();
      if (throttleRef.current !== null) return;
      throttleRef.current = setTimeout(() => {
        throttleRef.current = null;
        const nowVisible = scrollRef.current.y > VISIBILITY_THRESHOLD;
        if (nowVisible !== visibleRef.current) {
          visibleRef.current = nowVisible;
          setIsVisible(nowVisible);
        }
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null;
          updateProgress();
        });
      }, THROTTLE_MS);
    };

    readDimensions();
    visibleRef.current = scrollRef.current.y > VISIBILITY_THRESHOLD;
    setIsVisible(visibleRef.current);
    updateProgress();

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (throttleRef.current) clearTimeout(throttleRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, y: 20 }}
      transition={{ duration: 0.3 }}
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 group cursor-pointer outline-none"
      aria-label="Scroll to top"
    >
      <div className="relative flex items-center justify-center">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-gray-200 dark:text-gray-700"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{ strokeDashoffset: dashOffset }}
            className="text-primary"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all duration-300 group-hover:scale-110">
            <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
          </div>
        </div>
      </div>
    </motion.button>
  );
};

export default ScrollToTop;
