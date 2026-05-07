# Packaging & Extending the Responsive Styles System

A companion to [`responsive-styles.md`](./responsive-styles.md). The first doc
explains _what was built_ inside this repo. This one explains:

1. How to extract it into a reusable Puck plugin (or npm package).
2. How to extend it — new properties, new breakpoints, new controls, custom
   behavior — without forking.

If you only want to use the system as-is, you don't need this doc.

## Is this a "Puck Plugin"?

Puck has a built-in `Plugin` type
([`@puckeditor/core`](../node_modules/@puckeditor/core/dist/actions-C3e2nJ9v.d.ts)):

```ts
type Plugin = {
  name?: string;
  label?: string;
  icon?: ReactNode;
  render?: () => ReactElement;
  overrides?: Partial<Overrides>;
  fieldTransforms?: FieldTransforms;
};
```

Plugins can add UI panels (`render`), override editor chrome (`overrides`), and
transform field values at render time (`fieldTransforms`). What they **can't**
do is mutate the component config — adding fields to every component, or
wrapping every render. So this system is structured as **two pieces**:

| Piece | Type | Purpose |
|---|---|---|
| `withStyleField(componentConfig)` | Config transformer (HOF) | Adds the `style` field + `<style>`/`<div data-rs>` wrapper to a component config. **Applied at config build time.** |
| `responsiveStylesPlugin` | Puck `Plugin` (optional) | Adds editor-side niceties — currently we don't ship one, but extension points are listed below. |

Most "plugins" in the wider Puck ecosystem are actually a mix of these two
shapes packaged together. That's the recipe we follow below.

## The minimal package surface

If you were to publish this as `@yourname/puck-responsive-styles`, the public
API would be:

```ts
// Core transformer — wraps every component in a config
export function withResponsiveStyles<C extends Config>(
  config: C,
  options?: ResponsiveStylesOptions,
): C;

// Viewports aligned to the breakpoints — feed to <Puck viewports={...} />
export const responsiveViewports: Viewports;

// Constants you might want to read
export {
  BREAKPOINTS,
  BREAKPOINT_MIN_WIDTH,
  BREAKPOINT_PREVIEW_WIDTH,
  type Breakpoint,
  type ResponsiveStyle,
  type CSSDecl,
};

// Optional: a Puck Plugin object for editor-side concerns
export const responsiveStylesPlugin: Plugin;
```

A consuming project would use it as:

```tsx
import { Puck } from "@puckeditor/core";
import {
  withResponsiveStyles,
  responsiveViewports,
} from "@yourname/puck-responsive-styles";

import { config } from "./puck.config";

const styledConfig = withResponsiveStyles(config);

export function Editor({ data }: { data: Data }) {
  return <Puck config={styledConfig} data={data} viewports={responsiveViewports} />;
}
```

That's the whole integration. No per-component changes, no manual field
wiring.

## What changes from the in-repo version

The current code is wired to this repo's structure: `withStyleField` operates
on one component, and `puck.config.tsx` calls it on every component manually.
For a package you'd combine both into a single function:

```ts
// src/with-responsive-styles.ts (in the package)
export function withResponsiveStyles<C extends Config>(
  config: C,
  options: ResponsiveStylesOptions = {},
): C {
  const { skip = [] } = options;
  const skipSet = new Set(skip);

  const wrapped = Object.fromEntries(
    Object.entries(config.components).map(([name, c]) => [
      name,
      skipSet.has(name) ? c : withStyleField(c, options),
    ]),
  );

  return { ...config, components: wrapped } as C;
}
```

The `skip` option lets consumers opt specific components out (e.g. inline
components). Other useful options are listed in the
[Configuration options](#configuration-options) section below.

## File-by-file: what to lift into the package

If you copy this system into a package repo, take these files:

| Source file | Goes in package as |
|---|---|
| [`lib/responsive-style.ts`](../lib/responsive-style.ts) | `src/responsive-style.ts` (pure, no React, ship as-is) |
| [`lib/with-style-field.tsx`](../lib/with-style-field.tsx) | `src/with-style-field.tsx` (rename internal wrap helper if needed) |
| [`components/style-field/*`](../components/style-field/) | `src/style-field/*` (the whole folder) |

Then add a thin `src/index.ts` that re-exports the public surface listed
above, plus a new `with-responsive-styles.ts` that loops over `components` and
calls `withStyleField`.

`package.json` peer dependencies:

```json
{
  "peerDependencies": {
    "@puckeditor/core": "^0.21.0",
    "react": "^18 || ^19",
    "react-dom": "^18 || ^19"
  }
}
```

No bundler-specific entries are required — the code is plain TSX. If you ship
ESM-only, `"type": "module"` and a `tsup`/`tsc` build step is enough.

## Configuration options

A real package would expose options on `withResponsiveStyles`. The most
useful ones to support:

```ts
type ResponsiveStylesOptions = {
  /** Component names to leave untouched (no style field added). */
  skip?: string[];

  /** Override the default breakpoint set. Mobile-first: must be ordered
   *  ascending by min-width and start at 0. */
  breakpoints?: Array<{ id: string; minWidth: number; label?: string; previewWidth?: number }>;

  /** Override or add to the property sections shown in the panel. */
  sections?: Section[];

  /** Tag name used for the wrapper element. Defaults to "div". */
  wrapperTag?: keyof JSX.IntrinsicElements;

  /** Disable the inline <style> tag and provide your own renderer instead.
   *  Useful if you want to hoist styles to <head> or a CSS-in-JS provider. */
  renderStyles?: (id: string, css: string) => ReactNode;
};
```

The current code is hard-coded to the Tailwind breakpoint set, the built-in
sections, and a `<div>` wrapper with an inline `<style>` block. Each of these
is a candidate for an option once you start using it across more than one
project.

## Extending without forking

These are extension points the in-repo version already supports. You don't
need to package the system to use them.

### Add a CSS property

1. Add the camelCase key to `CSSDecl` in
   [`lib/responsive-style.ts`](../lib/responsive-style.ts).
2. Add a control entry to the appropriate section in
   [`components/style-field/sections.ts`](../components/style-field/sections.ts).

```ts
// 1) in CSSDecl
export type CSSDecl = Partial<{
  // ...existing keys...
  letterSpacing: string;
}>;

// 2) in SECTIONS → typography
{ kind: "text", prop: "letterSpacing", label: "Letter Spacing", placeholder: "normal" },
```

The resolver and CSS generator iterate over whatever keys are present, so no
other code needs to change.

### Add a section

Append to the `SECTIONS` array in `sections.ts`. Each section has an `id`,
`label`, and `controls`. The accordion UI in `style-field.tsx` renders them
in the order you list.

```ts
{
  id: "transform",
  label: "Transform",
  controls: [
    { kind: "text", prop: "transform", label: "Transform", placeholder: "none" },
  ],
},
```

### Build a custom control widget

The current control kinds are `text`, `color`, `select`, `number`,
`fourSides`. To add a new kind (say a unit slider for spacing):

1. Add the kind to the `PropertyControl` discriminated union in `sections.ts`.
2. Implement the widget in `controls.tsx`. Follow the props pattern of the
   existing controls — `value`, `resolvedValue`, `isInherited`, `onChange`.
3. Add a render branch in `style-field.tsx` that maps the new kind to your
   widget.

The contract is small: your widget receives the value at the active
breakpoint (`value`), the value that *would* apply if you reset (`resolvedValue`),
a flag for whether the resolved value is inherited from a smaller bp
(`isInherited`), and a setter that takes a string (or `undefined` to unset).

### Change inheritance behavior

Mobile-first inheritance lives in two places:

- `resolveAt(rs, bp)` — merges base→...→bp at render time.
- `getInheritedSource(rs, bp, prop)` — drives the inheritance markers in the UI.

If you want desktop-first instead, both functions reverse direction. The CSS
generator (`generateCSS`) would also need to switch from `min-width` media
queries to `max-width`.

You'd be far better off doing this with an option than a fork. If you fork,
you'll likely want to expose a `direction: "mobile-first" | "desktop-first"`
flag on the package and branch inside both functions.

### Customize panel chrome with overrides

Puck plugins can override editor chrome via the `overrides` field. The
`Overrides` keys you'd care about for a styles panel:

```ts
const responsiveStylesPlugin: Plugin = {
  name: "responsive-styles",
  overrides: {
    fieldLabel: ({ children, label, el }) => {
      // wrap the field label, e.g. add a hint icon next to "style"
      return (
        <FieldLabel label={label} el={el}>
          {label === "style" ? <span>📐 {children}</span> : children}
        </FieldLabel>
      );
    },
    // fieldTypes: { custom: ... } — replace the generic custom-field shell
  },
};
```

You don't need this for the core feature to work — the custom field renders
itself however it wants. Use overrides only if you want to influence Puck's
chrome around the field.

## Sharing breakpoints with Tailwind (or any other system)

The breakpoint set in
[`lib/responsive-style.ts`](../lib/responsive-style.ts) intentionally matches
Tailwind defaults. If your project uses different breakpoints, change them in
one place and `viewportToBreakpoint`, `generateCSS`, and the viewport tabs all
follow:

```ts
export const BREAKPOINTS = ["mobile", "tablet", "desktop"] as const;

export const BREAKPOINT_MIN_WIDTH = {
  mobile: 0,
  tablet: 720,
  desktop: 1200,
};
```

If you also use Tailwind, consider importing the breakpoints from your
`tailwind.config` so they can't drift:

```ts
// tailwind.config.ts
export const screens = { sm: "640px", md: "768px", lg: "1024px" };

// lib/responsive-style.ts
import { screens } from "../tailwind.config";
export const BREAKPOINT_MIN_WIDTH = {
  base: 0,
  sm: parseInt(screens.sm),
  md: parseInt(screens.md),
  lg: parseInt(screens.lg),
};
```

One source of truth — your CSS classes and your responsive style data agree
on what "md" means.

## Server-rendering and the published page

The system works in SSR out of the box because:

- `React.useId()` produces stable IDs across server and client renders.
- The `<style>` tag is rendered alongside the component, not portal'd into
  `<head>`. Whatever Puck's `Render` component does, the style tag goes with
  it.

If you instead want all styles hoisted to `<head>` for performance, swap the
inline `<style>` for a CSS-in-JS provider (Emotion, vanilla-extract, etc.) by
implementing the `renderStyles` option suggested above. The hard part — the
mobile-first CSS string itself — is already produced by `generateCSS` and is
just text you can hand to any CSS engine.

## Migration for existing pages

The `style` prop is **optional** on every component. Existing data without it
keeps rendering exactly as before — `withStyleField` only emits a `<style>`
tag when there's something to emit, and the wrapper `<div data-rs>` has no
default styles.

If you want to remove the wrapper from pages where no styling is set, you can
short-circuit in `StyledOutput`:

```tsx
if (!css) {
  // no styles defined — skip the wrapper to keep the original DOM intact
  return <>{children}</>;
}
```

This trades predictability ("every component is wrapped") for cleaner DOM on
unstyled components. The current default chooses predictability so behavior
doesn't change the moment a user adds their first style.

## TL;DR

- The system is two pieces: a config transformer (`withStyleField` /
  `withResponsiveStyles`) and an optional Puck `Plugin` for editor chrome.
- To use it elsewhere, copy the four locations listed above, add a thin
  `withResponsiveStyles(config, options)` wrapper, and consume as
  `<Puck config={withResponsiveStyles(config)} viewports={responsiveViewports} />`.
- To extend it without forking: add CSS keys to `CSSDecl`, add controls to
  `SECTIONS`, or add new control kinds in `controls.tsx`. The resolver, CSS
  generator, and UI all derive from those data sources — no plumbing changes.
- For deeper customization (different breakpoint set, different inheritance
  direction, hoisted styles), promote the change to a package option and
  branch inside the two pure functions in `responsive-style.ts`.
