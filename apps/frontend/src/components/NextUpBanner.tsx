'use client';

import { useNextRace } from '@/hooks/useF1Data';
import { useEffect, useState } from 'react';
import { flagMap } from '@/utils/flagMap';

export default function NextUpBanner() {
  const { nextRace } = useNextRace();
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
    if (!nextRace?.start_time_utc) return;

    const updateCountdown = () => {
      const now = new Date();
      const target = new Date(nextRace.start_time_utc);
      const diff = target.getTime() - now.getTime();
    
      if (diff <= 0) {
        setCountdown('IN PROGRESS');
        return;
      }
    
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
    
      setCountdown(
        `${d}D : ${h}h : ${m}m : ${s}s`
      );
    
      const localTime = target.toLocaleString(undefined, {
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
    
      setUserTime(localTime);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [nextRace]);

  const getFlagUrl = (country: string) => {
    return flagMap[country] ?? `/flags/wavy/${country.toLowerCase().replace(/\s+/g, '-')}.jpg`;
  };

  const bgImage = nextRace?.country ? getFlagUrl(nextRace.country) : '';

  if (!nextRace) return null;

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
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 py-4 px-4 md:py-6 md:px-8 flex flex-col items-center text-center font-orbitron">
        <h2 className="text-lg md:text-2xl text-red-500 mb-1 uppercase tracking-wide font-bold">
          Next Up: 🏁 Race
        </h2>

        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
          {nextRace.raceName}
        </h1>

        <div
          className="text-3xl md:text-4xl font-mono text-white px-5 py-2 rounded bg-black/90 border border-red-600 tracking-widest animate-pulse"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {countdown}
        </div>

        <div className="text-base md:text-lg mt-2 text-white font-semibold">
          {userTime}
        </div>
      </div>
    </div>
  );
}
