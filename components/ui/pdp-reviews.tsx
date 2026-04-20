"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Review = {
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
};

export type PdpReviewsProps = {
  heading: string;
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
  accentColor: string;
  className?: string;
};

function StarRow({ rating, color }: { rating: number; color: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4"
          fill={i < Math.round(rating) ? color : "#e5e7eb"}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function PdpReviews({
  heading,
  averageRating,
  totalReviews,
  reviews,
  accentColor,
  className,
}: PdpReviewsProps) {
  const safeReviews = reviews?.length ? reviews : [];
  const color = accentColor || "#facc15";

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex items-end gap-4 flex-wrap">
        <h2 className="text-2xl font-bold">{heading}</h2>
        <div className="flex items-center gap-2 mb-0.5">
          <StarRow rating={averageRating} color={color} />
          <span className="text-sm text-muted-foreground">
            {averageRating.toFixed(1)} · {totalReviews.toLocaleString()} reviews
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {safeReviews.map((review, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.06, duration: 0.35, ease: "easeOut" }}
            className="p-5 rounded-xl border border-border bg-card flex flex-col gap-2"
          >
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: accentColor || "#6366f1" }}
                >
                  {review.author?.[0]?.toUpperCase() ?? "?"}
                </div>
                <div>
                  <p className="text-sm font-semibold leading-none">{review.author}</p>
                  {review.verified && (
                    <p className="text-xs text-green-600 mt-0.5">Verified purchase</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StarRow rating={review.rating} color={color} />
                {review.date && (
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                )}
              </div>
            </div>
            {review.title && (
              <p className="font-semibold text-sm">{review.title}</p>
            )}
            <p className="text-sm text-muted-foreground leading-relaxed">{review.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
