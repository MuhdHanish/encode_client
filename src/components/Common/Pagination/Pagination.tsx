import React, { useEffect, useState } from "react";

interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: (value: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  postsPerPage,
  totalPosts,
  setCurrentPage,
  currentPage,
}) => {
  const [pages, setPages] = useState<number[] | []>();

  useEffect(() => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
    setPages(pageNumbers);
  }, [totalPosts, postsPerPage]);

  return (
     (
      <div className="flex gap-2">
        {pages?.map((page, idx) => (
          <button
            key={idx}
            className={`border ${
              currentPage === page
                ? "bg-purple-600 text-white text-shadow-black"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            } px-3 py-1 rounded-md transition duration-300 ease-in-out`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    )
  );
};

export default Pagination;
