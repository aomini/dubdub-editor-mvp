import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export type HeroBannerProps = {
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
  className?: string;
};

export function HeroBanner({
  title,
  subtitle,
  description,
  bgColor,
  imageSrc,
  imageAlt,
  ctaLabel,
  ctaHref,
  align,
  minHeight,
  className,
}: HeroBannerProps) {
  const alignClass = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  }[align];

  return (
    <div
      data-slot="hero-banner"
      className={cn("relative w-full overflow-hidden", className)}
      style={{ minHeight, backgroundColor: bgColor || undefined }}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {imageSrc && (
        <div className="absolute inset-0 bg-black/40" />
      )}
      <div
        className={cn(
          "relative z-10 flex flex-col gap-4 px-8 py-16",
          alignClass,
          imageSrc ? "text-white" : "text-foreground",
        )}
      >
        {subtitle && (
          <p className="text-sm font-semibold uppercase tracking-widest opacity-80">
            {subtitle}
          </p>
        )}
        <h1 className="text-4xl font-bold leading-tight max-w-2xl">{title}</h1>
        {description && (
          <p className="text-base opacity-90 max-w-xl">{description}</p>
        )}
        {ctaLabel && (
          <a href={ctaHref || "#"}>
            <Button size="lg">{ctaLabel}</Button>
          </a>
        )}
      </div>
    </div>
  );
}
