import React from 'react';
import { FaRegMessage } from 'react-icons/fa6';
import { TbLocation } from 'react-icons/tb';
import { GoPeople } from 'react-icons/go';
import { MdOutlineCleaningServices } from 'react-icons/md';
import Image from '../common/Image';
import { Link } from 'react-router-dom';
function Overallreview({ rating, owner }) {
  // console.log('reviews osds', owner)

  return (
    <div className='container'>
      <div className='my-5 pt-8 w-full border-t  border-t-gray-300 dark:border-t-gray-600 flex flex-col justify-between items-center gap-4 lg:gap-8'>
        {/* <div className="flex flex-col items-center gap-2">
          <div className="rounded-full w-12 h-12 flex overflow-hidden">
            <img src={owner.image} alt="owner" />
          </div>
          <div className='font-bold text-xs mt-2'>Hosted by {owner.name} </div>
          <div className='flex gap-6 md:text-lg'>
            <div className='flex gap-1 items-center after:h-[80%] after:w-[1px] after:bg-gray-400  dark:after:bg-gray-600 after:right-[-15px] after:absolute relative'>
              <img src="../../../public/star.svg" alt="star" />
              <span className='font-bold'>{owner.rate}</span>
            </div>
            <span className='font-bold'>{owner.reviews_nemb} reviews</span>
          </div>
        </div> */}
        <div className='w-full flex gap-10 justify-between mb-10 items-center'>
          <Link to={'/profile'}>
          <div className="user ">
            <div className="img">
              <Image src={owner?.avatar} userName={owner.fullname} />
            </div>
            <div className="name">
              <span>{owner.fullname}</span>
              <p>{owner.phone}</p>
              <div className='stars '>
              {/* <RatingDisplay rate={4} /> */}
            </div>
            </div>
          </div>
          </Link>
          <p className='text-center max-w-xl'>One of the most loved  homes on AXXAM based on ratings, reviews, and reliability.</p>
          <span className='font-semibold text-3xl'>{rating.totalAverage}<span className='font-semibold text-lg'> / 5 stars</span></span>
          
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-5 w-full font-bold pb-5'>
          <div className='elements'>
            <h1 className='text-lg'>Overall rating </h1>
            <ul className='w-full mt-2'>
              {Object.entries(rating.counts).map((rate, index) => 
                <li className='flex items-center gap-4 font-normal text-[14px] h-[16px]' key={index}>
                  {5 - index}
                  <div className='bg-gray-300 rounded-full w-full h-1 relative'> 
                    <span className={'h-1 bg-primary rounded-full absolute left-0 top-0'} style={{ width: `${rate[1] / rating.count * 100}%` }}> </span>
                  </div>
                </li>
              )}
            </ul>
          </div>
          <div className='elements '>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-1 md:text-lg'>
                <h1>Cleanliness</h1>
                <p className='font-semibold'>{rating.totalCleanliness}</p>
              </div>
              <MdOutlineCleaningServices />
            </div>
          </div>
          <div className='elements'>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-1 md:text-lg'>
                <h1>Communication</h1>
                <p className='font-semibold'>{rating.totalCommunication}</p>
              </div>
              <FaRegMessage />
            </div>
          </div>
          <div className='elements'>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-1 md:text-lg'>
                <h1>Location</h1>
                <p className='font-semibold'>{rating.totalLocation}</p>
              </div>
              <TbLocation />
            </div>
          </div>
          <div className='elements'>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-1 text-lg'>
                <h1>Neighbours</h1>
                <p className='font-semibold'>{rating.totalNeighbours}</p>
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

