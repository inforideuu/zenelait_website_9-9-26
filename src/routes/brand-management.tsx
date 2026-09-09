import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Compass,
  UserCheck,
  Newspaper,
  Megaphone,
  Zap,
  Award,
  PieChart,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { SpotlightCard } from "@/components/SpotlightCard";

const brandHeroImg = "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1024&auto=format&fit=crop&q=80";
const ormRealImg = "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1024&auto=format&fit=crop&q=80";
const brandStrategyRealImg = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1024&auto=format&fit=crop&q=80";
const personalBrandingRealImg = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1024&auto=format&fit=crop&q=80";
const digitalPrRealImg = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1024&auto=format&fit=crop&q=80";
const brandAwarenessRealImg = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1024&auto=format&fit=crop&q=80";

const title = "Brand Management Services — ORM, Strategy, PR & Personal Branding | Zenelait Infotech";
const description =
  "Comprehensive Brand Management services by Zenelait Infotech: Online Reputation Management (ORM), Brand Strategy, Personal Branding, Digital PR, and Brand Awareness Campaigns.";

export const Route = createFileRoute("/brand-management")({
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
  component: BrandManagementPage,
});

const brandPillars = [
  {
    id: "orm",
    title: "Online Reputation Management (ORM)",
    short: "Reputation Protection & Shielding",
    icon: ShieldCheck,
    image: ormRealImg,
    tagline: "Protect your brand authority and engineer positive search engine sentiment.",
    overview:
      "Online Reputation Management (ORM) safeguards your brand against negative digital PR, bad reviews, and misleading content. We suppress negative search results with high-authority positive assets, monitor brand review sentiment 24/7, and build bulletproof digital trust.",
    points: [
      "Page 1 Search Engine Result Page (SERP) Sentiment Suppression",
      "24/7 Review Ecosystem Monitoring (Google, Trustpilot, Glassdoor)",
      "Automated Review Generation & Positive Customer Feedback Loops",
      "Crisis Management Protocols & Negative Search Result Removal",
    ],
  },
  {
    id: "brand-strategy",
    title: "Brand Strategy",
    short: "Positioning & Market Differentiation",
    icon: Compass,
    image: brandStrategyRealImg,
    tagline: "Define an unforgettable brand identity that commands premium pricing.",
    overview:
      "A strong brand strategy creates market monopoly. We architect your core brand positioning, competitive differentiators, visual design language, tone of voice, and brand guidelines to ensure consistent luxury perception across every customer touchpoint.",
    points: [
      "Competitive Market Positioning & Category Design Strategy",
      "Brand Core Values, Mission, Purpose & Vision Framing",
      "Tone of Voice, Copywriting Stylebook & Messaging Hierarchy",
      "Visual Identity System, Logo System & Color Palette Governance",
    ],
  },
  {
    id: "personal-branding",
    title: "Personal Branding",
    short: "Executive & Founder Authority",
    icon: UserCheck,
    image: personalBrandingRealImg,
    tagline: "Position founders and executives as recognized industry thought leaders.",
    overview:
      "People trust people before they trust companies. We build high-profile executive and founder personal brands across LinkedIn, Twitter, press media, and keynote speaking circuits — transforming leadership authority into enterprise deal velocity.",
    points: [
      "Executive LinkedIn & Twitter Ghostwriting & Thought Leadership",
      "Keynote Speaking & Industry Panel Media Booking",
      "Founder Storytelling, Podcast Guesting & Video Content",
      "Executive Wikipedia, PR Feature & Authority Bio Building",
    ],
  },
  {
    id: "digital-pr",
    title: "Digital PR",
    short: "Media Placements & High-DA Citations",
    icon: Newspaper,
    image: digitalPrRealImg,
    tagline: "Earn coverage in top tier news publications and high-authority industry media.",
    overview:
      "Digital PR elevates your brand above competitors through earned media features in major news outlets, trade magazines, and industry blogs. We secure high-authority editorial mentions, press releases, and backlink citations that boost domain trust.",
    points: [
      "Tier-1 Press Release Distribution & Journalist Pitching",
      "Editorial Features in Major Business & Trade Publications",
      "High Domain Authority (DA 80+) Organic Media Backlinks",
      "Data-Driven Industry Study & Market Report PR Distribution",
    ],
  },
  {
    id: "brand-awareness",
    title: "Brand Awareness Campaigns",
    short: "Multi-Channel Market Reach",
    icon: Megaphone,
    image: brandAwarenessRealImg,
    tagline: "Maximize brand recall and share of voice across your target market.",
    overview:
      "Brand Awareness Campaigns ensure your company is top-of-mind whenever buyers enter the market. We execute high-impact video storytelling, multi-channel display broadcasts, social media reach campaigns, and high-frequency brand touchpoints.",
    points: [
      "Multi-Channel Video & Cinematic Display Awareness Campaigns",
      "Targeted Share-of-Voice (SOV) Expansion & Audience Frequency",
      "Brand Lift Metrics, Ad Recall & Impression Reach Tracking",
      "Cross-Platform Brand Storytelling & Sponsorship Activations",
    ],
  },
];

function BrandManagementPage() {
  const [mediaBudget, setMediaBudget] = useState(10);

  // Brand equity simulation
  const projectedImpressions = Math.round(mediaBudget * 250000);
  const projectedPRFeatures = Math.round(mediaBudget * 2.2);

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
                <span>Brand Management Suite</span>
              </div>
            </Reveal>

            <div className="mt-6">
              <TextReveal
                text="Build an Unshakable Brand Authority, High Reputation & Executive Prestige"
                highlightWords={["Unshakable", "Brand", "Authority"]}
                highlightClass="italic text-primary"
                className="text-4xl font-extrabold sm:text-5xl lg:text-6xl text-white leading-[1.08]"
              />
            </div>

            <Reveal delay={200} direction="up">
              <p className="mt-6 max-w-xl text-ink-foreground/85 text-lg leading-relaxed">
                From Online Reputation Management (ORM) and strategic brand positioning to executive personal branding,
                Digital PR, and high-impact brand awareness campaigns — we elevate your market prestige.
              </p>
            </Reveal>

            <Reveal delay={300} direction="up">
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="button-shine inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-primary via-red-600 to-rose-600 px-8 py-4 font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-all duration-300 hover:scale-[1.04] hover:shadow-red-500/40"
                >
                  <Zap className="size-4" />
                  <span>Request Brand Audit</span>
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="#brand-pillars"
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
                src={brandHeroImg}
                alt="Brand Management & Online Reputation Management Dashboard Visual"
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
            { label: "Positive SERP Sentiment", val: "99.4%" },
            { label: "Media Features Secured", val: "850+" },
            { label: "Executive Followers Built", val: "2.5M+" },
            { label: "Brand Equity Lift", val: "+310%" },
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

      {/* 5 Brand Management Pillars Detailed Breakdown */}
      <section id="brand-pillars" className="container-x py-20 lg:py-28">
        <Reveal className="text-center">
          <h2 className="red-underline inline-block text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            5 Pillars of Brand Prestige
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-muted-foreground text-lg">
            A comprehensive reputation and positioning framework engineered for enterprise industry leaders.
          </p>
        </Reveal>

        <div className="mt-20 space-y-24">
          {brandPillars.map((pillar, index) => {
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
                      className="w-full object-cover object-top h-[340px] sm:h-[420px] transition-transform duration-700 group-hover:scale-105"
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
                      <span>Build {pillar.title}</span>
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Brand Equity & Reach Calculator */}
      <section className="border-t border-border/80 bg-surface/90 py-20 lg:py-28 backdrop-blur-md">
        <div className="container-x">
          <Reveal direction="zoom">
            <SpotlightCard className="p-8 sm:p-14 bg-gradient-to-r from-accent via-card to-accent border-primary/30 shadow-2xl">
              <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center">
                <div>
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                    <TrendingUp className="size-4" /> Interactive Brand Reach Simulator
                  </div>
                  <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                    Estimate Brand Share of Voice Growth
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed text-base">
                    Adjust your PR and brand campaign intensity slider to project potential media impressions and press features.
                  </p>

                  <div className="mt-8 rounded-2xl border border-border bg-background p-6 shadow-inner">
                    <div className="flex justify-between items-center text-sm font-bold text-foreground">
                      <span>Brand Campaign Scale:</span>
                      <span className="text-xl text-primary font-extrabold">
                        {mediaBudget}x Intensity Level
                      </span>
                    </div>

                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="1"
                      value={mediaBudget}
                      onChange={(e) => setMediaBudget(parseInt(e.target.value, 10))}
                      className="mt-4 w-full accent-primary cursor-pointer h-2.5 bg-border rounded-lg"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>1x Base</span>
                      <span>10x Accelerated</span>
                      <span>20x National Domination</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="rounded-2xl border border-border bg-background/90 p-6 text-center shadow-lg backdrop-blur-md">
                    <Award className="mx-auto size-8 text-primary" />
                    <p className="mt-3 text-3xl font-extrabold text-foreground">
                      {(projectedImpressions / 1000000).toFixed(1)}M+
                    </p>
                    <p className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wider">
                      Est. Brand Impressions
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-background/90 p-6 text-center shadow-lg backdrop-blur-md">
                    <PieChart className="mx-auto size-8 text-rose-500" />
                    <p className="mt-3 text-3xl font-extrabold text-foreground">
                      ~{projectedPRFeatures}
                    </p>
                    <p className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wider">
                      Est. Tier-1 Media Features
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
              Ready to Command the Top Brand Reputation in Your Industry?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-ink-foreground/80 text-lg leading-relaxed">
              Schedule a brand strategy session and reputation audit with our senior advisors.
            </p>
            <Link
              to="/contact"
              className="button-shine mt-9 inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-primary via-red-600 to-rose-600 px-9 py-4 font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-all duration-300 hover:scale-[1.05]"
            >
              <span>Get Free Brand Audit</span>
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
