/**
 * Simple in-memory rate limiter for API routes.
 * In production (Vercel), replace with Vercel KV-based rate limiting.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) store.delete(key);
  }
}, 300_000);

interface RateLimitOptions {
  /** Max requests in the window */
  max: number;
  /** Window duration in ms */
  windowMs: number;
}

const DEFAULT_OPTS: RateLimitOptions = { max: 10, windowMs: 60_000 }; // 10 req/min

/**
 * Returns true if the request should be rate-limited (429).
 * Returns false if the request is allowed through.
 */
export function isRateLimited(ip: string, opts: Partial<RateLimitOptions> = {}): boolean {
  const { max, windowMs } = { ...DEFAULT_OPTS, ...opts };
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || entry.resetAt <= now) {
    store.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  entry.count++;
  if (entry.count > max) return true;

  return false;
}

/**
 * Rate limit headers helper — returns headers to set on the response.
 */
export function rateLimitHeaders(ip: string, opts: Partial<RateLimitOptions> = {}): Record<string, string> {
  const { max, windowMs } = { ...DEFAULT_OPTS, ...opts };
  const entry = store.get(ip);
  const remaining = entry ? Math.max(0, max - entry.count) : max;
  return {
    "X-RateLimit-Limit": String(max),
    "X-RateLimit-Remaining": String(remaining),
    "X-RateLimit-Reset": String(Math.ceil((entry?.resetAt ?? Date.now() + windowMs) / 1000)),
  };
}

/**
 * Extract IP from request headers.
 */
export function getIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "127.0.0.1";
}
