export type Product = {
  name: string;
  short: string;
  tag?: string;
  image?: string;
  description: string;
  points: string[];
};

export const itProducts: Product[] = [
  {
    name: "Customer Relationship Management (CRM)",
    short: "CRM",
    tag: "Sales & CRM",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80",
    description:
      "A complete sales and customer platform that captures every lead, tracks every conversation and turns pipeline into predictable revenue.",
    points: [
      "Lead, deal and pipeline management",
      "Automated follow-ups and reminders",
      "Role-based dashboards and forecasting",
    ],
  },
  {
    name: "Enterprise Resource Planning (ERP)",
    short: "ERP",
    tag: "Enterprise System",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80",
    description:
      "One connected system for inventory, purchase, production, finance and people — designed for growing Indian businesses.",
    points: [
      "Inventory, purchase and vendor control",
      "Accounts, payroll and compliance",
      "Multi-branch and multi-warehouse ready",
    ],
  },
  {
    name: "Learning Management System (LMS)",
    short: "LMS",
    tag: "Learning Platform",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&auto=format&fit=crop&q=80",
    description:
      "Deliver courses, assessments and certifications at scale with a learning platform built for institutions and corporate training teams.",
    points: [
      "Course authoring and batch scheduling",
      "Quizzes, assignments and certificates",
      "Learner progress and performance analytics",
    ],
  },
  {
    name: "Billing Software",
    short: "Billing",
    tag: "Finance & GST",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80",
    description:
      "Fast, GST-ready invoicing for retail, distribution and services with barcode billing and clean financial reporting.",
    points: [
      "GST invoices, quotations and e-way support",
      "Barcode billing and stock sync",
      "Daybook, ledger and tax reports",
    ],
  },
  {
    name: "Website Development",
    short: "Website",
    tag: "Web Architecture",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&auto=format&fit=crop&q=80",
    description:
      "Corporate sites, e-commerce storefronts and web applications engineered for speed, search visibility and conversion.",
    points: [
      "Responsive corporate and product sites",
      "E-commerce and payment integration",
      "SEO-first architecture and analytics",
    ],
  },
  {
    name: "AI Chatbot",
    short: "AI Chatbot",
    tag: "Conversational AI",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=80",
    description:
      "Conversational AI assistants that qualify leads, answer customer questions and hand off to your team with full context.",
    points: [
      "Trained on your documents and catalogue",
      "WhatsApp, web and app channels",
      "Human handover with conversation history",
    ],
  },
];

export const nonItProducts: Product[] = [
  {
    name: "Search Engine Marketing",
    short: "SEM",
    tag: "Search & Technical SEO",
    image: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=1024&auto=format&fit=crop&q=80",
    description:
      "Own the searches that matter with technical SEO, content strategy and search campaigns that compound month after month.",
    points: [
      "Keyword and intent research",
      "On-page and technical SEO",
      "Search campaign management",
    ],
  },
  {
    name: "Paid Advertising",
    short: "Paid Ads",
    tag: "PPC & Social Ads",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1024&auto=format&fit=crop&q=80",
    description:
      "Performance campaigns across Google, Meta and YouTube, engineered around cost per qualified lead — not vanity clicks.",
    points: [
      "Full-funnel campaign structures",
      "Creative and landing page testing",
      "Budget pacing and ROAS control",
    ],
  },
  {
    name: "Social Media Marketing",
    short: "Social",
    tag: "SMM & Community",
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=1024&auto=format&fit=crop&q=80",
    description:
      "Turn your brand accounts into active conversion channels with targeted creative, community management and influencer partnerships.",
    points: [
      "Content strategy and production",
      "Community and inbox management",
      "Influencer and creator relations",
    ],
  },
  {
    name: "Content Marketing",
    short: "Content",
    tag: "Content Strategy & Copy",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1024&auto=format&fit=crop&q=80",
    description:
      "Educational articles, case studies and lead assets that establish domain authority and pull qualified prospects into your funnel.",
    points: [
      "Editorial calendar and research",
      "Long-form content and lead magnets",
      "Distribution across owned channels",
    ],
  },
  {
    name: "Direct Marketing",
    short: "Direct",
    tag: "Email & WhatsApp API",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1024&auto=format&fit=crop&q=80",
    description:
      "High-converting email, WhatsApp API and SMS campaigns that engage contacts, recover abandoned intent and drive repeat business.",
    points: [
      "WhatsApp API and email automation",
      "Audience segmentation and lifecycle triggers",
      "Deliverability and spam monitoring",
    ],
  },
  {
    name: "Lead Generation",
    short: "Leads",
    tag: "B2B & B2C Lead Engines",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1024&auto=format&fit=crop&q=80",
    description:
      "Outbound and inbound lead engines configured to deliver qualified prospect meetings directly to your sales team.",
    points: [
      "Target list building and enrichment",
      "Multi-channel outreach sequences",
      "Appointment setting and qualification",
    ],
  },
  {
    name: "Brand Management",
    short: "Brand",
    tag: "Reputation & Strategy",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1024&auto=format&fit=crop&q=80",
    description:
      "Protect and elevate your reputation with strategic positioning, corporate identity systems and online reputation monitoring.",
    points: [
      "Brand identity and messaging guide",
      "Review and reputation management",
      "Digital PR and media placement",
    ],
  },
  {
    name: "Analytics & Reporting",
    short: "Analytics",
    tag: "GA4 & ROI Analytics",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1024&auto=format&fit=crop&q=80",
    description:
      "Clear, real-time dashboards that show cost per acquisition, pipeline health and marketing ROI across every active channel.",
    points: [
      "GA4 and GTM implementation",
      "Custom executive dashboards",
      "Attribution modeling and ROI tracking",
    ],
  },
  {
    name: "Video Production",
    short: "Video",
    tag: "4K Shoots & Reels",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1024&auto=format&fit=crop&q=80",
    description:
      "Corporate brand films, product walkthroughs, social reels and video ad creatives shot and edited to drive engagement.",
    points: [
      "Scriptwriting and storyboarding",
      "On-site shooting and drone footage",
      "Post-production, motion graphics and sound",
    ],
  },
  {
    name: "Graphic Design",
    short: "Design",
    tag: "Branding & UI Assets",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1024&auto=format&fit=crop&q=80",
    description:
      "High-impact visual design for digital ads, social channels, sales collateral, pitch decks, infographics and brand assets.",
    points: [
      "Social and digital ad creatives",
      "Sales collateral and pitch decks",
      "Packaging, infographics and UI graphics",
    ],
  },
];
