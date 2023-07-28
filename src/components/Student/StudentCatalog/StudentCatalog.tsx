import { Course } from "../../../dtos/Course";
import React, { useState, useEffect, useCallback } from "react";
import { getFullCourses } from "../../../utils/courseUtils";
import { getFullCategories } from "../../../utils/categoryUtils";
import SideBar from "./SideBar/SideBar";
import MainHead from "./MainHead/MainHead";
import PopularCourses from "./PopularCourses/PopularCourses";

const StudentCatalog: React.FC = () => {
  const [categories, setCategories] = useState<{ _id?: string; categoryname?: string; description?: string }[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isMedium,setIsMedium] = useState<boolean>(false)
  const handleResize = () => {
    setIsMedium(window.innerWidth >= 2000  ? true : false);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);
  const fetchCategories = useCallback(() => {
      getFullCategories()
        .then((res) => {
          setCategories(
            res as {
              _id?: string;
              categoryname?: string;
              description?: string;
            }[]
          );
        })
        .catch((err) => console.log(err));
    }, []);
  const fetchCourses = useCallback(() => {
      getFullCourses()
        .then((res) => {
          setCourses(res as Course[]);
        })
        .catch((err) => console.log(err));
    }, []);
  useEffect(() => {
      fetchCategories();
      fetchCourses();
    }, [fetchCategories, fetchCourses]);

  return (
    <div className="w-full h-full flex justify-center items-center bg-white relative overflow-hidden">
      <SideBar
        categories={categories}
        closeSideBar={() => setIsMedium(false)}
        isMedium={isMedium}
      />
      <div className="w-full lg:w-4/5 h-full flex flex-col justify-start  bg-white gap-10  py-5 px-5 sm:px-12 md:px-16 overflow-y-auto">
        <MainHead
          isMedium={isMedium}
          setIsMedium={() => setIsMedium(!isMedium)}
          categories={categories}
        />
        <PopularCourses
        courses={courses}
        />
      </div>
    </div>
  );
};

export default StudentCatalog;