#main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import standings, race, news, race_results
from dotenv import load_dotenv
load_dotenv()

app = FastAPI(
    title="IntoTurnOne F1 API",
    version="1.0.0",
    description="Backend for intoturnone.com using FastF1 + Jolpica APIs",
    docs_url="/docs",  # Swagger UI
    redoc_url="/redoc"  # ReDoc UI
)


# ✅ Allow CORS from your frontend domain
origins = [
    "https://intoturnone.com",
    # optionally allow local dev too
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] for public APIs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Route registration
app.include_router(standings.router, prefix="/standings", tags=["Standings"])
app.include_router(race.router, prefix="/race", tags=["Race Info"])
app.include_router(news.router, tags=["News"])
app.include_router(race_results.router)
