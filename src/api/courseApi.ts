import { Course } from "../dtos/Course";
import { axiosAuthorized } from "./config";

const postCourse = async (course: Course): Promise<Course|Error> => {
  try {
    const response = await axiosAuthorized.post("/tutor/post/course",course);
    return response as Course;
  } catch (error) {
     return Promise.reject(error);
  }
}

export { postCourse };