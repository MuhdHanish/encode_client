export interface User {
  _id: string;
  username: string;
  email: string;
  profile: string;
  role: string;
  seletedCourses?: string[];
  uploadedCourses?: string[];
}