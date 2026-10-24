"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon, ui } from "@/components/ui";
import type { TermenGlosar } from "@/lib/glosar";
import s from "./glosar.module.css";

const norm = (x: string) => x.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function GlosarList({ termeni }: { termeni: TermenGlosar[] }) {
  const [q, setQ] = useState("");

  const grupe = useMemo(() => {
    const n = norm(q.trim());
    const lista = n ? termeni.filter((t) => norm(t.termen).includes(n) || norm(t.definitie).includes(n)) : termeni;
    const m = new Map<string, TermenGlosar[]>();
    for (const t of lista) {
      const l = norm(t.termen[0]).toUpperCase();
      m.set(l, [...(m.get(l) ?? []), t]);
    }
    return Array.from(m.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [q, termeni]);

  return (
    <>
      <div className={s.top}>
        <label className={ui.searchBox}>
          <Icon name="search" size={18} />
          <input type="search" placeholder="Caută un termen: CASS, deducere, SPV…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Caută în glosar" />
        </label>
        <nav className={s.letters} aria-label="Litere">
          {grupe.map(([l]) => <a key={l} href={`#litera-${l}`}>{l}</a>)}
        </nav>
      </div>

      {grupe.length === 0 && <p className={s.empty}>Niciun termen pentru „{q}”.</p>}

      {grupe.map(([l, lista]) => (
        <section key={l} id={`litera-${l}`} className={s.group}>
          <h2 className={s.letter}>{l}</h2>
          <dl className={s.terms}>
            {lista.map((t) => (
              <div key={t.termen} className={s.term} id={norm(t.termen).replace(/\W+/g, "-")}>
                <dt>{t.termen}</dt>
                <dd>
                  <p>{t.definitie}</p>
                  {t.exemplu && <p className={s.ex}><span>Exemplu:</span> {t.exemplu}</p>}
                  {t.linkUri && <Link href={t.linkUri} className={s.more}>Află mai mult <Icon name="arrowRight" size={14} /></Link>}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </>
  );
}
