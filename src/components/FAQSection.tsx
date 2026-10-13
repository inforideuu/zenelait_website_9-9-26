import { useState, useMemo, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { 
  Search, 
  HelpCircle, 
  IndianRupee, 
  ShieldCheck, 
  Clock, 
  Code2, 
  Headphones, 
  Sparkles, 
  ArrowRight,
  X,
  MessageSquare
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/Reveal";
import { SpotlightCard } from "@/components/SpotlightCard";

import { getPageSections } from "@/lib/api";

export type FAQCategory = "All" | "Pricing" | "Security" | "Timeline" | "Code Ownership" | "Support";

export interface FAQItem {
  id: string;
  category: "Pricing" | "Security" | "Timeline" | "Code Ownership" | "Support";
  question: string;
  answer: string;
  highlight?: string;
  popular?: boolean;
}

export const DEFAULT_FAQS: FAQItem[] = [
  // Pricing
  {
    id: "faq-pricing-1",
    category: "Pricing",
    question: "How are projects priced, and what engagement billing models do you offer?",
    answer: "We offer three transparent engagement models: Fixed-Price Milestones (best for well-defined scopes like websites, portals, or MVP builds), Dedicated Monthly Teams (for ongoing agile product engineering), and Time & Material (T&M for evolving enterprise roadmaps). Every quote has an itemized breakdown with zero hidden fees.",
    highlight: "Milestone-based, Dedicated Team, or T&M models.",
    popular: true,
  },
  {
    id: "faq-pricing-2",
    category: "Pricing",
    question: "Are there any recurring license costs or surprise server maintenance fees?",
    answer: "No hidden charges. For custom web/app builds and proprietary solutions, you never pay recurring software license fees to us. For SaaS products (CRM, ERP, LMS), we offer transparent flat monthly or annual plans. Cloud infrastructure costs (AWS, GCP, DigitalOcean) are billed directly to your corporate cloud account.",
    highlight: "Zero hidden vendor lock-in fees.",
  },
  {
    id: "faq-pricing-3",
    category: "Pricing",
    question: "Can we start with a Proof of Concept (PoC) or MVP before committing full budget?",
    answer: "Absolutely. Over 60% of our enterprise clients begin with a 2 to 4-week rapid Prototype or Minimum Viable Product (MVP). This lets your stakeholders validate architecture, user experience, and market fit before allocating large-scale capital.",
    highlight: "2 to 4-week rapid PoC / MVP options available.",
  },

  // Security
  {
    id: "faq-security-1",
    category: "Security",
    question: "How do you ensure enterprise-grade data security and compliance?",
    answer: "We enforce end-to-end industry security protocols including AES-256 data encryption at rest, TLS 1.3 in transit, role-based access control (RBAC), OWASP Top 10 vulnerability prevention, and isolated multi-tenant or single-tenant databases. For enterprise healthcare and finance, we follow HIPAA, GDPR, and ISO-standard best practices.",
    highlight: "AES-256 encryption, OWASP Top 10 mitigation, and RBAC.",
    popular: true,
  },
  {
    id: "faq-security-2",
    category: "Security",
    question: "Do you sign Non-Disclosure Agreements (NDA) before discussing proprietary ideas?",
    answer: "Yes, immediately. We sign a strict bilateral Non-Disclosure Agreement (NDA) and Intellectual Property Agreement prior to our very first architecture or strategy consultation. Your business data, algorithms, and market intelligence remain 100% confidential.",
    highlight: "Strict mutual NDA signed before initial discovery calls.",
  },
  {
    id: "faq-security-3",
    category: "Security",
    question: "Where will our data and databases be hosted?",
    answer: "You maintain total sovereign control over your hosting location. We deploy directly to your preferred cloud provider (AWS Mumbai/Global, Google Cloud, Microsoft Azure, or on-premises servers) configured strictly under your organization's security firewall.",
    highlight: "Deployed into your own sovereign cloud accounts.",
  },

  // Timeline
  {
    id: "faq-timeline-1",
    category: "Timeline",
    question: "What is the typical delivery timeline from kickoff to launch?",
    answer: "Timelines depend on project complexity: High-converting corporate web portals and marketing funnels launch in 2 to 4 weeks; Custom MVPs and focused CRM/Billing deployments take 4 to 8 weeks; Full-scale Enterprise ERPs or complex SaaS platforms usually take 10 to 16 weeks with bi-weekly sprint deliverables.",
    highlight: "2-4 weeks for web, 4-8 weeks for MVPs, 10-16 weeks for ERP.",
    popular: true,
  },
  {
    id: "faq-timeline-2",
    category: "Timeline",
    question: "How soon can a dedicated engineering team onboard and start development?",
    answer: "Our pre-vetted full-stack engineers, solution architects, and UI/UX designers can mobilize within 3 to 5 business days after statement of work (SOW) alignment. Kickoff meetings and sprint backlogs are scheduled immediately.",
    highlight: "Fast onboarding within 3 to 5 business days.",
  },
  {
    id: "faq-timeline-3",
    category: "Timeline",
    question: "How do we track progress during the sprint cycles?",
    answer: "We maintain total operational transparency via weekly demo calls, dedicated Slack/WhatsApp channels, and real-time sprint tracking on Jira/ClickUp. You also receive access to a staging environment updated continuously with automated CI/CD pipelines.",
    highlight: "Weekly live demos, staging sandbox, and sprint boards.",
  },

  // Code Ownership
  {
    id: "faq-ownership-1",
    category: "Code Ownership",
    question: "Do we retain 100% intellectual property (IP) and source code ownership?",
    answer: "Yes, unambiguously. Upon milestone completion and final settlement, 100% of the proprietary source code, database architectures, UI/UX design Figma files, Docker containers, and documentation belong exclusively to your company. You are never locked into our agency.",
    highlight: "100% complete IP & source code handover on day one.",
    popular: true,
  },
  {
    id: "faq-ownership-2",
    category: "Code Ownership",
    question: "What technologies and frameworks do you build with?",
    answer: "We engineer with modern, maintainable stacks that your in-house team can easily scale: React, Next.js, TypeScript, Tailwind CSS, Node.js, Python/FastAPI, Go, PostgreSQL, Redis, Docker, and Kubernetes. We strictly avoid obsolete proprietary black-box code.",
    highlight: "Clean modern stacks: React, Node, Python, Docker & Postgres.",
  },
  {
    id: "faq-ownership-3",
    category: "Code Ownership",
    question: "Do you provide comprehensive architectural documentation for internal handover?",
    answer: "Yes. Every delivery package includes clean Git repository history, Swagger/Postman API documentation, ER diagrams, deployment manuals, and environment variable configuration checklists for seamless transition.",
    highlight: "Includes API documentation, ER schemas & deployment guides.",
  },

  // Support
  {
    id: "faq-support-1",
    category: "Support",
    question: "What post-launch support and SLA warranty do you offer?",
    answer: "Every custom build includes 30 to 90 days of complimentary bug-fix and warranty support post-deployment. Afterward, we offer flexible SLA maintenance retainers covering 24/7 uptime monitoring, security patching, cloud optimization, and new feature sprints.",
    highlight: "Complimentary 30-90 days warranty + 24/7 SLA retainers.",
    popular: true,
  },
  {
    id: "faq-support-2",
    category: "Support",
    question: "How do you handle critical emergencies or server downtime?",
    answer: "Our enterprise maintenance retainers include dedicated Incident Response SLAs (under 30 minutes for P1 critical issues). Automated health alerts notify our on-call DevOps engineers immediately if uptime drops or error spikes occur.",
    highlight: "Under 30-minute P1 emergency incident response time.",
  },
  {
    id: "faq-support-3",
    category: "Support",
    question: "Can Zenelait train our internal staff to administer the new software?",
    answer: "Yes. We conduct hands-on video training walkthroughs, provide recorded administrator screencasts, and create user-friendly SOP manuals tailored for your operations, sales, and management personnel.",
    highlight: "Live video training sessions & custom admin SOP videos.",
  },
];

const categoryIcons: Record<Exclude<FAQCategory, "All">, React.ComponentType<{ className?: string }>> = {
  Pricing: IndianRupee,
  Security: ShieldCheck,
  Timeline: Clock,
  "Code Ownership": Code2,
  Support: Headphones,
};

const categoryDescriptions: Record<FAQCategory, string> = {
  All: "Explore all frequently asked questions across budgets, security, engineering, and maintenance.",
  Pricing: "Clear models, milestone structures, transparent estimates, and zero hidden costs.",
  Security: "Enterprise encryption, cloud compliance, NDAs, and data sovereignty safeguards.",
  Timeline: "Sprint paces, prototype milestones, sprint visibility, and go-live schedules.",
  "Code Ownership": "Complete IP rights transfer, modern open tech stacks, and Git repo handover.",
  Support: "Post-launch warranty, 24/7 uptime monitoring, SLA guarantees, and team training.",
};

interface FAQSectionProps {
  className?: string;
  defaultCategory?: FAQCategory;
  showContactCta?: boolean;
}

export function FAQSection({
  className = "",
  defaultCategory = "All",
  showContactCta = true,
}: FAQSectionProps) {
  const [faqs, setFaqs] = useState<FAQItem[]>(DEFAULT_FAQS);
  const [badgeText, setBadgeText] = useState<string>("Transparent Answers & Advisory");
  const [headerTitle, setHeaderTitle] = useState<string>("Frequently Asked Questions");
  const [headerSubtitle, setHeaderSubtitle] = useState<string>(
    "Find immediate answers about pricing transparency, security benchmarks, delivery timelines, code IP ownership, and post-launch SLAs."
  );

  const [selectedCategory, setSelectedCategory] = useState<FAQCategory>(defaultCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeAccordion, setActiveAccordion] = useState<string>("faq-pricing-1");

  // Sync with live backend 'home_faqs' section
  const fetchLiveFaqs = () => {
    getPageSections()
      .then((sections) => {
        const faqSec = sections.find((s) => s.section_key === "home_faqs");
        if (faqSec) {
          if (faqSec.title) setHeaderTitle(faqSec.title);
          if (faqSec.subtitle) setBadgeText(faqSec.subtitle);
          if (faqSec.body) setHeaderSubtitle(faqSec.body);
          try {
            const rawJson =
              typeof faqSec.extra_json === "string"
                ? JSON.parse(faqSec.extra_json)
                : faqSec.extra_json;
            if (Array.isArray(rawJson?.faqs) && rawJson.faqs.length > 0) {
              setFaqs(rawJson.faqs);
            }
          } catch (e) {
            console.error("Error parsing dynamic FAQs extra_json:", e);
          }
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchLiveFaqs();
    window.addEventListener("focus", fetchLiveFaqs);
    return () => window.removeEventListener("focus", fetchLiveFaqs);
  }, []);

  const categories: FAQCategory[] = [
    "All",
    "Pricing",
    "Security",
    "Timeline",
    "Code Ownership",
    "Support",
  ];

  const filteredFAQs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return faqs.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!query) return true;

      const inQuestion = item.question.toLowerCase().includes(query);
      const inAnswer = item.answer.toLowerCase().includes(query);
      const inCategory = item.category.toLowerCase().includes(query);
      const inHighlight = item.highlight?.toLowerCase().includes(query);

      return inQuestion || inAnswer || inCategory || inHighlight;
    });
  }, [faqs, selectedCategory, searchQuery]);

  // Category counts
  const counts = useMemo(() => {
    const map: Record<string, number> = { All: faqs.length };
    faqs.forEach((item) => {
      map[item.category] = (map[item.category] || 0) + 1;
    });
    return map;
  }, [faqs]);

  return (
    <section className={`relative overflow-hidden py-16 lg:py-24 ${className}`} id="faq-section">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 size-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-10 size-80 rounded-full bg-rose-500/10 blur-3xl" />

      <div className="container-x relative z-10">
        {/* Header Block */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <HelpCircle className="size-3.5" />
              <span>{badgeText}</span>
            </div>
          </Reveal>

          <Reveal delay={100} direction="up">
            <h2 className="mt-4 text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {headerTitle.includes("Questions") ? (
                <>
                  {headerTitle.replace("Questions", "")} <span className="text-primary">Questions</span>
                </>
              ) : (
                headerTitle
              )}
            </h2>
          </Reveal>

          <Reveal delay={200} direction="up">
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {headerSubtitle}
            </p>
          </Reveal>
        </div>

        {/* Live Search & Filter Bar */}
        <Reveal delay={250} direction="up" className="mx-auto mt-10 max-w-4xl">
          <div className="relative rounded-2xl border border-border bg-card/80 p-3 shadow-lg backdrop-blur-md sm:p-4">
            <div className="relative flex items-center">
              <Search className="pointer-events-none absolute left-4 size-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any question, keyword (e.g., NDA, milestone, SLA, React, HIPAA)..."
                className="w-full rounded-xl border border-border/80 bg-background/90 py-3.5 pl-12 pr-10 text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                aria-label="Search FAQs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 border-t border-border/60">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                const Icon = cat !== "All" ? categoryIcons[cat] : HelpCircle;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-[1.02]"
                        : "bg-surface hover:bg-accent text-muted-foreground hover:text-foreground border border-border/70"
                    }`}
                  >
                    <Icon className="size-3.5 shrink-0" />
                    <span>{cat}</span>
                    <span
                      className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {counts[cat] || 0}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Current Category Note */}
        <div className="mx-auto mt-6 max-w-4xl px-2 flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
          <p>
            Showing <strong className="text-foreground">{filteredFAQs.length}</strong> {filteredFAQs.length === 1 ? "answer" : "answers"} in{" "}
            <span className="font-semibold text-primary">{selectedCategory}</span>
            {searchQuery && <span> matching "{searchQuery}"</span>}
          </p>
          <span className="hidden sm:inline-block">
            {categoryDescriptions[selectedCategory]}
          </span>
        </div>

        {/* FAQ Accordion List */}
        <div className="mx-auto mt-6 max-w-4xl">
          {filteredFAQs.length === 0 ? (
            <SpotlightCard className="p-10 text-center bg-card border border-border/80">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <HelpCircle className="size-7" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground">No matching questions found</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                We couldn't find an answer matching "{searchQuery}". Try a different keyword or reach out directly to our engineering advisors.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="rounded-lg border border-border px-4 py-2 text-xs font-bold text-foreground hover:bg-accent transition-colors"
                >
                  Reset Filters
                </button>
                <Link
                  to="/contact"
                  className="button-shine rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-sm hover:scale-105 transition-all"
                >
                  Ask Our Team Directly ➔
                </Link>
              </div>
            </SpotlightCard>
          ) : (
            <Accordion
              type="single"
              collapsible
              value={activeAccordion}
              onValueChange={setActiveAccordion}
              className="space-y-3"
            >
              {filteredFAQs.map((item, index) => {
                const Icon = categoryIcons[item.category] || HelpCircle;
                return (
                  <Reveal key={item.id} delay={Math.min(index * 40, 200)} direction="up">
                    <AccordionItem
                      value={item.id}
                      className="group overflow-hidden rounded-2xl border border-border/80 bg-card/70 px-5 transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-md data-[state=open]:border-primary/60 data-[state=open]:bg-card data-[state=open]:shadow-lg"
                    >
                      <AccordionTrigger className="py-5 text-left text-base sm:text-lg font-bold text-foreground hover:text-primary transition-colors hover:no-underline">
                        <div className="flex items-start sm:items-center gap-3 pr-4">
                          <div className="mt-0.5 sm:mt-0 flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-data-[state=open]:bg-primary group-data-[state=open]:text-white transition-colors">
                            <Icon className="size-4" />
                          </div>
                          <div className="flex-1">
                            <span className="leading-snug">{item.question}</span>
                            <div className="mt-1 flex flex-wrap items-center gap-2">
                              <span className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground/80">
                                {item.category}
                              </span>
                              {item.popular && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-500">
                                  <Sparkles className="size-2.5" />
                                  Popular
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-5 pt-1 text-sm sm:text-base text-muted-foreground leading-relaxed">
                        <div className="border-t border-border/50 pt-3.5 space-y-3">
                          <p>{item.answer}</p>
                          {item.highlight && (
                            <div className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary border border-primary/20">
                              <Sparkles className="size-3.5 shrink-0" />
                              <span>Takeaway: {item.highlight}</span>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Reveal>
                );
              })}
            </Accordion>
          )}
        </div>

        {/* Footer Support Callout */}
        {showContactCta && (
          <Reveal delay={300} direction="up" className="mx-auto mt-14 max-w-4xl">
            <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-r from-card via-accent/40 to-card p-6 sm:p-8 shadow-lg">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4 text-center sm:text-left">
                  <div className="hidden sm:flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-rose-600 text-white shadow-md">
                    <MessageSquare className="size-7" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">
                      Have a specific question about your project?
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-md">
                      Speak directly with our senior technology consultants. We provide clear architecture guidance within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="flex w-full sm:w-auto shrink-0 flex-col sm:flex-row items-center gap-3">
                  <Link
                    to="/contact"
                    className="button-shine w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary via-red-600 to-rose-600 px-6 py-3 text-sm font-bold text-primary-foreground shadow-md transition-all duration-300 hover:scale-[1.03]"
                  >
                    <span>Talk to an Expert</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
