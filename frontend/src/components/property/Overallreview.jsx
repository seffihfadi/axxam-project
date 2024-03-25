import React from 'react';
import { FaRegMessage } from 'react-icons/fa6';
import { TbLocation } from 'react-icons/tb';
import { GoPeople } from 'react-icons/go';
import { MdOutlineCleaningServices } from 'react-icons/md';

function Overallreview({owner, ratingPercentage}) {

  const five = 50;

  return (
    <div className='container'>
      <div className='my-5 pt-8 w-full border-t  border-t-gray-300 flex flex-col justify-between items-center gap-4 lg:gap-8'>
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-full w-12 h-12 flex overflow-hidden">
            <img src={owner.picture} alt="owner" />
          </div>
          <div className='font-bold text-xs mt-2'>Hosted by {owner.name} </div>
          <div className='flex gap-6 md:text-lg'>
            <div className='flex gap-1 items-center after:h-[80%] after:w-[1px] after:bg-gray-400 after:right-[-15px] after:absolute relative'>
              <img src="../../../public/star.svg" alt="star" />
              <span className='font-bold'>{owner.rate}</span>
            </div>
            <span className='font-bold'>{owner.reviews_nemb} reviews</span>
          </div>
        </div>
        <div className='w-full md:w-[60%] lg:w-[35%] text-center text-sm md:text-base mb-5'>One of the most loved homes on AXXAM based on ratings, reviews, and reliability.</div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-5 w-full font-bold pb-5'>
          <div className='elements'>
            <h1 className='text-lg'>Overall rating </h1>
            <ul className='w-full mt-2'>
              {ratingPercentage.map((rate,index)=>
                <li className='flex items-center gap-4 font-normal text-[14px] h-[16px]' key={index}>
                {rate.number}
                <div className='bg-gray-300 w-full h-0.5 relative'> 
                <span className={'h-0.5 bg-primary  absolute left-0 top-0'} style={{ width: `${rate.perc}%` }}> </span>
                </div>
              </li>
              )}
            </ul>
          </div>
          <div className='elements '>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-1 text-lg'>
                <h1>Cleanliness</h1>
                <p className='font-semibold'>{owner.cleanliness_rate}</p>
              </div>
              <MdOutlineCleaningServices />
            </div>
          </div>
          <div className='elements'>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-1 text-lg'>
                <h1>Communication</h1>
                <p className='font-semibold'>{owner.communication_rate}</p>
              </div>
              <FaRegMessage />
            </div>
          </div>
          <div className='elements'>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-1 text-lg'>
                <h1>Location</h1>
                <p className='font-semibold'>{owner.location_rate}</p>
              </div>
              <TbLocation />
            </div>
          </div>
          <div className='elements'>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-1 text-lg'>
                <h1>Neighbours</h1>
                <p className='font-semibold'>{owner.neighbours_rate}</p>
              </div>
              <GoPeople />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overallreview;

