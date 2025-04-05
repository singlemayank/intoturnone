from fastapi import APIRouter
from services.jolpica_service import get_next_race
from services.fastf1_service import get_race_results


router = APIRouter()

@router.get("/race/upcoming")
def upcoming_race():
    return get_next_race()

@router.get("/results")
async def race_results():
    return get_race_results()
