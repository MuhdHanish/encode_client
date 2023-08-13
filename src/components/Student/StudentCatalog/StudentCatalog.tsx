import { Course } from "../../../dtos/Course";
import React, { useState, useEffect, useCallback } from "react";
import { getFullPopularCoruses } from "../../../utils/courseUtils";
import {  getFullLanguages } from "../../../utils/LanguageUtils";
import SideBar from "./SideBar/SideBar";
import MainHead from "./MainHead/MainHead";
import PopularCourses from "./PopularCourses/PopularCourses";

const StudentCatalog: React.FC = () => {
  const [languages, setLanguages] = useState<{ _id?: string; categoryname?: string; description?: string }[]>([]);
  const [popularCourses, setPopularCourses] = useState<Course[]>([]);
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
  const fetchDatas = useCallback(() => {
        getFullPopularCoruses()
        .then((res) => {
          setPopularCourses(res as Course[]);
        }).catch((err) => console.log(err));
         getFullLanguages()
        .then((res) => {
          setLanguages(
            res as {
              _id?: string;
              languagename?: string;
              description?: string;
            }[]
          );
        }).catch((err) => console.log(err));
    }, []);
  useEffect(() => {
    fetchDatas();
  }, [fetchDatas]);
  return (
    <div className="w-full h-full flex justify-center items-center bg-white relative overflow-hidden">
      <SideBar
        languages={languages}
        closeSideBar={() => setIsMedium(false)}
        isMedium={isMedium}
      />
      <div className="w-full lg:w-4/5 h-full flex flex-col justify-start  bg-white gap-10  py-5 px-5 sm:px-12 md:px-16 overflow-y-auto">
        <MainHead
          isMedium={isMedium}
          setIsMedium={() => setIsMedium(!isMedium)}
          languages={languages}
        />
        <PopularCourses courses={popularCourses} />
      </div>
    </div>
  );
};

export default StudentCatalog;