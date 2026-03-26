import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { nextInvoiceNumber } from "@/lib/salary";

// GET /api/facturi — list all
export async function GET() {
  try {
    const sb = createAdminClient();
    const { data, error } = await sb
      .from("facturi")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "DB error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// POST /api/facturi — create new
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const sb = createAdminClient();

    // Get last invoice number to generate next
    const { data: last } = await sb
      .from("facturi")
      .select("numar")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    const numar = last?.numar ? nextInvoiceNumber(last.numar) : "F2026-0001";

    const { data, error } = await sb
      .from("facturi")
      .insert({
        numar,
        client: body.client,
        cui_client: body.cuiClient ?? "",
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

    // Simulate ANAF validation after 3 seconds using a background update
    setTimeout(async () => {
      await sb
        .from("facturi")
        .update({ status: "validata" })
        .eq("id", data.id);
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
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
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
