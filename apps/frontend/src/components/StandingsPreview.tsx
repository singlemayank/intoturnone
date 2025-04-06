'use client';

import {
  useDriverStandings,
  useConstructorStandings,
} from '@/hooks/useF1Data';

export default function StandingsPreview() {
  const { drivers, isLoading: loadingDrivers } = useDriverStandings();
  const { constructors, isLoading: loadingConstructors } = useConstructorStandings();

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Drivers */}
      <div className="bg-black/80 p-4 rounded-md border border-red-600">
        <h2 className="text-red-500 font-orbitron text-lg mb-2">Top 5 Drivers</h2>
        {loadingDrivers ? (
          <p className="text-white">Loading...</p>
        ) : (
          <ul className="space-y-2">
            {drivers?.slice(0, 5).map((driver) => (
              <li
                key={driver.driverId}
                className="flex justify-between text-white text-sm border-b border-gray-700 pb-1"
              >
                <span className="font-medium">
                  {driver.position}. {driver.full_name}
                </span>
                <span>{driver.points} pts</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Constructors */}
      <div className="bg-black/80 p-4 rounded-md border border-red-600">
        <h2 className="text-red-500 font-orbitron text-lg mb-2">Top 5 Constructors</h2>
        {loadingConstructors ? (
          <p className="text-white">Loading...</p>
        ) : (
          <ul className="space-y-2">
            {constructors?.slice(0, 5).map((constructor) => (
              <li
                key={constructor.constructorId}
                className="flex justify-between text-white text-sm border-b border-gray-700 pb-1"
              >
                <span className="font-medium">
                  {constructor.position}. {constructor.name}
                </span>
                <span>{constructor.points} pts</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
