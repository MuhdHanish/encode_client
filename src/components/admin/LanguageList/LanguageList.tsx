import React, { useEffect, useState, useCallback } from "react";
import {
  getAdLanguages,
  listTheLanguage,
  unlistTheLanguage,
} from "../../../utils/LanguageUtils";
import { LanguageCard } from "../../Common/CardCompnent/CardCompoent";
import Pagination from "../../Common/Pagination/Pagination";

const LanguageList: React.FC = () => {
  const [languages, setLanguages] = useState<
    | {
        _id?: string;
        languagename?: string;
        description?: string;
        status?: boolean;
      }[]
    | []
  >([]);
  const [filteredLangugeList, setFilteredLanguageList] = useState<
    | {
        _id?: string;
        languagename?: string;
        description?: string;
        status?: boolean;
      }[]
    | []
    >([]);
  const [selectedOption, setSelectedOption] = useState<string>("option1");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const fetchLanguages = useCallback(() => {
    getAdLanguages()
      .then((res) => {
        setLanguages(
          res as {
            _id?: string;
            languagename?: string;
            description?: string;
            status?: boolean;
          }[]
        );
      })
      .catch((err) => console.log(err));
  }, []);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postPerPage = 4;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const [currentPosts,setCurrentPosts] = useState< {
        _id?: string;
        languagename?: string;
        description?: string;
        status?: boolean;
      }[]|[]>([])
  useEffect(() => {
    setCurrentPosts(filteredLangugeList.slice(firstPostIndex, lastPostIndex)); 
  },[filteredLangugeList, firstPostIndex, lastPostIndex])
  useEffect(() => {
    fetchLanguages();
  }, [fetchLanguages]);
  const unListLanguage = (id: string) => {
    unlistTheLanguage(id)
      .then((res) => {
        if (res) fetchLanguages();
        return;
      })
      .catch((err) => console.log(err));
  };
  const listLanguage = (id: string) => {
    listTheLanguage(id)
      .then((res) => {
        if (res) fetchLanguages();
        return;
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const filteredList = languages.filter((language) => {
      const languagenameMatch = language.languagename
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const descriptionMatch = language.description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      if (selectedOption === "option2") {
        return (languagenameMatch || descriptionMatch) && language.status === false;
      } else if (selectedOption === "option3") {
        return (descriptionMatch || languagenameMatch) && language.status === true;
      } else {
        return descriptionMatch || languagenameMatch; 
      }
    });
    setFilteredLanguageList(filteredList);
  }, [searchQuery, languages, selectedOption]);
  return (
    <div className="w-full h-full flex flex-col  overflow-x-hidden">
      <div className="flex w-full h-fit justify-between items-center p-5 ">
        <div className="flex w-fit h-fit bg-white ">
          <select
            className="appearance-none bg-white border border-gray-300 rounded py-2 px-4  text-gray-700 leading-tight focus:outline-none focus:border-primary"
            name="userStatus"
            id="userStatus"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="option1">All Languages</option>
            <option value="option2">UnListed</option>
            <option value="option3">Listed</option>
          </select>
        </div>
        <div className="flex w-fit h-fit bg-white">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search"
            className="appearance-none bg-white border border-gray-300 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full  p-5 ">
        {currentPosts?.map((language, idx) => (
          <LanguageCard
            key={idx}
            language={language}
            list={listLanguage}
            unList={unListLanguage}
          />
        ))}
      </div>
      <div className="flex w-full h-full p-5 justify-center items-end ">
        <Pagination
          postsPerPage={postPerPage}
          totalPosts={filteredLangugeList?.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default LanguageList;
