import React from 'react';

interface Props {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
}

const CourseFilterByStatus:React.FC<Props> = ({ selectedOption, setSelectedOption }) => {
  return (
    <div className="flex w-fit h-fit bg-white ">
      <select
        className="appearance-none bg-white border border-gray-300 rounded py-2 px-4  text-gray-700 leading-tight focus:outline-none focus:border-primary"
        name="userStatus"
        id="userStatus"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="option1">All Courses</option>
        <option value="option2">Listed</option>
        <option value="option3">Unlisted</option>
      </select>
    </div>
  );
};

export default CourseFilterByStatus