import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Palette,
  PenTool,
  Share2,
  Image as ImageIcon,
  Layout,
  BookOpen,
  FileText,
  CreditCard,
  Building2,
  Presentation,
  PieChart,
  Box,
  Monitor,
  Youtube,
  Sparkle,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { SpotlightCard } from "@/components/SpotlightCard";

const designHeroImg = "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1024&auto=format&fit=crop&q=80";
const logoDesignRealImg = "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=1024&auto=format&fit=crop&q=80";
const brandIdentityRealImg = "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=1024&auto=format&fit=crop&q=80";
const socialCreativesRealImg = "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=1024&auto=format&fit=crop&q=80";
const posterDesignRealImg = "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1024&auto=format&fit=crop&q=80";
const bannerDesignRealImg = "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1024&auto=format&fit=crop&q=80";
const brochureDesignRealImg = "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1024&auto=format&fit=crop&q=80";
const flyerDesignRealImg = "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1024&auto=format&fit=crop&q=80";
const businessCardRealImg = "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1024&auto=format&fit=crop&q=80";
const companyProfileRealImg = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1024&auto=format&fit=crop&q=80";
const presentationRealImg = "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1024&auto=format&fit=crop&q=80";
const infographicsRealImg = "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=1024&auto=format&fit=crop&q=80";
const packagingRealImg = "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1024&auto=format&fit=crop&q=80";
const uiUxGraphicsRealImg = "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1024&auto=format&fit=crop&q=80";
const thumbnailRealImg = "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1024&auto=format&fit=crop&q=80";
const motionGraphicsRealImg = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1024&auto=format&fit=crop&q=80";

const title = "Graphic Design Services — Branding, UI/UX, Motion & Print | Zenelait Infotech";
const description =
  "Comprehensive Graphic Design services by Zenelait Infotech: Logo Design, Brand Identity, Social Media Creatives, Posters, Banners, Brochures, Flyers, Business Cards, Company Profiles, Presentations, Infographics, Packaging, UI/UX Graphics, Thumbnails, and Motion Graphics.";

export const Route = createFileRoute("/graphic-design")({
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
  component: GraphicDesignPage,
});

const designPillars = [
  {
    id: "logo-design",
    title: "Logo Design",
    short: "Iconic Brand Symbols",
    icon: Palette,
    image: logoDesignRealImg,
    tagline: "Create memorable, timeless logos that embody your brand identity.",
    overview:
      "A logo is the face of your business. We design vector-crafted logos — combining typography, geometry, and brand psychology to ensure your brand mark is instantly recognizable across digital screens and physical media.",
    points: [
      "Vector-Crafted Scalable Logo Marks & Lockups",
      "Comprehensive Brand Color Palette & Typography Pairing",
      "Full Vector Suite (AI, EPS, SVG, PNG, PDF formats)",
      "Dark, Light & Monochromatic Brand Application Variants",
    ],
  },
  {
    id: "brand-identity-design",
    title: "Brand Identity Design",
    short: "Comprehensive Stylebooks",
    icon: PenTool,
    image: brandIdentityRealImg,
    tagline: "Establish a unified visual language and brand stylebook.",
    overview:
      "Brand Identity Design ensures visual consistency. We architect complete brand design systems — defining typography hierarchies, icon sets, color codes, grid structures, and brand usage guidelines for your organization.",
    points: [
      "Complete Brand Identity Guidelines & Stylebook (PDF)",
      "Iconography System, Custom Patterns & Graphic Elements",
      "Color System Specifications (CMYK, RGB, Pantone, HEX)",
      "Brand Asset Library Organization & Governance",
    ],
  },
  {
    id: "social-media-creatives",
    title: "Social Media Creatives",
    short: "High-CTR Post & Story Assets",
    icon: Share2,
    image: socialCreativesRealImg,
    tagline: "Stop the scroll with eye-catching, high-converting social media artwork.",
    overview:
      "Social media requires constant visual freshness. We design feed posts, carousel slide decks, story templates, and cover graphics tailored for Instagram, LinkedIn, Facebook, and X (Twitter) feeds.",
    points: [
      "Platform-Optimized Feed Posts, Stories & Reels Covers",
      "Educational Multi-Slide Carousel Deck Graphic Design",
      "Editable Canva & Figma Social Media Brand Templates",
      "High-Contrast Typography & Visual Call-to-Action Hierarchy",
    ],
  },
  {
    id: "poster-design",
    title: "Poster Design",
    short: "Large-Format Advertising",
    icon: ImageIcon,
    image: posterDesignRealImg,
    tagline: "Demand visual attention with bold large-format poster artwork.",
    overview:
      "Poster Design combines artistic composition with commercial messaging. We craft high-resolution posters for marketing campaigns, product launches, events, trade shows, and billboard displays.",
    points: [
      "High-Resolution Print-Ready Poster Graphics (300 DPI)",
      "Bold Typographic Composition & Visual Focal Points",
      "Commercial Event, Product Launch & Campaign Posters",
      "Outdoor Billboard & Bus Shelter Digital Display Formats",
    ],
  },
  {
    id: "banner-design",
    title: "Banner Design",
    short: "Web & Exhibition Banners",
    icon: Layout,
    image: bannerDesignRealImg,
    tagline: "Engage web visitors and event attendees with sleek banner graphics.",
    overview:
      "Banner Design captures interest across digital advertising networks and physical exhibition halls. We produce HTML5 responsive ad banners, website hero sliders, roll-up exhibition banners, and standee graphics.",
    points: [
      "Responsive Web Hero Banners & Slider Graphics",
      "Display Ad Banners for Google & Ad Networks",
      "Exhibition Roll-Up Banners & Event Backdrop Displays",
      "CMYK Print-Ready Files with Bleed & Crop Marks",
    ],
  },
  {
    id: "brochure-design",
    title: "Brochure Design",
    short: "Corporate Tri-Fold & Catalogs",
    icon: BookOpen,
    image: brochureDesignRealImg,
    tagline: "Present your company and products in elegant multi-page print collateral.",
    overview:
      "Brochures deliver structured business information into the hands of prospects. We design tri-fold, bi-fold, and multi-page corporate brochures, product catalogs, and sales leave-behinds crafted with typographic discipline.",
    points: [
      "Custom Tri-Fold, Bi-Fold & Multi-Page Layouts",
      "E-Catalog Digital PDF & High-Res Print File Exports",
      "Product Specification Tables & Infographic Layouts",
      "Premium Paper Texture & Finish Print Recommendations",
    ],
  },
  {
    id: "flyer-design",
    title: "Flyer Design",
    short: "Promotional Handouts",
    icon: FileText,
    image: flyerDesignRealImg,
    tagline: "Drive immediate campaign action with high-impact promotional flyers.",
    overview:
      "Flyers are the ultimate agile print marketing tool. We design single and double-sided promotional flyers for sales events, product launches, local marketing, and trade show distributions.",
    points: [
      "Single & Double-Sided Promotional Handout Designs",
      "Clear Offer Framing, Scannable Headings & QR Codes",
      "A4, A5, and DL Standard Print Dimension Formats",
      "Fast Turnaround Production-Ready Digital Files",
    ],
  },
  {
    id: "business-card-design",
    title: "Business Card Design",
    short: "Executive Print & Digital NFC",
    icon: CreditCard,
    image: businessCardRealImg,
    tagline: "Make an unforgettable executive first impression with premium business cards.",
    overview:
      "A business card is a physical touchpoint of luxury. We design executive business cards incorporating spot UV, foil stamping, embossed finishes, and modern digital NFC chip integration.",
    points: [
      "Executive Luxury Layouts with Custom Typography",
      "Specialty Print Specs (Spot UV, Gold Foil, Emboss, Letterpress)",
      "Digital NFC Smart Card Integration Setup",
      "Standard, Square & Rounded Corner Die-Cut Specs",
    ],
  },
  {
    id: "company-profile-design",
    title: "Company Profile Design",
    short: "Institutional Corporate Profiles",
    icon: Building2,
    image: companyProfileRealImg,
    tagline: "Win enterprise contracts and investor trust with a polished corporate profile.",
    overview:
      "Company Profiles communicate institutional scale. We design comprehensive 10-30 page company profile booklets, annual reports, capability statements, and corporate credentials decks.",
    points: [
      "Institutional Multi-Page Booklet Design & Layout",
      "Interactive Digital PDF with Clickable Navigation Links",
      "Corporate Leadership, Services & Case Study Showcase",
      "High-Resolution Print Production Master Files",
    ],
  },
  {
    id: "presentation-design",
    title: "Presentation Design",
    short: "Pitch Decks & C-Suite Slides",
    icon: Presentation,
    image: presentationRealImg,
    tagline: "Transform boring slides into persuasive investor & C-suite pitch decks.",
    overview:
      "Presentation Design turns data into storytelling. We craft custom PowerPoint, Keynote, and Google Slides decks — featuring custom icon systems, data charts, slide transitions, and professional slide layouts.",
    points: [
      "Custom PowerPoint (.pptx) & Keynote Master Slide Templates",
      "Investor Pitch Deck & Enterprise Sales Presentation Design",
      "Infographic Data Charts, Timelines & Comparison Slides",
      "Royalty-Free Stock Photography & Vector Icon Integration",
    ],
  },
  {
    id: "infographics",
    title: "Infographics",
    short: "Data-Rich Visual Diagrams",
    icon: PieChart,
    image: infographicsRealImg,
    tagline: "Simplify complex data into beautiful, shareable visual infographics.",
    overview:
      "Infographics convert complex data into easily digestible visual stories. We design vertical infographics, process flowcharts, statistical comparisons, and timeline graphics ideal for blogs, PR, and social media.",
    points: [
      "Vertical High-Shareability Infographic Artwork",
      "Data Visualization, Charts & Custom Vector Illustration",
      "Complex Process Flowchart & Timeline Diagram Design",
      "Vector PDF & Web-Optimized Image Exports",
    ],
  },
  {
    id: "packaging-design",
    title: "Packaging Design",
    short: "3D Product Boxes & Labels",
    icon: Box,
    image: packagingRealImg,
    tagline: "Stand out on retail shelves and unboxing videos with 3D packaging design.",
    overview:
      "Packaging Design creates emotional connection at the point of touch. We craft custom product box dielines, bottle labels, pouch artwork, and unboxing experiences that drive consumer purchases.",
    points: [
      "3D Product Packaging Dieline & Label Artwork",
      "Retail Shelf Standout & E-Commerce Unboxing Design",
      "Barcodes, Ingredients & Regulatory Label Placement",
      "3D Photorealistic Product Rendering & Mockups",
    ],
  },
  {
    id: "ui-ux-graphics",
    title: "UI/UX Graphics",
    short: "Web & Mobile App Assets",
    icon: Monitor,
    image: uiUxGraphicsRealImg,
    tagline: "Enhance digital products with custom UI illustrations, icons, and graphic assets.",
    overview:
      "UI/UX Graphics elevate web and mobile applications. We design custom vector icon sets, empty state illustrations, onboarding graphics, dashboard visual components, and UI design design tokens.",
    points: [
      "Custom Vector Iconography & App Feature Illustrations",
      "Empty State, Success State & Onboarding Visual Graphics",
      "High-Fidelity Figma UI Components & Graphic Assets",
      "SVG Vector Export & Developer Handoff Organization",
    ],
  },
  {
    id: "thumbnail-design",
    title: "Thumbnail Design",
    short: "High-CTR Video Thumbnails",
    icon: Youtube,
    image: thumbnailRealImg,
    tagline: "Boost video click-through rates (CTR) with high-impact custom thumbnails.",
    overview:
      "A video thumbnail determines whether a viewer clicks or scrolls past. We design high-contrast YouTube and video ad thumbnails — featuring facial expressions, bold typography, and visual hooks that maximize CTR.",
    points: [
      "High-CTR YouTube & Video Ad Custom Thumbnails",
      "Bold Typography, Vibrant Contrast & Focal Cutouts",
      "A/B Split-Test Thumbnail Variant Design Packages",
      "Optimized for Desktop & Mobile Small-Screen Reading",
    ],
  },
  {
    id: "motion-graphics",
    title: "Motion Graphics",
    short: "Animated Logos & Visuals",
    icon: Sparkle,
    image: motionGraphicsRealImg,
    tagline: "Bring static designs to life with smooth 2D/3D motion graphics animations.",
    overview:
      "Motion Graphics add dynamic energy to your brand. We animate logo intros, social media posts, UI micro-interactions, title cards, and kinetic typography for marketing campaigns.",
    points: [
      "2D/3D Logo Reveal Intros & Stinger Animations",
      "Kinetic Typography & Animated Quote Social Graphics",
      "UI Micro-Interactions & Animated Vector Icons",
      "Lottie / JSON Web Animation & Video MP4 Exports",
    ],
  },
];

function GraphicDesignPage() {
  const [assetCount, setAssetCount] = useState(10);

  // Asset output calculation simulation
  const projectedDesignAssets = Math.round(assetCount * 4);
  const projectedImpressionsLift = Math.round(assetCount * 35000);

  return (
    <div className="relative">
      {/* Artful Luxurious Hero Header */}
      <section className="ink-panel relative overflow-hidden py-20 lg:py-28">
        {/* Glowing luxury ambient background elements */}
        <div className="pointer-events-none absolute -top-40 -right-24 size-[40rem] rounded-full bg-gradient-to-br from-primary/30 via-rose-600/15 to-transparent blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute top-1/2 -left-32 size-[30rem] rounded-full bg-amber-500/10 blur-3xl animate-pulse-glow" />

        <div className="container-x relative z-10 grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Reveal direction="down">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary backdrop-blur-md shadow-[0_0_20px_rgba(225,29,72,0.3)]">
                <Sparkles className="size-3.5 animate-spin-slow" />
                <span>Graphic Design Suite</span>
              </div>
            </Reveal>

            <div className="mt-6">
              <TextReveal
                text="Artistic Graphic Design & Brand Identity Systems That Command Attention"
                highlightWords={["Artistic", "Graphic", "Design"]}
                highlightClass="italic text-primary"
                className="text-4xl font-extrabold sm:text-5xl lg:text-6xl text-white leading-[1.08]"
              />
            </div>

            <Reveal delay={200} direction="up">
              <p className="mt-6 max-w-xl text-ink-foreground/85 text-lg leading-relaxed">
                From logo design and brand identity stylebooks to social media artwork, brochures, pitch decks,
                packaging, UI graphics, thumbnails, and motion animations — we design assets that build iconic brands.
              </p>
            </Reveal>

            <Reveal delay={300} direction="up">
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="button-shine inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-primary via-red-600 to-rose-600 px-8 py-4 font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-all duration-300 hover:scale-[1.04] hover:shadow-red-500/40"
                >
                  <Zap className="size-4" />
                  <span>Request Graphic Design Brief</span>
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="#design-pillars"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-md transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
                >
                  Explore 15 Pillars
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} direction="zoom">
            <div className="relative group overflow-hidden rounded-3xl border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-amber-500/30 blur-2xl opacity-60 transition-all duration-700 group-hover:opacity-90" />
              <img
                src={designHeroImg}
                alt="Graphic Design & Brand Identity System Visual"
                loading="lazy"
                width={1024}
                height={768}
                className="relative w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="border-y border-border/80 bg-surface/95 py-8 backdrop-blur-xl">
        <div className="container-x grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { label: "Design Assets Created", val: "5,000+" },
            { label: "Brand Identities Built", val: "350+" },
            { label: "Vector Precision Quality", val: "300 DPI / SVG" },
            { label: "Avg CTR Increase", val: "+145%" },
          ].map((st, i) => (
            <Reveal key={st.label} delay={i * 80} direction="up" className="text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-primary">{st.val}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {st.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 15 Graphic Design Pillars Detailed Breakdown */}
      <section id="design-pillars" className="container-x py-20 lg:py-28">
        <Reveal className="text-center">
          <h2 className="red-underline inline-block text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            15 Pillars of Graphic Design Mastery
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-muted-foreground text-lg">
            A comprehensive design suite covering brand identity, digital marketing artwork, print collateral, and motion assets.
          </p>
        </Reveal>

        <div className="mt-20 space-y-24">
          {designPillars.map((pillar, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={pillar.id}
                id={pillar.id}
                className="grid gap-12 items-center lg:grid-cols-2 scroll-mt-28"
              >
                <Reveal
                  direction={isEven ? "left" : "right"}
                  className={isEven ? "lg:order-1" : "lg:order-2"}
                >
                  <div className="relative group overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="w-full object-cover h-[340px] sm:h-[420px] transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-6 flex flex-col justify-end">
                      <span className="self-start rounded-full bg-gradient-to-r from-primary to-rose-600 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                        {pillar.short}
                      </span>
                      <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{pillar.title}</h3>
                    </div>
                  </div>
                </Reveal>

                <Reveal
                  direction={isEven ? "right" : "left"}
                  className={isEven ? "lg:order-2" : "lg:order-1"}
                >
                  <div className="flex size-13 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm mb-5 border border-primary/20">
                    <pillar.icon className="size-6" />
                  </div>
                  <h3 className="text-3xl font-extrabold sm:text-4xl">{pillar.title}</h3>
                  <p className="mt-3 text-lg font-semibold text-primary">{pillar.tagline}</p>
                  <p className="mt-4 text-muted-foreground leading-relaxed text-base">
                    {pillar.overview}
                  </p>

                  <ul className="mt-7 space-y-3.5">
                    {pillar.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-sm font-medium text-foreground">
                        <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-9">
                    <Link
                      to="/contact"
                      className="story-link inline-flex items-center gap-2 font-bold text-primary text-base"
                    >
                      <span>Design {pillar.title}</span>
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Design Output & Reach Simulator */}
      <section className="border-t border-border/80 bg-surface/90 py-20 lg:py-28 backdrop-blur-md">
        <div className="container-x">
          <Reveal direction="zoom">
            <SpotlightCard className="p-8 sm:p-14 bg-gradient-to-r from-accent via-card to-accent border-primary/30 shadow-2xl">
              <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center">
                <div>
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                    <TrendingUp className="size-4" /> Interactive Design Output Estimator
                  </div>
                  <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                    Estimate Design Retainer Deliverables
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed text-base">
                    Adjust your monthly design retainer scale slider to project monthly visual asset output and brand impression reach.
                  </p>

                  <div className="mt-8 rounded-2xl border border-border bg-background p-6 shadow-inner">
                    <div className="flex justify-between items-center text-sm font-bold text-foreground">
                      <span>Monthly Design Retainer Scale:</span>
                      <span className="text-xl text-primary font-extrabold">
                        {assetCount} Scale Units / mo
                      </span>
                    </div>

                    <input
                      type="range"
                      min="2"
                      max="30"
                      step="2"
                      value={assetCount}
                      onChange={(e) => setAssetCount(parseInt(e.target.value, 10))}
                      className="mt-4 w-full accent-primary cursor-pointer h-2.5 bg-border rounded-lg"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>2 Units</span>
                      <span>15 Units</span>
                      <span>30+ Scale Units / mo</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="rounded-2xl border border-border bg-background/90 p-6 text-center shadow-lg backdrop-blur-md">
                    <Palette className="mx-auto size-8 text-primary" />
                    <p className="mt-3 text-3xl font-extrabold text-foreground">
                      ~{projectedDesignAssets}
                    </p>
                    <p className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wider">
                      Est. Design Assets / Mo
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-background/90 p-6 text-center shadow-lg backdrop-blur-md">
                    <PieChart className="mx-auto size-8 text-rose-500" />
                    <p className="mt-3 text-3xl font-extrabold text-foreground">
                      {projectedImpressionsLift.toLocaleString()}+
                    </p>
                    <p className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wider">
                      Est. Visual Impressions Reach
                    </p>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </section>

      {/* Artful Bottom CTA Banner */}
      <section className="ink-panel relative overflow-hidden py-20 lg:py-28 text-center">
        <div className="container-x relative z-10">
          <Reveal direction="zoom">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Ready to Transform Your Brand's Visual Identity & Design Assets?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-ink-foreground/80 text-lg leading-relaxed">
              Schedule a design consultation and visual branding review with our senior art directors today.
            </p>
            <Link
              to="/contact"
              className="button-shine mt-9 inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-primary via-red-600 to-rose-600 px-9 py-4 font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-all duration-300 hover:scale-[1.05]"
            >
              <span>Get Free Graphic Design Brief</span>
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
