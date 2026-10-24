"use client";

import { useState } from "react";
import { Badge, ui } from "@/components/ui";
import s from "./d212.module.css";

type Venit = "pfa" | "chirii" | "dividende" | "investitii" | "crypto" | "drepturi";

const VENITURI: { id: Venit; label: string; capitol: string; contributii: string; documente: string[] }[] = [
  {
    id: "pfa", label: "PFA / activitate independentă",
    capitol: "Capitolul I — venituri din activități independente (sistem real sau normă de venit)",
    contributii: "Impozit 10%; CAS 25% la baza de 12 sau 24 salarii minime dacă venitul net depășește 12 salarii minime; CASS 10% pe venitul net, între 6 și 72 salarii minime.",
    documente: ["Registrul de încasări și plăți", "Facturile emise și chitanțele de cheltuieli", "Norma de venit, dacă e cazul"],
  },
  {
    id: "chirii", label: "Chirii",
    capitol: "Capitolul I — venituri din cedarea folosinței bunurilor",
    contributii: "Impozit 10% pe venitul net (chiria minus 20%); CASS în trepte de 6/12/24 salarii minime, cumulat cu celelalte venituri pasive.",
    documente: ["Contractele de închiriere înregistrate (C168)", "Sumele încasate pe fiecare contract"],
  },
  {
    id: "dividende", label: "Dividende",
    capitol: "Capitolul II — CASS pentru venituri din dividende (impozitul de 16% e reținut de firmă)",
    contributii: "CASS în trepte de 6/12/24 salarii minime, dacă totalul veniturilor pasive depășește 6 salarii minime.",
    documente: ["Hotărârile AGA de distribuire", "Sumele brute încasate"],
  },
  {
    id: "investitii", label: "Bursă, dobânzi, fonduri",
    capitol: "Capitolul I — câștiguri din transferul titlurilor de valoare (dacă brokerul nu reține impozitul)",
    contributii: "Impozit reținut la sursă de brokerii români; prin D212 declari brokerii străini. CASS în trepte, cumulat cu celelalte venituri pasive.",
    documente: ["Rapoartele anuale de la broker", "Certificatele de reținere a impozitului"],
  },
  {
    id: "crypto", label: "Criptomonede",
    capitol: "Capitolul I — venituri din transferul monedei virtuale",
    contributii: "Impozit 16% pe câștigul net anual (din 2026); câștigurile sub 200 lei/tranzacție sunt scutite dacă totalul nu depășește 600 lei. CASS în trepte.",
    documente: ["Istoricul tranzacțiilor de pe fiecare platformă", "Costul de achiziție al monedelor vândute"],
  },
  {
    id: "drepturi", label: "Drepturi de autor",
    capitol: "Capitolul I — venituri din drepturi de proprietate intelectuală",
    contributii: "Impozit 10% după deducerea forfetară de 40% (de obicei reținut la sursă); CAS/CASS dacă se depășesc pragurile.",
    documente: ["Contractele de cesiune", "Certificatele de reținere de la plătitori"],
  },
];

export default function D212Wizard() {
  const [ales, setAles] = useState<Venit[]>(["pfa"]);
  const toggle = (v: Venit) => setAles((a) => (a.includes(v) ? a.filter((x) => x !== v) : [...a, v]));
  const selectate = VENITURI.filter((v) => ales.includes(v.id));

  return (
    <>
      <div className={ui.chips} role="group" aria-label="Tipuri de venituri">
        {VENITURI.map((v) => (
          <button key={v.id} type="button" className={`${ui.chip} ${ales.includes(v.id) ? ui.chipActive : ""}`} aria-pressed={ales.includes(v.id)} onClick={() => toggle(v.id)}>
            {v.label}
          </button>
        ))}
      </div>

      {selectate.length === 0 ? (
        <p className={s.empty}>Alege cel puțin un tip de venit.</p>
      ) : (
        <div className={s.cards}>
          {selectate.map((v) => (
            <article key={v.id} className={s.card}>
              <Badge tone="brand">{v.label}</Badge>
              <h3>{v.capitol}</h3>
              <p>{v.contributii}</p>
              <p className={s.docsTitle}>Ai nevoie de:</p>
              <ul>{v.documente.map((d) => <li key={d}>{d}</li>)}</ul>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
