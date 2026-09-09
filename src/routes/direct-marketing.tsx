import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Mail,
  MessageSquare,
  Smartphone,
  BellRing,
  Cpu,
  Zap,
  Send,
  PieChart,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { SpotlightCard } from "@/components/SpotlightCard";

const directHeroImg = "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1024&auto=format&fit=crop&q=80";
const emailMarketingRealImg = "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=1024&auto=format&fit=crop&q=80";
const whatsappMarketingRealImg = "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1024&auto=format&fit=crop&q=80";
const smsMarketingRealImg = "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=1024&auto=format&fit=crop&q=80";
const pushNotificationRealImg = "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=1024&auto=format&fit=crop&q=80";
const marketingAutomationRealImg = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1024&auto=format&fit=crop&q=80";

const title = "Direct Marketing Services — WhatsApp, Email, SMS & Automation | Zenelait Infotech";
const description =
  "Comprehensive Direct Marketing & Messaging Automation services by Zenelait Infotech: Email Marketing, WhatsApp Marketing, SMS Marketing, Push Notification Marketing, and Marketing Automation.";

export const Route = createFileRoute("/direct-marketing")({
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
  component: DirectMarketingPage,
});

const directChannels = [
  {
    id: "email-marketing",
    title: "Email Marketing",
    short: "Inbox Conversions & Drips",
    icon: Mail,
    image: emailMarketingRealImg,
    tagline: "Nurture subscriber relationships directly inside the inbox with high-open campaigns.",
    overview:
      "Email Marketing delivers direct, high-ROI communication with your target audience. We build automated welcome drips, segmented promotional broadcasts, weekly newsletters, and re-engagement campaigns optimized for maximum inbox deliverability.",
    points: [
      "Automated Welcome Drips & Lead Nurturing Sequences",
      "Segmented Promotional Campaigns & Behavioral Broadcasts",
      "Spam-Check Deliverability & Dedicated IP Warm-Up",
      "A/B Subject Line & Preview Text Open-Rate Optimization",
    ],
  },
  {
    id: "whatsapp-marketing",
    title: "WhatsApp Marketing",
    short: "WhatsApp Business API",
    icon: MessageSquare,
    image: whatsappMarketingRealImg,
    tagline: "Achieve 98% open rates with interactive WhatsApp Business API messaging.",
    overview:
      "WhatsApp is the world's most active messaging platform. We integrate WhatsApp Business API to send verified green-badge broadcast updates, interactive CTA template messages, automated order notifications, and instant lead qualifying bot flows.",
    points: [
      "Official WhatsApp Business API Setup & Green-Badge Verification",
      "Interactive Button & Quick-Reply Broadcast Templates",
      "Automated Order Updates, Invoices & Abandoned Cart Alerts",
      "Seamless Live Agent Handover with Conversation History",
    ],
  },
  {
    id: "sms-marketing",
    title: "SMS Marketing",
    short: "Instant Mobile Broadcasts",
    icon: Smartphone,
    image: smsMarketingRealImg,
    tagline: "Reach customers instantly on mobile devices with high-priority SMS broadcasts.",
    overview:
      "SMS Marketing delivers urgent, time-sensitive offers directly to mobile handsets. We manage DLT registration, compliant transactional OTPs, seasonal flash sales, personalized short URLs, and real-time delivery tracking.",
    points: [
      "DLT Registration & Regulatory Telecom Compliance",
      "High-Priority Transactional OTP & Alert Delivery",
      "Promotional Flash Sale Broadcasts with Trackable Short Links",
      "Real-Time Delivery Confirmation & Carrier Analytics",
    ],
  },
  {
    id: "push-notification",
    title: "Push Notification Marketing",
    short: "Web & Mobile App Alerts",
    icon: BellRing,
    image: pushNotificationRealImg,
    tagline: "Re-engage website visitors and app users with instant browser & app push alerts.",
    overview:
      "Push Notifications re-engage visitors even after they leave your website. We configure rich web browser push notifications and native mobile app push alerts triggered by user browsing activity, cart abandonments, or restock updates.",
    points: [
      "Web Browser & Native Mobile App Push Setup",
      "Behavioral Trigger Notifications (Browsing & Cart Abandonment)",
      "Rich Media Push with Images, Action Buttons & Emojis",
      "Automated Drip Push Journeys & Audience Segmentation",
    ],
  },
  {
    id: "marketing-automation",
    title: "Marketing Automation",
    short: "Multi-Channel Workflow Sync",
    icon: Cpu,
    image: marketingAutomationRealImg,
    tagline: "Orchestrate multi-channel messaging workflows wired straight into your CRM.",
    overview:
      "Marketing Automation connects Email, WhatsApp, SMS, and Push into a single intelligent engine. We build cross-channel workflows, lead scoring rules, and CRM sync mechanisms that nurture prospects automatically based on user intent signals.",
    points: [
      "Multi-Channel Automated Workflow Orchestration",
      "Lead Scoring Rules & High-Intent Conversion Triggers",
      "Bi-Directional CRM Synchronization & Data Mapping",
      "Cross-Channel Attribution & Campaign Revenue Dashboards",
    ],
  },
];

function DirectMarketingPage() {
  const [recipientScale, setRecipientScale] = useState(10);

  // ROI calculation simulation
  const projectedMessagesSent = Math.round(recipientScale * 5000);
  const projectedDirectLeads = Math.round(recipientScale * 180);

  return (
    <div className="relative">
      {/* Luxurious Hero Header */}
      <section className="ink-panel relative overflow-hidden py-20 lg:py-28">
        {/* Glowing luxury ambient background elements */}
        <div className="pointer-events-none absolute -top-40 -right-24 size-[40rem] rounded-full bg-gradient-to-br from-primary/30 via-rose-600/15 to-transparent blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute top-1/2 -left-32 size-[30rem] rounded-full bg-amber-500/10 blur-3xl animate-pulse-glow" />

        <div className="container-x relative z-10 grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Reveal direction="down">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary backdrop-blur-md shadow-[0_0_20px_rgba(225,29,72,0.3)]">
                <Sparkles className="size-3.5 animate-spin-slow" />
                <span>Direct Marketing Suite</span>
              </div>
            </Reveal>

            <div className="mt-6">
              <TextReveal
                text="Precision Direct Messaging & Automated Outreach That Drives Instant Sales"
                highlightWords={["Precision", "Direct", "Messaging"]}
                highlightClass="italic text-primary"
                className="text-4xl font-extrabold sm:text-5xl lg:text-6xl text-white leading-[1.08]"
              />
            </div>

            <Reveal delay={200} direction="up">
              <p className="mt-6 max-w-xl text-ink-foreground/85 text-lg leading-relaxed">
                Connect directly with buyers across Email, WhatsApp Business API, SMS, Push Notifications, and integrated
                Marketing Automation workflows engineered for maximum open rates and instant conversion.
              </p>
            </Reveal>

            <Reveal delay={300} direction="up">
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="button-shine inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-primary via-red-600 to-rose-600 px-8 py-4 font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-all duration-300 hover:scale-[1.04] hover:shadow-red-500/40"
                >
                  <Zap className="size-4" />
                  <span>Request Direct Outreach Audit</span>
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="#direct-channels"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-md transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
                >
                  Explore 5 Channels
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} direction="zoom">
            <div className="relative group overflow-hidden rounded-3xl border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-amber-500/30 blur-2xl opacity-60 transition-all duration-700 group-hover:opacity-90" />
              <img
                src={directHeroImg}
                alt="Direct Marketing Messaging Automation Dashboard Visual"
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
            { label: "WhatsApp Open Rate", val: "98%" },
            { label: "SMS Instant Delivery", val: "99.9%" },
            { label: "Email Inbox Rate", val: "99.2%" },
            { label: "Automation ROI Lift", val: "+240%" },
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

      {/* 5 Direct Marketing Channels Detailed Breakdown */}
      <section id="direct-channels" className="container-x py-20 lg:py-28">
        <Reveal className="text-center">
          <h2 className="red-underline inline-block text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            5 High-Converting Direct Messaging Channels
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-muted-foreground text-lg">
            Reach customers directly on their personal devices with personalized, automated messaging workflows.
          </p>
        </Reveal>

        <div className="mt-20 space-y-24">
          {directChannels.map((channel, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={channel.id}
                id={channel.id}
                className="grid gap-12 items-center lg:grid-cols-2 scroll-mt-28"
              >
                <Reveal
                  direction={isEven ? "left" : "right"}
                  className={isEven ? "lg:order-1" : "lg:order-2"}
                >
                  <div className="relative group overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                    <img
                      src={channel.image}
                      alt={channel.title}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="w-full object-cover h-[340px] sm:h-[420px] transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-6 flex flex-col justify-end">
                      <span className="self-start rounded-full bg-gradient-to-r from-primary to-rose-600 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                        {channel.short}
                      </span>
                      <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{channel.title}</h3>
                    </div>
                  </div>
                </Reveal>

                <Reveal
                  direction={isEven ? "right" : "left"}
                  className={isEven ? "lg:order-2" : "lg:order-1"}
                >
                  <div className="flex size-13 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm mb-5 border border-primary/20">
                    <channel.icon className="size-6" />
                  </div>
                  <h3 className="text-3xl font-extrabold sm:text-4xl">{channel.title}</h3>
                  <p className="mt-3 text-lg font-semibold text-primary">{channel.tagline}</p>
                  <p className="mt-4 text-muted-foreground leading-relaxed text-base">
                    {channel.overview}
                  </p>

                  <ul className="mt-7 space-y-3.5">
                    {channel.points.map((pt) => (
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
                      <span>Scale {channel.title} Outreach</span>
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Messaging Reach & Conversion Calculator */}
      <section className="border-t border-border/80 bg-surface/90 py-20 lg:py-28 backdrop-blur-md">
        <div className="container-x">
          <Reveal direction="zoom">
            <SpotlightCard className="p-8 sm:p-14 bg-gradient-to-r from-accent via-card to-accent border-primary/30 shadow-2xl">
              <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center">
                <div>
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                    <TrendingUp className="size-4" /> Interactive Direct Outreach Estimator
                  </div>
                  <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                    Estimate Messaging Conversion Power
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed text-base">
                    Adjust your subscriber broadcast volume slider to project instant open velocity and lead conversion volume.
                  </p>

                  <div className="mt-8 rounded-2xl border border-border bg-background p-6 shadow-inner">
                    <div className="flex justify-between items-center text-sm font-bold text-foreground">
                      <span>Broadcast Volume:</span>
                      <span className="text-xl text-primary font-extrabold">
                        {recipientScale}k Audience Contacts
                      </span>
                    </div>

                    <input
                      type="range"
                      min="1"
                      max="50"
                      step="1"
                      value={recipientScale}
                      onChange={(e) => setRecipientScale(parseInt(e.target.value, 10))}
                      className="mt-4 w-full accent-primary cursor-pointer h-2.5 bg-border rounded-lg"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>1,000</span>
                      <span>25,000</span>
                      <span>50,000+ Contacts</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="rounded-2xl border border-border bg-background/90 p-6 text-center shadow-lg backdrop-blur-md">
                    <Send className="mx-auto size-8 text-primary" />
                    <p className="mt-3 text-3xl font-extrabold text-foreground">
                      {projectedMessagesSent.toLocaleString()}+
                    </p>
                    <p className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wider">
                      Est. Instant Opens
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-background/90 p-6 text-center shadow-lg backdrop-blur-md">
                    <PieChart className="mx-auto size-8 text-rose-500" />
                    <p className="mt-3 text-3xl font-extrabold text-foreground">
                      {projectedDirectLeads.toLocaleString()}+
                    </p>
                    <p className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wider">
                      Est. Customer Conversions
                    </p>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </section>

      {/* Luxurious Bottom CTA Banner */}
      <section className="ink-panel relative overflow-hidden py-20 lg:py-28 text-center">
        <div className="container-x relative z-10">
          <Reveal direction="zoom">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Ready to Automate Customer Outreach & Scale Sales?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-ink-foreground/80 text-lg leading-relaxed">
              Let us design an automated messaging architecture for your business.
            </p>
            <Link
              to="/contact"
              className="button-shine mt-9 inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-primary via-red-600 to-rose-600 px-9 py-4 font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-all duration-300 hover:scale-[1.05]"
            >
              <span>Get Free Direct Outreach Strategy</span>
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
