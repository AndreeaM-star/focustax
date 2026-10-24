"use client";

import { useState } from "react";
import { ui, Callout, Badge } from "@/components/ui";
import { NumberField, ResultRows, CopyButton, Checkbox } from "@/components/ui/fields";
import { calcMicro, calcImpozitProfit, calcDividende, PLAFOANE, fmtLei } from "@/lib/fiscal";

function scenariu(profitInainteImpozit: number, impozitFirma: number, distribui: boolean) {
  const profitNet = Math.max(0, profitInainteImpozit - impozitFirma);
  const div = calcDividende(distribui ? profitNet : 0);
  return { profitNet, div, laAsociat: distribui ? div.ramas : 0, taxeTotal: impozitFirma + (distribui ? div.impozit + div.cass : 0) };
}

export default function SrlCalc() {
  const [venituri, setVenituri] = useState(300000);
  const [cheltuieli, setCheltuieli] = useState(80000);
  const [distribui, setDistribui] = useState(true);

  const profit = Math.max(0, venituri - cheltuieli);
  const micro = calcMicro(venituri);
  const prof = calcImpozitProfit(profit, venituri);
  const sMicro = scenariu(profit, micro.impozit, distribui);
  const sProfit = scenariu(profit, prof.impozit, distribui);
  const castigator = micro.depasestePlafon ? "profit" : sMicro.taxeTotal <= sProfit.taxeTotal ? "micro" : "profit";

  const text = [
    `Venituri: ${fmtLei(venituri)} lei, cheltuieli: ${fmtLei(cheltuieli)} lei`,
    `Micro 1%: taxe ${fmtLei(sMicro.taxeTotal)} lei, rămân ${fmtLei(distribui ? sMicro.laAsociat : sMicro.profitNet)} lei`,
    `Profit 16%: taxe ${fmtLei(sProfit.taxeTotal)} lei, rămân ${fmtLei(distribui ? sProfit.laAsociat : sProfit.profitNet)} lei`,
    "Calculat pe focustax.ro",
  ].join("\n");

  const Coloana = ({ titlu, id, impozitFirma, sc, nota }: { titlu: string; id: "micro" | "profit"; impozitFirma: number; sc: ReturnType<typeof scenariu>; nota: string }) => (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "space-between", marginBottom: 6 }}>
        <strong style={{ fontFamily: "var(--font-display)" }}>{titlu}</strong>
        {castigator === id && <Badge tone="brand">mai avantajos</Badge>}
      </div>
      <ResultRows rows={[
        { label: nota, value: impozitFirma, tone: "neg" },
        { label: "Profit net firmă", value: sc.profitNet },
        ...(distribui ? [
          { label: "Impozit dividende 16%", value: sc.div.impozit, tone: "neg" as const },
          { label: "CASS asociat", hint: sc.div.treapta ? `treapta ${sc.div.treapta} salarii minime` : "sub prag", value: sc.div.cass, tone: "neg" as const },
          { label: "Ajunge la tine", value: sc.laAsociat, strong: true },
        ] : [{ label: "Rămâne în firmă", value: sc.profitNet, strong: true }]),
      ]} />
    </div>
  );

  return (
    <div className={ui.calc}>
      <div className={ui.panel}>
        <p className={ui.panelTitle}>Date anuale</p>
        <NumberField label="Venituri (cifra de afaceri)" value={venituri} onChange={setVenituri} max={1500000} step={5000} />
        <NumberField label="Cheltuieli deductibile" value={cheltuieli} onChange={setCheltuieli} max={Math.max(venituri, 5000)} step={5000} hint="Salarii, chirii, marfă, servicii, amortizare." />
        <Checkbox checked={distribui} onChange={setDistribui}>Distribui tot profitul ca dividende</Checkbox>
        <div style={{ marginTop: 24 }}>
          {micro.depasestePlafon ? (
            <Callout tone="danger" title="Peste plafonul de microîntreprindere">
              Veniturile depășesc 100.000 EUR (≈ {fmtLei(PLAFOANE.MICRO_EUR * PLAFOANE.CURS_EUR)} lei). Firma plătește obligatoriu impozit pe profit.
            </Callout>
          ) : (
            <Callout tone="info" title="Condiții pentru regimul micro">
              Venituri sub 100.000 EUR, cel puțin un salariat (sau excepțiile legale) și situațiile financiare depuse la termen.
            </Callout>
          )}
        </div>
      </div>

      <div className={`${ui.panel} ${ui.resultPanel}`}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <p className={ui.panelTitle} style={{ margin: 0 }}>Comparație</p>
          <CopyButton text={text} />
        </div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {!micro.depasestePlafon && <Coloana titlu="Micro 1%" id="micro" impozitFirma={micro.impozit} sc={sMicro} nota="Impozit 1% din venituri" />}
          <Coloana titlu="Profit 16%" id="profit" impozitFirma={prof.impozit} sc={sProfit} nota={prof.imca > prof.impozitProfit ? "IMCA 0,5% din CA" : "Impozit 16% din profit"} />
        </div>
        <p className={ui.note}>
          Profit contabil estimat: {fmtLei(profit)} lei ({venituri ? Math.round((profit / venituri) * 100) : 0}% marjă).
          CASS pe dividende se calculează pe totalul veniturilor pasive ale asociatului din anul respectiv.
        </p>
      </div>
    </div>
  );
}
