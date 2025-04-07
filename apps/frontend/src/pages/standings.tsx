import Head from 'next/head';
import { useDriverStandings, useConstructorStandings } from '@/hooks/useF1Data';
import { Trophy, Users } from 'lucide-react';

export default function StandingsPage() {
  const { drivers, isLoading: driversLoading, isError: driversError } = useDriverStandings();
  const { constructors, isLoading: constructorsLoading, isError: constructorsError } = useConstructorStandings();

  return (
    <>
      <Head>
        <title>F1 2025 Standings | IntoTurnOne</title>
      </Head>

      <main className="px-4 py-8 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center">🏆 2025 Championship Standings</h1>

        {/* === Driver Cards === */}
        <section className="mb-14">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6" /> Driver Standings
          </h2>

          {driversLoading && <p>Loading driver standings...</p>}
          {driversError && <p>Failed to load driver standings.</p>}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {drivers?.map((d) => (
              <div
                key={d.driverId}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 shadow-md hover:shadow-xl transition"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-400 font-medium">#{d.position}</span>
                  <span className="text-xs text-gray-500">{d.team}</span>
                </div>
                <h3 className="text-lg font-semibold mb-1">{d.full_name}</h3>
                <div className="flex items-center justify-between text-sm text-gray-300">
                  <span>Points: <strong>{d.points}</strong></span>
                  <span>Wins: <strong>{d.wins}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* === Constructor Cards === */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Users className="w-6 h-6" /> Constructor Standings
          </h2>

          {constructorsLoading && <p>Loading constructor standings...</p>}
          {constructorsError && <p>Failed to load constructor standings.</p>}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {constructors?.map((c) => (
              <div
                key={c.constructorId}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 shadow-md hover:shadow-xl transition"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-400 font-medium">#{c.position}</span>
                  <span className="text-xs text-gray-500">Constructor</span>
                </div>
                <h3 className="text-lg font-semibold mb-1">{c.name}</h3>
                <div className="flex items-center justify-between text-sm text-gray-300">
                  <span>Points: <strong>{c.points}</strong></span>
                  <span>Wins: <strong>{c.wins}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
