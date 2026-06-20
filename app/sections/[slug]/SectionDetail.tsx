"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { Section } from "@/lib/sections";
import { buildClaudePrompt } from "@/lib/sections";

type Mode = "neutral" | "dark" | "color";
type View = "claude" | "code";

const SYSTEMS: { value: string; label: string; soon?: boolean }[] = [
  { value: "structured-editorial", label: "Structured Editorial" },
  { value: "scion", label: "Scion" },
  { value: "soon", label: "Commerce Clean", soon: true },
];

const MODES: { value: Mode; label: string }[] = [
  { value: "neutral", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "color", label: "Color" },
];

export default function SectionDetail({ section }: { section: Section }) {
  const [system, setSystem] = useState("structured-editorial");
  const [mode, setMode] = useState<Mode>("neutral");
  const [view, setView] = useState<View>("claude");
  const [copied, setCopied] = useState(false);

  const text = view === "claude" ? buildClaudePrompt(section, system) : section.html;
  const copyLabel = view === "claude" ? "Copy for Claude" : "Copy code";

  function copy() {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1100);
  }

  return (
    <>
      {/* PREVIEW CONTROLS (bar): Design System + Mode */}
      <div className="sxbar">
        <div className="sxbar-group">
          <span className="barlbl">Design System</span>
          <div className="flex gap-2">
            {SYSTEMS.map((s) => (
              <button
                key={s.value}
                type="button"
                disabled={s.soon}
                title={s.soon ? "Coming soon" : undefined}
                className={"barbtn" + (!s.soon && system === s.value ? " active" : "")}
                onClick={() => !s.soon && setSystem(s.value)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <div className="sxbar-group">
          <span className="barlbl">Mode</span>
          <div className="flex gap-2">
            {MODES.map((m) => (
              <button
                key={m.value}
                type="button"
                className={"barbtn" + (mode === m.value ? " active" : "")}
                onClick={() => setMode(m.value)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="px-10 pt-4">
        <p className="text-[16px]" style={{ color: "var(--muted)", maxWidth: "80ch" }}>
          Design Systems are complete visual systems for sections — type, spacing, buttons, cards,
          labels, and states. The preview shows the section through the selected system and mode.
        </p>
      </div>

      {/* PREVIEW */}
      <div className="px-10 pt-5 pb-10 border-b border-line">
        <div className="browser" style={{ overflow: "visible" }}>
          <div className="browser-bar" style={{ background: "var(--panel)" }}>
            <span className="browser-dot" />
            <span className="browser-dot" />
            <span className="browser-dot" />
            <span className="browser-addr" />
          </div>
          <div
            className="sx-canvas browser-body"
            data-system={system}
            data-mode={mode}
            style={{ overflow: "hidden" }}
            dangerouslySetInnerHTML={{ __html: section.html }}
          />
        </div>
      </div>

      {/* IMPLEMENTATION (one Claude prompt, or the raw section code) */}
      <section className="px-10 py-9 stack stack-4">
        <div className="stack stack-2">
          <div className="lbl">Implementation</div>
          <p className="text-[16px]" style={{ color: "var(--muted)", maxWidth: "76ch" }}>
            Add a{" "}
            <Link href="/design-systems" className="lplink">
              Design System
            </Link>{" "}
            to your site once, then drop in sections as plain structure. The Claude prompt does it
            for you — it installs the system if it&apos;s missing, or adapts the section to your
            existing styles.
          </p>
        </div>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-2">
            <button
              type="button"
              className={"implseg" + (view === "claude" ? " active" : "")}
              onClick={() => setView("claude")}
            >
              For Claude
            </button>
            <button
              type="button"
              className={"implseg" + (view === "code" ? " active" : "")}
              onClick={() => setView("code")}
            >
              Code
            </button>
          </div>
          <button
            type="button"
            className={"lpbtn lpbtn--primary lpbtn--sm" + (copied ? " copied" : "")}
            onClick={copy}
          >
            {copied ? (
              "✓ Copied"
            ) : (
              <>
                <Sparkles className="ico" size={13} strokeWidth={1.25} /> <span>{copyLabel}</span>
              </>
            )}
          </button>
        </div>
        <pre className="code-pre">{text}</pre>
      </section>
    </>
  );
}
