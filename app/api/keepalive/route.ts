import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

/**
 * Apelat zilnic de Vercel Cron (vercel.json): o interogare minimă ține proiectul
 * Supabase activ, ca planul gratuit să nu-l pună în pauză după 7 zile fără activitate.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { error } = await createAdminClient().from("abonati_alerte").select("id", { head: true, count: "exact" });
  return NextResponse.json({ ok: !error, at: new Date().toISOString() }, { status: error ? 500 : 200 });
}
