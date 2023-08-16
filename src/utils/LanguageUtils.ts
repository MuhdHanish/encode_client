import {
  editLanguage,
  getAdminLanguages,
  getLanguages,
  listLangauge,
  postLanguage,
  unListLangauge,
} from "../api/languageApi";
import { apiError } from "../api/ApiInterface";
import { Language } from "../dtos/Language";

export const getFullLanguages = async (): Promise<Language[] | Error> => {
  try {
    const languages = (await getLanguages()) as Language[];
    return Promise.resolve(languages);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addLanguage = async (languageData:Language): Promise<Language | Error> => {
  try {
    const language = (await postLanguage(languageData)) as Language;
    return Promise.resolve(language);
  } catch (error) {
   const err = error as apiError;
   return Promise.reject(err.message);
  }
};

export const upldateLangugaeg = async (languageData: Language, id: string): Promise<Language | Error> => {
  try {
    const language = (await editLanguage(languageData,id)) as Language;
    return Promise.resolve(language);
  } catch (error) {
    const err = error as apiError;
    return Promise.reject(err.message);
  }
}

export const getAdLanguages = async (): Promise<Language[] | Error> => {
  try {
    const languages = (await getAdminLanguages()) as Language[];
    return Promise.resolve(languages);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const listTheLanguage = async (
  languageId: string
): Promise<Language | Error> => {
  try {
    const language = (await listLangauge(languageId)) as Language;
    return language;
  } catch (error) {
    const err = error as apiError;
    return Promise.reject(err.message);
  }
};

export const unlistTheLanguage = async (
  languageId: string
): Promise<Language | Error> => {
  try {
    const language = (await unListLangauge(languageId)) as Language;
    return language;
  } catch (error) {
    const err = error as apiError;
    return Promise.reject(err.message);
  }
};
