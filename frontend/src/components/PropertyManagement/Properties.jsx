import React from 'react'
import PropertyCard from './PropertyCard';
import { AiOutlinePlus } from "react-icons/ai";
import { Amenities } from '../common/Ameneties';
import { Link } from 'react-router-dom';
// import { useGetLessorAnnouncementsQuery } from '../../features/bookings/bookingsApiSlice';
const cards = [
    {
      image: "public/card1.jpg",
      location: "Staoueli, Algiers",
      Price:"25000",
    },
    {
      image: "public/card2.jpg",
      location: "Bir el djir, Oran",
      Price:"25000",
    },
    {
      image: "public/card3.jpg",
      location: "Zeralda, Algiers",
      Price:"25000",
    },
    {
      image: "public/card4.jpg",
      location: "Bir el djir, Oran",
      Price:"25000",
    },
    {
      image: "public/card5.jpg",
      location: "Bir el djir, Oran",
      Price:"25000",
    },
    {
      image: "public/card6.jpg",
      location: "Sidi abdellah, Algiers",
      Price:"25 000",
    },
  ];

function Properties() {
  return (
    <div className='container my-24'>
     <div className='flex justify-between  items-center '>
        <h1 className="pb-12 pt-10 md:pb-15 font-bold text-xl">All properties</h1>
        <button className=' md:p-3 p-4 md:mb-3 md:rounded-lg rounded-full bg-primary font-semibold flex items-center gap-2'>
            <span><AiOutlinePlus color="white"/></span>
            <Link to = '/dashboard/ae'><span className='text-white hidden md:inline'>Add property</span></Link>
        </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-4 gap-6 ">  
          {cards.map((element) => (       
            <PropertyCard key={element.id} props={element}  Amenities={Amenities} />
          ))}
        </div>
      </div>
  
  )
}

export default Properties
