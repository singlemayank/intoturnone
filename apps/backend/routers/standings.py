from fastapi import APIRouter
from services.jolpica_service import get_driver_standings, get_constructor_standings
from datetime import datetime

router = APIRouter()

@router.get("/drivers")
async def top_drivers():
    current_year = datetime.utcnow().year
    return get_driver_standings(current_year, limit=5)

@router.get("/drivers/full")
async def all_drivers():
    current_year = datetime.utcnow().year
    return get_driver_standings(current_year)

@router.get("/constructors")
async def top_constructors():
    current_year = datetime.utcnow().year
    return get_constructor_standings(current_year, limit=5)

@router.get("/constructors/full")
async def all_constructors():
    current_year = datetime.utcnow().year
    return get_constructor_standings(current_year)
