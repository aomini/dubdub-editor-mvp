"use client";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type PdpImageGalleryProps = {
  images: { src: string; alt: string }[];
  aspectRatio: "square" | "portrait" | "landscape";
  enableZoom: boolean;
  className?: string;
};

export function PdpImageGallery({
  images,
  aspectRatio,
  enableZoom,
  className,
}: PdpImageGalleryProps) {
  const [selected, setSelected] = React.useState(0);
  const [zoomed, setZoomed] = React.useState(false);
  const [mousePos, setMousePos] = React.useState({ x: 50, y: 50 });

  const aspectClass = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  }[aspectRatio];

  const safeImages = images?.length ? images : [{ src: "https://placehold.co/800x800", alt: "Product" }];
  const current = safeImages[selected] ?? safeImages[0];

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!enableZoom) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div
        className={cn("relative overflow-hidden rounded-xl bg-muted cursor-zoom-in", aspectClass)}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => enableZoom && setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={selected}
            src={current.src}
            alt={current.alt}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full h-full object-cover"
            style={
              zoomed && enableZoom
                ? {
                    transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                    scale: 1.8,
                    transition: "transform 0.1s ease-out",
                  }
                : undefined
            }
          />
        </AnimatePresence>
      </div>

      {safeImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {safeImages.map((img, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelected(i)}
              className={cn(
                "relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors",
                selected === i ? "border-primary" : "border-transparent",
              )}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
