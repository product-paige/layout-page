import "./changelog.css";

export const metadata = {
  title: "Changelog · layout.page",
  description:
    "New sections, Design Systems, page layouts, and product improvements — shipped continuously.",
};

type Entry = { v: string; date: string; title: string; changes: string[] };

const ENTRIES: Entry[] = [
  {
    v: "0.7",
    date: "Jun 16, 2026",
    title: "Docs, Changelog & a unified component set",
    changes: [
      'Added Docs with the "Build a Website with Claude" guide, and this Changelog.',
      "Consolidated every action into one button system (primary / secondary / inverse / small) with a leading arrow.",
      "Standardized inline links; card labels are now pills; section examples sit inside an abstract browser frame.",
    ],
  },
  {
    v: "0.6",
    date: "Jun 2026",
    title: "Page Layouts + live section pages",
    changes: [
      "New Page Layouts listing, plus a full-page preview that re-skins every section at once.",
      "Each section now has its own live page with a mode switcher, metadata, and copy actions.",
      "Top bars became breadcrumbs; added an internal Style Guide for design-system review.",
    ],
  },
  {
    v: "0.5",
    date: "Jun 2026",
    title: "Data-driven Section Library",
    changes: [
      "Built 11 reusable, token-based sections (header, hero, social proof, features, content, services, CTA, footer).",
      "Section Library renders live previews filterable by Category, Structure, Design System, and Mode.",
      "Added the Operational Consulting Homepage page layout.",
    ],
  },
  {
    v: "0.4",
    date: "Jun 2026",
    title: "Structured Editorial Design System",
    changes: [
      "Grayscale-first Design System with Neutral, Dark, and Color Example modes.",
      "Token contract (--sx-*) so sections re-skin via a single attribute swap.",
      "Detail page with typography, color, spacing, components, and copy-for-Claude reference.",
    ],
  },
  {
    v: "0.3",
    date: "May 2026",
    title: "Shared site template",
    changes: [
      "Collapsible icon-rail navigation, a navy top bar, and a footer on every page.",
      "One shared site.css + nav.js so the whole site stays consistent.",
    ],
  },
  {
    v: "0.2",
    date: "May 2026",
    title: "Type & spacing foundation",
    changes: [
      "Funnel Sans + Geist Mono type system on a 6px spacing rhythm with thin hairline borders.",
    ],
  },
  {
    v: "0.1",
    date: "May 2026",
    title: "layout.page concept",
    changes: ["First version of the structure-first section library: same structure, different system."],
  },
];

export default function ChangelogPage() {
  return (
    <main className="changelog-page flex-1 min-w-0">
      <section className="lp-hero">
        <h1 className="ts-page-hero">Changelog</h1>
        <div className="lp-hero-text">
          <p className="subhead">What&apos;s new in layout.page.</p>
          <p className="lp-hero-support">
            New sections, Design Systems, page layouts, and product improvements — shipped
            continuously.
          </p>
        </div>
      </section>

      <section className="px-10 py-4">
        {ENTRIES.map((e) => (
          <div className="cl-entry" key={e.v}>
            <div className="flex flex-col gap-3 items-start">
              <span
                className="meta-pill"
                style={{ color: "#4337FF", background: "transparent", border: "1px solid #4337FF" }}
              >
                v{e.v}
              </span>
              <span className="lbl">{e.date}</span>
            </div>
            <div className="flex flex-col gap-3">
              <h2 style={{ fontSize: "var(--lp-heading-sm)" }}>{e.title}</h2>
              <ul className="cl-changes">
                {e.changes.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
