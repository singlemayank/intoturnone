'use client'; // required for App Router

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [lastScroll, setLastScroll] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 50) {
        setHidden(true); // scrolling down
      } else {
        setHidden(false); // scrolling up
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 bg-black px-6 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 border-b border-gray-700">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/favicon.ico.png"
            alt="Turn1 Logo"
            width={28}
            height={28}
            className="rounded-sm"
          />
          <span className="text-xl font-orbitron font-semibold tracking-wide">
            IntoTurnOne
          </span>
        </Link>
        <nav className="space-x-4 text-sm md:text-base">
          <Link href="/news" className="hover:text-red-500">News</Link>
          <Link href="/calendar" className="hover:text-red-500">Calendar</Link>
          <Link href="/standings" className="hover:text-red-500">Standings</Link>
          {/* <Link href="/tech" className="hover:text-red-500">Tech</Link> */}
          <Link href="/about" className="hover:text-red-500">About</Link>
        </nav>
      </div>
    </header>
  );
}
