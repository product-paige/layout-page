"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, Copy, ChevronDown, MousePointerClick } from "lucide-react";

const QA: { q: string; a: string }[] = [
  {
    q: "What exactly do I get with a subscription?",
    a: "Unlimited access to every layout in the library as clean HTML & CSS. Copy any section, drop it into your project, and re-skin it with your own design tokens.",
  },
  {
    q: "Can I use these in client work?",
    a: "Yes. The Pro plan includes a commercial license, so you can ship these layouts in unlimited client and commercial projects.",
  },
  {
    q: "Do the layouts work with Claude and Lovable?",
    a: "They're framework-agnostic HTML & CSS, so they paste straight into Claude, Lovable, Shopify, Webflow, or a raw HTML file with no setup.",
  },
  {
    q: "How often are new layouts added?",
    a: "New sections drop every week and are included with your subscription at no extra cost — you'll see them appear in each category automatically.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. Cancel from your account in one click and keep access until the end of your billing period.",
  },
];

const CODE = `<section class="lp-faq">
  <div class="lp-faq__item" data-open>
    <button class="lp-faq__q">
      What exactly do I get with a subscription?
      <svg class="lp-faq__chev" ...></svg>
    </button>
    <div class="lp-faq__a"><p>Unlimited access to every layout…</p></div>
  </div>
  <!-- repeat .lp-faq__item per question -->
</section>

<style>
  .lp-faq{ max-width:680px; margin:0 auto; }
  .lp-faq__item{ border-bottom:1px solid var(--lp-rule, #e5e5e0); }
  .lp-faq__q{ width:100%; display:flex; justify-content:space-between;
    padding:22px 4px; font:500 17px/1 var(--lp-font, sans-serif);
    background:none; border:0; cursor:pointer; color:var(--lp-ink, #0a0a0a); }
  .lp-faq__chev{ transition:transform .22s; }
  .lp-faq__item[data-open] .lp-faq__chev{ transform:rotate(180deg); color:var(--lp-accent, #4337ff); }
  .lp-faq__a{ max-height:0; overflow:hidden; transition:max-height .26s; }
  .lp-faq__item[data-open] .lp-faq__a{ max-height:320px; }
  .lp-faq__a p{ padding:0 4px 22px; color:var(--lp-muted, #6b6b66); }
</style>

<script>
  document.querySelectorAll('.lp-faq__q').forEach(q => q.onclick = () => {
    const item = q.closest('.lp-faq__item');
    document.querySelectorAll('.lp-faq__item').forEach(i => i !== item && i.removeAttribute('data-open'));
    item.toggleAttribute('data-open');
  });
</script>`;

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [claudeFlash, setClaudeFlash] = useState(false);
  const [codeFlash, setCodeFlash] = useState(false);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setMaxHeights = () => {
    answerRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.maxHeight = i === openIndex ? el.scrollHeight + "px" : "";
    });
  };

  useEffect(() => {
    setMaxHeights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex, tab]);

  const toggle = (i: number) => setOpenIndex((cur) => (cur === i ? -1 : i));

  const flash = (which: "claude" | "code", text: string) => {
    if (which === "claude") {
      navigator.clipboard?.writeText(text);
      setClaudeFlash(true);
      window.setTimeout(() => setClaudeFlash(false), 1400);
    } else {
      navigator.clipboard?.writeText(text);
      setCodeFlash(true);
      window.setTimeout(() => setCodeFlash(false), 1400);
    }
  };

  const claudePrompt =
    "Add this FAQ accordion section to my page. Match my existing site's fonts, colors and spacing by mapping these CSS variables (--lp-ink, --lp-muted, --lp-accent, --lp-rule, --lp-font) to my tokens:\n\n" +
    CODE;

  return (
    <>
      {/* header + actions */}
      <section className="px-10 pt-10 pb-7 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="lbl">F·01</span>
            <span className="lbl text-royal">● Live example</span>
          </div>
          <h1 className="text-[clamp(30px,4vw,40px)]">FAQ · Accordion</h1>
          <p className="subhead text-muted mt-3 max-w-[58ch]">
            One question per row, expand on click. Best for long lists where you want the page short.
            Shown in its default unstyled skin — re-skin it with your own tokens after copying.
          </p>
        </div>
        <div className="flex gap-2.5">
          <button
            className={"btn btn-primary" + (claudeFlash ? " copied" : "")}
            onClick={() => flash("claude", claudePrompt)}
          >
            {claudeFlash ? (
              "✓ Copied for Claude"
            ) : (
              <>
                <Sparkles className="ico" size={16} strokeWidth={1.5} /> Copy for Claude
              </>
            )}
          </button>
          <button
            className={"btn btn-ghost" + (codeFlash ? " copied" : "")}
            onClick={() => flash("code", CODE)}
          >
            {codeFlash ? (
              "✓ Copied"
            ) : (
              <>
                <Copy className="ico" size={16} strokeWidth={1.5} /> Copy code
              </>
            )}
          </button>
        </div>
      </section>

      {/* preview / code toggle */}
      <div className="px-10 pb-5 border-b border-line flex items-center gap-2">
        <button
          className={"tabbtn" + (tab === "preview" ? " active" : "")}
          onClick={() => setTab("preview")}
        >
          Preview
        </button>
        <button
          className={"tabbtn" + (tab === "code" ? " active" : "")}
          onClick={() => setTab("code")}
        >
          Code
        </button>
        <span className="lbl ml-auto hidden sm:flex items-center gap-2">
          <MousePointerClick style={{ width: "14px", height: "14px" }} strokeWidth={1.5} /> Click a
          question
        </span>
      </div>

      {/* PREVIEW PANEL */}
      {tab === "preview" && (
        <section className="px-10 py-12 bg-panel">
          <div className="demo border border-line p-10 sm:p-16">
            <div className="text-center mb-10">
              <div className="lbl mb-3">Support</div>
              <h2 className="text-[clamp(22px,3.2vw,30px)]">Frequently asked questions</h2>
            </div>
            <div className="ac">
              {QA.map((item, i) => (
                <div className={"ac-item" + (openIndex === i ? " open" : "")} key={i}>
                  <button className="ac-q" onClick={() => toggle(i)}>
                    {item.q}{" "}
                    <ChevronDown
                      className="chev ico"
                      style={{ width: "20px", height: "20px" }}
                      strokeWidth={1.5}
                    />
                  </button>
                  <div
                    className="ac-a"
                    ref={(el) => {
                      answerRefs.current[i] = el;
                    }}
                  >
                    <div>{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CODE PANEL */}
      {tab === "code" && (
        <section className="px-10 py-8">
          <pre className="border border-line bg-[#0E0E10] text-[#E8E8E6] text-[13px] leading-relaxed p-6 overflow-x-auto mono">
            <code>{CODE}</code>
          </pre>
          <p className="lbl mt-4">
            Tokens used:{" "}
            <span className="text-royal">--lp-ink · --lp-muted · --lp-accent · --lp-rule · --lp-font</span>{" "}
            — override these to re-skin.
          </p>
        </section>
      )}
    </>
  );
}
