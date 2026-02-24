import { useEffect, useRef, useState } from "react";

// CountUp Animation Component
const CountUpAnimation = ({ targetNumber, duration = 2, delay = 0, suffix = "" }: { 
  targetNumber: number; 
  duration?: number; 
  delay?: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;

      if (elapsedTime >= delay * 1000) {
        const progress = Math.min((elapsedTime - delay * 1000) / (duration * 1000), 1);
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOutQuart * targetNumber));
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(targetNumber);
        }
      } else {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [inView, targetNumber, duration, delay]);

  return <span ref={countRef}>{count}{suffix}</span>;
};

export default CountUpAnimation;