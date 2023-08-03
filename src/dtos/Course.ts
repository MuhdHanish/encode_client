import { User } from "./User";

export interface Tutorial {
  title: string;
  description: string;
  url: string;
}

export interface Course {
  _id?: string;
  tutor?: string | User;
  language?: string;
  coursename?: string;
  isPaid?: boolean;
  description?: string;
  level?: string;
  price?: number;
  rating?: number;
  overview?: string;
  tutorial?: [Tutorial];
}
