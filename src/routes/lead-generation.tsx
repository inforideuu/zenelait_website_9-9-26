import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Building2,
  Users,
  Filter,
  Layout,
  Percent,
  Zap,
  Target,
  PieChart,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { SpotlightCard } from "@/components/SpotlightCard";

const leadHeroImg = "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1024&auto=format&fit=crop&q=80";
const b2bLeadGenImg = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1024&auto=format&fit=crop&q=80";
const b2cLeadGenImg = "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1024&auto=format&fit=crop&q=80";
const salesFunnelImg = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1024&auto=format&fit=crop&q=80";
const landingPageOptImg = "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1024&auto=format&fit=crop&q=80";
const croImg = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1024&auto=format&fit=crop&q=80";

const title = "Lead Generation Services — B2B, B2C, Sales Funnels & CRO | Zenelait Infotech";
const description =
  "Comprehensive Lead Generation services by Zenelait Infotech: B2B Lead Generation, B2C Lead Generation, Sales Funnel Setup, Landing Page Optimization, and Conversion Rate Optimization (CRO).";

export const Route = createFileRoute("/lead-generation")({
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
  component: LeadGenerationPage,
});

const leadPillars = [
  {
    id: "b2b-lead-generation",
    title: "B2B Lead Generation",
    short: "Enterprise Account Prospecting",
    icon: Building2,
    image: b2bLeadGenImg,
    tagline: "Reach decision-makers and build high-ticket enterprise sales pipelines.",
    overview:
      "B2B Lead Generation requires targeted, account-based strategies. We combine decision-maker database enrichment, LinkedIn Lead Gen forms, high-intent search campaigns, and CRM auto-routing to deliver pre-qualified enterprise sales meetings.",
    points: [
      "Decision-Maker Prospecting by Job Title, Seniority & Company Size",
      "Account-Based Marketing (ABM) Account List Campaign Ingestion",
      "LinkedIn Native Lead Gen Forms & Instant CRM Auto-Sync",
      "Marketing Qualified Lead (MQL) to Sales Qualified Lead (SQL) Scoring",
    ],
  },
  {
    id: "b2c-lead-generation",
    title: "B2C Lead Generation",
    short: "High-Volume Consumer Leads",
    icon: Users,
    image: b2cLeadGenImg,
    tagline: "Acquire high volumes of interested consumer leads at scale.",
    overview:
      "B2C Lead Generation focuses on instant interest capture and rapid follow-up. We run targeted social media lead ads, interactive quiz funnels, lead magnet downloads, and automated WhatsApp/SMS instant contact sequences.",
    points: [
      "High-Volume Meta & Google Instant Lead Form Campaigns",
      "Interactive Quiz, Assessment & Lead Magnet Funnels",
      "Instant 60-Second Automated WhatsApp & Call Connects",
      "Geo-Targeted & Demographic Audience Lookalike Scaling",
    ],
  },
  {
    id: "sales-funnel-setup",
    title: "Sales Funnel Setup",
    short: "Full-Funnel Architecture",
    icon: Filter,
    image: salesFunnelImg,
    tagline: "Guide prospects seamlessly from initial awareness to signed order.",
    overview:
      "A leaky funnel wastes ad spend. We design and build end-to-end sales funnel architectures — mapping top-of-funnel (TOFU) awareness ads, middle-of-funnel (MOFU) lead magnets, and bottom-of-funnel (BOFU) closing offers with automated CRM tracking.",
    points: [
      "TOFU, MOFU, and BOFU Multi-Stage Funnel Blueprinting",
      "Automated Lead Scoring, Segmenting & Tagging Rules",
      "CRM & Sales Pipeline Stage Trigger Integration",
      "Funnel Velocity & Drop-Off Bottleneck Analytics",
    ],
  },
  {
    id: "landing-page-optimization",
    title: "Landing Page Optimization",
    short: "High-Conversion Page UX",
    icon: Layout,
    image: landingPageOptImg,
    tagline: "Turn campaign clicks into qualified leads with high-converting landing pages.",
    overview:
      "Your landing page is where traffic turns into revenue. We engineer high-speed, mobile-optimized landing pages featuring bulletproof value propositions, clear CTA hierarchy, social proof badges, and friction-free lead capture forms.",
    points: [
      "Friction-Free Multi-Step Lead Capture Form Engineering",
      "Mobile-First Responsive Layout & Sub-Second Page Velocity",
      "Persuasive Value Proposition, Headline & CTA Hierarchy",
      "Trust Signal, Client Review & Security Badge Positioning",
    ],
  },
  {
    id: "cro",
    title: "Conversion Rate Optimization (CRO)",
    short: "A/B Testing & Heatmaps",
    icon: Percent,
    image: croImg,
    tagline: "Double your lead volume without increasing your advertising budget.",
    overview:
      "CRO maximizes the value of traffic you already have. We deploy A/B split testing, UX heatmaps, session recordings, and form analytics to eliminate user drop-off points and continuously boost conversion percentages.",
    points: [
      "A/B & Multivariate Split Testing for Headlines & Forms",
      "User Session Heatmap, Click & Scroll Depth Behavioral Audits",
      "Form Analytics & Field Drop-Off Point Elimination",
      "Data-Backed UX Iteration & Monthly Conversion Rate Scaling",
    ],
  },
];

function LeadGenerationPage() {
  const [adSpend, setAdSpend] = useState(5000);

  // Lead calculation simulation
  const projectedLeads = Math.round((adSpend / 40) * 2.4);
  const projectedPipelineVal = Math.round(projectedLeads * 1250);

  return (
    <div className="relative">
      {/* Luxurious Hero Header */}
      <section className="ink-panel relative overflow-hidden py-20 lg:py-28">
        {/* Glowing luxury ambient background elements */}
        <div className="pointer-events-none absolute -top-40 -right-24 size-[40rem] rounded-full bg-gradient-to-br from-primary/30 via-rose-600/15 to-transparent blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute top-1/2 -left-32 size-[30rem] rounded-full bg-amber-500/10 blur-3xl animate-pulse-glow" />

        <div className="container-x relative z-10 grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Reveal direction="down">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary backdrop-blur-md shadow-[0_0_20px_rgba(225,29,72,0.3)]">
                <Sparkles className="size-3.5 animate-spin-slow" />
                <span>Lead Generation Suite</span>
              </div>
            </Reveal>

            <div className="mt-6">
              <TextReveal
                text="Predictable High-Intent Lead Pipelines That Fill Your CRM with Qualified Buyers"
                highlightWords={["Predictable", "Lead", "Pipelines"]}
                highlightClass="italic text-primary"
                className="text-4xl font-extrabold sm:text-5xl lg:text-6xl text-white leading-[1.08]"
              />
            </div>

            <Reveal delay={200} direction="up">
              <p className="mt-6 max-w-xl text-ink-foreground/85 text-lg leading-relaxed">
                From B2B account prospecting and B2C consumer acquisition to full sales funnel setups, high-velocity landing pages,
                and CRO split-testing — we build lead engines that scale revenue.
              </p>
            </Reveal>

            <Reveal delay={300} direction="up">
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="button-shine inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-primary via-red-600 to-rose-600 px-8 py-4 font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-all duration-300 hover:scale-[1.04] hover:shadow-red-500/40"
                >
                  <Zap className="size-4" />
                  <span>Request Lead Engine Audit</span>
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="#lead-pillars"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-md transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
                >
                  Explore 5 Pillars
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} direction="zoom">
            <div className="relative group overflow-hidden rounded-3xl border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-amber-500/30 blur-2xl opacity-60 transition-all duration-700 group-hover:opacity-90" />
              <img
                src={leadHeroImg}
                alt="Lead Generation Pipeline & Conversion Analytics Dashboard Visual"
                loading="lazy"
                width={1024}
                height={768}
                className="relative w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="border-y border-border/80 bg-surface/95 py-8 backdrop-blur-xl">
        <div className="container-x grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { label: "Cost Per Lead Reduction", val: "-35%" },
            { label: "MQL to SQL Match Rate", val: "88%" },
            { label: "Avg Conversion Rate Lift", val: "+210%" },
            { label: "Qualified Leads Delivered", val: "500K+" },
          ].map((st, i) => (
            <Reveal key={st.label} delay={i * 80} direction="up" className="text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-primary">{st.val}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {st.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 5 Lead Generation Pillars Detailed Breakdown */}
      <section id="lead-pillars" className="container-x py-20 lg:py-28">
        <Reveal className="text-center">
          <h2 className="red-underline inline-block text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            5 Pillars of Lead Engine Dominance
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-muted-foreground text-lg">
            An end-to-end framework designed to attract, capture, score, and convert high-intent buyers.
          </p>
        </Reveal>

        <div className="mt-20 space-y-24">
          {leadPillars.map((pillar, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={pillar.id}
                id={pillar.id}
                className="grid gap-12 items-center lg:grid-cols-2 scroll-mt-28"
              >
                <Reveal
                  direction={isEven ? "left" : "right"}
                  className={isEven ? "lg:order-1" : "lg:order-2"}
                >
                  <div className="relative group overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="w-full object-cover h-[340px] sm:h-[420px] transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-6 flex flex-col justify-end">
                      <span className="self-start rounded-full bg-gradient-to-r from-primary to-rose-600 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                        {pillar.short}
                      </span>
                      <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{pillar.title}</h3>
                    </div>
                  </div>
                </Reveal>

                <Reveal
                  direction={isEven ? "right" : "left"}
                  className={isEven ? "lg:order-2" : "lg:order-1"}
                >
                  <div className="flex size-13 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm mb-5 border border-primary/20">
                    <pillar.icon className="size-6" />
                  </div>
                  <h3 className="text-3xl font-extrabold sm:text-4xl">{pillar.title}</h3>
                  <p className="mt-3 text-lg font-semibold text-primary">{pillar.tagline}</p>
                  <p className="mt-4 text-muted-foreground leading-relaxed text-base">
                    {pillar.overview}
                  </p>

                  <ul className="mt-7 space-y-3.5">
                    {pillar.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-sm font-medium text-foreground">
                        <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-9">
                    <Link
                      to="/contact"
                      className="story-link inline-flex items-center gap-2 font-bold text-primary text-base"
                    >
                      <span>Scale {pillar.title}</span>
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Lead Pipeline & Revenue Calculator */}
      <section className="border-t border-border/80 bg-surface/90 py-20 lg:py-28 backdrop-blur-md">
        <div className="container-x">
          <Reveal direction="zoom">
            <SpotlightCard className="p-8 sm:p-14 bg-gradient-to-r from-accent via-card to-accent border-primary/30 shadow-2xl">
              <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center">
                <div>
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                    <TrendingUp className="size-4" /> Interactive Lead Calculator
                  </div>
                  <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                    Project Your Lead Pipeline Scale
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed text-base">
                    Adjust your monthly campaign ad budget slider to see projected qualified lead volume and pipeline value.
                  </p>

                  <div className="mt-8 rounded-2xl border border-border bg-background p-6 shadow-inner">
                    <div className="flex justify-between items-center text-sm font-bold text-foreground">
                      <span>Monthly Campaign Budget:</span>
                      <span className="text-xl text-primary font-extrabold">
                        ₹{adSpend.toLocaleString("en-IN")} / mo
                      </span>
                    </div>

                    <input
                      type="range"
                      min="10000"
                      max="1000000"
                      step="10000"
                      value={adSpend}
                      onChange={(e) => setAdSpend(parseInt(e.target.value, 10))}
                      className="mt-4 w-full accent-primary cursor-pointer h-2.5 bg-border rounded-lg"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>₹10,000</span>
                      <span>₹5,00,000</span>
                      <span>₹10,00,000+</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="rounded-2xl border border-border bg-background/90 p-6 text-center shadow-lg backdrop-blur-md">
                    <Target className="mx-auto size-8 text-primary" />
                    <p className="mt-3 text-3xl font-extrabold text-foreground">
                      ~{projectedLeads.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wider">
                      Est. Qualified Leads / Mo
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-background/90 p-6 text-center shadow-lg backdrop-blur-md">
                    <PieChart className="mx-auto size-8 text-rose-500" />
                    <p className="mt-3 text-3xl font-extrabold text-foreground">
                      ₹{projectedPipelineVal.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wider">
                      Est. Pipeline Value
                    </p>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </section>

      {/* Luxurious Bottom CTA Banner */}
      <section className="ink-panel relative overflow-hidden py-20 lg:py-28 text-center">
        <div className="container-x relative z-10">
          <Reveal direction="zoom">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Ready to Build a Predictable Lead Generation Machine?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-ink-foreground/80 text-lg leading-relaxed">
              Schedule a lead engine audit and funnel strategy session with our senior growth team.
            </p>
            <Link
              to="/contact"
              className="button-shine mt-9 inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-primary via-red-600 to-rose-600 px-9 py-4 font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-all duration-300 hover:scale-[1.05]"
            >
              <span>Get Free Lead Engine Audit</span>
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
