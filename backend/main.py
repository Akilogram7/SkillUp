from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import re

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

lst_skills = ["Python", 
              "Java",
              "C++",
              "JavaScript",
              "TypeScript",
              "React",
              "SQL",
              "PostgreSQL",
              "Git",
              "Docker",
              "AWS",
              "Azure",]


def extract_skills(description):
    found_skills = []
    for skill in lst_skills: 
        if re.search(fr"\b{skill}\b",description,re.IGNORECASE):   #(skill.lower() in description.lower()):
            found_skills.append(skill)
    return found_skills
    

#creates an API endpoint
@app.get("/")
def root():
    return {"message": "SkillUp API is running"}

@app.post("/analyze")

def analyze_job(job: JobDescription):
    return {
        "message": "Job Received Successfully",
        "skills": extract_skills(job.description)
    }

