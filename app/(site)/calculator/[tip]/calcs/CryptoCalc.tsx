"use client";

import { useState } from "react";
import { ui, Callout } from "@/components/ui";
import { NumberField, ResultRows, ResultHero, SplitBar, CopyButton, BAR } from "@/components/ui/fields";
import { calcCrypto, PLAFOANE, fmtLei } from "@/lib/fiscal";

export default function CryptoCalc() {
  const [vanzari, setVanzari] = useState(50000);
  const [cost, setCost] = useState(30000);
  const [alte, setAlte] = useState(0);
  const castig = Math.max(0, vanzari - cost);
  const r = calcCrypto(castig, alte);
  const pierdere = cost > vanzari;

  const text = [
    `Câștig crypto: ${fmtLei(r.castig)} lei`,
    `Impozit 16%: ${fmtLei(r.impozit)} lei`,
    `CASS: ${fmtLei(r.cass)} lei`,
    `Rămâne: ${fmtLei(r.ramas)} lei`,
    "Calculat pe focustax.ro",
  ].join("\n");

  return (
    <div className={ui.calc}>
      <div className={ui.panel}>
        <p className={ui.panelTitle}>Tranzacții încheiate în an</p>
        <NumberField label="Total încasat din vânzări" value={vanzari} onChange={setVanzari} max={1000000} step={500} />
        <NumberField label="Cost de achiziție al monedelor vândute" value={cost} onChange={setCost} max={1000000} step={500} hint="Inclusiv comisioanele de tranzacționare." />
        <NumberField label="Alte venituri pasive în an" value={alte} onChange={setAlte} max={300000} step={1000} hint="Dividende, chirii, dobânzi — pentru pragul CASS." />
        {pierdere && (
          <div style={{ marginTop: 20 }}>
            <Callout tone="accent" title="Pierdere">
              Ai o pierdere de {fmtLei(cost - vanzari)} lei. Nu datorezi impozit, iar pierderea se declară în D212.
            </Callout>
          </div>
        )}
      </div>

      <div className={`${ui.panel} ${ui.resultPanel}`}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p className={ui.panelTitle} style={{ margin: 0 }}>Rezultat</p>
          <CopyButton text={text} />
        </div>
        <ResultHero label="Îți rămâne din câștig" value={r.ramas} />
        <ResultRows rows={[
          { label: "Câștig net", value: r.castig },
          { label: "Impozit 16%", hint: r.scutit ? `scutit: câștig total sub ${PLAFOANE.CRYPTO_ANUAL} lei` : undefined, value: r.impozit, tone: "neg", text: r.scutit ? "scutit" : undefined },
          { label: "CASS 10%", hint: r.treapta ? `bază fixă: ${r.treapta} salarii minime` : "sub pragul de 6 salarii minime", value: r.cass, tone: "neg", text: r.cass ? undefined : "nu se datorează" },
          { label: "Total de plată", value: r.totalTaxe, strong: true },
        ]} />
        <SplitBar parts={[
          { label: "Rămas", value: r.ramas, color: BAR.net },
          { label: "Impozit", value: r.impozit, color: BAR.impozit },
          { label: "CASS", value: r.cass, color: BAR.cass },
        ]} />
        <p className={ui.note}>Prin DAC8, platformele raportează tranzacțiile direct la ANAF. Declari câștigul în D212 până la 25 mai.</p>
      </div>
    </div>
  );
}
