"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/scroll";
import { IMAGES, PHONE, PHONE_HREF } from "@/lib/content";
import Button from "./Button";
import { BoltIcon, ClockIcon, PhoneIcon, WrenchIcon } from "./icons";

const STATUS = [
  { label: "24/7", Icon: ClockIcon },
  { label: "Mobile Service", Icon: WrenchIcon },
  { label: "Roadside Assistance", Icon: BoltIcon },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set("[data-h]", { opacity: 1 });
        gsap.set("[data-h-img]", { clipPath: "inset(0 0 0 0 round 0 0 0 48px)" });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        "[data-h-img]",
        { clipPath: "inset(0 0 100% 0 round 0 0 0 48px)", scale: 1.15 },
        { clipPath: "inset(0 0 0% 0 round 0 0 0 48px)", scale: 1.05, duration: 1.8, ease: "power4.inOut" },
        0.2,
      )
        .fromTo("[data-h-eyebrow]", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8 }, 0.9)
        .fromTo(
          "[data-h-line]",
          { yPercent: 110 },
          { yPercent: 0, duration: 1.2, stagger: 0.15, ease: "power4.out" },
          1.0,
        )
        .fromTo("[data-h-p]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9 }, 1.5)
        .fromTo(
          "[data-h-cta]",
          { opacity: 0, y: 20, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12 },
          1.7,
        )
        .fromTo(
          "[data-h-float]",
          { opacity: 0, y: 28, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.18 },
          1.9,
        )
        .fromTo("[data-h-shape]", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.6 }, 0.6);

      // Scroll parallax — only on desktop
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.to("[data-h-img] img", {
          scale: 1,
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-h-copy]", {
          yPercent: 22,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-h-float]", {
          yPercent: -30,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-h-shape]", {
          yPercent: 14,
          rotate: 6,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });

        if (window.matchMedia("(pointer: fine)").matches) {
          const xTo = gsap.quickTo("[data-h-img] img", "x", { duration: 1.2, ease: "power3.out" });
          const yTo = gsap.quickTo("[data-h-img] img", "y", { duration: 1.2, ease: "power3.out" });
          const onMove = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            xTo(((e.clientX - r.left) / r.width - 0.5) * -20);
            yTo(((e.clientY - r.top) / r.height - 0.5) * -14);
          };
          el.addEventListener("mousemove", onMove);
          return () => el.removeEventListener("mousemove", onMove);
        }
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={root} className="relative isolate overflow-hidden bg-ivory pb-20 pt-20 sm:pb-28 sm:pt-24 lg:pb-40 lg:pt-0">
      {/* Background shapes */}
      <div data-h-shape className="pointer-events-none absolute -left-[18%] top-[20%] -z-10 h-[70vw] w-[70vw] rounded-full bg-sage-100 opacity-0 lg:-left-[10%] lg:h-[46vw] lg:w-[46vw]" />
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[40%] w-full"
        viewBox="0 0 1440 400"
        fill="none"
        preserveAspectRatio="none"
      >
        <path d="M-40 320 C 240 260, 420 380, 720 300 S 1180 140, 1500 200" stroke="#6d9d96" strokeWidth="1.5" opacity="0.6" />
        <path d="M-40 360 C 260 300, 440 420, 740 340 S 1200 180, 1500 240" stroke="#d97862" strokeWidth="1" opacity="0.5" />
      </svg>

      <div className="relative mx-auto max-w-[1440px] lg:min-h-[100svh]">
        {/* Image — full width on mobile, right half on desktop */}
        <div
          data-h-img
          className="relative mx-4 mt-2 aspect-[4/3] overflow-hidden rounded-[48px] sm:mx-6 sm:aspect-[16/9] lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:mt-0 lg:aspect-auto lg:h-full lg:w-[58%] lg:rounded-bl-[120px] lg:rounded-none lg:rounded-tl-none"
          style={{ clipPath: "inset(0 0 100% 0 round 48px)" }}
        >
          <img
            src={IMAGES.hero}
            alt="NS2LLC Roadside Assistance technician fitting a new tire at a customer's location"
            className="h-full w-full object-cover object-[65%_center] will-anim"
            fetchPriority="high"
          />
          <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(247,248,245,0.85)_0%,rgba(247,248,245,0)_35%)] lg:block" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(47,111,107,0)_50%,rgba(47,111,107,0.25)_100%)]" />

          {/* Floating badge — bottom right, above header phone btn */}
          <div
            data-h-float
            className="glass absolute bottom-4 right-4 z-10 rounded-2xl px-3 py-2.5 opacity-0 shadow-soft sm:bottom-6 sm:right-6 sm:px-4 sm:py-3"
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-teal-700 sm:text-[10px]">Anytime.</p>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-coral sm:text-[10px]">Anywhere.</p>
          </div>
        </div>

        {/* Copy — full width on mobile, left half on desktop */}
        <div
          data-h-copy
          className="relative px-5 pt-6 sm:px-8 sm:pt-10 lg:mt-0 lg:flex lg:min-h-[100svh] lg:w-[58%] lg:flex-col lg:justify-center lg:px-12 lg:pt-24"
        >
          <div className="lg:max-w-[720px]">
            <p data-h-eyebrow className="eyebrow opacity-0">
              24/7 Mobile Roadside Assistance
            </p>

            <h1 className="display mt-5 text-[clamp(2.8rem,8vw,9.5rem)] text-ink">
              <span className="block overflow-hidden pb-1">
                <span data-h-line className="block will-anim">
                  We Come
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span data-h-line className="block text-teal-700 will-anim">
                  To You.
                </span>
              </span>
            </h1>

            <p data-h-p className="mt-4 max-w-[520px] text-[15px] leading-relaxed text-muted opacity-0 sm:text-[17px]">
              Professional towing and emergency roadside assistance serving the District of Columbia
              (DC), Maryland (MD), and Northern Virginia (NVA).{" "}
              <span className="font-semibold text-ink">24/7 roadside assistance when you need it most.</span>
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div data-h-cta className="opacity-0">
                <Button href={PHONE_HREF} size="lg" icon={<PhoneIcon className="h-4.5 w-4.5" />} className="w-full sm:w-auto">
                  Call {PHONE}
                </Button>
              </div>
              <div data-h-cta className="opacity-0">
                <Button
                  href="#services"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTarget("#services", -60);
                  }}
                >
                  View Services
                </Button>
              </div>
            </div>
          </div>

          {/* Floating service status */}
          <div
            data-h-float
            className="glass mt-6 inline-flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl px-4 py-3 opacity-0 shadow-soft sm:w-fit sm:justify-start sm:gap-x-6 sm:rounded-full sm:px-5 lg:mt-12"
          >
            {STATUS.map(({ label, Icon }, i) => (
              <span key={label} className="flex items-center gap-2 text-[12px] font-semibold text-ink sm:gap-2.5 sm:text-[13px]">
                <span className={`grid h-6 w-6 place-items-center rounded-full sm:h-7 sm:w-7 ${i === 0 ? "bg-coral text-white" : "bg-teal-700/10 text-teal-700"}`}>
                  <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </span>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
