import FaqAccordion from "./FaqAccordion";
import "./accordion.css";

export const metadata = {
  title: "FAQ · Accordion — layout.page",
  description:
    "One question per row, expand on click. Best for long lists where you want the page short. Re-skin it with your own tokens after copying.",
};

export default function FaqAccordionPage() {
  return (
    <main className="faq-ac-page flex-1 min-w-0">
      <FaqAccordion />
    </main>
  );
}
