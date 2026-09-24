"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/scroll";
import { EMAIL, HOURS, NAV_LINKS, PHONE, PHONE_HREF } from "@/lib/content";
import Logo from "./Logo";
import { ArrowUpIcon, ClockIcon, MailIcon, PhoneIcon } from "./icons";

const ROAD = "M-40 180 C 200 120, 360 300, 640 220 S 1040 40, 1240 140 S 1400 240, 1500 200";

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
    if (!el) return;
    const path = el.querySelector<SVGPathElement>("[data-ft-road]");
    if (path) {
      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = prefersReducedMotion() ? "0" : `${len}`;
    }
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      if (path) {
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 90%", end: "bottom bottom", scrub: 0.6 },
        });
      }
      gsap.fromTo(
        "[data-ft-word]",
        { yPercent: 100 },
        { yPercent: 0, stagger: 0.12, duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 80%", once: true } },
      );
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
        {/* Soft separation gradient */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ivory to-transparent" />

        <div className="relative mx-auto max-w-[1440px] px-5 pb-10 pt-28 sm:px-8 lg:px-12 lg:pt-36">
          <div data-ft-r className="flex items-center justify-between">
            <Logo size="lg" />
            <a href={PHONE_HREF} className="hidden items-center gap-3 rounded-full bg-white px-5 py-3 text-[14px] font-bold text-ink shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift sm:inline-flex">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-teal-700 text-white">
                <PhoneIcon className="h-4 w-4" />
              </span>
              {PHONE}
            </a>
          </div>


          {/* Navigation + contact */}
          <div className="mt-10 grid gap-10 border-t border-sage-200 pt-10 lg:grid-cols-[1fr_auto] lg:items-start">
            <nav data-ft-r aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(l.href);
                  }}
                  className="group relative text-[15px] font-bold uppercase tracking-[0.18em] text-teal-700 transition-colors hover:text-ink"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-coral transition-all duration-500 group-hover:w-full" />
                </a>
              ))}
            </nav>

            <ul data-ft-r className="grid gap-3 rounded-3xl border border-sage-200 bg-white/70 p-5 text-[14.5px] font-semibold text-ink backdrop-blur sm:grid-cols-3 lg:min-w-[560px]">
              <li>
                <a href={PHONE_HREF} className="flex items-center gap-3 hover:text-teal-700">
                  <PhoneIcon className="h-4.5 w-4.5 text-teal-700" />
                  {PHONE}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 hover:text-teal-700">
                  <MailIcon className="h-4.5 w-4.5 text-teal-700" />
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted">
                <ClockIcon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-teal-700" />
                <span className="text-[13.5px]">{HOURS}</span>
              </li>
            </ul>
          </div>

          <p data-ft-r className="mt-10 text-[13px] leading-relaxed text-muted">
            ® 2026 NS2LLC. All rights reserved. Licensed and insured roadside assistance provider.
          </p>
        </div>
      </footer>

      {/* Floating back-to-top */}
      <button
        type="button"
        onClick={() => scrollToTarget(0, 0)}
        aria-label="Scroll to top"
        className={`group fixed bottom-6 right-5 z-[80] grid h-12 w-12 place-items-center rounded-full bg-white text-teal-700 shadow-lift ring-1 ring-sage-200 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] hover:bg-teal-700 hover:text-white sm:bottom-8 sm:right-8 ${showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
          }`}
      >
        <ArrowUpIcon className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-0.5" />
      </button>
    </>
  );
}
