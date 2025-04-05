import fastf1
import requests
import pandas as pd
from datetime import datetime
import os

os.makedirs('/tmp/fastf1_cache', exist_ok=True)
fastf1.Cache.enable_cache('/tmp/fastf1_cache')

def get_top_5_drivers():
    current_year = datetime.now().year
    url = f"https://api.jolpi.ca/ergast/f1/{current_year}/driverStandings.json"
    res = requests.get(url)
    res.raise_for_status()
    data = res.json()

    standings = data["MRData"]["StandingsTable"]["StandingsLists"][0]["DriverStandings"]
    top5 = [{
        "position": driver["position"],
        "driver": f"{driver['Driver']['givenName']} {driver['Driver']['familyName']}",
        "points": driver["points"],
        "wins": driver["wins"],
        "constructor": driver["Constructors"][0]["name"]
    } for driver in standings[:5]]

    return top5


def get_top_5_constructors():
    current_year = datetime.now().year
    url = f"https://api.jolpi.ca/ergast/f1/{current_year}/constructorStandings.json"
    res = requests.get(url)
    res.raise_for_status()
    data = res.json()

    standings = data["MRData"]["StandingsTable"]["StandingsLists"][0]["ConstructorStandings"]
    top5 = [{
        "position": constructor["position"],
        "name": constructor["Constructor"]["name"],
        "points": constructor["points"],
        "wins": constructor["wins"]
    } for constructor in standings[:5]]

    return top5
from fastf1 import get_event_schedule, get_session
from datetime import datetime

def get_race_results():
    current_year = datetime.now().year
    schedule = get_event_schedule(current_year)

    # FIX: Convert timezone-aware UTC now to naive for comparison
    now = pd.Timestamp.utcnow().tz_localize(None)
    past_races = schedule[schedule['EventDate'] < now]

    if past_races.empty:
        return {"message": "No completed races yet."}

    last_race = past_races.iloc[-1]
    session = get_session(current_year, int(last_race["RoundNumber"]), "R")
    session.load()

    results = []
    for drv in session.results.itertuples():
        results.append({
            "position": int(drv.Position),
            "driver_number": drv.DriverNumber,
            "full_name": f"{drv.FirstName} {drv.LastName}",
            "team": drv.TeamName,
            "time": str(drv.Time),
        })

    winner = results[0] if results else {}

    return {
        "race_name": last_race["EventName"],
        "date": str(last_race["EventDate"]),
        "winner": winner,
        "results": results
    }
