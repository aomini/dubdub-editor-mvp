import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const announcementVariants = cva(
  "w-full py-2 px-4 text-sm text-center font-medium",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground",
        primary: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-white",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

export type AnnouncementBarProps = {
  text: string;
  linkLabel: string;
  linkHref: string;
  variant: "default" | "primary" | "destructive";
  className?: string;
};

export function AnnouncementBar({
  text,
  linkLabel,
  linkHref,
  variant,
  className,
}: AnnouncementBarProps) {
  return (
    <div
      data-slot="announcement-bar"
      className={cn(announcementVariants({ variant }), className)}
    >
      {text}
      {linkLabel && (
        <a
          href={linkHref || "#"}
          className="ml-2 underline underline-offset-2 font-semibold hover:opacity-80"
        >
          {linkLabel}
        </a>
      )}
    </div>
  );
}
