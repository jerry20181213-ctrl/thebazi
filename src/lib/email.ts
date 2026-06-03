import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

let resend: Resend | null = null;

function getResend(): Resend {
  if (!resend) {
    resend = new Resend(RESEND_API_KEY);
  }
  return resend;
}

/** The "from" address used for transactional emails.
 *  Dev-fallback: onboarding@resend.dev (works without domain verification).
 *  Production: update to your verified domain, e.g. "noreply@thebazi.com".
 */
function fromAddress(): string {
  const custom = process.env.EMAIL_FROM;
  if (custom) return custom;
  // Resend's default sender — works out of the box on the free plan
  return "The Ba Zi <onboarding@resend.dev>";
}

// ─── Welcome email ──────────────────────────────────────────────────

interface WelcomeEmailOpts {
  to: string;
  locale: string;
}

/** Send a welcome / confirmation email after newsletter signup. */
export async function sendWelcomeEmail({ to, locale }: WelcomeEmailOpts) {
  const subject =
    locale === "zh-TW"
      ? "訂閱確認 — The Ba Zi"
      : "Welcome to The Ba Zi Newsletter";

  const html = buildWelcomeHtml(locale);

  const { error } = await getResend().emails.send({
    from: fromAddress(),
    to,
    subject,
    html,
  });

  if (error) {
    console.error("[email] sendWelcomeEmail failed:", error);
    throw new Error(error.message);
  }
}

// ─── HTML template helpers ──────────────────────────────────────────

function buildWelcomeHtml(locale: string): string {
  const isZh = locale === "zh-TW";

  const heading = isZh ? "感謝您的訂閱！" : "You're subscribed!";
  const intro = isZh
    ? "您已成功訂閱 The Ba Zi 電子報。我們將定期為您送上："
    : "You've successfully subscribed to The Ba Zi newsletter. Expect regular insights on:";

  const items = isZh
    ? [
        "🐉 八字命理基礎知識與進階教學",
        "🐎 十二生肖每週運勢",
        "🔥 五行養生與風水佈局技巧",
        "⭐ 2026-2027 流年運程預測",
        "🎁 獨家免費排盤與配對工具更新",
      ]
    : [
        "🐉 Ba Zi (Four Pillars) fundamentals & advanced guides",
        "🐎 Weekly Chinese zodiac horoscopes",
        "🔥 Five Elements wellness & Feng Shui tips",
        "⭐ 2026–2027 yearly fortune forecasts",
        "🎁 Exclusive updates on free tools & features",
      ];

  const itemsHtml = items.map((item) => `<li>${item}</li>`).join("");

  const footerZh =
    "若您未訂閱本電子報，請忽略此郵件。如有任何問題，歡迎回信聯絡我們。";
  const footerEn =
    "If you didn't sign up for this, you can safely ignore this email.";

  const footer = isZh ? footerZh : footerEn;

  return `
    <!DOCTYPE html>
    <html lang="${isZh ? "zh-TW" : "en"}">
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
    <body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr><td align="center" style="padding:32px 16px">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0"
                 style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08)">
            <tr>
              <td style="background:linear-gradient(135deg,#c62828,#e53935);padding:32px 24px;text-align:center">
                <h1 style="margin:0;font-size:20px;color:#fff;letter-spacing:1px">
                  🏮&nbsp; The Ba Zi &nbsp;🏮
                </h1>
              </td>
            </tr>
            <tr><td style="padding:32px 24px;color:#333;line-height:1.6;font-size:15px">
              <h2 style="margin:0 0 16px;font-size:18px;color:#c62828">${heading}</h2>
              <p style="margin:0 0 20px">${intro}</p>
              <ul style="padding:0 0 0 20px;margin:0 0 24px">${itemsHtml}</ul>
              <p style="margin:0 0 0;font-size:13px;color:#888">${footer}</p>
            </td></tr>
            <tr><td style="padding:16px 24px;border-top:1px solid #eee;text-align:center;font-size:12px;color:#aaa">
              The Ba Zi &mdash; your free Four Pillars of Destiny journey
            </td></tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;
}
