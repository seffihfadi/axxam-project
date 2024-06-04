import { useRef } from "react";

import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";

import { Amenities } from "../common/Ameneties";

function Filters() {
  const elementRef = useRef();

  function slideRight(element) {
    element.scrollLeft += document.getElementById("filters").clientWidth - 50;
  }
  function slideLeft(element) {
    element.scrollLeft -= document.getElementById("filters").clientWidth - 50;
  }

  return (
    <div className="relative container pt-5 mt-80 md:mt-48 mb-0" id="filters">
      <div
        className="w-full lg:w-[90%] px-5 mx-auto py-2 md:py-3 rounded-3xl flex justify-between align-middle overflow-x-auto shadow-md scrollbar-hide gap-5 md:gap-1 scroll-smooth border-[1px] border-gray-200 dark:border-gray-600 font-light text-[14px] md:text-[16px]"
        ref={elementRef}
      >
       
        {Object.entries(Amenities).map(([key, icon]) => (
          <div
            key={key}
            className="lki min-w-[15%] lg:min-w-[12%] flex justify-center flex-col items-center gap-1 cursor-pointer group text-lg  hover:text-gray-400 dark:hover:text-gray-300"
          >
            {icon}
            <div className="relative text-sm md:text-base before:opacity-0 before:w-full before:h-[2px] before:bg-gray-400 dark:before:bg-gray-300 before:absolute before:bottom-[-12px] group-hover:before:opacity-70 text-nowrap group-hover:text-gray-400 dark:group-hover:text-gray-300 duration-150">
              {key.replace(/_/g, ' ')}
            </div>
          </div>
        ))}
      </div>
      <HiOutlineChevronRight onClick={() => slideRight(elementRef.current)} size={24} className="hidden lg:block font-thin p-[2px] rounded-full absolute top-[60%] translate-y-[-50%] bg-white dark:bg-gray-700 right-20 cursor-pointer border-[1px] border-gray-300 dark:border-gray-500 hover:shadow-md"/>
      <HiOutlineChevronLeft onClick={() => slideLeft(elementRef.current)} size={24} className="hidden lg:block font-thin p-[2px] rounded-full absolute top-[60%] translate-y-[-50%] bg-white dark:bg-gray-700 left-20 cursor-pointer border-[1px] border-gray-300 dark:border-gray-500 hover:shadow-md"/>
    </div>
  );
}

export default Filters;
