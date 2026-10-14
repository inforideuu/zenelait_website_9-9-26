import { Check, X, Sparkles, Shield, Zap, Users, Code, Clock, Award, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

interface ComparisonRow {
  feature: string;
  category: string;
  description: string;
  zenelait: {
    status: "yes" | "no" | "partial";
    label: string;
    sublabel?: string;
  };
  traditionalAgencies: {
    status: "yes" | "no" | "partial";
    label: string;
    sublabel?: string;
  };
  freelancers: {
    status: "yes" | "no" | "partial";
    label: string;
    sublabel?: string;
  };
  inHouse: {
    status: "yes" | "no" | "partial";
    label: string;
    sublabel?: string;
  };
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    feature: "Delivery Speed",
    category: "Execution",
    description: "Rapid turnaround from sprint kickoff to production deployment.",
    zenelait: {
      status: "yes",
      label: "2–4 Weeks to Launch",
      sublabel: "Pre-assembled agile squads & battle-tested boilerplates",
    },
    traditionalAgencies: {
      status: "partial",
      label: "3–6 Months",
      sublabel: "Heavy bureaucracy, endless scopings & waterfall delays",
    },
    freelancers: {
      status: "partial",
      label: "Unpredictable",
      sublabel: "Subject to ghosting, part-time bandwidth & sudden delays",
    },
    inHouse: {
      status: "no",
      label: "4–8 Months",
      sublabel: "60+ days hiring cycle before writing a single line of code",
    },
  },
  {
    feature: "Dedicated Technical PM",
    category: "Management",
    description: "Accountable engineering lead driving sprint roadmaps and daily oversight.",
    zenelait: {
      status: "yes",
      label: "Dedicated Lead PM",
      sublabel: "Direct Slack/WhatsApp channel + bi-weekly sprint demos",
    },
    traditionalAgencies: {
      status: "partial",
      label: "Account Executive Only",
      sublabel: "Non-technical sales middleman relays messages to devs",
    },
    freelancers: {
      status: "no",
      label: "None (Self-Managed)",
      sublabel: "You spend 15+ hours/week micromanaging tasks yourself",
    },
    inHouse: {
      status: "partial",
      label: "Requires Extra Hire",
      sublabel: "Need to budget another ₹15L–₹25L/year for a dedicated PM",
    },
  },
  {
    feature: "100% Code & IP Ownership",
    category: "Ownership",
    description: "Unconditional intellectual property, Git repositories, and architecture rights.",
    zenelait: {
      status: "yes",
      label: "100% Yours on Day 1",
      sublabel: "Full Git history, Docker configs & zero proprietary lock-in",
    },
    traditionalAgencies: {
      status: "partial",
      label: "Vendor Lock-in Common",
      sublabel: "Proprietary CMS black boxes, recurring software licensing fees",
    },
    freelancers: {
      status: "partial",
      label: "Risky IP Gaps",
      sublabel: "Often incomplete handover, missing credentials or copied code",
    },
    inHouse: {
      status: "yes",
      label: "100% Owned",
      sublabel: "Owned by company, but risk of single-developer knowledge silos",
    },
  },
  {
    feature: "Enterprise Security & Compliance",
    category: "Governance",
    description: "Multi-layered data protection, OWASP Top 10 hardening, and compliance readiness.",
    zenelait: {
      status: "yes",
      label: "SOC2 & GDPR-Ready Standards",
      sublabel: "Automated CI/CD security scanning, encrypted vaults & clean data pipelines",
    },
    traditionalAgencies: {
      status: "no",
      label: "Afterthought Add-On",
      sublabel: "Basic SSL only; rigorous pen-testing charged as expensive extra audit",
    },
    freelancers: {
      status: "no",
      label: "High Vulnerability Risk",
      sublabel: "Zero security audits, unpatched dependencies & hardcoded credentials",
    },
    inHouse: {
      status: "partial",
      label: "Requires Specialized SecOps",
      sublabel: "Often overlooked unless hiring a dedicated high-salary Infosec engineer",
    },
  },
  {
    feature: "Scalability & Elastic Squads",
    category: "Flexibility",
    description: "Ramp team capacity up or down to align with business cycles.",
    zenelait: {
      status: "yes",
      label: "Elastic On-Demand Scale",
      sublabel: "Instantly add frontend, backend, AI, or growth specialists in 48h",
    },
    traditionalAgencies: {
      status: "partial",
      label: "Rigid Long Contracts",
      sublabel: "6–12 month minimum lock-ins with cumbersome renegotiation",
    },
    freelancers: {
      status: "no",
      label: "Solo Bandwidth Cap",
      sublabel: "Single person cannot juggle design, frontend, backend & QA",
    },
    inHouse: {
      status: "no",
      label: "Extremely Inflexible",
      sublabel: "Painful, slow and legally complex to downsize or re-skill",
    },
  },
];

export function CompetitorComparisonMatrix() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-background border-t border-border/80" id="comparison-matrix">
      {/* Background Ambience Gradients */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-primary/10 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 right-10 size-[500px] rounded-full bg-rose-500/10 blur-[120px]" />

      <div className="container-x relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-sm mb-4">
              <Award className="size-3.5 text-primary" />
              <span>Unbiased Agency Comparison</span>
            </div>
          </Reveal>

          <Reveal delay={100} direction="up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
              Why Forward-Thinking Leaders Choose <span className="text-primary">Zenelait InfoTech</span>
            </h2>
          </Reveal>

          <Reveal delay={200} direction="up">
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-lg font-medium leading-relaxed">
              Compare how our integrated engineering model outperforms traditional legacy agencies, unreliable freelance gig boards, and high-risk in-house hiring.
            </p>
          </Reveal>
        </div>

        {/* Comparison Matrix Table */}
        <Reveal delay={250} direction="up" className="mt-14">
          {/* Mobile Swipe Hint */}
          <div className="flex items-center justify-end mb-3 px-1 lg:hidden">
            <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 bg-surface/80 border border-border/60 px-3 py-1 rounded-full shadow-sm">
              <span>⇄ Swipe horizontally to explore full matrix</span>
            </span>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-border bg-card shadow-2xl backdrop-blur-md">
            <table className="w-full text-left border-collapse min-w-[860px]">
              {/* Header Columns */}
              <thead>
                <tr className="border-b border-border/80 bg-surface/50">
                  <th className="p-6 w-[28%] text-xs font-extrabold uppercase tracking-widest text-muted-foreground align-top">
                    Core Capability
                  </th>

                  {/* Zenelait Highlight Column Header */}
                  <th className="p-6 w-[28%] relative bg-gradient-to-b from-primary/15 via-primary/5 to-transparent border-x border-primary/30 shadow-md align-top">
                    <div className="mb-2.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-rose-600 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-md">
                        <Sparkles className="size-3" />
                        Superior Choice
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-base sm:text-lg font-black tracking-tight text-foreground">Zenelait InfoTech</span>
                    </div>
                    <p className="text-xs font-semibold text-primary mt-0.5 leading-snug">
                      Dedicated Product Squad & Growth
                    </p>
                  </th>

                  <th className="p-6 w-[15%] text-xs font-extrabold uppercase tracking-wider text-muted-foreground border-r border-border/60 align-top">
                    Traditional Agencies
                  </th>

                  <th className="p-6 w-[14%] text-xs font-extrabold uppercase tracking-wider text-muted-foreground border-r border-border/60 align-top">
                    Freelance Platforms
                  </th>

                  <th className="p-6 w-[15%] text-xs font-extrabold uppercase tracking-wider text-muted-foreground align-top">
                    In-House Hiring
                  </th>
                </tr>
              </thead>

              {/* Table Body Rows */}
              <tbody className="divide-y divide-border/60 text-xs sm:text-sm">
                {COMPARISON_DATA.map((row, idx) => (
                  <tr
                    key={row.feature}
                    className="group transition-colors hover:bg-surface/40"
                  >
                    {/* Feature Title & Description */}
                    <td className="p-6 align-top">
                      <span className="text-xs font-extrabold uppercase tracking-widest text-primary block mb-1.5">
                        {row.category}
                      </span>
                      <h4 className="text-sm sm:text-base font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {row.feature}
                      </h4>
                      <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {row.description}
                      </p>
                    </td>

                    {/* Zenelait Featured Column */}
                    <td className="p-6 align-top bg-primary/5 border-x border-primary/30 relative">
                      <div className="flex items-start gap-2.5">
                        <div className="size-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-primary/40">
                          <Check className="size-3 stroke-[3]" />
                        </div>
                        <div>
                          <strong className="block font-extrabold tracking-tight text-foreground text-sm sm:text-base">
                            {row.zenelait.label}
                          </strong>
                          {row.zenelait.sublabel && (
                            <p className="mt-1 text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
                              {row.zenelait.sublabel}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Traditional Agencies */}
                    <td className="p-6 align-top border-r border-border/60">
                      <div className="flex items-start gap-2">
                        {row.traditionalAgencies.status === "yes" ? (
                          <div className="size-4 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="size-3 stroke-[3]" />
                          </div>
                        ) : row.traditionalAgencies.status === "partial" ? (
                          <span className="size-4 rounded-full bg-amber-500/15 text-amber-500 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                            ~
                          </span>
                        ) : (
                          <div className="size-4 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                            <X className="size-3 stroke-[3]" />
                          </div>
                        )}
                        <div>
                          <span className="font-bold text-foreground block text-xs tracking-tight">
                            {row.traditionalAgencies.label}
                          </span>
                          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                            {row.traditionalAgencies.sublabel}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Freelancers */}
                    <td className="p-6 align-top border-r border-border/60">
                      <div className="flex items-start gap-2">
                        {row.freelancers.status === "yes" ? (
                          <div className="size-4 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="size-3 stroke-[3]" />
                          </div>
                        ) : row.freelancers.status === "partial" ? (
                          <span className="size-4 rounded-full bg-amber-500/15 text-amber-500 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                            ~
                          </span>
                        ) : (
                          <div className="size-4 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                            <X className="size-3 stroke-[3]" />
                          </div>
                        )}
                        <div>
                          <span className="font-bold text-foreground block text-xs tracking-tight">
                            {row.freelancers.label}
                          </span>
                          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                            {row.freelancers.sublabel}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* In-House Hiring */}
                    <td className="p-6 align-top">
                      <div className="flex items-start gap-2">
                        {row.inHouse.status === "yes" ? (
                          <div className="size-4 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="size-3 stroke-[3]" />
                          </div>
                        ) : row.inHouse.status === "partial" ? (
                          <span className="size-4 rounded-full bg-amber-500/15 text-amber-500 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                            ~
                          </span>
                        ) : (
                          <div className="size-4 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                            <X className="size-3 stroke-[3]" />
                          </div>
                        )}
                        <div>
                          <span className="font-bold text-foreground block text-xs tracking-tight">
                            {row.inHouse.label}
                          </span>
                          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                            {row.inHouse.sublabel}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Bottom Proof Metric Summary Bar */}
        <Reveal delay={300} direction="up" className="mt-12">
          <div className="overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-r from-card via-primary/5 to-card p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left flex-1 min-w-0">
              <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 shadow-sm">
                <Shield className="size-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-foreground">
                  Zero Lock-in. Transparent Timelines. Full IP Transfer.
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Experience enterprise engineering velocity without agency bureaucracy or hiring overhead.
                </p>
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-auto flex justify-center lg:justify-end">
              <Link
                to="/contact"
                className="button-shine w-full sm:w-auto max-w-xs sm:max-w-none inline-flex items-center justify-center whitespace-nowrap gap-2.5 rounded-xl bg-gradient-to-r from-primary via-red-600 to-rose-600 px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-primary/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/30 active:translate-y-0"
              >
                <span>Partner with Zenelait InfoTech</span>
                <ArrowRight className="size-4 shrink-0" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
