"use client";

import { useState } from "react";
import { ui } from "@/components/ui";
import { NumberField, SelectField, ResultRows, ResultHero } from "@/components/ui/fields";

/** Estimare impozit clădire rezidențială, pe baza valorii impozabile din decizia primăriei */
export default function ImpozitCladire() {
  const an = new Date().getFullYear();
  const [valoare, setValoare] = useState(250000);
  const [anConstructie, setAnConstructie] = useState(1985);
  const [cota, setCota] = useState(0.1);
  const [handicap, setHandicap] = useState<0 | 25 | 50>(0);

  const varsta = an - anConstructie;
  const reducereVarsta = varsta > 100 ? 0.25 : varsta >= 50 ? 0.15 : 0;
  const valImpozabila = valoare * (1 - reducereVarsta);
  const brut = valImpozabila * (cota / 100);
  const reducereHandicap = brut * (handicap / 100);
  const impozit = Math.round(brut - reducereHandicap);

  return (
    <div className={ui.calc}>
      <div className={ui.panel}>
        <NumberField label="Valoarea impozabilă a clădirii" value={valoare} onChange={setValoare} max={2000000} step={5000} hint="O găsești în decizia de impunere de la primărie (înainte de reducerea pentru vechime)." />
        <NumberField label="Anul terminării construcției" value={anConstructie} onChange={(v) => setAnConstructie(Math.min(an, v))} min={1800} max={an} step={1} suffix="" />
        <SelectField
          label="Cota stabilită de consiliul local"
          value={cota}
          onChange={setCota}
          options={[0.08, 0.1, 0.15, 0.2].map((c) => ({ value: c, label: `${c.toLocaleString("ro-RO")}%${c === 0.1 ? " (cea mai frecventă)" : ""}` }))}
        />
        <SelectField
          label="Reducere pentru dizabilitate"
          value={handicap}
          onChange={setHandicap}
          options={[{ value: 0, label: "Nu e cazul" }, { value: 25, label: "Handicap accentuat (−25%)" }, { value: 50, label: "Handicap grav (−50%)" }]}
        />
      </div>
      <div className={ui.panel}>
        <ResultHero label="Impozit estimat pe an" value={impozit} />
        <ResultRows rows={[
          { label: "Valoare impozabilă", value: valoare },
          { label: "Reducere pentru vechime", hint: reducereVarsta ? `${varsta} ani → −${reducereVarsta * 100}%` : "sub 50 de ani", value: valoare * reducereVarsta, tone: "pos", text: reducereVarsta ? undefined : "—" },
          { label: `Impozit la cota de ${cota.toLocaleString("ro-RO")}%`, value: Math.round(brut) },
          ...(handicap ? [{ label: `Reducere dizabilitate ${handicap}%`, value: Math.round(reducereHandicap), tone: "pos" as const }] : []),
          { label: "De plată", value: impozit, strong: true },
        ]} />
        <p className={ui.note}>Plata integrală până la 31 martie aduce de obicei o bonificație stabilită de primărie (până la 10%).</p>
      </div>
    </div>
  );
}
