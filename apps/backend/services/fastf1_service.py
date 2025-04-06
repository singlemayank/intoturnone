import os
import fastf1
import pandas as pd
from fastf1 import get_event_schedule, get_session
from datetime import datetime
import math

# Ensure cache directory exists
os.makedirs('/tmp/fastf1_cache', exist_ok=True)
fastf1.Cache.enable_cache('/tmp/fastf1_cache')

NATIONALITY_FLAG_MAP = {
    "British": "GB", "German": "DE", "Dutch": "NL", "Spanish": "ES", "Finnish": "FI",
    "Mexican": "MX", "Australian": "AU", "Canadian": "CA", "French": "FR", "Japanese": "JP",
    "Monegasque": "MC", "Danish": "DK", "Chinese": "CN", "Thai": "TH", "Italian": "IT",
    "American": "US", "Brazilian": "BR"
}

def get_race_results():
    current_year = datetime.now().year
    schedule = get_event_schedule(current_year)

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
        try:
            position = int(drv.Position) if not math.isnan(drv.Position) else None
        except Exception:
            position = None

        try:
            driver_info = session.drivers[session.drivers['Abbreviation'] == drv.Abbreviation].iloc[0]
            full_name = f"{driver_info['FirstName']} {driver_info['LastName']}"
            nationality = driver_info.get("Nationality", "Unknown")
        except Exception:
            full_name = drv.Abbreviation
            nationality = "Unknown"

        flag = NATIONALITY_FLAG_MAP.get(nationality, "XX")

        results.append({
            "position": position,
            "driver_number": drv.DriverNumber,
            "full_name": full_name,
            "abbreviation": drv.Abbreviation,
            "team": drv.TeamName,
            "time": str(drv.Time),
            "points": drv.Points,
            "nationality": nationality,
            "flag": flag
        })

    """ fastest_info = None
    if fastest_lap is not None:
        try:
            drv = fastest_lap["Driver"]
            driver_row = session.drivers[session.drivers['Abbreviation'] == drv].iloc[0]
            nationality = driver_row.get("Nationality", "Unknown")
            full_name = f"{driver_row['FirstName']} {driver_row['LastName']}"

            fastest_info = {
                "full_name": full_name,
                "abbreviation": drv,
                "team": fastest_lap["Team"],
                "lap_time": str(fastest_lap["LapTime"]),
                "lap_number": int(fastest_lap["LapNumber"]),
                "position": int(fastest_lap["Position"]) if not math.isnan(fastest_lap["Position"]) else None,
                "flag": NATIONALITY_FLAG_MAP.get(nationality, "XX"),
            }
        except Exception:
            fastest_info = None
 """
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
        #"fastest_lap": fastest_info
    }
