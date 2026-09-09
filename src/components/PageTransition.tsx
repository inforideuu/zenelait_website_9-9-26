import { useRouterState } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <div
      key={pathname}
      className="animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out"
    >
      {children}
    </div>
  );
}
