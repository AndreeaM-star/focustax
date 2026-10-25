"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import s from "./CookieBanner.module.css";

const CHEIE = "ft-consent";

type Gtag = (...args: unknown[]) => void;

function aplica(acord: boolean) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("consent", "update", {
    analytics_storage: acord ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

/** Deschide din nou bannerul (ex. din footer: „Setări cookie”) */
export function deschideSetariCookie() {
  window.dispatchEvent(new Event("ft-cookie-settings"));
}

/**
 * Banner de consimțământ: „Accept” și „Refuz” au aceeași greutate vizuală.
 * Google Analytics pornește cu consimțământ refuzat (Consent Mode v2, în layout)
 * și primește acordul doar după „Accept”.
 */
export default function CookieBanner() {
  const [vizibil, setVizibil] = useState(false);

  useEffect(() => {
    let salvat: string | null = null;
    try { salvat = localStorage.getItem(CHEIE); } catch { /* stocare indisponibilă */ }
    if (salvat !== "da" && salvat !== "nu") setVizibil(true);
    const redeschide = () => setVizibil(true);
    window.addEventListener("ft-cookie-settings", redeschide);
    return () => window.removeEventListener("ft-cookie-settings", redeschide);
  }, []);

  const alege = (acord: boolean) => {
    try { localStorage.setItem(CHEIE, acord ? "da" : "nu"); } catch { /* stocare indisponibilă */ }
    aplica(acord);
    setVizibil(false);
  };

  if (!vizibil) return null;

  return (
    <div className={s.banner} role="dialog" aria-live="polite" aria-label="Preferințe cookie">
      <p className={s.text}>
        Folosim Google Analytics ca să vedem ce pagini sunt utile, doar dacă ești de acord. Nu folosim cookie-uri de reclamă.{" "}
        <Link href="/confidentialitate">Detalii</Link>
      </p>
      <div className={s.actions}>
        <button type="button" className={s.btn} onClick={() => alege(false)}>Refuz</button>
        <button type="button" className={s.btn} onClick={() => alege(true)}>Accept</button>
      </div>
    </div>
  );
}
