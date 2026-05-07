"use client";

import React from "react";
import { createUsePuck } from "@puckeditor/core";
import {
  BREAKPOINTS,
  BREAKPOINT_LABEL,
  BREAKPOINT_PREVIEW_WIDTH,
  type Breakpoint,
  viewportToBreakpoint,
} from "../../lib/responsive-style";

const ICONS: Record<Breakpoint, string> = {
  base: "📱",
  sm: "📱",
  md: "📲",
  lg: "💻",
  xl: "🖥️",
  "2xl": "🖥️",
};

const usePuck = createUsePuck();

export function useActiveBreakpoint(): [Breakpoint, (bp: Breakpoint) => void] {
  const currentWidth = usePuck(
    (s) => s.appState.ui.viewports.current.width,
  );
  const dispatch = usePuck((s) => s.dispatch);

  const bp: Breakpoint =
    typeof currentWidth === "number"
      ? viewportToBreakpoint(currentWidth)
      : "base";

  const setBp = React.useCallback(
    (next: Breakpoint) => {
      const width = BREAKPOINT_PREVIEW_WIDTH[next];
      dispatch({
        type: "setUi",
        ui: (prev) => ({
          viewports: {
            ...prev.viewports,
            current: {
              ...prev.viewports.current,
              width,
            },
          },
        }),
      });
    },
    [dispatch],
  );

  return [bp, setBp];
}

export function ViewportTabs({
  active,
  onChange,
}: {
  active: Breakpoint;
  onChange: (bp: Breakpoint) => void;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${BREAKPOINTS.length}, 1fr)`,
        gap: 2,
        background: "#f3f4f6",
        padding: 2,
        borderRadius: 6,
        marginBottom: 12,
      }}
    >
      {BREAKPOINTS.map((bp) => {
        const isActive = bp === active;
        return (
          <button
            key={bp}
            type="button"
            onClick={() => onChange(bp)}
            title={`${BREAKPOINT_LABEL[bp]} (${bp})`}
            style={{
              border: "none",
              background: isActive ? "#fff" : "transparent",
              color: isActive ? "#111827" : "#6b7280",
              padding: "6px 4px",
              borderRadius: 4,
              fontSize: 11,
              fontWeight: isActive ? 600 : 500,
              cursor: "pointer",
              boxShadow: isActive ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              lineHeight: 1,
            }}
          >
            <span style={{ fontSize: 13 }}>{ICONS[bp]}</span>
            <span>{bp}</span>
          </button>
        );
      })}
    </div>
  );
}
