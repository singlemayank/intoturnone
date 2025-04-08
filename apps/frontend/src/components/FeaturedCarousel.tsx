import Image from 'next/image';
import Link from 'next/link';

const featuredPosts = [
  {
    title: 'Once in a Generation: Verstappen’s Suzuka Symphony',
    image: '/20250404_0144_Thrilling Formula 1 Apex_simple_compose_01jqymmj3xfj5by8y0kc2wyp6d.png',
    link: '/blog/verstappen-suzuka-dominance',
  },
  {
    title: 'Garage Confidential: What Ferrari Was Hiding in Suzuka',
    image: '/20250404_2343_F1 Garage Operations_simple_compose_01jr1045r4f3g8b7tm7ck8tpsa.png',
    link: '/blog/ferrari-suzuka-strategy',
  },
  {
    title: 'How Rain Changed Everything in Japan',
    image: '/20250404_2331_Cinematic F1 Wet Turn_simple_compose_01jr0zdsgxe3nrvxc8w7nvtgdx.png',
    link: '/blog/japan-wet-race-analysis',
  },
];

export default function FeaturedCarousel() {
  return (
    <div className="grid gap-10 md:grid-cols-3">
      {featuredPosts.map((post, index) => (
        <Link key={index} href={post.link} className="group block rounded-xl overflow-hidden border border-gray-800 hover:shadow-xl transition">
          <div className="relative h-60 w-full">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold text-white group-hover:text-red-500 transition">
              {post.title}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
