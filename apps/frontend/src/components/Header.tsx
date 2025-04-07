'use client'; // only needed if using App Router

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 bg-black ${
        scrolled ? 'py-2 shadow-md border-b border-gray-700' : 'py-4'
      } px-6`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/favicon.ico" // or "/favicon.ico.png" if not renamed
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
          <Link href="/tech" className="hover:text-red-500">Tech</Link>
          <Link href="/about" className="hover:text-red-500">About</Link>
        </nav>
      </div>
    </header>
  );
}
