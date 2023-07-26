import {
  GoTriangleDown,
  GoTriangleLeft,
  GoTriangleRight,
} from "react-icons/go";
import { BsArrowLeftSquare } from "react-icons/bs";
import { Course } from "../../../dtos/Course";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { getFullCourses } from "../../../utils/courseUtils";
import { getFullCategories } from "../../../utils/categoryUtils";
import {setSelectedCourseId} from "../../../redux/userSlice/userSlice"
import { useDispatch } from "react-redux";

const StudentCatalog: React.FC = () => {
  const [categories, setCategories] = useState<
    { _id?: string; categoryname?: string; description?: string }[]
  >([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLanguage, setIsLanguage] = useState(true);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const [isMedium,setIsMedium] = useState<boolean>(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleIconClick = () => {
    setIsLanguage((prevState) => !prevState);
  };

  const smoothScroll = (
    element: HTMLElement,
    distance: number,
    direction: "left" | "right"
  ) => {
    const step = 30;
    let currentScroll = element.scrollLeft;
    const targetScroll = currentScroll + distance;
    const animateScroll = () => {
      if (
        (distance > 0 && currentScroll < targetScroll) ||
        (distance < 0 && currentScroll > targetScroll)
      ) {
        currentScroll += step * (direction === "right" ? 1 : -1);
        element.scrollLeft = currentScroll;
        requestAnimationFrame(animateScroll);
      }
    };
    animateScroll();
  };

  const handleScroll = (side: string) => {
    if (cardContainerRef.current && side === "left") {
      smoothScroll(cardContainerRef.current, -820, "left");
    } else if (cardContainerRef.current && side === "right") {
      smoothScroll(cardContainerRef.current, 820, "right");
    }
  };

  useEffect(() => {
    getFullCategories()
      .then((res) => {
        setCategories(
          res as { _id?: string; categoryname?: string; description?: string }[]
        );
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getFullCourses()
      .then((res) => {
        setCourses(res as Course[]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center bg-white relative">
      <div
        className={`${
          isMedium
            ? " w-1/2 flex absolute left-0 duration-300  gap-2 p-2 shadow-2xl bg-white"
            : "w-0  lg:w-1/5 duration-150 shadow-2xl"
        } flex flex-col   h-full  lg:p-2 lg:gap-2`}
      >
        {isMedium ? (
          <div className="w-full flex h-fit justify-end">
            <button onClick={() => setIsMedium(!isMedium)}>
              <BsArrowLeftSquare
                style={{ color: "#9C4DF4", fontSize: "30px" }}
              />
            </button>
          </div>
        ) : (
          ""
        )}
        <div className="w-full h-fit flex items-center justify-center bg-white p-3 font-semibold text-[18px]">
          Languages
        </div>
        <div className="w-full h-full flex flex-col items-center overflow-y-auto px-5 ">
          {categories.map((category, index) => (
            <div
              className="my-2 border-b text-[14px]  p-1 w-full justify-center  flex transition 
              duration-500 hover:scale-105 cursor-pointer font-semibold 
              hover:shadow-md hover:text-primary hover:border-primary"
              key={index}
            >
              {category.categoryname}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-full flex  justify-center   bg-white">
        <div className="flex flex-col  w-full h-fit bg-red-500"></div>
      </div>
    </div>
  );
};

export default StudentCatalog;
