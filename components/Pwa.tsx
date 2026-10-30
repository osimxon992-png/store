"use client";

import { useEffect, useState } from "react";

type InstallEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

const DISMISS_KEY = "one23-install-dismissed";

function wasDismissed() {
  try {
    return localStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

// Registers the service worker and offers an "install app" button (or iOS instructions).
export default function Pwa() {
  const [prompt, setPrompt] = useState<InstallEvent | null>(null);
  const [ios, setIos] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    } else {
      // A worker left over from a production run would serve stale files during development.
      navigator.serviceWorker.getRegistrations().then((regs) => regs.forEach((r) => r.unregister()));
    }
  }, []);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (standalone || wasDismissed()) return;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setPrompt(e as InstallEvent);
    };
    const onInstalled = () => setVisible(false);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);

    // iOS Safari has no install prompt; show manual instructions instead.
    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent) && !/crios|fxios/i.test(navigator.userAgent);
    setIos(isIos);

    // Wait until the intro animation is over before offering the button.
    const timer = window.setTimeout(() => setVisible(true), 4500);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
      window.clearTimeout(timer);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    setShowHelp(false);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {}
  };

  const install = async () => {
    if (prompt) {
      await prompt.prompt();
      const { outcome } = await prompt.userChoice;
      setPrompt(null);
      if (outcome === "accepted") setVisible(false);
    } else if (ios) {
      setShowHelp(true);
    }
  };

  if (!visible || (!prompt && !ios)) return null;

  return (
    <div className="pwa" role="dialog" aria-label="Ilovani o'rnatish">
      {showHelp ? (
        <p className="pwa__help">
          Safari pastidagi <b>Ulashish</b> <span aria-hidden="true">⎋</span> tugmasini bosing va{" "}
          <b>&quot;Bosh ekranga qo&apos;shish&quot;</b> ni tanlang.
        </p>
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/icon-192.png" alt="" className="pwa__icon" />
          <div className="pwa__text">
            <strong>one23 ilovasi</strong>
            <span>Telefoningizga o&apos;rnating</span>
          </div>
          <button className="pwa__install" onClick={install}>
            O&apos;rnatish
          </button>
        </>
      )}
      <button className="pwa__close" onClick={dismiss} aria-label="Yopish">
        ✕
      </button>
    </div>
  );
}
