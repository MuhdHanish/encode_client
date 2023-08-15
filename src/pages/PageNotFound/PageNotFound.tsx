import React from 'react'
import { BsArrowLeftShort } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const PageNotFound:React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600 text-primary text-shadow-black">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page.
          </p>
          <p className="px-8 py-10 font-semibold rounded dark:bg-violet-400 dark:text-gray-900 text-primary text-shadow-black flex">
            <span className="cursor-pointer w-fit h-fit flex" onClick={() => navigate("/")}>
              <BsArrowLeftShort style={{ fontSize: "25px" }} />{" "}
              <span>Back</span>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default PageNotFound