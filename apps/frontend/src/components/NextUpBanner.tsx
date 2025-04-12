'use client';

import { useNextRace } from '@/hooks/useF1Data';
import { useEffect, useState } from 'react';
import { flagMap } from '@/utils/flagMap';

type SessionInfo = {
  name: string;
  dateTime: string;
};

export default function NextUpBanner() {
  const { nextRace } = useNextRace();
  const [nextSession, setNextSession] = useState<SessionInfo | null>(null);
  const [countdown, setCountdown] = useState('Loading...');
  const [revealBanner, setRevealBanner] = useState(false);
  const [userTime, setUserTime] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setRevealBanner(true);
      window.removeEventListener('scroll', handleScroll);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!nextRace) return;

    const sessions: SessionInfo[] = [];

    if (nextRace?.FirstPractice?.date && nextRace.FirstPractice.time) {
      sessions.push({
        name: 'Practice 1',
        dateTime: `${nextRace.FirstPractice.date}T${nextRace.FirstPractice.time}`,
      });
    }
    if (nextRace?.SecondPractice?.date && nextRace.SecondPractice.time) {
      sessions.push({
        name: 'Practice 2',
        dateTime: `${nextRace.SecondPractice.date}T${nextRace.SecondPractice.time}`,
      });
    }
    if (nextRace?.Qualifying?.date && nextRace.Qualifying.time) {
      sessions.push({
        name: 'Qualifying',
        dateTime: `${nextRace.Qualifying.date}T${nextRace.Qualifying.time}`,
      });
    }
    if (nextRace?.date && nextRace.time) {
      sessions.push({
        name: 'Race',
        dateTime: `${nextRace.date}T${nextRace.time}`,
      });
    }

    const now = new Date();
    const next = sessions.find((s) => new Date(s.dateTime) > now);
    setNextSession(next || null);
  }, [nextRace]);

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

      const localTime = target.toLocaleString(undefined, {
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      });
      setUserTime(localTime);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [nextSession]);

  const getFlagUrl = (country: string) => {
    return flagMap[country] ?? `/flags/wavy/${country.toLowerCase().replace(/\s+/g, '-')}.jpg`;
  };

  const bgImage = nextRace?.Circuit?.Location?.country
    ? getFlagUrl(nextRace.Circuit.Location.country)
    : '';

  if (!nextRace || !nextSession) return null;

  return (
    <div
      className={`relative w-full text-white border-b border-red-600 overflow-hidden transition-all duration-700 ease-out ${
        revealBanner ? 'opacity-100 max-h-[500px] py-4' : 'opacity-0 max-h-0 overflow-hidden'
      }`}
      style={{ height: revealBanner ? '220px' : '0px' }}
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})`,  }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 py-4 px-4 md:py-6 md:px-8 flex flex-col items-center text-center font-orbitron">
        <h2 className="text-base md:text-lg text-red-500 mb-1 uppercase tracking-wide font-bold">
          Next Up: {nextSession.name}
        </h2>

        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
          {nextRace.raceName}
        </h1>

        <div className="text-3xl md:text-4xl font-mono text-white px-5 py-2 rounded bg-black/90 border border-red-600 tracking-widest animate-pulse" style={{ fontVariantNumeric: 'tabular-nums' }}>
          {countdown}
        </div>

        <div className="text-xs text-gray-300 mt-1">Local Time: {userTime}</div>
      </div>
    </div>
  );
}
