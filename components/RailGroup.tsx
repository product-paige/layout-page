"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

// Collapsible control group for the playground rails.
export function RailGroup({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rail-group">
      <button
        type="button"
        className="rail-group-head"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="lbl">{title}</span>
        <ChevronDown className={"rail-chevron" + (open ? " open" : "")} size={15} strokeWidth={1.75} />
      </button>
      {open && <div className="rail-group-body">{children}</div>}
    </div>
  );
}
