import Head from 'next/head';
import useSWR from 'swr';
import { useState, useRef, useEffect } from 'react';
import { flagMap } from "@/utils/flagMap";

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

  // Toggle underline refs
  const upcomingRef = useRef<HTMLButtonElement>(null);
  const pastRef = useRef<HTMLButtonElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeButton = showUpcoming ? upcomingRef.current : pastRef.current;
    const underline = underlineRef.current;

    if (activeButton && underline) {
      underline.style.width = `${activeButton.offsetWidth}px`;
      underline.style.transform = `translateX(${activeButton.offsetLeft}px)`;
    }
  }, [showUpcoming]);

  return (
    <>
      <Head>
        <title>F1 2025 Race Calendar | IntoTurnOne</title>
      </Head>

      <main className="p-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🗓️ 2025 Formula 1 Calendar</h1>

        {/* Toggle Section with animated underline */}
        <div className="relative mb-6 w-fit">
          <div className="flex space-x-4">
            <button
              ref={upcomingRef}
              onClick={() => setShowUpcoming(true)}
              className={`pb-2 transition-colors font-medium ${
                showUpcoming
                  ? 'text-white font-bold'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Upcoming
            </button>
            <button
              ref={pastRef}
              onClick={() => setShowUpcoming(false)}
              className={`pb-2 transition-colors font-medium ${
                !showUpcoming
                  ? 'text-white font-bold'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Past
            </button>
          </div>

          {/* Sliding underline */}
          <div
            ref={underlineRef}
            className="absolute bottom-0 h-[2px] bg-white transition-all duration-300"
          />
        </div>

        {/* Loading / Error / No Results */}
        {isLoading && <p>Loading races...</p>}
        {error && <p>Failed to load schedule.</p>}
        {filteredRaces?.length === 0 && (
          <p className="text-gray-600">No races to show here.</p>
        )}

        {/* Race Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRaces?.map((race) => {
            const dateObj = new Date(race.date);
            const day = dateObj.getDate();
            const month = dateObj.toLocaleString('default', { month: 'short' });

            const flagUrl = flagMap[race.country] ?? "/flag/wavy/default.png";

            return (
              <div
                key={race.round}
                className="relative rounded-xl overflow-hidden shadow-md transform transition duration-300 hover:scale-[1.03] cursor-pointer"
                style={{
                  backgroundImage: `url(${flagUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="absolute inset-0 bg-black/40 z-0" />
                <div className="relative z-10 p-5 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium">Round {race.round}</div>
                    <div className="text-right">
                      <div className="text-xl font-bold leading-none">{day}</div>
                      <div className="text-xs uppercase">{month}</div>
                    </div>
                  </div>
                  <h2 className="text-lg font-semibold">{race.name}</h2>
                  <p className="text-sm">{race.location}, {race.country}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
