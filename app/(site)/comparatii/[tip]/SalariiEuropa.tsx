"use client";

import { useMemo, useState } from "react";
import { ui } from "@/components/ui";
import type { SalariuTara } from "@/lib/salarii-europa";
import s from "./salarii.module.css";

type Sortare = "netPeCost" | "brut" | "net" | "cost";

const eur = (v: number) => `${Math.round(v).toLocaleString("ro-RO")} €`;
const pct = (v: number) => `${(v * 100).toLocaleString("ro-RO", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;

const CULORI = {
  net: "var(--brand)",
  impozit: "#7c3aed",
  angajat: "#d97706",
  angajator: "#64748b",
};

export default function SalariiEuropa({ tari }: { tari: SalariuTara[] }) {
  const [perioada, setPerioada] = useState<"luna" | "an">("luna");
  const [sortare, setSortare] = useState<Sortare>("netPeCost");
  const div = perioada === "luna" ? 12 : 1;

  const lista = useMemo(() => {
    const val = (t: SalariuTara) => (sortare === "netPeCost" ? t.net / t.cost : t[sortare]);
    return [...tari].sort((a, b) => val(b) - val(a));
  }, [tari, sortare]);

  const unitate = perioada === "luna" ? "€ / lună" : "€ / an";

  return (
    <>
      <div className={s.controls}>
        <div className={ui.segmented} role="radiogroup" aria-label="Perioadă" style={{ minWidth: 220 }}>
          {(["luna", "an"] as const).map((p) => (
            <button key={p} type="button" role="radio" aria-checked={perioada === p} className={`${ui.segBtn} ${perioada === p ? ui.segBtnActive : ""}`} onClick={() => setPerioada(p)}>
              {p === "luna" ? "Pe lună" : "Pe an"}
            </button>
          ))}
        </div>
        <label className={s.sortLabel}>
          Ordonează după
          <select className={ui.select} style={{ height: 40, width: "auto" }} value={sortare} onChange={(e) => setSortare(e.target.value as Sortare)}>
            <option value="netPeCost">Cât ajunge în mână din cost</option>
            <option value="net">Net în mână</option>
            <option value="brut">Salariu brut</option>
            <option value="cost">Cost total angajator</option>
          </select>
        </label>
      </div>

      <div className={s.legend} aria-hidden>
        <span><i style={{ background: CULORI.net }} />Net în mână</span>
        <span><i style={{ background: CULORI.impozit }} />Impozit pe venit</span>
        <span><i style={{ background: CULORI.angajat }} />Contribuții angajat</span>
        <span><i style={{ background: CULORI.angajator }} />Contribuții angajator</span>
      </div>

      <div className={ui.tableWrap}>
        <table className={`${ui.table} ${s.table}`}>
          <caption className="visually-hidden">Costul salariului mediu brut în țările europene, {unitate}, 2025</caption>
          <thead>
            <tr>
              <th scope="col">Țară</th>
              <th scope="col" className={ui.numCell}>Salariu brut<small>{unitate}</small></th>
              <th scope="col" className={ui.numCell}>Contribuții angajator<small>{unitate}</small></th>
              <th scope="col" className={ui.numCell}>Cost total angajator<small>{unitate}</small></th>
              <th scope="col" className={ui.numCell}>Impozit pe venit<small>{unitate}</small></th>
              <th scope="col" className={ui.numCell}>Contribuții angajat<small>{unitate}</small></th>
              <th scope="col" className={ui.numCell}>Net în mână<small>{unitate}</small></th>
              <th scope="col" className={ui.numCell}>Net ÷ brut<small>%</small></th>
              <th scope="col" className={ui.numCell}>Net ÷ cost total<small>%</small></th>
              <th scope="col" className={s.barCol}>Unde merge costul total</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((t, i) => {
              const parti = [
                { k: "net", v: t.net, c: CULORI.net, l: "Net" },
                { k: "impozit", v: t.impozit, c: CULORI.impozit, l: "Impozit" },
                { k: "angajat", v: t.contribAngajat, c: CULORI.angajat, l: "Contribuții angajat" },
                { k: "angajator", v: t.contribAngajator, c: CULORI.angajator, l: "Contribuții angajator" },
              ];
              const total = parti.reduce((a, p) => a + Math.max(0, p.v), 0);
              return (
                <tr key={t.cod} className={t.cod === "RO" ? s.ro : undefined}>
                  <th scope="row" className={s.country}>
                    <span className={s.rank}>{i + 1}</span>
                    {t.nume}
                    {t.sursa === "calcul" && <sup title="Calcul FocusTax — țara nu mai e în Eurostat">*</sup>}
                  </th>
                  <td className={ui.numCell}>{eur(t.brut / div)}</td>
                  <td className={`${ui.numCell} ${s.muted}`}>+{eur(t.contribAngajator / div)}</td>
                  <td className={`${ui.numCell} ${s.strong}`}>{eur(t.cost / div)}</td>
                  <td className={`${ui.numCell} ${s.muted}`}>−{eur(t.impozit / div)}</td>
                  <td className={`${ui.numCell} ${s.muted}`}>−{eur(t.contribAngajat / div)}</td>
                  <td className={`${ui.numCell} ${s.net}`}>{eur(t.net / div)}</td>
                  <td className={ui.numCell}>{pct(t.net / t.brut)}</td>
                  <td className={`${ui.numCell} ${s.key}`}>{pct(t.net / t.cost)}</td>
                  <td className={s.barCol}>
                    <span className={s.bar} role="img" aria-label={parti.map((p) => `${p.l} ${pct(p.v / t.cost)}`).join(", ")}>
                      {parti.map((p) => <span key={p.k} style={{ width: `${(Math.max(0, p.v) / total) * 100}%`, background: p.c }} />)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className={s.foot}>
        Persoană singură, fără copii, la salariul mediu brut din fiecare țară, 2025. Sume în euro{perioada === "luna" ? ", împărțite la 12 (include salariile 13–14 acolo unde există)" : ""}.
        {" "}<sup>*</sup> Regatul Unit nu mai apare în Eurostat după Brexit; valorile sunt calculate de FocusTax cu regulile 2025/26.
      </p>
    </>
  );
}
