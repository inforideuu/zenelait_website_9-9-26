import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Sparkles,
  ArrowRight,
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  X,
  Send,
  ShieldCheck,
  Zap,
  GraduationCap,
  HeartHandshake,
  Award,
  Users,
  Search,
  Code,
  Sparkle,
  ChevronRight,
  Building2,
  DollarSign,
  Laptop,
  Cpu,
  Upload,
  Plane,
  User,
} from "lucide-react";
import heroImg from "@/assets/hero-abstract.jpg";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { SpotlightCard } from "@/components/SpotlightCard";
import { getOpenPositions, submitJobApplication } from "@/lib/api";

const title = "Careers at Zenelait Infotech — Join Our Engineering & Growth Matrix";
const description =
  "Explore open careers and job opportunities at Zenelait Infotech. We are hiring software engineers, AI architects, UI/UX designers, and growth marketers.";

export const Route = createFileRoute("/careers")({
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
  component: Careers,
});

export type JobPosition = {
  id: string;
  title: string;
  department: "Engineering & Systems" | "Product & AI" | "Creative & Design" | "Growth & Marketing";
  location: "Remote" | "Hybrid (Chennai HQ)" | "Chennai HQ";
  type: "Full-Time" | "Lead Role" | "Senior Level";
  experience: string;
  salary: string;
  shortDesc: string;
  responsibilities: string[];
  requirements: string[];
  techStack: string[];
  featured?: boolean;
};

const jobPositions: JobPosition[] = [
  {
    id: "sr-fullstack-dev",
    title: "Senior Full-Stack Engineer (React / Node.js)",
    department: "Engineering & Systems",
    location: "Hybrid (Chennai HQ)",
    type: "Senior Level",
    experience: "4+ Years",
    salary: "₹14L - ₹22L / annum",
    featured: true,
    shortDesc: "Architect scalable enterprise CRM/ERP modules with React, TypeScript, Node.js, and PostgreSQL.",
    responsibilities: [
      "Design and implement high-concurrency microservices and RESTful/GraphQL APIs.",
      "Optimize web applications for sub-second rendering, Lighthouse 100 metrics, and memory efficiency.",
      "Collaborate with UI/UX designers and product managers to release clean, intuitive interfaces.",
    ],
    requirements: [
      "Proven mastery in React, TypeScript, Node.js, Express/Fastify, and PostgreSQL.",
      "Deep understanding of state management, caching (Redis), and CI/CD pipelines.",
      "Strong grasp of system design patterns, ACID compliance, and secure authentication.",
    ],
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker"],
  },
  {
    id: "ai-llm-engineer",
    title: "AI Systems & LLM Integration Architect",
    department: "Product & AI",
    location: "Remote",
    type: "Lead Role",
    experience: "3+ Years in AI/ML",
    salary: "₹18L - ₹28L / annum",
    featured: true,
    shortDesc: "Build cognitive AI chatbot engines, vector database search pipelines, and automated agent workflows.",
    responsibilities: [
      "Develop custom RAG pipelines, fine-tune open-source models, and integrate OpenAI / Claude APIs.",
      "Optimize vector databases (Pinecone / ChromaDB / PgVector) for ultra-fast semantic retrieval.",
      "Build fallback logic, rate-limiters, and safety guardrails for conversational AI.",
    ],
    requirements: [
      "Hands-on experience with Python, LangChain/LlamaIndex, OpenAI APIs, and Vector DBs.",
      "Familiarity with FastAPI/Flask backend services and asynchronous processing queues.",
      "Strong background in NLP, prompt engineering, and model evaluation metrics.",
    ],
    techStack: ["Python", "LangChain", "OpenAI", "Pinecone", "FastAPI", "Docker"],
  },
  {
    id: "lead-uiux-designer",
    title: "Lead UI/UX & Kinetic Motion Designer",
    department: "Creative & Design",
    location: "Hybrid (Chennai HQ)",
    type: "Lead Role",
    experience: "4+ Years",
    salary: "₹12L - ₹18L / annum",
    featured: true,
    shortDesc: "Craft stunning visual interfaces, micro-animations, glassmorphic design systems, and web graphics.",
    responsibilities: [
      "Lead design direction for web applications, brand assets, and mobile interfaces.",
      "Create high-fidelity interactive Figma prototypes, design tokens, and motion guidelines.",
      "Work closely with frontend engineers to guarantee pixel-perfect UI execution.",
    ],
    requirements: [
      "Exceptional Figma mastery, micro-animation skills (After Effects / Lottie), and design system architecture.",
      "Strong aesthetic eye for modern dark modes, glassmorphism, typography, and visual hierarchy.",
      "Solid portfolio showcasing production web apps and brand identity systems.",
    ],
    techStack: ["Figma", "After Effects", "Lottie", "Design Systems", "Web UI"],
  },
  {
    id: "growth-marketing-mgr",
    title: "Growth Marketing & Performance Lead",
    department: "Growth & Marketing",
    location: "Remote",
    type: "Full-Time",
    experience: "3+ Years",
    salary: "₹10L - ₹16L / annum",
    shortDesc: "Drive high-ROAS paid advertising, funnel optimization, and automated lead generation engines.",
    responsibilities: [
      "Manage Google Ads, Meta Ads, and LinkedIn campaign budgets with strict CAC and ROAS targets.",
      "Design A/B testing strategies for landing pages, ad copy, and video hooks.",
      "Build real-time reporting dashboards using Google Analytics 4, GTM, and CRM data.",
    ],
    requirements: [
      "Proven track record managing ₹5L+ monthly ad spend with positive ROI.",
      "Deep expertise in Google Ads Search/Display, Meta Ads Manager, GA4, and conversion optimization.",
      "Strong copy analytical skills and data-driven experimentation mindset.",
    ],
    techStack: ["Google Ads", "Meta Ads", "GA4", "GTM", "HubSpot/CRM"],
  },
  {
    id: "sr-devops-architect",
    title: "Senior DevOps & Cloud Infrastructure Engineer",
    department: "Engineering & Systems",
    location: "Remote",
    type: "Senior Level",
    experience: "4+ Years",
    salary: "₹15L - ₹24L / annum",
    shortDesc: "Manage AWS/GCP cloud environments, automated Kubernetes clusters, and zero-downtime CI/CD pipelines.",
    responsibilities: [
      "Architect resilient Infrastructure as Code (Terraform) across AWS and cloud providers.",
      "Setup automated CI/CD deployment pipelines, zero-downtime releases, and automated monitoring (Prometheus/Grafana).",
      "Enforce zero-trust network security, SSL/TLS configurations, and database backups.",
    ],
    requirements: [
      "Hands-on expertise with AWS/GCP, Docker, Kubernetes, Terraform, and GitHub Actions.",
      "Experience configuring Nginx/HAProxy load balancers and PostgreSQL clustering.",
      "Strong scripting abilities in Bash or Python for infrastructure automation.",
    ],
    techStack: ["AWS", "Kubernetes", "Docker", "Terraform", "GitHub Actions", "Nginx"],
  },
  {
    id: "tech-product-mgr",
    title: "Technical Product Manager (Enterprise Software)",
    department: "Product & AI",
    location: "Chennai HQ",
    type: "Full-Time",
    experience: "3+ Years",
    salary: "₹14L - ₹20L / annum",
    shortDesc: "Bridge business requirements with engineering sprints for CRM, ERP, and LMS platforms.",
    responsibilities: [
      "Define product roadmaps, user stories, sprint priorities, and technical specifications.",
      "Work directly with enterprise clients to conduct workflow mapping and feature discovery.",
      "Analyze usage telemetry to prioritize high-value product improvements.",
    ],
    requirements: [
      "Background in software engineering or technical product management.",
      "Exceptional communication skills, wireframing proficiency, and Agile sprint management.",
      "Familiarity with SaaS metrics, workflow design, and data schema concepts.",
    ],
    techStack: ["Jira", "Figma", "Agile", "SQL", "Product Analytics"],
  },
  {
    id: "content-copywriter",
    title: "Senior Content Strategist & Copywriter",
    department: "Growth & Marketing",
    location: "Remote",
    type: "Full-Time",
    experience: "2+ Years",
    salary: "₹7L - ₹11L / annum",
    shortDesc: "Craft compelling website copy, technical blog articles, whitepapers, and ad scripts.",
    responsibilities: [
      "Write high-converting landing page copy, email sequences, and ad headlines.",
      "Research deep technical subjects and publish engaging SEO articles and case studies.",
      "Maintain brand voice consistency across web, social, and sales collateral.",
    ],
    requirements: [
      "Portfolio of published B2B SaaS articles, web copy, or marketing campaign assets.",
      "Strong grasp of SEO keyword intent and persuasive copywriting frameworks.",
      "Excellent research capabilities and speed in deadline-driven environments.",
    ],
    techStack: ["Copywriting", "SEO", "WordPress/CMS", "Ahrefs", "Notion"],
  },
  {
    id: "3d-motion-designer",
    title: "3D Graphic & Visual Brand Designer",
    department: "Creative & Design",
    location: "Hybrid (Chennai HQ)",
    type: "Full-Time",
    experience: "2+ Years",
    salary: "₹8L - ₹14L / annum",
    shortDesc: "Create 3D product renders, video reels, social media assets, and brand packaging visuals.",
    responsibilities: [
      "Produce 3D visual assets (Blender / Cinema4D) and motion graphics for marketing campaigns.",
      "Design luxury brand identity guides, brochures, presentations, and social graphics.",
      "Edit 4K video promos, reels, and product demo walkthroughs.",
    ],
    requirements: [
      "Proficiency in Blender/Cinema4D, After Effects, Photoshop, Illustrator, and Premiere Pro.",
      "Strong eye for lighting, composition, texture, and futuristic brand aesthetics.",
      "Solid portfolio showcasing 3D rendering and motion graphics work.",
    ],
    techStack: ["Blender", "After Effects", "Photoshop", "Illustrator", "Premiere"],
  },
];

const perks = [
  {
    icon: Cpu,
    title: "High-Spec Hardware",
    desc: "High-performance systems with the latest hardware to help you build, test and innovate faster.",
    badgeBg: "bg-gradient-to-br from-rose-400 to-rose-600",
    badgeShadow: "shadow-rose-500/30",
    lineColor: "bg-[#ff5252]",
    bottomBorder: "bg-[#ff5252]",
    btnBg: "bg-rose-50 dark:bg-rose-950/40 text-[#ff5252]",
    hoverShadow: "hover:shadow-[0_20px_45px_rgba(255,82,82,0.16)]",
  },
  {
    icon: Zap,
    title: "Flexible & Autonomous",
    desc: "Work on your terms with flexible hours, remote options, and the freedom to make an impact.",
    badgeBg: "bg-gradient-to-br from-amber-400 to-amber-500",
    badgeShadow: "shadow-amber-500/30",
    lineColor: "bg-[#f59e0b]",
    bottomBorder: "bg-[#f59e0b]",
    btnBg: "bg-amber-50 dark:bg-amber-950/40 text-[#f59e0b]",
    hoverShadow: "hover:shadow-[0_20px_45px_rgba(245,158,11,0.16)]",
  },
  {
    icon: GraduationCap,
    title: "Learning & Education Budget",
    desc: "Access resources, courses, and conferences to keep growing your skills and career.",
    badgeBg: "bg-gradient-to-br from-indigo-500 to-purple-600",
    badgeShadow: "shadow-indigo-500/30",
    lineColor: "bg-[#6366f1]",
    bottomBorder: "bg-[#6366f1]",
    btnBg: "bg-indigo-50 dark:bg-indigo-950/40 text-[#6366f1]",
    hoverShadow: "hover:shadow-[0_20px_45px_rgba(99,102,241,0.16)]",
  },
  {
    icon: ShieldCheck,
    title: "Comprehensive Health & Wellness",
    desc: "Your well-being matters. We offer health coverage, wellness programs, and mental health support.",
    badgeBg: "bg-gradient-to-br from-emerald-400 to-teal-500",
    badgeShadow: "shadow-emerald-500/30",
    lineColor: "bg-[#10b981]",
    bottomBorder: "bg-[#10b981]",
    btnBg: "bg-emerald-50 dark:bg-emerald-950/40 text-[#10b981]",
    hoverShadow: "hover:shadow-[0_20px_45px_rgba(16,185,129,0.16)]",
  },
  {
    icon: User,
    title: "Performance Bonuses & Equity",
    desc: "Recognize your contributions with attractive bonuses and long-term growth opportunities.",
    badgeBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
    badgeShadow: "shadow-blue-500/30",
    lineColor: "bg-[#3b82f6]",
    bottomBorder: "bg-[#3b82f6]",
    btnBg: "bg-blue-50 dark:bg-blue-950/40 text-[#3b82f6]",
    hoverShadow: "hover:shadow-[0_20px_45px_rgba(59,130,246,0.16)]",
  },
  {
    icon: Plane,
    title: "Zero Bureaucracy",
    desc: "Less paperwork, more progress. We keep things simple so you can focus on what matters.",
    badgeBg: "bg-gradient-to-br from-[#ff5252] to-rose-600",
    badgeShadow: "shadow-rose-500/30",
    lineColor: "bg-[#ff5252]",
    bottomBorder: "bg-[#ff5252]",
    btnBg: "bg-rose-50 dark:bg-rose-950/40 text-[#ff5252]",
    hoverShadow: "hover:shadow-[0_20px_45px_rgba(255,82,82,0.16)]",
  },
];

const hiringSteps = [
  { step: "01", title: "Apply", desc: "Submit your application and portfolio/GitHub profile." },
  { step: "02", title: "Discovery Call", desc: "A brief 20-min intro chat about your goals and our culture." },
  { step: "03", title: "Technical / Design Deep Dive", desc: "Showcase your real-world problem-solving skills." },
  { step: "04", title: "Offer & Onboard", desc: "Receive your offer, hardware setup, and join the matrix." },
];

function Careers() {
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeJobModal, setActiveJobModal] = useState<JobPosition | null>(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [apiJobs, setApiJobs] = useState<JobPosition[]>(jobPositions);

  useEffect(() => {
    getOpenPositions()
      .then(positions => {
        if (positions && positions.length > 0) {
          const activePositions = positions.filter(p => p.is_active !== false);
          if (activePositions.length > 0) {
            const mapped: JobPosition[] = activePositions.map(p => ({
              id: String(p.id),
              title: p.title,
              department: (p.department || "Engineering & Systems") as any,
              location: (p.location || "Chennai HQ") as any,
              type: (p.type || "Full-Time") as any,
              experience: p.experience || "2+ Years",
              salary: "Competitive Package",
              shortDesc: p.description,
              responsibilities: Array.isArray(p.requirements) && p.requirements.length > 0 ? p.requirements : [
                "Architect resilient high-scale software solutions.",
                "Work directly with product teams to build clean, maintainable systems.",
                "Enforce industry standards and continuous release pipelines."
              ],
              requirements: [
                "Strong technical background and experience in relevant domain.",
                "Excellent communication and collaborative problem-solving skills.",
                "Track record of delivering production-ready code."
              ],
              techStack: Array.isArray(p.requirements) && p.requirements.length > 0 ? p.requirements : ["React", "TypeScript", "Python", "Cloud"]
            }));
            setApiJobs(mapped);
          }
        }
      })
      .catch(() => {});
  }, []);

  const filteredJobs = apiJobs.filter((j) => {
    const matchesDept = selectedDept === "All" || j.department === selectedDept;
    const matchesSearch =
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDept && matchesSearch;
  });

  return (
    <div>
      {/* Hero Header Banner matching About Us page reference design */}
      <section className="relative min-h-[620px] w-full overflow-hidden rounded-xl bg-[#0d090b] text-white lg:min-h-[680px]">
        {/* Background Image with Overlays */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&auto=format&fit=crop&q=80"
            alt="Zenelait Infotech Engineering & Growth Culture"
            className="h-full w-full object-cover object-[65%_center] opacity-90"
          />
          {/* Dark left-to-right gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d090b] via-[#0d090b]/85 to-[#0d090b]/20" />
          {/* Bottom gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d090b]/75 via-transparent to-[#0d090b]/20" />
        </div>

        {/* Content */}
        <div className="container-x relative z-10 flex min-h-[620px] items-center py-16 lg:min-h-[680px]">
          <div className="max-w-[620px]">
            {/* Tag Badge */}
            <Reveal direction="down">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-black/40 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
                <Sparkles className="size-3.5" />
                <span>Careers // Join The Matrix</span>
              </div>
            </Reveal>

            {/* Main Headline */}
            <Reveal delay={100} direction="up">
              <h1 className="mt-6 text-4xl font-black leading-[1.03] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[72px]">
                Architect The <br />
                Future Of Software <br />
                <span className="text-primary">& Digital Growth</span>
              </h1>
            </Reveal>

            {/* Description Subtext */}
            <Reveal delay={200} direction="up">
              <p className="mt-6 max-w-[520px] text-base font-medium leading-relaxed text-white/75 sm:text-lg">
                Join an elite team of software engineers, AI architects, visual designers, and growth marketers building high-concurrency systems and kinetic digital campaigns.
              </p>
            </Reveal>

            {/* Dual Action Buttons */}
            <Reveal delay={300} direction="up">
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#open-positions"
                  className="inline-flex items-center justify-center rounded-sm bg-primary px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90 hover:shadow-primary/50"
                >
                  Explore Openings
                </a>

                <a
                  href="#perks"
                  className="inline-flex items-center justify-center rounded-sm border border-white/40 bg-black/20 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white/10"
                >
                  Culture & Perks
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Perks & Benefits Section - Engineered for high-performing talent */}
      <section id="perks" className="relative overflow-hidden bg-[#fafafa] dark:bg-background py-20 lg:py-28 border-t border-slate-100 dark:border-border/40">
        {/* Background SVG Decorative Elements */}
        {/* Top-Left Radial Glow & Curved Arcs */}
        <div className="pointer-events-none absolute -left-20 -top-20 size-[420px] opacity-40 dark:opacity-15">
          <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
            <circle cx="100" cy="100" r="280" stroke="#ff758c" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
            <circle cx="100" cy="100" r="200" stroke="#ff758c" strokeWidth="1" opacity="0.5" />
            <circle cx="100" cy="100" r="120" stroke="#ff758c" strokeWidth="1.2" />
            <circle cx="100" cy="100" r="50" fill="#ff5252" fillOpacity="0.15" />
          </svg>
        </div>

        {/* Top-Right Matrix Dots Pattern */}
        <div className="pointer-events-none absolute right-6 top-8 opacity-30 dark:opacity-15">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            {Array.from({ length: 5 }).map((_, r) =>
              Array.from({ length: 5 }).map((_, c) => (
                <circle key={`${r}-${c}`} cx={15 + c * 22} cy={15 + r * 22} r="2" fill="#cbd5e1" />
              ))
            )}
          </svg>
        </div>

        {/* Bottom-Left Matrix Dots Pattern */}
        <div className="pointer-events-none absolute left-6 bottom-8 opacity-30 dark:opacity-15">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            {Array.from({ length: 5 }).map((_, r) =>
              Array.from({ length: 5 }).map((_, c) => (
                <circle key={`${r}-${c}`} cx={15 + c * 22} cy={15 + r * 22} r="2" fill="#cbd5e1" />
              ))
            )}
          </svg>
        </div>

        {/* Bottom-Right Concentric Arcs */}
        <div className="pointer-events-none absolute -right-24 -bottom-24 size-[500px] opacity-35 dark:opacity-15">
          <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
            <circle cx="400" cy="400" r="320" stroke="#ff758c" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <circle cx="400" cy="400" r="240" stroke="#ff758c" strokeWidth="1" opacity="0.6" />
            <circle cx="400" cy="400" r="160" stroke="#ff758c" strokeWidth="1.2" opacity="0.8" />
          </svg>
        </div>

        <div className="container-x relative z-10">
          <Reveal className="text-center">
            {/* WHY JOIN US Pill Badge */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-[1.5px] w-4 bg-[#ff5252]" />
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 dark:border-rose-900/60 bg-rose-50/80 dark:bg-rose-950/40 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[#ff5252]">
                <Users className="size-3.5 text-[#ff5252]" />
                <span>WHY JOIN US</span>
              </div>
              <span className="h-[1.5px] w-4 bg-[#ff5252]" />
            </div>

            {/* Title */}
            <h2 className="text-4xl font-black text-slate-900 dark:text-white sm:text-5xl lg:text-6xl tracking-tight">
              Engineered for <span className="text-[#ff5252]">high-performing talent</span>
            </h2>

            {/* Subtitle */}
            <p className="mx-auto mt-4 max-w-2xl text-slate-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed font-normal">
              We provide the environment, tools, and freedom for you to do the best work of your career.
            </p>
          </Reveal>

          {/* 6 Cards Grid (3 Columns x 2 Rows) */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {perks.map((p, i) => {
              const IconComp = p.icon;
              return (
                <Reveal key={p.title} delay={(i % 3) * 90} direction="up" className="h-full">
                  <div className="h-full transition-all duration-500 transform-gpu">
                    <div
                      className={`group/card relative flex h-full flex-col justify-between rounded-3xl bg-white dark:bg-card p-7 pt-8 pb-8 border border-slate-100 dark:border-border/60 shadow-[0_12px_35px_rgba(0,0,0,0.05)] dark:shadow-none transition-all duration-300 hover:-translate-y-2 ${p.hoverShadow}`}
                    >
                      <div>
                        {/* Top-Left 3D Soft Rounded Disk Icon */}
                        <div className={`size-14 rounded-2xl ${p.badgeBg} ${p.badgeShadow} flex items-center justify-center text-white mb-6 transition-transform duration-300 group-hover/card:scale-110`}>
                          <IconComp className="size-7 stroke-[2.2]" />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                          {p.title}
                        </h3>

                        {/* Small Color Accent Line under Title */}
                        <div className={`mt-2.5 h-0.5 w-7 rounded-full ${p.lineColor}`} />

                        {/* Description */}
                        <p className="mt-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                          {p.desc}
                        </p>
                      </div>

                      {/* Card Footer: Bottom Right Circular Arrow Button */}
                      <div className="mt-8 flex items-center justify-end">
                        <div className={`size-8 rounded-full flex items-center justify-center text-xs transition-transform duration-300 group-hover/card:scale-110 ${p.btnBg}`}>
                          <ArrowRight className="size-4 stroke-[2.5]" />
                        </div>
                      </div>

                      {/* Bottom Color Accent Strip */}
                      <div className={`absolute bottom-0 inset-x-0 h-1.5 rounded-b-3xl ${p.bottomBorder}`} />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions Section - Matches User Reference Image */}
      <section id="open-positions" className="relative overflow-hidden bg-[#fafafa] dark:bg-background py-20 lg:py-28 border-t border-slate-100 dark:border-border/40">
        {/* Background SVG Decorative Elements */}
        {/* Top-Left Radial Glow & Curved Arcs */}
        <div className="pointer-events-none absolute -left-20 -top-20 size-[420px] opacity-40 dark:opacity-15">
          <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
            <circle cx="100" cy="100" r="280" stroke="#ff758c" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
            <circle cx="100" cy="100" r="200" stroke="#ff758c" strokeWidth="1" opacity="0.5" />
            <circle cx="100" cy="100" r="120" stroke="#ff758c" strokeWidth="1.2" />
            <circle cx="100" cy="100" r="50" fill="#ff5252" fillOpacity="0.15" />
          </svg>
        </div>

        {/* Top-Right Matrix Dots Pattern */}
        <div className="pointer-events-none absolute right-6 top-8 opacity-30 dark:opacity-15">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            {Array.from({ length: 5 }).map((_, r) =>
              Array.from({ length: 5 }).map((_, c) => (
                <circle key={`${r}-${c}`} cx={15 + c * 22} cy={15 + r * 22} r="2" fill="#cbd5e1" />
              ))
            )}
          </svg>
        </div>

        {/* Bottom-Right Concentric Arcs */}
        <div className="pointer-events-none absolute -right-24 -bottom-24 size-[500px] opacity-35 dark:opacity-15">
          <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
            <circle cx="400" cy="400" r="320" stroke="#ff758c" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <circle cx="400" cy="400" r="240" stroke="#ff758c" strokeWidth="1" opacity="0.6" />
            <circle cx="400" cy="400" r="160" stroke="#ff758c" strokeWidth="1.2" opacity="0.8" />
          </svg>
        </div>

        <div className="container-x relative z-10">
          {/* Section Header */}
          <Reveal className="text-center mb-12 lg:mb-14">
            {/* EXPLORE ROLES Pill Badge */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-[1.5px] w-4 bg-[#ff5252]" />
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 dark:border-rose-900/60 bg-rose-50/80 dark:bg-rose-950/40 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[#ff5252]">
                <Briefcase className="size-3.5 text-[#ff5252]" />
                <span>EXPLORE ROLES</span>
              </div>
              <span className="h-[1.5px] w-4 bg-[#ff5252]" />
            </div>

            {/* Title */}
            <h2 className="text-4xl font-black text-slate-900 dark:text-white sm:text-5xl lg:text-6xl tracking-tight">
              Open <span className="text-[#ff5252]">Positions</span>
            </h2>

            {/* Subtitle */}
            <p className="mx-auto mt-4 max-w-2xl text-slate-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed font-normal">
              Find your role and help us construct next-generation digital products.
            </p>
          </Reveal>

          {/* Filter & Search Bar matching reference image */}
          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between max-w-6xl mx-auto border-b border-slate-200/80 dark:border-border/60 pb-8">
            {/* Department Filter Pills */}
            <div className="flex flex-wrap items-center gap-2.5">
              {["All", "Engineering & Systems", "Product & AI", "Creative & Design", "Growth & Marketing"].map(
                (dept) => (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => setSelectedDept(dept)}
                    className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 cursor-pointer ${
                      selectedDept === dept
                        ? "bg-[#ff5252] text-white shadow-md shadow-rose-500/25 scale-105"
                        : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-border hover:border-rose-300"
                    }`}
                  >
                    {dept}
                  </button>
                )
              )}
            </div>

            {/* Search Input Pill */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title or tech stack..."
                className="w-full rounded-full border border-slate-200 dark:border-border bg-white dark:bg-slate-900 py-2.5 pl-11 pr-4 text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#ff5252] focus:outline-none focus:ring-1 focus:ring-[#ff5252] shadow-xs"
              />
            </div>
          </div>

          {/* Jobs 2-Column Grid matching reference image */}
          <div className="grid gap-6 md:grid-cols-2 items-start max-w-6xl mx-auto">
            {filteredJobs.length === 0 ? (
              <div className="col-span-full rounded-3xl border border-slate-200 dark:border-border bg-white dark:bg-card p-12 text-center text-slate-500 dark:text-slate-400 font-medium">
                No matching open roles found for your search criteria. Try clearing filters or search query!
              </div>
            ) : (
              filteredJobs.map((job, idx) => (
                <Reveal key={job.id} delay={(idx % 2) * 80} direction="up">
                  <div className="transition-all duration-300 transform-gpu">
                    <div className="group/card relative flex flex-col rounded-3xl bg-white dark:bg-card p-6 sm:p-7 border border-slate-100 dark:border-border/60 shadow-[0_12px_35px_rgba(0,0,0,0.05)] dark:shadow-none transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(255,82,82,0.12)]">
                      <div>
                        {/* Top Badges Row */}
                        <div className="flex items-center justify-between gap-3">
                          <span className="inline-flex items-center rounded-full border border-rose-200 dark:border-rose-900/60 bg-rose-50/70 dark:bg-rose-950/40 px-3.5 py-1 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#ff5252]">
                            {job.department}
                          </span>
                          {job.featured && (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 dark:border-amber-900/60 bg-amber-50/90 dark:bg-amber-950/50 px-3 py-1 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                              <Sparkles className="size-3 text-amber-500" />
                              <span>PRIORITY ROLE</span>
                            </span>
                          )}
                        </div>

                        {/* Job Title */}
                        <h3 className="mt-3.5 text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-[#ff5252] transition-colors">
                          {job.title}
                        </h3>

                        {/* Short Description */}
                        {job.shortDesc && (
                          <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                            {job.shortDesc}
                          </p>
                        )}

                        {/* Job Details Meta Row */}
                        <div className="mt-4 border-y border-slate-100 dark:border-border/50 py-3 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-bold text-slate-600 dark:text-slate-300">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="size-3.5 text-[#ff5252]" /> {job.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="size-3.5 text-[#ff5252]" /> {job.experience}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <DollarSign className="size-3.5 text-emerald-500" /> {job.salary}
                          </span>
                        </div>

                        {/* Tech Stack Pills */}
                        {job.techStack && job.techStack.length > 0 && (
                          <div className="mt-3.5 flex flex-wrap gap-1.5">
                            {job.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="rounded-md border border-slate-200/80 dark:border-border bg-slate-50 dark:bg-slate-900/80 px-2.5 py-1 text-[11px] font-bold text-slate-600 dark:text-slate-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Footer Apply Button matching image */}
                      <div className="mt-5 flex items-center">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveJobModal(job);
                            setApplicationSubmitted(false);
                          }}
                          className="inline-flex items-center gap-2 rounded-full border border-rose-200 dark:border-rose-900/60 bg-rose-50/80 dark:bg-rose-950/40 px-5 py-2.5 text-xs font-extrabold text-[#ff5252] transition-all duration-300 hover:bg-[#ff5252] hover:text-white hover:border-[#ff5252] hover:shadow-md cursor-pointer group/btn"
                        >
                          <span>View Details & Apply</span>
                          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Hiring Process Stepper */}

      {/* Hiring Process Stepper */}
      <section className="ink-panel relative overflow-hidden border-t border-white/10 py-16 lg:py-24">
        <div className="pointer-events-none absolute -bottom-20 left-1/4 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="container-x relative z-10">
          <Reveal className="text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl text-white">Our Hiring Journey</h2>
            <p className="mx-auto mt-4 max-w-xl text-ink-foreground/80 text-lg">
              Transparent, fast, and respectful of your time. No tedious 6-round marathons.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {hiringSteps.map((step, idx) => (
              <Reveal key={step.step} delay={idx * 90} direction="up">
                <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8">
                  <span className="text-4xl font-extrabold text-primary">{step.step}</span>
                  <h3 className="mt-4 text-xl font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-ink-foreground/75 leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Application Modal */}
      {activeJobModal && (
        <ApplicationModal
          job={activeJobModal}
          submitted={applicationSubmitted}
          onSubmit={() => setApplicationSubmitted(true)}
          onClose={() => setActiveJobModal(null)}
        />
      )}

      {/* Bottom CTA Banner */}
      <section className="container-x py-16 lg:py-24">
        <Reveal direction="zoom">
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-accent via-background to-accent p-10 text-center shadow-[var(--shadow-lift)] sm:p-16">
            <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary/10 blur-3xl animate-float-slow" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">
              Don&rsquo;t see your exact role listed?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-muted-foreground text-lg leading-relaxed">
              We are always eager to connect with exceptional engineers, researchers, and creators. Send us your resume and work samples!
            </p>
            <a
              href="mailto:careers@zenelaitinfotech.com?subject=Spontaneous%20Application%20—%20Zenelait%20Careers"
              className="button-shine mt-8 inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-primary via-red-600 to-rose-600 px-8 py-4 font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-all duration-300 hover:scale-[1.05] hover:shadow-red-500/40"
            >
              <span>Email Careers Team</span>
              <Send className="size-4" />
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

{/* Application Modal Component */}
function ApplicationModal({
  job,
  submitted,
  onSubmit,
  onClose,
}: {
  job: JobPosition;
  submitted: boolean;
  onSubmit: () => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    portfolio: "",
    resumeName: "",
    resumeDataUrl: "",
    note: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          resumeName: file.name,
          resumeDataUrl: event.target?.result as string || ""
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const resumeDataString = formData.resumeDataUrl 
        ? `[RESUME_DATA:${formData.resumeDataUrl}#filename=${encodeURIComponent(formData.resumeName)}]` 
        : `Uploaded file: ${formData.resumeName}`;

      await submitJobApplication({
        job_title: job.title,
        applicant_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        experience: job.experience || "Freshers / Experienced",
        portfolio_link: formData.portfolio.trim(),
        resume_note: formData.note ? `${resumeDataString}\n\nNote: ${formData.note}` : resumeDataString
      });
    } catch (err) {
      console.error("Failed submitting job application:", err);
    } finally {
      setSubmitting(false);
      onSubmit();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-300">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full border border-border p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        >
          <X className="size-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <CheckCircle2 className="size-10" />
            </div>
            <h3 className="mt-6 text-3xl font-black text-foreground">Application Received!</h3>
            <p className="mt-3 text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
              Thank you for applying for the <span className="text-primary font-bold">{job.title}</span> role at Zenelait Infotech. Our engineering recruitment team will review your submission and reach out within 48 hours.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="button-shine mt-8 rounded-lg bg-primary px-8 py-3 font-bold text-primary-foreground"
            >
              Back to Open Careers
            </button>
          </div>
        ) : (
          <div>
            <span className="rounded-md bg-primary/10 border border-primary/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              {job.department}
            </span>
            <h3 className="mt-3 text-2xl sm:text-3xl font-black text-foreground">{job.title}</h3>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-muted-foreground">
              <span>📍 {job.location}</span>
              <span>💼 {job.type}</span>
              <span>💰 {job.salary}</span>
            </div>

            {/* Role Overview Tabs / Lists */}
            <div className="mt-6 rounded-xl border border-border bg-surface p-4 text-xs space-y-3">
              <div>
                <h4 className="font-bold text-foreground uppercase tracking-wider mb-2">Key Responsibilities</h4>
                <ul className="space-y-1.5 text-muted-foreground">
                  {job.responsibilities.map((r) => (
                    <li key={r} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-border">
                <h4 className="font-bold text-foreground uppercase tracking-wider mb-2">Requirements</h4>
                <ul className="space-y-1.5 text-muted-foreground">
                  {job.requirements.map((req) => (
                    <li key={req} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Application Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <h4 className="font-bold text-foreground text-sm uppercase tracking-wider border-b border-border pb-2">
                Submit Your Application
              </h4>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Rahul Sharma"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rahul@example.com"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Portfolio / GitHub / LinkedIn *</label>
                  <input
                    type="url"
                    required
                    value={formData.portfolio}
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                    placeholder="https://github.com/username or portfolio"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Upload Resume (PDF, DOC, DOCX max 10MB) *
                </label>
                <div className="relative flex items-center justify-center w-full rounded-lg border-2 border-dashed border-border bg-background/50 hover:border-primary p-3 transition-colors text-center cursor-pointer">
                  <input
                    type="file"
                    required
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                    <Upload className="size-4 text-primary" />
                    <span>
                      {formData.resumeName ? `Selected: ${formData.resumeName}` : "Click or drag to upload resume file"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Brief Introduction / Cover Note</label>
                <textarea
                  rows={3}
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="Tell us about your recent engineering or design projects..."
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="submit"
                  className="button-shine flex-1 rounded-lg bg-primary py-3 font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.02] text-xs"
                >
                  Submit Application
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-border px-5 py-3 text-xs font-semibold hover:bg-accent"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
