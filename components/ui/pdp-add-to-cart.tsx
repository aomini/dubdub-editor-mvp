"use client";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type PdpAddToCartProps = {
  ctaLabel: string;
  wishlistLabel: string;
  showWishlist: boolean;
  showQuantity: boolean;
  accentColor: string;
  stockCount: number;
  className?: string;
};

export function PdpAddToCart({
  ctaLabel,
  wishlistLabel,
  showWishlist,
  showQuantity,
  accentColor,
  stockCount,
  className,
}: PdpAddToCartProps) {
  const [qty, setQty] = React.useState(1);
  const [added, setAdded] = React.useState(false);
  const [wishlisted, setWishlisted] = React.useState(false);

  function handleAddToCart() {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {stockCount > 0 && stockCount <= 10 && (
        <motion.p
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm font-medium text-orange-500"
        >
          Only {stockCount} left in stock — order soon!
        </motion.p>
      )}

      <div className="flex items-center gap-3 flex-wrap">
        {showQuantity && (
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-10 h-10 flex items-center justify-center text-lg hover:bg-muted transition-colors"
            >
              −
            </motion.button>
            <span className="w-10 text-center text-sm font-semibold">{qty}</span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setQty((q) => q + 1)}
              className="w-10 h-10 flex items-center justify-center text-lg hover:bg-muted transition-colors"
            >
              +
            </motion.button>
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleAddToCart}
          className="flex-1 min-w-[160px] h-12 rounded-xl font-semibold text-white relative overflow-hidden"
          style={{ backgroundColor: accentColor || "#6366f1" }}
        >
          <AnimatePresence mode="wait">
            {added ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute inset-0 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Added!
              </motion.span>
            ) : (
              <motion.span
                key="cta"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {ctaLabel}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {showWishlist && (
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setWishlisted((w) => !w)}
            className="w-12 h-12 rounded-xl border border-border flex items-center justify-center"
            title={wishlistLabel}
          >
            <motion.svg
              animate={{ scale: wishlisted ? [1, 1.3, 1] : 1 }}
              transition={{ duration: 0.3 }}
              className={cn("w-5 h-5", wishlisted ? "fill-red-500 text-red-500" : "fill-none text-foreground")}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </motion.svg>
          </motion.button>
        )}
      </div>
    </div>
  );
}
