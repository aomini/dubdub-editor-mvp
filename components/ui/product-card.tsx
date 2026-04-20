import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "./button";

const badgeVariants = cva(
  "absolute top-2 left-2 px-2 py-0.5 text-xs font-semibold rounded-sm",
  {
    variants: {
      variant: {
        sale: "bg-destructive text-white",
        new: "bg-primary text-primary-foreground",
        hot: "bg-orange-500 text-white",
        soldout: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { variant: "new" },
  },
);

export type ProductCardProps = {
  imageSrc: string;
  imageAlt: string;
  badge: string;
  badgeVariant: "sale" | "new" | "hot" | "soldout";
  title: string;
  description: string;
  price: string;
  originalPrice: string;
  ctaLabel: string;
  className?: string;
};

export function ProductCard({
  imageSrc,
  imageAlt,
  badge,
  badgeVariant,
  title,
  description,
  price,
  originalPrice,
  ctaLabel,
  className,
}: ProductCardProps) {
  return (
    <div
      data-slot="product-card"
      className={cn(
        "rounded-lg border border-border bg-card text-card-foreground overflow-hidden flex flex-col",
        className,
      )}
    >
      <div className="relative">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-48 object-cover"
        />
        {badge && (
          <span className={badgeVariants({ variant: badgeVariant })}>
            {badge}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <a href="/products" className="font-semibold text-base leading-tight hover:underline">{title}</a>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        <div className="flex items-baseline gap-2 mt-auto pt-2">
          <span className="text-lg font-bold">{price}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {originalPrice}
            </span>
          )}
        </div>
        <Button className="w-full mt-2">{ctaLabel}</Button>
      </div>
    </div>
  );
}
