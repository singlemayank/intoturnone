from fastapi import APIRouter
import json
import os
from utils.redis_client import r

router = APIRouter()

@router.get("/race/podiums/all", tags=["Race Info"])
async def get_all_race_podiums():
    key = "race:podiums:all"

    # ✅ 1st: Try file
    path = "data/raceResults.json"
    if os.path.exists(path):
        try:
            with open(path, "r") as f:
                full_data = json.load(f)

            # Only extract podiums
            podiums = {
                round_: {"top3": race["top3"]}
                for round_, race in full_data.items()
                if isinstance(race, dict) and "top3" in race
            }

            # ✅ Cache to Redis
            r.setex(key, 86400, json.dumps(podiums))

            return podiums
        except Exception as e:
            print(f"⚠️ Error reading raceResults.json: {e}")

    # ❗ 2nd: Fallback to Redis (if file missing or error)
    try:
        cached = r.get(key)
        if cached:
            return json.loads(cached)
    except Exception as e:
        print(f"⚠️ Redis read failed: {e}")

    return {"message": "No podium data available yet."}
