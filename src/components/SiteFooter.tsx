import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { itProducts, nonItProducts } from "@/data/products";

export function SiteFooter() {
  return (
    <footer className="ink-panel relative mt-24 overflow-hidden rounded-t-[2.5rem] sm:rounded-t-[3.5rem] lg:rounded-t-[4.5rem] border-t border-white/15 shadow-[0_-15px_40px_rgba(0,0,0,0.25)]">
      {/* Background glow orb */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[36rem] rounded-full bg-primary/10 blur-3xl" />

      {/* Main footer contents */}
      <div className="container-x relative z-10 pt-16 pb-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img
              src={'zenelaitinfotech_logo.png'}
              alt="Zenelait Infotech"
              width={1250}
              height={490}
              className="h-20 w-auto transition-filter duration-300 group-hover:brightness-110 sm:h-15"
              style={{ borderRadius: '10px' }}
            />
            <p className="mt-5 max-w-xs text-ink-foreground/75 leading-relaxed text-sm text-justify">
              Zenelait Infotech transforms complex business challenges into intelligent, scalable digital solutions. From strategy to execution, we help organisations innovate, grow, and lead with confidence.
            </p>
            <div className="mt-4">
              <Link
                to="/careers"
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3.5 py-1 text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-white"
              >
                <span>We're Hiring! Explore Careers</span>
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-primary">IT Products</h3>
            <ul className="mt-4 space-y-2.5 text-ink-foreground/80">
              {itProducts.map((p) => (
                <li key={p.short}>
                  <Link
                    to="/it-products"
                    className="story-link text-sm transition-colors hover:text-white"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-primary">Marketing Services</h3>
            <ul className="mt-4 space-y-2.5 text-ink-foreground/80">
              {nonItProducts.slice(0, 7).map((p) => (
                <li key={p.short}>
                  <Link
                    to={
                      p.short === "SEM"
                        ? "/search-engine-marketing"
                        : p.short === "Paid Ads"
                        ? "/paid-advertising"
                        : p.short === "Social" || p.short === "SMM"
                        ? "/social-media-marketing"
                        : p.short === "Content"
                        ? "/content-marketing"
                        : p.short === "Direct"
                        ? "/direct-marketing"
                        : p.short === "Leads"
                        ? "/lead-generation"
                        : p.short === "Brand" || p.short === "Branding"
                        ? "/brand-management"
                        : p.short === "Analytics" || p.short === "Reporting"
                        ? "/analytics-reporting"
                        : p.short === "Video" || p.short === "Video Production"
                        ? "/video-production"
                        : p.short === "Design" || p.short === "Graphic Design"
                        ? "/graphic-design"
                        : "/marketing"
                    }
                    className="story-link text-sm transition-colors hover:text-white"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-primary">Reach Us</h3>
            <ul className="mt-4 space-y-3.5 text-ink-foreground/80 text-sm">
              <li className="group flex items-center gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                  <Phone className="size-4" />
                </div>
                <span>+91 98842 64816</span>
              </li>
              <li className="group flex items-center gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                  <Mail className="size-4" />
                </div>
                <span className="truncate">Info@zenelaitinfotech.com</span>
              </li>
              <li className="group flex items-center gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                  <MapPin className="size-4" />
                </div>
                <span>Chennai, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Horizontal Line & Bottom Copyright Section with Changed Background Color */}
      <div className="relative z-10 border-t border-white/15 bg-black/40 py-6 backdrop-blur-md">
        <div className="container-x flex flex-col items-center justify-between gap-3 text-sm text-ink-foreground/60 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Zenelait Infotech. All rights reserved.</p>
          <p className="text-xs text-ink-foreground/50">Built with care in India.</p>
        </div>
      </div>
    </footer>
  );
}
