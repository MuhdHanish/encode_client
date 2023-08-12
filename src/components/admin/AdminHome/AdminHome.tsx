import React, { useEffect, useState, useCallback } from "react";
import { RiRotateLockLine } from "react-icons/ri";
import StudentCount from "./UserCount/StudentCount";
import TutorCount from "./UserCount/TutorCount";
import CourseCount from "./CourseCount/CourseCount";
import LanguageCount from "./LanguageCount/LanguageCount";
import { Course } from "../../../dtos/Course";
import { User } from "../../../dtos/User";
import { getFullUsers } from "../../../utils/userUtils";
import {
  getCourseDetailsDashborad,
  getFullCoruses,
} from "../../../utils/courseUtils";
import { Line } from "react-chartjs-2"; // Import Bar component
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { getFullLanguages } from "../../../utils/LanguageUtils";

ChartJS.register(LineElement,CategoryScale, LinearScale, PointElement);

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

      getFullCoruses()
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
      tension:0.4
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
    <div className="flex flex-col w-full p-5 gap-10 overflow-x-hidden">
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
      <div className="grid md:grid-cols-3">
        <div className="col-span-1 w-full h-full p-5 flex flex-col flex-wrap">
          <div className="flex w-full h-fit p-3 justify-center text-[15px]">
            Newly added coruses
          </div>
          <div className="flex w-full h-fit flex-col gap-5  p-3 text-[14px] flex-wrap overflow-y-auto">
            {courses.map((course, idx) => (
              <div className="flex items-center gap-2" key={idx}>
                <div className="flex w-[5px] h-[5px] bg-primary rounded-full"></div>{" "}
                {course.coursename} | {course.language} | {course.rating} rating
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2 w-full h-full p-5 hidden lg:flex">
          <Line style={{ width: "80%" }} data={lineData} options={options} />
        </div>
        <div className=" w-full h-full p-5 flex lg:hidden">
          <Line style={{ width: "100%" }} data={lineData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
