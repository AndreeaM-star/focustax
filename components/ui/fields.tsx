"use client";

import { useState, type ReactNode } from "react";
import Icon from "./Icon";
import s from "./ui.module.css";
import { fmtLei } from "@/lib/fiscal";

/** Câmp numeric cu sufix și slider opțional */
export function NumberField({
  label, value, onChange, min = 0, max, step = 100, suffix = "lei", hint, slider = true,
}: {
  label: ReactNode; value: number; onChange: (v: number) => void;
  min?: number; max?: number; step?: number; suffix?: string; hint?: ReactNode; slider?: boolean;
}) {
  const id = typeof label === "string" ? `f-${label.replace(/\W+/g, "-").toLowerCase()}` : undefined;
  return (
    <div className={s.field}>
      <div className={s.fieldHead}>
        <label className={s.fieldLabel} htmlFor={id}>{label}</label>
      </div>
      <div className={s.inputWrap}>
        <input
          id={id}
          className={s.input}
          type="number"
          inputMode="decimal"
          value={Number.isFinite(value) ? value : ""}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Math.max(min, Number(e.target.value)))}
        />
        {suffix && <span className={s.inputSuffix}>{suffix}</span>}
      </div>
      {slider && max !== undefined && (
        <input
          className={s.range}
          type="range"
          min={min}
          max={max}
          step={step}
          value={Math.min(value, max)}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={typeof label === "string" ? label : undefined}
        />
      )}
      {hint && <p className={s.fieldHint}>{hint}</p>}
    </div>
  );
}

export function Segmented<T extends string | number>({
  label, options, value, onChange,
}: { label?: ReactNode; options: { value: T; label: ReactNode }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className={s.field}>
      {label && <div className={s.fieldHead}><span className={s.fieldLabel}>{label}</span></div>}
      <div className={s.segmented} role="radiogroup">
        {options.map((o) => (
          <button
            key={String(o.value)}
            type="button"
            role="radio"
            aria-checked={o.value === value}
            className={`${s.segBtn} ${o.value === value ? s.segBtnActive : ""}`}
            onClick={() => onChange(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Checkbox({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children: ReactNode }) {
  return (
    <div className={s.field}>
      <label className={s.check}>
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span>{children}</span>
      </label>
    </div>
  );
}

export function SelectField<T extends string | number>({
  label, value, onChange, options,
}: { label: ReactNode; value: T; onChange: (v: T) => void; options: { value: T; label: string }[] }) {
  return (
    <div className={s.field}>
      <div className={s.fieldHead}><span className={s.fieldLabel}>{label}</span></div>
      <select
        className={s.select}
        value={String(value)}
        onChange={(e) => {
          const o = options.find((x) => String(x.value) === e.target.value);
          if (o) onChange(o.value);
        }}
      >
        {options.map((o) => <option key={String(o.value)} value={String(o.value)}>{o.label}</option>)}
      </select>
    </div>
  );
}

export interface ResultRow {
  label: ReactNode;
  value: number;
  hint?: ReactNode;
  tone?: "neg" | "pos";
  strong?: boolean;
  /** Text afișat în loc de sumă (ex: „scutit”) */
  text?: string;
}

export function ResultRows({ rows }: { rows: ResultRow[] }) {
  return (
    <ul className={s.rows}>
      {rows.map((r, i) => (
        <li key={i} className={`${s.row} ${r.strong ? s.rowStrong : ""}`}>
          <span className={s.rowLabel}>
            {r.label}
            {r.hint && <span className={s.rowHint}>{r.hint}</span>}
          </span>
          <span className={`${s.rowValue} ${r.tone === "neg" ? s.rowNeg : r.tone === "pos" ? s.rowPos : ""}`}>
            {r.text ?? `${r.tone === "neg" && r.value > 0 ? "−" : ""}${fmtLei(r.value)} lei`}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ResultHero({ label, value, sub }: { label: ReactNode; value: number; sub?: ReactNode }) {
  return (
    <div className={s.resultHero}>
      <div className={s.resultLabel}>{label}</div>
      <div className={s.resultValue} aria-live="polite">{fmtLei(value)} lei</div>
      {sub && <div className={s.resultSub}>{sub}</div>}
    </div>
  );
}

/** Bară orizontală care arată cum se împarte o sumă */
export function SplitBar({ parts }: { parts: { label: string; value: number; color: string }[] }) {
  const total = parts.reduce((a, p) => a + Math.max(0, p.value), 0) || 1;
  return (
    <>
      <div className={s.bar} role="img" aria-label={parts.map((p) => `${p.label} ${Math.round((p.value / total) * 100)}%`).join(", ")}>
        {parts.map((p) => <span key={p.label} style={{ width: `${(Math.max(0, p.value) / total) * 100}%`, background: p.color }} />)}
      </div>
      <div className={s.legend}>
        {parts.map((p) => (
          <span key={p.label}><i style={{ background: p.color }} />{p.label} {Math.round((Math.max(0, p.value) / total) * 100)}%</span>
        ))}
      </div>
    </>
  );
}

export function CopyButton({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      className={s.copyBtn}
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1600); } catch { /* clipboard indisponibil */ }
      }}
      aria-label="Copiază rezultatul"
    >
      <Icon name={ok ? "check" : "copy"} size={16} />
      {ok ? "Copiat" : "Copiază"}
    </button>
  );
}

/** Culori pentru SplitBar, compatibile cu tema light/dark */
export const BAR = {
  net: "var(--brand)",
  cas: "#c2410c",
  cass: "#d97706",
  impozit: "#7c3aed",
  cam: "#64748b",
};
