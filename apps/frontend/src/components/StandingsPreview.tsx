'use client';

import {
  useDriverStandings,
  useConstructorStandings,
} from '@/hooks/useF1Data';

export default function StandingsPreview() {
  const { drivers, isLoading: loadingDrivers } = useDriverStandings();
  const { constructors, isLoading: loadingConstructors } = useConstructorStandings();

  const getTeamLogo = (teamName: string) => {
    return `/teams/${teamName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z\-]/g, '')}.svg`;
  };

  const getTeamLogoStyle = (teamName: string) => {
    const darkLogoTeams = [
      'McLaren',
      'Alpine',
      'Stake',
      'Kick Sauber',
      'Haas F1 Team',
      'Aston Martin',
    ];
    return darkLogoTeams.includes(teamName) ? { filter: 'invert(1)' } : {};
  };

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
                key={`driver-${driver.driverId}`}
                className="flex justify-between items-center text-white text-sm border-b border-gray-700 pb-1"
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
                key={`constructor-${constructor.constructorId}`}
                className="flex justify-between items-center text-white text-sm border-b border-gray-700 pb-1"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">{constructor.position}.</span>
                  <img
                    src={getTeamLogo(constructor.name)}
                    alt={constructor.name}
                    className="w-6 h-4 min-w-[24px] min-h-[16px] object-contain transition"
                    style={getTeamLogoStyle(constructor.name)}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.dataset.fallback) {
                        target.src = '/teams/default.svg';
                        target.dataset.fallback = 'true';
                      }
                    }}
                  />
                  <span>{constructor.name}</span>
                </div>
                <span>{constructor.points} pts</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}