/* ============================================================
   layout.page — SECTION DATA  (source of truth for the catalog)
   Ported from layout-system/sections-data.js.
   Every section is a structured record. Previews, the library,
   page-layout examples, and copy/export are generated from this.
   HTML uses ONLY the .sx-* section primitives + the --sx-*
   Structured Editorial contract, so every section re-skins across
   Design Systems and Modes (Neutral / Dark / Color) with zero edits.
   ============================================================ */

export type SectionMode = "neutral" | "dark" | "color";

export interface SectionCopyFit {
  [slot: string]: string;
}

export interface Section {
  id: string;
  category: string;
  title: string;
  description: string;
  structure: string;
  structureTags: string[];
  bestFor: string[];
  copyFit: SectionCopyFit;
  includes: string;
  primitives: string[];
  tags: string[];
  modes: SectionMode[];
  /** Raw section preview markup using the .sx-* primitives. Rendered via dangerouslySetInnerHTML inside a [data-system] wrapper. */
  html: string;
  /** A ready-to-use Claude prompt describing how to reuse the section. */
  claudePrompt: string;
}

export interface PageLayout {
  id: string;
  title: string;
  description: string;
  styleSystem: string;
  category: string;
  tags: string[];
  /** Ordered list of section ids that compose this page. */
  sections: string[];
}

export const SECTIONS: Section[] = [
  {
    id: "header-overlay-01",
    category: "Header",
    title: "Header Overlay 01",
    description:
      "A transparent header over a hero/media background: brand left, primary nav with a hover mega menu, and a CTA on the right.",
    structure:
      "Brand mark and inline nav on the left (one item opens a mega menu), primary CTA on the right, laid over a media background.",
    structureTags: ["overlay", "nav", "with-cta"],
    bestFor: ["Marketing homepage", "Landing page", "Campaign page", "Editorial site"],
    copyFit: { brand: "1 word / mark", nav: "3–6 links", cta: "1 short button (1–2 words)" },
    includes: "Brand, nav with mega menu, CTA",
    primitives: [
      "sx-overlay",
      "sx-wrap",
      "sx-nav",
      "sx-navlink",
      "sx-nav-item",
      "sx-megamenu",
      "sx-megamenu-col",
      "sx-megamenu-promo",
      "sx-eyebrow",
      "sx-media",
      "sx-meta",
      "sx-btn",
    ],
    tags: ["Overlay", "Nav", "Mega menu", "CTA", "Editorial"],
    modes: ["neutral", "dark", "color"],
    html: `<header class="sx-overlay" style="min-height:160px;display:flex;align-items:flex-start;overflow:visible;z-index:40">
  <div class="sx-overlay-media" aria-hidden="true"></div>
  <div class="sx-overlay-content sx-wrap sx-between" style="padding:var(--sx-space-4)">
    <div class="sx-cluster" style="gap:var(--sx-space-5)">
      <span class="sx-eyebrow sx-eyebrow--ink">[ Northwind ]</span>
      <nav class="sx-nav" aria-label="Primary">
        <div class="sx-nav-item">
          <a class="sx-navlink" href="#">Solutions <span aria-hidden="true">▾</span></a>
          <div class="sx-megamenu">
            <div class="sx-megamenu-col">
              <span class="sx-eyebrow">Services</span>
              <a href="#">Freight optimization</a>
              <a href="#">Energy systems</a>
              <a href="#">Logistics intelligence</a>
              <a href="#">Always-on support</a>
            </div>
            <div class="sx-megamenu-col">
              <span class="sx-eyebrow">Company</span>
              <a href="#">About</a>
              <a href="#">Process</a>
              <a href="#">Customers</a>
              <a href="#">Careers</a>
            </div>
            <div class="sx-megamenu-promo">
              <div class="sx-media" style="aspect-ratio:16/10" aria-hidden="true"></div>
              <span class="sx-eyebrow">[ Featured ]</span>
              <p class="sx-meta" style="margin:0">See how teams run calmer operations.</p>
            </div>
          </div>
        </div>
        <a class="sx-navlink" href="#">Industries</a>
        <a class="sx-navlink" href="#">About</a>
        <a class="sx-navlink" href="#">Resources</a>
      </nav>
    </div>
    <a class="sx-btn sx-btn--primary" href="#" style="height:42px;padding-inline:20px;font-size:14px">Get started</a>
  </div>
</header>`,
    claudePrompt:
      "Use the Header Overlay 01 structure: brand left, an inline primary nav where one item opens a mega-menu dropdown (two link columns plus a small featured promo), and a CTA button on the right — laid over a media background. Replace the brand, nav links, mega-menu links, and CTA with my content. Keep the hover-driven mega menu and the .sx-* token-based classes so it re-skins across modes.",
  },

  {
    id: "hero-media-card-01",
    category: "Hero",
    title: "Hero Media Card 01",
    description:
      "A full-bleed media hero with a large content card overlaid on the left and a small floating proof card near the bottom-right.",
    structure:
      "Media background fills the section. A content card (eyebrow, heading, body, CTA) sits over the left; a small avatar + quote proof card floats lower-right.",
    structureTags: ["overlay", "with-media", "with-proof", "card"],
    bestFor: ["Operations / consulting homepage", "B2B SaaS", "Services landing page", "Agency"],
    copyFit: {
      eyebrow: "1 short label",
      heading: "3–8 words (can wrap)",
      body: "1 short paragraph (15–28 words)",
      cta: "1 primary button",
      proof: "avatar/logo + 1 short line",
    },
    includes: "Eyebrow, heading, body, CTA, floating proof card",
    primitives: [
      "sx-overlay",
      "sx-card",
      "sx-eyebrow",
      "sx-display",
      "sx-body",
      "sx-cta",
      "sx-btn",
      "sx-avatar",
      "sx-meta",
    ],
    tags: ["Overlay", "Media", "Proof", "Editorial"],
    modes: ["neutral", "dark", "color"],
    html: `<section class="sx-overlay" aria-label="Hero" style="min-height:460px;display:flex;padding:var(--sx-space-6)">
  <div class="sx-overlay-media" aria-hidden="true"></div>
  <div class="sx-overlay-content" style="width:100%;display:flex;flex-direction:column;justify-content:space-between;gap:var(--sx-space-6)">
    <article class="sx-card" style="max-width:520px;display:flex;flex-direction:column;gap:var(--sx-space-3)">
      <p class="sx-eyebrow">[ Operations, simplified ]</p>
      <h1 class="sx-display" style="font-size:var(--sx-heading-xl);line-height:var(--sx-heading-xl-line);letter-spacing:var(--sx-heading-xl-tracking)">Future-proof your operations.</h1>
      <p class="sx-body" style="font-size:var(--sx-body-md)">We help teams plan, run, and improve complex systems with measured, structure-first decisions.</p>
      <div class="sx-cta" style="margin-top:var(--sx-space-2)"><a class="sx-btn sx-btn--primary" href="#" style="height:46px;padding-inline:24px;font-size:14px">Learn more</a></div>
    </article>
    <article class="sx-card sx-cluster" style="align-self:flex-end;max-width:320px;gap:var(--sx-space-3);padding:var(--sx-space-3)">
      <span class="sx-avatar" aria-hidden="true"></span>
      <p class="sx-meta" style="margin:0">"A calmer way to run the work." — Operations lead</p>
    </article>
  </div>
</section>`,
    claudePrompt:
      "Use the Hero Media Card 01 structure: full media background, a large content card overlaid on the left (eyebrow, heading, body, one primary CTA), and a small floating proof card lower-right (avatar + one line). Replace copy with mine; keep the heading 3–8 words and body to one short paragraph. Preserve the overlay, the card, and the .sx-* token classes so it re-skins across modes.",
  },

  {
    id: "social-proof-logo-strip-01",
    category: "Social Proof",
    title: "Logo Proof Strip 01",
    description: "A centered proof label above a horizontal row of monochrome placeholder logos.",
    structure:
      "Centered label, then a single horizontal row of evenly-spaced monochrome logo placeholders. Wraps on small screens.",
    structureTags: ["strip", "centered", "logos"],
    bestFor: ["Below the hero", "Trust building", "Enterprise credibility", "Investor / partner proof"],
    copyFit: { label: "1 short line", logos: "4–6 logos" },
    includes: "Proof label, monochrome logo row",
    primitives: ["sx-section", "sx-eyebrow", "sx-cluster", "sx-logo"],
    tags: ["Logos", "Trust", "Strip"],
    modes: ["neutral", "dark", "color"],
    html: `<section class="sx-section--tight" aria-label="Trusted by" style="display:flex;flex-direction:column;gap:var(--sx-space-4);align-items:center">
  <p class="sx-eyebrow">Trusted by teams across 20+ industries</p>
  <ul class="sx-cluster" style="list-style:none;margin:0;padding:0;justify-content:center;gap:var(--sx-space-6)">
    <li><span class="sx-logo" aria-hidden="true"></span></li>
    <li><span class="sx-logo" aria-hidden="true"></span></li>
    <li><span class="sx-logo" aria-hidden="true"></span></li>
    <li><span class="sx-logo" aria-hidden="true"></span></li>
    <li><span class="sx-logo" aria-hidden="true"></span></li>
  </ul>
</section>`,
    claudePrompt:
      "Use the Logo Proof Strip 01 structure: a centered proof label above a single horizontal row of monochrome logos. Replace the label and swap the placeholders for 4–6 real logos kept monochrome. Preserve the centered layout and the .sx-* token classes.",
  },

  {
    id: "feature-split-01",
    category: "Features",
    title: "Feature Split 01",
    description: "A two-column feature: text lockup on the left, a large media/card composition on the right.",
    structure:
      "Left column holds eyebrow, heading, body, and a CTA. Right column is a composed media cluster (tall frame + square frame + a small accent stat card). Stacks below md.",
    structureTags: ["split", "with-media"],
    bestFor: ["Product feature", "Platform overview", "Capability highlight", "Data / analytics"],
    copyFit: {
      eyebrow: "1 short label",
      heading: "4–8 words",
      body: "1 short paragraph",
      cta: "1 button (optional)",
    },
    includes: "Eyebrow, heading, body, CTA, media cluster",
    primitives: [
      "sx-section",
      "sx-wrap",
      "sx-split",
      "sx-eyebrow",
      "sx-heading",
      "sx-body",
      "sx-cta",
      "sx-btn",
      "sx-grid",
      "sx-media",
      "sx-card",
    ],
    tags: ["Split", "Media", "Feature"],
    modes: ["neutral", "dark", "color"],
    html: `<section class="sx-section" aria-label="Feature">
  <div class="sx-wrap sx-split">
    <div style="display:flex;flex-direction:column;gap:var(--sx-space-3)">
      <p class="sx-eyebrow">[ Real-time data ]</p>
      <h2 class="sx-heading">Optimize operations with live signal.</h2>
      <p class="sx-body" style="font-size:var(--sx-body-md)">Bring planning, monitoring, and reporting into one structured view so decisions stay grounded in what is actually happening.</p>
      <div class="sx-cta" style="margin-top:var(--sx-space-2)"><a class="sx-btn sx-btn--secondary" href="#" style="height:44px;padding-inline:22px;font-size:14px">See platform</a></div>
    </div>
    <div class="sx-grid sx-grid-2" style="gap:var(--sx-space-2)">
      <div class="sx-media sx-media--tall" aria-hidden="true"></div>
      <div style="display:flex;flex-direction:column;gap:var(--sx-space-2)">
        <div class="sx-media" style="aspect-ratio:1/1" aria-hidden="true"></div>
        <div class="sx-card" style="background:var(--sx-accent);color:var(--sx-accent-ink);padding:var(--sx-space-3)"><p class="sx-meta" style="color:inherit;margin:0">+18% throughput</p></div>
      </div>
    </div>
  </div>
</section>`,
    claudePrompt:
      "Use the Feature Split 01 structure: text lockup left (eyebrow, heading, body, CTA), composed media cluster right. Replace copy with mine; the right side stays a media composition with one small accent stat card. Keep the split, spacing, and .sx-* token classes so the accent follows the active mode.",
  },

  {
    id: "content-image-split-01",
    category: "Content",
    title: "Content Image Split 01",
    description: "A large image block on one side with heading, body, and a short list on the other.",
    structure:
      "Wide media frame on the left, content on the right: eyebrow, heading, body, and a 3-item list of rules/benefits. Stacks below md.",
    structureTags: ["split", "with-image", "with-list"],
    bestFor: ["Approach / methodology", "Capability detail", "About / how it works", "Editorial explainer"],
    copyFit: { eyebrow: "1 short label", heading: "4–8 words", body: "1 short paragraph", list: "3 short items" },
    includes: "Image, eyebrow, heading, body, 3-item list",
    primitives: [
      "sx-section",
      "sx-wrap",
      "sx-split",
      "sx-media",
      "sx-eyebrow",
      "sx-heading",
      "sx-body",
      "sx-list",
      "sx-list-item",
    ],
    tags: ["Split", "Image", "Editorial"],
    modes: ["neutral", "dark", "color"],
    html: `<section class="sx-section" aria-label="Content">
  <div class="sx-wrap sx-split sx-split--text-wide">
    <div class="sx-media sx-media--wide" aria-hidden="true"></div>
    <div style="display:flex;flex-direction:column;gap:var(--sx-space-3)">
      <p class="sx-eyebrow">[ Infrastructure ]</p>
      <h2 class="sx-heading">Delivering low-impact infrastructure.</h2>
      <p class="sx-body" style="font-size:var(--sx-body-md)">A structured approach to upgrading systems without disrupting the work they support.</p>
      <ul class="sx-list" style="margin-top:var(--sx-space-2)">
        <li class="sx-list-item" style="font-size:var(--sx-body-md)">Map dependencies before changing anything</li>
        <li class="sx-list-item" style="font-size:var(--sx-body-md)">Stage rollouts to reduce operational risk</li>
        <li class="sx-list-item" style="font-size:var(--sx-body-md)">Measure outcomes against a clear baseline</li>
      </ul>
    </div>
  </div>
</section>`,
    claudePrompt:
      "Use the Content Image Split 01 structure: a large image on one side, content on the other (eyebrow, heading, body, 3-item list). Replace copy with mine; keep three short list items. Preserve the split, spacing, and .sx-* token classes.",
  },

  {
    id: "service-card-grid-01",
    category: "Features",
    title: "Service Card Grid 01",
    description: "A centered intro above four equal cards, each with a small icon, title, and short description.",
    structure:
      "Centered eyebrow + heading, then a 4-up grid of equal cards (icon, title, one-line description). Collapses to 1 column below md.",
    structureTags: ["grid", "cards", "centered"],
    bestFor: ["Services overview", "Capabilities", "Value props", "What we do"],
    copyFit: {
      eyebrow: "1 short label",
      heading: "5–10 words",
      cards: "4 cards · title (1–3 words) + 1 line each",
    },
    includes: "Eyebrow, heading, 4 cards",
    primitives: [
      "sx-section",
      "sx-wrap",
      "sx-eyebrow",
      "sx-heading",
      "sx-grid",
      "sx-feature",
      "sx-feature-title",
      "sx-icon",
      "sx-meta",
    ],
    tags: ["Grid", "Services", "Cards"],
    modes: ["neutral", "dark", "color"],
    html: `<section class="sx-section" aria-label="Services">
  <div class="sx-wrap" style="display:flex;flex-direction:column;gap:var(--sx-space-5)">
    <div style="display:flex;flex-direction:column;gap:var(--sx-space-2);align-items:center;text-align:center">
      <p class="sx-eyebrow">[ What we do ]</p>
      <h2 class="sx-heading" style="max-width:22ch">Partner on your most complex operational challenges.</h2>
    </div>
    <ul class="sx-grid sx-grid-4" style="list-style:none;margin:0;padding:0">
      <li class="sx-feature"><i data-lucide="route" class="sx-icon"></i><h3 class="sx-feature-title">Optimized freight</h3><p class="sx-meta">Reduce cost and delay across complex logistics networks.</p></li>
      <li class="sx-feature"><i data-lucide="wind" class="sx-icon"></i><h3 class="sx-feature-title">Energy systems</h3><p class="sx-meta">Plan and run cleaner, more resilient energy operations.</p></li>
      <li class="sx-feature"><i data-lucide="network" class="sx-icon"></i><h3 class="sx-feature-title">Logistics intelligence</h3><p class="sx-meta">Turn operational data into decisions you can act on.</p></li>
      <li class="sx-feature"><i data-lucide="activity" class="sx-icon"></i><h3 class="sx-feature-title">Always-on</h3><p class="sx-meta">Monitoring and support that keeps the work moving.</p></li>
    </ul>
  </div>
</section>`,
    claudePrompt:
      "Use the Service Card Grid 01 structure: centered eyebrow + heading, then four equal cards (icon, title, one-line description). Replace copy and icons with mine; keep four cards. Preserve the grid, card style, and .sx-* token classes.",
  },

  {
    id: "dark-service-list-01",
    category: "Content",
    title: "Service List 01",
    description:
      "An inverse band with a heading, an interactive service accordion + CTA on the left, and a media frame on the right.",
    structure:
      "Inverse (contrast) band. Heading on top, then a split: left = an accordion of services (click a headline to reveal its description, one open at a time) + CTA, right = media frame. The band flips with the mode.",
    structureTags: ["split", "list", "accordion", "dark", "with-media"],
    bestFor: ["Capabilities band", "Service index", "Mid-page emphasis", "Operating model"],
    copyFit: {
      eyebrow: "1 short label",
      heading: "4–7 words",
      items: "3–6 accordion items · headline + 1 line",
      cta: "1 button",
    },
    includes: "Heading, 4-item service accordion, CTA, media",
    primitives: [
      "sx-section",
      "sx-band--inverse",
      "sx-wrap",
      "sx-split",
      "sx-eyebrow",
      "sx-heading",
      "sx-acc",
      "sx-acc-a",
      "sx-cta",
      "sx-btn",
      "sx-media",
    ],
    tags: ["Accordion", "Split", "Services", "Inverse"],
    modes: ["neutral", "dark", "color"],
    html: `<section class="sx-section" aria-label="Capabilities">
  <div class="sx-wrap" style="display:flex;flex-direction:column;gap:var(--sx-space-5)">
    <div style="display:flex;flex-direction:column;gap:var(--sx-space-2)">
      <p class="sx-eyebrow">[ How we work ]</p>
      <h2 class="sx-heading">We lead with better systems.</h2>
    </div>
    <div class="sx-split sx-split--text-wide" style="align-items:start">
      <div style="display:flex;flex-direction:column;gap:var(--sx-space-4)">
        <div>
          <details class="sx-acc" name="dsl-01" open>
            <summary>Infrastructure intelligence</summary>
            <div class="sx-acc-a"><p>Map dependencies across systems so you can change them without disrupting the work they support.</p></div>
          </details>
          <details class="sx-acc" name="dsl-01">
            <summary>Resilience engineering</summary>
            <div class="sx-acc-a"><p>Design operations that stay steady under load, with clear fallbacks when conditions change.</p></div>
          </details>
          <details class="sx-acc" name="dsl-01">
            <summary>Transition planning</summary>
            <div class="sx-acc-a"><p>Stage rollouts to reduce operational risk and keep teams moving through the change.</p></div>
          </details>
          <details class="sx-acc" name="dsl-01">
            <summary>Supply chains</summary>
            <div class="sx-acc-a"><p>Redesign routing and integration to cut cost and delay across the network.</p></div>
          </details>
        </div>
        <div class="sx-cta"><a class="sx-btn sx-btn--secondary" href="#" style="height:44px;padding-inline:22px;font-size:14px">See approach</a></div>
      </div>
      <div class="sx-media sx-media--wide" aria-hidden="true"></div>
    </div>
  </div>
</section>`,
    claudePrompt:
      'Use the Service List 01 structure: a heading, an accordion of services on the left (each headline expands to reveal a one-line description, one open at a time) plus a CTA, and a media frame on the right. Replace copy with mine; keep 3–6 accordion items. Use native <details name="..."> for the accordion; keep the .sx-* token classes.',
  },

  {
    id: "case-study-card-grid-01",
    category: "Social Proof",
    title: "Case Study Card Grid 01",
    description: "A centered intro above three image/card case-study tiles.",
    structure:
      "Centered eyebrow + heading, then a 3-up grid of tiles (media frame, small category label, one-line outcome). Collapses to 1 column below md.",
    structureTags: ["grid", "cards", "with-media"],
    bestFor: ["Success stories", "Case studies", "Results", "Portfolio proof"],
    copyFit: { eyebrow: "1 short label", heading: "5–10 words", tiles: "3 tiles · label + 1 outcome line each" },
    includes: "Eyebrow, heading, 3 case-study tiles",
    primitives: [
      "sx-section",
      "sx-wrap",
      "sx-eyebrow",
      "sx-heading",
      "sx-grid",
      "sx-tile",
      "sx-tile-media",
      "sx-feature-title",
    ],
    tags: ["Case Studies", "Grid", "Proof"],
    modes: ["neutral", "dark", "color"],
    html: `<section class="sx-section" aria-label="Case studies">
  <div class="sx-wrap" style="display:flex;flex-direction:column;gap:var(--sx-space-5)">
    <div style="display:flex;flex-direction:column;gap:var(--sx-space-2);align-items:center;text-align:center">
      <p class="sx-eyebrow">[ Success stories ]</p>
      <h2 class="sx-heading" style="max-width:24ch">Purpose-built systems, measurable outcomes.</h2>
    </div>
    <ul class="sx-grid sx-grid-3" style="list-style:none;margin:0;padding:0">
      <li class="sx-tile"><div class="sx-tile-media" aria-hidden="true"></div><p class="sx-eyebrow">[ Freight ]</p><h3 class="sx-feature-title">Rebuilt a national routing model</h3></li>
      <li class="sx-tile"><div class="sx-tile-media" aria-hidden="true"></div><p class="sx-eyebrow">[ Mobility ]</p><h3 class="sx-feature-title">Cut fleet downtime by a third</h3></li>
      <li class="sx-tile"><div class="sx-tile-media" aria-hidden="true"></div><p class="sx-eyebrow">[ Energy ]</p><h3 class="sx-feature-title">Stabilised a regional grid</h3></li>
    </ul>
  </div>
</section>`,
    claudePrompt:
      "Use the Case Study Card Grid 01 structure: centered eyebrow + heading, then three case-study tiles (media, category label, one outcome line). Replace copy and media with mine; keep three tiles. Preserve the grid and .sx-* token classes.",
  },

  {
    id: "full-bleed-image-cta-01",
    category: "CTA",
    title: "Full Bleed Image CTA 01",
    description: "A full-width media section with a large text overlay and a small CTA.",
    structure:
      "Media background fills the section; a left-aligned large statement and a single CTA sit over it. The statement wraps across lines.",
    structureTags: ["full-bleed", "with-media", "with-cta"],
    bestFor: ["Mid/late-page CTA", "Brand statement", "Conversion band", "Closing pitch"],
    copyFit: { heading: "6–12 words (wraps)", cta: "1 short button" },
    includes: "Large statement, CTA, full-bleed media",
    primitives: ["sx-overlay", "sx-wrap", "sx-display", "sx-cta", "sx-btn"],
    tags: ["Full Bleed", "CTA", "Media"],
    modes: ["neutral", "dark", "color"],
    html: `<section class="sx-overlay" aria-label="Call to action" style="min-height:340px;display:flex;align-items:center;padding:var(--sx-space-6)">
  <div class="sx-overlay-media" aria-hidden="true"></div>
  <div class="sx-overlay-content sx-wrap" style="display:flex;flex-direction:column;gap:var(--sx-space-4);margin-inline:0;max-width:60ch">
    <h2 class="sx-display" style="font-size:var(--sx-heading-lg);line-height:var(--sx-heading-lg-line);letter-spacing:var(--sx-heading-lg-tracking);max-width:20ch">Build smarter systems for a more resilient operation.</h2>
    <div class="sx-cta"><a class="sx-btn sx-btn--primary" href="#" style="height:46px;padding-inline:24px;font-size:14px">Start a project</a></div>
  </div>
</section>`,
    claudePrompt:
      "Use the Full Bleed Image CTA 01 structure: full-width media with a large left-aligned statement and one small CTA over it. Replace the statement and CTA with mine; keep the statement to one wrapping line of 6–12 words. Preserve the overlay and .sx-* token classes.",
  },

  {
    id: "resource-card-grid-01",
    category: "Content",
    title: "Resource Card Grid 01",
    description:
      "A section heading with a 'view all' link above three resource/article cards (media, title, summary, small arrow action).",
    structure:
      "Header row (eyebrow + heading + view-all link), then a 3-up grid of resource cards: media frame, title, one-line summary, and a small arrow link. Collapses to 1 column.",
    structureTags: ["grid", "cards", "with-media"],
    bestFor: ["Insights / blog teaser", "Resource hub", "Latest articles", "Guides"],
    copyFit: {
      eyebrow: "1 short label",
      heading: "2–5 words",
      cards: "3 cards · title + 1 summary line + action",
    },
    includes: "Eyebrow, heading, view-all link, 3 cards",
    primitives: [
      "sx-section",
      "sx-wrap",
      "sx-between",
      "sx-eyebrow",
      "sx-heading",
      "sx-navlink",
      "sx-grid",
      "sx-tile",
      "sx-tile-media",
      "sx-feature-title",
      "sx-meta",
      "sx-icon",
    ],
    tags: ["Resources", "Grid", "Cards"],
    modes: ["neutral", "dark", "color"],
    html: `<section class="sx-section" aria-label="Resources">
  <div class="sx-wrap" style="display:flex;flex-direction:column;gap:var(--sx-space-5)">
    <div class="sx-between">
      <div style="display:flex;flex-direction:column;gap:var(--sx-space-2)"><p class="sx-eyebrow">[ Resources ]</p><h2 class="sx-heading">Action over ambition.</h2></div>
      <a class="sx-navlink" href="#" style="display:inline-flex;align-items:center;gap:6px">View all <i data-lucide="arrow-right" class="sx-icon" style="width:16px;height:16px"></i></a>
    </div>
    <ul class="sx-grid sx-grid-3" style="list-style:none;margin:0;padding:0">
      <li class="sx-tile"><div class="sx-tile-media" aria-hidden="true"></div><h3 class="sx-feature-title">Smart logistics</h3><p class="sx-meta">Optimizing freight systems with data-driven strategies.</p><a class="sx-navlink" href="#" style="display:inline-flex;align-items:center;gap:6px">Read <i data-lucide="arrow-right" class="sx-icon" style="width:16px;height:16px"></i></a></li>
      <li class="sx-tile"><div class="sx-tile-media" aria-hidden="true"></div><h3 class="sx-feature-title">Resilient systems</h3><p class="sx-meta">Designing operations that stay steady under load.</p><a class="sx-navlink" href="#" style="display:inline-flex;align-items:center;gap:6px">Read <i data-lucide="arrow-right" class="sx-icon" style="width:16px;height:16px"></i></a></li>
      <li class="sx-tile"><div class="sx-tile-media" aria-hidden="true"></div><h3 class="sx-feature-title">Operational data</h3><p class="sx-meta">Turning live signal into decisions teams can trust.</p><a class="sx-navlink" href="#" style="display:inline-flex;align-items:center;gap:6px">Read <i data-lucide="arrow-right" class="sx-icon" style="width:16px;height:16px"></i></a></li>
    </ul>
  </div>
</section>`,
    claudePrompt:
      "Use the Resource Card Grid 01 structure: a header row (eyebrow, heading, view-all link) above three resource cards (media, title, one summary line, small arrow link). Replace copy and media with mine; keep three cards. Preserve the grid and .sx-* token classes.",
  },

  {
    id: "footer-editorial-large-01",
    category: "Footer",
    title: "Large Editorial Footer 01",
    description:
      "A large editorial footer: brand statement and CTA, navigation columns, a legal/social row, and subtle rhythm rules.",
    structure:
      "Top row: brand statement + CTA. Middle: four nav columns. A divider, then a legal line + social row. Surfaces follow the selected mode.",
    structureTags: ["footer", "columns", "with-cta"],
    bestFor: ["Site footer", "Marketing footer", "Editorial / brand sites"],
    copyFit: {
      statement: "5–10 words",
      cta: "1 button",
      columns: "4 columns · 3–5 links each",
      legal: "1 line + 3–5 social icons",
    },
    includes: "Statement, CTA, 4 nav columns, legal/social row",
    primitives: [
      "sx-section",
      "sx-band--inverse",
      "sx-wrap",
      "sx-between",
      "sx-heading",
      "sx-btn",
      "sx-grid",
      "sx-eyebrow",
      "sx-navlink",
      "sx-divider",
      "sx-meta",
      "sx-icon",
    ],
    tags: ["Footer", "Editorial", "Columns", "Nav"],
    modes: ["neutral", "dark", "color"],
    html: `<footer class="sx-section" aria-label="Footer">
  <div class="sx-wrap" style="display:flex;flex-direction:column;gap:var(--sx-space-6)">
    <div class="sx-between" style="align-items:flex-end">
      <h2 class="sx-heading" style="max-width:18ch">Guiding teams through better systems.</h2>
      <a class="sx-btn sx-btn--secondary" href="#" style="height:46px;padding-inline:24px;font-size:14px">Get in touch</a>
    </div>
    <div class="sx-grid sx-grid-4">
      <nav style="display:flex;flex-direction:column;gap:var(--sx-space-1)"><p class="sx-eyebrow">Company</p><a class="sx-navlink" href="#">About</a><a class="sx-navlink" href="#">Careers</a><a class="sx-navlink" href="#">Contact</a></nav>
      <nav style="display:flex;flex-direction:column;gap:var(--sx-space-1)"><p class="sx-eyebrow">Solutions</p><a class="sx-navlink" href="#">Freight</a><a class="sx-navlink" href="#">Energy</a><a class="sx-navlink" href="#">Supply chain</a></nav>
      <nav style="display:flex;flex-direction:column;gap:var(--sx-space-1)"><p class="sx-eyebrow">Industries</p><a class="sx-navlink" href="#">Logistics</a><a class="sx-navlink" href="#">Utilities</a><a class="sx-navlink" href="#">Public sector</a></nav>
      <nav style="display:flex;flex-direction:column;gap:var(--sx-space-1)"><p class="sx-eyebrow">Resources</p><a class="sx-navlink" href="#">Insights</a><a class="sx-navlink" href="#">Guides</a><a class="sx-navlink" href="#">Changelog</a></nav>
    </div>
    <hr class="sx-divider">
    <div class="sx-between">
      <p class="sx-meta">© 2026 Northwind — structure-first operations.</p>
      <div class="sx-cluster" style="gap:var(--sx-space-3)">
        <i data-lucide="linkedin" class="sx-icon"></i><i data-lucide="github" class="sx-icon"></i><i data-lucide="rss" class="sx-icon"></i>
      </div>
    </div>
  </div>
</footer>`,
    claudePrompt:
      "Use the Large Editorial Footer 01 structure: a brand statement + CTA on top, four nav columns, a divider, and a legal line + social row. Replace copy and links with mine; keep four columns. Surfaces follow the selected mode; keep the .sx-* token classes.",
  },
];

/* ---- Page Layouts: ordered compositions of sections ---- */
export const PAGE_LAYOUTS: PageLayout[] = [
  {
    id: "operational-consulting-homepage-01",
    title: "Operational Consulting Homepage",
    description:
      "A full homepage for a neutral operations/consulting business, composed entirely from reusable sections and previewable in any Design System + Mode.",
    styleSystem: "structured-editorial",
    category: "Homepage",
    tags: ["Homepage", "Consulting", "Operations", "Editorial"],
    sections: [
      "header-overlay-01",
      "hero-media-card-01",
      "social-proof-logo-strip-01",
      "feature-split-01",
      "content-image-split-01",
      "service-card-grid-01",
      "dark-service-list-01",
      "case-study-card-grid-01",
      "full-bleed-image-cta-01",
      "resource-card-grid-01",
      "footer-editorial-large-01",
    ],
  },
];

/* ---- Design system display names (used by the detail page + copy prompt) ---- */
export const SYSTEM_NAMES: Record<string, string> = {
  "structured-editorial": "Structured Editorial",
  scion: "Scion",
};

/**
 * Slug for a section. The source keyed sections by `id` (e.g. "hero-media-card-01")
 * and the ids are already URL-safe kebab-case, so the slug IS the id. This helper
 * exists so callers don't depend on that coincidence.
 */
export function sectionSlug(section: Section): string {
  return section.id;
}

/** Look up a single section by its slug (= id). */
export function getSection(slug: string): Section | undefined {
  return SECTIONS.find((s) => s.id === slug);
}

/** Unique category list, in first-seen order, with "all" prepended (mirrors the source). */
export function sectionCategories(): string[] {
  return ["all", ...Array.from(new Set(SECTIONS.map((s) => s.category)))];
}

/**
 * Build the Claude prompt for a section in a given design system — mirrors the
 * claudePrompt() builder in section.html so the detail page copy matches the source.
 */
export function buildClaudePrompt(section: Section, systemKey: string): string {
  const name = SYSTEM_NAMES[systemKey] || "the selected";
  return (
    "Add this section to my website.\n\n" +
    'This section uses the "' +
    name +
    '" design system from layout.page. If you have not added that design system to my site yet, install it once first (the one-time setup — design tokens + base component CSS — lives on the design system page). If my site already has its own design tokens, adapt the section to match mine instead of adding a second system.\n\n' +
    "Keep the structure, hierarchy, and responsive behaviour intact. Replace the placeholder copy with my content. Make sure it works on mobile.\n\n" +
    "Section — " +
    section.title +
    " (" +
    section.category +
    "):\n\n" +
    section.html
  );
}
