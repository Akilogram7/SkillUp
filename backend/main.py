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

user_skills = ["Python",
               "C++",
               "JavaScript"]



def extract_skills(description):
    found_skills = []
    for skill in lst_skills: 
        if re.search(fr"\b{skill}\b",description,re.IGNORECASE):   #(skill.lower() in description.lower()):
            found_skills.append(skill)
    return found_skills

def compare_skills(found_skills):
    matched_skills = []
    missing_skills = []
    for skill in found_skills: 
        if skill in user_skills: 
            matched_skills.append(skill)
        else: 
            missing_skills.append(skill)
            
    return matched_skills, missing_skills



#creates an API endpoint
@app.get("/")
def root():
    return {"message": "SkillUp API is running"}

@app.post("/analyze")
def analyze_job(job: JobDescription):
    job_skills = extract_skills(job.description)
    matched_skills, missing_skills = compare_skills(job_skills)
    return {
        "message": "Job Received Successfully",
        "skills": job_skills,
        "matched_skills": matched_skills, 
        "missing_skills": missing_skills,
    }

