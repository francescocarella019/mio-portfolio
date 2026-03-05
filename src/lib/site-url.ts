const DEFAULT_SITE_URL = "http://localhost:3000";

function normalizeUrl(url: string) {
  return url.replace(/\/+$/, "");
}

export const SITE_URL = normalizeUrl(
  process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
);
