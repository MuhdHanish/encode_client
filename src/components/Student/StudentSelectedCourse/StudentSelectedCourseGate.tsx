import React, { useState, useCallback, useEffect } from 'react';
import { getSelectedCourse } from '../../../utils/courseUtils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Course } from '../../../dtos/Course';
import FirstBox from './FirstBox/FirstBox';
import CourseDetails from './CourseDetails/CourseDetails';

const StudentSelectedCourseGate: React.FC = () => {

  const dispatch = useDispatch();
  const [course, setSelectedCourse] = useState<Course | null>(null);
  const selectedCourseId = useSelector((state: RootState) => state.userReducer.selectedCourseId);
  const setCourseDetails = useCallback(() => {
    getSelectedCourse(selectedCourseId as string)
      .then((res) => {
        setSelectedCourse(res as Course);
      })
      .catch((err) => console.log(err));
  }, [selectedCourseId]);
  useEffect(() => {
    setCourseDetails();
  }
  , [setCourseDetails,dispatch]);
  
  return (
    <div className="bg-white w-full  h-full flex justify-center items-center overflow-x-hidden overflow-y-auto  relative ">
      <div className="w-full h-full flex flex-col gap-7 p-10 md:p-20 justify-center items-center">
        <CourseDetails course={course as Course} />
        <FirstBox course={course as Course} />
        <div className="flex flex-col md:flex-row justify-around items-center w-full   h-fit gap-10 ">
          <div className="flex h-fit w-full md:w-1/2  bg-white border  shadow-lg p-5 text-medium">

          </div>
          <div className="flex h-fit w-full md:w-1/2  bg-white border  shadow-lg p-10 text-medium">

          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentSelectedCourseGate