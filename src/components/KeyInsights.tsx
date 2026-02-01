import { useEffect, useRef, useState } from "react";

const insights = [
  {
    metric: "36",
    suffix: "",
    label: "Occupations",
    description: "From financial advisors to video editors to mechanical engineers",
    comparison: "vs 3-4 for APEX",
    color: "#6366f1",
  },
  {
    metric: "7",
    suffix: "h",
    label: "Avg Expert Time",
    description: "Each task represents a full professional work session",
    comparison: "vs 1.8h for APEX-Agents",
    color: "#8b5cf6",
  },
  {
    metric: "17",
    suffix: "+",
    label: "File Formats",
    description: "PDF, video, audio, 3D models, spreadsheets, code, and more",
    comparison: "vs 3 for APEX v1",
    color: "#a855f7",
  },
  {
    metric: "14",
    suffix: "yr",
    label: "Expert Experience",
    description: "Tasks crafted by working professionals, not annotators",
    comparison: "vs 7.25yr for APEX",
    color: "#c084fc",
  },
  {
    metric: "9",
    suffix: "",
    label: "Industries",
    description: "Finance, healthcare, law, engineering, media, and more",
    comparison: "vs 1-2 for competitors",
    color: "#d946ef",
  },
  {
    metric: "213",
    suffix: "",
    label: "Expert Tasks",
    description: "Real deliverables: financial plans, video edits, legal briefs",
    comparison: "and growing every week",
    color: "#ec4899",
  },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          let start = 0;
          const step = target / 60;
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setVal(target);
              clearInterval(timer);
            } else {
              setVal(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-5xl sm:text-6xl font-black tabular-nums">
      {val}
      <span className="text-3xl">{suffix}</span>
    </div>
  );
}

export function KeyInsights() {
  return (
    <section id="metrics" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 text-white">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-3">GDPVAL by the Numbers</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            The metrics that set Parsewave's benchmark apart from every other AI
            evaluation framework.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {insights.map((item, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-all hover:border-white/20"
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${item.color}15, transparent 70%)`,
                }}
              />
              <div className="relative">
                <div style={{ color: item.color }}>
                  <AnimatedNumber
                    target={parseInt(item.metric)}
                    suffix={item.suffix}
                  />
                </div>
                <div className="text-lg font-semibold mt-1">{item.label}</div>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                  {item.description}
                </p>
                <div
                  className="mt-3 text-xs font-medium px-3 py-1 rounded-full inline-block"
                  style={{
                    backgroundColor: `${item.color}20`,
                    color: item.color,
                  }}
                >
                  {item.comparison}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
