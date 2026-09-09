import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, Star, Quote, Sparkles, Building2, TrendingUp, Users } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SpotlightCard } from "@/components/SpotlightCard";
import { getTestimonials, Testimonial as ApiTestimonial } from "@/lib/api";

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  quote: string;
  metric: string;
  avatar: string;
  industry: string;
};

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rajesh Varma",
    role: "Chief Executive Officer",
    company: "OmniLogistics India",
    rating: 5,
    quote:
      "Zenelait Infotech transformed our multi-warehouse inventory and billing pipelines into a unified real-time system. Their team delivered in record time with zero business disruption.",
    metric: "+38% Operational Speed",
    industry: "Supply Chain & ERP",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    name: "Ananya Sundaram",
    role: "VP of Digital Growth",
    company: "AeroTech Solutions",
    rating: 5,
    quote:
      "The paid advertising campaigns and landing pages built by Zenelait reduced our Cost Per Lead by 42% in just two months. The ROI tracking dashboards are exceptionally clear.",
    metric: "-42% Cost Per Lead",
    industry: "Enterprise Growth",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "3",
    name: "Dr. Vikramaditya Rao",
    role: "Founder & Chairman",
    company: "Apex EdTech Network",
    rating: 5,
    quote:
      "Our Learning Management System and AI Chatbot serve over 50,000 active students daily with zero downtime. Zenelait's software architecture and ongoing support are world-class.",
    metric: "99.99% Platform Uptime",
    industry: "EdTech & LMS",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
];

export function TestimonialSection({ page = "home" }: { page?: "home" | "it_products" }) {
  const [list, setList] = useState<Testimonial[]>(defaultTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    getTestimonials(page)
      .then(apiData => {
        if (apiData && apiData.length > 0) {
          const mapped: Testimonial[] = apiData.map(t => ({
            id: String(t.id),
            name: t.author,
            role: t.role,
            company: t.company || "",
            rating: t.rating || 5,
            quote: t.content,
            metric: t.metric || "Verified Client Impact",
            industry: t.industry || (t.page === "home" ? "Growth & Engineering" : "IT Product"),
            avatar: t.avatar_url || ""
          }));
          setList(mapped);
        }
      })
      .catch(() => {});
  }, [page]);

  const total = list.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto slide every 6s unless paused
  useEffect(() => {
    if (!isAutoPlaying || total === 0) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide, total]);

  const getIndices = () => {
    if (total === 0) return { prev: 0, current: 0, next: 0 };
    const prev = (currentIndex - 1 + total) % total;
    const current = currentIndex;
    const next = (currentIndex + 1) % total;
    return { prev, current, next };
  };

  const { prev, current, next } = getIndices();
  const activeTestimonial = list[current];
  const prevTestimonial = list[prev];
  const nextTestimonial = list[next];

  if (!activeTestimonial || !prevTestimonial || !nextTestimonial) return null;

  return (
    <section
      className="relative overflow-hidden bg-[#09070c] py-20 lg:py-28 text-white select-none"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Dark Red Radial Gradient Glows matching image */}
      <div className="pointer-events-none absolute -top-24 -left-24 size-[32rem] rounded-full bg-[#ff5252]/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 size-[36rem] rounded-full bg-[#ff5252]/20 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[45rem] rounded-full bg-[#e01e37]/10 blur-[150px]" />

      <div className="container-x relative z-10">
        {/* Section Header & Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <Reveal direction="down">
              {/* CLIENT SUCCESS STORIES Pill Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ff5252] backdrop-blur-md">
                <Users className="size-3.5" />
                <span>CLIENT SUCCESS STORIES</span>
              </div>
            </Reveal>

            <div className="mt-4">
              <Reveal direction="up" delay={100}>
                <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl tracking-tight text-white">
                  Trusted by <span className="text-[#ff5252]">Enterprise Leaders</span>
                </h2>
              </Reveal>
            </div>
            <Reveal direction="up" delay={150}>
              <p className="mt-3 text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
                See how global organizations scale software engineering and pipeline velocity with Zenelait Infotech.
              </p>
            </Reveal>
          </div>

          {/* Top-Right Circular Navigation Buttons (← and →) */}
          <Reveal direction="left" delay={200}>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous Testimonial"
                className="flex size-12 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/80 text-white transition-all duration-300 hover:border-[#ff5252] hover:bg-[#ff5252] hover:shadow-[0_0_20px_rgba(255,82,82,0.4)] active:scale-95 cursor-pointer"
              >
                <ArrowLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next Testimonial"
                className="flex size-12 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/80 text-white transition-all duration-300 hover:border-[#ff5252] hover:bg-[#ff5252] hover:shadow-[0_0_20px_rgba(255,82,82,0.4)] active:scale-95 cursor-pointer"
              >
                <ArrowRight className="size-5" />
              </button>
            </div>
          </Reveal>
        </div>

        {/* 3-Card Carousel Layout matching exact reference image */}
        <div className="mt-14 grid items-center gap-6 lg:grid-cols-12">
          
          {/* Left Preview Dark Card (3 cols) */}
          <div
            onClick={prevSlide}
            className="hidden lg:block lg:col-span-3 cursor-pointer transition-all duration-500 hover:scale-[1.02]"
          >
            <div className="relative rounded-3xl border border-slate-800/80 bg-slate-950/70 p-6 backdrop-blur-md shadow-2xl min-h-[280px] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current text-amber-400" />
                  ))}
                  <Star className="size-4 fill-slate-700 text-slate-700" />
                </div>
                <p className="mt-4 text-xs font-normal text-slate-300 leading-relaxed italic line-clamp-4">
                  "{prevTestimonial.quote}"
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-800/60 pt-4">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{prevTestimonial.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{prevTestimonial.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center Active Featured Card (White Popout with Neon Red Glow) (6 cols) */}
          <div className="lg:col-span-6 transition-all duration-500">
            <div className="relative rounded-3xl bg-white p-8 sm:p-10 text-slate-900 shadow-[0_0_50px_rgba(255,82,82,0.4)] ring-4 ring-rose-500/30">
              
              {/* Top Star Rating Pill & Metric Green Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3.5 py-1 rounded-full">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1 text-xs font-bold text-amber-700">5.0</span>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1 text-xs font-bold text-emerald-600">
                  <TrendingUp className="size-3.5 text-emerald-600" />
                  <span>{activeTestimonial.metric}</span>
                </span>
              </div>

              {/* Quote Icon & Body Text */}
              <div className="relative mt-6">
                <Quote className="absolute -top-3 -left-2 size-10 text-rose-200 rotate-180 pointer-events-none" />
                <blockquote className="pl-6 text-base sm:text-lg font-medium leading-relaxed text-slate-800 italic">
                  "{activeTestimonial.quote}"
                </blockquote>
              </div>

              {/* Client Profile Footer */}
              <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 leading-snug">{activeTestimonial.name}</h3>
                  <p className="text-xs font-bold text-rose-500">{activeTestimonial.role}</p>
                  {activeTestimonial.company && (
                    <p className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <Building2 className="size-3 text-slate-400" />
                      <span>{activeTestimonial.company}</span>
                    </p>
                  )}
                </div>

                <span className="rounded-full bg-rose-50 border border-rose-100 px-4 py-1.5 text-xs font-extrabold text-rose-600">
                  {activeTestimonial.industry || "Growth & Engineering"}
                </span>
              </div>

            </div>
          </div>

          {/* Right Preview Dark Card (3 cols) */}
          <div
            onClick={nextSlide}
            className="hidden lg:block lg:col-span-3 cursor-pointer transition-all duration-500 hover:scale-[1.02]"
          >
            <div className="relative rounded-3xl border border-slate-800/80 bg-slate-950/70 p-6 backdrop-blur-md shadow-2xl min-h-[280px] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current text-amber-400" />
                  ))}
                  <Star className="size-4 fill-slate-700 text-slate-700" />
                </div>
                <p className="mt-4 text-xs font-normal text-slate-300 leading-relaxed italic line-clamp-4">
                  "{nextTestimonial.quote}"
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-800/60 pt-4">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{nextTestimonial.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{nextTestimonial.role}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Dot Pagination Bar: ● ○ ○ ○ matching reference screenshot */}
        <div className="mt-12 flex items-center justify-center gap-2.5">
          {list.map((t: Testimonial, idx: number) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentIndex === idx
                  ? "w-8 h-2.5 bg-[#ff5252] shadow-[0_0_12px_rgba(255,82,82,0.8)]"
                  : "size-2.5 bg-slate-700 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
