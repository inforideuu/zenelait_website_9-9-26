import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Award,
  AlertCircle,
  Quote
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

interface Metric {
  value: string;
  label: string;
  sub: string;
}

interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  badge: string;
  title: string;
  summary: string;
  challenge: string;
  solution: string;
  techStack: string[];
  metrics: Metric[];
  quote: string;
  clientName: string;
  clientRole: string;
  image: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "logistics-erp",
    client: "Apex Global Logistics",
    industry: "Supply Chain & Fleet Logistics",
    badge: "Enterprise ERP & AI Automation",
    title: "Streamlining Inter-National wide Logistics Infrastructure with Custom Real-Time ERP",
    summary: "Replaced 5 disconnected legacy systems with a single unified ERP platform, managing 1000+ daily shipments and automated route dispatching.",
    challenge:
      "Apex Logistics suffered from manual dispatching errors, fragmented inventory tracking across 12 warehouses, and delayed client invoicing taking 14+ days.",
    solution:
      "Zenelait engineered a custom cloud ERP suite featuring automated GPS fleet tracking, GST billing engine, barcode scanning, and AI-driven dynamic route optimization.",
    techStack: ["React", "Node.js", "Python AI", "PostgreSQL", "Docker", "AWS"],
    metrics: [
      { value: "40%", label: "Cost Reduction", sub: "Operational dispatching overhead" },
      { value: "99.9%", label: "Uptime SLA", sub: "24/7 mission-critical operations" },
      { value: "12 Days", label: "Faster Billing", sub: "From 14 days down to 48 hours" },
      { value: "10K+", label: "Daily Transactions", sub: "Real-time sync without latency" }
    ],
    quote: "Zenelait's ERP transformation cut our dispatch errors to near zero and allowed us to scale fleet operations by 3x without doubling headcount.",
    clientName: "Vikram Malhotra",
    clientRole: "VP of Operations, Apex Global",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&auto=format&fit=crop&q=80"
  },
  {
    id: "medtech-lms",
    client: "OmniHealth Network",
    industry: "Healthcare & MedTech",
    badge: "HIPAA Compliant App & LMS",
    title: "Accelerating Clinical Staff Onboarding & Telehealth Delivery",
    summary: "Built an institutional proctored LMS & Telehealth portal training over 5,000 doctors and nurses across 40 hospital locations.",
    challenge:
      "Manual compliance training was bottlenecking new healthcare staff deployment during peak demand, while patient video consults lacked secure EMR integration.",
    solution:
      "Zenelait deployed an enterprise Learning Management System paired with a HIPAA-compliant WebRTC Telehealth portal integrated directly into hospital EMR records.",
    techStack: ["Next.js", "WebRTC", "Python", "Tailwind CSS", "Azure Health"],
    metrics: [
      { value: "+250%", label: "Training Speed", sub: "5,000+ medical staff certified" },
      { value: "100%", label: "HIPAA Compliant", sub: "Bank-grade encrypted patient data" },
      { value: "4.9/5", label: "User Satisfaction", sub: "Rated by 1,200+ doctors" },
      { value: "15 Mins", label: "Consult Setup", sub: "Instant patient video room creation" }
    ],
    quote: "The reliability of Zenelait's platform allowed us to onboard clinical teams 2x faster while keeping patient record privacy 100% compliant.",
    clientName: "Dr. Ananya Roy",
    clientRole: "Chief Medical Information Officer",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&auto=format&fit=crop&q=80"
  },
  {
    id: "omnichannel-retail",
    client: "Zenith Retail & E-Commerce",
    industry: "Retail & Consumer Goods",
    badge: "Headless E-Commerce & Growth",
    title: "Scaling Direct-to-Consumer Revenue Through Performance Ads & Headless Web",
    summary: "Engineered a lightning-fast custom web storefront combined with targeted PPC paid ad campaigns and technical SEO.",
    challenge:
      "High cart abandonment rates due to a 6-second page load speed on legacy WooCommerce platform and low return on ad spend (ROAS).",
    solution:
      "Zenelait built a high-speed Headless React storefront with instant checkout and executed full-funnel Meta/Google performance advertising and automated email workflows.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Stripe API", "Google Analytics 4"],
    metrics: [
      { value: "+320%", label: "Revenue Growth", sub: "Over 12 months post-launch" },
      { value: "0.8s", label: "Page Speed", sub: "Sub-second mobile checkout load" },
      { value: "4.2x", label: "ROAS Achieved", sub: "Targeted paid advertising ROI" },
      { value: "-45%", label: "Cart Abandonment", sub: "Optimized one-click checkout" }
    ],
    quote: "Zenelait combined engineering excellence with aggressive growth marketing to turn our online store into our primary revenue generator.",
    clientName: "Rajesh Oberoi",
    clientRole: "Managing Director, Zenith Retail",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=80"
  }
];

export function CaseStudiesSection() {
  const [activeTab, setActiveTab] = useState<string>("logistics-erp");

  const activeStudy = CASE_STUDIES.find((cs) => cs.id === activeTab) || CASE_STUDIES[0]!;

  return (
    <section className="relative overflow-hidden bg-[#fafafa] dark:bg-slate-950 py-20 lg:py-28 text-slate-900 dark:text-white border-t border-slate-200/80 dark:border-slate-800">
      {/* Background Lighting & Curved Decorative SVG Elements */}
      <div className="pointer-events-none absolute -top-40 left-1/4 size-[500px] rounded-full bg-rose-500/5 dark:bg-rose-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-10 size-[450px] rounded-full bg-rose-400/5 dark:bg-primary/10 blur-[100px]" />

      <div className="container-x relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <Reveal className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 dark:border-rose-900/60 bg-rose-50/80 dark:bg-rose-950/40 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-[#ff5252] backdrop-blur-md mb-4 shadow-sm">
            <Award className="size-3.5 text-[#ff5252] animate-pulse" />
            <span>Proven Enterprise Impact</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Enterprise Case Studies & <span className="text-[#ff5252]">Success Stories</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400 text-base sm:text-lg font-medium leading-relaxed">
            Real-world breakdowns showing how Zenelait engineers custom software and executes growth strategies that deliver measurable ROI.
          </p>
        </Reveal>

        {/* Case Study Tab Switcher Buttons */}
        <Reveal delay={100} direction="up" className="mt-12 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-white dark:bg-slate-900 p-2 border border-slate-200/80 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none">
            {CASE_STUDIES.map((cs) => {
              const isSelected = activeTab === cs.id;

              return (
                <button
                  key={cs.id}
                  type="button"
                  onClick={() => setActiveTab(cs.id)}
                  className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 ${
                    isSelected
                      ? "bg-gradient-to-r from-rose-500 via-red-600 to-rose-600 text-white shadow-md shadow-rose-500/30 scale-102"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
                >
                  {cs.client}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Active Case Study Card */}
        <Reveal delay={150} direction="up" className="mt-12">
          <div className="relative group">
            {/* Subtle Coral Glow Aura */}
            <div className="absolute -inset-1 rounded-[34px] bg-gradient-to-r from-rose-500/20 via-primary/20 to-rose-500/20 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative overflow-hidden rounded-[30px] border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 lg:p-12 shadow-2xl shadow-slate-200/40 dark:shadow-2xl">
              <div className="grid gap-10 lg:grid-cols-12 items-stretch">
                {/* Left Column: Details, Challenge, Solution & Tech Stack (7 Cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
                  <div>
                    {/* Badge & Industry Header */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/50 px-3.5 py-1 text-xs font-bold text-[#ff5252]">
                        <Sparkles className="size-3" />
                        <span>{activeStudy.badge}</span>
                      </span>

                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        {activeStudy.industry}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                      {activeStudy.title}
                    </h3>

                    <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {activeStudy.summary}
                    </p>
                  </div>

                  {/* Challenge vs Solution Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Challenge Card */}
                    <div className="rounded-2xl border border-rose-100 dark:border-rose-900/40 bg-rose-50/70 dark:bg-rose-950/20 p-5 space-y-2">
                      <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-extrabold text-xs uppercase tracking-wider">
                        <AlertCircle className="size-3.5 text-rose-600 dark:text-rose-400" />
                        <span>The Challenge</span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {activeStudy.challenge}
                      </p>
                    </div>

                    {/* Solution Card */}
                    <div className="rounded-2xl border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/70 dark:bg-emerald-950/20 p-5 space-y-2">
                      <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
                        <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>The Zenelait Solution</span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {activeStudy.solution}
                      </p>
                    </div>
                  </div>

                  {/* Tech Stack Pills & Client Quote */}
                  <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mr-2">
                        Tech Stack:
                      </span>
                      {activeStudy.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-slate-200/70 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-800/80 px-3 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Client Quote */}
                    <div className="rounded-2xl bg-rose-50/40 dark:bg-slate-950/60 p-4 border border-rose-100/80 dark:border-slate-800 flex items-start gap-3">
                      <Quote className="size-5 text-[#ff5252] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs italic text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                          "{activeStudy.quote}"
                        </p>
                        <p className="mt-2 text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          — {activeStudy.clientName}, <span className="text-[#ff5252]">{activeStudy.clientRole}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Key Metrics Grid & Image (5 Cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  {/* High-Res Image Header */}
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 h-52 sm:h-60 w-full bg-slate-900">
                    <img
                      src={activeStudy.image}
                      alt={activeStudy.title}
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase tracking-widest text-white drop-shadow-md">
                        {activeStudy.client}
                      </span>
                      <span className="size-2.5 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                  </div>

                  {/* 4 Key Metrics Cards Grid */}
                  <div className="grid grid-cols-2 gap-3.5 flex-1">
                    {activeStudy.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col justify-center p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 text-center transition-all duration-300 hover:border-rose-300 dark:hover:border-rose-500/40 hover:shadow-md"
                      >
                        <p className="text-2xl sm:text-3xl font-black text-[#ff5252] tracking-tight">
                          {metric.value}
                        </p>
                        <p className="mt-1 text-xs font-bold text-slate-800 dark:text-white">
                          {metric.label}
                        </p>
                        <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                          {metric.sub}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Action Button */}
                  <Link
                    to="/contact"
                    className="button-shine w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 via-red-600 to-rose-600 px-6 py-3.5 text-xs font-extrabold text-white shadow-lg shadow-rose-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-rose-500/40"
                  >
                    <span>Request Similar Case Study Consultation</span>
                    <ArrowRight className="size-4 stroke-[2.5]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
