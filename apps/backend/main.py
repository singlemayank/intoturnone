from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import standings, race

app = FastAPI(
    title="IntoTurnOne F1 API",
    version="1.0.0",
    description="Backend for intoturnone.com using FastF1 + Jolpica APIs",
    docs_url="/docs",  # Swagger UI
    redoc_url="/redoc"  # ReDoc UI
)

# Optional: Enable CORS for your frontend on Vercel
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to ["https://intoturnone.com"] in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Route registration
app.include_router(standings.router, prefix="/standings", tags=["Standings"])
app.include_router(race.router, prefix="/race", tags=["Race Info"])
