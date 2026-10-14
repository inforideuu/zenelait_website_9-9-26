import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Stethoscope,
  ShoppingBag,
  Landmark,
  Building,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
  BarChart3,
  Layers,
  ExternalLink,
  ChevronRight,
  Activity,
  CreditCard,
  Building2,
  Award
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SpotlightCard } from "@/components/SpotlightCard";

export interface IndustryVertical {
  id: string;
  name: string;
  emoji: string;
  icon: any;
  tagline: string;
  badge: string;
  heroImage: string;
  description: string;
  coreSolutions: {
    title: string;
    description: string;
    points: string[];
    highlightTag: string;
  }[];
  metrics: {
    value: string;
    label: string;
  }[];
  techStack: string[];
  ctaText: string;
}

export const INDUSTRY_VERTICALS: IndustryVertical[] = [
  {
    id: "healthcare",
    name: "Healthcare & MedTech",
    emoji: "🏥",
    icon: Stethoscope,
    tagline: "HIPAA-Ready Telehealth, Patient Portals & Medical Practice Growth",
    badge: "HIPAA Compliant & Clinical Velocity",
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80",
    description:
      "Engineered for hospitals, diagnostic labs, tele-consultation providers, and digital health startups requiring airtight patient data privacy, e-prescriptions, and high-trust patient acquisition funnels.",
    coreSolutions: [
      {
        title: "Telehealth Platforms & Virtual Consultations",
        description:
          "End-to-end encrypted video consults, multi-party scheduling, waiting room queues, and integrated digital prescription workflows.",
        points: [
          "WebRTC peer-to-peer encrypted HD video sessions",
          "Automated SMS/WhatsApp appointment reminders",
          "EHR & EMR interoperability integrations (FHIR/HL7 standards)"
        ],
        highlightTag: "Zero-latency WebRTC Video"
      },
      {
        title: "HIPAA & NABH Security Compliance Frameworks",
        description:
          "Automated audit logs, role-based practitioner access controls (RBAC), and AES-256 data encryption at rest and in flight.",
        points: [
          "BAA-compliant cloud server deployment (AWS HealthLake / GCP Healthcare)",
          "Encrypted doctor-patient messaging with auto-expiring media",
          "Immutable clinical change logs for medico-legal audits"
        ],
        highlightTag: "100% HIPAA Ready"
      },
      {
        title: "High-Intent Patient Acquisition & Local Healthcare SEO",
        description:
          "Targeted Google Search campaigns for specialized treatments, geo-fenced local hospital visibility, and reputation management.",
        points: [
          "Hyper-local Google Maps and clinic search optimization",
          "High-converting landing funnels for elective procedures",
          "Automated patient review collection and sentiment tracking"
        ],
        highlightTag: "4.8x Patient Bookings Lift"
      }
    ],
    metrics: [
      { value: "100%", label: "HIPAA Architecture Compliance" },
      { value: "<15s", label: "Patient Onboarding Time" },
      { value: "4.8x", label: "Monthly Patient Inflow" },
      { value: "99.98%", label: "Telehealth Uptime SLA" }
    ],
    techStack: ["Next.js", "WebRTC", "HIPAA AWS", "PostgreSQL", "FHIR API", "Google Health Ads"],
    ctaText: "Consult Our Healthcare Tech Practice"
  },
  {
    id: "ecommerce",
    name: "E-Commerce & Retail",
    emoji: "🛒",
    icon: ShoppingBag,
    tagline: "Headless Storefronts, High-Velocity Checkout & Omnichannel ROAS",
    badge: "Sub-Second Speed & Revenue Maximization",
    heroImage: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&auto=format&fit=crop&q=80",
    description:
      "Built for D2C brands, multi-vendor marketplaces, and omnichannel retail chains that demand sub-second page loads, frictionless 1-click checkout, and precision performance advertising.",
    coreSolutions: [
      {
        title: "Custom Shopify & Headless Next.js Storefronts",
        description:
          "Ultra-fast decoupled web storefronts with 95+ Google PageSpeed mobile scores, dynamic product bundles, and seamless collection filtering.",
        points: [
          "Edge SSR rendering for instantaneous product catalog browsing",
          "Custom Shopify Plus & Headless Medusa / Commerce.js stacks",
          "PWA offline browsing and mobile app shell capability"
        ],
        highlightTag: "95+ Mobile PageSpeed Score"
      },
      {
        title: "Multi-Gateway Payment Orchestration & 1-Click Checkout",
        description:
          "Integrated UPI, Stripe, Razorpay, Cashfree, Buy Now Pay Later (BNPL), and automated cart abandonment recovery sequences.",
        points: [
          "Seamless 1-click OTP checkout eliminating 45% of dropoffs",
          "Automated WhatsApp & SMS recovery flows for abandoned carts",
          "Real-time multi-warehouse inventory and logistics ERP sync"
        ],
        highlightTag: "42% Reduced Cart Abandonment"
      },
      {
        title: "Performance Meta/Google Ads & Conversion Rate Optimization (CRO)",
        description:
          "Full-funnel paid media campaigns paired with rigorous A/B testing on product pages, checkout steps, and post-purchase upsells.",
        points: [
          "Dynamic Product Ads (DPA) synced in real-time with inventory",
          "Micro-copy and CTA heatmaps testing for maximum basket size",
          "Cohort repeat purchase automations via Klaviyo & WhatsApp Broadcast"
        ],
        highlightTag: "5.4x Blended Return on Ad Spend (ROAS)"
      }
    ],
    metrics: [
      { value: "<0.8s", label: "Catalog Page Load Speed" },
      { value: "42%", label: "Cart Dropoff Reduction" },
      { value: "5.4x", label: "Average E-Commerce ROAS" },
      { value: "100k+", label: "Concurrent Peak Shoppers" }
    ],
    techStack: ["Shopify Plus", "Next.js Edge", "Razorpay / Stripe", "Redis", "Meta CAPI", "Klaviyo"],
    ctaText: "Scale Your E-Commerce Revenue"
  },
  {
    id: "fintech",
    name: "FinTech & SaaS",
    emoji: "🏦",
    icon: Landmark,
    tagline: "Bank-Grade Cryptography, Recurring Billing & Product-Led Acquisition",
    badge: "SOC-2 Ready & Microservices Architecture",
    heroImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80",
    description:
      "Engineered for neo-banks, wealth-tech platforms, lending portals, and B2B SaaS applications requiring rigorous fraud prevention, zero-latency financial ledgers, and organic product-led acquisition.",
    coreSolutions: [
      {
        title: "Bank-Grade Security Architecture & Double-Entry Ledgers",
        description:
          "Idempotent payment transactions, tamper-proof transaction ledgers, multi-factor hardware authentication, and OWASP financial defense.",
        points: [
          "ACID-compliant double-entry ledger database models",
          "AES-256 vault encryption with auto-rotating HSM keys",
          "Real-time velocity checks and fraud detection algorithms"
        ],
        highlightTag: "Zero Transaction Duplication"
      },
      {
        title: "Enterprise Subscription Billing & Automated Invoicing",
        description:
          "Usage-based, tiered, or seat-based recurring SaaS billing engines with global GST/VAT compliance and automated dunning management.",
        points: [
          "Smart dunning flows that recover 70%+ of failed renewals",
          "Self-serve customer billing portals with instant invoice downloads",
          "Real-time MRR, ARR, Churn, and Net Dollar Retention (NDR) tracking"
        ],
        highlightTag: "Recurring Engine & Auto-Dunning"
      },
      {
        title: "B2B SaaS Demand Generation & High-Authority Technical SEO",
        description:
          "Targeted search campaigns capturing bottom-of-funnel software buyers searching for alternatives, comparison sheets, and ROI calculations.",
        points: [
          "High-intent 'Software vs Competitor' comparison landing pages",
          "Lead magnets, interactive cost calculators, and whitepaper funnels",
          "LinkedIn Account-Based Marketing (ABM) for enterprise procurement"
        ],
        highlightTag: "68% Qualified Enterprise SQLs"
      }
    ],
    metrics: [
      { value: "99.99%", label: "Financial Ledger Uptime" },
      { value: "0ms", label: "Idempotency Collisions" },
      { value: "+38%", label: "MRR Growth with Paired Ads" },
      { value: "SOC-2", label: "Architectural Readiness" }
    ],
    techStack: ["TypeScript", "FastAPI / Go", "PostgreSQL ACID", "Stripe Billing", "ClickHouse", "LinkedIn ABM"],
    ctaText: "Build Your FinTech Engine"
  },
  {
    id: "realestate",
    name: "Real Estate & Enterprise",
    emoji: "🏢",
    icon: Building,
    tagline: "PropTech Portals, Geo-Lead Scoring & Enterprise CRM Synchronization",
    badge: "High-Ticket Lead Qualification & CRM Sync",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
    description:
      "Designed for property developers, commercial realty brokers, and large enterprises that need interactive 3D floorplan tours, automated lead pre-qualification, and centralized omnichannel CRM pipeline tracking.",
    coreSolutions: [
      {
        title: "PropTech Portals & Interactive 3D Architectural Showcases",
        description:
          "Dynamic property listing portals featuring interactive site map navigation, unit availability matrices, and virtual walkthroughs.",
        points: [
          "Filter by carpet area, budget range, possession date, and amenities",
          "Virtual 3D tour integrations (Matterport / 360 viewer)",
          "Downloadable brochure gate with verified mobile number OTP"
        ],
        highlightTag: "Interactive Unit Map & Virtual Tour"
      },
      {
        title: "Automated Lead Pre-Qualification & Instant Agent Routing",
        description:
          "AI chatbot and WhatsApp qualification that scores inbound buyers based on budget and timeline before distributing leads to sales agents.",
        points: [
          "Instant lead distribution with SLA callback timer (<2 minutes)",
          "Automated site visit booking synced to agent calendars",
          "WhatsApp bot answering pricing, approvals, and floor plans 24/7"
        ],
        highlightTag: "<2 Min Callback Routing"
      },
      {
        title: "Geo-Targeted Real Estate Ads & Hyper-Local Marketing",
        description:
          "Laser-targeted Google & Meta campaigns targeting high-net-worth individuals (HNIs), NRIs, and location-specific home seekers.",
        points: [
          "NRI investment campaigns across Middle East, US & Singapore corridors",
          "Hyper-local radius advertising around commercial tech corridors",
          "Full-funnel cost-per-site-visit (CPSV) attribution tracking"
        ],
        highlightTag: "3.2x Verified Site Visit Lift"
      }
    ],
    metrics: [
      { value: "<2 min", label: "Inbound Lead Routing Time" },
      { value: "3.2x", label: "Verified Site Visit Lift" },
      { value: "78%", label: "Pre-Qualified Inbound Leads" },
      { value: "100%", label: "Real-Time CRM Data Sync" }
    ],
    techStack: ["Next.js", "Matterport 3D", "Zenelait InfoTech CRM", "Twilio / WhatsApp API", "Meta Ads", "Google Maps API"],
    ctaText: "Accelerate Property Conversions"
  }
];

export function IndustrySolutionsFilter() {
  const [selectedId, setSelectedId] = useState<string>("healthcare");

  const activeVertical: IndustryVertical =
    INDUSTRY_VERTICALS.find((v) => v.id === selectedId) || INDUSTRY_VERTICALS[0]!;

  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-surface/50 border-y border-border/80" id="industry-solutions">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute -top-40 left-1/3 size-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-10 size-96 rounded-full bg-rose-500/10 blur-3xl" />

      <div className="container-x relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-md mb-4 shadow-lg shadow-primary/20">
              <Layers className="size-3.5" />
              <span>Tailored Vertical Capabilities</span>
            </div>
          </Reveal>

          <Reveal delay={100} direction="up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
              Industry-Specific <span className="text-primary">Growth & Tech Solutions</span>
            </h2>
          </Reveal>

          <Reveal delay={200} direction="up">
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-lg font-medium leading-relaxed">
              We do not believe in generic one-size-fits-all strategies. Explore customized technology architectures and targeted marketing engines built purposefully for your domain.
            </p>
          </Reveal>
        </div>

        {/* Tab Selector Pills */}
        <Reveal delay={250} direction="up" className="mt-12">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
            {INDUSTRY_VERTICALS.map((vertical) => {
              const isSelected = selectedId === vertical.id;
              const Icon = vertical.icon;

              return (
                <button
                  key={vertical.id}
                  type="button"
                  onClick={() => setSelectedId(vertical.id)}
                  className={`group relative flex items-center gap-2.5 rounded-2xl px-5 py-3.5 text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-primary via-red-600 to-rose-600 text-primary-foreground shadow-lg shadow-primary/30 scale-[1.03] ring-2 ring-primary/40"
                      : "bg-card hover:bg-accent text-muted-foreground hover:text-foreground border border-border/80 shadow-xs"
                  }`}
                >
                  <span className="text-base sm:text-lg">{vertical.emoji}</span>
                  <span>{vertical.name}</span>
                  {isSelected && (
                    <span className="size-2 rounded-full bg-white animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Active Industry Showcase Card */}
        <Reveal key={activeVertical.id} delay={150} direction="up" className="mt-10">
          <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card p-6 sm:p-10 shadow-2xl">
            {/* Top Showcase Banner with Image & Key Description */}
            <div className="grid gap-8 lg:grid-cols-12 items-center">
              {/* Text Info */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  <Sparkles className="size-3.5" />
                  <span>{activeVertical.badge}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight leading-tight">
                  {activeVertical.tagline}
                </h3>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-normal">
                  {activeVertical.description}
                </p>

                {/* Tech Stack Chips */}
                <div className="pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                    Specialized Stacks & Integrations:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeVertical.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-border/70 bg-surface px-3 py-1 text-xs font-semibold text-foreground/90"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Image Preview with Floating Stats Card */}
              <div className="lg:col-span-5 relative">
                <div className="relative overflow-hidden rounded-2xl border border-border/80 shadow-xl group aspect-[4/3]">
                  <img
                    src={activeVertical.heroImage}
                    alt={activeVertical.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/80 block">Vertical Focus</span>
                    <h4 className="text-lg sm:text-xl font-black text-white tracking-tight">{activeVertical.name}</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle: 3 Specialized Solution Modules */}
            <div className="mt-12 pt-10 border-t border-border/60">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-lg sm:text-xl font-black text-foreground tracking-tight">
                    Custom Modules Engineered for {activeVertical.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-normal">
                    Purpose-built architectures addressing real operational friction and regulatory hurdles
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {activeVertical.coreSolutions.map((sol, sIdx) => (
                  <SpotlightCard
                    key={sol.title}
                    className="p-6 bg-surface/50 border border-border/80 flex flex-col justify-between"
                  >
                    <div>
                      <span className="inline-block rounded-md bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary uppercase tracking-wider mb-3">
                        {sol.highlightTag}
                      </span>
                      <h5 className="text-base font-black text-foreground tracking-tight leading-snug">
                        {sol.title}
                      </h5>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed font-normal">
                        {sol.description}
                      </p>

                      <ul className="mt-4 space-y-2 border-t border-border/50 pt-3">
                        {sol.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-2 text-xs text-foreground/90 font-medium">
                            <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </div>

            {/* Bottom KPI Metrics & Direct Inquiry Action */}
            <div className="mt-12 rounded-2xl bg-gradient-to-r from-surface via-primary/5 to-surface p-6 sm:p-8 border border-border/80 flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full lg:w-auto">
                {activeVertical.metrics.map((m) => (
                  <div key={m.label} className="text-center sm:text-left">
                    <p className="text-2xl sm:text-3xl font-black text-primary tracking-tight">
                      {m.value}
                    </p>
                    <p className="text-xs font-semibold text-muted-foreground mt-0.5">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Call to Action Button */}
              <div className="w-full lg:w-auto shrink-0">
                <Link
                  to="/contact"
                  className="button-shine w-full lg:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-primary via-red-600 to-rose-600 px-7 py-3.5 text-xs sm:text-sm font-bold text-primary-foreground shadow-xl shadow-primary/25 transition-all duration-300 hover:scale-[1.02]"
                >
                  <span>{activeVertical.ctaText}</span>
                  <ArrowRight className="size-4 stroke-[2.5]" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
