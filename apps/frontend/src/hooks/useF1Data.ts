import useSWR from 'swr';
import {
  ConstructorStanding,
  DriverStanding,
  RaceResult,
  UpcomingRace,
} from '@/types/f1';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useDriverStandings = () => {
  const { data, error, isLoading } = useSWR<DriverStanding[]>('/api/standings/drivers', fetcher);
  return { drivers: data || [], isLoading, isError: !!error };
};

export const useConstructorStandings = () => {
  const { data, error, isLoading } = useSWR<ConstructorStanding[]>('/api/standings/constructors', fetcher);
  return { constructors: data || [], isLoading, isError: !!error };
};

export const useNextRace = () => {
  const { data, error, isLoading } = useSWR<UpcomingRace>('/api/race/upcoming', fetcher);
  return { nextRace: data, isLoading, isError: !!error };
};

export const useRaceResults = () => {
  const { data, error, isLoading } = useSWR<RaceResult>('/api/race/results', fetcher);
  return { raceResults: data, isLoading, isError: !!error };
};
