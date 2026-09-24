"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { IMAGES } from "@/lib/content";

const VALUES = [
  { n: "01", label: "Speed", text: "Rapid dispatch the moment you call." },
  { n: "02", label: "Reliability", text: "Dependable, professional service every time." },
  { n: "03", label: "Convenience", text: "We come directly to your location." },
];

export default function AboutSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-ab-img-wrap]",
        { clipPath: "inset(12% 12% 12% 12% round 48px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 48px)",
          duration: 1.6,
          ease: "power3.inOut",
          scrollTrigger: { trigger: "[data-ab-img-wrap]", start: "top 80%", once: true },
        },
      );
      gsap.fromTo(
        "[data-ab-img]",
        { scale: 1.2, yPercent: -6 },
        {
          scale: 1.02,
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: "[data-ab-img-wrap]", start: "top bottom", end: "bottom top", scrub: 1 },
        },
      );
      gsap.to("[data-ab-track]", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
      });
      gsap.fromTo(
        "[data-ab-r]",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 1, scrollTrigger: { trigger: "[data-ab-copy]", start: "top 75%", once: true } },
      );
      gsap.fromTo(
        "[data-ab-val]",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, stagger: 0.16, duration: 1, scrollTrigger: { trigger: "[data-ab-vals]", start: "top 80%", once: true } },
      );
      gsap.fromTo(
        "[data-ab-conn]",
        { scaleY: 0 },
        { scaleY: 1, duration: 1.2, ease: "power3.inOut", transformOrigin: "top", scrollTrigger: { trigger: "[data-ab-vals]", start: "top 75%", once: true } },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="relative overflow-hidden bg-sage-50 py-24 lg:py-36">
      {/* Tire-track curves */}
      <svg
        data-ab-track
        aria-hidden
        className="pointer-events-none absolute -right-[10%] top-0 h-[120%] w-[70%] will-anim"
        viewBox="0 0 800 1000"
        fill="none"
      >
        <path d="M900 40 C 700 200, 760 420, 560 560 S 300 860, 120 1040" stroke="#6d9d96" strokeWidth="1.5" opacity="0.55" />
        <path d="M940 80 C 740 240, 800 460, 600 600 S 340 900, 160 1080" stroke="#6d9d96" strokeWidth="1.5" strokeDasharray="14 12" opacity="0.5" />
        <path d="M980 120 C 780 280, 840 500, 640 640 S 380 940, 200 1120" stroke="#d97862" strokeWidth="1" opacity="0.45" />
      </svg>

      <div className="relative mx-auto grid max-w-[1440px] items-start gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-12">
        {/* Image */}
        <div className="relative lg:sticky lg:top-28">
          <div data-ab-img-wrap className="relative aspect-[4/5] overflow-hidden rounded-[48px] shadow-lift" style={{ clipPath: "inset(12% 12% 12% 12% round 48px)" }}>
            <img
              data-ab-img
              src="/images/about.jpg"
              alt="NS2LLC Roadside Assistance technician smiling while working on a car at roadside"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover will-anim"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(47,111,107,0.35)_100%)]" />
          </div>
          <div className="glass absolute -bottom-5 right-4 rounded-2xl px-5 py-4 shadow-soft sm:right-8 anim-drift">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Service Area</p>
            <p className="mt-1 text-[15px] font-bold text-ink">DC · MD · Northern Virginia</p>
          </div>
        </div>

        {/* Copy */}
        <div data-ab-copy className="lg:pt-8">
          <p data-ab-r className="eyebrow">About Us</p>
          <h2 data-ab-r className="display mt-5 text-[clamp(2.4rem,5vw,4.6rem)] text-ink">
            Your Trusted
            <br />
            Mobile Tire &amp;
            <br />
            <span className="text-teal-700">Roadside Partner</span>
          </h2>

          <div className="mt-8 max-w-[560px] space-y-5 text-[16px] leading-relaxed text-muted">
            <p data-ab-r>
              At <span className="font-bold text-ink">NS2LLC ROADSIDE ASSISTANCE</span>, we understand that vehicle
              problems never happen at a convenient time. That’s why we built a mobile service designed around
              speed, reliability, and convenience.
            </p>
            <p data-ab-r>
              Instead of waiting at a tire shop or being stranded for hours, our mobile team comes directly to
              your location fully equipped to handle tire repairs, tire replacements, roadside emergencies,
              battery issues, and lockout situations.
            </p>
            <p data-ab-r>
              We are committed to delivering professional service with honesty, urgency, and attention to detail
              — ensuring every customer receives dependable support when they need it most.
            </p>
          </div>

          {/* Vertical value statements with connecting line */}
          <div data-ab-vals className="relative mt-14 pl-10">
            <span data-ab-conn className="absolute left-[7px] top-3 h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-teal-400 via-teal-700 to-coral" />
            <ul className="space-y-10">
              {VALUES.map((v) => (
                <li key={v.n} data-ab-val className="relative">
                  <span className="absolute -left-10 top-2.5 grid h-4 w-4 place-items-center">
                    <span className="h-2 w-2 rounded-full bg-teal-700 ring-4 ring-sage-50" />
                  </span>
                  <div className="flex items-baseline gap-4">
                    <span className="text-[12px] font-bold tracking-[0.3em] text-coral">{v.n}</span>
                    <h3 className="display text-[clamp(2rem,4vw,3.4rem)] text-ink">{v.label}</h3>
                  </div>
                  <p className="mt-2 text-[15px] text-muted">{v.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
