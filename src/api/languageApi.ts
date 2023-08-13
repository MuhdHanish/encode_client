import { Language } from "aws-sdk/clients/translate";
import { axiosAuthorized } from "./config";
import { AxiosError } from "axios";

interface ResponseData {
  message?: string;
  languages?: Language[];
  language?: Language;
}


const getLanguages = async (): Promise<Language[] | Error> => {
  try {
    const response = await axiosAuthorized.get("/get/languages");
    const responseData = response.data as ResponseData;
    if (!responseData.languages) {
      throw new Error("Languages not found in the response data.");
    }
    return Promise.resolve(responseData.languages);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getAdminLanguages = async (): Promise<Language[] | Error> => {
  try {
    const response = await axiosAuthorized.get("/get/languages");
    const responseData = response.data as ResponseData;
    if (!responseData.languages) {
      throw new Error("Languages not found in the response data.");
    }
    return Promise.resolve(responseData.languages);
  } catch (error) {
    return Promise.reject(error);
  }
};

const unListLangauge = async (id: string): Promise<Language | Error> => {
  try {
    const response = await axiosAuthorized.patch(
      `/admin/unlist/language/${id}`
    );
    const responseData = response.data as ResponseData;
    if (!responseData.language) {
      throw new Error(
        "Error on unlist language, not found in the response data."
      );
    }
    return Promise.resolve(responseData.language);
  } catch (error) {
    const err = error as AxiosError;
    return Promise.reject(err.response?.data);
  }
};

const listLangauge = async (id: string): Promise<Language | Error> => {
  try {
    const response = await axiosAuthorized.patch(`/admin/list/language/${id}`);
    const responseData = response.data as ResponseData;
    if (!responseData.language) {
      throw new Error(
        "Error on list language, not found in the response data."
      );
    }
    return Promise.resolve(responseData.language);
  } catch (error) {
    const err = error as AxiosError;
    return Promise.reject(err.response?.data);
  }
};

export { getLanguages , getAdminLanguages, unListLangauge, listLangauge};