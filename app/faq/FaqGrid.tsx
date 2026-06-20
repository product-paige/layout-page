"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Copy, ArrowRight, Search } from "lucide-react";

type Filter = "all" | "accordion" | "grid" | "two-col" | "search";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "accordion", label: "Accordion" },
  { value: "grid", label: "Grid" },
  { value: "two-col", label: "Two-column" },
  { value: "search", label: "With search" },
];

export default function FaqGrid() {
  const [active, setActive] = useState<Filter>("all");

  const cards = useMemo(
    () => [
      { tags: ["accordion"], live: true },
      { tags: ["two-col"], live: false },
      { tags: ["grid"], live: false },
      { tags: ["accordion"], live: false },
      { tags: ["search", "accordion"], live: false },
    ],
    []
  );

  const shown = cards.filter((c) => active === "all" || c.tags.includes(active)).length;

  const visible = (tags: string[]) => active === "all" || tags.includes(active);

  return (
    <>
      <div className="px-10 pb-6 border-b border-line">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="lbl mr-1">Filter</span>
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              className={"chip" + (active === f.value ? " active" : "")}
              onClick={() => setActive(f.value)}
            >
              {f.label}
            </button>
          ))}
          <span className="lbl ml-auto">{shown} shown</span>
        </div>
      </div>

      <section className="grid sm:grid-cols-2">
        {/* 1. Accordion — has a live detail page */}
        <article
          className="card group relative border-r border-b border-line bg-surface"
          style={{ display: visible(["accordion"]) ? undefined : "none" }}
        >
          <button className="copybtn">
            <Copy className="ico" size={16} strokeWidth={1.5} /> Copy
          </button>
          <Link href="/faq/accordion" className="block p-5">
            <div className="wf aspect-[16/9] p-6 flex flex-col gap-2 justify-center">
              <div className="row h-7 flex items-center justify-between px-3">
                <div className="bar h-1.5 w-[55%]"></div>
                <span className="plus text-sm">+</span>
              </div>
              <div className="row h-7 flex items-center justify-between px-3">
                <div className="bar h-1.5 w-[45%]"></div>
                <span className="plus text-sm">+</span>
              </div>
              <div className="row h-7 flex items-center justify-between px-3">
                <div className="bar h-1.5 w-[60%]"></div>
                <span className="plus text-sm">+</span>
              </div>
              <div className="row h-7 flex items-center justify-between px-3">
                <div className="bar h-1.5 w-[40%]"></div>
                <span className="plus text-sm">+</span>
              </div>
            </div>
          </Link>
          <div className="px-5 pb-5 -mt-1 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-medium">Accordion</span>
                <span className="lbl">F·01</span>
                <span className="lbl text-royal">● live</span>
              </div>
              <div className="flex gap-1.5 mt-2.5">
                <span className="tag">accordion</span>
                <span className="tag">compact</span>
              </div>
            </div>
            <Link href="/faq/accordion" className="viewlink">
              View <ArrowRight className="ico" size={16} strokeWidth={1.5} />
            </Link>
          </div>
        </article>

        {/* 2. Two-column */}
        <article
          className="card group relative border-r border-b border-line bg-surface"
          style={{ display: visible(["two-col"]) ? undefined : "none" }}
        >
          <button className="copybtn">
            <Copy className="ico" size={16} strokeWidth={1.5} /> Copy
          </button>
          <a href="#" className="block p-5">
            <div className="wf aspect-[16/9] p-6 flex gap-5">
              <div className="w-[38%] flex flex-col gap-2">
                <div className="bar-strong h-3 w-[80%]"></div>
                <div className="bar h-1.5 w-[90%] mt-1"></div>
                <div className="bar h-1.5 w-[70%]"></div>
              </div>
              <div className="flex-1 flex flex-col gap-2.5">
                <div className="row h-6 flex items-center justify-between px-2">
                  <div className="bar h-1.5 w-[50%]"></div>
                  <span className="plus text-xs">+</span>
                </div>
                <div className="row h-6 flex items-center justify-between px-2">
                  <div className="bar h-1.5 w-[60%]"></div>
                  <span className="plus text-xs">+</span>
                </div>
                <div className="row h-6 flex items-center justify-between px-2">
                  <div className="bar h-1.5 w-[40%]"></div>
                  <span className="plus text-xs">+</span>
                </div>
              </div>
            </div>
          </a>
          <div className="px-5 pb-5 -mt-1 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-medium">Two-column</span>
                <span className="lbl">F·02</span>
              </div>
              <div className="flex gap-1.5 mt-2.5">
                <span className="tag">two-col</span>
                <span className="tag">heading</span>
              </div>
            </div>
            <a href="#" className="viewlink">
              View <ArrowRight className="ico" size={16} strokeWidth={1.5} />
            </a>
          </div>
        </article>

        {/* 3. Grid 2x2 */}
        <article
          className="card group relative border-r border-b border-line bg-surface"
          style={{ display: visible(["grid"]) ? undefined : "none" }}
        >
          <button className="copybtn">
            <Copy className="ico" size={16} strokeWidth={1.5} /> Copy
          </button>
          <a href="#" className="block p-5">
            <div className="wf aspect-[16/9] p-6 grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <div className="bar-strong h-2.5 w-[70%]"></div>
                <div className="bar h-1.5 w-full"></div>
                <div className="bar h-1.5 w-[80%]"></div>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="bar-strong h-2.5 w-[60%]"></div>
                <div className="bar h-1.5 w-full"></div>
                <div className="bar h-1.5 w-[75%]"></div>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="bar-strong h-2.5 w-[65%]"></div>
                <div className="bar h-1.5 w-full"></div>
                <div className="bar h-1.5 w-[70%]"></div>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="bar-strong h-2.5 w-[55%]"></div>
                <div className="bar h-1.5 w-full"></div>
                <div className="bar h-1.5 w-[85%]"></div>
              </div>
            </div>
          </a>
          <div className="px-5 pb-5 -mt-1 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-medium">Grid · 2×2</span>
                <span className="lbl">F·03</span>
              </div>
              <div className="flex gap-1.5 mt-2.5">
                <span className="tag">grid</span>
                <span className="tag">open</span>
              </div>
            </div>
            <a href="#" className="viewlink">
              View <ArrowRight className="ico" size={16} strokeWidth={1.5} />
            </a>
          </div>
        </article>

        {/* 4. Centered stack */}
        <article
          className="card group relative border-r border-b border-line bg-surface"
          style={{ display: visible(["accordion"]) ? undefined : "none" }}
        >
          <button className="copybtn">
            <Copy className="ico" size={16} strokeWidth={1.5} /> Copy
          </button>
          <a href="#" className="block p-5">
            <div className="wf aspect-[16/9] p-6 flex flex-col items-center gap-2.5 justify-center">
              <div className="bar-strong h-3 w-[40%]"></div>
              <div className="row h-6 w-[70%] flex items-center justify-between px-3 mt-1">
                <div className="bar h-1.5 w-[50%]"></div>
                <span className="plus text-xs">+</span>
              </div>
              <div className="row h-6 w-[70%] flex items-center justify-between px-3">
                <div className="bar h-1.5 w-[60%]"></div>
                <span className="plus text-xs">+</span>
              </div>
              <div className="row h-6 w-[70%] flex items-center justify-between px-3">
                <div className="bar h-1.5 w-[45%]"></div>
                <span className="plus text-xs">+</span>
              </div>
            </div>
          </a>
          <div className="px-5 pb-5 -mt-1 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-medium">Centered stack</span>
                <span className="lbl">F·04</span>
              </div>
              <div className="flex gap-1.5 mt-2.5">
                <span className="tag">accordion</span>
                <span className="tag">centered</span>
              </div>
            </div>
            <a href="#" className="viewlink">
              View <ArrowRight className="ico" size={16} strokeWidth={1.5} />
            </a>
          </div>
        </article>

        {/* 5. With search */}
        <article
          className="card group relative border-r border-b border-line bg-surface"
          style={{ display: visible(["search", "accordion"]) ? undefined : "none" }}
        >
          <button className="copybtn">
            <Copy className="ico" size={16} strokeWidth={1.5} /> Copy
          </button>
          <a href="#" className="block p-5">
            <div className="wf aspect-[16/9] p-6 flex flex-col gap-2 justify-center">
              <div className="row h-7 flex items-center px-3 gap-2 mb-1">
                <Search className="plus" style={{ width: "12px", height: "12px" }} strokeWidth={1.5} />
                <div className="bar h-1.5 w-[40%]"></div>
              </div>
              <div className="row h-6 flex items-center justify-between px-3">
                <div className="bar h-1.5 w-[55%]"></div>
                <span className="plus text-xs">+</span>
              </div>
              <div className="row h-6 flex items-center justify-between px-3">
                <div className="bar h-1.5 w-[48%]"></div>
                <span className="plus text-xs">+</span>
              </div>
              <div className="row h-6 flex items-center justify-between px-3">
                <div className="bar h-1.5 w-[62%]"></div>
                <span className="plus text-xs">+</span>
              </div>
            </div>
          </a>
          <div className="px-5 pb-5 -mt-1 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-medium">With search</span>
                <span className="lbl">F·05</span>
              </div>
              <div className="flex gap-1.5 mt-2.5">
                <span className="tag">search</span>
                <span className="tag">large set</span>
              </div>
            </div>
            <a href="#" className="viewlink">
              View <ArrowRight className="ico" size={16} strokeWidth={1.5} />
            </a>
          </div>
        </article>
      </section>

      <div className="px-10 py-10 lbl">
        Showing 5 of 12 —{" "}
        <Link href="/#pricing" className="text-royal hover:underline inline-flex items-center gap-1.5">
          Unlock all with Pro <ArrowRight className="ico" size={16} strokeWidth={1.5} />
        </Link>
      </div>
    </>
  );
}
