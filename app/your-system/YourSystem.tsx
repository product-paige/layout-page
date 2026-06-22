"use client";

import { useState } from "react";
import Link from "next/link";
import { Clipboard, Check, Trash2, Plus, Copy } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useDesignSystem } from "@/components/DesignSystemProvider";
import { ButtonPreview } from "@/components/ButtonPreview";
import { exportSystem, type ExportTab } from "@/lib/ds";
import "@/app/components/buttons/buttons.css";
import "./your-system.css";

export default function YourSystem() {
  const {
    systems,
    active,
    setActive,
    createSystem,
    renameSystem,
    duplicateSystem,
    deleteSystem,
    removeButton,
    setToken,
  } = useDesignSystem();
  const [tab, setTab] = useState<ExportTab>("claude");
  const [copied, setCopied] = useState(false);

  const exportText = exportSystem(active, tab);
  const emptyButtons = active.buttons.length === 0;

  function copy() {
    if (navigator.clipboard) navigator.clipboard.writeText(exportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <main className="your-system-page px-8 py-9">
      <Breadcrumbs items={[{ label: "Overview", href: "/" }, { label: "Your System" }]} />
      <div className="stack stack-2 mt-5 mb-7">
        <h1 className="ts-page-hero">Your design systems</h1>
        <p className="lp-hero-support" style={{ maxWidth: "64ch" }}>
          Build one system per brand or project. Everything you save in a playground goes to the
          active system. Export any system as a Claude prompt, CSS, or Tailwind. Saved in your
          browser.
        </p>
      </div>

      {/* systems bar */}
      <div className="ys-systems">
        {systems.map((s) => (
          <button
            key={s.id}
            className={"ys-sys-chip" + (s.id === active.id ? " active" : "")}
            onClick={() => setActive(s.id)}
          >
            {s.name}
            <span className="ys-sys-count">{s.buttons.length}</span>
          </button>
        ))}
        <button className="ys-sys-new" onClick={() => createSystem()}>
          <Plus size={14} strokeWidth={2} /> New system
        </button>
      </div>

      {/* active system header */}
      <div className="ys-sys-head">
        <input
          className="ys-sys-name"
          value={active.name}
          onChange={(e) => renameSystem(active.id, e.target.value)}
          aria-label="System name"
        />
        <div className="ys-sys-actions">
          <button className="lpbtn lpbtn--sm" onClick={() => duplicateSystem(active.id)}>
            <Copy size={13} strokeWidth={1.6} /> Duplicate
          </button>
          <button
            className="lpbtn lpbtn--sm"
            disabled={systems.length <= 1}
            onClick={() => {
              if (confirm(`Delete "${active.name}"?`)) deleteSystem(active.id);
            }}
          >
            <Trash2 size={13} strokeWidth={1.6} /> Delete
          </button>
        </div>
      </div>

      <div className="stack stack-6" style={{ marginTop: 28 }}>
        {/* tokens */}
        <section className="stack stack-3">
          <h2 className="ts-card-lg">Tokens</h2>
          <div className="ys-tokens">
            {(
              [
                ["accent", "Accent"],
                ["ink", "Ink"],
                ["surface", "Surface"],
              ] as const
            ).map(([key, label]) => (
              <label className="ys-token" key={key}>
                <span className="lbl">{label}</span>
                <span className="ys-token-row">
                  <input
                    type="color"
                    className="ys-token-swatch"
                    value={active.tokens[key]}
                    onChange={(e) => setToken(key, e.target.value)}
                  />
                  <input
                    type="text"
                    className="ys-token-hex"
                    value={active.tokens[key]}
                    onChange={(e) => setToken(key, e.target.value)}
                    aria-label={`${label} hex`}
                  />
                </span>
              </label>
            ))}
            <div className="ys-token">
              <span className="lbl">Font</span>
              <div className="rail-segs">
                {(["sans", "serif", "mono"] as const).map((f) => (
                  <button
                    key={f}
                    className={"cl-seg" + (active.tokens.font === f ? " active" : "")}
                    onClick={() => setToken("font", f)}
                  >
                    {f === "sans" ? "Sans" : f === "serif" ? "Serif" : "Mono"}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <p className="text-[16px]" style={{ color: "var(--muted)", maxWidth: "60ch" }}>
            These power every component variant and the exported CSS. The font is a generic preview —
            set your exact brand font in your own CSS later.
          </p>
        </section>

        {/* buttons */}
        <section className="stack stack-3">
          <div className="flex items-end justify-between flex-wrap gap-2">
            <h2 className="ts-card-lg">Buttons</h2>
            <Link href="/components/buttons" className="lbl lplink" style={{ borderBottom: "none" }}>
              {emptyButtons ? "+ Add buttons" : "Edit buttons →"}
            </Link>
          </div>
          {emptyButtons ? (
            <p className="text-[16px]" style={{ color: "var(--muted)" }}>
              No buttons yet in this system. Open the{" "}
              <Link href="/components/buttons" className="lplink">
                Buttons playground
              </Link>{" "}
              and Save to design system.
            </p>
          ) : (
            <div className="ys-grid">
              {active.buttons.map((v) => (
                <div className="ys-card" key={v.id}>
                  <ButtonPreview s={v.s} label={v.name} />
                  <div className="ys-meta">
                    <span className="ys-name">{v.name}</span>
                    <button
                      className="ys-del"
                      onClick={() => removeButton(v.id)}
                      aria-label={`Delete ${v.name}`}
                    >
                      <Trash2 size={15} strokeWidth={1.6} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* export */}
        <section className="stack stack-3">
          <h2 className="ts-card-lg">Export {active.name}</h2>
          <div className="ys-export">
            <div className="flex items-center flex-wrap gap-2">
              {(["claude", "css", "tailwind"] as const).map((t) => (
                <button
                  key={t}
                  className={"chip" + (tab === t ? " active" : "")}
                  onClick={() => setTab(t)}
                >
                  {t === "claude" ? "Claude prompt" : t === "css" ? "CSS" : "Tailwind"}
                </button>
              ))}
              <button
                className={"lpbtn lpbtn--sm" + (copied ? " copied" : "")}
                style={{ marginLeft: "auto" }}
                onClick={copy}
              >
                {copied ? (
                  <>
                    <Check size={13} strokeWidth={1.5} /> Copied
                  </>
                ) : (
                  <>
                    <Clipboard size={13} strokeWidth={1.5} /> Copy
                  </>
                )}
              </button>
            </div>
            <pre className="ys-code">{exportText}</pre>
          </div>
        </section>
      </div>
    </main>
  );
}
