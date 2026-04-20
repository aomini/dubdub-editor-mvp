import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export type PricingCardProps = {
  planName: string;
  price: string;
  period: string;
  features: { text: string }[];
  featured: boolean;
  ctaLabel: string;
  className?: string;
};

export function PricingCard({
  planName,
  price,
  period,
  features,
  featured,
  ctaLabel,
  className,
}: PricingCardProps) {
  return (
    <div
      data-slot="pricing-card"
      data-featured={featured}
      className={cn(
        "rounded-lg border p-6 flex flex-col gap-6",
        featured
          ? "border-primary bg-primary text-primary-foreground shadow-lg"
          : "border-border bg-card text-card-foreground",
        className,
      )}
    >
      <div>
        <p
          className={cn(
            "text-sm font-semibold uppercase tracking-wide",
            featured ? "text-primary-foreground/80" : "text-muted-foreground",
          )}
        >
          {planName}
        </p>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-4xl font-bold">{price}</span>
          {period && (
            <span
              className={cn(
                "text-sm",
                featured ? "text-primary-foreground/70" : "text-muted-foreground",
              )}
            >
              /{period}
            </span>
          )}
        </div>
      </div>
      <ul className="flex flex-col gap-3 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            <Check
              size={16}
              className={cn(
                "shrink-0",
                featured ? "text-primary-foreground" : "text-primary",
              )}
            />
            {f.text}
          </li>
        ))}
      </ul>
      <Button
        variant={featured ? "secondary" : "default"}
        className="w-full"
      >
        {ctaLabel}
      </Button>
    </div>
  );
}
