"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { ArrowRightIcon } from "./icons";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  ariaLabel?: string;
};

/** Capsule button with a coral circular arrow; subtle magnetic hover. */
export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  icon,
  className = "",
  onClick,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const sizes = {
    sm: "h-11 pl-4 pr-1.5 text-[13px] gap-2.5",
    md: "h-[54px] pl-6 pr-2 text-[14.5px] gap-3",
    lg: "h-[62px] pl-7 pr-2 text-[16px] gap-3.5",
  }[size];
  const dot = { sm: "h-8 w-8", md: "h-10 w-10", lg: "h-12 w-12" }[size];

  const variants = {
    primary: "bg-teal-700 text-white hover:bg-teal-800 shadow-teal",
    secondary: "bg-white text-ink border border-teal-700/40 hover:border-teal-700 shadow-soft",
    light: "bg-white/85 text-ink backdrop-blur border border-white/60 shadow-soft hover:bg-white",
  }[variant];

  const dotVariants = {
    primary: "bg-coral text-white group-hover:bg-coral-600",
    secondary: "bg-teal-700 text-white group-hover:bg-coral",
    light: "bg-teal-700 text-white group-hover:bg-coral",
  }[variant];

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current || prefersReducedMotion()) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    gsap.to(ref.current, { x: x * 0.18, y: y * 0.28, duration: 0.6, ease: "power3.out" });
  };
  const onLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.5)" });
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      aria-label={ariaLabel}
      className={`group relative inline-flex items-center justify-between rounded-full font-bold tracking-wide transition-[background-color,border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:scale-[1.02] hover:shadow-lift active:scale-[0.99] ${sizes} ${variants} ${className}`}
    >
      <span className="inline-flex items-center gap-2.5 whitespace-nowrap">
        {icon}
        {children}
      </span>
      <span
        className={`grid ${dot} shrink-0 place-items-center rounded-full transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110 ${dotVariants}`}
      >
        <ArrowRightIcon className="h-[45%] w-[45%] transition-transform duration-500 group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}
