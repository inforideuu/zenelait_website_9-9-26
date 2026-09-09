import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Search,
  Share2,
  Video,
  Building2,
  Layout,
  Repeat,
  DollarSign,
  PieChart,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { SpotlightCard } from "@/components/SpotlightCard";

import heroImg from "@/assets/paid-ads-hero.png";
import googleAdsImg from "@/assets/google-ads.png";
import metaAdsImg from "@/assets/meta-ads.png";
import youtubeAdsImg from "@/assets/youtube-ads.png";
import linkedinAdsImg from "@/assets/linkedin-ads.png";
import displayAdsImg from "@/assets/display-ads.png";
import remarketingImg from "@/assets/remarketing.png";

const title = "Paid Advertising Services — Google, Meta, YouTube & LinkedIn Ads | Zenelait Infotech";
const description =
  "High-performance Paid Advertising & ROAS campaign engineering by Zenelait Infotech: Google Ads, Meta Ads (Facebook & Instagram), YouTube Ads, LinkedIn Ads, Display Ads, and Remarketing.";

export const Route = createFileRoute("/paid-advertising")({
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
  component: PaidAdvertisingPage,
});

const adChannels = [
  {
    id: "google-ads",
    title: "Google Ads",
    short: "Search & Shopping Intent",
    icon: Search,
    image: googleAdsImg,
    tagline: "Capture high-intent buyers the exact moment they search for your solution.",
    overview:
      "Google Ads places your brand at the absolute top of search engine results when buyers express immediate purchase intent. We engineer high-ROAS Search, Performance Max, and Shopping campaigns optimized around target CPA and customer acquisition profit.",
    points: [
      "High-Intent Search & Performance Max Campaign Scaling",
      "Negative Keyword & Negative Match Budget Sculpting",
      "Conversion Value-Based Smart Bidding & Target ROAS",
      "Single Keyword Ad Group (SKAG) & Dynamic Search Ads",
    ],
  },
  {
    id: "meta-ads",
    title: "Meta Ads (Facebook & Instagram)",
    short: "Visual & Social Commerce",
    icon: Share2,
    image: metaAdsImg,
    tagline: "Stop the scroll with high-converting visual creative and precision audience targeting.",
    overview:
      "Meta Ads leverage deep demographic, behavioral, and interest data across Facebook and Instagram Feeds, Stories, and Reels. We build full-funnel ad account structures combining thumb-stopping video creative with custom lookalike audiences.",
    points: [
      "Feed, Story, and Reels Native Video & Image Creative",
      "Custom Audience & 1-5% Lookalike Audience Scaling",
      "Advantage+ Shopping & Automated Campaign Budgeting (CBO)",
      "A/B Creative Hook & Copy Variation Matrix Testing",
    ],
  },
  {
    id: "youtube-ads",
    title: "YouTube Ads",
    short: "Video & Brand Authority",
    icon: Video,
    image: youtubeAdsImg,
    tagline: "Engage captive audiences with cinematic video ads on the world's second-largest search engine.",
    overview:
      "YouTube Ads drive deep brand awareness and high-intent conversions through skippable in-stream, bumper, and in-feed video ads. We align video storytelling with targeted audience segments to capture attention and scale qualified sales volume.",
    points: [
      "Skippable In-Stream & 6-Second Bumper Video Formats",
      "In-Market & Custom Intent Search Keyword Targeting",
      "Interactive Call-to-Action Overlays & Product Cards",
      "View-Through Conversion & Frequency Cap Optimization",
    ],
  },
  {
    id: "linkedin-ads",
    title: "LinkedIn Ads",
    short: "B2B & Executive Targeting",
    icon: Building2,
    image: linkedinAdsImg,
    tagline: "Reach decision-makers, executives, and enterprise buyers with precision B2B targeting.",
    overview:
      "LinkedIn Ads are the pinnacle of B2B performance marketing. We target decision-makers by exact job title, company size, industry vertical, and seniority level, generating high-ticket enterprise leads and scheduled sales demos.",
    points: [
      "Job Title, Seniority & Company Size B2B Targeting",
      "Native Lead Gen Form Integration with CRM Auto-Sync",
      "Account-Based Marketing (ABM) Company List Ingestion",
      "Sponsored Content, InMail & Thought Leadership Ads",
    ],
  },
  {
    id: "display-ads",
    title: "Display Ads",
    short: "Programmatic Brand Reach",
    icon: Layout,
    image: displayAdsImg,
    tagline: "Maximize brand coverage across millions of premium publisher websites and apps.",
    overview:
      "Display Advertising builds ubiquitous brand presence across top news, industry, and lifestyle websites. We deploy eye-catching HTML5 responsive banner sets, contextual placements, and affinity network targeting.",
    points: [
      "Google Display Network (GDN) & Programmatic Placements",
      "Rich Media HTML5 Animated Banner Design",
      "Contextual Topic & Publisher Placement Whitelisting",
      "Viewability Rate & Invalid Traffic (IVT) Filtering",
    ],
  },
  {
    id: "remarketing",
    title: "Remarketing Campaigns",
    short: "Conversion Loop & Retargeting",
    icon: Repeat,
    image: remarketingImg,
    tagline: "Convert past website visitors into buyers with personalized cross-channel retargeting.",
    overview:
      "Up to 97% of first-time website visitors leave without converting. Our multi-tier remarketing campaigns track user behavior, showing hyper-relevant product recommendations, customer testimonials, and limited-time offers to bring them back to close.",
    points: [
      "Dynamic Product Retargeting & Cart Recovery Sequences",
      "Multi-Tier Audience Recency Segmentation (1d, 7d, 30d, 90d)",
      "Cross-Platform Retargeting across Google, Meta & LinkedIn",
      "Ad Burnout Prevention with Frequency Capping & Creative Rotation",
    ],
  },
];

function PaidAdvertisingPage() {
  const [adSpend, setAdSpend] = useState(5000);

  // ROAS calculation simulation
  const projectedReturn = Math.round(adSpend * 4.2);
  const projectedLeads = Math.round((adSpend / 45) * 3.5);

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
                <span>Paid Advertising Suite</span>
              </div>
            </Reveal>

            <div className="mt-6">
              <TextReveal
                text="Engineered High-ROAS Performance Campaigns Across Every Ad Channel"
                highlightWords={["High-ROAS", "Performance", "Campaigns"]}
                highlightClass="italic text-primary"
                className="text-4xl font-extrabold sm:text-5xl lg:text-6xl text-white leading-[1.08]"
              />
            </div>

            <Reveal delay={200} direction="up">
              <p className="mt-6 max-w-xl text-ink-foreground/85 text-lg leading-relaxed">
                Scale revenue with data-driven paid advertising across Google, Meta, YouTube,
                LinkedIn, Programmatic Display, and Retargeting campaigns managed by senior growth strategists.
              </p>
            </Reveal>

            <Reveal delay={300} direction="up">
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="button-shine inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-primary via-red-600 to-rose-600 px-8 py-4 font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-all duration-300 hover:scale-[1.04] hover:shadow-red-500/40"
                >
                  <Zap className="size-4" />
                  <span>Request Ad Audit & Strategy</span>
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="#ad-channels"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-md transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
                >
                  Explore 6 Ad Channels
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} direction="zoom">
            <div className="relative group overflow-hidden rounded-3xl border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-amber-500/30 blur-2xl opacity-60 transition-all duration-700 group-hover:opacity-90" />
              <img
                src={heroImg}
                alt="Paid Advertising Performance Analytics Dashboard Visual"
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
            { label: "Average Campaign ROAS", val: "4.2x - 8.5x" },
            { label: "Cost Per Lead Reduction", val: "-40%" },
            { label: "Conversion Rate Lift", val: "+220%" },
            { label: "Ad Spend Managed", val: "$10M+" },
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

      {/* 6 Ad Channels Detailed Breakdown */}
      <section id="ad-channels" className="container-x py-20 lg:py-28">
        <Reveal className="text-center">
          <h2 className="red-underline inline-block text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            6 High-Converting Paid Ad Channels
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-muted-foreground text-lg">
            Multi-channel advertising strategies tailored to capture buyers wherever they spend time online.
          </p>
        </Reveal>

        <div className="mt-20 space-y-24">
          {adChannels.map((channel, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={channel.id}
                id={channel.id}
                className="grid gap-12 items-center lg:grid-cols-2 scroll-mt-28"
              >
                <Reveal
                  direction={isEven ? "left" : "right"}
                  className={isEven ? "lg:order-1" : "lg:order-2"}
                >
                  <div className="relative group overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                    <img
                      src={channel.image}
                      alt={channel.title}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="w-full object-cover h-[340px] sm:h-[420px] transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-6 flex flex-col justify-end">
                      <span className="self-start rounded-full bg-gradient-to-r from-primary to-rose-600 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                        {channel.short}
                      </span>
                      <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{channel.title}</h3>
                    </div>
                  </div>
                </Reveal>

                <Reveal
                  direction={isEven ? "right" : "left"}
                  className={isEven ? "lg:order-2" : "lg:order-1"}
                >
                  <div className="flex size-13 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm mb-5 border border-primary/20">
                    <channel.icon className="size-6" />
                  </div>
                  <h3 className="text-3xl font-extrabold sm:text-4xl">{channel.title}</h3>
                  <p className="mt-3 text-lg font-semibold text-primary">{channel.tagline}</p>
                  <p className="mt-4 text-muted-foreground leading-relaxed text-base">
                    {channel.overview}
                  </p>

                  <ul className="mt-7 space-y-3.5">
                    {channel.points.map((pt) => (
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
                      <span>Scale {channel.title} Campaigns</span>
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive ROAS Calculator Widget */}
      <section className="border-t border-border/80 bg-surface/90 py-20 lg:py-28 backdrop-blur-md">
        <div className="container-x">
          <Reveal direction="zoom">
            <SpotlightCard className="p-8 sm:p-14 bg-gradient-to-r from-accent via-card to-accent border-primary/30 shadow-2xl">
              <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center">
                <div>
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                    <TrendingUp className="size-4" /> Interactive ROAS Estimator
                  </div>
                  <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                    Estimate Your Return On Ad Spend
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed text-base">
                    Adjust your monthly ad budget slider to see projected revenue scale when leveraging
                    our multi-channel paid media architecture.
                  </p>

                  <div className="mt-8 rounded-2xl border border-border bg-background p-6 shadow-inner">
                    <div className="flex justify-between items-center text-sm font-bold text-foreground">
                      <span>Monthly Ad Budget:</span>
                      <span className="text-xl text-primary font-extrabold">
                        ${adSpend.toLocaleString()} / mo
                      </span>
                    </div>

                    <input
                      type="range"
                      min="1000"
                      max="50000"
                      step="1000"
                      value={adSpend}
                      onChange={(e) => setAdSpend(parseInt(e.target.value, 10))}
                      className="mt-4 w-full accent-primary cursor-pointer h-2.5 bg-border rounded-lg"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>$1,000</span>
                      <span>$25,000</span>
                      <span>$50,000+</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="rounded-2xl border border-border bg-background/90 p-6 text-center shadow-lg backdrop-blur-md">
                    <DollarSign className="mx-auto size-8 text-primary" />
                    <p className="mt-3 text-3xl font-extrabold text-foreground">
                      ${projectedReturn.toLocaleString()}
                    </p>
                    <p className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wider">
                      Projected Revenue (4.2x ROAS)
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-background/90 p-6 text-center shadow-lg backdrop-blur-md">
                    <PieChart className="mx-auto size-8 text-rose-500" />
                    <p className="mt-3 text-3xl font-extrabold text-foreground">
                      ~{projectedLeads.toLocaleString()}
                    </p>
                    <p className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wider">
                      Qualified Customer Leads
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
              Ready to Turn Ad Spend into Predictable Profit?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-ink-foreground/80 text-lg leading-relaxed">
              Schedule a technical ad account audit with our senior media buyers today.
            </p>
            <Link
              to="/contact"
              className="button-shine mt-9 inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-primary via-red-600 to-rose-600 px-9 py-4 font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-all duration-300 hover:scale-[1.05]"
            >
              <span>Get Free Ad Campaign Audit</span>
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
