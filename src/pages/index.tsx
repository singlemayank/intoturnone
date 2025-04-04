import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Into Turn One | F1 News, Strategy & Tech</title>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap" rel="stylesheet" />
      </Head>

      <main className="min-h-screen bg-black text-white font-sans">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center h-screen text-center px-6 bg-gradient-to-b from-black to-gray-900">
          <h1 className="text-6xl md:text-7xl font-extrabold text-red-600 mb-4 font-orbitron">Into Turn One</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-xl mb-8">
            F1 drama. Data insights. Fan obsession.
          </p>
          <Link href="#featured">
            <a className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-full text-lg transition">Explore the Grid</a>
          </Link>
        </section>

        {/* Featured Insights */}
        <section id="featured" className="py-16 px-6 bg-black max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Featured Insights</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'What Makes Turn 1 So Chaotic?', desc: 'The psychology and strategy behind F1’s most famous corner.', color: 'text-red-400' },
              { title: 'DRS Explained', desc: 'How Drag Reduction System shapes overtakes and tire wear.', color: 'text-yellow-400' },
              { title: 'Lap 1 Gainers', desc: 'Who’s been the best at slicing through the grid?', color: 'text-green-400' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-900 p-6 rounded-xl border border-white/10 hover:scale-105 transition">
                <h3 className={`text-xl font-semibold mb-2 ${item.color}`}>{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Next Race */}
        <section className="py-16 px-6 bg-gray-900 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Next Race: TBD Grand Prix</h2>
          <p className="text-gray-400 mb-6">Countdown and location info coming soon.</p>
          <div className="text-5xl font-bold text-red-500">00:00:00</div>
        </section>

        {/* Latest Posts */}
        <section className="py-16 px-6 bg-black max-w-7xl mx-auto">
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
        <section className="py-16 px-6 bg-gray-900 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Tech & Strategy</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {["Tyre Deg", "Undercut vs Overcut", "Setup Sheets"].map((title, i) => (
              <div key={i} className="bg-black p-6 rounded-xl border border-white/10 hover:scale-105 transition">
                <h3 className="text-lg font-semibold text-green-400 mb-2">{title}</h3>
                <p className="text-gray-400 text-sm">In-depth analysis coming soon.</p>
              </div>
            ))}
          </div>
        </section>

        {/* Fan Zone Teaser */}
        <section className="py-20 px-6 bg-black text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Welcome to the Fan Zone</h2>
          <p className="text-gray-400 mb-6">Quizzes, memes, hot takes and more from the passionate side of the paddock.</p>
          <Link href="/fanzone">
            <a className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-full hover:bg-yellow-300 transition">
              Dive In
            </a>
          </Link>
        </section>
      </main>
    </>
  );
}
