"use client";

import React, { useEffect, useState } from "react";

type Consent = {
  necessary: boolean;
  analytics: boolean;
};

const STORAGE_KEY = "tm_cookie_consent_v1";

function setCookie(name: string, value: string, days = 180) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [consent, setConsent] = useState<Consent>({
    necessary: true,
    analytics: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setOpen(true);
      return;
    }
    try {
      const parsed = JSON.parse(saved) as Consent;
      setConsent({
        necessary: true,
        analytics: !!parsed.analytics,
      });
      setOpen(false);
    } catch {
      setOpen(true);
    }
  }, []);

  const save = (next: Consent) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    // optional cookie so you can read on server if needed
    setCookie("tm_cookie_consent", JSON.stringify(next));
    // optional global flag you can use elsewhere
    (window as any).__TM_CONSENT__ = next;
    setConsent(next);
    setOpen(false);
  };

  const acceptAll = () => save({ necessary: true, analytics: true });
  const reject = () => save({ necessary: true, analytics: false });
  const savePrefs = () => save({ necessary: true, analytics: consent.analytics });

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[9999] p-4 sm:p-6">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/90 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.7)]">
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-white/50">
                Cookies
              </p>
              <h3 className="mt-2 text-lg sm:text-xl font-semibold text-white">
                We use cookies to improve your experience
              </h3>
              <p className="mt-2 text-sm sm:text-base text-white/65 max-w-3xl">
                We use essential cookies to make this site work. With your
                permission, we may also use analytics cookies to understand
                usage and improve performance.
                <a
                  href="/policy"
                  className="ml-2 text-orange-400 hover:text-orange-300 underline underline-offset-4"
                >
                  Read our Privacy Policy
                </a>
                .
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-white/70 hover:bg-white/[0.06]"
              aria-label="Close cookie banner"
            >
              ✕
            </button>
          </div>

          {customize && (
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-white">Necessary cookies</p>
                  <p className="text-sm text-white/60">
                    Required for core functionality (always on).
                  </p>
                </div>
                <div className="text-sm text-white/50">Enabled</div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-white">Analytics cookies</p>
                  <p className="text-sm text-white/60">
                    Help us understand traffic and improve the site.
                  </p>
                </div>

               <label className="inline-flex items-center gap-3 select-none">
  <span className="text-sm text-white/50">Off</span>

  <span className="relative inline-flex items-center">
    <input
      type="checkbox"
      checked={consent.analytics}
      onChange={(e) =>
        setConsent((c) => ({ ...c, analytics: e.target.checked }))
      }
      className="peer sr-only"
      aria-label="Enable analytics cookies"
    />
    <span
      className={[
        "h-7 w-12 rounded-full border border-white/10 transition-colors",
        "bg-white/[0.06] peer-checked:bg-orange-500/80",
      ].join(" ")}
    />
    <span
      className={[
        "absolute left-1 top-1 h-5 w-5 rounded-full bg-black transition-transform",
        "peer-checked:translate-x-5",
      ].join(" ")}
    />
  </span>

  <span className="text-sm text-white/50">On</span>
</label>

              </div>
            </div>
          )}

          <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
            <button
              onClick={() => setCustomize((v) => !v)}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white/80 hover:bg-white/[0.06]"
            >
              {customize ? "Hide options" : "Customize"}
            </button>

            <button
              onClick={reject}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white/80 hover:bg-white/[0.06]"
            >
              Reject
            </button>

            {customize ? (
              <button
                onClick={savePrefs}
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-black shadow-[0_14px_40px_rgba(249,115,22,0.35)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
              >
                Save preferences
              </button>
            ) : (
              <button
                onClick={acceptAll}
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-black shadow-[0_14px_40px_rgba(249,115,22,0.35)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
              >
                Accept all
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
