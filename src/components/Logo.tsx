"use client";

import { scrollToTarget } from "@/lib/scroll";

export default function Logo({
  size = "header",
  className = "",
  onClick,
}: {
  size?: "xs" | "sm" | "md" | "lg" | "header";
  className?: string;
  stacked?: boolean;
  onClick?: () => void;
}) {
  const sizeClasses: Record<string, string> = {
    header: "h-11 sm:h-13 md:h-20 lg:h-24",
    xs: "h-10 sm:h-11",
    sm: "h-14 md:h-16",
    md: "h-18 md:h-24",
    lg: "h-24 md:h-32",
  };

  const imgClass = sizeClasses[size] || sizeClasses.header;

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
        className={`${imgClass} w-auto object-contain transition-all duration-300`}
      />
    </a>
  );
}
