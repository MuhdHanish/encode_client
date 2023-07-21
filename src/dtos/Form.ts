export interface FormValues {
  credential?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: string;
  coursename?: string;
  shortDescription?: string;
  description?: string,
  category?: string;
  isPaid?: boolean;
  price?: number;
  level?: string;
  imgUrl?: string;
  videoUrl?: string;
  sylabus?: [{ session: string, descritption: string }];
  assignments?: [{question:string,rightAns:string,options:string[]}]
}