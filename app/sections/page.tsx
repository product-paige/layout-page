import { Suspense } from "react";
import { SECTIONS, sectionCategories } from "@/lib/sections";
import SectionsBrowser from "./SectionsBrowser";
import "./sections.css";

export const metadata = {
  title: "Section Library · layout.page",
  description:
    "Preview any section in a Design System and Mode, then copy clean HTML or a Claude prompt.",
};

export default function SectionsPage() {
  return (
    <main className="sections-page flex-1 min-w-0">
      {/* page hero */}
      <section className="lp-hero">
        <h1 className="ts-page-hero">Section Library</h1>
        <div className="lp-hero-text">
          <p className="lp-hero-support" style={{ maxWidth: "44ch" }}>
            Preview any section in a Design System and Mode, then copy clean HTML or a Claude prompt.
          </p>
        </div>
      </section>

      <Suspense fallback={null}>
        <SectionsBrowser sections={SECTIONS} categories={sectionCategories()} />
      </Suspense>
    </main>
  );
}
