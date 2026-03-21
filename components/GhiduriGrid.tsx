"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "@/app/ghiduri/page.module.css";

type GhidItem = { titlu: string; desc: string; slug: string };
type Categorie = { categorie: string; culoare: string; lista: GhidItem[] };

export default function GhiduriGrid({ ghiduri }: { ghiduri: Categorie[] }) {
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
      {ghiduri.map((g, i) => (
        <div
          key={g.categorie}
          className={styles.card}
          ref={(el) => { cardRefs.current[i] = el; }}
          style={{ transitionDelay: `${i * 80}ms` }}
        >
          <div className={styles.cardHeader} style={{ borderColor: g.culoare }}>
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
