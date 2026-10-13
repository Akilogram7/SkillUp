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
              "Azure",
              "HTML", 
              "CSS"]

user_skills = ["Python",
               "C++",
               "JavaScript", 
               "HTML", 
               "CSS", ]

skill_priority = {
    "Python" : 1,
    "Java" : 1,
    "C++" : 1,
    "HTML" : 1,
    "CSS" : 1,
    "JavaScript" : 1,
    "TypeScript" : 2,
    "React" : 3,
    "SQL" : 2,
    "PostgreSQL" : 3,
    "Git" : 1,
    "Docker" : 2,
    "AWS" : 3,
    "Azure" : 2,
}

skill_dependencies = {
    "Python" : [],
    "Java" : [],
    "C++" : [],
    "HTML" : [],
    "CSS" : ["HTML"],
    "JavaScript" : [],
    "TypeScript" : ["JavaScript"],
    "React" : ["JavaScript", "HTML", "CSS"],
    "SQL" : [],
    "PostgreSQL" : ["SQL"],
    "FastAPI" : ["Python"],
    "Docker" : [],
    "AWS" : [],
    "Azure" : [],
}


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

def prioritize_skills(missing_skills):
    sorted_skills = sorted(missing_skills, key=lambda skill: skill_priority.get(skill, 99))
    return sorted_skills

def get_prerequisite(skill):
    return skill_dependencies.get(skill, [])

def find_all_prerequisite(skill):
    all_prerequisite = []
    
    for prerequisite in get_prerequisite(skill):
        skill_found = find_all_prerequisite(prerequisite)
    
        for found_skills in skill_found: 
            if found_skills not in all_prerequisite:
                all_prerequisite.append(found_skills)
        if prerequisite not in all_prerequisite: 
            all_prerequisite.append(prerequisite)
            
        
    return all_prerequisite

print(find_all_prerequisite("React"))

#creates an API endpoint
@app.get("/")
def root():
    return {"message": "SkillUp API is running"}

@app.post("/analyze")
def analyze_job(job: JobDescription):
    job_skills = extract_skills(job.description)
    matched_skills, missing_skills = compare_skills(job_skills)
    learning_path = prioritize_skills(missing_skills)
    return {
        "message": "Job Received Successfully",
        "skills": job_skills,
        "matched_skills": matched_skills, 
        "missing_skills": missing_skills,
        "learning_path": learning_path, 
    }

