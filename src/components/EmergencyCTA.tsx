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
        { opacity: 0, y: 50 },
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
      <div className="relative h-[50svh] min-h-[320px] overflow-hidden sm:h-[60svh] sm:min-h-[400px] lg:h-[75svh]">
        <img
          data-em-img
          src={IMAGES.emergency}
          alt="Driver standing beside a stopped car at the roadside"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center will-anim"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,248,245,0.35)_0%,rgba(47,111,107,0.15)_55%,rgba(247,248,245,1)_100%)]" />
        <div className="absolute left-4 top-6 sm:left-8 lg:left-12 lg:top-14">
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-ink sm:gap-3 sm:px-4 sm:py-2 sm:text-[11px]">
            <span className="h-2 w-2 rounded-full bg-coral" />
            Emergency Roadside Support
          </span>
        </div>
      </div>

      {/* Overlapping white panel */}
      <div className="relative mx-auto -mt-24 max-w-[1440px] px-4 pb-20 sm:-mt-36 sm:px-8 lg:-mt-56 lg:px-12 lg:pb-36">
        <div data-em-panel className="grid overflow-hidden rounded-[28px] border border-sage-200 bg-white shadow-lift sm:rounded-[40px] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 sm:p-10 lg:p-16">
            <h2 data-em-r className="display text-[clamp(2.2rem,6vw,5.6rem)] text-ink">
              Stranded?
              <br />
              <span className="text-teal-700">We are ready</span>
              <br />
              to help you.
            </h2>
            <div className="mt-6 max-w-[560px] space-y-4 text-[15px] leading-relaxed text-muted sm:mt-8 sm:text-[16px]">
              <p data-em-r>
                Vehicle emergencies can happen anytime. Whether you have a flat tire, dead battery, empty gas
                tank, or locked keys inside your car.
              </p>
              <p data-em-r className="text-[16px] font-bold text-ink sm:text-[18px]">
                NS2LLC Roadside Assistance is only one call away.
              </p>
              <p data-em-r>
                We provide fast and dependable roadside assistance designed to get you back on the road quickly
                and safely.
              </p>
            </div>
            <div data-em-r className="mt-8 sm:mt-10">
              <Button href={PHONE_HREF} size="lg" icon={<PhoneIcon className="h-4.5 w-4.5" />} className="w-full sm:w-auto">
                {PHONE}
              </Button>
            </div>
          </div>

          <div className="relative border-t border-sage-200 bg-sage-50 p-6 sm:p-10 lg:border-l lg:border-t-0 lg:p-16">
            <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-70" viewBox="0 0 400 400" fill="none" preserveAspectRatio="none">
              <path d="M-20 320 C 100 260, 200 380, 300 280 S 420 120, 460 160" stroke="#6d9d96" strokeWidth="1.5" />
              <path d="M-20 360 C 120 300, 220 420, 320 320 S 440 160, 480 200" stroke="#d97862" strokeWidth="1" opacity="0.6" />
            </svg>
            <p className="relative text-[11px] font-bold uppercase tracking-[0.3em] text-muted">We handle</p>
            <ul data-em-issues className="relative mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-4">
              {ISSUES.map(({ label, Icon }) => (
                <li
                  key={label}
                  data-em-issue
                  className="group flex flex-col gap-3 rounded-2xl border border-sage-200 bg-white p-4 transition-all duration-500 hover:-translate-y-1 hover:border-teal-400 hover:shadow-soft sm:gap-4 sm:rounded-3xl sm:p-5"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-sage-100 text-teal-700 transition-colors duration-500 group-hover:bg-teal-700 group-hover:text-white sm:h-11 sm:w-11">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <span className="text-[12px] font-extrabold uppercase tracking-wide text-ink sm:text-[14px]">{label}</span>
                </li>
              ))}
            </ul>
            <p className="relative mt-6 text-[12px] leading-relaxed text-muted sm:mt-8 sm:text-[13px]">
              Serving the District of Columbia (DC), Maryland (MD), and Northern Virginia (NVA) — 24/7.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
