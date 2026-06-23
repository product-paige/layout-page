// ============================================================
// layout.page — the user's Design System (shared data model)
// Component playgrounds write here; the Your System page + exports read it.
// ============================================================

export type Variant = "fill" | "outline" | "ghost";
export type ButtonColor = "ink" | "accent";
export type IconBgKey = "none" | "ink" | "accent" | "surface";
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
  color: ButtonColor;
  radius: number;
  px: number;
  py: number;
  icon: IconName;
  iconSide: IconSide;
  gap: number;
  fs: number;
  weight: number;
  textCase: Case;
  borderWidth: number; // px
  letterSpacing: number; // em × 100 (e.g. 4 = 0.04em)
  iconBg: IconBgKey; // optional colored container behind the icon
  iconPad: number; // px, padding inside that container
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
// resolve a variant's concrete colors from the system tokens (for live rendering)
export function resolveButtonColors(s: ButtonSettings, t: Tokens) {
  const c = (s.color ?? "ink") === "accent" ? t.accent : t.ink;
  if (s.variant === "fill") return { bg: c, fg: t.surface, bd: c };
  if (s.variant === "outline") return { bg: "transparent", fg: c, bd: c };
  return { bg: "transparent", fg: c, bd: "transparent" }; // ghost
}
// resolve the optional icon-container colors from tokens (null = no container)
export function resolveIconBg(key: IconBgKey, t: Tokens): { bg: string; fg: string } | null {
  if (!key || key === "none") return null;
  if (key === "ink") return { bg: t.ink, fg: t.surface };
  if (key === "accent") return { bg: t.accent, fg: t.surface };
  return { bg: t.surface, fg: t.ink }; // surface
}
// portable font stacks for exported code (no app-specific CSS vars)
export const EXPORT_FONT_STACKS: Record<FontKey, string> = {
  sans: "Inter, system-ui, sans-serif",
  serif: "Georgia, 'Times New Roman', serif",
  mono: "ui-monospace, SFMono-Regular, monospace",
};
// CSS color block referencing the exported token vars
function fillCssVars(variant: Variant, color: ButtonColor) {
  const c = color === "accent" ? "var(--accent)" : "var(--ink)";
  if (variant === "fill") return `background:${c};color:var(--surface);border-color:${c};`;
  if (variant === "outline") return `background:transparent;color:${c};border-color:${c};`;
  return `background:transparent;color:${c};border-color:transparent;`;
}

// ---- exporters: turn saved variants into portable code ----
export function exportButtonsCSS(vars: ButtonVariant[], tokens: Tokens) {
  let s =
    `:root{\n  --accent:${tokens.accent};\n  --ink:${tokens.ink};\n  --surface:${tokens.surface};\n}\n` +
    `.btn{font-family:${EXPORT_FONT_STACKS[tokens.font]};display:inline-flex;align-items:center;justify-content:center;line-height:1;cursor:pointer;border:1.5px solid transparent;text-decoration:none}\n.btn svg{width:1em;height:1em}\n`;
  vars.forEach((v) => {
    const x = v.s;
    const ls = (x.letterSpacing ?? 0) / 100;
    s +=
      `.btn-${slug(v.name)}{border-radius:${x.radius}px;padding:${x.py}px ${x.px}px;gap:${x.gap}px;` +
      `font-size:${x.fs}px;font-weight:${x.weight};border-width:${x.borderWidth ?? 1.5}px;${fillCssVars(x.variant, x.color ?? "ink")}` +
      (ls !== 0 ? `letter-spacing:${ls}em;` : "") +
      (x.textCase === "upper" ? "text-transform:uppercase;" : "") +
      "}\n";
  });
  return s.trim();
}
export function exportButtonsTailwind(vars: ButtonVariant[], tokens: Tokens) {
  const fw = (w: number) => (w >= 600 ? "font-semibold" : w === 500 ? "font-medium" : "font-normal");
  const fill = (variant: Variant, color: ButtonColor) => {
    const c = color === "accent" ? tokens.accent : tokens.ink;
    if (variant === "fill") return `bg-[${c}] text-[${tokens.surface}] border-[${c}]`;
    if (variant === "outline") return `bg-transparent text-[${c}] border-[${c}]`;
    return `bg-transparent text-[${c}] border-transparent`;
  };
  return vars
    .map((v) => {
      const x = v.s;
      const ls = (x.letterSpacing ?? 0) / 100;
      const cls = [
        "inline-flex items-center justify-center",
        `border-[${x.borderWidth ?? 1.5}px]`,
        `rounded-[${x.radius}px] px-[${x.px}px] py-[${x.py}px] gap-[${x.gap}px]`,
        `text-[${x.fs}px] ${fw(x.weight)}`,
        fill(x.variant, x.color ?? "ink"),
        x.textCase === "upper" ? "uppercase" : "",
        ls !== 0 ? `tracking-[${ls}em]` : "",
      ]
        .filter(Boolean)
        .join(" ");
      return `<!-- ${v.name} -->\n<button class="${cls}">${v.name}</button>`;
    })
    .join("\n\n");
}
export function exportButtonsClaude(vars: ButtonVariant[], tokens: Tokens) {
  const fontName =
    tokens.font === "serif" ? "a serif (e.g. Georgia)" : tokens.font === "mono" ? "a monospace" : "Inter";
  let s =
    `Build a button component system in HTML/CSS. Font: ${fontName}. ` +
    `Colors — accent ${tokens.accent}, ink ${tokens.ink}, surface ${tokens.surface}. Variants:\n`;
  vars.forEach((v) => {
    const x = v.s;
    const col = (x.color ?? "ink") === "accent" ? "accent" : "ink";
    const look =
      x.variant === "fill"
        ? `solid ${col} fill with surface-colored text`
        : x.variant === "outline"
          ? `transparent with a ${col} 1.5px border and ${col} text`
          : `transparent, no border (ghost), ${col} text`;
    const ico =
      x.iconSide === "none"
        ? "no icon"
        : `a ${x.icon.replace(/-/g, " ")} icon on the ${x.iconSide}, ${x.gap}px from the label`;
    const bw = x.borderWidth ?? 1.5;
    const ls = (x.letterSpacing ?? 0) / 100;
    const iconBgNote =
      x.iconBg && x.iconBg !== "none"
        ? `, icon sits in a ${x.iconBg} background container with ${x.iconPad ?? 6}px padding`
        : "";
    s +=
      `- ${v.name}: ${look}; ${x.radius}px corner radius; ${bw}px border; ${x.py}px×${x.px}px padding; ` +
      `${x.fs}px ${weightWord(x.weight)} text${x.textCase === "upper" ? ", uppercase" : ""}${ls !== 0 ? `, ${ls}em letter-spacing` : ""}; ${ico}${iconBgNote}.\n`;
  });
  s += "Use semantic class names: a base .btn plus a modifier per variant (e.g. .btn-primary), with the colors as CSS variables.";
  return s;
}

// ---- whole-system export (grows as components are added) ----
export function exportSystem(system: System, tab: ExportTab): string {
  if (system.buttons.length === 0) {
    return "/* This design system is empty — save some components first. */";
  }
  if (tab === "css") return exportButtonsCSS(system.buttons, system.tokens);
  if (tab === "tailwind") return exportButtonsTailwind(system.buttons, system.tokens);
  return exportButtonsClaude(system.buttons, system.tokens);
}
