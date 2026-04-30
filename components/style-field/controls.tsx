"use client";

import React from "react";
import type { Breakpoint } from "../../lib/responsive-style";
import type { SelectOption } from "./sections";

const inputBaseStyle: React.CSSProperties = {
  width: "100%",
  padding: "5px 8px",
  border: "1px solid #e5e7eb",
  borderRadius: 4,
  fontSize: 12,
  outline: "none",
  background: "#fff",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

function inputStyle(isInherited: boolean): React.CSSProperties {
  return {
    ...inputBaseStyle,
    color: isInherited ? "#9ca3af" : "#111827",
    fontStyle: isInherited ? "italic" : "normal",
  };
}

export function InheritanceMarker({
  source,
  current,
  onReset,
}: {
  source: Breakpoint | null;
  current: Breakpoint;
  onReset: () => void;
}) {
  if (source === null) {
    return (
      <span
        title="Not set"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          border: "1px dashed #d1d5db",
          display: "inline-block",
          flexShrink: 0,
        }}
      />
    );
  }
  if (source === current) {
    return (
      <button
        type="button"
        onClick={onReset}
        title={`Set on ${current} — click to reset to inherited`}
        style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          border: "none",
          background: "#3b82f6",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 9,
          lineHeight: 1,
          padding: 0,
          flexShrink: 0,
        }}
      >
        ●
      </button>
    );
  }
  return (
    <span
      title={`Inherited from ${source}`}
      style={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: "#e5e7eb",
        border: "1px solid #d1d5db",
        display: "inline-block",
        flexShrink: 0,
      }}
    />
  );
}

export function FieldRow({
  label,
  marker,
  children,
}: {
  label: string;
  marker: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.4fr",
        gap: 8,
        alignItems: "center",
        marginBottom: 6,
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: "#374151",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        {marker}
        <span>{label}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}

export function TextControl({
  value,
  resolvedValue,
  isInherited,
  placeholder,
  onChange,
}: {
  value: string;
  resolvedValue: string;
  isInherited: boolean;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      type="text"
      value={value}
      placeholder={isInherited ? resolvedValue || placeholder : placeholder}
      onChange={(e) => onChange(e.target.value)}
      style={inputStyle(isInherited && value === "")}
    />
  );
}

export function SelectControl({
  value,
  resolvedValue,
  isInherited,
  options,
  onChange,
}: {
  value: string;
  resolvedValue: string;
  isInherited: boolean;
  options: SelectOption[];
  onChange: (value: string) => void;
}) {
  const showInheritedAsPlaceholder = isInherited && value === "";
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        ...inputStyle(showInheritedAsPlaceholder),
        appearance: "auto",
      }}
    >
      {showInheritedAsPlaceholder ? (
        <option value="">{`(inherited: ${resolvedValue})`}</option>
      ) : null}
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function ColorControl({
  value,
  resolvedValue,
  isInherited,
  onChange,
}: {
  value: string;
  resolvedValue: string;
  isInherited: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      <input
        type="color"
        value={value || resolvedValue || "#000000"}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: 28,
          height: 24,
          border: "1px solid #e5e7eb",
          borderRadius: 4,
          padding: 0,
          background: "transparent",
          cursor: "pointer",
          flexShrink: 0,
        }}
      />
      <input
        type="text"
        value={value}
        placeholder={isInherited ? resolvedValue : "#000000"}
        onChange={(e) => onChange(e.target.value)}
        style={inputStyle(isInherited && value === "")}
      />
    </div>
  );
}

export function FourSidesControl({
  values,
  resolvedValues,
  inheritedFlags,
  sideLabels = ["T", "R", "B", "L"],
  onChange,
}: {
  values: [string, string, string, string];
  resolvedValues: [string, string, string, string];
  inheritedFlags: [boolean, boolean, boolean, boolean];
  sideLabels?: [string, string, string, string];
  onChange: (index: 0 | 1 | 2 | 3, value: string) => void;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: 4,
      }}
    >
      {sideLabels.map((sideLabel, i) => {
        const idx = i as 0 | 1 | 2 | 3;
        const showInherited = inheritedFlags[idx] && values[idx] === "";
        return (
          <div key={sideLabel} style={{ position: "relative" }}>
            <input
              type="text"
              value={values[idx]}
              placeholder={
                showInherited ? resolvedValues[idx] || sideLabel : sideLabel
              }
              onChange={(e) => onChange(idx, e.target.value)}
              style={{
                ...inputStyle(showInherited),
                paddingRight: 18,
                fontSize: 11,
                textAlign: "center",
              }}
              title={sideLabel}
            />
            <span
              style={{
                position: "absolute",
                right: 4,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 9,
                color: "#9ca3af",
                pointerEvents: "none",
              }}
            >
              {sideLabel}
            </span>
          </div>
        );
      })}
    </div>
  );
}
