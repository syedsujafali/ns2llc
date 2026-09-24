"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { PHONE_HREF, SERVICES, type Service, type ServiceIcon } from "@/lib/content";
import { ArrowRightIcon, BatteryIcon, CheckIcon, FuelIcon, LockIcon, RoadsideIcon, ShieldIcon, TireIcon } from "./icons";

const ICONS: Record<ServiceIcon, typeof TireIcon> = {
  battery: BatteryIcon,
  tire: TireIcon,
  fuel: FuelIcon,
  lockout: LockIcon,
  recovery: ShieldIcon,
  roadside: RoadsideIcon,
};

export default function ServicesShowcase() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [openIdx, setOpenIdx] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-sv-head] > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 1, scrollTrigger: { trigger: el, start: "top 75%", once: true } },
      );

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const t = track.current;
        if (!t || reduced) return;
        const panels = gsap.utils.toArray<HTMLElement>("[data-sv-panel]", t);
        const getDist = () => t.scrollWidth - window.innerWidth;

        const tween = gsap.to(t, {
          x: () => -getDist(),
          ease: "none",
          scrollTrigger: {
            trigger: el.querySelector("[data-sv-pin]"),
            start: "top top",
            end: () => `+=${getDist() + window.innerHeight * 0.5}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(panels.length - 1, Math.round(self.progress * (panels.length - 1)));
              setActive(idx);
            },
          },
        });

        // Inner parallax per panel image
        panels.forEach((p) => {
          const img = p.querySelector("img");
          if (!img) return;
          gsap.fromTo(
            img,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: { trigger: p, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
            },
          );
        });
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          "[data-sv-acc]",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.9,
            scrollTrigger: { trigger: "[data-sv-acc-list]", start: "top 80%", once: true },
          },
        );
      });
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={root} className="relative bg-ivory">
      {/* Heading */}
      <div className="mx-auto max-w-[1440px] px-5 pt-24 sm:px-8 lg:px-12 lg:pt-32">
        <div data-sv-head className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Our Services</p>
            <h2 className="display mt-5 text-[clamp(2.4rem,6vw,5.4rem)] text-ink">
              Comprehensive
              <br />
              <span className="text-teal-700">Mobile Services</span>
            </h2>
          </div>
          <div className="flex items-center gap-6 lg:pb-3">
            <p className="max-w-[360px] text-[16px] leading-relaxed text-muted">
              Professional mobile tire solutions delivered directly to your location.
            </p>
            {/* Progress indicator (desktop) */}
            <div className="hidden items-center gap-2 lg:flex">
              {SERVICES.map((s, i) => (
                <span
                  key={s.id}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-teal-700" : "w-1.5 bg-sage-200"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop horizontal showcase */}
      <div data-sv-pin className="hidden lg:block">
        <div className="relative flex h-screen items-center overflow-hidden">
          <div ref={track} className="flex h-full items-center gap-10 pl-[max(3rem,calc((100vw-1440px)/2+3rem))] pr-[8vw] will-anim">
            {SERVICES.map((s, i) => (
              <Panel key={s.id} service={s} active={i === active} />
            ))}
          </div>
          {/* Big index */}
          <div className="pointer-events-none absolute bottom-8 right-12 flex items-baseline gap-2 text-ink/15">
            <span className="display text-[120px] leading-none">{SERVICES[active]?.number ?? SERVICES[0].number}</span>
            <span className="text-[14px] font-bold tracking-[0.3em]">/ {String(SERVICES.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>

      {/* Mobile accordion */}
      <div data-sv-acc-list className="mx-auto max-w-[1440px] space-y-4 px-5 pb-24 pt-12 sm:px-8 lg:hidden">
        {SERVICES.map((s, i) => {
          const Icon = ICONS[s.icon];
          const open = openIdx === i;
          return (
            <article
              key={s.id}
              data-sv-acc
              className={`overflow-hidden rounded-[28px] border bg-white transition-all duration-500 ${open ? "border-teal-400/60 shadow-lift" : "border-sage-200 shadow-soft"}`}
            >
              <button
                type="button"
                onClick={() => setOpenIdx(open ? -1 : i)}
                aria-expanded={open}
                className="flex w-full items-center gap-4 p-5 text-left"
              >
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full transition-colors ${open ? "bg-teal-700 text-white" : "bg-sage-100 text-teal-700"}`}>
                  <Icon className="h-5.5 w-5.5" />
                </span>
                <span className="flex-1">
                  <span className="block text-[11px] font-bold tracking-[0.3em] text-coral">{s.number}</span>
                  <span className="mt-0.5 block text-[18px] font-extrabold uppercase leading-tight tracking-tight text-ink">{s.title}</span>
                </span>
                <span className={`grid h-10 w-10 place-items-center rounded-full border border-sage-200 text-teal-700 transition-transform duration-500 ${open ? "rotate-90" : ""}`}>
                  <ArrowRightIcon className="h-4.5 w-4.5" />
                </span>
              </button>
              <div className={`grid transition-[grid-template-rows] duration-600 ease-[cubic-bezier(.22,1,.36,1)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <div className="px-5 pb-6">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
                      <img src={s.image} alt={s.title} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(47,111,107,0.45)_100%)]" />
                    </div>
                    <p className="mt-5 text-[15px] leading-relaxed text-muted">{s.description}</p>
                    <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {s.items.map((it) => (
                        <li key={it} className="flex items-center gap-2.5 text-[14px] font-medium text-ink">
                          <span className="grid h-5 w-5 place-items-center rounded-full bg-teal-700/10 text-teal-700">
                            <CheckIcon className="h-3 w-3" />
                          </span>
                          {it}
                        </li>
                      ))}
                    </ul>
                    <a href={PHONE_HREF} className="mt-6 inline-flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.2em] text-teal-700">
                      Call for this service
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-coral text-white">
                        <ArrowRightIcon className="h-4 w-4" />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Panel({ service, active }: { service: Service; active: boolean }) {
  const Icon = ICONS[service.icon];
  return (
    <article
      data-sv-panel
      className={`group relative grid h-[78vh] w-[min(1180px,82vw)] shrink-0 grid-cols-[1.15fr_0.85fr] overflow-hidden rounded-[44px] border bg-white transition-all duration-700 ${
        active ? "border-teal-400/50 shadow-lift" : "border-sage-200 shadow-soft"
      }`}
    >
      <div className="relative overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          decoding="async"
          className="h-full w-[120%] max-w-none object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 will-anim"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(47,111,107,0)_60%,rgba(255,255,255,0.35)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(47,111,107,0.35)_100%)]" />
        <span className="display absolute bottom-6 left-8 text-[140px] leading-none text-white/90 transition-transform duration-700 group-hover:-translate-y-2">
          {service.number}
        </span>
      </div>

      <div className="relative flex flex-col justify-between p-10 xl:p-12">
        <div>
          <span className="grid h-14 w-14 place-items-center rounded-full bg-sage-100 text-teal-700 transition-colors duration-500 group-hover:bg-teal-700 group-hover:text-white">
            <Icon className="h-6 w-6" />
          </span>
          <span className="mt-8 block h-[3px] w-10 rounded-full bg-coral transition-all duration-700 group-hover:w-24" />
          <h3 className="display mt-5 text-[clamp(2rem,3vw,3rem)] text-ink">{service.title}</h3>
          <p className="mt-4 max-w-[380px] text-[15.5px] leading-relaxed text-muted">{service.description}</p>
          <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 xl:grid-cols-2">
            {service.items.map((it) => (
              <li key={it} className="flex items-center gap-2.5 text-[14px] font-medium text-ink">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-700/10 text-teal-700">
                  <CheckIcon className="h-3 w-3" />
                </span>
                {it}
              </li>
            ))}
          </ul>
        </div>
        <a
          href={PHONE_HREF}
          className="mt-8 inline-flex items-center justify-between rounded-full border border-sage-200 py-2 pl-6 pr-2 text-[13px] font-bold uppercase tracking-[0.2em] text-ink transition-all duration-500 hover:border-teal-700 hover:shadow-soft"
        >
          Call for this service
          <span className="ml-6 grid h-11 w-11 place-items-center rounded-full bg-teal-700 text-white transition-all duration-500 group-hover:bg-coral">
            <ArrowRightIcon className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-0.5" />
          </span>
        </a>
      </div>
    </article>
  );
}
