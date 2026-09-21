import Navbar from "./components/Navbar"
import SkillCard from "./components/SkillCard"
import JobAnalyzer from "./components/JobAnalyser"

//skill array 
function App() {
  const skills = [
    { name: "Python", level: "Intermediate" },
    { name: "C++", level: "Intermediate" },
    { name: "JavaScript", level: "Learning" },
    { name: "HTML & CSS", level: "Learning" },
  ]

  return (
    <div>
      <Navbar />

      <main>
        <h2>Welcome to SkillUp 🚀</h2>
        <p>The Skill and Goal Tracker</p>

        <section>
          <h2>Your Skills</h2>

          {/* takes the array and creates a skillcard for each one */}
          <div className="skills-grid">
            {skills.map((skill) => (
              <SkillCard
                key={skill.name}
                name={skill.name}
                level={skill.level}
              />))
            }
          </div>
        </section>
        
        <JobAnalyzer />

      </main>
    </div>
  )
}

export default App