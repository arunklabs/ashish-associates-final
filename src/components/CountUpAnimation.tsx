import { useEffect, useRef, useState } from "react";

const TICK_MS = 50;
const MIN_STEP = 1;

const CountUpAnimation = ({
  targetNumber,
  duration = 2,
  delay = 0,
  suffix = "",
}: {
  targetNumber: number;
  duration?: number;
  delay?: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const lastDisplayRef = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    const el = countRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  useEffect(() => {
    if (!inView) return;

    const durationMs = duration * 1000;
    const delayMs = delay * 1000;
    const startTime = performance.now();
    let tickId: ReturnType<typeof setInterval>;

    const tick = () => {
      const elapsed = performance.now() - startTime;
      if (elapsed < delayMs) return;
      const progress = Math.min((elapsed - delayMs) / durationMs, 1);
      const easeOutQuart = 1 - (1 - progress) ** 4;
      const value = Math.floor(easeOutQuart * targetNumber);
      if (value !== lastDisplayRef.current && (value - lastDisplayRef.current >= MIN_STEP || value === targetNumber)) {
        lastDisplayRef.current = value;
        setCount(value);
      }
      if (progress < 1) tickId = setInterval(tick, TICK_MS);
      else setCount(targetNumber);
    };

    tickId = setInterval(tick, TICK_MS);
    return () => clearInterval(tickId);
  }, [inView, targetNumber, duration, delay]);

  return (
    <span ref={countRef}>
      {count}
      {suffix}
    </span>
  );
};

export default CountUpAnimation;
