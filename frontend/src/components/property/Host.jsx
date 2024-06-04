import React from 'react'
import RatingDisplay from '../common/RaitingDisplay'
import { Link } from 'react-router-dom'
import Image from '../common/Image'

function Host({owner, handleOpen, reviews}) {
  console.log(owner)
  console.log(reviews)
  return (
    <>
    <div className='my-9 md:w-[85%] md:h-[90px] border border-gray-300 dark:border-gray-600  rounded-3xl'>
        <div className="h-full py-4 px-5 flex justify-between items-start md:items-center flex-col md:flex-row gap-5">
          <Link to={'/profile'}>
          <div className="user cursor-pointer">
            <div className=" img">
              <Image src={owner?.avatar} userName={owner.fullname} />
            </div>
            <div className="name">
              <span>Hosted by {owner.fullname} </span>
              <p>Hosting since {owner.createdAt.slice(0,4)}</p>
            </div>
          </div>
          </Link>
          <div className='flex gap-10 self-center'>
          <div className='flex flex-wrap flex-col  items-center justify-center after:h-[80%] after:w-[1px] after:bg-gray-300 dark:after:bg-gray-600 after:right-[-18px] after:absolute relative'>
            <h1 className='font-semibold'>{reviews.rate.totalAverage}</h1>
            <div className='stars'>
              <RatingDisplay rate={reviews.rate.totalAverage} />
            </div>  
          </div>
          <div className='flex flex-wrap flex-col  items-center justify-center'>
          <h1 className='font-semibold'>{reviews.comments.length}</h1>
            <button onClick={handleOpen} className='cursor-pointer underline underline-offset-7 text-gray-600'>Reviews</button>
          </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Host
