import type { Config, RichText, Slot } from "@puckeditor/core";
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

type RootProps = {
  title: string;
};

type NavLink = { label: string; href: string };
type NavItem = { trigger: string; links: NavLink[] };

type Props = {
  Input: {
    type: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
    placeholder: string;
    name: string;
    id: string;
    disabled: boolean;
    required: boolean;
    className: string;
  };
  Img: {
    src: string;
    alt: string;
    width: number;
    height: number;
    objectFit: "contain" | "cover" | "fill" | "none" | "scale-down";
    className: string;
  };
  Link: {
    text: string;
    href: string;
    target: "_self" | "_blank" | "_parent" | "_top";
    rel: string;
    className: string;
  };
  Heading: {
    text: string;
    level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    className: string;
  };
  Paragraph: {
    text: string;
    className: string;
  };
  Span: {
    text: string;
    className: string;
  };
  Section: {
    id: string;
    className: string;
    content: Slot;
  };
  Container: {
    maxWidth: number;
    padding: string;
    id: string;
    className: string;
    content: Slot;
  };
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
  FluidColumns: {
    gap: number;
    numColumns: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    col1Span: number;
    col2Span: number;
    col3Span: number;
    col4Span: number;
    col5Span: number;
    col6Span: number;
    col7Span: number;
    col8Span: number;
    col9Span: number;
    col10Span: number;
    col11Span: number;
    col12Span: number;
    col1: Slot;
    col2: Slot;
    col3: Slot;
    col4: Slot;
    col5: Slot;
    col6: Slot;
    col7: Slot;
    col8: Slot;
    col9: Slot;
    col10: Slot;
    col11: Slot;
    col12: Slot;
  };
  RichText: {
    body: RichText;
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
    components: [
      "VerticalSpace",
      "Button",
      "RichText",
      "Input",
      "Img",
      "Link",
      "Heading",
      "Paragraph",
      "Span",
      "Section",
      "Container",
    ] as (keyof Props)[],
  },
  Layout: {
    components: [
      "TwoByTwo",
      "ThreeColumns",
      "FourColumns",
      "FluidColumns",
    ] as (keyof Props)[],
  },
  Theme: {
    components: ["NavigationMenuBlock"] as (keyof Props)[],
    defaultExpanded: false,
    visible: false,
  },
  layoutDisallow: {
    components: ["NavigationMenuBlock"] as (keyof Props)[],
    visible: false,
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
          disallow: categoriesConfig.layoutDisallow.components,
          type: "slot",
        },
        rightColumn: {
          type: "slot",
          disallow: categoriesConfig.layoutDisallow.components,
        },
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
    FluidColumns: {
      label: "Fluid Columns",
      fields: {
        gap: { type: "number" },
        numColumns: {
          type: "select",
          options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => ({
            label: `${n} Column${n > 1 ? "s" : ""}`,
            value: n,
          })),
        },
        col1Span: { type: "number" },
        col2Span: { type: "number" },
        col3Span: { type: "number" },
        col4Span: { type: "number" },
        col5Span: { type: "number" },
        col6Span: { type: "number" },
        col7Span: { type: "number" },
        col8Span: { type: "number" },
        col9Span: { type: "number" },
        col10Span: { type: "number" },
        col11Span: { type: "number" },
        col12Span: { type: "number" },
        col1: { type: "slot" },
        col2: { type: "slot" },
        col3: { type: "slot" },
        col4: { type: "slot" },
        col5: { type: "slot" },
        col6: { type: "slot" },
        col7: { type: "slot" },
        col8: { type: "slot" },
        col9: { type: "slot" },
        col10: { type: "slot" },
        col11: { type: "slot" },
        col12: { type: "slot" },
      },
      defaultProps: {
        gap: 16,
        numColumns: 2,
        col1Span: 6,
        col2Span: 6,
        col3Span: 4,
        col4Span: 3,
        col5Span: 2,
        col6Span: 2,
        col7Span: 2,
        col8Span: 2,
        col9Span: 1,
        col10Span: 1,
        col11Span: 1,
        col12Span: 1,
      } as Props["FluidColumns"],
      render: ({
        gap,
        numColumns,
        col1Span,
        col2Span,
        col3Span,
        col4Span,
        col5Span,
        col6Span,
        col7Span,
        col8Span,
        col9Span,
        col10Span,
        col11Span,
        col12Span,
        col1: Col1,
        col2: Col2,
        col3: Col3,
        col4: Col4,
        col5: Col5,
        col6: Col6,
        col7: Col7,
        col8: Col8,
        col9: Col9,
        col10: Col10,
        col11: Col11,
        col12: Col12,
      }) => (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap,
          }}
        >
          {numColumns >= 1 && (
            <div style={{ gridColumn: `span ${col1Span}` }}>
              <Col1 />
            </div>
          )}
          {numColumns >= 2 && (
            <div style={{ gridColumn: `span ${col2Span}` }}>
              <Col2 />
            </div>
          )}
          {numColumns >= 3 && (
            <div style={{ gridColumn: `span ${col3Span}` }}>
              <Col3 />
            </div>
          )}
          {numColumns >= 4 && (
            <div style={{ gridColumn: `span ${col4Span}` }}>
              <Col4 />
            </div>
          )}
          {numColumns >= 5 && (
            <div style={{ gridColumn: `span ${col5Span}` }}>
              <Col5 />
            </div>
          )}
          {numColumns >= 6 && (
            <div style={{ gridColumn: `span ${col6Span}` }}>
              <Col6 />
            </div>
          )}
          {numColumns >= 7 && (
            <div style={{ gridColumn: `span ${col7Span}` }}>
              <Col7 />
            </div>
          )}
          {numColumns >= 8 && (
            <div style={{ gridColumn: `span ${col8Span}` }}>
              <Col8 />
            </div>
          )}
          {numColumns >= 9 && (
            <div style={{ gridColumn: `span ${col9Span}` }}>
              <Col9 />
            </div>
          )}
          {numColumns >= 10 && (
            <div style={{ gridColumn: `span ${col10Span}` }}>
              <Col10 />
            </div>
          )}
          {numColumns >= 11 && (
            <div style={{ gridColumn: `span ${col11Span}` }}>
              <Col11 />
            </div>
          )}
          {numColumns >= 12 && (
            <div style={{ gridColumn: `span ${col12Span}` }}>
              <Col12 />
            </div>
          )}
        </div>
      ),
    },
    Input: {
      fields: {
        type: {
          type: "select",
          options: [
            "text",
            "email",
            "password",
            "number",
            "tel",
            "url",
            "search",
          ].map((v) => ({ label: v, value: v })),
        },
        placeholder: { type: "text", contentEditable: true },
        name: { type: "text" },
        id: { type: "text" },
        disabled: {
          type: "radio",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },
        required: {
          type: "radio",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },
        className: { type: "text" },
      },
      defaultProps: {
        type: "text",
        placeholder: "Enter text...",
        name: "",
        id: "",
        disabled: false,
        required: false,
        className: "",
      },
      render: ({
        type,
        placeholder,
        name,
        id,
        disabled,
        required,
        className,
      }) => (
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          id={id}
          disabled={disabled}
          required={required}
          className={className}
        />
      ),
    },
    Img: {
      fields: {
        src: { type: "text" },
        alt: { type: "text" },
        width: { type: "number" },
        height: { type: "number" },
        objectFit: {
          type: "select",
          options: ["contain", "cover", "fill", "none", "scale-down"].map(
            (v) => ({ label: v, value: v }),
          ),
        },
        className: { type: "text" },
      },
      defaultProps: {
        src: "https://placehold.co/400x300",
        alt: "Image",
        width: 400,
        height: 300,
        objectFit: "cover",
        className: "",
      },
      render: ({ src, alt, width, height, objectFit, className }) => (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={{ objectFit }}
          className={className}
        />
      ),
    },
    Link: {
      fields: {
        text: { type: "text", contentEditable: true },
        href: { type: "text" },
        target: {
          type: "select",
          options: ["_self", "_blank", "_parent", "_top"].map((v) => ({
            label: v,
            value: v,
          })),
        },
        rel: { type: "text" },
        className: { type: "text" },
      },
      defaultProps: {
        text: "Click here",
        href: "#",
        target: "_self",
        rel: "",
        className: "",
      },
      render: ({ text, href, target, rel, className }) => (
        <a
          href={href}
          target={target}
          rel={rel || undefined}
          className={className}
        >
          {text}
        </a>
      ),
    },
    Heading: {
      fields: {
        text: { type: "text", contentEditable: true },
        level: {
          type: "select",
          options: ["h1", "h2", "h3", "h4", "h5", "h6"].map((v) => ({
            label: v.toUpperCase(),
            value: v,
          })),
        },
        className: { type: "text" },
      },
      defaultProps: {
        text: "Heading",
        level: "h2",
        className: "",
      },
      render: ({ text, level: Tag, className }) => (
        <Tag className={className}>{text}</Tag>
      ),
    },
    Paragraph: {
      fields: {
        text: { type: "text", contentEditable: true },
        className: { type: "text" },
      },
      defaultProps: {
        text: "Paragraph text goes here.",
        className: "",
      },
      render: ({ text, className }) => <p className={className}>{text}</p>,
    },
    Span: {
      fields: {
        text: { type: "text", contentEditable: true },
        className: { type: "text" },
      },
      defaultProps: {
        text: "Span text",
        className: "",
      },
      render: ({ text, className }) => (
        <span className={className}>{text}</span>
      ),
    },
    Section: {
      fields: {
        id: { type: "text" },
        className: { type: "text" },
        content: { type: "slot" },
      },
      defaultProps: {
        id: "",
        className: "",
      } as Props["Section"],
      render: ({ id, className, content: Content }) => (
        <section id={id || undefined} className={className}>
          <Content />
        </section>
      ),
    },
    Container: {
      fields: {
        maxWidth: { type: "number" },
        padding: { type: "text" },
        id: { type: "text" },
        className: { type: "text" },
        content: { type: "slot" },
      },
      defaultProps: {
        maxWidth: 1200,
        padding: "16px",
        id: "",
        className: "",
      } as Props["Container"],
      render: ({ maxWidth, padding, id, className, content: Content }) => (
        <div
          id={id || undefined}
          className={className}
          style={{ maxWidth, padding, margin: "0 auto", width: "100%" }}
        >
          <Content />
        </div>
      ),
    },
    RichText: {
      fields: {
        body: { type: "richtext", contentEditable: true },
      },
      render: ({ body }) => <div style={{ padding: "40px" }}>{body}</div>,
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
        label: { type: "text", contentEditable: true },
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
