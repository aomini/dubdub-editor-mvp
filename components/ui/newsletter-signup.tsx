import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export type NewsletterSignupProps = {
  eyebrow: string;
  title: string;
  description: string;
  placeholder: string;
  ctaLabel: string;
  disclaimer: string;
  bgColor: string;
  accentColor: string;
  align: "left" | "center";
  className?: string;
};

export function NewsletterSignup({
  eyebrow,
  title,
  description,
  placeholder,
  ctaLabel,
  disclaimer,
  bgColor,
  accentColor,
  align,
  className,
}: NewsletterSignupProps) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div
      data-slot="newsletter-signup"
      className={cn("w-full rounded-2xl px-8 py-14", className)}
      style={{ backgroundColor: bgColor }}
    >
      <div className={cn("flex flex-col gap-4 max-w-xl mx-auto", alignClass)}>
        {eyebrow && (
          <p
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: accentColor }}
          >
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl font-bold text-foreground leading-tight">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        )}
        <form
          className="flex w-full max-w-md gap-2 mt-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder={placeholder}
            className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-offset-1"
            style={{ "--tw-ring-color": accentColor } as React.CSSProperties}
          />
          <Button type="submit" style={{ backgroundColor: accentColor, border: "none" }}>
            {ctaLabel}
          </Button>
        </form>
        {disclaimer && (
          <p className="text-xs text-muted-foreground">{disclaimer}</p>
        )}
      </div>
    </div>
  );
}
