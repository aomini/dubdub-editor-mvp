import type { Config } from "@puckeditor/core";

type RootProps = {
  title: string;
};

type Props = {
  HeadingBlock: { title: string; tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" };
};

export const config: Config<Props, RootProps> = {
  components: {
    HeadingBlock: {
      fields: {
        title: { type: "text" },
        tag: {
          type: "select",
          options: [
            { label: "h1", value: "h1" },
            { label: "h2", value: "h2" },
            { label: "h3", value: "h3" },
            { label: "h4", value: "h4" },
            { label: "h5", value: "h5" },
            { label: "h6", value: "h6" },
          ],
        },
      },
      defaultProps: {
        title: "Heading",
        tag: "h1",
      },
      render: ({ title, tag }) => (
        <div style={{ padding: 64 }}>
          <h1>{title}</h1>
        </div>
      ),
    },
  },
  root: {
    fields: {
      title: { type: "text" },
    },
    render: ({ children, title }) => {
      return (
        <main>
          <h1>This site is underdevelopment</h1>
          <div>{children}</div>
        </main>
      );
    },
  },
};

export default config;
