"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  tier: string;
  onSuccess: (details: { payerEmail?: string; payerName?: string; captureId?: string }) => void;
  onError?: (err: string) => void;
}

export default function PayPalButton({ tier, onSuccess, onError }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    if (!clientId) {
      setError("PayPal is not configured. Please set NEXT_PUBLIC_PAYPAL_CLIENT_ID.");
      return;
    }

    // Prevent duplicate script loading
    const existingScript = document.querySelector(
      `script[src*="paypal.com/sdk/js"][src*="${clientId}"]`
    );
    if (existingScript) {
      // SDK already loaded — try rendering directly
      const attemptRender = () => {
        if ((window as any).paypal?.Buttons && containerRef.current) {
          renderButtons();
        }
      };
      // Give it a tick if the DOM just appeared
      setTimeout(attemptRender, 300);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
    script.onload = () => {
      setLoaded(true);
      if (containerRef.current) {
        renderButtons();
      }
    };
    script.onerror = () => {
      setError("Failed to load PayPal. Please try again.");
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script if component unmounts before load
      if (!loaded && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [tier]);

  function renderButtons() {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    (window as any).paypal.Buttons({
      createOrder: async () => {
        const res = await fetch("/api/paypal/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tier }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create order");
        return data.id;
      },
      onApprove: async (data: { orderID: string }) => {
        const res = await fetch("/api/paypal/capture-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderID: data.orderID }),
        });
        const capture = await res.json();
        if (!res.ok) throw new Error(capture.error || "Payment capture failed");

        const status = capture.status || capture.details?.[0]?.issue;
        if (capture.status === "COMPLETED") {
          const payer = capture.payer;
          const purchaseUnit = capture.purchase_units?.[0];
          const captureId = purchaseUnit?.payments?.captures?.[0]?.id;
          onSuccess({
            payerEmail: payer?.email_address,
            payerName: payer?.name?.given_name
              ? `${payer.name.given_name} ${payer.name.surname || ""}`
              : undefined,
            captureId,
          });
        } else {
          onError?.(`Payment status: ${status || "unknown"}`);
        }
      },
      onError: (err: any) => {
        console.error("PayPal error:", err);
        onError?.("An error occurred during payment. Please try again.");
      },
    }).render(containerRef.current);
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-center text-xs text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-[50px]">
      {!loaded && (
        <div className="flex items-center justify-center py-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600" />
          <span className="ml-2 text-xs text-zinc-400">Loading PayPal...</span>
        </div>
      )}
      <div ref={containerRef} className={loaded ? "" : "hidden"} />
    </div>
  );
}
