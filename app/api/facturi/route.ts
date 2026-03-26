import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { nextInvoiceNumber } from "@/lib/salary";

// GET /api/facturi?company_id=UUID
export async function GET(req: NextRequest) {
  try {
    const companyId = new URL(req.url).searchParams.get("company_id");
    if (!companyId) return NextResponse.json({ error: "company_id required" }, { status: 400 });

    const sb = createAdminClient();
    const { data, error } = await sb
      .from("facturi")
      .select("*")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "DB error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// POST /api/facturi — body must include company_id
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const companyId = body.company_id;
    if (!companyId) return NextResponse.json({ error: "company_id required" }, { status: 400 });

    const sb = createAdminClient();

    // Get last invoice number for this specific company
    const { data: last } = await sb
      .from("facturi")
      .select("numar")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    const year = new Date().getFullYear();
    const numar = last?.numar ? nextInvoiceNumber(last.numar) : `F${year}-0001`;

    const { data, error } = await sb
      .from("facturi")
      .insert({
        company_id: companyId,
        numar,
        client: body.client,
        cui_client: body.cui_client ?? "",
        valoare: body.valoare,
        tva: body.tva,
        data: body.data,
        scadenta: body.scadenta ?? null,
        status: "in_asteptare",
        descriere: body.descriere ?? "",
      })
      .select()
      .single();

    if (error) throw error;

    // Simulate ANAF validation after 3s
    setTimeout(async () => {
      await sb.from("facturi").update({ status: "validata" }).eq("id", data.id);
    }, 3000);

    return NextResponse.json(data, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "DB error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// DELETE /api/facturi?id=UUID
export async function DELETE(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const sb = createAdminClient();
    const { error } = await sb.from("facturi").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "DB error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
