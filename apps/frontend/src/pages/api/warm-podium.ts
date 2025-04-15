// pages/api/cron/warm-podiums.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type WarmPodiumResponse = {
  status: 'ok';
  data: unknown;
} | {
  status: 'error';
  error?: string;
  errorBody?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WarmPodiumResponse>
) {
  const targetURL = 'https://api.intoturnone.com/race/results/all?secret=abc123';

  try {
    const response = await fetch(targetURL, { method: 'GET' });

    if (!response.ok) {
      const errorBody = await response.text();
      return res.status(response.status).json({ status: 'error', errorBody });
    }

    const data = await response.json();
    return res.status(200).json({ status: 'ok', data });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ status: 'error', error: message });
  }
}
