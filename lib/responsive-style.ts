export const BREAKPOINTS = ["base", "sm", "md", "lg", "xl", "2xl"] as const;

export type Breakpoint = (typeof BREAKPOINTS)[number];

export const BREAKPOINT_MIN_WIDTH: Record<Breakpoint, number> = {
  base: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const BREAKPOINT_PREVIEW_WIDTH: Record<Breakpoint, number> = {
  base: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const BREAKPOINT_LABEL: Record<Breakpoint, string> = {
  base: "Mobile",
  sm: "Mobile L",
  md: "Tablet",
  lg: "Laptop",
  xl: "Desktop",
  "2xl": "Wide",
};

export type CSSDecl = Partial<{
  paddingTop: string;
  paddingRight: string;
  paddingBottom: string;
  paddingLeft: string;
  marginTop: string;
  marginRight: string;
  marginBottom: string;
  marginLeft: string;
  width: string;
  height: string;
  maxWidth: string;
  minHeight: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  color: string;
  textAlign: string;
  backgroundColor: string;
  borderWidth: string;
  borderStyle: string;
  borderColor: string;
  borderRadius: string;
  display: string;
  gap: string;
  justifyContent: string;
  alignItems: string;
  flexDirection: string;
  opacity: string;
  boxShadow: string;
}>;

export type CSSProperty = keyof CSSDecl;

export type ResponsiveStyle = Partial<Record<Breakpoint, CSSDecl>>;

export function resolveAt(rs: ResponsiveStyle, bp: Breakpoint): CSSDecl {
  const idx = BREAKPOINTS.indexOf(bp);
  const merged: CSSDecl = {};
  for (let i = 0; i <= idx; i++) {
    Object.assign(merged, rs[BREAKPOINTS[i]] ?? {});
  }
  return merged;
}

/**
 * Returns the breakpoint that supplies the effective value for `prop` at `bp`.
 * Returns null if no breakpoint up to and including `bp` has set this prop.
 */
export function getInheritedSource(
  rs: ResponsiveStyle,
  bp: Breakpoint,
  prop: CSSProperty,
): Breakpoint | null {
  const idx = BREAKPOINTS.indexOf(bp);
  for (let i = idx; i >= 0; i--) {
    const decl = rs[BREAKPOINTS[i]];
    if (decl && decl[prop] !== undefined) return BREAKPOINTS[i];
  }
  return null;
}

const CAMEL_TO_KEBAB_RE = /[A-Z]/g;
function toKebab(prop: string): string {
  return prop.replace(CAMEL_TO_KEBAB_RE, (m) => `-${m.toLowerCase()}`);
}

function declToCss(decl: CSSDecl): string {
  const parts: string[] = [];
  for (const key of Object.keys(decl) as CSSProperty[]) {
    const v = decl[key];
    if (v === undefined || v === "") continue;
    parts.push(`${toKebab(key)}:${v}`);
  }
  return parts.join(";");
}

/**
 * Emits a scoped CSS block. The selector targets `[data-rs="<id>"]`.
 * Mobile-first: base goes outside any media query, sm+ go inside `(min-width: ...)`.
 */
export function generateCSS(rs: ResponsiveStyle, id: string): string {
  const parts: string[] = [];
  for (const bp of BREAKPOINTS) {
    const decl = rs[bp];
    if (!decl) continue;
    const css = declToCss(decl);
    if (!css) continue;
    if (bp === "base") {
      parts.push(`[data-rs="${id}"]{${css}}`);
    } else {
      const min = BREAKPOINT_MIN_WIDTH[bp];
      parts.push(`@media (min-width:${min}px){[data-rs="${id}"]{${css}}}`);
    }
  }
  return parts.join("");
}

export function setStyleValue(
  rs: ResponsiveStyle,
  bp: Breakpoint,
  prop: CSSProperty,
  value: string | undefined,
): ResponsiveStyle {
  const next = { ...rs };
  const decl = { ...(next[bp] ?? {}) };
  if (value === undefined || value === "") {
    delete decl[prop];
  } else {
    decl[prop] = value;
  }
  if (Object.keys(decl).length === 0) {
    delete next[bp];
  } else {
    next[bp] = decl;
  }
  return next;
}

/**
 * Pick the breakpoint key for a given canvas viewport width.
 * Mobile-first: returns the largest bp whose min-width <= width.
 */
export function viewportToBreakpoint(width: number): Breakpoint {
  let result: Breakpoint = "base";
  for (const bp of BREAKPOINTS) {
    if (width >= BREAKPOINT_MIN_WIDTH[bp]) result = bp;
  }
  return result;
}
