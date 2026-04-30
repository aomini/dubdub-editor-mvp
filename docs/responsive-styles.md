# Responsive Styles for Puck

A breakpoint-aware structured styles panel for the Puck editor. Lets users set
CSS properties (padding, color, display, etc.) per breakpoint with mobile-first
inheritance, and applies them via scoped `<style>` blocks at runtime.

## Why this exists

Puck's built-in field types (`text`, `number`, `select`, etc.) don't have any
notion of viewport or breakpoint. Each field stores a single value. That's
incompatible with responsive design, where you typically want one set of values
on mobile, another on tablet, another on desktop.

This system layers a custom Puck field on top, stores a per-breakpoint object,
and emits real CSS with media queries at render time. Tailwind utility classes
weren't a fit because Tailwind only ships classes that exist statically in the
codebase — arbitrary user-entered values can't generate new classes at runtime.

## Quick mental model

```
                              ┌─────────────────────────────────────┐
  Puck right panel            │  StyleField (custom Puck field)     │
  for selected component  ──> │  ─ viewport tabs (sync w/ canvas)   │
                              │  ─ collapsible sections             │
                              │  ─ per-property control + marker    │
                              └────────────┬────────────────────────┘
                                           │ onChange
                                           ▼
                              ┌─────────────────────────────────────┐
  Component data              │  props.style: ResponsiveStyle       │
  (saved with the page)       │  { base: {...}, md: {...}, ... }    │
                              └────────────┬────────────────────────┘
                                           │ withStyleField wraps the
                                           │ component config; render
                                           │ receives style as a prop
                                           ▼
  Editor canvas /             ┌─────────────────────────────────────┐
  published page              │  <style>[data-rs="x"]{...}          │
                              │  @media(min-width:768px){...}</style│
                              │  <div data-rs="x">                  │
                              │    <OriginalComponent .../>         │
                              │  </div>                             │
                              └─────────────────────────────────────┘
```

## Files at a glance

| File | Role |
|---|---|
| [`lib/responsive-style.ts`](../lib/responsive-style.ts) | Types, breakpoint defs, mobile-first resolver, scoped CSS generator. Pure functions, no React. |
| [`lib/with-style-field.tsx`](../lib/with-style-field.tsx) | HOF that adds a `style` field to any Puck `ComponentConfig` and wraps its render output in a `<style>` block + `<div data-rs>` wrapper. |
| [`components/style-field/sections.ts`](../components/style-field/sections.ts) | Declarative list of property sections (Spacing, Sizing, Typography, …) and the controls that belong in each. |
| [`components/style-field/viewport-tabs.tsx`](../components/style-field/viewport-tabs.tsx) | Tab strip at the top of the panel. `useActiveBreakpoint()` reads/writes Puck's canvas viewport via `usePuck()` so the tab and the canvas stay in sync (hybrid mode). |
| [`components/style-field/controls.tsx`](../components/style-field/controls.tsx) | Reusable input widgets (`TextControl`, `SelectControl`, `ColorControl`, `FourSidesControl`) and the `InheritanceMarker` dot. |
| [`components/style-field/style-field.tsx`](../components/style-field/style-field.tsx) | Top-level field component. Composes tabs + sections + controls and wires `onChange` back to Puck. |
| [`puck.config.tsx`](../puck.config.tsx) | Wraps every component in `rawConfig.components` via `withStyleField`. Extends the Props type with `StyledProps` mapped type. |
| [`app/puck/[...puckPath]/client.tsx`](../app/puck/%5B...puckPath%5D/client.tsx) | Registers Puck `viewports` aligned to the breakpoint widths so the canvas viewport switcher and the panel tabs share the same set. |

## Breakpoints

Defined in [`lib/responsive-style.ts`](../lib/responsive-style.ts):

```ts
export const BREAKPOINTS = ["base", "sm", "md", "lg", "xl", "2xl"] as const;

export const BREAKPOINT_MIN_WIDTH = {
  base: 0, sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536,
};
```

These mirror Tailwind's defaults. `base` is the implicit "no media query" tier
that styles everything from 0px up; the others kick in at their `min-width`.

`BREAKPOINT_PREVIEW_WIDTH` is what the canvas resizes to when you click a tab —
mostly the same as `min-width`, with `base` set to 375px so the canvas shows a
realistic phone width rather than collapsing to 0.

## Data shape

Each component now has an optional `style` prop typed as `ResponsiveStyle`:

```ts
type CSSDecl = Partial<{ paddingTop: string; color: string; display: string; ... }>;
type ResponsiveStyle = Partial<Record<Breakpoint, CSSDecl>>;
```

Concrete example stored on a component:

```ts
{
  base: { paddingTop: "16px", paddingBottom: "16px", color: "#111" },
  md:   { paddingTop: "32px" },             // wider top padding from tablet up
  lg:   { color: "#000", display: "flex" }, // tweak from laptop up
}
```

Keys that aren't present at a breakpoint are inherited from the next-smaller
breakpoint that does have them — that's the **mobile-first** part.

## Mobile-first inheritance

Implemented in `resolveAt(rs, bp)`:

```ts
// lib/responsive-style.ts
export function resolveAt(rs: ResponsiveStyle, bp: Breakpoint): CSSDecl {
  const idx = BREAKPOINTS.indexOf(bp);
  const merged: CSSDecl = {};
  for (let i = 0; i <= idx; i++) {
    Object.assign(merged, rs[BREAKPOINTS[i]] ?? {});
  }
  return merged;
}
```

Walk breakpoints in order from `base` up to and including the requested `bp`,
shallow-merging at each step. Later (larger) breakpoints overwrite earlier
ones. So `resolveAt(data, "lg")` for the example above returns:

```ts
{ paddingTop: "32px", paddingBottom: "16px", color: "#000", display: "flex" }
```

`getInheritedSource(rs, bp, prop)` answers the related question — "which
breakpoint actually supplies the value of `prop` at `bp`?" — by scanning
backwards from `bp` until it finds a breakpoint that defines that property.
This is what powers the inheritance marker UI.

## Runtime: scoped `<style>` blocks

Inline `style={{...}}` can't express media queries, so we generate a real CSS
rule per component instance, scoped by a `data-rs` attribute.

`generateCSS(rs, id)` in [`lib/responsive-style.ts`](../lib/responsive-style.ts)
emits something like:

```css
[data-rs="abc123"]{padding-top:16px;color:#111}
@media (min-width:768px){[data-rs="abc123"]{padding-top:32px}}
@media (min-width:1024px){[data-rs="abc123"]{color:#000;display:flex}}
```

Notice the mobile-first style: the `base` rule has no media query, so it
applies everywhere; larger breakpoints layer on top via cascade.

The wrapping happens in
[`lib/with-style-field.tsx`](../lib/with-style-field.tsx):

```tsx
function StyledOutput({ rs, children }) {
  const reactId = React.useId();
  const id = reactId.replace(/:/g, "");
  const css = rs ? generateCSS(rs, id) : "";

  return (
    <>
      {css ? <style dangerouslySetInnerHTML={{ __html: css }} /> : null}
      <div data-rs={id}>{children}</div>
    </>
  );
}
```

A few things to note:

- **`React.useId()`** gives a stable ID per mounted component, SSR-safe in
  React 18+. We strip the colons because they're invalid in CSS attribute
  selector values.
- **Always wrap in `<div data-rs={id}>`**. We tried using `cloneElement` to
  inject `data-rs` onto the original component's root, but most of our
  components (e.g. `SpotlightCard`) are function components that don't forward
  unknown props to their DOM root, so the attribute never reached the HTML.
  An always-on wrapper is predictable; the trade-off is one extra DOM node per
  component, which is acceptable for a builder.
- **The `<style>` block is co-located with the wrapper**, not hoisted to
  `<head>`. That keeps server-rendering simple and means each component's CSS
  travels with it.

## The HOF: `withStyleField`

```tsx
// lib/with-style-field.tsx
export function withStyleField(config: any): any {
  const originalRender = config.render;
  return {
    ...config,
    fields: {
      ...config.fields,
      style: {
        type: "custom",
        render: ({ value, onChange }) => (
          <StyleField value={value ?? {}} onChange={onChange} />
        ),
      },
    },
    defaultProps: { ...config.defaultProps, style: {} },
    render: (props) => {
      const { style: rs, ...rest } = props;
      return <StyledOutput rs={rs}>{originalRender(rest)}</StyledOutput>;
    },
  };
}
```

It's three things in one:

1. Adds a Puck field of `type: "custom"` named `style`. Puck's custom field API
   gives us `value`/`onChange`, which we hand to the `StyleField` component.
2. Adds a sensible default of `{}` so new instances don't read undefined.
3. Replaces the render function so every render goes through `StyledOutput` and
   ends up wrapped with the `<style>` + `<div data-rs>`.

It's intentionally typed as `any` in/out. The original `ComponentConfig<P>`
generic uses a constrained `ComponentConfigParams<P>` shape that doesn't play
nicely with generic transformation, and the type story is restored at the
config level via the `StyledProps` mapped type (see below).

## Wiring it into `puck.config.tsx`

The original config object stays untouched. At the bottom of the file:

```ts
// puck.config.tsx
const rawConfig: Config<Props, RootProps, ...> = { /* unchanged */ };

type StyledProps = { [K in keyof Props]: Props[K] & { style?: ResponsiveStyle } };

const styledComponents = Object.fromEntries(
  Object.entries(rawConfig.components).map(([name, c]) => [
    name,
    withStyleField(c as ComponentConfig<any>),
  ]),
) as Config<StyledProps, RootProps, ...>["components"];

export const config: Config<StyledProps, RootProps, ...> = {
  ...rawConfig,
  components: styledComponents,
};
```

The `StyledProps` mapped type intersects every component's existing props with
`{ style?: ResponsiveStyle }`, so the exported config remains type-safe.

## Editor UI: the StyleField

[`components/style-field/style-field.tsx`](../components/style-field/style-field.tsx)
composes everything:

1. **Viewport tabs** at the top. Clicking a tab dispatches a `setUi` action via
   `usePuck()` to resize the canvas. Resizing the canvas (via Puck's built-in
   viewport switcher in the toolbar) updates which tab reads as active. This
   is the **hybrid sync** approach — both surfaces drive the same state.

2. **Sections** declared in [`sections.ts`](../components/style-field/sections.ts):
   Spacing, Sizing, Typography, Background, Border, Layout, Effects. Each
   section is a collapsible card. Adding new properties is done declaratively
   here — no UI code changes.

3. **Per-property controls** rendered from `controls.tsx`. The five kinds:
   - `text`  — free-form value input (e.g. `16px`, `1.5rem`, `auto`)
   - `color` — native color picker + hex input
   - `select` — dropdown with predefined options
   - `number` — same as text but with a unit hint (currently unused, reserved)
   - `fourSides` — four inputs in a row for T/R/B/L (padding, margin)

4. **Inheritance marker** next to each property's label. Three states:
   - 🔵 Solid blue dot — set on the active breakpoint. Click it to reset and
     drop back to inherited.
   - ⚪️ Hollow gray dot — inherited from a smaller breakpoint. Hover for the
     source bp.
   - ⊝ Dashed empty circle — not set anywhere up to and including this bp.

   Computed via `getInheritedSource(value, activeBp, prop)` from
   `responsive-style.ts`. The marker visually communicates "are you about to
   override something, or is this property genuinely empty?"

## Hybrid viewport sync

In [`viewport-tabs.tsx`](../components/style-field/viewport-tabs.tsx):

```tsx
export function useActiveBreakpoint(): [Breakpoint, (bp: Breakpoint) => void] {
  const { appState, dispatch } = usePuck();
  const currentWidth = appState.ui.viewports.current.width;

  const bp = typeof currentWidth === "number"
    ? viewportToBreakpoint(currentWidth)
    : "base";

  const setBp = (next: Breakpoint) => {
    dispatch({
      type: "setUi",
      ui: (prev) => ({
        viewports: { ...prev.viewports, current: { ...prev.viewports.current, width: BREAKPOINT_PREVIEW_WIDTH[next] } },
      }),
    });
  };

  return [bp, setBp];
}
```

`viewportToBreakpoint(width)` returns the largest breakpoint whose `min-width`
fits — the same rule a real browser applies. So the tab the user is editing is
always the breakpoint a real visitor at that width would see.

The Puck side is configured in
[`app/puck/[...puckPath]/client.tsx`](../app/puck/%5B...puckPath%5D/client.tsx),
which feeds Puck a `viewports` array built from the same constants:

```tsx
const viewports = BREAKPOINTS.map((bp) => ({
  width: BREAKPOINT_PREVIEW_WIDTH[bp],
  height: "auto",
  label: `${BREAKPOINT_LABEL[bp]} (${bp})`,
  icon: bp === "base" || bp === "sm" ? "Smartphone"
      : bp === "md" ? "Tablet" : "Monitor",
}));
```

Same constants, two consumers — no drift.

## End-to-end: editing a value

Walking through what happens when a user types `32px` into the padding-top
input on the `md` tab:

1. `TextControl` calls `onChange("32px")` →
2. `StyleField` calls `setProp("paddingTop", "32px")` →
3. That runs `setStyleValue(value, "md", "paddingTop", "32px")` from
   `responsive-style.ts`, which returns a new `ResponsiveStyle` with the value
   merged in (or removed if `undefined`/`""`) →
4. The result is passed to Puck via the field's `onChange`, updating
   component data →
5. Component re-renders. `withStyleField` extracts `style` from props, runs
   `generateCSS(rs, id)`, and emits an updated `<style>` block →
6. The new CSS rule cascades onto the component instance via `[data-rs="..."]`
   and the user sees the change in the canvas (and on the published page).

Resetting (clicking the blue dot) follows the same path with `value=undefined`.
`setStyleValue` removes the key, and if the breakpoint becomes empty, removes
the breakpoint key too — keeping the saved data tidy.

## Extending the system

### Add a new CSS property

1. Add the camelCase key to `CSSDecl` in
   [`lib/responsive-style.ts`](../lib/responsive-style.ts).
2. Add a control entry to the appropriate section in
   [`components/style-field/sections.ts`](../components/style-field/sections.ts).

That's it. No changes elsewhere — sections drive the UI, the resolver and CSS
generator iterate over whatever keys are present.

### Add a new breakpoint

1. Append to the `BREAKPOINTS` tuple and the three lookup maps in
   `responsive-style.ts`.
2. (Optional) add a tab icon in `ICONS` inside `viewport-tabs.tsx`.
3. Existing data keeps working — older instances just don't have entries for
   the new bp, which means they inherit from a smaller bp at runtime.

### Skip the field on a specific component

Currently the wrap is unconditional in `puck.config.tsx`. To opt out:

```ts
const SKIP = new Set(["Link", "Span"]); // names of inline components

const styledComponents = Object.fromEntries(
  Object.entries(rawConfig.components).map(([name, c]) => [
    name,
    SKIP.has(name) ? c : withStyleField(c),
  ]),
);
```

Inline components (`Link`, `Span`) are good candidates because the wrapper div
breaks their inline-ness.

## Known limitations

- **Wrapper div changes the DOM.** Every styled component now lives inside
  `<div data-rs="...">`. For most layout/box use cases this is fine and is in
  fact the styled element. For inline components or components whose parent
  expects a specific child element type, this can shift behavior.
- **Per-instance `<style>` block.** Each component instance emits its own
  `<style>` tag. There's no de-duplication. For a typical page this is
  negligible; if a page grows to hundreds of styled components this is worth
  revisiting (one shared stylesheet keyed by id would do it).
- **`!important` not supported.** Values are passed through verbatim. Add
  yourself if needed (most of the time you don't).
- **No theme tokens / variables.** Every value is a literal CSS string. A
  follow-up could let users pick from a theme palette / spacing scale.
- **`base` styles cannot be reduced at larger breakpoints in CSS terms.**
  Mobile-first means once a property is set at `base`, removing it at `md`
  doesn't unset it — it just means `md` doesn't *override* it. To "remove" a
  property at a larger breakpoint, set it explicitly to a different value
  (e.g. `display: block` at `md` to undo `display: flex` at `base`). This is
  by design and matches how CSS itself works.
