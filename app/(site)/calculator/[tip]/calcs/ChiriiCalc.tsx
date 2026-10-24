"use client";

import { useState } from "react";
import { ui } from "@/components/ui";
import { NumberField, Segmented, ResultRows, ResultHero, SplitBar, CopyButton, BAR } from "@/components/ui/fields";
import { calcChirii, fmtLei } from "@/lib/fiscal";

export default function ChiriiCalc() {
  const [perioada, setPerioada] = useState<"luna" | "an">("luna");
  const [suma, setSuma] = useState(2500);
  const [alte, setAlte] = useState(0);
  const anual = perioada === "luna" ? suma * 12 : suma;
  const r = calcChirii(anual, alte);

  const text = [
    `Chirie anuală: ${fmtLei(r.chirieAnuala)} lei`,
    `Impozit 10%: ${fmtLei(r.impozit)} lei`,
    `CASS: ${fmtLei(r.cass)} lei`,
    `Rămâne: ${fmtLei(r.ramas)} lei/an`,
    "Calculat pe focustax.ro",
  ].join("\n");

  return (
    <div className={ui.calc}>
      <div className={ui.panel}>
        <p className={ui.panelTitle}>Date</p>
        <Segmented
          label="Introduc chiria"
          value={perioada}
          onChange={(p) => { setPerioada(p); setSuma(p === "an" ? suma * 12 : Math.round(suma / 12)); }}
          options={[{ value: "luna", label: "Pe lună" }, { value: "an", label: "Pe an" }]}
        />
        <NumberField label={perioada === "luna" ? "Chirie lunară încasată" : "Chirie anuală încasată"} value={suma} onChange={setSuma} max={perioada === "luna" ? 20000 : 240000} step={perioada === "luna" ? 50 : 500} />
        <NumberField label="Alte venituri pasive în an" value={alte} onChange={setAlte} max={300000} step={1000} hint="Dividende, dobânzi, investiții — contează pentru pragul CASS." />
      </div>

      <div className={`${ui.panel} ${ui.resultPanel}`}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p className={ui.panelTitle} style={{ margin: 0 }}>Rezultat anual</p>
          <CopyButton text={text} />
        </div>
        <ResultHero label="Îți rămâne" value={r.ramas} sub={`≈ ${fmtLei(r.ramas / 12)} lei pe lună`} />
        <ResultRows rows={[
          { label: "Chirie încasată pe an", value: r.chirieAnuala },
          { label: "Deducere forfetară 20%", hint: "nu se impozitează", value: r.deducere },
          { label: "Venit net impozabil", value: r.venitNet },
          { label: "Impozit pe venit 10%", value: r.impozit, tone: "neg" },
          { label: "CASS 10%", hint: r.treapta ? `bază fixă: ${r.treapta} salarii minime` : "sub pragul de 6 salarii minime", value: r.cass, tone: "neg", text: r.cass ? undefined : "nu se datorează" },
          { label: "Total taxe", value: r.totalTaxe, strong: true },
        ]} />
        <SplitBar parts={[
          { label: "Rămas", value: r.ramas, color: BAR.net },
          { label: "Impozit", value: r.impozit, color: BAR.impozit },
          { label: "CASS", value: r.cass, color: BAR.cass },
        ]} />
        <p className={ui.note}>Contractul se înregistrează la ANAF (formularul C168) în 30 de zile. Venitul se declară prin D212 până la 25 mai.</p>
      </div>
    </div>
  );
}
