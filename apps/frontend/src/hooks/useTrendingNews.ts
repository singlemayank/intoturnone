import useSWR from 'swr';
import type { NewsItem } from '@/types/news';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface NewsApiResponse {
  status: string;
  items: NewsItem[];
}

export const useTrendingNews = () => {
  return useSWR<NewsApiResponse>('https://api.intoturnone.com/news', fetcher);
};
