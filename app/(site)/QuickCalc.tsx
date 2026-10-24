"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { SplitBar, BAR } from "@/components/ui/fields";
import { calcSalariu, fmtLei } from "@/lib/fiscal";
import s from "./page.module.css";

/** Mini-calculator de salariu din pagina principală */
export default function QuickCalc() {
  const [brut, setBrut] = useState(7000);
  const r = calcSalariu(brut);

  return (
    <div className={s.quick}>
      <div className={s.quickHead}>
        <span className={s.quickTitle}>Salariu net</span>
        <span className={s.quickTag}>live</span>
      </div>
      <label className={s.quickLabel} htmlFor="quick-brut">Salariu brut lunar</label>
      <div className={s.quickInput}>
        <input
          id="quick-brut"
          type="number"
          inputMode="numeric"
          value={brut || ""}
          min={0}
          step={100}
          onChange={(e) => setBrut(Math.max(0, Number(e.target.value)))}
        />
        <span>lei</span>
      </div>
      <input
        type="range"
        min={r.salariuMinim}
        max={30000}
        step={50}
        value={Math.min(Math.max(brut, r.salariuMinim), 30000)}
        onChange={(e) => setBrut(Number(e.target.value))}
        aria-label="Salariu brut"
        className={s.quickRange}
      />
      <div className={s.quickResult}>
        <span>Primești în mână</span>
        <strong aria-live="polite">{fmtLei(r.net)} lei</strong>
      </div>
      <SplitBar parts={[
        { label: "Net", value: r.net, color: BAR.net },
        { label: "CAS", value: r.cas, color: BAR.cas },
        { label: "CASS", value: r.cass, color: BAR.cass },
        { label: "Impozit", value: r.impozit, color: BAR.impozit },
      ]} />
      <Link href="/calculator/salariu" className={s.quickMore}>
        Calcul detaliat cu deduceri <Icon name="arrowRight" size={16} />
      </Link>
    </div>
  );
}
