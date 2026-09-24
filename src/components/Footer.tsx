"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/scroll";
import { EMAIL, HOURS, NAV_LINKS, PHONE, PHONE_HREF } from "@/lib/content";
import Logo from "./Logo";
import { ArrowUpIcon, ClockIcon, MailIcon, PhoneIcon } from "./icons";

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-ft-r]",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.9, scrollTrigger: { trigger: el, start: "top 70%", once: true } },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  const go = (href: string) => (href === "#home" ? scrollToTarget(0, 0) : scrollToTarget(href, -72));

  return (
    <>
      <footer ref={root} className="relative overflow-hidden bg-sage-100">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ivory to-transparent" />

        <div className="relative mx-auto max-w-[1440px] px-4 pb-8 pt-16 sm:px-8 sm:pb-10 sm:pt-20 lg:px-12 lg:pt-28">
          {/* Logo + phone */}
          <div data-ft-r className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Logo size="md" />
            <a
              href={PHONE_HREF}
              className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-4 py-2.5 text-[13px] font-bold text-ink shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift sm:px-5 sm:py-3 sm:text-[14px]"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-teal-700 text-white sm:h-8 sm:w-8">
                <PhoneIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </span>
              {PHONE}
            </a>
          </div>

          {/* Navigation + contact info */}
          <div className="mt-8 grid gap-8 border-t border-sage-200 pt-8 sm:mt-10 sm:gap-10 sm:pt-10 lg:grid-cols-[1fr_auto] lg:items-start">
            <nav data-ft-r aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-3 sm:gap-x-8">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(l.href);
                  }}
                  className="group relative text-[13px] font-bold uppercase tracking-[0.18em] text-teal-700 transition-colors hover:text-ink sm:text-[15px]"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-coral transition-all duration-500 group-hover:w-full" />
                </a>
              ))}
            </nav>

            <ul data-ft-r className="grid gap-3 rounded-2xl border border-sage-200 bg-white/70 p-4 text-[13px] font-semibold text-ink backdrop-blur sm:rounded-3xl sm:p-5 sm:text-[14.5px] lg:min-w-[520px] lg:grid-cols-3">
              <li>
                <a href={PHONE_HREF} className="flex items-center gap-2.5 hover:text-teal-700 sm:gap-3">
                  <PhoneIcon className="h-4 w-4 shrink-0 text-teal-700 sm:h-4.5 sm:w-4.5" />
                  <span className="truncate">{PHONE}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-2.5 hover:text-teal-700 sm:gap-3">
                  <MailIcon className="h-4 w-4 shrink-0 text-teal-700 sm:h-4.5 sm:w-4.5" />
                  <span className="truncate">{EMAIL}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-muted sm:gap-3">
                <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal-700 sm:h-4.5 sm:w-4.5" />
                <span className="text-[12.5px] sm:text-[13.5px]">{HOURS}</span>
              </li>
            </ul>
          </div>

          <p data-ft-r className="mt-8 text-[12px] leading-relaxed text-muted sm:mt-10 sm:text-[13px]">
            ® 2026 NS2LLC. All rights reserved. Licensed and insured roadside assistance provider.
          </p>
        </div>
      </footer>

      {/* Floating back-to-top */}
      <button
        type="button"
        onClick={() => scrollToTarget(0, 0)}
        aria-label="Scroll to top"
        className={`group fixed bottom-5 right-4 z-[80] grid h-11 w-11 place-items-center rounded-full bg-white text-teal-700 shadow-lift ring-1 ring-sage-200 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] hover:bg-teal-700 hover:text-white sm:bottom-8 sm:right-8 sm:h-12 sm:w-12 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <ArrowUpIcon className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 sm:h-5 sm:w-5" />
      </button>
    </>
  );
}
