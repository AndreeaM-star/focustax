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
  "Salarii": "#059659",
  "Profit": "#7c3aed",
};

const noutati = [
  {
    data: "Aprilie 2026",
    categorie: "D212",
    tag: "D212",
    urgenta: "urgent",
    titlu: "Bonificație 3% la D212 — termen 15 aprilie 2026",
    desc: "Contribuabilii care depun Declarația Unică D212 și plătesc integral impozitul și contribuțiile până pe 15 aprilie 2026 beneficiază de o reducere de 3% a impozitului datorat (OUG 8/2026). Atenție: românii care închiriază spații către firme NU pot beneficia de bonificație. Dacă ai depus deja D212 fără bonificație, poți depune declarație rectificativă.",
    link: "/ghiduri/d212-ghid-completare",
  },
  {
    data: "Ianuarie 2026",
    categorie: "Crypto",
    tag: "Crypto",
    urgenta: "important",
    titlu: "Impozit crypto crește la 16% — DAC8 intră în vigoare",
    desc: "Din 1 ianuarie 2026, câștigurile din tranzacții cu criptomonede se impozitează cu 16% (față de 10% anterior). Scutire: câștiguri sub 200 lei/tranzacție dacă totalul anual nu depășește 600 lei. Prin DAC8, toate platformele de tranzacționare sunt obligate să raporteze automat tranzacțiile utilizatorilor români la ANAF.",
  },
  {
    data: "Ianuarie 2026",
    categorie: "Dividende",
    tag: "Dividende",
    urgenta: "important",
    titlu: "Impozit dividende: 16% din 2026",
    desc: "Impozitul pe dividende a crescut de la 8% la 16% începând cu 1 ianuarie 2026 (Legea 239/2025). Se reține la sursă de persoana juridică distribuitor. La nivel de acționar PF: dacă dividendele + alte venituri pasive depășesc 24.300 lei, se plătește și CASS.",
    link: "/ghiduri/dividende",
  },
  {
    data: "Ianuarie 2026",
    categorie: "Microîntreprinderi",
    tag: "Microîntreprinderi",
    urgenta: "important",
    titlu: "Micro 2026: cotă unică 1%, plafon 100.000 EUR",
    desc: "Din 2026, microîntreprinderile plătesc o cotă unică de 1% din CA (eliminată cota de 3%). Plafonul de încadrare a scăzut la 100.000 EUR/an (de la 500.000 EUR). Condiție nouă: firmele trebuie să fi depus situațiile financiare la timp pentru a accesa regimul.",
    link: "/ghiduri/srl-vs-micro",
  },
  {
    data: "Ianuarie 2026",
    categorie: "Impozite locale",
    tag: "Impozite locale",
    urgenta: "info",
    titlu: "Impozit clădiri și auto — creșteri semnificative",
    desc: "Impozitele pe proprietăți au crescut cu până la 150% față de 2025 în unele localități. Impozitul pe autoturisme este acum diferențiat după norma Euro și cilindree. Mașinile electrice plătesc o taxă fixă de 40 lei/an (față de 0 în 2025).",
    link: "/ghiduri/impozite-locale-2026",
  },
  {
    data: "Septembrie 2025",
    categorie: "TVA",
    tag: "TVA",
    urgenta: "important",
    titlu: "Plafonul de înregistrare TVA urcă la 395.000 lei",
    desc: "De la 1 septembrie 2025, plafonul de înregistrare obligatorie în scopuri de TVA a crescut de la 300.000 lei la 395.000 lei. Firmele care au trecut de 300.000 lei dar sunt sub 395.000 lei pot solicita scoaterea din evidența TVA.",
    link: "/ghiduri/inregistrare-tva",
  },
  {
    data: "August 2025",
    categorie: "TVA",
    tag: "TVA",
    urgenta: "important",
    titlu: "Cota standard TVA crește la 21%",
    desc: "Începând cu 1 august 2025, cota standard de TVA a crescut de la 19% la 21%. Cota redusă pentru alimente, medicamente, turism și restaurante este acum 11% (anterior 9%). Rămâne la 9% doar pentru locuințe noi până la 31 iulie 2026.",
    link: "/ghiduri/inregistrare-tva",
  },
  {
    data: "Martie 2026",
    categorie: "D212",
    tag: "D212",
    urgenta: "info",
    titlu: "Termen D212 normal — 25 mai 2026",
    desc: "Declarația Unică 212 pentru veniturile din 2025 se depune până pe 25 mai 2026. Se poate depune online prin SPV sau la ghișeele ANAF. Contribuabilii cu venituri estimate pentru 2026 completează și Capitolul II.",
    link: "/declaratii/d212",
  },
  {
    data: "Iulie 2026",
    categorie: "Salariu minim",
    tag: "Salariu minim",
    urgenta: "info",
    titlu: "Salariul minim crește la 4.325 lei de la 1 iulie 2026",
    desc: "Salariul minim brut garantat în plată devine 4.325 lei/lună de la 1 iulie 2026 (de la 4.050 lei în primul semestru). Acest lucru afectează calculul CAS și CASS pentru PFA (plafonul minim de 6 salarii minime crește la 25.950 lei).",
  },
  {
    data: "Decembrie 2025",
    categorie: "e-Factura",
    tag: "e-Factura",
    urgenta: "info",
    titlu: "e-Factura — extinsă la toate tranzacțiile B2B",
    desc: "Din 2025, obligația de transmitere a facturilor în sistemul RO e-Factura s-a extins la toate tranzacțiile B2B, inclusiv cu parteneri neplătitori de TVA. Termenul de transmitere rămâne 5 zile calendaristice de la data emiterii. Amenda pentru netransmitere: 5.000 lei.",
    link: "/sisteme/ro-e-factura",
  },
  {
    data: "Noiembrie 2025",
    categorie: "TVA",
    tag: "TVA",
    urgenta: "info",
    titlu: "RO e-TVA — implementare pentru contribuabilii mari",
    desc: "ANAF a lansat sistemul RO e-TVA pentru contribuabilii mari — D300 precompletat pe baza facturilor din e-Factura. Contribuabilii verifică datele precompletate și depun declarația finală. Extinderea la toți plătitorii de TVA se face gradual în 2026.",
    link: "/sisteme/ro-e-tva",
  },
  {
    data: "Septembrie 2025",
    categorie: "e-Transport",
    tag: "e-Transport",
    urgenta: "info",
    titlu: "RO e-Transport — noi categorii de bunuri adăugate",
    desc: "ANAF a extins lista bunurilor cu risc fiscal ridicat supuse monitorizării e-Transport. Noile categorii includ materiale de construcții, produse cosmetice de lux și echipamente electronice. Penalitățile pentru lipsa codului UIT au crescut la 50.000 lei pentru persoane juridice.",
    link: "/sisteme/ro-e-transport",
  },
];

const FILTRE = ["Toate", "TVA", "Crypto", "Dividende", "Microîntreprinderi", "Salariu minim", "Impozite locale", "D212"];

const URGENTA_BADGE: Record<string, { label: string; color: string }> = {
  urgent: { label: "URGENT", color: "#dc2626" },
  important: { label: "important", color: "#d97706" },
  info: { label: "info", color: "#6b7280" },
};

export default function NoutatiPage() {
  const [filtru, setFiltru] = useState("Toate");

  const afisate = filtru === "Toate"
    ? noutati
    : noutati.filter(n => n.categorie === filtru);

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <h1 className={styles.title}>Noutăți Fiscale</h1>
        <p className={styles.subtitle}>
          Ultimele modificări legislative și noutăți fiscale din România, actualizate regulat.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "2rem", justifyContent: "center" }}>
          {FILTRE.map(f => (
            <button
              key={f}
              onClick={() => setFiltru(f)}
              style={{
                padding: "6px 16px",
                borderRadius: "9999px",
                border: `1px solid ${filtru === f ? "#6366f1" : "rgba(99,102,241,0.3)"}`,
                background: filtru === f ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.05)",
                color: filtru === f ? "#4338ca" : "#6b7280",
                fontWeight: filtru === f ? 600 : 400,
                cursor: "pointer",
                fontSize: "0.875rem",
                transition: "all 0.2s",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div className={styles.timeline}>
          {afisate.map((n, i) => {
            const tagColor = TAG_COLORS[n.tag] ?? "#6b7280";
            const urg = URGENTA_BADGE[n.urgenta];
            return (
              <article key={n.titlu} className={`${styles.timelineItem} ${i % 2 === 0 ? styles.left : styles.right}`}>
                <div className={styles.timelineDot} style={{ borderColor: tagColor }} />
                <div className={styles.card}>
                  <div className={styles.cardMeta}>
                    <span className={styles.tag} style={{ borderColor: tagColor, color: tagColor }}>{n.tag}</span>
                    <span className={styles.data}>{n.data}</span>
                    {urg && (
                      <span style={{
                        fontSize: "0.7rem", fontWeight: 700, padding: "2px 8px",
                        borderRadius: "9999px", background: `${urg.color}20`, color: urg.color,
                        border: `1px solid ${urg.color}40`, textTransform: "uppercase",
                      }}>{urg.label}</span>
                    )}
                  </div>
                  <h2 className={styles.cardTitlu}>{n.titlu}</h2>
                  <p className={styles.cardDesc}>{n.desc}</p>
                  {n.link && (
                    <Link href={n.link} className={styles.cardLink}>→ Citește mai mult</Link>
                  )}
                </div>
              </article>
            );
          })}
          <div className={styles.timelineLine} />
        </div>
      </main>
      <Footer />
    </>
  );
}
