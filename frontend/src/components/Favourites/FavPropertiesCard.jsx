import React from "react";
import { FaRegStar } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
function FavPropertiesCard({ props }) {
  return (
    <div className="flex flex-wrap cursor-pointer mb-3">
    <div className="w-full h-[300px] lg:h-[220px] mb-2 relative overflow-hidden rounded-2xl group">
      <img
        src={props.image}
        className="h-full w-full  "
      />
      <span className=" absolute top-1 right-2 w-[25px] h-[25px]  bg-gray-300 rounded-full flex items-center justify-center group-hover:opacity-100 opacity-0 ">
      <FaXmark size={15}/>
      </span>
    </div>
    <div className="flex justify-between w-full">
      <div>
        <span className="font-semibold darktxt">
          {props.location}
        </span>
        <br />
        <span className="text-secondary darktxt text-[14px] font-light block mb-2 leading-6">
          {props.date}
        </span>
      </div>
      <div className="relative">
        <FaRegStar className="absolute left-[-85%] top-[3px] text-lg" />
        {props.rating}
      </div>
    </div>
  </div>
  )
}
export default FavPropertiesCard
