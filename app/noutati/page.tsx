"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

const TAG_COLORS: Record<string, string> = {
  "D212": "#dc2626",
  "TVA": "#d97706",
  "Crypto": "#7c3aed",
  "Dividende": "#059669",
  "Microîntreprinderi": "#2563eb",
  "Salariu minim": "#059669",
  "Impozite locale": "#6366f1",
  "e-Factura": "#2563eb",
  "e-Transport": "#d97706",
  "SPV": "#374151",
  "Penalități": "#dc2626",
  "Cod Fiscal": "#6366f1",
  "Impozit Venit": "#dc2626",
  "Salarii": "#059669",
  "Profit": "#7c3aed",
};

const noutati = [
  {
    data: "Aprilie 2026",
    categorie: "D212",
    tag: "D212",
    urgenta: "info",
    titlu: "Bonificație 3% D212 — termen 15 aprilie 2026 (EXPIRAT)",
    desc: "Termenul pentru bonificația de 3% la D212 a expirat pe 15 aprilie 2026. Termenul normal de depunere rămâne 25 mai 2026. Poți depune D212 fără bonificație până la termen.",
    link: "/ghiduri/d212-ghid-completare",
  },
  {
    data: "Ianuarie 2026",
    categorie: "Crypto",
    tag: "Crypto",
    urgenta: "important",
    titlu: "Impozit crypto crește la 16% — DAC8 intră în vigoare",
    desc: "Din 1 ianuarie 2026, câștigurile din criptomonede se impozitează cu 16% (față de 10% anterior). Scutire: câștiguri sub 200 lei/tranzacție dacă totalul anual nu depășește 600 lei. Prin DAC8, platformele raportează automat tranzacțiile la ANAF.",
  },
  {
    data: "Ianuarie 2026",
    categorie: "Dividende",
    tag: "Dividende",
    urgenta: "important",
    titlu: "Impozit dividende: 16% din 2026",
    desc: "Impozitul pe dividende a crescut de la 8% la 16% din 1 ianuarie 2026 (Legea 239/2025). Se reține la sursă de persoana juridică distribuitor. CASS se datorează dacă dividendele + alte venituri pasive depășesc 24.300 lei.",
    link: "/ghiduri/dividende",
  },
  {
    data: "Ianuarie 2026",
    categorie: "Microîntreprinderi",
    tag: "Microîntreprinderi",
    urgenta: "important",
    titlu: "Micro 2026: cotă unică 1%, plafon 100.000 EUR",
    desc: "Din 2026, microîntreprinderile plătesc o cotă unică de 1% din CA (eliminată cota de 3%). Plafonul de încadrare a scăzut la 100.000 EUR/an. Condiție nouă: firmele trebuie să fi depus situațiile financiare la timp.",
    link: "/ghiduri/srl-vs-micro",
  },
  {
    data: "Ianuarie 2026",
    categorie: "Impozite locale",
    tag: "Impozite locale",
    urgenta: "info",
    titlu: "Impozit clădiri și auto — creșteri semnificative 2026",
    desc: "Impozitele pe proprietăți au crescut cu până la 150% față de 2025 în unele localități. Impozitul pe autoturisme este diferențiat după norma Euro și cilindree. Mașinile electrice plătesc 40 lei/an.",
    link: "/ghiduri/impozite-locale-2026",
  },
  {
    data: "Septembrie 2025",
    categorie: "TVA",
    tag: "TVA",
    urgenta: "important",
    titlu: "Plafonul de înregistrare TVA urcă la 395.000 lei",
    desc: "De la 1 septembrie 2025, plafonul de înregistrare obligatorie în scopuri de TVA a crescut de la 300.000 lei la 395.000 lei. Firmele sub 395.000 lei pot solicita scoaterea din evidența TVA.",
    link: "/ghiduri/inregistrare-tva",
  },
  {
    data: "August 2025",
    categorie: "TVA",
    tag: "TVA",
    urgenta: "important",
    titlu: "Cota standard TVA crește la 21%",
    desc: "Începând cu 1 august 2025, cota standard de TVA a crescut de la 19% la 21%. Cota redusă pentru alimente, restaurante, turism: 11%. Rămâne la 9% doar pentru locuințe noi până la 31 iulie 2026.",
    link: "/ghiduri/inregistrare-tva",
  },
  {
    data: "Mai 2026",
    categorie: "D212",
    tag: "D212",
    urgenta: "urgent",
    titlu: "URGENT — Termen D212: 25 mai 2026",
    desc: "Declarația Unică D212 pentru veniturile din 2025 se depune până pe 25 mai 2026. Se depune online prin SPV ANAF. Capitolul II (venituri estimate 2026) se completează în aceeași declarație.",
    link: "/ghiduri/d212-ghid-completare",
  },
  {
    data: "Iulie 2026",
    categorie: "Salariu minim",
    tag: "Salariu minim",
    urgenta: "info",
    titlu: "Salariul minim crește la 4.325 lei de la 1 iulie 2026",
    desc: "Salariul minim brut garantat în plată devine 4.325 lei/lună de la 1 iulie 2026 (de la 4.050 lei în primul semestru). Afectează calculul CAS și CASS pentru PFA — plafonul minim de 6 salarii minime crește la 25.950 lei.",
  },
  {
    data: "Decembrie 2025",
    categorie: "e-Factura",
    tag: "e-Factura",
    urgenta: "info",
    titlu: "e-Factura — extinsă la toate tranzacțiile B2B",
    desc: "Din 2025, obligația de transmitere în RO e-Factura s-a extins la toate tranzacțiile B2B, inclusiv cu parteneri neplătitori de TVA. Termen de transmitere: 5 zile calendaristice. Amendă pentru netransmitere: 5.000 lei.",
    link: "/sisteme/ro-e-factura",
  },
  {
    data: "Noiembrie 2025",
    categorie: "TVA",
    tag: "TVA",
    urgenta: "info",
    titlu: "RO e-TVA — implementare pentru contribuabilii mari",
    desc: "ANAF a lansat sistemul RO e-TVA — D300 precompletat pe baza facturilor din e-Factura. Contribuabilii verifică datele și depun declarația finală. Extinderea la toți plătitorii de TVA se face gradual în 2026.",
    link: "/sisteme/ro-e-tva",
  },
  {
    data: "Septembrie 2025",
    categorie: "e-Transport",
    tag: "e-Transport",
    urgenta: "info",
    titlu: "RO e-Transport — noi categorii de bunuri",
    desc: "ANAF a extins lista bunurilor cu risc fiscal supuse monitorizării e-Transport. Noile categorii includ materiale de construcții, produse cosmetice de lux și echipamente electronice. Penalitățile pentru lipsa codului UIT: 50.000 lei.",
    link: "/sisteme/ro-e-transport",
  },
];

const FILTRE = ["Toate", "D212", "TVA", "Crypto", "Dividende", "Microîntreprinderi", "Impozite locale"];

const URGENTA: Record<string, { label: string; color: string; bg: string }> = {
  urgent:    { label: "URGENT",    color: "#dc2626", bg: "rgba(220,38,38,0.10)" },
  important: { label: "important", color: "#d97706", bg: "rgba(217,119,6,0.10)" },
  info:      { label: "info",      color: "#6b7280", bg: "rgba(107,114,128,0.08)" },
};

const URGENTA_SORT: Record<string, number> = { urgent: 0, important: 1, info: 2 };

function d212ZileRamase(): number {
  const termen = new Date(2026, 4, 25);
  const azi = new Date(); azi.setHours(0, 0, 0, 0);
  return Math.max(0, Math.ceil((termen.getTime() - azi.getTime()) / 86400000));
}

export default function NoutatiPage() {
  const [filtru, setFiltru] = useState("Toate");
  const [sortare, setSortare] = useState<"noi" | "importante">("noi");
  const zile = d212ZileRamase();

  const noutatiActive = zile <= 0
    ? noutati.filter(n => !(n.urgenta === "urgent" && n.tag === "D212"))
    : noutati;
  const afisate = (filtru === "Toate" ? noutatiActive : noutatiActive.filter(n => n.categorie === filtru))
    .slice()
    .sort((a, b) => sortare === "importante" ? URGENTA_SORT[a.urgenta] - URGENTA_SORT[b.urgenta] : 0);

  const hasUrgent = afisate.some(n => n.urgenta === "urgent");

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Noutăți <span className={styles.titleGrad}>Fiscale</span></h1>
          <p className={styles.subtitle}>
            Ultimele modificări legislative și noutăți fiscale din România, actualizate regulat.
          </p>
        </div>

        {/* Termen iminent banner — D212 */}
        {filtru === "Toate" && zile > 0 && (
          <div className={styles.urgentBanner}>
            <span>⚡</span>
            <span>
              <strong>URGENT — {zile === 1 ? "1 zi rămasă" : `${zile} zile rămase`}:</strong> Termen depunere D212 (Declarația Unică 2025) — <strong>25 mai 2026</strong>
              {" "}<Link href="/ghiduri/d212-ghid-completare" className={styles.urgentLink}>→ Ghid completare</Link>
            </span>
          </div>
        )}

        {/* Filters + Sort */}
        <div className={styles.filtrRow}>
          {FILTRE.map(f => (
            <button
              key={f}
              onClick={() => setFiltru(f)}
              className={`${styles.filtrBtn} ${filtru === f ? styles.filtrBtnActive : ""}`}
            >
              {f}
            </button>
          ))}
          <span style={{ flex: 1 }} />
          <button onClick={() => setSortare("noi")} className={`${styles.filtrBtn} ${sortare === "noi" ? styles.filtrBtnActive : ""}`}>↓ Cele mai noi</button>
          <button onClick={() => setSortare("importante")} className={`${styles.filtrBtn} ${sortare === "importante" ? styles.filtrBtnActive : ""}`}>⚡ Importante</button>
        </div>

        {/* Card grid */}
        <div className={styles.grid}>
          {afisate.map(n => {
            const tagColor = TAG_COLORS[n.tag] ?? "#6b7280";
            const urg = URGENTA[n.urgenta];
            return (
              <article
                key={n.titlu}
                className={`${styles.card} ${n.urgenta === "urgent" ? styles.cardUrgent : ""}`}
              >
                <div className={styles.cardTop}>
                  <span className={styles.tag} style={{ color: tagColor, borderColor: `${tagColor}40`, background: `${tagColor}0D` }}>
                    {n.tag}
                  </span>
                  <span className={styles.urg} style={{ color: urg.color, background: urg.bg, border: `1px solid ${urg.color}30` }}>
                    {urg.label}
                  </span>
                </div>
                <span className={styles.data}>{n.data}</span>
                <h2 className={styles.cardTitlu}>{n.titlu}</h2>
                <p className={styles.cardDesc}>{n.desc}</p>
                {n.link && (
                  <Link href={n.link} className={styles.cardLink}>Citește mai mult →</Link>
                )}
              </article>
            );
          })}
        </div>

        {afisate.length === 0 && (
          <p style={{ color: "#9ca3af", textAlign: "center", marginTop: "2rem" }}>
            Nicio noutate pentru filtrul selectat.
          </p>
        )}
      </main>
      <Footer />
    </>
  );
}
