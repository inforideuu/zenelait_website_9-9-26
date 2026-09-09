import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Share2,
  Video,
  Users,
  MessageSquare,
  Award,
  BarChart3,
  Sliders,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { SpotlightCard } from "@/components/SpotlightCard";

import smmHeroImg from "@/assets/smm-hero-real.png";
import smmManagementImg from "@/assets/smm-management-real.png";
import smmContentImg from "@/assets/smm-content-real.png";
import smmStrategyImg from "@/assets/smm-strategy-real.png";
import smmCommunityImg from "@/assets/smm-community-real.png";
import smmInfluencerImg from "@/assets/smm-influencer-real.png";
import smmAnalyticsImg from "@/assets/smm-analytics-real.png";

const title = "Social Media Marketing Services — Content, Strategy & Growth | Zenelait Infotech";
const description =
  "Comprehensive Social Media Marketing services by Zenelait Infotech: Social Media Management, Content Creation, Social Media Strategy, Community Management, Influencer Marketing, and Social Media Analytics.";

export const Route = createFileRoute("/social-media-marketing")({
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
  component: SocialMediaMarketingPage,
});

const smmPillars = [
  {
    id: "management",
    title: "Social Media Management",
    short: "Multi-Platform Publishing",
    icon: Share2,
    image: smmManagementImg,
    tagline: "Build a consistent, high-impact brand presence across all major social networks.",
    overview:
      "Social Media Management keeps your brand active, relevant, and engaging. We handle multi-channel publishing, content scheduling, brand voice alignment, and platform-native optimization across Instagram, LinkedIn, YouTube, X (Twitter), and Facebook.",
    points: [
      "Multi-Platform Publishing Calendar & Schedule Automation",
      "Platform-Native Content Formatting & Caption Optimization",
      "Brand Voice & Aesthetic Visual Consistency Control",
      "Cross-Channel Brand Reach & Audience Growth Scaling",
    ],
  },
  {
    id: "content-creation",
    title: "Content Creation",
    short: "Short-Form Video & Visuals",
    icon: Video,
    image: smmContentImg,
    tagline: "Captivate audiences with thumb-stopping video Reels, Shorts, and premium graphic design.",
    overview:
      "Content is the engine of social media success. Our in-house creative team produces cinematic short-form video Reels/Shorts, multi-slide educational carousels, motion graphics, and high-converting visual assets engineered for viral algorithmic distribution.",
    points: [
      "High-Production Short-Form Reels, Shorts & TikTok Videos",
      "Multi-Slide High-CTR Educational & Carousel Graphic Design",
      "Motion Graphics, 3D Visuals & Custom Brand Typography",
      "Hook-Driven Copywriting & Scriptwriting for Maximum Retention",
    ],
  },
  {
    id: "strategy",
    title: "Social Media Strategy",
    short: "Brand Blueprint & Funnels",
    icon: TrendingUp,
    image: smmStrategyImg,
    tagline: "Turn social media followers into loyal customers with a structured growth roadmap.",
    overview:
      "A great social presence requires strategic clarity. We map customer personas, analyze competitor benchmarks, define core content pillars, and build full-funnel distribution pathways that turn passive scrollers into active leads.",
    points: [
      "Audience Persona & Competitor Positioning Matrix",
      "Core Content Pillar Taxonomy & Messaging Architecture",
      "Organic-to-Paid Conversion Funnel & Lead Capture Integration",
      "Platform Algorithm Optimization & Distribution Blueprint",
    ],
  },
  {
    id: "community-management",
    title: "Community Management",
    short: "24/7 Fan & Lead Engagement",
    icon: MessageSquare,
    image: smmCommunityImg,
    tagline: "Nurture an active brand community and convert comments into conversations.",
    overview:
      "Community Management transforms passive audiences into active brand advocates. We provide 24/7 comment response, direct message triage, sentiment monitoring, proactive community outreach, and crisis management.",
    points: [
      "24/7 Comment Moderation & Proactive Response Workflows",
      "Direct Message (DM) Lead Qualification & CRM Handshake",
      "Brand Sentiment Monitoring & Customer Feedback Loops",
      "Brand Advocate Nurturing & Micro-Community Building",
    ],
  },
  {
    id: "influencer-marketing",
    title: "Influencer Marketing",
    short: "Creator & Brand Partnerships",
    icon: Award,
    image: smmInfluencerImg,
    tagline: "Leverage trusted creators to expand brand authority and drive authentic conversions.",
    overview:
      "Influencer Marketing harnesses the power of creator trust. We manage end-to-end influencer campaigns — from micro and macro creator discovery and contract negotiation to content approval workflows and sales attribution.",
    points: [
      "Data-Driven Micro & Macro Creator Discovery & Vetting",
      "Contract Negotiation, Usage Rights & Deliverable Management",
      "Creative Briefing & Content Approval Quality Control",
      "Promo Code & Affiliate Sales Attribution Tracking",
    ],
  },
  {
    id: "analytics",
    title: "Social Media Analytics",
    short: "Performance & ROI Intelligence",
    icon: BarChart3,
    image: smmAnalyticsImg,
    tagline: "Track reach, engagement velocity, and business ROI with real-time reporting.",
    overview:
      "Data reveals what resonates. Our social media analytics reporting provides deep insights into reach, engagement rates, audience demographics, video watch time, and direct website referral traffic.",
    points: [
      "Real-Time Cross-Platform Performance Dashboards",
      "Engagement Rate, Reach & Impressions Velocity Benchmarking",
      "Audience Demographic & Geographic Sentiment Reporting",
      "Executive Growth Reports & Actionable Content Optimizations",
    ],
  },
];

function SocialMediaMarketingPage() {
  const [followerScale, setFollowerScale] = useState(10);

  // Engagement calculation simulation
  const projectedReach = Math.round(followerScale * 12500);
  const projectedInteractions = Math.round(followerScale * 680);

  return (
    <div className="relative">
      {/* Luxurious Hero Header */}
      <section className="ink-panel relative overflow-hidden py-20 lg:py-28">
        {/* Glowing luxury ambient background elements */}
        <div className="pointer-events-none absolute -top-40 -right-24 size-[40rem] rounded-full bg-gradient-to-br from-primary/30 via-rose-600/15 to-transparent blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute top-1/2 -left-32 size-[30rem] rounded-full bg-rose-500/10 blur-3xl animate-pulse-glow" />

        <div className="container-x relative z-10 grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Reveal direction="down">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary backdrop-blur-md shadow-[0_0_20px_rgba(225,29,72,0.3)]">
                <Sparkles className="size-3.5 animate-spin-slow" />
                <span>Social Media Marketing Suite</span>
              </div>
            </Reveal>

            <div className="mt-6">
              <TextReveal
                text="Build a Dominant Brand & Active Community Across Every Social Platform"
                highlightWords={["Dominant", "Brand", "Community"]}
                highlightClass="italic text-primary"
                className="text-4xl font-extrabold sm:text-5xl lg:text-6xl text-white leading-[1.08]"
              />
            </div>

            <Reveal delay={200} direction="up">
              <p className="mt-6 max-w-xl text-ink-foreground/85 text-lg leading-relaxed">
                From high-end Reels video creation and multi-platform publishing to strategic community management,
                influencer partnerships, and deep analytics — we build brand authority that scales.
              </p>
            </Reveal>

            <Reveal delay={300} direction="up">
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="button-shine inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-primary via-red-600 to-rose-600 px-8 py-4 font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-all duration-300 hover:scale-[1.04] hover:shadow-red-500/40"
                >
                  <Zap className="size-4" />
                  <span>Request Social Growth Plan</span>
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="#smm-pillars"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-md transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
                >
                  Explore 6 Pillars
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} direction="zoom">
            <div className="relative group overflow-hidden rounded-3xl border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-rose-500/30 blur-2xl opacity-60 transition-all duration-700 group-hover:opacity-90" />
              <img
                src={smmHeroImg}
                alt="Social Media Marketing Performance Analytics Visual"
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
            { label: "Organic Impression Reach", val: "5M+" },
            { label: "Average Engagement Lift", val: "+340%" },
            { label: "Brand Sentiment Score", val: "98% Positive" },
            { label: "Videos Produced / Mo", val: "250+" },
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

      {/* 6 Core Pillars Detailed Breakdown */}
      <section id="smm-pillars" className="container-x py-20 lg:py-28">
        <Reveal className="text-center">
          <h2 className="red-underline inline-block text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            6 Pillars of Social Media Growth
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-muted-foreground text-lg">
            A end-to-end framework engineered to capture attention, nurture trust, and drive brand revenue.
          </p>
        </Reveal>

        <div className="mt-20 space-y-24">
          {smmPillars.map((pillar, index) => {
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
                      <span>Get {pillar.title} Plan</span>
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Engagement & Reach Simulator */}
      <section className="border-t border-border/80 bg-surface/90 py-20 lg:py-28 backdrop-blur-md">
        <div className="container-x">
          <Reveal direction="zoom">
            <SpotlightCard className="p-8 sm:p-14 bg-gradient-to-r from-accent via-card to-accent border-primary/30 shadow-2xl">
              <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center">
                <div>
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                    <TrendingUp className="size-4" /> Interactive Reach Simulator
                  </div>
                  <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                    Project Your Organic Social Reach
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed text-base">
                    Adjust the target content posting frequency multiplier to estimate potential monthly impression
                    reach and community interactions.
                  </p>

                  <div className="mt-8 rounded-2xl border border-border bg-background p-6 shadow-inner">
                    <div className="flex justify-between items-center text-sm font-bold text-foreground">
                      <span>Posting Intensity Scale:</span>
                      <span className="text-xl text-primary font-extrabold">
                        {followerScale}x Scale / mo
                      </span>
                    </div>

                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="1"
                      value={followerScale}
                      onChange={(e) => setFollowerScale(parseInt(e.target.value, 10))}
                      className="mt-4 w-full accent-primary cursor-pointer h-2.5 bg-border rounded-lg"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>1x Steady</span>
                      <span>10x Accelerated</span>
                      <span>20x Dominant</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="rounded-2xl border border-border bg-background/90 p-6 text-center shadow-lg backdrop-blur-md">
                    <Users className="mx-auto size-8 text-primary" />
                    <p className="mt-3 text-3xl font-extrabold text-foreground">
                      {projectedReach.toLocaleString()}+
                    </p>
                    <p className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wider">
                      Est. Monthly Impressions
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-background/90 p-6 text-center shadow-lg backdrop-blur-md">
                    <MessageSquare className="mx-auto size-8 text-rose-500" />
                    <p className="mt-3 text-3xl font-extrabold text-foreground">
                      {projectedInteractions.toLocaleString()}+
                    </p>
                    <p className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wider">
                      Est. Audience Interactions
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
              Ready to Build a Dominant Social Brand?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-ink-foreground/80 text-lg leading-relaxed">
              Let us craft a custom social media strategy tailored to your industry and brand identity.
            </p>
            <Link
              to="/contact"
              className="button-shine mt-9 inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-primary via-red-600 to-rose-600 px-9 py-4 font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-all duration-300 hover:scale-[1.05]"
            >
              <span>Get Free Strategy Session</span>
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
