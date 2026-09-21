import { useState } from "react"


//Creates state
function JobAnalyzer() {
  const [jobDescription, setJobDescription] = useState("")


//Prints to the console (inspect and look at console)
  function handleAnalyze() {
    console.log(jobDescription)
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
    </section>
  )
}

export default JobAnalyzer