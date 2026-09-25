import { useState } from "react"

function JobAnalyser() {
  const [jobDescription, setJobDescription] = useState("")
  const [result, setResult] = useState<string[]>([])

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

      setResult(data.skills)
    } catch (error) {
      console.error("Error analyzing job:", error)
    }
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

      {result.length > 0 && (
        <div>
          <h3>Analysis Result</h3>
          {/* <p>{result}</p> */}
          {result.map((skill) => (
              <p key={skill}>{skill}</p>
          ))} 
        </div>
      )}
    </section>
  )
}

export default JobAnalyser