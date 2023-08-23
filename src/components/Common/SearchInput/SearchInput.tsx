import React from 'react'

interface Props {
  searchQuery: string,
  setSearchQuery: (value: string) => void;
}

const SearchInput:React.FC<Props> = ({searchQuery,setSearchQuery}) => {
  return (
    <div className="flex w-fit h-fit bg-white ">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="search"
        className="appearance-none bg-white border border-gray-300 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary"
      />
    </div>
  );
}

export default SearchInput