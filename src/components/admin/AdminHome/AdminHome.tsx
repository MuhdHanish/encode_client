import React, { useEffect, useState, useCallback } from "react";
import { RiRotateLockLine } from "react-icons/ri";
import StudentCount from "./UserCount/StudentCount";
import TutorCount from "./UserCount/TutorCount";
import CourseCount from "./CourseCount/CourseCount";
import LanguageCount from "./LanguageCount/LanguageCount";
import { Course } from "../../../dtos/Course";
import { User } from "../../../dtos/User";
import {
  getCourseDetailsDashborad,
  getFullPopularCoruses,
} from "../../../utils/courseUtils";
import { Bar } from "react-chartjs-2"; // Import Bar component
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { getFullLanguages } from "../../../utils/LanguageUtils";
import { getFullUsers } from "../../../utils/userUtils";

ChartJS.register(BarElement, CategoryScale, LinearScale, PointElement);

const AdminHome: React.FC = () => {
  const [courses, setCourses] = useState<Course[] | []>([]);
  const [students, setStudents] = useState<User[] | []>([]);
  const [languages, setLanguages] = useState<
    [{ _id?: string; languagename?: string; description?: string }]
  |[]>([]);
  const [tutors, setTutors] = useState<User[] | []>([]);
  const [chartData, setChartData] = useState<
    { _id: string; total: string }[] | []
  >([]);

  const fetchDatas = useCallback(() => {
      getFullUsers()
        .then((res) => {
          if (res) {
            const studentUsers = res.filter((user) => user.role === "student");
            const tutorUsers = res.filter((user) => user.role === "tutor");
            setStudents(studentUsers);
            setTutors(tutorUsers);
          }
        })
        .catch((error) => {
          console.log(error);
        });

      getFullPopularCoruses()
        .then((res) => {
          if (res) {
            setCourses(res as Course[]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      getCourseDetailsDashborad()
        .then((res) => {
          if (res) {
            setChartData(res as { _id: string; total: string }[]);
          }
        })
        .catch((error) => {
            console.log(error);
        });
      getFullLanguages().then((res) => {
        if (res) { setLanguages(
          res as [{ _id?: string; languagename?: string; description?: string }]
        ); }
      }).catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    fetchDatas();
  }, [fetchDatas]);
const barData = {
  labels: [...chartData.map((obj) => obj._id)],
  datasets: [
    {
      label: "Revenue",
      data: [...chartData.map((obj) => obj.total)],
      backgroundColor: "#9C4DF4",
      borderColor: "#9C4DF4",
      borderWidth: 0,
      barPercentage: 0.3,
      categoryPercentage: 0.8,
    },
  ],
};

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

  return (
    <div className="flex flex-col w-full p-5 gap-5 overflow-x-hidden">
      <div className="flex w-full h-fit justify-start items-center text-2xl font-bold gap-2">
        <div>Dashboard</div>{" "}
        <span>
          <RiRotateLockLine style={{ fontSize: "20px" }} />
        </span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
        <StudentCount list={students} />
        <TutorCount list={tutors} />
        <CourseCount list={courses} />
        <LanguageCount
          list={
            languages as [
              { _id?: string; languagename?: string; description?: string }
            ]
          }
        />
      </div>
      <div className="grid md:grid-cols-3 w-full">
        <div className="col-span-1 w-fit h-fit px-5 flex flex-col flex-wrap">
          <div className="flex w-full h-fit p-3 justify-start text-[15px] font-bold">
            Popular coruses
          </div>
          <div className="flex w-full h-fit flex-col gap-5  p-2 text-[14px] flex-wrap overflow-y-auto">
            {courses.slice(0, 3).map((course, idx) => (
              <div
                className="flex flex-col w-full h-fit border p-5 justify-center items-start gap-1 hover:shadow-xl hover:border-primary hover:translate-x-1 hover:-translate-y-1 transition duration-300"
                key={idx}
              >
                <div className="flex w-full h-fit">{course.coursename}</div>
                <div className="flex w-full h-fit gap-2 text-[12px]">
                  <span>{course.language}</span>|
                  <span>{course.chapters?.length} chapters</span>
                </div>
                <div className="flex text-[12px]">
                  {(course.description?.slice(0, 50) as string) + ". . "}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2 w-full h-full hidden lg:flex ">
          <Bar style={{ width: "80%" }} data={barData} options={options} />
        </div>
        <div className=" w-full h-full p-5 flex lg:hidden">
          <Bar style={{ width: "100%" }} data={barData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
