import React, { useState } from 'react';
import { LuPencilLine } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
import { PiMapPinLineLight } from "react-icons/pi";
import { IoEllipsisVerticalSharp } from "react-icons/io5";

function PropertyCard({ props, Amenities }) {
  
  const [isopen, setIsopen] = useState(false);
   const handleMenuToggle = () => {
    setIsopen(!isopen);
  };
  return (
    <div className="flex flex-wrap cursor-pointer mb-4 mx-4 md:mx-0 p-2 border border-gray-200 dark:border-gray-600 rounded-2xl">
      <div className="w-full h-[160px] lg:h-[150px] mb-4  overflow-hidden rounded-xl">
        <img src={props.image} className="h-full w-full" alt="Property" />
      </div>
      <div className='flex justify-between font-semibold darktxt  w-full  pb-3'>
        <span>{props.Price} DZD</span>
        <span className="relative" onClick={handleMenuToggle}>
          <IoEllipsisVerticalSharp />
          {isopen && 
            <div className='absolute right-2 py-3 pl-2 pr-7 border rounded-md  text-[14px] font-normal 
             flex flex-col items-start gap-4 bg-white before:absolute before:w-full before:h-[1.3px] before:bg-gray-200 before:right-0
             before:top-10' onClick={(e) => e.stopPropagation()}>
              <div className='flex items-center gap-3 text-secondary darktxt'>
                <LuPencilLine />
                Edit
              </div>
              <div className='flex items-center gap-3 text-secondary darktxt'>
                <AiOutlineDelete />
                Delete
              </div>
            </div>
          }
        </span>
      </div>
      <div className="w-full">
        <div>
          <div className='flex items-center text-secondary darktxt text-[15px] font-normal mb-2 gap-2'> 
            <span className="">
              <PiMapPinLineLight/> 
            </span>
            <span>{props.location} </span>
          </div>
          <div className="flex flex-wrap items-center text-secondary darktxt text-[15px] font-normal">
            {Object.entries(Amenities).map(([amenityName, icon]) => (
              <div key={amenityName} className="flex items-center mr-4 mb-2">
                {icon} 
                <span className="ml-2">{amenityName}</span> 
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
