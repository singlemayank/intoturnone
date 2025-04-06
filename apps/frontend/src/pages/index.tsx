import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import NextUpBanner from '@/components/NextUpBanner';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import TrendingSection from '@/components/TrendingSection';
import StandingsPreview from '@/components/StandingsPreview';
import NewsletterSignup from '@/components/NewsletterSignup';
import RaceResults from '@/components/RaceResults';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Into Turn One | F1 News, Strategy & Tech</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content="F1 drama. Data insights. Fan obsession." />
        <meta property="og:title" content="Into Turn One" />
        <meta property="og:image" content="/og-banner.jpg" />
      </Head>

      <Header />
      <NextUpBanner />

      <main className="min-h-screen bg-black text-white font-sans">
        {/* Hero Section */}
        <section className="relative h-screen text-center flex items-center justify-center">
          <Image
            src="/20250404_2331_Cinematic F1 Wet Turn_simple_compose_01jr0zdsgxe3nrvxc8w7nvtgdx.png"
            alt="Hero Turn 1"
            fill
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

        {/* Featured Carousel */}
        <section id="featured" className="py-16 px-6 bg-black max-w-7xl mx-auto">
          <FeaturedCarousel />
        </section>

        {/* Trending Now Section */}
        <section id="latest" className="py-16 px-6 bg-gray-950 max-w-7xl mx-auto">
          <TrendingSection />
        </section>

        {/* Standings */}
        <section className="py-16 px-6 flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto">
          <div className="flex-1">
            <StandingsPreview />
          </div>
        </section>

        {/* Race Results */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <RaceResults />
        </section>

        {/* Newsletter */}
        <section className="py-12 px-6 bg-gray-900">
          <NewsletterSignup />
        </section>


      </main>
    </>
  );
}
