import { Review } from "../dtos/Review";
import { axiosAuthorized } from "./config";


interface ResponseData {
  message?: string;
  reviews?: Review[];
  deletedReview?: Review;
  newReview?: Review;
  updatedReview?: Review;
}


const getAllReviwes = async (courseId: string) => {
  try {
    const response = await axiosAuthorized.get(`/get/all/reviews/${courseId}`);
    const responseData = response.data as ResponseData;
    return Promise.resolve(responseData.reviews);
  } catch (error) {
    return Promise.reject(error);
  }
};

const postReview = async (courseId: string, review: string, rating: number) => {
  try {
    const response = await axiosAuthorized.post(`/post/review/${courseId}`,{review,rating});
    const responseData = response.data as ResponseData;
    return Promise.resolve(responseData.newReview);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateReview = async (reviewId: string, review:string, rating:number, course:string) => {
  try {
    const response = await axiosAuthorized.put(`/update/review/${reviewId}`,{course,review,rating});
    const responseData = response.data as ResponseData;
    return Promise.resolve(responseData.updatedReview);
  } catch (error) {
    return Promise.reject(error);
  }
}

const deleteReview = async (reviewId: string, course:string) => {
  try {
    const response = await axiosAuthorized.patch(`/delete/review/${reviewId}`,{course});
    const responseData = response.data as ResponseData;
    return Promise.resolve(responseData.deletedReview);
  } catch (error) {
    return Promise.reject(error);
  }
}

export {
  deleteReview,
  postReview,
  getAllReviwes,
  updateReview
}