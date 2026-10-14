import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Sparkles,
  ArrowRight,
  Gauge,
  TrendingUp,
  Sliders,
  CheckCircle2,
  XCircle,
  Zap,
  Globe,
  Palette,
  Film,
  Layers,
  ArrowLeftRight,
  Eye,
  Smartphone,
  ShieldCheck,
  MousePointerClick
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

export type DemoTabKey = "webapp" | "graphic" | "video";

export interface DemoPreset {
  id: DemoTabKey;
  label: string;
  badge: string;
  headline: string;
  subheadline: string;
  before: {
    title: string;
    description: string;
    image: string;
    metrics: { label: string; value: string; negative?: boolean }[];
    problems: string[];
  };
  after: {
    title: string;
    description: string;
    image: string;
    metrics: { label: string; value: string }[];
    benefits: string[];
  };
}

export const DEMO_PRESETS: Record<DemoTabKey, DemoPreset> = {
  webapp: {
    id: "webapp",
    label: "Web App & Portal",
    badge: "Full-Stack Web Engineering",
    headline: "Legacy, Bloated Code vs. Glassmorphic Next.js Engineering",
    subheadline: "See how modern architecture, edge rendering, and micro-interactions turn high-bounce websites into 3x revenue conversion engines.",
    before: {
      title: "without zenelait InfoTech (Outdated Web App)",
      description: "Cluttered PHP/monolith with slow database calls, 4.8s initial load, high layout shifts, and frustrated users.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
      metrics: [
        { label: "Lighthouse Performance", value: "38 / 100", negative: true },
        { label: "Page Load Time", value: "4.8s Delay", negative: true },
        { label: "Conversion Rate", value: "0.9% Average", negative: true },
      ],
      problems: [
        "Janky mobile responsiveness and layout shift (CLS: 0.42)",
        "Outdated jQuery libraries & security vulnerabilities",
        "Zero conversion funnel optimization or user retention tracking"
      ]
    },
    after: {
      title: "with zenelait InfoTech (Modern Glassmorphic Web App)",
      description: "Next.js 15, edge API routes, glassmorphic dark-mode aesthetics, sub-second TTFB, and seamless frictionless user onboarding.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
      metrics: [
        { label: "Lighthouse Performance", value: "99 / 100" },
        { label: "Page Load Time", value: "0.6s Instant" },
        { label: "Conversion Rate", value: "3.4x Lift (3.1%)" },
      ],
      benefits: [
        "Sub-second edge caching & zero layout shifts (CLS: 0.00)",
        "Modern glassmorphism UI tailored for corporate trust",
        "Real-time event analytics tracking every pipeline step"
      ]
    }
  },
  graphic: {
    id: "graphic",
    label: "Graphic Design & Branding",
    badge: "Visual Brand Identity",
    headline: "Generic Stock Graphics vs. Premium Bespoke Art Direction",
    subheadline: "Witness the contrast between cheap Canva template clutter and high-authority enterprise design that justifies premium market pricing.",
    before: {
      title: "without zenelait InfoTech (Generic Crowdsourced Designs)",
      description: "Inconsistent color palettes, generic stock vector illustrations, and crowded typography that devalues the enterprise brand.",
      image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&auto=format&fit=crop&q=80",
      metrics: [
        { label: "Ad Click-Through (CTR)", value: "0.8% CTR", negative: true },
        { label: "Brand Recall Rate", value: "Low / Generic", negative: true },
        { label: "Customer Trust Perception", value: "Unverified", negative: true },
      ],
      problems: [
        "Template graphics identical to 50+ competitors",
        "Disjointed brand assets across web, print, and social",
        "Fails to communicate luxury or enterprise-level reliability"
      ]
    },
    after: {
      title: "with zenelait InfoTech (Tailored 3D & Vector Art Direction)",
      description: "Custom 3D renders, cohesive Pantone design systems, bespoke typography hierarchy, and arresting social creatives.",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&auto=format&fit=crop&q=80",
      metrics: [
        { label: "Ad Click-Through (CTR)", value: "3.6% CTR (4.5x)" },
        { label: "Brand Recall Rate", value: "94% High Recall" },
        { label: "Customer Trust Perception", value: "Enterprise Tier" },
      ],
      benefits: [
        "100% bespoke vector & 3D assets with full copyright transfer",
        "Harmonized Figma design tokens across all marketing collateral",
        "Elevates willingness-to-pay and commands premium market rates"
      ]
    }
  },
  video: {
    id: "video",
    label: "Video Production & Ads",
    badge: "Cinematic Media Production",
    headline: "Flat Slideshow Ads vs. 4K Cinema-Grade Storytelling",
    subheadline: "Compare flat amateur video clips with scripted 4K commercial direction, sound design, and viral short-form retention pacing.",
    before: {
      title: "without zenelait InfoTech (Flat DIY Footage)",
      description: "Grainy phone video, muffled audio, robotic AI voiceovers, and weak 3-second hook leading to immediate viewer drop-off.",
      image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1200&auto=format&fit=crop&q=80",
      metrics: [
        { label: "3-Sec Hook Retention", value: "18% Dropoff", negative: true },
        { label: "Average Watch Time", value: "4.2 Seconds", negative: true },
        { label: "Cost Per Acquisition (CPA)", value: "High / Inefficient", negative: true },
      ],
      problems: [
        "82% of viewers scroll away within the first 3 seconds",
        "Muffled unmastered audio destroys brand credibility",
        "No clear emotional narrative arc or compelling call-to-action"
      ]
    },
    after: {
      title: "with zenelait InfoTech (4K Color Graded Masterpiece)",
      description: "Studio lighting, RED/Sony FX 4K footage, professional voice actors, kinetic subtitles, and sound-designed retention pacing.",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&auto=format&fit=crop&q=80",
      metrics: [
        { label: "3-Sec Hook Retention", value: "68% Hook Rate" },
        { label: "Average Watch Time", value: "24.5 Seconds" },
        { label: "Cost Per Acquisition (CPA)", value: "-52% Lower CPA" },
      ],
      benefits: [
        "High-energy opening hook keeping 68%+ of social viewers watching",
        "Dolby-level studio sound mixing, foley, and licensed audio score",
        "Formatted for 9:16 Reels/Shorts and 16:9 4K corporate showcases"
      ]
    }
  }
};

interface DemoSandboxProps {
  initialTab?: DemoTabKey;
  className?: string;
}

export function InteractiveDemoSandbox({
  initialTab = "webapp",
  className = "",
}: DemoSandboxProps) {
  const [activeTab, setActiveTab] = useState<DemoTabKey>(initialTab);
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const preset = DEMO_PRESETS[activeTab] || DEMO_PRESETS.webapp;

  const handleSliderMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPos(percent);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleSliderMove(e.clientX);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  return (
    <section className={`relative overflow-hidden py-20 lg:py-28 bg-surface/40 border-y border-border/80 ${className}`} id="demo-sandbox">
      {/* Background Lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-primary/10 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 right-10 size-[500px] rounded-full bg-rose-500/10 blur-[130px]" />

      <div className="container-x relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-md mb-4">
              <Sliders className="size-3.5" />
              <span>Interactive Before vs. After Proof</span>
            </div>
          </Reveal>

          <Reveal delay={100} direction="up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
              See the Tangible Impact: <span className="text-primary">Without vs. with zenelait InfoTech</span>
            </h2>
          </Reveal>

          <Reveal delay={200} direction="up">
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-lg font-medium leading-relaxed">
              Drag the interactive slider to compare outdated legacy standards against Zenelait InfoTech's high-performance engineering, glassmorphism UI, and ROI velocity.
            </p>
          </Reveal>
        </div>

        {/* Tab Selection Switcher */}
        <Reveal delay={250} direction="up" className="mt-10">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {(Object.keys(DEMO_PRESETS) as DemoTabKey[]).map((tabKey) => {
              const tab = DEMO_PRESETS[tabKey];
              const isSelected = activeTab === tabKey;
              return (
                <button
                  key={tabKey}
                  type="button"
                  onClick={() => {
                    setActiveTab(tabKey);
                    setSliderPos(50);
                  }}
                  className={`flex items-center gap-2.5 rounded-2xl px-5 py-3 text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${isSelected
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105 ring-2 ring-primary/40"
                    : "bg-card hover:bg-accent text-muted-foreground hover:text-foreground border border-border/80 shadow-xs"
                    }`}
                >
                  {tabKey === "webapp" && <Globe className="size-4" />}
                  {tabKey === "graphic" && <Palette className="size-4" />}
                  {tabKey === "video" && <Film className="size-4" />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Main Interactive Sandbox Showcase */}
        <Reveal delay={300} direction="up" className="mt-10">
          <div className="rounded-3xl border border-border/90 bg-card p-6 sm:p-8 lg:p-10 shadow-2xl">
            {/* Header Description of the active preset */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/70">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary bg-primary/10 px-3.5 py-1 rounded-full border border-primary/30">
                  {preset.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight mt-2">
                  {preset.headline}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl font-normal leading-relaxed">
                  {preset.subheadline}
                </p>
              </div>

              {/* Slider instruction pill */}
              <div className="shrink-0 flex items-center gap-2 text-xs font-bold text-muted-foreground bg-surface px-3.5 py-2 rounded-xl border border-border/80">
                <MousePointerClick className="size-4 text-primary animate-bounce" />
                <span>Drag slider to compare</span>
              </div>
            </div>

            {/* Comparison Image Slider Canvas */}
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onClick={(e) => handleSliderMove(e.clientX)}
              className="relative mt-8 h-[380px] sm:h-[480px] lg:h-[540px] w-full overflow-hidden rounded-2xl select-none cursor-ew-resize border border-border/90 shadow-inner group"
            >
              {/* Layer 1: AFTER Image (Background full width) */}
              <div className="absolute inset-0 size-full">
                <img
                  src={preset.after.image}
                  alt={preset.after.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Floating "AFTER" Badge Label */}
                <div className="absolute top-5 right-5 z-20">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 text-white font-bold text-xs uppercase tracking-wider px-4 py-1.5 shadow-lg backdrop-blur-md">
                    <Sparkles className="size-3.5" />
                    with zenelait InfoTech
                  </span>
                </div>

                {/* Floating After Highlights (Bottom Right) */}
                <div className="absolute bottom-6 right-6 z-20 max-w-xs text-right hidden sm:block">
                  <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest block">
                    High Performance
                  </span>
                  <p className="text-white font-black tracking-tight text-sm leading-tight mt-0.5">
                    {preset.after.title}
                  </p>
                  <p className="text-white/80 text-xs mt-1 leading-relaxed font-normal line-clamp-2">
                    {preset.after.description}
                  </p>
                </div>
              </div>

              {/* Layer 2: BEFORE Image (Clipped by sliderPos width) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <div
                  className="absolute inset-0 h-full"
                  style={{
                    width: containerRef.current ? `${containerRef.current.clientWidth}px` : "100%",
                  }}
                >
                  <img
                    src={preset.before.image}
                    alt={preset.before.title}
                    className="h-full w-full object-cover filter grayscale contrast-125 brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

                  {/* Floating "BEFORE" Badge Label */}
                  <div className="absolute top-5 left-5 z-20">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-600/90 text-white font-bold text-xs uppercase tracking-wider px-4 py-1.5 shadow-lg backdrop-blur-md">
                      <XCircle className="size-3.5" />
                      without zenelait InfoTech
                    </span>
                  </div>

                  {/* Floating Before Highlights (Bottom Left) */}
                  <div className="absolute bottom-6 left-6 z-20 max-w-xs text-left hidden sm:block">
                    <span className="text-rose-400 font-bold text-xs uppercase tracking-widest block">
                      Legacy Standard
                    </span>
                    <p className="text-white font-black tracking-tight text-sm leading-tight mt-0.5">
                      {preset.before.title}
                    </p>
                    <p className="text-white/80 text-xs mt-1 leading-relaxed font-normal line-clamp-2">
                      {preset.before.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* The Draggable Divider Line & Handle */}
              <div
                className="absolute top-0 bottom-0 z-30 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-11 rounded-full bg-white text-slate-900 shadow-2xl flex items-center justify-center border-2 border-primary cursor-ew-resize transition-transform group-hover:scale-110 active:scale-95">
                  <ArrowLeftRight className="size-5 stroke-[2.5] text-primary" />
                </div>
              </div>
            </div>

            {/* Comparative KPI Metrics Bar Below */}
            <div className="mt-8 grid gap-6 md:grid-cols-2 pt-6 border-t border-border/70">
              {/* Before Column Metrics */}
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XCircle className="size-4 text-rose-500" />
                    <h4 className="font-black text-sm text-foreground tracking-tight">
                      without zenelait InfoTech Metrics
                    </h4>
                  </div>
                  <span className="text-[11px] font-bold uppercase text-rose-500 tracking-wider">
                    High Friction
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {preset.before.metrics.map((m) => (
                    <div key={m.label} className="p-3 rounded-xl bg-card border border-rose-500/15 text-center">
                      <p className="text-base sm:text-lg font-black text-rose-500 tracking-tight">
                        {m.value}
                      </p>
                      <p className="text-[11px] font-semibold text-muted-foreground mt-0.5 leading-tight">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>

                <ul className="space-y-1.5 pt-2 border-t border-rose-500/15 text-xs text-muted-foreground font-normal">
                  {preset.before.problems.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold shrink-0">✕</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* After Column Metrics */}
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-emerald-500" />
                    <h4 className="font-black text-sm text-foreground tracking-tight">
                      with zenelait InfoTech Results
                    </h4>
                  </div>
                  <span className="text-[11px] font-bold uppercase text-emerald-500 tracking-wider">
                    Verified Lift
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {preset.after.metrics.map((m) => (
                    <div key={m.label} className="p-3 rounded-xl bg-card border border-emerald-500/20 text-center">
                      <p className="text-base sm:text-lg font-black text-emerald-500 tracking-tight">
                        {m.value}
                      </p>
                      <p className="text-[11px] font-semibold text-muted-foreground mt-0.5 leading-tight">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>

                <ul className="space-y-1.5 pt-2 border-t border-emerald-500/15 text-xs text-muted-foreground font-normal">
                  {preset.after.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-foreground/90 font-medium">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Proof Action Banner */}
            <div className="mt-8 pt-6 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Zap className="size-5" />
                </div>
                <div>
                  <h5 className="font-black text-sm sm:text-base text-foreground tracking-tight">
                    Ready to upgrade your brand or platform to Zenelait InfoTech standards?
                  </h5>
                  <p className="text-xs sm:text-sm text-muted-foreground font-normal">
                    Get an itemized visual and technical audit of your current digital presence.
                  </p>
                </div>
              </div>

              <Link
                to="/contact"
                className="button-shine w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary via-red-600 to-rose-600 px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-bold text-primary-foreground shadow-xl shadow-primary/25 transition-all duration-300 hover:scale-[1.02]"
              >
                <span>Upgrade Your Platform ➔</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
