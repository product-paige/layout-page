// ============================================================
// layout.page — the user's Design System (shared data model)
// Component playgrounds write here; the Your System page + exports read it.
// ============================================================

export type Variant = "fill" | "outline" | "ghost";
export type IconSide = "left" | "right" | "none";
export type Case = "normal" | "upper";
export type IconName =
  | "arrow-right"
  | "arrow-up-right"
  | "corner-down-right"
  | "chevron-right"
  | "move-right";

export type ButtonSettings = {
  variant: Variant;
  radius: number;
  px: number;
  py: number;
  icon: IconName;
  iconSide: IconSide;
  gap: number;
  fs: number;
  weight: number;
  textCase: Case;
};
export type ButtonVariant = { id: string; name: string; s: ButtonSettings };

// ---- per-system tokens (the design-system foundations) ----
export type FontKey = "sans" | "serif" | "mono";
export type Tokens = {
  accent: string;
  ink: string;
  surface: string;
  font: FontKey;
};
export const DEFAULT_TOKENS: Tokens = {
  accent: "#4337FF",
  ink: "#161616",
  surface: "#ffffff",
  font: "sans",
};
export const FONT_STACKS: Record<FontKey, string> = {
  sans: "var(--font-inter), system-ui, sans-serif",
  serif: "Georgia, 'Times New Roman', serif",
  mono: "var(--font-geist-mono), ui-monospace, monospace",
};

// ---- a design system = named container of tokens + component variants ----
export type System = {
  id: string;
  name: string;
  tokens: Tokens;
  buttons: ButtonVariant[];
  // future: cards, badges, inputs…
};
// the whole store = a library of systems with one active
export type Store = { systems: System[]; activeId: string };

export function newSystem(name: string, buttons: ButtonVariant[] = []): System {
  return { id: crypto.randomUUID(), name, tokens: { ...DEFAULT_TOKENS }, buttons };
}

export type ExportTab = "claude" | "css" | "tailwind";

// ---- helpers ----
export function slug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "variant";
}
export function weightWord(w: number) {
  return w >= 600 ? "semibold" : w === 500 ? "medium" : "regular";
}
function fillCssFor(v: Variant) {
  if (v === "fill") return "background:#161616;color:#fff;border-color:#161616;";
  if (v === "outline") return "background:transparent;color:#161616;border-color:#161616;";
  return "background:transparent;color:#161616;border-color:transparent;";
}

// ---- exporters: turn saved variants into portable code ----
export function exportButtonsCSS(vars: ButtonVariant[]) {
  let s =
    ".btn{font-family:Inter,system-ui,sans-serif;display:inline-flex;align-items:center;justify-content:center;line-height:1;cursor:pointer;border:1.5px solid transparent;text-decoration:none}\n.btn svg{width:1em;height:1em}\n";
  vars.forEach((v) => {
    const x = v.s;
    s +=
      `.btn-${slug(v.name)}{border-radius:${x.radius}px;padding:${x.py}px ${x.px}px;gap:${x.gap}px;` +
      `font-size:${x.fs}px;font-weight:${x.weight};${fillCssFor(x.variant)}` +
      (x.textCase === "upper" ? "text-transform:uppercase;letter-spacing:.04em;" : "") +
      "}\n";
  });
  return s.trim();
}
export function exportButtonsTailwind(vars: ButtonVariant[]) {
  const fw = (w: number) => (w >= 600 ? "font-semibold" : w === 500 ? "font-medium" : "font-normal");
  const fill = (v: Variant) =>
    v === "fill"
      ? "bg-neutral-900 text-white border-neutral-900"
      : v === "outline"
        ? "bg-transparent text-neutral-900 border-neutral-900"
        : "bg-transparent text-neutral-900 border-transparent";
  return vars
    .map((v) => {
      const x = v.s;
      const cls = [
        "inline-flex items-center justify-center border-[1.5px]",
        `rounded-[${x.radius}px] px-[${x.px}px] py-[${x.py}px] gap-[${x.gap}px]`,
        `text-[${x.fs}px] ${fw(x.weight)}`,
        fill(x.variant),
        x.textCase === "upper" ? "uppercase tracking-[.04em]" : "",
      ]
        .filter(Boolean)
        .join(" ");
      return `<!-- ${v.name} -->\n<button class="${cls}">${v.name}</button>`;
    })
    .join("\n\n");
}
export function exportButtonsClaude(vars: ButtonVariant[]) {
  let s = "Build a button component system in HTML/CSS. Font: Inter. Variants:\n";
  vars.forEach((v) => {
    const x = v.s;
    const look =
      x.variant === "fill"
        ? "solid dark fill with white text"
        : x.variant === "outline"
          ? "transparent with a dark 1.5px border"
          : "transparent, no border (ghost)";
    const ico =
      x.iconSide === "none"
        ? "no icon"
        : `a ${x.icon.replace(/-/g, " ")} icon on the ${x.iconSide}, ${x.gap}px from the label`;
    s +=
      `- ${v.name}: ${look}; ${x.radius}px corner radius; ${x.py}px×${x.px}px padding; ` +
      `${x.fs}px ${weightWord(x.weight)} text${x.textCase === "upper" ? ", uppercase with .04em tracking" : ""}; ${ico}.\n`;
  });
  s += "Use semantic class names: a base .btn plus a modifier per variant (e.g. .btn-primary).";
  return s;
}

// ---- whole-system export (grows as components are added) ----
export function exportSystem(system: System, tab: ExportTab): string {
  if (system.buttons.length === 0) {
    return "/* This design system is empty — save some components first. */";
  }
  if (tab === "css") return exportButtonsCSS(system.buttons);
  if (tab === "tailwind") return exportButtonsTailwind(system.buttons);
  return exportButtonsClaude(system.buttons);
}
