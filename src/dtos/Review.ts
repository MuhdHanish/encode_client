import { Course } from "./Course";
import { User } from "./User";

export interface Review {
  _id?: string;
  course?: string | Course;
  user?: string | User;
  review?: string;
  rating?: number;
}
