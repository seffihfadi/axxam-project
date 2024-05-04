import React from 'react';
import { FaRegStar } from "react-icons/fa";

function OwnersListings({cards,owner}) {
 
  return (
    <div className="container my-36">
      <h1 className="pb-12 pt-3 md:pb-18 font-bold text-xl">{owner.name}'s Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">  
        {cards.map((element, index) => (
          <div key={index} className="mb-3 cursor-pointer">
            <div className="w-full h-[300px] lg:h-[220px] mb-2  overflow-hidden rounded-2xl group">
              <img src={element.image} className="h-full w-full hover:scale-[1.05] duration-[400ms]" alt={element.description} />
            </div>
            <div className="flex justify-between w-full">
              <div className="font-semibold darktxt">
                {element.location}
              </div>
              <div className="relative">
                <FaRegStar className="absolute left-[-85%] top-[3px] text-lg" />
                {element.rating}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>            
  );
}

export default OwnersListings;
