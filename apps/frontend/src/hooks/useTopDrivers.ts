import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useTopDrivers = () => {
  const { data, error, isLoading } = useSWR("/api/standings/drivers", fetcher);

  return {
    topDrivers: data || [],
    isLoading,
    isError: error,
  };
};
