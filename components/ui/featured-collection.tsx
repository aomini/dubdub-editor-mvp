import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export type FeaturedCollectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
  layout: "image-left" | "image-right";
  accentColor: string;
  className?: string;
};

export function FeaturedCollection({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
  layout,
  accentColor,
  className,
}: FeaturedCollectionProps) {
  const isImageLeft = layout === "image-left";

  return (
    <div
      data-slot="featured-collection"
      className={cn(
        "flex flex-col md:flex-row items-stretch min-h-[480px] overflow-hidden rounded-2xl",
        isImageLeft ? "md:flex-row" : "md:flex-row-reverse",
        className,
      )}
    >
      <div className="relative flex-1 min-h-[280px]">
        <img
          src={imageSrc || "https://placehold.co/800x600"}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div
        className="flex-1 flex flex-col justify-center gap-5 px-10 py-14 bg-card"
        style={{ borderLeft: isImageLeft ? `4px solid ${accentColor}` : undefined, borderRight: !isImageLeft ? `4px solid ${accentColor}` : undefined }}
      >
        {eyebrow && (
          <p
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: accentColor }}
          >
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl font-bold leading-tight text-foreground">{title}</h2>
        {description && (
          <p className="text-base text-muted-foreground leading-relaxed max-w-md">{description}</p>
        )}
        {ctaLabel && (
          <div>
            <a href={ctaHref || "#"}>
              <Button size="lg" style={{ backgroundColor: accentColor, border: "none" }}>
                {ctaLabel}
              </Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
