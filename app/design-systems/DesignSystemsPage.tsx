"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Sparkles, Check } from "lucide-react";
import { STRUCTURED_EDITORIAL as SS } from "./data";
import Breadcrumbs from "@/components/Breadcrumbs";
import "./design-systems.css";

type Tab = "claude" | "css" | "tailwind";

const JUMP_SECTIONS = [
  { id: "color", label: "Color" },
  { id: "type", label: "Type" },
  { id: "spacing", label: "Spacing" },
  { id: "components", label: "Components" },
  { id: "export", label: "Export" },
];

// Semantic color roles — what a premium system exposes (not raw ramp stops).
// Driven by the live --sx-* tokens inside the system scope, so they're always accurate.
const ROLES: { name: string; v: string }[] = [
  { name: "Background", v: "--sx-bg" },
  { name: "Surface", v: "--sx-surface" },
  { name: "Surface muted", v: "--sx-surface-muted" },
  { name: "Text", v: "--sx-text" },
  { name: "Text muted", v: "--sx-text-muted" },
  { name: "Border", v: "--sx-border" },
  { name: "Accent", v: "--sx-accent" },
  { name: "Accent ink", v: "--sx-accent-ink" },
];

const RADII: { name: string; v: string }[] = [
  { name: "Small", v: "--sx-radius-sm" },
  { name: "Medium", v: "--sx-radius-md" },
];

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function highlight(t: string) {
  return esc(t)
    .replace(/^(#{1,4} .*)$/gm, '<span class="h">$1</span>')
    .replace(/^(&gt; .*)$/gm, '<span class="q">$1</span>');
}
function tailwindCfg() {
  let s = '@theme {\n  --font-sans: "Funnel Sans", system-ui, sans-serif;\n  --font-mono: "Geist Mono", ui-monospace, monospace;\n\n';
  SS.tokens.colors.neutral.forEach((c) => (s += "  --color" + c.name.replace("--se", "") + ": " + c.value + ";\n"));
  s += "\n";
  SS.tokens.spacing.forEach((x, i) => (s += "  --spacing-" + (i + 1) + ": " + x.value + "px;\n"));
  s += "\n  --radius-sm: 6px;\n  --radius-md: 12px;\n}";
  return s;
}

export default function DesignSystemsPage() {
  const [tab, setTab] = useState<Tab>("claude");
  const [copied, setCopied] = useState(false);
  const [heroCopied, setHeroCopied] = useState(false);
  const [activeJump, setActiveJump] = useState("color");

  const content = useMemo<Record<Tab, string>>(
    () => ({ css: SS.cssVariables, tailwind: tailwindCfg(), claude: SS.claudePrompt }),
    []
  );
  const currentText = content[tab];

  const copyText = useCallback((t: string, hero = false) => {
    navigator.clipboard?.writeText(t);
    if (hero) {
      setHeroCopied(true);
      setTimeout(() => setHeroCopied(false), 1300);
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 1300);
    }
  }, []);

  const jumpTo = useCallback((id: string) => {
    setActiveJump(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const els = JUMP_SECTIONS.map((s) => document.getElementById(s.id)).filter(
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
    els.forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, []);

  // specimen links are demos — never navigate
  const preventDemoNav = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) e.preventDefault();
  }, []);

  return (
    <div className="design-systems-page min-w-0">
      <div className="px-8 pt-6">
        <Breadcrumbs items={[{ label: "Overview", href: "/" }, { label: "Design Systems" }]} />
      </div>

      {/* ===== HERO: name + personality + one quick action ===== */}
      <div className="stack stack-3 px-8 py-9 border-b border-line">
        <h1 className="ts-heading-xl text-ink">Structured Editorial</h1>
        <div className="flex flex-wrap gap-1.5">
          {SS.tags.slice(0, 4).map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>
        <p className="subhead" style={{ color: "var(--muted)", maxWidth: "60ch" }}>
          A grayscale-first system for structure-led sites — type, color, spacing, and components in
          one set. Light by default; dark and color are optional.
        </p>
        <div className="flex gap-3 flex-wrap">
          <button
            className={`lpbtn lpbtn--primary lpbtn--sm${heroCopied ? " copied" : ""}`}
            onClick={() => copyText(SS.claudePrompt, true)}
          >
            {heroCopied ? (
              <>
                <Check className="ico" size={15} strokeWidth={1.25} /> Copied
              </>
            ) : (
              <>
                <Sparkles className="ico" size={15} strokeWidth={1.25} /> Copy for Claude
              </>
            )}
          </button>
          <a
            className="lpbtn lpbtn--secondary lpbtn--sm"
            href="#export"
            onClick={(e) => {
              e.preventDefault();
              jumpTo("export");
            }}
          >
            Install options ↓
          </a>
        </div>
      </div>

      {/* sticky jump nav */}
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
      <div className="stack stack-1 px-8 pt-8 pb-2">
        <div className="lbl" style={{ color: "var(--muted)" }}>
          Foundations
        </div>
      </div>

      {/* Color — semantic roles */}
      <div className="stack stack-3 px-8 py-8 border-b border-line" id="color" data-jump>
        <div className="flex items-end justify-between">
          <h3>Color</h3>
          <span className="lbl">Roles · grayscale-first</span>
        </div>
        <div
          className="sx-canvas border border-line"
          data-system="structured-editorial"
          data-mode="neutral"
          style={{ padding: "var(--sx-space-5)" }}
        >
          <div className="ds-roles">
            {ROLES.map((r) => (
              <div className="ds-role" key={r.v}>
                <span className="ds-role-sw" style={{ background: `var(${r.v})` }} />
                <span className="ds-role-name">{r.name}</span>
                <span className="ds-role-var">{r.v}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-[16px]" style={{ color: "var(--muted)", maxWidth: "62ch" }}>
          Eight semantic roles power every section. Switch to Dark or Color mode in the section
          preview to see the same roles re-mapped — the accent only appears in Color mode.
        </p>
      </div>

      {/* Type */}
      <div className="stack stack-3 px-8 py-9 border-b border-line" id="type" data-jump>
        <div className="flex items-end justify-between">
          <h3>Typography</h3>
          <span className="lbl">Funnel Sans</span>
        </div>
        <div
          className="sx-canvas border border-line"
          data-system="structured-editorial"
          data-mode="neutral"
          onClick={preventDemoNav}
        >
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

      {/* Spacing */}
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

      {/* Radius */}
      <div className="stack stack-3 px-8 py-9 border-b border-line">
        <div className="flex items-end justify-between">
          <h3>Radius</h3>
          <span className="lbl">2 steps</span>
        </div>
        <div
          className="sx-canvas border border-line"
          data-system="structured-editorial"
          data-mode="neutral"
          style={{ padding: "var(--sx-space-5)" }}
        >
          <div className="sx-cluster" style={{ gap: "var(--sx-space-4)" }}>
            {RADII.map((r) => (
              <div key={r.v} style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
                <span
                  style={{
                    width: 80,
                    height: 56,
                    background: "var(--sx-surface-muted)",
                    border: "1px solid var(--sx-border)",
                    borderRadius: `var(${r.v})`,
                  }}
                />
                <span className="sx-label" style={{ color: "var(--sx-text-muted)" }}>
                  {r.name} · {r.v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== COMPONENTS ===== */}
      <div className="stack stack-3 px-8 py-9 border-b border-line" id="components" data-jump>
        <div className="flex items-end justify-between">
          <h3>Components</h3>
          <span className="lbl">Built from the tokens</span>
        </div>
        <div
          className="sx-canvas border border-line"
          data-system="structured-editorial"
          data-mode="neutral"
          onClick={preventDemoNav}
          style={{ padding: "var(--sx-space-5)" }}
        >
          <div className="stack" style={{ gap: "var(--sx-space-5)" }}>
            <div className="ds-comp-row">
              <span className="sx-label ds-comp-cap">Buttons</span>
              <div className="sx-cluster" style={{ gap: "var(--sx-space-2)" }}>
                <a className="sx-button sx-button-primary" href="#">Primary</a>
                <a className="sx-button sx-button-dark" href="#">Dark</a>
                <a className="sx-button sx-button-outline" href="#">Outline</a>
                <a className="sx-button sx-button-outline sx-button--sm" href="#">Small</a>
              </div>
            </div>
            <hr className="sx-divider" />
            <div className="ds-comp-row">
              <span className="sx-label ds-comp-cap">Card</span>
              <div className="sx-card" style={{ maxWidth: 340, display: "flex", flexDirection: "column", gap: "var(--sx-space-2)" }}>
                <p className="sx-eyebrow">[ Card ]</p>
                <h4 className="sx-feature-title">A surface with system styling</h4>
                <p className="sx-body" style={{ fontSize: "var(--sx-body-md)" }}>
                  Border, radius, and padding all come from the tokens.
                </p>
              </div>
            </div>
            <hr className="sx-divider" />
            <div className="ds-comp-row">
              <span className="sx-label ds-comp-cap">Input · Tag · Link</span>
              <div className="sx-cluster" style={{ gap: "var(--sx-space-3)", alignItems: "center" }}>
                <input className="sx-input" style={{ maxWidth: 240 }} placeholder="you@company.com" />
                <span className="sx-tag">Tag</span>
                <a className="sx-link" href="#">Text link</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== EXPORT ===== */}
      <div className="stack stack-3 px-8 py-9" id="export" data-jump>
        <div className="flex items-end justify-between flex-wrap gap-2">
          <h3>Export</h3>
          <span className="lbl">Add to your site</span>
        </div>
        <p className="text-[16px]" style={{ color: "var(--muted)", maxWidth: "66ch" }}>
          Install once — every section you add inherits it. Copy a Claude prompt, CSS variables, or a
          Tailwind theme.
        </p>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-5 overflow-x-auto">
            {(
              [
                ["claude", "Claude prompt"],
                ["css", "CSS"],
                ["tailwind", "Tailwind"],
              ] as [Tab, string][]
            ).map(([id, label]) => (
              <button key={id} className={`ds-ptab${tab === id ? " active" : ""}`} onClick={() => setTab(id)}>
                {label}
              </button>
            ))}
          </div>
          <button
            className={`lpbtn lpbtn--primary lpbtn--sm${copied ? " copied" : ""}`}
            onClick={() => copyText(currentText)}
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
        <div className="border border-line" style={{ background: "var(--card)", maxHeight: 360, overflow: "auto" }}>
          <div className="ds-codeview px-5 py-4" dangerouslySetInnerHTML={{ __html: highlight(currentText) }} />
        </div>
      </div>
    </div>
  );
}
