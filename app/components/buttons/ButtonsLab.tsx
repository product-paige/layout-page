"use client";

import { useState, type CSSProperties } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CornerDownRight,
  ChevronRight,
  MoveRight,
  Clipboard,
  Check,
  Pencil,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useDesignSystem } from "@/components/DesignSystemProvider";
import {
  type Variant,
  type IconSide,
  type Case,
  type IconName,
  type ButtonSettings as Settings,
  type ButtonVariant as SavedVariant,
  type ExportTab,
  exportButtonsCSS,
  exportButtonsTailwind,
  exportButtonsClaude,
} from "@/lib/ds";
import { ButtonPreview } from "@/components/ButtonPreview";
import { RailGroup } from "@/components/RailGroup";
import "./buttons.css";

const ICONS: { name: IconName; Icon: LucideIcon }[] = [
  { name: "arrow-right", Icon: ArrowRight },
  { name: "arrow-up-right", Icon: ArrowUpRight },
  { name: "corner-down-right", Icon: CornerDownRight },
  { name: "chevron-right", Icon: ChevronRight },
  { name: "move-right", Icon: MoveRight },
];

// inline SVG markup matching each lucide icon (used in the copied snippet)
const ICON_SVG: Record<IconName, string> = {
  "arrow-right":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
  "arrow-up-right":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>',
  "corner-down-right":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 10 5 5-5 5"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/></svg>',
  "chevron-right":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
  "move-right":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8 22 12 18 16"/><path d="M2 12h20"/></svg>',
};

export default function ButtonsLab() {
  const [variant, setVariant] = useState<Variant>("fill");
  const [radius, setRadius] = useState(8);
  const [px, setPx] = useState(22);
  const [py, setPy] = useState(12);
  const [icon, setIcon] = useState<IconName>("arrow-right");
  const [iconSide, setIconSide] = useState<IconSide>("right");
  const [gap, setGap] = useState(8);
  const [fs, setFs] = useState(15);
  const [weight, setWeight] = useState(500);
  const [textCase, setTextCase] = useState<Case>("normal");
  const [copied, setCopied] = useState(false);

  // design system: shared store (persisted)
  const { ds, addButton, updateButton, removeButton } = useDesignSystem();
  const variants = ds.buttons;
  const [variantName, setVariantName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [exportTab, setExportTab] = useState<ExportTab>("claude");
  const [exportCopied, setExportCopied] = useState(false);

  const ActiveIcon = ICONS.find((i) => i.name === icon)!.Icon;

  const labStyle = {
    "--bt-radius": `${radius}px`,
    "--bt-px": `${px}px`,
    "--bt-py": `${py}px`,
    "--bt-gap": `${gap}px`,
    "--bt-fs": `${fs}px`,
    "--bt-fw": String(weight),
  } as CSSProperties;

  function copyCode() {
    const uc = textCase === "upper";
    const fillCss =
      variant === "fill"
        ? "background:#161616;color:#fff;border:1.5px solid #161616;"
        : variant === "outline"
          ? "background:transparent;color:#161616;border:1.5px solid #161616;"
          : "background:transparent;color:#161616;border:1.5px solid transparent;";
    const iconSvg = ICON_SVG[icon];
    const iconHtml =
      iconSide === "none"
        ? ""
        : '<span style="display:inline-flex;align-items:center;width:1em;height:1em">' +
          iconSvg +
          "</span>";
    const css =
      ".btn{font-family:Inter,system-ui,sans-serif;display:inline-flex;align-items:center;gap:" +
      gap +
      "px;padding:" +
      py +
      "px " +
      px +
      "px;" +
      "border-radius:" +
      radius +
      "px;font-size:" +
      fs +
      "px;font-weight:" +
      weight +
      ";line-height:1;cursor:pointer;" +
      fillCss +
      (uc ? "text-transform:uppercase;letter-spacing:.04em;" : "") +
      "}\n.btn svg{width:1em;height:1em}";
    const btn =
      '<button class="btn">' +
      (iconSide === "left" ? iconHtml : "") +
      "<span>Get started</span>" +
      (iconSide === "right" ? iconHtml : "") +
      "</button>";
    const snippet = "<!-- layout.page button -->\n<style>\n" + css + "\n</style>\n" + btn;
    if (navigator.clipboard) navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  const currentSettings = (): Settings => ({
    variant,
    radius,
    px,
    py,
    icon,
    iconSide,
    gap,
    fs,
    weight,
    textCase,
  });

  function saveVariant() {
    const name = variantName.trim() || `Variant ${variants.length + 1}`;
    const s = currentSettings();
    if (editingId) {
      updateButton(editingId, name, s);
      setEditingId(null);
    } else {
      addButton(name, s);
    }
    setVariantName("");
  }
  function editVariant(v: SavedVariant) {
    setVariant(v.s.variant);
    setRadius(v.s.radius);
    setPx(v.s.px);
    setPy(v.s.py);
    setIcon(v.s.icon);
    setIconSide(v.s.iconSide);
    setGap(v.s.gap);
    setFs(v.s.fs);
    setWeight(v.s.weight);
    setTextCase(v.s.textCase);
    setEditingId(v.id);
    setVariantName(v.name);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function deleteVariant(id: string) {
    removeButton(id);
    if (editingId === id) {
      setEditingId(null);
      setVariantName("");
    }
  }

  const exportText =
    exportTab === "css"
      ? exportButtonsCSS(variants)
      : exportTab === "tailwind"
        ? exportButtonsTailwind(variants)
        : exportButtonsClaude(variants);
  function copyExport() {
    if (navigator.clipboard) navigator.clipboard.writeText(exportText);
    setExportCopied(true);
    setTimeout(() => setExportCopied(false), 1200);
  }

  return (
    <div className="btnlab-page lp-shell">
      <aside className="lp-rail">
        <div className="lbl rail-title" style={{ color: "var(--muted)" }}>
          Controls
        </div>

        <RailGroup title="Button" defaultOpen>
          <div className="rail-ctrl-inner">
            <span className="lbl">Variant</span>
            <div className="rail-segs">
              {(["fill", "outline", "ghost"] as Variant[]).map((v) => (
                <button
                  key={v}
                  className={`cl-seg${variant === v ? " active" : ""}`}
                  onClick={() => setVariant(v)}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="rail-ctrl-inner">
            <div className="rail-head">
              <span className="lbl">Radius</span>
              <span className="cl-val">{radius}px</span>
            </div>
            <input type="range" min={0} max={40} step={2} value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="cl-range" />
          </div>
          <div className="rail-ctrl-inner">
            <div className="rail-head">
              <span className="lbl">Padding X</span>
              <span className="cl-val">{px}px</span>
            </div>
            <input type="range" min={8} max={48} step={2} value={px} onChange={(e) => setPx(Number(e.target.value))} className="cl-range" />
          </div>
          <div className="rail-ctrl-inner">
            <div className="rail-head">
              <span className="lbl">Padding Y</span>
              <span className="cl-val">{py}px</span>
            </div>
            <input type="range" min={4} max={28} step={1} value={py} onChange={(e) => setPy(Number(e.target.value))} className="cl-range" />
          </div>
        </RailGroup>

        <RailGroup title="Icon">
          <div className="rail-ctrl-inner">
            <span className="lbl">Icon</span>
            <div className="rail-segs">
              {ICONS.map(({ name, Icon }) => (
                <button
                  key={name}
                  className={`cl-seg bt-iconbtn${icon === name ? " active" : ""}`}
                  aria-label={name}
                  onClick={() => setIcon(name)}
                >
                  <Icon size={18} strokeWidth={1.9} />
                </button>
              ))}
            </div>
          </div>
          <div className="rail-ctrl-inner">
            <span className="lbl">Icon side</span>
            <div className="rail-segs">
              {(["left", "right", "none"] as IconSide[]).map((s) => (
                <button
                  key={s}
                  className={`cl-seg${iconSide === s ? " active" : ""}`}
                  onClick={() => setIconSide(s)}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="rail-ctrl-inner">
            <div className="rail-head">
              <span className="lbl">Icon gap</span>
              <span className="cl-val">{gap}px</span>
            </div>
            <input type="range" min={0} max={20} step={1} value={gap} onChange={(e) => setGap(Number(e.target.value))} className="cl-range" />
          </div>
        </RailGroup>

        <RailGroup title="Type">
          <div className="rail-ctrl-inner">
            <div className="rail-head">
              <span className="lbl">Font size</span>
              <span className="cl-val">{fs}px</span>
            </div>
            <input type="range" min={12} max={22} step={1} value={fs} onChange={(e) => setFs(Number(e.target.value))} className="cl-range" />
          </div>
          <div className="rail-ctrl-inner">
            <span className="lbl">Weight</span>
            <div className="rail-segs">
              {[
                { w: 400, label: "Regular" },
                { w: 500, label: "Medium" },
                { w: 600, label: "Bold" },
              ].map(({ w, label }) => (
                <button
                  key={w}
                  className={`cl-seg${weight === w ? " active" : ""}`}
                  onClick={() => setWeight(w)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="rail-ctrl-inner">
            <span className="lbl">Case</span>
            <div className="rail-segs">
              <button
                className={`cl-seg${textCase === "normal" ? " active" : ""}`}
                onClick={() => setTextCase("normal")}
              >
                Aa
              </button>
              <button
                className={`cl-seg${textCase === "upper" ? " active" : ""}`}
                onClick={() => setTextCase("upper")}
              >
                AB
              </button>
            </div>
          </div>
        </RailGroup>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="stack stack-3 px-8 py-9">
          <Breadcrumbs
            items={[
              { label: "Overview", href: "/" },
              { label: "Components", href: "/components" },
              { label: "Buttons" },
            ]}
          />
          <div className="stack stack-1">
            <h1 className="ts-section-lg">Buttons</h1>
            <p className="text-[16px]" style={{ color: "var(--muted)" }}>
              Adjust the controls on the left — the buttons update live.
            </p>
          </div>

          <div className="bt-stage">
            <div
              className="btnlab"
              data-variant={variant}
              data-iconside={iconSide}
              data-case={textCase}
              style={labStyle}
            >
              <button className="bt-btn">
                <span className="bt-ico">
                  <ActiveIcon size="1em" strokeWidth={1.9} />
                </span>
                <span className="bt-label">Get started</span>
              </button>
            </div>
          </div>

          <div>
            <button
              className={`bt-copy${copied ? " copied" : ""}`}
              onClick={copyCode}
            >
              {copied ? (
                <>
                  <Check size={14} strokeWidth={1.5} /> Copied
                </>
              ) : (
                <>
                  <Clipboard size={14} strokeWidth={1.5} /> Copy code
                </>
              )}
            </button>
          </div>

          {/* SAVE TO DESIGN SYSTEM */}
          <div className="bt-save">
            <input
              className="bt-name"
              placeholder="Variant name (e.g. Primary)"
              value={variantName}
              onChange={(e) => setVariantName(e.target.value)}
            />
            <button className="lpbtn lpbtn--primary lpbtn--sm" onClick={saveVariant}>
              {editingId ? "Update variant" : "Save to design system"}
            </button>
            {editingId && (
              <button
                className="lpbtn lpbtn--sm"
                onClick={() => {
                  setEditingId(null);
                  setVariantName("");
                }}
              >
                Cancel
              </button>
            )}
          </div>

          {/* YOUR DESIGN SYSTEM */}
          <div className="stack stack-2" id="your-system">
            <div className="flex items-end justify-between flex-wrap gap-2">
              <h2 className="ts-card-lg">Your design system</h2>
              <span className="lbl">
                {variants.length} button{variants.length === 1 ? "" : "s"} · saved in your browser
              </span>
            </div>

            {variants.length === 0 ? (
              <p className="text-[16px]" style={{ color: "var(--muted)", maxWidth: "60ch" }}>
                Tune a button, give it a name, and{" "}
                <span style={{ color: "var(--ink)" }}>Save to design system</span>. Saved variants
                become your button system — export them as a Claude prompt, CSS, or Tailwind.
              </p>
            ) : (
              <>
                <div className="bt-compare">
                  {variants.map((v) => (
                    <div className="bt-compare-item" key={v.id}>
                      <ButtonPreview s={v.s} label={v.name} />
                      <div className="bt-compare-cap">
                        <span className="bt-variant-name">{v.name}</span>
                        <div className="bt-variant-actions">
                          <button onClick={() => editVariant(v)} aria-label={`Edit ${v.name}`}>
                            <Pencil size={14} strokeWidth={1.6} />
                          </button>
                          <button onClick={() => deleteVariant(v.id)} aria-label={`Delete ${v.name}`}>
                            <Trash2 size={14} strokeWidth={1.6} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bt-export">
                  <div className="rail-segs" style={{ alignItems: "center" }}>
                    {(["claude", "css", "tailwind"] as const).map((t) => (
                      <button
                        key={t}
                        className={`cl-seg${exportTab === t ? " active" : ""}`}
                        onClick={() => setExportTab(t)}
                      >
                        {t === "claude" ? "Claude prompt" : t === "css" ? "CSS" : "Tailwind"}
                      </button>
                    ))}
                    <button
                      className={`bt-copy${exportCopied ? " copied" : ""}`}
                      style={{ marginLeft: "auto" }}
                      onClick={copyExport}
                    >
                      {exportCopied ? (
                        <>
                          <Check size={14} strokeWidth={1.5} /> Copied
                        </>
                      ) : (
                        <>
                          <Clipboard size={14} strokeWidth={1.5} /> Copy
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="bt-code">{exportText}</pre>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
