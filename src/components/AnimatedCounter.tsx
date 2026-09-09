import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 1800,
  className = "",
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Extract number and suffix/prefix (e.g. "16+", "100%", "24/7")
          const numericMatch = value.match(/\d+/);
          if (!numericMatch) {
            setDisplayValue(value);
            return;
          }

          const targetNum = parseInt(numericMatch[0], 10);
          const prefix = value.substring(0, numericMatch.index || 0);
          const suffix = value.substring((numericMatch.index || 0) + numericMatch[0].length);

          let startTime: number | null = null;

          const updateCounter = (now: number) => {
            if (!startTime) startTime = now;
            const progress = Math.min((now - startTime) / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentNum = Math.floor(easeOut * targetNum);

            setDisplayValue(`${prefix}${currentNum}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              setDisplayValue(value);
            }
          };

          requestAnimationFrame(updateCounter);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <span ref={ref} className={`inline-block font-bold tracking-tight ${className}`}>
      {hasAnimated ? displayValue : "0"}
    </span>
  );
}
