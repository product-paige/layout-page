import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SECTIONS, getSection } from "@/lib/sections";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionDetail from "./SectionDetail";
import "../sections.css";

export function generateStaticParams() {
  return SECTIONS.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const section = getSection(slug);
  if (!section) return { title: "Section · layout.page" };
  return {
    title: `${section.title} · Section · layout.page`,
    description: section.description,
  };
}

export default async function SectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const section = getSection(slug);
  if (!section) notFound();

  return (
    <main className="section-detail-page flex-1 min-w-0">
      {/* breadcrumb */}
      <div className="px-10 pt-6">
        <Breadcrumbs
          items={[
            { label: "Overview", href: "/" },
            { label: "Browse Sections", href: "/sections" },
            { label: section.title },
          ]}
        />
      </div>

      {/* HERO: title left, condensed details right */}
      <section className="px-10 py-9 border-b border-line grid lg:grid-cols-[1fr_minmax(0,340px)] gap-x-12 gap-y-6 items-start">
        <div className="stack stack-2">
          <h1 className="ts-section-lg">{section.title}</h1>
          <p className="text-[16px]" style={{ color: "var(--muted)", maxWidth: "52ch" }}>
            {section.description}
          </p>
          <p className="text-[16px]" style={{ color: "var(--muted)" }}>
            Preview the system. Then copy it your way.
          </p>
        </div>
        <div>
          <div className="metarow">
            <div className="metakey">Category</div>
            <div>
              <span className="meta-pill">{section.category}</span>
            </div>
          </div>
          <div className="metarow">
            <div className="metakey">Best for</div>
            <div className="metaval">{section.bestFor.join(", ")}</div>
          </div>
          <div className="metarow">
            <div className="metakey">Includes</div>
            <div className="metaval">{section.includes}</div>
          </div>
        </div>
      </section>

      <SectionDetail section={section} />
    </main>
  );
}
