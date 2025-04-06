import useSWR from 'swr';
import { DriverStanding, ConstructorStanding, UpcomingRace, RaceResult } from '@/types/f1';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useDriverStandings = () => {
  const { data, error, isLoading } = useSWR<any>('/api/standings/drivers', fetcher);

  const drivers: DriverStanding[] =
    data?.map((d: any) => ({
      position: d.position,
      driver: `${d.Driver.givenName} ${d.Driver.familyName}`,
      points: d.points,
      wins: d.wins,
      constructor: d.Constructors?.[0]?.name || '',
    })) ?? [];

  return {
    drivers,
    isLoading,
    isError: error,
  };
};

export const useConstructorStandings = () => {
  const { data, error, isLoading } = useSWR<any>('/api/standings/constructors', fetcher);

  const constructors: ConstructorStanding[] =
    data?.map((c: any) => ({
      position: c.position,
      name: c.Constructor?.name || '',
      points: c.points,
      wins: c.wins,
    })) ?? [];

  return {
    constructors,
    isLoading,
    isError: error,
  };
};

export const useNextRace = () => {
  const { data, error, isLoading } = useSWR<UpcomingRace>('/api/race/upcoming', fetcher);
  return {
    nextRace: data,
    isLoading,
    isError: error,
  };
};

export const useRaceResults = () => {
  const { data, error, isLoading } = useSWR<RaceResult>('/api/race/results', fetcher);
  return {
    raceResults: data,
    isLoading,
    isError: error,
  };
};
