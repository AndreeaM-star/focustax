"use client";

import { useState } from "react";
import { ui } from "@/components/ui";
import { NumberField, Segmented, Checkbox, SelectField, ResultRows, ResultHero, SplitBar, CopyButton, BAR } from "@/components/ui/fields";
import { calcSalariu, brutDinNet, salariuMinim, fmtLei } from "@/lib/fiscal";

export default function SalariuCalc() {
  const [mod, setMod] = useState<"brut" | "net">("brut");
  const [suma, setSuma] = useState(7000);
  const [persoane, setPersoane] = useState(0);
  const [copii, setCopii] = useState(0);
  const [sub26, setSub26] = useState(false);

  const opt = { persoaneIntretinere: persoane, copiiScoala: copii, sub26 };
  const brut = mod === "brut" ? suma : brutDinNet(suma, opt);
  const r = calcSalariu(brut, opt);
  const smin = salariuMinim();

  const text = [
    `Salariu brut: ${fmtLei(r.brut)} lei`,
    `CAS 25%: ${fmtLei(r.cas)} lei`,
    `CASS 10%: ${fmtLei(r.cass)} lei`,
    `Impozit 10%: ${fmtLei(r.impozit)} lei`,
    `Salariu net: ${fmtLei(r.net)} lei`,
    `Cost total angajator: ${fmtLei(r.costTotal)} lei`,
    "Calculat pe focustax.ro",
  ].join("\n");

  return (
    <div className={ui.calc}>
      <div className={ui.panel}>
        <p className={ui.panelTitle}>Date</p>
        <Segmented
          label="Pornesc de la"
          value={mod}
          onChange={(m) => { setMod(m); setSuma(m === "brut" ? r.brut : r.net); }}
          options={[{ value: "brut", label: "Salariul brut" }, { value: "net", label: "Salariul net dorit" }]}
        />
        <NumberField
          label={mod === "brut" ? "Salariu brut lunar" : "Salariu net dorit"}
          value={suma}
          onChange={setSuma}
          min={0}
          max={40000}
          step={50}
          hint={`Salariul minim brut în vigoare: ${fmtLei(smin)} lei.`}
        />
        <SelectField
          label="Persoane în întreținere"
          value={persoane}
          onChange={setPersoane}
          options={[0, 1, 2, 3, 4].map((n) => ({ value: n, label: n === 4 ? "4 sau mai multe" : String(n) }))}
        />
        <SelectField
          label="Copii minori înscriși la școală"
          value={copii}
          onChange={setCopii}
          options={[0, 1, 2, 3, 4].map((n) => ({ value: n, label: n === 0 ? "Niciunul" : `${n} (+${n * 100} lei deducere)` }))}
        />
        <Checkbox checked={sub26} onChange={setSub26}>
          Am sub 26 de ani <span style={{ color: "var(--muted)" }}>(+15% din salariul minim la deducere)</span>
        </Checkbox>
      </div>

      <div className={`${ui.panel} ${ui.resultPanel}`}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p className={ui.panelTitle} style={{ margin: 0 }}>Rezultat lunar</p>
          <CopyButton text={text} />
        </div>
        <ResultHero
          label={mod === "brut" ? "Salariu net" : "Salariu brut necesar"}
          value={mod === "brut" ? r.net : r.brut}
          sub={mod === "brut" ? `${Math.round((r.net / Math.max(1, r.brut)) * 100)}% din brut ajunge la tine` : `pentru ${fmtLei(r.net)} lei net`}
        />
        <ResultRows rows={[
          { label: "Salariu brut", value: r.brut },
          ...(r.sumaNeimpozabila > 0 ? [{ label: "Sumă neimpozabilă", hint: "scutită de CAS, CASS și impozit", value: r.sumaNeimpozabila, tone: "pos" as const }] : []),
          { label: "CAS — pensie 25%", value: r.cas, tone: "neg" },
          { label: "CASS — sănătate 10%", value: r.cass, tone: "neg" },
          { label: "Deducere personală", hint: r.deducere > 0 ? "reduce baza de impozitare" : "nu se acordă la acest salariu", value: r.deducere, text: r.deducere > 0 ? undefined : "—" },
          { label: "Impozit pe venit 10%", value: r.impozit, tone: "neg" },
          { label: "Salariu net", value: r.net, strong: true },
        ]} />
        <SplitBar parts={[
          { label: "Net", value: r.net, color: BAR.net },
          { label: "CAS", value: r.cas, color: BAR.cas },
          { label: "CASS", value: r.cass, color: BAR.cass },
          { label: "Impozit", value: r.impozit, color: BAR.impozit },
        ]} />
        <div style={{ marginTop: 20 }}>
          <ResultRows rows={[
            { label: "CAM — contribuție asiguratorie pentru muncă 2,25%", value: r.cam },
            { label: "Cost total angajator", value: r.costTotal, strong: true },
          ]} />
        </div>
      </div>
    </div>
  );
}
