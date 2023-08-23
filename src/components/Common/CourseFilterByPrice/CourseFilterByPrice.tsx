import React from 'react'

interface Props {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
}

const CourseFilterByPrice: React.FC<Props> = ({ selectedOption ,setSelectedOption}) => {
  return (
    <div className="flex w-full h-fit bg-white ">
      <select
        className="appearance-none w-full bg-white border text-[14px] border-gray-300 rounded py-2 px-4  text-gray-700 leading-tight focus:outline-none focus:border-primary"
        name="userStatus"
        id="userStatus"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="option1">Free + Paid Courses</option>
        <option value="option2">Free Courses</option>
        <option value="option3">Paid Courses</option>
      </select>
    </div>
  );
};

export default CourseFilterByPrice