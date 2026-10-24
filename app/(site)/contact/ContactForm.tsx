"use client";

import { useState } from "react";
import { ui, Callout } from "@/components/ui";
import s from "./contact.module.css";

/** Pregătește mesajul în clientul de email al utilizatorului (fără server) */
export default function ContactForm() {
  const [nume, setNume] = useState("");
  const [mesaj, setMesaj] = useState("");
  const [deschis, setDeschis] = useState(false);

  return (
    <form
      className={ui.panel}
      onSubmit={(e) => {
        e.preventDefault();
        const subiect = encodeURIComponent(`Mesaj FocusTax${nume ? ` de la ${nume}` : ""}`);
        window.location.href = `mailto:focustaxro@gmail.com?subject=${subiect}&body=${encodeURIComponent(mesaj)}`;
        setDeschis(true);
      }}
    >
      <div className={ui.field}>
        <label className={ui.fieldLabel} htmlFor="c-nume">Nume</label>
        <div className={ui.inputWrap} style={{ marginTop: 8 }}>
          <input id="c-nume" className={ui.input} style={{ fontWeight: 500 }} value={nume} onChange={(e) => setNume(e.target.value)} autoComplete="name" />
        </div>
      </div>
      <div className={ui.field}>
        <label className={ui.fieldLabel} htmlFor="c-mesaj">Mesaj</label>
        <textarea id="c-mesaj" className={s.textarea} required rows={7} value={mesaj} onChange={(e) => setMesaj(e.target.value)} placeholder="Scrie aici întrebarea sau sugestia ta…" />
      </div>
      <button type="submit" className={`${ui.btn} ${ui.btnPrimary}`} style={{ marginTop: 20 }}>Deschide în aplicația de email</button>
      {deschis && (
        <div style={{ marginTop: 16 }}>
          <Callout tone="brand">Mesajul s-a deschis în aplicația ta de email. Apasă „Trimite” acolo ca să ajungă la noi.</Callout>
        </div>
      )}
    </form>
  );
}
