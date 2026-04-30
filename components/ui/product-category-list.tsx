"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export type ProductCategoryListProduct = {
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
};

export type ProductCategoryListCategory = {
  label: string;
};

export type ProductCategoryListProps = {
  sectionTitle: string;
  sectionSubtitle: string;
  viewAllLabel: string;
  viewAllHref: string;
  columns: 2 | 3 | 4;
  categories: ProductCategoryListCategory[];
  products: ProductCategoryListProduct[];
  className?: string;
};

const colMap = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
};

const badgeStyles: Record<string, string> = {
  sale: "bg-red-500 text-white",
  new: "bg-emerald-500 text-white",
  hot: "bg-orange-500 text-white",
  soldout: "bg-slate-400 text-white",
  none: "hidden",
};

function ProductItem({ product }: { product: ProductCategoryListProduct }) {
  return (
    <a
      href={product.href || "#"}
      className="group rounded-xl border border-border bg-card overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.imageSrc || "https://placehold.co/400x300"}
          alt={product.imageAlt}
          className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && product.badgeVariant !== "none" && (
          <span
            className={cn(
              "absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-md leading-none",
              badgeStyles[product.badgeVariant] ?? badgeStyles.new,
            )}
          >
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <p className="font-semibold text-sm leading-snug line-clamp-2 text-card-foreground">
          {product.title}
        </p>
        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-base font-bold text-foreground">{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">{product.originalPrice}</span>
            )}
          </div>
          <Button size="sm" className="shrink-0" onClick={(e) => e.preventDefault()}>
            {product.ctaLabel}
          </Button>
        </div>
      </div>
    </a>
  );
}

export function ProductCategoryList({
  sectionTitle,
  sectionSubtitle,
  viewAllLabel,
  viewAllHref,
  columns,
  categories,
  products,
  className,
}: ProductCategoryListProps) {
  const firstCategory = categories[0]?.label ?? "";
  const [activeCategory, setActiveCategory] = React.useState(firstCategory);

  const visibleProducts = products.filter((p) => p.category === activeCategory);

  return (
    <div data-slot="product-category-list" className={cn("w-full flex flex-col gap-6", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          {sectionTitle && (
            <h2 className="text-2xl font-bold text-foreground">{sectionTitle}</h2>
          )}
          {sectionSubtitle && (
            <p className="text-sm text-muted-foreground">{sectionSubtitle}</p>
          )}
        </div>
        {viewAllLabel && (
          <a
            href={viewAllHref || "#"}
            className="shrink-0 text-sm font-medium text-primary hover:underline underline-offset-2 mt-1"
          >
            {viewAllLabel} →
          </a>
        )}
      </div>

      {categories.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              className={cn(
                "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200",
                activeCategory === cat.label
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {visibleProducts.length > 0 ? (
        <div className={cn("grid gap-4", colMap[columns])}>
          {visibleProducts.map((product, i) => (
            <ProductItem key={i} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground py-8 text-center">
          No products in this category.
        </p>
      )}
    </div>
  );
}
