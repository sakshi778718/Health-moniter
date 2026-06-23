from pydantic import BaseModel

class UserCreate(BaseModel):
    username:str
    email:str
    password:str

class UserLogin(BaseModel):
    username:str
    password:str

class ReportCreate(BaseModel):
    location:str
    symptom:str
    cases:int
    water_ph:float
    turbidity:float

class ReportResponse(BaseModel):
    id:int
    location:str
    symptom:str
    cases:int
    water_ph:float
    turbidity:float
    risk_level:str

    class Config:
        from_attributes=True
