import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { verifySession } from "@/lib/auth";
import { nextInvoiceNumber } from "@/lib/salary";

// GET /api/facturi
export async function GET(req: NextRequest) {
  try {
    const companyId = await verifySession(req);
    if (!companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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

// POST /api/facturi
export async function POST(req: NextRequest) {
  try {
    const companyId = await verifySession(req);
    if (!companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const sb = createAdminClient();

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
    return NextResponse.json(data, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "DB error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// DELETE /api/facturi?id=UUID
export async function DELETE(req: NextRequest) {
  try {
    const companyId = await verifySession(req);
    if (!companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const id = new URL(req.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const sb = createAdminClient();
    // Only delete if belongs to this company
    const { error } = await sb
      .from("facturi")
      .delete()
      .eq("id", id)
      .eq("company_id", companyId);

    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "DB error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
