"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { EMAIL, HOURS, IMAGES, PHONE, PHONE_HREF, SERVICE_OPTIONS } from "@/lib/content";
import { ArrowRightIcon, CheckIcon, ClockIcon, MailIcon, PhoneIcon } from "./icons";
import { useState, type FormEvent } from "react";

export default function ContactSection() {
  const root = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-ct-img]",
        { scale: 1.15, yPercent: -5 },
        { scale: 1.02, yPercent: 5, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 } },
      );
      gsap.fromTo(
        "[data-ct-r]",
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 1, scrollTrigger: { trigger: el, start: "top 70%", once: true } },
      );
      gsap.fromTo(
        "[data-ct-panel]",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.3, ease: "power4.out", scrollTrigger: { trigger: "[data-ct-panel]", start: "top 80%", once: true } },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("fullName") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const service = String(fd.get("serviceNeeded") || "").trim();
    const message = String(fd.get("message") || "").trim();

    if (!name) return setError("Please enter your full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Please enter a valid email address.");

    const subject = encodeURIComponent(`Roadside request${service ? ` — ${service}` : ""} from ${name}`);
    const body = encodeURIComponent(
      [`Name: ${name}`, `Email: ${email}`, `Phone: ${phone || "—"}`, `Service Needed: ${service || "—"}`, "", "Emergency details:", message || "—"].join("\n"),
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="contact" ref={root} className="relative overflow-hidden bg-ivory">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[0.95fr_1.05fr]">
        {/* Left — image with info */}
        <div className="relative min-h-[380px] overflow-hidden sm:min-h-[480px] lg:min-h-[100svh] lg:rounded-r-[64px]">
          <img
            data-ct-img
            src={IMAGES.contact}
            alt="Close-up of a tire and alloy wheel"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover will-anim"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,48,47,0.05)_0%,rgba(24,48,47,0.35)_55%,rgba(24,48,47,0.75)_100%)]" />

          <div className="relative flex h-full flex-col justify-end p-6 sm:p-10 lg:p-16">
            <p data-ct-r className="eyebrow !text-white [&::before]:bg-white/70">
              Get In Touch
            </p>
            <h2 data-ct-r className="display mt-4 text-[clamp(2.4rem,6vw,5.6rem)] text-white">
              Contact Us
            </h2>
            <p data-ct-r className="mt-3 max-w-[440px] text-[15px] leading-relaxed text-white/85">
              Need immediate roadside assistance or mobile tire service? We're ready to help.
            </p>

            <ul className="mt-6 space-y-3 sm:mt-10">
              <Row reveal href={PHONE_HREF} Icon={PhoneIcon} label="Phone" value={PHONE} />
              <Row reveal href={`mailto:${EMAIL}`} Icon={MailIcon} label="Email" value={EMAIL} />
              <Row reveal Icon={ClockIcon} label="Hours" value={HOURS} sub="Always available when you need us." />
            </ul>
          </div>
        </div>

        {/* Right — form */}
        <div className="relative flex items-center px-5 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-28">
          <svg aria-hidden className="pointer-events-none absolute right-0 top-0 h-[300px] w-[60%] opacity-70" viewBox="0 0 600 300" fill="none" preserveAspectRatio="none">
            <path d="M0 260 C 160 200, 300 40, 640 20" stroke="#6d9d96" strokeWidth="1.5" />
            <path d="M0 300 C 180 240, 320 80, 640 60" stroke="#d97862" strokeWidth="1" opacity="0.5" />
          </svg>

          <div data-ct-panel className="relative w-full rounded-[28px] border border-sage-200 bg-white p-5 shadow-lift sm:rounded-[40px] sm:p-8 lg:-ml-24 lg:p-12">
            {sent ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-teal-700 text-white shadow-teal sm:h-20 sm:w-20">
                  <CheckIcon className="h-7 w-7 sm:h-9 sm:w-9" />
                </span>
                <h3 className="display mt-5 text-[24px] text-ink sm:mt-6 sm:text-[28px]">Your request is ready</h3>
                <p className="mt-3 max-w-[400px] text-[14px] leading-relaxed text-muted sm:text-[15px]">
                  We've opened your email app with the details filled in. For immediate roadside help, call us now at{" "}
                  <a href={PHONE_HREF} className="font-bold text-teal-700">
                    {PHONE}
                  </a>
                  .
                </p>
                <button type="button" onClick={() => setSent(false)} className="mt-8 text-[13px] font-bold uppercase tracking-[0.2em] text-teal-700 underline-offset-4 hover:underline">
                  Start another request
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-4 sm:space-y-5">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-coral">Request Service</p>
                  <h3 className="display mt-2 text-[22px] text-ink sm:text-[28px] lg:text-[32px]">Tell us where you are.</h3>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name" name="fullName" required placeholder="Your name" autoComplete="name" />
                  <Field label="Email" name="email" type="email" required placeholder="you@email.com" autoComplete="email" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Phone" name="phone" type="tel" placeholder="(000) 000-0000" autoComplete="tel" />
                  <label className="block">
                    <span className="mb-2 block text-[11.5px] font-bold uppercase tracking-[0.22em] text-muted">Service Needed</span>
                    <select name="serviceNeeded" className="field field-select" defaultValue="">
                      <option value="" disabled>
                        Select a service
                      </option>
                      {SERVICE_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="block">
                  <span className="mb-2 block text-[11.5px] font-bold uppercase tracking-[0.22em] text-muted">Describe Your Emergency</span>
                  <textarea name="message" rows={4} placeholder="Tell us what happened and where you are." className="field resize-none" />
                </label>

                {error && (
                  <p className="rounded-2xl border border-coral/30 bg-coral/10 px-4 py-3 text-[13.5px] font-medium text-ink">{error}</p>
                )}

                <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    className="group inline-flex h-[56px] w-full items-center justify-between rounded-full bg-teal-700 pl-6 pr-2 text-[13px] font-extrabold uppercase tracking-[0.18em] text-white shadow-teal transition-all duration-500 hover:scale-[1.02] hover:bg-coral hover:shadow-lift sm:h-[60px] sm:w-auto sm:pl-7 sm:text-[14px]"
                  >
                    Get Help Now
                    <span className="ml-4 grid h-10 w-10 place-items-center rounded-full bg-coral text-white transition-all duration-500 group-hover:bg-white group-hover:text-coral sm:ml-6 sm:h-11 sm:w-11">
                      <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-500 group-hover:translate-x-0.5" />
                    </span>
                  </button>
                  <p className="text-center text-[12.5px] text-muted sm:text-left">
                    Emergency? Call{" "}
                    <a href={PHONE_HREF} className="font-bold text-teal-700">
                      {PHONE}
                    </a>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, name, type = "text", required, placeholder, autoComplete,
}: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string; autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11.5px] font-bold uppercase tracking-[0.22em] text-muted">
        {label}
        {required && <span className="text-coral">*</span>}
      </span>
      <input name={name} type={type} required={required} placeholder={placeholder} autoComplete={autoComplete} className="field" />
    </label>
  );
}

function Row({
  Icon, label, value, sub, href, reveal,
}: {
  Icon: typeof PhoneIcon; label: string; value: string; sub?: string; href?: string; reveal?: boolean;
}) {
  const inner = (
    <>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur transition-colors duration-500 group-hover:bg-coral group-hover:ring-coral sm:h-11 sm:w-11">
        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 sm:text-[10.5px]">{label}</span>
        <span className="mt-0.5 block text-[14px] font-bold leading-snug text-white sm:text-[16px]">{value}</span>
        {sub && <span className="block text-[12px] text-white/70 sm:text-[13px]">{sub}</span>}
      </span>
    </>
  );
  const cls = "group flex items-center gap-3 sm:gap-4";
  return (
    <li data-ct-r={reveal ? "" : undefined}>
      {href ? <a href={href} className={cls}>{inner}</a> : <div className={cls}>{inner}</div>}
    </li>
  );
}
