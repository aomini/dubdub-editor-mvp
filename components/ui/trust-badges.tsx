import * as React from "react";
import { cn } from "@/lib/utils";

export type TrustBadge = {
  icon: string;
  title: string;
  subtitle: string;
};

export type TrustBadgesProps = {
  badges: TrustBadge[];
  layout: "row" | "grid";
  showDividers: boolean;
  className?: string;
};

export function TrustBadges({ badges, layout, showDividers, className }: TrustBadgesProps) {
  return (
    <div
      data-slot="trust-badges"
      className={cn(
        layout === "row"
          ? "flex flex-wrap justify-center gap-0"
          : "grid grid-cols-2 md:grid-cols-4 gap-0",
        "border border-border rounded-2xl overflow-hidden bg-card",
        className,
      )}
    >
      {badges.map((badge, i) => (
        <div
          key={i}
          className={cn(
            "flex flex-col items-center gap-2 px-6 py-8 text-center flex-1",
            showDividers && i < badges.length - 1 && "border-r border-border",
          )}
        >
          <span className="text-3xl">{badge.icon}</span>
          <p className="font-semibold text-sm text-foreground">{badge.title}</p>
          {badge.subtitle && (
            <p className="text-xs text-muted-foreground leading-snug">{badge.subtitle}</p>
          )}
        </div>
      ))}
    </div>
  );
}
