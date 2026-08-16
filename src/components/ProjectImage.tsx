import { useState } from "react";
import { Monitor } from "lucide-react";

type ProjectImageProps = {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  accent?: string;
};

/**
 * Project preview image, lazy-loaded. If the real screenshot isn't available
 * yet, it falls back to an elegant branded placeholder so the card never
 * renders a broken image. Drop your screenshots in /public/projects and update
 * the `image` field in the data file — the fallback disappears automatically.
 */
export default function ProjectImage({
  src,
  alt,
  title,
  subtitle,
  accent = "#B7FF3C",
}: ProjectImageProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const showFallback = error || !src;

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Branded placeholder */}
      {showFallback && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[linear-gradient(135deg,#111111_0%,#F7F7F4_45%,#111111_100%)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(183,255,60,0.18),transparent_55%)]"
          />
          <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
          <div
            className="flex h-16 w-16 items-center justify-center rounded-[6px] border-2 border-black bg-surface shadow-card"
            style={{ color: accent }}
          >
            <Monitor className="h-8 w-8" />
          </div>
          <div className="relative px-6 text-center">
            <div className="text-lg font-semibold text-ink">{title}</div>
            <div className="mt-1 text-sm text-ink/50">{subtitle}</div>
          </div>
          <span className="relative mt-1 rounded-full border-2 border-black px-3 py-1 text-[10px] uppercase tracking-widest text-ink/40">
            Screenshot coming soon
          </span>
        </div>
      )}

      {/* Real image */}
      {!showFallback && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`h-full w-full object-cover transition-all duration-700 ease-out ${
            loaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
          }`}
        />
      )}
    </div>
  );
}
