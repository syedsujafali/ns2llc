"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { EMAIL, HOURS, IMAGES, PHONE, PHONE_HREF, SERVICE_OPTIONS } from "@/lib/content";
import { ArrowRightIcon, CheckIcon, ClockIcon, MailIcon, PhoneIcon } from "./icons";

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
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 1.3, ease: "power4.out", scrollTrigger: { trigger: "[data-ct-panel]", start: "top 80%", once: true } },
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
        <div className="relative min-h-[520px] overflow-hidden lg:min-h-[100svh] lg:rounded-r-[64px]">
          <img
            data-ct-img
            src={IMAGES.contact}
            alt="Close-up of a tire and alloy wheel"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover will-anim"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,48,47,0.05)_0%,rgba(24,48,47,0.35)_55%,rgba(24,48,47,0.75)_100%)]" />

          <div className="relative flex h-full flex-col justify-end p-8 sm:p-12 lg:p-16">
            <p data-ct-r className="eyebrow !text-white [&::before]:bg-white/70">
              Get In Touch
            </p>
            <h2 data-ct-r className="display mt-5 text-[clamp(2.8rem,6vw,5.6rem)] text-white">
              Contact Us
            </h2>
            <p data-ct-r className="mt-4 max-w-[440px] text-[16px] leading-relaxed text-white/85">
              Need immediate roadside assistance or mobile tire service? We’re ready to help.
            </p>

            <ul className="mt-10 space-y-3">
              <Row reveal href={PHONE_HREF} Icon={PhoneIcon} label="Phone" value={PHONE} />
              <Row reveal href={`mailto:${EMAIL}`} Icon={MailIcon} label="Email" value={EMAIL} />
              <Row reveal Icon={ClockIcon} label="Hours" value={HOURS} sub="Always available when you need us." />
            </ul>
          </div>
        </div>

        {/* Right — floating form */}
        <div className="relative flex items-center px-5 py-16 sm:px-8 lg:px-16 lg:py-28">
          <svg aria-hidden className="pointer-events-none absolute right-0 top-0 h-[300px] w-[60%] opacity-70" viewBox="0 0 600 300" fill="none" preserveAspectRatio="none">
            <path d="M0 260 C 160 200, 300 40, 640 20" stroke="#6d9d96" strokeWidth="1.5" />
            <path d="M0 300 C 180 240, 320 80, 640 60" stroke="#d97862" strokeWidth="1" opacity="0.5" />
          </svg>

          <div data-ct-panel className="relative w-full rounded-[40px] border border-sage-200 bg-white p-6 shadow-lift sm:p-10 lg:-ml-24 lg:p-12">
            {sent ? (
              <div className="flex min-h-[460px] flex-col items-center justify-center text-center">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-teal-700 text-white shadow-teal">
                  <CheckIcon className="h-9 w-9" />
                </span>
                <h3 className="display mt-6 text-[28px] text-ink">Your request is ready</h3>
                <p className="mt-3 max-w-[400px] text-[15px] leading-relaxed text-muted">
                  We’ve opened your email app with the details filled in. For immediate roadside help, call us
                  now at{" "}
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
              <form onSubmit={onSubmit} noValidate className="space-y-5">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-coral">Request Service</p>
                  <h3 className="display mt-2 text-[28px] text-ink sm:text-[32px]">Tell us where you are.</h3>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full Name" name="fullName" required placeholder="Your name" autoComplete="name" />
                  <Field label="Email" name="email" type="email" required placeholder="you@email.com" autoComplete="email" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
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
                  <textarea name="message" rows={5} placeholder="Tell us what happened and where you are." className="field resize-none" />
                </label>

                {error && (
                  <p className="rounded-2xl border border-coral/30 bg-coral/10 px-4 py-3 text-[13.5px] font-medium text-ink">{error}</p>
                )}

                <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    className="group inline-flex h-[60px] w-full items-center justify-between rounded-full bg-teal-700 pl-7 pr-2 text-[14px] font-extrabold uppercase tracking-[0.18em] text-white shadow-teal transition-all duration-500 hover:scale-[1.02] hover:bg-coral hover:shadow-lift sm:w-auto"
                  >
                    Get Help Now
                    <span className="ml-6 grid h-11 w-11 place-items-center rounded-full bg-coral text-white transition-all duration-500 group-hover:bg-white group-hover:text-coral">
                      <ArrowRightIcon className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-0.5" />
                    </span>
                  </button>
                  <p className="text-[12.5px] text-muted">
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
  label,
  name,
  type = "text",
  required,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
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
  Icon,
  label,
  value,
  sub,
  href,
  reveal,
}: {
  Icon: typeof PhoneIcon;
  label: string;
  value: string;
  sub?: string;
  href?: string;
  reveal?: boolean;
}) {
  const inner = (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur transition-colors duration-500 group-hover:bg-coral group-hover:ring-coral">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-[10.5px] font-bold uppercase tracking-[0.3em] text-white/60">{label}</span>
        <span className="mt-0.5 block text-[16px] font-bold leading-snug text-white">{value}</span>
        {sub && <span className="block text-[13px] text-white/70">{sub}</span>}
      </span>
    </>
  );
  const cls = "group flex items-center gap-4";
  return (
    <li data-ct-r={reveal ? "" : undefined}>
      {href ? (
        <a href={href} className={cls}>
          {inner}
        </a>
      ) : (
        <div className={cls}>{inner}</div>
      )}
    </li>
  );
}
