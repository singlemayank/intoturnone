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
  
  export interface UpcomingRace {
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
  
  export interface RaceResult {
    race_name: string;
    date: string;
    winner: {
      full_name: string;
      team: string;
      time: string;
      position: number;
    };
    results: {
      full_name: string;
      team: string;
      time: string;
      position: number;
      driver_number: number;
      flag: string;
    }[];
    fastest_lap: {
      full_name: string;
      lap_time: string;
      team: string;
      flag: string;
    };
  }
  