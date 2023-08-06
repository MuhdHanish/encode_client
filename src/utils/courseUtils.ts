import { AxiosError } from "axios";
import { getCourseById, getPopularCourses, getTutorCourses, postCourse, upadteCourse } from "../api/courseApi";
import { setStudentToCourse } from "../api/courseApi";
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

export const postFullCourse = async (course:Course): Promise<Course | Error> => {
  try {
    const courses = await postCourse(course);
    return courses;
  } catch (error) {
    const err = error as AxiosError;
    return Promise.reject(err);
  }
};

export const upadteCourseDetails = async (course:Course, _id:string): Promise<Course | Error> => {
  try {
    const courses = await upadteCourse(course, _id);
    return courses;
  } catch (error) {
    const err = error as AxiosError;
    return Promise.reject(err);
  }
};

export const getTutorCourse = async (id: string): Promise<Course[] | null> => {
  try {
    const courses = (await getTutorCourses(id)) as Course[];
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

export const setCourse = async (courseId: string, userId: string,): Promise<Course | null> => {
  try {
    const course = (await setStudentToCourse(courseId, userId)) as Course;
    return course;
  } catch (error) {
    const err = error as AxiosError;
    return Promise.reject(err);
  }
}