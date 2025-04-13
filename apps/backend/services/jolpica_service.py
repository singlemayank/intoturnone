import requests
from datetime import datetime, timedelta, timezone

BASE_URL = "https://api.jolpi.ca"

def get_driver_standings(year: int, limit: int = None):
    url = f"{BASE_URL}/ergast/f1/{year}/driverStandings.json"
    res = requests.get(url)
    res.raise_for_status()
    data = res.json()
    standings = data['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings']
    
    if limit:
        return standings[:limit]
    return standings

def get_constructor_standings(year: int, limit: int = None):
    url = f"{BASE_URL}/ergast/f1/{year}/constructorStandings.json"
    res = requests.get(url)
    res.raise_for_status()
    data = res.json()
    standings = data['MRData']['StandingsTable']['StandingsLists'][0]['ConstructorStandings']
    
    if limit:
        return standings[:limit]
    return standings

def get_next_race():
    current_year = datetime.utcnow().year
    url = f"{BASE_URL}/ergast/f1/{current_year}.json"

    try:
        res = requests.get(url)
        res.raise_for_status()
        races = res.json().get("MRData", {}).get("RaceTable", {}).get("Races", [])

        now = datetime.utcnow().replace(tzinfo=timezone.utc)

        for race in races:
            # Use both date and time if available
            date_str = race.get("date")
            time_str = race.get("time", "00:00:00Z").replace("Z", "+00:00")
            race_start = datetime.fromisoformat(f"{date_str}T{time_str}")

            # 🟡 If race is currently ongoing (within 3 hours of start)
            if race_start <= now <= race_start + timedelta(hours=3):
                return {
                    "status": "in_progress",
                    "race_name": race["raceName"],
                    "country": race["Circuit"]["Location"]["country"],
                    "circuit": race["Circuit"]["circuitName"],
                    "start_time_utc": race_start.isoformat(),
                    "countdown": "Race in Progress"
                }

            # 🔵 If it's a future race
            if race_start > now:
                delta = race_start - now
                return {
                    "status": "upcoming",
                    "race_name": race["raceName"],
                    "country": race["Circuit"]["Location"]["country"],
                    "circuit": race["Circuit"]["circuitName"],
                    "start_time_utc": race_start.isoformat(),
                    "countdown": {
                        "days": delta.days,
                        "hours": delta.seconds // 3600,
                        "minutes": (delta.seconds % 3600) // 60,
                        "seconds": delta.seconds % 60
                    }
                }

        return {"status": "error", "message": "No upcoming races found"}
    except Exception as e:
        return {
            "status": "error",
            "message": "Failed to fetch data from Ergast",
            "details": str(e)
        }