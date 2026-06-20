"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Sparkles, Check } from "lucide-react";
import { STRUCTURED_EDITORIAL as SS } from "./data";
import "./design-systems.css";

type Tab = "claude" | "css" | "tailwind";

const JUMP_SECTIONS = [
  { id: "foundations", label: "Foundations" },
  { id: "type", label: "Type" },
  { id: "color", label: "Color" },
  { id: "spacing", label: "Spacing" },
];

// ---- code panel: derived text per tab ----
function tailwindCfg() {
  let s = '@theme {\n  --font-sans: "Funnel Sans", system-ui, sans-serif;\n  --font-mono: "Geist Mono", ui-monospace, monospace;\n\n';
  SS.tokens.colors.neutral.forEach((c) => (s += "  --color" + c.name.replace("--se", "") + ": " + c.value + ";\n"));
  s += "\n";
  SS.tokens.spacing.forEach((x, i) => (s += "  --spacing-" + (i + 1) + ": " + x.value + "px;\n"));
  s += "\n  --radius-sm: 6px;\n  --radius-md: 12px;\n}";
  return s;
}

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlight(t: string) {
  return esc(t)
    .replace(/^(#{1,4} .*)$/gm, '<span class="h">$1</span>')
    .replace(/^(&gt; .*)$/gm, '<span class="q">$1</span>');
}

export default function DesignSystemsPage() {
  const [tab, setTab] = useState<Tab>("claude");
  const [copied, setCopied] = useState(false);
  const [activeJump, setActiveJump] = useState("foundations");
  const [copiedSwatch, setCopiedSwatch] = useState<string | null>(null);

  const content = useMemo<Record<Tab, string>>(
    () => ({
      css: SS.cssVariables,
      tailwind: tailwindCfg(),
      claude: SS.claudePrompt,
    }),
    []
  );

  const currentText = content[tab];

  const copyCode = useCallback(() => {
    navigator.clipboard?.writeText(currentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1300);
  }, [currentText]);

  // swatch click → copy value, flash "Copied"
  const copySwatch = useCallback((value: string) => {
    navigator.clipboard?.writeText(value);
    setCopiedSwatch(value);
    setTimeout(() => setCopiedSwatch((v) => (v === value ? null : v)), 900);
  }, []);

  // jump tabs: click-to-scroll
  const jumpTo = useCallback((id: string) => {
    setActiveJump(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // scroll-spy
  useEffect(() => {
    const sections = JUMP_SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el != null
    );
    const spy = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((en) => en.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis.length) setActiveJump(vis[0].target.id);
      },
      { rootMargin: "-110px 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, []);

  // specimen / example links are demos — never navigate
  const preventDemoNav = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) e.preventDefault();
  }, []);

  const colorGroups: [string, typeof SS.tokens.colors.neutral][] = [
    ["Neutral", SS.tokens.colors.neutral],
    ["Dark", SS.tokens.colors.dark],
    ["Color example", SS.tokens.colors.color],
  ];

  return (
    <div className="design-systems-page min-w-0">
      {/* hero: name + meta on the left, install / code on the right */}
      <div className="grid lg:grid-cols-[1fr_minmax(0,460px)] gap-x-12 gap-y-9 px-8 py-9 border-b border-line items-start">
        <div className="stack stack-3">
          <h1 className="ts-heading-xl text-ink">Structured Editorial</h1>
          <div className="flex flex-wrap gap-1.5">
            {SS.tags.slice(0, 4).map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
          <p className="subhead" style={{ color: "var(--muted)" }}>
            A complete grayscale-first Design System for structure-led websites.
          </p>
          <p className="text-[16px] leading-[1.55] max-w-[52ch]" style={{ color: "var(--muted)" }}>
            Type, color, spacing, and components in one grayscale-first system. Light by default;
            dark and color are optional.
          </p>
        </div>
        <div className="stack stack-3 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="stack stack-1">
              <div className="lbl">Add to your site</div>
              <p className="text-[16px]" style={{ color: "var(--muted)" }}>
                Install once — every section you add inherits it.
              </p>
            </div>
            <button
              className={`lpbtn lpbtn--primary lpbtn--sm${copied ? " copied" : ""}`}
              onClick={copyCode}
            >
              {copied ? (
                <>
                  <Check className="ico" size={15} strokeWidth={1.25} /> Copied
                </>
              ) : (
                <>
                  <Sparkles className="ico" size={15} strokeWidth={1.25} /> Copy
                </>
              )}
            </button>
          </div>
          <div className="flex gap-5 overflow-x-auto">
            {(
              [
                ["claude", "Claude prompt"],
                ["css", "CSS"],
                ["tailwind", "Tailwind"],
              ] as [Tab, string][]
            ).map(([id, label]) => (
              <button
                key={id}
                className={`ds-ptab${tab === id ? " active" : ""}`}
                onClick={() => setTab(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="border border-line" style={{ background: "var(--card)", maxHeight: 360, overflow: "auto" }}>
            <div
              className="ds-codeview px-5 py-4"
              dangerouslySetInnerHTML={{ __html: highlight(currentText) }}
            />
          </div>
        </div>
      </div>

      {/* sticky jump nav (section anchors) */}
      <div className="ds-jumpbar px-8 py-3">
        <div className="flex gap-5 overflow-x-auto">
          {JUMP_SECTIONS.map((s) => (
            <a
              key={s.id}
              className={`ds-jtab${activeJump === s.id ? " active" : ""}`}
              href={`#${s.id}`}
              onClick={(e) => {
                e.preventDefault();
                jumpTo(s.id);
              }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* ===== FOUNDATIONS ===== */}
      <div className="stack stack-2 px-8 py-8 border-b border-line" id="foundations" data-jump>
        <h2 className="ts-section-lg">Foundations</h2>
        <p className="text-[16px]" style={{ color: "var(--muted)", maxWidth: "60ch" }}>
          The tokens everything is built from — type, color, and spacing.
        </p>
      </div>

      {/* typography specimens */}
      <div className="stack stack-3 px-8 py-9 border-b border-line" id="type" data-jump>
        <div className="flex items-end justify-between">
          <h3>Typography</h3>
          <span className="lbl">Funnel Sans</span>
        </div>
        <div className="sx-canvas border border-line" data-system="structured-editorial" data-mode="neutral" onClick={preventDemoNav}>
          {SS.tokens.typography.map((t, i) => {
            const mono = t.name === "Mono Label";
            const specimenStyle: React.CSSProperties = {
              fontFamily: mono ? "var(--sx-font-mono)" : "var(--sx-font-sans)",
              fontSize: `min(${t.size}, 7vw)`,
              lineHeight: t.line,
              letterSpacing: t.tracking,
              fontWeight: Number(t.weight),
              ...(mono ? { textTransform: "uppercase" as const } : {}),
              color: "var(--sx-text)",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              flex: 1,
            };
            return (
              <div
                key={t.var}
                className={(i ? "border-t " : "") + "border-line p-6 flex items-baseline justify-between gap-5"}
              >
                <span style={specimenStyle}>{mono ? "[ Label ]" : "The quick brown fox"}</span>
                <span style={{ textAlign: "right", flexShrink: 0 }}>
                  <span className="lbl" style={{ color: "var(--sx-text)", display: "block", fontSize: 11 }}>
                    {t.name}
                  </span>
                  <span style={{ fontFamily: "var(--sx-font-mono)", fontSize: 11, color: "var(--sx-text-muted)" }}>
                    {t.size.replace(/clamp\([^)]*\)/, "fluid")} · w{t.weight} · {t.line}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* color swatches */}
      <div className="stack stack-3 px-8 py-9 border-b border-line" id="color" data-jump>
        <div className="flex items-end justify-between">
          <h3>Color</h3>
          <span className="lbl">Grayscale-first</span>
        </div>
        <div className="stack stack-4">
          {colorGroups.map(([label, arr]) => (
            <div key={label}>
              <div className="lbl mb-3">{label}</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 border-t border-l border-line">
                {arr.map((c) => {
                  const isCopied = copiedSwatch === c.value;
                  return (
                    <button
                      key={c.name}
                      className="border-r border-b border-line p-3 text-left"
                      style={{ cursor: "pointer", background: "transparent" }}
                      onClick={() => copySwatch(c.value)}
                    >
                      <span style={{ display: "block", height: 36, border: "1px solid var(--line)", background: c.value }} />
                      <span
                        className={`lbl${isCopied ? " ds-copied" : ""}`}
                        style={{ display: "block", marginTop: 8, fontSize: 10.5, color: "var(--ink)" }}
                      >
                        {isCopied ? "Copied" : c.name}
                      </span>
                      <span style={{ display: "block", fontFamily: "var(--font-geist-mono), monospace", fontSize: 10.5, color: "var(--muted)" }}>
                        {c.value}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* spacing — real applied layout spacing */}
      <div className="stack stack-3 px-8 py-9 border-b border-line" id="spacing" data-jump>
        <div className="flex items-end justify-between">
          <h3>Spacing</h3>
          <span className="lbl">6px rhythm</span>
        </div>
        <div className="sx-canvas ds-spec border border-line" data-system="structured-editorial" data-mode="neutral">
          <div className="stack" style={{ gap: "var(--sx-space-6)" }}>
            <div className="ds-spec-row">
              <span className="sx-label ds-spec-cap">Grid gap · --sx-space-4 · 24px</span>
              <div className="sx-grid sx-grid-3">
                <div className="sx-card" style={{ height: 56 }} />
                <div className="sx-card" style={{ height: 56 }} />
                <div className="sx-card" style={{ height: 56 }} />
              </div>
            </div>
            <hr className="sx-divider" />
            <div className="ds-spec-row">
              <span className="sx-label ds-spec-cap">Stack rhythm · --sx-space-3 · 18px</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--sx-space-3)" }}>
                <div className="sx-card" style={{ height: 22 }} />
                <div className="sx-card" style={{ height: 22 }} />
                <div className="sx-card" style={{ height: 22 }} />
              </div>
            </div>
            <hr className="sx-divider" />
            <div className="ds-spec-row">
              <span className="sx-label ds-spec-cap">Section padding · --sx-space-7 · 72px</span>
              <div style={{ border: "1px dashed var(--sx-border)" }}>
                <div
                  className="sx-card"
                  style={{ margin: "var(--sx-space-7) var(--sx-space-6)", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <span className="sx-label" style={{ color: "var(--sx-text-soft)" }}>
                    Content
                  </span>
                </div>
              </div>
            </div>
            <hr className="sx-divider" />
            <div className="ds-spec-row">
              <span className="sx-label ds-spec-cap">Scale · 6px base</span>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 12, flexWrap: "wrap" }}>
                {SS.tokens.spacing
                  .filter((s) => s.value <= 96)
                  .map((s) => (
                    <div key={s.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                      <span style={{ width: s.value, height: 10, background: "var(--sx-text)", opacity: 0.85, display: "block" }} />
                      <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 10, color: "var(--sx-text-muted)" }}>
                        {s.value}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* best practices — concise single list */}
      <div className="stack stack-3 px-8 py-9">
        <div className="flex items-end justify-between">
          <h3>Best practices</h3>
          <span className="lbl">Use it well</span>
        </div>
        <ul className="stack stack-3">
          {SS.guidelines.do.slice(0, 5).map((d) => (
            <li className="flex gap-3 items-start" key={d}>
              <Check className="ico" size={16} strokeWidth={1.5} style={{ color: "var(--royal)", marginTop: 4, flexShrink: 0 }} />
              <span className="text-[16px]" style={{ color: "var(--ink)" }}>
                {d}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
