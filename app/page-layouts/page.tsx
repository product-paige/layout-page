import type { Metadata } from "next";
import Link from "next/link";
import { CornerDownRight } from "lucide-react";
import { PAGE_LAYOUTS, SECTIONS } from "@/lib/sections";
import LayoutThumb from "./LayoutThumb";
import "./page-layouts.css";

export const metadata: Metadata = {
  title: "Page Layouts · layout.page",
  description: "Full-page compositions built from reusable sections.",
};

const SECTION_BY_ID = Object.fromEntries(SECTIONS.map((s) => [s.id, s]));

// full-page layouts on the roadmap, rendered as inert placeholders (mirrors source)
const COMING_SOON = ["SaaS Product Homepage", "Ecommerce Storefront"];

export default function PageLayoutsPage() {
  return (
    <main className="page-layouts-page flex-1 min-w-0">
      <section className="lp-hero">
        <h1 className="ts-page-hero">Page Layouts</h1>
        <div className="lp-hero-text">
          <p className="subhead">Full-page compositions built from reusable sections.</p>
          <p className="lp-hero-support">
            Preview an entire page in any Design System and Mode — same structure, different system.
          </p>
        </div>
      </section>

      <section className="pl-grid">
        {PAGE_LAYOUTS.map((layout) => {
          const stack = layout.sections
            .map((id) => SECTION_BY_ID[id]?.html ?? "")
            .join("");
          return (
            <Link key={layout.id} href={`/page-layouts/${layout.id}`} className="pcard">
              <div className="browser-bar">
                <span className="browser-dot" />
                <span className="browser-dot" />
                <span className="browser-dot" />
                <span className="browser-addr" />
              </div>
              <LayoutThumb styleSystem={layout.styleSystem} html={stack} />
              <div className="p-7 stack stack-3 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-[22px]">{layout.title}</h2>
                  <span className="meta-pill shrink-0">{layout.sections.length} sections</span>
                </div>
                <p className="text-[16px]" style={{ color: "var(--muted)", maxWidth: "60ch" }}>
                  {layout.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {layout.tags.map((t) => (
                    <span key={t} className="meta-pill">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="lpbtn lpbtn--primary lpbtn--sm lpbtn--full mt-auto">
                  <CornerDownRight className="ico" size={13} strokeWidth={1.25} /> View layout
                </span>
              </div>
            </Link>
          );
        })}

        {COMING_SOON.map((name) => (
          <div key={name} className="pl-soon">
            <div
              className="meta-pill mb-3"
              style={{
                color: "var(--royal)",
                background: "transparent",
                border: "1px solid var(--royal)",
                width: "fit-content",
              }}
            >
              Coming soon
            </div>
            <h2 className="text-[22px]" style={{ color: "var(--muted)" }}>
              {name}
            </h2>
            <p
              className="text-[16px] mt-2"
              style={{ color: "var(--muted)", maxWidth: "40ch" }}
            >
              Another full-page composition built from the same reusable sections.
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
