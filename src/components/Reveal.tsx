import { useEffect, useRef, useState, type ReactNode } from "react";

export type Direction = "up" | "down" | "left" | "right" | "zoom";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
  duration?: number;
  once?: boolean;
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  duration = 700,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            if (once) io.disconnect();
          } else if (!once) {
            setShown(false);
          }
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -10px 0px" }
    );

    io.observe(el);

    return () => {
      io.disconnect();
    };
  }, [once]);

  const getDirectionClass = () => {
    switch (direction) {
      case "down":
        return "reveal-down";
      case "left":
        return "reveal-left";
      case "right":
        return "reveal-right";
      case "zoom":
        return "reveal-zoom";
      default:
        return "reveal";
    }
  };

  return (
    <div
      ref={ref}
      className={`${getDirectionClass()} ${shown ? "reveal-in" : ""} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}
