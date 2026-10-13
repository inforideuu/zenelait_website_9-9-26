import { useState, useEffect } from "react";
import {
  Activity,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Server,
  Zap,
  Globe2,
  Cpu,
  RefreshCw,
  ExternalLink,
  Layers,
  ArrowUpRight
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

interface NodeStatus {
  name: string;
  region: string;
  latency: number;
  uptime: string;
  status: "operational" | "degraded" | "maintenance";
}

const NODES: NodeStatus[] = [
  { name: "Core API & Cloud Gateway", region: "AWS ap-south-1 (Mumbai)", latency: 18, uptime: "99.99%", status: "operational" },
  { name: "Global Edge CDN & DNS", region: "Cloudflare Edge (Anycast)", latency: 12, uptime: "100.0%", status: "operational" },
  { name: "PostgreSQL & Vector Clusters", region: "AWS RDS Multi-AZ", latency: 24, uptime: "99.98%", status: "operational" },
  { name: "AI Inference & LLM Pipelines", region: "NVIDIA H100 Clusters", latency: 45, uptime: "99.95%", status: "operational" },
];

export function GlobalInfrastructureStatusBadge() {
  const [lastChecked, setLastChecked] = useState<string>("Just now");
  const [pulseCount, setPulseCount] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseCount((prev) => prev + 1);
      setLastChecked("Just now");
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden py-12 lg:py-16 bg-slate-950 text-white border-t border-slate-800" id="infrastructure-status">
      {/* Background Lighting Glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-96 rounded-full bg-emerald-500/10 blur-[100px]" />
      
      <div className="container-x relative z-10 max-w-7xl mx-auto">
        <Reveal direction="up">
          <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl">
            {/* Top Bar: Live Status & Main Metrics */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-4">
                {/* Live Pulsing Radar Beacon */}
                <div className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 border border-emerald-500/30">
                  <span className="size-3 rounded-full bg-emerald-400 animate-ping absolute" />
                  <span className="size-3 rounded-full bg-emerald-400 relative z-10" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-emerald-400" />
                      All Systems Operational
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <RefreshCw className="size-3 text-slate-500 animate-spin" style={{ animationDuration: '6s' }} />
                      Checked {lastChecked}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1 tracking-tight">
                    Live Global Infrastructure & Uptime Telemetry
                  </h3>
                </div>
              </div>

              {/* 3 Executive Metric Badges */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 shrink-0">
                <div className="p-3 sm:px-4 sm:py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Avg. Uptime</span>
                  <span className="text-base sm:text-lg font-black text-emerald-400 font-mono">99.98%</span>
                </div>

                <div className="p-3 sm:px-4 sm:py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Incident SLA</span>
                  <span className="text-base sm:text-lg font-black text-white font-mono">&lt;15 Mins</span>
                </div>

                <div className="p-3 sm:px-4 sm:py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Global Nodes</span>
                  <span className="text-base sm:text-lg font-black text-[#ff5252] font-mono">100% Green</span>
                </div>
              </div>
            </div>

            {/* Sub-grid: 4 Live Regional Node Monitors */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {NODES.map((node) => (
                <div
                  key={node.name}
                  className="group relative p-4 rounded-2xl border border-slate-800/80 bg-slate-950/60 transition-all duration-300 hover:border-emerald-500/40 hover:bg-slate-950"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-white">
                      <span className="size-2 rounded-full bg-emerald-400 group-hover:animate-pulse" />
                      {node.name}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      {node.uptime}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 truncate font-mono">
                    {node.region}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="size-3 text-slate-500" />
                      Latency: <strong className="text-slate-200">{node.latency}ms</strong>
                    </span>
                    <span className="text-emerald-400 font-bold uppercase">Operational</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Assurance Strip */}
            <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <ShieldCheck className="size-4 text-emerald-400" />
                  Enterprise 24/7/365 On-Call SRE & DevOps Coverage
                </span>
                <span className="hidden sm:inline text-slate-700">•</span>
                <span className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                  <Server className="size-3.5 text-rose-500" />
                  Automated Health Heartbeat: Active
                </span>
              </div>

              <span className="text-[11px] font-mono text-slate-400">
                Zenelait SRE Status Page v3.2
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
