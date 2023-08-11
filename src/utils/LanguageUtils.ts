import {
  getAdminLanguages,
  getLanguages,
  listLangauge,
  unListLangauge,
} from "../api/languageApi";
import { apiError } from "../api/ApiInterface";

export const getFullLanguages = async (): Promise<
  [{ _id?: string; languagename?: string; description?: string }] | Error
> => {
  try {
    const languages = (await getLanguages()) as [
      {
        _id?: string;
        languagename?: string;
        description?: string;
        status?: boolean;
      }
    ];
    return Promise.resolve(languages);
  } catch (error) {
    const err = error as apiError;
    return Promise.reject(err.message);
  }
};

export const getAdLanguages = async (): Promise<
  [{ _id?: string; languagename?: string; description?: string }] | Error
> => {
  try {
    const languages = (await getAdminLanguages()) as [
      {
        _id?: string;
        languagename?: string;
        description?: string;
        status?: boolean;
      }
    ];
    return Promise.resolve(languages);
  } catch (error) {
    const err = error as apiError;
    return Promise.reject(err.message);
  }
};

export const listTheLanguage = async (
  languageId: string
): Promise<{
  _id?: string;
  languagename?: string;
  description?: string;
  status?: boolean;
} | null> => {
  try {
    const language = (await listLangauge(languageId)) as {
      _id?: string;
      languagename?: string;
      description?: string;
      status?: boolean;
    };
    return language;
  } catch (error) {
   const err = error as apiError;
   return Promise.reject(err.message);
  }
};

export const unlistTheLanguage = async (
  languageId: string
): Promise<{
  _id?: string;
  languagename?: string;
  description?: string;
  status?: boolean;
} | null> => {
  try {
    const language = (await unListLangauge(languageId)) as {
      _id?: string;
      languagename?: string;
      description?: string;
      status?: boolean;
    };
    return language;
  } catch (error) {
    const err = error as apiError
    return Promise.reject(err.message);
  }
};
