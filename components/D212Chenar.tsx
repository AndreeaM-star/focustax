"use client";

import { useState } from "react";
import styles from "./D212Chenar.module.css";

const capitole = [
  {
    id: "CAP I",
    titlu: "Capitolul I — Venituri realizate în anul curent",
    items: [
      "Venituri din activități independente (PFA, II, IF) — sistem real sau normă de venit",
      "Venituri din drepturi de proprietate intelectuală",
      "Venituri din cedarea folosinței bunurilor (chirii)",
      "Venituri din activități agricole, silvicultură și piscicultură",
      "Venituri din investiții (dividende, dobânzi, câștiguri din tranzacții)",
      "Venituri din alte surse",
      "CAS și CASS datorate pentru veniturile realizate",
    ],
  },
  {
    id: "CAP II",
    titlu: "Capitolul II — Venit estimat pentru anul următor",
    items: [
      "Estimarea venitului net pentru anul fiscal următor (baza de calcul CAS/CASS anticipate)",
      "Alegerea bazei de calcul pentru CAS: venitul estimat sau salariul minim brut",
      "Alegerea bazei de calcul pentru CASS: venitul estimat sau plafonul de 6 salarii minime",
      "Opțiunea de plată a CAS chiar dacă venitul estimat este sub plafonul minim",
      "Opțiunea de plată a CASS pentru persoanele fără alte venituri asigurate",
      "Declararea de venituri din surse noi față de anul anterior",
    ],
  },
];

export default function D212Chenar() {
  const [deschis, setDeschis] = useState<string | null>(null);

  return (
    <div className={styles.chenar}>
      <div className={styles.badge}>Declarație Unică</div>
      <div className={styles.header}>
        <div>
          <h2 className={styles.titlu}>Formularul 212</h2>
          <p className={styles.desc}>
            Declarație unică privind impozitul pe venit și contribuțiile sociale datorate de persoanele fizice.
            Cuprinde atât venitul realizat, cât și venitul estimat pentru anul următor.
          </p>
        </div>
        <div className={styles.meta}>
          <span>📅 Termen: 25 mai</span>
          <span>📋 Anual</span>
          <span>👤 Persoane fizice</span>
        </div>
      </div>

      <div className={styles.pdfRow}>
        <a href="https://static.anaf.ro/static/10/Anaf/formulare/D_212_2736_2025.pdf" target="_blank" rel="noopener noreferrer" className={styles.pdfLink}>
          📄 Descarcă formularul 212 (PDF)
        </a>
      </div>

      <div className={styles.capitole}>
        {capitole.map((cap) => (
          <div key={cap.id} className={styles.capitol}>
            <button
              className={`${styles.capitolBtn} ${deschis === cap.id ? styles.activ : ""}`}
              onClick={() => setDeschis(deschis === cap.id ? null : cap.id)}
            >
              <span className={styles.capitolId}>{cap.id}</span>
              <span className={styles.capitolTitlu}>{cap.titlu}</span>
              <span className={styles.chevron}>{deschis === cap.id ? "▲" : "▼"}</span>
            </button>
            {deschis === cap.id && (
              <ul className={styles.lista}>
                {cap.items.map((item, i) => (
                  <li key={i} className={styles.listaItem}>
                    <span className={styles.bullet}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
