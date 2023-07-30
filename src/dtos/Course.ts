export interface Course {
  _id?: string;
  tutorId?: string;
  category?: string;
  coursename?: string;
  isPaid?: boolean;
  description?: string;
  level?: string;
  price?: number;
  videos?: string[];
}
