"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export type SpotlightCardProps = {
  eyebrow?: string;
  title: string;
  description: string;
  icon?: string;
  ctaLabel?: string;
  spotlightColor?: string;
  borderGlow?: boolean;
  className?: string;
};

export function SpotlightCard({
  eyebrow,
  title,
  description,
  icon,
  ctaLabel,
  spotlightColor = "#6366f1",
  borderGlow = true,
  className,
}: SpotlightCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const spotlightStyle: React.CSSProperties = {
    background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}22, transparent 60%)`,
    opacity: isHovered ? 1 : 0,
    transition: "opacity 0.3s ease",
  };

  const borderStyle: React.CSSProperties = borderGlow
    ? {
        background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}66, transparent 50%)`,
        opacity: isHovered ? 1 : 0,
        transition: "opacity 0.3s ease",
      }
    : {};

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative rounded-xl p-px overflow-hidden cursor-default select-none",
        "transition-transform duration-300 ease-out",
        isHovered && "scale-[1.02]",
        className,
      )}
    >
      {/* animated border gradient */}
      {borderGlow && (
        <div
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={borderStyle}
        />
      )}

      {/* static border underneath */}
      <div className="absolute inset-0 rounded-xl bg-border" />

      {/* card body */}
      <div className="relative rounded-[11px] bg-card overflow-hidden">
        {/* spotlight overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={spotlightStyle}
        />

        <div className="relative z-10 p-6 flex flex-col gap-4">
          {icon && (
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-transform duration-300 ease-out"
              style={{
                background: `${spotlightColor}18`,
                transform: isHovered ? "scale(1.1) rotate(-3deg)" : "scale(1) rotate(0deg)",
              }}
            >
              {icon}
            </div>
          )}

          <div className="flex flex-col gap-1">
            {eyebrow && (
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: spotlightColor }}
              >
                {eyebrow}
              </p>
            )}
            <h3 className="text-lg font-bold text-card-foreground leading-tight">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          {ctaLabel && (
            <Button
              variant="outline"
              size="sm"
              className="self-start transition-all duration-200"
              style={
                isHovered
                  ? { borderColor: spotlightColor, color: spotlightColor }
                  : {}
              }
            >
              {ctaLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
