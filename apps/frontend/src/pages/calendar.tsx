import Head from 'next/head';
import useSWR from 'swr';
import { useState } from 'react';

interface Race {
  round: number;
  name: string;
  country: string;
  location: string;
  date: string;
}

interface RaceSchedule {
  season: number;
  races: Race[];
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function CalendarPage() {
  const { data, error, isLoading } = useSWR<RaceSchedule>(
    'https://api.intoturnone.com/race/schedule',
    fetcher
  );
  const [showUpcoming, setShowUpcoming] = useState(true);

  const now = new Date();

  const filteredRaces = data?.races.filter((race) => {
    const raceDate = new Date(race.date);
    return showUpcoming ? raceDate >= now : raceDate < now;
  });

  return (
    <>
      <Head>
        <title>F1 2025 Race Calendar | IntoTurnOne</title>
      </Head>
      <main className="p-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🗓️ 2025 Formula 1 Calendar</h1>

        <div className="mb-6">
          <button
            onClick={() => setShowUpcoming(true)}
            className={`mr-2 px-4 py-2 rounded-lg ${
              showUpcoming ? 'bg-black text-white' : 'bg-gray-200'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setShowUpcoming(false)}
            className={`px-4 py-2 rounded-lg ${
              !showUpcoming ? 'bg-black text-white' : 'bg-gray-200'
            }`}
          >
            Past
          </button>
        </div>

        {isLoading && <p>Loading races...</p>}
        {error && <p>Failed to load schedule.</p>}

        {filteredRaces?.length === 0 && (
          <p className="text-gray-600">No races to show here.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRaces?.map((race) => {
            const dateObj = new Date(race.date);
            const day = dateObj.getDate();
            const month = dateObj.toLocaleString('default', { month: 'short' });

            return (
              <div
                key={race.round}
                className="rounded-xl border shadow-md hover:shadow-lg transition bg-white p-5"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-500 font-medium">
                    Round {race.round}
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold leading-none">{day}</div>
                    <div className="text-xs text-gray-400 uppercase">{month}</div>
                  </div>
                </div>
                <h2 className="text-lg font-semibold">{race.name}</h2>
                <p className="text-sm text-gray-600">{race.location}, {race.country}</p>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
