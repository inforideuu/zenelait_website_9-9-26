import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Search,
  PenTool,
  Code2,
  ShieldCheck,
  Rocket,
  Users,
  Briefcase,
  Clock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Zap,
  Layers
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Strategy",
    copy: "In-depth workflow mapping, system architecture audit, and technical roadmap planning.",
    icon: Search,
    duration: "1-2 Weeks",
    badge: "Milestone 1",
    badgeBg: "bg-[#ff5252]",
    badgeRing: "border-[#ff5252]/40",
    auraBg: "bg-rose-500/10",
    iconBg: "bg-rose-50 dark:bg-rose-950/40",
    iconColor: "text-[#ff5252]",
    lineColor: "bg-[#ff5252]",
    bottomBorder: "bg-[#ff5252]",
    waveStroke: "#ff5252",
    hoverShadow: "hover:shadow-[0_20px_45px_rgba(255,82,82,0.22)]",
  },
  {
    step: "02",
    title: "UI/UX & Prototyping",
    copy: "Interactive wireframes, design systems, and clickable high-fidelity prototypes.",
    icon: PenTool,
    duration: "2 Weeks",
    badge: "Milestone 2",
    badgeBg: "bg-[#f59e0b]",
    badgeRing: "border-[#f59e0b]/40",
    auraBg: "bg-amber-500/10",
    iconBg: "bg-amber-50 dark:bg-amber-950/40",
    iconColor: "text-[#f59e0b]",
    lineColor: "bg-[#f59e0b]",
    bottomBorder: "bg-[#f59e0b]",
    waveStroke: "#f59e0b",
    hoverShadow: "hover:shadow-[0_20px_45px_rgba(245,158,11,0.22)]",
  },
  {
    step: "03",
    title: "Agile Development",
    copy: "Modular sprint engineering, daily code commits, and bi-weekly product demos.",
    icon: Code2,
    duration: "4-8 Weeks",
    badge: "Milestone 3",
    badgeBg: "bg-[#6366f1]",
    badgeRing: "border-[#6366f1]/40",
    auraBg: "bg-indigo-500/10",
    iconBg: "bg-indigo-50 dark:bg-indigo-950/40",
    iconColor: "text-[#6366f1]",
    lineColor: "bg-[#6366f1]",
    bottomBorder: "bg-[#6366f1]",
    waveStroke: "#6366f1",
    hoverShadow: "hover:shadow-[0_20px_45px_rgba(99,102,241,0.22)]",
  },
  {
    step: "04",
    title: "Quality Assurance",
    copy: "Automated test suites, security vulnerability audit, and load testing.",
    icon: ShieldCheck,
    duration: "1-2 Weeks",
    badge: "Milestone 4",
    badgeBg: "bg-[#0ea5e9]",
    badgeRing: "border-[#0ea5e9]/40",
    auraBg: "bg-sky-500/10",
    iconBg: "bg-sky-50 dark:bg-sky-950/40",
    iconColor: "text-[#0ea5e9]",
    lineColor: "bg-[#0ea5e9]",
    bottomBorder: "bg-[#0ea5e9]",
    waveStroke: "#0ea5e9",
    hoverShadow: "hover:shadow-[0_20px_45px_rgba(14,165,233,0.22)]",
  },
  {
    step: "05",
    title: "Launch & 24/7 Support",
    copy: "Zero-downtime cloud deployment, team onboarding, and dedicated SLA maintenance.",
    icon: Rocket,
    duration: "Ongoing",
    badge: "Deployment",
    badgeBg: "bg-[#10b981]",
    badgeRing: "border-[#10b981]/40",
    auraBg: "bg-emerald-500/10",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
    iconColor: "text-[#10b981]",
    lineColor: "bg-[#10b981]",
    bottomBorder: "bg-[#10b981]",
    waveStroke: "#10b981",
    hoverShadow: "hover:shadow-[0_20px_45px_rgba(16,185,129,0.22)]",
  },
];

const ENGAGEMENT_MODELS = [
  {
    id: "dedicated-team",
    title: "Dedicated Engineering Team",
    badge: "Full-Scale Growth",
    subtitle: "Ideal for fast-scaling startups and enterprise software products",
    icon: Users,
    points: [
      "Dedicated Full-Stack Developers, UI/UX Lead, and QA Architect",
      "Direct daily Slack/Teams communication & Agile sprint planning",
      "100% IP & Codebase Ownership",
      "Flexible scaling — add or swap engineers on demand"
    ],
    bestFor: "Long-term SaaS, ERP, or Mobile App development",
    pricingTag: "Monthly Retainer / Dedicated Squad"
  },
  {
    id: "fixed-price",
    title: "Fixed-Price Project Scope",
    badge: "Defined Milestone",
    subtitle: "Ideal for well-defined deliverables, MVPs, and turnkey products",
    icon: Briefcase,
    points: [
      "Pre-agreed scope, fixed budget, and guaranteed milestone dates",
      "Milestone-based payment releases tied to delivery sign-off",
      "Dedicated Project Manager handling sprint execution",
      "Includes 60-day post-launch bug warranty"
    ],
    bestFor: "Custom Web Portals, Mobile Apps, or CRM setups",
    pricingTag: "Fixed Milestone Pricing"
  },
  {
    id: "staff-augmentation",
    title: "Team Augmentation / Consulting",
    badge: "On-Demand Experts",
    subtitle: "Ideal for plugging specific tech skills into your existing team",
    icon: Clock,
    points: [
      "Senior React, Node.js, Python, or AI engineers integrated in 48h",
      "Pay strictly for active development hours / sprint capacity",
      "Zero onboarding friction — works directly under your CTO/Lead",
      "Short or long term flexible engagement contracts"
    ],
    bestFor: "Tight deadlines, specialized AI modules, or audit sprints",
    pricingTag: "Hourly / Sprint Capacity Rate"
  }
];

export function EngagementModelsTimeline() {
  const [selectedModel, setSelectedModel] = useState<string>("dedicated-team");

  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 py-20 lg:py-28 text-slate-900 dark:text-white border-t border-slate-200/80 dark:border-slate-800">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-rose-500/5 dark:bg-rose-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-10 size-[450px] rounded-full bg-rose-400/5 dark:bg-primary/10 blur-[100px]" />

      {/* Left Side Concentric Target Circles Background - Matches How We Deliver */}
      <div className="pointer-events-none absolute -left-28 top-6 size-[450px] sm:size-[520px]">
        <svg className="w-full h-full opacity-60 dark:opacity-20" viewBox="0 0 500 500" fill="none">
          <defs>
            <radialGradient id="targetGlowRoadmap" cx="200" cy="220" r="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ff5252" stopOpacity="0.25" />
              <stop offset="40%" stopColor="#ff5252" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#ff5252" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="220" r="180" fill="url(#targetGlowRoadmap)" />
          <circle cx="200" cy="220" r="150" stroke="#ff758c" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          <circle cx="200" cy="220" r="115" stroke="#ff758c" strokeWidth="1" opacity="0.6" />
          <circle cx="200" cy="220" r="80" stroke="#ff758c" strokeWidth="1" strokeDasharray="4 4" opacity="0.7" />
          <circle cx="200" cy="220" r="45" stroke="#ff758c" strokeWidth="1.2" opacity="0.8" />
          <circle cx="200" cy="220" r="24" fill="#ff5252" fillOpacity="0.75" />
          <circle cx="200" cy="220" r="12" fill="#ff5252" />
          <line x1="200" y1="220" x2="340" y2="100" stroke="#ff758c" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <circle cx="340" cy="100" r="4" fill="#ff5252" />
          <line x1="340" y1="100" x2="410" y2="150" stroke="#ff758c" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
          <circle cx="410" cy="150" r="3" fill="#ff758c" />
          <line x1="200" y1="220" x2="70" y2="340" stroke="#ff758c" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
          <circle cx="70" cy="340" r="3.5" fill="#ff5252" />
        </svg>
      </div>

      {/* Top-Right Matrix Dots Pattern - Matches How We Deliver */}
      <div className="pointer-events-none absolute right-4 top-6 opacity-30 dark:opacity-15">
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 6 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={12 + c * 22} cy={12 + r * 22} r="2" fill="#94a3b8" />
            ))
          )}
        </svg>
      </div>

      <div className="container-x relative z-10 max-w-7xl mx-auto">
        {/* Section 1 Header: How We Work */}
        <Reveal className="text-center">
          {/* DELIVERY ROADMAP Pill with dash accents matching "How we deliver" style */}
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-[1.5px] w-4 bg-[#ff5252]" />
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#ff5252]">
              DELIVERY ROADMAP
            </span>
            <span className="h-[1.5px] w-4 bg-[#ff5252]" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            How We Work: <span className="text-[#ff5252]">Step-by-Step Delivery Roadmap</span>
          </h2>
          <div className="mt-3 h-1 w-10 bg-[#ff5252] rounded-full mx-auto" />

          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400 text-base sm:text-lg font-medium leading-relaxed">
            From initial discovery to post-launch support, we follow a disciplined Agile engineering workflow to deliver high-performance software on schedule.
          </p>
        </Reveal>

        {/* Development Process Timeline Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 relative">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = step.icon;

            return (
              <Reveal key={step.step} delay={idx * 80} direction="up" className="h-full">
                <div
                  className={`group/card relative flex h-full flex-col items-center text-center rounded-3xl bg-white dark:bg-card p-6 pt-7 pb-8 border border-slate-100 dark:border-border/60 shadow-[0_12px_35px_rgba(0,0,0,0.05)] dark:shadow-none transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.1)] ${step.hoverShadow}`}
                >
                  {/* Top-Left Step Number Badge with Orbiting Outer Ring */}
                  <div className="absolute top-5 left-5 size-11 flex items-center justify-center">
                    <div className={`absolute inset-0 rounded-full border ${step.badgeRing}`} />
                    <div className={`absolute -top-0.5 right-0.5 size-1.5 rounded-full ${step.badgeBg}`} />
                    <div className={`size-8 sm:size-9 rounded-full flex items-center justify-center text-white font-extrabold text-xs sm:text-sm shadow-md ${step.badgeBg}`}>
                      {step.step}
                    </div>
                  </div>

                  {/* Top-Right Duration Badge */}
                  <div className="absolute top-5 right-5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 px-2.5 py-1 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                      {step.duration}
                    </span>
                  </div>

                  {/* Center Icon Circle Aura & Soft Disk */}
                  <div className="mt-7 relative flex items-center justify-center">
                    <div className={`size-20 rounded-full ${step.auraBg} flex items-center justify-center transition-transform duration-300 group-hover/card:scale-110`}>
                      <div className={`size-14 rounded-full flex items-center justify-center ${step.iconBg} ${step.iconColor} shadow-inner`}>
                        <Icon className="size-7 stroke-[2]" />
                      </div>
                    </div>
                  </div>

                  {/* Step Title & Accent Bar */}
                  <h3 className="mt-5 text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                    {step.title}
                  </h3>
                  <div className={`mt-2 h-0.5 w-7 rounded-full ${step.lineColor}`} />

                  {/* Step Copy */}
                  <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed flex-1">
                    {step.copy}
                  </p>

                  {/* Milestone Tag */}
                  <div className="mt-4 pt-3 border-t border-slate-100/80 dark:border-slate-800/60 w-full flex items-center justify-center">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      {step.badge}
                    </span>
                  </div>

                  {/* Bottom Wavy Sine Line Pattern SVG */}
                  <div className="pointer-events-none absolute bottom-2 inset-x-0 h-14 opacity-35 overflow-hidden rounded-b-3xl">
                    <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none" fill="none">
                      <path d="M0 65 Q75 35 150 60 T300 40" stroke={step.waveStroke} strokeWidth="1" opacity="0.6" />
                      <path d="M0 72 Q75 42 150 68 T300 48" stroke={step.waveStroke} strokeWidth="0.8" opacity="0.4" />
                      <path d="M0 58 Q75 28 150 52 T300 32" stroke={step.waveStroke} strokeWidth="0.6" opacity="0.3" />
                    </svg>
                  </div>

                  {/* Bottom Color Accent Strip */}
                  <div className={`absolute bottom-0 inset-x-0 h-1.5 rounded-b-3xl ${step.bottomBorder}`} />
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Section 2: Flexible Engagement Models */}
        <div className="mt-28 relative">
          {/* Executive Section Ambient Glows */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-gradient-to-b from-[#ff5252]/10 via-rose-500/5 to-transparent blur-[140px]" />

          <Reveal className="text-center relative z-10">
            {/* Executive Badge */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-[1.5px] w-5 bg-gradient-to-r from-transparent via-[#ff5252] to-[#ff5252]" />
              <span className="text-xs sm:text-sm font-black uppercase tracking-[0.25em] text-[#ff5252]">
                ENTERPRISE COMMERCIAL ARCHITECTURE
              </span>
              <span className="h-[1.5px] w-5 bg-gradient-to-l from-transparent via-[#ff5252] to-[#ff5252]" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Flexible <span className="bg-gradient-to-r from-[#ff2a38] via-[#ff5252] to-rose-400 bg-clip-text text-transparent">Hiring & Engagement Models</span>
            </h2>
            <div className="mt-3.5 h-1 w-14 bg-gradient-to-r from-[#ff2a38] to-[#ff5252] rounded-full mx-auto shadow-sm shadow-rose-500/50" />

            <p className="mx-auto mt-5 max-w-2xl text-slate-600 dark:text-slate-400 text-base sm:text-lg font-medium leading-relaxed">
              Transparent, SLA-backed partnership structures engineered to eliminate agency overhead, maximize capital efficiency, and accelerate time-to-market.
            </p>
          </Reveal>

          {/* 3 Ultra-Premium Model Cards */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch relative z-10">
            {ENGAGEMENT_MODELS.map((model, idx) => {
              const Icon = model.icon;
              const isSelected = selectedModel === model.id;
              const isFlagship = model.id === "dedicated-team";

              return (
                <Reveal key={model.id} delay={idx * 100} direction="up" className="h-full">
                  <div
                    onClick={() => setSelectedModel(model.id)}
                    className={`group/model relative flex flex-col justify-between h-full rounded-[32px] p-8 sm:p-9 cursor-pointer transition-all duration-500 select-none ${
                      isSelected
                        ? "bg-gradient-to-b from-white via-white to-rose-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border-2 border-[#ff5252] shadow-[0_25px_60px_-15px_rgba(255,42,56,0.22)] -translate-y-2 ring-1 ring-[#ff5252]/40"
                        : "bg-white/90 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/80 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.06)] dark:shadow-none hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-1 hover:shadow-xl"
                    }`}
                  >
                    {/* Flagship Popular Ribbon */}
                    {isFlagship && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#ff2a38] via-rose-600 to-[#ff5252] px-4 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-rose-500/35 border border-white/20">
                          <Sparkles className="size-3 animate-spin" />
                          <span>Flagship Squad Model</span>
                        </span>
                      </div>
                    )}

                    {/* Subtle Corner Glow Aura */}
                    <div
                      className={`pointer-events-none absolute -top-16 -right-16 size-48 rounded-full blur-3xl transition-opacity duration-500 ${
                        isSelected ? "bg-rose-500/20 opacity-100" : "bg-rose-500/5 opacity-0 group-hover/model:opacity-100"
                      }`}
                    />

                    <div>
                      {/* Top Meta Bar */}
                      <div className="flex items-center justify-between gap-2 mb-6">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-black uppercase tracking-wider transition-colors duration-300 ${
                            isSelected
                              ? "bg-rose-100 text-[#ff2a38] dark:bg-rose-950/80 dark:text-rose-400 border border-rose-300 dark:border-rose-800/80"
                              : "bg-slate-100 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                          }`}
                        >
                          <Zap className={`size-3 ${isSelected ? "text-[#ff2a38]" : "text-amber-500"}`} />
                          <span>{model.badge}</span>
                        </span>

                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 font-mono tracking-tight bg-slate-50 dark:bg-slate-950/60 px-2.5 py-1 rounded-md border border-slate-100 dark:border-slate-800">
                          {model.pricingTag}
                        </span>
                      </div>

                      {/* Icon & Title Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className={`size-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md transition-all duration-300 ${
                            isSelected
                              ? "bg-gradient-to-br from-[#ff2a38] to-[#ff5252] text-white shadow-rose-500/40 scale-105"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 group-hover/model:bg-rose-50 dark:group-hover/model:bg-rose-950/50 group-hover/model:text-[#ff5252]"
                          }`}
                        >
                          <Icon className="size-7 stroke-[2.2]" />
                        </div>

                        <div>
                          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                            {model.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-6">
                        {model.subtitle}
                      </p>

                      {/* Bullet Checklist with Gold/Red Precision Checks */}
                      <div className="pt-5 border-t border-slate-100 dark:border-slate-800/90">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                          Key Deliverables & Guarantees
                        </p>
                        <ul className="space-y-3.5">
                          {model.points.map((pt, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-3 text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 font-medium leading-snug">
                              <div className="size-4 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                                <CheckCircle2 className="size-3 stroke-[2.5]" />
                              </div>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom Best For Tag & High-Conversion CTA */}
                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/90 space-y-4">
                      <div className="rounded-2xl bg-slate-50/90 dark:bg-slate-950/90 border border-slate-200/60 dark:border-slate-800/80 p-3.5 text-xs text-slate-600 dark:text-slate-400 leading-snug">
                        <span className="text-[#ff5252] font-black uppercase tracking-wider block text-[10px] mb-1">
                          Recommended For:
                        </span>
                        {model.bestFor}
                      </div>

                      <a
                        href="#contact-form"
                        className={`button-shine w-full inline-flex items-center justify-center gap-2.5 rounded-2xl py-3.5 text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? "bg-gradient-to-r from-[#ff2a38] via-rose-600 to-[#ff5252] text-white shadow-xl shadow-rose-500/30 hover:shadow-rose-500/50 hover:scale-[1.02] active:scale-[0.99]"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-[#ff2a38] hover:text-white hover:shadow-lg hover:shadow-rose-500/25"
                        }`}
                      >
                        <span>{isSelected ? "Selected Model — Lock Engagement" : "Choose This Model"}</span>
                        <ArrowRight className="size-4 stroke-[2.5]" />
                      </a>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
