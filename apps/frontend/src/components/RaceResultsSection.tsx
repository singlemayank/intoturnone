'use client';

import { useRaceResults } from '@/hooks/useF1Data';
import { motion } from 'framer-motion';

export default function RaceResultsSection() {
  const { raceResults, isLoading, isError } = useRaceResults();

  if (isLoading) return <p className="text-center text-gray-400">Loading race results...</p>;
  if (isError || !raceResults?.results) return <p className="text-center text-red-400">Could not load race results.</p>;

  const top5 = raceResults.results
    .filter((r) => r?.position !== undefined)
    .sort((a, b) => a.position - b.position)
    .slice(0, 5);

  const p1 = top5.find((d) => d.position === 1);
  const p2 = top5.find((d) => d.position === 2);
  const p3 = top5.find((d) => d.position === 3);
  const podiumDrivers = [p2, p1, p3].filter(Boolean);
  const otherDrivers = top5.filter((d) => d.position === 4 || d.position === 5);

  const teamColorMap: Record<string, string> = {
    'Red Bull Racing': '#1E41FF',
    'Mercedes': '#00D2BE',
    'Ferrari': '#DC0000',
    'McLaren': '#FF8700',
    'Aston Martin': '#006F62',
    'Alpine': '#2293D1',
    'Williams': '#005AFF',
    'Kick Sauber': '#003B2B',
    'Stake': '#003B2B',
    'Racing Bulls': '#1231AD',
    'Haas F1 Team': '#B6BABD',
  };

  const getTeamLogo = (teamName: string) => {
    return `/teams/${teamName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z\-]/g, '')}.svg`;
  };

  const getTeamLogoStyle = (teamName: string) => {
    const darkLogoTeams = [
      'McLaren',
      'Alpine',
      'Stake',
      'Kick Sauber',
      'Haas F1 Team',
      'Aston Martin',
    ];
    return darkLogoTeams.includes(teamName) ? { filter: 'invert(1)' } : {};
  };

  const cleanTime = (raw: string) => {
    if (!raw) return '+0.000s';
    return raw.replace('0 days ', '').replace('.000000', '');
  };

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto text-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-red-500 font-orbitron mb-1">
          {raceResults.race_name}
        </h2>
        <p className="text-gray-400 text-sm uppercase tracking-wide">
          {raceResults.location?.circuit} · {raceResults.location?.country}
        </p>
      </div>

      <div className="flex justify-center items-end gap-4 w-full mb-8 flex-wrap md:flex-nowrap">
        {podiumDrivers.map((driver, index) => {
          if (!driver) return null;

          const orderClass = {
            1: 'order-1 md:order-2',
            2: 'order-2 md:order-1',
            3: 'order-3 md:order-3',
          }[driver.position] || '';

          const isFirst = driver.position === 1;
          const teamColor = teamColorMap[driver.team] || '#333';
          const driverNumber = driver.driver_number ?? '??';

          return (
            <motion.div
              key={driver.position}
              className={`relative bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl text-center text-white p-5 w-48 ${
                isFirst ? 'h-72 z-20' : 'h-60 z-10'
              } ${orderClass}`}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              {isFirst && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-2xl">👑</div>
              )}

              <div
                className="mx-auto w-16 h-16 flex items-center justify-center rounded-full border-2 mb-2 text-white font-bold text-lg shadow-md"
                style={{
                  backgroundColor: '#1a1a1a',
                  borderColor: teamColor,
                  fontFamily: 'Orbitron, sans-serif',
                }}
              >
                {driverNumber}
              </div>

              <p className="font-bold text-sm">{driver.full_name}</p>
              <p className="text-sm text-gray-400">{driver.team}</p>
              <div className="mt-1 text-sm">{cleanTime(driver.time)}</div>

              <img
                src={getTeamLogo(driver.team)}
                alt={driver.team}
                className="w-12 h-8 mx-auto object-contain mt-3 transition"
                style={getTeamLogoStyle(driver.team)}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/teams/default.svg';
                }}
              />

              <div
                className="absolute bottom-0 left-0 w-full h-4 rounded-b-2xl"
                style={{ backgroundColor: teamColor }}
              />
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-3 max-w-md mx-auto text-sm">
        {otherDrivers.map((driver) => {
          const teamColor = teamColorMap[driver.team] || '#333';

          return (
            <div
              key={driver.position}
              className="flex justify-between items-center bg-gray-900 rounded-lg px-4 py-2 border-l-4"
              style={{ borderColor: teamColor }}
            >
              <div className="flex items-center gap-3">
                <span className="text-white font-bold w-6">P{driver.position}</span>
                <span className="text-white">{driver.full_name}</span>
                <img
                  src={getTeamLogo(driver.team)}
                  alt={driver.team}
                  className="w-10 h-6 object-contain"
                  style={getTeamLogoStyle(driver.team)}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/teams/default.svg';
                  }}
                />
              </div>
              <div className="text-gray-300 text-xs">{cleanTime(driver.time)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
