from fastapi import APIRouter
from services.fastf1_service import get_top_5_drivers, get_top_5_constructors

router = APIRouter()

@router.get("/drivers")
async def top_drivers():
    return get_top_5_drivers()

@router.get("/constructors")
async def top_constructors():
    return get_top_5_constructors()