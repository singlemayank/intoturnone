// src/components/TopConstructors.tsx
'use client';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function TopConstructors() {
  const { data, error } = useSWR('/api/standings/constructors', fetcher);

  if (error) return <div>Failed to load constructor standings</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold mb-2">Top 5 Constructors</h2>
      <ul className="space-y-1">
        {data.map((team: any) => (
          <li key={team.Constructor.constructorId}>
            {team.position}. {team.Constructor.name} – {team.points} pts
          </li>
        ))}
      </ul>
    </div>
  );
}
