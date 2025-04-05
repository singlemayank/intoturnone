import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-black text-white py-4 px-6 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-wide font-orbitron">
          TURN1
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
