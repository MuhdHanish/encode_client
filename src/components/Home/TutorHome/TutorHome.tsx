import React from 'react'
import NavBar from '../../NavBar/NavBar'
import TutorHomeMain from '../../HomeMain/TutorHomeMain'

const TutorHome:React.FC = () => {
  return (
    <div>
      <NavBar isTutor={true} />
      <TutorHomeMain/>
    </div>
  )
}

export default TutorHome