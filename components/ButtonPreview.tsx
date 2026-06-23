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
import {
  type ButtonSettings,
  type IconName,
  type Tokens,
  resolveButtonColors,
  resolveIconBg,
  FONT_STACKS,
} from "@/lib/ds";
import { useDesignSystem } from "@/components/DesignSystemProvider";

const ICONS: Record<IconName, LucideIcon> = {
  "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight,
  "corner-down-right": CornerDownRight,
  "chevron-right": ChevronRight,
  "move-right": MoveRight,
};

// All the CSS custom properties a button needs — shape + colors (resolved from
// the system's tokens) + font. Used by the stage, the compare grid, and Your System.
export function settingsToStyle(s: ButtonSettings, tokens: Tokens): CSSProperties {
  const c = resolveButtonColors(s, tokens);
  const ib = resolveIconBg(s.iconBg ?? "none", tokens);
  return {
    "--bt-radius": `${s.radius}px`,
    "--bt-px": `${s.px}px`,
    "--bt-py": `${s.py}px`,
    "--bt-gap": `${s.gap}px`,
    "--bt-fs": `${s.fs}px`,
    "--bt-fw": String(s.weight),
    "--bt-bg": c.bg,
    "--bt-fg": c.fg,
    "--bt-bd": c.bd,
    "--bt-bw": `${s.borderWidth ?? 1.5}px`,
    "--bt-ls": `${(s.letterSpacing ?? 0) / 100}em`,
    "--bt-icon-bg": ib ? ib.bg : "transparent",
    "--bt-icon-fg": ib ? ib.fg : "currentColor",
    "--bt-icon-pad": ib ? `${s.iconPad ?? 6}px` : "0px",
    "--bt-font": FONT_STACKS[tokens.font],
  } as CSSProperties;
}

// Renders a single button in the given variant's style, using the ACTIVE system's tokens.
export function ButtonPreview({ s, label }: { s: ButtonSettings; label: string }) {
  const { active } = useDesignSystem();
  const Icon = ICONS[s.icon];
  return (
    <div
      className="btnlab"
      data-iconside={s.iconSide}
      data-case={s.textCase}
      style={settingsToStyle(s, active.tokens)}
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
