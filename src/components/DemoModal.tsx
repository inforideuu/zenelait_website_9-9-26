import { useState } from "react";
import { X, Send, Sparkles, CheckCircle } from "lucide-react";
import { itProducts, nonItProducts } from "@/data/products";
import { submitDemoRequest } from "@/lib/api";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
}

export function DemoModal({ isOpen, onClose, defaultProduct }: DemoModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

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
      console.error("Failed submitting demo request to API:", err);
    }

    const text = `*New Request a Demo Enquiry*\n\n*Name:* ${name}\n*Company:* ${company || "N/A"}\n*Email:* ${email}\n*Phone:* ${phone}\n*Interested in:* ${interest}\n*Requirement:* ${message}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=919884264816&text=${encodeURIComponent(text)}`;

    setSubmitting(false);
    setSent(true);
    window.open(whatsappUrl, "_blank");
  };

  const handleReset = () => {
    setSent(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border/80 bg-card p-6 sm:p-8 text-card-foreground shadow-[0_25px_60px_rgba(0,0,0,0.3)] z-10 animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 size-9 rounded-full border border-border bg-secondary text-muted-foreground flex items-center justify-center hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all duration-200 cursor-pointer"
        >
          <X className="size-5" />
        </button>

        {sent ? (
          <div className="flex flex-col items-center py-8 text-center animate-in zoom-in duration-300">
            <div className="flex size-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10 animate-bounce">
              <CheckCircle className="size-10" />
            </div>
            <h3 className="mt-6 text-2xl font-black text-foreground">Demo Request Sent!</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Opening WhatsApp to send your enquiry directly to <strong className="text-foreground">+91 98842 64816</strong>.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-6 rounded-full bg-[#ff5252] px-7 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#e03e3e] transition-all cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="size-2 rounded-full bg-[#ff5252] animate-ping" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#ff5252]">
                ZENELAIT InfoTech DEMO DESK
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Request a <span className="text-[#ff5252]">Live Demo</span>
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground">
              Fill out the details below. Submitting will send your request straight to WhatsApp.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold text-foreground">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-[#ff5252] focus:ring-1 focus:ring-[#ff5252]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-foreground">Company</label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Acme Inc."
                    className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-[#ff5252] focus:ring-1 focus:ring-[#ff5252]"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold text-foreground">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="john@company.com"
                    className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-[#ff5252] focus:ring-1 focus:ring-[#ff5252]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-foreground">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98842 64816"
                    className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-[#ff5252] focus:ring-1 focus:ring-[#ff5252]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-foreground">Product / Service *</label>
                <select
                  name="interest"
                  defaultValue={defaultProduct || "Customer Relationship Management (CRM)"}
                  className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-xs text-foreground outline-none focus:border-[#ff5252] focus:ring-1 focus:ring-[#ff5252]"
                >
                  <optgroup label="IT Products">
                    {itProducts.map((p) => (
                      <option key={p.short} value={p.name}>
                        {p.name} ({p.short})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Marketing Services">
                    {nonItProducts.map((p) => (
                      <option key={p.short} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-foreground">Requirement / Goals *</label>
                <textarea
                  name="message"
                  rows={3}
                  required
                  placeholder="Tell us about your team size, key goals or features needed..."
                  className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-[#ff5252] focus:ring-1 focus:ring-[#ff5252]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#ff5252] py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-rose-500/25 hover:bg-[#e03e3e] transition-all duration-300 cursor-pointer active:scale-95 disabled:opacity-60"
              >
                <span>{submitting ? "Opening WhatsApp..." : "Send Request via WhatsApp"}</span>
                <Send className="size-4" />
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
