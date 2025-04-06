import { GetServerSideProps } from 'next';

interface Driver {
  name: string;
  constructor: string;
  points: number;
  position: number;
}
interface DriverStandingAPI {
  Driver: {
    givenName: string;
    familyName: string;
  };
  Constructors: {
    name: string;
  }[];
  points: string;
  position: string;
}
export default function StandingsPage({ drivers }: { drivers: Driver[] }) {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">Driver Standings (Top 5)</h1>
      <ul className="space-y-4">
        {drivers.map((driver) => (
          <li
            key={driver.position}
            className="flex justify-between border-b border-gray-700 pb-2"
          >
            <div>
              <p className="font-semibold text-lg">{driver.position}. {driver.name}</p>
              <p className="text-sm text-gray-400">{driver.constructor}</p>
            </div>
            <p className="text-red-500 font-bold text-lg">{driver.points} pts</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch('https://api.jolpica.com/ergast/f1/current/driverstandings.json');
    const json = await res.json();

    const standings = json.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    const drivers: Driver[] = standings.slice(0, 5).map((entry: DriverStandingAPI) => ({
      name: `${entry.Driver.givenName} ${entry.Driver.familyName}`,
      constructor: entry.Constructors[0].name,
      points: parseInt(entry.points),
      position: parseInt(entry.position),
    }));

    return { props: { drivers } };
  } catch (err) {
    console.error('Error fetching standings:', err);
    return { props: { drivers: [] } };
  }
};
