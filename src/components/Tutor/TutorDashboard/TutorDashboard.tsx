import React, { useCallback, useState, useEffect } from "react";
import { RiRotateLockLine } from "react-icons/ri";
import { Course } from "../../../dtos/Course";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  getTutorCourse,
  getTutorPopularCourse,
  getStudentsFromCourse,
  getCourseDetailsTutorDashborad,
  unListTheCourse,
  listTheCourse,
} from "../../../utils/courseUtils";
import { User } from "../../../dtos/User";
import TutorCourseCard from "./TuturoCourseCard/TutorCourseCard";

import { Line } from "react-chartjs-2"; // Import Bar component
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { CourseCard } from "../../Common/CardCompnent/CardCompoent";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import Pagination from "../../Common/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { setSelectedCourse } from "../../../redux/userSlice/userSlice";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const TutorDashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[] | []>([]);
  const [popularCourses, setPopularCourses] = useState<Course[] | []>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [students, setStudents] = useState<User[] | []>([]);
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
  const setStudentsList = (id: string) => {
    getStudentsFromCourse(id)
      .then((res) => {
        setStudents(res as User[]);
      })
      .catch((err) => console.log(err));
  };
  const lineData = {
    labels: [...chartData.map((obj) => obj._id)],
    datasets: [
      {
        label: "Revenue",
        data: [...chartData.map((obj) => obj.total)],
        borderColor: "#9C4DF4",
        borderWidth: 2,
        pointBackgroundColor: "#9C4DF4",
        pointRadius: 5,
        pointHoverRadius: 7,
        pointHitRadius: 10,
        pointHoverBorderColor: "#fff",
        pointHoverBackgroundColor: "#9C4DF4",
        pointHoverBorderWidth: 2,
        tension: 0.4,
      },
    ],
  };
  const [filteredCourseList, setFilteredCourseList] = useState<Course[] | []>(
    []
  );
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
      return coursenameMatch || discriptionMatch;
    });
    setFilteredCourseList(filteredList);
  }, [searchQuery, courses]);
  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        title: {
          display: true,
          text: "Revenue",
        },
      },
    },
  };
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
  const [isStudentOpen, setIsStudentOpen] = useState<boolean>(false);

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

  return (
    <div className="bg-white flex flex-col w-full h-full p-5 gap-10 overflow-x-hidden ">
      <div className="flex w-full h-fit justify-start items-center text-2xl font-bold gap-2">
        <div>Dashboard</div>{" "}
        <span>
          <RiRotateLockLine style={{ fontSize: "20px" }} />
        </span>
      </div>
      <div className=" grid md:grid-cols-3 gap-5">
        <div className="col-span-1">
          <TutorCourseCard
            courses={courses}
            fetchDatas={fetchDatas}
            heading="newly added"
            setIsStudentOpen={setIsStudentOpen}
            setStudentsList={setStudentsList}
          />
          <TutorCourseCard
            courses={popularCourses}
            fetchDatas={fetchDatas}
            heading="popular courses"
            setIsStudentOpen={setIsStudentOpen}
            setStudentsList={setStudentsList}
          />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <div className="flex w-full h-full bg-white">
            <div className="col-span-2 w-full h-full p-5 hidden lg:flex">
              <Line
                style={{ width: "80%" }}
                data={lineData}
                options={options}
              />
            </div>
            <div className=" w-full h-full p-5 flex lg:hidden">
              <Line
                style={{ width: "100%" }}
                data={lineData}
                options={options}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-col  ">
        <div className="flex w-full h-fit justify-end items-center p-5 ">
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
          {currentPosts.length > 0 ? (
            currentPosts.map((course, idx) => (
              <div key={idx} className="flex flex-col relative">
                <div
                  className="flex absolute z-10 w-fit right-1 p-0.5 rounded-full top-1 h-fit bg-primary hover:scale-105 transition duration-300 cursor-pointer "
                  onClick={() => {
                    setIsOpen(!isOpen);
                    setStudentsList(course?._id as string);
                  }}
                >
                  <PiDotsThreeVerticalBold
                    style={{ fontSize: "16px", color: "white" }}
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
                    <div
                      className="flex w-full h-fit justify-start items-center border-b hover:bg-green-100 transition duration-300  px-2 py-1"
                      onClick={() => setIsStudentOpen(true)}
                    >
                      view students
                    </div>
                    {course.status ? (
                      <div
                        className="flex w-full h-fit text-danger  justify-start items-center hover:bg-red-100 transition duration-300  px-2 py-1"
                        onClick={() => unlistCourse(course?._id as string)}
                      >
                        unlist
                      </div>
                    ) : (
                      <div
                        className="flex w-full h-fit text-green-400 justify-start items-center hover:bg-green-100 transition duration-300  px-2 py-1"
                        onClick={() => listCourse(course?._id as string)}
                      >
                        list
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
        <div className="flex w-full h-full p-5 justify-center items-end ">
          <Pagination
            postsPerPage={postPerPage}
            totalPosts={filteredCourseList?.length}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
        {isStudentOpen && (
          <div className="flex h-full w-full mt-5 ">
            <div className="w-full mx-10 h-full overflow-x-auto mb-10">
              <table className="w-full  text-sm text-center text-gray-500 dark:text-gray-400 border">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, idx) => (
                    <tr key={idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {idx + 1}
                      </th>
                      <td className="px-6 py-4">{student?.username}</td>
                      <td className="px-6 py-4">{student?.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorDashboard;