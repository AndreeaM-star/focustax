"use client";

import { useMemo, useState } from "react";
import { Icon, ui } from "@/components/ui";
import type { Tara } from "./data";
import s from "./comparatii.module.css";

export default function CompareBars({ tari, unitate, medie }: { tari: Tara[]; unitate: string; medie: number }) {
  const [zona, setZona] = useState<"europa" | "toate">("europa");
  const [q, setQ] = useState("");
  const [toate, setToate] = useState(false);

  const lista = useMemo(() => {
    const n = q.trim().toLowerCase();
    return tari
      .filter((t) => (zona === "toate" || t.zona !== "extra-europa") && (!n || t.nume.toLowerCase().includes(n)))
      .sort((a, b) => b.cotaStandard - a.cotaStandard);
  }, [tari, zona, q]);

  const max = Math.max(...lista.map((t) => t.cotaStandard), medie, 1);
  const vizibile = toate || q ? lista : lista.slice(0, 30);
  const roInafara = !vizibile.some((t) => t.esteRomania) ? lista.find((t) => t.esteRomania) : undefined;
  const fmt = (v: number) => `${v.toLocaleString("ro-RO", { maximumFractionDigits: 2 })}${unitate === "%" ? "%" : ` ${unitate}`}`;

  const rand = (t: Tara) => (
    <li key={t.codISO + t.nume} className={`${s.row} ${t.esteRomania ? s.ro : ""}`}>
      <span className={s.name}>{t.nume}</span>
      <span className={s.track}>
        <span style={{ width: `${(t.cotaStandard / max) * 100}%` }} />
        <i style={{ left: `${(medie / max) * 100}%` }} aria-hidden />
      </span>
      <span className={s.val}>{fmt(t.cotaStandard)}</span>
      {t.detalii && <span className={s.det}>{t.detalii}</span>}
    </li>
  );

  return (
    <>
      <div className={s.controls}>
        <div className={ui.segmented} style={{ minWidth: 240 }}>
          {(["europa", "toate"] as const).map((z) => (
            <button key={z} type="button" className={`${ui.segBtn} ${zona === z ? ui.segBtnActive : ""}`} onClick={() => setZona(z)}>
              {z === "europa" ? "Europa" : "Toată lumea"}
            </button>
          ))}
        </div>
        <label className={ui.searchBox} style={{ flex: 1, minWidth: 220 }}>
          <Icon name="search" size={18} />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Caută o țară" aria-label="Caută o țară" />
        </label>
      </div>
      <p className={s.legend}><i aria-hidden /> media europeană: {fmt(medie)}</p>
      <ol className={s.bars}>
        {vizibile.map(rand)}
        {roInafara && <>{<li className={s.gap} aria-hidden>…</li>}{rand(roInafara)}</>}
      </ol>
      {!q && lista.length > 30 && (
        <button type="button" className={`${ui.btn} ${ui.btnSecondary}`} style={{ marginTop: 16 }} onClick={() => setToate((x) => !x)}>
          {toate ? "Arată mai puține" : `Arată toate cele ${lista.length} țări`}
        </button>
      )}
    </>
  );
}
