# race_results.py
from fastapi import APIRouter
from datetime import datetime
from services.fastf1_service import get_race_podium_by_round
from utils.redis_client import r
import json

router = APIRouter()

@router.get("/race/results/all", tags=["Race Info"])
async def get_all_race_podiums():
    key = "race:results:all"
    cached = r.get(key)
    if cached:
        return json.loads(cached)

    current_year = datetime.utcnow().year
    results_by_round = {}

    for round_number in range(1, 25):
        try:
            data = get_race_podium_by_round(current_year, round_number)
            if data and "top3" in data and len(data["top3"]) == 3:
                results_by_round[str(round_number)] = data
        except Exception as ex:
            print(f"Skipping round {round_number}: {ex}")
            continue

    r.setex(key, 300, json.dumps(results_by_round))  # cache for 5 minutes
    return results_by_round
