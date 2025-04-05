const drivers = [
    { name: 'Max Verstappen', team: 'Red Bull', points: 231 },
    { name: 'Charles Leclerc', team: 'Ferrari', points: 194 },
    { name: 'Lando Norris', team: 'McLaren', points: 181 },
    { name: 'Lewis Hamilton', team: 'Mercedes', points: 165 },
    { name: 'Carlos Sainz', team: 'Ferrari', points: 160 },
  ];
  
  export default function StandingsPreview() {
    return (
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 border-b border-red-600 pb-2">Top 5 Drivers</h2>
        <ul className="space-y-3">
          {drivers.map((driver, idx) => (
            <li key={idx} className="flex justify-between items-center text-white border-b border-gray-700 pb-2">
              <div>
                <p className="font-semibold">{driver.name}</p>
                <p className="text-sm text-gray-400">{driver.team}</p>
              </div>
              <p className="text-red-500 font-bold">{driver.points} pts</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  