export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || 'https://api.intoturnone.com';

export class APIError extends Error {
  info?: unknown;
  status?: number;

  constructor(message: string, info?: unknown, status?: number) {
    super(message);
    this.info = info;
    this.status = status;
    // Ensure the prototype chain is correctly set
    Object.setPrototypeOf(this, APIError.prototype);
  }
}

/**
 * A generic fetcher for use with SWR.
 * Automatically prefixes the base URL and handles JSON parsing + error fallback.
 *
 * @template T - The expected response type.
 */
export const apiFetcher = async <T = unknown>(path: string): Promise<T> => {
  const response = await fetch(`${API_BASE}${path}`);

  if (!response.ok) {
    const info = await response.json().catch(() => null);
    throw new APIError(`API error: ${response.status}`, info, response.status);
  }

  return response.json();
};
