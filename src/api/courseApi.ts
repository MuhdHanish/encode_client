import { Course } from "../dtos/Course";
import { axiosAuthorized } from "./config";
import { setSelectedCourse } from "../redux/userSlice/userSlice";
import { store } from "../redux/store";
import { User } from "../dtos/User";

interface ResponseData {
  message?: string;
  course?: Course;
  students?: User[];
  courses?: Course[];
  data?: { _id: string; total: number }[];
}

const postCourse = async (course: Course): Promise<Course | Error> => {
  try {
    const response = await axiosAuthorized.post("/tutor/post/course", course);
    return response as Course;
  } catch (error) {
   return Promise.reject(error);
  }
};

const getCourseStudents = async (courseId: string): Promise<User[] | Error> => {
  try {
    const response = await axiosAuthorized.get(`/tutor/get/course/students/${courseId}`) ;
    const responseData = response.data as ResponseData;
    return responseData.students as User[];
  } catch (error) {
    return Promise.reject(error);
  }
}

const getStudentCourses = async (): Promise<Course[] | Error> => {
  try {
    const response = await axiosAuthorized.get(
      `/get/student/courses`
    );
    const responseData = response.data as ResponseData;
    return responseData.courses as Course[];
  } catch (error) {
    return Promise.reject(error);
  }
}

const getCourseDetailsAdmin = async (): Promise<{ _id: string, total: number }[] | []> => {
  try {
    const response = await axiosAuthorized.get("/admin/get/course/data/dashboard");
    const data = response.data as ResponseData
    return data.data as { _id: string; total: number }[];
  } catch (error) {
    return Promise.reject(error);
  }
}

const getCourseDetailsTutor = async (tutorId:string): Promise<{ _id: string, total: number }[] | []> => {
  try {
    const response = await axiosAuthorized.get(`/get/tutor/course/data/dashboard/${tutorId}`);
     const data = response.data as ResponseData;
     return data.data as { _id: string; total: number }[];
  } catch (error) {
   return Promise.reject(error);
  }
}

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
    const response = await  axiosAuthorized.get('/get/popular/courses');
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

const getTutorPopularCourses = async (id:string): Promise<Course[] | Error> => {
  try {
    const response = await axiosAuthorized.get(`/get/tutor/popular/courses/${id}`);
    const responseData = response.data as ResponseData;
    return responseData.courses as Course[];
  } catch (error) {
    return Promise.reject(error);
  }
};

const getCourseById = async (id: string): Promise<Course | Error> => {
  try {
    const response = await axiosAuthorized.get(`/get/course/${id}`);
    const responseData = response.data as ResponseData;
    return responseData.course as Course;
  } catch (error) {
    return Promise.reject(error);
  }
};

const setStudentToCourse = async ( courseId: string ): Promise<Course|null> => {
  try {
    const response = await axiosAuthorized.patch(`/set/selected/course/${courseId}`);
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

const getCourses = async (): Promise<Course[] | Error> => {
  try {
    const response = await axiosAuthorized.get("/get/courses");
    const { courses } = response.data as ResponseData;
    return Promise.resolve(courses as Course[]);
  } catch (error) {
     return Promise.reject(error);
  }
};

const unListCourse = async (courseId:string): Promise<Course | Error> => {
  try {
    const response = await axiosAuthorized.patch(`/tutor/unlist/course/${courseId}`);
    const { course } = response.data as ResponseData;
    return Promise.resolve(course as Course);
  } catch (error) {
    return Promise.reject(error);
  }
};

const listCourse = async (courseId:string): Promise<Course | Error> => {
  try {
    const response = await axiosAuthorized.patch(`/tutor/list/course/${courseId}`);
    const { course } = response.data as ResponseData;
    return Promise.resolve(course as Course);
  } catch (error) {
    return Promise.reject(error);
  }
};

const removeStudentCoruse = async(courseId:string): Promise<Course|Error> =>{
  try {
    const response = await axiosAuthorized.patch(`/remove/student/course/${courseId}`);
    const { course } = response.data as ResponseData;
    return Promise.resolve(course as Course);
  } catch (error) {
    return Promise.reject(error);
  }
}


export {
  postCourse, getPopularCourses, getCourseById, getTutorCourses,
  upadteCourse, setStudentToCourse, getCourses, listCourse, unListCourse,removeStudentCoruse,
  getCourseDetailsAdmin,getCourseDetailsTutor,getTutorPopularCourses, getCourseStudents,getStudentCourses
};