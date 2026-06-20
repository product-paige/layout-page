import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PAGE_LAYOUTS, SECTIONS, SYSTEM_NAMES } from "@/lib/sections";
import Breadcrumbs from "@/components/Breadcrumbs";
import LayoutPreview from "./LayoutPreview";
import "../page-layouts.css";

const SECTION_BY_ID = Object.fromEntries(SECTIONS.map((s) => [s.id, s]));

function getLayout(slug: string) {
  return PAGE_LAYOUTS.find((l) => l.id === slug);
}

export function generateStaticParams() {
  return PAGE_LAYOUTS.map((l) => ({ slug: l.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const layout = getLayout(slug);
  if (!layout) return { title: "Page Layout · layout.page" };
  return {
    title: `${layout.title} · Page Layouts · layout.page`,
    description: layout.description,
  };
}

export default async function PageLayoutDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const layout = getLayout(slug);
  if (!layout) notFound();

  const systemName = SYSTEM_NAMES[layout.styleSystem] || layout.styleSystem;
  const html = layout.sections
    .map((id) => SECTION_BY_ID[id]?.html ?? "")
    .join("\n");
  const sectionCount = `${layout.sections.length} sections · ${layout.sections.join("  ·  ")}`;

  return (
    <main className="page-layout-detail flex-1 min-w-0">
      {/* breadcrumb */}
      <div className="px-10 pt-6">
        <Breadcrumbs
          items={[
            { label: "Overview", href: "/" },
            { label: "Page Layouts", href: "/page-layouts" },
            { label: layout.title },
          ]}
        />
      </div>

      {/* meta */}
      <section className="lp-hero">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="lp-hero-text">
            <div className="lbl">Page Layout · {systemName}</div>
            <h1>{layout.title}</h1>
            <p className="lp-hero-support">{layout.description}</p>
          </div>
        </div>
      </section>

      <LayoutPreview
        styleSystem={layout.styleSystem}
        html={html}
        sectionCount={sectionCount}
      />
    </main>
  );
}
