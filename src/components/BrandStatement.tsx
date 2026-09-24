"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function BrandStatement() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const path = el.querySelector<SVGPathElement>("[data-road]");
    const dot = el.querySelector<SVGCircleElement>("[data-road-dot]");
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    if (prefersReducedMotion()) {
      path.style.strokeDashoffset = "0";
      return;
    }

    const ctx = gsap.context(() => {
      const proxy = { p: 0 };
      gsap.to(proxy, {
        p: 1,
        ease: "none",
        onUpdate: () => {
          path.style.strokeDashoffset = `${len * (1 - proxy.p)}`;
          if (dot) {
            const pt = path.getPointAtLength(len * proxy.p);
            dot.setAttribute("cx", `${pt.x}`);
            dot.setAttribute("cy", `${pt.y}`);
          }
        },
        scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 45%", scrub: 0.6 },
      });

      gsap.fromTo(
        "[data-bs-line]",
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.14,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 70%", once: true },
        },
      );
      gsap.fromTo(
        "[data-bs-p]",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, scrollTrigger: { trigger: el, start: "top 65%", once: true } },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative z-10 -mt-16 overflow-hidden rounded-t-[48px] bg-white pb-24 pt-24 lg:-mt-24 lg:rounded-t-[80px] lg:pb-36 lg:pt-36"
    >
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Road line through typography */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 h-[70%] w-full -translate-y-1/2"
          viewBox="0 0 1400 500"
          preserveAspectRatio="none"
          fill="none"
        >
          <path d="M-20 90 C 200 40, 360 240, 620 210 S 980 60, 1120 220 S 1300 460, 1440 400" stroke="#d8e2de" strokeWidth="2" strokeDasharray="10 12" />
          <path
            data-road
            d="M-20 90 C 200 40, 360 240, 620 210 S 980 60, 1120 220 S 1300 460, 1440 400"
            stroke="#2f6f6b"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle data-road-dot r="7" cx="-20" cy="90" fill="#d97862" />
        </svg>

        <div className="relative grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <h2 className="display text-[clamp(2.8rem,8vw,7.6rem)] text-ink">
            <span className="block overflow-hidden">
              <span data-bs-line className="block">
                Your Road.
              </span>
            </span>
            <span className="block overflow-hidden lg:pl-[12%]">
              <span data-bs-line className="block">
                Your Location.
              </span>
            </span>
            <span className="block overflow-hidden lg:pl-[24%]">
              <span data-bs-line className="block text-teal-700">
                Our Service.
              </span>
            </span>
          </h2>

          <div data-bs-p className="relative max-w-[420px] lg:justify-self-end lg:pb-4">
            <span className="mb-5 block h-px w-14 bg-coral" />
            <p className="text-[16.5px] leading-relaxed text-muted">
              Instead of waiting at a tire shop or being stranded for hours, our mobile team comes
              directly to your location — fully equipped to handle tire repairs, tire replacements,
              roadside emergencies, battery issues, and lockout situations.
            </p>
            <p className="mt-4 text-[13px] font-bold uppercase tracking-[0.25em] text-teal-700">
              DC · Maryland · Northern Virginia
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
