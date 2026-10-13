import { useState } from "react"

function JobAnalyser() {
  const [jobDescription, setJobDescription] = useState("")
  const [requiredSkills, setRequiredSkills] = useState<string[]>([])
  const [matched, setMatched] = useState<string[]>([])
  const [missing, setMissing] = useState<string[]>([])
  const [learningPath, setLearningPath] = useState<string[]>([])

  //async means perfom a function that will take some time as it needs to connect to two servers
  async function handleAnalyze() {
    try {
      //allows javascript to make an HTTP request
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        //use the fastapi endpoint POST
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        //take the js object and convert into JSON
        body: JSON.stringify({
          description: jobDescription,
        }),
      })

      //fastapi recieves everything and then goes through to check if the input is valid 
      const data = await response.json()
    

      setRequiredSkills(data.skills)
      setMatched(data.matched_skills)
      setMissing(data.missing_skills)
      setLearningPath(data.learning_path)

    } catch (error) {
      console.error("Error analyzing job:", error)
    }
  }

  let matchPercentage = 0

  if (requiredSkills.length > 0) {
    matchPercentage = Math.round((matched.length / requiredSkills.length)* 100)
  } 

  return (
    <section className="job-analyzer">
      <div className="section-header">
        <h2>Analyze a Job</h2>

        <p>
          Paste a job posting to see how your skills compare to its
          requirements.
        </p>
      </div>

      <textarea
        placeholder="Paste the job description here..."
        value={jobDescription}
        onChange={(event) => setJobDescription(event.target.value)}
      />

      <button
        className="analyze-button"
        onClick={handleAnalyze}
        disabled={!jobDescription.trim()}
      >
        Analyze Job
      </button>

      {requiredSkills.length > 0 && ( //conditional rendering
      <div className="analysis-results">
          <div>
            <h3>Analysis Result</h3>
            <div className="job-match-card"> 

              <div className="job-match-header">
                <h4>Job Match</h4>
                <span>{matchPercentage}%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${matchPercentage}%` }}
                ></div>
              </div>

              <div className="match-stats">
                <span>{requiredSkills.length} required</span>
                <span>{matched.length} matched</span>
                <span>{missing.length} to learn</span>
              </div>
              
            </div>

            <div className="result-card">
              <h4>Required Skills</h4>

              <div className="skill-badges">
                {requiredSkills.map((skill) => (
                  <span className="skill-badge" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="comparison-grid">

              <div className="result-card">
                <h4>Skills You Have</h4>
                <div className="skill-badges">
                {matched.map((skill) => (
                  <span className="skill-badge matched-skill" key={skill}>
                    {skill}
                  </span>
                ))}
                </div>
              </div>
              
              <div className="result-card">
                <h4>Skills To Learn</h4>
                <div className="skill-badges"> 
                {missing.map((skill) => (
                  <span className="skill-badge missing-skill" key={skill}>{skill}
                  </span>))}
                </div>
              </div>

            </div>

            {/* Learning path */}
            <div className="learning-path-card">
              <h4>Learning Path</h4>
              <div className="learning-path-steps">
                  {learningPath.map((skill, index) => (  
                    <div className="learning-step" key={skill}>
                      <span>Step {index+1} </span> 
                      <h4>{skill}</h4>
                    </div>
                  ))}
              </div>
            </div>
                
          </div>
        </div>
      )}
      

    </section>
  )
}

export default JobAnalyser