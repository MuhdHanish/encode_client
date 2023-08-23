import { Course } from "./Course";
import { User } from "./User";

export interface Review {
  course?: string | Course;
  user?: string | User;
  review?: string;
  rating?: number;
}
