from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Report

router = APIRouter()

@router.get("/dashboard")
def dashboard(
    db:Session=Depends(get_db)
):

    reports = db.query(
        Report
    ).all()

    total_cases = sum(
        r.cases for r in reports
    )

    high_risk = len(
        [
            r for r in reports
            if r.risk_level == "HIGH"
        ]
    )

    avg_ph = 0

    if reports:
        avg_ph = round(
            sum(
                r.water_ph
                for r in reports
            ) / len(reports),
            2
        )

    return {
        "total_cases":total_cases,
        "high_risk_regions":high_risk,
        "average_ph":avg_ph
    }
