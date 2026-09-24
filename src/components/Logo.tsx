"use client";

import { scrollToTarget } from "@/lib/scroll";

export default function Logo({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
  stacked?: boolean;
}) {
  const heights = {
    sm: 80,
    md: 110,
    lg: 160,
  };

  const h = heights[size];

  return (
    <a
      href="#home"
      onClick={(e) => {
        e.preventDefault();
        scrollToTarget(0, 0);
      }}
      aria-label="NS2LLC Roadside Assistance — Home"
      className={`inline-flex items-center transition-opacity duration-300 hover:opacity-85 ${className}`}
    >
      <img
        src="/logo.png"
        alt="NS2LLC Roadside Assistance logo"
        height={h}
        style={{ height: h, width: "auto", display: "block" }}
        className="object-contain"
      />
    </a>
  );
}
