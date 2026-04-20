"use client";

import type { Data, Plugin } from "@puckeditor/core";
import { Drawer, Puck } from "@puckeditor/core";
import { Palette } from "lucide-react";
import config from "../../../puck.config";

const themeComponents = config.categories?.Theme?.components ?? [];

const themePlugin: Plugin = {
  name: "theme",
  label: "Theme",
  icon: <Palette size={20} />,
  render: () => (
    <div style={{ padding: "8px" }}>
      <Drawer>
        {themeComponents.map((name, index) => (
          <Drawer.Item key={name as string} name={name as string} />
        ))}
      </Drawer>
    </div>
  ),
};

export function Client({ path, data }: { path: string; data: Partial<Data> }) {
  return (
    <Puck
      config={config}
      data={data}
      plugins={[themePlugin]}
      onPublish={async (data) => {
        await fetch("/puck/api", {
          method: "post",
          body: JSON.stringify({ data, path }),
        });
      }}
    />
  );
}
