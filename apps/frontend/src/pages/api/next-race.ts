import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://api.jolpi.ca/ergast/f1/current/next.json');
    const data = await response.json();

    const race = data.MRData?.RaceTable?.Races?.[0];

    if (!race?.date) {
      return res.status(500).json({ error: 'Invalid race data' });
    }

    res.status(200).json({
      name: race.raceName,
      date: race.date,
    });
  } catch (error) {
    console.error('[API] Jolpica-ergast proxy failed:', error);
    res.status(500).json({ error: 'Unable to fetch next race data' });
  }
}
