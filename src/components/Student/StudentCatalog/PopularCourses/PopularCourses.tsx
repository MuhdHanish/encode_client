import React, {useState, useEffect} from 'react'
import { Course } from '../../../../dtos/Course';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCourse } from '../../../../redux/userSlice/userSlice';
import Pagination from '../../../Common/Pagination/Pagination';
import { RootState } from '../../../../redux/store';
import CourseFilterByPrice from '../../../Common/CourseFilterByPrice/CourseFilterByPrice';
import CourseFilterByLevel from '../../../Common/CourseFilterByLevel/CourseFilterByLevel';


interface PopularCoursesProps {
  courses: Course[];
  selectedLanguage: string | null;
}
const PopularCourses: React.FC<PopularCoursesProps> = ({ courses, selectedLanguage }) => {
  const [selectedOption, setSelectedOption] = useState<string>("option1");
  const [selectedLevel, setSelectedLevel] = useState<string>("option1");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredCourseList, setFilteredCourseList] = useState<Course[] | []>([]);
  useEffect(() => {
  const filteredList = courses.filter((course) => {
    const coursenameMatch = course?.coursename
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const descriptionMatch = course?.description
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const languageMatch = course?.language
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const selectedLanguageMatch = selectedLanguage ? course?.language?.toLowerCase() === selectedLanguage?.toLowerCase() : true;
    const courseTypeMatch =
      selectedOption ===  "option1" ||
      (selectedOption === "option2" && !course.isPaid) ||
      (selectedOption === "option3" &&  course.isPaid);

    const levelMatch =
      selectedLevel === "option1" ||
      (selectedLevel === "option2" && course.level === "Beginner") ||
      (selectedLevel === "option3" && course.level === "Intermediate") ||
      (selectedLevel === "option4" && course.level === "Expert");

    return (
      (coursenameMatch || descriptionMatch || languageMatch) &&
      courseTypeMatch &&
      selectedLanguageMatch &&
      levelMatch
    );
  });
  setFilteredCourseList(filteredList);
  }, [searchQuery, courses, selectedOption, selectedLevel, selectedLanguage]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postPerPage = 8;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const [currentPosts, setCurrentPosts] = useState<Course[] | []>([]);
  const user = useSelector((state: RootState) => state.userReducer.user);
  useEffect(() => {
    setCurrentPosts(filteredCourseList.slice(firstPostIndex, lastPostIndex));
  }, [filteredCourseList, firstPostIndex, lastPostIndex]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <div className="w-full h-fit justify-start flex  px-5  ">
        <div className="flex w-full font-medium text-[15px] items-center  gap-3 flex-col md:flex-row ">
          <div className="flex w-full h-fit gap-3">
            <CourseFilterByPrice setSelectedOption={setSelectedOption} selectedOption={selectedOption} />
            <CourseFilterByLevel setSelectedLevel={setSelectedLevel} selectedLevel={selectedLevel} />
          </div>
          <div className="flex w-full h-fit bg-white ">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="search"
              className="appearance-none bg-white border w-full border-gray-300  text-[14px] rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap px-5 gap-5 md:gap-10 ">
        {currentPosts.length > 0 ? (
          currentPosts?.map((course) => (
            <div
              key={course._id}
              className="flex w-full md:w-[271px] hover:bg-black delay-100 border rounded hover:border-black"
            >
              <div
                onClick={() => {
                  dispatch(setSelectedCourse(course)),
                  navigate(`/course/${course._id as string}`);
                }}
                className="w-full md:w-[271px]  border-black cursor-pointer bg-white hover:translate-x-1.5 hover:-translate-y-1.5 transition duration-300 border rounded "
              >
                <div className="flex  flex-col justify-between h-full p-3 gap-2">
                  <div
                    className={`text-[12px]  rounded-sm p-1 ${
                      course.students?.includes(user?._id as string)
                        ? "bg-green-200"
                        : "bg-purple-200"
                    }`}
                  >
                    {course.students?.includes(user?._id as string) ? (
                        <span className="flex items-center justify-between">
                          <span>{course.isPaid ? "Paid course" : "Free course"}</span>
                          <span>In progress . . .</span>
                        </span> 
                    ) : (
                      <span className="flex items-center justify-between">
                        {course.isPaid ? "Paid Course" : "Free Course"}
                      </span>
                    )}
                  </div>
                  <div className="text-[15px] font-semibold p-1">
                    {course.coursename}
                  </div>
                  <div className="text-[11px] overflow-hidden whitespace-normal p-1 line-clamp-3 text-gray-500">
                    {course.description}
                  </div>
                  <div className="text-[12px] border-t border-gray-500 border-dotted p-1 flex justify-between items-center gap-2 text-gray-500">
                    <span>{course.language}</span>
                    {(course.rating as number) > 0 && (
                      <div className="flex gap-2">
                        <span>{course.rating}</span>
                        <span>Rating</span>
                      </div>
                    )}
                  </div>
                  <div className="text-[12px] border-t border-gray-500 border-dotted p-1 flex items-center gap-2 justify-between text-gray-500">
                    <span>{course?.level as string}</span>
                    {(course.chapters?.length as number) > 0 && (
                      <span>
                        {course.chapters?.length}{" "}
                        {course.chapters?.length === 1 ? "Chapter" : "Chapters"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <span>No course found !</span>
        )}
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
  );
}

export default PopularCourses