# standings.py
from fastapi import APIRouter
from datetime import datetime
import json
from services.jolpica_service import get_driver_standings, get_constructor_standings
from utils.redis_client import r

router = APIRouter()

@router.get("/drivers", tags=["Standings"])
async def top_drivers():
    key = "standings:drivers:top5"
    cached = r.get(key)
    if cached:
        return json.loads(cached)

    current_year = datetime.utcnow().year
    data = get_driver_standings(current_year, limit=5)
    r.setex(key, 3600, json.dumps(data))  # cache for 1 hour
    return data

@router.get("/drivers/full", tags=["Standings"])
async def all_drivers():
    key = "standings:drivers:all"
    cached = r.get(key)
    if cached:
        return json.loads(cached)

    current_year = datetime.utcnow().year
    data = get_driver_standings(current_year)
    r.setex(key, 3600, json.dumps(data))
    return data

@router.get("/constructors", tags=["Standings"])
async def top_constructors():
    key = "standings:constructors:top5"
    cached = r.get(key)
    if cached:
        return json.loads(cached)

    current_year = datetime.utcnow().year
    data = get_constructor_standings(current_year, limit=5)
    r.setex(key, 3600, json.dumps(data))
    return data

@router.get("/constructors/full", tags=["Standings"])
async def all_constructors():
    key = "standings:constructors:all"
    cached = r.get(key)
    if cached:
        return json.loads(cached)

    current_year = datetime.utcnow().year
    data = get_constructor_standings(current_year)
    r.setex(key, 3600, json.dumps(data))
    return data
