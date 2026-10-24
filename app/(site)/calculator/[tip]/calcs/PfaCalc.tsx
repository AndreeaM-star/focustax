"use client";

import { useState } from "react";
import { ui, Callout } from "@/components/ui";
import { NumberField, Segmented, Checkbox, ResultRows, ResultHero, SplitBar, CopyButton, BAR } from "@/components/ui/fields";
import { calcPfa, salariuMinimAnual, fmtLei } from "@/lib/fiscal";

export default function PfaCalc() {
  const an = new Date().getFullYear();
  const s = salariuMinimAnual(an);
  const [sistem, setSistem] = useState<"real" | "norma">("real");
  const [incasari, setIncasari] = useState(120000);
  const [cheltuieli, setCheltuieli] = useState(20000);
  const [norma, setNorma] = useState(40000);
  const [casOptional, setCasOptional] = useState(false);
  const [asigurat, setAsigurat] = useState(false);

  const venitNet = sistem === "real" ? Math.max(0, incasari - cheltuieli) : norma;
  const r = calcPfa(venitNet, { an, casOptional, asiguratAltfel: asigurat });

  const prag12 = 12 * s;
  const prag24 = 24 * s;

  const text = [
    `Venit net PFA: ${fmtLei(r.venitNet)} lei`,
    `CAS 25%: ${fmtLei(r.cas)} lei`,
    `CASS 10%: ${fmtLei(r.cass)} lei`,
    `Impozit 10%: ${fmtLei(r.impozit)} lei`,
    `Rămâne: ${fmtLei(r.ramas)} lei/an`,
    "Calculat pe focustax.ro",
  ].join("\n");

  return (
    <div className={ui.calc}>
      <div className={ui.panel}>
        <p className={ui.panelTitle}>Date pentru {an}</p>
        <Segmented
          label="Sistem de impozitare"
          value={sistem}
          onChange={setSistem}
          options={[{ value: "real", label: "Sistem real" }, { value: "norma", label: "Normă de venit" }]}
        />
        {sistem === "real" ? (
          <>
            <NumberField label="Încasări anuale" value={incasari} onChange={setIncasari} max={600000} step={1000} />
            <NumberField label="Cheltuieli deductibile anuale" value={cheltuieli} onChange={setCheltuieli} max={Math.max(incasari, 1000)} step={1000} hint="Chirie spațiu, echipamente, contabilitate, transport în interes profesional etc." />
          </>
        ) : (
          <NumberField label="Norma de venit anuală" value={norma} onChange={setNorma} max={200000} step={500} hint="Valoarea stabilită de ANAF pentru activitatea și județul tău." />
        )}
        {venitNet < prag12 && (
          <Checkbox checked={casOptional} onChange={setCasOptional}>
            Vreau să plătesc CAS opțional <span style={{ color: "var(--muted)" }}>(pentru stagiu de cotizare la pensie)</span>
          </Checkbox>
        )}
        <Checkbox checked={asigurat} onChange={setAsigurat}>
          Sunt deja asigurat la sănătate <span style={{ color: "var(--muted)" }}>(salariat sau pensionar — fără minimul CASS de 6 salarii)</span>
        </Checkbox>

        <div style={{ marginTop: 24 }}>
          <Callout tone="info" title="Praguri 2026 (salariu minim 4.050 lei la 1 ianuarie)">
            CAS obligatoriu de la {fmtLei(prag12)} lei. Peste {fmtLei(prag24)} lei, baza CAS rămâne fixă la {fmtLei(prag24)} lei.
            CASS: minim {fmtLei(6 * s)} lei, maxim {fmtLei(72 * s)} lei bază.
          </Callout>
        </div>
      </div>

      <div className={`${ui.panel} ${ui.resultPanel}`}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p className={ui.panelTitle} style={{ margin: 0 }}>Rezultat anual</p>
          <CopyButton text={text} />
        </div>
        <ResultHero label="Îți rămâne după taxe" value={r.ramas} sub={`≈ ${fmtLei(r.ramas / 12)} lei pe lună`} />
        <ResultRows rows={[
          { label: "Venit net", hint: sistem === "real" ? "încasări − cheltuieli" : "normă de venit", value: r.venitNet },
          { label: "CAS — pensie 25%", hint: r.bazaCas ? `bază ${fmtLei(r.bazaCas)} lei` : "sub pragul de 12 salarii minime", value: r.cas, tone: "neg", text: r.cas ? undefined : "nu se datorează" },
          { label: "CASS — sănătate 10%", hint: `bază ${fmtLei(r.bazaCass)} lei`, value: r.cass, tone: "neg" },
          { label: "Impozit pe venit 10%", hint: "din venitul net minus CAS și CASS", value: r.impozit, tone: "neg" },
          { label: "Total de plată la ANAF", value: r.totalTaxe, strong: true },
        ]} />
        <SplitBar parts={[
          { label: "Rămas", value: r.ramas, color: BAR.net },
          { label: "CAS", value: r.cas, color: BAR.cas },
          { label: "CASS", value: r.cass, color: BAR.cass },
          { label: "Impozit", value: r.impozit, color: BAR.impozit },
        ]} />
        <p className={ui.note}>Se declară și se plătește prin Declarația unică (D212) până la 25 mai {an + 1}.</p>
      </div>
    </div>
  );
}
