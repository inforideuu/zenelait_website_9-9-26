import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Video,
  FileText,
  Camera,
  Package,
  Film,
  Smartphone,
  Tv,
  Eye,
  Scissors,
  Sparkle,
  Palette,
  Mic,
  Zap,
  Play,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { SpotlightCard } from "@/components/SpotlightCard";

const videoHeroImg = "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1024&auto=format&fit=crop&q=80";
const scriptWritingRealImg = "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1024&auto=format&fit=crop&q=80";
const storyboardingRealImg = "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=1024&auto=format&fit=crop&q=80";
const corporateShootingRealImg = "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1024&auto=format&fit=crop&q=80";
const productShootingRealImg = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1024&auto=format&fit=crop&q=80";
const promotionalVideosRealImg = "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1024&auto=format&fit=crop&q=80";
const reelsShortsRealImg = "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=1024&auto=format&fit=crop&q=80";
const advertisementVideosRealImg = "https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=1024&auto=format&fit=crop&q=80";
const droneVideographyRealImg = "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1024&auto=format&fit=crop&q=80";
const videoEditingRealImg = "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=1024&auto=format&fit=crop&q=80";
const motionGraphicsRealImg = "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1024&auto=format&fit=crop&q=80";
const colorGradingRealImg = "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1024&auto=format&fit=crop&q=80";
const voiceOverRealImg = "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1024&auto=format&fit=crop&q=80";

const title = "Video Production Services — 4K Shoots, Editing & Motion Graphics | Zenelait Infotech";
const description =
  "Comprehensive Video Production services by Zenelait Infotech: Script Writing, Storyboarding, Corporate & Product Shoots, Promotional Videos, Reels & Shorts, Ads, Drone Videography, Editing, Motion Graphics, Color Grading, and Voice-Over.";

export const Route = createFileRoute("/video-production")({
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
  component: VideoProductionPage,
});

const videoPillars = [
  {
    id: "script-writing",
    title: "Script Writing",
    short: "Narrative & Commercial Scripts",
    icon: FileText,
    image: scriptWritingRealImg,
    tagline: "Craft compelling video narratives that captivate viewers from the first second.",
    overview:
      "A great video begins with an exceptional script. Our commercial scriptwriters craft high-hook openings, emotional storytelling arcs, precise message hierarchy, and clear call-to-actions engineered for commercial video campaigns.",
    points: [
      "High-Hook First 3-Second Script Opening Engineering",
      "Commercial Concept Development & Visual Scene Descriptions",
      "Brand Storytelling & Emotional Buyer Connection Arcs",
      "Platform-Specific Pacing & Voice-Over Script Alignment",
    ],
  },
  {
    id: "storyboarding",
    title: "Storyboarding",
    short: "Pre-Visualization & Shot Lists",
    icon: Film,
    image: storyboardingRealImg,
    tagline: "Visualize every camera angle and scene transition before production begins.",
    overview:
      "Storyboarding transforms creative ideas into shot-by-shot visual blueprints. We illustrate camera angles, lighting setups, actor movements, and scene transitions to ensure seamless production efficiency on set.",
    points: [
      "Frame-by-Frame Illustrated Scene Pre-Visualization",
      "Camera Movement, Lens Selection & Framing Specs",
      "Lighting Mood Boarding & Set Design Direction",
      "Director's Shot List & Production Scheduling Blueprint",
    ],
  },
  {
    id: "corporate-video-shooting",
    title: "Corporate Video Shooting",
    short: "Executive & Company Films",
    icon: Camera,
    image: corporateShootingRealImg,
    tagline: "Showcase enterprise vision, facility operations, and leadership culture.",
    overview:
      "Corporate Videos build unmatched B2B brand credibility. We deploy cinema-grade 4K/8K camera crews, pro audio, and studio lighting to produce executive interviews, company overview films, and facility tour videos.",
    points: [
      "Cinema-Grade 4K/8K Multi-Camera Production Crews",
      "Executive C-Suite Interviews & Leadership Profiles",
      "Facility, Manufacturing & Workplace Culture B-Roll",
      "Pro Studio Lighting & Wireless Lav/Boom Audio Capture",
    ],
  },
  {
    id: "product-video-shooting",
    title: "Product Video Shooting",
    short: "3D & Studio Product Showcases",
    icon: Package,
    image: productShootingRealImg,
    tagline: "Highlight product design, macro textures, and practical features in 4K.",
    overview:
      "Product Videos turn interest into immediate sales. We utilize turntable product stages, macro detail lenses, high-speed slow-motion capture, and studio lighting to showcase physical and digital products dynamically.",
    points: [
      "360-Degree Turntable & High-Speed Slow-Motion Capture",
      "Macro Lens Detail & Texture Lighting Setup",
      "Product Unboxing & Feature Demonstration Filming",
      "E-Commerce Storefront & Amazon Video Ad Ready",
    ],
  },
  {
    id: "promotional-videos",
    title: "Promotional Videos",
    short: "Brand Launches & Events",
    icon: Sparkle,
    image: promotionalVideosRealImg,
    tagline: "Create high-energy video hype for new product launches and flagship events.",
    overview:
      "Promotional Videos generate buzz and excitement. We shoot and edit cinematic promo trailers, event highlight reels, trade show loops, and brand activation videos designed to leave a lasting impact.",
    points: [
      "High-Energy Brand Launch & Teaser Video Production",
      "Live Event Coverage, Conference & Expo Highlights",
      "Fast-Paced Rhythmic Editing & Dynamic Sound Design",
      "Multi-Format Master Export for Web, Social & Big Screens",
    ],
  },
  {
    id: "reels-shorts-production",
    title: "Reels & Shorts Production",
    short: "Vertical 9:16 Short-Form",
    icon: Smartphone,
    image: reelsShortsRealImg,
    tagline: "Dominate Instagram Reels, YouTube Shorts, and TikTok algorithms.",
    overview:
      "Short-form vertical video is the fastest-growing content format. We produce high-volume 9:16 vertical videos featuring kinetic subtitles, fast-cut editing, trending audio integration, and visual hooks that maximize organic reach.",
    points: [
      "Native 9:16 Vertical Video Production for Social Feeds",
      "Kinetic Animated On-Screen Captions & Emojis",
      "Trending Audio & Sound Effect (SFX) Synchronization",
      "High-Volume Batch Shoot & Edit Production Packages",
    ],
  },
  {
    id: "advertisement-videos",
    title: "Advertisement Videos",
    short: "Commercial Ad Creatives",
    icon: Tv,
    image: advertisementVideosRealImg,
    tagline: "Drive direct-response conversions on Meta, Google, YouTube, and digital TV.",
    overview:
      "Commercial Video Ads are engineered around measurable ROAS. We combine psychological hook variations, problem-solution framing, customer social proof, and strong call-to-actions to maximize ad click-through rates.",
    points: [
      "Direct-Response Ad Creative Frameworks (Hook, Body, CTA)",
      "Multi-Hook Variation Shoots for A/B Ad Account Testing",
      "Format Variations for Feed (1:1), Story (9:16) & YouTube (16:9)",
      "Clear End-Screen CTA Overlays & Promo Code Displays",
    ],
  },
  {
    id: "drone-videography",
    title: "Drone Videography",
    short: "4K Aerial Cinematography",
    icon: Eye,
    image: droneVideographyRealImg,
    tagline: "Capture breathtaking 4K aerial drone perspectives of land, buildings, and events.",
    overview:
      "Aerial drone shots elevate video production value instantly. Our licensed drone pilots capture cinematic 4K aerial sweeps, real estate architectural passes, industrial site overviews, and outdoor event footage.",
    points: [
      "Licensed Pro Drone Pilots & 4K/60fps Aerial Cameras",
      "Cinematic Real Estate & Architecture Fly-Throughs",
      "Industrial Infrastructure, Resort & Site Overviews",
      "Smooth 3-Axis Gimbal Stabilization & Altitude Tracking",
    ],
  },
  {
    id: "video-editing",
    title: "Video Editing",
    short: "Post-Production Pacing",
    icon: Scissors,
    image: videoEditingRealImg,
    tagline: "Transform raw footage into polished, rhythmically paced video masterpieces.",
    overview:
      "Video Editing is where story magic comes together. Our post-production editors assemble footage, refine pacing, apply seamless transitions, layer sound effects (SFX), and polish audio to keep viewers hooked.",
    points: [
      "Multi-Camera Timeline Assembly & Beat-Matched Pacing",
      "Sound Design, Audio Ducking & SFX Layering",
      "Seamless Transition Effects & L/J Cut Pacing",
      "Multi-Aspect Ratio Re-Framing (16:9, 9:16, 1:1, 4:5)",
    ],
  },
  {
    id: "motion-graphics",
    title: "Motion Graphics",
    short: "2D & 3D Title Animations",
    icon: Sparkles,
    image: motionGraphicsRealImg,
    tagline: "Enhance videos with custom 2D/3D animated titles, lower thirds, and logo reveals.",
    overview:
      "Motion Graphics add visual flair and explain complex ideas visually. We design custom animated logos, 2D/3D title sequences, lower third overlays, animated infographics, and kinetic typography.",
    points: [
      "Custom 2D/3D Logo Reveal Animations & Brand Stingers",
      "Kinetic Typography, Lower Thirds & Callout Graphics",
      "Animated Data Visualizations & Explainer Diagrams",
      "VFX Compositing, Green Screen Keying & Alpha Channels",
    ],
  },
  {
    id: "color-grading",
    title: "Color Grading",
    short: "Cinematic Look & LUTs",
    icon: Palette,
    image: colorGradingRealImg,
    tagline: "Apply rich, cinematic color correction and grade for a Hollywood film look.",
    overview:
      "Color Grading defines the mood and quality perception of a video. We perform precise DaVinci Resolve color correction, skin tone balancing, contrast adjustments, and custom LUT color grading for a luxury look.",
    points: [
      "DaVinci Resolve Pro Color Correction & Exposure Balancing",
      "Natural Skin Tone Smoothing & Color Temperature Control",
      "Custom Cinematic LUT Creation & Mood Color Grading",
      "HDR Color Mastering & Rec.709 Broadcast Color Compliance",
    ],
  },
  {
    id: "voice-over-recording",
    title: "Voice-Over Recording",
    short: "Pro Voice Actors & Dubbing",
    icon: Mic,
    image: voiceOverRealImg,
    tagline: "Bring your video to life with professional voice actors and studio audio dubbing.",
    overview:
      "Professional audio makes or breaks a video. We cast professional voiceover artists across multiple languages, accents, and tones — recorded in acoustically treated studios with pristine mastering.",
    points: [
      "Global Voice-Over Talent Sourcing (Multiple Accents & Languages)",
      "Acoustically Treated Studio Recording & Clean De-Noising",
      "Audio Time-Sync to Video Edit Timelines",
      "Mastering for Broadcast, Web & Social Loudness Standards",
    ],
  },
];

function VideoProductionPage() {
  const [videoCount, setVideoCount] = useState(5);

  // View count calculation simulation
  const projectedViews = Math.round(videoCount * 48000);
  const projectedEngagement = Math.round(videoCount * 2600);

  return (
    <div className="relative">
      {/* Cinematic Hero Header */}
      <section className="ink-panel relative overflow-hidden py-20 lg:py-28">
        {/* Glowing luxury ambient background elements */}
        <div className="pointer-events-none absolute -top-40 -right-24 size-[40rem] rounded-full bg-gradient-to-br from-primary/30 via-rose-600/15 to-transparent blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute top-1/2 -left-32 size-[30rem] rounded-full bg-amber-500/10 blur-3xl animate-pulse-glow" />

        <div className="container-x relative z-10 grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Reveal direction="down">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary backdrop-blur-md shadow-[0_0_20px_rgba(225,29,72,0.3)]">
                <Sparkles className="size-3.5 animate-spin-slow" />
                <span>Video Production Suite</span>
              </div>
            </Reveal>

            <div className="mt-6">
              <TextReveal
                text="Cinematic 4K Video Production, Motion Graphics & Editing That Captivates Buyers"
                highlightWords={["Cinematic", "Video", "Production"]}
                highlightClass="italic text-primary"
                className="text-4xl font-extrabold sm:text-5xl lg:text-6xl text-white leading-[1.08]"
              />
            </div>

            <Reveal delay={200} direction="up">
              <p className="mt-6 max-w-xl text-ink-foreground/85 text-lg leading-relaxed">
                From scriptwriting, storyboarding, and corporate 4K shoots to drone videography, vertical Reels, motion graphics,
                color grading, and voice-over — we produce video content that wins market share.
              </p>
            </Reveal>

            <Reveal delay={300} direction="up">
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="button-shine inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-primary via-red-600 to-rose-600 px-8 py-4 font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-all duration-300 hover:scale-[1.04] hover:shadow-red-500/40"
                >
                  <Zap className="size-4" />
                  <span>Request Video Production Brief</span>
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="#video-pillars"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-md transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
                >
                  Explore 12 Pillars
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} direction="zoom">
            <div className="relative group overflow-hidden rounded-3xl border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-amber-500/30 blur-2xl opacity-60 transition-all duration-700 group-hover:opacity-90" />
              <img
                src={videoHeroImg}
                alt="Cinema 4K Video Production & Editing Suite Visual"
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
            { label: "Videos Produced", val: "1,200+" },
            { label: "Total Video Views", val: "25M+" },
            { label: "Camera Resolution", val: "4K / 8K Cinema" },
            { label: "Avg View Retention", val: "78%" },
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

      {/* 12 Video Production Pillars Detailed Breakdown */}
      <section id="video-pillars" className="container-x py-20 lg:py-28">
        <Reveal className="text-center">
          <h2 className="red-underline inline-block text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            12 Pillars of Video Production Excellence
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-muted-foreground text-lg">
            Complete end-to-end video production capabilities from initial concept script to final color-graded master.
          </p>
        </Reveal>

        <div className="mt-20 space-y-24">
          {videoPillars.map((pillar, index) => {
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
                      <span>Produce {pillar.title}</span>
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Video View & Impact Calculator */}
      <section className="border-t border-border/80 bg-surface/90 py-20 lg:py-28 backdrop-blur-md">
        <div className="container-x">
          <Reveal direction="zoom">
            <SpotlightCard className="p-8 sm:p-14 bg-gradient-to-r from-accent via-card to-accent border-primary/30 shadow-2xl">
              <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center">
                <div>
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                    <TrendingUp className="size-4" /> Interactive Video Reach Estimator
                  </div>
                  <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                    Estimate Video Campaign View Scale
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed text-base">
                    Adjust your monthly video production volume slider to project total video view reach and engagement.
                  </p>

                  <div className="mt-8 rounded-2xl border border-border bg-background p-6 shadow-inner">
                    <div className="flex justify-between items-center text-sm font-bold text-foreground">
                      <span>Monthly Video Deliverables:</span>
                      <span className="text-xl text-primary font-extrabold">
                        {videoCount} Video Assets / mo
                      </span>
                    </div>

                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="1"
                      value={videoCount}
                      onChange={(e) => setVideoCount(parseInt(e.target.value, 10))}
                      className="mt-4 w-full accent-primary cursor-pointer h-2.5 bg-border rounded-lg"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>1 Video</span>
                      <span>10 Videos</span>
                      <span>20+ Videos / mo</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="rounded-2xl border border-border bg-background/90 p-6 text-center shadow-lg backdrop-blur-md">
                    <Play className="mx-auto size-8 text-primary" />
                    <p className="mt-3 text-3xl font-extrabold text-foreground">
                      {projectedViews.toLocaleString()}+
                    </p>
                    <p className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wider">
                      Est. Total Video Views
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-background/90 p-6 text-center shadow-lg backdrop-blur-md">
                    <Video className="mx-auto size-8 text-rose-500" />
                    <p className="mt-3 text-3xl font-extrabold text-foreground">
                      {projectedEngagement.toLocaleString()}+
                    </p>
                    <p className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wider">
                      Est. Audience Engagements
                    </p>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </section>

      {/* Cinematic Bottom CTA Banner */}
      <section className="ink-panel relative overflow-hidden py-20 lg:py-28 text-center">
        <div className="container-x relative z-10">
          <Reveal direction="zoom">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Ready to Produce Cinema-Grade Video Content for Your Brand?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-ink-foreground/80 text-lg leading-relaxed">
              Schedule a creative video production brief with our director and post-production team today.
            </p>
            <Link
              to="/contact"
              className="button-shine mt-9 inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-primary via-red-600 to-rose-600 px-9 py-4 font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-all duration-300 hover:scale-[1.05]"
            >
              <span>Get Free Video Production Brief</span>
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
