import { User } from "./User";

export interface Chapter {
  title?: string;
  description?: string;
  url?: string | File;
}

export interface Course {
  _id?: string;
  tutor?: string | User;
  language?: string;
  coursename?: string;
  isPaid?: boolean;
  description?: string;
  status?: boolean|number;
  level?: string;
  price?: number;
  rating?: number;
  demoUrl?: string;
  chapters?: Chapter[];
  students?: string[];
  puchaseHistory?: [
    {
      studentId: string,
      date: Date,
      Month: number
    }
  ]
}
