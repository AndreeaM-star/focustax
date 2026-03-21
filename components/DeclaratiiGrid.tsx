"use client";

import Link from "next/link";
import styles from "@/app/declaratii/page.module.css";

type Declaratie = { cod: string; nume: string; periodicitate: string; href: string };
type Categorie = { titlu: string; culoare: string; declaratii: Declaratie[] };

export default function DeclaratiiGrid({ categorii }: { categorii: Categorie[] }) {
  return (
    <div className={styles.grid}>
      {categorii.map((cat, i) => (
        <div
          key={cat.titlu}
          className={styles.card}
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className={styles.cardHeader} style={{ borderColor: cat.culoare }}>
            <span className={styles.cardIcon} style={{ color: cat.culoare }}>●</span>
            <h2 className={styles.cardTitle} style={{ color: cat.culoare }}>{cat.titlu}</h2>
          </div>
          <ul className={styles.list}>
            {cat.declaratii.map((d) => (
              <li key={d.cod + cat.titlu} className={styles.listItem}>
                <span className={styles.cod}>{d.cod}</span>
                <Link href={d.href} className={styles.numeLink}>{d.nume}</Link>
                <span className={styles.periodicitate}>{d.periodicitate}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
