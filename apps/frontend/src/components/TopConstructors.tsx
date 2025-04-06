'use client';
import useSWR from 'swr';
import { ConstructorStanding } from '@/types/f1';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function TopConstructors() {
  const { data, error } = useSWR<ConstructorStanding[]>('/api/standings/constructors', fetcher);

  if (error) return <div>Failed to load constructor standings</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold mb-2">Top 5 Teams</h2>
      <ul className="space-y-1">
        {data.map((team) => (
          <li key={team.name}>
            {team.position}. {team.name} – {team.points} pts
          </li>
        ))}
      </ul>
    </div>
  );
}
