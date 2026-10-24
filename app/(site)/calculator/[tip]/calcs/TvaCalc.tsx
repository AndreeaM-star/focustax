"use client";

import { useState } from "react";
import { ui } from "@/components/ui";
import { NumberField, Segmented, SelectField, CopyButton } from "@/components/ui/fields";
import { COTE_TVA, tvaDinBrut, tvaDinNet, fmtLeiDec } from "@/lib/fiscal";

export default function TvaCalc() {
  const [mod, setMod] = useState<"adauga" | "extrage">("adauga");
  const [suma, setSuma] = useState(1000);
  const [cota, setCota] = useState<number>(21);
  const [colectat, setColectat] = useState(21000);
  const [deductibil, setDeductibil] = useState(8000);

  const r = mod === "adauga" ? tvaDinNet(suma, cota) : tvaDinBrut(suma, cota);
  const deRegularizat = colectat - deductibil;

  const row = (label: string, v: number, strong = false) => (
    <li className={`${ui.row} ${strong ? ui.rowStrong : ""}`}>
      <span className={ui.rowLabel}>{label}</span>
      <span className={ui.rowValue}>{fmtLeiDec(v)} lei</span>
    </li>
  );

  return (
    <div className={ui.calc}>
      <div className={ui.panel}>
        <p className={ui.panelTitle}>TVA pe o sumă</p>
        <Segmented
          label="Ce vrei să afli"
          value={mod}
          onChange={setMod}
          options={[{ value: "adauga", label: "Adaug TVA la preț" }, { value: "extrage", label: "Extrag TVA din preț" }]}
        />
        <NumberField label={mod === "adauga" ? "Sumă fără TVA" : "Sumă cu TVA inclus"} value={suma} onChange={setSuma} max={100000} step={10} slider={false} />
        <SelectField label="Cota de TVA" value={cota} onChange={setCota} options={COTE_TVA.map((c) => ({ value: c.val, label: c.label }))} />
        <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className={ui.panelTitle} style={{ margin: 0 }}>Rezultat</span>
          <CopyButton text={`Fără TVA: ${fmtLeiDec(r.net)} lei\nTVA ${cota}%: ${fmtLeiDec(r.tva)} lei\nCu TVA: ${fmtLeiDec(r.brut)} lei`} />
        </div>
        <ul className={ui.rows}>
          {row("Valoare fără TVA", r.net)}
          {row(`TVA ${cota}%`, r.tva)}
          {row("Valoare cu TVA", r.brut, true)}
        </ul>
      </div>

      <div className={ui.panel}>
        <p className={ui.panelTitle}>Decont TVA (D300)</p>
        <NumberField label="TVA colectată (din facturile emise)" value={colectat} onChange={setColectat} max={500000} step={100} slider={false} />
        <NumberField label="TVA deductibilă (din facturile primite)" value={deductibil} onChange={setDeductibil} max={500000} step={100} slider={false} />
        <div className={ui.resultHero} style={{ marginTop: 20, borderBottom: 0 }}>
          <div className={ui.resultLabel}>{deRegularizat >= 0 ? "TVA de plată" : "TVA de recuperat"}</div>
          <div className={ui.resultValue} style={{ color: deRegularizat >= 0 ? "var(--danger)" : "var(--ok)" }}>
            {fmtLeiDec(Math.abs(deRegularizat))} lei
          </div>
          <div className={ui.resultSub}>
            {deRegularizat >= 0 ? "Se plătește până pe 25 ale lunii următoare perioadei." : "Poți solicita rambursarea sau reporta suma în decontul următor."}
          </div>
        </div>
      </div>
    </div>
  );
}
