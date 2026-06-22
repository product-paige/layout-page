"use client";

import { useState } from "react";
import { ChevronDown, Plus, Check } from "lucide-react";
import { useDesignSystem } from "@/components/DesignSystemProvider";

// Compact active-system picker for the playground rails.
export function SystemSwitcher() {
  const { systems, active, setActive, createSystem } = useDesignSystem();
  const [open, setOpen] = useState(false);
  return (
    <div className="sys-switch">
      <button className="sys-switch-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="sys-switch-label">System</span>
        <span className="sys-switch-name">{active.name}</span>
        <ChevronDown size={14} strokeWidth={1.75} className={"sys-switch-chev" + (open ? " open" : "")} />
      </button>
      {open && (
        <div className="sys-switch-menu">
          {systems.map((s) => (
            <button
              key={s.id}
              className={"sys-switch-item" + (s.id === active.id ? " active" : "")}
              onClick={() => {
                setActive(s.id);
                setOpen(false);
              }}
            >
              <span>{s.name}</span>
              {s.id === active.id && <Check size={14} strokeWidth={2} />}
            </button>
          ))}
          <button
            className="sys-switch-new"
            onClick={() => {
              createSystem();
              setOpen(false);
            }}
          >
            <Plus size={14} strokeWidth={2} /> New system
          </button>
        </div>
      )}
    </div>
  );
}
