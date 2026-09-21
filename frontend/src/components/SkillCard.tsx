
//defines the data that is expected 
type SkillCardProps = {
  name: string
  level: string
}


//passes name and level values making props
function SkillCard({ name, level }: SkillCardProps) {
  return (
    <div className="skill-card">
      <h3>{name}</h3>
      <p>{level}</p>
    </div>
  )
}

export default SkillCard