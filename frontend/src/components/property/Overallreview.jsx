import React from 'react';
import { FaRegMessage } from 'react-icons/fa6';
import { TbLocation } from 'react-icons/tb';
import { GoPeople } from 'react-icons/go';
import { MdOutlineCleaningServices } from 'react-icons/md';

function Overallreview({owner}) {
  return (
    <div className='container'>
      <div className='my-5 py-8 w-full border-t  border-t-gray-300 flex flex-col justify-between items-center gap-8'>
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-full w-12 h-12 flex overflow-hidden">
            <img src={owner.picture} alt="owner" />
          </div>
          <div className='font-bold text-xs'>Hosted by {owner.name} </div>
          <div className='flex gap-6'>
            <div className='flex gap-1 items-center after:h-[80%] after:w-[1px] after:bg-gray-400 after:right-[-15px] after:absolute relative'>
              <img src="../../../public/star.svg" alt="star" />
              <span className='font-bold text-lg'>{owner.rate}</span>
            </div>
            <span className='font-bold text-lg'>{owner.reviews_nemb} reviews</span>
          </div>
        </div>
        <div className='w-[35%] text-center'>One of the most loved homes on AXXAM based on ratings, reviews, and reliability.</div>
        <div className='flex justify-between w-full font-bold text-lg pb-5'>
          <div className='elements '>
            <h1>Overall rating </h1>
          </div>
          <div className='elements '>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-1'>
                <h1>Cleanliness</h1>
                <p className='font-semibold'>{owner.cleanliness_rate}</p>
              </div>
              <MdOutlineCleaningServices />
            </div>
          </div>
          <div className='elements'>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-1'>
                <h1>Communication</h1>
                <p className='font-semibold'>{owner.communication_rate}</p>
              </div>
              <FaRegMessage />
            </div>
          </div>
          <div className='elements'>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-1'>
                <h1>Location</h1>
                <p className='font-semibold'>{owner.location_rate}</p>
              </div>
              <TbLocation />
            </div>
          </div>
          <div className='elements'>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-1'>
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
