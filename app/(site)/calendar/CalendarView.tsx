"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Badge, Icon, ui } from "@/components/ui";
import { PROFILE, zileRamase, type Profil, type Termen } from "@/lib/calendar";
import s from "./calendar.module.css";

const LUNI = ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"];

function linkGoogle(t: Termen) {
  const d = t.data.replace(/-/g, "");
  const next = new Date(`${t.data}T12:00:00`);
  next.setDate(next.getDate() + 1);
  const e = `${next.getFullYear()}${String(next.getMonth() + 1).padStart(2, "0")}${String(next.getDate()).padStart(2, "0")}`;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`${t.cod} — ${t.titlu}`)}&dates=${d}/${e}&details=${encodeURIComponent("Termen fiscal — www.focustax.ro/calendar")}`;
}

export default function CalendarView({ termene, ani }: { termene: Record<number, Termen[]>; ani: number[] }) {
  const [an, setAn] = useState(ani[0]);
  const [profiluri, setProfiluri] = useState<Profil[]>([]);
  const [ascundeTrecute, setAscundeTrecute] = useState(true);

  const lista = useMemo(() => {
    return (termene[an] ?? []).filter((t) =>
      (profiluri.length === 0 || t.profile.some((p) => profiluri.includes(p))) &&
      (!ascundeTrecute || zileRamase(t.data) >= 0)
    );
  }, [termene, an, profiluri, ascundeTrecute]);

  const peLuni = useMemo(() => {
    const m = new Map<number, Termen[]>();
    for (const t of lista) {
      const l = Number(t.data.slice(5, 7));
      m.set(l, [...(m.get(l) ?? []), t]);
    }
    return Array.from(m.entries());
  }, [lista]);

  const toggle = (p: Profil) => setProfiluri((x) => (x.includes(p) ? x.filter((y) => y !== p) : [...x, p]));

  return (
    <>
      <div className={s.controls}>
        <div className={ui.segmented} role="radiogroup" aria-label="Anul">
          {ani.map((a) => (
            <button key={a} type="button" role="radio" aria-checked={a === an} className={`${ui.segBtn} ${a === an ? ui.segBtnActive : ""}`} onClick={() => setAn(a)}>{a}</button>
          ))}
        </div>
        <label className={ui.check} style={{ alignItems: "center" }}>
          <input type="checkbox" checked={ascundeTrecute} onChange={(e) => setAscundeTrecute(e.target.checked)} />
          Ascunde termenele trecute
        </label>
      </div>

      <p className={s.filterLabel}>Mă interesează:</p>
      <div className={ui.chips} role="group" aria-label="Profil">
        {PROFILE.map((p) => (
          <button key={p.id} type="button" className={`${ui.chip} ${profiluri.includes(p.id) ? ui.chipActive : ""}`} aria-pressed={profiluri.includes(p.id)} onClick={() => toggle(p.id)}>
            {p.label}
          </button>
        ))}
        {profiluri.length > 0 && <button type="button" className={ui.chip} onClick={() => setProfiluri([])}>Toate</button>}
      </div>

      {peLuni.length === 0 && <p className={s.empty}>Nu există termene pentru filtrele alese.</p>}

      <div className={s.months}>
        {peLuni.map(([luna, ts]) => (
          <section key={luna} className={s.month}>
            <h2 className={s.monthTitle}>{LUNI[luna - 1]} {an}</h2>
            <ul className={s.items}>
              {ts.map((t) => {
                const z = zileRamase(t.data);
                const zi = Number(t.data.slice(8, 10));
                return (
                  <li key={`${t.data}-${t.cod}-${t.titlu}`} className={`${s.item} ${z < 0 ? s.past : ""}`}>
                    <span className={s.day}>{zi}</span>
                    <div className={s.body}>
                      <span className={s.code}>{t.cod}</span>
                      {t.link ? <Link href={t.link} className={s.title}>{t.titlu}</Link> : <span className={s.title}>{t.titlu}</span>}
                    </div>
                    <div className={s.right}>
                      {z >= 0 && z <= 14 && <Badge tone={z <= 3 ? "danger" : "accent"}>{z === 0 ? "azi" : z === 1 ? "mâine" : `${z} zile`}</Badge>}
                      {z >= 0 && (
                        <a href={linkGoogle(t)} target="_blank" rel="noopener noreferrer" className={s.gcal} aria-label={`Adaugă ${t.cod} în Google Calendar`} title="Adaugă în Google Calendar">
                          <Icon name="calendar" size={16} />
                        </a>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
