import { AxiosError } from "axios";
import { getCourseById, getPopularCourses } from "../api/courseApi";
import { Course } from "../dtos/Course";

export const getFullPopularCoruses = async (): Promise<Course[] | Error> => {
  try {
    const courses = (await getPopularCourses()) as Course[];
    return courses;
  } catch (error) {
    const err = error as AxiosError;
    return Promise.reject(err);
  }
};

export const getSelectedCourse = async(id: string): Promise<Course|null> => {
  try {
    const course = (await getCourseById(id)) as Course;
    return course;
  } catch (error) {
    const err = error as AxiosError;
    return Promise.reject(err);
  }
}