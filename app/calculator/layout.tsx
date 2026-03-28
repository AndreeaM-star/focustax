"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./calculator.module.css";

const TABS = [
  { key: "salariu",   label: "Salariu",     icon: "💼" },
  { key: "pfa",       label: "PFA / II",    icon: "👤" },
  { key: "srl",       label: "SRL / Firmă", icon: "🏢" },
  { key: "chirii",    label: "Chirii",      icon: "🏠" },
  { key: "dividende", label: "Dividende",   icon: "💸" },
  { key: "tva",       label: "TVA",         icon: "📊" },
];

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();
  const pillRef  = useRef<HTMLDivElement>(null);
  const tabRefs  = useRef<(HTMLButtonElement | null)[]>([]);
  const prevIdx  = useRef<number>(-1);
  const [dir, setDir] = useState<"left" | "right">("right");
  const [animKey, setAnimKey] = useState(0);

  const seg   = pathname.split("/").filter(Boolean);
  const tipRaw = seg[seg.length - 1] ?? "salariu";
  const activeIdx = TABS.findIndex((t) => t.key === tipRaw);
  const currentIdx = activeIdx === -1 ? 0 : activeIdx;

  // Slide pill to active tab
  useEffect(() => {
    const el  = tabRefs.current[currentIdx];
    const pill = pillRef.current;
    if (!el || !pill) return;
    pill.style.left  = `${el.offsetLeft}px`;
    pill.style.width = `${el.offsetWidth}px`;
  });

  // Track direction for content animation
  useEffect(() => {
    if (prevIdx.current !== -1 && prevIdx.current !== currentIdx) {
      setDir(currentIdx > prevIdx.current ? "right" : "left");
      setAnimKey((k) => k + 1);
    }
    prevIdx.current = currentIdx;
  }, [currentIdx]);

  const navigate = (idx: number) => {
    if (idx === currentIdx) return;
    router.push(`/calculator/${TABS[idx].key}`);
  };

  return (
    <>
      <Navbar />
      <div className={styles.page}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <p className={styles.pageEyebrow}>România · 2026</p>
          <h1 className={styles.pageTitle}>Calculator Taxe</h1>
          <p className={styles.pageSubtitle}>
            Calculează instant impozitele, contribuțiile și costurile reale — actualizat cu ultimele modificări fiscale.
          </p>
        </div>

        {/* Sliding tab bar */}
        <div className={styles.tabWrap}>
          <div className={styles.tabBar}>
            <div className={styles.tabPill} ref={pillRef} />
            {TABS.map((tab, i) => (
              <button
                key={tab.key}
                ref={(el) => { tabRefs.current[i] = el; }}
                className={`${styles.tab} ${currentIdx === i ? styles.tabActive : ""}`}
                onClick={() => navigate(i)}
              >
                <span className={styles.tabIcon}>{tab.icon}</span>
                <span className={styles.tabLabel}>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Calculator content */}
        <div
          className={`${styles.calcContent} ${dir === "right" ? styles.slideRight : styles.slideLeft}`}
          key={animKey}
        >
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}
