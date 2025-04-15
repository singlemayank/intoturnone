'use client';
import { useEffect, useState } from 'react';

export default function CountdownTimer({ date }: { date: string }) {
  const [countdown, setCountdown] = useState('');
  const raceStart = new Date(date);
  const raceEnd = new Date(raceStart.getTime() + 3 * 60 * 60 * 1000);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();

      if (now >= raceStart && now <= raceEnd) {
        setCountdown('🏁 Race in progress!');
        return;
      }

      if (now > raceEnd) {
        setCountdown('✔️ Race completed');
        return;
      }

      const diff = raceStart.getTime() - now.getTime();
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setCountdown(`⏳ Starts in: ${d}d ${h}h ${m}m ${s}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <p className="text-sm font-medium mt-2 text-yellow-300">{countdown}</p>
  );
}
