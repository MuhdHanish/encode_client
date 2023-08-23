import { deleteReview, getAllReviwes, postReview, updateReview } from "../api/reviewApi";
import { Review } from "../dtos/Review";


export const getFullReviews = async (courseId:string): Promise<Review[] | Error> => {
  try {
    const reviews = (await getAllReviwes(courseId)) as Review[];
    return Promise.resolve(reviews);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const postTheReview = async (courseId: string, review: string, rating: number): Promise<Review | null> => {
  try {
    const newReview = (await postReview(courseId, review, rating)) as Review;
    return Promise.resolve(newReview);
  } catch (error) {
    return Promise.reject(error);
  }
}

export const updateTheReview = async (reviewId: string, review: string, rating: number, course: string):Promise<Review | null> => {
  try {
    const updatedReview = (await updateReview(reviewId,review,rating,course)) as Review;
    return Promise.resolve(updatedReview);
  } catch (error) {
    return Promise.reject(error);
  }
}

export const deleteTheReview = async(reviewId:string, course:string): Promise<Review | null> => {
  try {
    const deletedReview = (await deleteReview(reviewId,course)) as Review;
    return Promise.resolve(deletedReview);
  } catch (error) {
    return Promise.reject(error);
  }
}