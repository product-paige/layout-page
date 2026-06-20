import Link from "next/link";
import { LayoutGrid, Pilcrow, Layers, CornerDownRight } from "lucide-react";

const CATEGORIES = [
  { cat: "Header", count: 18 },
  { cat: "Hero", count: 26 },
  { cat: "Features", count: 22 },
  { cat: "Content", count: 19 },
  { cat: "Testimonials", count: 16 },
  { cat: "Pricing", count: 14 },
  { cat: "FAQ", count: 12 },
  { cat: "Footer", count: 15 },
];

export default function Home() {
  return (
    <main className="min-w-0">
      {/* HERO */}
      <section className="px-10 py-10 border-b border-line">
        <div className="relative bg-royal text-white overflow-hidden" style={{ minHeight: 520 }}>
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid slice"
            viewBox="0 0 1180 520"
            fill="none"
            stroke="white"
            strokeWidth={1}
            opacity={0.55}
          >
            <path d="M0 0 L470 195 M1180 0 L710 195 M0 520 L470 325 M1180 520 L710 325" />
            <rect x="470" y="195" width="240" height="130" />
            <rect x="525" y="225" width="130" height="70" opacity={0.8} />
            <rect x="560" y="245" width="60" height="30" opacity={0.6} />
          </svg>
          <div className="relative px-12 pt-14 pb-12 flex flex-col h-full" style={{ minHeight: 520 }}>
            <h1 className="ts-page-hero max-w-[20ch]">
              Never start a page
              <br />
              from scratch.
            </h1>
            <p className="subhead mt-auto pt-10 max-w-[60ch] text-white">
              Start from a proven section, add your copy, then re-skin it with one token set. Built
              for Claude, Lovable, Webflow, and plain HTML.
            </p>
          </div>
        </div>
      </section>

      {/* WORKS WITH */}
      <section className="px-10 py-10 border-b border-line">
        <div className="flex border border-line lbl">
          <span className="px-6 py-4 border-r border-line whitespace-nowrap">Works with</span>
          <span className="flex-1 grid grid-cols-2 sm:grid-cols-5">
            <span className="lbl text-ink text-center py-4 border-r border-linesoft">Claude</span>
            <span className="lbl text-ink text-center py-4 border-r border-linesoft">Lovable</span>
            <span className="lbl text-ink text-center py-4 border-r border-linesoft">Webflow</span>
            <span className="lbl text-ink text-center py-4 border-r border-linesoft">Framer</span>
            <span className="lbl text-ink text-center py-4">Figma</span>
          </span>
        </div>
      </section>

      {/* WHY */}
      <section className="px-10 py-10 border-b border-line">
        <div className="flex items-end justify-between px-1 pb-6">
          <h2 className="ts-section-lg flex-1">The part everyone gets stuck on</h2>
          <span className="lbl text-royal">
            01<span className="lbl-sq" />Why
          </span>
        </div>
        <div className="grid md:grid-cols-3 border-t border-l border-line">
          <div className="border-r border-b border-line p-8">
            <div className="w-10 h-10 border border-royal grid place-items-center text-royal mb-5">
              <LayoutGrid className="ico" size={16} strokeWidth={1.25} />
            </div>
            <h3 className="ts-card-sm mb-2">Start from structure</h3>
            <p className="text-[16px] text-muted">Skip the blank canvas — start from a proven layout pattern.</p>
          </div>
          <div className="border-r border-b border-line p-8">
            <div className="w-10 h-10 border border-royal grid place-items-center text-royal mb-5">
              <Pilcrow className="ico" size={16} strokeWidth={1.25} />
            </div>
            <h3 className="ts-card-sm mb-2">Fit the copy</h3>
            <p className="text-[16px] text-muted">Slots ready for headlines, subheads, CTAs, lists, and cards.</p>
          </div>
          <div className="border-r border-b border-line p-8">
            <div className="w-10 h-10 border border-royal grid place-items-center text-royal mb-5">
              <Layers className="ico" size={16} strokeWidth={1.25} />
            </div>
            <h3 className="ts-card-sm mb-2">Skin it with tokens</h3>
            <p className="text-[16px] text-muted">One token set controls spacing, type, color, radius, and borders.</p>
          </div>
        </div>
      </section>

      {/* BROWSE BY CATEGORY */}
      <section className="px-10 py-10 border-b border-line">
        <div className="flex items-end justify-between px-1 pb-6">
          <h2 className="ts-section-lg">Browse by category</h2>
          <span className="lbl text-royal">
            02<span className="lbl-sq" />Categories
          </span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-line">
          {CATEGORIES.map((c) => (
            <Link key={c.cat} href={`/sections?cat=${c.cat}`} className="catcard">
              <span className="lbl catcount">{c.count} layouts</span>
              <span className="cattitle">
                {c.cat} <CornerDownRight className="ico" size={16} strokeWidth={1.25} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* SYSTEM */}
      <section className="px-10 py-10 border-b border-line">
        <div className="flex items-end justify-between px-1 pb-4">
          <h2 className="ts-section-lg flex-1">Every layout follows the same rules.</h2>
          <span className="lbl text-royal">
            03<span className="lbl-sq" />System
          </span>
        </div>
        <p className="text-muted max-w-[60ch] px-1 pb-6">
          Every section is built from the same primitives, then styled with one token set — so your
          hero, pricing, and footer all belong together.
        </p>
        <div className="flex flex-wrap gap-2 px-1 pb-7">
          <span className="tag">Structure-first</span>
          <span className="tag">Token-ready</span>
          <span className="tag">Copy-fit</span>
          <span className="tag">Responsive</span>
          <span className="tag">Accessible</span>
          <span className="tag">HTML/CSS</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-line">
          {[
            { n: "01", h: "Shared section shell", p: "Every layout starts with the same section, container, and spacing system." },
            { n: "02", h: "Copy-sized slots", p: "Headlines, subheads, CTAs, lists, and cards are sized to fit the structure." },
            { n: "03", h: "Token-based styling", p: "Change type, color, spacing, and radius without rebuilding the layout." },
            { n: "04", h: "Export-ready code", p: "Clean HTML and CSS you can paste into Claude, Lovable, or Webflow." },
          ].map((s) => (
            <div key={s.n} className="border-r border-b border-line p-7">
              <div className="lbl text-royal mb-4">{s.n}</div>
              <h3 className="ts-card-sm mb-2">{s.h}</h3>
              <p className="text-[16px] text-muted">{s.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px-10 py-10 border-b border-line">
        <div className="flex items-end justify-between px-1 pb-6">
          <h2 className="ts-section-lg">Get the whole library for one yearly price.</h2>
          <span className="lbl text-royal">
            04<span className="lbl-sq" />Pricing
          </span>
        </div>
        <div className="grid md:grid-cols-2 border-t border-l border-line">
          <div className="border-r border-b border-line p-9 flex flex-col">
            <div className="lbl mb-5">Free</div>
            <div className="text-[44px] font-semibold leading-none">$0</div>
            <p className="text-muted mt-3 mb-6 max-w-[42ch] leading-snug">
              Browse the whole library and copy a starter set. No card needed.
            </p>
            <ul className="mb-8">
              <li className="py-2.5 border-t border-linesoft lbl">Preview all 240 layouts</li>
              <li className="py-2.5 border-t border-linesoft lbl">Copy 12 free sections</li>
              <li className="py-2.5 border-t border-linesoft lbl">1 category unlocked</li>
            </ul>
            <a href="#" className="lpbtn lpbtn--secondary lpbtn--full mt-auto">
              <CornerDownRight className="ico" size={15} strokeWidth={1.25} />
              Start free
            </a>
          </div>
          <div className="border-r border-b border-line p-9 bg-navy text-cream flex flex-col">
            <div className="lbl mb-5 text-tint">Pro · Annual</div>
            <div className="text-[44px] font-semibold leading-none">
              $96<span className="text-[16px] font-normal text-cream/60"> / year</span>
            </div>
            <p className="text-cream/70 mt-3 mb-6 max-w-[42ch] leading-snug">
              Every layout and every style, unlimited copies, plus new sections added each week.
            </p>
            <ul className="mb-8">
              <li className="py-2.5 border-t border-cream/20 lbl text-cream/80">All 240 structure-first layouts</li>
              <li className="py-2.5 border-t border-cream/20 lbl text-cream/80">Every category, style &amp; token theme</li>
              <li className="py-2.5 border-t border-cream/20 lbl text-cream/80">Copy-fit notes for each section</li>
              <li className="py-2.5 border-t border-cream/20 lbl text-cream/80">&quot;Copy for Claude&quot; mode</li>
              <li className="py-2.5 border-t border-cream/20 lbl text-cream/80">HTML/CSS + Shopify exports</li>
            </ul>
            <a href="#" className="lpbtn lpbtn--primary lpbtn--full mt-auto">
              <CornerDownRight className="ico" size={15} strokeWidth={1.25} />
              Get Pro for $96/yr
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
