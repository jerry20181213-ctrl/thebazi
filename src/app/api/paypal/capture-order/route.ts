import { NextRequest } from "next/server";

const PAYPAL_API = (process.env.PAYPAL_API_URL || "https://api-m.sandbox.paypal.com").replace(/\/+$/, "");
const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || "";

async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) {
    const err = await res.text().catch(() => "");
    throw new Error(`PayPal auth failed (${res.status}): ${err}`);
  }
  const data = await res.json();
  return data.access_token;
}

export async function POST(request: NextRequest) {
  try {
    const { orderID } = await request.json();
    if (!orderID) {
      return Response.json({ error: "Missing orderID" }, { status: 400 });
    }

    const accessToken = await getAccessToken();
    const res = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const capture = await res.json();
    if (!res.ok) {
      return Response.json({ error: capture.message || "Capture failed" }, { status: res.status });
    }
    return Response.json(capture);
  } catch (error) {
    console.error("PayPal capture-order error:", error);
    return Response.json({ error: "Failed to capture order" }, { status: 500 });
  }
}
