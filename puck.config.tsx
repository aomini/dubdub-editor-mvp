import type { Config, ComponentConfig, RichText, Slot } from "@puckeditor/core";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuCartIcon,
} from "./components/ui/navigation-menu";
import { withStyleField } from "./lib/with-style-field";
import type { ResponsiveStyle } from "./lib/responsive-style";
import { Button } from "./components/ui/button";
import { ProductCard } from "./components/ui/product-card";
import { HeroBanner } from "./components/ui/hero-banner";
import { Testimonial } from "./components/ui/testimonial";
import { PricingCard } from "./components/ui/pricing-card";
import { AnnouncementBar } from "./components/ui/announcement-bar";
import { SpotlightCard } from "./components/ui/spotlight-card";
import { FeaturedCollection } from "./components/ui/featured-collection";
import { CountdownBanner } from "./components/ui/countdown-banner";
import { TrustBadges } from "./components/ui/trust-badges";
import { NewsletterSignup } from "./components/ui/newsletter-signup";
import { CategoryGrid } from "./components/ui/category-grid";
import { Footer } from "./components/ui/footer";
import { PdpImageGallery } from "./components/ui/pdp-image-gallery";
import { PdpProductInfo } from "./components/ui/pdp-product-info";
import { PdpVariantSelector } from "./components/ui/pdp-variant-selector";
import { PdpAddToCart } from "./components/ui/pdp-add-to-cart";
import { PdpReviews } from "./components/ui/pdp-reviews";
import { BestSellingProducts } from "./components/ui/best-selling-products";
import { StockClearanceProducts } from "./components/ui/stock-clearance-products";
import { ProductCategoryList } from "./components/ui/product-category-list";
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
  ProductCard: {
    imageSrc: string;
    imageAlt: string;
    badge: string;
    badgeVariant: "sale" | "new" | "hot" | "soldout";
    title: string;
    description: string;
    price: string;
    originalPrice: string;
    ctaLabel: string;
    className: string;
  };
  HeroBanner: {
    title: string;
    subtitle: string;
    description: string;
    bgColor: string;
    imageSrc: string;
    imageAlt: string;
    ctaLabel: string;
    ctaHref: string;
    align: "left" | "center" | "right";
    minHeight: number;
    className: string;
  };
  Testimonial: {
    quote: string;
    authorName: string;
    authorRole: string;
    avatarSrc: string;
    rating: 1 | 2 | 3 | 4 | 5;
    className: string;
  };
  PricingCard: {
    planName: string;
    price: string;
    period: string;
    features: { text: string }[];
    featured: boolean;
    ctaLabel: string;
    className: string;
  };
  AnnouncementBar: {
    text: string;
    linkLabel: string;
    linkHref: string;
    variant: "default" | "primary" | "destructive";
    className: string;
  };
  SpotlightCard: {
    eyebrow: string;
    title: string;
    description: string;
    icon: string;
    ctaLabel: string;
    spotlightColor: string;
    borderGlow: boolean;
    className: string;
  };
  FeaturedCollection: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    imageSrc: string;
    imageAlt: string;
    layout: "image-left" | "image-right";
    accentColor: string;
    className: string;
  };
  CountdownBanner: {
    headline: string;
    subline: string;
    ctaLabel: string;
    ctaHref: string;
    targetDate: string;
    bgColor: string;
    textColor: string;
    className: string;
  };
  TrustBadges: {
    badges: { icon: string; title: string; subtitle: string }[];
    layout: "row" | "grid";
    showDividers: boolean;
    className: string;
  };
  NewsletterSignup: {
    eyebrow: string;
    title: string;
    description: string;
    placeholder: string;
    ctaLabel: string;
    disclaimer: string;
    bgColor: string;
    accentColor: string;
    align: "left" | "center";
    className: string;
  };
  CategoryGrid: {
    title: string;
    subtitle: string;
    categories: { imageSrc: string; label: string; href: string }[];
    columns: 2 | 3 | 4;
    aspectRatio: "square" | "portrait" | "landscape";
    className: string;
  };
  BestSellingProducts: {
    sectionTitle: string;
    sectionSubtitle: string;
    viewAllLabel: string;
    viewAllHref: string;
    columns: 2 | 3 | 4;
    products: {
      imageSrc: string;
      imageAlt: string;
      rank: number;
      title: string;
      rating: number;
      reviewCount: number;
      price: string;
      ctaLabel: string;
      href: string;
    }[];
    className: string;
  };
  StockClearanceProducts: {
    sectionTitle: string;
    sectionSubtitle: string;
    columns: 2 | 3 | 4;
    products: {
      imageSrc: string;
      imageAlt: string;
      title: string;
      originalPrice: string;
      salePrice: string;
      discountPercent: number;
      stockLeft: number;
      maxStock: number;
      ctaLabel: string;
      href: string;
    }[];
    className: string;
  };
  ProductCategoryList: {
    sectionTitle: string;
    sectionSubtitle: string;
    viewAllLabel: string;
    viewAllHref: string;
    columns: 2 | 3 | 4;
    categories: { label: string }[];
    products: {
      category: string;
      imageSrc: string;
      imageAlt: string;
      badge: string;
      badgeVariant: "sale" | "new" | "hot" | "soldout" | "none";
      title: string;
      price: string;
      originalPrice: string;
      ctaLabel: string;
      href: string;
    }[];
    className: string;
  };
  PdpImageGallery: {
    images: { src: string; alt: string }[];
    aspectRatio: "square" | "portrait" | "landscape";
    enableZoom: boolean;
    className: string;
  };
  PdpProductInfo: {
    brand: string;
    title: string;
    price: string;
    originalPrice: string;
    badge: string;
    badgeColor: string;
    rating: number;
    reviewCount: number;
    description: string;
    sku: string;
    className: string;
  };
  PdpVariantSelector: {
    colorLabel: string;
    colors: { name: string; hex: string }[];
    sizeLabel: string;
    sizes: { label: string; available: boolean }[];
    showSizeGuide: boolean;
    className: string;
  };
  PdpAddToCart: {
    ctaLabel: string;
    wishlistLabel: string;
    showWishlist: boolean;
    showQuantity: boolean;
    accentColor: string;
    stockCount: number;
    className: string;
  };
  PdpReviews: {
    heading: string;
    averageRating: number;
    totalReviews: number;
    reviews: {
      author: string;
      rating: number;
      date: string;
      title: string;
      body: string;
      verified: boolean;
    }[];
    accentColor: string;
    className: string;
  };
  Footer: {
    brandName: string;
    tagline: string;
    columns: { heading: string; links: { label: string; href: string }[] }[];
    socialLinks: {
      platform:
        | "instagram"
        | "twitter"
        | "facebook"
        | "youtube"
        | "github"
        | "linkedin";
      href: string;
    }[];
    copyrightText: string;
    bgColor: string;
    accentColor: string;
    showNewsletter: boolean;
    newsletterPlaceholder: string;
    newsletterCtaLabel: string;
    className: string;
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
  Ecommerce: {
    components: [
      "ProductCard",
      "HeroBanner",
      "Testimonial",
      "PricingCard",
      "AnnouncementBar",
      "FeaturedCollection",
      "CountdownBanner",
      "TrustBadges",
      "NewsletterSignup",
      "CategoryGrid",
      "BestSellingProducts",
      "StockClearanceProducts",
      "ProductCategoryList",
      "Footer",
    ] as (keyof Props)[],
  },
  Interactive: {
    components: ["SpotlightCard"] as (keyof Props)[],
  },
  "Product Details": {
    components: [
      "PdpImageGallery",
      "PdpProductInfo",
      "PdpVariantSelector",
      "PdpAddToCart",
      "PdpReviews",
    ] as (keyof Props)[],
  },
};

const rawConfig: Config<Props, RootProps, keyof typeof categoriesConfig> = {
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
      inline: true,
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
      render: ({ puck, text, href, target, rel, className }) => (
        <a
          ref={puck.dragRef}
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
      label: "Text",
      inline: true,
      fields: {
        text: { type: "text", contentEditable: true },
        className: { type: "text" },
      },
      defaultProps: {
        text: "Span text",
        className: "",
      },
      render: ({ puck, text, className }) => (
        <span ref={puck.dragRef} className={className}>
          {text}
        </span>
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
    ProductCard: {
      fields: {
        imageSrc: { type: "text" },
        imageAlt: { type: "text" },
        badge: { type: "text" },
        badgeVariant: {
          type: "select",
          options: [
            { label: "Sale", value: "sale" },
            { label: "New", value: "new" },
            { label: "Hot", value: "hot" },
            { label: "Sold Out", value: "soldout" },
          ],
        },
        title: { type: "text", contentEditable: true },
        description: { type: "text", contentEditable: true },
        price: { type: "text" },
        originalPrice: { type: "text" },
        ctaLabel: { type: "text", contentEditable: true },
        className: { type: "text" },
      },
      defaultProps: {
        imageSrc: "https://placehold.co/400x300",
        imageAlt: "Product image",
        badge: "New",
        badgeVariant: "new",
        title: "Product Name",
        description: "Short product description goes here.",
        price: "$49.99",
        originalPrice: "",
        ctaLabel: "Add to Cart",
        className: "",
      },
      render: (props) => <ProductCard {...props} />,
    },
    HeroBanner: {
      fields: {
        title: { type: "text", contentEditable: true },
        subtitle: { type: "text", contentEditable: true },
        description: { type: "text", contentEditable: true },
        bgColor: { type: "text" },
        imageSrc: { type: "text" },
        imageAlt: { type: "text" },
        ctaLabel: { type: "text", contentEditable: true },
        ctaHref: { type: "text" },
        align: {
          type: "select",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },
        minHeight: { type: "number" },
        className: { type: "text" },
      },
      defaultProps: {
        title: "Big Sale — Up to 50% Off",
        subtitle: "Limited Time Offer",
        description:
          "Shop the latest collection and save big. Free shipping on orders over $50.",
        bgColor: "#1a1a2e",
        imageSrc: "",
        imageAlt: "",
        ctaLabel: "Shop Now",
        ctaHref: "#",
        align: "center",
        minHeight: 400,
        className: "",
      },
      render: (props) => <HeroBanner {...props} />,
    },
    Testimonial: {
      fields: {
        quote: { type: "text", contentEditable: true },
        authorName: { type: "text", contentEditable: true },
        authorRole: { type: "text", contentEditable: true },
        avatarSrc: { type: "text" },
        rating: {
          type: "select",
          options: [1, 2, 3, 4, 5].map((n) => ({
            label: `${n} star${n > 1 ? "s" : ""}`,
            value: n,
          })),
        },
        className: { type: "text" },
      },
      defaultProps: {
        quote:
          "This product completely exceeded my expectations. The quality is outstanding and delivery was super fast.",
        authorName: "Jane Smith",
        authorRole: "Verified Buyer",
        avatarSrc: "",
        rating: 5,
        className: "",
      } as Props["Testimonial"],
      render: (props) => <Testimonial {...props} />,
    },
    PricingCard: {
      fields: {
        planName: { type: "text", contentEditable: true },
        price: { type: "text" },
        period: { type: "text" },
        features: {
          type: "array",
          arrayFields: { text: { type: "text" } },
          defaultItemProps: { text: "Feature included" },
        },
        featured: {
          type: "radio",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },
        ctaLabel: { type: "text", contentEditable: true },
        className: { type: "text" },
      },
      defaultProps: {
        planName: "Pro",
        price: "$29",
        period: "month",
        features: [
          { text: "Unlimited products" },
          { text: "Priority support" },
          { text: "Advanced analytics" },
        ],
        featured: false,
        ctaLabel: "Get Started",
        className: "",
      },
      render: (props) => <PricingCard {...props} />,
    },
    SpotlightCard: {
      label: "Spotlight Card",
      fields: {
        eyebrow: { type: "text", contentEditable: true },
        title: { type: "text", contentEditable: true },
        description: { type: "text", contentEditable: true },
        icon: { type: "text" },
        ctaLabel: { type: "text", contentEditable: true },
        spotlightColor: { type: "text" },
        borderGlow: {
          type: "radio",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },
        className: { type: "text" },
      },
      defaultProps: {
        eyebrow: "New Feature",
        title: "Interactive Spotlight Card",
        description:
          "Hover over this card to see the spotlight effect follow your cursor in real time.",
        icon: "✨",
        ctaLabel: "Learn More",
        spotlightColor: "#6366f1",
        borderGlow: true,
        className: "",
      },
      render: (props) => <SpotlightCard {...props} />,
    },
    AnnouncementBar: {
      fields: {
        text: { type: "text", contentEditable: true },
        linkLabel: { type: "text", contentEditable: true },
        linkHref: { type: "text" },
        variant: {
          type: "select",
          options: [
            { label: "Default", value: "default" },
            { label: "Primary", value: "primary" },
            { label: "Destructive", value: "destructive" },
          ],
        },
        className: { type: "text" },
      },
      defaultProps: {
        text: "🎉 Free shipping on orders over $50!",
        linkLabel: "Shop Now",
        linkHref: "#",
        variant: "primary",
        className: "",
      },
      render: (props) => <AnnouncementBar {...props} />,
    },
    FeaturedCollection: {
      label: "Featured Collection",
      fields: {
        eyebrow: { type: "text", contentEditable: true },
        title: { type: "text", contentEditable: true },
        description: { type: "text", contentEditable: true },
        ctaLabel: { type: "text", contentEditable: true },
        ctaHref: { type: "text" },
        imageSrc: { type: "text" },
        imageAlt: { type: "text" },
        layout: {
          type: "select",
          options: [
            { label: "Image Left", value: "image-left" },
            { label: "Image Right", value: "image-right" },
          ],
        },
        accentColor: { type: "text" },
        className: { type: "text" },
      },
      defaultProps: {
        eyebrow: "New Arrivals",
        title: "Summer Collection 2025",
        description:
          "Discover our hand-curated selection of this season's must-have pieces. Crafted with premium materials and designed to last.",
        ctaLabel: "Shop the Collection",
        ctaHref: "#",
        imageSrc: "https://placehold.co/800x600",
        imageAlt: "Featured collection",
        layout: "image-left",
        accentColor: "#6366f1",
        className: "",
      },
      render: (props) => <FeaturedCollection {...props} />,
    },
    CountdownBanner: {
      label: "Countdown Banner",
      fields: {
        headline: { type: "text", contentEditable: true },
        subline: { type: "text", contentEditable: true },
        ctaLabel: { type: "text", contentEditable: true },
        ctaHref: { type: "text" },
        targetDate: { type: "text" },
        bgColor: { type: "text" },
        textColor: { type: "text" },
        className: { type: "text" },
      },
      defaultProps: {
        headline: "Flash Sale Ends In",
        subline: "Up to 60% off sitewide — don't miss out!",
        ctaLabel: "Shop Now",
        ctaHref: "#",
        targetDate: new Date(
          Date.now() + 3 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        bgColor: "#1e1b4b",
        textColor: "#ffffff",
        className: "",
      },
      render: (props) => <CountdownBanner {...props} />,
    },
    TrustBadges: {
      label: "Trust Badges",
      fields: {
        badges: {
          type: "array",
          arrayFields: {
            icon: { type: "text" },
            title: { type: "text" },
            subtitle: { type: "text" },
          },
          defaultItemProps: {
            icon: "✅",
            title: "Feature",
            subtitle: "Description",
          },
        },
        layout: {
          type: "select",
          options: [
            { label: "Row", value: "row" },
            { label: "Grid", value: "grid" },
          ],
        },
        showDividers: {
          type: "radio",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },
        className: { type: "text" },
      },
      defaultProps: {
        badges: [
          {
            icon: "🚚",
            title: "Free Shipping",
            subtitle: "On orders over $50",
          },
          {
            icon: "🔄",
            title: "Easy Returns",
            subtitle: "30-day hassle-free returns",
          },
          {
            icon: "🔒",
            title: "Secure Checkout",
            subtitle: "256-bit SSL encryption",
          },
          {
            icon: "⭐",
            title: "4.9/5 Rating",
            subtitle: "From 10,000+ reviews",
          },
        ],
        layout: "row",
        showDividers: true,
        className: "",
      },
      render: (props) => <TrustBadges {...props} />,
    },
    NewsletterSignup: {
      label: "Newsletter Signup",
      fields: {
        eyebrow: { type: "text", contentEditable: true },
        title: { type: "text", contentEditable: true },
        description: { type: "text", contentEditable: true },
        placeholder: { type: "text" },
        ctaLabel: { type: "text", contentEditable: true },
        disclaimer: { type: "text", contentEditable: true },
        bgColor: { type: "text" },
        accentColor: { type: "text" },
        align: {
          type: "select",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
          ],
        },
        className: { type: "text" },
      },
      defaultProps: {
        eyebrow: "Stay in the loop",
        title: "Get exclusive deals & new arrivals",
        description:
          "Join 50,000+ shoppers and be the first to know about sales, new products, and style tips.",
        placeholder: "Enter your email address",
        ctaLabel: "Subscribe",
        disclaimer: "No spam, unsubscribe at any time.",
        bgColor: "#f8fafc",
        accentColor: "#6366f1",
        align: "center",
        className: "",
      },
      render: (props) => <NewsletterSignup {...props} />,
    },
    CategoryGrid: {
      label: "Category Grid",
      fields: {
        title: { type: "text", contentEditable: true },
        subtitle: { type: "text", contentEditable: true },
        categories: {
          type: "array",
          arrayFields: {
            imageSrc: { type: "text" },
            label: { type: "text" },
            href: { type: "text" },
          },
          defaultItemProps: {
            imageSrc: "https://placehold.co/400x400",
            label: "Category",
            href: "#",
          },
        },
        columns: {
          type: "select",
          options: [
            { label: "2 Columns", value: 2 },
            { label: "3 Columns", value: 3 },
            { label: "4 Columns", value: 4 },
          ],
        },
        aspectRatio: {
          type: "select",
          options: [
            { label: "Square", value: "square" },
            { label: "Portrait", value: "portrait" },
            { label: "Landscape", value: "landscape" },
          ],
        },
        className: { type: "text" },
      },
      defaultProps: {
        title: "Shop by Category",
        subtitle: "Find exactly what you're looking for",
        categories: [
          {
            imageSrc: "https://placehold.co/400x400",
            label: "Women's",
            href: "#",
          },
          {
            imageSrc: "https://placehold.co/400x400",
            label: "Men's",
            href: "#",
          },
          {
            imageSrc: "https://placehold.co/400x400",
            label: "Accessories",
            href: "#",
          },
          {
            imageSrc: "https://placehold.co/400x400",
            label: "Sale",
            href: "#",
          },
        ],
        columns: 4,
        aspectRatio: "portrait",
        className: "",
      },
      render: (props) => <CategoryGrid {...props} />,
    },
    BestSellingProducts: {
      label: "Best Selling Products",
      fields: {
        sectionTitle: { type: "text", contentEditable: true },
        sectionSubtitle: { type: "text", contentEditable: true },
        viewAllLabel: { type: "text" },
        viewAllHref: { type: "text" },
        columns: {
          type: "select",
          options: [
            { label: "2 Columns", value: 2 },
            { label: "3 Columns", value: 3 },
            { label: "4 Columns", value: 4 },
          ],
        },
        products: {
          type: "array",
          arrayFields: {
            imageSrc: { type: "text" },
            imageAlt: { type: "text" },
            rank: { type: "number" },
            title: { type: "text" },
            rating: { type: "number" },
            reviewCount: { type: "number" },
            price: { type: "text" },
            ctaLabel: { type: "text" },
            href: { type: "text" },
          },
          defaultItemProps: {
            imageSrc: "https://placehold.co/400x300",
            imageAlt: "Product image",
            rank: 1,
            title: "Best Seller Product",
            rating: 4.5,
            reviewCount: 128,
            price: "$49.99",
            ctaLabel: "Add to Cart",
            href: "#",
          },
        },
        className: { type: "text" },
      },
      defaultProps: {
        sectionTitle: "Best Sellers",
        sectionSubtitle: "Our most loved products this season",
        viewAllLabel: "View All",
        viewAllHref: "#",
        columns: 4,
        products: [
          {
            imageSrc: "https://placehold.co/400x300",
            imageAlt: "Product 1",
            rank: 1,
            title: "Premium Wireless Headphones",
            rating: 5,
            reviewCount: 3241,
            price: "$129.99",
            ctaLabel: "Add to Cart",
            href: "#",
          },
          {
            imageSrc: "https://placehold.co/400x300",
            imageAlt: "Product 2",
            rank: 2,
            title: "Minimalist Leather Watch",
            rating: 4,
            reviewCount: 1892,
            price: "$89.99",
            ctaLabel: "Add to Cart",
            href: "#",
          },
          {
            imageSrc: "https://placehold.co/400x300",
            imageAlt: "Product 3",
            rank: 3,
            title: "Organic Cotton Tote Bag",
            rating: 4,
            reviewCount: 756,
            price: "$34.99",
            ctaLabel: "Add to Cart",
            href: "#",
          },
          {
            imageSrc: "https://placehold.co/400x300",
            imageAlt: "Product 4",
            rank: 4,
            title: "Stainless Steel Water Bottle",
            rating: 5,
            reviewCount: 2105,
            price: "$24.99",
            ctaLabel: "Add to Cart",
            href: "#",
          },
        ],
        className: "",
      },
      render: (props) => <BestSellingProducts {...props} />,
    },
    StockClearanceProducts: {
      label: "Stock Clearance Products",
      fields: {
        sectionTitle: { type: "text", contentEditable: true },
        sectionSubtitle: { type: "text", contentEditable: true },
        columns: {
          type: "select",
          options: [
            { label: "2 Columns", value: 2 },
            { label: "3 Columns", value: 3 },
            { label: "4 Columns", value: 4 },
          ],
        },
        products: {
          type: "array",
          arrayFields: {
            imageSrc: { type: "text" },
            imageAlt: { type: "text" },
            title: { type: "text" },
            originalPrice: { type: "text" },
            salePrice: { type: "text" },
            discountPercent: { type: "number" },
            stockLeft: { type: "number" },
            maxStock: { type: "number" },
            ctaLabel: { type: "text" },
            href: { type: "text" },
          },
          defaultItemProps: {
            imageSrc: "https://placehold.co/400x300",
            imageAlt: "Clearance item",
            title: "Clearance Product",
            originalPrice: "$99.99",
            salePrice: "$49.99",
            discountPercent: 50,
            stockLeft: 5,
            maxStock: 50,
            ctaLabel: "Grab It",
            href: "#",
          },
        },
        className: { type: "text" },
      },
      defaultProps: {
        sectionTitle: "Stock Clearance",
        sectionSubtitle: "Limited stock — grab it before it's gone!",
        columns: 4,
        products: [
          {
            imageSrc: "https://placehold.co/400x300",
            imageAlt: "Clearance item 1",
            title: "Classic Denim Jacket",
            originalPrice: "$119.99",
            salePrice: "$59.99",
            discountPercent: 50,
            stockLeft: 3,
            maxStock: 40,
            ctaLabel: "Grab It",
            href: "#",
          },
          {
            imageSrc: "https://placehold.co/400x300",
            imageAlt: "Clearance item 2",
            title: "Running Sneakers",
            originalPrice: "$89.99",
            salePrice: "$44.99",
            discountPercent: 50,
            stockLeft: 8,
            maxStock: 60,
            ctaLabel: "Grab It",
            href: "#",
          },
          {
            imageSrc: "https://placehold.co/400x300",
            imageAlt: "Clearance item 3",
            title: "Silk Scarf",
            originalPrice: "$49.99",
            salePrice: "$19.99",
            discountPercent: 60,
            stockLeft: 2,
            maxStock: 30,
            ctaLabel: "Grab It",
            href: "#",
          },
          {
            imageSrc: "https://placehold.co/400x300",
            imageAlt: "Clearance item 4",
            title: "Leather Belt",
            originalPrice: "$39.99",
            salePrice: "$17.99",
            discountPercent: 55,
            stockLeft: 15,
            maxStock: 50,
            ctaLabel: "Grab It",
            href: "#",
          },
        ],
        className: "",
      },
      render: (props) => <StockClearanceProducts {...props} />,
    },
    ProductCategoryList: {
      label: "Product Category List",
      fields: {
        sectionTitle: { type: "text", contentEditable: true },
        sectionSubtitle: { type: "text", contentEditable: true },
        viewAllLabel: { type: "text" },
        viewAllHref: { type: "text" },
        columns: {
          type: "select",
          options: [
            { label: "2 Columns", value: 2 },
            { label: "3 Columns", value: 3 },
            { label: "4 Columns", value: 4 },
          ],
        },
        categories: {
          type: "array",
          arrayFields: {
            label: { type: "text" },
          },
          defaultItemProps: { label: "New Category" },
        },
        products: {
          type: "array",
          arrayFields: {
            category: { type: "text" },
            imageSrc: { type: "text" },
            imageAlt: { type: "text" },
            badge: { type: "text" },
            badgeVariant: {
              type: "select",
              options: [
                { label: "None", value: "none" },
                { label: "Sale", value: "sale" },
                { label: "New", value: "new" },
                { label: "Hot", value: "hot" },
                { label: "Sold Out", value: "soldout" },
              ],
            },
            title: { type: "text" },
            price: { type: "text" },
            originalPrice: { type: "text" },
            ctaLabel: { type: "text" },
            href: { type: "text" },
          },
          defaultItemProps: {
            category: "Electronics",
            imageSrc: "https://placehold.co/400x300",
            imageAlt: "Product image",
            badge: "New",
            badgeVariant: "new",
            title: "New Product",
            price: "$49.99",
            originalPrice: "",
            ctaLabel: "Add to Cart",
            href: "#",
          },
        },
        className: { type: "text" },
      },
      defaultProps: {
        sectionTitle: "Shop by Category",
        sectionSubtitle: "Browse our curated collections",
        viewAllLabel: "View All",
        viewAllHref: "#",
        columns: 4,
        categories: [
          { label: "Electronics" },
          { label: "Clothing" },
          { label: "Home" },
        ],
        products: [
          {
            category: "Electronics",
            imageSrc: "https://placehold.co/400x300",
            imageAlt: "Wireless Headphones",
            badge: "New",
            badgeVariant: "new",
            title: "Premium Wireless Headphones",
            price: "$129.99",
            originalPrice: "$179.99",
            ctaLabel: "Add to Cart",
            href: "#",
          },
          {
            category: "Electronics",
            imageSrc: "https://placehold.co/400x300",
            imageAlt: "Smart Watch",
            badge: "Hot",
            badgeVariant: "hot",
            title: "Smart Watch Pro",
            price: "$249.99",
            originalPrice: "",
            ctaLabel: "Add to Cart",
            href: "#",
          },
          {
            category: "Electronics",
            imageSrc: "https://placehold.co/400x300",
            imageAlt: "Bluetooth Speaker",
            badge: "Sale",
            badgeVariant: "sale",
            title: "Portable Bluetooth Speaker",
            price: "$59.99",
            originalPrice: "$89.99",
            ctaLabel: "Add to Cart",
            href: "#",
          },
          {
            category: "Electronics",
            imageSrc: "https://placehold.co/400x300",
            imageAlt: "Laptop Stand",
            badge: "",
            badgeVariant: "none",
            title: "Adjustable Laptop Stand",
            price: "$39.99",
            originalPrice: "",
            ctaLabel: "Add to Cart",
            href: "#",
          },
          {
            category: "Clothing",
            imageSrc: "https://placehold.co/400x300",
            imageAlt: "Merino Sweater",
            badge: "New",
            badgeVariant: "new",
            title: "Merino Wool Sweater",
            price: "$89.99",
            originalPrice: "",
            ctaLabel: "Shop Now",
            href: "#",
          },
          {
            category: "Clothing",
            imageSrc: "https://placehold.co/400x300",
            imageAlt: "Running Shoes",
            badge: "Hot",
            badgeVariant: "hot",
            title: "Lightweight Running Shoes",
            price: "$119.99",
            originalPrice: "$149.99",
            ctaLabel: "Shop Now",
            href: "#",
          },
          {
            category: "Clothing",
            imageSrc: "https://placehold.co/400x300",
            imageAlt: "Denim Jacket",
            badge: "Sale",
            badgeVariant: "sale",
            title: "Classic Denim Jacket",
            price: "$64.99",
            originalPrice: "$99.99",
            ctaLabel: "Shop Now",
            href: "#",
          },
          {
            category: "Clothing",
            imageSrc: "https://placehold.co/400x300",
            imageAlt: "Linen Shirt",
            badge: "",
            badgeVariant: "none",
            title: "Breathable Linen Shirt",
            price: "$44.99",
            originalPrice: "",
            ctaLabel: "Shop Now",
            href: "#",
          },
          {
            category: "Home",
            imageSrc: "https://placehold.co/400x300",
            imageAlt: "Ceramic Vase",
            badge: "New",
            badgeVariant: "new",
            title: "Handcrafted Ceramic Vase",
            price: "$34.99",
            originalPrice: "",
            ctaLabel: "Buy Now",
            href: "#",
          },
          {
            category: "Home",
            imageSrc: "https://placehold.co/400x300",
            imageAlt: "Scented Candle",
            badge: "",
            badgeVariant: "none",
            title: "Soy Wax Scented Candle Set",
            price: "$28.99",
            originalPrice: "$39.99",
            ctaLabel: "Buy Now",
            href: "#",
          },
          {
            category: "Home",
            imageSrc: "https://placehold.co/400x300",
            imageAlt: "Throw Blanket",
            badge: "Sale",
            badgeVariant: "sale",
            title: "Chunky Knit Throw Blanket",
            price: "$49.99",
            originalPrice: "$74.99",
            ctaLabel: "Buy Now",
            href: "#",
          },
          {
            category: "Home",
            imageSrc: "https://placehold.co/400x300",
            imageAlt: "Bamboo Tray",
            badge: "",
            badgeVariant: "none",
            title: "Bamboo Serving Tray",
            price: "$22.99",
            originalPrice: "",
            ctaLabel: "Buy Now",
            href: "#",
          },
        ],
        className: "",
      },
      render: (props) => <ProductCategoryList {...props} />,
    },
    Footer: {
      label: "Footer",
      fields: {
        brandName: { type: "text", contentEditable: true },
        tagline: { type: "text", contentEditable: true },
        columns: {
          type: "array",
          arrayFields: {
            heading: { type: "text" },
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
            heading: "Column",
            links: [{ label: "Link", href: "#" }],
          },
        },
        socialLinks: {
          type: "array",
          arrayFields: {
            platform: {
              type: "select",
              options: [
                { label: "Instagram", value: "instagram" },
                { label: "Twitter / X", value: "twitter" },
                { label: "Facebook", value: "facebook" },
                { label: "YouTube", value: "youtube" },
                { label: "GitHub", value: "github" },
                { label: "LinkedIn", value: "linkedin" },
              ],
            },
            href: { type: "text" },
          },
          defaultItemProps: { platform: "instagram", href: "#" },
        },
        copyrightText: { type: "text", contentEditable: true },
        bgColor: { type: "text" },
        accentColor: { type: "text" },
        showNewsletter: {
          type: "radio",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },
        newsletterPlaceholder: { type: "text" },
        newsletterCtaLabel: { type: "text", contentEditable: true },
        className: { type: "text" },
      },
      defaultProps: {
        brandName: "YourBrand",
        tagline:
          "Premium products, delivered to your door. Quality you can trust.",
        columns: [
          {
            heading: "Shop",
            links: [
              { label: "New Arrivals", href: "#" },
              { label: "Best Sellers", href: "#" },
              { label: "Sale", href: "#" },
              { label: "Collections", href: "#" },
            ],
          },
          {
            heading: "Help",
            links: [
              { label: "FAQ", href: "#" },
              { label: "Shipping", href: "#" },
              { label: "Returns", href: "#" },
              { label: "Track Order", href: "#" },
            ],
          },
          {
            heading: "Company",
            links: [
              { label: "About Us", href: "#" },
              { label: "Blog", href: "#" },
              { label: "Careers", href: "#" },
              { label: "Press", href: "#" },
            ],
          },
          {
            heading: "Legal",
            links: [
              { label: "Privacy Policy", href: "#" },
              { label: "Terms of Service", href: "#" },
              { label: "Cookie Policy", href: "#" },
            ],
          },
        ],
        socialLinks: [
          { platform: "instagram", href: "#" },
          { platform: "twitter", href: "#" },
          { platform: "facebook", href: "#" },
        ],
        copyrightText: `© ${new Date().getFullYear()} YourBrand. All rights reserved.`,
        bgColor: "#0f0f0f",
        accentColor: "#6366f1",
        showNewsletter: true,
        newsletterPlaceholder: "Enter your email",
        newsletterCtaLabel: "Subscribe",
        className: "",
      },
      render: (props) => <Footer {...props} />,
    },
    PdpImageGallery: {
      label: "PDP Image Gallery",
      fields: {
        images: {
          type: "array",
          arrayFields: {
            src: { type: "text" },
            alt: { type: "text" },
          },
          defaultItemProps: {
            src: "https://placehold.co/800x800",
            alt: "Product image",
          },
        },
        aspectRatio: {
          type: "select",
          options: [
            { label: "Square", value: "square" },
            { label: "Portrait (3:4)", value: "portrait" },
            { label: "Landscape (4:3)", value: "landscape" },
          ],
        },
        enableZoom: {
          type: "radio",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },
        className: { type: "text" },
      },
      defaultProps: {
        images: [
          { src: "https://placehold.co/800x800", alt: "Product front" },
          {
            src: "https://placehold.co/800x800/e2e8f0/64748b",
            alt: "Product back",
          },
          {
            src: "https://placehold.co/800x800/f0fdf4/16a34a",
            alt: "Product detail",
          },
        ],
        aspectRatio: "square",
        enableZoom: true,
        className: "",
      },
      render: (props) => <PdpImageGallery {...props} />,
    },
    PdpProductInfo: {
      label: "PDP Product Info",
      fields: {
        brand: { type: "text", contentEditable: true },
        title: { type: "text", contentEditable: true },
        price: { type: "text" },
        originalPrice: { type: "text" },
        badge: { type: "text", contentEditable: true },
        badgeColor: { type: "text" },
        rating: {
          type: "select",
          options: [1, 2, 3, 4, 5].map((n) => ({
            label: `${n} stars`,
            value: n,
          })),
        },
        reviewCount: { type: "number" },
        description: { type: "text", contentEditable: true },
        sku: { type: "text" },
        className: { type: "text" },
      },
      defaultProps: {
        brand: "ACME Studio",
        title: "Premium Leather Crossbody Bag",
        price: "$129",
        originalPrice: "$189",
        badge: "Best Seller",
        badgeColor: "#6366f1",
        rating: 4,
        reviewCount: 2847,
        description:
          'Handcrafted from full-grain leather with a minimalist silhouette. Fits a 13" laptop, has an interior zip pocket, and adjustable strap.',
        sku: "ACM-LCB-001",
        className: "",
      } as Props["PdpProductInfo"],
      render: (props) => <PdpProductInfo {...props} />,
    },
    PdpVariantSelector: {
      label: "PDP Variant Selector",
      fields: {
        colorLabel: { type: "text" },
        colors: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            hex: { type: "text" },
          },
          defaultItemProps: { name: "Color", hex: "#000000" },
        },
        sizeLabel: { type: "text" },
        sizes: {
          type: "array",
          arrayFields: {
            label: { type: "text" },
            available: {
              type: "radio",
              options: [
                { label: "In Stock", value: true },
                { label: "Out of Stock", value: false },
              ],
            },
          },
          defaultItemProps: { label: "M", available: true },
        },
        showSizeGuide: {
          type: "radio",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },
        className: { type: "text" },
      },
      defaultProps: {
        colorLabel: "Color",
        colors: [
          { name: "Midnight Black", hex: "#1a1a1a" },
          { name: "Tan", hex: "#c8956c" },
          { name: "Navy", hex: "#1e3a5f" },
          { name: "Forest Green", hex: "#2d5a27" },
        ],
        sizeLabel: "Size",
        sizes: [
          { label: "XS", available: true },
          { label: "S", available: true },
          { label: "M", available: true },
          { label: "L", available: false },
          { label: "XL", available: true },
        ],
        showSizeGuide: true,
        className: "",
      },
      render: (props) => <PdpVariantSelector {...props} />,
    },
    PdpAddToCart: {
      label: "PDP Add to Cart",
      fields: {
        ctaLabel: { type: "text", contentEditable: true },
        wishlistLabel: { type: "text" },
        showWishlist: {
          type: "radio",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },
        showQuantity: {
          type: "radio",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },
        accentColor: { type: "text" },
        stockCount: { type: "number" },
        className: { type: "text" },
      },
      defaultProps: {
        ctaLabel: "Add to Cart",
        wishlistLabel: "Save to Wishlist",
        showWishlist: true,
        showQuantity: true,
        accentColor: "#6366f1",
        stockCount: 7,
        className: "",
      },
      render: (props) => <PdpAddToCart {...props} />,
    },
    PdpReviews: {
      label: "PDP Reviews",
      fields: {
        heading: { type: "text", contentEditable: true },
        averageRating: {
          type: "select",
          options: [1, 2, 3, 4, 5].map((n) => ({ label: `${n}.0`, value: n })),
        },
        totalReviews: { type: "number" },
        reviews: {
          type: "array",
          arrayFields: {
            author: { type: "text" },
            rating: {
              type: "select",
              options: [1, 2, 3, 4, 5].map((n) => ({
                label: `${n} stars`,
                value: n,
              })),
            },
            date: { type: "text" },
            title: { type: "text" },
            body: { type: "text" },
            verified: {
              type: "radio",
              options: [
                { label: "Yes", value: true },
                { label: "No", value: false },
              ],
            },
          },
          defaultItemProps: {
            author: "Customer",
            rating: 5,
            date: "Jan 2025",
            title: "Great product!",
            body: "Loved it.",
            verified: true,
          },
        },
        accentColor: { type: "text" },
        className: { type: "text" },
      },
      defaultProps: {
        heading: "Customer Reviews",
        averageRating: 4,
        totalReviews: 2847,
        reviews: [
          {
            author: "Sarah M.",
            rating: 5,
            date: "March 2025",
            title: "Absolutely love this bag!",
            body: "The leather quality is incredible — soft yet durable. I use it daily and it only looks better with age.",
            verified: true,
          },
          {
            author: "James K.",
            rating: 4,
            date: "February 2025",
            title: "Great everyday carry",
            body: "Fits my laptop, charger, and notebook with room to spare. The strap is comfortable even when fully loaded.",
            verified: true,
          },
          {
            author: "Priya L.",
            rating: 5,
            date: "January 2025",
            title: "Worth every penny",
            body: "Bought this as a gift and she was thrilled. Shipping was fast and packaging was beautiful.",
            verified: false,
          },
        ],
        accentColor: "#6366f1",
        className: "",
      } as Props["PdpReviews"],
      render: (props) => <PdpReviews {...props} />,
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
            <NavigationMenuCartIcon />
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
          <NavigationMenu />
          <div>{children}</div>
        </main>
      );
    },
  },
};

type StyledProps = { [K in keyof Props]: Props[K] & { style?: ResponsiveStyle } };

const APPLY_STYLE_DIRECT = new Set(["Button"]);

const styledComponents = Object.fromEntries(
  Object.entries(rawConfig.components).map(([name, componentConfig]) => [
    name,
    withStyleField(componentConfig as ComponentConfig<any>, {
      applyStyleDirect: APPLY_STYLE_DIRECT.has(name),
    }),
  ]),
) as Config<StyledProps, RootProps, keyof typeof categoriesConfig>["components"];

export const config: Config<
  StyledProps,
  RootProps,
  keyof typeof categoriesConfig
> = {
  ...rawConfig,
  components: styledComponents,
};

export default config;
