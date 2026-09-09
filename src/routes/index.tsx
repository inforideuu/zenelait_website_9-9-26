import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  Building2,
  CreditCard,
  GraduationCap,
  Globe,
  Users,
  Users2,
  Sparkles,
  Zap,
  Rocket,
  Code2,
  Pin,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { SpotlightCard } from "@/components/SpotlightCard";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import heroImg from "@/assets/hero-abstract.jpg";
import itImg from "@/assets/abstract-it.jpg";
import mktImg from "@/assets/abstract-marketing.jpg";
import aboutImg from "@/assets/abstract-about.jpg";
import { nonItProducts } from "@/data/products";
import { TestimonialSection } from "@/components/TestimonialSection";

const title = "Zenelait Infotech — Software Products & Digital Growth";
const description =
  "Zenelait Infotech builds CRM, ERP, LMS, billing software, websites and AI chatbots, and drives growth with SEO, paid ads, content and video marketing.";

export const Route = createFileRoute("/")({
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
  component: Home,
});

import { getPageSections, PageSectionContent } from "@/lib/api";

const heroSlides = [
  {
    headlineParts: ["Your Business Ambition,", "Engineered Into Software"],
    description:
      "Enterprise CRM, ERP, LMS, Billing platforms & custom web systems crafted with precision code and modern cloud infrastructure.",
    ctaText: "Explore IT Products",
    ctaRoute: "/it-products",
  },
  {
    headlineParts: ["High-Impact Growth,", "Built & Scaled Deliberately"],
    description:
      "End-to-end digital marketing: SEO, paid ads, social media, branding, and video production to turn market attention into revenue.",
    ctaText: "Explore Marketing Services",
    ctaRoute: "/marketing",
  },
  {
    headlineParts: ["One Accountable Team,", "Driving Software & Growth"],
    description:
      "We unite software engineering and growth marketing under one roof to build systems and campaigns that deliver measurable outcomes.",
    ctaText: "Discover Zenelait",
    ctaRoute: "/about",
  },
];

const suite = [
  {
    icon: Users,
    name: "CRM",
    copy: "Capture leads, close deals and keep every customer conversation in one place.",
  },
  {
    icon: Building2,
    name: "ERP",
    copy: "Inventory, purchase, finance and people running on a single connected system.",
  },
  {
    icon: GraduationCap,
    name: "LMS",
    copy: "Courses, assessments and certifications delivered at institutional scale.",
  },
  {
    icon: CreditCard,
    name: "Billing",
    copy: "GST-ready invoicing with barcode billing and clean financial reporting.",
  },
  {
    icon: Globe,
    name: "Website",
    copy: "Corporate sites, storefronts and web apps engineered for speed and search.",
  },
  {
    icon: Bot,
    name: "AI Chatbot",
    copy: "Assistants that qualify leads and answer customers around the clock.",
  },
];

const defaultStats = [
  { value: "16+", label: "Products & Services" },
  { value: "2", label: "Practices: IT & Growth" },
  { value: "100%", label: "In-house Delivery" },
  { value: "24/7", label: "Support Coverage" },
];

function Home() {
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [statsData, setStatsData] = useState(defaultStats);
  const [homeIntro, setHomeIntro] = useState<PageSectionContent | null>(null);

  useEffect(() => {
    getPageSections().then(sections => {
      const intro = sections.find(s => s.section_key === 'home_intro');
      if (intro) setHomeIntro(intro);

      const statsSec = sections.find(s => s.section_key === 'home_stats');
      if (statsSec && Array.isArray(statsSec.extra_json)) {
        const mapped = statsSec.extra_json.map((st: any) => ({
          value: st.value || "100%",
          label: st.label || "Metric"
        }));
        setStatsData(mapped);
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div>
      {/* Homepage Video Hero Header with 4-Second Rotating Headline & CTA */}
      <section className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-[#0d090b] text-white flex items-center">
        {/* HTML5 Video Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="h-full w-full object-cover object-center"
          >
            <source src="/hero_video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Balanced gradient overlay so video details remain crisp & text is readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d090b]/65 via-[#0d090b]/25 to-transparent z-10" />

<div className="absolute inset-0 bg-gradient-to-t from-[#0d090b]/55 via-transparent to-[#0d090b]/10 z-10" />
        </div>

        {/* Hero Content Container */}
        <div className="container-x relative z-10 py-12 lg:py-16 flex flex-col justify-center w-full">
          <div className="max-w-[760px]">
            {/* Tag Badge */}
            <Reveal direction="down">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-black/50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-md shadow-lg">
                <Sparkles className="size-3.5 text-primary animate-pulse" />
                <span>Zenelait Infotech // Growth & Engineering</span>
              </div>
            </Reveal>

            {/* Cycling Text Container with Smooth Fade Animation */}
            {(() => {
              const slide = heroSlides[heroSlideIndex] ?? heroSlides[0] ?? {
                headlineParts: ["Your Business Ambition,", "Engineered Into Software"],
                description: "Enterprise software platforms & digital growth engines.",
                ctaText: "Explore IT Products",
                ctaRoute: "/it-products",
              };
              return (
                <>
                  <div className="mt-6 min-h-[170px] sm:min-h-[190px] lg:min-h-[210px] flex flex-col justify-center transition-all duration-500">
                    <div
                      key={heroSlideIndex}
                      className="animate-in fade-in slide-in-from-bottom-3 duration-500 fill-mode-forwards"
                    >
                      <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[68px]">
                        {slide.headlineParts[0]}{" "}
                        <br className="hidden sm:inline" />
                        <span className="text-primary font-black">
                          {slide.headlineParts[1]}
                        </span>
                      </h1>

                      <p className="mt-4 max-w-[620px] text-base font-medium leading-relaxed text-slate-200 sm:text-lg lg:text-xl drop-shadow-sm">
                        {slide.description}
                      </p>
                    </div>
                  </div>

                  {/* Dynamic CTAs & Slide Indicators */}
                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <Link
                      to={slide.ctaRoute}
                      className="button-shine inline-flex items-center justify-center gap-2.5 rounded-md bg-primary px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-primary/30 transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/50 hover:-translate-y-0.5"
                    >
                      <span>{slide.ctaText}</span>
                      <ArrowRight className="size-4 stroke-[2.5]" />
                    </Link>

                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center rounded-md border-2 border-white/40 bg-black/40 px-8 py-3.5 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white/20 hover:-translate-y-0.5"
                    >
                      Talk to Advisor
                    </Link>
                  </div>
                </>
              );
            })()}

            {/* 4-Second Progress Bar & Slide Dots */}
            <div className="mt-8 flex items-center gap-3">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setHeroSlideIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${idx === heroSlideIndex
                      ? "w-10 bg-primary shadow-[0_0_10px_rgba(225,29,72,0.6)]"
                      : "w-3 bg-white/30 hover:bg-white/60"
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section> 
      
      {/* Creative Company Introduction Section - Matches User Reference Image */}
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

        <div className="container-x relative z-10 grid gap-12 lg:grid-cols-12 items-center max-w-7xl mx-auto">
          {/* Left Column: Story & Vision */}
          <div className="lg:col-span-6">
            {/* WHO WE ARE Pill Tag */}
            <Reveal direction="down">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-[1.5px] w-4 bg-[#ff5252]" />
                <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 dark:border-rose-900/60 bg-rose-50/80 dark:bg-rose-950/40 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[#ff5252]">
                  <Pin className="size-3.5 text-[#ff5252]" />
                  <span>WHO WE ARE</span>
                </div>
                <span className="h-[1.5px] w-4 bg-[#ff5252]" />
              </div>
            </Reveal>

            {/* Headline */}
            <Reveal delay={100} direction="up">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white sm:text-5xl lg:text-[52px] tracking-tight leading-[1.08]">
                We Engineer Software & Scale Growth Under <br />
                <span className="text-[#ff5252] italic font-black">One Unified Umbrella</span>
              </h2>
            </Reveal>

            {/* Description Paragraph */}
            <Reveal delay={200} direction="up">
              <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal text-justify">
                Zenelait Infotech bridges the gap between technology engineering and market acquisition. Where traditional agencies treat software build and marketing as separate silos, we integrate code, architecture, design, and growth strategy into one accountable delivery machine.
              </p>
            </Reveal>

            {/* 2 Sub-Cards: In-House Engineering & Data-Driven Growth */}
            <Reveal delay={300} direction="up">
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Sub-Card 1 */}
                <div className="group/sub flex items-start gap-3.5 p-4 rounded-2xl border border-rose-100 dark:border-border/60 bg-white dark:bg-slate-900/60 shadow-xs transition-all duration-300 hover:border-rose-300 hover:shadow-md">
                  <div className="size-10 rounded-full bg-rose-50 dark:bg-rose-950/50 text-[#ff5252] flex items-center justify-center shrink-0">
                    <Code2 className="size-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">In-House Engineering</h4>
                    <p className="mt-1 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Custom CRM, ERP, LMS & AI built directly by our core software team.
                    </p>
                  </div>
                </div>

                {/* Sub-Card 2 */}
                <div className="group/sub flex items-start gap-3.5 p-4 rounded-2xl border border-rose-100 dark:border-border/60 bg-white dark:bg-slate-900/60 shadow-xs transition-all duration-300 hover:border-rose-300 hover:shadow-md">
                  <div className="size-10 rounded-full bg-rose-50 dark:bg-rose-950/50 text-[#ff5252] flex items-center justify-center shrink-0">
                    <BarChart3 className="size-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Data-Driven Growth</h4>
                    <p className="mt-1 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      SEO, paid ads, content & branding engineered for ROI.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Bottom Link */}
            <Reveal delay={400} direction="up">
              <div className="mt-7">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-extrabold text-[#ff5252] hover:underline group"
                >
                  <span>Learn more about our philosophy</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right Column: High-Res Workspace Image Card */}
          <div className="lg:col-span-6">
            <Reveal delay={150} direction="zoom">
              <div className="relative group">
                {/* Glowing Coral/Red Aura Frame */}
                <div className="absolute -inset-1 rounded-[34px] bg-gradient-to-r from-[#ff5252]/40 via-rose-500/20 to-[#ff5252]/40 blur-xl opacity-75 transition-all duration-700 group-hover:opacity-100 group-hover:blur-2xl" />

                <div className="relative overflow-hidden rounded-[30px] border border-rose-200/80 dark:border-border/60 bg-white dark:bg-slate-900 shadow-2xl">
                  <img
                    src="who_are_we.png"
                    alt="Zenelait Infotech Engineering & Growth Ecosystem"
                    className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Product Suite Grid - Creative High Aesthetics (Displaying 3 Cards) */}
      <section className="container-x py-20 lg:py-28 relative">
        <Reveal className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-md mb-4">
            <Sparkles className="size-3.5" />
            <span>Unified Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
            The Zenelait <span className="text-primary">Product Suite</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-lg font-medium">
            Enterprise-grade products engineered under a single connected stack. Adopt a single module or deploy the entire ecosystem.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Users,
              name: "Enterprise CRM",
              tag: "Customer Intelligence",
              badge: "Sales Matrix",
              image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80",
              copy: "Capture omnichannel leads, automate deal pipelines, and manage 360° customer relationship histories in real time.",
            },
            {
              icon: Building2,
              name: "Resource ERP",
              tag: "Operational Core",
              badge: "Finance & Operations",
              image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
              copy: "Unify inventory control, procurement, financial accounting, and HR management under one real-time dashboard.",
            },
            {
              icon: GraduationCap,
              name: "Academy LMS",
              tag: "Educational Scale",
              badge: "Interactive Learning",
              image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=80",
              copy: "Deliver interactive courses, automated assessments, and proctored certifications for enterprise teams and academies.",
            },
          ].map((item, i) => (
            <Reveal key={item.name} delay={i * 80} direction="up">
              <Link to="/it-products" className="block group h-full">
                <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-card shadow-lg transition-all duration-500 group-hover:-translate-y-2 group-hover:border-primary/60 group-hover:shadow-[0_20px_50px_rgba(225,29,72,0.2)]">
                  {/* Visual Header Banner Image */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    />

                    {/* Floating Top Badge */}
                    <div className="absolute top-4 left-4 rounded-full border border-primary/30 bg-black/70 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-primary animate-ping" />
                      <span>{item.badge}</span>
                    </div>

                    {/* Floating Icon Badge */}
                    {/* <div className="absolute -bottom-5 right-6 flex size-14 items-center justify-center rounded-2xl bg-primary text-white transition-transform duration-500 group-hover:scale-110">
                      <item.icon className="size-7" />
                    </div> */}
                  </div>

                  {/* Card Body Content */}
                  <div className="flex flex-1 flex-col p-7 pt-4">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-primary">
                      {item.tag}
                    </span>

                    <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {item.name}
                    </h3>

                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                      {item.copy}
                    </p>

                    <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                        <span>Explore Product</span>
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5 text-primary" />
                      </span>

                      <span className="size-8 rounded-full border border-border bg-surface flex items-center justify-center text-xs font-bold text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        0{i + 1}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* View All IT Products Button */}
        <Reveal delay={200} direction="up" className="mt-12 text-center">
          <Link
            to="/it-products"
            className="inline-flex items-center gap-2 rounded-full border-2 border-primary/40 bg-primary/10 px-8 py-3.5 text-sm font-bold text-primary backdrop-blur-md transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
          >
            <span>View All IT Products</span>
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>

      {/* Two Practices Showcase */}
      <section className="ink-panel relative overflow-hidden py-16 lg:py-24">
        <div className="pointer-events-none absolute -bottom-20 right-0 size-[30rem] rounded-full bg-rose-500/10 blur-3xl" />
        <div className="container-x relative z-10">
          <Reveal className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
              Two practices. One partner.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-ink-foreground/80 text-lg">
              Technology that makes your business efficient, marketing that makes it visible.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {[
              {
                img: itImg,
                title: "IT Products",
                copy: "CRM, ERP, LMS, billing software, websites and AI chatbots — designed, built and supported in-house.",
                to: "/it-products" as const,
              },
              {
                img: mktImg,
                title: "Non-IT Growth Services",
                copy: "Search, paid media, social, content, direct marketing, branding, analytics, video and design.",
                to: "/marketing" as const,
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 120} direction={i === 0 ? "left" : "right"}>
                <Link
                  to={card.to}
                  className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-primary/60 hover:shadow-[0_20px_40px_rgba(225,29,72,0.25)]"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={card.img}
                      alt={card.title}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="h-60 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-primary">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-ink-foreground/80 leading-relaxed">{card.copy}</p>
                    <span className="mt-6 inline-flex items-center gap-2 font-semibold text-primary">
                      <span>Explore Practice</span>
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Marquee Ticker */}
      <Reveal direction="up">
        <section className="overflow-hidden border-y border-border bg-surface/80 py-7 backdrop-blur-md">
          <div className="flex w-max animate-marquee gap-12 whitespace-nowrap text-lg font-semibold text-muted-foreground">
            {[...nonItProducts, ...nonItProducts].map((p, i) => (
              <span key={`${p.short}-${i}`} className="flex items-center gap-12 transition-colors hover:text-foreground">
                <span>{p.name}</span>
                <span className="inline-block size-2 rounded-full bg-primary animate-pulse-glow" />
              </span>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Animated Stats Section */}
      <section className="relative overflow-hidden border-y border-border bg-surface/50 py-16 lg:py-20">
        <div className="pointer-events-none absolute -top-20 left-1/3 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="container-x relative z-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {statsData.map((s, i) => (
            <Reveal key={`${s.label}-${i}`} delay={i * 90} direction="up" className="text-center">
              <SpotlightCard className="p-8 text-center bg-card border border-border/80 shadow-sm" enableTilt={false}>
                <p className="text-4xl text-primary lg:text-5xl font-extrabold">
                  <AnimatedCounter value={s.value} />
                </p>
                <p className="mt-3 font-semibold text-foreground">{s.label}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>



      {/* Testimonials Carousel Section */}
      <TestimonialSection />

      {/* CTA Banner */}
      <section className="container-x py-16 lg:py-24">
        <Reveal direction="zoom">
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-accent via-background to-accent p-10 text-center shadow-[var(--shadow-lift)] sm:p-16">
            <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary/10 blur-3xl animate-float-slow" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
              Ready to run your business better?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-muted-foreground text-lg leading-relaxed">
              Tell us what you need and we will map the right product and growth plan for your enterprise.
            </p>
            <Link
              to="/contact"
              className="button-shine mt-8 inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-primary via-red-600 to-rose-600 px-8 py-4 font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-all duration-300 hover:scale-[1.05] hover:shadow-red-500/40"
            >
              <span>Request a Demo</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
