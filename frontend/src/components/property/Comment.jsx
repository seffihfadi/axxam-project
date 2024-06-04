import React, { useEffect, useState } from 'react'
import RatingDisplay from '../common/RaitingDisplay'
import TimeAgo from 'timeago-react'
import Image from '../common/Image';
import { selectCurrentUser } from '../../app/slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setAlert } from '../../app/slices/alertSlice';
import { useUpdateReviewMutation, useDeleteReviewMutation  } from '../../features/reviews/reviewsApiSlice';
function Comment({reviews}) {
  // console.log(reviews);

  const user = useSelector(selectCurrentUser)
  // const [updateReview ,{isLoadingForUpdate}] = useUpdateReviewMutation();
  const [deleteReview ,{isLoadingForDelete}] = useDeleteReviewMutation();
  const handleDeleteReview = async (id) => {
    console.log(id);
    await deleteReview(id)
    .unwrap()
    .then((payload) => dispatch(setAlert([payload.message, 'success'])))
    .catch((error) => dispatch(setAlert([error.data.message, 'error'])))
  }

  return (
    <div className='flex flex-col gap-7 py-6'>
      {reviews.comments.map((comment)=>(
        <div key={comment.reviewID} className='md:w-[95%]'>
          <div className="user">
            <div className="w-10 aspect-square">
              <Image src={comment.theReviwerAvatar} className="rounded-full h-full w-full" alt={'userimg'} userName={comment.theReviwer} />
            </div>
            <div >
              <span className='text-sm font-bold "'>{comment.theReviwer}  </span>
              <p className="text-secondary darktxt text-[12px] font-normal  ">                
                <TimeAgo datetime={comment.reviewDate}></TimeAgo>
              </p>
            </div> 
          </div>
          <div className='py-1 flex justify-between items-center gap-2'>
            <span className='stars_reviews'><RatingDisplay rate={comment.averageRating}/></span>
            {user?.fullname === comment.theReviwer &&
              <span className='flex items-center gap-2'>
                <button><span className="material-symbols-outlined">edit</span></button>
                <button disabled={isLoadingForDelete} onClick={() => handleDeleteReview(comment.reviewID)}><span className="material-symbols-outlined">delete_sweep</span></button>
              </span>
            }
          </div>
          <div className='pt-2 w-[95%] font-medium text-sm'>{comment.comment}</div>
        </div>
      ))}
    </div>
  )
}

export default Comment
