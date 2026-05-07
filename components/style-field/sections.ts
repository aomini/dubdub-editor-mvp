import type { CSSProperty } from "../../lib/responsive-style";

export type ControlKind =
  | "text"
  | "color"
  | "select"
  | "number"
  | "fourSides";

export type SelectOption = { label: string; value: string };

export type PropertyControl =
  | { kind: "text"; prop: CSSProperty; label: string; placeholder?: string }
  | { kind: "color"; prop: CSSProperty; label: string }
  | { kind: "number"; prop: CSSProperty; label: string; unit?: string; min?: number; max?: number; step?: number; placeholder?: string }
  | { kind: "select"; prop: CSSProperty; label: string; options: SelectOption[] }
  | {
      kind: "fourSides";
      label: string;
      props: [CSSProperty, CSSProperty, CSSProperty, CSSProperty];
      sideLabels?: [string, string, string, string];
    };

export type Section = {
  id: string;
  label: string;
  controls: PropertyControl[];
};

export const SECTIONS: Section[] = [
  {
    id: "spacing",
    label: "Spacing",
    controls: [
      {
        kind: "fourSides",
        label: "Padding",
        props: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
      },
      {
        kind: "fourSides",
        label: "Margin",
        props: ["marginTop", "marginRight", "marginBottom", "marginLeft"],
      },
    ],
  },
  {
    id: "sizing",
    label: "Sizing",
    controls: [
      { kind: "text", prop: "width", label: "Width", placeholder: "auto" },
      { kind: "text", prop: "height", label: "Height", placeholder: "auto" },
      { kind: "text", prop: "maxWidth", label: "Max Width", placeholder: "none" },
      { kind: "text", prop: "minHeight", label: "Min Height", placeholder: "0" },
    ],
  },
  {
    id: "typography",
    label: "Typography",
    controls: [
      { kind: "text", prop: "fontSize", label: "Font Size", placeholder: "16px" },
      {
        kind: "select",
        prop: "fontWeight",
        label: "Font Weight",
        options: [
          { label: "Inherit", value: "" },
          { label: "100 Thin", value: "100" },
          { label: "200 Extra Light", value: "200" },
          { label: "300 Light", value: "300" },
          { label: "400 Normal", value: "400" },
          { label: "500 Medium", value: "500" },
          { label: "600 Semi Bold", value: "600" },
          { label: "700 Bold", value: "700" },
          { label: "800 Extra Bold", value: "800" },
          { label: "900 Black", value: "900" },
        ],
      },
      { kind: "text", prop: "lineHeight", label: "Line Height", placeholder: "1.5" },
      { kind: "color", prop: "color", label: "Color" },
      {
        kind: "select",
        prop: "textAlign",
        label: "Text Align",
        options: [
          { label: "Inherit", value: "" },
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
          { label: "Right", value: "right" },
          { label: "Justify", value: "justify" },
        ],
      },
    ],
  },
  {
    id: "background",
    label: "Background",
    controls: [
      { kind: "color", prop: "backgroundColor", label: "Background Color" },
    ],
  },
  {
    id: "border",
    label: "Border",
    controls: [
      { kind: "text", prop: "borderWidth", label: "Border Width", placeholder: "0" },
      {
        kind: "select",
        prop: "borderStyle",
        label: "Border Style",
        options: [
          { label: "Inherit", value: "" },
          { label: "None", value: "none" },
          { label: "Solid", value: "solid" },
          { label: "Dashed", value: "dashed" },
          { label: "Dotted", value: "dotted" },
          { label: "Double", value: "double" },
        ],
      },
      { kind: "color", prop: "borderColor", label: "Border Color" },
      { kind: "text", prop: "borderRadius", label: "Border Radius", placeholder: "0" },
    ],
  },
  {
    id: "layout",
    label: "Layout",
    controls: [
      {
        kind: "select",
        prop: "display",
        label: "Display",
        options: [
          { label: "Inherit", value: "" },
          { label: "Block", value: "block" },
          { label: "Inline Block", value: "inline-block" },
          { label: "Inline", value: "inline" },
          { label: "Flex", value: "flex" },
          { label: "Inline Flex", value: "inline-flex" },
          { label: "Grid", value: "grid" },
          { label: "None", value: "none" },
        ],
      },
      {
        kind: "select",
        prop: "flexDirection",
        label: "Direction",
        options: [
          { label: "Inherit", value: "" },
          { label: "Row", value: "row" },
          { label: "Row Reverse", value: "row-reverse" },
          { label: "Column", value: "column" },
          { label: "Column Reverse", value: "column-reverse" },
        ],
      },
      {
        kind: "select",
        prop: "justifyContent",
        label: "Justify",
        options: [
          { label: "Inherit", value: "" },
          { label: "Start", value: "flex-start" },
          { label: "Center", value: "center" },
          { label: "End", value: "flex-end" },
          { label: "Space Between", value: "space-between" },
          { label: "Space Around", value: "space-around" },
          { label: "Space Evenly", value: "space-evenly" },
        ],
      },
      {
        kind: "select",
        prop: "alignItems",
        label: "Align",
        options: [
          { label: "Inherit", value: "" },
          { label: "Start", value: "flex-start" },
          { label: "Center", value: "center" },
          { label: "End", value: "flex-end" },
          { label: "Stretch", value: "stretch" },
          { label: "Baseline", value: "baseline" },
        ],
      },
      { kind: "text", prop: "gap", label: "Gap", placeholder: "0" },
    ],
  },
  {
    id: "effects",
    label: "Effects",
    controls: [
      { kind: "text", prop: "opacity", label: "Opacity", placeholder: "1" },
      { kind: "text", prop: "boxShadow", label: "Box Shadow", placeholder: "none" },
    ],
  },
];
