"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { IMAGES, PHONE, PHONE_HREF } from "@/lib/content";
import Button from "./Button";
import { BatteryIcon, FuelIcon, KeyIcon, PhoneIcon, TireIcon } from "./icons";

const ISSUES = [
  { label: "Flat Tires", Icon: TireIcon },
  { label: "Dead Batteries", Icon: BatteryIcon },
  { label: "Empty Gas Tanks", Icon: FuelIcon },
  { label: "Locked Keys", Icon: KeyIcon },
];

export default function EmergencyCTA() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-em-img]",
        { yPercent: -10, scale: 1.15 },
        { yPercent: 10, scale: 1.05, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 } },
      );
      gsap.fromTo(
        "[data-em-panel]",
        { opacity: 0, y: 70 },
        { opacity: 1, y: 0, duration: 1.3, ease: "power4.out", scrollTrigger: { trigger: "[data-em-panel]", start: "top 85%", once: true } },
      );
      gsap.fromTo(
        "[data-em-r]",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, delay: 0.3, scrollTrigger: { trigger: "[data-em-panel]", start: "top 80%", once: true } },
      );
      gsap.fromTo(
        "[data-em-issue]",
        { opacity: 0, y: 18, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.8, ease: "back.out(1.4)", scrollTrigger: { trigger: "[data-em-issues]", start: "top 88%", once: true } },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-ivory">
      {/* Panoramic image */}
      <div className="relative h-[64svh] min-h-[440px] overflow-hidden lg:h-[78svh]">
        <img
          data-em-img
          src={IMAGES.emergency}
          alt="Driver standing beside a stopped car at the roadside"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center will-anim"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,248,245,0.35)_0%,rgba(47,111,107,0.15)_55%,rgba(247,248,245,1)_100%)]" />
        <div className="absolute left-5 top-8 sm:left-8 lg:left-12 lg:top-14">
          <span className="glass inline-flex items-center gap-3 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-ink">
            <span className="h-2 w-2 rounded-full bg-coral" />
            Emergency Roadside Support
          </span>
        </div>
      </div>

      {/* Overlapping white panel */}
      <div className="relative mx-auto -mt-40 max-w-[1440px] px-5 pb-24 sm:px-8 lg:-mt-64 lg:px-12 lg:pb-36">
        <div data-em-panel className="grid overflow-hidden rounded-[40px] border border-sage-200 bg-white shadow-lift lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-8 sm:p-12 lg:p-16">
            <h2 data-em-r className="display text-[clamp(2.6rem,6vw,5.6rem)] text-ink">
              Stranded?
              <br />
              <span className="text-teal-700">We are ready</span>
              <br />
              to help you.
            </h2>
            <div className="mt-8 max-w-[560px] space-y-4 text-[16px] leading-relaxed text-muted">
              <p data-em-r>
                Vehicle emergencies can happen anytime. Whether you have a flat tire, dead battery, empty gas
                tank, or locked keys inside your car.
              </p>
              <p data-em-r className="text-[18px] font-bold text-ink">
                NS2LLC Roadside Assistance is only one call away.
              </p>
              <p data-em-r>
                We provide fast and dependable roadside assistance designed to get you back on the road quickly
                and safely.
              </p>
            </div>
            <div data-em-r className="mt-10">
              <Button href={PHONE_HREF} size="lg" icon={<PhoneIcon className="h-4.5 w-4.5" />} className="w-full sm:w-auto">
                {PHONE}
              </Button>
            </div>
          </div>

          <div className="relative border-t border-sage-200 bg-sage-50 p-8 sm:p-12 lg:border-l lg:border-t-0 lg:p-16">
            <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-70" viewBox="0 0 400 400" fill="none" preserveAspectRatio="none">
              <path d="M-20 320 C 100 260, 200 380, 300 280 S 420 120, 460 160" stroke="#6d9d96" strokeWidth="1.5" />
              <path d="M-20 360 C 120 300, 220 420, 320 320 S 440 160, 480 200" stroke="#d97862" strokeWidth="1" opacity="0.6" />
            </svg>
            <p className="relative text-[11px] font-bold uppercase tracking-[0.3em] text-muted">We handle</p>
            <ul data-em-issues className="relative mt-6 grid grid-cols-2 gap-4">
              {ISSUES.map(({ label, Icon }) => (
                <li
                  key={label}
                  data-em-issue
                  className="group flex flex-col gap-4 rounded-3xl border border-sage-200 bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:border-teal-400 hover:shadow-soft"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-sage-100 text-teal-700 transition-colors duration-500 group-hover:bg-teal-700 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-[14px] font-extrabold uppercase tracking-wide text-ink">{label}</span>
                </li>
              ))}
            </ul>
            <p className="relative mt-8 text-[13px] leading-relaxed text-muted">
              Serving the District of Columbia (DC), Maryland (MD), and Northern Virginia (NVA) — 24/7.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
