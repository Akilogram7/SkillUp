
//defines the data that is expected - This is what typescript is in identifying the type of variable that can be used
type SkillCardProps = {
  name: string
  level: string
}


//passes name and level values making props - This is react where we created a reuseable environment instead of html repeated code
function SkillCard({ name, level }: SkillCardProps) {
  return (
    <div className="skill-card">
      <h3>{name}</h3>
      <p>{level}</p>
    </div>
  )
}

export default SkillCard