export type Product = {
  id?: string;
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
    image: "/erp_card_image.jpg",
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
  {
    name: "Customized Software For All Fields",
    short: "Custom Software",
    tag: "Custom Solutions",
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=1200&auto=format&fit=crop&q=80",
    description:
      "Tailor-made enterprise software solutions designed to digitize and automate workflows across healthcare, logistics, manufacturing, retail, and finance.",
    points: [
      "Bespoke architecture tailored to unique workflow requirements",
      "Scalable, cloud-native enterprise systems with API integration",
      "End-to-end development, legacy migration, and ongoing support",
    ],
  },
  {
    name: "Human Resource Management System (HRMS)",
    short: "HRMS",
    tag: "Workforce & HR",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
    description:
      "Complete HR and workforce software for automated attendance, biometric sync, multi-tier payroll processing, leave management, and employee self-service.",
    points: [
      "Biometric, GPS attendance and flexible shift rosters",
      "Automated payroll calculation, statutory compliance & payslips",
      "Employee self-service portal, leave requests & appraisals",
    ],
  },
  {
    name: "AI Software Factory",
    short: "AI Factory",
    tag: "Autonomous AI Engine",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80",
    description:
      "Accelerated AI engineering factory powered by fine-tuned LLM agents, automated code generation, smart workflow pipelines, and private data guardrails.",
    points: [
      "Custom fine-tuned LLMs and autonomous agent workflows",
      "Automated code production and rapid prototyping engine",
      "Private enterprise data isolation with SOC-2 security",
    ],
  },
  {
    id: "rideuu-app",
    name: "Rideuu App",
    short: "Rideuu App",
    tag: "Auto & Bike Ride Booking",
    image: "/rideuu_app_card.jpg",
    description:
      "On-demand auto rickshaw and bike taxi booking mobile application with real-time GPS tracking, fare estimation, instant driver matching, and cash/UPI payments.",
    points: [
      "Instant auto rickshaw & bike taxi booking",
      "Live GPS route navigation & real-time tracking",
      "Seamless UPI, wallet, and cash payments",
    ],
  },
  {
    id: "school-college-cab",
    name: "School College Cab",
    short: "School Cab",
    tag: "Student Transport & Safety",
    image: "/school_college_cab_card.jpg",
    description:
      "Dedicated school and college cab booking mobile app offering safe student commutes, live route tracking, automated parent alerts, and driver verification.",
    points: [
      "Scheduled daily school & college pickup / drop",
      "Parent live tracking & real-time ETA alerts",
      "Verified drivers & emergency SOS button",
    ],
  },
  {
    id: "hospital-hms-crm",
    name: "Hospital CRM HMS",
    short: "Hospital HMS",
    tag: "Healthcare & Patient Management",
    image: "/hospital_hms_crm.png",
    description:
      "Hospital Management System (HMS) designed to streamline healthcare administration and patient relationship management.",
    points: [
      "Multi-tenant dual architecture for Platform Admin & Hospital Operations",
      "Patient registration, EMR, OPD/IPD & appointment scheduling",
      "Doctor rosters, staff management, lab integration & medical billing",
    ],
  },
  {
    id: "ai-integrated-crm",
    name: "AI Integrated CRM",
    short: "AI CRM",
    tag: "AI Sales & Intelligence",
    image: "/ai_crm.jpeg",
    description:
      "Next-generation CRM supercharged with artificial intelligence to predict lead conversions, automate sales outreach, transcribe calls, and auto-score deals.",
    points: [
      "Predictive AI lead scoring & win probability analytics",
      "Autonomous email sequence generation & smart WhatsApp replies",
      "Real-time call transcription, sentiment analysis & deal insights",
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
