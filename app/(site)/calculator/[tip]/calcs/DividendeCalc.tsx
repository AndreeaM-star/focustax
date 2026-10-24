"use client";

import { useState } from "react";
import { ui, Callout } from "@/components/ui";
import { NumberField, ResultRows, ResultHero, SplitBar, CopyButton, BAR } from "@/components/ui/fields";
import { calcDividende, salariuMinimAnual, fmtLei } from "@/lib/fiscal";

export default function DividendeCalc() {
  const s = salariuMinimAnual();
  const [brut, setBrut] = useState(60000);
  const [alte, setAlte] = useState(0);
  const r = calcDividende(brut, alte);

  const text = [
    `Dividend brut: ${fmtLei(r.brut)} lei`,
    `Impozit 16%: ${fmtLei(r.impozit)} lei`,
    `CASS: ${fmtLei(r.cass)} lei`,
    `Rămâne: ${fmtLei(r.ramas)} lei`,
    "Calculat pe focustax.ro",
  ].join("\n");

  return (
    <div className={ui.calc}>
      <div className={ui.panel}>
        <p className={ui.panelTitle}>Date</p>
        <NumberField label="Dividende brute distribuite în an" value={brut} onChange={setBrut} max={500000} step={1000} />
        <NumberField label="Alte venituri pasive în același an" value={alte} onChange={setAlte} max={300000} step={1000} hint="Chirii (venit net), dobânzi, câștiguri din investiții sau crypto. Contează pentru pragul CASS." />
        <div style={{ marginTop: 24 }}>
          <Callout tone="info" title="Trepte CASS pe venituri pasive (2026)">
            Sub {fmtLei(6 * s)} lei: 0 · {fmtLei(6 * s)}–{fmtLei(12 * s)} lei: {fmtLei(0.6 * s)} lei ·
            {" "}{fmtLei(12 * s)}–{fmtLei(24 * s)} lei: {fmtLei(1.2 * s)} lei · peste {fmtLei(24 * s)} lei: {fmtLei(2.4 * s)} lei.
          </Callout>
        </div>
      </div>

      <div className={`${ui.panel} ${ui.resultPanel}`}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p className={ui.panelTitle} style={{ margin: 0 }}>Rezultat</p>
          <CopyButton text={text} />
        </div>
        <ResultHero label="Îți rămâne" value={r.ramas} sub={`${Math.round((r.ramas / Math.max(1, r.brut)) * 100)}% din dividendul brut`} />
        <ResultRows rows={[
          { label: "Dividend brut", value: r.brut },
          { label: "Impozit pe dividende 16%", hint: "reținut la sursă de firmă", value: r.impozit, tone: "neg" },
          { label: "Dividend net încasat", value: r.net },
          { label: "CASS 10%", hint: r.treapta ? `bază fixă: ${r.treapta} salarii minime = ${fmtLei(r.bazaCass)} lei` : "sub pragul de 6 salarii minime", value: r.cass, tone: "neg", text: r.cass ? undefined : "nu se datorează" },
          { label: "Îți rămâne", value: r.ramas, strong: true },
        ]} />
        <SplitBar parts={[
          { label: "Rămas", value: r.ramas, color: BAR.net },
          { label: "Impozit", value: r.impozit, color: BAR.impozit },
          { label: "CASS", value: r.cass, color: BAR.cass },
        ]} />
        <p className={ui.note}>CASS-ul se declară și se plătește de tine prin Declarația unică, până la 25 mai a anului următor.</p>
      </div>
    </div>
  );
}
