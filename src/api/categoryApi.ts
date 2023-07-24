
import { axiosInstance } from "./config";

interface ResponseData {
  message?: string;
  categories?: [
    {
      _id?:string;
      categoryname?: string;
      description?: string;
    }
  ];
}

const getCategories = async (): Promise<
  | [
      {
        _id?: string;
        categoryname?: string;
        description?: string;
      }
    ]
  | Error
> => {
  try {
    const response = await axiosInstance.get("/get/categories");
    const responseData = response.data as ResponseData;
    if (!responseData.categories) {
      throw new Error("Categories not found in the response data.");
    }
    return Promise.resolve(responseData.categories);
  } catch (error) {
    return Promise.reject(error);
  }
};

export { getCategories };