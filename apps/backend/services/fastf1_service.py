import os
import fastf1
import pandas as pd
from fastf1 import get_event_schedule, get_session
from functools import lru_cache
from datetime import datetime
from pathlib import Path
import math
import json
from services.jolpica_service import get_driver_standings
from utils.redis_client import r

# Setup FastF1 cache
cache_path = Path.home() / ".fastf1_cache"
os.makedirs(cache_path, exist_ok=True)
fastf1.Cache.enable_cache(str(cache_path))

# Nationality → Country Code Map
NATIONALITY_FLAG_MAP = {
    "British": "GB", "German": "DE", "Dutch": "NL", "Spanish": "ES", "Finnish": "FI",
    "Mexican": "MX", "Australian": "AU", "Canadian": "CA", "French": "FR", "Japanese": "JP",
    "Monegasque": "MC", "Danish": "DK", "Chinese": "CN", "Thai": "TH", "Italian": "IT",
    "American": "US", "Brazilian": "BR", "Belgian": "BE", "Austrian": "AT", "Swedish": "SE"
}

# Get a mapping like: "VER" => { full_name, nationality }
def get_driver_info_map(year: int):
    redis_key = f"driver_info:{year}"
    cached = r.get(redis_key)
    if cached:
        return json.loads(cached)

    info_map = {}
    try:
        standings = get_driver_standings(year)
        for entry in standings:
            driver = entry["Driver"]
            code = driver.get("code", "").upper()
            full_name = f"{driver.get('givenName', '').strip()} {driver.get('familyName', '').strip()}"
            nationality = driver.get("nationality", "Unknown").strip()
            info_map[code] = {
                "full_name": full_name,
                "nationality": nationality
            }
        r.setex(redis_key, 86400, json.dumps(info_map))  # cache for 1 day
    except Exception as e:
        print(f"⚠️ Failed to build driver info map from Jolpica: {e}")

    return info_map

def get_latest_race_results():
    current_year = datetime.now().year
    try:
        schedule = get_event_schedule(current_year)
    except Exception as e:
        return {"error": "Failed to load event schedule", "details": str(e)}

    now = pd.Timestamp.utcnow().tz_localize(None)
    past_races = schedule[schedule['EventDate'] < now]
    driver_info_map = get_driver_info_map(current_year)

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
                    code = drv.Abbreviation.upper()
                    info = driver_info_map.get(code, {})
                    full_name = info.get("full_name", code)
                    nationality = info.get("nationality", "Unknown")
                    flag = NATIONALITY_FLAG_MAP.get(nationality, "XX")

                    try:
                        position = int(drv.Position) if not math.isnan(drv.Position) else None
                    except Exception:
                        position = None

                    results.append({
                        "position": position,
                        "driver_number": drv.DriverNumber,
                        "full_name": full_name,
                        "abbreviation": code,
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

        except Exception as e:
            print(f"⚠️ Skipping round {round_number}: {e}")
            continue

    return {"message": "No completed race results available yet."}

@lru_cache(maxsize=100)
def get_race_results_by_round(year: int, round_number: int):
    driver_info_map = get_driver_info_map(year)
    try:
        session = get_session(year, round_number, "R")
        session.load()

        if session.results is None or session.results.empty:
            return None

        df = session.results.sort_values("Position")
        results = []
        for drv in df.itertuples():
            code = drv.Abbreviation.upper()
            info = driver_info_map.get(code, {})
            full_name = info.get("full_name", code)
            nationality = info.get("nationality", "Unknown")
            flag = NATIONALITY_FLAG_MAP.get(nationality, "XX")

            results.append({
                "position": int(drv.Position),
                "driver_number": drv.DriverNumber,
                "full_name": full_name,
                "abbreviation": code,
                "team": drv.TeamName,
                "time": str(drv.Time),
                "points": drv.Points,
                "nationality": nationality,
                "flag": flag
            })

        return {
            "round": round_number,
            "top3": [r["full_name"] for r in results if r["position"] in [1, 2, 3]],
            "results": results
        }
    except Exception as e:
        print(f"⚠️ Error loading round {round_number}: {e}")
        return None
