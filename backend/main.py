from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

#creats backend application
app = FastAPI()

#allowing front end to communicate with the backend although using different ports 
origins = [
    "http://localhost:5173",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class JobDescription(BaseModel):
    description: str


#creates an API endpoint
@app.get("/")
def root():
    return {"message": "SkillUp API is running"}

@app.post("/analyze")

def analyze_job(job: JobDescription):
    return {
        "message": "Job Recieved Successfully",
        "description": job.description
    }