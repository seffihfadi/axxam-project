import React from "react";
import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
function PropertyCard({ props }) {
  return (
    <div className="flex flex-wrap cursor-pointer mb-3">
      <div className="w-full mb-2 relative overflow-hidden rounded-2xl">
        <img
          src={props.image}
          className="hover:scale-[1.05] duration-[400ms]"
        />
        <FaHeart className="absolute top-1 right-2 text-[20px]" />
      </div>
      <div className="flex justify-between w-full">
        <div>
          <span className="font-semibold dark:text-gray-200">{props.location}</span>
          <br />
          <span className="text-secondary dark:text-gray-200 text-[14px] font-light block mb-2 leading-6">
            {props.description}
            <br />
            {props.date}
          </span>
          <span>{props.price} DZD/night</span>
        </div>
        <div>
          <img src="/star-black.svg" alt="star" className="inline w-[20px]" />
          <span className="ml-1">{props.rating}</span>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
