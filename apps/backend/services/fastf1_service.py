import os
import fastf1
import pandas as pd
from fastf1 import get_event_schedule, get_session
from datetime import datetime
from fastf1.core import Laps

# Ensure cache directory exists
os.makedirs('/tmp/fastf1_cache', exist_ok=True)
fastf1.Cache.enable_cache('/tmp/fastf1_cache')

# Map nationalities to ISO 3166-1 alpha-2 country codes (for flags)
NATIONALITY_FLAG_MAP = {
    "British": "GB",
    "German": "DE",
    "Dutch": "NL",
    "Spanish": "ES",
    "Finnish": "FI",
    "Mexican": "MX",
    "Australian": "AU",
    "Canadian": "CA",
    "French": "FR",
    "Japanese": "JP",
    "Monegasque": "MC",
    "Danish": "DK",
    "Chinese": "CN",
    "Thai": "TH",
    "Italian": "IT",
    "American": "US",
    "Brazilian": "BR",
    # Add more mappings if needed
}

def get_race_results():
    current_year = datetime.now().year
    schedule = get_event_schedule(current_year)

    # Convert to naive datetime to avoid comparison issues
    now = pd.Timestamp.utcnow().tz_localize(None)
    past_races = schedule[schedule['EventDate'] < now]

    if past_races.empty:
        return {"message": "No completed races yet."}

    last_race = past_races.iloc[-1]
    round_number = int(last_race["RoundNumber"])
    session = get_session(current_year, round_number, "R")
    session.load()

    results = []
    laps = session.laps
    fastest_lap = laps.pick_fastest()

    for drv in session.results.itertuples():
        results.append({
            "position": int(drv.Position),
            "driver_number": drv.DriverNumber,
            "full_name": f"{drv.FirstName} {drv.LastName}",
            "abbreviation": drv.Abbreviation,
            "team": drv.TeamName,
            "time": str(drv.Time),
            "points": drv.Points,
            "nationality": drv.Nationality,
            "flag": NATIONALITY_FLAG_MAP.get(drv.Nationality, "XX")
        })

    fastest_info = None
    if fastest_lap is not None:
        drv = fastest_lap["Driver"]
        driver_row = session.get_driver_by_code(drv)
        fastest_info = {
            "full_name": f"{driver_row['FirstName']} {driver_row['LastName']}",
            "abbreviation": drv,
            "team": fastest_lap["Team"],
            "lap_time": str(fastest_lap["LapTime"]),
            "lap_number": int(fastest_lap["LapNumber"]),
            "position": int(fastest_lap["Position"]),
            "flag": NATIONALITY_FLAG_MAP.get(driver_row["Nationality"], "XX"),
        }

    return {
        "race_name": last_race["EventName"],
        "date": str(last_race["EventDate"]),
        "round": round_number,
        "location": {
            "country": last_race["Country"],
            "circuit": last_race["Location"]
        },
        "winner": results[0] if results else None,
        "results": results,
        "fastest_lap": fastest_info
    }
