import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Shield } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const title = "Admin Login — Zenelait Infotech";
const description = "Sign in to access your admin dashboard and manage your platform.";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigate({ to: "/admin" });
    }, 600);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0b090c] text-slate-900 dark:text-white flex items-center justify-center font-['Outfit',sans-serif] -mt-1 pt-10">
      
      {/* Full Screen Uncropped Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/login-bg.png"
          alt="Zenelait Infotech Admin Login Layout"
          className="w-full h-full object-cover object-top opacity-100"
        />
      </div>

      {/* Main Container overlay positioned over the right card area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex justify-center lg:justify-end items-center px-4 sm:px-8 lg:pr-16 py-12">
        
        {/* Interactive Frosted Glass Login Card */}
        <Reveal direction="zoom" className="w-full max-w-[420px]">
          <div className="relative w-full rounded-[36px] border border-white/90 dark:border-white/20 bg-white/85 dark:bg-slate-900/85 p-7 sm:p-9 backdrop-blur-2xl shadow-[0_30px_90px_rgba(255,42,56,0.28)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.6)]">
            
            {/* Back to Home Button & Card Sub-Header */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-[#ff2a38] dark:hover:text-[#ff2a38] hover:border-[#ff2a38]/30 transition-all shadow-2xs"
              >
                <ArrowLeft className="size-3.5" />
                <span>Back to Home</span>
              </Link>

              <div className="flex items-center gap-1.5">
                <span className="h-0.5 w-2 bg-[#ff2a38]" />
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#ff2a38]">
                  ADMIN
                </span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white text-center sm:text-left">
              Admin <span className="text-[#ff2a38]">Login</span>
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium text-center sm:text-left">
              Sign in to access your admin dashboard and manage your platform.
            </p>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="mt-7 space-y-4">
              
              {/* Email Address Field */}
              <div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/70 pl-11 pr-4 py-3.5 text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-all focus:border-[#ff2a38] focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-[#ff2a38]/20 shadow-xs"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/70 pl-11 pr-11 py-3.5 text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-all focus:border-[#ff2a38] focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-[#ff2a38]/20 shadow-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password Row */}
              <div className="flex items-center justify-between text-xs font-semibold pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="size-4 rounded-md border-slate-300 text-[#ff2a38] focus:ring-[#ff2a38] accent-[#ff2a38]"
                  />
                  <span>Remember me</span>
                </label>

                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Password reset instructions sent to your email.");
                  }}
                  className="text-[#ff2a38] hover:underline font-bold"
                >
                  Forgot password?
                </a>
              </div>

              {/* Main Red Login Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ff2a38] via-red-600 to-rose-600 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-rose-500/35 hover:scale-[1.02] hover:shadow-rose-500/50 transition-all duration-300 cursor-pointer active:scale-95 disabled:opacity-70 mt-2"
              >
                <span>{submitting ? "Signing In..." : "Login"}</span>
                <ArrowRight className="size-4 stroke-[2.5]" />
              </button>

              {/* Secure Access Footer */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-rose-50/60 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/30 text-[11px] mt-3">
                <div className="size-7 rounded-xl bg-[#ff2a38] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Shield className="size-3.5" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    Secure Access
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Your data is protected with enterprise-grade security.
                  </p>
                </div>
              </div>

            </form>
          </div>
        </Reveal>
      </div>

    </div>
  );
}
