'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type SessionInfo = {
  name: string;
  dateTime: string;
};

export default function NextUpBanner() {
  const [nextSession, setNextSession] = useState<SessionInfo | null>(null);
  const [countdown, setCountdown] = useState('Loading...');
  const [raceInfo, setRaceInfo] = useState<{
    raceName: string;
    circuit: string;
    country: string;
  } | null>(null);
  const [revealBanner, setRevealBanner] = useState(false);

  // Detect first scroll
  useEffect(() => {
    const handleScroll = () => {
      setRevealBanner(true);
      window.removeEventListener('scroll', handleScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchRace = async () => {
      try {
        const res = await fetch('https://api.jolpi.ca/ergast/f1/current/next.json');
        const data = await res.json();
        const race = data.MRData.RaceTable.Races[0];

        const sessions: SessionInfo[] = [];

        if (race?.FirstPractice?.date) {
          sessions.push({
            name: 'Practice',
            dateTime: `${race.FirstPractice.date}T${race.FirstPractice.time}`,
          });
        }

        if (race?.SecondPractice?.date) {
          sessions.push({
            name: 'Practice 2',
            dateTime: `${race.SecondPractice.date}T${race.SecondPractice.time}`,
          });
        }

        if (race?.Qualifying?.date) {
          sessions.push({
            name: 'Qualifying',
            dateTime: `${race.Qualifying.date}T${race.Qualifying.time}`,
          });
        }

        if (race?.date && race?.time) {
          sessions.push({
            name: 'Race',
            dateTime: `${race.date}T${race.time}`,
          });
        }

        const now = new Date();
        const next = sessions.find((s) => new Date(s.dateTime) > now);

        setNextSession(next || null);
        setRaceInfo({
          raceName: race.raceName,
          circuit: race.Circuit.circuitName,
          country: race.Circuit.Location.country.toLowerCase(),
        });
      } catch (err) {
        console.error('Failed to fetch race banner:', err);
      }
    };

    fetchRace();
  }, []);

  useEffect(() => {
    if (!nextSession) return;

    const updateCountdown = () => {
      const now = new Date();
      const sessionTime = new Date(nextSession.dateTime);
      const diff = sessionTime.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown('IN PROGRESS');
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setCountdown(
        `${h.toString().padStart(2, '0')}:${m
          .toString()
          .padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [nextSession]);

  const bgImage = raceInfo?.country
    ? `/backgrounds/${raceInfo.country.replace(/\s/g, '').toLowerCase()}.jpg`
    : '';

  if (!raceInfo || !nextSession) return null;

  return (
    <div
        className={`w-full text-white border-b border-red-600 transition-all duration-700 ease-out ${
        revealBanner ? 'opacity-100 max-h-[500px] py-4' : 'opacity-0 max-h-0 overflow-hidden'
         }`}
     >
  

      {/* Background Layer */}
      <div className="absolute inset-0">
        {bgImage && (
          <Image
            src={bgImage}
            alt="Track or Flag"
            fill
            priority
            className="object-cover opacity-20 blur-sm"
          />
        )}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Banner Content */}
      <div className="relative z-10 py-4 px-4 md:py-6 md:px-8 flex flex-col items-center text-center font-orbitron">
        <h2 className="text-sm md:text-base text-red-500 mb-1 uppercase tracking-wide">
          Next Up: {nextSession.name}
        </h2>
        <h1 className="text-xl md:text-2xl font-bold mb-2 tracking-tight">
          {raceInfo.raceName} · {raceInfo.circuit}
        </h1>
        <div
          className="text-3xl md:text-4xl font-mono text-white px-5 py-2 rounded bg-black/90 border border-red-600 tracking-widest"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {countdown}
        </div>
      </div>
    </div>
  );
}
