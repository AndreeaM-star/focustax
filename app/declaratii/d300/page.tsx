"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

const capitole = [
  {
    id: "A1",
    titlu: "A1 — Date de identificare",
    continut: [
      "Denumirea contribuabilului (persoană fizică sau juridică înregistrată în scopuri de TVA)",
      "Codul de înregistrare în scopuri de TVA (CIF/CUI cu prefix RO)",
      "Perioada fiscală declarată: luna / trimestrul calendaristic",
      "Adresa sediului social sau a domiciliului fiscal",
    ],
  },
  {
    id: "A2",
    titlu: "A2 — Operațiuni taxabile",
    continut: [
      "Livrări de bunuri și prestări de servicii taxabile în România",
      "Baza de impozitare (suma fără TVA) pentru fiecare cotă aplicabilă",
      "TVA colectată la cota standard (19%)",
      "TVA colectată la cota redusă (9% — alimente, medicamente, cazare)",
      "TVA colectată la cota redusă (5% — cărți, manuale, locuințe sociale)",
    ],
  },
  {
    id: "A3",
    titlu: "A3 — Operațiuni scutite",
    continut: [
      "Livrări intracomunitare de bunuri scutite cu drept de deducere",
      "Exporturi și operațiuni asimilate exporturilor",
      "Prestări de servicii către beneficiari din afara UE",
      "Operațiuni scutite fără drept de deducere (asigurări, servicii financiare, educație)",
      "Livrări de bunuri/prestări de servicii neimpozabile în România",
    ],
  },
  {
    id: "A4",
    titlu: "A4 — TVA deductibilă",
    continut: [
      "Achiziții de bunuri și servicii destinate operațiunilor taxabile",
      "TVA deductibilă aferentă achizițiilor intracomunitare de bunuri",
      "TVA deductibilă prin taxare inversă (operațiuni naționale)",
      "TVA deductibilă pentru importuri de bunuri",
      "Ajustări pozitive ale TVA deductibile (regularizări)",
    ],
  },
  {
    id: "A5",
    titlu: "A5 — Regularizări și ajustări",
    continut: [
      "Regularizări TVA colectată din perioadele anterioare (corecții)",
      "Ajustări ale bazei de impozitare (reduceri comerciale, retururi, anulări)",
      "Ajustări TVA deductibilă pentru bunuri de capital (5 ani / 20 ani)",
      "Pro-rata TVA pentru contribuabilii cu activități mixte",
      "Modificări de destinație a bunurilor achiziționate",
    ],
  },
  {
    id: "A6",
    titlu: "A6 — TVA de plată sau de rambursat",
    continut: [
      "Calculul TVA de plată = TVA colectată − TVA deductibilă (dacă pozitiv)",
      "Calculul soldului negativ = TVA deductibilă − TVA colectată (dacă negativ)",
      "Sold TVA de rambursat reportat din perioada precedentă",
      "Opțiunea de rambursare sau reportare a soldului negativ",
      "TVA de plată după compensarea soldului negativ reportat",
    ],
  },
];

export default function D300Page() {
  const [deschis, setDeschis] = useState<string | null>(null);

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.breadcrumb}>
          <Link href="/declaratii" className={styles.breadcrumbLink}>Declarații</Link>
          <span className={styles.breadcrumbSep}>›</span>
          <span>D300</span>
        </div>

        <div className={styles.header}>
          <span className={styles.badge}>TVA</span>
          <h1 className={styles.title}>Formularul 300</h1>
          <p className={styles.subtitle}>
            Decontul de TVA — documentul prin care contribuabilii înregistrați în scopuri de TVA
            declară TVA colectată, TVA deductibilă și stabilesc TVA de plată sau de rambursat.
          </p>
          <div className={styles.meta}>
            <span className={styles.metaItem}>📅 Periodicitate: Lunar sau Trimestrial</span>
            <span className={styles.metaItem}>⏰ Termen: 25 ale lunii următoare perioadei</span>
            <span className={styles.metaItem}>🏛️ Depunere: SPV (online) sau ghișeu ANAF</span>
          </div>
        </div>

        <div className={styles.formularButoane}>
          <a
            href="https://static.anaf.ro/static/10/Anaf/formulare/D300_OPANAF_2131_2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnDescarcare}
          >
            ⬇ Descarcă formularul (PDF)
          </a>
          <a
            href="https://static.anaf.ro/static/10/Anaf/Declaratii_R/300.html"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnWebFormular}
          >
            🌐 Completează web formularul
          </a>
        </div>

        <div className={styles.legislatie}>
          <h2 className={styles.sectionTitle}>Informații oficiale</h2>
          <div className={styles.legislatieBox}>
            <p>
              Acest formular este inclus în această pagină doar pentru informare, și nu pentru utilizare,
              deoarece el se completează electronic.
            </p>
            <p>
              Formularul se completează de persoanele impozabile înregistrate în scopuri de TVA conform{" "}
              <strong>art. 316 din Legea nr. 227/2015 privind Codul fiscal</strong>, cu modificările și
              completările ulterioare.
            </p>
            <p>
              Persoanele impozabile înregistrate în scopuri de TVA care efectuează în perioada de raportare
              numai operațiuni în interiorul țării pot opta pentru completarea{" "}
              <strong>formularului de decont simplificat</strong>, prin bifarea căsuței corespunzătoare
              din programul de asistență pus la dispoziție de ANAF.
            </p>
            <p>
              Semnarea declarațiilor se realizează prin utilizarea{" "}
              <strong>certificatului digital calificat</strong> emis de un furnizor de servicii de
              certificare, acreditat în condițiile Legii nr. 455/2001.
            </p>
            <div className={styles.legislatieFooter}>
              <span>⏱ Durată estimată de completare: <strong>10 minute</strong></span>
              <span>📋 Scop: Administrarea taxei pe valoare adăugată</span>
            </div>
          </div>
        </div>

        <div className={styles.capitole}>
          <h2 className={styles.sectionTitle}>Capitolele formularului</h2>
          {capitole.map((cap) => (
            <div key={cap.id} className={styles.capitol}>
              <button
                className={`${styles.capitolHeader} ${deschis === cap.id ? styles.activ : ""}`}
                onClick={() => setDeschis(deschis === cap.id ? null : cap.id)}
              >
                <span className={styles.capitolId}>{cap.id}</span>
                <span className={styles.capitolTitlu}>{cap.titlu}</span>
                <span className={styles.chevron}>{deschis === cap.id ? "▲" : "▼"}</span>
              </button>
              {deschis === cap.id && (
                <ul className={styles.capitolContinut}>
                  {cap.continut.map((item, i) => (
                    <li key={i} className={styles.capitolItem}>
                      <span className={styles.bullet}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
