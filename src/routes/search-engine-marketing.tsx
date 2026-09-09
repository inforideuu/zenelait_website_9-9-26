import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  MapPin,
  Code2,
  FileText,
  Share2,
  Store,
  Sparkles,
  Check,
  Sliders,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { SpotlightCard } from "@/components/SpotlightCard";

import semHeroImg from "@/assets/sem-hero.png";
import localSeoImg from "@/assets/local-seo.png";
import technicalSeoImg from "@/assets/technical-seo.png";
import onpageSeoImg from "@/assets/onpage-seo.png";
import offpageSeoImg from "@/assets/offpage-seo.png";
import gbpImg from "@/assets/gbp-optimization.png";

const title = "Search Engine Marketing & SEO Services — Zenelait Infotech";
const description =
  "Comprehensive Search Engine Marketing & SEO services by Zenelait Infotech: Local SEO, Technical SEO, On-Page SEO, Off-Page SEO, and Google Business Profile Optimization.";

export const Route = createFileRoute("/search-engine-marketing")({
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
  component: SearchEngineMarketingPage,
});

const seoServices = [
  {
    id: "seo",
    title: "Search Engine Optimization (SEO)",
    short: "Organic Growth Strategy",
    icon: Globe,
    image: semHeroImg,
    tagline: "Drive high-intent buyer traffic and dominate search results sustainably.",
    overview:
      "Search Engine Optimization (SEO) is the backbone of digital visibility. We engineer full-funnel search strategies that align your technical architecture, content strategy, and domain authority with active customer search intent.",
    points: [
      "In-depth Keyword Intent & Search Volume Analysis",
      "Competitor Gap & Opportunity Matrix",
      "Search Engine Result Page (SERP) Domination",
      "Sustainable Organic Lead & Conversion Engineering",
    ],
  },
  {
    id: "local-seo",
    title: "Local SEO",
    short: "Geo-Targeted Visibility",
    icon: MapPin,
    image: localSeoImg,
    tagline: "Capture nearby customers actively searching for your products and services.",
    overview:
      "Local SEO ensures your business ranks at the top of localized searches and map packs. We optimize location pages, geo-targeted schema, NAP consistency across directories, and location-based keywords.",
    points: [
      "Hyper-local Geo-targeted Keyword Targeting",
      "Name, Address, Phone (NAP) Directory Synchronization",
      "Localized Landing Page & Schema Architecture",
      "Geo-fenced Competitor Market Share Expansion",
    ],
  },
  {
    id: "technical-seo",
    title: "Technical SEO",
    short: "Crawlability & Performance",
    icon: Code2,
    image: technicalSeoImg,
    tagline: "Ensure search crawlers index and rank your platform without technical friction.",
    overview:
      "Technical SEO optimizes the foundational structure of your website for search engines. We diagnose and resolve crawling errors, optimize site speed, fix Core Web Vitals, implement structured JSON-LD schema, and refine site hierarchy.",
    points: [
      "Core Web Vitals & Page Load Velocity Optimization",
      "XML Sitemap, Robots.txt & Crawl Budget Management",
      "Structured Schema Data (JSON-LD) Implementation",
      "Mobile-First Indexing & JavaScript SSR Optimization",
    ],
  },
  {
    id: "on-page-seo",
    title: "On-Page SEO",
    short: "Content & Metadata",
    icon: FileText,
    image: onpageSeoImg,
    tagline: "Optimize page structure, content relevance, and metadata for top rankings.",
    overview:
      "On-Page SEO aligns individual pages with targeted search queries. We craft compelling meta titles, descriptions, H1-H6 heading structures, keyword placement, image ALT optimization, and internal link silos.",
    points: [
      "Semantic Heading & Topic Silo Structuring",
      "Meta Tag & High-CTR Description Engineering",
      "Internal Linking Clusters & Page Rank Sculpting",
      "Content Readability & Search Intent Alignment",
    ],
  },
  {
    id: "off-page-seo",
    title: "Off-Page SEO",
    short: "Authority & Backlinks",
    icon: Share2,
    image: offpageSeoImg,
    tagline: "Build domain authority, digital PR, and trusted brand backlink networks.",
    overview:
      "Off-Page SEO builds your domain's trust and authority in the eyes of search algorithms. We execute high-authority backlink outreach, digital PR, brand citation building, and disavow harmful spam links.",
    points: [
      "High Domain Authority (DA) Outreach & Backlinks",
      "Digital PR & Brand Mention Acquisition",
      "Link Velocity & Anchor Text Distribution Management",
      "Spam Link Audit & Disavow Execution",
    ],
  },
  {
    id: "gbp-optimization",
    title: "Google Business Profile Optimization",
    short: "Google Maps Domination",
    icon: Store,
    image: gbpImg,
    tagline: "Secure Top 3 spots in Google Maps and drive instant phone calls & directions.",
    overview:
      "Google Business Profile (GBP) is the primary driver of immediate local inquiries. We optimize your profile category selection, geotagged product updates, customer review generation workflows, and Q&A management.",
    points: [
      "Google Local 3-Pack Ranking Domination",
      "Geo-tagged Photo & Weekly Post Scheduling",
      "Review Generation & Automated Sentiment Response",
      "Primary & Secondary Category Placement Optimization",
    ],
  },
];

function SearchEngineMarketingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="ink-panel relative overflow-hidden py-16 lg:py-24">
        <div className="pointer-events-none absolute -bottom-32 -right-20 size-[32rem] rounded-full bg-primary/20 blur-3xl animate-float-slow" />
        <div className="container-x relative z-10 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Reveal direction="down">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary backdrop-blur-md">
                <Sparkles className="size-3.5" />
                <span>Search Engine Marketing</span>
              </div>
            </Reveal>

            <div className="mt-6">
              <TextReveal
                text="Dominate Search Engine Rankings with Precision Engineering"
                highlightWords={["Search", "Engine", "Rankings"]}
                highlightClass="italic text-primary"
                className="text-4xl font-extrabold sm:text-5xl lg:text-6xl text-white leading-[1.1]"
              />
            </div>

            <Reveal delay={200} direction="up">
              <p className="mt-6 max-w-xl text-ink-foreground/80 text-lg leading-relaxed">
                From Local SEO and Google Business Profile optimization to Technical, On-Page, and
                Off-Page SEO — we engineer predictable organic growth and search engine market share.
              </p>
            </Reveal>

            <Reveal delay={300} direction="up">
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="button-shine inline-flex items-center gap-2.5 rounded-lg bg-primary px-7 py-3.5 font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:scale-[1.04]"
                >
                  <span>Request Free SEO Audit</span>
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="#services-breakdown"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-7 py-3.5 font-bold text-white transition-colors hover:border-primary hover:text-primary"
                >
                  Explore 6 Pillars
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} direction="zoom">
            <div className="relative group overflow-hidden rounded-2xl border border-white/15 shadow-2xl">
              <img
                src={semHeroImg}
                alt="Search Engine Marketing and Rank Analytics Visual"
                loading="lazy"
                width={1024}
                height={768}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Overview Stats Bar */}
      <section className="border-y border-border bg-surface/90 py-8 backdrop-blur-md">
        <div className="container-x grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { label: "Organic Search Growth", val: "300%+" },
            { label: "Top 3 SERP Placements", val: "85%+" },
            { label: "Core Web Vitals Pass Rate", val: "100%" },
            { label: "Local Map Pack Reach", val: "10x" },
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

      {/* Services Detailed Breakdown */}
      <section id="services-breakdown" className="container-x py-16 lg:py-24">
        <Reveal className="text-center">
          <h2 className="red-underline inline-block text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            The 6 Pillars of Search Dominance
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-muted-foreground text-lg">
            Every pillar engineered to capture search traffic at every stage of the buyer journey.
          </p>
        </Reveal>

        <div className="mt-16 space-y-20">
          {seoServices.map((svc, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={svc.id}
                id={svc.id}
                className="grid gap-12 items-center lg:grid-cols-2 scroll-mt-28"
              >
                <Reveal
                  direction={isEven ? "left" : "right"}
                  className={isEven ? "lg:order-1" : "lg:order-2"}
                >
                  <div className="relative group overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                    <img
                      src={svc.image}
                      alt={svc.title}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="w-full object-cover h-[320px] sm:h-[400px] transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                      <span className="self-start rounded-full bg-primary px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md">
                        {svc.short}
                      </span>
                      <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{svc.title}</h3>
                    </div>
                  </div>
                </Reveal>

                <Reveal
                  direction={isEven ? "right" : "left"}
                  className={isEven ? "lg:order-2" : "lg:order-1"}
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm mb-4">
                    <svc.icon className="size-6" />
                  </div>
                  <h3 className="text-3xl font-extrabold sm:text-4xl">{svc.title}</h3>
                  <p className="mt-3 text-lg font-semibold text-primary">{svc.tagline}</p>
                  <p className="mt-4 text-muted-foreground leading-relaxed text-base">
                    {svc.overview}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {svc.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-sm font-medium text-foreground">
                        <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Link
                      to="/contact"
                      className="story-link inline-flex items-center gap-2 font-bold text-primary"
                    >
                      <span>Get {svc.title} Plan</span>
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Audit Checklist Widget */}
      <section className="border-t border-border bg-surface/80 py-16 lg:py-24 backdrop-blur-md">
        <div className="container-x">
          <Reveal direction="zoom">
            <SpotlightCard className="p-8 sm:p-12 bg-gradient-to-r from-accent via-card to-accent border-primary/20">
              <div className="grid gap-10 lg:grid-cols-2 items-center">
                <div>
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                    <Sliders className="size-4" /> Free SEO Health Assessment
                  </div>
                  <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                    Is your website optimized for Google?
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    Check off key signals to assess your current SEO readiness. Our engineers provide
                    a comprehensive diagnostic audit for qualified enterprises.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                      to="/contact"
                      className="button-shine inline-flex items-center gap-2.5 rounded-lg bg-primary px-7 py-3.5 font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:scale-[1.04]"
                    >
                      <span>Request Complete Audit</span>
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-background p-6 space-y-3 shadow-inner">
                  {[
                    "Google Business Profile 3-Pack Verified",
                    "Core Web Vitals Pass (Mobile & Desktop)",
                    "JSON-LD Schema Structured Data Configured",
                    "Keyword Intent-Matched Page Hierarchy",
                    "Clean Backlink Profile & Authority Score",
                  ].map((check) => (
                    <div
                      key={check}
                      className="flex items-center gap-3 p-3 rounded-lg border border-border/60 bg-card hover:border-primary/40 transition-colors"
                    >
                      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                        <Check className="size-4" />
                      </div>
                      <span className="text-sm font-semibold text-foreground">{check}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="ink-panel relative overflow-hidden py-16 lg:py-24 text-center">
        <div className="container-x relative z-10">
          <Reveal direction="zoom">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Ready to Own the Search Results in Your Industry?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-ink-foreground/80 text-lg">
              Let us build a customized Search Engine Marketing strategy for your business.
            </p>
            <Link
              to="/contact"
              className="button-shine mt-8 inline-flex items-center gap-2.5 rounded-lg bg-primary px-8 py-3.5 font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:scale-[1.04]"
            >
              <span>Get Started Today</span>
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
