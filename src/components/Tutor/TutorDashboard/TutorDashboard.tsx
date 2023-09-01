import React, { useCallback, useState, useEffect } from "react";
import { RiRotateLockLine } from "react-icons/ri";
import { Course } from "../../../dtos/Course";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  getTutorCourse,
  getTutorPopularCourse,
  getCourseDetailsTutorDashborad,
  unListTheCourse,
  listTheCourse,
} from "../../../utils/courseUtils";
import TutorCourseCard from "./TuturoCourseCard/TutorCourseCard";
import { CourseCard } from "../../Common/CardCompnent/CardCompoent";
import { PiDotsThreeVerticalBold, PiShootingStarLight } from "react-icons/pi";
import Pagination from "../../Common/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { setSelectedCourse } from "../../../redux/userSlice/userSlice";
import TutorGraph from "./TutorGraph/TutorGraph";
import ConfirmationComponent from "../../Common/Confirmation/Confirmation";
import SearchInput from "../../Common/SearchInput/SearchInput";
import CourseFilterByStatus from "./TuturoCourseCard/CourseFilterByStatus/CourseFilterByStatus";
import noProgressImage from "../../../assets/progressPage/progressPage.png";
import Loader from "../../Common/Loader/Loader";

const TutorDashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[] | []>([]);
  const [selectedOption, setSelectedOption] = useState<string>("option1");
  const [popularCourses, setPopularCourses] = useState<Course[] | []>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.userReducer.user);
  const [chartData, setChartData] = useState<
    { _id: string; total: string }[] | []
  >([]);
  const fetchDatas = useCallback(() => {
    getTutorPopularCourse(user?._id as string)
      .then((res) => {
        setPopularCourses(res as Course[]);
      })
      .catch((err) => console.log(err));
    getTutorCourse(user?._id as string)
      .then((res) => {
        setCourses(res as Course[]);
      })
      .catch((err) => console.log(err));
    getCourseDetailsTutorDashborad(user?._id as string)
      .then((res) => {
        if (res) {
          setChartData(res as { _id: string; total: string }[]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);
  const [filteredCourseList, setFilteredCourseList] = useState<Course[] | []>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState<string>("");
  useEffect(() => {
    const filteredList = courses.filter((course) => {
      const coursenameMatch = course.coursename
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const discriptionMatch = course.description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      if (selectedOption === "option3") {
        return (coursenameMatch || discriptionMatch) && course.status === false;
      } else if (selectedOption === "option2") {
        return (coursenameMatch || discriptionMatch) && course.status === true;
      } else {
        return coursenameMatch || discriptionMatch;
      }
    });
    setFilteredCourseList(filteredList);
  }, [searchQuery, courses, selectedOption]);
  const unlistCourse = (id: string) => {
    unListTheCourse(id)
      .then(() => {
        fetchDatas();
      })
      .catch((err) => console.log(err));
  };
  const listCourse = (id: string) => {
    listTheCourse(id)
      .then(() => {
        fetchDatas();
      })
      .catch((err) => console.log(err));
  };
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postPerPage = 8;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const [currentPosts, setCurrentPosts] = useState<Course[] | []>([]);
  useEffect(() => {
    setCurrentPosts(filteredCourseList.slice(firstPostIndex, lastPostIndex));
  }, [filteredCourseList, firstPostIndex, lastPostIndex]);

  useEffect(() => {
    fetchDatas();
  }, [fetchDatas]);
    const [loading, setLoading] = useState<boolean>(true);
    setTimeout(() => {
      setLoading(false);
    }, 60);
  return (
    <div className="bg-white flex flex-col w-full h-full p-5 gap-10 overflow-x-hidden ">
      <div className="flex w-full h-fit justify-start items-center text-2xl font-bold gap-2">
        <div>Dashboard</div>{" "}
        <span>
          <RiRotateLockLine style={{ fontSize: "20px" }} />
        </span>
      </div>
      {loading && <Loader />}
      {!loading && courses?.length > 0 && (
        <>
          <div className=" grid md:grid-cols-3 gap-5">
            <div className="col-span-1 flex flex-col gap-10">
              <TutorCourseCard
                courses={courses}
                fetchDatas={fetchDatas}
                heading="newly added"
              />
              <TutorCourseCard
                courses={popularCourses}
                fetchDatas={fetchDatas}
                heading="popular course"
              />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <TutorGraph chartData={chartData} />
            </div>
          </div>
          <div className="w-full h-full flex flex-col  ">
            <div className="flex w-full h-fit justify-between items-center p-5 ">
              <CourseFilterByStatus
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
              <SearchInput
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
            <div className="grid grid-cols-1  lg:grid-cols-4 gap-4 w-full  p-5 ">
              {currentPosts.length > 0 ? (
                currentPosts.map((course, idx) => (
                  <div key={idx} className="flex flex-col relative">
                    <div
                      className="flex absolute z-10 w-fit right-0 p-0.5  top-1  cursor-pointer "
                      onClick={() => {
                        setIsOpen(!isOpen);
                      }}
                    >
                      <PiDotsThreeVerticalBold
                        style={{ fontSize: "16px", color: "black" }}
                      />
                    </div>
                    {isOpen && (
                      <div
                        className="flex absolute z-10  top-5 right-7  h-fit border bg-white shadow-xl rounded-lg overflow-hidden flex-col text-[13px] cursor-pointer"
                        onMouseLeave={() => setIsOpen(false)}
                      >
                        <div
                          className="flex w-full h-fit justify-start items-center border-b hover:bg-green-100 transition duration-300 px-2 py-1"
                          onClick={() => {
                            dispatch(setSelectedCourse(course));
                            navigate(
                              `/tutor/selected/course/${course?._id as string}`
                            );
                          }}
                        >
                          view course
                        </div>
                        {course.status ? (
                          <div className="flex w-full h-fit text-danger  justify-start items-center hover:bg-red-100 transition duration-300  px-2 py-1">
                            <ConfirmationComponent
                              id={course._id as string}
                              message={"Unlist"}
                              onConfirm={unlistCourse}
                            >
                              unlist
                            </ConfirmationComponent>
                          </div>
                        ) : (
                          <div className="flex w-full h-fit text-green-400 justify-start items-center hover:bg-green-100 transition duration-300  px-2 py-1">
                            <ConfirmationComponent
                              id={course._id as string}
                              message={"List"}
                              onConfirm={listCourse}
                            >
                              list
                            </ConfirmationComponent>
                          </div>
                        )}
                      </div>
                    )}
                    <CourseCard key={idx} course={course} />
                  </div>
                ))
              ) : (
                <span>No course found !</span>
              )}
            </div>
            {filteredCourseList.length > postPerPage && (
              <div className="flex w-full p-5 justify-center items-end ">
                <Pagination
                  postsPerPage={postPerPage}
                  totalPosts={filteredCourseList?.length}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </div>
            )}
          </div>
        </>
      )}{
        !loading&& courses?.length < 0 &&(
        <>
          <div className="flex w-full flex-col md:flex-row h-screen justify-center items-center  p-5 overflow-hidden">
            <div className="flex w-full h-full justify-center items-center flex-col">
              <span className="flex w-fit h-fit font-bold text-3xl">
                No Course Found !
              </span>
              <span className="text-gray-500 font-normal text-sm flex gap-1 items-center ">
                start course, start grow{" "}
                <span className="text-primary">
                  <PiShootingStarLight />
                </span>
              </span>
            </div>
            <div className="flex w-full  h-full justify-center items-center">
              <img src={noProgressImage} className="" alt="" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TutorDashboard;
