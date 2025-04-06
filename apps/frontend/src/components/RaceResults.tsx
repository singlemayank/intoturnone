// src/components/RaceResults.tsx
'use client';

import { useRaceResults } from '@/hooks/useF1Data';

export default function RaceResults() {
  const { raceResults, isLoading, isError } = useRaceResults();

  if (isLoading) return <p className="text-white">Loading race results...</p>;
  if (isError || !raceResults) return <p className="text-red-500">Failed to load race results.</p>;

  const { race_name, date, winner, results } = raceResults;

  return (
    <div className="bg-black/90 p-4 rounded-md border border-red-600 text-white">
      <h2 className="text-red-500 font-orbitron text-xl mb-3">🏁 {race_name} - Results</h2>
      <p className="text-sm mb-2 text-gray-400">Date: {date}</p>

      <div className="mb-4">
        <h3 className="text-lg font-bold text-green-400">🏆 Winner</h3>
        <p>
          {winner.position}. {winner.full_name} ({winner.team}) – {winner.time}
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold text-blue-400 mb-2">Top Finishers</h3>
        <ul className="space-y-1 text-sm">
          {results.slice(0, 5).map((driver) => (
            <li key={driver.driver_number}>
              {driver.position}. {driver.full_name} ({driver.team}) – {driver.time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
