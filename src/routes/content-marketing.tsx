import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  FileText,
  Edit3,
  Globe,
  PenTool,
  Mail,
  Layout,
  Zap,
  BookOpen,
  PieChart,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { SpotlightCard } from "@/components/SpotlightCard";

import contentHeroImg from "@/assets/content-hero-real.png";
import contentStrategyImg from "@/assets/content-strategy-real.png";
import contentBlogImg from "@/assets/content-blog-real.png";
import contentWebsiteImg from "@/assets/content-website-real.png";

const copywritingRealImg = "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1024&auto=format&fit=crop&q=80";
const emailContentRealImg = "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=1024&auto=format&fit=crop&q=80";
const landingPageRealImg = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1024&auto=format&fit=crop&q=80";

const title = "Content Marketing Services — Strategy, Copywriting & Blogs | Zenelait Infotech";
const description =
  "Comprehensive Content Marketing services by Zenelait Infotech: Content Strategy, Blog Writing, Website Content, Copywriting, Email Content, and Landing Page Content.";

export const Route = createFileRoute("/content-marketing")({
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
  component: ContentMarketingPage,
});

const contentPillars = [
  {
    id: "content-strategy",
    title: "Content Strategy",
    short: "Editorial Roadmap & Blueprint",
    icon: FileText,
    image: contentStrategyImg,
    tagline: "Build a multi-channel content engine that attracts, educates, and converts.",
    overview:
      "A successful content program requires strategic alignment. We analyze buyer search intent, map content to each funnel stage, define core topical clusters, and establish editorial calendars that drive organic authority and brand trust.",
    points: [
      "Buyer Journey Content Mapping & Funnel Alignment",
      "Topical Cluster Architecture & Keyword Taxonomy",
      "Multi-Channel Editorial Calendar Scheduling & Governance",
      "Content Asset Audit & Historical Refresh Planning",
    ],
  },
  {
    id: "blog-writing",
    title: "Blog Writing",
    short: "SEO & Thought Leadership",
    icon: Edit3,
    image: contentBlogImg,
    tagline: "Publish deep, high-ranking articles that establish industry authority.",
    overview:
      "Blog Writing builds evergreen search rankings and thought leadership. Our subject matter writers produce comprehensive, data-backed articles, technical guides, and case studies engineered to rank on Google and provide real value to buyers.",
    points: [
      "In-Depth Long-Form Articles & Technical Whitepapers",
      "Search-Intent Keyword Optimization & SERP Structuring",
      "Engaging Storytelling, Charts & Expert Insights",
      "Internal Link Sculpting & Topic Authority Building",
    ],
  },
  {
    id: "website-content",
    title: "Website Content",
    short: "Brand Positioning & UX Copy",
    icon: Globe,
    image: contentWebsiteImg,
    tagline: "Articulate your brand proposition clearly across every web page.",
    overview:
      "Your website is your primary digital storefront. We craft compelling home page messaging, detailed product and service descriptions, team bios, and UX micro-copy that communicates value clearly and guides visitors toward action.",
    points: [
      "Core Value Proposition & Headline Messaging",
      "Product & Service Feature Breakdown Copywriting",
      "UX Micro-Copy, Form Labels & Interactive Prompts",
      "Brand Story, Mission & Enterprise Positioning Statements",
    ],
  },
  {
    id: "copywriting",
    title: "Copywriting",
    short: "High-CTR Sales Copy",
    icon: PenTool,
    image: copywritingRealImg,
    tagline: "Turn features into persuasive benefits that move prospects to convert.",
    overview:
      "Copywriting is the art of persuasive selling through text. We write high-impact ad copy, sales letters, value propositions, and campaign taglines designed to trigger emotional resonance and drive measurable click-through rates.",
    points: [
      "Multi-Channel Paid Ad Copywriting (Google, Meta, LinkedIn)",
      "High-Converting Sales Pages & Direct Response Copy",
      "Brand Taglines, Slogans & Value Propositions",
      "A/B Hook & Call-to-Action Variation Copywriting",
    ],
  },
  {
    id: "email-content",
    title: "Email Content",
    short: "Drips & Newsletter Sequences",
    icon: Mail,
    image: emailContentRealImg,
    tagline: "Nurture customer relationships directly inside the inbox with high-open emails.",
    overview:
      "Email remains the highest-ROI marketing channel. We design automated welcome drips, weekly newsletters, educational lead-nurturing sequences, and re-engagement campaigns that build subscriber trust and repeat sales.",
    points: [
      "Automated Lead Welcome Drips & Onboarding Sequences",
      "Curated Weekly Industry Newsletters & Thought Leadership",
      "Customer Re-Engagement & Cart Abandonment Copy",
      "Subject Line Optimization & Spam-Check Deliverability",
    ],
  },
  {
    id: "landing-page-content",
    title: "Landing Page Content",
    short: "Conversion Rate Optimization",
    icon: Layout,
    image: landingPageRealImg,
    tagline: "Maximize campaign ROI with landing pages built specifically to capture leads.",
    overview:
      "A ad click is wasted without a high-converting landing page. We write conversion-centered copy that pairs pain points with clear solution framing, social proof positioning, objection handling, and strong call-to-actions.",
    points: [
      "Conversion-Centered Headline & Sub-Headline Framing",
      "Pain-Point vs Solution Visual Copy Structuring",
      "Social Proof, Testimonials & Trust Badge Placement",
      "Frictionless Lead Magnet & Form Copywriting",
    ],
  },
];

function ContentMarketingPage() {
  const [wordCountScale, setWordCountScale] = useState(10);

  // ROI calculation simulation
  const projectedSearchVisits = Math.round(wordCountScale * 4500);
  const projectedLeadsGenerated = Math.round(wordCountScale * 185);

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
                <span>Content Marketing Suite</span>
              </div>
            </Reveal>

            <div className="mt-6">
              <TextReveal
                text="Engineered Content That Earns Attention and Drives Business Growth"
                highlightWords={["Engineered", "Content", "Growth"]}
                highlightClass="italic text-primary"
                className="text-4xl font-extrabold sm:text-5xl lg:text-6xl text-white leading-[1.08]"
              />
            </div>

            <Reveal delay={200} direction="up">
              <p className="mt-6 max-w-xl text-ink-foreground/85 text-lg leading-relaxed">
                From SEO strategy and deep blog writing to persuasive website copy, email drips, and landing page messaging —
                we craft content assets that compound brand equity over time.
              </p>
            </Reveal>

            <Reveal delay={300} direction="up">
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="button-shine inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-primary via-red-600 to-rose-600 px-8 py-4 font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-all duration-300 hover:scale-[1.04] hover:shadow-red-500/40"
                >
                  <Zap className="size-4" />
                  <span>Request Content Strategy Session</span>
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="#content-pillars"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-md transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
                >
                  Explore 6 Content Pillars
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} direction="zoom">
            <div className="relative group overflow-hidden rounded-3xl border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-amber-500/30 blur-2xl opacity-60 transition-all duration-700 group-hover:opacity-90" />
              <img
                src={contentHeroImg}
                alt="Content Marketing Strategy & Performance Analytics Dashboard"
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
            { label: "Organic Search Visits", val: "10M+" },
            { label: "Articles & Copy Assets", val: "1,500+" },
            { label: "Avg Open Rate", val: "38.5%" },
            { label: "Conversion Rate Lift", val: "+180%" },
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

      {/* 6 Content Pillars Detailed Breakdown */}
      <section id="content-pillars" className="container-x py-20 lg:py-28">
        <Reveal className="text-center">
          <h2 className="red-underline inline-block text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            6 Pillars of Content Dominance
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-muted-foreground text-lg">
            High-converting editorial, product, and sales copywriting tailored to every touchpoint.
          </p>
        </Reveal>

        <div className="mt-20 space-y-24">
          {contentPillars.map((pillar, index) => {
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

      {/* Interactive Content ROI & Traffic Estimator */}
      <section className="border-t border-border/80 bg-surface/90 py-20 lg:py-28 backdrop-blur-md">
        <div className="container-x">
          <Reveal direction="zoom">
            <SpotlightCard className="p-8 sm:p-14 bg-gradient-to-r from-accent via-card to-accent border-primary/30 shadow-2xl">
              <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center">
                <div>
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                    <TrendingUp className="size-4" /> Interactive Content Traffic Estimator
                  </div>
                  <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                    Estimate Organic Traffic Compound Growth
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed text-base">
                    Adjust your monthly editorial publication scale slider to see how targeted topical authority
                    compounds search visits and lead volume over 12 months.
                  </p>

                  <div className="mt-8 rounded-2xl border border-border bg-background p-6 shadow-inner">
                    <div className="flex justify-between items-center text-sm font-bold text-foreground">
                      <span>Monthly Content Volume:</span>
                      <span className="text-xl text-primary font-extrabold">
                        {wordCountScale} Articles / mo
                      </span>
                    </div>

                    <input
                      type="range"
                      min="2"
                      max="30"
                      step="2"
                      value={wordCountScale}
                      onChange={(e) => setWordCountScale(parseInt(e.target.value, 10))}
                      className="mt-4 w-full accent-primary cursor-pointer h-2.5 bg-border rounded-lg"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>2 Articles</span>
                      <span>15 Articles</span>
                      <span>30+ Articles / mo</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="rounded-2xl border border-border bg-background/90 p-6 text-center shadow-lg backdrop-blur-md">
                    <BookOpen className="mx-auto size-8 text-primary" />
                    <p className="mt-3 text-3xl font-extrabold text-foreground">
                      {projectedSearchVisits.toLocaleString()}+
                    </p>
                    <p className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wider">
                      Est. Annual Search Visits
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-background/90 p-6 text-center shadow-lg backdrop-blur-md">
                    <PieChart className="mx-auto size-8 text-rose-500" />
                    <p className="mt-3 text-3xl font-extrabold text-foreground">
                      {projectedLeadsGenerated.toLocaleString()}+
                    </p>
                    <p className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wider">
                      Est. Organic Leads
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
              Ready to Own the Digital Conversation in Your Industry?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-ink-foreground/80 text-lg leading-relaxed">
              Let our senior copywriters and content strategists build an editorial program for your company.
            </p>
            <Link
              to="/contact"
              className="button-shine mt-9 inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-primary via-red-600 to-rose-600 px-9 py-4 font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-all duration-300 hover:scale-[1.05]"
            >
              <span>Get Free Content Strategy Session</span>
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
