'use client';
import { useState } from 'react';
import CountdownTimer from './CountdownTimer';

interface FlippableRaceCardProps {
  race: {
    round: number;
    name: string;
    location: string;
    country: string;
    date: string;
  };
  flagUrl: string;
  topThree: string[];
  statusLabel: string;
}

export default function FlippableRaceCard({
  race,
  flagUrl,
  topThree,
  statusLabel,
}: FlippableRaceCardProps) {
  const [flipped, setFlipped] = useState(false);
  const raceStart = new Date(race.date);
  const raceEnd = new Date(raceStart.getTime() + 3 * 60 * 60 * 1000);
  const now = new Date();
  const isLive = now >= raceStart && now <= raceEnd;

  const day = raceStart.getDate();
  const month = raceStart.toLocaleString('default', { month: 'short' });

  return (
    <div
      className="relative w-full aspect-[5/3] sm:aspect-[4/3] lg:aspect-[5/3] cursor-pointer perspective"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style preserve-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden shadow-lg text-white bg-cover bg-center backface-hidden"
          style={{ backgroundImage: `url(${flagUrl})` }}
        >
          <div className="h-full w-full bg-black/50 p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Round {race.round}</span>
              <div className="text-right">
                <div className="text-2xl font-bold leading-none">{day}</div>
                <div className="text-xs uppercase">{month}</div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold">{race.name}</h2>
              <p className="text-sm">{race.location}, {race.country}</p>
              {isLive && <span className="text-red-400 font-bold text-sm mt-2">🔴 LIVE</span>}
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 rounded-xl overflow-hidden shadow-lg text-white bg-gray-900 p-4 rotate-y-180 backface-hidden">
          <h3 className="text-lg font-semibold mb-2">{race.name}</h3>
          <p className="text-sm mb-1">📍 {race.location}, {race.country}</p>

          <p className="text-sm mb-2 font-medium">
          {statusLabel !== 'Starts in' && (
            <p className="text-sm mb-2 font-medium">
                {statusLabel === 'In Progress'
                ? '🟢 In Progress'
                : '🏁 Completed'}
            </p>
            )}

          </p>

          <div className="mb-3">
            <ul className="text-sm space-y-1">
                <li className="text-yellow-300 font-medium">🥇 1st: {topThree[0]}</li>
                <li className="text-gray-300 font-medium">🥈 2nd: {topThree[1]}</li>
                <li className="text-orange-400 font-medium">🥉 3rd: {topThree[2]}</li>
            </ul>
          </div>
          <CountdownTimer date={race.date} />
          <p className="text-xs text-gray-400 mt-3">Click to flip back</p>
        </div>
      </div>
    </div>
  );
}
