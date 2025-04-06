// src/components/TopDrivers.tsx
'use client';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function TopDrivers() {
  const { data, error } = useSWR('/api/standings/drivers', fetcher);

  if (error) return <div>Failed to load driver standings</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold mb-2">Top 5 Drivers</h2>
      <ul className="space-y-1">
        {data.map((driver: any) => (
          <li key={driver.Driver.driverId}>
            {driver.position}. {driver.Driver.givenName} {driver.Driver.familyName} – {driver.points} pts
          </li>
        ))}
      </ul>
    </div>
  );
}
