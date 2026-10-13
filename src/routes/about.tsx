import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowRight, ArrowUpRight, HeartHandshake, Lightbulb, ShieldCheck, Timer, Sparkles, CheckCircle2, Target, Eye, Cpu, Zap, Workflow, Layers, Search, PenTool, Code2, TrendingUp, BarChart3, MapPin, Users, Rocket, Globe, Gem, Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { SpotlightCard } from "@/components/SpotlightCard";
import aboutImg from "@/assets/abstract-about.jpg";
import missionImg from "@/assets/mission-abstract.png";
import visionImg from "@/assets/vision-abstract.png";
import { getPageSections, PageSectionContent } from "@/lib/api";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { SecurityComplianceSection } from "@/components/SecurityComplianceSection";
import { KnowledgeHubDownloadCenter } from "@/components/KnowledgeHubDownloadCenter";

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

    <div className="max-w-[720px]">

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
            text-3xl
            font-black
            leading-[1.05]
            tracking-tight
            text-white
            sm:text-5xl
            md:text-6xl
            lg:text-[66px]
          "
        >
          <span className="block sm:inline-block sm:whitespace-nowrap">The Living Foundations</span>{" "}
          <br className="hidden sm:block" />
          <span className="text-primary block sm:inline-block sm:whitespace-nowrap">
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
      {(whoWeAre?.extra_json?.is_active ?? true) && (
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
                <span>{whoWeAre?.subtitle || whoWeAre?.extra_json?.badge || "WHO WE ARE"}</span>
              </div>
              <span className="h-[1.5px] w-4 bg-[#ff5252]" />
            </div>

            <h2 className="text-4xl font-black text-slate-900 dark:text-white sm:text-5xl lg:text-6xl tracking-tight">
              {whoWeAre?.extra_json?.headerTitle ? whoWeAre.extra_json.headerTitle : (
                <>Who We Are & What <span className="text-[#ff5252]">We Stand For</span></>
              )}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed font-normal">
              {whoWeAre?.extra_json?.headerSub || "Innovation-driven. People-focused. Built for a smarter tomorrow."}
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
                    {whoWeAre?.extra_json?.body2 ? whoWeAre.extra_json.body2 : "We empower companies with production-ready software systems — from custom ERP, ERP, and LMS platforms to performance advertising, technical search strategy, and 4K media production."}
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
                            {whoWeAre?.extra_json?.subCard1Title || "In-House IT Engineering"}
                          </h4>
                        </div>
                        <p className="mt-2.5 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          {whoWeAre?.extra_json?.subCard1Desc || "Developing robust, scalable, and customized software solutions."}
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
                            {whoWeAre?.extra_json?.subCard2Title || "Data-Driven Campaigns"}
                          </h4>
                        </div>
                        <p className="mt-2.5 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          {whoWeAre?.extra_json?.subCard2Desc || "Performance-led strategies for measurable business growth."}
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
      )}

      {/* Mission, Vision & Product Values Section - Matches User Reference Image */}
      {((missionSec?.extra_json?.is_active ?? true) || (visionSec?.extra_json?.is_active ?? true) || (valuesSec?.extra_json?.is_active ?? true)) && (
      <section className="relative overflow-hidden py-20 lg:py-28 bg-[#fafafa] dark:bg-background border-t border-slate-100 dark:border-border/40">
        {/* Top-Right Decorative Red 3D Polygon & Black Semi-circle Elements (as seen in background top right of image) */}
        <div className="pointer-events-none absolute right-0 top-0 hidden lg:block overflow-hidden w-[480px] h-[360px] opacity-90">
          <div className="absolute right-36 top-0 w-36 h-full bg-[#e01e37] clip-triangle-top-right" style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />
          <div className="absolute right-0 top-12 w-64 h-64 rounded-full bg-black translate-x-1/3" />
        </div>

        {/* Bottom-Left Decorative Red 3D Shape & Black Circle (bottom left background accent) */}
        <div className="pointer-events-none absolute -bottom-24 -left-20 w-80 h-80 opacity-90">
          <div className="absolute inset-0 bg-[#e01e37] rounded-full" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-black rounded-full" />
        </div>

        <div className="container-x relative z-10">
          {/* Section Header - OUR PURPOSE */}
          <Reveal className="mb-14 lg:mb-16 max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#e01e37]">OUR PURPOSE</span>
              <span className="h-[2px] w-8 bg-[#e01e37]" />
            </div>

            <h2 className="text-4xl font-black text-slate-900 dark:text-white sm:text-5xl lg:text-6xl tracking-tight leading-[1.08]">
              {missionSec?.extra_json?.mvHeaderTitle ? missionSec.extra_json.mvHeaderTitle : (
                <>Building a Smarter <br /><span className="text-[#e01e37]">Digital Future</span></>
              )}
            </h2>

            <p className="mt-4 text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
              {missionSec?.extra_json?.mvHeaderSub || "We are driven by a clear purpose — to empower businesses with innovative technology, meaningful solutions and long-term support."}
            </p>
          </Reveal>

          {/* 3 Distinct Column Cards Matching User Reference Image */}
          <div className="grid gap-7 md:grid-cols-3 items-stretch max-w-7xl mx-auto">
            
            {/* CARD 1: Our Mission (White Card with Red Target Icon & Bottom Red/Black 3D Accent) */}
            <Reveal direction="up" delay={100} className="h-full">
              <div className="relative group h-full flex flex-col justify-between rounded-3xl bg-white dark:bg-card p-8 border border-slate-200/80 dark:border-border/60 shadow-[0_10px_35px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(224,30,55,0.12)] hover:-translate-y-1 overflow-hidden">
                <div className="relative z-10 space-y-5">
                  {/* Circular Red Target Icon Disc */}
                  <div className="size-12 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-100 dark:border-rose-900/50 flex items-center justify-center text-[#e01e37]">
                    <Target className="size-6 stroke-[2]" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    {missionSec?.title ? missionSec.title : <>Our <span className="text-[#e01e37]">Mission</span></>}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                    {missionSec?.body ? missionSec.body : "To deliver innovative and reliable IT solutions that help our clients streamline operations, improve efficiency and achieve sustainable growth in a digital world."}
                  </p>

                  {/* Inner Pill Tag: Technology for a better tomorrow */}
                  <div className="pt-2">
                    <div className="inline-flex items-center gap-2.5 rounded-full bg-rose-50/80 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/40 px-4 py-2 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      <div className="size-6 rounded-full bg-[#e01e37] text-white flex items-center justify-center shrink-0">
                        <Rocket className="size-3" />
                      </div>
                      <span>Technology for a better tomorrow</span>
                    </div>
                  </div>
                </div>

                {/* Bottom 3D Red Triangular Wedge & Black Circle Graphic Accent */}
                <div className="relative mt-12 pt-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 z-10">
                  <span className="text-xs font-mono font-bold text-slate-400">01</span>
                  <span className="h-[1.5px] w-28 bg-slate-200 dark:bg-slate-800" />
                </div>

                {/* Background 3D Geometry In Card Bottom Corner */}
                <div className="pointer-events-none absolute right-0 bottom-0 w-44 h-32 overflow-hidden">
                  <div className="absolute right-6 bottom-0 w-28 h-28 bg-[#e01e37]" style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }} />
                  <div className="absolute right-0 bottom-0 w-20 h-20 bg-black rounded-t-full" />
                </div>
              </div>
            </Reveal>

            {/* CARD 2: Our Vision (Sleek Dark Black Card with Red Glowing 3D Shapes) */}
            <Reveal direction="up" delay={200} className="h-full">
              <div className="relative group h-full flex flex-col justify-between rounded-3xl bg-[#0d090c] text-white p-8 border border-slate-800 shadow-2xl transition-all duration-500 hover:shadow-[0_20px_60px_rgba(224,30,55,0.25)] hover:-translate-y-1 overflow-hidden">
                {/* Background Ambient Red Radial Glow inside Vision Card */}
                <div className="pointer-events-none absolute top-0 right-0 size-64 bg-[#e01e37]/20 rounded-full blur-3xl" />

                <div className="relative z-10 space-y-5">
                  {/* Circular Dark Red Eye Icon Disc */}
                  <div className="size-12 rounded-full bg-rose-950/80 border border-rose-900/60 flex items-center justify-center text-[#e01e37]">
                    <Eye className="size-6 stroke-[2]" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {visionSec?.title ? visionSec.title : <>Our <span className="text-[#e01e37]">Vision</span></>}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify font-normal">
                    {visionSec?.body ? visionSec.body : "To be a globally trusted IT partner, recognized for our innovation, excellence and the positive impact we create for businesses and communities worldwide."}
                  </p>

                  {/* Inner Pill Tag: Global Impact Through Innovation */}
                  <div className="pt-2">
                    <div className="inline-flex items-center gap-2.5 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-[11px] font-bold text-white backdrop-blur-md">
                      <div className="size-6 rounded-full bg-[#e01e37] text-white flex items-center justify-center shrink-0">
                        <Globe className="size-3" />
                      </div>
                      <span>Global Impact Through Innovation</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Number Line */}
                <div className="relative mt-12 pt-6 flex items-center justify-between border-t border-white/10 z-10">
                  <span className="text-xs font-mono font-bold text-slate-400">02</span>
                  <span className="h-[1.5px] w-28 bg-white/10" />
                </div>

                {/* Background Red 3D Geometry in Card Right Area (as seen in dark middle card of image) */}
                <div className="pointer-events-none absolute right-0 bottom-0 w-48 h-48">
                  <div className="absolute right-0 bottom-6 w-36 h-36 bg-[#e01e37]" style={{ clipPath: "polygon(100% 0, 0 50%, 100% 100%)" }} />
                  <div className="absolute right-4 bottom-0 w-28 h-28 bg-black rounded-t-full border-t border-white/10" />
                </div>
              </div>
            </Reveal>

            {/* CARD 3: Our Values (White Card with 4 Icon List Items: Integrity, Innovation, Collaboration, Excellence) */}
            <Reveal direction="up" delay={300} className="h-full">
              <div className="relative group h-full flex flex-col justify-between rounded-3xl bg-white dark:bg-card p-8 border border-slate-200/80 dark:border-border/60 shadow-[0_10px_35px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(224,30,55,0.12)] hover:-translate-y-1 overflow-hidden">
                <div className="relative z-10 space-y-5">
                  {/* Circular Red Diamond Icon Disc */}
                  <div className="size-12 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-100 dark:border-rose-900/50 flex items-center justify-center text-[#e01e37]">
                    <Gem className="size-6 stroke-[2]" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    {valuesSec?.title ? valuesSec.title : <>Our <span className="text-[#e01e37]">Values</span></>}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {valuesSec?.body ? valuesSec.body : "We are guided by integrity, innovation, collaboration and a commitment to excellence in everything we do."}
                  </p>

                  
                </div>

                {/* Bottom Number Line */}
                <div className="relative mt-8 pt-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 z-10">
                  <span className="text-xs font-mono font-bold text-slate-400">03</span>
                  <span className="h-[1.5px] w-28 bg-slate-200 dark:bg-slate-800" />
                </div>

                {/* Background 3D Red Geometry & Black Semi-circle in Card Corner */}
                <div className="pointer-events-none absolute right-0 bottom-0 w-44 h-32 overflow-hidden">
                  <div className="absolute right-8 bottom-0 w-28 h-28 bg-[#e01e37]" style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }} />
                  <div className="absolute right-0 bottom-0 w-20 h-20 bg-black rounded-t-full" />
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>
      )}

      {/* Enterprise Case Studies & Success Stories Section */}
      <CaseStudiesSection />

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

      {/* Security, QA & Compliance Guarantees Section */}
      <SecurityComplianceSection />

      

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
