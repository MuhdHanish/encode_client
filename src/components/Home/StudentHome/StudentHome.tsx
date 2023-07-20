import React from 'react'
import NavBar from '../../NavBar/NavBar';
import HomeMain from '../../HomeMain/StudentHomeMain';

const StudentHome:React.FC = () => {
  return (
    <div className="bg-home-background w-screen h-screen ">
      <NavBar isTutor={false} />
      <HomeMain />
    </div>
  );
}

export default StudentHome