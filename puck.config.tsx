import type { Config, Slot } from "@puckeditor/core";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
} from "./components/ui/navigation-menu";
import { Button } from "./components/ui/button";
import { cn } from "./lib/utils";
import classNames from "classnames";

type RootProps = {
  title: string;
};

type NavLink = { label: string; href: string };
type NavItem = { trigger: string; links: NavLink[] };

type Props = {
  TwoByTwo: {
    gap: number;
    leftColumn: Slot;
    rightColumn: Slot;
  };
  ThreeColumns: {
    gap: number;
    col1: Slot;
    col2: Slot;
    col3: Slot;
  };
  FourColumns: {
    gap: number;
    col1: Slot;
    col2: Slot;
    col3: Slot;
    col4: Slot;
  };
  VerticalSpace: {
    classNames: string;
    gap: number;
  };
  Button: {
    label: string;
    className: string;
    variant:
      | "default"
      | "outline"
      | "secondary"
      | "ghost"
      | "destructive"
      | "link";
    size:
      | "default"
      | "xs"
      | "sm"
      | "lg"
      | "icon"
      | "icon-xs"
      | "icon-sm"
      | "icon-lg";
    asChild: boolean;
  };
  NavigationMenuBlock: {
    viewport: boolean;
    showIndicator: boolean;
    align: string;
    items: NavItem[];
  };
};

const categoriesConfig = {
  Base: {
    components: ["VerticalSpace", "Button"] as (keyof Props)[],
  },
  Layout: {
    components: ["TwoByTwo", "ThreeColumns", "FourColumns"] as (keyof Props)[],
  },
  Theme: {
    components: ["NavigationMenuBlock"] as (keyof Props)[],
    defaultExpanded: false,
  },
};

export const config: Config<Props, RootProps, keyof typeof categoriesConfig> = {
  categories: categoriesConfig,
  components: {
    TwoByTwo: {
      label: "2x2",
      fields: {
        gap: { type: "number" },
        leftColumn: {
          type: "slot",
        },
        rightColumn: { type: "slot" },
      },
      defaultProps: {
        gap: 16,
      } as Props["TwoByTwo"],
      render: ({ leftColumn: Left, rightColumn: Right, gap }) => {
        return (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${2}, 1fr)`,
              gap: gap,
            }}
          >
            <Left />
            <Right />
          </div>
        );
      },
    },
    ThreeColumns: {
      label: "3x3",
      fields: {
        gap: { type: "number" },
        col1: { type: "slot" },
        col2: { type: "slot" },
        col3: { type: "slot" },
      },
      defaultProps: { gap: 16 } as Props["ThreeColumns"],
      render: ({ col1: Col1, col2: Col2, col3: Col3, gap }) => (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap,
          }}
        >
          <Col1 />
          <Col2 />
          <Col3 />
        </div>
      ),
    },
    FourColumns: {
      label: "4x4",
      fields: {
        gap: { type: "number" },
        col1: { type: "slot" },
        col2: { type: "slot" },
        col3: { type: "slot" },
        col4: { type: "slot" },
      },
      defaultProps: { gap: 16 } as Props["FourColumns"],
      render: ({ col1: Col1, col2: Col2, col3: Col3, col4: Col4, gap }) => (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap,
          }}
        >
          <Col1 />
          <Col2 />
          <Col3 />
          <Col4 />
        </div>
      ),
    },
    VerticalSpace: {
      fields: {
        classNames: { type: "text" },
        gap: { type: "number" },
      },
      defaultProps: {
        classNames: "",
        gap: 20,
      },
      render: ({ classNames, gap }) => (
        <div className={cn(classNames, "block", `h-[20px]`)} />
      ),
    },
    Button: {
      fields: {
        className: { type: "text" },
        label: { type: "text" },
        variant: {
          type: "select",
          options: [
            { label: "default", value: "default" },
            { label: "outline", value: "outline" },
            { label: "secondary", value: "secondary" },
            { label: "ghost", value: "ghost" },
            { label: "destructive", value: "destructive" },
            { label: "link", value: "link" },
          ],
        },
        size: {
          type: "select",
          options: [
            { label: "default", value: "default" },
            { label: "xs", value: "xs" },
            { label: "sm", value: "sm" },
            { label: "lg", value: "lg" },
            { label: "icon", value: "icon" },
            { label: "icon-xs", value: "icon-xs" },
            { label: "icon-sm", value: "icon-sm" },
            { label: "icon-lg", value: "icon-lg" },
          ],
        },
        asChild: {
          type: "radio",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },
      },
      defaultProps: {
        label: "Button",
        variant: "default",
        size: "default",
        className: "",
        asChild: false,
      },
      render: ({ label, variant, size, className, asChild }) => (
        <Button
          variant={variant}
          size={size}
          asChild={asChild}
          className={className}
        >
          {label}
        </Button>
      ),
    },
    NavigationMenuBlock: {
      fields: {
        viewport: {
          type: "radio",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },
        showIndicator: {
          type: "radio",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },
        align: {
          type: "select",
          options: [
            { label: "left", value: "start" },
            { label: "center", value: "center" },
            { label: "right", value: "end" },
          ],
        },
        items: {
          type: "array",
          arrayFields: {
            trigger: { type: "text" },
            links: {
              type: "array",
              arrayFields: {
                label: { type: "text" },
                href: { type: "text" },
              },
              defaultItemProps: { label: "Link", href: "#" },
            },
          },
          defaultItemProps: {
            trigger: "Menu",
            links: [{ label: "Link", href: "#" }],
          },
        },
      },
      defaultProps: {
        viewport: true,
        showIndicator: false,
        align: "start",
        items: [
          {
            trigger: "Getting Started",
            links: [
              { label: "Introduction", href: "#" },
              { label: "Installation", href: "#" },
            ],
          },
        ],
      },
      render: ({ viewport, showIndicator, items, align }) => (
        <div className={cn(`justify-${align}`, "flex")}>
          <NavigationMenu viewport={viewport}>
            <NavigationMenuList>
              {items.map((item, i) => (
                <NavigationMenuItem key={i}>
                  <NavigationMenuTrigger>{item.trigger}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {item.links.map((link, j) => (
                      <NavigationMenuLink key={j} href={link.href}>
                        {link.label}
                      </NavigationMenuLink>
                    ))}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
            {showIndicator && <NavigationMenuIndicator />}
          </NavigationMenu>
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
          <NavigationMenu />
          <div>{children}</div>
        </main>
      );
    },
  },
};

export default config;
