export interface DriverStanding {
  position: string;
  driver: string;
  points: string;
  wins: string;
  constructor: string;
}

export interface ConstructorStanding {
  position: string;
  name: string;
  points: string;
  wins: string;
}

export interface Session {
  date: string;
  time: string;
}

export interface UpcomingRace {
  FirstPractice?: Session;
  SecondPractice?: Session;
  Qualifying?: Session;
  raceName: string;
  date: string;
  time: string;
  Circuit: {
    circuitName: string;
    Location: {
      locality: string;
      country: string;
    };
  };
}

export interface Location {
  circuit: string;
  country: string;
}

export interface DriverResult {
  position: number;
  driver_number: number;
  full_name: string;
  team: string;
  time: string;
  flag: string;
}

export interface FastestLap {
  full_name: string;
  lap_time: string;
  team: string;
  flag: string;
}

export interface Winner {
  full_name: string;
  team: string;
  time: string;
  position: number;
}

export interface RaceResult {
  location: Location;
  race_name: string;
  date: string;
  winner: Winner;
  results: DriverResult[];
  fastest_lap: FastestLap;
}
