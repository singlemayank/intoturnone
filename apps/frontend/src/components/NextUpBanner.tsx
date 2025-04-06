'use client';

import { useNextRace } from '@/hooks/useF1Data';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type SessionInfo = {
  name: string;
  dateTime: string;
};

export default function NextUpBanner() {
  const { nextRace, isLoading } = useNextRace();
  const [nextSession, setNextSession] = useState<SessionInfo | null>(null);
  const [countdown, setCountdown] = useState('Loading...');
  const [revealBanner, setRevealBanner] = useState(false);

  // Reveal banner on first scroll
  useEffect(() => {
    const handleScroll = () => {
      setRevealBanner(true);
      window.removeEventListener('scroll', handleScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine next session
  useEffect(() => {
    if (!nextRace) return;

    const sessions: SessionInfo[] = [];

    const extract = (label: string, key: string) => {
      const session = nextRace[key];
      if (session?.date && session?.time) {
        sessions.push({
          name: label,
          dateTime: `${session.date}T${session.time}`,
        });
      }
    };

    extract('Practice 1', 'FirstPractice');
    extract('Practice 2', 'SecondPractice');
    extract('Qualifying', 'Qualifying');
    extract('Race', 'race');

    const now = new Date();
    const next = sessions.find((s) => new Date(s.dateTime) > now);
    setNextSession(next || null);
  }, [nextRace]);

  // Countdown logic
  useEffect(() => {
    if (!nextSession) return;

    const updateCountdown = () => {
      const now = new Date();
      const target = new Date(nextSession.dateTime);
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown('IN PROGRESS');
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setCountdown(
        `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [nextSession]);

  // Background image based on country
  const bgImage = nextRace?.Circuit?.Location?.country
    ? `/backgrounds/${nextRace.Circuit.Location.country.toLowerCase().replace(/\s/g, '')}.jpg`
    : '';

  if (!nextRace || !nextSession) return null;

  return (
    <div
      className={`w-full text-white border-b border-red-600 transition-all duration-700 ease-out ${
        revealBanner ? 'opacity-100 max-h-[500px] py-4' : 'opacity-0 max-h-0 overflow-hidden'
      }`}
    >
      {/* Background */}
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

      {/* Content */}
      <div className="relative z-10 py-4 px-4 md:py-6 md:px-8 flex flex-col items-center text-center font-orbitron">
        <h2 className="text-sm md:text-base text-red-500 mb-1 uppercase tracking-wide">
          Next Up: {nextSession.name}
        </h2>
        <h1 className="text-xl md:text-2xl font-bold mb-2 tracking-tight">
          {nextRace.raceName} · {nextRace.Circuit.circuitName}
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
