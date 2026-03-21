"use client";

import Link from "next/link";
import styles from "@/app/ghiduri/page.module.css";

type GhidItem = { titlu: string; desc: string; slug: string };
type Categorie = { categorie: string; culoare: string; lista: GhidItem[] };

export default function GhiduriGrid({ ghiduri }: { ghiduri: Categorie[] }) {
  return (
    <div className={styles.grid}>
      {ghiduri.map((g, i) => (
        <div
          key={g.categorie}
          className={styles.card}
          style={{ animationDelay: `${i * 90}ms` }}
        >
          <div className={styles.cardHeader} style={{ borderBottom: `2px solid ${g.culoare}20` }}>
            <span className={styles.cardDot} style={{ background: g.culoare }} />
            <h2 className={styles.cardTitle} style={{ color: g.culoare }}>{g.categorie}</h2>
          </div>
          <ul className={styles.list}>
            {g.lista.map((item) => (
              <li key={item.titlu} className={styles.listItem}>
                <Link href={`/ghiduri/${item.slug}`} className={styles.listItemLink}>
                  <span className={styles.itemTitlu}>{item.titlu}</span>
                  <span className={styles.itemDesc}>{item.desc}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
