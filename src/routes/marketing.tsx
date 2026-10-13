import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, Sparkles, TrendingUp, Target, BarChart2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { SpotlightCard } from "@/components/SpotlightCard";
import { nonItProducts } from "@/data/products";
import { IndustrySolutionsFilter } from "@/components/IndustrySolutionsFilter";
import mktImg from "@/assets/abstract-marketing.jpg";

const title = "Marketing Services — SEM, Paid Ads, Social, Content | Zenelait Infotech";
const description =
  "Non-IT growth services from Zenelait Infotech: search engine marketing, paid advertising, social media, content, direct marketing, lead generation, branding, analytics, video and graphics design.";

export const Route = createFileRoute("/marketing")({
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
  component: Marketing,
});

function Marketing() {
  const [budgetMultiplier, setBudgetMultiplier] = useState(3);

  return (
    <div>
      {/* Hero Header Banner matching About Us page reference design */}
      <section className="relative min-h-[620px] w-full overflow-hidden rounded-xl bg-[#0d090b] text-white lg:min-h-[680px]">
        {/* Background Image with Overlays */}
        <div className="absolute inset-0">
          <img
            src="marketing_service.png"
            alt="Zenelait Marketing Growth Services Strategy"
            className="h-full w-full object-cover object-[65%_center] opacity-85"
          />
          {/* Dark left-to-right gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d090b] via-[#0d090b]/85 to-[#0d090b]/20" />
          {/* Bottom gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d090b]/75 via-transparent to-[#0d090b]/20" />
        </div>

        {/* Content */}
        <div className="container-x relative z-10 flex min-h-[620px] items-center py-16 lg:min-h-[680px]">
          <div className="max-w-[720px]">
            {/* Tag Badge */}
            <Reveal direction="down">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-black/40 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
                <Sparkles className="size-3.5" />
                <span>Non-IT Growth Services</span>
              </div>
            </Reveal>

            {/* Main Headline */}
            <Reveal delay={100} direction="up">
              <h1 className="mt-6 text-3xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[66px]">
                <span className="block sm:inline-block sm:whitespace-nowrap">Demand Built Deliberately</span>{" "}
                <br className="hidden sm:block" />
                <span className="text-primary block sm:inline-block sm:whitespace-nowrap">
                  & Scaled Consistently
                </span>
              </h1>
            </Reveal>

            {/* Description Subtext */}
            <Reveal delay={200} direction="up">
              <p className="mt-6 max-w-[520px] text-base font-medium leading-relaxed text-white/75 sm:text-lg">
                Ten growth services covering everything from brand position and design identity to paid acquisition, SEO, social, and revenue performance—run by unified specialists.
              </p>
            </Reveal>

            {/* Dual Action Buttons */}
            <Reveal delay={300} direction="up">
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-sm bg-primary px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90 hover:shadow-primary/50"
                >
                  Start Marketing Audit
                </a>

                <a
                  href="it-products"
                  className="inline-flex items-center justify-center rounded-sm border border-white/40 bg-black/20 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white/10"
                >
                  Explore Services
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      

      {/* Services Grid */}
      <section className="container-x py-12 lg:py-16">
        <div className="grid gap-6 sm:gap-7 grid-cols-1 md:grid-cols-3">
          {nonItProducts.map((p, i) => {
            let targetRoute = "/contact";
            let actionLabel = "Read More";
            if (p.short === "SEM") { targetRoute = "/search-engine-marketing"; actionLabel = "View 6 SEO Pillars"; }
            else if (p.short === "Paid Ads") { targetRoute = "/paid-advertising"; actionLabel = "View 6 Paid Ad Channels"; }
            else if (p.short === "Social" || p.short === "SMM") { targetRoute = "/social-media-marketing"; actionLabel = "View 6 Social Media Pillars"; }
            else if (p.short === "Content") { targetRoute = "/content-marketing"; actionLabel = "View 6 Content Pillars"; }
            else if (p.short === "Direct") { targetRoute = "/direct-marketing"; actionLabel = "View 5 Direct Channels"; }
            else if (p.short === "Leads") { targetRoute = "/lead-generation"; actionLabel = "View 5 Lead Gen Pillars"; }
            else if (p.short === "Brand" || p.short === "Branding") { targetRoute = "/brand-management"; actionLabel = "View 5 Brand Pillars"; }
            else if (p.short === "Analytics" || p.short === "Reporting") { targetRoute = "/analytics-reporting"; actionLabel = "View 5 Analytics Pillars"; }
            else if (p.short === "Video" || p.short === "Video Production") { targetRoute = "/video-production"; actionLabel = "View 12 Video Pillars"; }
            else if (p.short === "Design" || p.short === "Graphic Design") { targetRoute = "/graphic-design"; actionLabel = "View 15 Design Pillars"; }

            return (
              <Reveal key={p.short} delay={(i % 3) * 90} direction="up" className="h-full">
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-md hover:shadow-2xl transition-all duration-300">
                  {/* Topic Header Image */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-muted">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-30 transition-opacity group-hover:opacity-10" />
                  </div>

                  {/* Card Content Body */}
                  <div className="flex flex-1 flex-col p-6">
                    {/* Pill Tag */}
                    <div>
                      <span className="inline-block rounded-md bg-[#18182b] text-white px-3 py-1 text-xs font-semibold uppercase tracking-wider shadow-xs">
                        {p.tag || p.short}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h2 className="mt-3.5 text-xl font-bold sm:text-2xl text-foreground group-hover:text-primary transition-colors leading-snug">
                      {p.name}
                    </h2>
                    <p className="mt-2.5 text-sm sm:text-base text-muted-foreground leading-relaxed flex-1">
                      {p.description}
                    </p>

                    {/* Key Feature Points */}
                    <ul className="mt-5 space-y-2 border-t border-border/50 pt-4">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2 text-xs sm:text-sm font-medium text-foreground/90">
                          <div className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary mt-0.5">
                            <Check className="size-3" />
                          </div>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Footer Link */}
                    <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                      <Link
                        to={targetRoute}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-foreground hover:text-primary transition-colors group/link"
                      >
                        <span className="underline underline-offset-4 decoration-muted-foreground/40 group-hover/link:decoration-primary">
                          {actionLabel}
                        </span>
                        <span className="text-primary text-sm font-extrabold transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                          ↗
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Interactive Growth Simulator Widget */}
      <section className="container-x pt-14 pb-6">
        <Reveal direction="zoom">
          <SpotlightCard className="p-8 sm:p-10 bg-gradient-to-r from-accent via-card to-accent border-primary/20">
            <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] items-center">
              <div>
                <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                  <TrendingUp className="size-4" /> Growth Engine Simulator
                </div>
                <h3 className="mt-3 text-2xl font-bold">Pipeline Projection</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Adjust the growth intensity multiplier to see how paired search, paid media & AI chatbots compound acquisition velocity.
                </p>

                <div className="mt-6">
                  <div className="flex justify-between text-xs font-bold text-foreground">
                    <span>Target Scale:</span>
                    <span className="text-primary">{budgetMultiplier}x Scale</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={budgetMultiplier}
                    onChange={(e) => setBudgetMultiplier(parseInt(e.target.value, 10))}
                    className="mt-3 w-full accent-primary cursor-pointer h-2 bg-border rounded-lg"
                  />
                  <div className="flex justify-between text-[0.75rem] text-muted-foreground mt-1">
                    <span>1x Organic</span>
                    <span>3x Accelerated</span>
                    <span>5x Hyper Growth</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-background p-5 text-center shadow-sm">
                  <Target className="mx-auto size-6 text-primary" />
                  <p className="mt-2 text-2xl font-extrabold text-foreground">
                    {budgetMultiplier * 45}%
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Lead Conversion Lift</p>
                </div>

                <div className="rounded-xl border border-border bg-background p-5 text-center shadow-sm">
                  <BarChart2 className="mx-auto size-6 text-rose-500" />
                  <p className="mt-2 text-2xl font-extrabold text-foreground">
                    {budgetMultiplier * 3.2}x
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Pipeline ROI Velocity</p>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </Reveal>
      </section>

      {/* Industry-Specific Solutions Filter (Vertical Showcase) */}
      <IndustrySolutionsFilter />

      {/* Bottom CTA */}
      <section className="ink-panel relative overflow-hidden py-16 lg:py-20">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="container-x relative z-10 text-center">
          <Reveal direction="zoom">
            <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl text-white">
              One team for product and pipeline
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-ink-foreground/80 text-lg leading-relaxed">
              Pair any marketing service with our CRM and AI chatbot to track every lead from first
              click to signed order.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="button-shine inline-flex items-center gap-2.5 rounded-lg bg-primary px-8 py-3.5 font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:scale-[1.04]"
              >
                <span>Get a growth plan</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/it-products"
                className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-8 py-3.5 font-bold text-white transition-colors hover:border-primary hover:text-primary"
              >
                See IT Products
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
