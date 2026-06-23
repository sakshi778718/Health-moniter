from fastapi import FastAPI

from .database import Base,engine

from .routers import (
    users,
    reports,
    dashboard
)

Base.metadata.create_all(
    bind=engine
)

app = FastAPI(
    title="HYDRA API"
)

app.include_router(
    users.router,
    prefix="/api/auth",
    tags=["Auth"]
)

app.include_router(
    reports.router,
    prefix="/api",
    tags=["Reports"]
)

app.include_router(
    dashboard.router,
    prefix="/api",
    tags=["Dashboard"]
)

@app.get("/")
def root():
    return {
        "message":"HYDRA Backend Running"
    }
