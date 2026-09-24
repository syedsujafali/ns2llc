"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { getLenis, scrollToTarget } from "@/lib/scroll";
import { NAV_LINKS, PHONE, PHONE_HREF } from "@/lib/content";
import Logo from "./Logo";
import Button from "./Button";
import { ArrowRightIcon, PhoneIcon } from "./icons";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.href.slice(1))).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion() || !headerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hdr]",
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.12, delay: 0.4, ease: "power3.out" },
      );
    }, headerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const lenis = getLenis();
    if (!overlay) return;
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      gsap
        .timeline()
        .fromTo(
          overlay,
          { clipPath: "circle(0% at calc(100% - 46px) 46px)", pointerEvents: "none" },
          { clipPath: "circle(160% at calc(100% - 46px) 46px)", pointerEvents: "auto", duration: 0.9, ease: "power4.inOut" },
        )
        .fromTo(
          overlay.querySelectorAll("[data-m-item]"),
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.07, duration: 0.7, ease: "power3.out" },
          "-=0.35",
        );
    } else {
      gsap.to(overlay, {
        clipPath: "circle(0% at calc(100% - 46px) 46px)",
        pointerEvents: "none",
        duration: 0.6,
        ease: "power3.inOut",
      });
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    setActive(href);
    href === "#home" ? scrollToTarget(0, 0) : scrollToTarget(href, -72);
  };

  return (
    <>
      {/* ─── Header bar ─── */}
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "header-scrolled py-1" : "header-default py-2 md:py-3"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 sm:px-5 md:px-8 lg:px-12">
          {/* Logo — Desktop and Mobile */}
          <div data-hdr className="flex items-center">
            <Logo
              size={scrolled ? "sm" : "md"}
              className="hidden md:inline-flex"
            />
            <Logo
              size="xs"
              className="inline-flex md:hidden"
            />
          </div>

          {/* Desktop nav pill */}
          <nav
            data-hdr
            aria-label="Primary"
            className="hidden items-center gap-1 rounded-full border border-white/50 bg-white/40 p-1.5 backdrop-blur-md md:flex"
          >
            {NAV_LINKS.map((l) => {
              const isActive = active === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); go(l.href); }}
                  className={`group relative rounded-full px-4 py-2 text-[13px] font-semibold tracking-wide transition-colors duration-300 ${
                    isActive ? "text-white" : "text-ink hover:text-teal-700"
                  }`}
                >
                  <span className={`absolute inset-0 rounded-full bg-teal-700 transition-all duration-500 ${isActive ? "scale-100 opacity-100" : "scale-75 opacity-0"}`} />
                  <span className="relative">{l.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div data-hdr className="hidden md:block">
            <Button href={PHONE_HREF} size={scrolled ? "sm" : "md"} icon={<PhoneIcon className="h-4 w-4" />}>
              {PHONE}
            </Button>
          </div>

          {/* Mobile: phone + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={PHONE_HREF}
              aria-label={`Call ${PHONE}`}
              className="grid h-10 w-10 place-items-center rounded-full bg-teal-700 text-white shadow-teal"
            >
              <PhoneIcon className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Open menu"
              className="glass grid h-10 w-10 place-items-center rounded-full shadow-soft"
            >
              <span className="relative block h-3.5 w-5">
                <span className="absolute left-0 top-0 h-[2px] w-full rounded bg-ink transition-all duration-500" />
                <span className="absolute left-0 top-1.5 h-[2px] w-full rounded bg-coral transition-all duration-300" />
                <span className="absolute left-0 top-3 h-[2px] w-full rounded bg-ink transition-all duration-500" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile overlay ─── */}
      <div
        ref={overlayRef}
        aria-hidden={!open}
        className="fixed inset-0 z-[60] flex flex-col bg-ivory px-5 pb-8 pt-5 md:hidden"
        style={{ clipPath: "circle(0% at calc(100% - 46px) 46px)", pointerEvents: "none" }}
      >
        <svg aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 w-full opacity-60" viewBox="0 0 400 400" fill="none" preserveAspectRatio="none">
          <path d="M-20 380 C 80 300, 180 420, 280 300 S 400 160, 440 200" stroke="#6d9d96" strokeWidth="1.5" />
          <path d="M-20 420 C 100 340, 200 460, 300 340 S 420 200, 460 240" stroke="#d97862" strokeWidth="1" opacity="0.6" />
        </svg>

        {/* Mobile menu top bar with Logo */}
        <div data-m-item className="relative flex items-center justify-between pb-6">
          <Logo size="xs" onClick={() => setOpen(false)} />
        </div>

        <nav className="relative flex flex-col" aria-label="Mobile">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              data-m-item
              href={l.href}
              onClick={(e) => { e.preventDefault(); go(l.href); }}
              className={`group flex items-center justify-between border-b border-sage-200 py-4 text-[28px] font-extrabold uppercase tracking-tight sm:py-5 sm:text-[34px] ${
                active === l.href ? "text-teal-700" : "text-ink"
              }`}
            >
              <span className="flex items-baseline gap-3">
                <span className="text-[11px] font-bold tracking-[0.3em] text-coral">0{i + 1}</span>
                {l.label}
              </span>
              <ArrowRightIcon className="h-5 w-5 text-teal-400 transition-transform group-hover:translate-x-1" />
            </a>
          ))}
        </nav>

        <div data-m-item className="relative mt-auto space-y-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted">24/7 Emergency Line</p>
          <Button href={PHONE_HREF} size="lg" className="w-full" icon={<PhoneIcon className="h-4.5 w-4.5" />}>
            {PHONE}
          </Button>
          <p className="text-[13px] text-muted">Serving DC, Maryland &amp; Northern Virginia.</p>
        </div>
      </div>

      {/* ─── Close button (fixed, above overlay) ─── */}
      {open && (
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="fixed right-4 top-4 z-[70] grid h-11 w-11 place-items-center rounded-full bg-teal-700 text-white shadow-teal transition-colors duration-300 hover:bg-coral md:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </>
  );
}
