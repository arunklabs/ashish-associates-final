// CounterAnimation.tsx
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface CounterAnimationProps {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
  theme?: "dark" | "light";
}

const CounterAnimation = ({ end, suffix = "", label, duration = 2, theme = "dark" }: CounterAnimationProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const increment = end / (duration * 60);
    let timer: NodeJS.Timeout;
    
    const updateCount = () => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    };
    
    timer = setInterval(updateCount, 1000 / 60);
    
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center group"
    >
      <div className="relative">
        <div className={`text-4xl md:text-5xl font-heading font-bold mb-2 group-hover:scale-110 transition-transform duration-300 ${
          theme === "dark" ? "text-primary" : "text-[#C9A646]"
        }`}>
          {count}{suffix}
        </div>
      </div>
      <div className={`text-sm uppercase tracking-widest mt-4 ${
        theme === "dark" ? "text-muted-foreground" : "text-gray-600"
      }`}>
        {label}
      </div>
    </motion.div>
  );
};

export default CounterAnimation;