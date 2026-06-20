"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CornerDownRight } from "lucide-react";
import type { Section } from "@/lib/sections";

type Mode = "neutral" | "dark" | "color";

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

export default function SectionsBrowser({
  sections,
  categories,
}: {
  sections: Section[];
  categories: string[];
}) {
  const searchParams = useSearchParams();

  // ?cat=Hero pre-filter (falls back gracefully to "all" when the cat is unknown)
  const initialCat = useMemo(() => {
    const cat = searchParams.get("cat");
    return cat && categories.includes(cat) ? cat : "all";
  }, [searchParams, categories]);

  const [activeCat, setActiveCat] = useState(initialCat);
  const [system, setSystem] = useState("structured-editorial");
  const [mode, setMode] = useState<Mode>("neutral");

  // keep the active category in sync if the query param changes (e.g. nav from home)
  useEffect(() => {
    setActiveCat(initialCat);
  }, [initialCat]);

  const visible = useMemo(
    () => sections.filter((s) => activeCat === "all" || s.category === activeCat),
    [sections, activeCat]
  );

  // ---- scale thumbnails (preview rendered at 1100px wide, scaled to the card width) ----
  const gridRef = useRef<HTMLDivElement>(null);
  function scaleThumbs() {
    const grid = gridRef.current;
    if (!grid) return;
    grid.querySelectorAll<HTMLElement>(".thumb").forEach((t) => {
      const inner = t.querySelector<HTMLElement>(".thumb-inner");
      if (inner) inner.style.transform = "scale(" + t.clientWidth / 1100 + ")";
    });
  }
  useEffect(() => {
    scaleThumbs();
    // a second pass after fonts/layout settle (mirrors the source's setTimeout)
    const t = window.setTimeout(scaleThumbs, 60);
    window.addEventListener("resize", scaleThumbs);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", scaleThumbs);
    };
  });

  return (
    <>
      {/* ===================== FILTERS ===================== */}
      <div className="stack stack-3 px-10 pt-7 pb-7 border-b border-line">
        <div className="stack stack-1">
          <div className="lbl">Category</div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={"chip" + (activeCat === c ? " active" : "")}
                onClick={() => setActiveCat(c)}
              >
                {c === "all" ? "All" : c}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-x-12 gap-y-5">
          <div className="stack stack-1">
            <div className="lbl">Design System</div>
            <div className="flex flex-wrap gap-2">
              {SYSTEMS.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  disabled={s.soon}
                  className={
                    "chip" +
                    (!s.soon && system === s.value ? " active" : "") +
                    (s.soon ? " sysoff" : "")
                  }
                  onClick={() => !s.soon && setSystem(s.value)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* result count + Mode switcher */}
      <div className="px-10 py-4 border-b border-line flex items-center justify-between gap-4 flex-wrap">
        <span className="lbl">
          {visible.length} {visible.length === 1 ? "section" : "sections"}
        </span>
        <div className="flex items-center gap-3">
          <span className="lbl">Mode</span>
          <div className="flex flex-wrap gap-2">
            {MODES.map((m) => (
              <button
                key={m.value}
                type="button"
                className={"chip" + (mode === m.value ? " active" : "")}
                onClick={() => setMode(m.value)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===================== CATALOG GRID ===================== */}
      <section className="grid grid-cat" ref={gridRef}>
        {visible.map((s) => {
          const href = `/sections/${s.id}`;
          return (
            <article className="card" key={s.id}>
              <Link href={href} style={{ display: "block" }}>
                <div className="thumb">
                  <div
                    className="thumb-inner sx-canvas"
                    data-system={system}
                    data-mode={mode}
                    dangerouslySetInnerHTML={{ __html: s.html }}
                  />
                </div>
              </Link>
              <div className="p-7 stack stack-3 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <Link
                    href={href}
                    className="text-[22px] font-medium leading-tight tracking-tight hover:text-royal"
                  >
                    {s.title}
                  </Link>
                  <span className="meta-pill shrink-0">{s.category}</span>
                </div>
                <p className="text-[16px] line-clamp-2" style={{ color: "var(--muted)" }}>
                  {s.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <Link className="lpbtn lpbtn--secondary lpbtn--sm lpbtn--full mt-auto" href={href}>
                  <CornerDownRight className="ico" size={13} strokeWidth={1.25} /> View section
                </Link>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
