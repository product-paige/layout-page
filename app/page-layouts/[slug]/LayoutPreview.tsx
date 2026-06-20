"use client";

import { useState } from "react";

type Mode = "neutral" | "dark" | "color";

const MODES: { value: Mode; label: string }[] = [
  { value: "neutral", label: "Neutral" },
  { value: "dark", label: "Dark" },
  { value: "color", label: "Color" },
];

/**
 * Live full-page preview with a mode switcher that re-skins every section
 * at once by flipping data-mode on the .sx-canvas (mirrors page-layout.html).
 */
export default function LayoutPreview({
  styleSystem,
  html,
  sectionCount,
}: {
  styleSystem: string;
  html: string;
  sectionCount: string;
}) {
  const [mode, setMode] = useState<Mode>("neutral");

  return (
    <>
      {/* mode controls */}
      <section className="lp-hero" style={{ paddingTop: 0, borderBottom: "none" }}>
        <div className="flex items-center gap-3">
          <span className="lbl">Mode</span>
          <div className="flex gap-2">
            {MODES.map((m) => (
              <button
                key={m.value}
                type="button"
                className={"modebtn" + (mode === m.value ? " active" : "")}
                onClick={() => setMode(m.value)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* live full-page preview */}
      <div className="px-10 py-10" style={{ background: "var(--panel)" }}>
        <div className="browser">
          <div className="browser-bar">
            <span className="browser-dot" />
            <span className="browser-dot" />
            <span className="browser-dot" />
            <span className="browser-addr" />
          </div>
          <div
            className="sx-canvas browser-body"
            data-system={styleSystem}
            data-mode={mode}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
        <p className="lbl mt-4">{sectionCount}</p>
      </div>
    </>
  );
}
