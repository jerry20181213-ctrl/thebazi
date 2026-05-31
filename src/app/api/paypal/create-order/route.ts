import { NextRequest } from "next/server";

const PAYPAL_API = (process.env.PAYPAL_API_URL || "https://api-m.sandbox.paypal.com").replace(/\/+$/, "");
const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || "";

const PRICES: Record<string, string> = {
  "Career": "9.99",
  "Love & Relationships": "9.99",
  "Complete Bundle": "14.99",
};

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
    const { tier } = await request.json();
    const price = PRICES[tier];
    if (!price) {
      return Response.json({ error: `Invalid tier: ${tier}` }, { status: 400 });
    }

    const accessToken = await getAccessToken();
    const res = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: { currency_code: "USD", value: price },
            description: `Premium Ba Zi Report — ${tier}`,
          },
        ],
      }),
    });

    const order = await res.json();
    if (!res.ok) {
      return Response.json({ error: order.message || "PayPal order creation failed" }, { status: res.status });
    }
    return Response.json(order);
  } catch (error) {
    console.error("PayPal create-order error:", error);
    return Response.json({ error: "Failed to create order" }, { status: 500 });
  }
}
