import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Layers,
  X,
  ExternalLink,
  TrendingUp,
  BarChart3,
  Headphones,
  Users,
  Sliders,
  ShieldCheck,
  DollarSign,
  Headset,
  Search,
  Quote,
  ChevronLeft,
  ChevronRight,
  Bot,
  CreditCard,
  GraduationCap,
  Globe,
  Zap,
  Star,
  UserCheck,
  CheckCircle2,
  Activity,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { getTestimonials } from "@/lib/api";
import { TestimonialSection } from "@/components/TestimonialSection";
import { itProducts, Product } from "@/data/products";

const title = "IT Products — CRM, ERP, LMS, Billing, Web & AI | Zenelait Infotech";
const description =
  "Explore Zenelait Infotech IT products: CRM, ERP, Learning Management System, billing software, website development and AI chatbots built for growing businesses.";

export const Route = createFileRoute("/it-products")({
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
  component: ItProducts,
});

// Comprehensive Product detail data for all 6 IT products matching the reference image layout
type ProductDetail = {
  id: string;
  name: string;
  short: string;
  tag: string;
  headline: string;
  subtext: string;
  heroBgImage?: string;
  featureDashboardImage?: string;
  heroPills: { icon: any; label: string }[];
  features: { icon: any; title: string; desc: string }[];
  benefits: { icon: any; title: string; desc: string }[];
  testimonial: { quote: string; name: string; role: string; company: string; avatar: string };
  stats: { conversionRate: string; revenue: string; totalLeads: string; dealsWon: string };
  activityTimeline: { title: string; time: string }[];
  mockupUser: { name: string; email: string; phone: string; location: string };
};

const productDetailsData: Record<string, ProductDetail> = {
  crm: {
    id: "crm",
    name: "Customer Relationship Management",
    short: "CRM",
    tag: "Sales & Customer Management",
    headline: "Build stronger relationships. Drive more sales.",
    subtext:
      "Zenelait's CRM helps you manage customer interactions, track leads, automate workflows, and get real-time insights — all in one powerful platform.",
    heroBgImage: "IT_product_detail.png",
    featureDashboardImage: "crm_dash.jpg",
    heroPills: [
      { icon: Users, label: "Lead Management" },
      { icon: TrendingUp, label: "Sales Automation" },
      { icon: Headphones, label: "Customer Support" },
      { icon: BarChart3, label: "Real-Time Analytics" },
    ],
    features: [
      { icon: TrendingUp, title: "Lead Management", desc: "Capture, track and nurture leads from multiple channels." },
      { icon: BarChart3, title: "Sales Automation", desc: "Automate follow-ups, pipeline and sales workflows." },
      { icon: Headphones, title: "Customer Support", desc: "Provide faster, better support with a unified view." },
      { icon: Users, title: "Contact Management", desc: "Keep all customer information in one place." },
      { icon: TrendingUp, title: "Pipeline Tracking", desc: "Visualize deals and move faster to close." },
      { icon: BarChart3, title: "Real-Time Analytics", desc: "Make data-driven decisions with live insights." },
    ],
    benefits: [
      { icon: Sliders, title: "Customizable to your needs", desc: "Tailor fields, pipelines, and workflows without coding." },
      { icon: ShieldCheck, title: "Secure & reliable", desc: "Bank-grade encryption, role access, and 99.99% uptime." },
      { icon: Headset, title: "Expert support & training", desc: "Dedicated onboarding and 24/7 technical support." },
      { icon: TrendingUp, title: "Scalable for future growth", desc: "Built on elastic cloud infrastructure for high scale." },
      { icon: Layers, title: "Seamless integrations", desc: "Connects with WhatsApp, Gmail, Outlook, and ERPs." },
      { icon: DollarSign, title: "Affordable & transparent pricing", desc: "Clear pricing with zero hidden fees or setup penalties." },
    ],
    testimonial: {
      quote:
        "Zenelait CRM has completely transformed the way we manage our leads and customer relationships. The platform is intuitive, powerful and our sales team loves it.",
      name: "Emma Carter",
      role: "Marketing Manager, TechSolutions",
      company: "TechSolutions",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
    },
    stats: { conversionRate: "27.4%", revenue: "$248,900", totalLeads: "1,248", dealsWon: "342" },
    mockupUser: { name: "Sarah Johnson", email: "sarah@company.com", phone: "+1 234 567 8900", location: "New York, USA" },
    activityTimeline: [
      { title: "Email opened", time: "2 hours ago" },
      { title: "Website visit", time: "4 hours ago" },
      { title: "Meeting scheduled", time: "1 day ago" },
      { title: "Deal created", time: "2 days ago" },
    ],
  },

  erp: {
    id: "erp",
    name: "Enterprise Resource Planning",
    short: "ERP",
    tag: "Enterprise System & Operations",
    headline: "Unify your operations. Optimize every asset.",
    subtext:
      "Zenelait's ERP connects your inventory, purchase, production, finance, and workforce into one connected system for growing enterprises.",
    heroBgImage: "IT_product_detail.png",
    featureDashboardImage: "erp dash.jpg",
    heroPills: [
      { icon: Layers, label: "Inventory Control" },
      { icon: BarChart3, label: "Multi-Warehouse" },
      { icon: ShieldCheck, label: "Financial Compliance" },
      { icon: Sliders, label: "Production Planning" },
    ],
    features: [
      { icon: Layers, title: "Smart Inventory Control", desc: "Real-time stock tracking, automatic reorders and batch control." },
      { icon: BarChart3, title: "Multi-Warehouse Sync", desc: "Multi-branch transfers and centralized stock auditing." },
      { icon: Sliders, title: "Production & BOM", desc: "Bill of materials, job work tracking, and shop floor scheduling." },
      { icon: DollarSign, title: "Financial Accounting", desc: "General ledger, GST filings, payables, and receivables." },
      { icon: TrendingUp, title: "Procurement & POs", desc: "Automated requisitions, vendor quotes, and PO workflows." },
      { icon: Users, title: "Workforce & Payroll", desc: "Attendance tracking, automated payroll slips, and compliance." },
    ],
    benefits: [
      { icon: Sliders, title: "Customizable workflows", desc: "Tailored approval hierarchies for your operation." },
      { icon: ShieldCheck, title: "Enterprise security", desc: "SOC-2 compliance, daily backups, and data encryption." },
      { icon: Headset, title: "Dedicated implementation", desc: "On-site setup, data migration, and team training." },
      { icon: TrendingUp, title: "High availability", desc: "Zero-downtime architecture built for volume." },
      { icon: Layers, title: "Banking & GST API", desc: "Direct integration with corporate banking and GST portals." },
      { icon: DollarSign, title: "Predictable ROI", desc: "Reduces inventory holding costs by up to 35%." },
    ],
    testimonial: {
      quote:
        "Switching to Zenelait ERP gave us 100% visibility over our multi-branch inventory and supplier chain. Delivery times dropped by 40% in our first quarter.",
      name: "Rajesh Kumar",
      role: "Operations Director, Apex Industries",
      company: "Apex Industries",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    },
    stats: { conversionRate: "34.2%", revenue: "$1,480,000", totalLeads: "4,520", dealsWon: "890" },
    mockupUser: { name: "David Chen", email: "david@apex.com", phone: "+1 415 889 2030", location: "San Francisco, USA" },
    activityTimeline: [
      { title: "PO #4028 Approved", time: "1 hour ago" },
      { title: "Stock Transferred to WH-2", time: "3 hours ago" },
      { title: "GSTR-3B Generated", time: "1 day ago" },
      { title: "Audit Batch Passed", time: "2 days ago" },
    ],
  },

  lms: {
    id: "lms",
    name: "Learning Management System",
    short: "LMS",
    tag: "Learning Platform & Education",
    headline: "Empower learners. Scale knowledge delivery.",
    subtext:
      "Deliver courses, conduct assessments, issue certificates, and track learner progress with an interactive LMS built for institutions and training teams.",
    heroBgImage: "IT_product_detail.png",
    featureDashboardImage: "lms dash.png",
    heroPills: [
      { icon: GraduationCap, label: "Course Authoring" },
      { icon: Sliders, label: "Interactive Quizzes" },
      { icon: ShieldCheck, label: "Automated Certificates" },
      { icon: BarChart3, label: "Progress Analytics" },
    ],
    features: [
      { icon: GraduationCap, title: "Course Studio", desc: "Drag-and-drop course builder for video, PDF, and live classes." },
      { icon: Users, title: "Batch & Enrollment", desc: "Multi-tenant batch management and student portals." },
      { icon: Sliders, title: "Assessments & Exams", desc: "Automated quizzes, timed online exams, and instant grading." },
      { icon: ShieldCheck, title: "Automated Certificates", desc: "Custom branded certificate generation upon completion." },
      { icon: BarChart3, title: "Learner Analytics", desc: "Watch time tracking, quiz breakdowns, and drop-off reports." },
      { icon: Headphones, title: "Discussion & Forums", desc: "Interactive student Q&A threads and instructor forums." },
    ],
    benefits: [
      { icon: Sliders, title: "Branded Mobile Apps", desc: "White-label iOS and Android apps for mobile learning." },
      { icon: ShieldCheck, title: "DRM Video Protection", desc: "Encrypted video streaming preventing unauthorized downloads." },
      { icon: Headset, title: "Instructor Portal", desc: "Multi-instructor payout management and course analytics." },
      { icon: TrendingUp, title: "Scalable Infrastructure", desc: "Stream to thousands of concurrent learners seamlessly." },
      { icon: Layers, title: "Payment Gateways", desc: "Integrated Razorpay, Stripe, and PayPal for course sales." },
      { icon: DollarSign, title: "Gamification Rewards", desc: "Badges, leaderboards, and streak rewards for engagement." },
    ],
    testimonial: {
      quote:
        "Zenelait LMS allowed us to onboard 5,000+ corporate students across 12 countries with 98% course completion rates. The interface is flawless.",
      name: "Sophia Martinez",
      role: "Head of L&D, Global EduTech",
      company: "Global EduTech",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80",
    },
    stats: { conversionRate: "98.2%", revenue: "$620,000", totalLeads: "8,900", dealsWon: "5,400" },
    mockupUser: { name: "Alex Morgan", email: "alex@edu.org", phone: "+44 20 7946 0912", location: "London, UK" },
    activityTimeline: [
      { title: "Course Completed", time: "30 mins ago" },
      { title: "Quiz Passed (95%)", time: "2 hours ago" },
      { title: "Certificate Issued", time: "1 day ago" },
      { title: "Enrolled in Batch B", time: "3 days ago" },
    ],
  },

  billing: {
    id: "billing",
    name: "Billing & POS Software",
    short: "Billing",
    tag: "Finance & GST Accounting",
    headline: "Fast GST invoicing. Accurate financial accounting.",
    subtext:
      "Accelerate checkout, generate GST-compliant invoices in seconds, sync barcode stock, and maintain flawless financial reporting effortlessly.",
    heroBgImage: "IT_product_detail.png",
    featureDashboardImage: "billing dash.png",
    heroPills: [
      { icon: CreditCard, label: "GST Invoicing" },
      { icon: Layers, label: "Barcode POS" },
      { icon: ShieldCheck, label: "E-Way Bills" },
      { icon: BarChart3, label: "Profit Analytics" },
    ],
    features: [
      { icon: CreditCard, title: "Lightning Fast POS", desc: "Thermal printing, barcode scanning, and instant bill checkout." },
      { icon: ShieldCheck, title: "GST Compliance", desc: "Auto-calculate CGST/SGST/IGST, e-invoicing, and GSTR filings." },
      { icon: Layers, title: "Stock & Inventory", desc: "Automatic stock deduction upon billing and low-stock alerts." },
      { icon: Users, title: "Customer Loyalty", desc: "Phone lookup, reward points, and discount voucher engine." },
      { icon: DollarSign, title: "Expenses & Ledger", desc: "Track supplier payments, daybook, and cash reconciliation." },
      { icon: TrendingUp, title: "Multi-Payment UPI", desc: "Accept UPI, Credit Cards, cash, and split payments easily." },
    ],
    benefits: [
      { icon: Sliders, title: "Offline-First Reliability", desc: "Bills continuously even when offline; auto-syncs when online." },
      { icon: ShieldCheck, title: "Cloud Backup", desc: "Secure encrypted cloud storage ensuring ledger safety." },
      { icon: Headset, title: "Custom Invoice Templates", desc: "Add your logo, terms, bank QR code, and custom footers." },
      { icon: TrendingUp, title: "Multi-Branch Control", desc: "Monitor sales across all retail outlets from your phone." },
      { icon: Layers, title: "WhatsApp Digital Bills", desc: "Send digital PDF bills directly to customer WhatsApp." },
      { icon: DollarSign, title: "Zero Learning Curve", desc: "Intuitive touch interface cashiers master in 5 minutes." },
    ],
    testimonial: {
      quote:
        "Zenelait Billing cut our checkout queues in half and automated our GST return filing completely. It is the most reliable POS software we have used.",
      name: "Vikas Patel",
      role: "Founder, RetailChain India",
      company: "RetailChain",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    },
    stats: { conversionRate: "99.9%", revenue: "$3,200,000", totalLeads: "12,400", dealsWon: "12,100" },
    mockupUser: { name: "Anand Verma", email: "anand@retail.in", phone: "+91 98765 43210", location: "Mumbai, India" },
    activityTimeline: [
      { title: "GST Invoice #9021 Issued", time: "10 mins ago" },
      { title: "UPI Payment Received", time: "12 mins ago" },
      { title: "Daily Cashbook Synced", time: "5 hours ago" },
      { title: "Stock Low Warning Sent", time: "1 day ago" },
    ],
  },

  website: {
    id: "website",
    name: "Website & Web Architecture",
    short: "Website",
    tag: "Web Platforms & E-Commerce",
    headline: "High-conversion web platforms. Built for speed.",
    subtext:
      "We design and engineer bespoke corporate websites, e-commerce storefronts, and web portals optimized for speed, SEO domination, and conversion.",
    heroBgImage: "IT_product_detail.png",
    featureDashboardImage: "website dash.png",
    heroPills: [
      { icon: Globe, label: "Custom Design" },
      { icon: Zap, label: "Lighthouse 100" },
      { icon: TrendingUp, label: "SEO Architecture" },
      { icon: Layers, label: "E-Commerce Ready" },
    ],
    features: [
      { icon: Globe, title: "Custom Web Design", desc: "Tailored UI/UX design matching your brand with zero cookie-cutter templates." },
      { icon: Zap, title: "Headless Speed", desc: "React, Next.js, and Tailwind CSS for instant sub-second page loads." },
      { icon: TrendingUp, title: "SEO & Schema", desc: "Built-in technical SEO, JSON-LD data, open graph, and sitemap automation." },
      { icon: Layers, title: "E-Commerce Engine", desc: "Custom shopping cart, payment gateways, and product catalogues." },
      { icon: Sliders, title: "CMS Control", desc: "Easy-to-use content management for blogs, case studies, and updates." },
      { icon: ShieldCheck, title: "Global CDN", desc: "Deployed on edge servers with automated SSL and DDoS protection." },
    ],
    benefits: [
      { icon: Sliders, title: "Mobile-First Responsive", desc: "Pixel-perfect rendering across smartphones, tablets, and 4K screens." },
      { icon: ShieldCheck, title: "Conversion Focused", desc: "Strategic CTAs, lead forms, and optimized user journeys." },
      { icon: Headset, title: "Security Hardened", desc: "Protection against OWASP top vulnerabilities, XSS, and SQL injection." },
      { icon: TrendingUp, title: "Scalable Infrastructure", desc: "Engineered to sustain viral traffic spikes without slowing." },
      { icon: Layers, title: "Analytics Integrated", desc: "GA4 event tracking, heatmaps, and conversion goal setups." },
      { icon: DollarSign, title: "Ongoing Audits", desc: "Continuous monitoring, updates, and speed optimization audits." },
    ],
    testimonial: {
      quote:
        "Our new web platform engineered by Zenelait loaded 3x faster and doubled our organic lead conversion within the first 60 days.",
      name: "Marcus Vance",
      role: "VP Marketing, Lumina SaaS",
      company: "Lumina SaaS",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80",
    },
    stats: { conversionRate: "18.5%", revenue: "$950,000", totalLeads: "3,200", dealsWon: "1,120" },
    mockupUser: { name: "Jessica Taylor", email: "jessica@lumina.io", phone: "+1 312 555 0199", location: "Chicago, USA" },
    activityTimeline: [
      { title: "Page Speed Score 100", time: "1 hour ago" },
      { title: "SEO Audit Passed", time: "4 hours ago" },
      { title: "Stripe Checkout Live", time: "1 day ago" },
      { title: "SSL Renewal Auto-Synced", time: "3 days ago" },
    ],
  },

  "ai-chatbot": {
    id: "ai-chatbot",
    name: "AI Chatbot & Conversational Agents",
    short: "AI Chatbot",
    tag: "Conversational AI & Automation",
    headline: "24/7 Intelligent Automation. Qualify leads instantly.",
    subtext:
      "Train conversational AI on your documentation, product catalog, and knowledge base to qualify prospects and resolve customer queries 24/7.",
    heroBgImage: "IT_product_detail.png",
    featureDashboardImage: "ai chatbot dash.jpg",
    heroPills: [
      { icon: Bot, label: "Custom RAG Training" },
      { icon: Zap, label: "WhatsApp & Web" },
      { icon: Users, label: "Instant Qualification" },
      { icon: Headset, label: "Human Handover" },
    ],
    features: [
      { icon: Bot, title: "Knowledge RAG Training", desc: "Trained on your PDFs, website links, Notion pages, and custom FAQs." },
      { icon: Zap, title: "Multi-Channel Bots", desc: "Deploy on Website, WhatsApp Business API, Instagram, and Messenger." },
      { icon: Users, title: "Lead Qualification", desc: "Asks qualifying questions, collects phone/email, and scores prospects." },
      { icon: Headset, title: "Human Handover", desc: "Routes complex queries to live support agents with full chat history." },
      { icon: Sliders, title: "Action Execution", desc: "Triggers calendar bookings, creates CRM leads, and checks order status." },
      { icon: BarChart3, title: "AI Analytics", desc: "Monitor intent trends, common questions, and resolution accuracy." },
    ],
    benefits: [
      { icon: Sliders, title: "Instant Response Time", desc: "Zero wait times for customers 24 hours a day, 365 days a year." },
      { icon: ShieldCheck, title: "Hallucination Guardrails", desc: "Enterprise safety guardrails ensuring accurate, brand-aligned answers." },
      { icon: Headset, title: "Multilingual Support", desc: "Understands and responds in over 50+ languages natively." },
      { icon: TrendingUp, title: "CRM Sync", desc: "Automatically pushes captured leads directly to your sales pipeline." },
      { icon: Layers, title: "Continuous Learning", desc: "Learns continuously from agent handovers and new document uploads." },
      { icon: DollarSign, title: "4x Conversion Boost", desc: "Increases website lead capture rates by up to 4x compared to forms." },
    ],
    testimonial: {
      quote:
        "The AI Chatbot built by Zenelait handles 80% of our customer inquiries automatically and captures qualified lead details 24/7 flawlessly.",
      name: "Elena Rostova",
      role: "Head of Customer Experience, NovaTech",
      company: "NovaTech",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    },
    stats: { conversionRate: "42.8%", revenue: "$480,000", totalLeads: "15,800", dealsWon: "6,200" },
    mockupUser: { name: "Michael Chang", email: "michael@novatech.ai", phone: "+1 650 492 8811", location: "Seattle, USA" },
    activityTimeline: [
      { title: "Lead Qualified (Hot)", time: "5 mins ago" },
      { title: "WhatsApp Query Resolved", time: "18 mins ago" },
      { title: "Demo Booked on Calendar", time: "1 hour ago" },
      { title: "Handed over to Support", time: "2 hours ago" },
    ],
  },
};

const categories = ["All", "Sales & Customers", "Operations & Finance", "Education & AI"];

function ItProducts() {
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [apiTestimonials, setApiTestimonials] = useState<{ quote: string; name: string; role: string; company?: string; industry?: string }[]>([]);

  useEffect(() => {
    getTestimonials('it_products')
      .then((data) => {
        if (data && data.length > 0) {
          setApiTestimonials(
            data.map((t) => ({
              quote: t.content,
              name: t.author,
              role: t.role,
              company: t.company || '',
              industry: t.industry || 'IT Products & Engineering',
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  // Sync state with URL search param `?product=crm` or `?id=crm`
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prodParam = params.get("product") || params.get("id");
    if (prodParam && productDetailsData[prodParam.toLowerCase()]) {
      setActiveProductId(prodParam.toLowerCase());
    } else {
      setActiveProductId(null);
    }
  }, []);

  const openProductDetail = (id: string) => {
    const key = id.toLowerCase();
    setActiveProductId(key);
    window.history.pushState({}, "", `/it-products?product=${key}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const backToCatalog = () => {
    setActiveProductId(null);
    window.history.pushState({}, "", `/it-products`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredProducts = itProducts.filter((p) => {
    if (selectedCategory === "All") return true;
    if (selectedCategory === "Sales & Customers") return p.short === "CRM" || p.short === "Website";
    if (selectedCategory === "Operations & Finance") return p.short === "ERP" || p.short === "Billing";
    if (selectedCategory === "Education & AI") return p.short === "LMS" || p.short === "AI Chatbot";
    return true;
  });

  const activeProduct = activeProductId ? productDetailsData[activeProductId] || productDetailsData["crm"] : null;

  // IF PRODUCT DETAIL VIEW IS ACTIVE (matches reference image structure exactly)
  if (activeProduct) {
    return (
      <div className="bg-[#fafafa] dark:bg-background min-h-screen">
        {/* Sticky Product Switcher Bar */}
        <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-border/60 py-3 sticky top-16 z-30 shadow-xs">
          <div className="container-x flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={backToCatalog}
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#ff5252] hover:text-[#e03e3e] transition-colors cursor-pointer"
            >
              <ArrowLeft className="size-4" />
              <span>All IT Products</span>
            </button>

            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              {Object.values(productDetailsData).map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => openProductDetail(p.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                    activeProductId === p.id
                      ? "bg-[#ff5252] text-white shadow-xs scale-105"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-50 hover:text-[#ff5252]"
                  }`}
                >
                  {p.short}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 1: HERO HEADER (Matching About Us Hero Design - Fit to Screen Size) */}
        <section className="relative min-h-[580px] w-full overflow-hidden bg-[#0d090b] text-white lg:min-h-[640px] border-b border-slate-800 flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={activeProduct.heroBgImage || "itproduct_page.png"}
              alt={`${activeProduct.name} Hero`}
              className="h-full w-full object-cover object-[65%_center]"
            />

            {/* Dark left-to-right overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d090b] via-[#0d090b]/90 to-[#0d090b]/30" />

            {/* Bottom black overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d090b]/80 via-transparent to-[#0d090b]/30" />
          </div>

          <div className="container-x relative z-10 flex min-h-[580px] items-center py-16 lg:min-h-[640px]">
            <div className="max-w-[680px] space-y-6">
              {/* IT PRODUCTS Pill Tag */}
              <Reveal direction="down">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-black/40 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
                  <Sparkles className="size-3.5" />
                  <span>IT PRODUCTS — {activeProduct.tag}</span>
                </div>
              </Reveal>

              {/* Main Headline */}
              <Reveal delay={100} direction="up">
                <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
                  {activeProduct.name} <br />
                  <span className="text-[#ff5252]">({activeProduct.short})</span>
                </h1>
              </Reveal>

              {/* Subtitle & Lead Copy */}
              <Reveal delay={150} direction="up">
                <p className="text-lg font-bold text-slate-200 sm:text-xl">
                  {activeProduct.headline}
                </p>
                <p className="mt-2 text-sm text-slate-300 sm:text-base leading-relaxed max-w-xl">
                  {activeProduct.subtext}
                </p>
              </Reveal>

              {/* 4 Feature Pills Grid (2x2) */}
              <Reveal delay={200} direction="up">
                <div className="grid grid-cols-2 gap-3 pt-2 max-w-lg">
                  {activeProduct.heroPills.map((pill) => {
                    const PillIcon = pill.icon;
                    return (
                      <div
                        key={pill.label}
                        className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-black/40 p-3 backdrop-blur-sm"
                      >
                        <div className="size-8 rounded-full bg-rose-500/20 text-[#ff5252] flex items-center justify-center shrink-0">
                          <PillIcon className="size-4 stroke-[2.2]" />
                        </div>
                        <span className="text-xs font-bold text-slate-200">
                          {pill.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </Reveal>

              {/* Action Buttons */}
              <Reveal delay={250} direction="up">
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-[#ff5252] px-7 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-rose-500/25 transition-all duration-300 hover:bg-[#e03e3e] hover:scale-104 cursor-pointer"
                  >
                    <span>Request a Demo</span>
                    <ArrowRight className="size-4" />
                  </Link>

                  <a
                    href="#features"
                    className="inline-flex items-center gap-1.5 text-sm font-extrabold text-slate-300 hover:text-[#ff5252] transition-colors"
                  >
                    <span>Explore Features</span>
                    <ArrowRight className="size-4 text-[#ff5252]" />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* SECTION 2: POWERFUL FEATURES FOR SMARTER [PRODUCT NAME] (Matching Reference Image) */}
        <section id="features" className="relative overflow-hidden py-16 lg:py-24 bg-[#fafafa] dark:bg-background border-b border-slate-100 dark:border-border/40">
          <div className="container-x relative z-10 space-y-16">
            
            {/* Top Row: Title & Subtitle + CRM App Preview Side-by-Side */}
            <div className="grid gap-12 lg:grid-cols-12 items-center">
              
              {/* Left Side: Header & Intro */}
              <div className="lg:col-span-6 space-y-6">
                <Reveal direction="down">
                  {/* KEY FEATURES Pill Tag */}
                  <div className="inline-flex items-center gap-2 rounded-full border border-rose-300 dark:border-rose-800 bg-white/90 dark:bg-rose-950/40 px-4 py-1.5 shadow-sm">
                    <Star className="size-3.5 fill-[#ff5252] text-[#ff5252]" />
                    <span className="text-xs font-black uppercase tracking-widest text-[#ff5252]">KEY FEATURES</span>
                  </div>

                  <h2 className="mt-4 text-3xl font-black text-slate-900 dark:text-white sm:text-4xl lg:text-5xl tracking-tight leading-[1.15]">
                    Powerful Features for Smarter <br />
                    <span className="text-[#ff5252]">
                      {activeProduct.id === "crm"
                        ? "Customer Relationship Management"
                        : activeProduct.name}
                    </span>
                  </h2>

                  <p className="mt-4 text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
                    Everything you need to build lasting customer relationships, streamline your sales process and grow your business — all in one powerful platform.
                  </p>
                </Reveal>
              </div>

              {/* Right Side: High Fidelity Dashboard Image Mockup */}
              <div className="lg:col-span-6 relative">
                <Reveal delay={150} direction="zoom">
                  <div className="relative">
                    {/* Background Decorative Red Aura Circle & Geometric Shapes */}
                    <div className="absolute -top-10 -right-10 size-72 rounded-full bg-rose-500/10 blur-2xl pointer-events-none" />
                    <div className="absolute -bottom-8 -left-8 size-60 rounded-full bg-rose-400/15 blur-3xl pointer-events-none" />
                    
                    {/* Triangular Red Shapes Behind Mockup */}
                    <div 
                      className="absolute -top-6 right-16 size-16 bg-[#ff5252] opacity-80 pointer-events-none"
                      style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                    />
                    <div 
                      className="absolute bottom-10 -right-4 size-14 bg-[#ff5252] opacity-90 pointer-events-none rotate-45"
                      style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                    />

                    {/* Dotted Pattern Decor */}
                    <div className="absolute -top-8 right-4 grid grid-cols-5 gap-1.5 opacity-30 pointer-events-none">
                      {Array.from({ length: 15 }).map((_, i) => (
                        <div key={i} className="size-1.5 rounded-full bg-[#ff5252]" />
                      ))}
                    </div>

                    {/* Realistic Browser Window Frame & Mockup Container */}
                    <div className="group relative rounded-3xl border-2 border-rose-500/20 dark:border-rose-500/30 bg-slate-900 shadow-[0_25px_70px_-15px_rgba(255,82,82,0.35)] dark:shadow-[0_25px_70px_-15px_rgba(255,82,82,0.25)] transition-all duration-500 hover:shadow-[0_35px_90px_-15px_rgba(255,82,82,0.5)] hover:-translate-y-1.5 overflow-hidden">
                      
                      {/* App Window Title Header Bar */}
                      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/80 select-none">
                        {/* macOS style Window Control Buttons */}
                        <div className="flex items-center gap-2">
                          <span className="size-3 rounded-full bg-[#ff5252] shadow-xs shadow-rose-500/50 inline-block" />
                          <span className="size-3 rounded-full bg-amber-400/90 inline-block" />
                          <span className="size-3 rounded-full bg-emerald-400/90 inline-block" />
                        </div>

                        {/* App Browser Address Bar Pill */}
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-[11px] font-mono text-slate-300">
                          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="truncate max-w-[180px] sm:max-w-[220px]">
                            app.zenelait.com/{activeProduct.id}
                          </span>
                        </div>

                        {/* Right Status Pill */}
                        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-[10px] font-bold text-[#ff5252]">
                          <span>LIVE DASHBOARD</span>
                        </div>
                      </div>

                      {/* Image Canvas Viewport with subtle hover zoom */}
                      <div className="relative overflow-hidden bg-slate-950">
                        <img
                          src={
                            activeProduct.featureDashboardImage?.startsWith("http")
                              ? activeProduct.featureDashboardImage
                              : `/${activeProduct.featureDashboardImage || activeProduct.heroBgImage || "IT_product_detail.png"}`
                          }
                          alt={`${activeProduct.name} Dashboard`}
                          className="w-full h-auto object-cover rounded-b-2xl block transition-transform duration-700 group-hover:scale-[1.02]"
                        />

                        {/* Subtle bottom gradient vignette for contrast */}
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-b-2xl pointer-events-none" />
                      </div>

                    </div>

                    {/* Floating Live Product Analytics Badge (Top-Left overlay) */}
                    <div className="absolute -top-4 -left-4 z-20 hidden sm:flex items-center gap-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 p-3 shadow-xl border border-rose-100 dark:border-slate-800 backdrop-blur-md animate-bounce-slight">
                      <div className="size-9 rounded-xl bg-gradient-to-br from-[#ff5252] to-rose-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-rose-500/30">
                        <Sparkles className="size-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
                          {activeProduct.short} Performance
                        </p>
                        <p className="text-xs font-black text-slate-900 dark:text-white">
                          {activeProduct.stats.conversionRate} Conversion Rate
                        </p>
                      </div>
                    </div>

                    {/* Floating 3D Zenelait Logo Badge Card (Bottom-Right) */}
                    <div className="absolute -bottom-5 -right-5 z-20 size-16 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-slate-800 shadow-[0_12px_35px_rgba(255,82,82,0.3)] flex items-center justify-center transform hover:scale-110 transition-transform">
                      <img src="logo.png" className="rounded-2xl" alt="zenelait" />
                    </div>

                  </div>
                </Reveal>
              </div>

            </div>

            {/* Bottom Row: 6 Feature Cards Grid (Matching Reference Image Design) */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-4">
              {activeProduct.features.map((feat, idx) => {
                const FeatIcon = feat.icon;
                return (
                  <Reveal key={feat.title} delay={idx * 60} direction="up">
                    <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900/90 p-6 pl-7 border border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(255,82,82,0.1)]">
                      {/* Left Vertical Accent Bar */}
                      <div className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full bg-[#ff5252]" />

                      {/* Subtle Soft Bottom-Right Light Gradient Overlay */}
                      <div className="absolute -bottom-10 -right-10 size-32 rounded-full bg-rose-500/5 blur-xl pointer-events-none group-hover:bg-rose-500/10 transition-colors" />

                      {/* Header Row: Rounded Square Soft Icon Box + Top-Right Soft Circle Arrow */}
                      <div className="flex items-center justify-between mb-5">
                        {/* Rounded Square Soft Light-Red Icon Box */}
                        <div className="size-12 rounded-2xl bg-rose-50 dark:bg-rose-950/70 text-[#ff5252] flex items-center justify-center border border-rose-100/60 dark:border-rose-900/30">
                          <FeatIcon className="size-5 stroke-[2.2]" />
                        </div>

                        {/* Top-Right Soft Light-Red Circle Arrow Button */}
                        <div className="size-9 rounded-full bg-rose-50/80 dark:bg-rose-950/50 text-[#ff5252] flex items-center justify-center transition-all duration-300 group-hover:bg-[#ff5252] group-hover:text-white group-hover:scale-105">
                          <ArrowRight className="size-4 stroke-[2.2]" />
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg tracking-tight">
                        {feat.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

          </div>
        </section>

        {/* SECTION 3: WHY CHOOSE ZENELAIT [PRODUCT SHORT]? (Matching Reference Image) */}
        <section className="relative overflow-hidden py-16 lg:py-24 bg-white dark:bg-card border-b border-slate-100 dark:border-border/40">
          {/* Section Background Image Layer: Left side 100% crystal clear till mid, right side shaded for legibility */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <img
              src="/why-choose-bg.png"
              alt="Why Choose Zenelait Background"
              className="w-full  object-cover object-left opacity-100 dark:opacity-90 scale-100 transition-opacity duration-500"
            />
            {/* 100% transparent from left (0%) to midpoint (50%), then fading smoothly to solid backdrop on right */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent via-50% to-white/95 dark:from-transparent dark:via-transparent dark:via-50% dark:to-slate-950" />
          </div>

          <div className="container-x relative z-10 grid gap-12 lg:grid-cols-12 items-center">
            {/* Left Side: Spacer allowing the laptop desk bg image to shine clearly */}
            <div className="hidden lg:block lg:col-span-5" />

            {/* Right Side: Why Choose Header & 6 Benefit Micro-Cards */}
            <div className="lg:col-span-7 space-y-8">
              <Reveal direction="down">
                {/* WHY CHOOSE Pill Tag */}
                <div className="inline-flex items-center gap-2">
                  <span className="h-[1.5px] w-4 bg-[#ff5252]" />
                  <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 dark:border-rose-900/60 bg-rose-50/80 dark:bg-rose-950/40 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-[#ff5252]">
                    <Search className="size-3.5 text-[#ff5252]" />
                    <span>WHY CHOOSE OUR {activeProduct.short}</span>
                  </div>
                </div>

                <h2 className="mt-3 text-3xl font-black text-slate-900 dark:text-white sm:text-4xl lg:text-5xl tracking-tight leading-tight">
                  Why Choose Zenelait <span className="text-[#ff5252]">{activeProduct.short}?</span>
                </h2>

                <p className="mt-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
                  We don't just give you software — we give you a complete {activeProduct.short} experience built to fit your business, your customers and your goals.
                </p>
              </Reveal>

              {/* 6 Benefit Micro-Cards Grid (2 cols x 3 rows with hover zoom-in & red border glow) */}
              <div className="grid gap-4 sm:grid-cols-2">
                {activeProduct.benefits.map((ben, idx) => {
                  const BenIcon = ben.icon;
                  return (
                    <Reveal key={ben.title} delay={(idx % 2) * 80} direction="up">
                      <div className="group relative flex items-start gap-3.5 p-4 sm:p-4.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 shadow-sm hover:shadow-[0_12px_30px_rgba(255,82,82,0.18)] transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-1 hover:border-[#ff5252] hover:ring-2 hover:ring-[#ff5252]/20 cursor-pointer overflow-hidden">
                        {/* Background Subtle Red Radial Accent Glow on Hover */}
                        <div className="absolute -right-6 -bottom-6 size-24 rounded-full bg-[#ff5252]/5 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300 pointer-events-none" />

                        {/* Icon Container with subtle scale up */}
                        <div className="size-10 rounded-xl bg-rose-50 dark:bg-rose-950/70 text-[#ff5252] flex items-center justify-center shrink-0 border border-rose-100 dark:border-rose-900/40 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#ff5252] group-hover:text-white">
                          <BenIcon className="size-4.5 stroke-[2.2]" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm tracking-tight transition-colors group-hover:text-[#ff5252] dark:group-hover:text-[#ff5252]">
                            {ben.title}
                          </h4>
                          <p className="mt-1 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            {ben.desc}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: TRUSTED BY BUSINESSES WORLDWIDE (Matching Reference Image) */}
        <section className="relative overflow-hidden py-10 lg:py-14 bg-[#fafafa] dark:bg-background border-b border-slate-100 dark:border-border/40">
          <div className="container-x relative z-10">
            <div className="grid gap-12 lg:grid-cols-12 items-center">
              {/* Left Column: Heading & Button */}
              <div className="lg:col-span-5 space-y-6">
                <Reveal direction="down">
                  <div className="inline-flex items-center gap-2">
                    <span className="h-[1.5px] w-4 bg-[#ff5252]" />
                    <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 dark:border-rose-900/60 bg-rose-50/80 dark:bg-rose-950/40 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-[#ff5252]">
                      <Search className="size-3.5 text-[#ff5252]" />
                      <span>SUCCESS STORIES</span>
                    </div>
                  </div>

                  <h2 className="mt-3 text-3xl font-black text-slate-900 dark:text-white sm:text-4xl lg:text-5xl tracking-tight leading-tight">
                    Trusted by Businesses <br />
                    <span className="text-[#ff5252]">Worldwide</span>
                  </h2>

                  <p className="mt-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
                    See how companies across different industries are growing with Zenelait {activeProduct.short}.
                  </p>
                </Reveal>

                <Reveal delay={200} direction="up">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-[#ff5252] px-6 py-3 text-xs font-extrabold text-white shadow-md transition-transform hover:scale-104"
                  >
                    <span>View All Testimonials</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </Reveal>
              </div>

              {/* Right Column: Testimonial Card with Client Quote & Interactive Controls */}
              <div className="lg:col-span-7">
                <Reveal delay={150} direction="zoom">
                  {(() => {
                    const fallbackList = Object.values(productDetailsData).map((p) => ({
                      quote: p.testimonial.quote,
                      name: p.testimonial.name,
                      role: p.testimonial.role,
                      company: p.testimonial.company,
                      industry: "IT Products & Engineering",
                    }));

                    const displayList = apiTestimonials.length > 0 ? apiTestimonials : fallbackList;
                    const currentTestimonial = displayList[testimonialIndex % displayList.length];

                    const handlePrev = () => {
                      setTestimonialIndex((prev) => (prev === 0 ? displayList.length - 1 : prev - 1));
                    };

                    const handleNext = () => {
                      setTestimonialIndex((prev) => (prev + 1) % displayList.length);
                    };

                    if (!currentTestimonial) return null;

                    return (
                      <div className="relative rounded-3xl bg-white dark:bg-card p-8 border border-slate-100 dark:border-border/60 shadow-xl space-y-6 transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <Quote className="size-8 text-[#ff5252]/40" />
                          <span className="text-[11px] font-extrabold text-[#ff5252] bg-rose-50 dark:bg-rose-950/60 px-3 py-1 rounded-full border border-rose-100 dark:border-rose-900/40">
                            {testimonialIndex + 1} / {displayList.length}
                          </span>
                        </div>

                        <p className="text-base sm:text-lg font-medium text-slate-700 dark:text-slate-200 italic leading-relaxed min-h-[80px]">
                          "{currentTestimonial.quote}"
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-border/60">
                          <div>
                            <p className="font-extrabold text-slate-900 dark:text-white text-sm">
                              {currentTestimonial.name}
                            </p>
                            <p className="text-xs font-bold text-[#ff5252]">
                              {currentTestimonial.role}
                            </p>
                            {currentTestimonial.company && (
                              <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                                {currentTestimonial.company}
                              </p>
                            )}
                          </div>

                          {/* Interactive Carousel Control Buttons */}
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={handlePrev}
                              aria-label="Previous testimonial"
                              className="size-10 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-[#ff5252] hover:text-white hover:border-[#ff5252] transition-all duration-200 cursor-pointer active:scale-95 shadow-xs"
                            >
                              <ChevronLeft className="size-5 stroke-[2.2]" />
                            </button>
                            <button
                              type="button"
                              onClick={handleNext}
                              aria-label="Next testimonial"
                              className="size-10 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-[#ff5252] hover:text-white hover:border-[#ff5252] transition-all duration-200 cursor-pointer active:scale-95 shadow-xs"
                            >
                              <ChevronRight className="size-5 stroke-[2.2]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // DEFAULT: MAIN CATALOG GRID VIEW
  return (
    <div className="pb-20 sm:pb-28">
      {/* Hero Header matching About Us full-width design */}
      <section className="relative min-h-[580px] w-full overflow-hidden bg-[#0d090b] text-white lg:min-h-[640px] mb-16 lg:mb-24">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="itproduct_page.png"
            alt="Zenelait IT Products"
            className="h-full w-full object-cover object-[65%_center]"
          />

          {/* Dark left-to-right overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d090b] via-[#0d090b]/85 to-[#0d090b]/20" />

          {/* Bottom black overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d090b]/80 via-transparent to-[#0d090b]/20" />
        </div>

        {/* Content */}
        <div className="container-x relative z-10 flex min-h-[580px] items-center py-16 lg:min-h-[640px]">
          <div className="max-w-[620px]">
            {/* Label */}
            <Reveal direction="down">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-black/40 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
                <Sparkles className="size-3.5" />
                <span>Product Portfolio</span>
              </div>
            </Reveal>

            {/* Heading */}
            <Reveal delay={100} direction="up">
              <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
                Software & Digital Products <br />
                <span className="text-[#ff5252]">Built for Scale</span>
              </h1>
            </Reveal>

            {/* Subtitle */}
            <Reveal delay={150} direction="up">
              <p className="mt-6 text-base text-slate-300 sm:text-lg sm:leading-relaxed max-w-xl">
                From intuitive CRM systems and ERP suites to custom AI chatbots and high-performance LMS platforms — explore production-ready software solutions built by Zenelait Infotech.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Product Cards Grid */}
      <section className="container-x pt-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((p, i) => {
            const productKey = p.short.toLowerCase().replace(/\s+/g, "-");
            return (
              <Reveal key={p.short} delay={(i % 3) * 90} direction="up" className="h-full">
                <div
                  onClick={() => openProductDetail(productKey)}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  {/* 3D Tech Header Image Container */}
                  <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
                    <img
                      src={p.image}
                      alt={p.name}
                      width={1200}
                      height={800}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    {/* Subtle Gradient & Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />

                    {/* Top-Left Glass Tag Overlay on Image */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white backdrop-blur-md shadow-md">
                        <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                        {p.short}
                      </span>
                    </div>
                  </div>

                  {/* Card Body Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {p.name}
                    </h2>
                    <p className="mt-2.5 text-sm sm:text-base text-muted-foreground leading-relaxed flex-1">
                      {p.description}
                    </p>

                    {/* Key Feature Points */}
                    <ul className="mt-5 space-y-2 border-t border-border/50 pt-4">
                      {p.points.map((pt: string) => (
                        <li key={pt} className="flex items-start gap-2 text-xs sm:text-sm font-medium text-foreground/90">
                          <div className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary mt-0.5">
                            <Check className="size-3" />
                          </div>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Action Link Footer: Read More ➔ */}
                    <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openProductDetail(productKey);
                        }}
                        className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#ff5252] hover:text-[#e03e3e] transition-colors group/link cursor-pointer"
                      >
                        <span className="underline underline-offset-4 decoration-[#ff5252]/40 group-hover/link:decoration-[#ff5252]">
                          Read More
                        </span>
                        <ArrowRight className="size-4 text-[#ff5252] transition-transform duration-300 group-hover/link:translate-x-1" />
                      </button>

                      
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Quick Preview Modal */}
      {previewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-2xl border border-border bg-card p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            <button
              type="button"
              onClick={() => setPreviewProduct(null)}
              className="absolute top-4 right-4 rounded-full border border-border p-2 text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer"
            >
              <X className="size-5" />
            </button>

            <span className="rounded-md bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              {previewProduct.short} Architecture
            </span>

            <h3 className="mt-4 text-3xl font-extrabold">{previewProduct.name}</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">{previewProduct.description}</p>

            <div className="mt-6 rounded-xl border border-border bg-surface p-5">
              <h4 className="font-bold text-foreground text-sm uppercase tracking-wider">
                Key Platform Capabilities
              </h4>
              <ul className="mt-3 space-y-2.5">
                {previewProduct.points.map((pt: string) => (
                  <li key={pt} className="flex items-center gap-2.5 text-sm">
                    <Check className="size-4 text-primary shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setPreviewProduct(null);
                  openProductDetail(previewProduct.short.toLowerCase().replace(/\s+/g, "-"));
                }}
                className="button-shine flex-1 rounded-lg bg-primary py-3 text-center font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.02] cursor-pointer"
              >
                View Product Details ➔
              </button>
              <button
                type="button"
                onClick={() => setPreviewProduct(null)}
                className="rounded-lg border border-border px-5 py-3 font-semibold hover:bg-accent cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

     

    </div>
  );
}
