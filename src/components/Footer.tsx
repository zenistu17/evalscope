const base = import.meta.env.BASE_URL;

export function Footer() {
  return (
    <footer className="mx-auto max-w-5xl px-6 pt-10 pb-16">
      <div className="border-t border-[var(--rule)] pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <a
          href="https://parsewave.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          <img src={`${base}parsewave-logo.png`} alt="" className="h-5 w-5" />
          <img src={`${base}parsewave-text.png`} alt="Parsewave" className="h-3.5" />
        </a>
        <p className="font-mono text-[11px] text-[var(--ink-tertiary)]">
          Last updated February 2026
        </p>
      </div>
    </footer>
  );
}
