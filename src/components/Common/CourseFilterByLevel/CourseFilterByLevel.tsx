import React from 'react';

interface Props {
  selectedLevel: string;
  setSelectedLevel: (value: string) => void;
}

const CourseFilterByLevel:React.FC<Props> = ({selectedLevel, setSelectedLevel}) => {
  return (
    <div className="flex w-full h-fit bg-white ">
      <select
        className="appearance-none w-full bg-white border text-[14px] border-gray-300 rounded py-2 px-4  text-gray-700 leading-tight focus:outline-none focus:border-primary"
        name="userStatus"
        id="userStatus"
        value={selectedLevel}
        onChange={(e) => setSelectedLevel(e.target.value)}
      >
        <option value="option1">Selected Level</option>
        <option value="option2">Beginner</option>
        <option value="option3">Intermediate</option>
        <option value="option4">Expert</option>
      </select>
    </div>
  );
}

export default CourseFilterByLevel