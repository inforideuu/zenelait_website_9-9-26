import { useEffect, useRef, useState } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  highlightWords?: string[];
  highlightClass?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function TextReveal({
  text,
  className = "",
  delay = 0,
  staggerDelay = 60,
  highlightWords = [],
  highlightClass = "italic text-primary",
  as: Component = "h1",
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <Component ref={containerRef as any} className={`inline-wrap ${className}`}>
      {words.map((word, index) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "");
        const isHighlight = highlightWords.some(
          (hw) => hw.toLowerCase() === cleanWord.toLowerCase()
        );
        const itemDelay = delay + index * staggerDelay;

        return (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-hidden py-1 pr-[0.25em]"
          >
            <span
              className={`inline-block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isHighlight ? highlightClass : ""
              }`}
              style={{
                transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,100%,0)",
                opacity: isVisible ? 1 : 0,
                transitionDelay: `${itemDelay}ms`,
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </Component>
  );
}
