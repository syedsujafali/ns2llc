"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { STEPS } from "@/lib/content";
import { PhoneIcon, PinIcon, TireIcon } from "./icons";

const ICONS = [PhoneIcon, PinIcon, TireIcon];
const PATH_D = "M 80 250 C 300 250, 380 90, 600 110 S 860 300, 1020 250 S 1240 110, 1360 150";
const POINTS = [
  { x: 5.9, y: 62.5 },
  { x: 43.5, y: 30.5 },
  { x: 76, y: 62 },
];
const THRESH = [0.04, 0.5, 0.96];

export default function HowItWorks() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.fromTo(
          "[data-hw-head] > *",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 1, scrollTrigger: { trigger: el, start: "top 75%", once: true } },
        );
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const stage = el.querySelector<HTMLElement>("[data-hw-desk]");
        const path = stage?.querySelector<SVGPathElement>("[data-hw-path]");
        const car = stage?.querySelector<HTMLElement>("[data-hw-car]");
        if (!stage || !path) return;
        const steps = Array.from(stage.querySelectorAll<HTMLElement>("[data-hw-step]"));
        const len = path.getTotalLength();
        path.style.strokeDasharray = `${len}`;
        path.style.strokeDashoffset = `${len}`;
        const apply = (p: number) => {
          path.style.strokeDashoffset = `${len * (1 - p)}`;
          if (car) {
            const pt = path.getPointAtLength(len * p);
            const ahead = path.getPointAtLength(Math.min(len, len * p + 2));
            const ang = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
            car.style.transform = `translate(${(pt.x / 1440) * 100}%, 0) `;
            car.style.left = `${(pt.x / 1440) * 100}%`;
            car.style.top = `${(pt.y / 400) * 100}%`;
            car.style.transform = `translate(-50%, -50%) rotate(${ang}deg)`;
            car.style.opacity = p > 0.01 && p < 0.99 ? "1" : "0";
          }
          steps.forEach((s, i) => (s.dataset.active = p >= THRESH[i] ? "true" : "false"));
        };
        if (reduced) {
          apply(1);
          return;
        }
        const proxy = { p: 0 };
        gsap.to(proxy, {
          p: 1,
          ease: "none",
          onUpdate: () => apply(proxy.p),
          scrollTrigger: { trigger: stage, start: "top 70%", end: "bottom 50%", scrub: 0.8 },
        });
      });

      mm.add("(max-width: 1023px)", () => {
        const stage = el.querySelector<HTMLElement>("[data-hw-mob]");
        const line = stage?.querySelector<HTMLElement>("[data-hw-line]");
        if (!stage || !line) return;
        const steps = Array.from(stage.querySelectorAll<HTMLElement>("[data-hw-step]"));
        const apply = (p: number) => {
          line.style.transform = `scaleY(${p})`;
          steps.forEach((s, i) => (s.dataset.active = p >= THRESH[i] ? "true" : "false"));
        };
        if (reduced) {
          apply(1);
          return;
        }
        const proxy = { p: 0 };
        gsap.to(proxy, {
          p: 1,
          ease: "none",
          onUpdate: () => apply(proxy.p),
          scrollTrigger: { trigger: stage, start: "top 70%", end: "bottom 70%", scrub: 0.8 },
        });
      });
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={root} className="relative overflow-hidden bg-white py-24 lg:py-36">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-sage-100 blur-3xl" />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div data-hw-head className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow">How It Works</p>
            <h2 className="display mt-5 text-[clamp(2.6rem,6vw,5.4rem)] text-ink">
              Simple. Fast.
              <br />
              <span className="text-teal-700">Get back on the road.</span>
            </h2>
          </div>
          <p className="max-w-[360px] text-[16px] leading-relaxed text-muted lg:pb-3">
            One call, and our mobile team is on the way — wherever you are.
          </p>
        </div>

        {/* Desktop journey */}
        <div data-hw-desk className="relative mt-20 hidden aspect-[1440/400] w-full lg:block">
          <svg aria-hidden viewBox="0 0 1440 400" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" fill="none">
            {/* Road base */}
            <path d={PATH_D} stroke="#e8f0ed" strokeWidth="34" strokeLinecap="round" />
            <path d={PATH_D} stroke="#d8e2de" strokeWidth="2" strokeDasharray="12 14" />
            {/* Animated route */}
            <path data-hw-path d={PATH_D} stroke="#2f6f6b" strokeWidth="4" strokeLinecap="round" />
          </svg>

          {/* Travelling marker */}
          <span
            data-hw-car
            className="pointer-events-none absolute grid h-9 w-9 place-items-center rounded-full bg-white shadow-soft ring-2 ring-teal-700 opacity-0 transition-opacity duration-300"
            style={{ left: "5.9%", top: "62.5%" }}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-coral" />
          </span>

          {STEPS.map((s, i) => {
            const Icon = ICONS[i];
            const pt = POINTS[i];
            const below = i !== 1;
            return (
              <div
                key={s.number}
                data-hw-step
                data-active="false"
                className="group absolute"
                style={{ left: `${pt.x}%`, top: `${pt.y}%`, transform: "translate(-50%,-50%)" }}
              >
                <span className="relative grid h-[84px] w-[84px] place-items-center rounded-full border-2 border-teal-400 bg-white text-teal-700 shadow-soft transition-all duration-700 group-data-[active=true]:scale-110 group-data-[active=true]:border-teal-700 group-data-[active=true]:bg-teal-700 group-data-[active=true]:text-white group-data-[active=true]:shadow-teal">
                  <Icon className="h-7 w-7" />
                  <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-coral text-[11px] font-black text-white ring-4 ring-white">
                    {s.number}
                  </span>
                </span>
                <div
                  className={`absolute left-1/2 w-[300px] -translate-x-1/2 opacity-40 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-data-[active=true]:translate-y-0 group-data-[active=true]:opacity-100 ${
                    below ? "top-full mt-6 translate-y-3" : "bottom-full mb-6 -translate-y-3 text-center"
                  } ${i === 0 ? "left-0 translate-x-0 text-left" : ""}`}
                >
                  <h3 className="display text-[24px] text-ink">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile journey */}
        <div data-hw-mob className="relative mt-14 lg:hidden">
          <div className="absolute bottom-10 left-[30px] top-10 w-px bg-sage-200" />
          <div data-hw-line className="absolute bottom-10 left-[29px] top-10 w-[3px] origin-top rounded bg-teal-700" style={{ transform: "scaleY(0)" }} />
          <ol className="space-y-12">
            {STEPS.map((s, i) => {
              const Icon = ICONS[i];
              return (
                <li key={s.number} data-hw-step data-active="false" className="group relative flex items-start gap-6">
                  <span className="relative grid h-[60px] w-[60px] shrink-0 place-items-center rounded-full border-2 border-teal-400 bg-white text-teal-700 shadow-soft transition-all duration-700 group-data-[active=true]:border-teal-700 group-data-[active=true]:bg-teal-700 group-data-[active=true]:text-white">
                    <Icon className="h-5.5 w-5.5" />
                    <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-coral text-[10px] font-black text-white ring-4 ring-white">
                      {s.number}
                    </span>
                  </span>
                  <div className="translate-x-3 pt-2 opacity-40 transition-all duration-700 group-data-[active=true]:translate-x-0 group-data-[active=true]:opacity-100">
                    <h3 className="display text-[22px] text-ink">{s.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
