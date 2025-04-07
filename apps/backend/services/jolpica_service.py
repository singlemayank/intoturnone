import requests
from datetime import datetime

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

        upcoming = next(
            (race for race in races if datetime.fromisoformat(race["date"]) > datetime.utcnow()),
            None
        )

        return upcoming if upcoming else {"message": "No upcoming races found."}
    except Exception as e:
        return {"error": str(e)}
