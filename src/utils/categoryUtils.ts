import { AxiosError } from "axios";
import { getCategories } from "../api/categoryApi";

export const getCategoryName = async (): Promise<string[]|Error> => {
  try {
    const categories = (await getCategories()) as [
      {
        categoryname?: string;
        description?: string;
      }
    ];

      const list = categories.map((category) => category.categoryname) as string[];
      return Promise.resolve(list) 
    
  } catch (error) {
    const err = error as AxiosError;
    return Promise.reject(err);
  }
};
