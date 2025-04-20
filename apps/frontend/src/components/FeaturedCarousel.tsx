
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

type FeaturedPost = {
  title: string;
  image: string;
  slug: string;
  date: string;
  keywords?: string[];
};

export default function FeaturedCarousel({ posts }: { posts: FeaturedPost[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1.1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-6"
      >
        {posts.map((post, idx) => (
          <SwiperSlide key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block rounded-xl overflow-hidden border border-gray-800 bg-zinc-900 hover:shadow-xl transition duration-300 cursor-pointer"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority={idx === 0}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white group-hover:text-red-500 transition line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1 mb-2">
                  {format(new Date(post.date), 'dd MMM yyyy')}
                </p>
                {post.keywords && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.keywords.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-zinc-800 text-gray-300 px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
