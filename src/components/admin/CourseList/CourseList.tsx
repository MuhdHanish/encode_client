import React, { useEffect, useState, useCallback } from "react";
import {
getFullCoruses,listTheCourse,unListTheCourse
} from "../../../utils/courseUtils";
import { Course } from "../../../dtos/Course";
// import { PaidCoruseCard, FreeCoruseCard } from "../../Common/CardCompnent/CardCompoent"; 

const CourseList: React.FC = () => {
  
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
    <div className="w-full h-full flex flex-col justify-center items-center bg-white relative overflow-hidden">
      <div className="flex w-full p-5 h-fiit justify-between items-center">
        <div className="flex w-full h-full justify-end">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search"
            className="appearance-none bg-white border border-gray-300 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary"
          />
        </div>
      </div>
      <div className="flex h-full w-full flex-wrap p-2 justify-start items-start">
        {/* {filteredCourseList.map((course, idx) => (
          <div className="flex w-fit" key={idx}>
            {
              course.isPaid
                ? (<PaidCoruseCard course={course} listCourse={listCourse} unListCourse={unLIstCourse} />)
                : (<FreeCoruseCard course={course} listCourse={listCourse} unListCourse={unLIstCourse}/>)
            }
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default CourseList;
