import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Mail, MapPin, Phone, Send, Sparkles, CheckCircle } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { SpotlightCard } from "@/components/SpotlightCard";
import { itProducts, nonItProducts } from "@/data/products";
import { submitDemoRequest } from "@/lib/api";

const title = "Contact Zenelait Infotech — Request a Demo";
const description =
  "Talk to Zenelait Infotech about CRM, ERP, LMS, billing software, websites, AI chatbots or a digital marketing programme. Request a demo or a growth plan.";

export const Route = createFileRoute("/contact")({
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
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const company = formData.get("company") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const interest = formData.get("interest") as string;
    const message = formData.get("message") as string;

    try {
      await submitDemoRequest({
        name,
        company,
        email,
        phone,
        service: interest,
        message,
        status: "Pending"
      });
    } catch (err) {
      console.error("Error submitting demo request to API:", err);
    }

    const text = `*New Request a Demo Enquiry*\n\n*Name:* ${name}\n*Company:* ${company || "N/A"}\n*Email:* ${email}\n*Phone:* ${phone}\n*Interested in:* ${interest}\n*Requirement:* ${message}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=919884264816&text=${encodeURIComponent(text)}`;

    setSubmitting(false);
    setSent(true);
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div>
      {/* Hero Banner Header matching About Us reference design */}
      <section className="relative min-h-[580px] w-full overflow-hidden rounded-xl bg-[#0d090b] text-white lg:min-h-[620px] mb-12">
        {/* Background Image with Overlays */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&auto=format&fit=crop&q=80"
            alt="Zenelait Contact & Client Advisory Desk"
            className="h-full w-full object-cover object-[65%_center] opacity-90"
          />
          {/* Dark left-to-right gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d090b] via-[#0d090b]/85 to-[#0d090b]/20" />
          {/* Bottom gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d090b]/75 via-transparent to-[#0d090b]/20" />
        </div>

        {/* Content */}
        <div className="container-x relative z-10 flex min-h-[580px] items-center py-16 lg:min-h-[620px]">
          <div className="max-w-[620px]">
            {/* Tag Badge */}
            <Reveal direction="down">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-black/40 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
                <Sparkles className="size-3.5" />
                <span>Contact & Advisory</span>
              </div>
            </Reveal>

            {/* Main Headline */}
            <Reveal delay={100} direction="up">
              <h1 className="mt-6 text-4xl font-black leading-[1.03] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[72px]">
                Let's Discuss Your <br />
                Business Goals & <br />
                <span className="text-primary">Requirements</span>
              </h1>
            </Reveal>

            {/* Description Subtext */}
            <Reveal delay={200} direction="up">
              <p className="mt-6 max-w-[520px] text-base font-medium leading-relaxed text-white/75 sm:text-lg">
                Tell us about your business vision, software roadmap, or growth targets. Our senior engineering and strategy directors respond with actionable execution plans within one business day.
              </p>
            </Reveal>

            {/* Dual Action Buttons */}
            <Reveal delay={300} direction="up">
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#contact-form"
                  className="inline-flex items-center justify-center rounded-sm bg-primary px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90 hover:shadow-primary/50"
                >
                  Send Proposal Brief
                </a>

                <a
                  href="tel:+919884264816"
                  className="inline-flex items-center justify-center rounded-sm border border-white/40 bg-black/20 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white/10"
                >
                  Call +91 98842 64816
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Main Form & Contact Information Grid */}
      <section id="contact-form" className="container-x py-12 lg:py-16">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] items-start">
          <div>
            <Reveal direction="down">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary backdrop-blur-md">
                <Sparkles className="size-3.5" />
                <span>Get In Touch</span>
              </div>
            </Reveal>

            <div className="mt-6">
              <TextReveal
                text="Send us your inquiry details"
                highlightWords={["inquiry", "details"]}
                highlightClass="italic text-primary"
                className="text-3xl font-extrabold sm:text-4xl lg:text-5xl"
              />
            </div>

            <Reveal delay={200} direction="up">
              <p className="mt-4 text-muted-foreground text-base leading-relaxed">
                Tell us about your business and what you want to fix or grow. We will come back with a
                recommendation, a timeline and a clear price.
              </p>
            </Reveal>

            <Reveal delay={300} direction="up">
              <ul className="mt-10 space-y-6">
                <li className="group flex items-start gap-4 p-4 rounded-xl border border-transparent hover:border-border hover:bg-card/50 transition-all duration-300">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground shadow-sm">
                    <Phone className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-lg font-bold text-foreground">+91 98842 64816</p>
                    <p className="text-sm text-muted-foreground">Mon&ndash;Sat, 9:30 am to 7:00 pm IST</p>
                  </div>
                </li>

                <li className="group flex items-start gap-4 p-4 rounded-xl border border-transparent hover:border-border hover:bg-card/50 transition-all duration-300">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground shadow-sm">
                    <Mail className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-lg font-bold text-foreground">Info@zenelaitinfotech.com</p>
                    <p className="text-sm text-muted-foreground">We reply within one working day</p>
                  </div>
                </li>

                <li className="group flex items-start gap-4 p-4 rounded-xl border border-transparent hover:border-border hover:bg-card/50 transition-all duration-300">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground shadow-sm">
                    <MapPin className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-lg font-bold text-foreground">Zenelait Infotech</p>
                    <p className="text-sm text-muted-foreground">Chennai, India</p>
                  </div>
                </li>
              </ul>
            </Reveal>
          </div>

          <Reveal delay={150} direction="zoom">
            <SpotlightCard className="p-8 sm:p-10 shadow-xl border-primary/20" enableTilt={false}>
              {sent ? (
                <div className="flex flex-col items-center py-14 text-center animate-in zoom-in duration-300">
                  <div className="flex size-16 items-center justify-center rounded-full bg-primary/15 text-primary shadow-[0_0_20px_rgba(225,29,72,0.4)] animate-bounce">
                    <CheckCircle className="size-10 text-primary" />
                  </div>
                  <h2 className="mt-6 text-3xl font-extrabold">Thank you!</h2>
                  <p className="mt-3 max-w-sm text-muted-foreground text-base leading-relaxed">
                    Your enquiry has been noted. Our product and growth team will reach out shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-8 rounded-lg border border-border px-6 py-2.5 font-semibold transition-all duration-300 hover:border-primary hover:text-primary active:scale-95"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="flex items-center justify-between border-b border-border/80 pb-4">
                    <h2 className="text-2xl font-bold">Request a Demo</h2>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      Response within 24h
                    </span>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" name="name" placeholder="John Doe" />
                    <Field label="Company" name="company" placeholder="Acme Inc." required={false} />
                    <Field label="Email" name="email" type="email" placeholder="john@acme.com" />
                    <Field label="Phone" name="phone" type="tel" placeholder="+91 98765 43210" />
                  </div>

                  <div>
                    <label htmlFor="interest" className="mb-2 block text-sm font-semibold text-foreground">
                      Interested in
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm font-medium outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <optgroup label="IT Products">
                        {itProducts.map((p) => (
                          <option key={p.short}>{p.name}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Marketing Services">
                        {nonItProducts.map((p) => (
                          <option key={p.short}>{p.name}</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-semibold text-foreground">
                      Your requirement
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Tell us about your team size, key goals or existing setup..."
                      className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="button-shine group w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary via-red-600 to-rose-600 px-6 py-3.5 font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-all duration-300 hover:scale-[1.02] hover:shadow-red-500/30 active:scale-95 disabled:opacity-70"
                  >
                    <span>{submitting ? "Submitting..." : "Submit enquiry"}</span>
                    <Send className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </button>
                </form>
              )}
            </SpotlightCard>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-semibold text-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
