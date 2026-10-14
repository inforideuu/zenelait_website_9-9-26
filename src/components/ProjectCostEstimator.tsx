import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Calculator,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Zap,
  Globe,
  Smartphone,
  Building2,
  Bot,
  BarChart3,
  Video,
  ShieldCheck,
  Clock,
  Layers,
  Sparkles
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { getPageSections, PageSectionContent } from "@/lib/api";

export interface OptionItem {
  id: string;
  name: string;
  desc: string;
  iconName?: string;
  basePrice?: number;
  baseDays: number;
}

export interface FeatureItem {
  id: string;
  name: string;
  price?: number;
  days: number;
}

export interface TimelineItem {
  id: string;
  name: string;
  multiplier?: number;
  label: string;
}

export interface EstimatorConfig {
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  warrantyText: string;
  currency?: string;
  categories: OptionItem[];
  featuresMap: Record<string, FeatureItem[]>;
  timelines: TimelineItem[];
  is_active: boolean;
}

export const ICON_MAP: Record<string, any> = {
  Globe,
  Smartphone,
  Building2,
  Bot,
  BarChart3,
  Video,
  Layers,
  Sparkles,
  Zap,
  Calculator,
};

export const DEFAULT_ESTIMATOR_CONFIG: EstimatorConfig = {
  badge: "Project Scope & Delivery Blueprint",
  title: "Calculate Your Engineering Roadmap & Delivery Timeline",
  subtitle: "Select your project specifications to dynamically compute required engineering sprints, delivery phases, and recommended specialist team squad.",
  ctaText: "Request Custom Statement of Work",
  warrantyText: "Production SLA & Support",
  currency: "INR",
  is_active: true,
  categories: [
    {
      id: "web-saas",
      name: "Web & SaaS Application",
      desc: "Custom web portal, SaaS platform, or high-performance corporate site.",
      iconName: "Globe",
      basePrice: 45000,
      baseDays: 14,
    },
    {
      id: "mobile-app",
      name: "Mobile App Development",
      desc: "iOS & Android app built with React Native / Flutter for high performance.",
      iconName: "Smartphone",
      basePrice: 65000,
      baseDays: 21,
    },
    {
      id: "crm-erp",
      name: "Enterprise CRM & ERP",
      desc: "Inventory, sales pipeline, billing, and workforce automation platform.",
      iconName: "Building2",
      basePrice: 95000,
      baseDays: 30,
    },
    {
      id: "ai-automation",
      name: "Custom AI & Chatbots",
      desc: "AI assistants, automated workflows, and custom LLM integrations.",
      iconName: "Bot",
      basePrice: 55000,
      baseDays: 14,
    },
    {
      id: "growth-marketing",
      name: "Growth & SEO Campaign",
      desc: "Data-driven SEO, Google/Meta Ads, lead generation, and analytics.",
      iconName: "BarChart3",
      basePrice: 35000,
      baseDays: 10,
    },
    {
      id: "video-branding",
      name: "Video & Graphic Production",
      desc: "Commercial video ads, brand identity, motion graphics, and content design.",
      iconName: "Video",
      basePrice: 25000,
      baseDays: 7,
    },
  ],
  featuresMap: {
    "web-saas": [
      { id: "ui-ux", name: "Custom UI/UX & Glassmorphism Design", price: 15000, days: 5 },
      { id: "payments", name: "Stripe / UPI Gateway Integration", price: 12000, days: 3 },
      { id: "admin-dash", name: "Advanced Admin Analytics Dashboard", price: 18000, days: 6 },
      { id: "seo-opt", name: "Core Web Vitals & Technical SEO", price: 10000, days: 3 },
    ],
    "mobile-app": [
      { id: "cross-platform", name: "iOS & Android Dual Deployment", price: 25000, days: 7 },
      { id: "push-notify", name: "Push Notifications & Realtime Chat", price: 15000, days: 4 },
      { id: "offline-sync", name: "Offline Data Storage & Sync", price: 15000, days: 5 },
      { id: "app-store", name: "App Store & Play Store Publishing", price: 8000, days: 2 },
    ],
    "crm-erp": [
      { id: "multi-role", name: "Multi-tenant & Role-Based Permissions", price: 28000, days: 8 },
      { id: "billing-gst", name: "Automated Invoicing & GST Tax Engine", price: 18000, days: 5 },
      { id: "legacy-export", name: "Legacy DB Migration & API Sync", price: 22000, days: 7 },
      { id: "reports-pdf", name: "Automated PDF Report Generator", price: 12000, days: 3 },
    ],
    "ai-automation": [
      { id: "custom-knowledge", name: "Trained on Private Business Data / Vector DB", price: 28000, days: 7 },
      { id: "omnichannel", name: "WhatsApp & Web Widget Sync", price: 15000, days: 4 },
      { id: "crm-ai-connect", name: "Automatic Lead Qualification to CRM", price: 15000, days: 4 },
      { id: "voice-ai", name: "Interactive Voice / Speech AI Module", price: 30000, days: 10 },
    ],
    "growth-marketing": [
      { id: "seo-audit", name: "Deep Technical & Competitor SEO Audit", price: 12000, days: 4 },
      { id: "ppc-setup", name: "Google & Meta Paid Ad Campaign Setup", price: 15000, days: 5 },
      { id: "conversion-funnel", name: "Landing Page Conversion Optimization", price: 18000, days: 5 },
      { id: "content-pack", name: "Monthly High-Authority Content & Backlinks", price: 20000, days: 10 },
    ],
    "video-branding": [
      { id: "4k-shoot", name: "High-Definition Commercial Shoot", price: 25000, days: 5 },
      { id: "2d-motion", name: "2D/3D Animated Motion Graphics", price: 20000, days: 6 },
      { id: "brand-kit", name: "Complete Brand Identity & Logo Guidelines", price: 15000, days: 4 },
      { id: "social-cuts", name: "Short Form Video Cuts (Reels/Shorts)", price: 12000, days: 3 },
    ],
  },
  timelines: [
    { id: "fast", name: "Express Launch", multiplier: 1.25, label: "Prioritized Sprint (Faster Delivery)" },
    { id: "standard", name: "Standard Pace", multiplier: 1.0, label: "Balanced Agile Sprints" },
    { id: "flexible", name: "Flexible Timeline", multiplier: 0.9, label: "Gradual Phased Milestones" },
  ],
};

export function ProjectCostEstimator() {
  const [config, setConfig] = useState<EstimatorConfig>(DEFAULT_ESTIMATOR_CONFIG);
  const [isVisible, setIsVisible] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState<string>("web-saas");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["ui-ux", "admin-dash"]);
  const [selectedTimeline, setSelectedTimeline] = useState<string>("standard");

  // Fetch dynamic configuration from API page section 'home_calculator'
  useEffect(() => {
    getPageSections()
      .then((sections) => {
        const calcSec = sections.find((s) => s.section_key === "home_calculator");
        if (calcSec) {
          if (calcSec.extra_json?.is_active === false) {
            setIsVisible(false);
            return;
          }
          setIsVisible(true);
          const ej = calcSec.extra_json || {};
          setConfig({
            badge: calcSec.subtitle || ej.badge || DEFAULT_ESTIMATOR_CONFIG.badge,
            title: calcSec.title || DEFAULT_ESTIMATOR_CONFIG.title,
            subtitle: calcSec.body || ej.subtitle || DEFAULT_ESTIMATOR_CONFIG.subtitle,
            ctaText: ej.ctaText || DEFAULT_ESTIMATOR_CONFIG.ctaText,
            warrantyText: ej.warrantyText || DEFAULT_ESTIMATOR_CONFIG.warrantyText,
            currency: ej.currency || DEFAULT_ESTIMATOR_CONFIG.currency,
            is_active: ej.is_active !== false,
            categories: Array.isArray(ej.categories) && ej.categories.length > 0 ? ej.categories : DEFAULT_ESTIMATOR_CONFIG.categories,
            featuresMap: ej.featuresMap && Object.keys(ej.featuresMap).length > 0 ? ej.featuresMap : DEFAULT_ESTIMATOR_CONFIG.featuresMap,
            timelines: Array.isArray(ej.timelines) && ej.timelines.length > 0 ? ej.timelines : DEFAULT_ESTIMATOR_CONFIG.timelines,
          });

          // Ensure selected category is valid
          if (Array.isArray(ej.categories) && ej.categories.length > 0) {
            setSelectedCategory(ej.categories[0].id);
            const firstFeatures = (ej.featuresMap?.[ej.categories[0].id] || []).slice(0, 2).map((f: FeatureItem) => f.id);
            setSelectedFeatures(firstFeatures);
          }
        }
      })
      .catch(() => {});
  }, []);

  if (!isVisible) {
    return null;
  }

  const categories = config.categories.length > 0 ? config.categories : DEFAULT_ESTIMATOR_CONFIG.categories;
  const categoryObj: OptionItem = categories.find((c) => c.id === selectedCategory) || categories[0] || DEFAULT_ESTIMATOR_CONFIG.categories[0]!;
  const availableFeatures = config.featuresMap[selectedCategory] || config.featuresMap[categoryObj.id] || [];
  const timelines = config.timelines.length > 0 ? config.timelines : DEFAULT_ESTIMATOR_CONFIG.timelines;
  const timelineObj: TimelineItem = timelines.find((t) => t.id === selectedTimeline) || timelines[1] || timelines[0] || DEFAULT_ESTIMATOR_CONFIG.timelines[0]!;

  const toggleFeature = (featureId: string) => {
    if (selectedFeatures.includes(featureId)) {
      setSelectedFeatures(selectedFeatures.filter((id) => id !== featureId));
    } else {
      setSelectedFeatures([...selectedFeatures, featureId]);
    }
  };

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    const newFeatures = (config.featuresMap[catId] || []).slice(0, 2).map((f) => f.id);
    setSelectedFeatures(newFeatures);
  };

  // Calculations for Delivery Timeline, Sprints & Team Blueprint (No Monetary Prices)
  const baseDays = categoryObj?.baseDays || 14;
  const featuresDaysTotal = selectedFeatures.reduce((acc, featId) => {
    const feat = availableFeatures.find((f) => f.id === featId);
    return acc + (feat ? feat.days : 0);
  }, 0);

  const rawDays = baseDays + featuresDaysTotal;
  const speedFactor = timelineObj?.id === "fast" ? 0.75 : timelineObj?.id === "flexible" ? 1.25 : 1.0;
  const totalDays = Math.max(7, Math.round(rawDays * speedFactor));
  const estimatedWeeks = Math.max(1, Math.round(totalDays / 7));
  const sprintCount = Math.max(1, Math.ceil(totalDays / 14)); // 2-week agile sprints
  const engineeringHours = Math.round(totalDays * 7.5);

  // Complexity Tier determination based on days and selected features count
  const complexityLevel =
    totalDays > 38 || selectedFeatures.length >= 4
      ? { label: "Enterprise Scale", color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-500/10 border-purple-500/30", desc: "Multi-service architecture, robust security, & high-volume scalability." }
      : totalDays > 22 || selectedFeatures.length >= 2
      ? { label: "Growth / Scalable Build", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10 border-amber-500/30", desc: "Production-ready modular solution built for market velocity." }
      : { label: "Agile MVP Launch", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30", desc: "Lean, fast-to-market release focusing on core value proposition." };

  // Recommended Pod Squad
  const teamSquad = [
    { role: "Technical Lead / Architect", count: "1× Dedicated" },
    { role: "Senior Full-Stack Engineer", count: totalDays > 25 ? "2× Full-Time" : "1× Full-Time" },
    { role: "UI/UX & Design Systems", count: "1× Specialized" },
    { role: "QA & Cloud DevOps", count: "1× Automated" },
  ];

  const resetEstimator = () => {
    if (categories.length > 0 && categories[0]) {
      setSelectedCategory(categories[0].id);
      const defaultFeats = (config.featuresMap[categories[0].id] || []).slice(0, 2).map((f) => f.id);
      setSelectedFeatures(defaultFeats);
    }
    if (timelines.length > 1 && timelines[1]) {
      setSelectedTimeline(timelines[1].id);
    }
  };

  const renderHeading = (titleText: string) => {
    const words = titleText.split(" ");
    if (words.length > 3) {
      const first = words.slice(0, -3).join(" ");
      const last = words.slice(-3).join(" ");
      return (
        <>
          {first} <span className="text-primary">{last}</span>
        </>
      );
    }
    return titleText;
  };

  return (
    <section className="relative overflow-hidden bg-surface/30 dark:bg-background py-20 lg:py-28 text-foreground border-y border-border" id="project-calculator">
      {/* Background Subtle Gradient Lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-10 size-[450px] rounded-full bg-primary/10 blur-[100px]" />

      <div className="container-x relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <Reveal className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-md mb-4 shadow-xs">
            <Calculator className="size-3.5 text-primary animate-pulse" />
            <span>{config.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
            {renderHeading(config.title)}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-lg font-medium leading-relaxed">
            {config.subtitle}
          </p>
        </Reveal>

        {/* Main Grid Container */}
        <div className="mt-14 grid gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Interactive Inputs (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Category Selection */}
            <Reveal delay={100} direction="up">
              <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 border border-primary/30 text-xs font-extrabold text-primary">
                      01
                    </span>
                    <h3 className="text-xl font-extrabold tracking-tight text-foreground">
                      Select Product / Service Architecture
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={resetEstimator}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    <RotateCcw className="size-3.5" />
                    <span>Reset</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {categories.map((cat) => {
                    const Icon = (cat.iconName && ICON_MAP[cat.iconName]) || Globe;
                    const isSelected = selectedCategory === cat.id;

                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleCategoryChange(cat.id)}
                        className={`group relative flex items-start gap-3.5 p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? "border-primary bg-primary/10 shadow-md shadow-primary/10 ring-1 ring-primary"
                            : "border-border/80 bg-surface/50 hover:border-primary/50 hover:bg-card"
                        }`}
                      >
                        <div
                          className={`size-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "bg-surface border border-border text-foreground group-hover:bg-primary/10 group-hover:text-primary"
                          }`}
                        >
                          <Icon className="size-5 stroke-[2.2]" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4
                              className={`font-bold text-sm tracking-tight truncate ${
                                isSelected ? "text-primary" : "text-foreground group-hover:text-primary transition-colors"
                              }`}
                            >
                              {cat.name}
                            </h4>
                            {isSelected && (
                              <CheckCircle2 className="size-4 text-primary shrink-0 ml-1" />
                            )}
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {cat.desc}
                          </p>
                          <div className="mt-2.5 flex items-center gap-1.5 text-xs font-bold text-primary">
                            <Clock className="size-3.5 text-primary" />
                            <span>Est. Base: ~{cat.baseDays} working days</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            {/* Step 2: Deliverables & Add-on Features */}
            <Reveal delay={150} direction="up">
              <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 border border-primary/30 text-xs font-extrabold text-primary">
                    02
                  </span>
                  <div>
                    <h3 className="text-xl font-extrabold tracking-tight text-foreground">
                      Choose Deliverables & Modules
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5 font-medium">
                      Customize your build specifications for {categoryObj.name}
                    </p>
                  </div>
                </div>

                {availableFeatures.length === 0 ? (
                  <p className="text-xs text-muted-foreground italic py-3">No specific add-on features configured for this category yet.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {availableFeatures.map((feat) => {
                      const isChecked = selectedFeatures.includes(feat.id);

                      return (
                        <button
                          key={feat.id}
                          type="button"
                          onClick={() => toggleFeature(feat.id)}
                          className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                            isChecked
                              ? "border-primary bg-primary/10 text-foreground shadow-xs ring-1 ring-primary/40"
                              : "border-border/80 bg-surface/50 text-foreground hover:border-primary/40 hover:bg-card"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0 pr-2">
                            <div
                              className={`size-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                                isChecked
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border bg-background"
                              }`}
                            >
                              {isChecked && <CheckCircle2 className="size-3.5" />}
                            </div>
                            <span className="text-xs font-bold tracking-tight truncate">
                              {feat.name}
                            </span>
                          </div>

                          <span className="text-xs font-bold text-primary shrink-0 flex items-center gap-1">
                            <Clock className="size-3.5" />
                            +{feat.days}d
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </Reveal>

            {/* Step 3: Delivery Timeline Pace */}
            <Reveal delay={200} direction="up">
              <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 border border-primary/30 text-xs font-extrabold text-primary">
                    03
                  </span>
                  <h3 className="text-xl font-extrabold tracking-tight text-foreground">
                    Sprint Cadence & Velocity
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {timelines.map((tl) => {
                    const isSelected = selectedTimeline === tl.id;

                    return (
                      <button
                        key={tl.id}
                        type="button"
                        onClick={() => setSelectedTimeline(tl.id)}
                        className={`p-4 rounded-2xl border text-center transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary shadow-xs"
                            : "border-border/80 bg-surface/50 text-muted-foreground hover:border-primary/40 hover:bg-card hover:text-foreground"
                        }`}
                      >
                        <h4 className="font-extrabold text-sm text-foreground tracking-tight">{tl.name}</h4>
                        <p className="mt-1 text-xs text-muted-foreground">{tl.label}</p>
                        <span className="mt-2.5 inline-block text-[11px] font-extrabold uppercase tracking-wider text-primary">
                          {tl.id === "fast"
                            ? "High-Velocity Sprint"
                            : tl.id === "flexible"
                            ? "Gradual Phased Milestones"
                            : "Standard Bi-Weekly Cadence"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Dynamic Project Blueprint & Roadmap Card (5 Cols Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <Reveal delay={250} direction="up">
              <div className="relative flex flex-col overflow-hidden rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-lg transition-all duration-500">
                <div className="pointer-events-none absolute -right-20 -top-20 size-60 rounded-full bg-primary/10 blur-3xl" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between pb-5 border-b border-border/60">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-primary">
                      Delivery Blueprint
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 backdrop-blur-md">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Sprint Ready
                    </span>
                  </div>

                  {/* Primary Metric: Delivery Timeline & Sprints */}
                  <div className="mt-6 rounded-2xl bg-surface/80 border border-border/60 p-6 text-center">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground block">
                      Estimated Time-To-Market
                    </span>

                    <div className="mt-2 flex items-center justify-center gap-2">
                      <span className="text-4xl sm:text-5xl font-black text-foreground tracking-tight">
                        ~{estimatedWeeks} {estimatedWeeks === 1 ? "Week" : "Weeks"}
                      </span>
                    </div>
                    <div className="mt-1.5 text-xs font-bold text-muted-foreground">
                      ({totalDays} Working Days • {sprintCount} Agile {sprintCount === 1 ? "Sprint" : "Sprints"})
                    </div>

                    {/* Complexity Tier Badge */}
                    <div className="mt-4 pt-3.5 border-t border-border/60">
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-extrabold text-foreground shadow-xs">
                        <Sparkles className="size-3.5 text-primary" />
                        <span>{complexityLevel.label}</span>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                        {complexityLevel.desc}
                      </p>
                    </div>
                  </div>

                  {/* Phased Milestone Roadmap */}
                  <div className="mt-6 space-y-3">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                      <span>Phased Execution Roadmap</span>
                      <span className="text-xs font-bold text-primary">~{engineeringHours} eng hrs</span>
                    </h4>

                    <div className="space-y-2">
                      {/* Phase 1 */}
                      <div className="p-3.5 rounded-xl bg-surface/60 border border-border/60">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-foreground flex items-center gap-2">
                            <span className="size-2 rounded-full bg-emerald-500" />
                            Phase 1: Architecture & UI Prototype
                          </span>
                          <span className="text-xs font-bold text-muted-foreground">Sprint 1</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          System schema, UX wireframes, interactive design system, and technical discovery.
                        </p>
                      </div>

                      {/* Phase 2 */}
                      <div className="p-3.5 rounded-xl bg-surface/60 border border-border/60">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-foreground flex items-center gap-2">
                            <span className="size-2 rounded-full bg-blue-500" />
                            Phase 2: Core Engineering & Modules
                          </span>
                          <span className="text-xs font-bold text-muted-foreground">
                            {sprintCount > 1 ? `Sprint 2 – ${sprintCount}` : "Active Sprint"}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          Backend APIs, frontend implementation, database schemas, and {selectedFeatures.length} selected feature integrations.
                        </p>
                      </div>

                      {/* Phase 3 */}
                      <div className="p-3.5 rounded-xl bg-surface/60 border border-border/60">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-foreground flex items-center gap-2">
                            <span className="size-2 rounded-full bg-purple-500" />
                            Phase 3: QA, Security & Production Launch
                          </span>
                          <span className="text-xs font-bold text-muted-foreground">Final Release</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          End-to-end stress testing, security audits, cloud CI/CD staging, and live production deployment.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Team Squad Blueprint */}
                  <div className="mt-6 space-y-2.5">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground">
                      Dedicated Engineering Squad
                    </h4>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {teamSquad.map((member, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-surface/60 border border-border/60">
                          <div className="text-xs font-bold text-primary">{member.count}</div>
                          <div className="font-semibold text-foreground truncate mt-0.5">{member.role}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Call-To-Action Button */}
                  <div className="mt-7">
                    <Link
                      to="/contact"
                      className="button-shine w-full inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-primary via-red-600 to-rose-600 px-6 py-4 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-primary/40"
                    >
                      <span>{config.ctaText}</span>
                      <ArrowRight className="size-4 stroke-[2.5]" />
                    </Link>

                    <div className="mt-3.5 flex items-center justify-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5 text-primary font-bold">
                        <ShieldCheck className="size-3.5" />
                        {config.warrantyText}
                      </span>
                      <span>•</span>
                      <span>Confidential NDA & Free Architecture Consultation</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
