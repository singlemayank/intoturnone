  import Head from 'next/head';
  import useSWR from 'swr';
  import { useState, useRef, useEffect } from 'react';
  import { flagMap } from "@/utils/flagMap";
  import FlippableRaceCard from "@/components/FlippableRaceCard";
  import { apiFetcher } from "@/utils/api";

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

  interface UpcomingRace {
    round: number;
    race_name: string;
    start_time_utc: string;
    status: "in_progress" | "upcoming";
  }

  

  export default function CalendarPage() {
    const { data: schedule, error, isLoading } = useSWR<RaceSchedule>(
      '/race/schedule',
      apiFetcher
    );

    const { data: nextRaceData } = useSWR<UpcomingRace>(
      '/race/upcoming',
      apiFetcher
    );
    
    type RaceResults = Record<string, { top3: string[] }>;
    const { data: resultsMap } = useSWR<RaceResults>(
      '/race/results/all',
      apiFetcher
    );

    const [showUpcoming, setShowUpcoming] = useState(true);
    const now = new Date();
    //console.log("🕒 NOW:", now.toISOString());

    const sortedRaces = [...(schedule?.races ?? [])].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const highlightedRace = nextRaceData?.round ?? null;

    // Filter based on time
    const filteredRaces = sortedRaces.filter((race) => {
      const raceStart = new Date(race.date);
      const raceEnd = new Date(raceStart.getTime() + 3 * 60 * 60 * 1000);

      const show = showUpcoming ? now <= raceEnd : now > raceEnd;

      console.log(`🏁 ROUND ${race.round}`, {
        name: race.name,
        raceStart: raceStart.toISOString(),
        raceEnd: raceEnd.toISOString(),
        now: now.toISOString(),
        show
      });

      return show;
    });

    // ✅ Fallback to all races if filter returns nothing
    const visibleRaces = filteredRaces.length > 0 ? filteredRaces : sortedRaces;

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

          {/* Toggle */}
          <div className="relative mb-6 w-fit">
            <div className="flex space-x-4">
              <button
                ref={upcomingRef}
                onClick={() => setShowUpcoming(true)}
                className={`pb-2 transition-colors font-medium ${
                  showUpcoming ? 'text-white font-bold' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Upcoming
              </button>
              <button
                ref={pastRef}
                onClick={() => setShowUpcoming(false)}
                className={`pb-2 transition-colors font-medium ${
                  !showUpcoming ? 'text-white font-bold' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Past
              </button>
            </div>
            <div
              ref={underlineRef}
              className="absolute bottom-0 h-[2px] bg-white transition-all duration-300"
            />
          </div>

          {isLoading && <p>Loading races...</p>}
          {error && <p>Failed to load schedule.</p>}
          {visibleRaces.length === 0 && <p>No races to show.</p>}

          {resultsMap && (
            <details className="mb-4 bg-zinc-900 p-4 rounded text-sm">
              <summary className="cursor-pointer">Debug: /race/results/all</summary>
              <pre>{JSON.stringify(resultsMap, null, 2)}</pre>
            </details>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleRaces.map((race) => {
              const raceStart = new Date(race.date);
              const raceEnd = new Date(raceStart.getTime() + 3 * 60 * 60 * 1000);
              const nowUtc = new Date(new Date().toISOString()); // normalize to UTC
              
              const isInProgress = nowUtc >= raceStart && nowUtc <= raceEnd;
              const isPast = nowUtc > raceEnd;
              //const roundKey = String(race.round);

              const flagUrl = flagMap[race.country] ?? "/flag/wavy/default.png";
              const isHighlighted = race.round === highlightedRace;

              const topThree = isPast
                ? resultsMap?.[String(race.round)]?.top3 ?? ['TBD', 'TBD', 'TBD']
                : ['TBD', 'TBD', 'TBD'];


              const statusLabel = isPast
                ? 'Completed'
                : isInProgress
                ? 'In Progress'
                : 'Starts in';

              return (
                <div
                  key={race.round}
                  className={`${isHighlighted ? 'sm:col-span-2 lg:col-span-1 scale-[1.05]' : ''}`}
                >
                  <FlippableRaceCard
                    race={race}
                    flagUrl={flagUrl}
                    topThree={topThree}
                    statusLabel={statusLabel}
                  />
                </div>
              );
            })}
          </div>
        </main>
      </>
    );
  }
