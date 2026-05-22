"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import styles from "@/app/ghiduri/page.module.css";

type GhidItem = { titlu: string; desc: string; slug: string };
type Categorie = { categorie: string; culoare: string; lista: GhidItem[] };

export default function GhiduriGrid({ ghiduri }: { ghiduri: Categorie[] }) {
  const [query, setQuery] = useState("");

  const filtrate = useMemo(() => {
    if (!query.trim()) return ghiduri;
    const q = query.toLowerCase();
    return ghiduri
      .map((g) => ({
        ...g,
        lista: g.lista.filter(
          (item) =>
            item.titlu.toLowerCase().includes(q) ||
            item.desc.toLowerCase().includes(q) ||
            g.categorie.toLowerCase().includes(q)
        ),
      }))
      .filter((g) => g.lista.length > 0);
  }, [query, ghiduri]);

  const totalGhiduri = filtrate.reduce((s, g) => s + g.lista.length, 0);

  return (
    <>
      <div className={styles.searchWrap}>
        <input
          type="search"
          placeholder="Caută un ghid fiscal… (PFA, TVA, chirii, D212…)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
          aria-label="Caută ghiduri fiscale"
        />
        {query && (
          <span className={styles.searchCount}>
            {totalGhiduri === 0 ? "Niciun rezultat" : `${totalGhiduri} ghid${totalGhiduri !== 1 ? "uri" : ""}`}
          </span>
        )}
      </div>

      {filtrate.length === 0 ? (
        <p className={styles.noResults}>
          Niciun ghid găsit pentru „{query}". Încearcă alt termen.
        </p>
      ) : (
        <div className={styles.grid}>
          {filtrate.map((g, i) => (
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
      )}
    </>
  );
}
