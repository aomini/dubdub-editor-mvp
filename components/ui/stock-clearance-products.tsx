import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export type ClearanceProduct = {
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
};

export type StockClearanceProductsProps = {
  sectionTitle: string;
  sectionSubtitle: string;
  columns: 2 | 3 | 4;
  products: ClearanceProduct[];
  className?: string;
};

const colMap = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
};

function StockBar({ stockLeft, maxStock }: { stockLeft: number; maxStock: number }) {
  const pct = maxStock > 0 ? Math.min(100, Math.round((stockLeft / maxStock) * 100)) : 0;
  const urgency = pct <= 20 ? "bg-red-500" : pct <= 50 ? "bg-amber-500" : "bg-emerald-500";
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {stockLeft <= 5 ? (
            <span className="font-semibold text-red-600">Only {stockLeft} left!</span>
          ) : (
            <span>{stockLeft} items left</span>
          )}
        </span>
        <span className="text-xs text-muted-foreground">{pct}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", urgency)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function ClearanceCard({ product }: { product: ClearanceProduct }) {
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
        {product.discountPercent > 0 && (
          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md leading-none">
            -{product.discountPercent}%
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col gap-3 flex-1">
        <p className="font-semibold text-sm leading-snug line-clamp-2 text-card-foreground">
          {product.title}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-red-600">{product.salePrice}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
          )}
        </div>
        {product.maxStock > 0 && (
          <StockBar stockLeft={product.stockLeft} maxStock={product.maxStock} />
        )}
        <Button
          variant="destructive"
          className="w-full mt-auto"
          onClick={(e) => e.preventDefault()}
        >
          {product.ctaLabel}
        </Button>
      </div>
    </a>
  );
}

export function StockClearanceProducts({
  sectionTitle,
  sectionSubtitle,
  columns,
  products,
  className,
}: StockClearanceProductsProps) {
  return (
    <div data-slot="stock-clearance-products" className={cn("w-full flex flex-col gap-6", className)}>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          {sectionTitle && (
            <h2 className="text-2xl font-bold text-foreground">{sectionTitle}</h2>
          )}
        </div>
        {sectionSubtitle && (
          <p className="text-sm text-muted-foreground">{sectionSubtitle}</p>
        )}
      </div>
      <div className={cn("grid gap-4", colMap[columns])}>
        {products.map((product, i) => (
          <ClearanceCard key={i} product={product} />
        ))}
      </div>
    </div>
  );
}
