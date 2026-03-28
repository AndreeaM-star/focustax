import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { verifySession } from "@/lib/auth";

const ANAF_TOKEN_URL = "https://logincert.anaf.ro/anaf-oauth2/v1/token";
const ANAF_REVOKE_URL = "https://logincert.anaf.ro/anaf-oauth2/v1/revoke";

// POST /api/anaf/exchange — exchange authorization code for access token
export async function POST(req: NextRequest) {
  try {
    const { code, companyId: bodyCompanyId } = await req.json();
    if (!code) return NextResponse.json({ error: "code required" }, { status: 400 });

    // Try session auth first, fall back to body companyId (for callback flow)
    const sessionCompanyId = await verifySession(req);
    const companyId = sessionCompanyId ?? bodyCompanyId;
    if (!companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const clientId = process.env.ANAF_CLIENT_ID!;
    const clientSecret = process.env.ANAF_CLIENT_SECRET!;
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/manager/`;

    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    });

    const tokenRes = await fetch(ANAF_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      console.error("[ANAF exchange] token error:", errText);
      return NextResponse.json({ error: `ANAF token error: ${tokenRes.status}` }, { status: 502 });
    }

    const tokenData = await tokenRes.json();
    const sb = createAdminClient();
    const expiresAt = new Date(Date.now() + (tokenData.expires_in ?? 3600) * 1000).toISOString();

    // Delete old token for this company
    await sb.from("anaf_tokens").delete().eq("company_id", companyId);

    const { data, error } = await sb
      .from("anaf_tokens")
      .insert({
        company_id: companyId,
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token ?? null,
        expires_at: expiresAt,
        cui: tokenData.cui ?? null,
      })
      .select()
      .single();

    if (error) console.error("[ANAF exchange] Supabase store error:", error);

    return NextResponse.json({ ok: true, expiresAt, cui: tokenData.cui ?? null, tokenId: data?.id ?? null });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Exchange error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// GET /api/anaf/exchange — get ANAF connection status for this company
export async function GET(req: NextRequest) {
  try {
    const companyId = await verifySession(req);
    if (!companyId) return NextResponse.json({ connected: false });

    const sb = createAdminClient();
    const { data } = await sb
      .from("anaf_tokens")
      .select("id, expires_at, cui, created_at")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (!data) return NextResponse.json({ connected: false });

    const isExpired = data.expires_at ? new Date(data.expires_at) < new Date() : false;
    return NextResponse.json({ connected: !isExpired, expires_at: data.expires_at, cui: data.cui });
  } catch {
    return NextResponse.json({ connected: false });
  }
}

// DELETE /api/anaf/exchange — revoke + disconnect for this company
export async function DELETE(req: NextRequest) {
  try {
    const companyId = await verifySession(req);
    if (!companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const sb = createAdminClient();

    const { data: tokenRow } = await sb
      .from("anaf_tokens")
      .select("access_token")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (tokenRow?.access_token) {
      const params = new URLSearchParams({
        token: tokenRow.access_token,
        client_id: process.env.ANAF_CLIENT_ID!,
        client_secret: process.env.ANAF_CLIENT_SECRET!,
      });
      await fetch(ANAF_REVOKE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      }).catch(() => {});
    }

    await sb.from("anaf_tokens").delete().eq("company_id", companyId);
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Disconnect error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
