import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import NextUpBanner from '@/components/NextUpBanner';

export default function Home() {
  return (
    <>
      <Head>
        <title>Into Turn One | F1 News, Strategy & Tech</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <header className="sticky top-0 z-50 w-full bg-black py-4 px-6 border-b border-gray-800 text-white flex justify-between items-center">
        <Image src="/favicon.png" alt="Turn1 Logo" width={48} height={48} className="rounded-full" />
        <h1 className="text-2xl font-bold font-orbitron">Into Turn One</h1>
        <nav className="space-x-4">
          <Link href="#featured" className="hover:text-red-500">Featured</Link>
          <Link href="#latest" className="hover:text-red-500">Latest</Link>
          <Link href="#tech" className="hover:text-red-500">Tech</Link>
          <Link href="/fanzone" className="hover:text-red-500">Fan Zone</Link>
        </nav>
      </header>
      <NextUpBanner /> {/* ✅ New banner appears here */}

      <main className="min-h-screen bg-black text-white font-sans">
        {/* Hero Section */}
        <section className="relative h-screen text-center flex items-center justify-center">
          <Image
            src="/20250404_2331_Cinematic F1 Wet Turn_simple_compose_01jr0zdsgxe3nrvxc8w7nvtgdx.png"
            alt="Hero Turn 1"
            fill
            priority
            className="object-cover z-0 opacity-80"
          />
          <div className="z-10 px-6">
            <h1 className="text-6xl md:text-7xl font-extrabold text-red-600 mb-4 font-orbitron">Into Turn One</h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-xl mb-8">
              F1 drama. Data insights. Fan obsession.
            </p>
            <Link href="#featured" legacyBehavior>
              <a className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-full text-lg transition">Explore the Grid</a>
            </Link>
          </div>
        </section>

        {/* Featured Insights */}
        <section id="featured" className="py-16 px-6 bg-black max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Featured Insights</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                img: '/20250404_0144_Thrilling Formula 1 Apex_simple_compose_01jqymmj3xfj5by8y0kc2wyp6d.png',
                title: 'What Makes Turn 1 So Chaotic?',
                desc: 'The psychology and strategy behind F1’s most famous corner.',
                color: 'text-red-400',
              },
              {
                img: '/20250404_2336_Chasing Speed at Sunset_simple_compose_01jr0zqf4zewpr21r5sxc5fpm1.png',
                title: 'DRS Explained',
                desc: 'How Drag Reduction System shapes overtakes and tire wear.',
                color: 'text-yellow-400',
              },
              {
                img: '/20250404_2336_Formula 1 Corner Battle_simple_compose_01jr0zptykfb5v8w881e2zcfh3.png',
                title: 'Lap 1 Gainers',
                desc: 'Who’s been the best at slicing through the grid?',
                color: 'text-green-400',
              },
            ].map((item, i) => (
              <div key={i} className="bg-gray-900 rounded-xl overflow-hidden border border-white/10 hover:scale-105 transition">
                <Image src={item.img} alt={item.title} width={400} height={250} className="w-full object-cover" />
                <div className="p-4">
                  <h3 className={`text-xl font-semibold mb-2 ${item.color}`}>{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Posts */}
        <section id="latest" className="py-16 px-6 bg-black max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Latest Posts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => (
              <div key={num} className="bg-gray-900 p-6 rounded-xl border border-white/10 hover:scale-105 transition">
                <h3 className="text-lg font-semibold text-red-500 mb-2">Blog Title #{num}</h3>
                <p className="text-gray-400 text-sm">Short excerpt or summary of the post content goes here.</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech & Strategy */}
        <section id="tech" className="py-16 px-6 bg-gray-900 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Tech & Strategy</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                img: '/20250404_2343_F1 Garage Operations_simple_compose_01jr1045r4f3g8b7tm7ck8tpsa.png',
                title: 'Tyre Deg',
              },
              {
                img: '/20250404_2336_Formula 1 Corner Battle_simple_compose_01jr0zptykfb5v8w881e2zcfh3.png',
                title: 'Undercut vs Overcut',
              },
              {
                img: '/20250404_2336_Chasing Speed at Sunset_simple_compose_01jr0zqf4zewpr21r5sxc5fpm1.png',
                title: 'Setup Sheets',
              },
            ].map((item, i) => (
              <div key={i} className="bg-black rounded-xl overflow-hidden border border-white/10 hover:scale-105 transition">
                <Image src={item.img} alt={item.title} width={400} height={250} className="w-full object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-green-400 mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">In-depth analysis coming soon.</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fan Zone Teaser */}
        <section className="py-20 px-6 bg-black text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Welcome to the Fan Zone</h2>
          <p className="text-gray-400 mb-6">Quizzes, memes, hot takes and more from the passionate side of the paddock.</p>
          <Link href="/fanzone" legacyBehavior>
            <a className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-full hover:bg-yellow-300 transition">
              Dive In
            </a>
          </Link>
        </section>
      </main>
    </>
  );
}
