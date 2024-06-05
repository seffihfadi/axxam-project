import React from 'react';
import { FaRegStar } from "react-icons/fa";
import { Link } from 'react-router-dom';

function OwnersListings({cards,owner}) {
 
  return (
    <div className="container my-36">
      <h1 className="pb-12 pt-3 md:pb-18 font-bold text-xl">{owner.fullname}'s Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">  
        {cards.map((element, index) => (
          <Link to={`/property/${element._id}`}>
          <div key={index} className="mb-3 cursor-pointer">
            <div className="w-full h-[300px] lg:h-[220px] mb-2  overflow-hidden rounded-2xl group">
              <img src={element.images[2].secure_url} className="h-full w-full hover:scale-[1.05] duration-[400ms]" alt={element.desc} />
            </div>
            <div className="w-full">
              <span className="font-semibold darktxt">
                {element.title}
              </span>
              <br />
              <span className="text-secondary darktxt text-[14px] font-light block mb-2 leading-6">
                {element.location.name}
              </span>
              <div className="relative">
                {/* <FaRegStar className="absolute left-[-25px] top-[3px] text-lg" /> */}
                {element.price/100}DZD
              </div>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>            
  );
}

export default OwnersListings;
