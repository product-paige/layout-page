"use client";

import type { CSSProperties } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CornerDownRight,
  ChevronRight,
  MoveRight,
  type LucideIcon,
} from "lucide-react";
import { type ButtonSettings, type IconName } from "@/lib/ds";

const ICONS: Record<IconName, LucideIcon> = {
  "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight,
  "corner-down-right": CornerDownRight,
  "chevron-right": ChevronRight,
  "move-right": MoveRight,
};

export function settingsToStyle(s: ButtonSettings): CSSProperties {
  return {
    "--bt-radius": `${s.radius}px`,
    "--bt-px": `${s.px}px`,
    "--bt-py": `${s.py}px`,
    "--bt-gap": `${s.gap}px`,
    "--bt-fs": `${s.fs}px`,
    "--bt-fw": String(s.weight),
  } as CSSProperties;
}

// Renders a single button in the given variant's style. Relies on the .btnlab
// / .bt-btn rules (imported via buttons.css on pages that use it).
export function ButtonPreview({ s, label }: { s: ButtonSettings; label: string }) {
  const Icon = ICONS[s.icon];
  return (
    <div
      className="btnlab"
      data-variant={s.variant}
      data-iconside={s.iconSide}
      data-case={s.textCase}
      style={settingsToStyle(s)}
    >
      <button className="bt-btn">
        <span className="bt-ico">
          <Icon size="1em" strokeWidth={1.9} />
        </span>
        <span className="bt-label">{label}</span>
      </button>
    </div>
  );
}
