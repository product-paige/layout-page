import FaqGrid from "./FaqGrid";
import "./faq.css";

export const metadata = {
  title: "FAQ — layout.page",
  description:
    "Answer the objections before they bounce. FAQ structures — neutral and unstyled, so you choose the arrangement that fits your content depth.",
};

export default function FaqPage() {
  return (
    <main className="faq-page flex-1 min-w-0">
      <section className="px-10 pt-10 pb-7 flex items-end justify-between">
        <div>
          <h1 className="text-[clamp(30px,4vw,40px)]">FAQ</h1>
          <p className="subhead text-muted mt-3 max-w-[54ch]">
            Answer the objections before they bounce. Structures only — neutral and unstyled, so you
            choose the arrangement that fits your content depth.
          </p>
        </div>
        <span className="lbl hidden lg:block">12 layouts</span>
      </section>

      <FaqGrid />
    </main>
  );
}
