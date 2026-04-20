"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type PdpVariantSelectorProps = {
  colorLabel: string;
  colors: { name: string; hex: string }[];
  sizeLabel: string;
  sizes: { label: string; available: boolean }[];
  showSizeGuide: boolean;
  className?: string;
};

export function PdpVariantSelector({
  colorLabel,
  colors,
  sizeLabel,
  sizes,
  showSizeGuide,
  className,
}: PdpVariantSelectorProps) {
  const [selectedColor, setSelectedColor] = React.useState(0);
  const [selectedSize, setSelectedSize] = React.useState<number | null>(null);

  const safeColors = colors?.length ? colors : [];
  const safeSizes = sizes?.length ? sizes : [];

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {safeColors.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">
            {colorLabel}:{" "}
            <span className="font-normal text-muted-foreground">
              {safeColors[selectedColor]?.name}
            </span>
          </p>
          <div className="flex gap-2 flex-wrap">
            {safeColors.map((color, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedColor(i)}
                title={color.name}
                className={cn(
                  "w-8 h-8 rounded-full border-2 transition-all",
                  selectedColor === i ? "border-foreground ring-2 ring-offset-2 ring-foreground/30" : "border-transparent",
                )}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>
      )}

      {safeSizes.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{sizeLabel}</p>
            {showSizeGuide && (
              <button className="text-xs text-primary underline underline-offset-2">Size guide</button>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            {safeSizes.map((size, i) => (
              <motion.button
                key={i}
                whileHover={size.available ? { scale: 1.05 } : {}}
                whileTap={size.available ? { scale: 0.95 } : {}}
                onClick={() => size.available && setSelectedSize(i)}
                className={cn(
                  "min-w-[3rem] px-3 py-2 text-sm font-medium rounded-lg border transition-colors",
                  !size.available && "opacity-40 cursor-not-allowed line-through",
                  selectedSize === i
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-foreground border-border hover:border-foreground",
                )}
              >
                {size.label}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
