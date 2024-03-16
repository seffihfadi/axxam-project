import { useRef } from "react";
import {
  FaSwimmingPool,
  FaUmbrellaBeach,
  FaRegSnowflake,
  FaSkiing,
  FaCaravan,
} from "react-icons/fa";
import { FaDumbbell, FaCampground } from "react-icons/fa6";
import { GiBarbecue, GiDesk } from "react-icons/gi";
import { PiCactusFill } from "react-icons/pi";

function Filters() {
  const elementRef = useRef();

  const filters = [
    {
      name: "Pool",
      icon: <FaSwimmingPool />,
    },
    {
      name: "Gym",
      icon: <FaDumbbell />,
    },
    {
      name: "Beach View",
      icon: <FaUmbrellaBeach />,
    },
    {
      name: "Arctic",
      icon: <FaRegSnowflake />,
    },
    {
      name: "Barbecue",
      icon: <GiBarbecue />,
    },
    {
      name: "Office",
      icon: <GiDesk />,
    },
    {
      name: "Camping",
      icon: <FaCampground />,
    },
    {
      name: "Ski",
      icon: <FaSkiing />,
    },
    {
      name: "Caravan",
      icon: <FaCaravan />,
    },
    {
      name: "Desert",
      icon: <PiCactusFill />,
    },
  ];

  function slideRight(element) {
    element.scrollLeft += document.getElementById("filters").clientWidth - 50;
  }
  function slideLeft(element) {
    element.scrollLeft -= document.getElementById("filters").clientWidth - 50;
  }

  return (
    <div className="relative container" id="filters">
      <div
        className="w-full mx-auto py-2 md:py-3 rounded-3xl flex justify-between align-middle overflow-x-auto shadow-md scrollbar-hide gap-5 md:gap-1 scroll-smooth border-[1px] border-gray-200 font-light text-[14px] md:text-[16px]"
        ref={elementRef}
      >
        {filters.map((element, index) => (
          <div
            key={index}
            className="min-w-[15%] lg:min-w-[12%] flex justify-center flex-col items-center gap-1 cursor-pointer group"
          >
            {element.icon}
            <div className="relative before:opacity-0 before:w-full before:h-[2px] before:bg-[#6D6D6D] before:absolute before:bottom-[-12px] group-hover:before:opacity-70 text-nowrap">
              {element.name}
            </div>
          </div>
        ))}
      </div>
      <span
        className="material-symbols-outlined hidden lg:block text-[25px] absolute top-[50%] translate-y-[-50%] bg-white right-9 rounded-full cursor-pointer border-[1px] border-gray-300 hover:shadow-md"
        onClick={() => slideRight(elementRef.current)}
      >
        chevron_right
      </span>
      <span
        className="material-symbols-outlined hidden lg:block text-[25px] absolute top-[50%] translate-y-[-50%] left-9 rounded-full cursor-pointer bg-white border-[1px] border-gray-300 hover:shadow-md"
        onClick={() => slideLeft(elementRef.current)}
      >
        chevron_left
      </span>
    </div>
  );
}

export default Filters;
