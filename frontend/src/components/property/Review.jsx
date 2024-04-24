import React from 'react'
import RatingDisplay from '../common/RaitingDisplay'
function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
}

function Review({ users }) {
  return (
    <div className='flex justify-around flex-wrap'>
      {users.map((user,index) => index<3 && (
        <div className="relative shadow-md p-5 shadow-gray-400 border-gray-200 dark:border-gray-600 dark:shadow-gray-700 border my-9 
          rounded-xl w-80"key={user.id} >
          <p className='p-2 h-[124px]  text-l font-semibold'>{truncateText(user.comment, 100)}</p>
          <div className="mt-5 before:h-[1px] before:w-full before:bg-gray-300 before:absolute relative before:top-[-10px]">
            <div className="user">
              <div className="img">
                <img src={user.picture} alt="" />
              </div>
              <div className="name">
                <span>{user.user}</span>
                <p>{user.location}</p>
                <div className='stars'>
                  <RatingDisplay rate={user.rate} />
                </div>
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