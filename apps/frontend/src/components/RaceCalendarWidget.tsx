'use client';
import { useConstructorStandings } from '@/hooks/useF1Data';

export default function RaceCalendarWidget() {
  const { constructors, isLoading } = useConstructorStandings();

  if (isLoading) return <p className="text-white">Loading constructor standings...</p>;

  return (
    <div className="bg-black/80 p-4 rounded-md border border-red-600">
      <h2 className="text-red-500 font-orbitron text-lg mb-2">Top 5 Constructors</h2>
      <ul className="space-y-2">
        {constructors?.map((team) => (
          <li
            key={team.name}
            className="flex justify-between text-white text-sm border-b border-gray-700 pb-1"
          >
            <span className="font-medium">
              {team.position}. {team.name}
            </span>
            <span>{team.points} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
