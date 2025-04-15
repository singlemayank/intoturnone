// pages/api/cron/warm-podiums.ts
export default async function handler(req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { status: string; errorBody?: string; data?: any; error?: any; }): any; new(): any; }; }; }) {
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
  