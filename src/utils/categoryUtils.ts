import { AxiosError } from "axios";
import { getCategories } from "../api/categoryApi";


export const getCategoryName = async (): Promise<string[]|Error> => {
  try {
    const categories = (await getCategories()) as [
      {
        _id?: string;
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

export const getFullCategories = async (): Promise<[{ _id?: string, categoryname?:string,description?:string}]|Error> => {
  try {
    const categories = (await getCategories()) as [
      {
        _id?: string;
        categoryname?: string;
        description?: string;
      }
    ];
    return Promise.resolve(categories); 
  } catch (error) {
    const err = error as AxiosError;
    return Promise.reject(err);
  }
};
