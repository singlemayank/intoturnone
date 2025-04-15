// apps/frontend/utils/api.ts

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || 'https://api.intoturnone.com';

/**
 * A generic fetcher for use with SWR.
 * Automatically prefixes the base URL and handles JSON + error fallback.
 */
export const apiFetcher = async (path: string) => {
  const response = await fetch(`${API_BASE}${path}`);

  if (!response.ok) {
    const error = new Error(`API error: ${response.status}`);
    // You can attach response to inspect further
    (error as any).info = await response.json().catch(() => null);
    (error as any).status = response.status;
    throw error;
  }

  return response.json();
};
