import React, { useState } from 'react'
import SideNav from './SessionComponents/SideNav/SideNav';
import { TutorSession } from '..';
import BottumNav from './SessionComponents/BottumNav/BottumNav';

const TutorSessionGate: React.FC = () => {
  const [sessionMode, setSessionMode] = useState<number>(0);
  return (
    <div className="bg-white w-full  h-full flex flex-col lg:flex-row justify-center items-center overflow-hidden relative ">
      <div className="hidden lg:flex">
        <SideNav setSessionMode={setSessionMode} />
      </div>
      {sessionMode === 0 ? <TutorSession /> : null}
      {sessionMode === 1 ? <TutorSession /> : null}
      {sessionMode === 2 ? <TutorSession /> : null}
      {sessionMode === 3 ? <TutorSession /> : null}
      <div className="flex lg:hidden">
        <BottumNav />
      </div>
    </div>
  );
}

export default TutorSessionGate