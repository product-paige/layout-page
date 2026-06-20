import Link from "next/link";
import { CornerDownRight } from "lucide-react";
import "./docs.css";

export const metadata = {
  title: "Docs · layout.page",
  description: "Guides for building with layout.page.",
};

type Doc = { cat: string; title: string; href: string; desc: string; meta: string };
type Soon = { cat: string; title: string; desc: string };

const DOCS: Doc[] = [
  {
    cat: "Guide",
    title: "Build a Website with Claude",
    href: "/docs/build-a-website",
    desc:
      "Set up a Next.js project, add a Design System, choose a page layout, and add sections one at a time — with copy-ready prompts for every step.",
    meta: "10 steps · Next.js + GitHub + Vercel",
  },
];

const SOON: Soon[] = [
  {
    cat: "Guide",
    title: "Customize a Design System",
    desc: "Override the token set to give a system its own personality without changing structure.",
  },
  {
    cat: "Reference",
    title: "Section copy-fit notes",
    desc: "Headline, body, and CTA length guidance for fitting your copy to each section.",
  },
];

export default function DocsPage() {
  return (
    <main className="docs-page flex-1 min-w-0">
      <section className="lp-hero">
        <h1 className="ts-page-hero">Docs</h1>
        <div className="lp-hero-text">
          <p className="subhead">Guides for building with layout.page.</p>
          <p className="lp-hero-support">
            Copy-ready prompts and step-by-step workflows for assembling a site from sections, page
            layouts, and Design Systems.
          </p>
        </div>
      </section>

      <section className="grid sm:grid-cols-2 border-t border-l border-line">
        {DOCS.map((d) => (
          <Link
            key={d.href}
            href={d.href}
            className="dcard border-r border-b border-line block p-7 stack stack-3"
          >
            <span className="meta-pill" style={{ width: "fit-content" }}>
              {d.cat}
            </span>
            <h2 style={{ fontSize: "var(--lp-heading-sm)" }}>{d.title}</h2>
            <p className="text-[16px]" style={{ color: "var(--muted)" }}>
              {d.desc}
            </p>
            <span className="lbl">{d.meta}</span>
            <span className="lpbtn lpbtn--primary lpbtn--sm lpbtn--full">
              <CornerDownRight className="ico" size={13} strokeWidth={1.25} /> Read doc
            </span>
          </Link>
        ))}
        {SOON.map((d) => (
          <div
            key={d.title}
            className="border-r border-b border-line p-7 stack stack-3"
            style={{ minHeight: "260px" }}
          >
            <span
              className="meta-pill"
              style={{
                width: "fit-content",
                color: "var(--royal)",
                background: "transparent",
                border: "1px solid var(--royal)",
              }}
            >
              Coming soon
            </span>
            <h2 style={{ fontSize: "var(--lp-heading-sm)", color: "var(--muted)" }}>{d.title}</h2>
            <p className="text-[16px]" style={{ color: "var(--muted)", maxWidth: "40ch" }}>
              {d.desc}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
