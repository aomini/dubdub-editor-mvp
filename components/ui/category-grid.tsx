import * as React from "react";
import { cn } from "@/lib/utils";

export type CategoryItem = {
  imageSrc: string;
  label: string;
  href: string;
};

export type CategoryGridProps = {
  title: string;
  subtitle: string;
  categories: CategoryItem[];
  columns: 2 | 3 | 4;
  aspectRatio: "square" | "portrait" | "landscape";
  className?: string;
};

const aspectMap = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
};

const colMap = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
};

export function CategoryGrid({
  title,
  subtitle,
  categories,
  columns,
  aspectRatio,
  className,
}: CategoryGridProps) {
  return (
    <div data-slot="category-grid" className={cn("w-full flex flex-col gap-6", className)}>
      {(title || subtitle) && (
        <div className="flex flex-col gap-1">
          {title && <h2 className="text-2xl font-bold text-foreground">{title}</h2>}
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      )}
      <div className={cn("grid gap-4", colMap[columns])}>
        {categories.map((cat, i) => (
          <a
            key={i}
            href={cat.href || "#"}
            className="group relative overflow-hidden rounded-xl block"
          >
            <div className={cn("relative w-full overflow-hidden", aspectMap[aspectRatio])}>
              <img
                src={cat.imageSrc || "https://placehold.co/400x400"}
                alt={cat.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold text-base leading-tight">{cat.label}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
