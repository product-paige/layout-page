"use client";

import { useState } from "react";
import Link from "next/link";
import { Clipboard, Check, Trash2 } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useDesignSystem } from "@/components/DesignSystemProvider";
import { ButtonPreview } from "@/components/ButtonPreview";
import { exportSystem, type ExportTab } from "@/lib/ds";
import "@/app/components/buttons/buttons.css";
import "./your-system.css";

export default function YourSystem() {
  const { ds, removeButton, clearAll } = useDesignSystem();
  const [tab, setTab] = useState<ExportTab>("claude");
  const [copied, setCopied] = useState(false);

  const empty = ds.buttons.length === 0;
  const exportText = exportSystem(ds, tab);

  function copy() {
    if (navigator.clipboard) navigator.clipboard.writeText(exportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <main className="your-system-page px-8 py-9">
      <Breadcrumbs items={[{ label: "Overview", href: "/" }, { label: "Your System" }]} />
      <div className="stack stack-2 mt-5 mb-8">
        <h1 className="ts-page-hero">Your design system</h1>
        <p className="lp-hero-support" style={{ maxWidth: "64ch" }}>
          Everything you save across the component playgrounds collects here. Export the whole system
          as a Claude prompt, CSS, or Tailwind. Saved in your browser.
        </p>
      </div>

      {empty ? (
        <div className="ys-empty">
          <p className="text-[16px]" style={{ color: "var(--muted)" }}>
            Your system is empty. Open a playground, tune a component, and{" "}
            <span style={{ color: "var(--ink)" }}>Save to design system</span>.
          </p>
          <Link href="/components/buttons" className="lpbtn lpbtn--primary lpbtn--sm">
            Start with Buttons
          </Link>
        </div>
      ) : (
        <div className="stack stack-6">
          <section className="stack stack-3">
            <div className="flex items-end justify-between flex-wrap gap-2">
              <h2 className="ts-card-lg">Buttons</h2>
              <span className="lbl">
                {ds.buttons.length} variant{ds.buttons.length === 1 ? "" : "s"}
              </span>
            </div>
            <div className="ys-grid">
              {ds.buttons.map((v) => (
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
          </section>

          <section className="stack stack-3">
            <h2 className="ts-card-lg">Export your system</h2>
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
            <button
              className="lpbtn lpbtn--sm"
              style={{ maxWidth: 220 }}
              onClick={() => {
                if (confirm("Clear your whole design system?")) clearAll();
              }}
            >
              Clear system
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
