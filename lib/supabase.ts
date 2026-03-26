import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Browser-safe client (anon key + RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-only admin client (bypasses RLS) — only import in API routes
export function createAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY missing");
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

// Types
export interface Factura {
  id?: string;
  numar: string;
  client: string;
  cui_client?: string;
  valoare: number;
  tva: number;
  data: string;
  scadenta?: string;
  status: "validata" | "in_asteptare" | "respinsa" | "draft";
  descriere?: string;
  anaf_id?: string;
  created_at?: string;
}

export interface Angajat {
  id?: string;
  nume: string;
  functie: string;
  brut_lunar: number;
  data_angajare?: string;
  nr_copii: number;
  pontaj: number;
  activ?: boolean;
  created_at?: string;
}

export interface Tranzactie {
  id?: string;
  banca: string;
  tip: "credit" | "debit";
  suma: number;
  descriere?: string;
  reconciliat: boolean;
  factura_ref?: string;
  data: string;
  created_at?: string;
}
