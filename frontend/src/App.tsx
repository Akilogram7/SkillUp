//the tsx file extenstion allows for typescript and JSX (hmtl-like syntax) 
// Vite is a tool that helps with developing and building the application
//Vite starts a development sever on my computer which allows me to see the application on firefox using http://localhost:5173/
//Vite also builds the finished website once its done 
//npm is the package manager that comes with Node.js and it handles the packages our project depends on

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