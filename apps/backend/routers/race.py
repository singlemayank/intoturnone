from fastapi import APIRouter
from fastf1 import get_event_schedule
from datetime import datetime
from services.jolpica_service import get_next_race
from services.fastf1_service import get_race_results


router = APIRouter()

@router.get("/upcoming")
def upcoming_race():
    return get_next_race()

@router.get("/results")
async def race_results():
    return get_race_results()

@router.get("/schedule")
def get_race_schedule():
    year = datetime.now().year
    schedule = get_event_schedule(year)

    races = []
    for i, row in schedule.iterrows():
        races.append({
            "round": int(row["RoundNumber"]),
            "name": row["EventName"],
            "country": row["Country"],
            "location": row["Location"],
            "date": str(row["EventDate"]),
        })

    return {"season": year, "races": races}
