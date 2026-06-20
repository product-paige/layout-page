"use client";

import { useEffect, useRef } from "react";

/**
 * Scaled live preview thumbnail. Mirrors the source's scaleThumbs():
 * the inner canvas is rendered at 1100px wide and scaled to fit the
 * thumbnail width, then cropped by the fixed-height overflow-hidden frame.
 */
export default function LayoutThumb({
  styleSystem,
  html,
}: {
  styleSystem: string;
  html: string;
}) {
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    const frame = inner.parentElement;
    if (!frame) return;

    const scale = () => {
      inner.style.transform = `scale(${frame.clientWidth / 1100})`;
    };
    scale();
    window.addEventListener("resize", scale);
    return () => window.removeEventListener("resize", scale);
  }, []);

  return (
    <div className="thumb">
      <div
        ref={innerRef}
        className="thumb-inner sx-canvas"
        data-system={styleSystem}
        data-mode="neutral"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
