"use client";

import { useState } from "react";
import { ui, Badge, Callout } from "@/components/ui";
import { NumberField, Checkbox } from "@/components/ui/fields";
import {
  calcSalariu, calcPfa, calcMicro, calcImpozitProfit, calcDividende,
  salariuMinim, COTE, PLAFOANE, fmtLei,
} from "@/lib/fiscal";
import s from "./comparator.module.css";

interface Varianta {
  id: string;
  titlu: string;
  net: number;
  taxe: number;
  detalii: { label: string; val: number; neg?: boolean }[];
  indisponibil?: string;
}

export default function Comparator() {
  const [buget, setBuget] = useState(180000);
  const [cheltuieli, setCheltuieli] = useState(15000);
  const [salariatMicro, setSalariatMicro] = useState(true);

  const smin = salariuMinim();
  const venitNet = Math.max(0, buget - cheltuieli);

  // 1. Angajat: angajatorul cheltuie tot bugetul (brut + CAM)
  const brutLunar = Math.floor(buget / 12 / (1 + COTE.CAM));
  const sal = calcSalariu(brutLunar);
  const angajat: Varianta = {
    id: "cim", titlu: "Salariat (CIM)",
    net: sal.net * 12,
    taxe: buget - sal.net * 12,
    detalii: [
      { label: "Salariu brut lunar", val: sal.brut },
      { label: "CAS + CASS (an)", val: (sal.cas + sal.cass) * 12, neg: true },
      { label: "Impozit (an)", val: sal.impozit * 12, neg: true },
      { label: "CAM angajator (an)", val: sal.cam * 12, neg: true },
    ],
  };

  // 2. PFA sistem real
  const p = calcPfa(venitNet);
  const pfa: Varianta = {
    id: "pfa", titlu: "PFA — sistem real",
    net: p.ramas,
    taxe: p.totalTaxe,
    detalii: [
      { label: "Venit net", val: p.venitNet },
      { label: "CAS", val: p.cas, neg: true },
      { label: "CASS", val: p.cass, neg: true },
      { label: "Impozit 10%", val: p.impozit, neg: true },
    ],
  };

  // 3. SRL micro + dividende (opțional: tu ești salariatul obligatoriu, la salariul minim)
  const m = calcMicro(buget);
  const salMin = calcSalariu(smin);
  const costSalariu = salariatMicro ? salMin.costTotal * 12 : 0;
  const profitMicro = Math.max(0, buget - cheltuieli - costSalariu - m.impozit);
  const divMicro = calcDividende(profitMicro, 0);
  const netSalariu = salariatMicro ? salMin.net * 12 : 0;
  const micro: Varianta = {
    id: "micro", titlu: "SRL micro 1% + dividende",
    net: divMicro.ramas + netSalariu,
    taxe: m.impozit + divMicro.impozit + divMicro.cass + (salariatMicro ? (salMin.costTotal - salMin.net) * 12 : 0),
    detalii: [
      { label: "Impozit micro 1%", val: m.impozit, neg: true },
      ...(salariatMicro ? [{ label: "Salariu net încasat (an)", val: netSalariu }] : []),
      { label: "Impozit dividende 16%", val: divMicro.impozit, neg: true },
      { label: "CASS dividende", val: divMicro.cass, neg: true },
    ],
    indisponibil: m.depasestePlafon ? `Peste 100.000 EUR (≈ ${fmtLei(PLAFOANE.MICRO_EUR * PLAFOANE.CURS_EUR)} lei) nu se mai poate aplica regimul micro.` : undefined,
  };

  // 4. SRL impozit pe profit + dividende
  const prof = calcImpozitProfit(venitNet, buget);
  const divProf = calcDividende(Math.max(0, venitNet - prof.impozit), 0);
  const profit: Varianta = {
    id: "profit", titlu: "SRL profit 16% + dividende",
    net: divProf.ramas,
    taxe: prof.impozit + divProf.impozit + divProf.cass,
    detalii: [
      { label: "Impozit pe profit 16%", val: prof.impozit, neg: true },
      { label: "Impozit dividende 16%", val: divProf.impozit, neg: true },
      { label: "CASS dividende", val: divProf.cass, neg: true },
    ],
  };

  const variante = [angajat, pfa, micro, profit];
  const disponibile = variante.filter((v) => !v.indisponibil);
  const max = Math.max(...disponibile.map((v) => v.net), 1);
  const best = disponibile.reduce((a, b) => (b.net > a.net ? b : a));

  return (
    <>
      <div className={ui.panel}>
        <div className={s.inputs}>
          <NumberField label="Cât încasezi pe an (fără TVA)" value={buget} onChange={setBuget} max={1000000} step={5000} hint="Pentru salariat: costul total pe care îl plătește angajatorul." />
          <NumberField label="Cheltuieli de business pe an" value={cheltuieli} onChange={setCheltuieli} max={Math.max(buget, 5000)} step={1000} hint="Se aplică la PFA și SRL." />
        </div>
        <Checkbox checked={salariatMicro} onChange={setSalariatMicro}>
          La SRL micro, te angajezi pe tine cu salariul minim <span style={{ color: "var(--muted)" }}>(regimul micro cere cel puțin un salariat)</span>
        </Checkbox>
      </div>

      <div className={s.bars} role="list">
        {variante.map((v) => (
          <div key={v.id} className={`${s.bar} ${v.id === best.id ? s.best : ""}`} role="listitem">
            <div className={s.barHead}>
              <strong>{v.titlu}</strong>
              {v.id === best.id && <Badge tone="brand">cel mai mult rămâne aici</Badge>}
            </div>
            {v.indisponibil ? (
              <p className={s.unavailable}>{v.indisponibil}</p>
            ) : (
              <>
                <div className={s.track}><span style={{ width: `${(v.net / max) * 100}%` }} /></div>
                <div className={s.barNums}>
                  <span><b>{fmtLei(v.net)} lei</b> pe an · {fmtLei(v.net / 12)} lei/lună</span>
                  <span className={s.taxe}>taxe {fmtLei(v.taxe)} lei ({Math.round((v.taxe / Math.max(1, buget)) * 100)}%)</span>
                </div>
                <details className={s.details}>
                  <summary>Detalii</summary>
                  <ul>
                    {v.detalii.map((d) => (
                      <li key={d.label}><span>{d.label}</span><span style={{ color: d.neg ? "var(--danger)" : undefined }}>{d.neg ? "−" : ""}{fmtLei(d.val)} lei</span></li>
                    ))}
                  </ul>
                </details>
              </>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <Callout tone="neutral">
          Comparația ține cont doar de taxe. Contează și protecția (concediu medical, șomaj, pensie), costul contabilității
          (mai mare la SRL), răspunderea pentru datorii și cât de ușor scoți banii din firmă.
        </Callout>
      </div>
    </>
  );
}
