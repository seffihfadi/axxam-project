import React from 'react'
import RatingDisplay from '../common/RaitingDisplay'
function Comment({comments}) {
  return (
    <div className='flex flex-col gap-12 py-6'>
      {comments.map((comment)=>(
        <div className='md:w-[95%] '>
          <div className="user  ">
            <img src={comment.picture} alt="user" className="img" />
            <div >
              <span className='text-sm font-bold'>{comment.user}  </span>
              <p className="text-secondary darktxt text-[14px] font-normal  ">                
                {comment.location}
              </p>
            </div> 
          </div>
          <div className='py-1 flex items-center gap-2'>
            <span className='stars_reviews'><RatingDisplay rate={comment.rate}/></span>
            <span className='text-secondary darktxt text-xs  '>{comment.date}</span>
          </div>
          <div className='pt-2 w-[95%] font-medium text-sm'>{comment.comment}</div>
        </div>
      ))}
    </div>
  )
}

export default Comment
