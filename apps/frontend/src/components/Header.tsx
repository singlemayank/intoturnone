'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [lastScroll, setLastScroll] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 50) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScroll(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-transform duration-300 bg-[var(--background)] text-[var(--foreground)] shadow-md ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3 md:py-4 border-b border-[var(--text-muted)]">
        {/* Logo + Text */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Theme-aware logo using standard sizing */}
          <div className="w-[40px] h-auto transform scale-100 group-hover:scale-105 transition-transform duration-300 ease-out">
            {/* Light Theme */}
            <Image
              src="/logo-light.png"
              alt="IntoTurnOne Light"
              width={80}
              height={24}
              className="block dark:hidden object-contain"
              priority
            />

            {/* Dark Theme */}
            <Image
              src="/logo-dark.png"
              alt="IntoTurnOne Dark"
              width={80}
              height={24}
              className="hidden dark:block object-contain"
              priority
            />
          </div>


          {/* Logo Text */}
          <span className="text-base md:text-lg font-orbitron font-semibold tracking-wide text-[var(--heading)]">
            IntoTurnOne
          </span>

        </Link>


        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm md:text-base">
          <Link href="/news" className="hover:text-[var(--accent)]">News</Link>
          <Link href="/calendar" className="hover:text-[var(--accent)]">Calendar</Link>
          <Link href="/standings" className="hover:text-[var(--accent)]">Standings</Link>
          <Link href="/about" className="hover:text-[var(--accent)]">About</Link>
        </nav>

        {/* Mobile Hamburger Icon */}
        <button
          className="md:hidden text-[var(--foreground)]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-[var(--background)] border-b border-[var(--text-muted)]">
          <Link href="/news" className="hover:text-[var(--accent)]">News</Link>
          <Link href="/calendar" className="hover:text-[var(--accent)]">Calendar</Link>
          <Link href="/standings" className="hover:text-[var(--accent)]">Standings</Link>
          <Link href="/about" className="hover:text-[var(--accent)]">About</Link>
        </div>
      )}
    </header>
  );
}
