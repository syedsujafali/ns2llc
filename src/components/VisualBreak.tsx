"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { IMAGES } from "@/lib/content";

const PATH = "M-40 420 C 220 380, 380 200, 640 260 S 1040 420, 1260 300 S 1440 200, 1520 220";

export default function VisualBreak() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const path = el.querySelector<SVGPathElement>("[data-vb-path]");
    const dot = el.querySelector<SVGCircleElement>("[data-vb-dot]");
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    if (prefersReducedMotion()) {
      path.style.strokeDashoffset = "0";
      gsap.set("[data-vb-word]", { yPercent: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-vb-img]",
        { xPercent: -6, scale: 1.12 },
        { xPercent: 6, scale: 1.12, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 } },
      );
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
        scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 30%", scrub: 0.8 },
      });
      gsap.fromTo(
        "[data-vb-word]",
        { yPercent: 110 },
        { yPercent: 0, stagger: 0.12, duration: 1.3, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 60%", once: true } },
      );
      gsap.fromTo(
        "[data-vb-sub]",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.5, scrollTrigger: { trigger: el, start: "top 60%", once: true } },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[80svh] min-h-[560px] overflow-hidden lg:h-[100svh]">
      <img
        data-vb-img
        src={IMAGES.highway}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover will-anim"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,248,245,0.6)_0%,rgba(247,248,245,0.15)_35%,rgba(47,111,107,0.35)_100%)]" />

      <svg aria-hidden viewBox="0 0 1440 600" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" fill="none">
        <path d={PATH} stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeDasharray="10 14" />
        <path data-vb-path d={PATH} stroke="#2f6f6b" strokeWidth="3.5" strokeLinecap="round" />
        <circle data-vb-dot r="9" cx="-40" cy="420" fill="#d97862" stroke="#fff" strokeWidth="3" />
      </svg>

      <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-16 sm:px-8 lg:px-12 lg:pb-24">
        <h2 className="display text-[clamp(2.6rem,7.5vw,7rem)] text-white drop-shadow-[0_6px_30px_rgba(24,48,47,0.25)]">
          <span className="block overflow-hidden">
            <span data-vb-word className="block">
              Wherever you are,
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-vb-word className="block">
              we come <span className="text-ivory/90 underline decoration-coral decoration-[6px] underline-offset-[10px]">to you.</span>
            </span>
          </span>
        </h2>
        <p data-vb-sub className="mt-6 max-w-[520px] text-[15px] font-semibold uppercase tracking-[0.2em] text-white/90">
          District of Columbia (DC) · Maryland (MD) · Northern Virginia (NVA)
        </p>
      </div>
    </section>
  );
}
