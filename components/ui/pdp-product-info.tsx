"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type PdpProductInfoProps = {
  brand: string;
  title: string;
  price: string;
  originalPrice: string;
  badge: string;
  badgeColor: string;
  rating: number;
  reviewCount: number;
  description: string;
  sku: string;
  className?: string;
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { ease: "easeOut" as const, duration: 0.35 } },
};

export function PdpProductInfo({
  brand,
  title,
  price,
  originalPrice,
  badge,
  badgeColor,
  rating,
  reviewCount,
  description,
  sku,
  className,
}: PdpProductInfoProps) {
  const discount =
    originalPrice && price
      ? Math.round(
          (1 - parseFloat(price.replace(/[^0-9.]/g, "")) / parseFloat(originalPrice.replace(/[^0-9.]/g, ""))) * 100,
        )
      : 0;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={cn("flex flex-col gap-4", className)}
    >
      {brand && (
        <motion.p variants={item} className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          {brand}
        </motion.p>
      )}

      <motion.h1 variants={item} className="text-3xl font-bold leading-tight">
        {title}
      </motion.h1>

      <motion.div variants={item} className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={cn("w-4 h-4", i < Math.round(rating) ? "text-yellow-400" : "text-muted")}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        {reviewCount > 0 && (
          <span className="text-sm text-muted-foreground">{reviewCount.toLocaleString()} reviews</span>
        )}
        {badge && (
          <span
            className="px-2.5 py-0.5 text-xs font-semibold rounded-full text-white"
            style={{ backgroundColor: badgeColor || "#6366f1" }}
          >
            {badge}
          </span>
        )}
      </motion.div>

      <motion.div variants={item} className="flex items-baseline gap-3">
        <span className="text-3xl font-bold">{price}</span>
        {originalPrice && (
          <span className="text-lg text-muted-foreground line-through">{originalPrice}</span>
        )}
        {discount > 0 && (
          <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}
      </motion.div>

      {description && (
        <motion.p variants={item} className="text-muted-foreground leading-relaxed">
          {description}
        </motion.p>
      )}

      {sku && (
        <motion.p variants={item} className="text-xs text-muted-foreground">
          SKU: {sku}
        </motion.p>
      )}
    </motion.div>
  );
}
