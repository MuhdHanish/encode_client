import React from 'react'

interface Props {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
}

const UserFilter:React.FC<Props> = ({selectedOption,setSelectedOption}) => {
  return (
    <div className="flex w-fit h-fit bg-white ">
      <select
        className="appearance-none bg-white border border-gray-300 rounded py-2 px-4  text-gray-700 leading-tight focus:outline-none focus:border-primary"
        name="userStatus"
        id="userStatus"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="option1">All Users</option>
        <option value="option2">Blocked</option>
        <option value="option3">Unblocked</option>
      </select>
    </div>
  );
}

export default UserFilter