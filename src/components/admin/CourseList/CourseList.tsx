import React, { useEffect, useState, useCallback } from "react";
import {
getFullCoruses
} from "../../../utils/courseUtils";
import { Course } from "../../../dtos/Course";
import { toast } from "react-toastify";
import { CourseCard } from "../../Common/CardCompnent/CardCompoent";
import Pagination from "../../Common/Pagination/Pagination";
import SearchInput from "../../Common/SearchInput/SearchInput";

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourseList,setFilteredCourseList] = useState<Course[]|[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchCourses = useCallback(() => {
    getFullCoruses()
      .then((res) => {
        setCourses(res as Course[]);
      })
      .catch((err) => {
        toast.error(err as string, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }, []);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const postPerPage = 8 ;
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const [currentPosts, setCurrentPosts] = useState<Course[] | []>([]);
    useEffect(() => {
      setCurrentPosts(filteredCourseList.slice(firstPostIndex, lastPostIndex));
    }, [filteredCourseList, firstPostIndex, lastPostIndex]);


  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);


  useEffect(() => {
    const filteredList = courses.filter((course) => {
      const coursenameMatch = course.coursename
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const discriptionMatch = course.description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
       return coursenameMatch || discriptionMatch;
    });
    setFilteredCourseList(filteredList);
  }, [searchQuery, courses]);

  return (
    <div className="w-full h-full flex flex-col  overflow-x-hidden">
      <div className="flex w-full h-fit justify-end items-center p-5 ">
        <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <div className="grid grid-cols-1  lg:grid-cols-4 gap-4 w-full  p-5 ">
         {currentPosts.length > 0 ? currentPosts.map((course, idx) => (
          <CourseCard key={idx} course={course} />
        )) : (<span>No course found !</span>)}
      </div>
      {filteredCourseList.length > postPerPage && (
        <div className="flex w-full h-full p-5 justify-center items-end ">
          <Pagination
            postsPerPage={postPerPage}
            totalPosts={filteredCourseList?.length}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
};

export default CourseList;
