import React from 'react'
import Review from './Review'
export default function Reviews({handleOpen,users}) {

  return (
  <div className='container' id="reviews-section">
    <div className='border-t border-t-gray-300 dark:border-t-gray-600 py-10 my-5'>
      <div className='flex  justify-between'>
        <h1 className='font-bold text-xl my-4'>Reviews</h1>
        <button onClick={handleOpen} className='border border-gray-300 dark:border-gray-600 rounded-3xl shadow-md   h-[35px] px-5'>Show All </button>
      </div>
      <Review users={users}/>
   </div>
  </div>
  )
}
