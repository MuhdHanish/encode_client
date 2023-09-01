import { Course } from "../../../dtos/Course";
import React, { useState, useEffect, useCallback } from "react";
import { getFullPopularCoruses } from "../../../utils/courseUtils";
import {  getFullLanguages } from "../../../utils/LanguageUtils";
import SideBar from "./SideBar/SideBar";
import MainHead from "./MainHead/MainHead";
import PopularCourses from "./PopularCourses/PopularCourses";
import { Language } from "../../../dtos/Language";
import Loader from "../../Common/Loader/Loader";

const StudentCatalog: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [popularCourses, setPopularCourses] = useState<Course[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>("");
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
            res as Language[]
          );
        }).catch((err) => console.log(err));
    }, []);
  useEffect(() => {
    fetchDatas();
  }, [fetchDatas]);
    const [loading, setLoading] = useState<boolean>(true);
    setTimeout(() => {
      setLoading(false);
    }, 60);
  return (
    <>
      <div className="w-full h-full flex justify-center items-center bg-white relative overflow-hidden">
      {  loading && <Loader/> }
        {!loading &&
          <>
          <SideBar
          languages={languages}
          selectedLanguage={selectedLanguage}
          closeSideBar={() => setIsMedium(false)}
          isMedium={isMedium}
          setSelectedLanguage={setSelectedLanguage}
        />
          <div className="w-full lg:w-4/5 h-full flex flex-col justify-start  bg-white gap-10  py-5 px-5 sm:px-12 md:px-16 overflow-y-auto">
            <MainHead
              isMedium={isMedium}
              setIsMedium={() => setIsMedium(!isMedium)}
              languages={languages}
            />
            <PopularCourses
              courses={popularCourses}
              selectedLanguage={selectedLanguage}
            />
          </div>
        </>}
      </div>
    </>
  );
};

export default StudentCatalog;