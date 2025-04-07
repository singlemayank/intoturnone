import Head from 'next/head';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About | IntoTurnOne</title>
      </Head>
      <main className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-extrabold mb-6 text-white"> Welcome to IntoTurnOne</h1>

        {/* Hero Image */}
        <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/about/hero-garage.jpg"
            alt="Formula 1 garage operations"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>

        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
          <strong>IntoTurnOne</strong> is an independent Formula 1 hub created by a lifelong fan and an engineer who wanted more than just race results — a place where real-time data, strategy breakdowns, and F1 passion collide.
        </p>

        <p className="text-lg text-gray-400 mb-6 leading-relaxed">
          Born from the idea that every corner in F1 tells a story, this site is a <strong>fan-driven dashboard</strong> that celebrates the tension, telemetry, and tactics behind the world's fastest sport.
        </p>

        {/* Image - telemetry */}
        <div className="mb-8 rounded-xl overflow-hidden shadow">
          <Image
            src="/images/about/telemetry.jpg"
            alt="Telemetry data visualization"
            width={1200}
            height={500}
            className="w-full h-auto object-cover"
          />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-white"> What We Bring</h2>
        <ul className="list-disc list-inside text-gray-300 mb-8 space-y-2">
          <li>Real-time F1 race schedules and countdowns</li>
          <li>Live driver and constructor standings</li>
          <li>Race results, fastest laps, and performance breakdowns</li>
          <li>Coming soon: telemetry insights, tire strategy analysis, community polls</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white"> Built for F1 Nerds</h2>
        <p className="text-gray-400 mb-6">
          IntoTurnOne is built with:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1 mb-8">
          <li><code className="text-white">Next.js</code> for the frontend</li>
          <li><code className="text-white">python</code> for the backend </li>
        </ul>

        {/* Image - celebration */}
        <div className="mb-10 rounded-xl overflow-hidden shadow">
          <Image
            src="/images/about/podium-celebration.jpg"
            alt="F1 podium celebration"
            width={1200}
            height={500}
            className="w-full h-auto object-cover"
          />
        </div>

        <h2 className="text-xl font-bold mb-2 text-white"> Our Vision</h2>
        <p className="text-gray-400 mb-12">
          This is not just another stats site. It&apos;s a place to bring fans closer to the action, offer tools for true race analysis, and eventually become a home for diehard F1 geeks to share theories, breakdowns, and predictions.
        </p>

        <p className="text-sm text-gray-600 italic">
          IntoTurnOne is independently built by <strong>Mayank</strong>. This is just the start — see you at Turn One.
        </p>
      </main>
    </>
  );
}
