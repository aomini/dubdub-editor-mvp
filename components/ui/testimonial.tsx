import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export type TestimonialProps = {
  quote: string;
  authorName: string;
  authorRole: string;
  avatarSrc: string;
  rating: 1 | 2 | 3 | 4 | 5;
  className?: string;
};

export function Testimonial({
  quote,
  authorName,
  authorRole,
  avatarSrc,
  rating,
  className,
}: TestimonialProps) {
  return (
    <div
      data-slot="testimonial"
      className={cn(
        "rounded-lg border border-border bg-card text-card-foreground p-6 flex flex-col gap-4",
        className,
      )}
    >
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-muted text-muted"
            }
          />
        ))}
      </div>
      <p className="text-sm leading-relaxed text-foreground">"{quote}"</p>
      <div className="flex items-center gap-3 mt-auto">
        {avatarSrc && (
          <img
            src={avatarSrc}
            alt={authorName}
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
        <div>
          <p className="text-sm font-semibold">{authorName}</p>
          {authorRole && (
            <p className="text-xs text-muted-foreground">{authorRole}</p>
          )}
        </div>
      </div>
    </div>
  );
}
