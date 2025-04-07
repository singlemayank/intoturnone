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

// ✅ Use base API URL without `/api` prefix
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

// ✅ Fetcher with error handling
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
};

// ✅ Drivers
export const useDriverStandings = () => {
  const { data, error, isLoading } = useSWR<DriverStandingRaw[]>(
    `${API_BASE}/standings/drivers/full`,
    fetcher
  );

  const mapped: DriverStanding[] =
    data?.map((item) => ({
      driverId: item.Driver.driverId,
      position: parseInt(item.position),
      points: parseInt(item.points),
      wins: parseInt(item.wins),
      full_name: `${item.Driver.givenName} ${item.Driver.familyName}`,
      team: item.Constructors[0]?.name || 'Unknown',
    })) || [];

  return { drivers: mapped, isLoading, isError: !!error };
};

// ✅ Constructors
export const useConstructorStandings = () => {
  const { data, error, isLoading } = useSWR<ConstructorStandingRaw[]>(
    `${API_BASE}/standings/constructors/full`,
    fetcher
  );

  const mapped: ConstructorStanding[] =
    data?.map((item) => ({
      constructorId: item.Constructor.constructorId,
      position: parseInt(item.position),
      points: parseInt(item.points),
      wins: parseInt(item.wins),
      name: item.Constructor.name,
    })) || [];

  return { constructors: mapped, isLoading, isError: !!error };
};

// ✅ Next Race
export const useNextRace = () => {
  const { data, error, isLoading } = useSWR<UpcomingRace>(
    `${API_BASE}/race/upcoming`,
    fetcher
  );

  return { nextRace: data, isLoading, isError: !!error };
};

// ✅ Race Results
export const useRaceResults = () => {
  const { data, error, isLoading } = useSWR<RaceResult>(
    `${API_BASE}/race/results`,
    fetcher
  );

  return { raceResults: data, isLoading, isError: !!error };
};
