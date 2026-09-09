import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowRight, ArrowUpRight, HeartHandshake, Lightbulb, ShieldCheck, Timer, Sparkles, CheckCircle2, Target, Eye, Cpu, Zap, Workflow, Layers, Search, PenTool, Code2, TrendingUp, BarChart3, MapPin, Users } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { SpotlightCard } from "@/components/SpotlightCard";
import aboutImg from "@/assets/abstract-about.jpg";
import missionImg from "@/assets/mission-abstract.png";
import visionImg from "@/assets/vision-abstract.png";
import { getPageSections, PageSectionContent } from "@/lib/api";

const title = "About Zenelait Infotech — Product Engineering & Growth Team";
const description =
  "Zenelait Infotech is an Indian IT company building business software and running growth programmes, with in-house engineering, design and marketing teams.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const defaultValues = [
  {
    icon: HeartHandshake,
    title: "Customer-first philosophy",
    copy: "We win only when your team actually uses what we build. Adoption is our delivery metric, not sign-off.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy and security by default",
    copy: "Your data stays yours. Role-based access, encrypted storage and clear data ownership on every deployment.",
  },
  {
    icon: Lightbulb,
    title: "Research and engineering",
    copy: "We invest continuously in AI, automation and platform work so our products keep getting sharper.",
  },
  {
    icon: Timer,
    title: "Long-term commitment",
    copy: "Implementation is the beginning. Training, support and iteration continue for as long as you run with us.",
  },
];

const process = [
  {
    step: "01",
    title: "Discover",
    copy: "We map your workflow, data and bottlenecks with the people who do the work.",
    icon: Search,
    badgeBg: "bg-[#ff5252]",
    badgeRing: "border-[#ff5252]/40",
    auraBg: "bg-rose-500/10",
    iconBg: "bg-rose-50 dark:bg-rose-950/40",
    iconColor: "text-[#ff5252]",
    lineColor: "bg-[#ff5252]",
    bottomBorder: "bg-[#ff5252]",
    waveStroke: "#ff5252",
    hoverShadow: "hover:shadow-[0_20px_45px_rgba(255,82,82,0.22)]",
    zIndex: "z-[40]",
    stackedTransform: "translate-x-0 translate-y-0 rotate-0 lg:translate-x-[calc(150%-16px)] lg:translate-y-0 lg:rotate-0 scale-100 shadow-2xl border-slate-200 dark:border-rose-500/30",
  },
  {
    step: "02",
    title: "Design",
    copy: "Solution blueprint, module selection and a delivery plan with clear milestones.",
    icon: PenTool,
    badgeBg: "bg-[#f59e0b]",
    badgeRing: "border-[#f59e0b]/40",
    auraBg: "bg-amber-500/10",
    iconBg: "bg-amber-50 dark:bg-amber-950/40",
    iconColor: "text-[#f59e0b]",
    lineColor: "bg-[#f59e0b]",
    bottomBorder: "bg-[#f59e0b]",
    waveStroke: "#f59e0b",
    hoverShadow: "hover:shadow-[0_20px_45px_rgba(245,158,11,0.22)]",
    zIndex: "z-[30]",
    stackedTransform: "translate-x-3 translate-y-3 rotate-[3deg] lg:translate-x-[calc(50%+12px)] lg:translate-y-3 lg:rotate-[3.5deg] scale-[0.98] opacity-95 shadow-xl",
  },
  {
    step: "03",
    title: "Build",
    copy: "Configuration, custom development, integrations and rigorous testing.",
    icon: Code2,
    badgeBg: "bg-[#10b981]",
    badgeRing: "border-[#10b981]/40",
    auraBg: "bg-emerald-500/10",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
    iconColor: "text-[#10b981]",
    lineColor: "bg-[#10b981]",
    bottomBorder: "bg-[#10b981]",
    waveStroke: "#10b981",
    hoverShadow: "hover:shadow-[0_20px_45px_rgba(16,185,129,0.22)]",
    zIndex: "z-[20]",
    stackedTransform: "translate-x-6 translate-y-6 rotate-[-2.5deg] lg:translate-x-[calc(-50%+38px)] lg:translate-y-6 lg:rotate-[-3deg] scale-[0.95] opacity-90 shadow-lg",
  },
  {
    step: "04",
    title: "Grow",
    copy: "Training, adoption support and marketing programmes to compound the results.",
    icon: BarChart3,
    badgeBg: "bg-[#6366f1]",
    badgeRing: "border-[#6366f1]/40",
    auraBg: "bg-indigo-500/10",
    iconBg: "bg-indigo-50 dark:bg-indigo-950/40",
    iconColor: "text-[#6366f1]",
    lineColor: "bg-[#6366f1]",
    bottomBorder: "bg-[#6366f1]",
    waveStroke: "#6366f1",
    hoverShadow: "hover:shadow-[0_20px_45px_rgba(99,102,241,0.22)]",
    zIndex: "z-[10]",
    stackedTransform: "translate-x-9 translate-y-9 rotate-[4deg] lg:translate-x-[calc(-150%+62px)] lg:translate-y-9 lg:rotate-[4.5deg] scale-[0.92] opacity-85 shadow-md",
  },
];

function About() {
  const [isProcessHovered, setIsProcessHovered] = useState(false);
  const [whoWeAre, setWhoWeAre] = useState<PageSectionContent | null>(null);
  const [missionSec, setMissionSec] = useState<PageSectionContent | null>(null);
  const [visionSec, setVisionSec] = useState<PageSectionContent | null>(null);
  const [valuesSec, setValuesSec] = useState<PageSectionContent | null>(null);

  useEffect(() => {
    getPageSections().then(sections => {
      const who = sections.find(s => s.section_key === 'about_who_we_are');
      if (who) setWhoWeAre(who);

      const mis = sections.find(s => s.section_key === 'about_mission');
      if (mis) setMissionSec(mis);

      const vis = sections.find(s => s.section_key === 'about_vision');
      if (vis) setVisionSec(vis);

      const val = sections.find(s => s.section_key === 'about_values');
      if (val) setValuesSec(val);
    }).catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero Header matching reference design */}
      <section className="relative min-h-[620px] w-full overflow-hidden rounded-xl bg-[#0d090b] text-white lg:min-h-[680px]">

  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src="aboutus_page.png"
      alt="Zenelait team collaboration"
      className="
        h-full
        w-full
        object-cover
        object-[65%_center]
      "
    />

    {/* Dark left-to-right overlay */}
    <div
      className="
        absolute
        inset-0
        bg-gradient-to-r
        from-[#0d090b]
        via-[#0d090b]/85
        to-[#0d090b]/10
      "
    />

    {/* Bottom black overlay */}
    <div
      className="
        absolute
        inset-0
        bg-gradient-to-t
        from-[#0d090b]/75
        via-transparent
        to-[#0d090b]/20
      "
    />
  </div>


  {/* Content */}
  <div className="container-x relative z-10 flex min-h-[620px] items-center py-16 lg:min-h-[680px]">

    <div className="max-w-[600px]">

      {/* Label */}
      <Reveal direction="down">
        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-primary/50
            bg-black/40
            px-4
            py-1.5
            text-xs
            font-bold
            uppercase
            tracking-[0.18em]
            text-primary
            backdrop-blur-sm
          "
        >
          <Sparkles className="size-3.5" />
          <span>About Zenelait</span>
        </div>
      </Reveal>


      {/* Heading */}
      <Reveal delay={100} direction="up">
        <h1
          className="
            mt-6
            text-4xl
            font-black
            leading-[1.03]
            tracking-tight
            text-white
            sm:text-5xl
            md:text-6xl
            lg:text-[72px]
          "
        >
          The Living
          <br />
          Foundations
          <br />
          <span className="text-primary">
            of Excellence
          </span>
        </h1>
      </Reveal>


      {/* Description */}
      <Reveal delay={200} direction="up">
        <p
          className="
            mt-6
            max-w-[520px]
            text-base
            font-medium
            leading-relaxed
            text-white/75
            sm:text-lg
          "
        >
          Delivering Superior Software & Growth Services with a
          Commitment to Quality, Sustainability, and Innovation,
          Guided by Decades of Expertise and a Vision for the Future.
        </p>
      </Reveal>


      {/* Buttons */}
      <Reveal delay={300} direction="up">
        <div className="mt-8 flex flex-wrap items-center gap-3">

          <a
            href="/contact"
            className="
              inline-flex
              items-center
              justify-center
              rounded-sm
              bg-primary
              px-8
              py-3.5
              text-sm
              font-bold
              text-white
              shadow-lg
              shadow-primary/30
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-primary/90
              hover:shadow-primary/50
            "
          >
            Start a Project
          </a>

          <a
            href="/it-products"
            className="
              inline-flex
              items-center
              justify-center
              rounded-sm
              border
              border-white/40
              bg-black/20
              px-8
              py-3.5
              text-sm
              font-bold
              text-white
              backdrop-blur-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-white
              hover:bg-white/10
            "
          >
            Consult Now
          </a>

        </div>
      </Reveal>

    </div>
  </div>

</section>

      {/* Who We Are & What We Stand For Section - Matches User Image */}
      <section className="relative overflow-hidden bg-[#fafafa] dark:bg-background py-20 lg:py-28 border-t border-slate-100 dark:border-border/40">
        {/* Background SVG Decorative Elements */}
        {/* Top-Left Radial Glow & Curved Arcs */}
        <div className="pointer-events-none absolute -left-20 -top-20 size-[420px] opacity-40 dark:opacity-15">
          <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
            <circle cx="100" cy="100" r="280" stroke="#ff758c" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
            <circle cx="100" cy="100" r="200" stroke="#ff758c" strokeWidth="1" opacity="0.5" />
            <circle cx="100" cy="100" r="120" stroke="#ff758c" strokeWidth="1.2" />
            <circle cx="100" cy="100" r="50" fill="#ff5252" fillOpacity="0.15" />
          </svg>
        </div>

        {/* Top-Right Matrix Dots Pattern */}
        <div className="pointer-events-none absolute right-6 top-8 opacity-30 dark:opacity-15">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            {Array.from({ length: 5 }).map((_, r) =>
              Array.from({ length: 5 }).map((_, c) => (
                <circle key={`${r}-${c}`} cx={15 + c * 22} cy={15 + r * 22} r="2" fill="#cbd5e1" />
              ))
            )}
          </svg>
        </div>

        {/* Bottom-Right Concentric Arcs */}
        <div className="pointer-events-none absolute -right-24 -bottom-24 size-[500px] opacity-35 dark:opacity-15">
          <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
            <circle cx="400" cy="400" r="320" stroke="#ff758c" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <circle cx="400" cy="400" r="240" stroke="#ff758c" strokeWidth="1" opacity="0.6" />
            <circle cx="400" cy="400" r="160" stroke="#ff758c" strokeWidth="1.2" opacity="0.8" />
          </svg>
        </div>

        <div className="container-x relative z-10">
          {/* Section Heading Header */}
          <Reveal className="text-center mb-14 lg:mb-16">
            {/* WHO WE ARE Pill Badge */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-[1.5px] w-4 bg-[#ff5252]" />
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 dark:border-rose-900/60 bg-rose-50/80 dark:bg-rose-950/40 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[#ff5252]">
                <Users className="size-3.5 text-[#ff5252]" />
                <span>WHO WE ARE</span>
              </div>
              <span className="h-[1.5px] w-4 bg-[#ff5252]" />
            </div>

            <h2 className="text-4xl font-black text-slate-900 dark:text-white sm:text-5xl lg:text-6xl tracking-tight">
              Who We Are & What <span className="text-[#ff5252]">We Stand For</span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed font-normal">
              Innovation-driven. People-focused. Built for a smarter tomorrow.
            </p>
          </Reveal>

          {/* 2-Column Main Content Layout */}
          <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12 max-w-6xl mx-auto">
            {/* Left Column: Headquarters Skyscraper Image Card */}
            <Reveal direction="right" className="h-full">
              <div className="relative group h-full flex flex-col">
                {/* Glowing Coral/Red Border Frame Overlay */}
                <div className="absolute -inset-1 rounded-[34px] bg-gradient-to-r from-[#ff5252]/40 via-rose-500/20 to-[#ff5252]/40 blur-xl opacity-75 transition-all duration-700 group-hover:opacity-100 group-hover:blur-2xl" />

                <div className="relative flex-1 w-full overflow-hidden rounded-[30px] border border-rose-200/80 dark:border-border/60 bg-slate-900 shadow-2xl min-h-[380px] sm:min-h-[440px]">
                  {/* Building Image */}
                  <img
                    src="intro.png"
                    alt="Zenelait Infotech Technology & Digital Growth Headquarters"
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="w-full h-full"
                  />

                  {/* Dark Vignette & Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                  {/* Top-Left Floating Badge: OUR HEADQUARTERS */}
                  <div className="absolute top-5 left-5">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md shadow-lg">
                      <MapPin className="size-3.5 text-[#ff5252]" />
                      <span>OUR HEADQUARTERS</span>
                    </div>
                  </div>

                  {/* Bottom Image Overlay Text */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-xs font-extrabold uppercase tracking-widest text-[#ff5252]">
                      ZENELAIT INFOTECH PTE LTD
                    </p>
                    <h3 className="mt-1 text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Technology & Digital Growth Center
                    </h3>
                    <div className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                      <MapPin className="size-3.5 text-[#ff5252]" />
                      <span>Singapore & Pan-India Operations</span>
                    </div>
                  </div>

                  {/* Red Corner Highlight Line */}
                  <div className="absolute bottom-4 right-4 size-6 pointer-events-none">
                    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white/40">
                      <path d="M14 22H22V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right Column: Detailed Information Card */}
            <Reveal direction="left" className="h-full">
              <div className="relative group/card h-full flex flex-col justify-between rounded-[30px] bg-white dark:bg-card p-8 sm:p-9 border border-rose-100 dark:border-border/60 shadow-[0_15px_45px_rgba(0,0,0,0.05)] dark:shadow-none transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,82,82,0.12)]">
                {/* Top-Right Decorative Concentric Arch SVG inside card */}
                <div className="pointer-events-none absolute right-0 top-0 size-44 opacity-25 dark:opacity-10 overflow-hidden rounded-tr-[30px]">
                  <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
                    <circle cx="200" cy="0" r="180" stroke="#ff758c" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="200" cy="0" r="130" stroke="#ff758c" strokeWidth="1" />
                    <circle cx="200" cy="0" r="80" stroke="#ff758c" strokeWidth="1" />
                  </svg>
                </div>

                <div className="relative z-10 space-y-4">
                  {/* Top Tag: PIONEERING NEXT-GEN */}
                  <div className="inline-flex items-center gap-2">
                    <span className="h-[1.5px] w-4 bg-[#ff5252]" />
                    <span className="text-xs font-extrabold uppercase tracking-widest text-[#ff5252]">
                      PIONEERING NEXT-GEN
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white sm:text-3xl lg:text-4xl tracking-tight leading-tight">
                    {whoWeAre?.title ? whoWeAre.title : (
                      <>
                        IT Products & <br className="hidden sm:inline" />
                        <span className="text-[#ff5252]">Digital Growth</span>
                      </>
                    )}
                  </h3>

                  {/* Body Paragraphs */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                    {whoWeAre?.body ? whoWeAre.body : "Zenelait Infotech is a leading technology and growth enterprise headquartered in India, bringing the gap between high-precision software engineering and data-driven marketing execution."}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed text-justify">
                    We empower companies with production-ready software systems — from custom ERP, ERP, and LMS platforms to performance advertising, technical search strategy, and 4K media production.
                  </p>

                  {/* 2 Interactive Sub-Cards */}
                  <div className="pt-3 grid gap-4 sm:grid-cols-2">
                    {/* Sub-Card 1: In-House IT Engineering */}
                    <div className="group/sub1 relative flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900/60 p-4 border border-rose-100 dark:border-border/60 shadow-xs transition-all duration-300 hover:border-rose-300 hover:shadow-md">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <div className="size-9 rounded-full bg-rose-50 dark:bg-rose-950/50 text-[#ff5252] flex items-center justify-center shrink-0">
                            <Cpu className="size-4 stroke-[2.2]" />
                          </div>
                          <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm leading-snug">
                            In-House IT Engineering
                          </h4>
                        </div>
                        <p className="mt-2.5 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          Developing robust, scalable, and customized software solutions.
                        </p>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <div className="size-6 rounded-full border border-rose-200 dark:border-rose-900 text-[#ff5252] flex items-center justify-center text-xs transition-colors duration-300 group-hover/sub1:bg-[#ff5252] group-hover/sub1:text-white">
                          <ArrowRight className="size-3" />
                        </div>
                      </div>
                    </div>

                    {/* Sub-Card 2: Data-Driven Campaigns */}
                    <div className="group/sub2 relative flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900/60 p-4 border border-rose-100 dark:border-border/60 shadow-xs transition-all duration-300 hover:border-rose-300 hover:shadow-md">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <div className="size-9 rounded-full bg-rose-50 dark:bg-rose-950/50 text-[#ff5252] flex items-center justify-center shrink-0">
                            <Target className="size-4 stroke-[2.2]" />
                          </div>
                          <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm leading-snug">
                            Data-Driven Campaigns
                          </h4>
                        </div>
                        <p className="mt-2.5 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          Performance-led strategies for measurable business growth.
                        </p>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <div className="size-6 rounded-full border border-rose-200 dark:border-rose-900 text-[#ff5252] flex items-center justify-center text-xs transition-colors duration-300 group-hover/sub2:bg-[#ff5252] group-hover/sub2:text-white">
                          <ArrowRight className="size-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Product Values Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-background via-surface/40 to-background border-y border-border/80">
        {/* Subtle Background Glows */}
        <div className="pointer-events-none absolute top-0 left-1/4 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 size-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="container-x relative z-10">
          <Reveal className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary backdrop-blur-md">
              <Sparkles className="size-3.5" />
              <span>Core Operational Pillars</span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              Mission, Vision & Engineering Creed
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-lg">
              The innovative architectural principles driving our software engineering and digital growth matrices.
            </p>
          </Reveal>

          {/* 3 Pill Capsule Cards: Mission, Vision & Values */}
          <div className="mt-16 grid gap-8 lg:gap-10 md:grid-cols-3">
            
            {/* Card 1: MISSION */}
            <Reveal direction="up" delay={100} className="h-full">
              <div className="group relative flex h-full flex-col items-center text-center rounded-[50px] sm:rounded-[60px] border border-rose-200/80 dark:border-rose-900/40 bg-gradient-to-b from-white via-rose-50/30 to-rose-100/40 dark:from-slate-900 dark:via-slate-900/90 dark:to-rose-950/30 p-7 pt-12 pb-16 shadow-[0_15px_40px_rgba(244,63,94,0.08)] transition-all duration-700 ease-out hover:-translate-y-3 hover:shadow-[0_25px_60px_rgba(244,63,94,0.25)] hover:border-rose-400 overflow-hidden">
                
                {/* Background Ambient Glow & Animated Orb */}
                <div className="absolute -top-24 -left-24 size-48 rounded-full bg-rose-400/20 blur-3xl group-hover:bg-rose-500/35 transition-all duration-700 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Animated Outer Orbit Ring with Rotating Dotted Border */}
                <div className="relative flex items-center justify-center p-3 rounded-full">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-rose-400/60 animate-[spin_12s_linear_infinite] group-hover:border-rose-500 group-hover:scale-110 transition-all duration-500" />
                  
                  {/* Glowing 3D Disc Badge */}
                  <div className="relative flex items-center justify-center rounded-full p-2 bg-gradient-to-tr from-rose-500 to-rose-400 shadow-[0_8px_25px_rgba(244,63,94,0.4)] transition-all duration-700 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(244,63,94,0.7)]">
                    <div className="flex size-32 sm:size-36 items-center justify-center rounded-full bg-white dark:bg-slate-950 shadow-inner transition-transform duration-700 ease-out group-hover:rotate-12 group-hover:scale-105">
                      <svg className="size-16 text-rose-500 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(244,63,94,0.9)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9" className="stroke-rose-200 dark:stroke-rose-900 group-hover:stroke-rose-400 transition-colors" />
                        <circle cx="12" cy="12" r="5" className="stroke-rose-400 group-hover:stroke-rose-500 transition-colors" />
                        <circle cx="12" cy="12" r="2.5" className="fill-rose-500 stroke-rose-500 animate-pulse" />
                        <path d="M14.5 9.5L20 4M20 4H16M20 4V8" className="stroke-rose-600 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Title & Floating Pill Badge */}
                <div className="mt-8 flex flex-col items-center gap-2.5">
                  <span className="inline-block text-[10px] font-black tracking-widest text-rose-600 bg-rose-100 dark:bg-rose-950/80 px-3 py-1 rounded-full uppercase border border-rose-200 dark:border-rose-800 shadow-sm">
                    Goal Matrix
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-widest text-rose-600 dark:text-rose-400 transition-transform duration-500 group-hover:scale-105">
                    {missionSec?.title ? missionSec.title : "MISSION"}
                  </h3>
                </div>

                <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 font-medium px-2 sm:px-4">
                  {missionSec?.body ? missionSec.body : "To architect scalable, high-performance digital matrices that empower global enterprises through precision software engineering and data-driven growth."}
                </p>

                {/* Bottom Kinetic Spark Bar */}
                <div className="mt-auto pt-6 w-full flex justify-center">
                  <div className="h-1 w-12 rounded-full bg-rose-200 dark:bg-rose-900/60 transition-all duration-500 group-hover:w-28 group-hover:bg-rose-500" />
                </div>
              </div>
            </Reveal>

            {/* Card 2: VISION */}
            <Reveal direction="up" delay={200} className="h-full">
              <div className="group relative flex h-full flex-col items-center text-center rounded-[50px] sm:rounded-[60px] border border-sky-200/80 dark:border-sky-900/40 bg-gradient-to-b from-white via-sky-50/30 to-sky-100/40 dark:from-slate-900 dark:via-slate-900/90 dark:to-sky-950/30 p-7 pt-12 pb-16 shadow-[0_15px_40px_rgba(14,165,233,0.08)] transition-all duration-700 ease-out hover:-translate-y-3 hover:shadow-[0_25px_60px_rgba(14,165,233,0.25)] hover:border-sky-400 overflow-hidden">
                
                {/* Background Ambient Glow & Animated Orb */}
                <div className="absolute -top-24 -left-24 size-48 rounded-full bg-sky-400/20 blur-3xl group-hover:bg-sky-500/35 transition-all duration-700 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Animated Outer Orbit Ring with Rotating Dotted Border */}
                <div className="relative flex items-center justify-center p-3 rounded-full">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-sky-400/60 animate-[spin_15s_linear_infinite_reverse] group-hover:border-sky-500 group-hover:scale-110 transition-all duration-500" />
                  
                  {/* Glowing 3D Disc Badge */}
                  <div className="relative flex items-center justify-center rounded-full p-2 bg-gradient-to-tr from-sky-500 to-sky-400 shadow-[0_8px_25px_rgba(14,165,233,0.4)] transition-all duration-700 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(14,165,233,0.7)]">
                    <div className="flex size-32 sm:size-36 items-center justify-center rounded-full bg-white dark:bg-slate-950 shadow-inner transition-transform duration-700 ease-out group-hover:-rotate-12 group-hover:scale-105">
                      <svg className="size-16 text-sky-500 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(14,165,233,0.9)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" className="stroke-sky-300 dark:stroke-sky-800 group-hover:stroke-sky-400 transition-colors" />
                        <circle cx="12" cy="12" r="4" className="stroke-sky-500 fill-sky-500/20 group-hover:fill-sky-500/50 transition-all" />
                        <circle cx="12" cy="12" r="1.5" className="fill-sky-500 animate-ping" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Title & Floating Pill Badge */}
                <div className="mt-8 flex flex-col items-center gap-2.5">
                  <span className="inline-block text-[10px] font-black tracking-widest text-sky-600 bg-sky-100 dark:bg-sky-950/80 px-3 py-1 rounded-full uppercase border border-sky-200 dark:border-sky-800 shadow-sm">
                    Future Horizon
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-widest text-sky-600 dark:text-sky-400 transition-transform duration-500 group-hover:scale-105">
                    {visionSec?.title ? visionSec.title : "VISION"}
                  </h3>
                </div>

                <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 font-medium px-2 sm:px-4">
                  {visionSec?.body ? visionSec.body : "To set the absolute global standard for immersive, highly kinetic web applications, intelligent automation, and transformative digital experiences."}
                </p>

                {/* Bottom Kinetic Spark Bar */}
                <div className="mt-auto pt-6 w-full flex justify-center">
                  <div className="h-1 w-12 rounded-full bg-sky-200 dark:bg-sky-900/60 transition-all duration-500 group-hover:w-28 group-hover:bg-sky-500" />
                </div>
              </div>
            </Reveal>

            {/* Card 3: VALUES */}
            <Reveal direction="up" delay={300} className="h-full">
              <div className="group relative flex h-full flex-col items-center text-center rounded-[50px] sm:rounded-[60px] border border-emerald-200/80 dark:border-emerald-900/40 bg-gradient-to-b from-white via-emerald-50/30 to-emerald-100/40 dark:from-slate-900 dark:via-slate-900/90 dark:to-emerald-950/30 p-7 pt-12 pb-16 shadow-[0_15px_40px_rgba(16,185,129,0.08)] transition-all duration-700 ease-out hover:-translate-y-3 hover:shadow-[0_25px_60px_rgba(16,185,129,0.25)] hover:border-emerald-400 overflow-hidden">
                
                {/* Background Ambient Glow & Animated Orb */}
                <div className="absolute -top-24 -left-24 size-48 rounded-full bg-emerald-400/20 blur-3xl group-hover:bg-emerald-500/35 transition-all duration-700 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Animated Outer Orbit Ring with Rotating Dotted Border */}
                <div className="relative flex items-center justify-center p-3 rounded-full">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-400/60 animate-[spin_10s_linear_infinite] group-hover:border-emerald-500 group-hover:scale-110 transition-all duration-500" />
                  
                  {/* Glowing 3D Disc Badge */}
                  <div className="relative flex items-center justify-center rounded-full p-2 bg-gradient-to-tr from-emerald-500 to-emerald-400 shadow-[0_8px_25px_rgba(16,185,129,0.4)] transition-all duration-700 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(16,185,129,0.7)]">
                    <div className="flex size-32 sm:size-36 items-center justify-center rounded-full bg-white dark:bg-slate-950 shadow-inner transition-transform duration-700 ease-out group-hover:rotate-12 group-hover:scale-105">
                      <svg className="size-16 text-emerald-500 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(16,185,129,0.9)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 3h12l4 6-10 12L2 9z" className="stroke-emerald-300 dark:stroke-emerald-800 group-hover:stroke-emerald-400 transition-colors" />
                        <path d="M11 3l-3 6 4 12" className="stroke-emerald-400" />
                        <path d="M13 3l3 6-4 12" className="stroke-emerald-400" />
                        <path d="M2 9h20" className="stroke-emerald-300" />
                        <path d="M18 2l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" className="fill-emerald-500 stroke-emerald-500 animate-bounce" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Title & Floating Pill Badge */}
                <div className="mt-8 flex flex-col items-center gap-2.5">
                  <span className="inline-block text-[10px] font-black tracking-widest text-emerald-600 bg-emerald-100 dark:bg-emerald-950/80 px-3 py-1 rounded-full uppercase border border-emerald-200 dark:border-emerald-800 shadow-sm">
                    Core Standards
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 transition-transform duration-500 group-hover:scale-105">
                    {valuesSec?.title ? valuesSec.title : "PRODUCT VALUES"}
                  </h3>
                </div>

                <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 font-medium px-2 sm:px-4">
                  {valuesSec?.body ? valuesSec.body : "Engineered with bulletproof safety, high concurrency, clean procedural pipelines, and high-fidelity aesthetics across every system."}
                </p>

                {/* Bottom Kinetic Spark Bar */}
                <div className="mt-auto pt-6 w-full flex justify-center">
                  <div className="h-1 w-12 rounded-full bg-emerald-200 dark:bg-emerald-900/60 transition-all duration-500 group-hover:w-28 group-hover:bg-emerald-500" />
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="ink-panel relative overflow-hidden border-y border-white/10 py-16 lg:py-24">
        <div className="pointer-events-none absolute -bottom-20 right-0 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="container-x relative z-10">
          <Reveal className="text-center">
            <h2 className="red-underline inline-block text-3xl font-extrabold sm:text-4xl lg:text-5xl text-white">
              The principles that drive us
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {defaultValues.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 100} direction="up">
                <SpotlightCard className="p-8 border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="flex gap-5">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary shadow-sm border border-primary/30">
                      <v.icon className="size-6" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-2xl font-bold text-white">{v.title}</h3>
                      <p className="mt-2 text-ink-foreground/80 leading-relaxed">{v.copy}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Process Section - How We Deliver */}
      <section
        onMouseEnter={() => setIsProcessHovered(true)}
        onMouseLeave={() => setIsProcessHovered(false)}
        onFocus={() => setIsProcessHovered(true)}
        onBlur={() => setIsProcessHovered(false)}
        tabIndex={0}
        className="group relative overflow-hidden bg-[#fafafa] dark:bg-background py-20 lg:py-28 border-t border-slate-100 dark:border-border/40 outline-none"
      >
        {/* Left Side Concentric Target Circles Background - Matches Image */}
        <div className="pointer-events-none absolute -left-28 top-6 size-[450px] sm:size-[520px]">
          <svg className="w-full h-full opacity-60 dark:opacity-20" viewBox="0 0 500 500" fill="none">
            <defs>
              <radialGradient id="targetGlow" cx="200" cy="220" r="180" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ff5252" stopOpacity="0.25" />
                <stop offset="40%" stopColor="#ff5252" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#ff5252" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Concentric Glow and Rings */}
            <circle cx="200" cy="220" r="180" fill="url(#targetGlow)" />
            <circle cx="200" cy="220" r="150" stroke="#ff758c" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <circle cx="200" cy="220" r="115" stroke="#ff758c" strokeWidth="1" opacity="0.6" />
            <circle cx="200" cy="220" r="80" stroke="#ff758c" strokeWidth="1" strokeDasharray="4 4" opacity="0.7" />
            <circle cx="200" cy="220" r="45" stroke="#ff758c" strokeWidth="1.2" opacity="0.8" />
            <circle cx="200" cy="220" r="24" fill="#ff5252" fillOpacity="0.75" />
            <circle cx="200" cy="220" r="12" fill="#ff5252" />
            
            {/* Satellite Node Lines */}
            <line x1="200" y1="220" x2="340" y2="100" stroke="#ff758c" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <circle cx="340" cy="100" r="4" fill="#ff5252" />
            <line x1="340" y1="100" x2="410" y2="150" stroke="#ff758c" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
            <circle cx="410" cy="150" r="3" fill="#ff758c" />
            <line x1="200" y1="220" x2="70" y2="340" stroke="#ff758c" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
            <circle cx="70" cy="340" r="3.5" fill="#ff5252" />
          </svg>
        </div>

        {/* Top-Right Matrix Dots Pattern - Matches Image */}
        <div className="pointer-events-none absolute right-4 top-6 opacity-30 dark:opacity-15">
          <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
            {Array.from({ length: 6 }).map((_, r) =>
              Array.from({ length: 6 }).map((_, c) => (
                <circle key={`${r}-${c}`} cx={12 + c * 22} cy={12 + r * 22} r="2" fill="#94a3b8" />
              ))
            )}
          </svg>
        </div>

        {/* Right Side Constellation SVG Overlay - Matches Image */}
        <div className="pointer-events-none absolute right-12 top-1/4 size-[320px] opacity-40 dark:opacity-20">
          <svg className="w-full h-full" viewBox="0 0 320 320" fill="none">
            <line x1="140" y1="90" x2="240" y2="150" stroke="#ff758c" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="240" y1="150" x2="210" y2="250" stroke="#ff758c" strokeWidth="1" />
            <line x1="210" y1="250" x2="110" y2="200" stroke="#ff758c" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="140" cy="90" r="3.5" fill="#ff5252" />
            <circle cx="240" cy="150" r="4.5" fill="#ff5252" />
            <circle cx="210" cy="250" r="3.5" fill="#ff5252" />
            <circle cx="110" cy="200" r="3" fill="#ff758c" />
            <circle cx="290" cy="110" r="3" fill="#ff758c" />
          </svg>
        </div>

        <div className="container-x relative z-10">
          <Reveal className="text-center">
            {/* OUR PROCESS Pill with dash accents matching image */}
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="h-[1.5px] w-4 bg-[#ff5252]" />
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#ff5252]">
                OUR PROCESS
              </span>
              <span className="h-[1.5px] w-4 bg-[#ff5252]" />
            </div>

            {/* Title: How we deliver */}
            <h2 className="text-4xl font-black text-slate-900 dark:text-white sm:text-5xl lg:text-6xl tracking-tight">
              How we <span className="text-[#ff5252]">deliver</span>
            </h2>
            <div className="mt-3 h-1 w-10 bg-[#ff5252] rounded-full mx-auto" />

            <p className="mx-auto mt-4 max-w-2xl text-slate-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed font-normal">
              A structured 4-step delivery framework ensuring speed, quality, and measurable business adoption.
            </p>

            {/* Interactive Stack Hint Indicator Pill */}
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setIsProcessHovered(!isProcessHovered)}
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 shadow-sm cursor-pointer ${
                  isProcessHovered
                    ? "bg-[#ff5252] text-white shadow-rose-500/25 scale-105"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-rose-300"
                }`}
              >
                <Sparkles className={`size-3.5 ${isProcessHovered ? "animate-spin" : "text-[#ff5252] animate-pulse"}`} />
                <span>{isProcessHovered ? "4 Cards Expanded (Hover off or click to stack)" : "Hover section or click to expand 4 cards stack"}</span>
              </button>
            </div>
          </Reveal>

          {/* Cards Grid Container (Supports Stacked -> Expanded Fluid Physical Animation) */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto min-h-[280px]">
            {process.map((p) => {
              const IconComp = p.icon;
              return (
                <div
                  key={p.step}
                  className={`h-full transition-all duration-700 ease-out transform-gpu ${p.zIndex} ${
                    isProcessHovered
                      ? "translate-x-0 translate-y-0 rotate-0 scale-100 opacity-100 shadow-xl"
                      : p.stackedTransform
                  }`}
                >
                  <div
                    className={`group/card relative flex h-full flex-col items-center text-center rounded-3xl bg-white dark:bg-card p-6 pt-7 pb-8 border border-slate-100 dark:border-border/60 shadow-[0_12px_35px_rgba(0,0,0,0.05)] dark:shadow-none transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.1)] ${p.hoverShadow}`}
                  >
                    {/* Top-Left Step Number Badge with Orbiting Outer Ring - Matches Image */}
                    <div className="absolute top-5 left-5 size-11 flex items-center justify-center">
                      <div className={`absolute inset-0 rounded-full border ${p.badgeRing}`} />
                      <div className={`absolute -top-0.5 right-0.5 size-1.5 rounded-full ${p.badgeBg}`} />
                      <div className={`size-8 sm:size-9 rounded-full flex items-center justify-center text-white font-extrabold text-xs sm:text-sm shadow-md ${p.badgeBg}`}>
                        {p.step}
                      </div>
                    </div>

                    {/* Center Icon Circle Aura & Soft Disk - Matches Image */}
                    <div className="mt-6 relative flex items-center justify-center">
                      <div className={`size-24 rounded-full ${p.auraBg} flex items-center justify-center transition-transform duration-300 group-hover/card:scale-105`}>
                        <div className={`size-16 rounded-full flex items-center justify-center ${p.iconBg} ${p.iconColor}`}>
                          <IconComp className="size-8 stroke-[2]" />
                        </div>
                      </div>
                    </div>

                    {/* Step Title & Accent Bar */}
                    <h3 className="mt-5 text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                      {p.title}
                    </h3>
                    <div className={`mt-2.5 h-0.5 w-7 rounded-full ${p.lineColor}`} />

                    {/* Step Copy */}
                    <p className="mt-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-[230px]">
                      {p.copy}
                    </p>

                    {/* Bottom Wavy Sine Line Pattern SVG - Matches Image */}
                    <div className="pointer-events-none absolute bottom-2 inset-x-0 h-16 opacity-35 overflow-hidden rounded-b-3xl">
                      <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none" fill="none">
                        <path d="M0 65 Q75 35 150 60 T300 40" stroke={p.waveStroke} strokeWidth="1" opacity="0.6" />
                        <path d="M0 72 Q75 42 150 68 T300 48" stroke={p.waveStroke} strokeWidth="0.8" opacity="0.4" />
                        <path d="M0 58 Q75 28 150 52 T300 32" stroke={p.waveStroke} strokeWidth="0.6" opacity="0.3" />
                      </svg>
                    </div>

                    {/* Bottom Color Accent Strip */}
                    <div className={`absolute bottom-0 inset-x-0 h-1.5 rounded-b-3xl ${p.bottomBorder}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="ink-panel relative overflow-hidden py-16 text-center lg:py-24">
        <div className="container-x relative z-10">
          <Reveal direction="zoom">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Made in India. Built for growing businesses.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-ink-foreground/80 text-lg">
              Let&rsquo;s engineer software and marketing programmes tailored specifically to your operation.
            </p>
            <Link
              to="/contact"
              className="button-shine mt-8 inline-flex items-center gap-2.5 rounded-lg bg-primary px-8 py-3.5 font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:scale-[1.04]"
            >
              <span>Start a conversation</span>
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
