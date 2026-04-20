"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

function useCountdown(targetDate: string) {
  const calculate = () => {
    const diff = new Date(targetDate).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };

  const [time, setTime] = React.useState(calculate);

  React.useEffect(() => {
    const id = setInterval(() => setTime(calculate()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return time;
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="bg-white/15 backdrop-blur rounded-lg px-3 py-2 min-w-[52px] text-center">
        <span className="text-2xl font-bold tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-wider opacity-70">{label}</span>
    </div>
  );
}

export type CountdownBannerProps = {
  headline: string;
  subline: string;
  ctaLabel: string;
  ctaHref: string;
  targetDate: string;
  bgColor: string;
  textColor: string;
  className?: string;
};

export function CountdownBanner({
  headline,
  subline,
  ctaLabel,
  ctaHref,
  targetDate,
  bgColor,
  textColor,
  className,
}: CountdownBannerProps) {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  return (
    <div
      data-slot="countdown-banner"
      className={cn(
        "w-full flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-10 rounded-2xl",
        className,
      )}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="flex flex-col gap-1 text-center md:text-left">
        <h2 className="text-2xl font-bold leading-snug">{headline}</h2>
        {subline && <p className="text-sm opacity-80">{subline}</p>}
      </div>

      <div className="flex gap-3">
        <Digit value={days} label="Days" />
        <span className="text-2xl font-bold self-start mt-2 opacity-60">:</span>
        <Digit value={hours} label="Hours" />
        <span className="text-2xl font-bold self-start mt-2 opacity-60">:</span>
        <Digit value={minutes} label="Mins" />
        <span className="text-2xl font-bold self-start mt-2 opacity-60">:</span>
        <Digit value={seconds} label="Secs" />
      </div>

      {ctaLabel && (
        <a href={ctaHref || "#"}>
          <Button variant="secondary" size="lg">
            {ctaLabel}
          </Button>
        </a>
      )}
    </div>
  );
}
