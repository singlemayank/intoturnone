import Head from 'next/head';
import { useDriverStandings, useConstructorStandings } from '@/hooks/useF1Data';

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

        {/* === Driver Standings Table === */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">👨‍✈️ Driver Standings</h2>
          {driversLoading && <p>Loading driver standings...</p>}
          {driversError && <p>Failed to load driver standings.</p>}
          {!driversLoading && !driversError && (
            <div className="overflow-x-auto border rounded-xl shadow-sm backdrop-blur bg-white/5 border-white/10">
              <table className="min-w-full text-sm">
                <thead className="bg-white/10 text-white/80 uppercase text-xs">
                  <tr>
                    <th className="p-3 text-left">Pos</th>
                    <th className="p-3 text-left">Driver</th>
                    <th className="p-3 text-left">Team</th>
                    <th className="p-3 text-right">Points</th>
                    <th className="p-3 text-right">Wins</th>
                  </tr>
                </thead>
                <tbody>
                  {drivers.map((d, index) => (
                    <tr key={d.driverId} className={index % 2 === 0 ? 'bg-white/5' : 'bg-transparent'}>
                      <td className="p-3 font-medium">{d.position}</td>
                      <td className="p-3">{d.full_name}</td>
                      <td className="p-3">{d.team}</td>
                      <td className="p-3 text-right">{d.points}</td>
                      <td className="p-3 text-right">{d.wins}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* === Constructor Standings Table === */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">🏎️ Constructor Standings</h2>
          {constructorsLoading && <p>Loading constructor standings...</p>}
          {constructorsError && <p>Failed to load constructor standings.</p>}
          {!constructorsLoading && !constructorsError && (
            <div className="overflow-x-auto border rounded-xl shadow-sm backdrop-blur bg-white/5 border-white/10">
              <table className="min-w-full text-sm">
                <thead className="bg-white/10 text-white/80 uppercase text-xs">
                  <tr>
                    <th className="p-3 text-left">Pos</th>
                    <th className="p-3 text-left">Team</th>
                    <th className="p-3 text-right">Points</th>
                    <th className="p-3 text-right">Wins</th>
                  </tr>
                </thead>
                <tbody>
                  {constructors.map((c, index) => (
                    <tr key={c.constructorId} className={index % 2 === 0 ? 'bg-white/5' : 'bg-transparent'}>
                      <td className="p-3 font-medium">{c.position}</td>
                      <td className="p-3">{c.name}</td>
                      <td className="p-3 text-right">{c.points}</td>
                      <td className="p-3 text-right">{c.wins}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
