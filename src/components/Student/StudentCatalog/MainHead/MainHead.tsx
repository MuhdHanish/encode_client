import React, {  useRef, useMemo, useCallback } from "react";
import {
  BsArrowRightShort,
  BsArrowLeftSquare,
  BsArrowRightSquare,
} from "react-icons/bs";
import { HiOutlineTrendingUp } from "react-icons/hi";
import { Language } from "../../../../dtos/Language";

interface MainHeadProps {
  isMedium: boolean;
  setIsMedium: () => void;
  languages: Language[];
}

const MainHead: React.FC<MainHeadProps> = ({ isMedium, setIsMedium, languages }) => {
  
  const cardContainerRef = useRef<HTMLDivElement>(null);
   const bgImgArr = useMemo(
     () => [
       "https://static-assets.codecademy.com/assets/components/cards/explore-category-card/language/python.svg",
       "https://static-assets.codecademy.com/assets/components/cards/explore-category-card/language/javascript.svg",
       "https://static-assets.codecademy.com/assets/components/cards/explore-category-card/language/html-css.svg",
       "https://static-assets.codecademy.com/assets/components/cards/explore-category-card/subject/web-development.svg",
       "https://static-assets.codecademy.com/assets/components/cards/explore-category-card/language/c-plus-plus.svg",
       "https://static-assets.codecademy.com/assets/components/cards/explore-category-card/language/java.svg",
       "https://static-assets.codecademy.com/assets/components/cards/explore-category-card/language/sql.svg",
       "https://static-assets.codecademy.com/assets/components/cards/explore-category-card/subject/cybersecurity.svg",
       "https://static-assets.codecademy.com/assets/components/cards/explore-category-card/subject/data-science.svg",
       "https://static-assets.codecademy.com/assets/components/cards/explore-category-card/language/c-sharp.svg",
     ],
     []
    );
   const getRandomImageUrl = useCallback(() => {
     const randomIndex = Math.floor(Math.random() * bgImgArr.length);
     return bgImgArr[randomIndex];
    }, [bgImgArr]);
    const smoothScroll = (
    element: HTMLElement,
    distance: number,
    direction: "left" | "right"
    ) => {
    const step = 50;
    let currentScroll = element.scrollLeft;
    const targetScroll = currentScroll + distance;
    const animateScroll = () => {
      if (
        (distance > 0 && currentScroll < targetScroll) ||
        (distance < 0 && currentScroll > targetScroll)
      ) {
        currentScroll += step * (direction === "right" ? 1 : -1);
        element.scrollLeft = currentScroll;
        requestAnimationFrame(animateScroll);
      }
    };
    animateScroll();
  };
  const handleScroll = (side: string) => {
    if (cardContainerRef.current && side === "left") {
      smoothScroll(cardContainerRef.current, -600, "left");
    } else if (cardContainerRef.current && side === "right") {
      smoothScroll(cardContainerRef.current, 600, "right");
    }
  };

  return (
    <>
      {!isMedium && (
        <div className="flex lg:hidden w-full h-fit justify-center items-center  px-5">
          <button
            className="w-full  h-fit p-2 flex justify-center font-semibold
           items-center text-[15px]  border-primary  gap-2 border hover:shadow-xl hover:bg-slate-100 transition delay-75"
            onClick={() => setIsMedium()}
          >
            <span>Catalog Menu</span>
            <span>
              <BsArrowRightShort style={{ fontSize: "25px" }} />
            </span>
          </button>
        </div>
      )}
      <div className="flex w-full h-fit justify-start items-center px-5 text-3xl">
        <span className="font-semibold">Explore The Catalog</span>
      </div>
      <div className="flex w-full h-fit flex-col px-5">
        <div className="flex w-full h-fit justify-between items-center">
          <div className="flex text-[18px] font-medium items-center gap-3">
            <HiOutlineTrendingUp /> Popular Languages
          </div>
          <div className="flex justify-center items-center gap-3">
            <div className="flex justify-center items-center">
              <button className="hover:bg-gray-200 transition">
                <BsArrowLeftSquare
                  style={{ fontSize: 27, cursor: "pointer" }}
                  onClick={() => handleScroll("left")}
                />
              </button>
            </div>
            <div className="flex justify-center items-center">
              <button className="hover:bg-gray-200 transition">
                <BsArrowRightSquare
                  style={{ fontSize: 27, cursor: "pointer" }}
                  onClick={() => handleScroll("right")}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-fit w-full px-5">
        <div
          className="flex w-full h-fit overflow-x-scroll hide-scroll-bar justify-start py-1 items-center gap-9"
          ref={cardContainerRef}
        >
          {languages?.map((language) => (
            <div
              key={language._id}
              className="flex hover:bg-black delay-100 border  hover:border-black"
            >
              <div
                className="min-w-[189px] sm:min-w-[280px] md:min-w-[330px] cursor-pointer
                  flex justify-center items-center px-5  hover:translate-x-1 hover:-translate-y-1 transition
                  lg:min-w-[271px] w-full h-[150PX] border border-black "
                style={{
                  backgroundImage: `url(${getRandomImageUrl()})`,
                  backgroundSize: "cover",
                }}
              >
                <div className="flex w-full h-fit justify-center items-start flex-col gap-2 bg-white py-5 px-5">
                  <span className=" text-[16px]">Explore all</span>
                  <span className="font-semibold text-xl">
                    {language.languagename}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MainHead