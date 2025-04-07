import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const useTrendingNews = () => {
  return useSWR('https://api.intoturnone.com/news', fetcher);
};
