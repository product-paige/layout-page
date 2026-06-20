// Structured Editorial style-system data (ported from layout-system/style-systems-data.js).
// Source of truth for the Design Systems detail page specimens and code panel.

export type ColorToken = { name: string; value: string; role: string };
export type TypeToken = {
  name: string;
  var: string;
  size: string;
  line: string;
  tracking: string;
  weight: string;
  case: string;
};
export type SpacingToken = { name: string; value: number };
export type RadiusToken = { name: string; value: string; role: string };

export type StyleSystem = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  summary: string;
  tags: string[];
  modes: { id: string; name: string; desc: string }[];
  tokens: {
    colors: { neutral: ColorToken[]; dark: ColorToken[]; color: ColorToken[] };
    typography: TypeToken[];
    spacing: SpacingToken[];
    radius: RadiusToken[];
    borders: RadiusToken[];
  };
  components: { name: string; role: string; rules: string }[];
  guidelines: { do: string[]; dont: string[] };
  cssVariables: string;
  claudePrompt: string;
};

export const STRUCTURED_EDITORIAL: StyleSystem = {
  id: "structured-editorial",
  name: "Structured Editorial",
  tagline: "Same structure. New system.",
  description:
    "A complete grayscale-first Design System: typography, spacing, colors, buttons, cards, labels, forms, and states. Neutral by default, with dark and color modes.",
  summary:
    "Structured Editorial is inspired by the Lifecycle template's rhythm — not a 1:1 clone. It is a grayscale-first visual framework defined by spacing, typography, borders, rhythm, and layout rather than one brand palette, so it stays generic and reusable across many sites. Neutral is the default; dark is an alternate mode; the color example is optional. Color is a personality layer, not the foundation, so you can judge structure, hierarchy, and rhythm before applying brand expression.",
  tags: ["Editorial", "Grayscale", "Structured", "Typographic", "Grid-based", "Token-ready", "Neutral-first"],
  modes: [
    {
      id: "neutral",
      name: "Light",
      desc: "Default mode. Grayscale-first — judge structure, hierarchy, spacing, and rhythm before any brand color.",
    },
    {
      id: "dark",
      name: "Dark",
      desc: "Alternate mode. The same layout, type, spacing, borders, and rhythm on inverted layout.page surfaces.",
    },
    {
      id: "color",
      name: "Color Example",
      desc: "Optional. One restrained accent shows how the system accepts personality without changing the structure.",
    },
  ],
  tokens: {
    colors: {
      neutral: [
        { name: "--se-bg", value: "#F7F6F1", role: "Page background" },
        { name: "--se-surface", value: "#FFFFFF", role: "Cards / raised surfaces" },
        { name: "--se-surface-muted", value: "#ECEAE2", role: "Sunken / muted fills" },
        { name: "--se-text", value: "#1F1F1B", role: "Primary text" },
        { name: "--se-text-muted", value: "rgba(31,31,27,.68)", role: "Secondary text" },
        { name: "--se-text-soft", value: "rgba(31,31,27,.44)", role: "Hints / captions" },
        { name: "--se-border", value: "rgba(31,31,27,.18)", role: "Hairline borders" },
        { name: "--se-border-strong", value: "rgba(31,31,27,.42)", role: "Strong borders" },
        { name: "--se-inverse", value: "#1F1F1B", role: "Inverse surface" },
        { name: "--se-inverse-text", value: "#F7F6F1", role: "Text on inverse" },
      ],
      dark: [
        { name: "--se-dark-bg", value: "#151512", role: "Page background" },
        { name: "--se-dark-surface", value: "#1F1F1B", role: "Cards / raised surfaces" },
        { name: "--se-dark-surface-muted", value: "#2A2A25", role: "Sunken / muted fills" },
        { name: "--se-dark-text", value: "#F7F6F1", role: "Primary text" },
        { name: "--se-dark-text-muted", value: "rgba(247,246,241,.68)", role: "Secondary text" },
        { name: "--se-dark-text-soft", value: "rgba(247,246,241,.44)", role: "Hints / captions" },
        { name: "--se-dark-border", value: "rgba(247,246,241,.16)", role: "Hairline borders" },
        { name: "--se-dark-border-strong", value: "rgba(247,246,241,.36)", role: "Strong borders" },
      ],
      color: [
        { name: "--se-accent", value: "#E5F937", role: "Accent (example only)" },
        { name: "--se-accent-soft", value: "#F8FDC3", role: "Soft accent fill" },
        { name: "--se-accent-deep", value: "#09342B", role: "Accent ink / deep" },
      ],
    },
    typography: [
      { name: "Display XL", var: "--se-display-xl", size: "clamp(72px, 11vw, 132px)", line: "0.88", tracking: "-0.055em", weight: "500", case: "Tight" },
      { name: "Display LG", var: "--se-display-lg", size: "clamp(56px, 8vw, 96px)", line: "0.92", tracking: "-0.05em", weight: "500", case: "Tight" },
      { name: "Heading XL", var: "--se-heading-xl", size: "clamp(42px, 5vw, 72px)", line: "0.98", tracking: "-0.04em", weight: "500", case: "Tight" },
      { name: "Heading LG", var: "--se-heading-lg", size: "clamp(32px, 3.5vw, 48px)", line: "1.05", tracking: "-0.035em", weight: "500", case: "Tight" },
      { name: "Heading MD", var: "--se-heading-md", size: "28px", line: "1.12", tracking: "-0.025em", weight: "500", case: "Normal" },
      { name: "Heading SM", var: "--se-heading-sm", size: "20px", line: "1.2", tracking: "-0.015em", weight: "500", case: "Normal" },
      { name: "Body LG", var: "--se-body-lg", size: "20px", line: "1.45", tracking: "-0.01em", weight: "400", case: "Normal" },
      { name: "Body MD", var: "--se-body-md", size: "16px", line: "1.5", tracking: "-0.005em", weight: "400", case: "Normal" },
      { name: "Body SM", var: "--se-body-sm", size: "14px", line: "1.45", tracking: "0", weight: "400", case: "Normal" },
      { name: "Mono Label", var: "--se-label", size: "12px", line: "1", tracking: "0.04em", weight: "500", case: "Uppercase" },
    ],
    spacing: [
      { name: "--se-space-1", value: 6 },
      { name: "--se-space-2", value: 12 },
      { name: "--se-space-3", value: 18 },
      { name: "--se-space-4", value: 24 },
      { name: "--se-space-5", value: 36 },
      { name: "--se-space-6", value: 48 },
      { name: "--se-space-7", value: 72 },
      { name: "--se-space-8", value: 96 },
      { name: "--se-space-9", value: 144 },
      { name: "--se-space-10", value: 240 },
    ],
    radius: [
      { name: "--se-radius-sm", value: "6px", role: "Buttons, tags, inputs, compact controls" },
      { name: "--se-radius-md", value: "12px", role: "Cards, panels, media frames" },
    ],
    borders: [
      { name: "--se-border-width", value: "1px", role: "Default hairline" },
      { name: "--se-border-default", value: "1px solid var(--se-border)", role: "Structure rule" },
      { name: "--se-border-strong", value: "1px solid var(--se-border-strong)", role: "Emphasis rule" },
    ],
  },
  components: [
    { name: "Bracketed Label", role: "Section labels, metadata, category markers, system annotations.", rules: "Mono type, uppercase, small size, square brackets." },
    { name: "Hero Masthead", role: "Large editorial entry section.", rules: "Bracketed label, huge stacked headline, concise body, one or two CTAs." },
    { name: "Section Header", role: "Introduces a section with hierarchy and breathing room.", rules: "Small label paired with a large heading and a short supporting paragraph." },
    { name: "Feature Card", role: "Benefits, services, or product modules.", rules: "Use border, spacing, and type hierarchy instead of decoration." },
    { name: "Logo / Proof Strip", role: "Trust-building section.", rules: "Monochrome in neutral mode, even spacing, simple placeholders." },
    { name: "CTA Group", role: "Primary and secondary actions.", rules: "Short labels, clear hierarchy, avoid competing actions." },
    { name: "Editorial Media Frame", role: "Image, preview, dashboard, or abstract media placeholder.", rules: "Bordered frames, measured aspect ratios, avoid detailed fake UI." },
    { name: "Footer System", role: "Large structured footer.", rules: "Columns, labels, muted text, a strong closing statement." },
  ],
  guidelines: {
    do: [
      "Use oversized headlines with tight line height.",
      "Use bracketed mono labels to create structure.",
      "Use grayscale first.",
      "Use a 6px spacing rhythm.",
      "Use generous section padding.",
      "Use thin borders and grids for structure.",
      "Keep cards restrained and consistent.",
      "Keep body text readable and narrow.",
      "Add personality through token overrides.",
      "Use color sparingly and intentionally.",
      "Preserve the same layout rules across modes.",
    ],
    dont: [
      "Don't make the default mode colorful.",
      "Don't use generic SaaS gradients.",
      "Don't use heavy shadows.",
      "Don't use pill badges everywhere.",
      "Don't make every card a different style.",
      "Don't use random spacing values.",
      "Don't overuse accent color.",
      "Don't use decorative blobs or floating shapes.",
      "Don't make the system feel playful or consumer-app-like.",
      "Don't change layout structure between modes.",
    ],
  },
  cssVariables: `:root {
  /* Fonts */
  --se-font-sans: "Funnel Sans", system-ui, sans-serif;
  --se-font-mono: "Geist Mono Variable", "Geist Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;

  /* Neutral mode */
  --se-bg: #F7F6F1;
  --se-surface: #FFFFFF;
  --se-surface-muted: #ECEAE2;
  --se-text: #1F1F1B;
  --se-text-muted: rgba(31, 31, 27, 0.68);
  --se-text-soft: rgba(31, 31, 27, 0.44);
  --se-border: rgba(31, 31, 27, 0.18);
  --se-border-strong: rgba(31, 31, 27, 0.42);
  --se-inverse: #1F1F1B;
  --se-inverse-text: #F7F6F1;

  /* Dark mode */
  --se-dark-bg: #151512;
  --se-dark-surface: #1F1F1B;
  --se-dark-surface-muted: #2A2A25;
  --se-dark-text: #F7F6F1;
  --se-dark-text-muted: rgba(247, 246, 241, 0.68);
  --se-dark-text-soft: rgba(247, 246, 241, 0.44);
  --se-dark-border: rgba(247, 246, 241, 0.16);
  --se-dark-border-strong: rgba(247, 246, 241, 0.36);

  /* Color example (optional personality layer) */
  --se-accent: #E5F937;
  --se-accent-soft: #F8FDC3;
  --se-accent-deep: #09342B;

  /* Containers */
  --se-container-sm: 760px;
  --se-container-md: 960px;
  --se-container-lg: 1166px;
  --se-container-xl: 1404px;

  /* Spacing (6px rhythm) */
  --se-space-0: 0;
  --se-space-1: 6px;  --se-space-2: 12px;  --se-space-3: 18px;  --se-space-4: 24px;  --se-space-5: 36px;
  --se-space-6: 48px; --se-space-7: 72px;  --se-space-8: 96px;  --se-space-9: 144px; --se-space-10: 240px;

  /* Gaps */
  --se-gap-tight: 12px;
  --se-gap-default: 24px;
  --se-gap-section: 72px;

  /* Section padding */
  --se-section-padding-sm: 72px;
  --se-section-padding: 144px;
  --se-section-padding-lg: 240px;
  --se-section-padding-fullwidth: 48px;

  /* Typography */
  --se-display-xl: clamp(72px, 11vw, 132px); --se-display-xl-line: 0.88; --se-display-xl-tracking: -0.055em; --se-display-xl-weight: 500;
  --se-display-lg: clamp(56px, 8vw, 96px);   --se-display-lg-line: 0.92; --se-display-lg-tracking: -0.05em;  --se-display-lg-weight: 500;
  --se-heading-xl: clamp(42px, 5vw, 72px);   --se-heading-xl-line: 0.98; --se-heading-xl-tracking: -0.04em;  --se-heading-xl-weight: 500;
  --se-heading-lg: clamp(32px, 3.5vw, 48px); --se-heading-lg-line: 1.05; --se-heading-lg-tracking: -0.035em; --se-heading-lg-weight: 500;
  --se-heading-md: 28px; --se-heading-md-line: 1.12; --se-heading-md-tracking: -0.025em; --se-heading-md-weight: 500;
  --se-heading-sm: 20px; --se-heading-sm-line: 1.2;  --se-heading-sm-tracking: -0.015em; --se-heading-sm-weight: 500;
  --se-body-lg: 20px; --se-body-lg-line: 1.45; --se-body-lg-tracking: -0.01em;  --se-body-lg-weight: 400;
  --se-body-md: 16px; --se-body-md-line: 1.5;  --se-body-md-tracking: -0.005em; --se-body-md-weight: 400;
  --se-body-sm: 14px; --se-body-sm-line: 1.45; --se-body-sm-tracking: 0;        --se-body-sm-weight: 400;
  --se-label: 12px; --se-label-line: 1; --se-label-tracking: 0.04em; --se-label-weight: 500; --se-label-transform: uppercase;

  /* Radius */
  --se-radius-sm: 6px;
  --se-radius-md: 12px;

  /* Borders */
  --se-border-width: 1px;
  --se-border-default: 1px solid var(--se-border);
  --se-border-strong: 1px solid var(--se-border-strong);

  /* Components — buttons */
  --se-button-height: 60px;
  --se-button-sm-height: 42px;
  --se-button-padding-x: 48px;
  --se-button-sm-padding-x: 18px;
  --se-button-radius: var(--se-radius-sm);
  --se-button-font: var(--se-font-mono);
  --se-button-font-size: var(--se-label);
  --se-button-letter-spacing: var(--se-label-tracking);
  --se-button-font-weight: 500;
  /* labels */
  --se-label-font: var(--se-font-mono);
  --se-label-size: 12px;
  /* cards */
  --se-card-radius: var(--se-radius-md);
  --se-card-border: 1px solid var(--se-border);
  --se-card-padding: var(--se-space-5);
  --se-card-gap: var(--se-space-4);
  /* tags / badges */
  --se-tag-height: 30px;
  --se-tag-padding-x: 12px;
  --se-tag-radius: var(--se-radius-sm);
  --se-tag-border: 1px solid var(--se-border);
  --se-tag-font: var(--se-font-mono);
  --se-tag-font-size: 12px;
  /* forms / inputs */
  --se-input-height: 48px;
  --se-input-radius: var(--se-radius-sm);
  --se-input-border: 1px solid var(--se-border);
  --se-input-padding-x: 18px;
  --se-input-font-size: 16px;
  /* links */
  --se-link-underline-offset: 0.18em;
  --se-link-decoration-thickness: 1px;
  /* navigation */
  --se-navbar-height: 72px;
  --se-nav-link-font: var(--se-font-mono);
  --se-nav-link-size: 12px;
  --se-nav-link-tracking: 0.04em;
  /* media frames */
  --se-media-radius: var(--se-radius-md);
  --se-media-border: 1px solid var(--se-border);
  /* shadows (mostly none) */
  --se-shadow-none: none;
  --se-shadow-subtle: none;

  /* Section heights */
  --se-section-height-md: 576px;
  --se-section-height-lg: 768px;
  --se-section-height-xl: 912px;

  /* Decorative rhythm */
  --se-strip-height-sm: 24px;
  --se-strip-height-md: 48px;
  --se-strip-height-default: 72px;
  --se-line-width: 1px;
  --se-lines-gap: 6px;

  /* Interaction — restrained hover */
  --se-transition-fast: 140ms ease;
  --se-transition-default: 180ms ease;
  --se-hover-opacity: 0.84;
  --se-hover-lift: 0px;
  --se-hover-border: var(--se-border-strong);
  --se-hover-surface: var(--se-surface-muted);
  --se-hover-text: var(--se-text);
  --se-focus-ring: 2px solid var(--se-text);
  --se-focus-offset: 3px;
}

/* Hover overrides per mode */
[data-mode="dark"] {
  --se-hover-border: var(--se-dark-border-strong);
  --se-hover-surface: var(--se-dark-surface-muted);
  --se-hover-text: var(--se-dark-text);
  --se-focus-ring: 2px solid var(--se-dark-text);
}
[data-mode="color"] {
  --se-hover-border: var(--se-accent-deep);
  --se-hover-surface: var(--se-accent-soft);
  --se-focus-ring: 2px solid var(--se-accent-deep);
}`,
  claudePrompt:
    "Use the Structured Editorial style system. It is inspired by the Lifecycle template's rhythm but is NOT a 1:1 clone — keep it grayscale-first, generic, and reusable. Use large tight headlines, bracketed mono labels, generous 6px-based spacing, off-white or monochrome backgrounds, thin borders, restrained radius, and structured grids. The style is defined by spacing, typography, borders, rhythm, and layout — not by one brand palette. Neutral is the default; dark is an alternate mode; the color example is optional. Treat color as a personality layer, not the foundation. Preserve the same spacing, typography, hierarchy, and component rules across neutral, dark, and color modes. Avoid generic SaaS gradients, decorative blobs, heavy shadows, pill-heavy UI, or overly branded styling.",
};
