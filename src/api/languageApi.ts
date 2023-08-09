
import { axiosAuthorized } from "./config";

interface ResponseData {
  message?: string;
  languages?: [
    {
      _id?: string;
      languagename?: string;
      description?: string;
      status?: boolean;
    }
  ];
  language?: {
    _id?: string;
    languagename?: string;
    description?: string;
    status?: boolean;
  };
}

const getLanguages = async (): Promise<
  | [
      {
        _id?: string;
        languagename?: string;
        description?: string;
        status?: boolean;
      }
    ]
  | Error
> => {
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

const getAdminLanguages = async (): Promise<
  | [
      {
        _id?: string;
        languagename?: string;
        description?: string;
        status?: boolean;
      }
    ]
  | Error
> => {
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

const unListLangauge = async (
  id: string
): Promise<
  | 
      {
        _id?: string;
        languagename?: string;
        description?: string;
        status?: boolean;
      }
    
  | Error
  > => {
  try {
    const response = await axiosAuthorized.patch(`/admin/unlist/language/${id}`);
    const responseData = response.data as ResponseData;
    if (!responseData.language) {
      throw new Error("Error on unlist language, not found in the response data.");
    }
    return Promise.resolve(responseData.language);
  } catch (error) {
    return Promise.reject(error);
  }
};

const listLangauge = async (
  id: string
): Promise<
  | 
      {
        _id?: string;
        languagename?: string;
        description?: string;
        status?: boolean;
      }
    
  | Error
  > => {
  try {
    const response = await axiosAuthorized.patch(`/admin/list/language/${id}`);
    const responseData = response.data as ResponseData;
    if (!responseData.language) {
      throw new Error("Error on list language, not found in the response data.");
    }
    return Promise.resolve(responseData.language);
  } catch (error) {
    return Promise.reject(error);
  }
};

export { getLanguages , getAdminLanguages, unListLangauge, listLangauge};