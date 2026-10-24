import type { Figure as FigureData } from "../../data/projects";
import { asset } from "../../utils/assets";

interface FigureProps {
  figure: FigureData;
  className?: string;
  /** Load immediately (above the fold). */
  eager?: boolean;
  /** Override the caption, e.g. to show a shorter one in an index. */
  caption?: string | null;
}

export function Figure({ figure, className = "", eager = false, caption }: FigureProps) {
  const text = caption === undefined ? figure.caption : caption;
  const ratio = figure.height / figure.width;
  const portrait = ratio > 1.15;
  const square = ratio >= 0.85 && ratio <= 1.15;
  const classes = [
    "figure",
    figure.plate ? "figure--plate" : "",
    portrait ? "figure--portrait" : "",
    square ? "figure--square" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <figure className={classes}>
      <div className="figure__media" style={{ aspectRatio: `${figure.width} / ${figure.height}` }}>
        {figure.kind === "video" ? (
          <video
            controls
            playsInline
            preload="none"
            poster={figure.poster ? asset(figure.poster) : undefined}
            width={figure.width}
            height={figure.height}
            aria-label={figure.alt}
          >
            <source src={asset(figure.src)} type="video/mp4" />
            <a href={asset(figure.src)}>Download the video</a>
          </video>
        ) : (
          <img
            src={asset(figure.src)}
            alt={figure.alt}
            width={figure.width}
            height={figure.height}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
          />
        )}
      </div>
      {text && <figcaption>{text}</figcaption>}
    </figure>
  );
}
