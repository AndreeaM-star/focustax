"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "@/app/declaratii/page.module.css";

type Declaratie = { cod: string; nume: string; periodicitate: string; href: string };
type Categorie = { titlu: string; culoare: string; declaratii: Declaratie[] };

export default function DeclaratiiGrid({ categorii }: { categorii: Categorie[] }) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    cardRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.grid}>
      {categorii.map((cat, i) => (
        <div
          key={cat.titlu}
          className={styles.card}
          ref={(el) => { cardRefs.current[i] = el; }}
          style={{ transitionDelay: `${i * 80}ms` }}
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
