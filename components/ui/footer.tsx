import * as React from "react";
import { cn } from "@/lib/utils";

const SOCIAL_LABELS: Record<string, string> = {
  instagram: "IG",
  twitter: "𝕏",
  facebook: "FB",
  youtube: "YT",
  github: "GH",
  linkedin: "LI",
};

export type FooterColumn = {
  heading: string;
  links: { label: string; href: string }[];
};

export type FooterSocialLink = {
  platform: "instagram" | "twitter" | "facebook" | "youtube" | "github" | "linkedin";
  href: string;
};

export type FooterProps = {
  brandName: string;
  tagline: string;
  columns: FooterColumn[];
  socialLinks: FooterSocialLink[];
  copyrightText: string;
  bgColor: string;
  accentColor: string;
  showNewsletter: boolean;
  newsletterPlaceholder: string;
  newsletterCtaLabel: string;
  className?: string;
};

export function Footer({
  brandName,
  tagline,
  columns,
  socialLinks,
  copyrightText,
  bgColor,
  accentColor,
  showNewsletter,
  newsletterPlaceholder,
  newsletterCtaLabel,
  className,
}: FooterProps) {
  return (
    <footer
      data-slot="footer"
      className={cn("w-full", className)}
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Top row: brand + newsletter */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="flex flex-col gap-4 lg:max-w-xs">
            <span
              className="text-2xl font-bold tracking-tight"
              style={{ color: accentColor }}
            >
              {brandName}
            </span>
            {tagline && (
              <p className="text-sm leading-relaxed opacity-60 text-white">{tagline}</p>
            )}
            {socialLinks.length > 0 && (
              <div className="flex gap-3 mt-2">
                {socialLinks.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    className="w-9 h-9 rounded-full flex items-center justify-center border border-white/20 text-[11px] font-bold text-white/60 hover:text-white hover:border-white/60 transition-colors"
                    aria-label={s.platform}
                  >
                    {SOCIAL_LABELS[s.platform] ?? s.platform.slice(0, 2).toUpperCase()}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link columns */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {columns.map((col, i) => (
              <div key={i} className="flex flex-col gap-3">
                <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-white/40">
                  {col.heading}
                </h4>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a
                        href={link.href}
                        className="text-sm text-white/60 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        {showNewsletter && (
          <div className="py-10 border-b border-white/10">
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-lg"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder={newsletterPlaceholder}
                className="flex-1 rounded-lg bg-white/10 border border-white/20 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-offset-0"
                style={{ "--tw-ring-color": accentColor } as React.CSSProperties}
              />
              <button
                type="submit"
                className="shrink-0 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: accentColor }}
              >
                {newsletterCtaLabel}
              </button>
            </form>
          </div>
        )}

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">{copyrightText}</p>
          <div className="flex gap-2">
            {["visa", "mc", "amex", "paypal"].map((card) => (
              <span
                key={card}
                className="px-2 py-1 rounded border border-white/20 text-[10px] font-bold uppercase text-white/40 tracking-wide"
              >
                {card}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
