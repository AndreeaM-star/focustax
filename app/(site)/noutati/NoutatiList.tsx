"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge, Icon, ui } from "@/components/ui";
import { lunaAn, type Noutate } from "@/lib/noutati";
import s from "./noutati.module.css";

export default function NoutatiList({ noutati, categorii }: { noutati: Noutate[]; categorii: string[] }) {
  const [filtru, setFiltru] = useState<string | null>(null);
  const lista = filtru ? noutati.filter((n) => n.categorie === filtru) : noutati;

  return (
    <>
      <div className={ui.chips} role="group" aria-label="Filtrează după categorie">
        <button type="button" className={`${ui.chip} ${filtru === null ? ui.chipActive : ""}`} onClick={() => setFiltru(null)}>
          Toate ({noutati.length})
        </button>
        {categorii.map((c) => (
          <button key={c} type="button" className={`${ui.chip} ${filtru === c ? ui.chipActive : ""}`} onClick={() => setFiltru(c)}>
            {c}
          </button>
        ))}
      </div>

      <ol className={s.list}>
        {lista.map((n) => (
          <li key={n.slug}>
            <Link href={`/noutati/${n.slug}`} className={s.item}>
              <time className={s.date} dateTime={n.iso}>{lunaAn(n.iso)}</time>
              <div className={s.body}>
                <div className={s.meta}>
                  <Badge tone={n.urgenta === "important" ? "accent" : n.urgenta === "urgent" ? "danger" : "neutral"}>{n.tag}</Badge>
                </div>
                <h2 className={s.title}>{n.titlu}</h2>
                <p className={s.excerpt}>{n.desc.split("\n")[0]}</p>
              </div>
              <Icon name="chevronRight" className={s.chev} />
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
