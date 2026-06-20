import Link from "next/link";
import { Square, Image, Asterisk, ArrowRight, Tag, FormInput } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import "./components.css";

export const metadata = { title: "Components · layout.page" };

export default function ComponentsHub() {
  return (
    <main className="px-8 py-10">
      <Breadcrumbs items={[{ label: "Overview", href: "/" }, { label: "Components" }]} />
      <div className="stack stack-2 mb-8 mt-5">
        <h1 className="ts-page-hero">Components</h1>
        <p className="lp-hero-support" style={{ maxWidth: "60ch" }}>
          Interactive building blocks. Open a component to tune it live — radius, padding, borders,
          and more — then copy clean code into your project.
        </p>
      </div>

      <div className="comp-grid">
        {/* Cards */}
        <Link className="comp-card" href="/components/cards">
          <div className="comp-prev">
            <div className="comp-chip"><Square strokeWidth={1.25} /></div>
            <div className="comp-chip"><Image strokeWidth={1.25} /></div>
            <div className="comp-chip"><Asterisk strokeWidth={1.25} /></div>
          </div>
          <h2>Cards</h2>
          <p className="text-[16px] mt-2 mb-5" style={{ color: "var(--muted)" }}>
            9 layouts · radius, padding, borders, action.
          </p>
          <span className="comp-go">
            Open<ArrowRight className="ico" size={16} strokeWidth={1.25} />
          </span>
        </Link>

        {/* Buttons */}
        <Link className="comp-card" href="/components/buttons">
          <div className="comp-prev">
            <span className="comp-pill">
              Get started<ArrowRight size={16} strokeWidth={1.5} />
            </span>
          </div>
          <h2>Buttons</h2>
          <p className="text-[16px] mt-2 mb-5" style={{ color: "var(--muted)" }}>
            Fill / outline, icons, padding, type — all live.
          </p>
          <span className="comp-go">
            Open<ArrowRight className="ico" size={16} strokeWidth={1.25} />
          </span>
        </Link>

        {/* coming soon */}
        <div className="comp-card comp-soon">
          <div className="comp-prev">
            <div className="comp-chip"><Tag strokeWidth={1.25} /></div>
            <div className="comp-chip"><FormInput strokeWidth={1.25} /></div>
          </div>
          <h2 style={{ color: "var(--muted)" }}>Tags &amp; Inputs</h2>
          <p className="text-[16px] mt-2 mb-5" style={{ color: "var(--muted)" }}>Coming soon.</p>
          <span className="comp-go" style={{ color: "var(--muted)" }}>Coming soon</span>
        </div>
      </div>
    </main>
  );
}
