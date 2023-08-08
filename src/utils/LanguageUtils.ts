import { AxiosError } from "axios";
import { getAdminLanguages, getLanguages, } from "../api/languageApi";

export const getFullLanguages = async (): Promise<[{ _id?: string, languagename?:string,description?:string}]|Error> => {
  try {
    const languages = (await getLanguages()) as [
      {
        _id?: string;
        languagename?: string;
        description?: string;
      }
    ];
    return Promise.resolve(languages); 
  } catch (error) {
    const err = error as AxiosError;
    return Promise.reject(err);
  }
};

export const getAdLanguages = async (): Promise<[{ _id?: string, languagename?:string,description?:string}]|Error> => {
  try {
    const languages = (await getAdminLanguages()) as [
      {
        _id?: string;
        languagename?: string;
        description?: string;
      }
    ];
    return Promise.resolve(languages); 
  } catch (error) {
    const err = error as AxiosError;
    return Promise.reject(err);
  }
};
