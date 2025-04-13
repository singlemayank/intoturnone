from fastapi import APIRouter
from fastf1 import get_event_schedule
from datetime import datetime
from services.jolpica_service import get_next_race
from services.fastf1_service import get_latest_race_results

router = APIRouter()

@router.get("/upcoming", tags=["Race Info"])
def upcoming_race():
    """
    Returns the next race (or race in progress) using Jolpica-Ergast data.
    """
    return get_next_race()

@router.get("/results", tags=["Race Info"])
def race_results():
    """
    Returns the latest completed race results using FastF1.
    """
    return get_latest_race_results()

@router.get("/schedule", tags=["Race Info"])
def get_race_schedule():
    """
    Returns the full race schedule for the current F1 season.
    """
    year = datetime.now().year
    schedule = get_event_schedule(year)

    races = [
        {
            "round": int(row["RoundNumber"]),
            "name": row["EventName"],
            "country": row["Country"],
            "location": row["Location"],
            "date": str(row["EventDate"]),
        }
        for _, row in schedule.iterrows()
    ]

    return {"season": year, "races": races}
