#fastf1_service.py
import os
import fastf1
import pandas as pd
from fastf1 import get_event_schedule, get_session
from datetime import datetime
from pathlib import Path
import math

# Ensure cache directory exists
# Cross-platform default FastF1 cache path (in user's home directory)
cache_path = Path.home() / ".fastf1_cache"
os.makedirs(cache_path, exist_ok=True)
fastf1.Cache.enable_cache(str(cache_path))

NATIONALITY_FLAG_MAP = {
    "British": "GB", "German": "DE", "Dutch": "NL", "Spanish": "ES", "Finnish": "FI",
    "Mexican": "MX", "Australian": "AU", "Canadian": "CA", "French": "FR", "Japanese": "JP",
    "Monegasque": "MC", "Danish": "DK", "Chinese": "CN", "Thai": "TH", "Italian": "IT",
    "American": "US", "Brazilian": "BR"
}
def get_latest_race_results():
    current_year = datetime.now().year
    try:
        schedule = get_event_schedule(current_year)
    except Exception as e:
        return {"error": "Failed to load event schedule", "details": str(e)}

    now = pd.Timestamp.utcnow().tz_localize(None)
    past_races = schedule[schedule['EventDate'] < now]

    # Iterate backwards to find the most recent race with results
    for i in range(len(past_races) - 1, -1, -1):
        race = past_races.iloc[i]
        round_number = int(race["RoundNumber"])

        try:
            session = get_session(current_year, round_number, "R")
            session.load()

            if session.results is not None and not session.results.empty:
                results = []
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
                    "race_name": race["EventName"],
                    "date": str(race["EventDate"]),
                    "round": round_number,
                    "location": {
                        "country": race["Country"],
                        "circuit": race["Location"]
                    },
                    "winner": results[0] if results else None,
                    "results": results,
                }

        except Exception:
            continue

    return {"message": "No completed race results available yet."}
    