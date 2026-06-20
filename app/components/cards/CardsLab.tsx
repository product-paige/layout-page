"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Asterisk, CornerDownRight, Code, Bookmark, BookmarkCheck } from "lucide-react";
import "./cards.css";

const PADS = [
  { v: "10", label: "XS 10" },
  { v: "12", label: "S 12" },
  { v: "16", label: "M 16" },
  { v: "32", label: "L 32" },
  { v: "40", label: "XL 40" },
];

type Cta = "button" | "arrow" | "none";

// Inline asterisk SVG used in copied snippets (mirrors lucide "asterisk")
const ASTERISK_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="cl-mark"><path d="M12 6v12"/><path d="M17.196 9 6.804 15"/><path d="m6.804 9 10.392 6"/></svg>';

export default function CardsLab() {
  const [radius, setRadius] = useState(0);
  const [pad, setPad] = useState("16");
  const [border, setBorder] = useState("0");
  const [cta, setCta] = useState<Cta>("arrow");

  // refs to every card so we can read its own inner markup when copying
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [savedIdx, setSavedIdx] = useState<Set<number>>(new Set());

  const labStyle = {
    "--cl-radius": radius + "px",
    "--cl-pad": pad + "px",
    "--cl-bw": border + "px",
  } as React.CSSProperties;

  function clearStyles() {
    setRadius(0);
    setPad("16");
    setBorder("0");
    setCta("arrow");
  }

  function buildSnippet(card: HTMLElement) {
    const r = radius + "px";
    const padPx = pad + "px";
    const bw = border + "px";

    const clone = card.cloneNode(true) as HTMLElement;
    // strip the hover action toolbar so it never lands in the snippet
    clone.querySelectorAll(".cl-actions").forEach((e) => e.remove());
    // ensure placeholders carry a portable inline-SVG mark
    clone.querySelectorAll(".cl-ph").forEach((ph) => {
      if (!ph.querySelector(".cl-mark")) ph.innerHTML = ASTERISK_SVG;
    });
    const inner = clone.innerHTML.replace(/\s+$/, "");

    const css =
      ".card{font-family:Inter,system-ui,sans-serif;background:#fff;color:#161616;border:" +
      bw +
      " solid #e4e4e0;border-radius:" +
      r +
      ";padding:" +
      padPx +
      ";aspect-ratio:4/5;display:flex;flex-direction:column;gap:12px;overflow:hidden}\n" +
      ".card .cl-group{display:flex;flex-direction:column;gap:12px}\n.card .cl-headsub{display:flex;flex-direction:column;gap:8px}\n.card .cl-grow{flex:1}\n" +
      ".card .cl-ph{flex:1;background:#dcdcd9;border-radius:calc(" +
      r +
      " * .6);display:grid;place-items:center}\n.card .cl-mark{width:30%;max-width:58px;color:#161616}\n" +
      ".card .cl-eyebrow{font-size:13px;text-transform:uppercase;letter-spacing:.06em;color:#6b6b66;font-weight:500}\n" +
      ".card .cl-title{font-weight:500;font-size:19px;letter-spacing:-.02em;line-height:1.14}\n.card .cl-text{font-size:16px;line-height:1.3;color:#6b6b66}\n" +
      ".card .cl-num{font-weight:500;font-size:34px;line-height:1;letter-spacing:-.03em}\n.card .cl-row{display:flex;justify-content:space-between;padding:7px 0;border-top:1px solid #e4e4e0;font-size:13px}\n" +
      ".card .cl-cta{display:inline-flex;align-items:center;gap:8px;font-size:15px;font-weight:500;align-self:flex-start;" +
      (cta === "button"
        ? "background:#161616;color:#fff;padding:9px 18px;border-radius:999px;"
        : "color:#161616;") +
      "}";

    return (
      "<!-- layout.page card · radius " +
      r +
      " · padding " +
      padPx +
      " · border " +
      bw +
      " · Inter -->\n<style>\n" +
      css +
      "\n</style>\n<article class=\"card\">" +
      inner +
      "</article>"
    );
  }

  function copyCard(i: number) {
    const card = cardRefs.current[i];
    if (!card) return;
    if (navigator.clipboard) navigator.clipboard.writeText(buildSnippet(card));
    setCopiedIdx(i);
    window.setTimeout(() => {
      setCopiedIdx((cur) => (cur === i ? null : cur));
    }, 1200);
  }

  function toggleSave(i: number) {
    setSavedIdx((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  // per-card hover toolbar (copy html + save bookmark)
  function Actions({ i }: { i: number }) {
    const copied = copiedIdx === i;
    const saved = savedIdx.has(i);
    return (
      <div className="cl-actions">
        <button
          type="button"
          className={"cl-act cl-copy" + (copied ? " copied" : "")}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            copyCard(i);
          }}
        >
          {copied ? (
            "✓ Copied"
          ) : (
            <>
              <Code style={{ width: 13, height: 13 }} strokeWidth={1.5} /> Copy HTML
            </>
          )}
        </button>
        <button
          type="button"
          aria-label="Save"
          className={"cl-act cl-save" + (saved ? " saved" : "")}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSave(i);
          }}
        >
          {saved ? (
            <BookmarkCheck style={{ width: 13, height: 13 }} strokeWidth={1.5} />
          ) : (
            <Bookmark style={{ width: 13, height: 13 }} strokeWidth={1.5} />
          )}
        </button>
      </div>
    );
  }

  const cta_arrow = <CornerDownRight className="cl-cta-arrow" strokeWidth={1.5} />;
  const setCard = (i: number) => (el: HTMLElement | null) => {
    cardRefs.current[i] = el;
  };

  return (
    <div className="cardlab-page lp-shell">
      {/* ============================ CONTEXTUAL LEFT RAIL ============================ */}
      <aside className="lp-rail">
        <div className="lbl" style={{ marginBottom: 8 }}>
          Components
        </div>
        <nav className="rail-nav">
          <Link href="/components/cards" className="active">
            Cards
          </Link>
          <Link href="/components/buttons">Buttons</Link>
        </nav>
        <div className="lbl" style={{ margin: "18px 0 14px" }}>
          Controls — Cards
        </div>

        <div className="rail-ctrl">
          <div className="rail-head">
            <span className="lbl">Radius</span>
            <span className="cl-val">{radius}px</span>
          </div>
          <input
            type="range"
            min={0}
            max={36}
            step={2}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="cl-range"
            aria-label="Card radius"
          />
        </div>

        <div className="rail-ctrl">
          <span className="lbl">Padding</span>
          <div className="rail-segs">
            {PADS.map((p) => (
              <button
                key={p.v}
                className={"cl-seg" + (pad === p.v ? " active" : "")}
                onClick={() => setPad(p.v)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rail-ctrl">
          <span className="lbl">Borders</span>
          <div className="rail-segs">
            <button
              className={"cl-seg" + (border === "0" ? " active" : "")}
              onClick={() => setBorder("0")}
            >
              Off
            </button>
            <button
              className={"cl-seg" + (border === "1" ? " active" : "")}
              onClick={() => setBorder("1")}
            >
              On
            </button>
          </div>
        </div>

        <div className="rail-ctrl">
          <span className="lbl">Action</span>
          <div className="rail-segs">
            <button
              className={"cl-seg" + (cta === "button" ? " active" : "")}
              onClick={() => setCta("button")}
            >
              Button
            </button>
            <button
              className={"cl-seg" + (cta === "arrow" ? " active" : "")}
              onClick={() => setCta("arrow")}
            >
              Arrow
            </button>
            <button
              className={"cl-seg" + (cta === "none" ? " active" : "")}
              onClick={() => setCta("none")}
            >
              None
            </button>
          </div>
        </div>

        <button className="rail-clear" onClick={clearStyles}>
          Clear styles
        </button>
      </aside>

      {/* ============================ MAIN ============================ */}
      <main className="flex-1 min-w-0">
        <div className="stack stack-3 px-8 py-9" id="cards">
          <div className="flex items-end justify-between flex-wrap gap-3">
            <div className="stack stack-1">
              <h1 className="ts-section-lg">Cards</h1>
              <p className="text-[16px]" style={{ color: "var(--muted)" }}>
                Adjust the controls on the left — every card updates live.
              </p>
            </div>
            <span className="lbl">Inter · Lorem ipsum</span>
          </div>

          <div className="cardlab" data-cta={cta} style={labStyle}>
            {/* icon tile card */}
            <article className="cl-card" ref={setCard(0)}>
              <div className="cl-icontile">
                <Asterisk strokeWidth={1.5} />
              </div>
              <div className="cl-grow"></div>
              <div className="cl-group">
                <div className="cl-headsub">
                  <div className="cl-title">Lorem ipsum</div>
                  <div className="cl-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.
                  </div>
                </div>
              </div>
              <Actions i={0} />
            </article>

            {/* 1 · media + mark + CTA */}
            <article className="cl-card" ref={setCard(1)}>
              <div className="cl-ph cl-ph--dots cl-grow">
                <Asterisk className="cl-mark" strokeWidth={1.5} />
              </div>
              <div className="cl-group">
                <div className="cl-headsub">
                  <div className="cl-title">Lorem ipsum dolor</div>
                  <div className="cl-text">
                    Lorem ipsum dolor sit amet — consectetur adipiscing elit, sed do eiusmod tempor.
                  </div>
                </div>
              </div>
              <span className="cl-cta">
                Learn more{cta_arrow}
              </span>
              <Actions i={1} />
            </article>

            {/* 2 · media top + CTA */}
            <article className="cl-card" ref={setCard(2)}>
              <div className="cl-ph cl-grow">
                <Asterisk className="cl-mark" strokeWidth={1.5} />
              </div>
              <div className="cl-group">
                <div className="cl-headsub">
                  <div className="cl-title">Lorem ipsum</div>
                  <div className="cl-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                </div>
              </div>
              <span className="cl-cta">
                Learn more{cta_arrow}
              </span>
              <Actions i={2} />
            </article>

            {/* 3 · list + CTA */}
            <article className="cl-card" ref={setCard(3)}>
              <div className="cl-group">
                <div className="cl-eyebrow">Lorem</div>
                <div className="cl-title">Dolor sit amet</div>
              </div>
              <div
                className="cl-grow"
                style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
              >
                <div className="cl-row">Lorem ipsum</div>
                <div className="cl-row">Dolor sit amet</div>
                <div className="cl-row">Consectetur elit</div>
              </div>
              <span className="cl-cta">
                Learn more{cta_arrow}
              </span>
              <Actions i={3} />
            </article>

            {/* 4 · stat */}
            <article className="cl-card" ref={setCard(4)}>
              <div className="cl-eyebrow">Lorem</div>
              <div className="cl-num">2 dies</div>
              <div
                className="cl-grow"
                style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-end" }}
              >
                <span
                  className="cl-num"
                  style={{ fontSize: "clamp(40px,7vw,72px)", color: "var(--line)" }}
                >
                  3
                </span>
              </div>
              <div className="cl-group">
                <div className="cl-headsub">
                  <div className="cl-title">Lorem ipsum</div>
                  <div className="cl-text">Lorem ipsum dolor sit amet adipiscing.</div>
                </div>
              </div>
              <Actions i={4} />
            </article>

            {/* 5 · media bottom + CTA */}
            <article className="cl-card" ref={setCard(5)}>
              <div className="cl-group">
                <div className="cl-eyebrow">Lorem</div>
                <div className="cl-headsub">
                  <div className="cl-title">Adipiscing elit</div>
                  <div className="cl-text">Lorem ipsum dolor sit amet.</div>
                </div>
              </div>
              <span className="cl-cta">
                Learn more{cta_arrow}
              </span>
              <div className="cl-ph cl-grow">
                <Asterisk className="cl-mark" strokeWidth={1.5} />
              </div>
              <Actions i={5} />
            </article>

            {/* 6 · overlay */}
            <article className="cl-card cl-overlay" ref={setCard(6)}>
              <div className="cl-ph cl-grow">
                <Asterisk className="cl-mark" strokeWidth={1.5} />
              </div>
              <div className="cl-cap">
                <div className="cl-title">Lorem ipsum</div>
              </div>
              <Actions i={6} />
            </article>

            {/* 7 · two media */}
            <article className="cl-card" ref={setCard(7)}>
              <div className="cl-group">
                <div className="cl-headsub">
                  <div className="cl-title">Sed do eiusmod</div>
                  <div className="cl-text">Lorem ipsum dolor sit amet.</div>
                </div>
              </div>
              <div className="cl-grow" style={{ display: "flex", gap: 10 }}>
                <div className="cl-ph" style={{ flex: 1 }}>
                  <Asterisk className="cl-mark" strokeWidth={1.5} />
                </div>
                <div className="cl-ph" style={{ flex: 1 }}>
                  <Asterisk className="cl-mark" strokeWidth={1.5} />
                </div>
              </div>
              <Actions i={7} />
            </article>

            {/* 8 · split media + content */}
            <article className="cl-card" ref={setCard(8)}>
              <div className="cl-ph" style={{ height: "42%" }}>
                <Asterisk className="cl-mark" strokeWidth={1.5} />
              </div>
              <div className="cl-group">
                <div className="cl-eyebrow">Lorem</div>
                <div className="cl-headsub">
                  <div className="cl-title">Tempor incididunt</div>
                  <div className="cl-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do.
                  </div>
                </div>
              </div>
              <Actions i={8} />
            </article>

            {/* 9 · quote */}
            <article className="cl-card" ref={setCard(9)}>
              <div className="cl-num" style={{ fontSize: 48, lineHeight: 0.8, color: "var(--line)" }}>
                &ldquo;
              </div>
              <div
                className="cl-title cl-grow"
                style={{ fontWeight: 500, fontSize: 17, display: "flex", alignItems: "center" }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
              <div className="cl-eyebrow">Lorem ipsum</div>
              <Actions i={9} />
            </article>
          </div>
        </div>
      </main>
    </div>
  );
}
