#fastf1_service.py
import os
import fastf1
import pandas as pd
from fastf1 import get_event_schedule, get_session
from datetime import datetime
import math

# Ensure cache directory exists
os.makedirs('/home/ubuntu/.fastf1_cache', exist_ok=True)
fastf1.Cache.enable_cache('/home/ubuntu/.fastf1_cache')

NATIONALITY_FLAG_MAP = {
    "British": "GB", "German": "DE", "Dutch": "NL", "Spanish": "ES", "Finnish": "FI",
    "Mexican": "MX", "Australian": "AU", "Canadian": "CA", "French": "FR", "Japanese": "JP",
    "Monegasque": "MC", "Danish": "DK", "Chinese": "CN", "Thai": "TH", "Italian": "IT",
    "American": "US", "Brazilian": "BR"
}

def get_race_results():
    current_year = datetime.now().year

    try:
        schedule = get_event_schedule(current_year)
    except Exception as e:
        return {
            "error": "Failed to load event schedule",
            "details": str(e)
        }

    now = pd.Timestamp.utcnow().tz_localize(None)
    past_races = schedule[schedule['EventDate'] < now]

    if past_races.empty:
        return {"message": "No completed races yet."}

    last_race = past_races.iloc[-1]
    round_number = int(last_race["RoundNumber"])

    try:
        session = get_session(current_year, round_number, "R")
        session.load()
    except Exception as e:
        return {
            "error": "Failed to load race session",
            "details": str(e)
        }

    results = []
    laps = session.laps
    #fastest_lap = laps.pick_fastest()

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
    }
