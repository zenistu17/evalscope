import { Badge } from "@/components/ui/badge";
import { ArrowDown, Telescope } from "lucide-react";
import { useEffect, useState } from "react";

function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <>{count.toLocaleString()}{suffix}</>;
}

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[conic-gradient(at_top_right,_#0f172a,_#1e1b4b,_#312e81,_#1e1b4b,_#0f172a)]" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-24 text-white w-full">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25">
                <Telescope className="h-7 w-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold tracking-tight">EvalScope</span>
                <span className="block text-xs text-indigo-300/80 tracking-wider uppercase">by Parsewave</span>
              </div>
            </div>

            <Badge className="mb-6 bg-white/5 text-indigo-300 border-indigo-400/20 backdrop-blur-sm px-4 py-1.5 text-sm font-medium">
              The Benchmark for Benchmarks
            </Badge>

            <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-6 leading-[1.05]">
              Not all
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                benchmarks
              </span>
              <br />
              are equal.
            </h1>

            <p className="text-lg text-slate-400 max-w-lg mb-10 leading-relaxed">
              We analyzed 8 leading AI evaluation frameworks to find which ones
              actually measure real professional work — and which ones are just
              glorified quizzes.
            </p>

            <a
              href="#metrics"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
            >
              <ArrowDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
              See the data
            </a>
          </div>

          {/* Animated stats panel */}
          <div className="hidden lg:grid grid-cols-2 gap-3 w-[340px]">
            <StatCard value={213} label="Expert Tasks" accent="indigo" />
            <StatCard value={36} label="Occupations" accent="purple" />
            <StatCard value={9} label="Industries" accent="pink" />
            <StatCard value={17} label="File Formats" suffix="+" accent="violet" />
            <StatCard value={7} label="Hours Avg" suffix="h" accent="blue" colSpan />
            <StatCard value={8} label="Benchmarks" accent="fuchsia" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  value,
  label,
  suffix = "",
  accent,
  colSpan = false,
}: {
  value: number;
  label: string;
  suffix?: string;
  accent: string;
  colSpan?: boolean;
}) {
  const accentColors: Record<string, string> = {
    indigo: "from-indigo-500/20 to-indigo-500/5 border-indigo-500/20",
    purple: "from-purple-500/20 to-purple-500/5 border-purple-500/20",
    pink: "from-pink-500/20 to-pink-500/5 border-pink-500/20",
    violet: "from-violet-500/20 to-violet-500/5 border-violet-500/20",
    blue: "from-blue-500/20 to-blue-500/5 border-blue-500/20",
    fuchsia: "from-fuchsia-500/20 to-fuchsia-500/5 border-fuchsia-500/20",
  };

  return (
    <div
      className={`bg-gradient-to-br ${accentColors[accent] ?? accentColors.indigo} backdrop-blur-sm border rounded-2xl p-4 ${colSpan ? "" : ""}`}
    >
      <div className="text-3xl font-black text-white">
        <AnimatedCounter target={value} suffix={suffix} />
      </div>
      <div className="text-xs text-slate-400 mt-1">{label}</div>
    </div>
  );
}
