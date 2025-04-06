import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useTopConstructors = () => {
  const { data, error, isLoading } = useSWR("/api/standings/constructors", fetcher);

  return {
    topConstructors: data || [],
    isLoading,
    isError: error,
  };
};
