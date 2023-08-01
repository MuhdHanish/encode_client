export interface Course {
  _id?: string;
  tutorId?: string;
  language?: string;
  coursename?: string;
  isPaid?: boolean;
  description?: string;
  level?: string;
  price?: number;
  rating?: number;
  videos?: string[];
}
