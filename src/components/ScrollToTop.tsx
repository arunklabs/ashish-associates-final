// components/ScrollToTopAlt.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  // Circle dimensions
  const size = 56;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  // Spring for smooth progress animation
  const dashOffset = useSpring(0, {
    damping: 25,
    stiffness: 200,
  });

  useEffect(() => {
    const updateDimensions = () => {
      setScrollY(window.scrollY);
      setScrollHeight(document.documentElement.scrollHeight);
      setClientHeight(document.documentElement.clientHeight);
    };

    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      updateDimensions();
    };

    window.addEventListener("scroll", toggleVisibility);
    window.addEventListener("resize", updateDimensions);

    updateDimensions();
    toggleVisibility();

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Calculate scroll progress
  const scrollProgress =
    scrollHeight > clientHeight
      ? scrollY / (scrollHeight - clientHeight)
      : 0;

  // Update dash offset reactively
  useEffect(() => {
    dashOffset.set(circumference * (1 - scrollProgress));
  }, [scrollProgress, dashOffset, circumference]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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

        {/* Progress Circle */}
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-gray-200 dark:text-gray-700"
          />

          {/* Animated Progress */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{
              strokeDashoffset: dashOffset,
            }}
            className="text-primary"
          />
        </svg>

        {/* Inner Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all duration-300 group-hover:scale-110">
            <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {/* <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-gray-900 text-white text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap">
          Scroll to top
          <div className="absolute -bottom-1 right-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
        </div>
      </div> */}
    </motion.button>
  );
};

export default ScrollToTop;