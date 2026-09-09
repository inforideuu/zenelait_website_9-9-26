import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  BarChart3,
  FileSpreadsheet,
  DollarSign,
  LayoutDashboard,
  Eye,
  Zap,
  PieChart,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { SpotlightCard } from "@/components/SpotlightCard";

const analyticsHeroImg = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1024&auto=format&fit=crop&q=80";
const ga4RealImg = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1024&auto=format&fit=crop&q=80";
const campaignReportsRealImg = "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=1024&auto=format&fit=crop&q=80";
const roiAnalysisRealImg = "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1024&auto=format&fit=crop&q=80";
const marketingDashboardRealImg = "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1024&auto=format&fit=crop&q=80";
const competitorAnalysisRealImg = "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1024&auto=format&fit=crop&q=80";

const title = "Analytics & Reporting Services — GA4, Dashboards & ROI Attribution | Zenelait Infotech";
const description =
  "Comprehensive Analytics & Reporting services by Zenelait Infotech: Google Analytics (GA4), Campaign Performance Reports, ROI Analysis, Executive Marketing Dashboards, and Competitor Analysis.";

export const Route = createFileRoute("/analytics-reporting")({
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
  component: AnalyticsReportingPage,
});

const analyticsPillars = [
  {
    id: "ga4",
    title: "Google Analytics (GA4)",
    short: "Event & Conversion Taxonomy",
    icon: BarChart3,
    image: ga4RealImg,
    tagline: "Engineer bulletproof website & app tracking data foundations.",
    overview:
      "Google Analytics (GA4) is the industry standard for digital attribution. We configure custom event taxonomies, server-side Google Tag Manager (GTM) containers, e-commerce sales funnels, and data privacy compliance to ensure 100% accurate measurement.",
    points: [
      "GA4 Property Configuration & Custom Event Taxonomy Setup",
      "Server-Side Google Tag Manager (GTM) Container Deployment",
      "E-Commerce Purchase Funnel & Micro-Conversion Tracking",
      "Cross-Domain Tracking & Cookie Consent Banner Compliance",
    ],
  },
  {
    id: "campaign-reports",
    title: "Campaign Performance Reports",
    short: "Cross-Channel Performance",
    icon: FileSpreadsheet,
    image: campaignReportsRealImg,
    tagline: "Gain complete transparency into campaign performance across every channel.",
    overview:
      "Campaign Performance Reports distill millions of data points into actionable executive insights. We deliver automated weekly and monthly performance breakdowns covering ad spend efficiency, cost-per-lead trends, and creative asset performance.",
    points: [
      "Automated Weekly & Monthly Executive Performance Reports",
      "Cross-Channel Cost-Per-Acquisition (CPA) & Lead Quality Scoring",
      "Creative Ad Asset & Headline Hook Performance Audits",
      "Channel-by-Channel Budget Pacing & Re-Allocation Recommendations",
    ],
  },
  {
    id: "roi-analysis",
    title: "ROI Analysis",
    short: "Financial Attribution Modeling",
    icon: DollarSign,
    image: roiAnalysisRealImg,
    tagline: "Track exact revenue attribution down to every dollar of marketing spend.",
    overview:
      "ROI Analysis turns marketing from an expense into a predictable profit center. We implement multi-touch attribution models, Customer Lifetime Value (CLV) calculations, CAC payback period tracking, and gross margin contribution analysis.",
    points: [
      "First-Touch, Last-Touch & Data-Driven Multi-Touch Attribution",
      "Customer Acquisition Cost (CAC) vs Lifetime Value (CLV) Ratios",
      "Gross Margin Contribution & Customer Payback Period Modeling",
      "Offline Sales & CRM Conversion Attribution Mapping",
    ],
  },
  {
    id: "marketing-dashboard",
    title: "Marketing Dashboard",
    short: "Real-Time Executive Dashboards",
    icon: LayoutDashboard,
    image: marketingDashboardRealImg,
    tagline: "Access live company KPIs anytime with custom real-time executive dashboards.",
    overview:
      "Say goodbye to static spreadsheets. We build customized Looker Studio and Power BI executive dashboards connected to your advertising accounts, website analytics, and CRM data pipelines for instant decision-making.",
    points: [
      "Custom Looker Studio & Power BI Live Executive Dashboards",
      "Automated Multi-Source Data Pipeline (Google, Meta, CRM Sync)",
      "Role-Based Views for CEOs, CMOs & Marketing Managers",
      "Real-Time Pacing Alerts & Target vs Actual KPI Visualizations",
    ],
  },
  {
    id: "competitor-analysis",
    title: "Competitor Analysis",
    short: "Market Intelligence & BENCHMARKS",
    icon: Eye,
    image: competitorAnalysisRealImg,
    tagline: "Uncover competitor ad strategies, keyword positions, and market share.",
    overview:
      "Competitor Analysis provides strategic foresight. We reverse-engineer your industry competitors' digital footprint — auditing their paid ad spending, high-ranking search keywords, creative positioning, and backlink networks to identify growth gaps.",
    points: [
      "Competitor Paid Search & Paid Social Ad Spend Intelligence",
      "Organic Keyword Ranking & Content Gap Opportunity Matrix",
      "Competitor Landing Page & Offer Conversion Teardowns",
      "Market Share & Share of Voice (SOV) Benchmarking Reports",
    ],
  },
];

function AnalyticsReportingPage() {
  const [dataScale, setDataScale] = useState(10);

  // Revenue lift simulation from accurate data
  const projectedAttributedRev = Math.round(dataScale * 35000);
  const projectedWasteEliminated = Math.round(dataScale * 2400);

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
                <span>Analytics & Reporting Suite</span>
              </div>
            </Reveal>

            <div className="mt-6">
              <TextReveal
                text="Turn Marketing Data into Accountable Growth & Clear Financial Attribution"
                highlightWords={["Accountable", "Growth", "Financial"]}
                highlightClass="italic text-primary"
                className="text-4xl font-extrabold sm:text-5xl lg:text-6xl text-white leading-[1.08]"
              />
            </div>

            <Reveal delay={200} direction="up">
              <p className="mt-6 max-w-xl text-ink-foreground/85 text-lg leading-relaxed">
                From Google Analytics (GA4) custom event tracking and cross-channel performance reports to multi-touch ROI attribution,
                live Looker Studio dashboards, and deep competitor intelligence.
              </p>
            </Reveal>

            <Reveal delay={300} direction="up">
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="button-shine inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-primary via-red-600 to-rose-600 px-8 py-4 font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-all duration-300 hover:scale-[1.04] hover:shadow-red-500/40"
                >
                  <Zap className="size-4" />
                  <span>Request Analytics Audit</span>
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="#analytics-pillars"
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
                src={analyticsHeroImg}
                alt="Marketing Analytics & Live Performance Dashboard Visual"
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
            { label: "Data Accuracy Index", val: "99.8%" },
            { label: "Ad Budget Wasted Eliminated", val: "-28%" },
            { label: "Decision Velocity Speed", val: "10x" },
            { label: "Attributed Revenue Tracked", val: "$50M+" },
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

      {/* 5 Analytics Pillars Detailed Breakdown */}
      <section id="analytics-pillars" className="container-x py-20 lg:py-28">
        <Reveal className="text-center">
          <h2 className="red-underline inline-block text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            5 Pillars of Data Accountability
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-muted-foreground text-lg">
            Complete clarity on every rupee spent and every lead generated across your marketing organization.
          </p>
        </Reveal>

        <div className="mt-20 space-y-24">
          {analyticsPillars.map((pillar, index) => {
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
                      <span>Deploy {pillar.title}</span>
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Data Attribution & ROI Estimator */}
      <section className="border-t border-border/80 bg-surface/90 py-20 lg:py-28 backdrop-blur-md">
        <div className="container-x">
          <Reveal direction="zoom">
            <SpotlightCard className="p-8 sm:p-14 bg-gradient-to-r from-accent via-card to-accent border-primary/30 shadow-2xl">
              <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center">
                <div>
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                    <TrendingUp className="size-4" /> Interactive Data ROI Estimator
                  </div>
                  <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                    Estimate Data-Backed Revenue Efficiency
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed text-base">
                    Adjust your company's data integration scale slider to see projected revenue optimization and eliminated ad waste.
                  </p>

                  <div className="mt-8 rounded-2xl border border-border bg-background p-6 shadow-inner">
                    <div className="flex justify-between items-center text-sm font-bold text-foreground">
                      <span>Data Maturity Level:</span>
                      <span className="text-xl text-primary font-extrabold">
                        Level {dataScale} Optimization
                      </span>
                    </div>

                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="1"
                      value={dataScale}
                      onChange={(e) => setDataScale(parseInt(e.target.value, 10))}
                      className="mt-4 w-full accent-primary cursor-pointer h-2.5 bg-border rounded-lg"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>Level 1 Basic</span>
                      <span>Level 10 Multi-Touch</span>
                      <span>Level 20 Enterprise AI</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="rounded-2xl border border-border bg-background/90 p-6 text-center shadow-lg backdrop-blur-md">
                    <DollarSign className="mx-auto size-8 text-primary" />
                    <p className="mt-3 text-3xl font-extrabold text-foreground">
                      ${projectedAttributedRev.toLocaleString()}
                    </p>
                    <p className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wider">
                      Est. Attributed Revenue Lift
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-background/90 p-6 text-center shadow-lg backdrop-blur-md">
                    <PieChart className="mx-auto size-8 text-rose-500" />
                    <p className="mt-3 text-3xl font-extrabold text-foreground">
                      ${projectedWasteEliminated.toLocaleString()}
                    </p>
                    <p className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wider">
                      Est. Monthly Ad Waste Saved
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
              Ready to Gain Complete Visibility Over Your Marketing Spend?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-ink-foreground/80 text-lg leading-relaxed">
              Schedule a GA4 and analytics setup audit with our senior data engineers today.
            </p>
            <Link
              to="/contact"
              className="button-shine mt-9 inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-primary via-red-600 to-rose-600 px-9 py-4 font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-all duration-300 hover:scale-[1.05]"
            >
              <span>Get Free Analytics Audit</span>
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
