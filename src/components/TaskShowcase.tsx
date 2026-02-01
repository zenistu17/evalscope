import { useState, useEffect, useCallback, useRef } from "react";
import DOMPurify from "dompurify";
import { showcaseTasks, type ShowcaseTask, type TaskFile } from "@/data/showcaseTasks";

const BASE_URL = import.meta.env.BASE_URL;

function fileUrl(path: string) {
  return `${BASE_URL}${path}`;
}

const TYPE_COLORS: Record<string, string> = {
  docx: "#2b579a",
  xlsx: "#217346",
  pdf: "#b30b00",
  png: "#6b7280",
  jpg: "#6b7280",
  jpeg: "#6b7280",
  mp4: "#7c3aed",
  mp3: "#ea580c",
  xml: "#0891b2",
};

function typeBadge(type: string) {
  return (
    <span
      className="font-mono text-[10px] px-1.5 py-0.5 text-white rounded-sm shrink-0 uppercase"
      style={{ backgroundColor: TYPE_COLORS[type] || "#888" }}
    >
      {type}
    </span>
  );
}

function uniqueTypes(files: TaskFile[]) {
  return [...new Set(files.map((f) => f.type.toUpperCase()))];
}

// --------------- File Viewer ---------------

function FileViewer({
  file,
  onClose,
}: {
  file: TaskFile;
  onClose: () => void;
}) {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [textContent, setTextContent] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    setHtmlContent(null);
    setTextContent(null);
    if (file.viewPath && (file.type === "docx" || file.type === "xlsx")) {
      fetch(fileUrl(file.viewPath))
        .then((r) => r.text())
        .then((text) => setHtmlContent(DOMPurify.sanitize(text)))
        .catch(() => setHtmlContent("Could not load document preview."));
    }
    if (file.type === "xml") {
      fetch(fileUrl(file.path))
        .then((r) => r.text())
        .then(setTextContent)
        .catch(() => setTextContent("Could not load XML content."));
    }
  }, [file.path, file.viewPath, file.type]);

  const src = fileUrl(file.path);

  return (
    <div className="mt-3 border border-[var(--rule)] bg-white">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--rule)] bg-[var(--surface-raised)]">
        <div className="flex items-center gap-2 min-w-0">
          {typeBadge(file.type)}
          <span className="text-sm font-medium truncate">{file.name}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={src}
            download
            className="font-mono text-[11px] text-[var(--accent)] hover:text-[var(--accent-strong)] transition-colors"
          >
            Download
          </a>
          <button
            onClick={onClose}
            className="text-[var(--ink-tertiary)] hover:text-[var(--ink)] transition-colors"
            aria-label="Close viewer"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 3l8 8M11 3l-8 8" />
            </svg>
          </button>
        </div>
      </div>

      <div className="max-h-[70vh] overflow-auto">
        {/* Image */}
        {(file.type === "png" || file.type === "jpg" || file.type === "jpeg") && (
          <>
            <button
              type="button"
              onClick={() => setLightbox(true)}
              className="block w-full p-4 bg-transparent border-none cursor-zoom-in"
              aria-label={`Zoom ${file.name}`}
            >
              <img src={src} alt={file.name} className="max-w-full mx-auto" />
            </button>
            {lightbox && (
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Image lightbox"
                className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center cursor-zoom-out"
                onClick={() => setLightbox(false)}
                onKeyDown={(e) => { if (e.key === "Escape") setLightbox(false); }}
                tabIndex={0}
                ref={(el) => el?.focus()}
              >
                <img src={src} alt={file.name} className="max-w-[90vw] max-h-[90vh] object-contain" />
              </div>
            )}
          </>
        )}

        {/* Video */}
        {file.type === "mp4" && (
          <video controls preload="metadata" className="w-full">
            <source src={src} type="video/mp4" />
            Your browser does not support video playback.
          </video>
        )}

        {/* Audio */}
        {file.type === "mp3" && (
          <div className="p-6 flex items-center justify-center">
            <audio controls preload="metadata" className="w-full max-w-md">
              <source src={src} type="audio/mpeg" />
              Your browser does not support audio playback.
            </audio>
          </div>
        )}

        {/* PDF */}
        {file.type === "pdf" && (
          <object
            data={src}
            type="application/pdf"
            className="w-full"
            style={{ height: "70vh" }}
          >
            <p className="p-4 text-sm text-[var(--ink-secondary)]">
              PDF preview not available.{" "}
              <a href={src} download className="text-[var(--accent)]">
                Download the file
              </a>
              .
            </p>
          </object>
        )}

        {/* DOCX / XLSX (pre-converted HTML, sanitized with DOMPurify) */}
        {(file.type === "docx" || file.type === "xlsx") && (
          htmlContent ? (
            <div
              className="docx-content p-4"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          ) : (
            <div className="p-4 text-sm text-[var(--ink-tertiary)]">Loading document...</div>
          )
        )}

        {/* XML */}
        {file.type === "xml" && (
          textContent ? (
            <pre className="p-4 text-xs font-mono text-[var(--ink-secondary)] whitespace-pre-wrap break-words">
              {textContent}
            </pre>
          ) : (
            <div className="p-4 text-sm text-[var(--ink-tertiary)]">Loading XML...</div>
          )
        )}
      </div>
    </div>
  );
}

// --------------- File Group (input or output) ---------------

function FileGroup({
  label,
  files,
}: {
  label: string;
  files: TaskFile[];
}) {
  const [viewingFile, setViewingFile] = useState<TaskFile | null>(null);

  return (
    <div className="mb-4">
      <h4 className="text-xs font-medium text-[var(--ink-tertiary)] uppercase tracking-wider mb-2">
        {label} ({files.length})
      </h4>
      <div className="flex flex-wrap gap-2">
        {files.map((f) => {
          const isActive = viewingFile?.name === f.name;
          return (
            <button
              key={f.name}
              onClick={() => setViewingFile(isActive ? null : f)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 border text-sm transition-colors ${
                isActive
                  ? "border-[var(--accent)] bg-[var(--accent-muted)]"
                  : "border-[var(--rule)] hover:border-[var(--ink-tertiary)] bg-white"
              }`}
            >
              {typeBadge(f.type)}
              <span className="truncate max-w-[180px]">{f.name}</span>
            </button>
          );
        })}
      </div>
      {viewingFile && (
        <FileViewer file={viewingFile} onClose={() => setViewingFile(null)} />
      )}
    </div>
  );
}

// --------------- Full Instructions Toggle ---------------

function FullInstructions({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  const [html, setHtml] = useState<string | null>(null);
  const fetched = useRef(false);

  useEffect(() => {
    fetched.current = false;
    setHtml(null);
  }, [path]);

  const load = useCallback(() => {
    if (!fetched.current) {
      fetched.current = true;
      fetch(fileUrl(path))
        .then((r) => r.text())
        .then((text) => setHtml(DOMPurify.sanitize(text)))
        .catch(() => setHtml("Could not load instructions."));
    }
  }, [path]);

  return (
    <div className="mt-3">
      <button
        onClick={() => { setOpen(!open); load(); }}
        className="text-xs text-[var(--accent)] hover:text-[var(--accent-strong)] transition-colors flex items-center gap-1"
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M2 3.5L5 6.5L8 3.5" />
        </svg>
        {open ? "Hide full instructions" : "Show full instructions"}
      </button>
      {open && html && (
        <div
          className="docx-content mt-3 p-4 border border-[var(--rule)] bg-white max-h-[50vh] overflow-auto text-sm"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  );
}

// --------------- Task Entry (accordion item) ---------------

function TaskEntry({
  task: t,
  isOpen,
  onToggle,
}: {
  task: ShowcaseTask;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const allTypes = uniqueTypes([...t.inputFiles, ...t.outputFiles]);

  return (
    <div className="border-b border-[var(--rule)]">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`w-full text-left py-4 flex items-center gap-4 transition-colors ${
          isOpen
            ? "bg-[var(--surface-raised)]"
            : "hover:bg-[var(--surface-raised)]"
        }`}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="var(--ink-tertiary)"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M3 4.5L6 7.5L9 4.5" />
        </svg>

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="font-semibold text-sm">{t.occupation}</span>
            <span className="text-xs text-[var(--ink-tertiary)] shrink-0">{t.industry}</span>
          </div>
          <div className="flex items-baseline gap-3 mt-0.5">
            <span className="text-sm text-[var(--ink-secondary)] truncate">
              {t.title}
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 shrink-0 text-[var(--ink-tertiary)]">
          <span className="font-mono text-[11px]">
            {t.inputFiles.length} in
          </span>
          <span className="text-[var(--rule)]">/</span>
          <span className="font-mono text-[11px]">
            {t.outputFiles.length} out
          </span>
          <span className="text-[var(--rule)]">|</span>
          <span className="font-mono text-[11px]">~{t.estimatedHours}h</span>
          <span className="text-[var(--rule)]">|</span>
          <span className="font-mono text-[11px]">{t.totalPoints}pts</span>
        </div>
      </button>

      {isOpen && (
        <div className="pb-6 pl-8">
          {/* Summary + file types */}
          <p className="text-sm text-[var(--ink-secondary)] leading-relaxed mb-2 max-w-2xl">
            {t.summary}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {allTypes.map((ft) => (
              <span
                key={ft}
                className="font-mono text-[10px] px-1.5 py-0.5 bg-[var(--surface-sunken)] text-[var(--ink-tertiary)]"
              >
                {ft}
              </span>
            ))}
            <span className="font-mono text-[11px] text-[var(--ink-tertiary)] ml-2">
              ~{t.estimatedHours}h expert time
            </span>
          </div>

          <FullInstructions path={t.fullInstructionPath} />

          {/* Rubric */}
          <div className="mt-4 mb-4">
            <h4 className="text-xs font-medium text-[var(--ink-tertiary)] uppercase tracking-wider mb-2">
              Rubric ({t.totalPoints} pts)
            </h4>
            <div className="border border-[var(--rule)] bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--rule)] bg-[var(--surface-raised)]">
                    <th className="text-left px-3 py-2 text-xs font-medium text-[var(--ink-tertiary)]">Criterion</th>
                    <th className="text-center px-3 py-2 text-xs font-medium text-[var(--ink-tertiary)] w-16">Pts</th>
                    <th className="text-left px-3 py-2 text-xs font-medium text-[var(--ink-tertiary)] hidden md:table-cell">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {t.rubric.map((r) => (
                    <tr key={r.name} className="border-b border-[var(--rule)] last:border-b-0">
                      <td className="px-3 py-2 font-medium text-[var(--ink)]">{r.name}</td>
                      <td className="px-3 py-2 text-center font-mono text-xs text-[var(--ink-secondary)]">/{r.points}</td>
                      <td className="px-3 py-2 text-[var(--ink-secondary)] text-xs hidden md:table-cell">{r.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* File groups */}
          <FileGroup label="Input Files" files={t.inputFiles} />
          <FileGroup label="Solution Files" files={t.outputFiles} />
        </div>
      )}
    </div>
  );
}

// --------------- Main Section ---------------

export function TaskShowcase() {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">04</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-4">
        What We Build
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-6">
        Six real GDPval tasks built by Parsewave, shown with their complete inputs,
        rubrics, and expert solutions. Each is a professional deliverable spanning
        multiple file types, created by domain experts.
      </p>

      <div className="space-y-0 border-t border-[var(--rule)]">
        {showcaseTasks.map((t) => (
          <TaskEntry
            key={t.id}
            task={t}
            isOpen={openId === t.id}
            onToggle={() => toggle(t.id)}
          />
        ))}
      </div>

      <p className="font-mono text-[11px] text-[var(--ink-tertiary)] mt-4">
        Fig. 3 - Six tasks across 6 occupations and 5 industries. Click any task to explore inputs, rubric, and solution files.
      </p>
    </section>
  );
}
