"use client";

import React from "react";
import {
  type ResponsiveStyle,
  type CSSProperty,
  resolveAt,
  getInheritedSource,
  setStyleValue,
} from "../../lib/responsive-style";
import { SECTIONS, type PropertyControl } from "./sections";
import { useActiveBreakpoint, ViewportTabs } from "./viewport-tabs";
import {
  ColorControl,
  FieldRow,
  FourSidesControl,
  InheritanceMarker,
  SelectControl,
  TextControl,
} from "./controls";

export function StyleField({
  value,
  onChange,
}: {
  value: ResponsiveStyle;
  onChange: (next: ResponsiveStyle) => void;
}) {
  const [activeBp, setActiveBp] = useActiveBreakpoint();
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({
    spacing: true,
    sizing: false,
    typography: false,
    background: false,
    border: false,
    layout: false,
    effects: false,
  });

  const resolved = resolveAt(value, activeBp);
  const ownDecl = value[activeBp] ?? {};

  const setProp = (prop: CSSProperty, v: string | undefined) => {
    onChange(setStyleValue(value, activeBp, prop, v));
  };

  const renderControl = (control: PropertyControl) => {
    if (control.kind === "fourSides") {
      const props = control.props;
      const values = props.map((p) => ownDecl[p] ?? "") as [
        string,
        string,
        string,
        string,
      ];
      const resolvedValues = props.map((p) => resolved[p] ?? "") as [
        string,
        string,
        string,
        string,
      ];
      const sources = props.map((p) =>
        getInheritedSource(value, activeBp, p),
      );
      const inheritedFlags = sources.map(
        (s) => s !== null && s !== activeBp,
      ) as [boolean, boolean, boolean, boolean];

      // For the row marker, summarize: solid if any side is set on this bp,
      // hollow if any inherited, dashed if none.
      const anySetHere = sources.some((s) => s === activeBp);
      const anyInherited = sources.some((s) => s !== null && s !== activeBp);
      const summarySource: ReturnType<typeof getInheritedSource> = anySetHere
        ? activeBp
        : anyInherited
          ? sources.find((s) => s !== null && s !== activeBp) ?? null
          : null;

      const resetAll = () => {
        let next = value;
        for (const p of props) {
          if (sources[props.indexOf(p)] === activeBp) {
            next = setStyleValue(next, activeBp, p, undefined);
          }
        }
        onChange(next);
      };

      return (
        <FieldRow
          key={control.label}
          label={control.label}
          marker={
            <InheritanceMarker
              source={summarySource}
              current={activeBp}
              onReset={resetAll}
            />
          }
        >
          <FourSidesControl
            values={values}
            resolvedValues={resolvedValues}
            inheritedFlags={inheritedFlags}
            sideLabels={control.sideLabels}
            onChange={(idx, v) => setProp(props[idx], v || undefined)}
          />
        </FieldRow>
      );
    }

    const prop = control.prop;
    const ownValue = (ownDecl[prop] ?? "") as string;
    const resolvedValue = (resolved[prop] ?? "") as string;
    const source = getInheritedSource(value, activeBp, prop);
    const isInherited = source !== null && source !== activeBp;

    const marker = (
      <InheritanceMarker
        source={source}
        current={activeBp}
        onReset={() => setProp(prop, undefined)}
      />
    );

    if (control.kind === "color") {
      return (
        <FieldRow key={control.label} label={control.label} marker={marker}>
          <ColorControl
            value={ownValue}
            resolvedValue={resolvedValue}
            isInherited={isInherited}
            onChange={(v) => setProp(prop, v || undefined)}
          />
        </FieldRow>
      );
    }
    if (control.kind === "select") {
      return (
        <FieldRow key={control.label} label={control.label} marker={marker}>
          <SelectControl
            value={ownValue}
            resolvedValue={resolvedValue}
            isInherited={isInherited}
            options={control.options}
            onChange={(v) => setProp(prop, v || undefined)}
          />
        </FieldRow>
      );
    }
    return (
      <FieldRow key={control.label} label={control.label} marker={marker}>
        <TextControl
          value={ownValue}
          resolvedValue={resolvedValue}
          isInherited={isInherited}
          placeholder={
            "placeholder" in control ? control.placeholder : undefined
          }
          onChange={(v) => setProp(prop, v || undefined)}
        />
      </FieldRow>
    );
  };

  return (
    <div style={{ padding: "4px 0" }}>
      <ViewportTabs active={activeBp} onChange={setActiveBp} />
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {SECTIONS.map((section) => {
          const open = openSections[section.id] ?? false;
          return (
            <div
              key={section.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 6,
                overflow: "hidden",
              }}
            >
              <button
                type="button"
                onClick={() =>
                  setOpenSections((prev) => ({
                    ...prev,
                    [section.id]: !open,
                  }))
                }
                style={{
                  width: "100%",
                  border: "none",
                  background: "#fafafa",
                  padding: "8px 10px",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#374151",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "left",
                }}
              >
                <span>{section.label}</span>
                <span
                  style={{
                    fontSize: 10,
                    color: "#9ca3af",
                    transform: open ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.15s",
                  }}
                >
                  ▶
                </span>
              </button>
              {open ? (
                <div style={{ padding: "10px", background: "#fff" }}>
                  {section.controls.map(renderControl)}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
