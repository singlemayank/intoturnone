import useSWR from 'swr';
import { RaceResult, UpcomingRace } from '@/types/f1';

// Raw API types
export interface DriverStandingRaw {
  position: string;
  points: string;
  wins: string;
  Driver: {
    driverId: string;
    givenName: string;
    familyName: string;
  };
  Constructors: {
    name: string;
  }[];
}

export interface ConstructorStandingRaw {
  position: string;
  points: string;
  wins: string;
  Constructor: {
    constructorId: string;
    name: string;
  };
}

// Mapped display types
export interface DriverStanding {
  driverId: string;
  position: number;
  points: number;
  wins: number;
  full_name: string;
  team: string;
}

export interface ConstructorStanding {
  constructorId: string;
  position: number;
  points: number;
  wins: number;
  name: string;
}

// Fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Drivers
export const useDriverStandings = () => {
  const { data, error, isLoading } = useSWR<DriverStandingRaw[]>('/api/standings/drivers', fetcher);

  const mapped: DriverStanding[] = data?.map((item) => ({
    driverId: item.Driver.driverId,
    position: parseInt(item.position),
    points: parseInt(item.points),
    wins: parseInt(item.wins),
    full_name: `${item.Driver.givenName} ${item.Driver.familyName}`,
    team: item.Constructors[0]?.name || 'Unknown',
  })) || [];

  return { drivers: mapped, isLoading, isError: !!error };
};

// Constructors
export const useConstructorStandings = () => {
  const { data, error, isLoading } = useSWR<ConstructorStandingRaw[]>('/api/standings/constructors', fetcher);

  const mapped: ConstructorStanding[] = data?.map((item) => ({
    constructorId: item.Constructor.constructorId,
    position: parseInt(item.position),
    points: parseInt(item.points),
    wins: parseInt(item.wins),
    name: item.Constructor.name,
  })) || [];

  return { constructors: mapped, isLoading, isError: !!error };
};

// Next Race
export const useNextRace = () => {
  const { data, error, isLoading } = useSWR<UpcomingRace>('/api/race/upcoming', fetcher);
  return { nextRace: data, isLoading, isError: !!error };
};

// Race Results
export const useRaceResults = () => {
  const { data, error, isLoading } = useSWR<RaceResult>('/api/race/results', fetcher);
  return { raceResults: data, isLoading, isError: !!error };
};
