"use client";

import { useState } from "react";
import Link from "next/link";
import { ui, Icon } from "@/components/ui";
import { PROFILE, type Profil } from "@/lib/calendar";
import s from "./AlerteForm.module.css";

/** Abonare la termenele fiscale personalizate, pe e-mail */
export default function AlerteForm({ sursa = "site" }: { sursa?: string }) {
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState<Profil[]>([]);
  const [acord, setAcord] = useState(false);
  const [stare, setStare] = useState<"idle" | "trimit" | "ok" | "eroare">("idle");
  const [mesaj, setMesaj] = useState("");

  const toggle = (p: Profil) => setProfile((x) => (x.includes(p) ? x.filter((y) => y !== p) : [...x, p]));

  async function trimite(e: React.FormEvent) {
    e.preventDefault();
    setStare("trimit");
    try {
      const r = await fetch("/api/abonare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, profile, acord, sursa }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error ?? "Nu am putut salva abonarea.");
      setStare("ok");
    } catch (err) {
      setMesaj(err instanceof Error ? err.message : "Eroare.");
      setStare("eroare");
    }
  }

  if (stare === "ok") {
    return (
      <div className={s.box}>
        <p className={s.ok}><Icon name="check" /> Gata! Îți trimitem termenele care te privesc, cu câteva zile înainte.</p>
      </div>
    );
  }

  return (
    <form className={s.box} onSubmit={trimite}>
      <div className={s.head}>
        <span className={s.icon}><Icon name="calendar" /></span>
        <div>
          <h2 className={s.title}>Nu mai rata niciun termen</h2>
          <p className={s.lead}>Primești pe e-mail doar termenele și schimbările care te privesc. Gratuit, te poți dezabona oricând.</p>
        </div>
      </div>

      <p className={s.label}>Ce te interesează?</p>
      <div className={ui.chips}>
        {PROFILE.map((p) => (
          <button key={p.id} type="button" className={`${ui.chip} ${profile.includes(p.id) ? ui.chipActive : ""}`} aria-pressed={profile.includes(p.id)} onClick={() => toggle(p.id)}>
            {p.label}
          </button>
        ))}
      </div>

      <div className={s.row}>
        <label className={ui.inputWrap} style={{ flex: 1 }}>
          <span className="visually-hidden">Adresa de e-mail</span>
          <input className={ui.input} style={{ fontWeight: 500 }} type="email" required autoComplete="email" placeholder="adresa ta de e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button type="submit" className={`${ui.btn} ${ui.btnPrimary}`} disabled={stare === "trimit"}>
          {stare === "trimit" ? "Se salvează…" : "Abonează-mă"}
        </button>
      </div>

      <label className={ui.check} style={{ marginTop: 12 }}>
        <input type="checkbox" checked={acord} onChange={(e) => setAcord(e.target.checked)} required />
        <span>Sunt de acord să primesc e-mailuri cu termene și noutăți fiscale de la FocusTax. Detalii în <Link href="/confidentialitate" style={{ textDecoration: "underline" }}>politica de confidențialitate</Link>.</span>
      </label>

      {stare === "eroare" && <p className={s.err} role="alert">{mesaj}</p>}
    </form>
  );
}
