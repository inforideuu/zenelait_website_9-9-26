import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import logo from "@/assets/zenelait-logo.png.asset.json";
import { DemoModal } from "@/components/DemoModal";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/it-products", label: "IT Products" },
  { to: "/marketing", label: "Marketing Services" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
  { to: "/login", label: "Admin Login" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border/80 bg-background/95 backdrop-blur-2xl shadow-lg py-3"
            : "border-b border-border/40 bg-background/90 backdrop-blur-xl py-4"
        }`}
      >
        <div className="container-x grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:flex lg:justify-between">
          <Link
            to="/"
            className="group relative flex min-w-0 items-center overflow-hidden"
            onClick={() => setOpen(false)}
          >
            <div className="relative flex h-9 w-[180px] items-center overflow-hidden sm:h-11 sm:w-[220px]">
              {/* Normal Logo */}
              <img
                src="/logo.png"
                alt="Zenelait Infotech"
                width={1250}
                height={490}
                className="h-full w-auto max-w-full object-contain object-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full"
              />

              {/* Hover Logo */}
              <img
                src="/zenelaitinfotech_logo.png"
                alt="Zenelait Infotech"
                width={2250}
                height={250}
                className="absolute inset-0 h-full w-auto max-w-full object-contain object-left translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => {
              const isActive =
                item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative py-1 text-[0.98rem] font-medium transition-colors duration-300 hover:text-primary ${
                    isActive ? "text-primary font-semibold" : "text-foreground/80"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] rounded-full bg-gradient-to-r from-primary to-rose-500 shadow-[0_0_8px_rgba(225,29,72,0.6)] animate-pulse-glow" />
                  )}
                </Link>
              );
            })}

            <button
              type="button"
              onClick={() => setIsDemoModalOpen(true)}
              className="button-shine group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-primary via-red-600 to-rose-600 px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-lift)] transition-all duration-300 hover:scale-[1.05] hover:shadow-red-500/30 cursor-pointer"
            >
              <Sparkles className="size-4 animate-spin-slow" />
              <span>Get a Demo</span>
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </nav>

          {/* Mobile Hamburger */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            className="shrink-0 rounded-lg border border-border bg-card/80 p-2 text-foreground transition-transform active:scale-95 lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile Drawer Navigation */}
        {open && (
          <nav className="animate-in slide-in-from-top-4 duration-300 border-t border-border/80 bg-background/95 backdrop-blur-2xl lg:hidden">
            <div className="container-x flex flex-col space-y-1 py-4">
              {nav.map((item, index) => {
                const isActive =
                  item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-all ${
                      isActive
                        ? "bg-primary/10 text-primary font-bold"
                        : "text-foreground/80 hover:bg-accent hover:text-foreground"
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="h-2 w-2 rounded-full bg-primary" />}
                  </Link>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setIsDemoModalOpen(true);
                }}
                className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-primary py-3 text-center font-semibold text-primary-foreground shadow-md transition-transform active:scale-95 cursor-pointer w-full"
              >
                <Sparkles className="size-4" />
                <span>Get a Demo</span>
              </button>
            </div>
          </nav>
        )}
      </header>

      {/* Demo Modal Overlay */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </>
  );
}
