import { Course } from "../dtos/Course";
import { axiosAuthorized, axiosInstance } from "./config";

interface ResponseData {
  message?: string;
  course?: Course;
  courses?: Course[];
}

const postCourse = async (course: Course): Promise<Course | Error> => {
  try {
    console.log(course)
    const response = await axiosAuthorized.post("/tutor/post/course", course);
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

const getCourseById = async (id: string): Promise<Course | Error> => {
  try {
    const response = await axiosInstance.get(`/get/course/${id}`);
    const responseData = response.data as ResponseData;
    return responseData.course as Course;
  } catch (error) {
    return Promise.reject(error);
  }
};

export { postCourse, getPopularCourses, getCourseById };