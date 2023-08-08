
import { axiosAuthorized } from "./config";

interface ResponseData {
  message?: string;
  languages?: [
    {
      _id?:string;
      languagename?: string;
      description?: string;
    }
  ];
}

const getLanguages = async (): Promise<
  | [
      {
        _id?: string;
        languagename?: string;
        description?: string;
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

export { getLanguages , getAdminLanguages};