"use client";

import { scrollToTarget } from "@/lib/scroll";

export default function Logo({
  size = "md",
  className = "",
  onClick,
}: {
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  stacked?: boolean;
  onClick?: () => void;
}) {
  const heights = {
    xs: 46,
    sm: 72,
    md: 96,
    lg: 140,
  };

  const h = heights[size];

  return (
    <a
      href="#home"
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
        scrollToTarget(0, 0);
      }}
      aria-label="NS2LLC Roadside Assistance — Home"
      className={`inline-flex items-center transition-opacity duration-300 hover:opacity-85 ${className}`}
    >
      <img
        src="/logo.png"
        alt="NS2LLC Roadside Assistance logo"
        height={h}
        style={{ height: `${h}px`, width: "auto", display: "block" }}
        className="object-contain"
      />
    </a>
  );
}
