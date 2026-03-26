"use client";

import { useState, useEffect } from "react";

export interface CompanyInfo {
  id: string;
  nume: string;
  cui: string;
}

/** Read company from localStorage. Returns null if not set up. */
export function useCompany(): CompanyInfo | null {
  const [company, setCompany] = useState<CompanyInfo | null>(null);

  useEffect(() => {
    const id   = localStorage.getItem("focustax_company_id") ?? "";
    const nume = localStorage.getItem("focustax_company_name") ?? "";
    const cui  = localStorage.getItem("focustax_company_cui") ?? "";

    const isInvalid = !id || id === "demo" || id === "temp" || nume.toLowerCase().includes("demo");
    if (!isInvalid) {
      setCompany({ id, nume, cui });
    }
  }, []);

  return company;
}
