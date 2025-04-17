# race.py
from fastapi import APIRouter, Request, HTTPException
from datetime import datetime
import requests
import json
import os
from services.jolpica_service import get_next_race
from services.fastf1_service import get_latest_race_results
from utils.redis_client import r

router = APIRouter()

@router.get("/upcoming", tags=["Race Info"])
def upcoming_race():
    key = "race:upcoming"
    cached = r.get(key)
    if cached:
        return json.loads(cached)

    data = get_next_race()
    r.setex(key, 300, json.dumps(data))  # cache for 5 minutes
    return data

@router.get("/results", tags=["Race Info"])
def race_results():
    key = "race:latest"
    cached = r.get(key)
    if cached:
        return json.loads(cached)

    data = get_latest_race_results()
    if not data or "results" not in data:
        return data

    round_number = data.get("round")
    top3 = [driver["full_name"] for driver in data["results"] if driver.get("position") in [1, 2, 3]]
    if len(top3) == 3 and round_number:
        path = "data/raceResults.json"
        os.makedirs(os.path.dirname(path), exist_ok=True)
        try:
            with open(path, "r") as f:
                results_data = json.load(f)
        except Exception:
            results_data = {}
        results_data[str(round_number)] = {"top3": top3}
        with open(path, "w") as f:
            json.dump(results_data, f, indent=2)
        # Invalidate related cache keys
        r.delete("race:results:all")
        r.delete("race:upcoming")
    r.setex(key, 300, json.dumps(data))
    return data

@router.get("/results/all", tags=["Race Info"])
def get_all_results(request: Request):
    key = "race:results:all"

    # ✅ Try Redis first
    try:
        cached = r.get(key)
        if cached:
            return json.loads(cached)
    except Exception as e:
        print(f"⚠️ Redis read failed: {e}")

    current_year = datetime.utcnow().year
    results_by_round = {}

    for round_number in range(1, 25):
        try:
            data = get_race_podium_by_round(current_year, round_number)
            if data and "top3" in data and len(data["top3"]) == 3:
                results_by_round[str(round_number)] = data
        except Exception as ex:
            print(f"⚠️ Skipping round {round_number}: {ex}")
            continue

    # ✅ Only set cache if we got valid data
    if results_by_round:
        try:
            r.setex(key, 86400, json.dumps(results_by_round))
        except Exception as e:
            print(f"⚠️ Redis write failed: {e}")

        try:
            with open("data/raceResults.json", "w") as f:
                json.dump(results_by_round, f, indent=2)
        except Exception as e:
            print(f"⚠️ File write failed: {e}")

        return results_by_round

    print("⚠️ No valid results found. Returning fallback.")
    return {
        "results": [],
        "race_name": "Unavailable",
        "location": {"circuit": "?", "country": "?"}
    }


@router.get("/schedule", tags=["Race Info"])
def get_race_schedule():
    key = "race:schedule"
    cached = r.get(key)
    if cached:
        return json.loads(cached)

    year = datetime.now().year
    url = f"https://api.jolpi.ca/ergast/f1/{year}.json"
    try:
        res = requests.get(url)
        res.raise_for_status()
        races_raw = res.json().get("MRData", {}).get("RaceTable", {}).get("Races", [])
        races = []
        for race in races_raw:
            race_date = race.get("date")
            race_time = race.get("time", "00:00:00Z").replace("Z", "+00:00")
            race_datetime = f"{race_date}T{race_time}"
            races.append({
                "round": int(race["round"]),
                "name": race["raceName"],
                "country": race["Circuit"]["Location"]["country"],
                "location": race["Circuit"]["Location"]["locality"],
                "date": race_datetime
            })
        if races:
            data = {"season": year, "races": races}
            r.setex(key, 86400, json.dumps(data))  # cache for 1 day
            return data
        else:
            return {"error": "No races found"}
    except Exception as e:
        return {"error": str(e)}
