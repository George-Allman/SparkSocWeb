import React from "react";

interface UnderlineHeaderProps {
  title: string;
}

export default function UnderlineHeader({ title }: UnderlineHeaderProps) {
  return (
    <h1
      className="text-h text-lg"
      style={{
        position: "relative",
        display: "inline-block",
        margin: 0,
      }}>
      {/* underline bar */}
      <span
        className="bg-accent"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "0.15em",
          height: "0.07em",
          zIndex: 0,
        }}
      />
      {/* knockout clone: punches a gap in the bar wherever a descender crosses it */}
      <span
        aria-hidden="true"
        className="text-bg"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          WebkitTextStroke: "13px var(--bg)",
          paintOrder: "stroke fill",
        }}>
        {title}
      </span>
      {/* visible text on top */}
      <span style={{ position: "relative", zIndex: 2 }}>{title}</span>
    </h1>
  );
}
