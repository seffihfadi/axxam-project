import React from "react";
import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaRegStar } from "react-icons/fa6";
function PropertyCard({ props }) {
  return (
    <div className="flex flex-wrap cursor-pointer mb-3 z-30">
      <div className="w-full h-[300px] lg:h-[220px] mb-2 relative overflow-hidden rounded-2xl">
        <img
          src={props.image}
          className="hover:scale-[1.05] duration-[400ms] h-full w-full"
        />
        <button>
        <FaHeart className="absolute top-3 right-3 text-xl" />
        </button>
      </div>
      <div className="flex justify-between w-full">
        <div>
          <span className="font-semibold">
            {props.location}
          </span>
          <br />
          <span className="text-secondary dark:text-gray-200 text-[14px] font-light block mb-2 leading-6">
            {props.description}
            <br />
            {props.date}
          </span>
          <span>{props.price} DZD/night</span>
        </div>
        <div className="relative">
          <FaRegStar className="absolute left-[-85%] top-[3px] text-lg" />
          {props.rating}
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
