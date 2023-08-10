import React, { useEffect, useState, useCallback } from "react";
import {
getFullCoruses,listTheCourse,unListTheCourse
} from "../../../utils/courseUtils";
import { Course } from "../../../dtos/Course";
import { CourseCard } from "../../Common/CardCompnent/CardCompoent";
import Pagination from "../../Common/Pagination/Pagination";

const CourseList: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("option1");
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourseList,setFilteredCourseList] = useState<Course[]|[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchCourses = useCallback(() => {
    getFullCoruses()
      .then((res) => {
        setCourses(res as Course[]);
      })
      .catch((err) => console.log(err));
  }, []);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const postPerPage = 4;
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
      if (selectedOption === "option2") {
        return (discriptionMatch || discriptionMatch) && course.status === false;
      } else if (selectedOption === "option3") {
        return (discriptionMatch || discriptionMatch) && course.status === true;
      } else {
        return coursenameMatch || discriptionMatch;
      }
    });
    setFilteredCourseList(filteredList);
  }, [searchQuery, courses, selectedOption]);

  const listCourse = (id: string) => {
    listTheCourse(id)
      .then((res) => {
        if (res) fetchCourses();
        return;
      })
      .catch((err) => console.log(err));
  };

  const unLIstCourse = (id: string) => {
    unListTheCourse(id)
      .then((res) => {
        if (res) fetchCourses();
        return;
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full h-full flex flex-col  overflow-x-hidden">
      <div className="flex w-full h-fit justify-between items-center p-5 ">
        <div className="flex w-fit h-fit bg-white ">
          <select
            className="appearance-none bg-white border border-gray-300 rounded py-2 px-4  text-gray-700 leading-tight focus:outline-none focus:border-primary"
            name="userStatus"
            id="userStatus"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="option1">All Courses</option>
            <option value="option2">Blocked</option>
            <option value="option3">Unblocked</option>
          </select>
        </div>
        <div className="flex w-fit h-fit bg-white ">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search"
            className="appearance-none bg-white border border-gray-300 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary"
          />
        </div>
      </div>
      <div className="grid grid-cols-1  lg:grid-cols-4 gap-4 w-full  p-5 ">
        {currentPosts.map((course, idx) => (
          <CourseCard key={idx} course={course} listCourse={listCourse} unListCourse={unLIstCourse}/>
        ))}
      </div>
      <div className="flex w-full h-full p-5 justify-center items-end ">
        <Pagination
          postsPerPage={postPerPage}
          totalPosts={filteredCourseList?.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default CourseList;
