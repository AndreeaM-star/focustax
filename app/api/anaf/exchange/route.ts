import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

const ANAF_TOKEN_URL = "https://logincert.anaf.ro/anaf-oauth2/v1/token";
const ANAF_REVOKE_URL = "https://logincert.anaf.ro/anaf-oauth2/v1/revoke";

// POST /api/anaf/exchange — exchange authorization code for access token
export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    if (!code) {
      return NextResponse.json({ error: "code required" }, { status: 400 });
    }

    const clientId = process.env.ANAF_CLIENT_ID!;
    const clientSecret = process.env.ANAF_CLIENT_SECRET!;
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/manager/`;

    // Exchange authorization code for token
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
      return NextResponse.json(
        { error: `ANAF token error: ${tokenRes.status}` },
        { status: 502 }
      );
    }

    const tokenData = await tokenRes.json();

    // Store token in Supabase
    const sb = createAdminClient();
    const expiresAt = new Date(
      Date.now() + (tokenData.expires_in ?? 3600) * 1000
    ).toISOString();

    // Delete old tokens, keep only latest
    await sb.from("anaf_tokens").delete().neq("id", "00000000-0000-0000-0000-000000000000");

    const { data, error } = await sb
      .from("anaf_tokens")
      .insert({
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token ?? null,
        expires_at: expiresAt,
        cui: tokenData.cui ?? null,
      })
      .select()
      .single();

    if (error) console.error("[ANAF exchange] Supabase store error:", error);

    return NextResponse.json({
      ok: true,
      expiresAt,
      cui: tokenData.cui ?? null,
      tokenId: data?.id ?? null,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Exchange error";
    console.error("[ANAF exchange]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// GET /api/anaf/exchange — get current ANAF connection status
export async function GET() {
  try {
    const sb = createAdminClient();
    const { data } = await sb
      .from("anaf_tokens")
      .select("id, expires_at, cui, created_at")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (!data) {
      return NextResponse.json({ connected: false });
    }

    const isExpired = data.expires_at
      ? new Date(data.expires_at) < new Date()
      : false;

    return NextResponse.json({
      connected: !isExpired,
      expires_at: data.expires_at,
      cui: data.cui,
    });
  } catch {
    return NextResponse.json({ connected: false });
  }
}

// DELETE /api/anaf/exchange — revoke + disconnect
export async function DELETE() {
  try {
    const sb = createAdminClient();

    // Get current token
    const { data: tokenRow } = await sb
      .from("anaf_tokens")
      .select("access_token")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    // Attempt revoke at ANAF (best effort)
    if (tokenRow?.access_token) {
      const clientId = process.env.ANAF_CLIENT_ID!;
      const clientSecret = process.env.ANAF_CLIENT_SECRET!;
      const params = new URLSearchParams({
        token: tokenRow.access_token,
        client_id: clientId,
        client_secret: clientSecret,
      });
      await fetch(ANAF_REVOKE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      }).catch(() => {});
    }

    // Remove all tokens from DB
    await sb.from("anaf_tokens").delete().neq("id", "00000000-0000-0000-0000-000000000000");

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Disconnect error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
