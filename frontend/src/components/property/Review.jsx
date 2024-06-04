import React from 'react'
import RatingDisplay from '../common/RaitingDisplay'
import Image from '../common/Image';
import TimeAgo from 'timeago-react';
function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
}

function Review({ users }) {
  return (
    <div className='flex justify-around flex-wrap'>
      {users.slice(0,3).map((user) => ( 
        <div className="relative shadow-sm p-5 shadow-gray-400  border-gray-200 dark:border-gray-600  dark:shadow-gray-700 border my-9 rounded-xl w-80">
        <p className='p-2 text-l font-semibold '>“{user.comment}“</p>
        <div className="  mt-5 before:h-[1px] before:w-full before:bg-gray-300  before:absolute relative before:top-[-10px]  ">
          <div className="user ">
            <div>
            <Image src={user.theReviwerAvatar} userName={user.theReviwer} alt="user" className="flex-shrink-0 rounded-full w-9 h-9 flex overflow-hidden " />
            </div>
            <div >
              <span className='text-sm font-bold "'>{user.theReviwer}</span>
              <p className="text-secondary darktxt text-[12px] font-normal  ">                
                <TimeAgo datetime={user.reviewDate}></TimeAgo>
              </p>
              {/* <p>{user.location}</p> */}
              <div className='stars '>
              <RatingDisplay rate={user.averageRating} /></div>
            </div>
          </div>
        </div>
        <div className="absolute h-5 z-0 top-0 left-8">
        <img className="h-full" src="/coat.svg" alt="" />
        </div>
      </div>
      ))}  
    </div>
  );
}

export default Review;