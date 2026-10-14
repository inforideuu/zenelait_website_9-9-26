import { useState, useEffect } from "react";
import {
  FileText,
  Download,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Lock,
  Mail,
  User,
  Building,
  Check,
  TrendingUp,
  FileCheck,
  Eye,
  X
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SpotlightCard } from "@/components/SpotlightCard";
import { submitDemoRequest, getPageSections } from "@/lib/api";
import { jsPDF } from "jspdf";

export interface ResourceGuide {
  id: string;
  title: string;
  fileFormat: string;
  badge: string;
  pages: string;
  downloadsCount: string;
  description: string;
  takeaways: string[];
  coverColor: string;
  downloadFileName: string;
  pdfBase64?: string; // Uploaded custom PDF Data URI if provided by admin
}

export const RESOURCE_GUIDES: ResourceGuide[] = [
  {
    id: "app-development-blueprint",
    title: "End-to-End App Development Blueprint: From Idea to App Stores",
    fileFormat: "PDF Guide",
    badge: "Mobile & Web Apps",
    pages: "",
    downloadsCount: "3,210+ Downloads",
    description:
      "A complete technical and product manual for building iOS & Android applications from concept to production. Covers product discovery, wireframing, tech stack selection (Flutter vs React Native), API contracts, and App Store/Play Store review approvals.",
    takeaways: [
      "Discovery to prototype: Wireframing and click-through validation in 10 days",
      "Native vs. Cross-Platform benchmark: Performance, bundle size, and build costs",
      "Offline sync, push notifications, and background task architectures",
      "App Store & Google Play submission checklist to pass review on first attempt"
    ],
    coverColor: "from-rose-600 via-primary to-orange-500",
    downloadFileName: "Zenelait_App_Development_Idea_To_Deployment_Blueprint.pdf"
  },
  {
    id: "software-architecture-from-scratch",
    title: "Software Engineering from Scratch: Modular Architecture & MVP Build",
    fileFormat: "Technical Guide",
    badge: "Architecture & Code",
    pages: "",
    downloadsCount: "2,780+ Downloads",
    description:
      "The definitive engineering guide for architecting greenfield SaaS and enterprise software. Details database schema design, frontend/backend separation, microservices vs modular monoliths, auth patterns, and scalable API standards.",
    takeaways: [
      "Architectural trade-offs: Monolith vs. Microservices for early-stage velocity",
      "PostgreSQL vs. NoSQL schema modeling for high concurrency workloads",
      "JWT, OAuth2, and RBAC (Role-Based Access Control) security patterns",
      "Clean Code & Domain-Driven Design (DDD) principles that prevent tech debt"
    ],
    coverColor: "from-emerald-600 via-teal-600 to-cyan-600",
    downloadFileName: "Zenelait_Software_Architecture_Scratch_To_Scale_Guide.pdf"
  },
  {
    id: "devops-production-deployment-handbook",
    title: "The Production Deployment & Cloud CI/CD Handbook",
    fileFormat: "DevOps Manual",
    badge: "Deployment & Cloud",
    pages: "",
    downloadsCount: "3,650+ Downloads",
    description:
      "Everything needed to take code from local development into enterprise production. Covers Docker containerization, automated GitHub Actions pipelines, Kubernetes orchestration, zero-downtime rolling deployments, and 24/7 server monitoring.",
    takeaways: [
      "Step-by-step Dockerfile optimization reducing image size by up to 75%",
      "Automated CI/CD pipeline template with linting, unit tests & security scans",
      "Zero-downtime blue/green & canary release deployment strategies on AWS/GCP",
      "Observability setup: Distributed tracing, Prometheus metrics & uptime alerts"
    ],
    coverColor: "from-blue-600 via-indigo-600 to-violet-600",
    downloadFileName: "Zenelait_Production_Deployment_Cloud_CICD_Handbook.pdf"
  }
];

interface KnowledgeHubProps {
  className?: string;
  titleOverride?: string;
}

export function KnowledgeHubDownloadCenter({
  className = "",
  titleOverride
}: KnowledgeHubProps) {
  const [guides, setGuides] = useState<ResourceGuide[]>(RESOURCE_GUIDES);
  const [selectedGuide, setSelectedGuide] = useState<ResourceGuide | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [headerTitle, setHeaderTitle] = useState<string>("");
  const [headerSubtitle, setHeaderSubtitle] = useState<string>("");

  // Modal Form State
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  // Sync dynamic guides from backend 'home_knowledge_hub' page section
  const fetchLiveGuides = () => {
    getPageSections()
      .then((sections) => {
        const hubSec = sections.find((s) => s.section_key === "home_knowledge_hub");
        if (hubSec) {
          if (hubSec.title) setHeaderTitle(hubSec.title);
          if (hubSec.body) setHeaderSubtitle(hubSec.body);
          try {
            const rawJson =
              typeof hubSec.extra_json === "string"
                ? JSON.parse(hubSec.extra_json)
                : hubSec.extra_json;
            if (Array.isArray(rawJson?.guides) && rawJson.guides.length > 0) {
              setGuides(rawJson.guides);
            }
          } catch (err) {
            console.error("Error parsing dynamic knowledge hub extra_json:", err);
          }
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchLiveGuides();
    window.addEventListener("focus", fetchLiveGuides);
    return () => window.removeEventListener("focus", fetchLiveGuides);
  }, []);

  const handleOpenDownload = (guide: ResourceGuide) => {
    const latest = guides.find((g) => g.id === guide.id || g.title === guide.title) || guide;
    setSelectedGuide(latest);
    setDownloadSuccess(false);
  };

  // Helper to generate a rich, professional multi-page PDF with real document contents
  const generateRichPDF = (guide: ResourceGuide) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const primaryColor = [225, 29, 72]; // Rose/Primary #e11d48
    const darkColor = [15, 23, 42]; // Slate-900 #0f172a
    const mutedColor = [100, 116, 139]; // Slate-500 #64748b

    // === PAGE 1: COVER PAGE ===
    // Header Banner
    doc.setFillColor(darkColor[0]!, darkColor[1]!, darkColor[2]!);
    doc.rect(0, 0, 210, 297, "F");

    // Decorative Accent Top Line
    doc.setFillColor(primaryColor[0]!, primaryColor[1]!, primaryColor[2]!);
    doc.rect(0, 0, 210, 8, "F");

    // Brand Tag
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(primaryColor[0]!, primaryColor[1]!, primaryColor[2]!);
    doc.text("ZENELAIT INFOTECH  |  ENGINEERING RESEARCH SERIES", 20, 35);

    // Document Badge
    doc.setFillColor(255, 255, 255, 0.1);
    doc.roundedRect(20, 45, 60, 9, 2, 2, "F");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(guide.badge.toUpperCase(), 25, 51);

    // Main Guide Title
    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    const splitTitle = doc.splitTextToSize(guide.title, 170);
    doc.text(splitTitle, 20, 80);

    // Subtitle / Abstract
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(203, 213, 225); // Slate-300
    const splitDesc = doc.splitTextToSize(guide.description, 170);
    doc.text(splitDesc, 20, 125);

    // Key Executive Takeaways on Cover
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(primaryColor[0]!, primaryColor[1]!, primaryColor[2]!);
    doc.text("WHAT YOU WILL MASTER IN THIS GUIDE:", 20, 170);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(241, 245, 249);
    let startY = 182;
    guide.takeaways.forEach((point, i) => {
      doc.setFillColor(primaryColor[0]!, primaryColor[1]!, primaryColor[2]!);
      doc.circle(23, startY - 1.5, 1.5, "F");
      const wrappedPoint = doc.splitTextToSize(point, 160);
      doc.text(wrappedPoint, 28, startY);
      startY += wrappedPoint.length * 7 + 4;
    });

    // Cover Footer metadata
    doc.setDrawColor(51, 65, 85);
    doc.line(20, 260, 190, 260);
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text("Published: 2026 Edition", 20, 270);
    doc.text(`Format: ${guide.fileFormat}`, 85, 270);
    doc.text("Confidential & Proprietary", 150, 270);

    // === PAGE 2: ARCHITECTURAL FRAMEWORK & CHECKLIST ===
    doc.addPage();
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 210, 297, "F");

    // Header bar
    doc.setFillColor(darkColor[0]!, darkColor[1]!, darkColor[2]!);
    doc.rect(0, 0, 210, 20, "F");
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("ZENELAIT InfoTech ARCHITECTURAL BLUEPRINT", 20, 13);
    doc.setFont("helvetica", "normal");
    doc.text("Page 2", 185, 13);

    // Section 1: End-to-End Implementation Workflow
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(darkColor[0]!, darkColor[1]!, darkColor[2]!);
    doc.text("1. End-to-End Execution Lifecycle", 20, 36);

    const stages = [
      {
        stage: "Stage 01: Product Discovery & Specification",
        desc: "Wireframes, user persona stories, edge-case audit, and system boundary definitions.",
      },
      {
        stage: "Stage 02: Modular Architecture & API Contracts",
        desc: "Clean schemas (PostgreSQL), OpenAPI specs, JWT authentication, and stateless endpoints.",
      },
      {
        stage: "Stage 03: Agile Engineering Sprints",
        desc: "2-week bi-weekly sprints with automated CI/CD builds and continuous staging reviews.",
      },
      {
        stage: "Stage 04: Production Deployment & Observability",
        desc: "Dockerized images, zero-downtime blue/green rollouts, CDN caching, and 24/7 uptime SLAs.",
      },
    ];

    let currentY = 46;
    stages.forEach((s) => {
      doc.setFillColor(248, 250, 252); // slate-50
      doc.roundedRect(20, currentY, 170, 18, 2, 2, "F");
      doc.setDrawColor(226, 232, 240); // slate-200
      doc.roundedRect(20, currentY, 170, 18, 2, 2, "S");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(primaryColor[0]!, primaryColor[1]!, primaryColor[2]!);
      doc.text(s.stage, 25, currentY + 6.5);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.text(s.desc, 25, currentY + 13);

      currentY += 23;
    });

    // Section 2: Production Readiness Checklist
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(darkColor[0]!, darkColor[1]!, darkColor[2]!);
    doc.text("2. Production Go-Live Checklist", 20, currentY + 10);

    const checklist = [
      "SSL/TLS 1.3 enforced with automated renewal via Let's Encrypt / Cloudflare",
      "Environment secrets isolated with zero hardcoded API keys in repository history",
      "Automated database backup snapshots configured with 30-day retention policies",
      "API rate limiting, CORS restrictions, and SQL injection sanitization active",
      "Continuous health-check endpoints (/healthz) monitored every 60 seconds",
    ];

    let checkY = currentY + 20;
    checklist.forEach((item) => {
      doc.setFillColor(primaryColor[0]!, primaryColor[1]!, primaryColor[2]!);
      doc.roundedRect(20, checkY - 3.5, 4, 4, 1, 1, "F");

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);
      const wrapped = doc.splitTextToSize(item, 160);
      doc.text(wrapped, 28, checkY);
      checkY += wrapped.length * 6 + 3;
    });

    // Callout Box: Technical Consultation
    doc.setFillColor(254, 242, 242); // Rose-50
    doc.roundedRect(20, checkY + 5, 170, 26, 3, 3, "F");
    doc.setDrawColor(254, 205, 211); // Rose-200
    doc.roundedRect(20, checkY + 5, 170, 26, 3, 3, "S");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(primaryColor[0]!, primaryColor[1]!, primaryColor[2]!);
    doc.text("Ready to Build with Zenelait Infotech?", 25, checkY + 13);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text(
      "Schedule a 30-minute free technical architecture review with our lead software engineers. Visit zenelait InfoTech.com/contact or email team@zenelait.com.",
      25,
      checkY + 21
    );

    // Save and trigger download
    doc.save(guide.downloadFileName);
  };

  // Trigger PDF download for a guide (admin custom PDF if uploaded, or rich generated PDF)
  const triggerDownload = async (guide: ResourceGuide) => {
    try {
      // Find latest version from state to ensure custom uploaded PDF is grabbed
      const activeGuide =
        guides.find((g) => g.id === guide.id || g.title === guide.title) || guide;

      const fileName = activeGuide.downloadFileName || "Zenelait_Guide.pdf";

      // If an admin has uploaded a custom PDF
      if (
        activeGuide.pdfBase64 &&
        typeof activeGuide.pdfBase64 === "string" &&
        activeGuide.pdfBase64.trim().length > 0
      ) {
        let pdfSource = activeGuide.pdfBase64.trim();

        // Handle raw base64 without data URI prefix
        if (
          !pdfSource.startsWith("data:") &&
          !pdfSource.startsWith("http://") &&
          !pdfSource.startsWith("https://") &&
          !pdfSource.startsWith("/")
        ) {
          pdfSource = `data:application/pdf;base64,${pdfSource}`;
        }

        try {
          // Modern native fetch-to-blob download handles large base64 smoothly
          const res = await fetch(pdfSource);
          const blob = await res.blob();
          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => URL.revokeObjectURL(blobUrl), 15000);
          return;
        } catch (fetchErr) {
          console.warn("Direct blob download failed, falling back to atob:", fetchErr);
          if (pdfSource.startsWith("data:")) {
            const commaIdx = pdfSource.indexOf(",");
            const metaPart = pdfSource.slice(0, commaIdx);
            const base64Data = pdfSource.slice(commaIdx + 1).replace(/\s/g, "");
            const mimeMatch = metaPart.match(/:(.*?);/);
            const mimeType = mimeMatch && mimeMatch[1] ? mimeMatch[1] : "application/pdf";
            const byteCharacters = atob(base64Data);
            const byteArray = new Uint8Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteArray[i] = byteCharacters.charCodeAt(i);
            }
            const blob = new Blob([byteArray], { type: mimeType });
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => URL.revokeObjectURL(blobUrl), 15000);
            return;
          }
        }
      }

      // If no admin custom PDF was uploaded for this topic, generate the default rich multi-page PDF
      generateRichPDF(activeGuide);
    } catch (e) {
      console.error("Error initiating PDF download:", e);
      try {
        generateRichPDF(guide);
      } catch (err) {
        console.error("Fallback generator also failed:", err);
      }
    }
  };

  const handleSubmitDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGuide) return;

    const activeGuide =
      guides.find((g) => g.id === selectedGuide.id || g.title === selectedGuide.title) ||
      selectedGuide;

    setIsSubmitting(true);

    try {
      // 1. Submit lead details to backend demo requests API
      await submitDemoRequest({
        name,
        email,
        company: company || "N/A",
        phone: phone || "N/A",
        service: `Lead Magnet: ${activeGuide.title}`,
        message: `User downloaded resource: "${activeGuide.title}" (${activeGuide.downloadFileName})`,
        status: "Contacted"
      });
    } catch (err) {
      console.error("Error logging lead download:", err);
    }

    setIsSubmitting(false);
    setDownloadSuccess(true);

    // 2. Download the real PDF (admin uploaded file or rich fallback)
    await triggerDownload(activeGuide);
  };

  return (
    <section className={`relative overflow-hidden py-20 lg:py-28 bg-surface/50 border-t border-border/80 ${className}`} id="knowledge-hub">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-primary/10 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 right-10 size-[500px] rounded-full bg-rose-500/10 blur-[130px]" />

      <div className="container-x relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-md mb-4">
              <BookOpen className="size-3.5 text-primary" />
              <span>Thought Leadership & Engineering Hub</span>
            </div>
          </Reveal>

          <Reveal delay={100} direction="up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
              {titleOverride || headerTitle || (
                <>
                  Interactive Knowledge Hub & <span className="text-primary">Free Executive Guides</span>
                </>
              )}
            </h2>
          </Reveal>

          <Reveal delay={200} direction="up">
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-lg font-medium leading-relaxed">
              {headerSubtitle || "Actionable frameworks, financial formulas, and technical blueprints written by our senior architects to help forward-thinking teams make smarter digital decisions."}
            </p>
          </Reveal>
        </div>

        {/* 3 Resource Cards Grid */}
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {guides.map((guide, idx) => (
            <Reveal key={guide.id} delay={idx * 120} direction="up" className="h-full">
              <SpotlightCard className="h-full flex flex-col justify-between p-7 sm:p-8 bg-card border border-border/80 shadow-xl hover:border-primary/50 transition-all duration-300 rounded-3xl">
                <div>
                  {/* Top Header Badge */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/30 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-primary">
                      <Sparkles className="size-3" />
                      {guide.badge}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {guide.downloadsCount || "Free Download"}
                    </span>
                  </div>

                  {/* Document Cover Card Visual Preview */}
                  <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${guide.coverColor} p-6 text-white shadow-lg mb-6 group`}>
                    <div className="absolute top-3 right-3 rounded-full bg-black/40 px-3 py-1 text-[11px] font-bold tracking-wider uppercase text-white backdrop-blur-md">
                      {(guide.fileFormat || "PDF Guide")
                        .replace(/[•\-\|]\s*\d+\s*pages/gi, "")
                        .replace(/\d+\s*pages/gi, "")
                        .trim() || "PDF Guide"}
                    </div>
                    <div className="size-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-4">
                      <FileText className="size-5" />
                    </div>
                    <h4 className="text-xl font-extrabold text-white tracking-tight leading-snug">
                      {guide.title}
                    </h4>
                    <p className="text-xs text-white/85 mt-2 font-semibold tracking-wide">
                      Zenelait Executive Research Series
                    </p>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1 text-justify">
                    {guide.description}
                  </p>

                  {/* Key Takeaways Checklist */}
                  <div className="mt-6 space-y-2.5 border-t border-border/70 pt-5">
                    <h5 className="text-xs font-extrabold uppercase tracking-widest text-foreground flex items-center gap-2">
                      <FileCheck className="size-3.5 text-primary" />
                      <span>Executive Takeaways Inside</span>
                    </h5>
                    <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {guide.takeaways.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <Check className="size-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="mt-8 pt-5 border-t border-border/70">
                  <button
                    type="button"
                    onClick={() => handleOpenDownload(guide)}
                    className="button-shine w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary via-red-600 to-rose-600 px-6 py-4 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-primary/40 cursor-pointer"
                  >
                    <Download className="size-4" />
                    <span>Download Complete Guide (PDF)</span>
                  </button>
                  <p className="text-xs text-center text-muted-foreground mt-2.5 font-medium">
                    Instant Download • No Credit Card Required
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Download Modal / Lead Magnet Form */}
      {(() => {
        if (!selectedGuide) return null;
        const activeModalGuide =
          guides.find((g) => g.id === selectedGuide.id || g.title === selectedGuide.title) ||
          selectedGuide;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-lg rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-2xl overflow-hidden">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedGuide(null)}
                className="absolute top-5 right-5 size-8 rounded-full bg-surface flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>

              {!downloadSuccess ? (
                <>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/30 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-primary">
                      <FileText className="size-3.5" />
                      <span>Free Resource Download</span>
                    </span>
                    {activeModalGuide.pdfBase64 ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="size-3.5" />
                        <span>Admin Verified PDF</span>
                      </span>
                    ) : null}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
                    Get Instant Access to {activeModalGuide.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    File: <strong className="font-bold text-foreground break-all">{activeModalGuide.downloadFileName}</strong>.
                    Please provide your contact details below to begin your download immediately.
                  </p>

                  <form onSubmit={handleSubmitDownload} className="mt-6 space-y-4 text-xs sm:text-sm">
                    <div>
                      <label className="block text-xs font-bold tracking-tight text-foreground mb-1.5">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full rounded-xl border border-border bg-surface pl-10 pr-3.5 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-tight text-foreground mb-1.5">
                        Business Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@company.com"
                          className="w-full rounded-xl border border-border bg-surface pl-10 pr-3.5 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold tracking-tight text-foreground mb-1.5">
                          Company Name
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
                          <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Acme Inc."
                            className="w-full rounded-xl border border-border bg-surface pl-10 pr-3.5 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold tracking-tight text-foreground mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary font-medium"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="button-shine w-full mt-4 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary via-red-600 to-rose-600 px-6 py-4 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-primary/40 cursor-pointer disabled:opacity-50"
                    >
                      <Download className="size-4 shrink-0" />
                      <span>{isSubmitting ? "Initiating Download..." : "Download Free Guide (PDF)"}</span>
                    </button>

                    <p className="text-xs text-center text-muted-foreground mt-2.5 font-medium">
                      🔒 We respect your privacy. No spam. Unsubscribe anytime.
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-4 sm:py-6 space-y-4 max-w-md mx-auto">
                  <div className="size-14 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
                    Your Download Has Started!
                  </h3>
                  <div className="space-y-1.5 text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
                    <p>
                      Thank you, <strong className="text-foreground">{name}</strong>!
                    </p>
                    <div className="rounded-xl border border-border/70 bg-surface px-3.5 py-2 text-xs font-bold text-foreground break-all inline-block max-w-full">
                      📄 {activeModalGuide.downloadFileName}
                    </div>
                    <p className="text-xs text-muted-foreground pt-1">
                      The file has been saved to your downloads folder.
                    </p>
                  </div>
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full">
                    <button
                      type="button"
                      onClick={() => triggerDownload(activeModalGuide)}
                      className="button-shine w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primary via-red-600 to-rose-600 text-xs sm:text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 hover:shadow-primary/30 transition-all cursor-pointer min-w-0"
                    >
                      <Download className="size-3.5 shrink-0" />
                      <span>Download Again</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedGuide(null)}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-surface border border-border text-xs sm:text-sm font-bold text-foreground hover:bg-muted transition-colors cursor-pointer shrink-0"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </section>
  );
}
