import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export type BestSellerProduct = {
  imageSrc: string;
  imageAlt: string;
  rank: number;
  title: string;
  rating: number;
  reviewCount: number;
  price: string;
  ctaLabel: string;
  href: string;
};

export type BestSellingProductsProps = {
  sectionTitle: string;
  sectionSubtitle: string;
  viewAllLabel: string;
  viewAllHref: string;
  columns: 2 | 3 | 4;
  products: BestSellerProduct[];
  className?: string;
};

const colMap = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
};

const rankColors: Record<number, string> = {
  1: "bg-yellow-400 text-yellow-900",
  2: "bg-slate-300 text-slate-700",
  3: "bg-amber-600 text-white",
};

function Stars({ rating }: { rating: number }) {
  const clamped = Math.min(5, Math.max(0, rating));
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={cn("size-3.5", i < Math.round(clamped) ? "text-yellow-400" : "text-muted-foreground/30")}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: BestSellerProduct }) {
  const rankClass = rankColors[product.rank] ?? "bg-primary/10 text-primary";
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
        <span
          className={cn(
            "absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-md leading-none",
            rankClass,
          )}
        >
          #{product.rank}
        </span>
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <p className="font-semibold text-sm leading-snug line-clamp-2 text-card-foreground">
          {product.title}
        </p>
        <div className="flex items-center gap-1.5">
          <Stars rating={product.rating} />
          {product.reviewCount > 0 && (
            <span className="text-xs text-muted-foreground">({product.reviewCount.toLocaleString()})</span>
          )}
        </div>
        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          <span className="text-base font-bold text-foreground">{product.price}</span>
          <Button size="sm" className="shrink-0" onClick={(e) => e.preventDefault()}>
            {product.ctaLabel}
          </Button>
        </div>
      </div>
    </a>
  );
}

export function BestSellingProducts({
  sectionTitle,
  sectionSubtitle,
  viewAllLabel,
  viewAllHref,
  columns,
  products,
  className,
}: BestSellingProductsProps) {
  return (
    <div data-slot="best-selling-products" className={cn("w-full flex flex-col gap-6", className)}>
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
      <div className={cn("grid gap-4", colMap[columns])}>
        {products.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </div>
    </div>
  );
}
