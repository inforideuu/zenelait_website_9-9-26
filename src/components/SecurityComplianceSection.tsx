import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Lock,
  Activity,
  Code2,
  Headphones,
  Sparkles,
  Server,
  FileCheck,
  ArrowRight,
  Award,
  Fingerprint,
  KeyRound,
  Check,
  Cpu,
  Shield,
  Zap,
  Globe2,
  CheckCircle2
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

interface SecurityPillar {
  id: string;
  icon: typeof Lock;
  title: string;
  tagline: string;
  badge: string;
  gradientAccent: string;
  iconGradient: string;
  pillColor: string;
  statNumber: string;
  statLabel: string;
  description: string;
  highlights: string[];
  protocol: string;
  auditFirm: string;
}

const SECURITY_PILLARS: SecurityPillar[] = [
  {
    id: "encryption",
    icon: Lock,
    title: "End-to-End Cryptography & Data Sovereignty",
    tagline: "Cryptographic defense across storage, memory & network boundaries",
    badge: "SOC 2 Type II • HIPAA",
    gradientAccent: "from-rose-500/10 via-rose-50/50 to-transparent",
    iconGradient: "from-rose-500 to-rose-600 text-white shadow-rose-500/25",
    pillColor: "text-rose-700 bg-rose-50 border-rose-200/80",
    statNumber: "256-Bit",
    statLabel: "AES & TLS 1.3 Strict",
    description:
      "Military-grade 256-bit AES encryption at rest, TLS 1.3 in transit with Perfect Forward Secrecy (PFS), zero-trust RBAC policies, and strict tenant isolation preventing data leakage.",
    highlights: [
      "Zero-Trust Architecture & Ephemeral Session Keys",
      "Granular RBAC with Multi-Factor Auth (MFA)",
      "Automated PII Redaction & Data Masking Engine"
    ],
    protocol: "FIPS 140-3 COMPLIANT",
    auditFirm: "KPMG / BSI Audited"
  },
  {
    id: "redundancy",
    icon: Activity,
    title: "High-Availability Redundancy & 99.99% SLA",
    tagline: "Active-active multi-region cloud cluster with automated failover",
    badge: "Contractual SLA Guarantee",
    gradientAccent: "from-emerald-500/10 via-emerald-50/50 to-transparent",
    iconGradient: "from-emerald-500 to-emerald-600 text-white shadow-emerald-500/25",
    pillColor: "text-emerald-700 bg-emerald-50 border-emerald-200/80",
    statNumber: "99.99%",
    statLabel: "Contractual Uptime SLA",
    description:
      "Active-active multi-region cloud topology on AWS & GCP, sub-second failover orchestration, distributed Anycast DNS, and contractual financial credits backing 99.99% availability.",
    highlights: [
      "Sub-second Multi-Region Autonomous Failover",
      "Real-Time Telemetry & Prometheus Health Probes",
      "Financial Penalty-Backed SLA Contracts"
    ],
    protocol: "TIER-4 INFRASTRUCTURE",
    auditFirm: "AWS / GCP Validated"
  },
  {
    id: "qa-audit",
    icon: Code2,
    title: "Continuous Code Audits & Zero-Day QA Guardrails",
    tagline: "Automated static analysis, dynamic scanning & peer code review",
    badge: "OWASP Top-10 Certified",
    gradientAccent: "from-indigo-500/10 via-indigo-50/50 to-transparent",
    iconGradient: "from-indigo-500 to-indigo-600 text-white shadow-indigo-500/25",
    pillColor: "text-indigo-700 bg-indigo-50 border-indigo-200/80",
    statNumber: "0-Vuln",
    statLabel: "Pre-Release Policy",
    description:
      "Automated CI/CD security gating with SonarQube SAST, automated container vulnerability scanning with Trivy, and routine third-party penetration audits before every production release.",
    highlights: [
      "Automated SAST / DAST Pipeline Guardrails",
      "Third-Party Ethical Hacker Penetration Tests",
      "Immutable Audit Logs with SHA-256 Checksums"
    ],
    protocol: "ZERO CVE TOLERANCE",
    auditFirm: "SonarQube & Snyk Gated"
  },
  {
    id: "support",
    icon: Headphones,
    title: "24/7 War-Room Support & 15-Min Rapid Response",
    tagline: "Direct bridge to named principal architects and site reliability engineers",
    badge: "Dedicated L3 Architects",
    gradientAccent: "from-amber-500/10 via-amber-50/50 to-transparent",
    iconGradient: "from-amber-500 to-amber-600 text-white shadow-amber-500/25",
    pillColor: "text-amber-700 bg-amber-50 border-amber-200/80",
    statNumber: "< 15 Min",
    statLabel: "Emergency Incident MTTR",
    description:
      "Direct Slack/Teams war-room bridge to named senior DevOps and software architects, guaranteed sub-15-minute response on P1 blockers, and automated snapshot disaster recovery.",
    highlights: [
      "Named Principal Architect & Technical Account Mgr",
      "Automated Hourly Geo-Replicated Snapshots",
      "RTO < 30 Mins • RPO < 5 Mins Disaster Recovery"
    ],
    protocol: "P1 WAR-ROOM BRIDGE",
    auditFirm: "ITIL v4 Framework"
  }
];

const COMPLIANCE_BADGES = [
  { label: "SOC 2 Type II", sub: "Enterprise Certified", icon: Award },
  { label: "ISO 27001", sub: "Information Security", icon: ShieldCheck },
  { label: "GDPR & CCPA", sub: "Strict Privacy Ready", icon: Fingerprint },
  { label: "HIPAA Ready", sub: "ePHI Encrypted", icon: Lock },
  { label: "PCI-DSS v4.0", sub: "Level-1 Payment Sec", icon: KeyRound },
  { label: "OWASP Top-10", sub: "Penetration Audited", icon: FileCheck },
  { label: "Multi-Cloud Redundant", sub: "AWS • GCP • Azure", icon: Server },
  { label: "99.99% SLA", sub: "Contractually Backed", icon: Activity }
];

const METRICS_SHOWCASE = [
  {
    value: "99.99%",
    label: "Contractual High-Availability SLA",
    sub: "Backed by direct credit penalties in MSA",
    icon: Activity
  },
  {
    value: "< 15 Min",
    label: "Emergency Incident Response MTTR",
    sub: "Direct war-room bridge to principal architects",
    icon: Zap
  },
  {
    value: "256-Bit",
    label: "Military-Grade Cryptography",
    sub: "AES at rest • TLS 1.3 with PFS in transit",
    icon: Shield
  },
  {
    value: "100%",
    label: "Zero Critical Vulnerability Gate",
    sub: "Passed SonarQube & third-party ethical pentests",
    icon: CheckCircle2
  }
];

export function SecurityComplianceSection() {
  return (
    <section className="relative overflow-hidden bg-[#fafafa] py-24 lg:py-32 text-slate-900 border-t border-slate-200/80">
      {/* Precision Decorative Geometric Radial Overlays */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[800px] rounded-full bg-gradient-to-b from-rose-500/[0.04] via-primary/[0.02] to-transparent blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-10 size-[550px] rounded-full bg-emerald-500/[0.03] blur-[140px]" />
      <div className="pointer-events-none absolute top-1/3 left-0 size-[500px] rounded-full bg-indigo-500/[0.03] blur-[130px]" />

      {/* Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="container-x relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200/90 bg-white px-4 py-1.5 text-xs font-mono font-bold tracking-[0.2em] text-[#ff2a38] shadow-sm mb-5">
            <ShieldCheck className="size-4 text-[#ff2a38] animate-pulse" />
            <span>INSTITUTIONAL TRUST & INFRASTRUCTURE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
            Bank-Grade Security, Quality QA &{" "}
            <span className="text-[#ff2a38]">
              SLA Guarantees
            </span>
          </h2>

          <p className="mx-auto mt-5 text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
            Every digital asset engineered by Zenelait undergoes strict military-grade cryptography, zero-trust RBAC auditing, automated penetration testing, and contractual 99.99% high-availability SLAs.
          </p>

          {/* Quick Live Operational SLA Status Ticker */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 rounded-2xl border border-slate-200/90 bg-white shadow-md shadow-slate-100 px-6 py-3.5 text-xs">
            <span className="flex items-center gap-2 font-mono text-emerald-700 font-bold">
              <span className="relative flex size-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full size-2.5 bg-emerald-600"></span>
              </span>
              LIVE PRODUCTION STATUS: NORMAL
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="font-mono text-slate-600">
              Contractual Uptime: <strong className="text-slate-900 font-black">99.99% High Availability</strong>
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="font-mono text-slate-600">
              Response Guarantee: <strong className="text-slate-900 font-black">&lt; 15 Minutes P1</strong>
            </span>
          </div>
        </Reveal>

        {/* 4 Pillars Grid - Ultra Premium Architectural Cards */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          {SECURITY_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;

            return (
              <Reveal key={pillar.id} delay={idx * 100} direction="up" className="h-full">
                <div className="group relative h-full flex flex-col justify-between rounded-[2rem] border border-slate-200/90 bg-white p-8 sm:p-10 shadow-[0_10px_30px_rgba(15,23,42,0.05)] hover:shadow-[0_25px_60px_rgba(15,23,42,0.12)] hover:border-slate-300 transition-all duration-500 hover:-translate-y-1.5 overflow-hidden">
                  {/* Luxury Top Corner Accent Glow */}
                  <div
                    className={`pointer-events-none absolute -top-20 -right-20 size-60 rounded-full bg-gradient-to-br ${pillar.gradientAccent} blur-3xl group-hover:scale-125 transition-transform duration-700`}
                  />

                  {/* Card Content Top */}
                  <div className="relative z-10">
                    {/* Top Row: Floating Gradient Badge + KPI Pill */}
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className={`size-14 rounded-2xl bg-gradient-to-br ${pillar.iconGradient} shadow-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                        <Icon className="size-7 stroke-[2.2]" />
                      </div>

                      <div className="text-right">
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-mono font-bold tracking-wider uppercase shadow-xs ${pillar.pillColor}`}>
                          <Sparkles className="size-3" />
                          <span>{pillar.badge}</span>
                        </span>
                        <div className="mt-2 text-right">
                          <span className="text-xl sm:text-2xl font-black text-slate-900 block leading-none font-mono tracking-tight">
                            {pillar.statNumber}
                          </span>
                          <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wider">
                            {pillar.statLabel}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight group-hover:text-[#ff2a38] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-xs font-mono font-semibold text-slate-500">
                      {pillar.tagline}
                    </p>

                    {/* Full Description */}
                    <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {pillar.description}
                    </p>

                    {/* Engineering Guarantees Checklist */}
                    <div className="mt-6 pt-5 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-3 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                        <span>ENGINEERING GUARANTEES</span>
                        <span className="text-emerald-700 font-semibold">{pillar.auditFirm}</span>
                      </div>
                      <ul className="space-y-2.5">
                        {pillar.highlights.map((item, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                            <span className="size-4 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                              <Check className="size-2.5 stroke-[3]" />
                            </span>
                            <span className="font-semibold">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Bottom Footer: Institutional Status */}
                  <div className="relative z-10 mt-8 pt-5 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-600 flex items-center gap-2 font-bold">
                      <span className="size-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                      {pillar.protocol}
                    </span>
                    <span className="text-[#ff2a38] font-black uppercase tracking-wider flex items-center gap-1">
                      <span>CONTRACTUALLY BOUND</span>
                      <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* High-Impact Numerical SLA Metric Band */}
        <Reveal delay={150} direction="up" className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-6 sm:p-8 rounded-[2rem] border border-slate-200/90 bg-white shadow-xl shadow-slate-100">
            {METRICS_SHOWCASE.map((metric, mIdx) => {
              const MIcon = metric.icon;

              return (
                <div
                  key={mIdx}
                  className="p-5 sm:p-6 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-slate-200 hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="size-9 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-[#ff2a38] group-hover:bg-[#ff2a38] group-hover:text-white transition-colors">
                      <MIcon className="size-4" />
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      VERIFIED
                    </span>
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-slate-900">
                      {metric.value}
                    </div>
                    <div className="mt-1 text-xs font-bold text-slate-800 tracking-tight">
                      {metric.label}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                      {metric.sub}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Enterprise Compliance & Audit Fortress Banner */}
        <Reveal delay={200} direction="up" className="mt-12">
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/90 bg-white p-8 sm:p-12 shadow-xl shadow-slate-200/50">
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10 pb-8 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3.5 py-1 text-[11px] font-mono font-bold tracking-widest text-[#ff2a38] uppercase mb-3">
                  <Fingerprint className="size-3.5 text-[#ff2a38]" />
                  <span>REGULATORY COMPLIANCE SUITE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                  Audited & Certified for Institutional Deployment
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                  Zenelait's software architecture meets the most stringent third-party compliance frameworks required by enterprise institutions, fintech platforms, and healthcare networks.
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 via-[#ff2a38] to-rose-600 hover:from-red-700 hover:to-rose-700 px-7 py-4 text-xs font-bold text-white shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-[1.02] transition-all"
                >
                  <FileCheck className="size-4" />
                  <span>Request Security Whitepaper & NDA</span>
                </Link>
              </div>
            </div>

            {/* 8 Compliance Badges Grid */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
              {COMPLIANCE_BADGES.map((badge, bIdx) => {
                const BIcon = badge.icon;
                return (
                  <div
                    key={bIdx}
                    className="group flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 text-center transition-all duration-300 hover:border-rose-300 hover:bg-white hover:shadow-md hover:-translate-y-1"
                  >
                    <div className="size-10 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-[#ff2a38] mb-2.5 group-hover:scale-110 group-hover:text-white group-hover:bg-[#ff2a38] transition-all duration-300">
                      <BIcon className="size-5" />
                    </div>
                    <span className="text-xs font-black text-slate-900 block tracking-tight">
                      {badge.label}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 mt-0.5 line-clamp-1">
                      {badge.sub}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Bottom Security Guarantee Text */}
            <div className="relative z-10 mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-emerald-600" />
                <span>Custom Enterprise Master Services Agreements (MSA) and bilateral NDAs supported on request.</span>
              </span>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 font-bold text-[#ff2a38] hover:underline transition-all"
              >
                <span>View Full SLA Contract Terms</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
