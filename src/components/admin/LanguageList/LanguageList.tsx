import React, { useEffect, useState, useCallback } from "react";
import { getAdLanguages } from "../../../utils/LanguageUtils";
import { LanguageCard } from "../../Common/CardCompnent/CardCompoent";

const LanguageList: React.FC = () => {
  
  const [languages, setLanguages] = useState<
    {
      _id?: string;
      languagename?: string;
      description?: string;
    }[] | []>([]);
  
  const [filteredLangugeList, setFilteredLanguageList] = useState<
    | {
        _id?: string;
        languagename?: string;
        description?: string;
    }[] | []>([]);
  
  const [searchQuery, setSearchQuery] = useState<string>("");
  const fetchCourses = useCallback(() => {
    getAdLanguages()
      .then((res) => {
        setLanguages(
          res as {
            _id?: string;
            languagename?: string;
            description?: string;
          }[]
        );
      })
      .catch((err) => console.log(err));
  }, []);


  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    const filteredList = languages.filter((language) => {
      const languagenameMatch = language.languagename
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const descriptionMatch = language.description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      return languagenameMatch || descriptionMatch;
    });
    setFilteredLanguageList(filteredList);
  }, [searchQuery, languages]);


  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-white relative overflow-hidden">
      <div className="flex w-full p-5 h-fit justify-between items-center ">
        <div className="flex w-full h-full justify-end">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search"
            className="appearance-none bg-white border border-gray-300 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary"
          />
        </div>
      </div>
      <div className="flex h-full w-full flex-wrap p-2 justify-start items-start overflow-scroll">
        {filteredLangugeList.map((language, idx) => (
          <div className="flex w-fit" key={idx}>
            <LanguageCard language={language} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageList;
