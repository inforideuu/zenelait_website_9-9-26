import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Cpu,
  Globe,
  Cloud,
  Bot,
  Layers,
  Sparkles,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Server,
  ArrowRight,
  Database,
  Code2
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

interface TechItem {
  name: string;
  category: string;
  badge: string;
  tag: string;
  description: string;
  icon: string;
  color: string;
}

const TECH_CATEGORIES = [
  { id: "all", label: "All Technologies", icon: Cpu },
  { id: "frontend-backend", label: "Frontend & Backend", icon: Globe },
  { id: "cloud-devops", label: "Cloud & DevOps", icon: Cloud },
  { id: "ai-analytics", label: "AI & Analytics", icon: Bot },
  { id: "integrations", label: "Enterprise Integrations", icon: Layers },
];

const TECH_ITEMS: TechItem[] = [
  // Frontend & Backend
  {
    name: "React.js & Next.js",
    category: "frontend-backend",
    badge: "Modern Web Core",
    tag: "Sub-second Load Speeds",
    description: "Server-side rendering, static generation, and high-performance interactive user interfaces.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
  },
  {
    name: "Node.js & Express",
    category: "frontend-backend",
    badge: "Scalable Microservices",
    tag: "High Concurrency API",
    description: "Event-driven asynchronous backend engine built to handle millions of simultaneous API calls.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#339933",
  },
  {
    name: "Python & FastAPI",
    category: "frontend-backend",
    badge: "AI & Data Engine",
    tag: "High-Performance Backend",
    description: "Used for robust backend APIs, asynchronous data pipelines, machine learning, and AI model serving.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    color: "#3776AB",
  },
  {
    name: "TypeScript & Tailwind",
    category: "frontend-backend",
    badge: "Type-Safe UI System",
    tag: "Zero-Defect Codebase",
    description: "Strict static typing combined with responsive, high-aesthetic atomic utility styling.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    color: "#3178C6",
  },
  {
    name: "PostgreSQL & Redis",
    category: "frontend-backend",
    badge: "Relational & In-Memory",
    tag: "Sub-millisecond Queries",
    description: "ACID-compliant transactional database paired with high-speed in-memory caching layers.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    color: "#4169E1",
  },

  // Cloud & DevOps
  {
    name: "Amazon Web Services (AWS)",
    category: "cloud-devops",
    badge: "Global Cloud Host",
    tag: "99.99% Uptime Guarantee",
    description: "EC2, S3, RDS, Lambda serverless, and CloudFront CDN for global infrastructure resilience.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    color: "#FF9900",
  },
  {
    name: "Docker & Kubernetes",
    category: "cloud-devops",
    badge: "Container Orchestration",
    tag: "Zero-Downtime Deploys",
    description: "Isolated containerization and automated cluster scaling across high-traffic environments.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    color: "#2496ED",
  },
  {
    name: "Microsoft Azure & GCP",
    category: "cloud-devops",
    badge: "Enterprise Hybrid Cloud",
    tag: "Bank-Grade Compliance",
    description: "Secure enterprise cloud deployments with automated disaster recovery and geo-redundancy.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    color: "#0089D6",
  },
  {
    name: "GitLab & GitHub Actions",
    category: "cloud-devops",
    badge: "Automated CI/CD",
    tag: "Automated QA Pipelines",
    description: "Continuous integration pipelines enforcing automated unit testing, security vulnerability scans, and deployment.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "#F05032",
  },

  // AI & Analytics
  {
    name: "OpenAI & Custom LLMs",
    category: "ai-analytics",
    badge: "Generative AI Core",
    tag: "Trained on Enterprise Data",
    description: "Integration of GPT-4o models, vector embeddings, and RAG architectures for intelligent automation.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    color: "#ff5252",
  },
  {
    name: "TensorFlow & PyTorch",
    category: "ai-analytics",
    badge: "Machine Learning",
    tag: "Predictive Analytics",
    description: "Custom computer vision, NLP, and predictive forecast algorithms built for specialized business logic.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    color: "#FF6F00",
  },
  {
    name: "Google Analytics 4 & Mixpanel",
    category: "ai-analytics",
    badge: "Behavioral Analytics",
    tag: "Realtime User Insights",
    description: "Full-funnel conversion tracking, event streaming, and automated executive reporting dashboards.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
    color: "#4285F4",
  },

  // Integrations
  {
    name: "Stripe & Razorpay Payment Engine",
    category: "integrations",
    badge: "FinTech & Billing",
    tag: "PCI-DSS Level 1 Secure",
    description: "Omnichannel checkout, recurring subscription billing, automated GST invoicing, and payout APIs.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    color: "#635BFF",
  },
  {
    name: "Salesforce & HubSpot CRM",
    category: "integrations",
    badge: "CRM Ecosystem Sync",
    tag: "Bi-Directional Data Sync",
    description: "Seamless lead capture, contact syncing, deal pipeline automation, and automated marketing workflows.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg",
    color: "#00A1E0",
  },
  {
    name: "SAP & ERP Connectors",
    category: "integrations",
    badge: "Enterprise Resource Sync",
    tag: "Realtime Inventory API",
    description: "Connecting custom web products with legacy enterprise ERPs, warehouse management, and financial systems.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
    color: "#00549E",
  },
];

export function TechStackMatrix() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredItems =
    activeCategory === "all"
      ? TECH_ITEMS
      : TECH_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section className="relative overflow-hidden bg-[#090d16] dark:bg-[#060911] py-20 lg:py-28 text-white border-y border-rose-900/30">
      {/* CREATIVE BACKGROUND ARTWORK */}
      {/* 1. Animated Radial Glow Mesh Orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-gradient-to-br from-rose-600/20 via-primary/10 to-transparent blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 right-10 size-[500px] rounded-full bg-rose-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 left-10 size-[400px] rounded-full bg-indigo-500/10 blur-[130px]" />

      {/* 2. Interactive SVG Tech Network Circuit Grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="circuitGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ff5252" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.4" />
              <circle cx="60" cy="0" r="1.5" fill="#ff5252" opacity="0.6" />
              <circle cx="0" cy="60" r="1.5" fill="#ff5252" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuitGrid)" />
        </svg>
      </div>

      {/* 3. Glowing Corner Cyber Poly Line graphics */}
      <div className="pointer-events-none absolute top-10 left-10 opacity-30">
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
          <path d="M 0 40 L 40 0 L 140 0 L 180 40" stroke="#ff5252" strokeWidth="1.5" />
          <circle cx="40" cy="0" r="3" fill="#ff5252" />
          <circle cx="140" cy="0" r="3" fill="#ff5252" />
        </svg>
      </div>

      <div className="container-x relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <Reveal className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/40 bg-rose-950/50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-[#ff5252] backdrop-blur-md mb-4 shadow-lg shadow-rose-950/50">
            <Cpu className="size-3.5 text-[#ff5252] animate-pulse" />
            <span>Tech Stack Matrix & Integration Ecosystem</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Engineered with <span className="text-[#ff5252]">Modern Enterprise Technologies</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-300 text-base sm:text-lg font-medium leading-relaxed">
            We build with cloud-native frameworks, resilient database architectures, and production-ready AI models to guarantee speed, security, and scalability.
          </p>
        </Reveal>

        {/* Category Tabs Switcher */}
        <Reveal delay={100} direction="up" className="mt-12 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-slate-900/90 p-2 border border-slate-800 backdrop-blur-xl shadow-2xl">
            {TECH_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 ${
                    isSelected
                      ? "bg-gradient-to-r from-rose-500 via-red-600 to-rose-600 text-white shadow-md shadow-rose-600/30 scale-102"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/80"
                  }`}
                >
                  <Icon className={`size-4 ${isSelected ? "text-white" : "text-slate-400"}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Tech Grid Matrix */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((tech, idx) => (
            <Reveal key={tech.name} delay={idx * 50} direction="up">
              <div className="group relative flex flex-col justify-between h-full rounded-2xl border border-slate-800/90 bg-slate-900/80 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-rose-500/50 hover:bg-slate-900 hover:shadow-[0_20px_45px_rgba(255,82,82,0.15)]">
                {/* Top Ambient Glow */}
                <div className="pointer-events-none absolute -top-10 -right-10 size-24 bg-rose-500/10 rounded-full blur-xl group-hover:bg-rose-500/20 transition-all duration-500" />

                <div>
                  {/* Card Header: Icon Avatar & Badge */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="size-11 rounded-xl bg-slate-950 p-2.5 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-rose-500/40 transition-colors">
                        <Code2 className="size-5 text-[#ff5252]" />
                      </div>

                      <div>
                        <h3 className="font-extrabold text-white text-base leading-tight group-hover:text-[#ff5252] transition-colors">
                          {tech.name}
                        </h3>
                        <span className="text-[11px] font-bold text-slate-400">
                          {tech.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Scalability Tag Pill */}
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-[10px] font-extrabold text-emerald-400">
                      <CheckCircle2 className="size-3 text-emerald-400" />
                      <span>{tech.tag}</span>
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {tech.description}
                  </p>
                </div>

                {/* Bottom Status Footnote */}
                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Server className="size-3 text-rose-500" />
                    Enterprise Standard
                  </span>
                  <span className="text-emerald-400 font-bold">ACTIVE</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Integration Architecture Highlight Card */}
        <Reveal delay={200} direction="up" className="mt-14">
          <div className="relative overflow-hidden rounded-3xl border border-rose-500/30 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-8 sm:p-10 shadow-2xl">
            <div className="pointer-events-none absolute -right-20 -bottom-20 size-80 rounded-full bg-rose-500/10 blur-3xl" />

            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/40 px-3 py-1 text-xs font-bold text-emerald-400">
                  <ShieldCheck className="size-3.5" />
                  <span>100% Modular & API-First Architecture</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Have an Existing Legacy Stack or Third-Party ERP?
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We specialize in building custom connectors, REST/GraphQL APIs, and webhook bridges to connect modern Zenelait products directly into your current infrastructure — with zero downtime.
                </p>
              </div>

              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <Link
                  to="/contact"
                  className="button-shine inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-rose-500 via-red-600 to-rose-600 px-7 py-4 text-sm font-extrabold text-white shadow-xl shadow-rose-600/30 transition-all duration-300 hover:scale-[1.03]"
                >
                  <span>Discuss Integration Scope</span>
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
