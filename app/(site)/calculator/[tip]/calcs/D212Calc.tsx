"use client";

import { useState } from "react";
import Link from "next/link";
import { ui, Callout, Badge } from "@/components/ui";
import { NumberField, ResultRows, ResultHero, CopyButton } from "@/components/ui/fields";
import { calcD212, salariuMinimAnual, fmtLei, type VenituriD212 } from "@/lib/fiscal";
import s from "./d212calc.module.css";

type Camp = keyof Omit<VenituriD212, "an">;

const GRUPE: { titlu: string; campuri: { k: Camp; label: string; hint?: string }[] }[] = [
  {
    titlu: "Investiții",
    campuri: [
      { k: "castigBrokerStrain", label: "Câștig net — broker străin", hint: "IBKR, Trading 212, eToro, Revolut: câștiguri minus pierderi în an, în lei (curs mediu anual BNR)." },
      { k: "pierderiReportate", label: "Pierderi reportate din anii trecuți (broker străin)", hint: "Se compensează cel mult 70% din câștigul de anul acesta." },
      { k: "castigBrokerRomanBrut", label: "Câștig brut — broker român", hint: "Tradeville, BT Capital, XTB România: impozitul de 3%/6% e deja reținut; contează doar la CASS." },
    ],
  },
  {
    titlu: "Dividende și dobânzi",
    campuri: [
      { k: "dividendeRO", label: "Dividende brute de la firme românești", hint: "Impozitul de 16% e reținut de firmă." },
      { k: "dividendeStrainatate", label: "Dividende brute din străinătate" },
      { k: "impozitStrainDividende", label: "Impozit reținut în străinătate pe dividende", hint: "Ex. 10% în SUA cu W-8BEN — se scade ca credit fiscal." },
      { k: "dobanziRO", label: "Dobânzi de la bănci din România", hint: "Impozitul de 10% e reținut de bancă." },
      { k: "dobanziStrainatate", label: "Dobânzi din străinătate", hint: "Ex. Revolut, Trading 212 — 10% de plătit." },
    ],
  },
  {
    titlu: "Alte venituri",
    campuri: [
      { k: "castigCrypto", label: "Câștig net din criptomonede" },
      { k: "chirii", label: "Chirie încasată pe an", hint: "Se aplică automat deducerea forfetară de 20%." },
    ],
  },
];

export default function D212Calc() {
  const an = new Date().getFullYear();
  const sm = salariuMinimAnual(an);
  const [v, setV] = useState<VenituriD212>({ castigBrokerStrain: 15000, dividendeStrainatate: 4000, impozitStrainDividende: 400, chirii: 24000 });
  const r = calcD212({ ...v, an });
  const set = (k: Camp) => (x: number) => setV((o) => ({ ...o, [k]: x }));

  const rezumat = [
    `Declarația unică — venituri ${an} (estimare FocusTax)`,
    ...r.linii.map((l) => `${l.sursa}: bază ${fmtLei(l.baza)} lei, impozit de plată ${fmtLei(l.impozitDePlata)} lei`),
    `CASS: ${fmtLei(r.cass.cass)} lei (total venituri pentru prag: ${fmtLei(r.totalCass)} lei)`,
    `Total de plată până la 25 mai ${an + 1}: ${fmtLei(r.totalDePlata)} lei`,
  ].join("\n");

  return (
    <div className={ui.calc}>
      <div className={ui.panel}>
        <p className={ui.panelTitle}>Veniturile tale din {an}, în lei</p>
        {GRUPE.map((g) => (
          <fieldset key={g.titlu} className={s.group}>
            <legend>{g.titlu}</legend>
            {g.campuri.map((c) => (
              <NumberField key={c.k} label={c.label} hint={c.hint} value={v[c.k] ?? 0} onChange={set(c.k)} step={100} slider={false} />
            ))}
          </fieldset>
        ))}
      </div>

      <div className={`${ui.panel} ${ui.resultPanel}`}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p className={ui.panelTitle} style={{ margin: 0 }}>De plată prin D212</p>
          <CopyButton text={rezumat} />
        </div>
        <ResultHero label={`Total de plată până la 25 mai ${an + 1}`} value={r.totalDePlata} sub={r.trebuieDepusa ? "Trebuie să depui Declarația unică." : "Cu aceste venituri nu ai nimic de plată prin D212."} />

        {r.linii.length > 0 && (
          <ResultRows rows={[
            ...r.linii.map((l) => ({
              label: l.sursa,
              hint: l.retinut > 0 && l.impozitDePlata === 0 ? `impozit reținut deja: ${fmtLei(l.retinut)} lei` : l.retinut > 0 ? `credit fiscal: ${fmtLei(l.retinut)} lei` : `bază: ${fmtLei(l.baza)} lei`,
              value: l.impozitDePlata,
              tone: "neg" as const,
              text: l.impozitDePlata ? undefined : "0 lei",
            })),
            { label: "CASS 10%", hint: r.cass.treapta ? `treapta ${r.cass.treapta} salarii minime (${fmtLei(r.cass.baza)} lei)` : `sub pragul de ${fmtLei(6 * sm)} lei`, value: r.cass.cass, tone: "neg" as const, text: r.cass.cass ? undefined : "nu se datorează" },
            { label: "Total de plată", value: r.totalDePlata, strong: true },
          ]} />
        )}

        <div className={s.cass}>
          <div className={s.cassHead}>
            <span>Venituri pentru pragul CASS</span>
            <b>{fmtLei(r.totalCass)} lei</b>
          </div>
          <div className={s.track}>
            {[6, 12, 24].map((t) => <i key={t} style={{ left: `${(t / 30) * 100}%` }} title={`${t} salarii minime`} />)}
            <span style={{ width: `${Math.min(100, (r.totalCass / (30 * sm)) * 100)}%` }} />
          </div>
          <div className={s.ticks}>
            <span style={{ left: `${(6 / 30) * 100}%` }}>{fmtLei(6 * sm)}</span>
            <span style={{ left: `${(12 / 30) * 100}%` }}>{fmtLei(12 * sm)}</span>
            <span style={{ left: `${(24 / 30) * 100}%` }}>{fmtLei(24 * sm)}</span>
          </div>
        </div>

        <div className={s.next}>
          <p className={s.nextTitle}>Ce completezi în D212</p>
          <ul>
            {r.linii.some((l) => l.sursa.includes("străin") || l.sursa.includes("străinătate")) && <li><Badge tone="brand">străinătate</Badge> Veniturile din străinătate, pe țară și pe tip de venit, cu metoda creditului fiscal.</li>}
            {r.linii.some((l) => l.sursa === "Chirii" || l.sursa === "Criptomonede") && <li><Badge tone="brand">România</Badge> Veniturile din chirii și/sau din crypto, cu impozitul calculat.</li>}
            {r.cass.cass > 0 && <li><Badge tone="accent">CASS</Badge> Secțiunea pentru CASS: bifezi că ai venituri peste 6 salarii minime.</li>}
            <li>Verifică întâi D212 precompletată din SPV și compar-o cu aceste sume.</li>
          </ul>
        </div>

        <div style={{ marginTop: 16 }}>
          <Callout tone="neutral">
            Estimare orientativă. Nu include salariul, PFA-ul sau normele de venit. Pentru situații complexe (mai mulți brokeri, opțiuni, CFD-uri), cere un expert contabil.
            {" "}<Link href="/ghiduri/investitii-broker-strain-d212" style={{ textDecoration: "underline" }}>Ghidul complet</Link>
          </Callout>
        </div>
      </div>
    </div>
  );
}
