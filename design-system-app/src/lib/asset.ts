/**
 * @description Prefixes a public asset path with the deployment base path so
 * raw <img>/<video>/<source> references resolve correctly on GitHub Pages
 * (served under /Epicare). Next.js does NOT auto-prefix raw asset src attributes
 * with basePath — only next/image, next/link and the router — so use this helper
 * for any hardcoded "/..." asset reference.
 *
 * Local dev (no NEXT_PUBLIC_BASE_PATH) resolves to the original root path.
 *
 * @example asset('/short_logo.svg') // -> '/Epicare/short_logo.svg' in CI, '/short_logo.svg' locally
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${p}`;
}
