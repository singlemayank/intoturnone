const upcomingRaces = [
  { name: 'Japanese GP', date: 'Apr 6', location: 'Suzuka' },
  { name: 'Miami GP', date: 'May 4', location: 'Miami' },
  { name: 'Imola GP', date: 'May 18', location: 'Imola' },
];

export default function RaceCalendarWidget() {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 border-b border-red-600 pb-2">Upcoming Races</h2>
      <ul className="space-y-3">
        {upcomingRaces.map((race, index) => (
          <li key={index} className="flex justify-between items-center text-white border-b border-gray-700 pb-2">
            <div>
              <p className="font-semibold text-lg">{race.name}</p>
              <p className="text-sm text-gray-400">{race.location}</p>
            </div>
            <p className="text-red-500 font-bold">{race.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
