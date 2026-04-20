"use client";

import React from "react";
import type { Data, Plugin } from "@puckeditor/core";
import { Drawer, Puck } from "@puckeditor/core";
import {
  AlignLeft,
  Box,
  Columns,
  Columns3,
  FileText,
  FormInput,
  Grid,
  Grid2x2,
  Heading,
  Image,
  LayoutGrid,
  LayoutTemplate,
  Link2,
  Menu,
  MousePointer2,
  MoveVertical,
  Palette,
  Type,
} from "lucide-react";
import config from "../../../puck.config";

const componentIcons: Record<string, React.ReactNode> = {
  Input: <FormInput size={18} />,
  Img: <Image size={18} />,
  Link: <Link2 size={18} />,
  Heading: <Heading size={18} />,
  Paragraph: <AlignLeft size={18} />,
  Span: <Type size={18} />,
  Section: <LayoutTemplate size={18} />,
  Container: <Box size={18} />,
  TwoByTwo: <Grid2x2 size={18} />,
  ThreeColumns: <Columns3 size={18} />,
  FourColumns: <Grid size={18} />,
  FluidColumns: <Columns size={18} />,
  RichText: <FileText size={18} />,
  VerticalSpace: <MoveVertical size={18} />,
  Button: <MousePointer2 size={18} />,
  NavigationMenuBlock: <Menu size={18} />,
};

const themeComponents = config.categories?.Theme?.components ?? [];

function ThemeDrawer() {
  const [search, setSearch] = React.useState("");
  const filtered = themeComponents.filter((name) =>
    (name as string).toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div style={{ padding: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
      <input
        type="text"
        placeholder="Search components..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "6px 8px",
          border: "1px solid #e5e7eb",
          borderRadius: "6px",
          fontSize: "12px",
          outline: "none",
          boxSizing: "border-box",
        }}
      />
      <Drawer>
        {filtered.map((name) => (
          <Drawer.Item key={name as string} name={name as string} />
        ))}
      </Drawer>
    </div>
  );
}

const themePlugin: Plugin = {
  name: "theme",
  label: "Theme",
  icon: <Palette size={20} />,
  render: ThemeDrawer,
};

const itemStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
  padding: "10px 6px",
  border: "1px solid #e5e7eb",
  borderRadius: "6px",
  cursor: "grab",
  background: "#fff",
  fontSize: "11px",
  textAlign: "center",
  lineHeight: 1.2,
};

export function Client({ path, data }: { path: string; data: Partial<Data> }) {
  return (
    <Puck
      config={config}
      data={data}
      plugins={[themePlugin]}
      overrides={{
        components: () => {
          const visibleCategories = Object.entries(config.categories ?? {}).filter(
            ([, cat]) => (cat as { visible?: boolean }).visible !== false,
          );
          return (
            <div style={{ padding: "8px", display: "flex", flexDirection: "column", gap: "16px" }}>
              {visibleCategories.map(([groupName, category]) => (
                <div key={groupName}>
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#6b7280",
                      marginBottom: "6px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {groupName.toUpperCase()}
                  </div>
                  <Drawer>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "6px",
                      }}
                    >
                      {(category.components ?? []).map((name) => (
                        <Drawer.Item key={name as string} name={name as string}>
                          {() => (
                            <div style={itemStyle}>
                              {componentIcons[name as string] ?? <LayoutGrid size={18} />}
                              <span>{name as string}</span>
                            </div>
                          )}
                        </Drawer.Item>
                      ))}
                    </div>
                  </Drawer>
                </div>
              ))}
            </div>
          );
        },
      }}
      onPublish={async (data) => {
        await fetch("/puck/api", {
          method: "post",
          body: JSON.stringify({ data, path }),
        });
      }}
    />
  );
}
