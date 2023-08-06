import { Course } from "../dtos/Course";
import { axiosAuthorized, axiosInstance } from "./config";
import { setSelectedCourse } from "../redux/userSlice/userSlice";
import { store } from "../redux/store";

interface ResponseData {
  message?: string;
  course?: Course;
  courses?: Course[];
}

const postCourse = async (course: Course): Promise<Course | Error> => {
  try {
    const response = await axiosAuthorized.post("/tutor/post/course", course);
    return response as Course;
  } catch (error) {
    return Promise.reject(error);
  }
};

const upadteCourse = async (course: Course , _id:string): Promise<Course | Error> => {
  try {
    const response = await axiosAuthorized.put(`/tutor/update/course/${_id}`, course);
    return response as Course;
  } catch (error) {
    return Promise.reject(error);
  }
};

const getPopularCourses = async (): Promise<Course[] | Error> => {
  try {
    const response = await axiosInstance.get('/get/popular/courses');
    const responseData = response.data as ResponseData;
    return responseData.courses as Course[];
  } catch (error) {
    return Promise.reject(error);
  }
};

const getTutorCourses = async (id:string): Promise<Course[] | Error> => {
  try {
    const response = await axiosAuthorized.get(`/get/tutor/courses/${id}`);
    const responseData = response.data as ResponseData;
    return responseData.courses as Course[];
  } catch (error) {
    return Promise.reject(error);
  }
};

const getCourseById = async (id: string): Promise<Course | Error> => {
  try {
    const response = await axiosInstance.get(`/get/course/${id}`);
    const responseData = response.data as ResponseData;
    return responseData.course as Course;
  } catch (error) {
    return Promise.reject(error);
  }
};

const setStudentToCourse = async ( courseId: string,userId: string,): Promise<Course|null> => {
  try {
    const response = await axiosAuthorized.patch(`/set/selected/course`,{courseId,userId});
    const responseData = response.data as ResponseData;
    const course =  responseData.course as Course;
    if (course) {
      store.dispatch(setSelectedCourse(course));
      return Promise.resolve(course);
    }
    return null;
  } catch (error) {
    return Promise.reject(error);
  }
}

export { postCourse, getPopularCourses, getCourseById, getTutorCourses, upadteCourse,setStudentToCourse };