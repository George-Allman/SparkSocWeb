import { useRef, useState } from "react";
import React from "react";

const LINKS = ["Home", "About", "Events", "Sponsors", "Contact"];

export default function NavLinks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [style, setStyle] = useState<{ left: number; width: number } | null>(
    null,
  );
  const [visible, setVisible] = useState(false);

  const handleEnter = (index: number) => {
    const link = linkRefs.current[index];
    const container = containerRef.current;
    if (!link || !container) return;

    const linkRect = link.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    setStyle({
      left: linkRect.left - containerRect.left,
      width: linkRect.width,
    });
    setVisible(true);
  };

  const handleLeave = () => {
    setVisible(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex gap-12 p-5 text-text"
      onMouseLeave={handleLeave}>
      {LINKS.map((label, i) => (
        <a
          key={label}
          ref={(el) => {
            linkRefs.current[i] = el;
          }}
          href={`#${label.toLowerCase()}`}
          onMouseEnter={() => handleEnter(i)}
          className="relative py-1 text-text-h text-base transition-colors">
          {label}
        </a>
      ))}

      {/* sliding underline */}
      <div
        className="absolute bottom-4 h-[2px] bg-accent transition-all duration-300 ease-out origin-center"
        style={{
          left: style?.left ?? 0,
          width: style?.width ?? 0,
          transform: visible ? "scaleX(1)" : "scaleX(0)",
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
}
