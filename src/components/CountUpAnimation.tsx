import { useEffect, useRef, useState } from "react";

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

    const effectiveDuration =
      targetNumber <= 10 ? Math.min(duration, 0.4) : duration;
    const durationMs = effectiveDuration * 1000;
    const delayMs = delay * 1000;
    const startTime = performance.now();
    let animationFrameId: number;

    const tick = () => {
      const elapsed = performance.now() - startTime;
      if (elapsed < delayMs) {
        animationFrameId = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min((elapsed - delayMs) / durationMs, 1);
      const easeOutQuart = 1 - (1 - progress) ** 4;
      const displayValue = Math.min(
        Math.floor(easeOutQuart * targetNumber),
        targetNumber
      );

      if (displayValue !== lastDisplayRef.current) {
        lastDisplayRef.current = displayValue;
        setCount(displayValue);
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        setCount(targetNumber);
        lastDisplayRef.current = targetNumber;
      }
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [inView, targetNumber, duration, delay]);

  return (
    <span ref={countRef}>
      {count}
      {suffix}
    </span>
  );
};

export default CountUpAnimation;
