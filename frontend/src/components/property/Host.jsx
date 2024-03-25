import React from 'react'
import RatingDisplay from '../common/RaitingDisplay'
function Host({owner}) {
  return (
    <div className='my-9 md:w-[85%] md:h-[90px] border border-gray-300 rounded-3xl'>
        <div className="h-full py-4 px-5 flex justify-between items-start md:items-center flex-col md:flex-row gap-5">
          <div className="user  ">
            <div className=" img">
              <img src={owner.picture} alt="owner" />
            </div>
            <div className="name ">
              <span>Hosted by {owner.name} </span>
              <p>{owner.hosting} hosting </p>
            </div>
          </div>
          <div className='flex gap-10 self-center'>
          <div className='flex flex-wrap flex-col  items-center justify-center after:h-[80%] after:w-[1px] after:bg-gray-300 after:right-[-18px] after:absolute relative'>
            <h1 className='font-semibold'>{owner.rate}</h1>
            <div className='stars'>
              <RatingDisplay rate={owner.rate} />
              </div>  
          </div>
          <div className='flex flex-wrap flex-col  items-center justify-center'>
          <h1 className='font-semibold'>{owner.reviews_nemb}</h1>
            <p className='cursor-pointer underline underline-offset-7 text-gray-600'>Reviews</p>
          </div>
          </div>
        </div>
    </div>
  )
}

export default Host
